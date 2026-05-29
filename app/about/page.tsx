import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '@/components/ScrollReveal'

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const CREDENTIALS = [
  { label: 'Company',            value: 'JUSTHEN Co., Ltd.\n株式会社ジャッセン' },
  { label: 'Representative',     value: 'Yuuki Hayashi\n林 祐樹' },
  { label: 'Location',           value: 'Sapporo, Hokkaido, Japan\n北海道札幌市' },
  { label: 'Established',        value: 'JUSTHEN Co., Ltd.' },
  { label: 'Antique Dealer',     value: '第305581606050号\n東京都公安委員会' },
  { label: 'Customs Code',       value: '10000NKS0000' },
  { label: 'Issuance ID',        value: 'UXEV00000X6Q' },
  { label: 'Business',           value: 'International Export Support\n国際輸出支援・商品調達・物流手配' },
  { label: 'Carriers',           value: 'EMS · DHL · FedEx · UPS\n航空貨物 · 海上輸送（FCL/LCL）' },
  { label: 'Payment',            value: 'Bank Transfer · Wise · International Wire\n事前入金制' },
]

const TRUST_ITEMS = [
  {
    num: '01',
    en:  'Full Compliance',
    jp:  '法令遵守',
    desc: 'Every export is conducted in strict accordance with Japanese export laws and the import regulations of each destination country. We never compromise on compliance.',
  },
  {
    num: '02',
    en:  'Authentic Products',
    jp:  '正規品のみ',
    desc: 'We source exclusively through authorized and legitimate domestic distribution channels in Japan. Counterfeit or IP-infringing goods are strictly prohibited — without exception.',
  },
  {
    num: '03',
    en:  'Transparent Trade',
    jp:  '透明な取引',
    desc: 'All costs — product, shipping, duties, and fees — are disclosed in full before any arrangement begins. No hidden charges. No surprises.',
  },
  {
    num: '04',
    en:  'Long-term Partnership',
    jp:  '長期取引',
    desc: 'We prioritize reliability and trust over short-term profit. Our goal is to become your permanent gateway to Japan — a partner you return to year after year.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section style={{
        position:   'relative',
        minHeight:  '90vh',
        display:    'flex',
        alignItems: 'flex-end',
        padding:    'calc(var(--nav-h) + clamp(60px,8vh,100px)) var(--gutter) clamp(80px,10vh,120px)',
        overflow:   'hidden',
      }}>
        {/* Background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/hero-bg.jpg"
            alt=""
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 35%', opacity: 0.28 }}
            sizes="100vw"
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: [
              'linear-gradient(to bottom, rgba(7,17,31,0.75) 0%, rgba(7,17,31,0.35) 45%, rgba(7,17,31,0.85) 100%)',
              'linear-gradient(to right, rgba(7,17,31,0.9) 0%, rgba(7,17,31,0.3) 60%, rgba(7,17,31,0.7) 100%)',
            ].join(', '),
          }} />
        </div>

        {/* Gold top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.5) 30%,rgba(201,168,76,0.5) 70%,transparent)', zIndex: 2 }} />

        {/* Subtle grid */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.025) 1px,transparent 1px)', backgroundSize: '80px 80px', zIndex: 1, maskImage: 'linear-gradient(to bottom,transparent,black 25%,black 75%,transparent)', WebkitMaskImage: 'linear-gradient(to bottom,transparent,black 25%,black 75%,transparent)' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 3, maxWidth: '820px' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'clamp(24px,3.5vh,44px)', animation: 'riseIn 1s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--gold)' }} />
            <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: 'var(--gold)' }}>About Us ／ 会社概要</span>
          </div>

          <h1 style={{
            fontFamily:    "'Cormorant Garamond', serif",
            fontWeight:    300,
            fontSize:      'clamp(38px,5.5vw,72px)',
            lineHeight:    1.12,
            letterSpacing: '-0.01em',
            color:         'var(--washi)',
            marginBottom:  'clamp(20px,2.5vh,32px)',
            animation:     'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s both',
          }}>
            A Trusted Path<br />
            from Japan<br />
            to the <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>World.</em>
          </h1>

          <p style={{
            fontFamily:    "'Noto Serif JP', serif",
            fontWeight:    200,
            fontSize:      'clamp(16px,1.8vw,22px)',
            letterSpacing: '0.15em',
            color:         'rgba(248,245,239,0.7)',
            marginBottom:  'clamp(12px,1.5vh,20px)',
            animation:     'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.42s both',
          }}>
            日本から、誠実な道を世界へ。
          </p>

          <p style={{
            fontSize:      'clamp(13px,1.3vw,15px)',
            fontWeight:    300,
            letterSpacing: '0.06em',
            color:         'rgba(248,245,239,0.5)',
            maxWidth:      '560px',
            lineHeight:    2.1,
            marginBottom:  'clamp(40px,5vh,60px)',
            animation:     'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.54s both',
          }}>
            YUKIMICHI – SNOWPATH JAPAN is an international export support service operated by JUSTHEN Co., Ltd., rooted in the philosophy that every path — however difficult — leads to its destination when walked with honesty and care.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' as const, animation: 'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.64s both' }}>
            <Link href="/contact" className="btn-primary">
              Request a Quote <ArrowRight />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Contact Us <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: '32px', right: 'var(--gutter)', zIndex: 3, display: 'flex', alignItems: 'center', gap: '10px', animation: 'fadeIn 1s ease 1.2s both' }}>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom,var(--gold),transparent)', animation: 'scrollPulse 2s ease infinite' }} />
          <span style={{ fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'var(--suzu-dim)', writingMode: 'vertical-rl' as const }}>Scroll</span>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PHILOSOPHY
      ══════════════════════════════════════ */}
      <section style={{ padding: 'var(--section-pad) var(--gutter)', background: 'var(--navy-mid)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(60px,8vw,120px)', alignItems: 'center' }} className="phi-grid">
          <ScrollReveal>
            <div className="section-label"><div className="section-label-line" /><span className="section-label-text">Philosophy</span></div>
            <h2 className="section-title">
              Why<br /><em>Snowpath?</em>
            </h2>
            <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom,var(--gold),transparent)', margin: '0 0 36px' }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(18px,2vw,26px)', fontWeight: 300, lineHeight: 1.7, color: 'rgba(248,245,239,0.8)', letterSpacing: '0.04em', marginBottom: '28px' }}>
              "A snow-covered path is never easy.<br />But by walking carefully and honestly,<br />you will always reach your destination."
            </p>
            <p className="section-body">
              This is the philosophy behind YUKIMICHI — the Japanese word for "snow path." International export is never a simple road. Regulations change, customs require care, and trust must be earned step by step.<br /><br />
              We built this company on the belief that doing things correctly — legally, transparently, and with sincere attention — is the only sustainable path forward.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <div style={{ position: 'relative' }}>
              {/* Large Japanese calligraphy-style text */}
              <div style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200, fontSize: 'clamp(64px,10vw,140px)', lineHeight: 1, letterSpacing: '0.1em', color: 'rgba(201,168,76,0.07)', userSelect: 'none' as const, marginBottom: '40px', textAlign: 'right' as const }}>
                雪<br />道
              </div>
              <div style={{ borderLeft: '1px solid rgba(201,168,76,0.2)', paddingLeft: '32px' }}>
                {[
                  { jp: '雪道は険しい', en: 'The path is never easy' },
                  { jp: '正しく進む', en: 'Walk with integrity' },
                  { jp: '必ず辿り着く', en: 'You will always arrive' },
                ].map(({ jp, en }, i) => (
                  <div key={jp} style={{ marginBottom: i < 2 ? '32px' : 0, display: 'flex', gap: '20px', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '11px', fontWeight: 300, letterSpacing: '0.25em', color: 'var(--gold)', opacity: 0.7, minWidth: '20px' }}>0{i + 1}</span>
                    <div>
                      <p style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200, fontSize: 'clamp(15px,1.6vw,19px)', color: 'var(--washi)', letterSpacing: '0.15em', marginBottom: '4px' }}>{jp}</p>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '13px', color: 'var(--suzu)', letterSpacing: '0.05em' }}>{en}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
        <style>{`@media(max-width:860px){.phi-grid{grid-template-columns:1fr!important;gap:60px!important}}`}</style>
      </section>

      {/* ══════════════════════════════════════
          REPRESENTATIVE MESSAGE
      ══════════════════════════════════════ */}
      <section style={{ padding: 'var(--section-pad) var(--gutter)', background: 'var(--navy-deep)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <ScrollReveal>
            <div className="section-label"><div className="section-label-line" /><span className="section-label-text">Representative</span></div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 'clamp(56px,7vw,110px)', alignItems: 'start', marginTop: '52px' }} className="rep-grid">

            {/* Portrait */}
            <ScrollReveal>
              <div style={{ position: 'sticky', top: 'calc(var(--nav-h) + 32px)' }}>
                <div style={{ position: 'relative', marginBottom: '28px' }}>
                  {/* Gold frame accent */}
                  <div style={{ position: 'absolute', top: '-10px', left: '-10px', right: '30px', bottom: '30px', border: '1px solid rgba(201,168,76,0.2)', zIndex: 0, pointerEvents: 'none' }} />
                  <div style={{ position: 'relative', zIndex: 1, aspectRatio: '3/4', overflow: 'hidden', borderRadius: '2px' }}>
                    <Image
                      src="/profile.JPG"
                      alt="Yuuki Hayashi — Representative Director, JUSTHEN Co., Ltd."
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center top' }}
                      sizes="(max-width: 860px) 80vw, 360px"
                    />
                    {/* Subtle bottom fade */}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to top,rgba(7,17,31,0.6),transparent)' }} />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase' as const, color: 'var(--gold)', opacity: 0.8, marginBottom: '10px' }}>
                    Representative Director
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 400, color: 'var(--washi)', lineHeight: 1.2, marginBottom: '6px' }}>
                    Yuuki Hayashi
                  </div>
                  <div style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200, fontSize: '15px', letterSpacing: '0.2em', color: 'var(--washi-dim)', marginBottom: '16px' }}>
                    林 祐樹
                  </div>
                  <div style={{ fontSize: '11.5px', fontWeight: 300, letterSpacing: '0.08em', color: 'var(--washi-faint)', lineHeight: 1.9 }}>
                    JUSTHEN Co., Ltd.<br />
                    株式会社ジャッセン<br />
                    Sapporo, Hokkaido, Japan
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Message */}
            <ScrollReveal delay={120}>
              <div style={{ paddingTop: '8px' }}>
                <div style={{ borderLeft: '2px solid rgba(201,168,76,0.35)', paddingLeft: '32px', marginBottom: '52px' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,28px)', fontWeight: 300, lineHeight: 1.6, color: 'rgba(248,245,239,0.85)', letterSpacing: '0.02em', marginBottom: '20px' }}>
                    "To every partner who entrusts us with their Japan sourcing — we take that trust seriously, and we earn it one shipment at a time."
                  </p>
                </div>

                <div style={{ fontSize: '14px', fontWeight: 300, lineHeight: 2.3, color: 'var(--washi-dim)', letterSpacing: '0.05em', marginBottom: '40px' }}>
                  <p style={{ marginBottom: '22px' }}>
                    海外のパートナーの皆さまへ。<br />
                    私たちに商品調達をお任せいただけることは、単なるビジネス以上の意味を持ちます。それは、「日本品質への信頼」と「私たちの誠実さへの期待」を預けていただいていることだと理解しています。
                  </p>
                  <p style={{ marginBottom: '22px' }}>
                    To our overseas partners — when you choose YUKIMICHI, you are placing your trust not just in a service, but in a person, a company, and a commitment to do what is right. We do not cut corners. We do not take shortcuts. Every export is handled with the same care we would give our most important client.
                  </p>
                  <p>
                    We believe that true business relationships are built over years, not transactions. Our goal is not simply to ship your order — it is to become the partner you rely on every time you need something from Japan.
                  </p>
                </div>

                {/* Signature area */}
                <div style={{ borderTop: '1px solid rgba(201,168,76,0.12)', paddingTop: '32px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' as const }}>
                  <div>
                    <div style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200, fontSize: '19px', letterSpacing: '0.2em', color: 'var(--washi)', marginBottom: '4px' }}>
                      林 祐樹
                    </div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', fontWeight: 300, letterSpacing: '0.15em', color: 'var(--suzu)' }}>
                      Yuuki Hayashi — JUSTHEN Co., Ltd.
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <style>{`@media(max-width:860px){.rep-grid{grid-template-columns:1fr!important;gap:56px!important}}`}</style>
      </section>

      {/* ══════════════════════════════════════
          COMPANY PROFILE
      ══════════════════════════════════════ */}
      <section style={{ padding: 'var(--section-pad) var(--gutter)', background: 'var(--navy-mid)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <ScrollReveal>
            <div className="section-label"><div className="section-label-line" /><span className="section-label-text">Company Profile</span></div>
            <h2 className="section-title">JUSTHEN<br />Co., Ltd.</h2>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', marginTop: '56px', background: 'rgba(201,168,76,0.08)' }} className="cred-grid">
            {CREDENTIALS.map(({ label, value }, i) => (
              <ScrollReveal key={label} delay={i * 40}>
                <div style={{ background: 'var(--navy-mid)', padding: 'clamp(24px,3vw,40px) clamp(24px,3.5vw,48px)', borderBottom: '1px solid rgba(201,168,76,0.06)' }}>
                  <div style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.38em', textTransform: 'uppercase' as const, color: 'var(--gold)', opacity: 0.75, marginBottom: '14px' }}>
                    {label}
                  </div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(15px,1.6vw,19px)', fontWeight: 300, color: 'var(--washi)', lineHeight: 1.7, whiteSpace: 'pre-line' as const, letterSpacing: '0.03em' }}>
                    {value}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:640px){.cred-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ══════════════════════════════════════
          TRUST & COMPLIANCE
      ══════════════════════════════════════ */}
      <section style={{ padding: 'var(--section-pad) var(--gutter)', background: 'linear-gradient(160deg,var(--navy-deep) 0%,var(--navy-mid) 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '72px', flexWrap: 'wrap' as const, gap: '24px' }}>
              <div>
                <div className="section-label"><div className="section-label-line" /><span className="section-label-text">Trust &amp; Compliance</span></div>
                <h2 className="section-title">
                  Built on<br /><em>Integrity.</em>
                </h2>
              </div>
              <div style={{ borderLeft: '1px solid rgba(201,168,76,0.2)', paddingLeft: '28px', maxWidth: '340px' }}>
                <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 2, color: 'var(--washi-faint)', letterSpacing: '0.05em' }}>
                  For overseas buyers, compliance is not optional — it is the foundation of every trustworthy relationship. These are our core commitments.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: 'rgba(201,168,76,0.06)' }} className="trust-grid">
            {TRUST_ITEMS.map(({ num, en, jp, desc }, i) => (
              <ScrollReveal key={num} delay={i * 80}>
                <div style={{ background: 'var(--navy-deep)', padding: 'clamp(36px,4vw,56px) clamp(28px,3.5vw,48px)', position: 'relative', overflow: 'hidden' }}>
                  {/* Large background number */}
                  <div style={{ position: 'absolute', top: '-10px', right: '24px', fontFamily: "'Cormorant Garamond', serif", fontSize: '120px', fontWeight: 300, color: 'rgba(201,168,76,0.04)', lineHeight: 1, userSelect: 'none' as const, pointerEvents: 'none' as const }}>
                    {num}
                  </div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.3em', color: 'var(--gold)', opacity: 0.7, marginBottom: '20px' }}>{num}</div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 300, color: 'var(--washi)', lineHeight: 1.2, marginBottom: '6px' }}>{en}</h3>
                    <p style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200, fontSize: '12px', letterSpacing: '0.2em', color: 'var(--gold)', opacity: 0.8, marginBottom: '24px' }}>{jp}</p>
                    <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 2.1, color: 'var(--washi-faint)', letterSpacing: '0.04em' }}>{desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Compliance badge row */}
          <ScrollReveal>
            <div style={{ marginTop: '56px', display: 'flex', flexWrap: 'wrap' as const, gap: '12px', justifyContent: 'center' }}>
              {[
                'Japanese Export Law',
                'Destination Import Regulations',
                'Antique Dealer License',
                'Customs Registration',
                'Authentic Sourcing Only',
                'No Counterfeit Goods',
                'GDPR Aware',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.04)' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', opacity: 0.7, flexShrink: 0, display: 'block' }} />
                  <span style={{ fontSize: '10.5px', fontWeight: 300, letterSpacing: '0.12em', color: 'var(--washi-dim)' }}>{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
        <style>{`@media(max-width:768px){.trust-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════ */}
      <section style={{ padding: 'var(--section-pad) var(--gutter)', background: 'var(--navy-mid)', borderTop: '1px solid rgba(201,168,76,0.08)', textAlign: 'center' as const, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(201,168,76,0.04) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <ScrollReveal>
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}><div className="section-label-line" /><span className="section-label-text">Begin the Journey</span><div className="section-label-line" /></div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(34px,4.5vw,52px)', lineHeight: 1.15, color: 'var(--washi)', marginTop: '24px', marginBottom: '20px' }}>
              Ready to Source<br />from <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Japan?</em>
            </h2>
            <p style={{ fontSize: '13.5px', fontWeight: 300, color: 'var(--washi-dim)', lineHeight: 2.1, letterSpacing: '0.05em', marginBottom: '44px' }}>
              初回1ヶ月は手配手数料無料でお試しいただけます。<br />
              ご希望の商品・仕向地をお知らせください。<br />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '15px', color: 'var(--suzu)' }}>
                No handling fee for the first month — for all new partners.
              </span>
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' as const }}>
              <Link href="/contact" className="btn-primary" style={{ fontSize: '11.5px', padding: '18px 44px' }}>
                Request a Free Quote <ArrowRight />
              </Link>
              <Link href="/contact" className="btn-ghost">
                Contact Us <ArrowRight size={12} />
              </Link>
            </div>
            <p style={{ marginTop: '28px', fontSize: '11px', letterSpacing: '0.08em', color: 'var(--suzu-dim)' }}>
              国・地域により輸出入制限があります。事前確認のうえご案内いたします。
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
