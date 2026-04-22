<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/10 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-flex items-center">
          <img src="/logo.svg" alt="Prakast" class="h-14 w-auto" />
        </NuxtLink>
      </div>

      <UiCard class="border-0 shadow-xl">
        <UiCardHeader class="space-y-1">
          <UiCardTitle class="text-2xl font-bold text-center">{{ languageStore.t('auth.loginTitle') }}</UiCardTitle>
          <UiCardDescription class="text-center">{{ languageStore.t('auth.loginSubtitle') }}</UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="space-y-6">
          <!-- Social Login -->
          <div class="grid grid-cols-3 gap-3">
            <!-- Facebook -->
            <button
              type="button"
              :disabled="!!socialLoading"
              class="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:opacity-50"
              @click="handleSocialLogin('facebook')"
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
              @click="handleSocialLogin('google')"
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
              @click="handleSocialLogin('tiktok')"
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
            <div class="space-y-2">
              <UiLabel for="username">{{ languageStore.t('auth.username') }}</UiLabel>
              <UiInput
                id="username"
                v-model="formData.username"
                type="text"
                placeholder="Enter your username"
                required
                :disabled="isLoading"
              />
            </div>

            <div class="space-y-2">
              <UiLabel for="password">{{ languageStore.t('auth.password') }}</UiLabel>
              <div class="relative">
                <UiInput
                  id="password"
                  v-model="formData.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  required
                  :disabled="isLoading"
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="showPassword" class="h-4 w-4" />
                  <Eye v-else class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <UiCheckbox id="rememberMe" v-model:checked="formData.rememberMe" />
                <UiLabel for="rememberMe" class="text-sm font-normal">{{ languageStore.t('auth.rememberMe') }}</UiLabel>
              </div>
              <NuxtLink to="/forgot-password" class="text-sm text-primary hover:underline">
                {{ languageStore.t('auth.forgotPassword') }}
              </NuxtLink>
            </div>

            <UiButton type="submit" class="w-full bg-primary hover:bg-primary/90" :disabled="isLoading">
              <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              {{ isLoading ? 'Loading...' : languageStore.t('nav.login') }}
            </UiButton>
          </form>

          <p class="text-center text-sm text-gray-600">
            {{ languageStore.t('auth.noAccount') }}
            <NuxtLink to="/register" class="text-primary hover:underline font-medium">
              {{ languageStore.t('auth.registerNow') }}
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
import { Eye, EyeOff, Loader2 } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'auth' })

const authStore = useAuthStore()
const languageStore = useLanguageStore()
const router = useRouter()

const isLoading = ref(false)
const socialLoading = ref<string | null>(null)
const showPassword = ref(false)
const formData = reactive({ username: '', password: '', rememberMe: false })

async function handleSubmit() {
  isLoading.value = true
  try {
    await authStore.login({ username: formData.username, password: formData.password })
    toast.success(languageStore.t('auth.loginSuccess'), { description: 'Welcome back!' })
    router.push('/portal/dashboard')
  } catch {
    toast.error('Login failed', { description: 'Invalid username or password' })
  } finally {
    isLoading.value = false
  }
}

async function handleSocialLogin(provider: 'facebook' | 'google' | 'tiktok') {
  socialLoading.value = provider
  try {
    await authStore.loginWithSocial(provider)
    toast.success(languageStore.t('auth.loginSuccess'), { description: `Logged in with ${provider}` })
    router.push('/portal/dashboard')
  } catch {
    toast.error('Login failed', { description: `Could not login with ${provider}` })
  } finally {
    socialLoading.value = null
  }
}
</script>
