import { defineStore } from 'pinia'
import {
  notifItems as seedItems,
  notifCats,
  defaultEmailSettings,
  type NotifItem,
  type NotifCategory,
} from '~/data/notifications'

/* Notification system store — single source of truth for the bell, dashboard
   panel, Notification Center, and settings. read/unread state stays in sync. */
export const useNotificationsStore = defineStore('notifications', () => {
  // clone seed so module data isn't mutated across HMR / SSR
  const items = ref<NotifItem[]>(seedItems.map(n => ({ ...n })))

  // per-category email toggles (security + payment forced on / locked)
  const emailSettings = reactive<Record<NotifCategory, boolean>>({ ...defaultEmailSettings })
  const digestWeekly = ref(true)

  const unreadCount = computed(() => items.value.filter(n => !n.read).length)
  const latest = computed(() => items.value.slice(0, 5))

  function unreadByCategory(cat: NotifCategory) {
    return items.value.filter(n => n.cat === cat && !n.read).length
  }
  function countByCategory(cat: NotifCategory) {
    return items.value.filter(n => n.cat === cat).length
  }

  function markRead(id: string) {
    const n = items.value.find(x => x.id === id)
    if (n) n.read = true
  }
  function markAllRead() {
    items.value.forEach(n => { n.read = true })
  }

  function setEmail(cat: NotifCategory, on: boolean) {
    if (notifCats[cat]?.locked) return // security / payment cannot be turned off
    emailSettings[cat] = on
  }
  function toggleEmail(cat: NotifCategory) {
    setEmail(cat, !emailSettings[cat])
  }

  return {
    items,
    emailSettings,
    digestWeekly,
    unreadCount,
    latest,
    unreadByCategory,
    countByCategory,
    markRead,
    markAllRead,
    setEmail,
    toggleEmail,
  }
})
