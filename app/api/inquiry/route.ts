import { NextResponse } from 'next/server'

type InquiryType = 'quote' | 'contact'

type InquiryPayload = {
  type?: unknown
  company?: unknown
  name?: unknown
  email?: unknown
  productUrl?: unknown
  quantity?: unknown
  destination?: unknown
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
}

const INQUIRY_TO = 'exporter@justhen.co.jp'

type ResendEmailPayload = {
  from: string
  to: string[]
  bcc?: string[]
  reply_to: string
  subject: string
  text: string
}

function toText(value: unknown, maxLength = 2000) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, maxLength)
}

function parseBccEmails(value: string | undefined) {
  if (!value) return []
  return value
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
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

async function sendResendEmail(resendApiKey: string, payload: ResendEmailPayload) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
}

export async function POST(request: Request) {
  const resendApiKey = process.env.RESEND_API_KEY
  const resendFromEmail = process.env.RESEND_FROM_EMAIL

  if (!resendApiKey || !resendFromEmail) {
    return NextResponse.json(
      { ok: false, error: 'メール送信設定が未完了です。' },
      { status: 500 },
    )
  }

  const bccEmails = parseBccEmails(process.env.INQUIRY_BCC_EMAILS)

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
  const quantity = toText(payload.quantity, 200)
  const destination = toText(payload.destination, 300)
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

  if (!type || !name || !email || !isEmail(email) || (!destination && !message)) {
    return NextResponse.json(
      { ok: false, error: '入力内容を確認してください。' },
      { status: 400 },
    )
  }

  const requester = company || name
  const adminSubjectPrefix = type === 'quote' ? '【YUKIMICHI 見積依頼】' : '【YUKIMICHI お問い合わせ】'
  const adminSubject = `${adminSubjectPrefix}${requester}`
  const autoReplySubject =
    type === 'quote'
      ? '【YUKIMICHI】お見積り依頼を受け付けました'
      : '【YUKIMICHI】お問い合わせを受け付けました'
  const submittedAt = new Date().toLocaleString('ja-JP', {
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
    `送信種別：${type === 'quote' ? 'お見積り' : 'お問い合わせ'}`,
    `会社名：${formatValue(company)}`,
    `ご担当者名：${formatValue(name)}`,
    `メールアドレス：${formatValue(email)}`,
    `電話番号：${formatValue(phone)}`,
    `商品名：${formatValue(productName)}`,
    `商品URL：${formatValue(productUrl)}`,
    `数量：${formatValue(quantity)}`,
    `単価：${formatValue(unitPrice)}`,
    `サイズ・重量：${formatValue(sizeWeight)}`,
    `成分・素材：${formatValue(material)}`,
    `配送先国・都市：${formatValue(destination)}`,
    `希望納期：${formatValue(deadline)}`,
    `希望配送方法：${formatValue(shippingMethod)}`,
    `法人宛・個人宛：${formatValue(recipientType)}`,
    '',
    '相談内容：',
    formatValue(message),
  ].join('\n')

  const adminText = [
    inquirySummary,
    '',
    `送信元ページ：${formatValue(sourcePage)}`,
    `送信日時：${submittedAt} JST`,
    `ユーザーエージェント：${userAgent}`,
    `返信先：${email}`,
  ].join('\n')

  const autoReplyText = [
    `${name} 様`,
    '',
    'このたびは、YUKIMICHI – SNOWPATH JAPAN へお問い合わせいただきありがとうございます。',
    '以下の内容でお問い合わせを受け付けました。',
    '',
    inquirySummary,
    '',
    `内容を確認のうえ、担当者より ${INQUIRY_TO} からご連絡いたします。`,
    '',
    'なお、商品内容、配送先国、数量、サイズ、重量、用途により、対応可否・費用・納期は変動します。',
    '医薬品、食品、化粧品、電池、危険品、中古品、ブランド品、動植物由来素材などは事前確認が必要です。',
    '最終的な輸出入可否、関税、VAT/GST、配送会社引受可否は、税関・通関業者・配送会社・公的機関等の確認が前提となります。',
    '',
    'YUKIMICHI – SNOWPATH JAPAN',
    'JUSTHEN CO., LTD.',
    INQUIRY_TO,
    '',
    '※本メールは自動返信です。',
  ].join('\n')

  try {
    const adminResponse = await sendResendEmail(resendApiKey, {
      from: resendFromEmail,
      to: [INQUIRY_TO],
      ...(bccEmails.length > 0 ? { bcc: bccEmails } : {}),
      reply_to: email,
      subject: adminSubject,
      text: adminText,
    })

    if (!adminResponse.ok) {
      const errorText = await adminResponse.text()
      console.error('Resend admin email send failed:', errorText.slice(0, 1000))

      return NextResponse.json(
        { ok: false, error: '送信に失敗しました。時間をおいて再度お試しください。' },
        { status: 502 },
      )
    }

    const autoReplyResponse = await sendResendEmail(resendApiKey, {
      from: resendFromEmail,
      to: [email],
      reply_to: INQUIRY_TO,
      subject: autoReplySubject,
      text: autoReplyText,
    })

    if (!autoReplyResponse.ok) {
      const errorText = await autoReplyResponse.text()
      console.error('Resend auto reply email send failed:', errorText.slice(0, 1000))

      return NextResponse.json({
        ok: true,
        autoReplyOk: false,
      })
    }

    return NextResponse.json({
      ok: true,
      autoReplyOk: true,
    })
  } catch (error) {
    console.error('Inquiry email send failed:', error)

    return NextResponse.json(
      { ok: false, error: '送信に失敗しました。時間をおいて再度お試しください。' },
      { status: 500 },
    )
  }
}
