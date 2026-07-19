import { permanentRedirect } from 'next/navigation'

export default function RestrictedItemsRedirectPage() {
  permanentRedirect('/restricted')
}
