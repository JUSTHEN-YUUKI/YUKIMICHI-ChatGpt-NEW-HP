'use client'

import type { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { translations } from '@/lib/translations'
import { translateStaticText } from '@/lib/staticTextTranslations'

type InquiryType = 'quote' | 'contact'

type FormState = {
  company: string
  name: string
  email: string
  productUrl: string
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
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const initialState: FormState = {
  company: '',
  name: '',
  email: '',
  productUrl: '',
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
  productUrl: 'url',
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
    productUrl: getFormText(formData, 'productUrl'),
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

export default function InquiryForm({ type, mailtoHref }: InquiryFormProps) {
  const { language } = useLanguage()
  const formCopy = translations[language].forms[type]
  const formCommon = translations[language].forms
  const common = translations[language].common
  const [formState, setFormState] = useState<FormState>(initialState)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const formFields = formCopy.fields as readonly FieldConfig[]
  const fields = type === 'contact' ? orderContactFields(formFields) : formFields
  const complianceNotes = formCommon.complianceNotes
  const buttonLabel = formCopy.button
  const sourcePage = type === 'quote' ? '/quote' : '/contact'

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
    setSubmitState('submitting')
    setFeedbackMessage('')

    const submittedFormState = readSubmittedFormState(new FormData(event.currentTarget))
    const quantityWithUnit = [submittedFormState.quantity, submittedFormState.quantityUnit].filter(Boolean).join(' ')
    const destinationText =
      [submittedFormState.destinationCountry, submittedFormState.destinationCity].filter(Boolean).join(' / ') ||
      submittedFormState.destination

    setFormState(submittedFormState)

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...submittedFormState,
          quantity: quantityWithUnit,
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
      setFormState(initialState)
    } catch (error) {
      setSubmitState('error')
      setFeedbackMessage(error instanceof Error ? error.message : formCommon.defaultError)
    }
  }

  return (
    <form autoComplete="on" className={`inquiry-form inquiry-form--${type}`} onSubmit={handleSubmit}>
      <div className="inquiry-form__grid">
        {fields.map((field) => {
          const options = selectOptions[field.name]
          const fieldId = `inquiry-${type}-${field.name}`
          const listId = options ? `inquiry-${type}-${field.name}-options` : undefined
          const showRequiredBadge = field.required && !(type === 'quote' && field.name === 'productUrl')
          const fieldClassName = [
            'inquiry-form__field',
            `inquiry-form__field--${field.name}`,
            field.multiline ? 'inquiry-form__field--wide' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <label
              className={fieldClassName}
              htmlFor={fieldId}
              key={field.name}
            >
              <span className="inquiry-form__label">
                <span>{field.label}</span>
                {showRequiredBadge && <em>{common.required}</em>}
              </span>

              {field.name === 'quantity' ? (
                <div className="inquiry-form__quantity-row">
                  <input
                    id={fieldId}
                    name={field.name}
                    type="number"
                    min="0"
                    step="1"
                    inputMode="decimal"
                    value={formState.quantity}
                    placeholder={field.placeholder}
                    required={field.required}
                    autoComplete={getAutoComplete('quantity')}
                    onChange={syncField('quantity')}
                    onInput={syncInputField('quantity')}
                  />
                  <select
                    id={`inquiry-${type}-quantityUnit`}
                    name="quantityUnit"
                    value={formState.quantityUnit}
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
                  required={field.required}
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
                    required={field.required}
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
                  required={field.required}
                  autoComplete={getAutoComplete(field.name)}
                  onChange={syncField(field.name)}
                  onInput={syncInputField(field.name)}
                />
              )}

              {field.note && <small className="inquiry-form__field-note">{field.note}</small>}
            </label>
          )
        })}
      </div>

      <label className="inquiry-form__honeypot" htmlFor={`inquiry-${type}-website`} aria-hidden="true">
        <span>Website</span>
        <input
          id={`inquiry-${type}-website`}
          name="website"
          type="text"
          value={formState.website}
          autoComplete="off"
          tabIndex={-1}
          onChange={syncField('website')}
          onInput={syncInputField('website')}
        />
      </label>

      <div className="inquiry-form__notice" aria-label="Important notes">
        {complianceNotes.map((note) => (
          <p key={note}>{note}</p>
        ))}
      </div>

      {feedbackMessage && (
        <div className={`inquiry-form__feedback inquiry-form__feedback--${submitState}`} role="status">
          {feedbackMessage}
        </div>
      )}

      <div className="inquiry-form__actions">
        <button type="submit" disabled={submitState === 'submitting'}>
          {submitState === 'submitting' ? common.submitting : buttonLabel}
        </button>
        <a href={mailtoHref}>{common.emailUs}</a>
      </div>

      <style>{`
        .inquiry-form {
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

        .inquiry-form__honeypot {
          height: 1px;
          left: -10000px;
          overflow: hidden;
          position: absolute;
          width: 1px;
        }

        .inquiry-form__label {
          align-items: center;
          color: var(--gold);
          display: flex;
          flex-wrap: nowrap;
          font-size: 11px;
          gap: 8px;
          justify-content: flex-start;
          letter-spacing: 0.18em;
          line-height: 1.6;
          max-width: 100%;
          min-height: 22px;
          text-transform: uppercase;
          width: fit-content;
        }

        .inquiry-form__label > span {
          min-width: 0;
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
          border: 1px solid rgba(248,245,239,0.16);
          background: rgba(7,17,31,0.84);
          box-sizing: border-box;
          color: var(--washi);
          font: inherit;
          font-size: 14px;
          letter-spacing: 0.04em;
          line-height: 1.35;
          min-height: 52px;
          outline: none;
          padding: 15px 16px;
          transition:
            border-color 0.2s ease,
            background 0.2s ease,
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
            rgba(7,17,31,0.84);
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
          background: var(--navy-deep);
          color: var(--washi);
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
          font-size: 11px;
          letter-spacing: 0.04em;
          line-height: 1.8;
        }

        .inquiry-form textarea {
          min-height: 140px;
          resize: vertical;
        }

        .inquiry-form input::placeholder,
        .inquiry-form select:invalid,
        .inquiry-form textarea::placeholder {
          color: rgba(216,211,199,0.45);
        }

        .inquiry-form input:focus,
        .inquiry-form select:focus,
        .inquiry-form textarea:focus {
          border-color: rgba(201,168,76,0.55);
          background: rgba(13,28,53,0.92);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
        }

        .inquiry-form select:focus {
          background:
            linear-gradient(45deg, transparent 50%, var(--gold) 50%),
            linear-gradient(135deg, var(--gold) 50%, transparent 50%),
            rgba(13,28,53,0.92);
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
