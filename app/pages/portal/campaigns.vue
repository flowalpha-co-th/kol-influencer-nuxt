<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-12">
    <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ languageStore.t('campaigns.title') }}</h1>
          <p class="text-gray-600 mt-1">Discover and apply for campaigns</p>
        </div>
      </div>

      <!-- Search & Filter -->
      <UiCard class="border-0 shadow-md mb-8">
        <UiCardContent class="p-6">
          <div class="flex flex-col lg:flex-row gap-4">
            <div class="relative flex-1">
              <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <UiInput v-model="searchQuery" placeholder="Search campaigns..." class="pl-10" />
            </div>
            <div class="flex gap-2 flex-wrap">
              <UiButton
                v-for="category in categories"
                :key="category"
                :variant="selectedCategory === category ? 'default' : 'outline'"
                size="sm"
                :class="selectedCategory === category ? 'bg-primary' : ''"
                @click="selectedCategory = category"
              >
                {{ category.charAt(0).toUpperCase() + category.slice(1) }}
              </UiButton>
            </div>
          </div>
        </UiCardContent>
      </UiCard>

      <!-- Campaigns Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UiCard
          v-for="campaign in filteredCampaigns"
          :key="campaign.id"
          class="group border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
          @click="selectedCampaign = campaign"
        >
          <div class="relative h-48 overflow-hidden">
            <img
              :src="campaign.image"
              :alt="campaign.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute top-4 left-4">
              <UiBadge class="bg-white/90 text-gray-900 backdrop-blur-sm">{{ campaign.category }}</UiBadge>
            </div>
            <div class="absolute top-4 right-4">
              <UiBadge class="bg-primary text-white">Open</UiBadge>
            </div>
          </div>
          <UiCardContent class="p-6">
            <div class="flex items-center gap-2 mb-3">
              <img :src="campaign.brandLogo" :alt="campaign.brandName" class="w-6 h-6 rounded-full object-cover" />
              <span class="text-sm text-gray-500">{{ campaign.brandName }}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{{ campaign.title }}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ campaign.description }}</p>
            <div class="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span class="flex items-center gap-1">
                <Users class="h-4 w-4" />
                {{ campaign.influencersJoined }}/{{ campaign.influencersNeeded }}
              </span>
              <span class="flex items-center gap-1">
                <Calendar class="h-4 w-4" />
                {{ new Date(campaign.endDate).toLocaleDateString() }}
              </span>
            </div>
            <div class="flex items-center justify-between pt-4 border-t">
              <div>
                <p class="text-xs text-gray-500">{{ languageStore.t('campaigns.budgetRange') }}</p>
                <p class="font-semibold text-primary">
                  ฿{{ campaign.budget.min.toLocaleString() }} - {{ campaign.budget.max.toLocaleString() }}
                </p>
              </div>
              <template v-if="getApplicationStatus(campaign.id) === 'approved'">
                <NuxtLink to="/portal/tasks" @click.stop>
                  <UiButton size="sm" class="bg-green-600 hover:bg-green-700">
                    <CheckCircle class="h-3.5 w-3.5 mr-1" /> Go to Task
                  </UiButton>
                </NuxtLink>
              </template>
              <template v-else-if="getApplicationStatus(campaign.id) === 'pending'">
                <UiButton size="sm" variant="outline" class="text-yellow-600 border-yellow-300 bg-yellow-50" disabled @click.stop>
                  <Clock class="h-3.5 w-3.5 mr-1" /> Pending Review
                </UiButton>
              </template>
              <template v-else>
                <UiButton size="sm" class="bg-primary hover:bg-primary/90" @click.stop="selectedCampaign = campaign">
                  {{ languageStore.t('campaigns.apply') }}
                </UiButton>
              </template>
            </div>
          </UiCardContent>
        </UiCard>
      </div>

      <div v-if="filteredCampaigns.length === 0" class="text-center py-16">
        <p class="text-gray-500">No campaigns found matching your criteria.</p>
      </div>
    </div>

    <!-- Campaign Detail Dialog -->
    <UiDialog :open="!!selectedCampaign" @update:open="selectedCampaign = null">
      <UiDialogContent class="max-w-2xl max-h-[90vh] overflow-y-auto">
        <template v-if="selectedCampaign">
          <UiDialogHeader>
            <UiDialogTitle class="text-2xl">{{ selectedCampaign.title }}</UiDialogTitle>
            <UiDialogDescription>{{ selectedCampaign.brandName }}</UiDialogDescription>
          </UiDialogHeader>
          <div class="space-y-6">
            <img :src="selectedCampaign.image" :alt="selectedCampaign.title" class="w-full h-64 object-cover rounded-xl" />
            <div class="flex flex-wrap gap-2">
              <UiBadge>{{ selectedCampaign.category }}</UiBadge>
              <UiBadge variant="secondary">Open</UiBadge>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-2">Description</h4>
              <p class="text-gray-600">{{ selectedCampaign.description }}</p>
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
              <div class="p-4 bg-gray-50 rounded-xl">
                <p class="text-sm text-gray-500 mb-1">Budget Range</p>
                <p class="text-xl font-bold text-primary">
                  ฿{{ selectedCampaign.budget.min.toLocaleString() }} - {{ selectedCampaign.budget.max.toLocaleString() }}
                </p>
              </div>
              <div class="p-4 bg-gray-50 rounded-xl">
                <p class="text-sm text-gray-500 mb-1">Deadline</p>
                <p class="text-xl font-bold text-gray-900">{{ new Date(selectedCampaign.endDate).toLocaleDateString() }}</p>
              </div>
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 mb-3">Requirements</h4>
              <ul class="space-y-2">
                <li class="flex items-center gap-2 text-gray-600">
                  <CheckCircle class="h-4 w-4 text-green-500" />
                  Minimum {{ selectedCampaign.requirements.minFollowers.toLocaleString() }} followers
                </li>
                <li class="flex items-center gap-2 text-gray-600">
                  <CheckCircle class="h-4 w-4 text-green-500" />
                  Platforms: {{ selectedCampaign.requirements.platforms.join(', ') }}
                </li>
                <li class="flex items-center gap-2 text-gray-600">
                  <CheckCircle class="h-4 w-4 text-green-500" />
                  Content types: {{ selectedCampaign.requirements.contentType.join(', ') }}
                </li>
              </ul>
            </div>
            <div class="flex gap-3">
              <template v-if="getApplicationStatus(selectedCampaign.id) === 'approved'">
                <NuxtLink to="/portal/tasks" class="flex-1">
                  <UiButton class="w-full bg-green-600 hover:bg-green-700">
                    <CheckCircle class="h-4 w-4 mr-2" /> Go to Task
                  </UiButton>
                </NuxtLink>
              </template>
              <template v-else-if="getApplicationStatus(selectedCampaign.id) === 'pending'">
                <UiButton class="flex-1 text-yellow-600 border-yellow-300 bg-yellow-50" variant="outline" disabled>
                  <Clock class="h-4 w-4 mr-2" /> Pending Review
                </UiButton>
              </template>
              <template v-else>
                <UiButton class="flex-1 bg-primary hover:bg-primary/90" @click="handleApply(selectedCampaign.id)">
                  Apply for Campaign
                </UiButton>
              </template>
              <UiButton variant="outline" @click="selectedCampaign = null">Cancel</UiButton>
            </div>
          </div>
        </template>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script setup lang="ts">
import { Search, Users, Calendar, CheckCircle, Clock } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import { mockCampaigns } from '~/data/mockData'
import type { Campaign } from '~/types'

definePageMeta({ layout: 'portal', middleware: 'auth' })

const languageStore = useLanguageStore()

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedCampaign = ref<Campaign | null>(null)
const categories = ['all', 'fashion', 'beauty', 'food', 'tech', 'lifestyle', 'travel', 'fitness']

const applications = reactive<Record<string, 'pending' | 'approved'>>({})

function getApplicationStatus(campaignId: string) {
  return applications[campaignId] ?? null
}

function handleApply(campaignId: string) {
  applications[campaignId] = 'pending'
  toast.success('สมัครสำเร็จ!', { description: 'ระบบจะแจ้งผลภายใน 1-3 วันทำการ' })
  selectedCampaign.value = null
}

const filteredCampaigns = computed(() =>
  mockCampaigns.filter(campaign => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'all' || campaign.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
)
</script>
