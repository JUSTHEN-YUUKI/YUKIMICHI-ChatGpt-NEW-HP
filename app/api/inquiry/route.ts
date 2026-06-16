import { NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

export const runtime = 'nodejs'
export const preferredRegion = 'hnd1'

type InquiryType = 'quote' | 'contact'

type InquiryPayload = {
  type?: unknown
  company?: unknown
  name?: unknown
  email?: unknown
  productUrl?: unknown
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
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
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

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim()
  return value || null
}

function getSendGridConfig() {
  const contactToEmail = getRequiredEnv('CONTACT_TO_EMAIL')
  const sendGridApiKey = getRequiredEnv('SENDGRID_API_KEY')
  const sendGridFromEmail = getRequiredEnv('SENDGRID_FROM_EMAIL')
  const requiredEnv = [
    { name: 'CONTACT_TO_EMAIL', value: contactToEmail },
    { name: 'SENDGRID_API_KEY', value: sendGridApiKey },
    { name: 'SENDGRID_FROM_EMAIL', value: sendGridFromEmail },
  ]
  const missing = requiredEnv.filter(({ value }) => !value).map(({ name }) => name)

  if (missing.length > 0) {
    return {
      ok: false as const,
      missing,
    }
  }

  return {
    ok: true as const,
    contactToEmail: contactToEmail as string,
    sendGridApiKey: sendGridApiKey as string,
    sendGridFromEmail: sendGridFromEmail as string,
  }
}

async function sendSendGridEmail({
  to,
  from,
  replyTo,
  subject,
  text,
  html,
  sendGridApiKey,
}: {
  to: string
  from: string
  replyTo: string
  subject: string
  text: string
  html: string
  sendGridApiKey: string
}) {
  sgMail.setApiKey(sendGridApiKey)
  await sgMail.send({
    from,
    to,
    replyTo,
    subject,
    text,
    html,
  })
}

function getSafeErrorDetails(error: unknown) {
  if (error instanceof Error) {
    const details = error as Error & {
      code?: unknown
      command?: unknown
      responseCode?: unknown
      response?: {
        statusCode?: unknown
      }
    }

    return {
      name: error.name,
      message: error.message,
      code: typeof details.code === 'string' ? details.code : undefined,
      command: typeof details.command === 'string' ? details.command : undefined,
      responseCode: typeof details.responseCode === 'number' ? details.responseCode : undefined,
      responseStatusCode: typeof details.response?.statusCode === 'number' ? details.response.statusCode : undefined,
    }
  }

  return {
    message: typeof error === 'string' ? error : 'Unknown SendGrid error',
  }
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
    '<p>このたびは、YUKIMICHI - SNOWPATH JAPAN へお問い合わせいただきありがとうございます。</p>',
    '<p>以下の内容でお問い合わせを受け付けました。</p>',
    `<table style="border-collapse: collapse; width: 100%; max-width: 760px;">${tableRows}</table>`,
    `<p>内容を確認のうえ、担当者より ${escapeHtml(contactToEmail)} からご連絡いたします。</p>`,
    '<p>商品内容、配送先国、数量、サイズ、重量、用途により、対応可否・費用・納期は変動します。最終的な輸出入可否、関税、VAT/GST、配送会社引受可否は、税関・通関業者・配送会社・公的機関等の確認が前提となります。</p>',
    '<p>YUKIMICHI - SNOWPATH JAPAN<br>JUSTHEN CO., LTD.</p>',
    '<p>※本メールは自動返信です。</p>',
    '</div>',
  ].join('')
}

