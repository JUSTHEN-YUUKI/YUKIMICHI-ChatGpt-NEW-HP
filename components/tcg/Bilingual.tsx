import type { Bilingual as Copy } from '@/lib/tcg/catalog'

export default function Bilingual({ ja, en }: Copy) {
  return <span className="tcg-bilingual"><span lang="ja" className="tcg-ja">{ja}</span><span lang="en" className="tcg-en">{en}</span></span>
}
