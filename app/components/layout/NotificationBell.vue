<script setup lang="ts">
import { tintOf } from '~/data/notifications'

const props = withDefaults(defineProps<{ extra?: string; align?: 'left' | 'right' }>(), { extra: '', align: 'right' })

const notifications = useNotificationsStore()
const { tr } = useLocale()
const open = ref(false)
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLElement | null>(null)
const panel = ref<HTMLElement | null>(null)

// The panel is teleported to <body> so the sidebar's overflow-y-auto can't clip
// it; position it with fixed coords measured from the bell each time it opens.
const PANEL_W = 360
const panelStyle = ref<Record<string, string>>({})
function place() {
  const el = trigger.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const gap = 8
  const width = Math.min(PANEL_W, window.innerWidth - 32)
  const left = props.align === 'left'
    ? Math.min(r.left, window.innerWidth - 16 - width)
    : Math.max(16, r.right - width)
  panelStyle.value = { top: `${r.bottom + gap}px`, left: `${left}px`, width: `${width}px` }
}

function toggle() {
  open.value = !open.value
  if (open.value) nextTick(place)
}
function onItem(id: string) {
  notifications.markRead(id)
  open.value = false
}

onClickOutside(root, () => { open.value = false }, { ignore: [panel] })
</script>

<template>
  <div ref="root" class="relative">
    <button
      ref="trigger"
      type="button"
      :aria-label="'การแจ้งเตือน'"
      :class="[
        'rip-bell relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#0F2747]/10 bg-white text-ink shadow-sm transition hover:text-primary',
        extra,
      ]"
      @click="toggle"
    >
      <Icon name="bell" class="h-5 w-5" />
      <span
        v-if="notifications.unreadCount > 0"
        class="absolute -right-1.5 -top-1.5 flex min-w-[18px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white"
      >
        {{ notifications.unreadCount > 9 ? '9+' : notifications.unreadCount }}
      </span>
    </button>

    <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="open"
        ref="panel"
        :style="panelStyle"
        class="fixed z-[60] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-[#0F2747]/10 bg-white shadow-2xl"
      >
        <div class="flex items-center justify-between gap-3 border-b border-[#0F2747]/10 px-4 py-3.5">
          <p class="font-heading text-sm font-extrabold text-ink">
            {{ tr('การแจ้งเตือน', 'Notifications') }}
            <span v-if="notifications.unreadCount > 0" class="text-muted">({{ notifications.unreadCount }} {{ tr('ใหม่', 'new') }})</span>
          </p>
          <button type="button" class="text-xs font-bold text-primary hover:underline" @click="notifications.markAllRead()">
            {{ tr('อ่านทั้งหมด', 'Mark all read') }}
          </button>
        </div>

        <div class="max-h-[60vh] overflow-y-auto">
          <p v-if="!notifications.latest.length" class="px-4 py-10 text-center text-sm text-muted">
            {{ tr('ยังไม่มีการแจ้งเตือน', 'No notifications yet') }}
          </p>
          <NuxtLink
            v-for="n in notifications.latest"
            :key="n.id"
            :to="`/portal/${n.link}`"
            :class="['flex items-start gap-3 px-4 py-3 transition hover:bg-surface', n.read ? '' : 'bg-primary/[0.03]']"
            @click="onItem(n.id)"
          >
            <span :class="['flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', tintOf(n.cat).bg, tintOf(n.cat).fg]">
              <Icon :name="n.icon" class="h-[18px] w-[18px]" />
            </span>
            <span class="min-w-0 flex-1">
              <span class="flex items-center gap-1.5">
                <span class="truncate text-sm font-bold text-ink">{{ tr(n.title, n.titleEn) }}</span>
                <span v-if="!n.read" :class="['h-1.5 w-1.5 shrink-0 rounded-full', tintOf(n.cat).dot]" />
              </span>
              <span class="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-muted">{{ tr(n.msg, n.msgEn) }}</span>
              <span class="mt-1 block text-[11px] text-[#5B6B82]/55">{{ tr(n.ago, n.agoEn) }}</span>
            </span>
          </NuxtLink>
        </div>

        <NuxtLink
          to="/portal/notifications"
          class="block border-t border-[#0F2747]/10 bg-surface px-4 py-3 text-center text-sm font-bold text-primary transition hover:bg-primary/5"
          @click="open = false"
        >
          {{ tr('ดูทั้งหมด', 'View all') }}
        </NuxtLink>
      </div>
    </Transition>
    </Teleport>
  </div>
</template>
