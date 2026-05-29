import Link from 'next/link'
import Image from 'next/image'
import type { ReactNode } from 'react'
import Snow from '@/components/Snow'
import ScrollReveal from '@/components/ScrollReveal'

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

interface ServiceCardProps { num: string; icon: ReactNode; title: string; titleJp: string; desc: string }
function ServiceCard({ num, icon, title, titleJp, desc }: ServiceCardProps) {
  return (
    <div style={{ background: 'var(--navy-deep)', padding: '40px 32px', borderRight: '1px solid rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '11px', letterSpacing: '0.3em', color: 'var(--gold)', opacity: 0.6, marginBottom: '20px' }}>{num}</div>
      <div style={{ width: '36px', height: '36px', marginBottom: '20px', color: 'var(--gold)', opacity: 0.8 }}>{icon}</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 400, color: 'var(--washi)', marginBottom: '4px' }}>{title}</div>
      <div style={{ fontFamily: "'Noto Serif JP',serif", fontSize: '11px', fontWeight: 200, letterSpacing: '0.2em', color: 'var(--suzu)', marginBottom: '18px' }}>{titleJp}</div>
      <p style={{ fontSize: '12.5px', fontWeight: 300, lineHeight: 2, color: 'var(--washi-faint)', letterSpacing: '0.04em' }}>{desc}</p>
    </div>
  )
}

interface PriceCardProps { label: string; icon: string; name: string; fee: string; unit: string; note: string; highlight?: boolean }
function PriceCard({ label, icon, name, fee, unit, note, highlight }: PriceCardProps) {
  return (
    <div style={{ border: '1px solid rgba(201,168,76,0.12)', padding: '36px 28px', position: 'relative' }}>
      {highlight && <div style={{ position: 'absolute', top: '-1px', left: '-1px', right: '-1px', height: '2px', background: 'var(--gold)' }} />}
      <div style={{ display: 'inline-block', background: 'var(--benigara)', color: 'var(--washi)', fontSize: '9px', letterSpacing: '0.2em', padding: '3px 8px', marginBottom: '12px', fontWeight: 300 }}>FREE FIRST MONTH</div>
      <div style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'var(--gold)', marginBottom: '12px' }}>{label}</div>
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 400, color: 'var(--washi)', marginBottom: '12px' }}>{name}</div>
      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '38px', fontWeight: 300, color: 'var(--gold)', lineHeight: 1 }}>
        {fee}<span style={{ fontSize: '13px', color: 'var(--suzu)' }}>{unit}</span>
      </div>
      <div style={{ fontSize: '11px', fontWeight: 300, color: 'var(--washi-faint)', lineHeight: 1.9, marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(138,143,153,0.15)', whiteSpace: 'pre-line' as const }}>{note}</div>
    </div>
  )
}

interface FlowStepProps { num: string; title: string; desc: string }
function FlowStep({ num, title, desc }: FlowStepProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', textAlign: 'center' as const, padding: '0 16px' }}>
      <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px solid rgba(201,168,76,0.3)', background: 'var(--navy-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 300, color: 'var(--gold)', marginBottom: '24px' }}>{num}</div>
      <div style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.12em', color: 'var(--washi)', marginBottom: '10px' }}>{title}</div>
      <p style={{ fontSize: '12px', fontWeight: 300, color: 'var(--washi-faint)', lineHeight: 1.9 }}>{desc}</p>
    </div>
  )
}

