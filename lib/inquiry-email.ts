export const inquiryEmailRecipient = 'exporter@justhen.co.jp'

// Build locally. Never send form contents to an external drafting service.
export function buildInquiryEmail(type: 'contact' | 'quote', state: Record<string, string>) {
  const quantity = [state.quantity, state.quantity ? state.quantityUnit : ''].filter(Boolean).join(' ')
  const destination = [state.destinationCountry, state.destinationCity].filter(Boolean).join(' / ') || state.destination
  const subject = type === 'quote' ? 'YUKIMICHI - Export Quotation Request' : 'YUKIMICHI - Contact Inquiry'
  const rows = [
    ['Inquiry Type', type], ['Company', state.company], ['Name', state.name], ['Email', state.email],
    ['Product Name', state.productName], ['Product URL', state.productUrl], ['Product Category', state.productCategory],
    ['Quantity', quantity], ['Destination', destination], ['Desired Timing', state.deadline],
    ['Shipping Method', state.shippingMethod], ['SDS / Ingredients', state.sdsAvailability],
    ['Product Photo / Document URL', state.documentUrl], ['Message', state.message],
  ]
  const body = rows.filter(([, value]) => value?.trim()).map(([label, value]) => `${label}: ${value}`).join('\n\n')
  const href = `mailto:${inquiryEmailRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  // The complete body remains available even beyond mailto client limits.
  return { subject, body, href: href.length <= 1800 ? href : null }
}
