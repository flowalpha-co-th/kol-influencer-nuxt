<template>
  <!-- Step 2: Success -->
  <div v-if="step === 2" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/10 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md text-center">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle class="h-10 w-10 text-green-600" />
      </div>
      <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ languageStore.t('auth.registerSuccess') }}</h2>
      <p class="text-gray-600 mb-8">Your account has been created successfully. Redirecting to dashboard...</p>
      <NuxtLink to="/portal/dashboard">
        <UiButton class="bg-primary hover:bg-primary/90">Go to Dashboard</UiButton>
      </NuxtLink>
    </div>
  </div>

  <!-- Step 1: Form -->
  <div v-else class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/10 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center">
          <img src="/logo.svg" alt="Prakast" class="h-14 w-auto" />
        </NuxtLink>
      </div>

      <UiCard class="border-0 shadow-xl">
        <UiCardHeader class="space-y-1">
          <UiCardTitle class="text-2xl font-bold text-center">{{ languageStore.t('auth.registerTitle') }}</UiCardTitle>
          <UiCardDescription class="text-center">{{ languageStore.t('auth.registerSubtitle') }}</UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="space-y-6">
          <!-- Social Register -->
          <div class="grid grid-cols-3 gap-3">
            <!-- Facebook -->
            <button
              type="button"
              :disabled="!!socialLoading"
              class="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
              @click="handleSocialRegister('facebook')"
            >
              <Loader2 v-if="socialLoading === 'facebook'" class="h-5 w-5 animate-spin text-gray-400" />
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span class="hidden sm:inline">Facebook</span>
            </button>

            <!-- Google -->
            <button
              type="button"
              :disabled="!!socialLoading"
              class="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
              @click="handleSocialRegister('google')"
            >
              <Loader2 v-if="socialLoading === 'google'" class="h-5 w-5 animate-spin text-gray-400" />
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span class="hidden sm:inline">Google</span>
            </button>

            <!-- TikTok -->
            <button
              type="button"
              :disabled="!!socialLoading"
              class="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
              @click="handleSocialRegister('tiktok')"
            >
              <Loader2 v-if="socialLoading === 'tiktok'" class="h-5 w-5 animate-spin text-gray-400" />
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path fill="#010101" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
              </svg>
              <span class="hidden sm:inline">TikTok</span>
            </button>
          </div>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <UiSeparator class="w-full" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-white px-2 text-gray-500">{{ languageStore.t('auth.orContinueWith') }}</span>
            </div>
          </div>

          <!-- Form -->
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <UiLabel for="firstName">{{ languageStore.t('auth.firstName') }}</UiLabel>
                <UiInput id="firstName" v-model="formData.firstName" placeholder="John" required :disabled="isLoading" />
              </div>
              <div class="space-y-2">
                <UiLabel for="lastName">{{ languageStore.t('auth.lastName') }}</UiLabel>
                <UiInput id="lastName" v-model="formData.lastName" placeholder="Doe" required :disabled="isLoading" />
              </div>
            </div>

            <div class="space-y-2">
              <UiLabel for="username">{{ languageStore.t('auth.username') }}</UiLabel>
              <UiInput id="username" v-model="formData.username" placeholder="johndoe" required :disabled="isLoading" />
            </div>

            <div class="space-y-2">
              <UiLabel for="email">{{ languageStore.t('auth.email') }}</UiLabel>
              <UiInput id="email" v-model="formData.email" type="email" placeholder="john@example.com" required :disabled="isLoading" />
            </div>

            <div class="space-y-2">
              <UiLabel for="password">{{ languageStore.t('auth.password') }}</UiLabel>
              <div class="relative">
                <UiInput
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Create a password"
                  required
                  :disabled="isLoading"
                  minlength="8"
                />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" @click="showPassword = !showPassword">
                  <EyeOff v-if="showPassword" class="h-4 w-4" />
                  <Eye v-else class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <UiLabel for="confirmPassword">{{ languageStore.t('auth.confirmPassword') }}</UiLabel>
              <div class="relative">
                <UiInput
                  id="confirmPassword"
                  v-model="formData.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm your password"
                  required
                  :disabled="isLoading"
                />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" @click="showConfirmPassword = !showConfirmPassword">
                  <EyeOff v-if="showConfirmPassword" class="h-4 w-4" />
                  <Eye v-else class="h-4 w-4" />
                </button>
              </div>
            </div>

            <!-- Terms & Privacy Checkboxes -->
            <div class="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <label class="flex items-start gap-3 cursor-pointer group">
                <UiCheckbox
                  id="termsAccepted"
                  v-model:checked="formData.termsAccepted"
                  :disabled="isLoading"
                  class="mt-0.5 shrink-0"
                />
                <span class="text-sm text-gray-600 leading-snug select-none">
                  ฉันยอมรับ
                  <NuxtLink to="/terms" target="_blank" class="text-primary font-medium hover:underline inline-flex items-center gap-0.5">
                    ข้อกำหนดการใช้บริการ
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </NuxtLink>
                  <span class="text-red-500 ml-0.5">*</span>
                </span>
              </label>
              <div class="border-t border-gray-200" />
              <label class="flex items-start gap-3 cursor-pointer group">
                <UiCheckbox
                  id="privacyAccepted"
                  v-model:checked="formData.privacyAccepted"
                  :disabled="isLoading"
                  class="mt-0.5 shrink-0"
                />
                <span class="text-sm text-gray-600 leading-snug select-none">
                  ฉันได้อ่านและรับทราบ
                  <NuxtLink to="/privacy" target="_blank" class="text-primary font-medium hover:underline inline-flex items-center gap-0.5">
                    นโยบายความเป็นส่วนตัว
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </NuxtLink>
                  แล้ว
                </span>
              </label>
            </div>

            <UiButton
              type="submit"
              class="w-full bg-primary hover:bg-primary/90 disabled:cursor-not-allowed"
              :disabled="isLoading || !formData.termsAccepted"
            >
              <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              {{ isLoading ? 'Creating account...' : languageStore.t('nav.register') }}
            </UiButton>
            <p v-if="!formData.termsAccepted" class="text-xs text-gray-400 text-center">
              กรุณายอมรับข้อกำหนดการใช้บริการก่อนสมัครสมาชิก
            </p>
          </form>

          <p class="text-center text-sm text-gray-600">
            {{ languageStore.t('auth.haveAccount') }}
            <NuxtLink to="/login" class="text-primary hover:underline font-medium">
              {{ languageStore.t('auth.loginNow') }}
            </NuxtLink>
          </p>
        </UiCardContent>
      </UiCard>

      <p class="text-center mt-6">
        <NuxtLink to="/" class="text-sm text-gray-500 hover:text-gray-700">← Back to home</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'auth' })

