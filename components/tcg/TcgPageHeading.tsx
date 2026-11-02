import Link from 'next/link'
import Bilingual from './Bilingual'

export default function TcgPageHeading({ ja, en, descriptionJa, descriptionEn, className }: {
  ja: string; en: string; descriptionJa?: string; descriptionEn?: string; className?: string
}) {
  return <header className={`tcg-page-heading${className ? ` ${className}` : ''}`}>
    <nav className="tcg-breadcrumb" aria-label="パンくずリスト / Breadcrumb">
      <Link href="/">YUKIMICHI</Link><span aria-hidden="true">/</span>
      <Link href="/tcg">TCG B2B</Link><span aria-hidden="true">/</span>
      <span aria-current="page"><Bilingual ja={ja} en={en} /></span>
    </nav>
    <p className="tcg-eyebrow">YUKIMICHI TCG B2B</p>
    <h1><Bilingual ja={ja} en={en} /></h1>
    {descriptionJa && descriptionEn && <p className="tcg-lead"><Bilingual ja={descriptionJa} en={descriptionEn} /></p>}
  </header>
}
