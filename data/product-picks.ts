export type ProductPickStatus = "draft" | "reviewed" | "published"
export type ProductPickBuyerType = "individual" | "business" | "both"
export type ProductPickMediaType = "image" | "video" | "none"
export type ProductPickRiskLevel = "standard" | "attention" | "restricted-review"

export type ProductPick = {
  id: string
  titleJa: string
  titleEn: string
  buyerType: ProductPickBuyerType
  category: string
  region: string
  descriptionJa: string
  descriptionEn: string
  importCheckJa: string
  importCheckEn: string
  shippingOptions: string[]
  riskLevel: ProductPickRiskLevel
  mediaType: ProductPickMediaType
  mediaSrc: string | null
  status: ProductPickStatus
}

export const automationDefaultProductPickStatus: ProductPickStatus = "draft"

export const productPicks: ProductPick[] = [
  {
    id: "hokkaido-food-gifts",
    titleJa: "北海道食品・地域ギフト",
    titleEn: "Hokkaido Food & Regional Gifts",
    buyerType: "both",
    category: "Hokkaido Food",
    region: "Hokkaido",
    descriptionJa:
      "菓子、加工食品、地域限定品など、成分・数量・配送先国を確認しながら輸出相談につなげます。",
    descriptionEn:
      "Curated food and regional gift categories from Hokkaido, handled with attention to ingredients, quantity, and destination-country requirements.",
    importCheckJa:
      "食品は国により成分、表示、検疫、輸入許可の確認が必要です。温度管理品や生鮮品は個別確認となります。",
    importCheckEn:
      "Food items may require ingredient, label, quarantine, or permit checks. Temperature-controlled and fresh items require separate review.",
    shippingOptions: ["International Express", "Air Freight"],
    riskLevel: "restricted-review",
    mediaType: "none",
    mediaSrc: null,
    status: "reviewed",
  },
  {
    id: "store-limited-japan-goods",
    titleJa: "店舗限定・日本限定商品",
    titleEn: "Store-Limited Japan Goods",
    buyerType: "individual",
    category: "Limited Goods",
    region: "Japan",
    descriptionJa:
      "日本国内でしか買いにくい限定品や小ロット商品について、内容品と購入条件を確認して相談を受け付けます。",
    descriptionEn:
      "Support for Japan-only and store-limited items where product details, purchase conditions, and shipping suitability can be reviewed before quotation.",
    importCheckJa:
      "在庫、価格、購入可否は掲載時点で保証しません。ブランド品、中古品、電池付き商品は追加確認が必要です。",
    importCheckEn:
      "Availability, pricing, and purchase eligibility are not guaranteed. Branded, used, or battery-included items require additional checks.",
    shippingOptions: ["International Express"],
    riskLevel: "attention",
    mediaType: "none",
    mediaSrc: null,
    status: "reviewed",
  },
  {
    id: "japanese-craft-lifestyle",
    titleJa: "工芸品・生活雑貨",
    titleEn: "Japanese Craft & Lifestyle Goods",
    buyerType: "both",
    category: "Craft & Lifestyle",
    region: "Japan",
    descriptionJa:
      "工芸品、日用品、インテリア雑貨など、素材・サイズ・破損リスクを確認しながら梱包と配送方法を検討します。",
    descriptionEn:
      "Craft, lifestyle, and home goods can be reviewed by material, size, and breakage risk before selecting packing and shipping methods.",
    importCheckJa:
      "木材、皮革、動植物由来素材、割れ物、大型品は、素材情報と仕向国側の規制確認が必要です。",
    importCheckEn:
      "Wood, leather, animal or plant-derived materials, fragile goods, and oversized items may require material and destination-country checks.",
    shippingOptions: ["International Express", "Air Freight"],
    riskLevel: "attention",
    mediaType: "none",
    mediaSrc: null,
    status: "reviewed",
  },
  {
    id: "outdoor-winter-utility",
    titleJa: "アウトドア・冬季用品",
    titleEn: "Outdoor & Winter Utility",
    buyerType: "business",
    category: "Outdoor Goods",
    region: "Hokkaido / Japan",
    descriptionJa:
      "北海道らしいアウトドア用品や冬季関連品を、数量、素材、サイズ、輸送方法の観点から法人向けに整理します。",
    descriptionEn:
      "Outdoor and winter-use goods can be organized for business buyers by quantity, material, dimensions, and suitable freight options.",
    importCheckJa:
      "燃料、スプレー、電池、刃物、危険品に該当する可能性がある商品は、事前確認なしでは扱いません。",
    importCheckEn:
      "Items that may involve fuel, sprays, batteries, blades, or dangerous-goods rules are not handled without prior review.",
    shippingOptions: ["International Express", "Air Freight", "Sea Freight"],
    riskLevel: "restricted-review",
    mediaType: "none",
    mediaSrc: null,
    status: "reviewed",
  },
]

export function getVisibleProductPicks(picks: ProductPick[] = productPicks) {
  return picks.filter((pick) => pick.status === "reviewed" || pick.status === "published")
}
