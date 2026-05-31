'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'

type InquiryType = 'quote' | 'contact'

type FormState = {
  company: string
  name: string
  email: string
  productUrl: string
  quantity: string
  destination: string
  deadline: string
  shippingMethod: string
  message: string
}

type FieldConfig = {
  name: keyof FormState
  label: string
  placeholder: string
  required?: boolean
  type?: 'email' | 'text' | 'url'
  multiline?: boolean
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
  quantity: '',
  destination: '',
  deadline: '',
  shippingMethod: '',
  message: '',
}

const complianceNotes = [
  '商品内容、配送先国、数量、サイズ、重量、用途により対応可否・費用は変動します。',
  '医薬品、食品、化粧品、電池、危険品、中古品、ブランド品、動植物由来素材などは事前確認が必要です。',
  '最終的な輸出入可否、関税、VAT/GST、配送会社引受可否は、税関・通関業者・配送会社・公的機関等の確認が前提です。',
]

const quoteFields: FieldConfig[] = [
  { name: 'company', label: '会社名 / Company', placeholder: 'Example Trading Co., Ltd.' },
  { name: 'name', label: 'ご担当者名 / Name', placeholder: 'Your name', required: true },
  { name: 'email', label: 'メールアドレス / Email', placeholder: 'buyer@example.com', required: true, type: 'email' },
  { name: 'productUrl', label: '商品URL / Product URL', placeholder: 'https://example.com/product', required: true, type: 'url' },
  { name: 'quantity', label: '数量 / Quantity', placeholder: '10 units', required: true },
  { name: 'destination', label: '配送先国・都市 / Destination', placeholder: 'Country / City', required: true },
  { name: 'deadline', label: '希望納期 / Deadline', placeholder: 'Example: Within 2 weeks', required: true },
  { name: 'shippingMethod', label: '希望配送方法 / Shipping Method', placeholder: 'EMS / DHL / Air Freight / Sea Freight' },
  { name: 'message', label: '相談内容 / Message', placeholder: '商品名、用途、梱包条件、確認したい事項など', multiline: true },
]

const contactFields: FieldConfig[] = [
  { name: 'company', label: '会社名 / Company', placeholder: 'Example Trading Co., Ltd.' },
  { name: 'name', label: 'ご担当者名 / Name', placeholder: 'Your name', required: true },
  { name: 'email', label: 'メールアドレス / Email', placeholder: 'buyer@example.com', required: true, type: 'email' },
  { name: 'productUrl', label: '商品URL / Product URL', placeholder: 'https://example.com/product', type: 'url' },
  { name: 'destination', label: '配送先国・都市 / Destination', placeholder: 'Country / City' },
  { name: 'message', label: '相談内容 / Message', placeholder: '商品調達、国際配送、取扱可否確認など', required: true, multiline: true },
]

const successMessageWithAutoReply =
  '送信が完了しました。入力いただいたメールアドレス宛に受付確認メールをお送りしました。内容を確認のうえ、exporter@justhen.co.jp よりご連絡いたします。'

const successMessageWithoutAutoReply =
  '送信が完了しました。内容を確認のうえ、exporter@justhen.co.jp よりご連絡いたします。'

const defaultErrorMessage =
  '送信に失敗しました。お手数ですが、exporter@justhen.co.jp へ直接ご連絡ください。'

export default function InquiryForm({ type, mailtoHref }: InquiryFormProps) {
  const [formState, setFormState] = useState<FormState>(initialState)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const fields = type === 'quote' ? quoteFields : contactFields
  const buttonLabel = type === 'quote' ? '見積内容を送信する' : 'お問い合わせを送信する'
  const sourcePage = type === 'quote' ? '/quote' : '/contact'

  function updateField(name: keyof FormState, value: string) {
    setFormState((current) => ({ ...current, [name]: value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitState('submitting')
    setFeedbackMessage('')

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState,
          type,
          sourcePage,
        }),
      })

      const result = (await response.json()) as { ok?: boolean; autoReplyOk?: boolean; error?: string }

      if (!response.ok || !result.ok) {
        throw new Error(result.error || defaultErrorMessage)
      }

      setSubmitState('success')
      setFeedbackMessage(result.autoReplyOk === false ? successMessageWithoutAutoReply : successMessageWithAutoReply)
      setFormState(initialState)
    } catch (error) {
      setSubmitState('error')
      setFeedbackMessage(error instanceof Error ? error.message : defaultErrorMessage)
    }
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <div className="inquiry-form__grid">
        {fields.map((field) => (
          <label
            className={field.multiline ? 'inquiry-form__field inquiry-form__field--wide' : 'inquiry-form__field'}
            key={field.name}
          >
            <span>
              {field.label}
              {field.required && <em>Required</em>}
            </span>
            {field.multiline ? (
              <textarea
                name={field.name}
                value={formState[field.name]}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(event) => updateField(field.name, event.target.value)}
              />
            ) : (
              <input
                name={field.name}
                type={field.type ?? 'text'}
                value={formState[field.name]}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(event) => updateField(field.name, event.target.value)}
              />
            )}
          </label>
        ))}
      </div>

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
          {submitState === 'submitting' ? '送信中...' : buttonLabel}
        </button>
        <a href={mailtoHref}>メールで直接連絡する</a>
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
          display: grid;
          gap: 9px;
          min-width: 0;
        }

        .inquiry-form__field--wide {
          grid-column: 1 / -1;
        }

        .inquiry-form__field span {
          align-items: center;
          color: var(--gold);
          display: flex;
          flex-wrap: wrap;
          font-size: 11px;
          gap: 8px;
          justify-content: space-between;
          letter-spacing: 0.18em;
          line-height: 1.6;
          text-transform: uppercase;
        }

        .inquiry-form__field em {
          color: var(--suzu);
          font-size: 9px;
          font-style: normal;
          letter-spacing: 0.16em;
        }

        .inquiry-form input,
        .inquiry-form textarea {
          width: 100%;
          border: 1px solid rgba(248,245,239,0.16);
          background: rgba(7,17,31,0.84);
          color: var(--washi);
          font: inherit;
          font-size: 14px;
          letter-spacing: 0.04em;
          outline: none;
          padding: 15px 16px;
          transition:
            border-color 0.2s ease,
            background 0.2s ease,
            box-shadow 0.2s ease;
        }

        .inquiry-form textarea {
          min-height: 140px;
          resize: vertical;
        }

        .inquiry-form input::placeholder,
        .inquiry-form textarea::placeholder {
          color: rgba(216,211,199,0.45);
        }

        .inquiry-form input:focus,
        .inquiry-form textarea:focus {
          border-color: rgba(201,168,76,0.55);
          background: rgba(13,28,53,0.92);
          box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
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
