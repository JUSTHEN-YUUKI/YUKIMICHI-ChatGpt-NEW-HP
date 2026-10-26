import { NextResponse } from 'next/server'
import { createHash } from 'node:crypto'
import { isMaintenanceEnabled, maintenanceApiResponse, isInquirySubmissionEnabled, inquiryUnavailableResponse } from '@/lib/maintenance'
import { allowInquiryAttempt, InquiryRequestError, readInquiryPayload } from '@/lib/inquiry-security'
import { isPatchedNode } from '@/lib/runtime-security'
import { getSmtpConfig, isMailbox } from '@/lib/smtp-config'
import { createInquiryMailer, safeSmtpError } from '@/lib/smtp-mail'

export const runtime = 'nodejs'
export const preferredRegion = 'hnd1'
export const maxDuration = 60

type InquiryType = 'quote' | 'contact'

type InquiryPayload = {
  type?: unknown
  company?: unknown
  name?: unknown
  email?: unknown
  productUrl?: unknown
  sdsAvailability?: unknown
  documentUrl?: unknown
  productCategory?: unknown
  quantity?: unknown
  quantityUnit?: unknown
  destination?: unknown
  destinationCountry?: unknown
  destinationCity?: unknown
  deadline?: unknown
  shippingMethod?: unknown
  message?: unknown
  phone?: unknown
  productName?: unknown
  unitPrice?: unknown
  sizeWeight?: unknown
  material?: unknown
  recipientType?: unknown
  sourcePage?: unknown
  language?: unknown
  website?: unknown
}

const USER_SEND_ERROR = '送信に失敗しました。お手数ですが、メールで直接ご連絡ください。'

function toText(value: unknown, maxLength = 2000) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function normalizeType(value: unknown): InquiryType | null {
  return value === 'quote' || value === 'contact' ? value : null
}

function isEmail(value: string) {
  return isMailbox(value)
}

function isOptionalUrl(value: string) {
  if (!value) {
    return true
  }

  try {
    const url = new URL(value)
    return (url.protocol === 'https:' || url.protocol === 'http:') && !url.username && !url.password
  } catch {
    return false
  }
}

function getTokyoDatePart(date: Date) {
  const parts = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)

  const year = parts.find((part) => part.type === 'year')?.value ?? '0000'
  const month = parts.find((part) => part.type === 'month')?.value ?? '00'
  const day = parts.find((part) => part.type === 'day')?.value ?? '00'

  return `${year}${month}${day}`
}

function generateRandomCode(length = 6) {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const cryptoSource = globalThis.crypto

  if (cryptoSource?.getRandomValues) {
    const bytes = new Uint8Array(length)
    cryptoSource.getRandomValues(bytes)

    return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join('')
  }

  return Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join('')
}

