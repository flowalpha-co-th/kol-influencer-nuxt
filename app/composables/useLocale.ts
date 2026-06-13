import type { Language } from '~/types'

export interface LocaleText {
  th: string
  en: string
}

/* Lightweight bilingual helper used across ported pages.
 * - tr('ไทย', 'English')  → reactive string for the active language
 * - loc({ th, en })       → same, for data objects carrying both languages
 * Reactivity: both read languageStore.language during render, so templates
 * re-render when the TH/EN toggle changes. */
export function useLocale() {
  const store = useLanguageStore()
  const lang = computed<Language>(() => store.language)

  function tr(th: string, en: string) {
    return store.language === 'en' ? en : th
  }
  function loc(pair: LocaleText) {
    return store.language === 'en' ? pair.en : pair.th
  }

  return { lang, tr, loc }
}
