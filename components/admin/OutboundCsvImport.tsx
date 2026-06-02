"use client"

import { createLeadFromCsvRow, parseCsv } from '@/lib/outbound/csv'
import type { CsvPreviewLead, OutboundLead } from '@/lib/outbound/types'

type Props = {
  existingLeads: OutboundLead[]
  previewLeads: CsvPreviewLead[]
  onPreview: (leads: CsvPreviewLead[]) => void
  onImport: (leads: OutboundLead[]) => void
}

export default function OutboundCsvImport({ existingLeads, previewLeads, onPreview, onImport }: Props) {
  async function handleFile(file: File | null) {
    if (!file) return
    const text = await file.text()
    const parsed = parseCsv(text)
    onPreview(parsed.map((row, index) => createLeadFromCsvRow(row, existingLeads, index)))
  }

  return (
    <section className="outbound-panel import-panel">
      <div className="panel-heading">
        <span>CSV Import</span>
        <strong>Preview before import</strong>
      </div>
      <p className="muted">
        Accepted columns: companyName, country, city, businessType, productCategory, targetProducts, websiteUrl, contactFormUrl,
        publicEmail, instagramUrl, tiktokUrl, linkedinUrl, youtubeUrl, marketplaceUrl, sourceUrl, sourceMemo, language, notes.
      </p>
      <input className="file-input" type="file" accept=".csv,text/csv" onChange={(event) => handleFile(event.target.files?.[0] ?? null)} />
      {previewLeads.length > 0 && (
        <>
          <div className="preview-list">
            {previewLeads.map((lead) => (
              <article key={lead.leadId} className="preview-item">
                <div>
                  <strong>{lead.companyName}</strong>
                  <span>{lead.country} / {lead.businessType} / Score {lead.leadScore}</span>
                </div>
                <div className="preview-warnings">
                  {[...lead.importWarnings, ...lead.duplicateReasons.map((reason) => `重複候補: ${reason}`)].map((warning) => (
                    <span key={warning}>{warning}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <button type="button" className="btn-primary admin-action" onClick={() => onImport(previewLeads)}>
            Import previewed leads
          </button>
        </>
      )}
    </section>
  )
}
