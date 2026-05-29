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
  { label: 'Company',        value: 'JUSTHEN Co., Ltd.\n\u682a\u5f0f\u4f1a\u793e\u30b8\u30e3\u30c3\u30bb\u30f3' },
  { label: 'Representative', value: 'Yuuki Hayashi\n\u6797 \u7950\u6a39' },
  { label: 'Location',       value: 'Sapporo, Hokkaido, Japan\n\u5317\u6d77\u9053\u672d\u5e4c\u5e02' },
  { label: 'Established',    value: 'JUSTHEN Co., Ltd.' },
  { label: 'Antique Dealer', value: '\u7b2c305581606050\u53f7\n\u6771\u4eac\u90fd\u516c\u5b89\u59d4\u54e1\u4f1a' },
  { label: 'Customs Code',   value: '10000NKS0000' },
  { label: 'Issuance ID',    value: 'UXEV00000X6Q' },
  { label: 'Business',       value: 'International Export Support\n\u56fd\u969b\u8f38\u51fa\u652f\u63f4\u30fb\u5546\u54c1\u8abf\u9054\u30fb\u7269\u6d41\u624b\u914d' },
  { label: 'Carriers',       value: 'EMS / DHL / FedEx / UPS\n\u822a\u7a7a\u8ca8\u7269 / \u6d77\u4e0a\u8f38\u9001\uff08FCL/LCL\uff09' },
  { label: 'Payment',        value: 'Bank Transfer / Wise / International Wire\n\u4e8b\u524d\u5165\u91d1\u5236' },
] as const