const services = [
  { num: '01', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>, title: 'Procurement', titleJp: '商品調達・輸出手配', desc: '日本国内で正規に流通している商品を調達し、海外向けの輸出手続きを一括サポート。日本限定品・期間限定品にも対応。' },
  { num: '02', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m-4 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z"/></svg>, title: 'Logistics', titleJp: '物流・配送最適化', desc: 'EMS・DHL・FedEx・UPS・航空貨物・海上輸送を比較提案。総着地コストで最適案を提示。' },
  { num: '03', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>, title: 'Compliance', titleJp: 'コンプライアンス審査', desc: '仕向地の輸入規制を事前審査。食品・化粧品・電気製品など規制確認が必要な商品に対応。' },
]

const priceCards = [
  { label: 'Express', icon: '📦', name: 'International Express', fee: '15', unit: '% + min ¥10,000', note: 'EMS / DHL / FedEx / UPS\n小ロット・短納期に最適', highlight: false },
  { label: 'Air Cargo', icon: '✈️', name: 'Air Freight', fee: '10', unit: '% + min ¥30,000', note: '航空貨物\n緊急・高額商品に最適', highlight: true },
  { label: 'Sea Freight', icon: '🚢', name: 'Sea Container', fee: '7', unit: '% + min ¥30,000', note: 'FCL / LCL 海上輸送\n大量・定期出荷に最適', highlight: false },
]

const flowSteps = [
  { num: '01', title: 'お問い合わせ', desc: 'ご希望商品・仕向地・数量をお知らせください' },
  { num: '02', title: '規制確認・見積', desc: '輸入規制を確認のうえ正式見積書を発行' },
  { num: '03', title: '最終確認・入金', desc: '条件確認後、事前入金で手配開始' },
  { num: '04', title: '輸出・発送', desc: '通関・発送完了後に追跡番号をご連絡' },
]

export default function Home() {
  return (
    <>
      {/* ══════════════════════════════════════
          HERO — full viewport
      ══════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'calc(var(--nav-h) + clamp(70px,9vh,120px)) var(--gutter) clamp(90px,12vh,140px)',
        overflow: 'hidden',
      }}>
        {/* Hero background — new logistics image at higher opacity */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center 40%', opacity: 0.38 }}
            priority
            sizes="100vw"
          />
          {/* Dark gradient: strong at top/bottom, lighter in middle for image visibility */}
          <div style={{
            position: 'absolute', inset: 0,
            background: [
              'linear-gradient(to bottom, rgba(7,17,31,0.88) 0%, rgba(7,17,31,0.45) 35%, rgba(7,17,31,0.55) 70%, rgba(7,17,31,0.9) 100%)',
              'linear-gradient(to right, rgba(7,17,31,0.82) 0%, rgba(7,17,31,0.3) 55%, rgba(7,17,31,0.65) 100%)',
            ].join(', '),
          }} />
        </div>

        {/* Subtle grid texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.03) 1px,transparent 1px)', backgroundSize: '80px 80px', zIndex: 1, maskImage: 'linear-gradient(to bottom,transparent 0%,black 30%,black 70%,transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom,transparent 0%,black 30%,black 70%,transparent 100%)' }} />
        <Snow />

        {/* Free month badge */}
        <div style={{ position: 'absolute', top: 'calc(var(--nav-h) + 32px)', right: 'var(--gutter)', zIndex: 3, display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.06)', animation: 'fadeIn 1s ease 0.8s both' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)', animation: 'pulse 2.5s ease infinite', display: 'block' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase' }}>First Month — Free Handling Fee</span>
        </div>

        {/* Main hero content */}
        <div style={{ position: 'relative', zIndex: 3, maxWidth: '760px' }}>

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'clamp(20px,3vh,36px)', animation: 'riseIn 1s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--gold)' }} />
            <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)' }}>Japan Export Partner ／ 日本発 輸出支援</span>
          </div>

          {/* Japanese primary headline — largest, most prominent */}
          <h1 style={{
            fontFamily: "'Noto Serif JP',serif",
            fontWeight: 200,
            fontSize: 'clamp(34px,5.5vw,72px)',
            lineHeight: 1.65,
            letterSpacing: '0.12em',
            color: 'var(--washi)',
            marginBottom: 'clamp(16px,2.5vh,28px)',
            animation: 'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s both',
          }}>
            日本から、世界へ。<br />
            <span style={{ color: 'var(--gold)' }}>信頼でつなぐ</span>輸出の道。
          </h1>

          {/* English sub-headline */}
          <p style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontWeight: 300,
            fontSize: 'clamp(22px,3vw,40px)',
            fontStyle: 'italic',
            letterSpacing: '0.08em',
            color: 'rgba(248,245,239,0.62)',
            lineHeight: 1.5,
            marginBottom: 'clamp(14px,2vh,24px)',
            animation: 'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.42s both',
          }}>
            Delivering <span style={{ color: 'var(--gold)' }}>Trust</span> from Japan.
          </p>

          {/* Body text */}
          <p style={{
            fontSize: 'clamp(13px,1.4vw,16px)',
            fontWeight: 300,
            letterSpacing: '0.06em',
            color: 'var(--washi-dim)',
            maxWidth: '520px',
            lineHeight: 2.2,
            marginBottom: 'clamp(36px,5vh,56px)',
            animation: 'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.54s both',
          }}>
            Legal, compliant, and trusted export support from Japan to the world.<br />
            法令遵守・正規調達・透明な取引を基本とした、信頼の輸出パートナー。
          </p>

          {/* CTA buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'wrap', animation: 'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.66s both' }}>
            <Link href="/contact" className="btn-primary">
              Request a Quote <ArrowRight />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Contact Us <ArrowRight size={12} />
            </Link>
            <Link href="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '11px', fontWeight: 300, letterSpacing: '0.2em',
              color: 'rgba(201,168,76,0.7)', textDecoration: 'none',
              textTransform: 'uppercase', transition: 'color 0.3s',
            }}>
              Get Export Support <ArrowRight size={11} />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '32px', right: 'var(--gutter)', zIndex: 3, display: 'flex', alignItems: 'center', gap: '10px', animation: 'fadeIn 1s ease 1.2s both' }}>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom,var(--gold),transparent)', animation: 'scrollPulse 2s ease infinite' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--suzu-dim)', writingMode: 'vertical-rl' }}>Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TRUST BAR
      ══════════════════════════════════════ */}
      <section style={{ background: 'var(--navy-mid)', borderTop: '1px solid rgba(201,168,76,0.1)', borderBottom: '1px solid rgba(201,168,76,0.1)', padding: '32px var(--gutter)' }}>
        <ScrollReveal stagger>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            {['古物商許可証 第305581606050号','税関輸出入者コード 10000NKS0000','初回1ヶ月 手配手数料無料','法令遵守 / Full Compliance','DHL / FedEx / EMS / 航空 / 海上'].map((text) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', opacity: 0.7, flexShrink: 0, display: 'block' }} />
                <span style={{ fontSize: '10.5px', fontWeight: 300, letterSpacing: '0.1em', color: 'var(--washi-dim)' }}>{text}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════
          ABOUT + REPRESENTATIVE
      ══════════════════════════════════════ */}
      <section style={{ padding: 'var(--section-pad) var(--gutter)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(48px,6vw,100px)', alignItems: 'center' }}>
        <ScrollReveal>
          <div className="section-label"><div className="section-label-line" /><span className="section-label-text">About Us</span></div>
          <h2 className="section-title">A Clear Path<br />from Japan<br />to the <em>World.</em></h2>
          <p className="section-body">YUKIMICHI – SNOWPATH JAPAN は、日本法人 JUSTHEN Co., Ltd. が運営する輸出支援サービスです。<br /><br />雪道は険しくとも、一歩ずつ正しく進めば必ず目的地へ辿り着ける——その信念を輸出という仕事に重ねています。<br /><br />We source authentic products legally in Japan and deliver them worldwide with full compliance and transparency.</p>
          <Link href="/about" className="btn-ghost">会社概要を見る <ArrowRight size={12} /></Link>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div style={{ position: 'relative' }}>
            {/* Representative — larger, more authoritative */}
            <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
              {/* Square portrait — more executive/corporate than circle */}
              <div style={{
                position: 'relative',
                width: '140px',
                height: '168px',
                flexShrink: 0,
                overflow: 'hidden',
                borderRadius: '2px',
                border: '1px solid rgba(201,168,76,0.3)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}>
                <Image
                  src="/profile.png"
                  alt="代表 林 祐樹 / Yuuki Hayashi — JUSTHEN Co., Ltd."
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  sizes="140px"
                />
                {/* Subtle gold overlay on bottom */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px', background: 'linear-gradient(to top, rgba(7,17,31,0.7), transparent)' }} />
              </div>
              <div style={{ paddingTop: '8px' }}>
                {/* Title label */}
                <div style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.8, marginBottom: '8px' }}>
                  Representative Director
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '20px', fontWeight: 400, color: 'var(--washi)', marginBottom: '4px', lineHeight: 1.2 }}>
                  Yuuki Hayashi
                </div>
                <div style={{ fontFamily: "'Noto Serif JP',serif", fontSize: '14px', fontWeight: 200, color: 'var(--washi-dim)', marginBottom: '14px', letterSpacing: '0.15em' }}>
                  林 祐樹
                </div>
                <div style={{ fontSize: '11px', fontWeight: 300, letterSpacing: '0.1em', color: 'var(--washi-faint)', lineHeight: 1.9 }}>
                  JUSTHEN Co., Ltd.<br />
                  株式会社ジャッセン<br />
                  Sapporo, Japan
                </div>
              </div>
            </div>

            {/* Company credentials card */}
            <div style={{ background: 'var(--navy-mid)', border: '1px solid rgba(201,168,76,0.12)', padding: '40px 36px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '60px', background: 'var(--gold)' }} />
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 400, color: 'var(--washi)', marginBottom: '24px' }}>JUSTHEN Co., Ltd.</div>
              {[
                { num:'01', title:'法令遵守 / Full Compliance',    desc:'日本輸出法令・仕向地輸入規制を厳守した透明な取引' },
                { num:'02', title:'小ロット対応 / From 1 Unit',    desc:'1個からの小ロット・サンプル出荷に対応' },
                { num:'03', title:'AI / DX 活用',                  desc:'最新AIツールで見積・対応・業務を高速化' },
                { num:'04', title:'多言語対応 / Multilingual',      desc:'英語・日本語対応。中国語・スペイン語も対応可' },
              ].map(({ num, title, desc }) => (
                <div key={num} style={{ display: 'flex', gap: '14px', marginBottom: '20px' }}>
                  <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '28px', fontWeight: 300, color: 'var(--gold)', lineHeight: 1, minWidth: '44px' }}>{num}</span>
                  <div style={{ paddingTop: '4px' }}>
                    <strong style={{ display: 'block', color: 'var(--washi)', fontWeight: 300, fontSize: '13px', marginBottom: '2px' }}>{title}</strong>
                    <span style={{ fontSize: '12px', color: 'var(--washi-faint)', fontWeight: 300 }}>{desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ══════════════════════════════════════
          SERVICES
      ══════════════════════════════════════ */}
      <section style={{ padding: 'var(--section-pad) var(--gutter)', background: 'linear-gradient(180deg,var(--navy-deep) 0%,var(--navy-mid) 100%)' }}>
        <ScrollReveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '56px', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div className="section-label"><div className="section-label-line" /><span className="section-label-text">Services</span></div>
              <h2 className="section-title">What We Do<br />for <em>You.</em></h2>
            </div>
            <Link href="/services" className="btn-ghost">すべてのサービス <ArrowRight size={12} /></Link>
          </div>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.08)' }} className="services-grid">
          {services.map((s) => <ServiceCard key={s.num} {...s} />)}
        </div>
        <style>{`@media(max-width:900px){.services-grid{grid-template-columns:repeat(2,1fr)!important}}@media(max-width:600px){.services-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ══════════════════════════════════════
          FLOW
      ══════════════════════════════════════ */}
      <section style={{ padding: 'var(--section-pad) var(--gutter)' }}>
        <ScrollReveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><div className="section-label-line" /><span className="section-label-text">How It Works</span><div className="section-label-line" /></div>
            <h2 className="section-title" style={{ textAlign: 'center', marginTop: '12px' }}>Simple, Clear,<br /><em>Trusted</em> Process.</h2>
          </div>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }} className="flow-grid">
          {flowSteps.map((s) => <FlowStep key={s.num} {...s} />)}
        </div>
        <style>{`@media(max-width:768px){.flow-grid{grid-template-columns:repeat(2,1fr)!important;gap:40px!important}}`}</style>
        <div style={{ textAlign: 'center', marginTop: '52px' }}>
          <Link href="/flow" className="btn-ghost">取引の流れ 詳細を見る <ArrowRight size={12} /></Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PRICING
      ══════════════════════════════════════ */}
      <section style={{ padding: 'var(--section-pad) var(--gutter)', background: 'var(--navy-mid)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <ScrollReveal>
          <div className="section-label"><div className="section-label-line" /><span className="section-label-text">Pricing</span></div>
          <h2 className="section-title">Transparent<br /><em>Pricing.</em></h2>
          <p className="section-body" style={{ maxWidth: '520px' }}>初回1ヶ月は手配手数料無料。2ヶ月目以降は輸送方法により手数料が設定されます。商品代・送料・関税はすべて実費です。</p>
        </ScrollReveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginTop: '56px' }} className="price-grid">
          {priceCards.map((c) => <PriceCard key={c.label} {...c} />)}
        </div>
        <style>{`@media(max-width:768px){.price-grid{grid-template-columns:1fr!important}}`}</style>
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/pricing" className="btn-ghost">料金表の詳細を見る <ArrowRight size={12} /></Link>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════ */}
      <section style={{ padding: 'var(--section-pad) var(--gutter)', background: 'linear-gradient(160deg,#07111f 0%,#0d1c35 60%,#07111f 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(201,168,76,0.05) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <ScrollReveal>
          <div style={{ position: 'relative', maxWidth: '640px', margin: '0 auto' }}>
            <div className="section-label" style={{ justifyContent: 'center', marginBottom: '24px' }}><div className="section-label-line" /><span className="section-label-text">Get Started</span><div className="section-label-line" /></div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(36px,5vw,60px)', lineHeight: 1.15, color: 'var(--washi)', marginBottom: '20px' }}>
              Start Your<br /><em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Snowpath</em><br />Today.
            </h2>
            <p style={{ fontSize: '13px', fontWeight: 300, color: 'var(--washi-dim)', lineHeight: 2.1, letterSpacing: '0.05em', marginBottom: '44px' }}>
              初回1ヶ月は手配手数料無料でお試しいただけます。<br />
              まずはご希望の商品・仕向地をお知らせください。<br />
              For new partners — no handling fee for the first month.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary" style={{ fontSize: '12px', padding: '16px 40px' }}>
                Request a Free Quote <ArrowRight />
              </Link>
              <Link href="/contact" className="btn-ghost">
                Contact Us <ArrowRight size={12} />
              </Link>
            </div>
            <p style={{ marginTop: '24px', fontSize: '11px', letterSpacing: '0.08em', color: 'var(--suzu-dim)' }}>
              国・地域により輸出入制限があります。事前確認のうえご案内いたします。
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
