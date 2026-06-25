"use client"

import { useMemo, useState } from 'react'
import sampleLeads from '@/data/outbound-sample.json'
import OutboundCsvImport from '@/components/admin/OutboundCsvImport'
import OutboundDraftGenerator from '@/components/admin/OutboundDraftGenerator'
import OutboundLeadDetail from '@/components/admin/OutboundLeadDetail'
import OutboundLeadForm from '@/components/admin/OutboundLeadForm'
import OutboundLeadTable from '@/components/admin/OutboundLeadTable'
import { createCsvDownload } from '@/lib/outbound/csv'
import { scoreLead } from '@/lib/outbound/scoring'
import { businessTypeOptions, priorityOptions, productCategoryOptions, statusOptions, type CsvPreviewLead, type OutboundLead } from '@/lib/outbound/types'

type Filters = {
  search: string
  country: string
  businessType: string
  productCategory: string
  priority: string
  status: string
  doNotContact: string
  hasEmail: string
  hasContactForm: string
  minScore: string
  maxScore: string
}

const initialLeads = (sampleLeads as OutboundLead[]).map((lead) => ({ ...lead, ...scoreLead(lead) }))

export default function OutboundAdminApp() {
  const [leads, setLeads] = useState<OutboundLead[]>(initialLeads)
  const [selectedLeadId, setSelectedLeadId] = useState(initialLeads[0]?.leadId ?? '')
  const [previewLeads, setPreviewLeads] = useState<CsvPreviewLead[]>([])
  const [filters, setFilters] = useState<Filters>({
    search: '',
    country: '',
    businessType: '',
    productCategory: '',
    priority: '',
    status: '',
    doNotContact: '',
    hasEmail: '',
    hasContactForm: '',
    minScore: '',
    maxScore: '',
  })

  const selectedLead = leads.find((lead) => lead.leadId === selectedLeadId)
  const filteredLeads = useMemo(() => filterLeads(leads, filters), [leads, filters])
  const sendCandidateCount = leads.filter((lead) => !lead.doNotContact && lead.priority !== 'DO_NOT_CONTACT' && ['READY_FOR_REVIEW', 'DRAFT_CREATED'].includes(lead.status)).length

  function upsertLead(nextLead: OutboundLead) {
    const scored = { ...nextLead, ...scoreLead(nextLead) }
    setLeads((current) => current.map((lead) => (lead.leadId === nextLead.leadId ? scored : lead)))
  }

  function addLead(lead: OutboundLead) {
    setLeads((current) => [lead, ...current])
    setSelectedLeadId(lead.leadId)
  }

  function importLeads(imported: OutboundLead[]) {
    setLeads((current) => [...imported.map((lead) => ({ ...lead, ...scoreLead(lead) })), ...current])
    setSelectedLeadId(imported[0]?.leadId ?? selectedLeadId)
    setPreviewLeads([])
  }

  function exportCsv() {
    const csv = createCsvDownload(filteredLeads)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'yukimichi-outbound-leads.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="outbound-admin">
      <section className="admin-hero">
        <div className="section-label">
          <span className="section-label-line" />
          <span className="section-label-text">Outbound Sales Phase 1</span>
        </div>
        <h1>海外バイヤー開拓 管理画面</h1>
        <p>
          CSVインポート、手入力、スコアリング、営業文ドラフト作成までを扱う安全運用向けMVPです。
          自動送信、無断スクレイピング、SNS自動収集は実装していません。
        </p>
      </section>

      <section className="compliance-band">
        <p>
          営業候補情報は、公式サイト、公開法人情報、正規API、CSVインポート、手動確認を前提に管理してください。各サービス規約、個人情報保護、迷惑メール規制、送信拒否情報を確認し、営業文は必ず人間が確認してから送信してください。
        </p>
        <p>
          Manage outbound lead data based on official websites, public business information, authorized APIs, CSV imports, and manual verification. Always review platform terms, privacy rules, anti-spam regulations, and opt-out status before contacting a lead. All outreach drafts must be reviewed by a human before sending.
        </p>
      </section>

      <section className="stats-row">
        <Metric label="Leads" value={leads.length} />
        <Metric label="Send Candidates" value={sendCandidateCount} />
        <Metric label="Do Not Contact" value={leads.filter((lead) => lead.doNotContact).length} />
        <Metric label="Needs Source Review" value={leads.filter((lead) => !lead.sourceUrl).length} />
      </section>

      <section className="outbound-panel filter-panel">
        <div className="panel-heading">
          <span>Search & Filter</span>
          <strong>未確認情報を推測せず絞り込み</strong>
        </div>
        <div className="filter-grid">
          <FilterInput label="Search" value={filters.search} onChange={(search) => setFilters({ ...filters, search })} />
          <FilterInput label="Country" value={filters.country} onChange={(country) => setFilters({ ...filters, country })} />
          <FilterSelect label="Business Type" value={filters.businessType} options={businessTypeOptions} onChange={(businessType) => setFilters({ ...filters, businessType })} />
          <FilterSelect label="Product Category" value={filters.productCategory} options={productCategoryOptions} onChange={(productCategory) => setFilters({ ...filters, productCategory })} />
          <FilterSelect label="Priority" value={filters.priority} options={priorityOptions} onChange={(priority) => setFilters({ ...filters, priority })} />
          <FilterSelect label="Status" value={filters.status} options={statusOptions} onChange={(status) => setFilters({ ...filters, status })} />
          <FilterSelect label="Do Not Contact" value={filters.doNotContact} options={['true', 'false']} onChange={(doNotContact) => setFilters({ ...filters, doNotContact })} />
          <FilterSelect label="Email" value={filters.hasEmail} options={['あり', 'なし']} onChange={(hasEmail) => setFilters({ ...filters, hasEmail })} />
          <FilterSelect label="Contact Form" value={filters.hasContactForm} options={['あり', 'なし']} onChange={(hasContactForm) => setFilters({ ...filters, hasContactForm })} />
          <FilterInput label="Min Score" value={filters.minScore} onChange={(minScore) => setFilters({ ...filters, minScore })} />
          <FilterInput label="Max Score" value={filters.maxScore} onChange={(maxScore) => setFilters({ ...filters, maxScore })} />
        </div>
        <button type="button" className="btn-ghost admin-action" onClick={exportCsv}>Export filtered CSV</button>
      </section>

      <section className="workspace-grid">
        <div className="main-column">
          <OutboundLeadTable leads={filteredLeads} selectedLeadId={selectedLeadId} onSelect={setSelectedLeadId} />
          <OutboundCsvImport existingLeads={leads} previewLeads={previewLeads} onPreview={setPreviewLeads} onImport={importLeads} />
          <OutboundLeadForm onCreate={addLead} />
          <OutboundDraftGenerator lead={selectedLead} onApplyDraft={upsertLead} />
        </div>
        <OutboundLeadDetail lead={selectedLead} onChange={upsertLead} />
      </section>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <article>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  )
}

