import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

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

function formatValue(value: string) {
  return value || '未入力'
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

function getSmtpConfig() {
  const contactToEmail = getRequiredEnv('CONTACT_TO_EMAIL')
  const smtpHost = getRequiredEnv('SMTP_HOST')
  const smtpPortValue = getRequiredEnv('SMTP_PORT')
  const smtpUser = getRequiredEnv('SMTP_USER')
  const smtpPass = getRequiredEnv('SMTP_PASS')
  const smtpFrom = getRequiredEnv('SMTP_FROM')
  const smtpPort = smtpPortValue ? Number(smtpPortValue) : NaN
  const requiredEnv = [
    { name: 'CONTACT_TO_EMAIL', value: contactToEmail },
    { name: 'SMTP_HOST', value: smtpHost },
    { name: 'SMTP_PORT', value: smtpPortValue },
    { name: 'SMTP_USER', value: smtpUser },
    { name: 'SMTP_PASS', value: smtpPass },
    { name: 'SMTP_FROM', value: smtpFrom },
  ]
  const missing = requiredEnv.filter(({ value }) => !value).map(({ name }) => name)
  const invalid =
    smtpPortValue && (!Number.isInteger(smtpPort) || smtpPort < 1 || smtpPort > 65535)
      ? ['SMTP_PORT must be an integer between 1 and 65535']
      : []

  if (missing.length > 0 || invalid.length > 0) {
    return {
      ok: false as const,
      missing,
      invalid,
    }
  }

  return {
    ok: true as const,
    contactToEmail: contactToEmail as string,
    smtpHost: smtpHost as string,
    smtpPort,
    smtpUser: smtpUser as string,
    smtpPass: smtpPass as string,
    smtpFrom: smtpFrom as string,
  }
}

async function sendSmtpEmail({
  to,
  from,
  replyTo,
  subject,
  text,
  smtpHost,
  smtpPort,
  smtpUser,
  smtpPass,
}: {
  to: string
  from: string
  replyTo: string
  subject: string
  text: string
  smtpHost: string
  smtpPort: number
  smtpUser: string
  smtpPass: string
}) {
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })

  await transporter.sendMail({
    from,
    to,
    replyTo,
    subject,
    text,
  })
}

function getSafeErrorDetails(error: unknown) {
  if (error instanceof Error) {
    const details = error as Error & {
      code?: unknown
      command?: unknown
      responseCode?: unknown
    }

    return {
      name: error.name,
      message: error.message,
      code: typeof details.code === 'string' ? details.code : undefined,
      command: typeof details.command === 'string' ? details.command : undefined,
      responseCode: typeof details.responseCode === 'number' ? details.responseCode : undefined,
    }
  }

  return {
    message: typeof error === 'string' ? error : 'Unknown SMTP error',
  }
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
  const userAgent = request.headers.get('user-agent') ?? '未取得'

  const inquirySummary = [
    `受付番号：${receiptNumber}`,
    `送信種別：${type === 'quote' ? 'お見積り' : 'お問い合わせ'}`,
    `送信日時：${submittedAt} JST`,
    `お名前：${formatValue(name)}`,
    `会社名：${formatValue(company)}`,
    `メールアドレス：${formatValue(email)}`,
    `電話番号：${formatValue(phone)}`,
    `国・地域：${formatValue(destinationCountry || destination)}`,
    `商品名または商品URL：${formatValue(productName || productUrl)}`,
    `数量：${formatValue(quantity)}`,
    `希望配送方法：${formatValue(shippingMethod)}`,
    `仕向地：${formatValue(normalizedDestination)}`,
    '',
    '--- 追加情報 ---',
    `商品名：${formatValue(productName)}`,
    `商品URL：${formatValue(productUrl)}`,
    `商品カテゴリ：${formatValue(productCategory)}`,
    `単位：${formatValue(quantityUnit)}`,
    `単価：${formatValue(unitPrice)}`,
    `サイズ・重量：${formatValue(sizeWeight)}`,
    `成分・素材：${formatValue(material)}`,
    `都市：${formatValue(destinationCity)}`,
    `希望納期：${formatValue(deadline)}`,
    `法人宛・個人宛：${formatValue(recipientType)}`,
    `表示言語：${formatValue(language)}`,
    '',
    '相談内容・メッセージ：',
    formatValue(message),
  ].join('\n')

  const adminText = [
    '管理用：件名または本文の受付番号で検索・分類してください。',
    `対応ステータス：未対応`,
    '',
    inquirySummary,
    '',
    `送信元ページ：${formatValue(sourcePage)}`,
    `ユーザーエージェント：${userAgent}`,
    `返信先：${email}`,
  ].join('\n')

  try {
    const smtpConfig = getSmtpConfig()

    if (!smtpConfig.ok) {
      console.error('[inquiry] SMTP configuration is missing or invalid', {
        missing: smtpConfig.missing,
        invalid: smtpConfig.invalid,
      })
      return NextResponse.json(
        { ok: false, error: USER_SEND_ERROR },
        { status: 500 },
      )
    }

    await sendSmtpEmail({
      from: smtpConfig.smtpFrom,
      to: smtpConfig.contactToEmail,
      replyTo: email,
      subject: adminSubject,
      text: adminText,
      smtpHost: smtpConfig.smtpHost,
      smtpPort: smtpConfig.smtpPort,
      smtpUser: smtpConfig.smtpUser,
      smtpPass: smtpConfig.smtpPass,
    })

    return NextResponse.json({
      ok: true,
      autoReplyOk: false,
      receiptNumber,
    })
  } catch (error) {
    console.error('[inquiry] SMTP inquiry email send failed', getSafeErrorDetails(error))

    return NextResponse.json(
      { ok: false, error: USER_SEND_ERROR },
      { status: 500 },
    )
  }
}
