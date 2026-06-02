import type { OutboundLead, OutboundPriority, ProductCategory } from './types'

const affinityBusinessTypes = new Set([
  'Importer',
  'Distributor',
  'Retailer',
  'E-commerce Seller',
  'Marketplace Seller',
  'Specialty Store',
  'Beauty / Cosmetics Buyer',
  'Hobby / Anime Goods Buyer',
  'Corporate Buyer',
])

const reviewRequiredCategories = new Set<ProductCategory>([
  'Food & Beverage',
  'Cosmetics & Beauty',
  'Electronics',
  'Used Goods',
  'Branded Items',
  'High-value Items',
])

const priorityCountries = new Set([
  'Singapore',
  'United States',
  'United Kingdom',
  'United Arab Emirates',
  'Australia',
  'New Zealand',
  'Canada',
  'France',
  'Germany',
  'Spain',
  'South Korea',
  'Taiwan',
])

export function detectRiskFlags(lead: Partial<OutboundLead>): string[] {
  const flags = new Set<string>()
  const hasSns = Boolean(lead.snsInstagramUrl || lead.snsTikTokUrl || lead.snsLinkedInUrl || lead.snsYouTubeUrl)
  const hasWebsite = Boolean(lead.websiteUrl)

  if (!lead.sourceUrl) flags.add('情報元未確認')
  if (lead.publicEmail && !isLikelyBusinessEmail(lead.publicEmail)) flags.add('個人メールの可能性')
  if (!lead.contactFormUrl) flags.add('問い合わせフォームなし')
  if (!hasWebsite) flags.add('公式サイト未確認')
  if (hasSns && !hasWebsite && !lead.marketplaceUrl) flags.add('SNSのみで法人実在性が弱い')
  if (lead.productCategory && reviewRequiredCategories.has(lead.productCategory)) flags.add('規制商品の可能性')
  if (lead.productCategory === 'Food & Beverage') flags.add('文化・宗教上の注意が必要')
  if (lead.doNotContact || lead.optOutStatus) flags.add('送信拒否済み')

  return Array.from(flags)
}

export function scoreLead(input: Partial<OutboundLead>): Pick<OutboundLead, 'leadScore' | 'priority' | 'riskFlags' | 'fitReason'> {
  if (input.doNotContact) {
    return {
      leadScore: 0,
      priority: 'DO_NOT_CONTACT',
      riskFlags: Array.from(new Set([...detectRiskFlags(input), '送信拒否済み'])),
      fitReason: 'Do not contact flag is enabled.',
    }
  }

  const riskFlags = detectRiskFlags(input)
  let score = 0
  const reasons: string[] = []

  if (input.websiteUrl) {
    score += 15
    reasons.push('official website present')
  }
  if (input.contactFormUrl) {
    score += 10
    reasons.push('contact form available')
  }
  if (input.publicEmail) {
    score += 10
    reasons.push('public business email candidate present')
  }
  if (input.productCategory && input.productCategory !== 'Other') {
    score += 15
    reasons.push('product category is defined')
  }
  if (input.businessType && affinityBusinessTypes.has(input.businessType)) {
    score += 15
    reasons.push('business type fits Japanese product sourcing')
  }
  if (input.snsInstagramUrl || input.snsTikTokUrl || input.snsLinkedInUrl || input.snsYouTubeUrl || input.marketplaceUrl) {
    score += 10
    reasons.push('SNS or marketplace activity present')
  }
  if (input.sourceUrl) {
    score += 10
    reasons.push('source URL available for review')
  }
  if (input.country && priorityCountries.has(input.country)) {
    score += 10
    reasons.push('country is a priority market candidate')
  }
  if (input.sourceType === 'Existing Inquiry' || input.sourceType === 'Referral') {
    score += 10
    reasons.push('existing inquiry or referral source')
  }

  if (riskFlags.length > 0) score -= 20
  if (!input.websiteUrl && !input.contactFormUrl && !input.publicEmail) score -= 10

  const leadScore = Math.max(0, Math.min(100, score))

  return {
    leadScore,
    priority: priorityFromScore(leadScore),
    riskFlags: leadScore <= 19 ? Array.from(new Set([...riskFlags, '低スコア'])) : riskFlags,
    fitReason: reasons.length > 0 ? reasons.join(', ') : 'Insufficient verified information.',
  }
}

export function priorityFromScore(score: number): OutboundPriority {
  if (score >= 80) return 'HIGH'
  if (score >= 50) return 'MEDIUM'
  if (score >= 20) return 'LOW'
  return 'HOLD'
}

export function isLikelyBusinessEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return false
  return !/(gmail|yahoo|hotmail|outlook|icloud|aol|proton)\./.test(normalized)
}
