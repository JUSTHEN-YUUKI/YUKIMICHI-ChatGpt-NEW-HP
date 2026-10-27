'use client'

import type { ChangeEvent, FormEvent } from 'react'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { translations } from '@/lib/translations'
import { translateStaticText } from '@/lib/staticTextTranslations'
import { buildInquiryEmail, inquiryEmailRecipient } from '@/lib/inquiry-email'
import { analyticsEventNames, trackAnalyticsEvent } from '@/lib/analytics'

type InquiryType = 'quote' | 'contact'

type FormState = {
  company: string
  name: string
  email: string
  productName: string
  productUrl: string
  sdsAvailability: string
  documentUrl: string
  productCategory: string
  quantity: string
  quantityUnit: string
  destination: string
  destinationCountry: string
  destinationCity: string
  deadline: string
  shippingMethod: string
  message: string
  website: string
}

type FieldConfig = {
  readonly name: keyof FormState
  readonly label: string
  readonly placeholder: string
  readonly required?: boolean
  readonly type?: 'email' | 'text' | 'url' | 'number'
  readonly multiline?: boolean
  readonly note?: string
}

type InquiryFormProps = {
  type: InquiryType
  mailtoHref: string
  submissionEnabled?: boolean
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const initialState: FormState = {
  company: '',
  name: '',
  email: '',
  productName: '',
  productUrl: '',
  sdsAvailability: '',
  documentUrl: '',
  productCategory: '',
  quantity: '',
  quantityUnit: '個 / pcs',
  destination: '',
  destinationCountry: '',
  destinationCity: '',
  deadline: '',
  shippingMethod: '',
  message: '',
  website: '',
}

const productCategoryOptions = [
  '未定・相談したい / Not sure yet',
  '食品・飲料 / Food & Beverage',
  '化粧品・美容品 / Cosmetics & Beauty',
  '日用品 / Daily Goods',
  '雑貨 / General Goods',
  'アパレル / Apparel',
  '電子機器 / Electronics',
  'ホビー・キャラクター商品 / Hobby & Character Goods',
  '中古品 / Used Goods',
  'ブランド品 / Branded Items',
  '高額商品 / High-value Items',
  'その他 / Other',
] as const

const quantityUnitOptions = ['個 / pcs', 'セット / sets', '箱 / boxes', 'ケース / cases', 'kg', 'g', 'L', 'ml', 'その他 / Other'] as const

const destinationCountryOptions = [
  '未定 / Not decided',
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Spain',
  'Italy',
  'Australia',
  'New Zealand',
  'Singapore',
  'Hong Kong',
  'Taiwan',
  'China',
  'South Korea',
  'Thailand',
  'Malaysia',
  'Indonesia',
  'Philippines',
  'Vietnam',
  'United Arab Emirates',
  'Saudi Arabia',
  'Mexico',
  'Brazil',
  'Other',
] as const

const deadlineOptions = [
  '未定 / Not decided',
  'できるだけ早く / As soon as possible',
  '1週間以内 / Within 1 week',
  '2週間以内 / Within 2 weeks',
  '1か月以内 / Within 1 month',
  '2〜3か月以内 / Within 2-3 months',
  '定期出荷を相談したい / Regular shipment consultation',
  'その他・相談したい / Other / Need consultation',
] as const

const shippingMethodOptions = [
  '未定・相談したい / Not sure yet',
  '国際エクスプレス（EMS / DHL / FedEx / UPS）',
  'EMS',
  'DHL',
  'FedEx',
  'UPS',
  'ヤマト国際宅急便',
  '航空貨物 / Air Freight',
  '海上輸送 LCL（混載） / Sea Freight LCL',
  '海上輸送 FCL（コンテナ） / Sea Freight FCL',
  '最適な方法を提案してほしい / Please recommend the best option',
] as const

const selectOptions: Partial<Record<keyof FormState, readonly string[]>> = {
  productCategory: productCategoryOptions,
  destinationCountry: destinationCountryOptions,
  deadline: deadlineOptions,
  shippingMethod: shippingMethodOptions,
}

const fieldAutoComplete: Partial<Record<keyof FormState, string>> = {
  company: 'organization',
  name: 'name',
  email: 'email',
  productName: 'off',
  productUrl: 'url',
  sdsAvailability: 'off',
  documentUrl: 'url',
  productCategory: 'off',
  quantity: 'off',
  quantityUnit: 'off',
  destination: 'country-name',
  destinationCountry: 'country-name',
  destinationCity: 'address-level2',
  deadline: 'off',
  shippingMethod: 'off',
  message: 'off',
  website: 'off',
}

type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

const contactFieldDisplayOrder: readonly (keyof FormState)[] = [
  'destinationCountry',
  'destinationCity',
  'productCategory',
]

const alwaysOptionalFieldNames = new Set<keyof FormState>([
  'company',
  'productUrl',
  'sdsAvailability',
  'documentUrl',
  'productCategory',
  'quantity',
  'quantityUnit',
  'destination',
  'destinationCity',
  'deadline',
  'shippingMethod',
  'website',
])

function isFieldRequired(field: FieldConfig) {
  return Boolean(field.required) && !alwaysOptionalFieldNames.has(field.name)
}

function orderContactFields(fields: readonly FieldConfig[]) {
  const fieldByName = new Map(fields.map((field) => [field.name, field]))
  const orderedContactFields = contactFieldDisplayOrder
    .map((name) => fieldByName.get(name))
    .filter((field): field is FieldConfig => Boolean(field))

  if (orderedContactFields.length !== contactFieldDisplayOrder.length) {
    return fields
  }

  const contactFieldNames = new Set<keyof FormState>(contactFieldDisplayOrder)
  const firstContactFieldIndex = fields.findIndex((field) => contactFieldNames.has(field.name))

  return [
    ...fields.slice(0, firstContactFieldIndex).filter((field) => !contactFieldNames.has(field.name)),
    ...orderedContactFields,
    ...fields.slice(firstContactFieldIndex).filter((field) => !contactFieldNames.has(field.name)),
  ]
}

function getFormText(formData: FormData, name: keyof FormState) {
  const value = formData.get(name)
  return typeof value === 'string' ? value.trim() : ''
}

function readSubmittedFormState(formData: FormData): FormState {
  return {
    company: getFormText(formData, 'company'),
    name: getFormText(formData, 'name'),
    email: getFormText(formData, 'email'),
    productName: getFormText(formData, 'productName'),
    productUrl: getFormText(formData, 'productUrl'),
    sdsAvailability: getFormText(formData, 'sdsAvailability'),
    documentUrl: getFormText(formData, 'documentUrl'),
    productCategory: getFormText(formData, 'productCategory'),
    quantity: getFormText(formData, 'quantity'),
    quantityUnit: getFormText(formData, 'quantityUnit') || initialState.quantityUnit,
    destination: getFormText(formData, 'destination'),
    destinationCountry: getFormText(formData, 'destinationCountry'),
    destinationCity: getFormText(formData, 'destinationCity'),
    deadline: getFormText(formData, 'deadline'),
    shippingMethod: getFormText(formData, 'shippingMethod'),
    message: getFormText(formData, 'message'),
    website: getFormText(formData, 'website'),
  }
}

function getAutoComplete(name: keyof FormState) {
  return fieldAutoComplete[name] ?? 'on'
}

function splitBilingualText(text: string) {
  const separator = ' / '
  if (!text.includes(separator)) {
    return { ja: text, en: '' }
  }

  const [ja, ...enParts] = text.split(separator)
  return {
    ja: ja.trim(),
    en: enParts.join(separator).trim(),
  }
}

export default function InquiryForm({ type, mailtoHref, submissionEnabled = true }: InquiryFormProps) {
  const { language } = useLanguage()
  const formCopy = translations[language].forms[type]
  const formCommon = translations[language].forms
  const common = translations[language].common
  const [formState, setFormState] = useState<FormState>(initialState)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [manualMailDraft, setManualMailDraft] = useState('')
  const [manualMailHref, setManualMailHref] = useState<string | null>(null)
  const [copyFeedback, setCopyFeedback] = useState('')
  const [runtimeReady, setRuntimeReady] = useState(false)
  const canSubmit = submissionEnabled && runtimeReady

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/inquiry/status', { cache: 'no-store', signal: controller.signal })
      .then(async response => {
        if (!response.ok) return false
        const result = await response.json()
        return result.available === true
      })
      .then(available => { if (!controller.signal.aborted) setRuntimeReady(available) })
      .catch(() => { if (!controller.signal.aborted) setRuntimeReady(false) })
    return () => controller.abort()
  }, [])
  const formFields = formCopy.fields as readonly FieldConfig[]
  const fields = type === 'contact' ? orderContactFields(formFields) : formFields
  const complianceNotes = formCommon.complianceNotes
  const buttonLabel = formCopy.button
  const sourcePage = type === 'quote' ? '/quote' : '/contact'
  const requiredFields = fields.filter(isFieldRequired)
  const optionalFields = fields.filter((field) => !isFieldRequired(field))
  const optionalDetailsLabel = {
    ja: '任意項目（より正確なお見積りのために）',
    en: 'Optional details for a more accurate quote',
  }

  function updateField(name: keyof FormState, value: string) {
    setFormState((current) => ({ ...current, [name]: value }))
  }

  function syncField(name: keyof FormState) {
    return (event: ChangeEvent<FormControlElement>) => updateField(name, event.currentTarget.value)
  }

  function syncInputField(name: keyof FormState) {
    return (event: FormEvent<FormControlElement>) => updateField(name, event.currentTarget.value)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitState === 'submitting') return
    setFeedbackMessage('')

    const submittedFormState = readSubmittedFormState(new FormData(event.currentTarget))
    const quantityWithUnit = submittedFormState.quantity
      ? [submittedFormState.quantity, submittedFormState.quantityUnit].filter(Boolean).join(' ')
      : ''
    const destinationText =
      [submittedFormState.destinationCountry, submittedFormState.destinationCity].filter(Boolean).join(' / ') ||
      submittedFormState.destination

    setFormState(submittedFormState)
    if (!canSubmit) {
      const draft = buildInquiryEmail(type, submittedFormState)
      setManualMailDraft(draft.body)
      setManualMailHref(draft.href)
      setCopyFeedback('')
      setSubmitState('idle')
      // Mailto URLs are not reliable for long inquiries; never silently truncate.
      if (!draft.href) {
        setFeedbackMessage(language === 'ja'
          ? '入力内容が長いため、自動でメールアプリへ渡していません。下の本文をコピーし、公式メールアドレスへ送信してください。'
          : 'Your message is too long for an email link. Please copy the complete draft below and email it to our official address.')
      } else {
        setFeedbackMessage(language === 'ja'
          ? 'メールアプリで内容を確認し、必ず送信操作をしてください。この画面だけでは受付は完了しません。メールアプリが開かない場合は下の本文をコピーしてください。'
          : 'Please review and SEND the message in your email app. This page has not submitted your inquiry. If no app opens, copy the draft below.')
        window.location.href = draft.href
      }
      return
    }

    setSubmitState('submitting')
    setManualMailDraft('')

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submittedFormState,
          quantity: quantityWithUnit,
          quantityUnit: submittedFormState.quantity ? submittedFormState.quantityUnit : '',
          destination: destinationText,
          type,
          sourcePage,
          language,
        }),
      })

      const result = (await response.json()) as {
        ok?: boolean
        autoReplyOk?: boolean
        receiptNumber?: string
        error?: string
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.error ? translateStaticText(language, result.error) : formCommon.defaultError)
      }

      setSubmitState('success')
      setFeedbackMessage(
        `${result.autoReplyOk === false ? formCommon.successNoAutoReply : formCommon.successAutoReply}${
          result.receiptNumber ? `\n受付番号 / Reference No.: ${result.receiptNumber}` : ''
        }`,
      )
      trackAnalyticsEvent(type === 'quote' ? analyticsEventNames.quoteSubmit : analyticsEventNames.contactSubmit)
      setFormState(initialState)
    } catch (error) {
      setSubmitState('error')
      setFeedbackMessage(error instanceof Error ? error.message : formCommon.defaultError)
    }
  }

  async function copyMailDraft() {
    try {
      await navigator.clipboard.writeText(manualMailDraft)
      setCopyFeedback('コピーしました。メールアプリに貼り付けて送信してください。 / Copied. Paste into your email app and press Send.')
    } catch {
      setCopyFeedback('下の本文を選択して手動でコピーしてください。 / Select the complete draft below and copy it manually.')
    }
  }

  function renderField(field: FieldConfig) {
    const options = selectOptions[field.name]
    const fieldId = `inquiry-${type}-${field.name}`
    const listId = options ? `inquiry-${type}-${field.name}-options` : undefined
    const isRequired = isFieldRequired(field)
    const labelCopy = splitBilingualText(field.label)
    const noteCopy = field.note ? splitBilingualText(field.note) : null
    const fieldClassName = [
      'inquiry-form__field',
      `inquiry-form__field--${field.name}`,
      field.multiline ? 'inquiry-form__field--wide' : '',
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <label className={fieldClassName} htmlFor={fieldId} key={field.name}>
        <span className="inquiry-form__label">
          <span className="inquiry-form__label-text">
            <span lang="ja">{labelCopy.ja}</span>
            {labelCopy.en && <span lang="en">{labelCopy.en}</span>}
          </span>
          {isRequired && <em>{common.required}</em>}
        </span>

        {field.name === 'quantity' ? (
          <div className="inquiry-form__quantity-row">
            <input
              id={fieldId}
              name={field.name}
              type="text"
              inputMode="decimal"
              value={formState.quantity}
              placeholder={field.placeholder}
              required={false}
              aria-required="false"
              autoComplete={getAutoComplete('quantity')}
              onChange={syncField('quantity')}
              onInput={syncInputField('quantity')}
            />
            <select
              id={`inquiry-${type}-quantityUnit`}
              name="quantityUnit"
              value={formState.quantityUnit}
              required={false}
              aria-required="false"
              aria-label="数量単位 / Quantity unit"
              autoComplete={getAutoComplete('quantityUnit')}
              onChange={syncField('quantityUnit')}
              onInput={syncInputField('quantityUnit')}
            >
              {quantityUnitOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ) : field.multiline ? (
          <textarea
            id={fieldId}
            name={field.name}
            value={formState[field.name]}
            placeholder={field.placeholder}
            required={isRequired}
            autoComplete={getAutoComplete(field.name)}
            onChange={syncField(field.name)}
            onInput={syncInputField(field.name)}
          />
        ) : options ? (
          <>
            <input
              id={fieldId}
              name={field.name}
              type="text"
              list={listId}
              value={formState[field.name]}
              placeholder={field.placeholder}
              required={isRequired}
              autoComplete={getAutoComplete(field.name)}
              onChange={syncField(field.name)}
              onInput={syncInputField(field.name)}
            />
            <datalist id={listId}>
              {options.map((option) => (
                <option key={option} value={option} />
              ))}
            </datalist>
          </>
        ) : (
          <input
            id={fieldId}
            name={field.name}
            type={field.type ?? 'text'}
            value={formState[field.name]}
            placeholder={field.placeholder}
            required={isRequired}
            autoComplete={getAutoComplete(field.name)}
            onChange={syncField(field.name)}
            onInput={syncInputField(field.name)}
          />
        )}

        {noteCopy && (
          <small className="inquiry-form__field-note">
            <span lang="ja">{noteCopy.ja}</span>
            {noteCopy.en && <span lang="en">{noteCopy.en}</span>}
          </small>
        )}
      </label>
    )
  }

  return (
    <form autoComplete="on" className={`inquiry-form inquiry-form--${type}`} onSubmit={handleSubmit}>
      <p className="inquiry-form__intro">{formCopy.intro}</p>

      <div className="inquiry-form__grid">
        {requiredFields.map(renderField)}
      </div>

      {optionalFields.length > 0 && (
        <details className="inquiry-form__optional">
          <summary>
            <span lang="ja">{optionalDetailsLabel.ja}</span>
            <span lang="en">{optionalDetailsLabel.en}</span>
          </summary>
          <div className="inquiry-form__grid">{optionalFields.map(renderField)}</div>
        </details>
      )}

      <div className="inquiry-form__honeypot" aria-hidden="true" hidden>
        <input
          id={`inquiry-${type}-website`}
          name="website"
          type="text"
          value={formState.website}
          autoComplete="off"
          tabIndex={-1}
          aria-hidden="true"
          onChange={syncField('website')}
          onInput={syncInputField('website')}
        />
      </div>

      <div className="inquiry-form__notice" aria-label="Important notes">
        {complianceNotes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>

      {!canSubmit && (
        <div className="inquiry-form__notice" role="status">
          <p lang="ja">自動送信は一時停止中です。入力内容からメールを作成できます。メールアプリで内容を確認し、送信操作をしてください。この画面では送信されません。</p>
          <p lang="en">Automatic form submission is temporarily unavailable. You can compose an email using these fields. Your inquiry is sent only after you press Send in your email app.</p>
          <p lang="zh">自动提交暂时不可用。请生成邮件并在邮件应用中点击发送。若无法打开应用或内容较长，请复制下方完整正文，发送至 exporter@justhen.co.jp。本页面不会自动发送。</p>
          <p lang="th">ระบบส่งอัตโนมัติหยุดชั่วคราว กรุณาสร้างอีเมลและกดส่งในแอปอีเมล หากเปิดแอปไม่ได้หรือข้อความยาว ให้คัดลอกข้อความทั้งหมดด้านล่างแล้วส่งไปที่ exporter@justhen.co.jp หน้านี้ไม่ได้ส่งอีเมลให้อัตโนมัติ</p>
          <p lang="es">El envío automático no está disponible. Prepare el correo y pulse Enviar en su aplicación. Si no se abre o el mensaje es largo, copie el texto completo de abajo y envíelo a exporter@justhen.co.jp. Esta página no envía el correo.</p>
          <p><a href={`mailto:${inquiryEmailRecipient}`}>{inquiryEmailRecipient}</a></p>
        </div>
      )}

      {feedbackMessage && (
        <div className={`inquiry-form__feedback inquiry-form__feedback--${submitState}`} role="status">
          {feedbackMessage}
        </div>
      )}

      {manualMailDraft && !canSubmit && (
        <div className="inquiry-form__notice">
          <label htmlFor={`inquiry-${type}-mail-draft`} lang="ja">メール本文（コピー用） / Email draft to copy</label>
          <textarea
            id={`inquiry-${type}-mail-draft`}
            aria-label="Email draft to copy"
            readOnly
            rows={10}
            value={manualMailDraft}
            style={{ width: '100%', minHeight: 160, color: '#fff', background: '#071426', padding: 12, marginTop: 8 }}
          />
          <p>To: {inquiryEmailRecipient}<br />Subject: {type === 'quote' ? 'YUKIMICHI - Export Quotation Request' : 'YUKIMICHI - Contact Inquiry'}</p>
          <div className="inquiry-form__actions">
            <button type="button" onClick={copyMailDraft}>本文をすべてコピー / Copy full message</button>
            {manualMailHref && <a href={manualMailHref}>メールアプリを開く / Open email app</a>}
          </div>
          <p lang="en">If needed, select and copy the complete text above into a new email addressed to exporter@justhen.co.jp. Review it and press Send in your email app.</p>
          {copyFeedback && <p role="status">{copyFeedback}</p>}
        </div>
      )}

      <div className="inquiry-form__actions">
        <button type="submit" disabled={submitState === 'submitting'}>
          {submitState === 'submitting' ? common.submitting : (canSubmit ? buttonLabel : ({
            ja: '入力内容からメールを作成',
            en: 'Continue in email app',
            zh: '生成邮件草稿',
            th: 'ส่งต่อด้วยแอปอีเมล',
            es: 'Continuar en la aplicación de correo',
          } as Record<string, string>)[language] || 'Continue in email app')}
        </button>
        <a href={mailtoHref}>{common.emailUs}</a>
      </div>

      <style>{`
        .inquiry-form {
          --field-bg: rgba(7, 20, 38, 0.86);
          --field-bg-hover: rgba(10, 27, 51, 0.9);
          --field-bg-focus: rgba(13, 28, 53, 0.94);
          --field-border: rgba(138, 143, 153, 0.42);
          --field-text: #f8fafc;
          --field-placeholder: rgba(203, 213, 225, 0.58);
          display: grid;
          gap: 22px;
          width: 100%;
        }

        .inquiry-form__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .inquiry-form__field {
          align-content: start;
          align-self: start;
          display: grid;
          gap: 9px;
          min-width: 0;
        }

        .inquiry-form__field--wide {
          grid-column: 1 / -1;
        }

        .inquiry-form__optional {
          border: 1px solid rgba(201,168,76,0.18);
          background: rgba(201,168,76,0.04);
          padding: 0 18px 18px;
        }

        .inquiry-form__optional summary {
          color: var(--gold);
          cursor: pointer;
          display: grid;
          gap: 3px;
          font-size: 12px;
          letter-spacing: 0.08em;
          line-height: 1.7;
          padding: 16px 0;
        }

        .inquiry-form__optional summary span[lang='en'] {
          color: rgba(248,245,239,0.5);
          font-size: 10.5px;
          letter-spacing: 0.06em;
          line-height: 1.45;
        }

        .inquiry-form__intro {
          border-left: 1px solid rgba(201,168,76,0.5);
          color: var(--washi-dim);
          font-size: 12.5px;
          letter-spacing: 0.04em;
          line-height: 1.9;
          margin: 0;
          padding: 10px 0 10px 14px;
        }

        .inquiry-form__honeypot {
          display: none !important;
        }

        .inquiry-form__label {
          align-items: flex-start;
          color: var(--gold);
          display: flex;
          flex-wrap: nowrap;
          gap: 8px;
          justify-content: flex-start;
          max-width: 100%;
          min-height: 22px;
          width: 100%;
        }

        .inquiry-form__label-text {
          display: grid;
          gap: 3px;
          min-width: 0;
        }

        .inquiry-form__label-text span[lang='ja'] {
          color: var(--gold);
          font-size: 11.5px;
          letter-spacing: 0.14em;
          line-height: 1.55;
        }

        .inquiry-form__label-text span[lang='en'] {
          color: rgba(248,245,239,0.5);
          font-size: 10px;
          letter-spacing: 0.08em;
          line-height: 1.45;
        }

        .inquiry-form--contact .inquiry-form__field--destinationCountry .inquiry-form__label,
        .inquiry-form--contact .inquiry-form__field--destinationCity .inquiry-form__label {
          min-height: 36px;
        }

        .inquiry-form__field em {
          align-items: center;
          border: 1px solid rgba(201,168,76,0.18);
          background: rgba(201,168,76,0.08);
          color: var(--suzu);
          display: inline-flex;
          flex: 0 0 auto;
          font-size: 9px;
          font-style: normal;
          letter-spacing: 0.16em;
          line-height: 1;
          margin-left: 6px;
          padding: 4px 6px;
          white-space: nowrap;
        }

        .inquiry-form input,
        .inquiry-form select,
        .inquiry-form textarea {
          width: 100%;
          border: 1px solid var(--field-border);
          background: var(--field-bg);
          background-color: var(--field-bg);
          box-sizing: border-box;
          caret-color: var(--field-text);
          color: var(--field-text);
          color-scheme: dark;
          font: inherit;
          font-size: 14px;
          letter-spacing: 0.04em;
          line-height: 1.35;
          min-height: 52px;
          outline: none;
          padding: 15px 16px;
          transition:
            border-color 0.2s ease,
            background-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .inquiry-form input,
        .inquiry-form select {
          height: 52px;
        }

        .inquiry-form select {
          appearance: none;
          background:
            linear-gradient(45deg, transparent 50%, var(--gold) 50%),
            linear-gradient(135deg, var(--gold) 50%, transparent 50%),
            var(--field-bg);
          background-position:
            calc(100% - 19px) calc(50% - 3px),
            calc(100% - 14px) calc(50% - 3px),
            0 0;
          background-size:
            5px 5px,
            5px 5px,
            100% 100%;
          background-repeat: no-repeat;
          padding-right: 42px;
        }

        .inquiry-form select option {
          background: #071426;
          background-color: #071426;
          color: var(--field-text);
        }

        .inquiry-form select option:checked,
        .inquiry-form select option:hover {
          background: #0d1c35;
          background-color: #0d1c35;
          color: var(--field-text);
        }

        .inquiry-form__quantity-row {
          align-items: stretch;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(120px, 0.48fr);
          gap: 10px;
        }

        .inquiry-form__quantity-row input,
        .inquiry-form__quantity-row select {
          height: 52px;
          min-height: 52px;
        }

        .inquiry-form__field-note {
          color: var(--washi-dim);
          display: grid;
          gap: 3px;
          font-size: 11px;
          letter-spacing: 0.04em;
          line-height: 1.8;
        }

        .inquiry-form__field-note span[lang='en'] {
          color: rgba(248,245,239,0.48);
        }

        .inquiry-form textarea {
          min-height: 140px;
          resize: vertical;
        }

        .inquiry-form input::placeholder,
        .inquiry-form select:invalid,
        .inquiry-form textarea::placeholder {
          color: var(--field-placeholder);
          opacity: 1;
        }

        .inquiry-form input:hover:not(:disabled),
        .inquiry-form textarea:hover:not(:disabled) {
          border-color: rgba(201,168,76,0.3);
          background-color: var(--field-bg-hover);
        }

        .inquiry-form select:hover:not(:disabled) {
          border-color: rgba(201,168,76,0.3);
          background:
            linear-gradient(45deg, transparent 50%, var(--gold) 50%),
            linear-gradient(135deg, var(--gold) 50%, transparent 50%),
            var(--field-bg-hover);
          background-position:
            calc(100% - 19px) calc(50% - 3px),
            calc(100% - 14px) calc(50% - 3px),
            0 0;
          background-size:
            5px 5px,
            5px 5px,
            100% 100%;
          background-repeat: no-repeat;
        }

        .inquiry-form input:disabled,
        .inquiry-form select:disabled,
        .inquiry-form textarea:disabled {
          border-color: rgba(138,143,153,0.24);
          background: rgba(7,20,38,0.58);
          background-color: rgba(7,20,38,0.58);
          color: rgba(248,250,252,0.62);
          cursor: not-allowed;
          opacity: 1;
          -webkit-text-fill-color: rgba(248,250,252,0.62);
        }

        .inquiry-form input:focus,
        .inquiry-form select:focus,
        .inquiry-form textarea:focus {
          border-color: rgba(201,168,76,0.72);
          background: var(--field-bg-focus);
          background-color: var(--field-bg-focus);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
        }

        .inquiry-form select:focus {
          background:
            linear-gradient(45deg, transparent 50%, var(--gold) 50%),
            linear-gradient(135deg, var(--gold) 50%, transparent 50%),
            var(--field-bg-focus);
          background-position:
            calc(100% - 19px) calc(50% - 3px),
            calc(100% - 14px) calc(50% - 3px),
            0 0;
          background-size:
            5px 5px,
            5px 5px,
            100% 100%;
          background-repeat: no-repeat;
        }

        .inquiry-form input:-webkit-autofill,
        .inquiry-form input:-webkit-autofill:hover,
        .inquiry-form input:-webkit-autofill:focus,
        .inquiry-form textarea:-webkit-autofill,
        .inquiry-form textarea:-webkit-autofill:hover,
        .inquiry-form textarea:-webkit-autofill:focus,
        .inquiry-form select:-webkit-autofill,
        .inquiry-form select:-webkit-autofill:hover,
        .inquiry-form select:-webkit-autofill:focus {
          border-color: var(--field-border);
          caret-color: var(--field-text);
          color: var(--field-text);
          -webkit-text-fill-color: var(--field-text);
          box-shadow: 0 0 0 1000px #071426 inset;
          -webkit-box-shadow: 0 0 0 1000px #071426 inset;
          transition:
            background-color 9999s ease-in-out 0s,
            color 9999s ease-in-out 0s,
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .inquiry-form input:-webkit-autofill:focus,
        .inquiry-form textarea:-webkit-autofill:focus,
        .inquiry-form select:-webkit-autofill:focus {
          border-color: rgba(201,168,76,0.72);
          box-shadow:
            0 0 0 1000px #0d1c35 inset,
            0 0 0 3px rgba(201,168,76,0.12);
          -webkit-box-shadow:
            0 0 0 1000px #0d1c35 inset,
            0 0 0 3px rgba(201,168,76,0.12);
        }

        .inquiry-form__notice {
          display: grid;
          gap: 10px;
          border-left: 2px solid rgba(201,168,76,0.72);
          background: rgba(201,168,76,0.045);
          padding: 16px 18px;
        }

        .inquiry-form__notice p {
          color: var(--washi-dim);
          font-size: 12px;
          letter-spacing: 0.04em;
          line-height: 1.85;
          margin: 0;
        }

        .inquiry-form__feedback {
          border: 1px solid rgba(201,168,76,0.18);
          color: var(--washi);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 1.8;
          padding: 15px 18px;
          white-space: pre-line;
        }

        .inquiry-form__feedback--success {
          background: rgba(201,168,76,0.1);
        }

        .inquiry-form__feedback--error {
          background: rgba(139,30,47,0.22);
        }

        .inquiry-form__actions {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }

        .inquiry-form__actions button {
          align-items: center;
          background: var(--benigara);
          border: 1px solid rgba(201,168,76,0.24);
          color: var(--washi);
          cursor: pointer;
          display: inline-flex;
          font-size: 12px;
          justify-content: center;
          letter-spacing: 0.18em;
          min-height: 48px;
          min-width: 220px;
          padding: 14px 22px;
          text-transform: uppercase;
          transition:
            background 0.2s ease,
            border-color 0.2s ease,
            opacity 0.2s ease,
            transform 0.2s ease;
        }

        .inquiry-form__actions button:hover:not(:disabled) {
          background: var(--benigara);
          border-color: rgba(201,168,76,0.45);
          filter: brightness(1.08);
          transform: translateY(-1px);
        }

        .inquiry-form__actions button:disabled {
          cursor: wait;
          opacity: 0.62;
        }

        .inquiry-form__actions a {
          color: var(--gold);
          font-size: 12px;
          letter-spacing: 0.1em;
          line-height: 1.7;
          text-decoration: none;
        }

        .inquiry-form__actions a:hover {
          color: var(--washi);
        }

        @media (max-width: 720px) {
          .inquiry-form__grid {
            grid-template-columns: 1fr;
          }

          .inquiry-form__quantity-row {
            gap: 8px;
            grid-template-columns: minmax(0, 1fr) minmax(104px, 0.42fr);
          }

          .inquiry-form__actions {
            align-items: stretch;
            flex-direction: column;
          }

          .inquiry-form__actions button {
            width: 100%;
          }
        }
      `}</style>
    </form>
  )
}
