import Link from 'next/link'
import Bilingual from '@/components/tcg/Bilingual'
import TcgNavigation from '@/components/tcg/TcgNavigation'
import './tcg.css'

export default function TcgLayout({ children }: { children: React.ReactNode }) {
  return <div className="tcg-site" data-no-translate>
    <div className="tcg-masthead"><div className="tcg-container tcg-masthead-inner">
      <Link href="/tcg" className="tcg-brand" aria-label="YUKIMICHI TCG B2B トップ / Home">
        <span>YUKIMICHI <strong>TCG B2B</strong></span>
        <small lang="en">Japan Trading Card Sourcing &amp; Export Support</small>
      </Link>
      <Link href="/" className="tcg-back"><Bilingual ja="YUKIMICHI公式サイトへ戻る" en="Back to YUKIMICHI" /><span aria-hidden="true">↗</span></Link>
    </div></div>
    <div className="tcg-container"><TcgNavigation />{children}
      <div className="tcg-footnote">
        <p><Bilingual ja="運営：株式会社ジャッセン / JUSTHEN Co., Ltd."
          en="Operated by JUSTHEN Co., Ltd., Japan." /></p>
        <p><Bilingual ja="各商品名・商標は各権利者に帰属します。当サイトは各TCGメーカーの公式サイトではなく、提携・公認関係を示すものではありません。"
          en="Product names and trademarks belong to their respective owners. This is an independent sourcing support website, not an official TCG manufacturer website or a claim of affiliation or endorsement." /></p>
      </div>
    </div>
  </div>
}
