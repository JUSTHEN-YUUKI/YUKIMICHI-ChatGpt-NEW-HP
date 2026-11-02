import Link from "next/link"
import styles from "./FeaturedJapaneseProductsSection.module.css"

type FeaturedCategory = {
  id: string
  code: string
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
  name: "Featured Japanese Product Categories for Overseas Buyers",
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
            <span className="section-label-text">YUKIMICHI · FEATURED JAPANESE PRODUCTS</span>
          </div>
          <h2 id="featured-japanese-products-heading" className={styles.heading}>
            <span lang="ja">おすすめ・注目の日本商品</span>
            <em lang="en">Featured Japanese Products</em>
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

      <div className={styles.grid}>
        {featuredCategories.map((item, index) => (
          <article id={"featured-" + item.id} className={styles.card} key={item.id}>
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

      <div className={styles.guidance}>
        <div>
          <h3 lang="ja">掲載商品について</h3>
          <p lang="en" className={styles.guidanceEnTitle}>About These Featured Categories</p>
        </div>
        <div className={styles.guidanceCopy}>
          <p lang="ja">
            こちらは仕入れ相談の参考カテゴリーであり、人気順位・在庫・価格・正規代理店契約・輸出可否・
            仕向国での輸入や販売の可否を保証するものではありません。商品情報、仕向国、用途、数量、
            配送方法等に応じて、関係先への確認が必要です。
          </p>
          <p lang="en">
            These categories are examples for sourcing inquiries, not a popularity ranking or
            a guarantee of stock, prices, authorized distributorship, export eligibility,
            or permission to import or sell in the destination country. Requirements must be
            checked case by case based on the product, destination, use, quantity, and shipping method.
          </p>
          <p className={styles.sources}>
            <span lang="ja">参考： </span>
            <a href="https://www.maff.go.jp/j/shokusan/export/e_info/zisseki.html" target="_blank" rel="noopener noreferrer">農林水産省・食品輸出統計</a>
            <span aria-hidden="true"> · </span>
            <a href="https://www.post.japanpost.jp/service/send/oversea/attention/restriction/" target="_blank" rel="noopener noreferrer">日本郵便・国際郵便の禁制品</a>
          </p>
        </div>
      </div>
    </section>
  )
}
