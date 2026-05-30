import Link from 'next/link'

const footerLinks = [
  { href: '/', label: 'Top' },
  { href: '/about', label: '会社概要' },
  { href: '/services', label: 'サービス' },
  { href: '/pricing', label: '料金表' },
  { href: '/flow', label: '取引の流れ' },
  { href: '/quote', label: 'お見積り' },
  { href: '/faq', label: 'FAQ' },
  { href: '/restricted', label: '禁止・制限品目' },
  { href: '/terms', label: '取引条件' },
  { href: '/privacy', label: 'プライバシーポリシー' },
  { href: '/contact', label: 'お問い合わせ' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <section className="site-footer__brand" aria-label="YUKIMICHI brand">
          <p className="site-footer__eyebrow">YUKIMICHI – SNOWPATH JAPAN</p>
          <p className="site-footer__tagline">Delivering Trust from Japan.</p>
          <p className="site-footer__copy">Operated by JUSTHEN CO., LTD.</p>
        </section>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          <p className="site-footer__heading">Navigation</p>
          <ul className="site-footer__links">
            {footerLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="site-footer__link">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="site-footer__company" aria-label="Company information">
          <p className="site-footer__heading">Contact / Company</p>
          <div className="site-footer__company-list">
            <p>JUSTHEN CO., LTD.</p>
            <p>株式会社ジャッセン</p>
            <a href="mailto:exporter@justhen.co.jp" className="site-footer__email">
              exporter@justhen.co.jp
            </a>
            <p>古物商許可証 第305581606050号</p>
            <p>東京都公安委員会</p>
          </div>
        </section>
      </div>

      <div className="site-footer__bottom">
        <p>© JUSTHEN CO., LTD. All rights reserved.</p>
      </div>

      <style>{`
        .site-footer {
          background:
            linear-gradient(180deg, rgba(5, 14, 26, 0.98) 0%, var(--navy-deep) 100%);
          border-top: 1px solid rgba(201, 168, 76, 0.22);
          color: var(--washi-dim);
          padding: 64px var(--gutter) 28px;
        }

        .site-footer__inner {
          display: grid;
          grid-template-columns: minmax(260px, 1.5fr) minmax(180px, 0.85fr) minmax(240px, 1fr);
          gap: 48px;
          max-width: 1180px;
          margin: 0 auto 44px;
        }

        .site-footer__brand,
        .site-footer__nav,
        .site-footer__company {
          min-width: 0;
        }

        .site-footer__eyebrow {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 400;
          letter-spacing: 0.18em;
          color: var(--gold);
          margin: 0 0 14px;
          text-transform: uppercase;
        }

        .site-footer__tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 300;
          line-height: 1.6;
          color: var(--washi);
          margin: 0 0 10px;
        }

        .site-footer__copy {
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.12em;
          color: var(--suzu);
          margin: 0;
          text-transform: uppercase;
        }

        .site-footer__heading {
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.28em;
          color: var(--gold);
          margin: 0 0 20px;
          text-transform: uppercase;
        }

        .site-footer__links {
          display: grid;
          grid-template-columns: 1fr;
          gap: 11px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .site-footer__link,
        .site-footer__email {
          color: var(--washi-faint);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .site-footer__link {
          display: inline-flex;
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.08em;
          line-height: 1.5;
        }

        .site-footer__link:hover,
        .site-footer__email:hover {
          color: var(--gold);
        }

        .site-footer__company-list {
          display: grid;
          gap: 9px;
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.06em;
          line-height: 1.7;
          color: var(--washi-faint);
        }

        .site-footer__company-list p {
          margin: 0;
        }

        .site-footer__email {
          width: fit-content;
          border-bottom: 1px solid rgba(201, 168, 76, 0.28);
          padding-bottom: 3px;
        }

        .site-footer__bottom {
          max-width: 1180px;
          margin: 0 auto;
          border-top: 1px solid rgba(201, 168, 76, 0.14);
          padding-top: 22px;
        }

        .site-footer__bottom p {
          color: rgba(216, 211, 199, 0.5);
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.12em;
          margin: 0;
          text-transform: uppercase;
        }

        @media (max-width: 860px) {
          .site-footer {
            padding-top: 52px;
          }

          .site-footer__inner {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .site-footer__links {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px 20px;
          }
        }

        @media (max-width: 520px) {
          .site-footer__eyebrow {
            letter-spacing: 0.12em;
          }

          .site-footer__links {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  )
}
