import Link from 'next/link'

const footerLinks = [
  { href: '/about', label: '会社概要' },
  { href: '/services', label: 'サービス' },
  { href: '/pricing', label: '料金表' },
  { href: '/flow', label: '取引の流れ' },
  { href: '/quote', label: 'お見積り' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'お問い合わせ' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#050e1a', borderTop: '1px solid rgba(201,168,76,0.1)', padding: '56px var(--gutter) 32px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '48px' }}>
        <div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 400, letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '4px' }}>
            YUKIMICHI - SNOWPATH JAPAN
          </div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '10px', fontWeight: 200, letterSpacing: '0.2em', color: 'var(--suzu)', marginBottom: '18px' }}>
            雪道 / 株式会社ジャッセン
          </div>
          <p style={{ fontStyle: 'italic', fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', color: 'var(--washi-faint)', lineHeight: 1.9 }}>
            &ldquo;Delivering Trust from Japan.&rdquo;<br />
            日本から、誠実な道を世界へ。
          </p>
        </div>

        <div>
          <div style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.7, marginBottom: '18px' }}>Navigation</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} style={{ fontSize: '12px', fontWeight: 300, letterSpacing: '0.08em', color: 'var(--washi-faint)', textDecoration: 'none' }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.7, marginBottom: '18px' }}>Contact</div>
          <div style={{ fontSize: '12px', fontWeight: 300, letterSpacing: '0.06em', color: 'var(--washi-faint)', lineHeight: 2 }}>
            <a href="mailto:info@justhen.co.jp" style={{ color: 'var(--washi-faint)', textDecoration: 'none', display: 'block', marginBottom: '12px' }}>
              info@justhen.co.jp
            </a>
            JUSTHEN Co., Ltd.<br />
            株式会社ジャッセン<br /><br />
            振込先: 三井住友銀行<br />
            光ヶ丘支店 288<br />
            普通 1054339 カ)ジャッセン
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(138,143,153,0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '10.5px', fontWeight: 300, letterSpacing: '0.1em', color: 'rgba(138,143,153,0.4)', lineHeight: 2 }}>
          古物商許可証 第305581606050号 東京都公安委員会 株式会社ジャッセン 代表者: 林祐樹<br />
          税関輸出入者コード 10000NKS0000 / 発給申請ID UXEV00000X6Q
        </div>
        <div style={{ fontSize: '10.5px', fontWeight: 300, letterSpacing: '0.12em', color: 'rgba(138,143,153,0.3)' }}>
          © 2026 JUSTHEN Co., Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
