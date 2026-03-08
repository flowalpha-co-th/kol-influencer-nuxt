<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-12">
    <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ languageStore.t('profile.title') }}</h1>
          <p class="text-gray-600 mt-1">Manage your profile and settings</p>
        </div>
        <div class="flex gap-3">
          <NuxtLink to="/portal/change-password">
            <UiButton variant="outline">
              <Lock class="mr-2 h-4 w-4" />
              Change Password
            </UiButton>
          </NuxtLink>
          <UiButton
            :class="isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-primary'"
            @click="isEditing ? handleSave() : isEditing = true"
          >
            <Save v-if="isEditing" class="mr-2 h-4 w-4" />
            <Edit3 v-else class="mr-2 h-4 w-4" />
            {{ isEditing ? 'Save Changes' : 'Edit Profile' }}
          </UiButton>
        </div>
      </div>

      <UiTabs default-value="personal" class="space-y-8">
        <UiTabsList class="bg-white border">
          <UiTabsTrigger value="personal">{{ languageStore.t('profile.personalInfo') }}</UiTabsTrigger>
          <UiTabsTrigger value="social">{{ languageStore.t('profile.socialAccounts') }}</UiTabsTrigger>
          <UiTabsTrigger value="categories">{{ languageStore.t('profile.categories') }}</UiTabsTrigger>
          <UiTabsTrigger value="verification">{{ languageStore.t('profile.verification') }}</UiTabsTrigger>
        </UiTabsList>

        <!-- Personal Info -->
        <UiTabsContent value="personal">
          <UiCard class="border-0 shadow-md">
            <UiCardContent class="p-8">
              <div class="flex flex-col md:flex-row gap-8">
                <!-- Avatar -->
                <div class="flex flex-col items-center">
                  <UiAvatar class="w-32 h-32">
                    <UiAvatarImage :src="user?.avatar" :alt="user?.firstName" />
                    <UiAvatarFallback class="text-4xl bg-primary/10 text-primary">
                      {{ user?.firstName?.[0] }}{{ user?.lastName?.[0] }}
                    </UiAvatarFallback>
                  </UiAvatar>
                  <UiButton variant="outline" size="sm" class="mt-4">
                    <Upload class="mr-2 h-4 w-4" />
                    Change Photo
                  </UiButton>
                </div>

                <!-- Form -->
                <div class="flex-1 grid sm:grid-cols-2 gap-6">
                  <div class="space-y-2">
                    <UiLabel>{{ languageStore.t('auth.firstName') }}</UiLabel>
                    <UiInput v-model="formData.firstName" :disabled="!isEditing" />
                  </div>
                  <div class="space-y-2">
                    <UiLabel>{{ languageStore.t('auth.lastName') }}</UiLabel>
                    <UiInput v-model="formData.lastName" :disabled="!isEditing" />
                  </div>
                  <div class="space-y-2">
                    <UiLabel>{{ languageStore.t('auth.email') }}</UiLabel>
                    <UiInput v-model="formData.email" type="email" :disabled="!isEditing" />
                  </div>
                  <div class="space-y-2">
                    <UiLabel>{{ languageStore.t('profile.phone') }}</UiLabel>
                    <UiInput v-model="formData.phone" :disabled="!isEditing" />
                  </div>
                  <div class="space-y-2 sm:col-span-2">
                    <UiLabel>{{ languageStore.t('profile.location') }}</UiLabel>
                    <UiInput v-model="formData.location" :disabled="!isEditing" />
                  </div>
                  <div class="space-y-2 sm:col-span-2">
                    <UiLabel>{{ languageStore.t('profile.bio') }}</UiLabel>
                    <UiTextarea v-model="formData.bio" :disabled="!isEditing" :rows="4" />
                  </div>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </UiTabsContent>

        <!-- Social Accounts -->
        <UiTabsContent value="social">
          <UiCard class="border-0 shadow-md">
            <UiCardHeader>
              <UiCardTitle>Connected Accounts</UiCardTitle>
            </UiCardHeader>
            <UiCardContent class="space-y-4">
              <div
                v-for="account in socialAccounts"
                :key="account.platform"
                class="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <svg v-if="account.platform === 'Instagram'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <defs><radialGradient id="ig" cx="30%" cy="107%" r="150%"><stop offset="0%" stop-color="#fdf497"/><stop offset="5%" stop-color="#fdf497"/><stop offset="45%" stop-color="#fd5949"/><stop offset="60%" stop-color="#d6249f"/><stop offset="90%" stop-color="#285AEB"/></radialGradient></defs>
                      <path fill="url(#ig)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                    </svg>
                    <svg v-else-if="account.platform === 'Facebook'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <svg v-else-if="account.platform === 'TikTok'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="#010101" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                    </svg>
                    <svg v-else-if="account.platform === 'YouTube'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <svg v-else-if="account.platform === 'Twitter'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="#000000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <component v-else :is="account.icon" class="h-6 w-6" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">{{ account.platform }}</p>
                    <template v-if="account.connected">
                      <p class="text-sm text-gray-600">{{ account.username }}</p>
                      <p class="text-sm text-primary">{{ account.followers }} followers</p>
                    </template>
                    <p v-else class="text-sm text-gray-400">Not connected</p>
                  </div>
                </div>
                <UiButton :variant="account.connected ? 'outline' : 'default'" size="sm">
                  {{ account.connected ? 'Disconnect' : 'Connect' }}
                </UiButton>
              </div>
            </UiCardContent>
          </UiCard>
        </UiTabsContent>

        <!-- Categories -->
        <UiTabsContent value="categories">
          <UiCard class="border-0 shadow-md">
            <UiCardHeader>
              <UiCardTitle>Select Your Niches</UiCardTitle>
            </UiCardHeader>
            <UiCardContent>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="category in categories"
                  :key="category.id"
                  class="px-6 py-3 rounded-full font-medium transition-colors"
                  :class="category.selected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
                  @click="category.selected = !category.selected"
                >
                  {{ category.name }}
                </button>
              </div>
            </UiCardContent>
          </UiCard>
        </UiTabsContent>

        <!-- Verification -->
        <UiTabsContent value="verification">
          <!-- [DEMO] Status switcher -->
          <div class="flex items-center gap-2 mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
            <span class="font-medium">Demo:</span>
            <button v-for="s in ['none','pending','approved']" :key="s" @click="kycStatus = s"
              :class="['px-3 py-1 rounded-full font-medium transition-colors', kycStatus === s ? 'bg-yellow-400 text-white' : 'bg-white border border-yellow-300 hover:bg-yellow-100']">
              {{ s === 'none' ? 'ยังไม่ส่ง' : s === 'pending' ? 'รอตรวจสอบ' : 'อนุมัติแล้ว' }}
            </button>
          </div>

          <UiCard class="border-0 shadow-md">
            <UiCardHeader>
              <UiCardTitle class="flex items-center gap-2">
                {{ languageStore.t('profile.verification') }}
                <UiBadge v-if="kycStatus === 'approved'" class="bg-green-100 text-green-700">
                  <CheckCircle class="h-3 w-3 mr-1" /> Approved
                </UiBadge>
                <UiBadge v-else-if="kycStatus === 'pending'" class="bg-yellow-100 text-yellow-700">
                  <Clock class="h-3 w-3 mr-1" /> Pending
                </UiBadge>
                <UiBadge v-else class="bg-gray-100 text-gray-600">
                  Not Submitted
                </UiBadge>
              </UiCardTitle>
            </UiCardHeader>
            <UiCardContent class="space-y-6">

              <!-- Status banner -->
              <div v-if="kycStatus === 'approved'" class="p-4 bg-green-50 rounded-xl border border-green-200 flex items-center gap-3">
                <CheckCircle class="h-6 w-6 text-green-600 shrink-0" />
                <div>
                  <p class="font-semibold text-green-900">Identity Verified</p>
                  <p class="text-sm text-green-700">Your account has been fully verified</p>
                </div>
              </div>
              <div v-else-if="kycStatus === 'pending'" class="p-4 bg-yellow-50 rounded-xl border border-yellow-200 flex items-center gap-3">
                <Clock class="h-6 w-6 text-yellow-600 shrink-0" />
                <div>
                  <p class="font-semibold text-yellow-900">Under Review</p>
                  <p class="text-sm text-yellow-700">Your documents are being reviewed. This usually takes 1-2 business days.</p>
                </div>
              </div>
              <div v-else class="p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-center gap-3">
                <Upload class="h-6 w-6 text-blue-600 shrink-0" />
                <div>
                  <p class="font-semibold text-blue-900">Verify Your Identity</p>
                  <p class="text-sm text-blue-700">Please upload the required documents to verify your account and start receiving payments.</p>
                </div>
              </div>

              <!-- Documents -->
              <div class="space-y-4">
                <h3 class="font-semibold text-gray-900">{{ kycStatus === 'none' ? 'Required Documents' : 'Uploaded Documents' }}</h3>
                <div class="grid sm:grid-cols-3 gap-4">
                  <div v-for="doc in kycDocs" :key="doc.key" class="p-4 border rounded-xl">
                    <div class="flex items-center justify-between mb-3">
                      <span class="font-medium text-sm">{{ languageStore.t(`profile.${doc.key}`) }}</span>
                      <UiBadge v-if="kycStatus === 'approved'" class="bg-green-100 text-green-700 text-xs">Approved</UiBadge>
                      <UiBadge v-else-if="kycStatus === 'pending'" class="bg-yellow-100 text-yellow-700 text-xs">Pending</UiBadge>
                    </div>
                    <!-- Approved: show image -->
                    <div v-if="kycStatus === 'approved'" class="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      <img :src="doc.mockImage" :alt="doc.key" class="w-full h-full object-cover" />
                    </div>
                    <!-- Pending: show image with overlay -->
                    <div v-else-if="kycStatus === 'pending'" class="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
                      <img :src="doc.mockImage" :alt="doc.key" class="w-full h-full object-cover opacity-60" />
                      <div class="absolute inset-0 flex items-center justify-center">
                        <Clock class="h-8 w-8 text-yellow-500" />
                      </div>
                    </div>
                    <!-- None: upload zone -->
                    <label v-else class="aspect-video bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                      <Upload class="h-6 w-6 text-gray-400 mb-1" />
                      <span class="text-xs text-gray-500 text-center">{{ languageStore.t('profile.uploadDocument') }}</span>
                      <input type="file" accept="image/*" class="hidden" @change="handleFileUpload(doc.key)" />
                    </label>
                  </div>
                </div>
                <!-- Submit button (only when none) -->
                <UiButton v-if="kycStatus === 'none'" class="w-full bg-primary hover:bg-primary/90 mt-2" @click="handleKycSubmit">
                  <Upload class="h-4 w-4 mr-2" /> Submit for Verification
                </UiButton>
              </div>

            </UiCardContent>
          </UiCard>
        </UiTabsContent>
      </UiTabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Instagram,
  Facebook,
  Youtube,
  Music2,
  Twitter,
  Upload,
  CheckCircle,
  Clock,
  Lock,
  Edit3,
  Save,
} from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'portal', middleware: 'auth' })