function generateReceiptNumber(date: Date) {
  return `YKM-${getTokyoDatePart(date)}-${generateRandomCode()}`
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function getDisplayRows(rows: Array<[string, string]>) {
  return rows.filter(([, value]) => value.trim().length > 0)
}

function renderRowsText(rows: Array<[string, string]>) {
  return rows.map(([label, value]) => `${label}: ${value}`).join('\n')
}

function renderTableHtml(rows: Array<[string, string]>) {
  return rows
    .map(
      ([label, value]) =>
        `<tr><th style="width: 180px; text-align: left; vertical-align: top; padding: 8px 10px; border-bottom: 1px solid #e6e0d5; color: #4b5563;">${escapeHtml(label)}</th><td style="padding: 8px 10px; border-bottom: 1px solid #e6e0d5; color: #111827; white-space: pre-wrap;">${escapeHtml(value)}</td></tr>`,
    )
    .join('')
}

function renderAdminHtml(rows: Array<[string, string]>, message: string) {
  const tableRows = renderTableHtml(rows)

  return [
    '<div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; line-height: 1.7; color: #111827;">',
    '<h1 style="font-size: 18px; margin: 0 0 16px;">YUKIMICHI Inquiry</h1>',
    `<table style="border-collapse: collapse; width: 100%; max-width: 760px;">${tableRows}</table>`,
    message
      ? `<h2 style="font-size: 15px; margin: 22px 0 8px;">Message</h2><div style="white-space: pre-wrap; border-left: 3px solid #c9a84c; padding: 10px 12px; background: #fbfaf7;">${escapeHtml(message)}</div>`
      : '',
    '</div>',
  ].join('')
}

function renderCustomerHtml(rows: Array<[string, string]>, contactToEmail: string) {
  const tableRows = renderTableHtml(rows)

  return [
    '<div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; line-height: 1.7; color: #111827;">',
    '<p>このたびは、YUKIMICHI へお問い合わせいただきありがとうございます。</p>',
    '<p>以下の内容でお問い合わせを受け付けました。</p>',
    `<table style="border-collapse: collapse; width: 100%; max-width: 760px;">${tableRows}</table>`,
    `<p>内容を確認のうえ、担当者より ${escapeHtml(contactToEmail)} からご連絡いたします。</p>`,
    '<p>商品内容、配送先国、数量、サイズ、重量、用途により、対応可否・費用・納期は変動します。最終的な輸出入可否、関税、VAT/GST、配送会社引受可否は、税関・通関業者・配送会社・公的機関等の確認が前提となります。</p>',
    '<p>YUKIMICHI<br>JUSTHEN Co., Ltd.</p>',
    '<p>※本メールは自動返信です。</p>',
    '</div>',
  ].join('')
}

export async function POST(request: Request) {
  // Defense in depth: stop before JSON parsing, config lookup or email sending.
  if (isMaintenanceEnabled()) return maintenanceApiResponse()

  if (!isPatchedNode(process.versions.node) ||
      (process.env.INQUIRY_EMAIL_SANDBOX === 'on' && process.env.VERCEL_ENV !== 'preview')) {
    console.error('[inquiry] Runtime or mail-mode safety check failed', { node: process.versions.node })
    return inquiryUnavailableResponse()
  }

  if (!isInquirySubmissionEnabled()) return inquiryUnavailableResponse()

  const smtpConfig = getSmtpConfig()
  if (!smtpConfig.ok) {
    console.error('[inquiry] SMTP configuration unavailable', { reason: smtpConfig.reason, missing: smtpConfig.missing })
    return inquiryUnavailableResponse()
  }

  let payload: InquiryPayload

  try {
    payload = await readInquiryPayload(request)
  } catch (error) {
    return NextResponse.json(
      { ok: false, code: error instanceof InquiryRequestError ? error.code : 'INVALID_REQUEST', error: '入力内容を確認してください。' },
      { status: error instanceof InquiryRequestError ? error.status : 400, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  // Vercel replaces x-forwarded-for at its trusted ingress. No client header is
  // trusted as identity outside Vercel; the WAF remains the shared quota owner.
  const ip = process.env.VERCEL ? request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown' : 'local'
  const quotaKey = createHash('sha256').update(ip).digest('hex')
  if (!allowInquiryAttempt(quotaKey)) return NextResponse.json(
    { ok: false, error: '送信回数の上限に達しました。時間をおいて再度お試しください。' },
    { status: 429, headers: { 'Cache-Control': 'no-store', 'Retry-After': '3600' } },
  )

  const type = normalizeType(payload.type)
  const company = toText(payload.company, 300)
  const name = toText(payload.name, 200)
  const email = toText(payload.email, 300)
  const productUrl = toText(payload.productUrl, 1000)
  const sdsAvailability = toText(payload.sdsAvailability, 500)
  const documentUrl = toText(payload.documentUrl, 1000)
  const productCategory = toText(payload.productCategory, 300)
  const quantity = toText(payload.quantity, 200)
  const quantityUnit = toText(payload.quantityUnit, 100)
  const destination = toText(payload.destination, 300)
  const destinationCountry = toText(payload.destinationCountry, 200)
  const destinationCity = toText(payload.destinationCity, 200)
  const deadline = toText(payload.deadline, 300)
  const shippingMethod = toText(payload.shippingMethod, 300)
  const message = toText(payload.message, 5000)
  const phone = toText(payload.phone, 200)
  const productName = toText(payload.productName, 500)
  const unitPrice = toText(payload.unitPrice, 200)
  const sizeWeight = toText(payload.sizeWeight, 500)
  const material = toText(payload.material, 500)
  const recipientType = toText(payload.recipientType, 200)
  const sourcePage = toText(payload.sourcePage, 300) || (type === 'quote' ? '/quote' : '/contact')
  const language = toText(payload.language, 20) || 'ja'
  const website = toText(payload.website, 300)

  if (website) {
    console.error('Inquiry honeypot triggered')
    return NextResponse.json({
      ok: true,
      autoReplyOk: false,
    })
  }

  const normalizedDestination = destination || [destinationCountry, destinationCity].filter(Boolean).join(' / ')
  const missingProductReference = !productName && !productUrl
  const quoteMissingRequired = type === 'quote' && (!normalizedDestination || !message || missingProductReference)
  const contactMissingRequired = type === 'contact' && (!normalizedDestination || !message)

  if (
    !type ||
    !name ||
    !email ||
    !isEmail(email) ||
    !isOptionalUrl(productUrl) ||
    !isOptionalUrl(documentUrl) ||
    quoteMissingRequired ||
    contactMissingRequired
  ) {
    return NextResponse.json(
      { ok: false, error: '入力内容を確認してください。' },
      { status: 400 },
    )
  }

  // Real preview trials are opt-in and restricted to the owner mailbox.
  const preview = process.env.VERCEL_ENV === 'preview'
  if (preview && process.env.SMTP_PREVIEW_SEND === 'on' && email.toLowerCase() !== smtpConfig.notificationEmail.toLowerCase()) {
    return NextResponse.json({ ok: false, code: 'PREVIEW_RECIPIENT_RESTRICTED', error: USER_SEND_ERROR },
      { status: 403, headers: { 'Cache-Control': 'no-store' } })
  }

  const submittedDate = new Date()
  const receiptNumber = generateReceiptNumber(submittedDate)
  const adminSubject =
    type === 'quote'
      ? `【YUKIMICHI】お見積り依頼が届きました（${receiptNumber}）`
      : `【YUKIMICHI】お問い合わせが届きました（${receiptNumber}）`
  const submittedAt = submittedDate.toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const normalizedQuantity = quantity && quantity !== quantityUnit ? quantity : ''
  const quantityText = normalizedQuantity || '未入力 / Not provided'
  const adminRows = getDisplayRows([
    ['Reference No.', receiptNumber],
    ['Inquiry Type', type],
    ['Name', name],
    ['Company', company],
    ['Email', email],
    ['Phone', phone],
    ['Country', destinationCountry || destination],
    ['Product Name', productName],
    ['Product URL', productUrl],
    ['SDS / Ingredient List Availability', sdsAvailability],
    ['Product Photo / Document URL', documentUrl],
    ['Product Category', productCategory],
    ['Unit Price', unitPrice],
    ['Size / Weight', sizeWeight],
    ['Material', material],
    ['Recipient Type', recipientType],
    ['Language', language],
    ['Quantity', quantityText],
    ['Destination', normalizedDestination],
    ['Desired Timing', deadline],
    ['Shipping Method', shippingMethod],
    ['Submitted At', `${submittedAt} JST`],
    ['Source Page', sourcePage],
  ])
  const adminText = [
    'YUKIMICHI inquiry received.',
    '',
    renderRowsText(adminRows),
    ...(message ? ['', `Message: ${message}`] : []),
  ].join('\n')
  const adminHtml = renderAdminHtml(adminRows, message)
  const customerRows = getDisplayRows([
    ['受付番号 / Reference No.', receiptNumber],
    ['送信種別 / Type', type],
    ['送信日時 / Submitted At', `${submittedAt} JST`],
  ])
  const autoReplySubject =
    type === 'quote'
      ? `【YUKIMICHI】お見積り依頼を受け付けました（${receiptNumber}）`
      : `【YUKIMICHI】お問い合わせを受け付けました（${receiptNumber}）`
  const contactToEmailPlaceholder = '{{CONTACT_TO_EMAIL}}'
  const autoReplyText = [
    'このたびは、YUKIMICHI へお問い合わせいただきありがとうございます。',
    '以下の内容でお問い合わせを受け付けました。',
    '',
    renderRowsText(customerRows),
    '',
    `内容を確認のうえ、担当者より ${contactToEmailPlaceholder} からご連絡いたします。`,
    '',
    '商品内容、配送先国、数量、サイズ、重量、用途により、対応可否・費用・納期は変動します。',
    '最終的な輸出入可否、関税、VAT/GST、配送会社引受可否は、税関・通関業者・配送会社・公的機関等の確認が前提となります。',
    '',
    'YUKIMICHI',
    'JUSTHEN Co., Ltd.',
    '',
    '※本メールは自動返信です。',
  ].join('\n')

  let mailer: ReturnType<typeof createInquiryMailer> | undefined
  try {
    mailer = createInquiryMailer(smtpConfig)
    // By default Preview verifies SMTP authentication without delivery and
    // does not present that diagnostic as a successful form submission.
    if (preview && (process.env.SMTP_PREVIEW_SEND !== 'on' || process.env.INQUIRY_EMAIL_SANDBOX === 'on')) {
      await mailer.verify()
      return NextResponse.json({ ok: false, code: 'SMTP_VERIFIED_NO_DELIVERY',
        error: 'SMTP接続・認証の確認が完了しました。検証モードのためメールは送信していません。 / SMTP verified; no email was sent.' },
      { status: 409, headers: { 'Cache-Control': 'no-store' } })
    }
    const customerAutoReplyText = autoReplyText.replace(contactToEmailPlaceholder, smtpConfig.notificationEmail)
    const customerAutoReplyHtml = renderCustomerHtml(customerRows, smtpConfig.notificationEmail)

    // Do not let arbitrary submitted content become an email relay. The
    // customer acknowledgement contains only a fixed receipt and timestamp.
    await mailer.send({
        to: smtpConfig.notificationEmail,
        replyTo: email,
        subject: adminSubject,
        text: adminText,
        html: adminHtml,
      })
    let autoReplyOk = true
    try {
      await mailer.send({
        to: email,
        replyTo: smtpConfig.notificationEmail,
        subject: autoReplySubject,
        text: customerAutoReplyText,
        html: customerAutoReplyHtml,
      })
    } catch (error) {
      autoReplyOk = false
      console.error('[inquiry] Acknowledgement failed after SMTP accepted administrator mail', safeSmtpError(error))
    }

    return NextResponse.json({
      ok: true,
      autoReplyOk,
      receiptNumber,
    }, { headers: { 'Cache-Control': 'no-store' } })
  } catch (error) {
    console.error('[inquiry] SMTP inquiry send failed', safeSmtpError(error))

    return NextResponse.json(
      { ok: false, error: USER_SEND_ERROR },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    )
  } finally {
    mailer?.close()
  }
}
