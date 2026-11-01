'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Bilingual from './Bilingual'

const links = [
  { href: '/tcg', ja: 'トップ', en: 'Home' },
  { href: '/tcg/pokemon', ja: 'ポケモンカード', en: 'Pokémon TCG' },
  { href: '/tcg/onepiece', ja: 'ワンピースカード', en: 'ONE PIECE TCG' },
  { href: '/tcg/fee-calculator', ja: '手数料シミュレーション', en: 'Fee Calculator' },
  { href: '/tcg/how-to-order', ja: 'お取引の流れ', en: 'How to Order' },
  { href: '/tcg/quote', ja: 'お見積り', en: 'Request a Quote' },
  { href: '/tcg/faq', ja: 'よくある質問', en: 'FAQ' },
]

export default function TcgNavigation() {
  const pathname = usePathname()
  return <nav className="tcg-navigation" aria-label="TCG専用メニュー / TCG navigation">
    {links.map(link => <Link key={link.href} href={link.href}
      aria-current={(link.href === '/tcg' ? pathname === link.href : pathname.startsWith(link.href)) ? 'page' : undefined}>
      <Bilingual ja={link.ja} en={link.en} />
    </Link>)}
  </nav>
}
