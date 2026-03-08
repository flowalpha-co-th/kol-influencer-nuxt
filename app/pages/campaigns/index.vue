<template>
  <div class="min-h-screen pt-20">
    <!-- Hero -->
    <section class="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto">
          <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-6">Campaigns</UiBadge>
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Explore Campaigns</h1>
          <p class="text-xl text-gray-600">
            Discover exciting brand campaigns and start earning as an influencer today.
          </p>
        </div>
      </div>
    </section>

    <!-- Search & Filter -->
    <section class="py-8 bg-white border-b">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
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
      </div>
    </section>

    <!-- Campaigns Grid -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
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
                  <p class="text-xs text-gray-500">Budget Range</p>
                  <p class="font-semibold text-primary">
                    ฿{{ campaign.budget.min.toLocaleString() }} - {{ campaign.budget.max.toLocaleString() }}
                  </p>
                </div>
                <!-- Apply button states -->
                <template v-if="getApplicationStatus(campaign.id) === 'approved'">
                  <NuxtLink to="/portal/tasks" @click.stop>
                    <UiButton size="sm" class="bg-green-600 hover:bg-green-700">
                      <CheckCircle class="h-3.5 w-3.5 mr-1" /> Go to Task
                    </UiButton>
                  </NuxtLink>
                </template>
                <template v-else-if="getApplicationStatus(campaign.id) === 'pending'">
                  <UiButton size="sm" variant="outline" class="text-yellow-600 border-yellow-300 bg-yellow-50 cursor-default" disabled @click.stop>
                    <Clock class="h-3.5 w-3.5 mr-1" /> Pending Review
                  </UiButton>
                </template>
                <template v-else>
                  <UiButton size="sm" class="bg-primary hover:bg-primary/90" @click.stop="handleApply(campaign.id)">
                    Apply Now
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
    </section>

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

            <!-- Dialog action button -->
            <div class="flex gap-3">
              <template v-if="getApplicationStatus(selectedCampaign.id) === 'approved'">
                <NuxtLink to="/portal/tasks" class="flex-1">
                  <UiButton class="w-full bg-green-600 hover:bg-green-700">
                    <CheckCircle class="h-4 w-4 mr-2" /> Go to Task
                  </UiButton>
                </NuxtLink>
              </template>
              <template v-else-if="getApplicationStatus(selectedCampaign.id) === 'pending'">
                <UiButton class="flex-1 text-yellow-600 border-yellow-300 bg-yellow-50 cursor-default" variant="outline" disabled>
                  <Clock class="h-4 w-4 mr-2" /> Pending Review
                </UiButton>
              </template>
              <template v-else>
                <UiButton class="flex-1 bg-primary hover:bg-primary/90" @click="handleApply(selectedCampaign.id); selectedCampaign = null">
                  Apply Now
                </UiButton>
              </template>
              <UiButton variant="outline" @click="selectedCampaign = null">Close</UiButton>
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

definePageMeta({ layout: 'default' })

const authStore = useAuthStore()
const router = useRouter()
const { isAuthenticated } = storeToRefs(authStore)

const searchQuery = ref('')
const selectedCategory = ref('all')
const selectedCampaign = ref<Campaign | null>(null)
const categories = ['all', 'fashion', 'beauty', 'food', 'tech', 'lifestyle', 'travel', 'fitness']

// Track applications: campaignId -> 'pending' | 'approved'
const applications = reactive<Record<string, 'pending' | 'approved'>>({})

function getApplicationStatus(campaignId: string) {
  return applications[campaignId] ?? null
}

function handleApply(campaignId: string) {
  if (!isAuthenticated.value) {
    toast.info('กรุณาเข้าสู่ระบบก่อน', { description: 'สมัครสมาชิกหรือ login เพื่อสมัครแคมเปญ' })
    router.push('/login')
    return
  }
  applications[campaignId] = 'pending'
  toast.success('สมัครสำเร็จ!', { description: 'ระบบจะแจ้งผลภายใน 1-3 วันทำการ' })
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
