<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-12">
    <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ languageStore.t('nav.notifications') }}</h1>
          <p class="text-gray-600 mt-1">{{ unreadCount }} {{ languageStore.language === 'th' ? 'รายการที่ยังไม่ได้อ่าน' : 'unread notifications' }}</p>
        </div>
        <UiButton v-if="unreadCount > 0" variant="outline" size="sm" @click="markAllRead">
          <CheckCheck class="h-4 w-4 mr-2" />
          {{ languageStore.language === 'th' ? 'อ่านทั้งหมด' : 'Mark all as read' }}
        </UiButton>
      </div>

      <!-- Notifications List -->
      <UiCard class="border-0 shadow-md">
        <UiCardContent class="p-0">
          <div v-if="notifications.length === 0" class="text-center py-16 text-gray-500">
            <Bell class="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>{{ languageStore.language === 'th' ? 'ไม่มีการแจ้งเตือน' : 'No notifications' }}</p>
          </div>

          <div v-else class="divide-y divide-gray-100">
            <div
              v-for="n in notifications"
              :key="n.id"
              :class="['flex items-start gap-4 p-5 transition-colors hover:bg-gray-50', !n.isRead ? 'bg-primary/5' : '']"
              @click="handleClick(n)"
            >
              <!-- Icon -->
              <div :class="['w-11 h-11 rounded-xl flex items-center justify-center shrink-0', iconBg(n.type)]">
                <Briefcase v-if="n.type === 'campaign_invite'" :class="['h-5 w-5', iconColor(n.type)]" />
                <CheckCircle v-else-if="n.type === 'task_approved'" :class="['h-5 w-5', iconColor(n.type)]" />
                <DollarSign v-else-if="n.type === 'payment_received'" :class="['h-5 w-5', iconColor(n.type)]" />
                <ClipboardList v-else-if="n.type === 'task_assigned'" :class="['h-5 w-5', iconColor(n.type)]" />
                <ShieldCheck v-else-if="n.type === 'verification_update'" :class="['h-5 w-5', iconColor(n.type)]" />
                <Bell v-else :class="['h-5 w-5', iconColor(n.type)]" />
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0 cursor-pointer">
                <div class="flex items-start justify-between gap-2">
                  <p :class="['text-sm font-semibold', !n.isRead ? 'text-gray-900' : 'text-gray-700']">{{ n.title }}</p>
                  <span class="text-xs text-gray-400 shrink-0">{{ formatDate(n.createdAt) }}</span>
                </div>
                <p class="text-sm text-gray-500 mt-0.5 line-clamp-2">{{ n.message }}</p>
              </div>

              <!-- Unread dot -->
              <div v-if="!n.isRead" class="w-2.5 h-2.5 bg-primary rounded-full shrink-0 mt-1.5" />
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Bell, Briefcase, CheckCircle, DollarSign, ClipboardList, ShieldCheck, CheckCheck } from 'lucide-vue-next'
import { mockNotifications } from '~/data/mockData'
import type { Notification } from '~/types'

definePageMeta({ layout: 'portal', middleware: 'auth' })

const languageStore = useLanguageStore()
const router = useRouter()

const notifications = reactive(mockNotifications.map(n => ({ ...n })))
const unreadCount = computed(() => notifications.filter(n => !n.isRead).length)

function markAllRead() {
  notifications.forEach(n => { n.isRead = true })
}

function handleClick(n: Notification & { isRead: boolean }) {
  n.isRead = true
  if (n.link) router.push(n.link)
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(languageStore.language === 'th' ? 'th-TH' : 'en-US', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
}

function iconBg(type: string) {
  const map: Record<string, string> = {
    campaign_invite: 'bg-blue-100',
    task_approved: 'bg-green-100',
    payment_received: 'bg-primary/10',
    task_assigned: 'bg-purple-100',
    verification_update: 'bg-orange-100',
  }
  return map[type] ?? 'bg-gray-100'
}

function iconColor(type: string) {
  const map: Record<string, string> = {
    campaign_invite: 'text-blue-500',
    task_approved: 'text-green-500',
    payment_received: 'text-primary',
    task_assigned: 'text-purple-500',
    verification_update: 'text-orange-500',
  }
  return map[type] ?? 'text-gray-500'
}
</script>
