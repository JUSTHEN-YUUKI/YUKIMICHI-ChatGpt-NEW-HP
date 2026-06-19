import type { Metadata } from 'next'
import Link from '@/components/NewTabLink'

export const metadata: Metadata = {
  title: 'FAQ | YUKIMICHI',
  description:
    'YUKIMICHIのFAQ。日本商品の仕入れ可否調査、海外発送、EMS・DHL・FedEx・UPS、航空貨物、海上輸送、関税・VAT/GST、禁止・制限品目、見積依頼について。',
  alternates: { canonical: '/faq' },
}

const faqCategories = [
  {
    id: 'procurement',
    label: '仕入れ可否調査・購入調整',
    en: 'Sourcing Feasibility',
    items: [
      {
        q: '取扱可能な日本商品を海外から購入できますか？',
        a: 'YUKIMICHIでは、日本国内の正規流通品を中心に、仕入れ可否調査や購入条件の調整に関する相談に対応します。商品URL、数量、配送先国、希望納期をもとに、仕入れ可否、配送方法、見積条件を確認します。',
        links: [{ href: '/services', label: 'サービスを見る' }],
      },
      {
        q: '小ロットやサンプルだけでも依頼できますか？',
        a: '小ロット、サンプル、少量発送の相談も可能です。商品内容や配送先国により対応可否が変わるため、まずは商品URL、数量、配送先国を添えてご相談ください。',
        links: [{ href: '/quote', label: 'お見積りへ進む' }],
      },
      {
        q: '商品URLだけで見積できますか？',
        a: '商品URLがあると確認がスムーズです。可能であれば、数量、配送先国、希望納期、法人宛・個人宛、希望配送方法もあわせてお知らせください。サイズや重量が不明な場合は、確認できる範囲で概算条件を整理します。',
        links: [{ href: '/quote', label: '見積に必要な情報を見る' }],
      },
      {
        q: 'どのような商品に対応していますか？',
        a: '日本国内の一般消費財、サンプル品、法人向け商品などを中心に相談可能です。ただし、医薬品、食品、化粧品、電池、危険品、中古品、ブランド品などは、商品内容・配送先国・配送会社条件により事前確認が必要です。',
        links: [{ href: '/restricted-items', label: '禁止・制限品目を確認する' }],
      },
    ],
  },
  {
    id: 'shipping',
    label: '国際配送・輸送方法',
    en: 'International Shipping',
    items: [
      {
        q: 'EMS、DHL、FedEx、UPS、ヤマト国際宅急便は使えますか？',
        a: '案件に応じて、EMS、DHL、FedEx、UPS、ヤマト国際宅急便などを検討します。配送会社の引受条件、配送先国、内容品、サイズ、重量により対応可否や料金が変わります。',
        links: [{ href: '/services', label: '配送サービスを見る' }],
      },
      {
        q: '航空貨物と国際宅配便の違いは何ですか？',
        a: '国際宅配便は小口・短納期の発送に向いています。航空貨物は、一定数量以上、高付加価値商品、緊急性のある案件で検討される場合があります。商品内容、梱包条件、危険品判定、配送先国により使い分けます。',
        links: [{ href: '/services', label: '輸送方法を確認する' }],
      },
      {
        q: '海上輸送には対応していますか？',
        a: 'FCL、LCL、コンテナ輸送、大型貨物、継続出荷などの海上輸送について相談可能です。海上輸送は納期が長くなる一方、大量輸送やコスト重視の案件に適する場合があります。',
        links: [{ href: '/services', label: '海上輸送の相談を見る' }],
      },
      {
        q: 'FCLとLCLの違いは何ですか？',
        a: 'FCLはコンテナ単位での輸送、LCLは他の貨物と混載する輸送です。貨物量、コスト、納期、梱包条件、輸入側の通関・港湾費用により適した方法が変わります。',
      },
      {
        q: '配送日数はどのくらいですか？',
        a: '配送方法、配送先国、通関状況、天候、繁忙期、配送会社の事情により異なります。提示する納期は目安であり、到着日を保証するものではありません。',
        links: [{ href: '/flow', label: '取引の流れを見る' }],
      },
    ],
  },
  {
    id: 'pricing',
    label: '料金・見積',
    en: 'Pricing',
    items: [
      {
        q: '料金はどのように決まりますか？',
        a: '商品代金、数量、サイズ、重量、容積重量、配送先国、配送方法、梱包、保険、規制確認の有無などにより変動します。料金は基本体系をもとに、案件ごとの個別見積で確認します。',
        links: [{ href: '/pricing', label: '料金表を見る' }],
      },
      {
        q: '初回の手配手数料無料はありますか？',
        a: '新規のお客様向けに、初回の手配手数料無料の案内を行う場合があります。ただし、商品代金、国際送料、関税、VAT/GST、梱包費、保険料、規制確認費用などの実費は別途となります。',
        links: [{ href: '/pricing', label: '初回特典を確認する' }],
      },
      {
        q: '見積に必要な情報は何ですか？',
        a: '商品名、商品URL、数量、単価、サイズ、重量、成分・素材、配送先国・都市、希望納期、希望配送方法、法人宛・個人宛などがあると確認がスムーズです。',
        links: [{ href: '/quote', label: 'お見積りへ進む' }],
      },
      {
        q: '見積後に金額が変わることはありますか？',
        a: '商品価格、在庫状況、為替、配送会社料金、燃油サーチャージ、規制確認、サイズ・重量の実測により変動する場合があります。最終料金は個別見積、請求書、メールでの合意内容により確認します。',
        links: [{ href: '/terms', label: '取引条件を見る' }],
      },
    ],
  },
  {
    id: 'duties',
    label: '関税・VAT/GST',
    en: 'Duties & Taxes',
    items: [
      {
        q: '関税やVAT/GSTは誰が支払いますか？',
        a: '輸入国で発生する関税、VAT、GST、輸入消費税、通関手数料等は、原則として輸入者側の負担となります。税額や課税判断は輸入国の税関判断により異なります。',
        links: [{ href: '/pricing', label: '料金の考え方を見る' }],
      },
      {
        q: '関税額の目安は確認できますか？',
        a: 'YUKIMICHIが目安を案内する場合はありますが、関税・VAT/GSTの最終金額を保証することはできません。最終判断は輸入国の税関・通関業者等の確認が前提です。',
        links: [{ href: '/terms', label: '取引条件を確認する' }],
      },
      {
        q: 'HSコードの確認は依頼できますか？',
        a: '商品情報をもとに確認を支援する場合はありますが、HSコードの最終分類は税関・通関業者等の判断が前提となります。用途、素材、成分、構造、販売国により判断が変わる場合があります。',
      },
    ],
  },
  {
    id: 'trade-responsibility',
    label: '貿易実務・責任範囲',
    en: 'Trade Responsibility',
    items: [
      {
        q: 'Can YUKIMICHI guarantee import approval?',
        a: 'No. Import approval depends on destination country regulations and customs decisions. YUKIMICHI can support Japan-side document organization and pre-checks, but final import eligibility must be confirmed by the importer, customs broker, customs office, carrier, or public authority.',
        links: [{ href: '/terms', label: '取引条件を確認する' }],
      },
      {
        q: 'Who pays customs duties and import taxes?',
        a: 'Generally, customs duties, import taxes, VAT/GST, and destination-side customs fees are paid by the importer or buyer, unless otherwise agreed in writing for a specific transaction.',
        links: [{ href: '/pricing', label: '料金の考え方を見る' }],
      },
      {
        q: 'Is shipping insurance mandatory?',
        a: 'Shipping insurance is optional, but recommended for high-value shipments. If insurance is not arranged, compensation for loss or damage is limited to the carrier terms or applicable insurance policy.',
        links: [{ href: '/pricing', label: '料金表を見る' }],
      },
      {
        q: 'Can you handle cosmetics, food, batteries, medical products?',
        a: 'A pre-check is required. Depending on ingredients, labels, quantity, use, destination country, and carrier rules, some items may be restricted, unavailable, or require additional documents such as SDS/MSDS.',
        links: [{ href: '/restricted-items', label: '禁止・制限品目を見る' }],
      },
      {
        q: 'Can you prepare Commercial Invoice and Packing List?',
        a: 'Support is available depending on the transaction scope. Required documents may vary by product category, shipping method, Incoterms, destination country, and customs broker requirements.',
        links: [{ href: '/services', label: 'サービスを見る' }],
      },
      {
        q: 'Do you support FCA / EXW / DAP / DDP?',
        a: 'Conditions are confirmed individually because EXW, FCA, DAP, and DDP assign costs, risk, customs, tax, and delivery responsibilities differently. DDP terms are generally outside our standard scope because they include import customs clearance, duties, and taxes in the destination country. Availability will be reviewed on a case-by-case basis.',
        links: [{ href: '/flow', label: '取引の流れを見る' }],
      },
      {
        q: 'Can you guarantee product availability?',
        a: 'No. Product availability depends on supplier confirmation, stock status, sales conditions, minimum order quantity, price changes, and whether the product can be handled for export.',
        links: [{ href: '/quote', label: 'お見積りへ進む' }],
      },
    ],
  },
  {
    id: 'compliance-transactions',
    label: '規制品・対応不可取引',
    en: 'Compliance',
    items: [
      {
        q: 'どのような商品は事前確認が必要ですか？',
        qEn: 'What types of products require prior confirmation?',
        a: '化粧品、食品、健康関連商品、医薬品・医薬部外品、電池、スプレー、液体、アルコールを含む商品、中古品、ブランド品、動植物由来素材、危険品に該当する可能性がある商品は、輸出・配送の取扱可否、配送会社の引受可否、輸入国側の規制確認が必要です。',
        aEn: 'Cosmetics, food and health-related products, pharmaceuticals, quasi-drugs, batteries, sprays, liquids, alcohol-containing products, secondhand or branded goods, animal- or plant-derived materials, and potential dangerous goods require prior review for export and shipping feasibility, carrier acceptance, and destination-country requirements.',
        links: [{ href: '/restricted-items', label: '禁止・制限品目を見る' }],
      },
      {
        q: '対応できない取引はありますか？',
        qEn: 'Are there any transactions YUKIMICHI cannot support?',
        a: '模倣品、海賊版、知的財産権侵害品、虚偽申告・過少申告を前提とする取引、法令や税関規則の回避を目的とする取引、輸入国で禁止されている商品の取引には対応できません。',
        aEn: 'We cannot support transactions involving counterfeit or pirated goods, intellectual property infringement, false or undervalued declarations, attempts to avoid laws or customs rules, or products prohibited in the destination country.',
        links: [{ href: '/terms', label: '取引条件を見る' }],
      },
      {
        q: 'YUKIMICHIは通関許可を保証できますか？',
        qEn: 'Can YUKIMICHI guarantee customs clearance?',
        a: 'いいえ。YUKIMICHIは日本側の確認・調整・書類整理を支援しますが、輸入国側の最終的な通関可否、追加検査、関税・輸入税、許認可、配送会社の最終判断を保証するものではありません。',
        aEn: 'No. YUKIMICHI supports Japan-side coordination, checks, and document preparation, but does not guarantee final customs clearance, inspections, duties or import taxes, permits, approvals, or carrier decisions in the destination country.',
        links: [{ href: '/services', label: 'サービス範囲を見る' }],
      },
      {
        q: 'メーカーや卸の連絡先を教えてもらえますか？',
        qEn: 'Can you disclose supplier or wholesaler contact details?',
        a: '原則として、確認先となるメーカー、卸、販売店、外部パートナーの直接連絡先は開示していません。YUKIMICHIが日本側の窓口として、必要な確認・調整を行います。',
        aEn: 'In principle, we do not disclose direct contact details for manufacturers, wholesalers, retailers, or external partners. YUKIMICHI acts as the Japan-side contact and coordinates the necessary checks and communication.',
        links: [{ href: '/about', label: '会社概要を見る' }],
      },
      {
        q: '税関で止まった場合や返送になった場合はどうなりますか？',
        qEn: 'What happens if a shipment is held by customs or returned?',
        a: '税関、配送会社、関係当局の判断により、追加確認、検査、遅延、返送、没収、追加費用が発生する場合があります。YUKIMICHIは可能な範囲で情報整理と対応支援を行いますが、当局や配送会社の最終判断を変更・保証することはできません。',
        aEn: 'Customs, carriers, or relevant authorities may require additional checks or inspections, delay or return a shipment, seize goods, or impose additional costs. YUKIMICHI can support communication and information organization but cannot change or guarantee those decisions.',
        links: [{ href: '/terms', label: '取引条件を見る' }],
      },
    ],
  },
  {
    id: 'restricted',
    label: '禁止・制限品目',
    en: 'Restricted Items',
    items: [
      {
        q: '輸出できない商品はありますか？',
        a: '商品によっては、日本側の輸出規制、輸入国側の規制、配送会社の引受条件により取り扱いできない場合があります。取扱可否は商品内容、数量、用途、配送先国により確認します。',
        links: [{ href: '/restricted-items', label: '禁止・制限品目を見る' }],
      },
      {
        q: '医薬品、食品、化粧品は取扱確認が必要ですか？',
        a: '国、成分、用途、数量、販売目的か個人使用かにより規制が異なります。医薬品、食品、化粧品は事前確認が必要であり、商品条件により発送できない場合があります。',
        links: [{ href: '/restricted-items', label: '規制品の確認事項を見る' }],
      },
      {
        q: '日焼け止めや香水、スプレー商品は事前確認が必要ですか？',
        a: '成分、容量、アルコール含有、スプレー形状、航空危険物判定、配送会社条件により対応可否が変わります。航空輸送では特に事前確認が必要です。',
      },
      {
        q: '電池や電子機器は取扱確認が必要ですか？',
        a: 'リチウム電池、モバイルバッテリー、電子機器は、電池の種類、容量、梱包状態、配送会社条件により制限される場合があります。商品仕様が分かる資料があると確認が進めやすくなります。',
      },
      {
        q: '中古品やブランド品は扱えますか？',
        a: '商品状態、真贋、証明書、知的財産権、相手国規制の観点から確認が必要です。内容によっては対応できない場合があります。',
        links: [{ href: '/restricted-items', label: '中古品・ブランド品の注意点を見る' }],
      },
    ],
  },
  {
    id: 'terms',
    label: '取引条件・支払い',
    en: 'Terms & Payment',
    items: [
      {
        q: '支払いはいつ必要ですか？',
        a: '原則として、商品調達や発送手配の前に支払い確認が必要です。支払い方法、支払い期日、通貨、手数料等は見積書、請求書、メールでの案内により確認します。',
        links: [{ href: '/terms', label: '取引条件を見る' }],
      },
      {
        q: 'キャンセルはできますか？',
        a: '商品購入前であればキャンセル可能な場合があります。商品購入後、梱包後、発送後のキャンセルは難しい場合があり、仕入れ先手数料、返品送料、決済手数料などが発生する場合があります。',
        links: [{ href: '/terms', label: 'キャンセル条件を見る' }],
      },
      {
        q: '配送中の破損や紛失があった場合はどうなりますか？',
        a: '配送中の破損、紛失、遅延は、配送会社の調査・補償条件に従う場合があります。写真、動画、外箱、梱包状態、配送ラベルなどの資料提出が必要になる場合があります。',
        links: [{ href: '/terms', label: '配送事故の条件を見る' }],
      },
    ],
  },
  {
    id: 'buyers',
    label: '法人・海外バイヤー対応',
    en: 'Global Buyers',
    items: [
      {
        q: '海外法人から依頼できますか？',
        a: '海外法人、海外バイヤー、インフルエンサー、個人のお客様からの相談も可能です。商品内容、配送先国、取引条件を確認したうえで対応可否を判断します。',
        links: [{ href: '/contact', label: 'お問い合わせ' }],
      },
      {
        q: '継続仕入れや定期発送は相談できますか？',
        a: '継続取引、定期発送、サンプル出荷、複数回の調達についても相談可能です。商品カテゴリー、仕入れ先条件、配送先国、通関条件により運用方法を整理します。',
        links: [{ href: '/services', label: 'サービス内容を見る' }],
      },
      {
        q: '英語対応はできますか？',
        a: '必要に応じて英語での基本的なやり取りに対応する想定です。最終的な契約条件、見積条件、規制確認については、必要に応じて正式な確認を行います。',
      },
      {
        q: 'まず何を送れば相談できますか？',
        a: '商品URL、数量、配送先国、希望納期、希望配送方法、法人宛・個人宛をお知らせください。可能であれば、サイズ、重量、成分、素材、用途も添えてください。',
        links: [
          { href: '/quote', label: 'お見積りへ進む' },
          { href: '/contact', label: 'お問い合わせ' },
        ],
      },
    ],
  },
]

