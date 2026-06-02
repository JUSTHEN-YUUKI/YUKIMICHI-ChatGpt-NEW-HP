export type OutboundStatus =
  | 'NEW'
  | 'RESEARCHING'
  | 'READY_FOR_REVIEW'
  | 'DRAFT_CREATED'
  | 'APPROVED_TO_CONTACT'
  | 'CONTACTED'
  | 'REPLIED'
  | 'NEGOTIATING'
  | 'WON'
  | 'LOST'
  | 'DO_NOT_CONTACT'
  | 'NOT_FIT'

export type OutboundPriority = 'HIGH' | 'MEDIUM' | 'LOW' | 'HOLD' | 'DO_NOT_CONTACT'

export type BusinessType =
  | 'Importer'
  | 'Distributor'
  | 'Retailer'
  | 'E-commerce Seller'
  | 'Marketplace Seller'
  | 'Influencer'
  | 'Restaurant / Hospitality'
  | 'Specialty Store'
  | 'Beauty / Cosmetics Buyer'
  | 'Hobby / Anime Goods Buyer'
  | 'Corporate Buyer'
  | 'Other'

export type ProductCategory =
  | 'Food & Beverage'
  | 'Cosmetics & Beauty'
  | 'Daily Goods'
  | 'General Goods'
  | 'Apparel'
  | 'Electronics'
  | 'Hobby & Character Goods'
  | 'Used Goods'
  | 'Branded Items'
  | 'High-value Items'
  | 'Other'

export type SourceType =
  | 'Manual Research'
  | 'CSV Import'
  | 'Official Website'
  | 'Public Directory'
  | 'Trade Fair List'
  | 'Marketplace'
  | 'SNS Profile'
  | 'Existing Inquiry'
  | 'Referral'
  | 'Other'

export type ContactPermissionStatus =
  | 'Unknown'
  | 'Public Business Contact'
  | 'Contact Form Available'
  | 'Existing Relationship'
  | 'Needs Review'
  | 'Do Not Contact'

export type OutboundLead = {
  leadId: string
  companyName: string
  country: string
  city: string
  region: string
  businessType: BusinessType
  productCategory: ProductCategory
  targetProducts: string
  websiteUrl: string
  contactFormUrl: string
  publicEmail: string
  snsInstagramUrl: string
  snsTikTokUrl: string
  snsLinkedInUrl: string
  snsYouTubeUrl: string
  marketplaceUrl: string
  sourceType: SourceType
  sourceUrl: string
  sourceMemo: string
  language: string
  timezone: string
  notes: string
  leadScore: number
  priority: OutboundPriority
  fitReason: string
  riskFlags: string[]
  complianceFlags: string[]
  recommendedApproach: string
  suggestedSubject: string
  suggestedEmailBody: string
  suggestedDmBody: string
  followUpPlan: string
  nextAction: string
  status: OutboundStatus
  contactPermissionStatus: ContactPermissionStatus
  optOutStatus: string
  doNotContact: boolean
  lastContactedAt: string
  nextFollowUpAt: string
  owner: string
  createdAt: string
  updatedAt: string
}

export type CsvPreviewLead = OutboundLead & {
  importWarnings: string[]
  duplicateReasons: string[]
}

export const statusOptions: OutboundStatus[] = [
  'NEW',
  'RESEARCHING',
  'READY_FOR_REVIEW',
  'DRAFT_CREATED',
  'APPROVED_TO_CONTACT',
  'CONTACTED',
  'REPLIED',
  'NEGOTIATING',
  'WON',
  'LOST',
  'DO_NOT_CONTACT',
  'NOT_FIT',
]

export const priorityOptions: OutboundPriority[] = ['HIGH', 'MEDIUM', 'LOW', 'HOLD', 'DO_NOT_CONTACT']

export const businessTypeOptions: BusinessType[] = [
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

export const productCategoryOptions: ProductCategory[] = [
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

export const sourceTypeOptions: SourceType[] = [
  'Manual Research',
  'CSV Import',
  'Official Website',
  'Public Directory',
  'Trade Fair List',
  'Marketplace',
  'SNS Profile',
  'Existing Inquiry',
  'Referral',
  'Other',
]

export const contactPermissionOptions: ContactPermissionStatus[] = [
  'Unknown',
  'Public Business Contact',
  'Contact Form Available',
  'Existing Relationship',
  'Needs Review',
  'Do Not Contact',
]
