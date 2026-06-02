"use client"

import type { OutboundLead } from '@/lib/outbound/types'

type Props = {
  leads: OutboundLead[]
  selectedLeadId: string
  onSelect: (leadId: string) => void
}

export default function OutboundLeadTable({ leads, selectedLeadId, onSelect }: Props) {
  return (
    <div className="outbound-table-wrap">
      <table className="outbound-table">
        <thead>
          <tr>
            <th>Priority</th>
            <th>Score</th>
            <th>Company</th>
            <th>Country</th>
            <th>Business Type</th>
            <th>Product Category</th>
            <th>Website</th>
            <th>Email</th>
            <th>Contact Form</th>
            <th>Source</th>
            <th>Status</th>
            <th>Next Action</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.leadId}
              className={lead.leadId === selectedLeadId ? 'is-selected' : ''}
              onClick={() => onSelect(lead.leadId)}
            >
              <td><span className={`pill priority-${lead.priority.toLowerCase().replaceAll('_', '-')}`}>{lead.priority}</span></td>
              <td>{lead.leadScore}</td>
              <td>{lead.companyName}</td>
              <td>{lead.country}</td>
              <td>{lead.businessType}</td>
              <td>{lead.productCategory}</td>
              <td>{lead.websiteUrl ? <a href={lead.websiteUrl}>{shortUrl(lead.websiteUrl)}</a> : '未確認'}</td>
              <td>{lead.publicEmail || '未確認'}</td>
              <td>{lead.contactFormUrl ? <a href={lead.contactFormUrl}>Available</a> : '未確認'}</td>
              <td>{lead.sourceUrl ? <a href={lead.sourceUrl}>Source</a> : '情報元未確認'}</td>
              <td>{lead.status}</td>
              <td>{lead.nextAction || 'Review'}</td>
              <td>{formatDate(lead.updatedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function shortUrl(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

function formatDate(value: string) {
  if (!value) return ''
  return value.slice(0, 10)
}
