<script setup lang="ts">
import { notifCats, tintOf, type NotifCategory, type NotifItem } from '~/data/notifications'

definePageMeta({ layout: 'portal', middleware: 'auth' })
const { tr } = useLocale()
useHead(() => ({ title: tr('การแจ้งเตือน — Ripples', 'Notifications — Ripples') }))

const notifications = useNotificationsStore()

type FilterKey = 'all' | NotifCategory
const activeFilter = ref<FilterKey>('all')

// category filter chips: ทั้งหมด + every journey category
const chips = computed<{ key: FilterKey; label: string; labelEn: string; icon: string }[]>(() => [
  { key: 'all', label: 'ทั้งหมด', labelEn: 'All', icon: 'inbox' },
  ...(Object.keys(notifCats) as NotifCategory[]).map(k => ({
    key: k,
    label: notifCats[k].short,
    labelEn: notifCats[k].shortEn,
    icon: notifCats[k].icon,
  })),
])

function chipCount(key: FilterKey) {
  return key === 'all' ? notifications.items.length : notifications.countByCategory(key)
}

const filtered = computed(() =>
  notifications.items.filter(n => activeFilter.value === 'all' || n.cat === activeFilter.value),
)

// group-by-day derived from the relative `ago` field (faithful to source)
const groupOrder = ['วันนี้', 'เมื่อวาน', 'ก่อนหน้านี้'] as const
function groupOf(n: NotifItem) {
  if (/นาที|ชม\.|วันนี้/.test(n.ago)) return 'วันนี้'
  if (/เมื่อวาน/.test(n.ago)) return 'เมื่อวาน'
  return 'ก่อนหน้านี้'
}
const groupLabelEn: Record<(typeof groupOrder)[number], string> = {
  'วันนี้': 'Today',
  'เมื่อวาน': 'Yesterday',
  'ก่อนหน้านี้': 'Earlier',
}
const groups = computed(() =>
  groupOrder
    .map(label => ({ label, labelEn: groupLabelEn[label], items: filtered.value.filter(n => groupOf(n) === label) }))
    .filter(g => g.items.length),
)

function openItem(n: NotifItem) {
  notifications.markRead(n.id)
  navigateTo(`/portal/${n.link}`)
}
</script>

<template>
  <main class="mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-14">
    <!-- header -->
    <section class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="font-heading text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">{{ tr('การแจ้งเตือน', 'Notifications') }}</h1>
        <p class="mt-1 text-sm text-muted">{{ notifications.unreadCount }} {{ tr('รายการที่ยังไม่ได้อ่าน', 'unread') }}</p>
      </div>
      <div class="flex items-center gap-2.5">
        <button type="button" class="shrink-0 rounded-lg border border-[#0F2747]/10 bg-white px-4 py-2.5 text-xs font-bold text-primary shadow-sm transition hover:bg-primary/5" @click="notifications.markAllRead()">{{ tr('อ่านทั้งหมด', 'Mark all read') }}</button>
        <NuxtLink to="/portal/notification-settings" :title="tr('ตั้งค่าการแจ้งเตือน', 'Notification settings')" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#0F2747]/10 bg-white text-muted shadow-sm transition hover:text-primary"><Icon name="settings" class="h-4 w-4" /></NuxtLink>
      </div>
    </section>

    <!-- category filter -->
    <section class="mb-6 flex flex-wrap gap-2">
      <button
        v-for="c in chips"
        :key="c.key"
        type="button"
        :class="['inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-bold transition', activeFilter === c.key ? 'bg-primary text-white shadow-sm' : 'border border-[#0F2747]/10 bg-white text-muted hover:text-primary']"
        @click="activeFilter = c.key"
      >
        <Icon :name="c.icon" class="h-4 w-4" /> {{ tr(c.label, c.labelEn) }}
        <span :class="['rounded-full px-1.5 text-[11px]', activeFilter === c.key ? 'bg-white/25 text-white' : 'bg-surface text-muted']">{{ chipCount(c.key) }}</span>
      </button>
    </section>

    <!-- timeline -->
    <section v-if="groups.length">
      <template v-for="g in groups" :key="g.label">
        <div class="mb-3 mt-7 flex items-center gap-3 first:mt-0">
          <span class="text-xs font-bold uppercase tracking-wider text-[#5B6B82]/60">{{ tr(g.label, g.labelEn) }}</span>
          <span class="h-px flex-1 bg-[#0F2747]/10" />
        </div>
        <div class="space-y-3">
          <a
            v-for="n in g.items"
            :key="n.id"
            href="#"
            :class="['group flex items-start gap-4 overflow-hidden rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-[0_20px_44px_-30px_rgb(45_91_255_/_35%)]', n.read ? 'border-[#0F2747]/10' : 'border-[#0F2747]/10 border-l-4 border-l-primary']"
            @click.prevent="openItem(n)"
          >
            <span :class="['flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', tintOf(n.cat).bg, tintOf(n.cat).fg]"><Icon :name="n.icon" class="h-5 w-5" /></span>
            <span class="min-w-0 flex-1">
              <span class="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span :class="['font-bold', n.read ? 'text-ink/60' : 'text-ink']">{{ tr(n.title, n.titleEn) }}</span>
                <span v-if="!n.read" class="inline-flex items-center rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">{{ tr('ใหม่', 'New') }}</span>
                <span v-if="n.urgent" class="ml-1 inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700"><Icon name="alarm-clock" class="h-3 w-3" /> {{ tr('ด่วน', 'Urgent') }}</span>
              </span>
              <span :class="['mt-0.5 block text-sm leading-relaxed', n.read ? 'text-[#5B6B82]/65' : 'text-muted']">{{ tr(n.msg, n.msgEn) }}</span>
              <span class="mt-2 flex items-center gap-2">
                <span :class="['inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-bold', tintOf(n.cat).chip]">{{ tr(notifCats[n.cat].short, notifCats[n.cat].shortEn) }}</span>
                <span class="text-[11px] text-[#5B6B82]/55">{{ tr(n.ago, n.agoEn) }} · {{ tr(n.date, n.dateEn) }}</span>
              </span>
            </span>
            <Icon name="chevron-right" class="ml-1 mt-1 h-4 w-4 shrink-0 text-[#5B6B82]/35 transition group-hover:text-primary" />
          </a>
        </div>
      </template>
    </section>

    <!-- empty state -->
    <section v-else class="rounded-2xl border-2 border-dashed border-[#0F2747]/15 bg-white/60 p-12 text-center">
      <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10"><Icon name="bell-off" class="h-7 w-7 text-primary" /></div>
      <p class="mt-4 font-heading text-lg font-bold text-ink">{{ tr('ไม่มีการแจ้งเตือน', 'No notifications') }}</p>
      <p class="mx-auto mt-1 max-w-xs text-sm text-muted">{{ tr('ยังไม่มีรายการในหมวดนี้ — เมื่อมีความเคลื่อนไหวจะแสดงที่นี่', 'Nothing in this category yet — new activity will show up here.') }}</p>
    </section>
  </main>
</template>