const authStore = useAuthStore()
const languageStore = useLanguageStore()
const { user } = storeToRefs(authStore)

const isEditing = ref(false)

// KYC demo state: 'none' | 'pending' | 'approved'
const kycStatus = ref('none')

const kycDocs = [
  { key: 'idCard', mockImage: 'https://image.mfa.go.th/mfa/0/91fPdh6NtO/Consular-Services/%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88%E0%B8%B3%E0%B8%95%E0%B8%B1%E0%B8%A7%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%8A%E0%B8%B2%E0%B8%8A%E0%B8%99%E0%B9%84%E0%B8%97%E0%B8%A2/Thai_ID_Card_Mockup.png' },
  { key: 'selfie', mockImage: 'https://iapp.co.th/img/api/ekyc/ekyc-test2.jpg' },
  { key: 'bankBook', mockImage: 'https://iapp.co.th/img/api/ekyc/bookbank_example.png' },
]

function handleFileUpload(_key: string) {
  // In real app: upload file to server
}

function handleKycSubmit() {
  kycStatus.value = 'pending'
  toast.success('ส่งเอกสารสำเร็จ', { description: 'ทีมงานจะตรวจสอบภายใน 1-2 วันทำการ' })
}
const formData = reactive({
  firstName: user.value?.firstName || '',
  lastName: user.value?.lastName || '',
  email: user.value?.email || '',
  phone: '081-234-5678',
  location: 'Bangkok, Thailand',
  bio: 'Passionate content creator specializing in lifestyle and fashion. Love sharing my journey and connecting with amazing brands!',
})

