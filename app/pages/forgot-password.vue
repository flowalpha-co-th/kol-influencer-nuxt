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
      <UiCard v-if="isSent" class="border-0 shadow-xl">
        <UiCardContent class="p-8 text-center">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle class="h-8 w-8 text-green-600" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
          <p class="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{{ email }}</strong>.
            Please check your inbox and follow the instructions.
          </p>
          <!-- Demo shortcut -->
          <div class="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-left">
            <p class="text-xs font-semibold text-yellow-700 mb-2">🎯 Demo — จำลองการกดลิงก์จากอีเมล</p>
            <NuxtLink to="/reset-password">
              <UiButton size="sm" class="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                <ExternalLink class="mr-2 h-3.5 w-3.5" /> เปิดหน้า Reset Password
              </UiButton>
            </NuxtLink>
          </div>
          <NuxtLink to="/login">
            <UiButton variant="outline" class="w-full border-[#5A5A5A] text-[#5A5A5A] hover:bg-[#E8E8E8]">
              <ArrowLeft class="mr-2 h-4 w-4" />
              Back to Login
            </UiButton>
          </NuxtLink>
        </UiCardContent>
      </UiCard>

      <!-- Form State -->
      <UiCard v-else class="border-0 shadow-xl">
        <UiCardHeader class="space-y-1">
          <UiCardTitle class="text-2xl font-bold text-center">{{ languageStore.t('auth.forgotPasswordTitle') }}</UiCardTitle>
          <UiCardDescription class="text-center">{{ languageStore.t('auth.forgotPasswordSubtitle') }}</UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="space-y-6">
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="space-y-2">
              <UiLabel for="email">{{ languageStore.t('auth.email') }}</UiLabel>
              <div class="relative">
                <Mail class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <UiInput
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  :disabled="isLoading"
                  class="pl-10"
                />
              </div>
            </div>

            <UiButton type="submit" class="w-full bg-primary hover:bg-primary/90" :disabled="isLoading">
              <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              {{ isLoading ? 'Sending...' : languageStore.t('auth.sendResetLink') }}
            </UiButton>
          </form>

          <NuxtLink to="/login">
            <UiButton variant="ghost" class="w-full">
              <ArrowLeft class="mr-2 h-4 w-4" />
              Back to Login
            </UiButton>
          </NuxtLink>
        </UiCardContent>
      </UiCard>

      <p class="text-center mt-6">
        <NuxtLink to="/" class="text-sm text-gray-500 hover:text-gray-700">← Back to home</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Mail, Loader2, ArrowLeft, CheckCircle, ExternalLink } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'auth' })

const authStore = useAuthStore()
const languageStore = useLanguageStore()

const email = ref('')
const isLoading = ref(false)
const isSent = ref(false)

async function handleSubmit() {
  isLoading.value = true
  try {
    await authStore.forgotPassword(email.value)
    toast.success(languageStore.t('auth.passwordResetSent'), { description: 'Check your email for reset instructions' })
    isSent.value = true
  } catch {
    toast.error('Error', { description: 'Could not send reset link. Please try again.' })
  } finally {
    isLoading.value = false
  }
}
</script>
