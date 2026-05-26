'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/',         label: 'Top' },
  { href: '/about',    label: '会社概要' },
  { href: '/services', label: 'サービス' },
  { href: '/pricing',  label: '料金表' },
  { href: '/flow',     label: '取引の流れ' },
  { href: '/quote',    label: '見積サンプル' },
  { href: '/faq',      label: 'FAQ' },
  { href: '/ai',       label: 'AI・DX' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 'var(--nav-h)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 var(--gutter)',
        transition: 'background 0.5s ease',
        background: scrolled ? 'rgba(7,17,31,0.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : '1px solid transparent',
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Image
            src="/yukimichi-logo-transparent.png"
            alt="YUKIMICHI – SNOWPATH JAPAN"
            width={96}
            height={96}
            style={{ objectFit: 'contain' }}
            priority
          />
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', fontWeight: 400, letterSpacing: '0.28em', color: 'var(--gold)', textTransform: 'uppercase', lineHeight: 1 }}>
            YUKIMICHI
          </span>
        </Link>

        <ul className="nav-desktop" style={{ display: 'flex', alignItems: 'center', listStyle: 'none' }}>
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} style={{
                display: 'block', padding: '8px 13px',
                fontSize: '10.5px', fontWeight: 300, letterSpacing: '0.18em',
                color: pathname === href ? 'var(--washi)' : 'var(--washi-dim)',
                textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.25s',
              }}>{label}</Link>
            </li>
          ))}
          <li style={{ marginLeft: '16px' }}>
            <Link href="/contact" style={{
              display: 'inline-block', padding: '10px 20px',
              border: '1px solid rgba(139,30,47,0.6)', color: 'var(--washi)',
              textDecoration: 'none', fontSize: '10.5px', fontWeight: 300,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              transition: 'background 0.3s', borderRadius: '1px',
            }}>お問い合わせ</Link>
          </li>
        </ul>

        <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
          style={{ display: 'none', flexDirection: 'column', gap: '5px', cursor: 'pointer', padding: '8px', background: 'none', border: 'none' }}>
          {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: '24px', height: '1px', background: 'var(--washi)' }} />)}
        </button>
      </nav>

      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(7,17,31,0.97)',
          zIndex: 999, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '28px',
        }}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 300, letterSpacing: '0.15em', color: 'var(--washi-dim)', textDecoration: 'none' }}>{label}</Link>
          ))}
          <Link href="/contact" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 300, letterSpacing: '0.15em', color: 'var(--gold)', textDecoration: 'none' }}>お問い合わせ</Link>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-burger  { display: flex !important; }
        }
      `}</style>
    </>
  )
}
