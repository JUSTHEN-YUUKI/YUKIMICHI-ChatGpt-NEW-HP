'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/components/LanguageProvider'
import { translateStaticText } from '@/lib/staticTextTranslations'

const originalTextByNode = new WeakMap<Text, string>()

function translateTextNode(node: Text, language: ReturnType<typeof useLanguage>['language']) {
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

  useEffect(() => {
    document.documentElement.lang = language

    const roots = [
      document.querySelector('nav'),
      document.querySelector('main'),
      document.querySelector('footer'),
    ].filter(Boolean)

    for (const root of roots) {
      const walker = document.createTreeWalker(root as Node, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          const parent = node.parentElement
          if (!parent) return NodeFilter.FILTER_REJECT
          if (parent.closest('script,style,noscript')) return NodeFilter.FILTER_REJECT
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
  }, [language])

  return null
}
