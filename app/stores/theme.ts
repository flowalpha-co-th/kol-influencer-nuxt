import { defineStore } from 'pinia'

export type Theme = 'corporate' | 'neon' | 'premium'
const STORAGE_KEY = 'prakast-theme'
const VALID: Theme[] = ['corporate', 'neon', 'premium']

export const useThemeStore = defineStore('theme', () => {
  const current = ref<Theme>('corporate')

  function init() {
    if (import.meta.client) {
      const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
      if (saved && VALID.includes(saved)) current.value = saved
    }
  }

  function set(t: Theme) {
    current.value = t
    if (import.meta.client) localStorage.setItem(STORAGE_KEY, t)
  }

  return { current, init, set }
})