export async function POST(request: Request) {
  let payload: InquiryPayload

  try {
    payload = (await request.json()) as InquiryPayload
  } catch {
    return NextResponse.json(
      { ok: false, error: '入力内容を確認してください。' },
      { status: 400 },
    )
  }

  const type = normalizeType(payload.type)
  const company = toText(payload.company, 300)
  const name = toText(payload.name, 200)
  const email = toText(payload.email, 300)
  const productUrl = toText(payload.productUrl, 1000)
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
  const quoteMissingRequired =
    type === 'quote' && (!productUrl || !quantity || !normalizedDestination || !deadline || !shippingMethod || !message)
  const contactMissingRequired = type === 'contact' && (!normalizedDestination || !message)

  if (!type || !name || !email || !isEmail(email) || quoteMissingRequired || contactMissingRequired) {
    return NextResponse.json(
      { ok: false, error: '入力内容を確認してください。' },
      { status: 400 },
    )
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
  const quantityText = type === 'quote' && quantity !== quantityUnit ? quantity : ''
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
    ['Product Category', productCategory],
    ['Quantity', quantityText],
    ['Destination', normalizedDestination],
    ['Shipping Method', shippingMethod],
    ['Submitted At', `${submittedAt} JST`],
    ['Source Page', sourcePage],
  ])
  const sendGridAdminText = [
    'YUKIMICHI inquiry received.',
    '',
    renderRowsText(adminRows),
    ...(message ? ['', `Message: ${message}`] : []),
  ].join('\n')
  const adminHtml = renderAdminHtml(adminRows, message)
  const customerRows = getDisplayRows([
    ['受付番号 / Reference No.', receiptNumber],
    ['送信種別 / Type', type],
    ['会社名 / Company', company],
    ['ご担当者名 / Name', name],
    ['メールアドレス / Email', email],
    ['電話番号 / Phone', phone],
    ['国 / Country', destinationCountry || destination],
    ['商品名 / Product Name', productName],
    ['商品URL / Product URL', productUrl],
    ['商品カテゴリ / Product Category', productCategory],
    ['数量 / Quantity', quantityText],
    ['配送先 / Destination', normalizedDestination],
    ['配送方法 / Shipping Method', shippingMethod],
    ['メッセージ / Message', message],
    ['送信日時 / Submitted At', `${submittedAt} JST`],
    ['送信元ページ / Source Page', sourcePage],
  ])
  const autoReplySubject =
    type === 'quote'
      ? `【YUKIMICHI】お見積り依頼を受け付けました（${receiptNumber}）`
      : `【YUKIMICHI】お問い合わせを受け付けました（${receiptNumber}）`
  const contactToEmailPlaceholder = '{{CONTACT_TO_EMAIL}}'
  const autoReplyText = [
    `${name} 様`,
    '',
    'このたびは、YUKIMICHI - SNOWPATH JAPAN へお問い合わせいただきありがとうございます。',
    '以下の内容でお問い合わせを受け付けました。',
    '',
    renderRowsText(customerRows),
    '',
    `内容を確認のうえ、担当者より ${contactToEmailPlaceholder} からご連絡いたします。`,
    '',
    '商品内容、配送先国、数量、サイズ、重量、用途により、対応可否・費用・納期は変動します。',
    '最終的な輸出入可否、関税、VAT/GST、配送会社引受可否は、税関・通関業者・配送会社・公的機関等の確認が前提となります。',
    '',
    'YUKIMICHI - SNOWPATH JAPAN',
    'JUSTHEN CO., LTD.',
    '',
    '※本メールは自動返信です。',
  ].join('\n')

  try {
    const sendGridConfig = getSendGridConfig()

    if (!sendGridConfig.ok) {
      console.error('[inquiry] SendGrid configuration is missing', {
        missing: sendGridConfig.missing,
      })
      return NextResponse.json(
        { ok: false, error: USER_SEND_ERROR },
        { status: 500 },
      )
    }

    const customerAutoReplyText = autoReplyText.replace(contactToEmailPlaceholder, sendGridConfig.contactToEmail)
    const customerAutoReplyHtml = renderCustomerHtml(customerRows, sendGridConfig.contactToEmail)

    await Promise.all([
      sendSendGridEmail({
        from: sendGridConfig.sendGridFromEmail,
        to: sendGridConfig.contactToEmail,
        replyTo: email,
        subject: adminSubject,
        text: sendGridAdminText,
        html: adminHtml,
        sendGridApiKey: sendGridConfig.sendGridApiKey,
      }),
      sendSendGridEmail({
        from: sendGridConfig.sendGridFromEmail,
        to: email,
        replyTo: sendGridConfig.contactToEmail,
        subject: autoReplySubject,
        text: customerAutoReplyText,
        html: customerAutoReplyHtml,
        sendGridApiKey: sendGridConfig.sendGridApiKey,
      }),
    ])

    return NextResponse.json({
      ok: true,
      autoReplyOk: true,
      receiptNumber,
    })
  } catch (error) {
    console.error('[inquiry] SendGrid inquiry email send failed', getSafeErrorDetails(error))

    return NextResponse.json(
      { ok: false, error: USER_SEND_ERROR },
      { status: 500 },
    )
  }
}
