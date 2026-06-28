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
    ja: 'お支払い条件は、原則として日本の当社指定銀行口座へのT/T送金（電信送金）による前払いとなります。',
    en: 'Payment is generally required in advance by bank transfer (T/T remittance) to YUKIMICHI’s designated bank account in Japan.',
  },
  {
    ja: '支払方法：T/T送金（電信送金）',
    en: 'Payment by T/T remittance.',
  },
  {
    ja: '海外からのお支払いは、Wise経由の日本円送金を推奨しています。代替方法として、三井住友銀行の当社指定法人口座への直接T/T送金にも対応可能です。正式な送金先情報は、正式見積り・請求時に個別にご案内します。',
    en: 'For overseas payments, we recommend JPY transfer via Wise. As an alternative, direct T/T remittance to our designated SMBC corporate bank account is also available. Detailed payment instructions will be provided individually at the time of formal quotation and invoice issuance.',
  },
  {
    ja: '送金手数料・銀行手数料は、原則としてお客様負担となります。',
    en: 'Bank transfer fees and remittance charges are generally borne by the customer.',
  },
  {
    ja: '入金確認後、仕入れ・発注・輸出手配を開始します。',
    en: 'After payment is confirmed, we will begin procurement, ordering, and export arrangement procedures.',
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
  heading.lang = 'ja'
  heading.textContent = 'お支払い方法'

  const subtitle = document.createElement('p')
  subtitle.className = 'pricing-payment-subtitle'
  subtitle.lang = 'en'
  subtitle.textContent = 'Payment by T/T Remittance'

  appendParagraph(
    headingColumn,
    '入金確認後に手配・発注・輸出準備を進めます。支払い方法の詳細は正式見積り・請求時に個別にご案内します。',
    'ja',
  )
  appendParagraph(
    headingColumn,
    'We begin coordination, ordering, and export preparation after payment is confirmed. Detailed payment instructions are provided individually with the formal quotation and invoice.',
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
