"use client"

import { type FormEvent, useState } from 'react'
import { scoreLead } from '@/lib/outbound/scoring'
import {
  businessTypeOptions,
  contactPermissionOptions,
  productCategoryOptions,
  sourceTypeOptions,
  statusOptions,
  type BusinessType,
  type ContactPermissionStatus,
  type OutboundLead,
  type OutboundStatus,
  type ProductCategory,
  type SourceType,
} from '@/lib/outbound/types'

type Props = {
  onCreate: (lead: OutboundLead) => void
}

const defaultForm = {
  companyName: '',
  country: '',
  city: '',
  businessType: 'Importer' as BusinessType,
  productCategory: 'General Goods' as ProductCategory,
  targetProducts: '',
  websiteUrl: '',
  contactFormUrl: '',
  publicEmail: '',
  sourceUrl: '',
  sourceMemo: '',
  language: 'English',
  notes: '',
  status: 'NEW' as OutboundStatus,
  sourceType: 'Manual Research' as SourceType,
  contactPermissionStatus: 'Unknown' as ContactPermissionStatus,
  doNotContact: false,
}

export default function OutboundLeadForm({ onCreate }: Props) {
  const [form, setForm] = useState(defaultForm)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const now = new Date().toISOString()
    const partial: Partial<OutboundLead> = {
      ...form,
      leadId: `YKM-OUT-${Date.now()}`,
      companyName: form.companyName || '未確認',
      country: form.country || '未確認',
      region: '',
      snsInstagramUrl: '',
      snsTikTokUrl: '',
      snsLinkedInUrl: '',
      snsYouTubeUrl: '',
      marketplaceUrl: '',
      timezone: '',
      optOutStatus: form.doNotContact ? 'Manual do-not-contact flag' : '',
      lastContactedAt: '',
      nextFollowUpAt: '',
      owner: 'YUKIMICHI',
      createdAt: now,
      updatedAt: now,
      complianceFlags: ['Human review required before outreach'],
      recommendedApproach: 'Confirm official channel, opt-out status, product fit, and destination requirements before outreach.',
      suggestedSubject: '',
      suggestedEmailBody: '',
      suggestedDmBody: '',
      followUpPlan: 'Review first. Do not send without human approval.',
      nextAction: 'Confirm official source and contact permission',
    }
    const scored = scoreLead(partial)
    onCreate({ ...partial, ...scored } as OutboundLead)
    setForm(defaultForm)
  }

  return (
    <section className="outbound-panel form-panel">
      <div className="panel-heading">
        <span>Manual Entry</span>
        <strong>Public business information only</strong>
      </div>
      <form className="admin-form" onSubmit={submit}>
        <TextField label="Company" value={form.companyName} onChange={(companyName) => setForm({ ...form, companyName })} />
        <TextField label="Country" value={form.country} onChange={(country) => setForm({ ...form, country })} />
        <TextField label="City" value={form.city} onChange={(city) => setForm({ ...form, city })} />
        <SelectField label="Business Type" value={form.businessType} options={businessTypeOptions} onChange={(businessType) => setForm({ ...form, businessType: businessType as BusinessType })} />
        <SelectField label="Product Category" value={form.productCategory} options={productCategoryOptions} onChange={(productCategory) => setForm({ ...form, productCategory: productCategory as ProductCategory })} />
        <TextField label="Target Products" value={form.targetProducts} onChange={(targetProducts) => setForm({ ...form, targetProducts })} />
        <TextField label="Website URL" value={form.websiteUrl} onChange={(websiteUrl) => setForm({ ...form, websiteUrl })} />
        <TextField label="Contact Form URL" value={form.contactFormUrl} onChange={(contactFormUrl) => setForm({ ...form, contactFormUrl })} />
        <TextField label="Public Business Email" value={form.publicEmail} onChange={(publicEmail) => setForm({ ...form, publicEmail })} />
        <SelectField label="Source Type" value={form.sourceType} options={sourceTypeOptions} onChange={(sourceType) => setForm({ ...form, sourceType: sourceType as SourceType })} />
        <TextField label="Source URL" value={form.sourceUrl} onChange={(sourceUrl) => setForm({ ...form, sourceUrl })} />
        <TextField label="Language" value={form.language} onChange={(language) => setForm({ ...form, language })} />
        <SelectField label="Status" value={form.status} options={statusOptions} onChange={(status) => setForm({ ...form, status: status as OutboundStatus })} />
        <SelectField label="Permission" value={form.contactPermissionStatus} options={contactPermissionOptions} onChange={(contactPermissionStatus) => setForm({ ...form, contactPermissionStatus: contactPermissionStatus as ContactPermissionStatus })} />
        <label className="outbound-check">
          <input type="checkbox" checked={form.doNotContact} onChange={(event) => setForm({ ...form, doNotContact: event.target.checked })} />
          <span>Do not contact / opt-out</span>
        </label>
        <label className="outbound-field field-wide">
          <span>Notes</span>
          <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
        </label>
        <button type="submit" className="btn-primary admin-action">Add lead</button>
      </form>
    </section>
  )
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="outbound-field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="outbound-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}
