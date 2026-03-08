<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/10 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center gap-2">
          <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <span class="text-white font-bold text-2xl">P</span>
          </div>
          <span class="font-bold text-2xl text-gray-900">Prakit Media</span>
        </NuxtLink>
      </div>

      <!-- Success State -->
      <UiCard v-if="isSuccess" class="border-0 shadow-xl">
        <UiCardContent class="p-8 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle class="h-8 w-8 text-green-600" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-3">{{ languageStore.t('auth.passwordChanged') }}</h2>
          <p class="text-gray-600 mb-6">{{ languageStore.language === 'th' ? 'รหัสผ่านของคุณถูกอัปเดตแล้ว กรุณาเข้าสู่ระบบด้วยรหัสผ่านใหม่' : 'Your password has been updated. Please log in with your new password.' }}</p>
          <NuxtLink to="/login">
            <UiButton class="w-full bg-primary hover:bg-primary/90">
              {{ languageStore.t('nav.login') }}
            </UiButton>
          </NuxtLink>
        </UiCardContent>
      </UiCard>

      <!-- Form State -->
      <UiCard v-else class="border-0 shadow-xl">
        <UiCardHeader class="space-y-1">
          <UiCardTitle class="text-2xl font-bold text-center">{{ languageStore.t('auth.resetPasswordTitle') }}</UiCardTitle>
          <UiCardDescription class="text-center">{{ languageStore.t('auth.resetPasswordSubtitle') }}</UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="space-y-6">
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="space-y-2">
              <UiLabel for="newPassword">{{ languageStore.t('auth.newPassword') }}</UiLabel>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <UiInput
                  id="newPassword"
                  v-model="newPassword"
                  :type="showNew ? 'text' : 'password'"
                  :placeholder="languageStore.language === 'th' ? 'กรอกรหัสผ่านใหม่' : 'Enter new password'"
                  required
                  minlength="8"
                  :disabled="isLoading"
                  class="pl-10 pr-10"
                />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" @click="showNew = !showNew">
                  <EyeOff v-if="showNew" class="h-4 w-4" />
                  <Eye v-else class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <UiLabel for="confirmPassword">{{ languageStore.t('auth.confirmPassword') }}</UiLabel>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <UiInput
                  id="confirmPassword"
                  v-model="confirmPassword"
                  :type="showConfirm ? 'text' : 'password'"
                  :placeholder="languageStore.language === 'th' ? 'ยืนยันรหัสผ่านใหม่' : 'Confirm new password'"
                  required
                  :disabled="isLoading"
                  class="pl-10 pr-10"
                />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" @click="showConfirm = !showConfirm">
                  <EyeOff v-if="showConfirm" class="h-4 w-4" />
                  <Eye v-else class="h-4 w-4" />
                </button>
              </div>
              <!-- Password match indicator -->
              <p v-if="confirmPassword && newPassword !== confirmPassword" class="text-xs text-red-500 flex items-center gap-1">
                <XCircle class="h-3.5 w-3.5" />
                {{ languageStore.language === 'th' ? 'รหัสผ่านไม่ตรงกัน' : 'Passwords do not match' }}
              </p>
              <p v-else-if="confirmPassword && newPassword === confirmPassword" class="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle class="h-3.5 w-3.5" />
                {{ languageStore.language === 'th' ? 'รหัสผ่านตรงกัน' : 'Passwords match' }}
              </p>
            </div>

            <UiButton
              type="submit"
              class="w-full bg-primary hover:bg-primary/90"
              :disabled="isLoading || newPassword !== confirmPassword || newPassword.length < 8"
            >
              <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              {{ isLoading
                ? (languageStore.language === 'th' ? 'กำลังบันทึก...' : 'Saving...')
                : languageStore.t('auth.resetPassword') }}
            </UiButton>
          </form>

          <NuxtLink to="/login">
            <UiButton variant="ghost" class="w-full">
              <ArrowLeft class="mr-2 h-4 w-4" />
              {{ languageStore.language === 'th' ? 'กลับหน้า Login' : 'Back to Login' }}
            </UiButton>
          </NuxtLink>
        </UiCardContent>
      </UiCard>

      <p class="text-center mt-6">
        <NuxtLink to="/" class="text-sm text-gray-500 hover:text-gray-700">← {{ languageStore.language === 'th' ? 'กลับหน้าหลัก' : 'Back to home' }}</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Lock, Eye, EyeOff, Loader2, ArrowLeft, CheckCircle, XCircle } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'auth' })

const languageStore = useLanguageStore()

const newPassword = ref('')
const confirmPassword = ref('')
const showNew = ref(false)
const showConfirm = ref(false)
const isLoading = ref(false)
const isSuccess = ref(false)

async function handleSubmit() {
  if (newPassword.value !== confirmPassword.value) return
  isLoading.value = true
  await new Promise(r => setTimeout(r, 1000)) // mock API delay
  isLoading.value = false
  isSuccess.value = true
  toast.success(languageStore.t('auth.passwordChanged'))
}
</script>
