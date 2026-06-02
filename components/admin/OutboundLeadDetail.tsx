"use client"

import type { OutboundLead } from '@/lib/outbound/types'
import { contactPermissionOptions, statusOptions } from '@/lib/outbound/types'

type Props = {
  lead: OutboundLead | undefined
  onChange: (lead: OutboundLead) => void
}

export default function OutboundLeadDetail({ lead, onChange }: Props) {
  if (!lead) {
    return <aside className="outbound-panel"><p className="muted">Select a lead to review details.</p></aside>
  }

  return (
    <aside className="outbound-panel detail-panel">
      <div className="panel-heading">
        <span>Lead Detail</span>
        <strong>{lead.companyName}</strong>
      </div>
      <div className="detail-grid">
        <Detail label="Country / City" value={`${lead.country} ${lead.city}`.trim()} />
        <Detail label="Business Type" value={lead.businessType} />
        <Detail label="Product Category" value={lead.productCategory} />
        <Detail label="Official URL" value={lead.websiteUrl || '未確認'} href={lead.websiteUrl} />
        <Detail label="Email" value={lead.publicEmail || '未確認'} />
        <Detail label="Contact Form" value={lead.contactFormUrl || '未確認'} href={lead.contactFormUrl} />
        <Detail label="Instagram" value={lead.snsInstagramUrl || '未確認'} href={lead.snsInstagramUrl} />
        <Detail label="TikTok" value={lead.snsTikTokUrl || '未確認'} href={lead.snsTikTokUrl} />
        <Detail label="LinkedIn" value={lead.snsLinkedInUrl || '未確認'} href={lead.snsLinkedInUrl} />
        <Detail label="YouTube" value={lead.snsYouTubeUrl || '未確認'} href={lead.snsYouTubeUrl} />
        <Detail label="Source URL" value={lead.sourceUrl || '情報元未確認'} href={lead.sourceUrl} />
        <Detail label="Score Basis" value={lead.fitReason || 'Insufficient verified information.'} />
      </div>

      <label className="outbound-field">
        <span>Status</span>
        <select value={lead.status} onChange={(event) => onChange({ ...lead, status: event.target.value as OutboundLead['status'], updatedAt: new Date().toISOString() })}>
          {statusOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>

      <label className="outbound-field">
        <span>Contact Permission</span>
        <select value={lead.contactPermissionStatus} onChange={(event) => onChange({ ...lead, contactPermissionStatus: event.target.value as OutboundLead['contactPermissionStatus'], updatedAt: new Date().toISOString() })}>
          {contactPermissionOptions.map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>

      <label className="outbound-check">
        <input
          type="checkbox"
          checked={lead.doNotContact}
          onChange={(event) => onChange({ ...lead, doNotContact: event.target.checked, status: event.target.checked ? 'DO_NOT_CONTACT' : lead.status, updatedAt: new Date().toISOString() })}
        />
        <span>Do not contact / opt-out</span>
      </label>

      <div className="flag-list">
        <h3>Risk Flags</h3>
        {lead.riskFlags.length ? lead.riskFlags.map((flag) => <span key={flag}>{flag}</span>) : <p className="muted">No current flags.</p>}
      </div>

      <div className="detail-note">
        <h3>営業文ドラフト</h3>
        <p><strong>{lead.suggestedSubject || 'No draft subject yet.'}</strong></p>
        <p>{lead.suggestedEmailBody || 'Use the draft generator to create a review-only outreach draft.'}</p>
        <h3>日本語メモ / 次回アクション</h3>
        <p>{lead.notes || '未確認項目を確認してください。'}</p>
        <p>{lead.nextAction || 'Confirm official source and opt-out status.'}</p>
      </div>
    </aside>
  )
}

function Detail({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div>
      <span>{label}</span>
      {href ? <a href={href}>{value}</a> : <strong>{value}</strong>}
    </div>
  )
}
