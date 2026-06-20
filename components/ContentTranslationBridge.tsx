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
    ja: '海外からのお支払いは、Wise経由で当社指定の日本国内法人口座へ日本円送金いただく方法を推奨しています。',
    en: 'For overseas payments, we recommend sending JPY via Wise to our designated Japanese corporate account.',
  },
  {
    ja: 'Wiseをご利用できない場合は、当社指定の法人口座への直接T/T送金（電信送金）にも対応可能です。',
    en: 'If Wise is not available, direct T/T remittance to our designated corporate account is also available.',
  },
  {
    ja: '正式な送金先情報は、正式見積書・請求書の発行時に個別にご案内します。',
    en: 'Detailed payment instructions will be provided individually with the official quotation and invoice.',
  },
  {
    ja: 'Wise手数料、銀行手数料、中継銀行手数料、受取手数料、その他送金関連費用は、原則としてお客様負担となります。',
    en: 'All Wise fees, bank charges, intermediary bank fees, receiving fees, and other transfer-related charges shall be borne by the customer.',
  },
  {
    ja: '請求金額の全額着金を確認後、仕入先対応、発注、輸出関連手配を開始します。',
    en: 'We will begin supplier coordination, ordering, and export-related arrangements after confirming receipt of the full invoice amount.',
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
  labelText.textContent = 'Payment Method / お支払い方法'

  label.append(labelLine, labelText)

  const heading = document.createElement('h2')
  heading.textContent = 'JPY Advance Payment / 日本円での前払い'

  appendParagraph(
    headingColumn,
    'お支払いは、原則として日本円（JPY）建ての前払いとなります。案件内容を確認後、正式見積書・請求書にて送金先情報をご案内します。',
    'ja',
  )

  headingColumn.prepend(label, heading)

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