const authStore = useAuthStore()
const languageStore = useLanguageStore()
const router = useRouter()

const isLoading = ref(false)
const socialLoading = ref<string | null>(null)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const step = ref(1)

const formData = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
  privacyAccepted: false,
})

async function handleSubmit() {
  if (!formData.termsAccepted) {
    toast.error('กรุณายอมรับข้อกำหนด', { description: 'คุณต้องยอมรับข้อกำหนดการใช้บริการก่อนสมัครสมาชิก' })
    return
  }
  if (formData.password !== formData.confirmPassword) {
    toast.error('Password mismatch', { description: 'Passwords do not match' })
    return
  }
  isLoading.value = true
  try {
    await authStore.register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    })
    toast.success(languageStore.t('auth.registerSuccess'), { description: 'Your account has been created successfully!' })
    step.value = 2
    setTimeout(() => router.push('/portal/dashboard'), 2000)
  } catch {
    toast.error('Registration failed', { description: 'Could not create account. Please try again.' })
  } finally {
    isLoading.value = false
  }
}

async function handleSocialRegister(provider: 'facebook' | 'google' | 'tiktok') {
  socialLoading.value = provider
  try {
    await authStore.loginWithSocial(provider)
    toast.success(languageStore.t('auth.registerSuccess'), { description: `Account created with ${provider}` })
    router.push('/portal/dashboard')
  } catch {
    toast.error('Registration failed', { description: `Could not register with ${provider}` })
  } finally {
    socialLoading.value = null
  }
}
</script>
