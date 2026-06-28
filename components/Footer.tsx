import Link from '@/components/NewTabLink'

const footerLinks = [
  { href: '/', label: 'Top', en: 'Home' },
  { href: '/about', label: '会社概要', en: 'About YUKIMICHI' },
  { href: '/services', label: 'サービス', en: 'Export Support' },
  { href: '/pricing', label: '料金表', en: 'Pricing' },
  { href: '/flow', label: '取引の流れ', en: 'Export Process' },
  { href: '/quote', label: '見積依頼', en: 'Request a Quote' },
  { href: '/faq', label: 'FAQ', en: 'Frequently Asked Questions' },
  { href: '/contact', label: 'お問い合わせ', en: 'Free Consultation' },
  { href: '/restricted-items', label: '禁止・制限品目', en: 'Restricted Items' },
  { href: '/terms', label: '取引条件', en: 'Terms' },
  { href: '/privacy', label: 'プライバシーポリシー', en: 'Privacy Policy' },
]

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <section className="site-footer__brand" aria-label="YUKIMICHI brand">
          <p className="site-footer__eyebrow">YUKIMICHI</p>
          <p className="site-footer__tagline" lang="ja">日本側の輸出調整・手配支援</p>
          <p className="site-footer__tagline-en" lang="en">Japan-side export coordination support.</p>
          <p className="site-footer__copy" lang="en">YUKIMICHI | Operated by JUSTHEN Co., Ltd.</p>
        </section>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          <p className="site-footer__heading" lang="en">Navigation</p>
          <ul className="site-footer__links">
            {footerLinks.map(({ href, label, en }) => (
              <li key={href}>
                <Link href={href} className="site-footer__link">
                  <span>{label}</span>
                  <small>{en}</small>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="site-footer__company" aria-label="Company information">
          <p className="site-footer__heading" lang="en">Contact / Company</p>
          <div className="site-footer__company-list">
            <p lang="en">JUSTHEN CO., LTD.</p>
            <p lang="ja">株式会社ジャッセン</p>
            <p lang="ja">〒060-0032 北海道札幌市中央区北二条東8-5-15</p>
            <p lang="en">8-5-15 Kita 2-jo Higashi, Chuo-ku, Sapporo, Hokkaido 060-0032, Japan</p>
            <a href="mailto:exporter@justhen.co.jp" className="site-footer__email">
              exporter@justhen.co.jp
            </a>
            <p lang="ja">古物商許可証 第305581606050号</p>
            <p lang="ja">東京都公安委員会</p>
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
          font-size: 20px;
          font-weight: 300;
          line-height: 1.6;
          color: var(--washi);
          margin: 0 0 6px;
        }

        .site-footer__tagline-en {
          color: var(--washi-dim);
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          font-weight: 300;
          letter-spacing: 0.06em;
          line-height: 1.5;
          margin: 0 0 12px;
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
          display: inline-grid;
          gap: 2px;
          font-size: 12px;
          font-weight: 300;
          letter-spacing: 0.08em;
          line-height: 1.5;
        }

        .site-footer__link small {
          color: rgba(244, 239, 230, 0.45);
          font-family: 'Cormorant Garamond', serif;
          font-size: 11px;
          letter-spacing: 0.08em;
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