const TRUST_ITEMS = [
  {
    num: '01', en: 'Full Compliance', jp: '\u6cd5\u4ee4\u9075\u5b88',
    desc: 'Every export is conducted in strict accordance with Japanese export laws and the import regulations of each destination country. We never compromise on compliance.',
  },
  {
    num: '02', en: 'Authentic Products', jp: '\u6b63\u898f\u54c1\u306e\u307f',
    desc: 'We source exclusively through authorized and legitimate domestic distribution channels in Japan. Counterfeit or IP-infringing goods are strictly prohibited without exception.',
  },
  {
    num: '03', en: 'Transparent Trade', jp: '\u900f\u660e\u306a\u53d6\u5f15',
    desc: 'All costs including product, shipping, duties, and fees are disclosed in full before any arrangement begins. No hidden charges. No surprises.',
  },
  {
    num: '04', en: 'Long-term Partnership', jp: '\u9577\u671f\u53d6\u5f15',
    desc: 'We prioritize reliability and trust over short-term profit. Our goal is to become your permanent gateway to Japan, a partner you return to year after year.',
  },
] as const

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'flex-end',
        padding: 'calc(var(--nav-h, 80px) + clamp(60px,8vh,100px)) var(--gutter, clamp(20px,5vw,80px)) clamp(80px,10vh,120px)',
        overflow: 'hidden',
      }}>
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
            background: 'linear-gradient(to bottom, rgba(7,17,31,0.75) 0%, rgba(7,17,31,0.35) 45%, rgba(7,17,31,0.85) 100%)',
          }} />
        </div>

        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right,transparent,rgba(201,168,76,0.5) 30%,rgba(201,168,76,0.5) 70%,transparent)', zIndex: 2 }} />

        <div style={{ position: 'relative', zIndex: 3, maxWidth: '820px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: 'clamp(24px,3.5vh,44px)', animation: 'riseIn 1s cubic-bezier(0.16,1,0.3,1) 0.2s both' }}>
            <div style={{ width: '32px', height: '1px', background: 'var(--gold)' }} />
            <span style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.4em', textTransform: 'uppercase' as const, color: 'var(--gold)' }}>
              About Us / \u4f1a\u793e\u6982\u8981
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 300,
            fontSize: 'clamp(38px,5.5vw,72px)',
            lineHeight: 1.12,
            color: 'var(--washi)',
            marginBottom: 'clamp(20px,2.5vh,32px)',
            animation: 'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.3s both',
          }}>
            A Trusted Path<br />
            from Japan<br />
            to the <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>World.</em>
          </h1>

          <p style={{
            fontFamily: "'Noto Serif JP', serif",
            fontWeight: 200,
            fontSize: 'clamp(16px,1.8vw,22px)',
            letterSpacing: '0.15em',
            color: 'rgba(248,245,239,0.7)',
            marginBottom: 'clamp(12px,1.5vh,20px)',
            animation: 'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.42s both',
          }}>
            \u65e5\u672c\u304b\u3089\u3001\u8aa0\u5b9f\u306a\u9053\u3092\u4e16\u754c\u3078\u3002
          </p>

          <p style={{
            fontSize: 'clamp(13px,1.3vw,15px)',
            fontWeight: 300,
            letterSpacing: '0.06em',
            color: 'rgba(248,245,239,0.5)',
            maxWidth: '560px',
            lineHeight: 2.1,
            marginBottom: 'clamp(40px,5vh,60px)',
            animation: 'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.54s both',
          }}>
            YUKIMICHI is an international export support service operated by JUSTHEN Co., Ltd., rooted in the philosophy that every path, however difficult, leads to its destination when walked with honesty and care.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' as const, animation: 'riseIn 1.1s cubic-bezier(0.16,1,0.3,1) 0.64s both' }}>
            <Link href="/contact" className="btn-primary">
              Request a Quote <ArrowRight />
            </Link>
            <Link href="/contact" className="btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '32px', right: 'clamp(20px,5vw,80px)', zIndex: 3, display: 'flex', alignItems: 'center', gap: '10px', animation: 'fadeIn 1s ease 1.2s both' }}>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom,var(--gold),transparent)' }} />
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section style={{ padding: 'clamp(80px,10vw,140px) var(--gutter, clamp(20px,5vw,80px))', background: 'var(--navy-mid, #0d1f38)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(60px,8vw,120px)', alignItems: 'center' }} className="phi-grid">
          <ScrollReveal>
            <div className="section-label" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'var(--gold)', fontWeight: 300 }}>Philosophy</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.15, color: 'var(--washi, #f8f5ef)', marginBottom: '36px' }}>
              Why<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Snowpath?</em>
            </h2>
            <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom,var(--gold),transparent)', margin: '0 0 36px' }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(18px,2vw,26px)', fontWeight: 300, lineHeight: 1.7, color: 'rgba(248,245,239,0.8)', marginBottom: '28px' }}>
              &#x201C;A snow-covered path is never easy.<br />But by walking carefully and honestly,<br />you will always reach your destination.&#x201D;
            </p>
            <p style={{ fontSize: '14px', fontWeight: 300, lineHeight: 2.3, color: 'rgba(248,245,239,0.55)', letterSpacing: '0.05em' }}>
              This is the philosophy behind YUKIMICHI &#8212; the Japanese word for &#x201C;snow path.&#x201D; International export is never a simple road. Regulations change, customs require care, and trust must be earned step by step.<br /><br />
              We built this company on the belief that doing things correctly &#8212; legally, transparently, and with sincere attention &#8212; is the only sustainable path forward.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <div>
              <div style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200, fontSize: 'clamp(64px,10vw,140px)', lineHeight: 1, letterSpacing: '0.1em', color: 'rgba(201,168,76,0.07)', userSelect: 'none' as const, marginBottom: '40px', textAlign: 'right' as const }}>
                \u96ea<br />\u9053
              </div>
              <div style={{ borderLeft: '1px solid rgba(201,168,76,0.2)', paddingLeft: '32px' }}>
                {[
                  { jp: '\u96ea\u9053\u306f\u967a\u3057\u3044', en: 'The path is never easy' },
                  { jp: '\u6b63\u3057\u304f\u9032\u3080', en: 'Walk with integrity' },
                  { jp: '\u5fc5\u305a\u8fba\u308a\u7740\u304f', en: 'You will always arrive' },
                ].map(({ jp, en }, i) => (
                  <div key={jp} style={{ marginBottom: i < 2 ? '32px' : 0, display: 'flex', gap: '20px', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '11px', fontWeight: 300, letterSpacing: '0.25em', color: 'var(--gold)', opacity: 0.7, minWidth: '20px' }}>0{i + 1}</span>
                    <div>
                      <p style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200, fontSize: 'clamp(15px,1.6vw,19px)', color: 'var(--washi, #f8f5ef)', letterSpacing: '0.15em', marginBottom: '4px' }}>{jp}</p>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '13px', color: 'var(--suzu, #8a8f99)', letterSpacing: '0.05em' }}>{en}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
        <style>{`@media(max-width:860px){.phi-grid{grid-template-columns:1fr!important;gap:60px!important}}`}</style>
      </section>

      {/* REPRESENTATIVE MESSAGE */}
      <section style={{ padding: 'clamp(80px,10vw,140px) var(--gutter, clamp(20px,5vw,80px))', background: 'var(--navy-deep, #07111f)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '52px' }}>
              <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'var(--gold)', fontWeight: 300 }}>Representative</span>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 'clamp(56px,7vw,110px)', alignItems: 'start' }} className="rep-grid">
            <ScrollReveal>
              <div style={{ position: 'sticky', top: '112px' }}>
                <div style={{ position: 'relative', marginBottom: '28px' }}>
                  <div style={{ position: 'absolute', top: '-10px', left: '-10px', right: '30px', bottom: '30px', border: '1px solid rgba(201,168,76,0.2)', zIndex: 0, pointerEvents: 'none' as const }} />
                  <div style={{ position: 'relative', zIndex: 1, aspectRatio: '3/4', overflow: 'hidden', borderRadius: '2px' }}>
                    <Image
                      src="/profile.JPG"
                      alt="Yuuki Hayashi - Representative Director, JUSTHEN Co., Ltd."
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center top', filter: 'brightness(1.05) contrast(1.02)' }}
                      sizes="(max-width: 860px) 80vw, 360px"
                    />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '80px', background: 'linear-gradient(to top,rgba(7,17,31,0.6),transparent)' }} />
                  </div>
                </div>
                <div style={{ fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase' as const, color: 'var(--gold)', opacity: 0.8, marginBottom: '10px' }}>Representative Director</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 400, color: 'var(--washi, #f8f5ef)', lineHeight: 1.2, marginBottom: '6px' }}>Yuuki Hayashi</div>
                <div style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200, fontSize: '15px', letterSpacing: '0.2em', color: 'rgba(248,245,239,0.6)', marginBottom: '16px' }}>\u6797 \u7950\u6a39</div>
                <div style={{ fontSize: '11.5px', fontWeight: 300, letterSpacing: '0.08em', color: 'rgba(248,245,239,0.4)', lineHeight: 1.9 }}>
                  JUSTHEN Co., Ltd.<br />
                  \u682a\u5f0f\u4f1a\u793e\u30b8\u30e3\u30c3\u30bb\u30f3<br />
                  Sapporo, Hokkaido, Japan
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120}>
              <div style={{ paddingTop: '8px' }}>
                <div style={{ borderLeft: '2px solid rgba(201,168,76,0.35)', paddingLeft: '32px', marginBottom: '52px' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: 'clamp(19px,2.2vw,28px)', fontWeight: 300, lineHeight: 1.6, color: 'rgba(248,245,239,0.85)', marginBottom: '20px' }}>
                    &#x201C;To every partner who entrusts us with their Japan sourcing &#8212; we take that trust seriously, and we earn it one shipment at a time.&#x201D;
                  </p>
                </div>

                <div style={{ fontSize: '14px', fontWeight: 300, lineHeight: 2.3, color: 'rgba(248,245,239,0.55)', letterSpacing: '0.05em', marginBottom: '40px' }}>
                  <p style={{ marginBottom: '22px' }}>
                    \u6d77\u5916\u306e\u30d1\u30fc\u30c8\u30ca\u30fc\u306e\u7686\u3055\u307e\u3078\u3002<br />
                    \u79c1\u305f\u3061\u306b\u5546\u54c1\u8abf\u9054\u3092\u304a\u4efb\u305b\u3044\u305f\u3060\u3051\u308b\u3053\u3068\u306f\u3001\u5358\u306a\u308b\u30d3\u30b8\u30cd\u30b9\u4ee5\u4e0a\u306e\u610f\u5473\u3092\u6301\u3061\u307e\u3059\u3002\u305d\u308c\u306f\u3001\u300c\u65e5\u672c\u54c1\u8cea\u3078\u306e\u4fe1\u983c\u300d\u3068\u300c\u79c1\u305f\u3061\u306e\u8aa0\u5b9f\u3055\u3078\u306e\u671f\u5f85\u300d\u3092\u9802\u3051\u3066\u3044\u305f\u3060\u3044\u3066\u3044\u308b\u3053\u3068\u3060\u3068\u7406\u89e3\u3057\u3066\u3044\u307e\u3059\u3002
                  </p>
                  <p style={{ marginBottom: '22px' }}>
                    To our overseas partners: when you choose YUKIMICHI, you are placing your trust not just in a service, but in a person, a company, and a commitment to do what is right. We do not cut corners. Every export is handled with the same care we would give our most important client.
                  </p>
                  <p>
                    We believe that true business relationships are built over years, not transactions. Our goal is not simply to ship your order &#8212; it is to become the partner you rely on every time you need something from Japan.
                  </p>
                </div>

                <div style={{ borderTop: '1px solid rgba(201,168,76,0.12)', paddingTop: '32px' }}>
                  <div style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200, fontSize: '19px', letterSpacing: '0.2em', color: 'var(--washi, #f8f5ef)', marginBottom: '4px' }}>\u6797 \u7950\u6a39</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '13px', fontWeight: 300, letterSpacing: '0.15em', color: 'var(--suzu, #8a8f99)' }}>Yuuki Hayashi &#8212; JUSTHEN Co., Ltd.</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <style>{`@media(max-width:860px){.rep-grid{grid-template-columns:1fr!important;gap:56px!important}}`}</style>
      </section>

      {/* COMPANY PROFILE */}
      <section style={{ padding: 'clamp(80px,10vw,140px) var(--gutter, clamp(20px,5vw,80px))', background: 'var(--navy-mid, #0d1f38)', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'var(--gold)', fontWeight: 300 }}>Company Profile</span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.15, color: 'var(--washi, #f8f5ef)', marginBottom: '56px' }}>
              JUSTHEN<br />Co., Ltd.
            </h2>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(201,168,76,0.08)' }} className="cred-grid">
            {CREDENTIALS.map(({ label, value }, i) => (
              <ScrollReveal key={label} delay={i * 40}>
                <div style={{ background: 'var(--navy-mid, #0d1f38)', padding: 'clamp(24px,3vw,40px) clamp(24px,3.5vw,48px)', borderBottom: '1px solid rgba(201,168,76,0.06)' }}>
                  <div style={{ fontSize: '9px', fontWeight: 300, letterSpacing: '0.38em', textTransform: 'uppercase' as const, color: 'var(--gold)', opacity: 0.75, marginBottom: '14px' }}>{label}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(15px,1.6vw,19px)', fontWeight: 300, color: 'var(--washi, #f8f5ef)', lineHeight: 1.7, whiteSpace: 'pre-line' as const }}>{value}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:640px){.cred-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* TRUST & COMPLIANCE */}
      <section style={{ padding: 'clamp(80px,10vw,140px) var(--gutter, clamp(20px,5vw,80px))', background: 'var(--navy-deep, #07111f)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '72px', flexWrap: 'wrap' as const, gap: '24px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                  <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
                  <span style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'var(--gold)', fontWeight: 300 }}>Trust &amp; Compliance</span>
                </div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.15, color: 'var(--washi, #f8f5ef)' }}>
                  Built on<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Integrity.</em>
                </h2>
              </div>
              <div style={{ borderLeft: '1px solid rgba(201,168,76,0.2)', paddingLeft: '28px', maxWidth: '340px' }}>
                <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 2, color: 'rgba(248,245,239,0.45)', letterSpacing: '0.05em' }}>
                  For overseas buyers, compliance is not optional &#8212; it is the foundation of every trustworthy relationship. These are our core commitments.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1px', background: 'rgba(201,168,76,0.06)' }} className="trust-grid">
            {TRUST_ITEMS.map(({ num, en, jp, desc }, i) => (
              <ScrollReveal key={num} delay={i * 80}>
                <div style={{ background: 'var(--navy-deep, #07111f)', padding: 'clamp(36px,4vw,56px) clamp(28px,3.5vw,48px)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-10px', right: '24px', fontFamily: "'Cormorant Garamond', serif", fontSize: '120px', fontWeight: 300, color: 'rgba(201,168,76,0.04)', lineHeight: 1, userSelect: 'none' as const, pointerEvents: 'none' as const }}>{num}</div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: '10px', fontWeight: 300, letterSpacing: '0.3em', color: 'var(--gold)', opacity: 0.7, marginBottom: '20px' }}>{num}</div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px,2.5vw,30px)', fontWeight: 300, color: 'var(--washi, #f8f5ef)', lineHeight: 1.2, marginBottom: '6px' }}>{en}</h3>
                    <p style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200, fontSize: '12px', letterSpacing: '0.2em', color: 'var(--gold)', opacity: 0.8, marginBottom: '24px' }}>{jp}</p>
                    <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 2.1, color: 'rgba(248,245,239,0.5)', letterSpacing: '0.04em' }}>{desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div style={{ marginTop: '56px', display: 'flex', flexWrap: 'wrap' as const, gap: '12px', justifyContent: 'center' }}>
              {['Japanese Export Law','Destination Import Regulations','Antique Dealer License','Customs Registration','Authentic Sourcing Only','No Counterfeit Goods','GDPR Aware'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px solid rgba(201,168,76,0.15)', background: 'rgba(201,168,76,0.04)' }}>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--gold)', opacity: 0.7, flexShrink: 0, display: 'block' }} />
                  <span style={{ fontSize: '10.5px', fontWeight: 300, letterSpacing: '0.12em', color: 'rgba(248,245,239,0.55)' }}>{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
        <style>{`@media(max-width:768px){.trust-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: 'clamp(80px,10vw,140px) var(--gutter, clamp(20px,5vw,80px))', background: 'var(--navy-mid, #0d1f38)', borderTop: '1px solid rgba(201,168,76,0.08)', textAlign: 'center' as const, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(201,168,76,0.04) 0%,transparent 70%)', pointerEvents: 'none' as const }} />
        <ScrollReveal>
          <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase' as const, color: 'var(--gold)', fontWeight: 300 }}>Begin the Journey</span>
              <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, fontSize: 'clamp(34px,4.5vw,52px)', lineHeight: 1.15, color: 'var(--washi, #f8f5ef)', marginBottom: '20px' }}>
              Ready to Source<br />from <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Japan?</em>
            </h2>
            <p style={{ fontSize: '13.5px', fontWeight: 300, color: 'rgba(248,245,239,0.5)', lineHeight: 2.1, letterSpacing: '0.05em', marginBottom: '44px' }}>
              \u521d\u56de1\u30f6\u6708\u306f\u624b\u914d\u624b\u6570\u6599\u7121\u6599\u3067\u304a\u8a66\u3057\u3044\u305f\u3060\u3051\u307e\u3059\u3002<br />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '15px', color: 'var(--suzu, #8a8f99)' }}>
                No handling fee for the first month &#8212; for all new partners.
              </span>
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' as const }}>
              <Link href="/contact" className="btn-primary" style={{ fontSize: '11.5px', padding: '18px 44px' }}>
                Request a Free Quote
              </Link>
              <Link href="/contact" className="btn-ghost">
                Contact Us
              </Link>
            </div>
            <p style={{ marginTop: '28px', fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(248,245,239,0.3)' }}>
              \u56fd\u30fb\u5730\u57df\u306b\u3088\u308a\u8f38\u51fa\u5165\u5236\u9650\u304c\u3042\u308a\u307e\u3059\u3002\u4e8b\u524d\u78ba\u8a8d\u306e\u3046\u3048\u3054\u6848\u5185\u3044\u305f\u3057\u307e\u3059\u3002
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  )
}
