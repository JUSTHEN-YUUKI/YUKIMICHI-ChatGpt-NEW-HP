import Link from "next/link"
import styles from "./FeaturedJapaneseProductsSection.module.css"

type FeaturedCategory = {
  id: string
  code: string
  imageSrc: string
  imageAlt: string
  imageCredit: string
  imageSourceUrl: string
  titleJa: string
  titleEn: string
  descriptionJa: string
  descriptionEn: string
  checkJa: string
  checkEn: string
  href: string
}

const featuredCategories: FeaturedCategory[] = [
  {
    id: "trading-cards",
    code: "TCG",
    imageSrc: "https://images.unsplash.com/photo-1677545216009-342bf4d080a7?auto=format&fit=crop&w=1000&q=78",
    imageAlt: "青いスリーブ入りのカードを手に持ち、卓上にカードを並べた対戦準備の参考写真",
    imageCredit: "2H Media",
    imageSourceUrl: "https://unsplash.com/photos/a-person-sitting-at-a-table-using-a-cell-phone--iRcQ2CrR2Q",
    titleJa: "日本のトレーディングカード",
    titleEn: "Japanese Trading Cards",
    descriptionJa: "ポケモンカード・ONE PIECEカードなどの未開封BOXやケース単位の仕入れ相談。国内供給元への確認を支援します。",
    descriptionEn: "Sourcing inquiries for sealed Japanese Pokémon and ONE PIECE card boxes or cases, subject to supplier availability and terms.",
    checkJa: "正規品・供給条件・ロット・販売地域・配送可否",
    checkEn: "Authenticity, supply terms, order quantities, sales territory, and shipping acceptance.",
    href: "/tcg",
  },
  {
    id: "matcha-tea",
    code: "TEA",
    imageSrc: "https://images.unsplash.com/photo-1753009712810-3f72c3f72548?auto=format&fit=crop&w=1000&q=78",
    imageAlt: "茶碗の抹茶と茶筅の写真",
    imageCredit: "Zed Can",
    imageSourceUrl: "https://unsplash.com/photos/matcha-tea-being-whisked-in-a-bowl-BFeHprrF4Aw",
    titleJa: "日本産抹茶・緑茶",
    titleEn: "Japanese Matcha & Green Tea",
    descriptionJa: "抹茶、煎茶、ほうじ茶など。業務用から贈答用まで、仕入れ条件や必要書類の確認を支援します。",
    descriptionEn: "Matcha, sencha, and hojicha sourcing inquiries for business or gift use, with supplier and document checks.",
    checkJa: "原料・原産地・食品表示・残留農薬基準・仕向国の食品輸入規制",
    checkEn: "Ingredients, origin, labeling, pesticide limits, and destination food import rules.",
    href: "/contact",
  },
  {
    id: "skincare",
    code: "BEAUTY",
    imageSrc: "https://images.unsplash.com/photo-1629133597481-be00f7cbabb8?auto=format&fit=crop&w=1000&q=78",
    imageAlt: "化粧品用の小さなガラスボトルの参考写真",
    imageCredit: "Magda Vrabetz",
    imageSourceUrl: "https://unsplash.com/photos/clear-glass-bottle-on-white-table-ERa3ybA8OnU",
    titleJa: "日本製化粧品・スキンケア",
    titleEn: "Japanese Skincare & Beauty",
    descriptionJa: "化粧水、クリーム、シャンプーなど。国内メーカー・卸への取引条件確認や書類整理を支援します。",
    descriptionEn: "Skincare and haircare inquiries, including coordination with Japanese manufacturers or distributors.",
    checkJa: "全成分・製品区分・必要に応じたSDS・表示・仕向国の登録や輸入規制",
    checkEn: "Ingredients, product classification, SDS where needed, labels, and destination registration or import rules.",
    href: "/contact",
  },
  {
    id: "stationery",
    code: "PAPER",
    imageSrc: "https://images.unsplash.com/photo-1776762249708-31d7e1579748?auto=format&fit=crop&w=1000&q=78",
    imageAlt: "ノートと鉛筆などの文房具の写真",
    imageCredit: "Aliona Zahrai",
    imageSourceUrl: "https://unsplash.com/photos/pencils-and-a-notepad-with-green-leaves-on-white-pTiVm4VlkLc",
    titleJa: "日本製文房具・ノート",
    titleEn: "Japanese Stationery",
    descriptionJa: "筆記具、ノート、和紙文具など。商品仕様・ロット・梱包条件を整理し、仕入れ可否を確認します。",
    descriptionEn: "Pens, notebooks, and Japanese paper goods, with purchasing terms, specifications, and packing reviewed.",
    checkJa: "仕入れ条件・材質・インク等の輸送条件・梱包",
    checkEn: "Supplier terms, materials, ink-related transport conditions, and packaging.",
    href: "/contact",
  },
  {
    id: "kitchenware",
    code: "HOME",
    imageSrc: "https://images.unsplash.com/photo-1672110786148-3b1013d90c94?auto=format&fit=crop&w=1000&q=78",
    imageAlt: "京都の店頭に並ぶ陶磁器と茶器の写真",
    imageCredit: "Diana Lisunova",
    imageSourceUrl: "https://unsplash.com/photos/a-shelf-filled-with-lots-of-dishes-and-cups-Yp5ZqcnNGrw",
    titleJa: "日本製キッチン用品・食器",
    titleEn: "Japanese Kitchenware & Tableware",
    descriptionJa: "陶磁器、調理用品、箸など。用途と材質を確認し、適切な梱包や配送方法を検討します。",
    descriptionEn: "Ceramics, cooking tools, and chopsticks, with material, use, packing, and shipping suitability reviewed.",
    checkJa: "食品接触規制・素材・木製品の規制・破損防止梱包",
    checkEn: "Food-contact requirements, materials, wood-product rules, and fragile packing.",
    href: "/contact",
  },
  {
    id: "snacks",
    code: "FOOD",
    imageSrc: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=1000&q=78",
    imageAlt: "色鮮やかな和菓子の写真",
    imageCredit: "Vicky Ng",
    imageSourceUrl: "https://unsplash.com/photos/purple-and-white-flower-bouquet-on-brown-round-table-Ayy_K-y_dLA",
    titleJa: "日本のお菓子・加工食品",
    titleEn: "Japanese Snacks & Confectionery",
    descriptionJa: "菓子、スナック、常温加工食品など。原材料・賞味期限・保存条件を確認したうえで相談を承ります。",
    descriptionEn: "Packaged Japanese sweets, snacks, and shelf-stable foods, subject to ingredient and destination checks.",
    checkJa: "原材料・アレルゲン・賞味期限・表示・検疫や輸入許可",
    checkEn: "Ingredients, allergens, shelf life, labeling, quarantine, and permits.",
    href: "/contact",
  },
  {
    id: "textiles",
    code: "TEXTILE",
    imageSrc: "https://images.unsplash.com/photo-1766727923581-d4df2f4e9308?auto=format&fit=crop&w=1000&q=78",
    imageAlt: "色とりどりのタオルを重ねた写真",
    imageCredit: "Sohail Asim",
    imageSourceUrl: "https://unsplash.com/photos/stack-of-colorful-folded-towels-on-a-white-background-685H8ISuNO8",
    titleJa: "日本製タオル・繊維製品",
    titleEn: "Japanese Towels & Textiles",
    descriptionJa: "タオル、手ぬぐい、生活繊維製品など。素材、発注単位、ブランドの取引条件を確認します。",
    descriptionEn: "Towels, tenugui cloths, and other textiles, with fiber composition, minimum orders, and brand terms reviewed.",
    checkJa: "素材表示・原産地表示・商標やブランド使用条件・数量",
    checkEn: "Fiber and origin labeling, trademark or brand terms, and order volume.",
    href: "/contact",
  },
  {
    id: "crafts",
    code: "CRAFT",
    imageSrc: "https://images.unsplash.com/photo-1760619020864-b1d275143cd8?auto=format&fit=crop&w=1000&q=78",
    imageAlt: "和紙の折り鶴が並ぶ日本の伝統工芸の参考写真",
    imageCredit: "Tsuyoshi Kozu",
    imageSourceUrl: "https://unsplash.com/photos/many-blue-origami-cranes-hanging-with-yellow-background-Vuq9GqYlnT0",
    titleJa: "日本の伝統工芸品・ギフト雑貨",
    titleEn: "Japanese Crafts & Gifts",
    descriptionJa: "工芸小物、風呂敷、地域限定ギフトなど。仕入れ条件と素材・形状に応じた輸送方法を確認します。",
    descriptionEn: "Japanese craft items, furoshiki, and regional gifts, with supplier terms and suitable shipping reviewed.",
    checkJa: "素材・原産地・木材や動植物由来素材の規制・破損リスク",
    checkEn: "Materials, origin, restrictions on wood or biological materials, and breakage risk.",
    href: "/contact",
  },
]

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Japanese Product Picks for Overseas Buyers",
  description: "Japanese product categories presented for sourcing and export coordination inquiries by YUKIMICHI, not an inventory or confirmed offer for sale.",
  numberOfItems: featuredCategories.length,
  itemListElement: featuredCategories.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Thing",
      name: item.titleEn,
      description: item.descriptionEn,
      url: "https://justhen.co.jp/#featured-" + item.id,
    },
  })),
}

export default function FeaturedJapaneseProductsSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="featured-japanese-products-heading"
      data-no-translate="true"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className={styles.header}>
        <div>
          <div className="section-label">
            <div className="section-label-line" />
            <span className="section-label-text">YUKIMICHI · JAPANESE PRODUCT PICKS</span>
          </div>
          <h2 id="featured-japanese-products-heading" className={styles.heading}>
            <span lang="ja">日本商品ピックアップ</span>
            <em lang="en">Japanese Product Picks</em>
          </h2>
        </div>
        <div className={styles.intro}>
          <p lang="ja">
            海外バイヤー向けに、日本の商品カテゴリーをご紹介します。YUKIMICHIは国内仕入先への確認、
            取引条件・必要書類の整理、国際配送方法の確認を支援します。
          </p>
          <p lang="en">
            Explore Japanese product categories for international buyers. YUKIMICHI
            assists with supplier inquiries, trade-document coordination, and shipping-option reviews.
          </p>
        </div>
      </div>

      <p className={styles.photoDisclaimer}>
        <span lang="ja">※写真は各カテゴリーの参考イメージです。YUKIMICHIが販売・在庫保有する商品や、輸出・輸入が認められた商品を示すものではありません。</span>
        <span lang="en">Photos are illustrative category images, not YUKIMICHI inventory, product offers, or confirmation of export/import eligibility.</span>
      </p>
      <div className={styles.grid}>
        {featuredCategories.map((item, index) => (
          <article id={"featured-" + item.id} className={styles.card} key={item.id}>
            <figure className={styles.media}>
              <img
                className={styles.photo}
                src={item.imageSrc}
                alt={item.imageAlt}
                width="1000"
                height="625"
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <figcaption className={styles.mediaCredit}>
                <span lang="ja">参考イメージ</span>
                <a href={item.imageSourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Photo by ${item.imageCredit} on Unsplash (opens in a new tab)`}>
                  Photo: {item.imageCredit} / Unsplash ↗
                </a>
              </figcaption>
            </figure>
            <div className={styles.cardTop}>
              <span className={styles.index}>{String(index + 1).padStart(2, "0")} / 08</span>
              <span className={styles.categoryCode} aria-hidden="true">{item.code}</span>
            </div>
            <h3 className={styles.cardTitle}>
              <span lang="ja">{item.titleJa}</span>
              <span lang="en">{item.titleEn}</span>
            </h3>
            <div className={styles.description}>
              <p lang="ja">{item.descriptionJa}</p>
              <p lang="en">{item.descriptionEn}</p>
            </div>
            <div className={styles.check}>
              <p className={styles.checkLabel}>
                <span lang="ja">事前確認事項</span>
                <span lang="en">CHECK BEFORE SHIPPING</span>
              </p>
              <p lang="ja">{item.checkJa}</p>
              <p lang="en">{item.checkEn}</p>
            </div>
            <Link href={item.href} className={styles.link}>
              <span>
                <span lang="ja">{item.href === "/tcg" ? "TCG仕入れ相談を見る" : "仕入れ・輸出のご相談"}</span>
                <span lang="en">{item.href === "/tcg" ? "Explore TCG Sourcing" : "Ask About Sourcing"}</span>
              </span>
              <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </div>

    </section>
  )
}
