'use client'

import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import Link from 'next/link'
import Bilingual from './Bilingual'
import { tcgEmailDraft, validateTcgInquiry } from '@/lib/tcg/inquiry'

function Field({ name, ja, en, required = false, wide = false, children }: {
  name: string; ja: string; en: string; required?: boolean; wide?: boolean; children: ReactNode
}) {
  return <div className={`tcg-field${wide ? ' tcg-wide' : ''}`}>
    <label htmlFor={`tcg-${name}`}><Bilingual ja={ja} en={en} /><em>{required ? '必須 / Required' : '任意 / Optional'}</em></label>
    {children}
  </div>
}

export default function TcgQuoteForm({ initialCategory, initialProduct }: { initialCategory: string; initialProduct: string }) {
  const [businessType, setBusinessType] = useState('company')
  const [ready, setReady] = useState<boolean | null>(null)
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')
  const [draft, setDraft] = useState<ReturnType<typeof tcgEmailDraft> | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(() => { controller.abort(); setReady(false) }, 10000)
    fetch('/api/inquiry/status', { cache: 'no-store', signal: controller.signal })
      .then(async response => response.ok && (await response.json()).available === true)
      .then(value => { if (!controller.signal.aborted) setReady(value) })
      .catch(() => { if (!controller.signal.aborted) setReady(false) })
      .finally(() => clearTimeout(timer))
    return () => { clearTimeout(timer); controller.abort() }
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (state === 'sending' || state === 'success' || ready === null) return
    const values = Object.fromEntries(new FormData(event.currentTarget).entries())
    const result = validateTcgInquiry(values)
    setFeedback('')
    setCopied(false)
    if (!result.ok) {
      setState('error')
      setFeedback('必須項目、数量（1～1,000,000）、URL、同意チェックを確認してください。\nPlease check required fields, quantity (1–1,000,000), website URL, and consent.')
      return
    }
    const intent = (event.nativeEvent as SubmitEvent).submitter?.getAttribute('value')
    if (!ready || intent === 'draft') {
      setDraft(tcgEmailDraft(result.values))
      setState('idle')
      setFeedback('メール下書きを作成しました。この画面では送信していません。メールアプリで内容を確認して送信してください。\nAn email draft is ready. Your inquiry has NOT been sent. Review and send it from your email app.')
      return
    }
    setDraft(null)
    setState('sending')
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 30000)
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, signal: controller.signal,
        body: JSON.stringify({ ...result.values, type: 'tcg-quote', sourcePage: '/tcg/quote', language: 'ja-en' }),
      })
      const received = await response.json()
      if (!response.ok || received.ok !== true || typeof received.receiptNumber !== 'string') {
        if (response.status === 503) setReady(false)
        throw new Error('送信を確認できませんでした。入力内容は保持しています。メール下書きからのご連絡も可能です。\nSubmission could not be confirmed. Your entries are retained. You can also prepare an email draft below.')
      }
      setState('success')
      setFeedback(`見積依頼を受け付けました。供給・価格・取引条件は確認後にご案内します。\nYour inquiry has been accepted for review. Supply, pricing, and terms remain subject to confirmation.\n受付番号 / Reference: ${received.receiptNumber}${received.autoReplyOk === false ? '\n確認メールを送信できませんでしたが、担当窓口への通知は受理されています。\nThe acknowledgement could not be sent; the administrator notification was accepted.' : ''}`)
    } catch (error) {
      setState('error')
      setFeedback(error instanceof Error && error.name !== 'AbortError' ? error.message : '送信結果を確認できませんでした。入力内容は保持しています。再送前にメールでご確認ください。\nThe submission outcome could not be confirmed. Your entries are retained. Please check with us by email before resubmitting.')
    } finally { clearTimeout(timer) }
  }

  async function copyDraft() {
    if (!draft) return
    try { await navigator.clipboard.writeText(draft.body); setCopied(true) }
    catch { setCopied(false); setFeedback('下書き欄の本文を選択してコピーしてください。\nPlease select and copy the text in the draft field.') }
  }

  return <form className="tcg-form-shell" onSubmit={submit} autoComplete="on">
    <div className="tcg-availability" role="status">
      {ready === null ? <Bilingual ja="受付方法を確認しています。" en="Checking the available inquiry method." />
        : ready ? <Bilingual ja="必要事項をご入力ください。見積依頼のみでは購入義務は生じません。" en="Please complete the required fields. A quote request alone does not commit you to a purchase." />
          : <Bilingual ja="現在、自動受付を停止しています。入力内容からメール下書きを作成できます。メールアプリで送信するまで受付は完了しません。" en="Automatic form submission is currently unavailable. You can prepare an email draft using this form. Your inquiry is not sent until you send it from your email app." />}
    </div>
    <fieldset className="tcg-form-fields" disabled={state === 'sending' || state === 'success'}>
      <legend className="tcg-form-legend"><Bilingual ja="ご依頼内容" en="Your Inquiry" /></legend>
      <div className="tcg-form-grid">
        <Field name="businessType" ja="事業形態" en="Business Type" required>
          <select id="tcg-businessType" name="businessType" value={businessType} onChange={event => setBusinessType(event.target.value)} required>
            <option value="company">法人 / Company</option><option value="sole_proprietor">個人事業主 / Sole Proprietor</option>
          </select>
        </Field>
        <Field name="company" ja="会社名または屋号" en="Company or Business Name" required={businessType === 'company'}>
          <input id="tcg-company" name="company" autoComplete="organization" maxLength={300} required={businessType === 'company'} />
          {businessType === 'sole_proprietor' && <small className="tcg-field-note"><Bilingual ja="屋号は任意です。担当者氏名でお問い合わせいただけます。" en="A trading name is optional. You may inquire using your own name." /></small>}
        </Field>
        <Field name="name" ja="担当者氏名" en="Contact Person" required><input id="tcg-name" name="name" autoComplete="name" required maxLength={200} /></Field>
        <Field name="businessCountry" ja="国・地域" en="Country or Region" required><input id="tcg-businessCountry" name="businessCountry" autoComplete="country-name" required maxLength={200} /></Field>
        <Field name="email" ja="メールアドレス" en="Email" required><input id="tcg-email" name="email" type="email" autoComplete="email" required maxLength={300} /></Field>
        <Field name="businessWebsite" ja="事業用Webサイト・ECサイトURL" en="Business Website"><input id="tcg-businessWebsite" name="businessWebsite" type="url" autoComplete="url" placeholder="https://" maxLength={1000} /></Field>
        <Field name="tcgCategory" ja="商品カテゴリー" en="Product Category" required wide>
          <select id="tcg-tcgCategory" name="tcgCategory" required defaultValue={initialCategory}>
            <option value="">選択してください / Please select</option><option value="pokemon">ポケモンカード / Pokémon TCG</option><option value="onepiece">ワンピースカード / ONE PIECE TCG</option>
          </select>
        </Field>
        <Field name="productName" ja="希望商品" en="Requested Products" required wide><textarea id="tcg-productName" name="productName" required maxLength={500} defaultValue={initialProduct} placeholder="商品名・シリーズ・参考URL / Product name, series, or reference URL" /></Field>
        <Field name="quantity" ja="希望数量" en="Requested Quantity" required><input id="tcg-quantity" name="quantity" type="text" inputMode="numeric" pattern="[1-9][0-9]{0,6}" required maxLength={7} placeholder="例 / e.g. 10" /><small className="tcg-field-note"><Bilingual ja="1～1,000,000の整数。数量は希望であり、MOQの確約ではありません。" en="A whole number from 1 to 1,000,000. This is your request, not a confirmed MOQ." /></small></Field>
        <Field name="quantityUnit" ja="希望単位" en="Requested Order Unit" required><select id="tcg-quantityUnit" name="quantityUnit" required defaultValue=""><option value="">選択してください / Please select</option><option value="BOX">BOX / ボックス</option><option value="CASE">CASE / ケース</option></select><small className="tcg-field-note"><Bilingual ja="ケース入数・未開封条件は別途確認します。マスターケースのご希望はその他要望へご記入ください。" en="Case contents and factory-sealed condition require confirmation. Note master-case requests under Additional Requirements." /></small></Field>
        <Field name="destinationCountry" ja="配送先国" en="Destination Country" required><input id="tcg-destinationCountry" name="destinationCountry" autoComplete="shipping country-name" required maxLength={200} /></Field>
        <Field name="destinationCity" ja="配送先都市" en="Destination City" required><input id="tcg-destinationCity" name="destinationCity" autoComplete="shipping address-level2" required maxLength={200} /></Field>
        <Field name="deadline" ja="希望納期" en="Preferred Delivery Schedule" wide><input id="tcg-deadline" name="deadline" maxLength={300} placeholder="ご希望を記入 / Tell us your preferred timing" /></Field>
        <Field name="message" ja="その他要望" en="Additional Requirements" wide><textarea id="tcg-message" name="message" maxLength={5000} /></Field>
      </div>
      <div className="tcg-honeypot" hidden aria-hidden="true"><input name="website" type="text" tabIndex={-1} autoComplete="off" aria-label="Leave empty" /></div>
      <label className="tcg-consent"><input name="tcgConsent" value="accepted" type="checkbox" required /><span>
        <span lang="ja">事業用の見積依頼であり、<Link href="/privacy" target="_blank" rel="noopener noreferrer">個人情報の取扱い</Link>および仕入れ可否・価格・梱包条件等が個別確認となることに同意します。</span>
        <span lang="en" className="tcg-en">I am inquiring for business purposes, acknowledge the <Link href="/privacy" target="_blank" rel="noopener noreferrer">privacy notice</Link>, and understand that supply, pricing, and packaging terms require individual confirmation.</span>
      </span></label>
    </fieldset>
    {feedback && <div className={`tcg-feedback tcg-feedback-${state}`} role="status" aria-live="polite">{feedback}</div>}
    {state !== 'success' && <div className="tcg-draft-actions">
      <button className="tcg-button" type="submit" name="intent" value="send" disabled={state === 'sending' || ready === null}>
        <Bilingual ja={state === 'sending' ? '送信中…' : ready ? '見積依頼を送信' : 'メール下書きを作成'} en={state === 'sending' ? 'Submitting…' : ready ? 'Submit Quote Request' : 'Prepare Email Draft'} /><span aria-hidden="true">↗</span>
      </button>
      {ready === true && <button type="submit" name="intent" value="draft" disabled={state === 'sending'}><Bilingual ja="メール下書きを作成" en="Prepare Email Draft" /></button>}
    </div>}
    {draft && <div className="tcg-draft"><label htmlFor="tcg-email-draft"><Bilingual ja="メール本文（コピー用・未送信）" en="Email Draft to Copy — Not Sent" /></label>
      <textarea id="tcg-email-draft" readOnly value={draft.body} />
      <div className="tcg-draft-actions">{draft.href.length <= 1800 && <a className="tcg-text-link" href={draft.href}><Bilingual ja="メールアプリで開く" en="Open in Email App" /></a>}<button type="button" onClick={copyDraft}><Bilingual ja={copied ? 'コピーしました' : '本文をコピー'} en={copied ? 'Copied' : 'Copy Draft'} /></button></div>
      <p><Bilingual ja="宛先：exporter@justhen.co.jp。長い本文はコピーしてメールアプリへ貼り付け、内容を確認して送信してください。"
        en="Send to exporter@justhen.co.jp. For longer drafts, copy the text into your email app, review it, and send it there." /></p>
    </div>}
    <p className="tcg-form-footer"><Bilingual ja="仕入れ可否・供給・納期は保証されません。お困りの場合は公式窓口へご連絡ください。" en="Sourcing, supply, and delivery times are not guaranteed. For assistance, contact our official mailbox." /><a href="mailto:exporter@justhen.co.jp">exporter@justhen.co.jp</a></p>
  </form>
}
