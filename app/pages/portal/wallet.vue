<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-12">
    <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">{{ languageStore.t('wallet.title') }}</h1>
        <p class="text-gray-600 mt-1">ประวัติการรับเงินจากแคมเปญทั้งหมด</p>
      </div>

      <!-- Balance Cards -->
      <div class="grid sm:grid-cols-3 gap-6 mb-8">
        <UiCard class="border-0 shadow-md bg-gradient-to-br from-primary to-indigo-700 text-white">
          <UiCardContent class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-white/80 text-sm mb-1">{{ languageStore.t('wallet.balance') }}</p>
                <p class="text-4xl font-bold">฿{{ balance.toLocaleString() }}</p>
              </div>
              <div class="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Wallet class="h-7 w-7" />
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard class="border-0 shadow-md">
          <UiCardContent class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm mb-1">รับเงินแล้วทั้งหมด</p>
                <p class="text-2xl font-bold text-gray-900">฿{{ totalEarned.toLocaleString() }}</p>
              </div>
              <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp class="h-7 w-7 text-green-600" />
              </div>
            </div>
          </UiCardContent>
        </UiCard>

        <UiCard class="border-0 shadow-md">
          <UiCardContent class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm mb-1">รอรับเงิน</p>
                <p class="text-2xl font-bold text-yellow-600">฿{{ totalPending.toLocaleString() }}</p>
              </div>
              <div class="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock class="h-7 w-7 text-yellow-600" />
              </div>
            </div>
          </UiCardContent>
        </UiCard>
      </div>

      <!-- Payment History -->
      <UiCard class="border-0 shadow-md">
        <UiCardHeader>
          <UiCardTitle>ประวัติการรับเงิน</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <UiTabs default-value="all" class="space-y-6">
            <UiTabsList class="bg-gray-100">
              <UiTabsTrigger value="all">ทั้งหมด ({{ incomeTransactions.length }})</UiTabsTrigger>
              <UiTabsTrigger value="pending">รอรับเงิน ({{ pendingTransactions.length }})</UiTabsTrigger>
              <UiTabsTrigger value="received">รับแล้ว ({{ completedTransactions.length }})</UiTabsTrigger>
            </UiTabsList>

            <UiTabsContent value="all">
              <div class="space-y-3">
                <div
                  v-for="t in incomeTransactions"
                  :key="t.id"
                  class="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white hover:shadow-sm transition-shadow"
                >
                  <div class="flex items-center gap-4">
                    <div :class="['w-11 h-11 rounded-xl flex items-center justify-center shrink-0', t.status === 'pending' ? 'bg-yellow-50' : 'bg-green-50']">
                      <Clock v-if="t.status === 'pending'" class="h-5 w-5 text-yellow-500" />
                      <CheckCircle v-else class="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 text-sm">{{ t.campaignTitle ?? t.description }}</p>
                      <p class="text-xs text-gray-500 mt-0.5">{{ t.description }}</p>
                      <p class="text-xs text-gray-400 mt-0.5">
                        <template v-if="t.status === 'pending'">ส่งงาน: {{ new Date(t.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }) }}</template>
                        <template v-else>รับเงิน: {{ new Date(t.completedAt ?? t.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }) }}</template>
                      </p>
                    </div>
                  </div>
                  <div class="text-right shrink-0">
                    <p :class="['text-lg font-bold', t.status === 'pending' ? 'text-yellow-600' : 'text-green-600']">+฿{{ t.amount.toLocaleString() }}</p>
                    <span :class="['text-xs font-medium px-2.5 py-0.5 rounded-full', t.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700']">
                      {{ t.status === 'pending' ? 'รอรับเงิน' : 'รับเงินแล้ว' }}
                    </span>
                  </div>
                </div>
              </div>
            </UiTabsContent>

            <UiTabsContent value="pending">
              <div class="space-y-3">
                <div
                  v-for="t in pendingTransactions"
                  :key="t.id"
                  class="flex items-center justify-between p-4 rounded-xl border border-yellow-100 bg-yellow-50/30 hover:shadow-sm transition-shadow"
                >
                  <div class="flex items-center gap-4">
                    <div class="w-11 h-11 bg-yellow-50 rounded-xl flex items-center justify-center shrink-0">
                      <Clock class="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 text-sm">{{ t.campaignTitle ?? t.description }}</p>
                      <p class="text-xs text-gray-500 mt-0.5">{{ t.description }}</p>
                      <p class="text-xs text-gray-400 mt-0.5">ส่งงาน: {{ new Date(t.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }) }}</p>
                    </div>
                  </div>
                  <div class="text-right shrink-0">
                    <p class="text-lg font-bold text-yellow-600">+฿{{ t.amount.toLocaleString() }}</p>
                    <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700">รอรับเงิน</span>
                  </div>
                </div>
                <p v-if="pendingTransactions.length === 0" class="text-center text-gray-500 py-8">ไม่มีรายการที่รอรับเงิน</p>
              </div>
            </UiTabsContent>

            <UiTabsContent value="received">
              <div class="space-y-3">
                <div
                  v-for="t in completedTransactions"
                  :key="t.id"
                  class="flex items-center justify-between p-4 rounded-xl border border-green-100 bg-green-50/30 hover:shadow-sm transition-shadow"
                >
                  <div class="flex items-center gap-4">
                    <div class="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                      <CheckCircle class="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p class="font-medium text-gray-900 text-sm">{{ t.campaignTitle ?? t.description }}</p>
                      <p class="text-xs text-gray-500 mt-0.5">{{ t.description }}</p>
                      <p class="text-xs text-gray-400 mt-0.5">รับเงิน: {{ new Date(t.completedAt ?? t.createdAt).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }) }}</p>
                    </div>
                  </div>
                  <div class="text-right shrink-0">
                    <p class="text-lg font-bold text-green-600">+฿{{ t.amount.toLocaleString() }}</p>
                    <span class="text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-700">รับเงินแล้ว</span>
                  </div>
                </div>
                <p v-if="completedTransactions.length === 0" class="text-center text-gray-500 py-8">ยังไม่มีรายการที่รับเงินแล้ว</p>
              </div>
            </UiTabsContent>
          </UiTabs>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Wallet, TrendingUp, Clock, CheckCircle } from 'lucide-vue-next'
import { mockTransactions } from '~/data/mockData'

definePageMeta({ layout: 'portal', middleware: 'auth' })

const languageStore = useLanguageStore()

const balance = 125000
const totalEarned = 250000

const incomeTransactions = mockTransactions.filter(t => t.type === 'income')
const pendingTransactions = computed(() => incomeTransactions.filter(t => t.status === 'pending'))
const completedTransactions = computed(() => incomeTransactions.filter(t => t.status === 'completed'))
const totalPending = computed(() => pendingTransactions.value.reduce((sum, t) => sum + t.amount, 0))
</script>
