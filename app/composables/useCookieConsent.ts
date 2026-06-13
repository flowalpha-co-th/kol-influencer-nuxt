export interface CookieChoice {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
  ts?: number
}

const COOKIE_KEY = 'rip_cookie_consent_v1'

/* Shared cookie-consent state. The banner (CookieConsent.vue) renders on first
   visit; the footer "ตั้งค่าคุกกี้" button re-opens it via openSettings(). */
export function useCookieConsent() {
  const visible = useState('rip-cookie-visible', () => false)
  const forceSettings = useState('rip-cookie-force-settings', () => false)

  function hasConsent() {
    if (!import.meta.client) return true
    try {
      return !!localStorage.getItem(COOKIE_KEY)
    } catch {
      return false
    }
  }

  function store(choice: Omit<CookieChoice, 'ts'>) {
    if (!import.meta.client) return
    try {
      localStorage.setItem(COOKIE_KEY, JSON.stringify({ ...choice, ts: Date.now() }))
    } catch {
      /* ignore */
    }
  }

  function initBanner() {
    if (import.meta.client && !hasConsent()) visible.value = true
  }

  function openSettings() {
    forceSettings.value = true
    visible.value = true
  }

  function close() {
    visible.value = false
    forceSettings.value = false
  }

  return { visible, forceSettings, hasConsent, store, initBanner, openSettings, close }
}
