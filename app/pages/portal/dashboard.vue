<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-12">
    <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Welcome -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ languageStore.t('dashboard.welcome') }}, {{ user?.firstName }}!
        </h1>
        <p class="text-gray-600 mt-1">Here's what's happening with your account today.</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <UiCard class="stat-card border-0 shadow-md">
          <UiCardContent class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">{{ languageStore.t('dashboard.walletBalance') }}</p>
                <p class="text-2xl font-bold text-gray-900">฿{{ walletBalance.toLocaleString() }}</p>
              </div>
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Wallet class="h-6 w-6 text-primary" />
              </div>
            </div>
            <NuxtLink to="/portal/wallet">
              <UiButton variant="ghost" size="sm" class="mt-4 text-primary">
                View Details <ArrowRight class="ml-1 h-4 w-4" />
              </UiButton>
            </NuxtLink>
          </UiCardContent>
        </UiCard>

        <UiCard class="stat-card border-0 shadow-md">
          <UiCardContent class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">{{ languageStore.t('dashboard.activeCampaigns') }}</p>
                <p class="text-2xl font-bold text-gray-900">{{ activeCampaigns }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Briefcase class="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <NuxtLink to="/portal/campaigns">
              <UiButton variant="ghost" size="sm" class="mt-4 text-primary">
                View Campaigns <ArrowRight class="ml-1 h-4 w-4" />
              </UiButton>
            </NuxtLink>
          </UiCardContent>
        </UiCard>

        <UiCard class="stat-card border-0 shadow-md">
          <UiCardContent class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">{{ languageStore.t('dashboard.pendingTasks') }}</p>
                <p class="text-2xl font-bold text-gray-900">{{ pendingTasks }}</p>
              </div>
              <div class="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock class="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <NuxtLink to="/portal/tasks">
              <UiButton variant="ghost" size="sm" class="mt-4 text-primary">
                View Tasks <ArrowRight class="ml-1 h-4 w-4" />
              </UiButton>
            </NuxtLink>
          </UiCardContent>
        </UiCard>

        <UiCard class="stat-card border-0 shadow-md">
          <UiCardContent class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500 mb-1">{{ languageStore.t('dashboard.revisionTasks') }}</p>
                <p class="text-2xl font-bold text-gray-900">{{ revisionTasks }}</p>
              </div>
              <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle class="h-6 w-6 text-red-600" />
              </div>
            </div>
            <NuxtLink to="/portal/tasks">
              <UiButton variant="ghost" size="sm" class="mt-4 text-primary">
                View Tasks <ArrowRight class="ml-1 h-4 w-4" />
              </UiButton>
            </NuxtLink>
          </UiCardContent>
        </UiCard>
      </div>

      <!-- Main Content Grid -->
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Recent Transactions -->
        <UiCard class="lg:col-span-2 border-0 shadow-md">
          <UiCardHeader class="flex flex-row items-center justify-between">
            <UiCardTitle class="text-lg">{{ languageStore.t('dashboard.recentTransactions') }}</UiCardTitle>
            <NuxtLink to="/portal/wallet">
              <UiButton variant="ghost" size="sm" class="text-primary">
                View All <ArrowRight class="ml-1 h-4 w-4" />
              </UiButton>
            </NuxtLink>
          </UiCardHeader>
          <UiCardContent>
            <div class="space-y-4">
              <div
                v-for="transaction in recentTransactions"
                :key="transaction.id"
                class="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div class="flex items-center gap-4">
                  <div :class="['w-10 h-10 rounded-lg flex items-center justify-center', transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100']">
                    <TrendingUp v-if="transaction.type === 'income'" class="h-5 w-5 text-green-600" />
                    <Wallet v-else class="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p class="font-medium text-gray-900">{{ transaction.description }}</p>
                    <p class="text-sm text-gray-500">{{ new Date(transaction.createdAt).toLocaleDateString() }}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p :class="['font-semibold', transaction.type === 'income' ? 'text-green-600' : 'text-red-600']">
                    {{ transaction.type === 'income' ? '+' : '-' }}฿{{ transaction.amount.toLocaleString() }}
                  </p>
                  <UiBadge :variant="transaction.status === 'completed' ? 'default' : 'secondary'" class="text-xs">
                    {{ transaction.status }}
                  </UiBadge>
                </div>
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <!-- Notifications -->
        <UiCard class="border-0 shadow-md">
          <UiCardHeader class="flex flex-row items-center justify-between">
            <UiCardTitle class="text-lg">{{ languageStore.t('dashboard.notifications') }}</UiCardTitle>
            <UiBadge class="bg-primary">{{ unreadCount }} new</UiBadge>
          </UiCardHeader>
          <UiCardContent>
            <div class="space-y-4">
              <NuxtLink
                v-for="notification in notifications"
                :key="notification.id"
                :to="notification.link || '#'"
                class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <Briefcase v-if="notification.type === 'campaign_invite'" class="h-5 w-5 text-blue-500" />
                  <CheckCircle v-else-if="notification.type === 'task_approved'" class="h-5 w-5 text-green-500" />
                  <DollarSign v-else-if="notification.type === 'payment_received'" class="h-5 w-5 text-primary" />
                  <Bell v-else class="h-5 w-5 text-gray-500" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-gray-900 text-sm">{{ notification.title }}</p>
                  <p class="text-gray-600 text-sm line-clamp-2">{{ notification.message }}</p>
                  <p class="text-xs text-gray-400 mt-1">{{ new Date(notification.createdAt).toLocaleDateString() }}</p>
                </div>
                <div v-if="!notification.isRead" class="w-2 h-2 bg-primary rounded-full shrink-0 mt-2" />
              </NuxtLink>
            </div>
          </UiCardContent>
        </UiCard>
      </div>

      <!-- Quick Actions -->
      <div class="mt-8">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <NuxtLink to="/portal/campaigns">
            <UiCard class="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <UiCardContent class="p-6 flex items-center gap-4">
                <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Briefcase class="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Find Campaigns</p>
                  <p class="text-sm text-gray-500">Browse opportunities</p>
                </div>
              </UiCardContent>
            </UiCard>
          </NuxtLink>

          <NuxtLink to="/portal/profile">
            <UiCard class="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <UiCardContent class="p-6 flex items-center gap-4">
                <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <CheckSquare class="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Update Profile</p>
                  <p class="text-sm text-gray-500">Edit your info</p>
                </div>
              </UiCardContent>
            </UiCard>
          </NuxtLink>

          <NuxtLink to="/contact">
            <UiCard class="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <UiCardContent class="p-6 flex items-center gap-4">
                <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Bell class="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p class="font-semibold text-gray-900">Support</p>
                  <p class="text-sm text-gray-500">Get help</p>
                </div>
              </UiCardContent>
            </UiCard>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Wallet,
  TrendingUp,
  Briefcase,
  CheckSquare,
  AlertCircle,
  Bell,
  ArrowRight,
  DollarSign,
  Clock,
  CheckCircle,
} from 'lucide-vue-next'
import gsap from 'gsap'
import { mockTasks, mockTransactions, mockNotifications } from '~/data/mockData'

definePageMeta({ layout: 'portal', middleware: 'auth' })

const authStore = useAuthStore()
const languageStore = useLanguageStore()
const { user } = storeToRefs(authStore)

const walletBalance = 125000
const activeCampaigns = 3
const pendingTasks = mockTasks.filter(t => t.status === 'in_progress').length
const revisionTasks = mockTasks.filter(t => t.status === 'revision').length

const recentTransactions = mockTransactions.slice(0, 5)
const notifications = mockNotifications.slice(0, 5)
const unreadCount = computed(() => notifications.filter(n => !n.isRead).length)

onMounted(() => {
  const ctx = gsap.context(() => {
    gsap.from('.stat-card', { opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: 'power3.out' })
  })
  onUnmounted(() => ctx.revert())
})
</script>
