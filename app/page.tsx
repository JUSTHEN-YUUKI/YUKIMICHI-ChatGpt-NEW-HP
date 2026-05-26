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
      <p style={{ fontSize: '11.5px', fontWeight: 300, color: 'var(--washi-faint)', lineHeight: 1.9, whiteSpace: 'pre-line' as const }}>{desc}</p>
    </div>
  )
}

const services: ServiceCardProps[] = [
  { num: '01', title: 'Export Support', titleJp: '輸出サポート', desc: '日本国内の商品調達から輸出書類・通関業者調整・発送まで一括サポート。法令遵守の透明な輸出手続きを代行します。', icon: <svg viewBox="0 0 36 36" fill="none" style={{width:'100%',height:'100%'}}><path d="M6 10l12-6 12 6v10c0 6-5 10-12 12C11 30 6 26 6 20V10z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M13 18l3 3 7-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { num: '02', title: 'Sourcing', titleJp: '商品調達・買い付け', desc: '日本限定品・地域限定品・入手困難品も正規流通ルートで調達。和牛・日本酒・コスメ・ホビーなど幅広く対応。', icon: <svg viewBox="0 0 36 36" fill="none" style={{width:'100%',height:'100%'}}><circle cx="18" cy="18" r="12" stroke="currentColor" strokeWidth="1.2"/><path d="M12 12c2-2 8-3 12 0M11 23c2 3 9 5 14 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { num: '03', title: 'Logistics', titleJp: '物流・配送最適化', desc: 'DHL・FedEx・EMS・航空貨物・海上輸送を比較し最適なルートを提案。総着地コスト・配送速度・通関リスクを考慮。', icon: <svg viewBox="0 0 36 36" fill="none" style={{width:'100%',height:'100%'}}><rect x="6" y="10" width="24" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 15h24M12 21h4M20 21h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { num: '04', title: 'Compliance', titleJp: '法務・コンプライアンス', desc: 'HSコード参考提示・輸出規制確認・インコタームズ対応・仕向地輸入規制の事前確認まで対応します。', icon: <svg viewBox="0 0 36 36" fill="none" style={{width:'100%',height:'100%'}}><path d="M10 28V14l8-8 8 8v14" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><rect x="14" y="20" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/></svg> },
  { num: '05', title: 'Influencer & SNS', titleJp: 'インフルエンサー支援', desc: '海外インフルエンサー・クリエイター向けの専用プラン。DM営業・見積・発送まで一気通貫でサポートします。', icon: <svg viewBox="0 0 36 36" fill="none" style={{width:'100%',height:'100%'}}><path d="M8 26l6-8 4 4 4-6 6 10H8z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><circle cx="26" cy="12" r="4" stroke="currentColor" strokeWidth="1.2"/></svg> },
  { num: '06', title: 'AI / DX', titleJp: 'AI・業務自動化', desc: '見積自動生成・多言語自動返信・AIチャットボット搭載。最新DXツールで問い合わせから発送まで高速対応。', icon: <svg viewBox="0 0 36 36" fill="none" style={{width:'100%',height:'100%'}}><rect x="8" y="8" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.2"/><circle cx="18" cy="18" r="3.5" stroke="currentColor" strokeWidth="1.2"/></svg> },
]
const flowSteps: FlowStepProps[] = [
  { num: '01', title: 'お問い合わせ', desc: 'メール・フォームから\nご希望商品・仕向地を\nお知らせください' },
  { num: '02', title: '見積・確認', desc: '輸入規制を確認後\n正式な見積書を\nご提出します' },
  { num: '03', title: '契約・お支払い', desc: '最終確認・契約後\n事前入金をお願い\nしています' },
  { num: '04', title: '手配・発送', desc: '着金確認後に手配開始\n追跡番号をご連絡\nお届けまで対応します' },
]
const priceCards: PriceCardProps[] = [
  { label: 'International Express', icon: '📦', name: 'EMS / DHL / FedEx / UPS', fee: '15', unit: '% of product value', note: '最低手数料 ¥10,000 / 回\n小ロット・短納期・スピード重視の案件に最適' },
  { label: 'Air Cargo', icon: '✈️', name: '航空貨物', fee: '10', unit: '% of product value', note: '最低手数料 ¥30,000 / 回\n緊急性の高い貨物・高額商品・納期重視の案件', highlight: true },
  { label: 'Sea Container', icon: '🚢', name: '海上コンテナ FCL / LCL', fee: '7', unit: '% of product value', note: 'FCL 最低 ¥50,000 / LCL 最低 ¥30,000\n大量発送・コスト重視の案件に最適' },
]

export default function Home() {
  return (
    <>
      <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 var(--gutter) clamp(60px,8vh,100px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 65% 40%,rgba(201,168,76,0.055) 0%,transparent 60%),linear-gradient(160deg,#07111f 0%,#0a1828 50%,#07111f 100%)', zIndex: 0 }} />
        {/* Hero background photo */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            style={{ objectFit: 'cover', objectPosition: 'center', opacity: 0.18 }}
            priority
            sizes="100vw"
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,17,31,0.92) 0%, rgba(7,17,31,0.65) 55%, rgba(7,17,31,0.82) 100%)' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.04) 1px,transparent 1px)', backgroundSize: '80px 80px', zIndex: 1, maskImage: 'linear-gradient(to bottom,transparent 0%,black 30%,black 70%,transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom,transparent 0%,black 30%,black 70%,transparent 100%)' }} />
        <Snow />
        <div style={{ position: 'absolute', top: 'calc(var(--nav-h) + 32px)', right: 'var(--gutter)', zIndex: 3, display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid rgba(201,168,76,0.2)', background: 'rgba(201,168,76,0.04)', animation: 'fadeIn 1s ease 0.8s both' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)', animation: 'pulse 2.5s ease infinite', display: 'block' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase' }}>First Month — Free Handling Fee</span>
        </div>
        <div style={{ position: 'relative', zIndex: 3, maxWidth: '900px' }}>
          <div style={{ marginBottom: 'clamp(24px,3.5vh,40px)', animation: 'riseIn 1s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>
            <Image
              src="/yukimichi-logo-transparent.png"
              alt="YUKIMICHI 雪道"
              width={96}
              height={96}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'clamp(28px,4vh,48px)', animation: 'riseIn 1s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--gold)' }} />
            <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)' }}>Japan Export Partner ／ 日本発 輸出支援</span>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 300, fontSize: 'clamp(54px,9vw,120px)', lineHeight: 0.95, letterSpacing: '-0.02em', color: 'var(--washi)', marginBottom: 'clamp(20px,3vh,36px)', animation: 'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.35s both' }}>
            Delivering<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Trust</em><br />from Japan.
            <span style={{ display: 'block', fontFamily: "'Noto Serif JP',serif", fontSize: 'clamp(13px,1.8vw,20px)', fontWeight: 200, letterSpacing: '0.35em', color: 'var(--suzu)', marginTop: '14px' }}>日本から、誠実な道を世界へ。</span>
          </h1>
          <p style={{ fontSize: 'clamp(13px,1.3vw,15px)', fontWeight: 300, letterSpacing: '0.08em', color: 'var(--washi-dim)', maxWidth: '460px', lineHeight: 2, marginBottom: 'clamp(36px,5vh,56px)', animation: 'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.5s both' }}>
            Legal, compliant, and transparent export support<br />from Japan to the world — for influencers,<br />brands, and global partners.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', animation: 'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.65s both' }}>
            <Link href="/contact" className="btn-primary">お問い合わせ / Contact Us <ArrowRight /></Link>
            <Link href="/services" className="btn-ghost">サービスを見る <ArrowRight size={12} /></Link>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '32px', right: 'var(--gutter)', zIndex: 3, display: 'flex', alignItems: 'center', gap: '10px', animation: 'fadeIn 1s ease 1.2s both' }}>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom,var(--gold),transparent)', animation: 'scrollPulse 2s ease infinite' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--suzu-dim)', writingMode: 'vertical-rl' }}>Scroll</span>
        </div>
      </section>

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

      <section style={{ padding: 'var(--section-pad) var(--gutter)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 'clamp(48px,6vw,100px)', alignItems: 'center' }}>
        <ScrollReveal>
          <div className="section-label"><div className="section-label-line" /><span className="section-label-text">About Us</span></div>
          <h2 className="section-title">A Clear Path<br />from Japan<br />to the <em>World.</em></h2>
          <p className="section-body">YUKIMICHI – SNOWPATH JAPAN は、日本法人 JUSTHEN Co., Ltd. が運営する輸出支援サービスです。<br /><br />雪道は険しくとも、一歩ずつ正しく進めば必ず目的地へ辿り着ける——その信念を輸出という仕事に重ねています。<br /><br />We source authentic products legally in Japan and deliver them worldwide with full compliance and transparency.</p>
          <Link href="/about" className="btn-ghost">会社概要を見る <ArrowRight size={12} /></Link>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <div style={{ position: 'relative' }}>
            {/* Profile photo */}
            <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '1.5px solid rgba(201,168,76,0.35)', flexShrink: 0 }}>
                <Image
                  src="/profile.png"
                  alt="林 祐樹 / Yuki Hayashi"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  sizes="80px"
                />
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '16px', fontWeight: 400, color: 'var(--washi)', marginBottom: '2px' }}>林 祐樹 / Yuki Hayashi</div>
                <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--gold)', fontWeight: 300 }}>Representative, JUSTHEN Co., Ltd.</div>
              </div>
            </div>
          <div style={{ background: 'var(--navy-mid)', border: '1px solid rgba(201,168,76,0.12)', padding: '40px 36px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '60px', background: 'var(--gold)' }} />
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '22px', fontWeight: 400, color: 'var(--washi)', marginBottom: '24px' }}>JUSTHEN Co., Ltd.</div>
            {[{num:'01',title:'法令遵守 / Full Compliance',desc:'日本輸出法令・仕向地輸入規制を厳守した透明な取引'},{num:'02',title:'小ロット対応 / MOQ from 1 unit',desc:'1個からの小ロット・サンプル出荷に対応'},{num:'03',title:'AI / DX 活用',desc:'最新AIツールで見積・対応・業務を高速化'},{num:'04',title:'多言語対応 / Multilingual',desc:'英語・日本語対応。中国語・スペイン語も対応可'}].map(({num,title,desc})=>(
              <div key={num} style={{display:'flex',gap:'14px',marginBottom:'20px'}}>
                <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:'28px',fontWeight:300,color:'var(--gold)',lineHeight:1,minWidth:'44px'}}>{num}</span>
                <div style={{paddingTop:'4px'}}>
                  <strong style={{display:'block',color:'var(--washi)',fontWeight:300,fontSize:'13px',marginBottom:'2px'}}>{title}</strong>
                  <span style={{fontSize:'12px',color:'var(--washi-faint)',fontWeight:300}}>{desc}</span>
                </div>
              </div>
            ))}
          </div>
          </div>
        </ScrollReveal>
      </section>

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
            <Link href="/contact" className="btn-primary" style={{ fontSize: '12px', padding: '16px 40px' }}>
              無料で問い合わせる — Contact Us Free <ArrowRight />
            </Link>
            <p style={{ marginTop: '24px', fontSize: '11px', letterSpacing: '0.08em', color: 'var(--suzu-dim)' }}>
              国・地域により輸出入制限があります。事前確認のうえご案内いたします。
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