function FilterInput({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="outbound-field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function FilterSelect({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  return (
    <label className="outbound-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">All</option>
        {options.map((option) => <option key={option}>{option}</option>)}
      </select>
    </label>
  )
}

function filterLeads(leads: OutboundLead[], filters: Filters) {
  return leads.filter((lead) => {
    const haystack = `${lead.companyName} ${lead.country} ${lead.businessType} ${lead.productCategory}`.toLowerCase()
    if (filters.search && !haystack.includes(filters.search.toLowerCase())) return false
    if (filters.country && !lead.country.toLowerCase().includes(filters.country.toLowerCase())) return false
    if (filters.businessType && lead.businessType !== filters.businessType) return false
    if (filters.productCategory && lead.productCategory !== filters.productCategory) return false
    if (filters.priority && lead.priority !== filters.priority) return false
    if (filters.status && lead.status !== filters.status) return false
    if (filters.doNotContact && String(lead.doNotContact) !== filters.doNotContact) return false
    if (filters.hasEmail === 'あり' && !lead.publicEmail) return false
    if (filters.hasEmail === 'なし' && lead.publicEmail) return false
    if (filters.hasContactForm === 'あり' && !lead.contactFormUrl) return false
    if (filters.hasContactForm === 'なし' && lead.contactFormUrl) return false
    if (filters.minScore && lead.leadScore < Number(filters.minScore)) return false
    if (filters.maxScore && lead.leadScore > Number(filters.maxScore)) return false
    return true
  })
}