const socialAccounts = [
  { platform: 'Instagram', username: '@somsai_jd', followers: '25.5K', icon: Instagram, connected: true },
  { platform: 'Facebook', username: 'Somsai JaiDee', followers: '12.3K', icon: Facebook, connected: true },
  { platform: 'TikTok', username: '@somsai_jd', followers: '45.2K', icon: Music2, connected: true },
  { platform: 'YouTube', username: 'Somsai Channel', followers: '8.1K', icon: Youtube, connected: false },
  { platform: 'Twitter', username: '@somsai_jd', followers: '3.5K', icon: Twitter, connected: false },
]

const categories = reactive([
  { id: 'Beauty', name: 'Beauty & Skincare', selected: false },
  { id: 'Food', name: 'Food & Beverage', selected: false },
  { id: 'Lifestyle', name: 'Lifestyle', selected: true },
  { id: 'Health', name: 'Doctor & Health', selected: false },
  { id: 'Family', name: 'Kids & Family', selected: false },
  { id: 'Entertainment', name: 'Ent. & Comedy', selected: false },
  { id: 'Review', name: 'Review ป้ายยา', selected: false },
  { id: 'Promotion', name: 'Promotion', selected: false },
  { id: 'Finance', name: 'Finance & Invest', selected: false },
])

function handleSave() {
  authStore.updateUser({ firstName: formData.firstName, lastName: formData.lastName })
  isEditing.value = false
  toast.success('Profile updated', { description: 'Your profile has been updated successfully.' })
}
</script>