const importantNotices = [
  'FAQは一般的な案内であり、個別案件の可否や料金を保証するものではありません。',
  '商品内容、配送先国、数量、サイズ、重量、用途、最新規制により対応可否は変動します。',
  '最終的な輸出入可否、関税、VAT/GST、HSコード、配送会社引受可否は、税関・通関業者・配送会社・公的機関等の確認が前提です。',
  '内容品の虚偽申告、規制逃れ、配送会社の引受条件に反する手配は行いません。',
]

const relatedLinks = [
  { href: '/quote', label: 'お見積り', en: 'Quote Request' },
  { href: '/contact', label: 'お問い合わせ', en: 'Contact' },
  { href: '/services', label: 'サービス', en: 'Services' },
  { href: '/pricing', label: '料金表', en: 'Pricing' },
  { href: '/restricted-items', label: '禁止・制限品目', en: 'Restricted Items' },
  { href: '/terms', label: '取引条件', en: 'Terms of Transaction' },
]

const allFaqs = faqCategories.flatMap((category) => category.items)

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: 'qEn' in faq ? `${faq.q} / ${faq.qEn}` : faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'aEn' in faq ? `${faq.a} ${faq.aEn}` : faq.a,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="faq-hero">
        <div className="section-label">
          <div className="section-label-line" />
          <span className="section-label-text">FAQ</span>
        </div>
        <h1 className="faq-title">
          FAQ
          <br />
          <em>よくある質問</em>
        </h1>
        <p className="section-body faq-lead" lang="ja">
          YUKIMICHIへ寄せられる、日本商品の仕入れ可否調査、国際配送、航空貨物、海上輸送、見積、関税、禁止・制限品目に関するよくある質問をまとめています。
        </p>
        <div className="faq-hero-actions">
          <Link href="/quote" className="btn-primary">
            お見積りへ進む <ArrowRight />
          </Link>
          <Link href="/contact" className="btn-ghost">
            お問い合わせ <ArrowRight />
          </Link>
        </div>
      </section>

      <section className="faq-categories" aria-label="FAQ categories">
        <div className="faq-section-head">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Categories</span>
          </div>
          <h2>カテゴリから探す</h2>
          <p>仕入れ可否調査、配送方法、料金、関税、規制確認、取引条件、海外バイヤー対応に分けて整理しています。</p>
        </div>
        <div className="faq-category-grid">
          {faqCategories.map((category) => (
            <a href={`#${category.id}`} className="faq-category-card" key={category.id}>
              <span>{category.en}</span>
              <strong>{category.label}</strong>
              <small>Questions: {category.items.length}</small>
            </a>
          ))}
        </div>
      </section>

      <section className="faq-section">
        {faqCategories.map((category, categoryIndex) => (
          <div className="faq-group" id={category.id} key={category.id}>
            <div className="faq-group-head">
              <span>{String(categoryIndex + 1).padStart(2, '0')}</span>
              <div>
                <p>{category.en}</p>
                <h2>{category.label}</h2>
              </div>
            </div>
            <div className="faq-list">
              {category.items.map((faq, index) => (
                <article className="faq-item" key={faq.q}>
                  <div className="faq-number">{String(index + 1).padStart(2, '0')}</div>
                  <div>
                    <h3 lang={category.id === 'trade-responsibility' ? 'en' : 'ja'}>{faq.q}</h3>
                    {'qEn' in faq && <h4 lang="en">{faq.qEn}</h4>}
                    <p lang={category.id === 'trade-responsibility' ? 'en' : 'ja'}>{faq.a}</p>
                    {'aEn' in faq && <p className="faq-answer-en" lang="en">{faq.aEn}</p>}
                    {faq.links ? (
                      <div className="faq-item-links">
                        {faq.links.map((link) => (
                          <Link href={link.href} key={link.href}>
                            {link.label} <ArrowRight />
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="faq-important">
        <div className="faq-important-inner">
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Important Notice</span>
          </div>
          <h2>Important Notice</h2>
          <ul>
            {importantNotices.map((notice) => (
              <li key={notice}>{notice}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="faq-related">
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">Related Links</span>
          </div>
          <h2>関連ページ</h2>
          <p>見積、問い合わせ、サービス内容、料金、禁止・制限品目、取引条件を各ページで確認できます。</p>
        </div>
        <div className="faq-related-grid">
          {relatedLinks.map((link) => (
            <Link href={link.href} className="faq-related-card" key={link.href}>
              <span>{link.en}</span>
              <strong>{link.label}</strong>
              <ArrowRight />
            </Link>
          ))}
        </div>
      </section>

      <section className="faq-cta">
        <div>
          <span>Inquiry Support</span>
          <h2>不明点を相談する</h2>
          <p>商品URL、数量、配送先国、希望納期を添えてご相談ください。商品内容に応じて、見積と取扱可否を確認します。</p>
          <a href="mailto:exporter@justhen.co.jp" className="faq-mail">
            exporter@justhen.co.jp へ相談する
          </a>
        </div>
        <div className="faq-cta-actions">
          <Link href="/quote" className="btn-primary">
            お見積りへ進む <ArrowRight />
          </Link>
          <Link href="/contact" className="btn-ghost">
            お問い合わせ <ArrowRight />
          </Link>
        </div>
      </section>

      <style>{`
        .faq-hero {
          min-height: 70svh;
          padding: calc(var(--nav-h) + 88px) var(--gutter) 76px;
          background:
            radial-gradient(ellipse 70% 46% at 78% 22%, rgba(201,168,76,0.09), transparent 64%),
            linear-gradient(160deg, var(--navy-deep) 0%, var(--navy-mid) 58%, var(--navy-deep) 100%);
          border-bottom: 1px solid rgba(201,168,76,0.12);
        }

        .faq-title {
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-weight: 300;
          font-size: clamp(46px, 8vw, 104px);
          line-height: 1.02;
          color: var(--washi);
          margin-bottom: 28px;
        }

        .faq-title em {
          color: var(--gold);
          font-style: italic;
          font-size: 0.68em;
        }

        .faq-lead {
          max-width: 860px;
        }

        .faq-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .faq-categories,
        .faq-section {
          padding: var(--section-pad) var(--gutter);
          background:
            linear-gradient(180deg, var(--navy-mid) 0%, var(--navy-deep) 100%);
        }

        .faq-section-head {
          max-width: 920px;
          margin-bottom: 40px;
        }

        .faq-section-head h2,
        .faq-important h2,
        .faq-related h2,
        .faq-cta h2 {
          color: var(--washi);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 300;
          line-height: 1.35;
          margin: 0 0 16px;
        }

        .faq-section-head p,
        .faq-related p,
        .faq-cta p {
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2.1;
          margin: 0;
        }

        .faq-category-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .faq-category-card {
          display: grid;
          gap: 8px;
          min-height: 132px;
          border: 1px solid rgba(201,168,76,0.14);
          background: rgba(7,17,31,0.56);
          color: var(--washi);
          padding: 22px;
          text-decoration: none;
        }

        .faq-category-card span,
        .faq-related-card span,
        .faq-cta span {
          color: var(--gold);
          display: block;
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
        }

        .faq-category-card strong,
        .faq-related-card strong {
          color: var(--washi);
          font-size: 15px;
          font-weight: 300;
          letter-spacing: 0.08em;
          line-height: 1.6;
        }

        .faq-category-card small {
          display: block;
          color: var(--suzu);
          font-size: 11px;
          letter-spacing: 0.12em;
          line-height: 1.5;
          margin-top: auto;
          text-transform: uppercase;
        }

        .faq-section {
          display: grid;
          gap: 54px;
          padding-top: 0;
        }

        .faq-group {
          scroll-margin-top: calc(var(--nav-h) + 24px);
        }

        .faq-group-head {
          display: grid;
          grid-template-columns: 58px minmax(0, 1fr);
          gap: 18px;
          align-items: start;
          margin-bottom: 20px;
        }

        .faq-group-head > span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border: 1px solid rgba(201,168,76,0.34);
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          line-height: 1;
        }

        .faq-group-head p {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px;
          font-style: italic;
          line-height: 1.3;
          margin: 0 0 4px;
        }

        .faq-group-head h2 {
          color: var(--washi);
          font-size: clamp(22px, 3vw, 34px);
          font-weight: 300;
          letter-spacing: 0.1em;
          line-height: 1.5;
          margin: 0;
        }

        .faq-list {
          display: grid;
          gap: 14px;
        }

        .faq-item {
          display: grid;
          grid-template-columns: 58px minmax(0, 1fr);
          gap: 20px;
          border: 1px solid rgba(201,168,76,0.12);
          background: linear-gradient(90deg, rgba(13,28,53,0.92), rgba(7,17,31,0.78));
          padding: clamp(22px, 3vw, 30px);
        }

        .faq-number {
          color: var(--gold);
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 300;
          line-height: 1;
        }

        .faq-item h3 {
          color: var(--washi);
          font-size: 17px;
          font-weight: 300;
          line-height: 1.75;
          letter-spacing: 0.08em;
          margin: 0 0 10px;
        }

        .faq-item h4 {
          color: var(--gold-light);
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: 17px;
          font-weight: 300;
          line-height: 1.55;
          margin: -4px 0 12px;
        }

        .faq-item p {
          color: var(--washi-dim);
          font-size: 13px;
          line-height: 2.05;
          letter-spacing: 0.04em;
          margin: 0;
        }

        .faq-item .faq-answer-en {
          border-top: 1px solid rgba(201,168,76,0.12);
          margin-top: 12px;
          padding-top: 12px;
        }

        .faq-item-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 16px;
        }

        .faq-item-links a {
          align-items: center;
          border-bottom: 1px solid rgba(201,168,76,0.3);
          color: var(--gold);
          display: inline-flex;
          font-size: 11px;
          gap: 8px;
          letter-spacing: 0.16em;
          padding-bottom: 4px;
          text-decoration: none;
        }

        .faq-important {
          padding: 0 var(--gutter) var(--section-pad);
          background: var(--navy-deep);
        }

        .faq-important-inner {
          max-width: 1180px;
          margin: 0 auto;
          border: 1px solid rgba(201,168,76,0.18);
          background:
            linear-gradient(90deg, rgba(139,30,47,0.24), transparent 50%),
            rgba(13,28,53,0.82);
          padding: clamp(30px, 5vw, 56px);
        }

        .faq-important ul {
          display: grid;
          gap: 12px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .faq-important li {
          border-left: 1px solid rgba(201,168,76,0.34);
          color: var(--washi-dim);
          font-size: 13px;
          letter-spacing: 0.05em;
          line-height: 2;
          padding-left: 14px;
        }

        .faq-related {
          padding: var(--section-pad) var(--gutter);
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(28px, 5vw, 72px);
          background:
            linear-gradient(135deg, rgba(139,30,47,0.18), transparent 48%),
            var(--navy-mid);
          border-bottom: 1px solid rgba(201,168,76,0.08);
        }

        .faq-related-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .faq-related-card {
          display: grid;
          gap: 10px;
          min-height: 132px;
          border: 1px solid rgba(201,168,76,0.14);
          background: rgba(7,17,31,0.52);
          color: var(--washi);
          padding: 22px;
          text-decoration: none;
        }

        .faq-related-card svg {
          color: var(--gold);
          justify-self: end;
        }

        .faq-cta {
          padding: 68px var(--gutter);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          background:
            linear-gradient(135deg, rgba(139,30,47,0.36), transparent 42%),
            var(--navy-mid);
          border-top: 1px solid rgba(201,168,76,0.14);
        }

        .faq-cta > div:first-child {
          max-width: 760px;
        }

        .faq-cta span {
          margin-bottom: 14px;
        }

        .faq-mail {
          color: var(--gold);
          display: inline-flex;
          font-family: 'Cormorant Garamond', 'Noto Serif JP', serif;
          font-size: clamp(22px, 3.2vw, 34px);
          font-weight: 300;
          line-height: 1.35;
          margin-top: 20px;
          overflow-wrap: anywhere;
          text-decoration: none;
        }

        .faq-cta-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: flex-end;
        }

        @media (max-width: 1180px) {
          .faq-category-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 900px) {
          .faq-related {
            grid-template-columns: 1fr;
          }

          .faq-cta {
            align-items: flex-start;
            flex-direction: column;
          }

          .faq-cta-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 680px) {
          .faq-category-grid,
          .faq-related-grid {
            grid-template-columns: 1fr;
          }

          .faq-group-head,
          .faq-item {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
