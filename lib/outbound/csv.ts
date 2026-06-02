import { scoreLead } from './scoring'
import type {
  BusinessType,
  ContactPermissionStatus,
  CsvPreviewLead,
  OutboundLead,
  ProductCategory,
  SourceType,
} from './types'

const acceptedColumns = [
  'companyName',
  'country',
  'city',
  'businessType',
  'productCategory',
  'targetProducts',
  'websiteUrl',
  'contactFormUrl',
  'publicEmail',
  'instagramUrl',
  'tiktokUrl',
  'linkedinUrl',
  'youtubeUrl',
  'marketplaceUrl',
  'sourceUrl',
  'sourceMemo',
  'language',
  'notes',
]

export function parseCsv(text: string): Record<string, string>[] {
  const rows = parseCsvRows(text)
  const headers = rows.shift()?.map((header) => header.trim()) ?? []

  return rows
    .filter((row) => row.some((cell) => cell.trim()))
    .map((row) =>
      headers.reduce<Record<string, string>>((record, header, index) => {
        if (acceptedColumns.includes(header)) record[header] = row[index]?.trim() ?? ''
        return record
      }, {}),
    )
}

export function createLeadFromCsvRow(row: Record<string, string>, existingLeads: OutboundLead[], index: number): CsvPreviewLead {
  const now = new Date().toISOString()
  const partial: Partial<OutboundLead> = {
    leadId: `YKM-OUT-${Date.now()}-${index + 1}`,
    companyName: row.companyName || '未確認',
    country: row.country || '未確認',
    city: row.city || '',
    region: '',
    businessType: normalizeBusinessType(row.businessType),
    productCategory: normalizeProductCategory(row.productCategory),
    targetProducts: row.targetProducts || '',
    websiteUrl: row.websiteUrl || '',
    contactFormUrl: row.contactFormUrl || '',
    publicEmail: row.publicEmail || '',
    snsInstagramUrl: row.instagramUrl || '',
    snsTikTokUrl: row.tiktokUrl || '',
    snsLinkedInUrl: row.linkedinUrl || '',
    snsYouTubeUrl: row.youtubeUrl || '',
    marketplaceUrl: row.marketplaceUrl || '',
    sourceType: 'CSV Import',
    sourceUrl: row.sourceUrl || '',
    sourceMemo: row.sourceMemo || '',
    language: row.language || 'English',
    timezone: '',
    notes: row.notes || '',
    recommendedApproach: 'Review official channel, contact permission, product fit, and destination requirements before drafting outreach.',
    suggestedSubject: '',
    suggestedEmailBody: '',
    suggestedDmBody: '',
    followUpPlan: 'Review within 3 business days. Do not send until official channel and opt-out status are checked.',
    nextAction: 'Confirm official source and contact path',
    status: 'NEW',
    contactPermissionStatus: row.contactFormUrl ? 'Contact Form Available' : row.publicEmail ? 'Public Business Contact' : 'Unknown',
    optOutStatus: '',
    doNotContact: false,
    lastContactedAt: '',
    nextFollowUpAt: '',
    owner: 'YUKIMICHI',
    createdAt: now,
    updatedAt: now,
  }
  const score = scoreLead(partial)
  const lead = { ...partial, ...score, complianceFlags: ['Human review required before outreach'] } as OutboundLead
  const importWarnings = validateImportedLead(lead)
  const duplicateReasons = findDuplicateReasons(lead, existingLeads)

  if (duplicateReasons.length > 0) {
    lead.riskFlags = Array.from(new Set([...lead.riskFlags, '重複候補']))
  }

  return { ...lead, importWarnings, duplicateReasons }
}

export function createCsvDownload(leads: OutboundLead[]): string {
  const columns: (keyof OutboundLead)[] = [
    'leadId',
    'companyName',
    'country',
    'city',
    'businessType',
    'productCategory',
    'targetProducts',
    'websiteUrl',
    'contactFormUrl',
    'publicEmail',
    'snsInstagramUrl',
    'snsTikTokUrl',
    'snsLinkedInUrl',
    'snsYouTubeUrl',
    'marketplaceUrl',
    'sourceType',
    'sourceUrl',
    'language',
    'leadScore',
    'priority',
    'riskFlags',
    'status',
    'contactPermissionStatus',
    'optOutStatus',
    'doNotContact',
    'nextAction',
    'updatedAt',
  ]
  const lines = [
    columns.join(','),
    ...leads.map((lead) =>
      columns
        .map((column) => {
          const value = lead[column]
          return escapeCsvValue(Array.isArray(value) ? value.join('; ') : String(value ?? ''))
        })
        .join(','),
    ),
  ]

  return lines.join('\n')
}

function parseCsvRows(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let cell = ''
  let quoted = false

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    const next = text[index + 1]

    if (char === '"' && quoted && next === '"') {
      cell += '"'
      index += 1
    } else if (char === '"') {
      quoted = !quoted
    } else if (char === ',' && !quoted) {
      row.push(cell)
      cell = ''
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') index += 1
      row.push(cell)
      rows.push(row)
      row = []
      cell = ''
    } else {
      cell += char
    }
  }

  row.push(cell)
  rows.push(row)
  return rows
}

function validateImportedLead(lead: OutboundLead): string[] {
  const warnings: string[] = []
  if (!lead.companyName || lead.companyName === '未確認') warnings.push('companyName is required.')
  if (!lead.country || lead.country === '未確認') warnings.push('country is required.')
  if (lead.publicEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.publicEmail)) {
    warnings.push('メールアドレス形式が不自然です。')
  }
  if (!lead.sourceUrl) warnings.push('情報元未確認')
  if (lead.doNotContact) warnings.push('doNotContact true is excluded from send candidates.')
  return warnings
}

function findDuplicateReasons(lead: OutboundLead, existingLeads: OutboundLead[]): string[] {
  const reasons = new Set<string>()
  existingLeads.forEach((existing) => {
    if (lead.websiteUrl && lead.websiteUrl === existing.websiteUrl) reasons.add('websiteUrl')
    if (lead.publicEmail && lead.publicEmail === existing.publicEmail) reasons.add('publicEmail')
    if (lead.contactFormUrl && lead.contactFormUrl === existing.contactFormUrl) reasons.add('contactFormUrl')
    if (
      lead.companyName &&
      lead.country &&
      `${lead.companyName}-${lead.country}`.toLowerCase() === `${existing.companyName}-${existing.country}`.toLowerCase()
    ) {
      reasons.add('companyName + country')
    }
  })
  return Array.from(reasons)
}

function normalizeBusinessType(value: string): BusinessType {
  const allowed = [
    'Importer',
    'Distributor',
    'Retailer',
    'E-commerce Seller',
    'Marketplace Seller',
    'Influencer',
    'Restaurant / Hospitality',
    'Specialty Store',
    'Beauty / Cosmetics Buyer',
    'Hobby / Anime Goods Buyer',
    'Corporate Buyer',
    'Other',
  ]
  return (allowed.includes(value) ? value : 'Other') as BusinessType
}

function normalizeProductCategory(value: string): ProductCategory {
  const allowed = [
    'Food & Beverage',
    'Cosmetics & Beauty',
    'Daily Goods',
    'General Goods',
    'Apparel',
    'Electronics',
    'Hobby & Character Goods',
    'Used Goods',
    'Branded Items',
    'High-value Items',
    'Other',
  ]
  return (allowed.includes(value) ? value : 'Other') as ProductCategory
}

function escapeCsvValue(value: string): string {
  return `"${value.replace(/"/g, '""')}"`
}
