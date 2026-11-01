export type TcgInquiry = Record<string, string>

const required = ['name', 'email', 'businessCountry', 'productName', 'quantity', 'quantityUnit',
  'destinationCountry', 'destinationCity', 'tcgCategory'] as const
const limits: Record<string, number> = {
  name: 200, email: 300, company: 300, businessCountry: 200, businessWebsite: 1000,
  productName: 500, quantity: 7, quantityUnit: 6, destinationCountry: 200,
  destinationCity: 200, deadline: 300, message: 5000,
}

export function validateTcgInquiry(payload: Record<string, unknown>) {
  const values: TcgInquiry = {}
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value !== 'string') return { ok: false as const }
    values[key] = value.trim()
    if (limits[key] && values[key].length > limits[key]) return { ok: false as const }
  }
  if (required.some(key => !values[key]) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ||
      !['company', 'sole_proprietor'].includes(values.businessType) ||
      (values.businessType === 'company' && !values.company) ||
      !['pokemon', 'onepiece'].includes(values.tcgCategory) ||
      !['BOX', 'CARTON'].includes(values.quantityUnit) ||
      !/^[1-9]\d{0,6}$/.test(values.quantity) || Number(values.quantity) > 1_000_000 ||
      values.tcgConsent !== 'accepted') return { ok: false as const }
  if (values.businessWebsite) {
    try {
      const url = new URL(values.businessWebsite)
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) return { ok: false as const }
    } catch { return { ok: false as const } }
  }
  return { ok: true as const, values }
}

export function tcgEmailDraft(values: TcgInquiry) {
  const rows = [
    ['Business Type', values.businessType === 'company' ? 'Company / 法人' : 'Sole Proprietor / 個人事業主'],
    ['Company / Business Name', values.company], ['Contact Person', values.name],
    ['Country / Region', values.businessCountry], ['Email', values.email],
    ['Business Website', values.businessWebsite],
    ['Category', values.tcgCategory === 'pokemon' ? 'Pokémon TCG' : 'ONE PIECE TCG'],
    ['Requested Products', values.productName], ['Requested Quantity', `${values.quantity} ${values.quantityUnit}`],
    ['Destination Country', values.destinationCountry], ['Destination City', values.destinationCity],
    ['Preferred Schedule', values.deadline], ['Additional Requirements', values.message],
    ['Consent', 'Business inquiry and privacy notice acknowledged / 事業者向け依頼・個人情報の取扱いに同意'],
  ]
  const body = ['YUKIMICHI TCG B2B 見積依頼 / Request for a Quote', '',
    ...rows.filter(([, value]) => value).map(([key, value]) => `${key}: ${value}`),
    '', 'Source: https://justhen.co.jp/tcg/quote'].join('\n')
  return { body, href: `mailto:exporter@justhen.co.jp?subject=${encodeURIComponent('TCG B2B見積依頼 / Request for a Quote')}&body=${encodeURIComponent(body)}` }
}
