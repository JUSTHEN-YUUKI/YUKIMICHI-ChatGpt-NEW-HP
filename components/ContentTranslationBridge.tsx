'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/components/LanguageProvider'
import { translateStaticText } from '@/lib/staticTextTranslations'

const originalTextByNode = new WeakMap<Text, string>()
const originalTextByElement = new WeakMap<Element, string>()

function shouldSkipElement(element: Element) {
  return Boolean(element.closest('script,style,noscript,[data-no-translate]'))
}

const paymentCopy = [
  {
    ja: 'お支払い条件は、原則として日本の当社指定銀行口座（三井住友銀行）へのT/T送金（電信送金）による前払いとなります。',
    en: 'Payment terms are, in principle, advance payment by T/T remittance to our designated bank account in Japan at Sumitomo Mitsui Banking Corporation (SMBC).',
  },
  {
    ja: '正式な送金先情報、支払期日、通貨、銀行手数料の扱いは、正式見積りまたは請求書発行時に個別にご案内します。',
    en: 'Detailed payment instructions, due date, currency, and bank fee handling will be provided individually at the time of quotation or invoice issuance.',
  },
  {
    ja: '入金確認後に、商品調達、発注、梱包、輸出関連手配を開始します。',
    en: 'After payment is confirmed, we begin procurement, ordering, packing, and export-related arrangements.',
  },
  {
    ja: '送金手数料・銀行手数料は、原則としてお客様負担となります。',
    en: 'Bank transfer fees and remittance charges are generally borne by the customer.',
  },
  {
    ja: 'Wise等の送金サービスを利用する場合は、事前に当社との確認が必要です。',
    en: 'Use of Wise or similar remittance services requires prior confirmation with YUKIMICHI.',
  },
]

function appendParagraph(parent: HTMLElement, text: string, lang: 'ja' | 'en') {
  const paragraph = document.createElement('p')
  paragraph.lang = lang
  paragraph.textContent = text
  parent.appendChild(paragraph)
}

function normalizePricingPaymentCopy(pathname: string | null) {
  if (pathname !== '/pricing') return

  const section = document.querySelector('.pricing-payment')
  if (!(section instanceof HTMLElement)) return
  if (section.dataset.paymentCopyNormalized === 'true') return

  section.dataset.noTranslate = 'true'
  section.dataset.paymentCopyNormalized = 'true'
  section.replaceChildren()

  const headingColumn = document.createElement('div')
  const label = document.createElement('div')
  label.className = 'section-label'

  const labelLine = document.createElement('div')
  labelLine.className = 'section-label-line'

  const labelText = document.createElement('span')
  labelText.className = 'section-label-text'
  labelText.textContent = 'Payment Terms / お支払い条件'

  label.append(labelLine, labelText)

  const heading = document.createElement('h2')
  heading.lang = 'ja'
  heading.textContent = 'お支払い条件'

  const subtitle = document.createElement('p')
  subtitle.className = 'pricing-payment-subtitle'
  subtitle.lang = 'en'
  subtitle.textContent = 'Payment Terms'

  appendParagraph(
    headingColumn,
    '原則として、正式見積り・請求書に基づく前払いで手配を開始します。支払方法や銀行手数料の扱いは案件ごとにご案内します。',
    'ja',
  )
  appendParagraph(
    headingColumn,
    'Arrangements generally begin after advance payment based on the formal quotation or invoice. Payment method details and bank fee handling are confirmed case by case.',
    'en',
  )

  headingColumn.prepend(label, heading, subtitle)

  const card = document.createElement('div')
  card.className = 'payment-card'

  paymentCopy.forEach((item) => {
    const row = document.createElement('div')
    row.className = 'payment-card__item'
    appendParagraph(row, item.ja, 'ja')
    appendParagraph(row, item.en, 'en')
    card.appendChild(row)
  })

  section.append(headingColumn, card)
}

function translateLeafElements(root: Node, language: ReturnType<typeof useLanguage>['language']) {
  if (!(root instanceof Element || root instanceof DocumentFragment)) return

  const elements = root instanceof Element ? [root, ...Array.from(root.querySelectorAll('*'))] : Array.from(root.querySelectorAll('*'))

  for (const element of elements) {
    if (shouldSkipElement(element)) continue
    if (element.children.length > 0) continue

    const currentText = element.textContent ?? ''
    if (!currentText.trim()) continue

    const originalText = originalTextByElement.get(element) ?? currentText
    if (!originalTextByElement.has(element)) {
      originalTextByElement.set(element, originalText)
    }

    const nextText = translateStaticText(language, originalText)
    if (element.textContent !== nextText) {
      element.textContent = nextText
    }
  }
}

function translateTextNode(node: Text, language: ReturnType<typeof useLanguage>['language']) {
  const parent = node.parentElement
  if (!parent || parent.children.length === 0) return

  const originalText = originalTextByNode.get(node) ?? node.textContent ?? ''

  if (!originalTextByNode.has(node)) {
    originalTextByNode.set(node, originalText)
  }

  const nextText = translateStaticText(language, originalText)
  if (node.textContent !== nextText) {
    node.textContent = nextText
  }
}

function translateAttribute(element: Element, attribute: 'placeholder' | 'alt' | 'aria-label', language: ReturnType<typeof useLanguage>['language']) {
  const currentValue = element.getAttribute(attribute)
  if (!currentValue) return
  if (shouldSkipElement(element)) return

  const key = `data-i18n-original-${attribute}`
  const originalValue = element.getAttribute(key) ?? currentValue

  if (!element.hasAttribute(key)) {
    element.setAttribute(key, originalValue)
  }

  const nextValue = translateStaticText(language, originalValue)
  if (currentValue !== nextValue) {
    element.setAttribute(attribute, nextValue)
  }
}

export default function ContentTranslationBridge() {
  const { language } = useLanguage()
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.lang = language
    normalizePricingPaymentCopy(pathname)

    const roots = [
      document.querySelector('nav'),
      document.querySelector('main'),
      document.querySelector('footer'),
    ].filter(Boolean)

    for (const root of roots) {
      translateLeafElements(root as Node, language)

      const walker = document.createTreeWalker(root as Node, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement
          if (!parent) return NodeFilter.FILTER_REJECT
          if (shouldSkipElement(parent)) return NodeFilter.FILTER_REJECT
          if (!node.textContent?.trim()) return NodeFilter.FILTER_REJECT
          return NodeFilter.FILTER_ACCEPT
        },
      })

      let node = walker.nextNode()
      while (node) {
        translateTextNode(node as Text, language)
        node = walker.nextNode()
      }
    }

    document.querySelectorAll('[placeholder], img[alt], [aria-label]').forEach((element) => {
      translateAttribute(element, 'placeholder', language)
      translateAttribute(element, 'alt', language)
      translateAttribute(element, 'aria-label', language)
    })
  }, [language, pathname])

  return null
}
