import type { Metadata } from 'next'
import Link from '@/components/NewTabLink'

export const metadata: Metadata = {
  title: 'About | YUKIMICHI - SNOWPATH JAPAN',
  description: 'YUKIMICHI - SNOWPATH JAPANを運営するJUSTHEN Co., Ltd.の会社概要と輸出支援方針。',
}

const companyItems = [
  ['Service Brand', 'YUKIMICHI - SNOWPATH JAPAN'],
  ['Company', 'JUSTHEN Co., Ltd. / 株式会社ジャッセン'],
  ['Representative', 'Yuuki Hayashi / 林 祐樹'],
  ['Location', 'Sapporo, Hokkaido, Japan'],
  ['License', '古物商許可証 第305581606050号 東京都公安委員会'],
]

const locationAddress = '8-5-15 Kita 2-jo Higashi, Chuo-ku, Sapporo, Hokkaido 060-0032, Japan'

const locationMapSrc =
  'https://www.google.com/maps?q=%E3%80%92060-0032%20%E5%8C%97%E6%B5%B7%E9%81%93%E6%9C%AD%E5%B9%8C%E5%B8%82%E4%B8%AD%E5%A4%AE%E5%8C%BA%E5%8C%97%E4%BA%8C%E6%9D%A1%E6%9D%B18-5-15&output=embed'

const locationMapLink =
  'https://www.google.com/maps/search/?api=1&query=%E3%80%92060-0032%20%E5%8C%97%E6%B5%B7%E9%81%93%E6%9C%AD%E5%B9%8C%E5%B8%82%E4%B8%AD%E5%A4%AE%E5%8C%BA%E5%8C%97%E4%BA%8C%E6%9D%A1%E6%9D%B18-5-15'

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">About Us</span>
        </div>
        <h1 className="about-title">
          A Clear Path
          <br />
          from Hokkaido.
        </h1>
        <p className="section-body about-lead">
          YUKIMICHI - SNOWPATH JAPAN は、JUSTHEN Co., Ltd. が運営する日本発の輸出支援ブランドです。
          北海道の静かな信頼感と、日本企業らしい誠実な手続きを軸に、海外バイヤーとの長期取引を支援します。
        </p>
      </section>

      <section className="about-section">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Philosophy</span>
          </div>
          <h2 className="section-title">
            Delivering
            <br />
            <em>Trust.</em>
          </h2>
          <p className="section-body">
            雪道は簡単ではありません。それでも一歩ずつ正しい道を選べば、目的地へ近づけます。
            輸出も同じです。商品調達、書類、配送、通関確認を丁寧に積み重ね、海外から見て信頼できる日本の取引体験を整えます。
          </p>
          <Link href="/contact" className="btn-primary">
            相談する <ArrowRight />
          </Link>
        </div>

        <div className="about-card">
          {companyItems.map(([label, value]) => (
            <div className="about-row" key={label}>
              <span>{label}</span>
              <strong>
                {value}
                {label === 'Location' && <small>{locationAddress}</small>}
              </strong>
            </div>
          ))}

          <div className="about-map-frame">
            <iframe
              title="JUSTHEN CO., LTD. location map"
              src={locationMapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={locationMapLink}
            className="about-map-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            地図が表示されない場合はGoogle Mapsで確認
          </a>
        </div>
      </section>

      <style>{`
        .about-hero {
          min-height: 68svh;
          padding: calc(var(--nav-h) + 84px) var(--gutter) 72px;
          background:
            radial-gradient(ellipse 70% 48% at 78% 24%, rgba(201,168,76,0.08), transparent 64%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 62%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.1);
        }
        .about-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-size: clamp(46px, 8vw, 96px);
          line-height: 0.98;
          color: var(--washi);
          margin-bottom: 28px;
        }
        .about-lead { max-width: 760px; }
        .about-section {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(320px, 0.9fr);
          gap: clamp(36px, 6vw, 92px);
          align-items: start;
        }
        .about-card {
          border: 1px solid rgba(201,168,76,0.14);
          background: linear-gradient(180deg, rgba(13,28,53,0.96), rgba(7,17,31,0.95));
          padding: 34px;
        }
        .about-row {
          display: grid;
          gap: 7px;
          padding: 18px 0;
          border-bottom: 1px solid rgba(248,245,239,0.08);
        }
        .about-row:last-child { border-bottom: 0; }
        .about-row span {
          color: var(--gold);
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
        }
        .about-row strong {
          display: grid;
          gap: 6px;
          color: var(--washi-dim);
          font-size: 13px;
          font-weight: 300;
          line-height: 1.8;
        }
        .about-row small {
          color: var(--washi-faint);
          font: inherit;
          line-height: 1.75;
        }
        .about-map-frame {
          margin-top: 22px;
          min-height: 190px;
          overflow: hidden;
          border: 1px solid rgba(201,168,76,0.26);
          border-radius: 6px;
          background: rgba(248,245,239,0.04);
        }
        .about-map-frame iframe {
          display: block;
          width: 100%;
          height: 190px;
          border: 0;
          filter: saturate(0.82) contrast(0.95);
        }
        .about-map-link {
          display: inline-flex;
          margin-top: 10px;
          color: rgba(216,211,199,0.62);
          font-size: 11px;
          font-weight: 300;
          letter-spacing: 0.08em;
          line-height: 1.6;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .about-map-link:hover { color: var(--gold); }
        @media (max-width: 900px) {
          .about-section { grid-template-columns: 1fr; }
        }
        @media (max-width: 520px) {
          .about-map-frame {
            min-height: 170px;
          }
          .about-map-frame iframe {
            height: 170px;
          }
        }
      `}</style>
    </>
  )
}
