"use client"

import { useState } from 'react'
import type { OutboundLead } from '@/lib/outbound/types'

type Props = {
  lead: OutboundLead | undefined
  onApplyDraft: (lead: OutboundLead) => void
}

const languages = ['English', 'Japanese', 'Spanish', 'Simplified Chinese', 'Korean', 'Other']
const tones = ['Polite', 'Premium', 'Direct', 'Friendly', 'B2B Formal', 'Short DM']

export default function OutboundDraftGenerator({ lead, onApplyDraft }: Props) {
  const [form, setForm] = useState({
    offerCategory: lead?.productCategory ?? 'Japanese products',
    purpose: 'Introduce Japanese product sourcing and export support',
    language: lead?.language || 'English',
    tone: 'B2B Formal',
    cta: 'Please reply or submit your inquiry through your official contact form.',
    signature: 'YUKIMICHI\nJUSTHEN CO., LTD.\nexporter@justhen.co.jp',
  })
  const draft = buildDraft(lead, form)

  if (!lead) {
    return <section className="outbound-panel"><p className="muted">Select a lead before generating a draft.</p></section>
  }

  return (
    <section className="outbound-panel draft-panel">
      <div className="panel-heading">
        <span>Draft Generator</span>
        <strong>Template based, review only</strong>
      </div>
      <div className="admin-form compact">
        <label className="outbound-field">
          <span>Offer Category</span>
          <input value={form.offerCategory} onChange={(event) => setForm({ ...form, offerCategory: event.target.value })} />
        </label>
        <label className="outbound-field">
          <span>Purpose</span>
          <input value={form.purpose} onChange={(event) => setForm({ ...form, purpose: event.target.value })} />
        </label>
        <label className="outbound-field">
          <span>Language</span>
          <select value={form.language} onChange={(event) => setForm({ ...form, language: event.target.value })}>
            {languages.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label className="outbound-field">
          <span>Tone</span>
          <select value={form.tone} onChange={(event) => setForm({ ...form, tone: event.target.value })}>
            {tones.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label className="outbound-field field-wide">
          <span>CTA</span>
          <input value={form.cta} onChange={(event) => setForm({ ...form, cta: event.target.value })} />
        </label>
        <label className="outbound-field field-wide">
          <span>Signature</span>
          <textarea value={form.signature} onChange={(event) => setForm({ ...form, signature: event.target.value })} />
        </label>
      </div>

      <div className="draft-output">
        <h3>Subject</h3>
        <p>{draft.subject}</p>
        <h3>Email Body</h3>
        <pre>{draft.emailBody}</pre>
        <h3>Short DM</h3>
        <pre>{draft.dmBody}</pre>
        <h3>日本語メモ</h3>
        <p>{draft.japaneseMemo}</p>
        <h3>注意点</h3>
        <p>{draft.caution}</p>
        <h3>次回フォローアップ案</h3>
        <p>{draft.followUpPlan}</p>
      </div>
      <button
        type="button"
        className="btn-primary admin-action"
        disabled={lead.doNotContact}
        onClick={() =>
          onApplyDraft({
            ...lead,
            suggestedSubject: draft.subject,
            suggestedEmailBody: draft.emailBody,
            suggestedDmBody: draft.dmBody,
            followUpPlan: draft.followUpPlan,
            nextAction: lead.doNotContact ? 'Do not contact' : 'Human review of draft and contact permission',
            status: lead.status === 'DO_NOT_CONTACT' ? lead.status : 'DRAFT_CREATED',
            updatedAt: new Date().toISOString(),
          })
        }
      >
        Save draft to selected lead
      </button>
      {lead.doNotContact && <p className="muted">Do not contact leads cannot be moved to send candidates.</p>}
    </section>
  )
}

function buildDraft(lead: OutboundLead | undefined, form: Record<string, string>) {
  const company = lead?.companyName || 'your company'
  const country = lead?.country || 'your market'
  const category = form.offerCategory || lead?.productCategory || 'Japanese products'
  const subject = `Japanese product sourcing support for ${company}`
  const emailBody = [
    `Dear ${company} team,`,
    '',
    `We are YUKIMICHI, operated by JUSTHEN CO., LTD. in Sapporo, Japan.`,
    `We support eligible Japanese product sourcing for overseas businesses, including International Courier, Air Freight, Sea Freight, packing, inspection, and export documentation coordination.`,
    '',
    `Based on your public business profile in ${country}, we would like to ask whether ${category} may be relevant to your current buying or distribution plans.`,
    'We work with compliance and transparency. Availability depends on the product, destination country, quantity, and intended use. Final import/export availability is subject to confirmation by customs, carriers, brokers, and relevant authorities. Restricted categories require prior confirmation.',
    '',
    form.cta,
    '',
    form.signature,
  ].join('\n')
  const dmBody = `YUKIMICHI supports eligible Japanese product sourcing with International Courier / Air Freight / Sea Freight and compliance review. If ${category} is relevant for ${company}, please reply or contact exporter@justhen.co.jp.`

  return {
    subject,
    emailBody,
    dmBody,
    japaneseMemo: `${company} 向けの営業文ドラフトです。送信前に公式連絡先、送信許諾、配信停止状況、商品カテゴリ規制を確認してください。`,
    caution: 'This is a draft only. Do not send without human review. Do not contact if opt-out, do-not-contact, or official channel verification is unresolved.',
    followUpPlan: 'If no reply is received, review whether a follow-up is appropriate after 7-10 business days. Do not follow up when opt-out or do-not-contact applies.',
  }
}
