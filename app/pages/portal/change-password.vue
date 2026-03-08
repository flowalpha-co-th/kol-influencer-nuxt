<template>
  <div class="min-h-screen bg-gray-50 pt-24 pb-12">
    <div class="max-w-md mx-auto px-4 sm:px-6">
      <UiButton variant="ghost" class="mb-6 -ml-4" @click="router.push('/portal/profile')">
        <ArrowLeft class="mr-2 h-4 w-4" />
        Back to Profile
      </UiButton>

      <UiCard class="border-0 shadow-xl">
        <UiCardHeader class="space-y-1">
          <UiCardTitle class="text-2xl font-bold">{{ languageStore.t('auth.changePasswordTitle') }}</UiCardTitle>
          <UiCardDescription>{{ languageStore.t('auth.changePasswordSubtitle') }}</UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="space-y-6">
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div class="space-y-2">
              <UiLabel for="oldPassword">{{ languageStore.t('auth.oldPassword') }}</UiLabel>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <UiInput
                  id="oldPassword"
                  v-model="formData.oldPassword"
                  :type="showOld ? 'text' : 'password'"
                  placeholder="Enter current password"
                  required
                  :disabled="isLoading"
                  class="pl-10"
                />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" @click="showOld = !showOld">
                  <EyeOff v-if="showOld" class="h-4 w-4" />
                  <Eye v-else class="h-4 w-4" />
                </button>
              </div>
            </div>

            <div class="space-y-2">
              <UiLabel for="newPassword">{{ languageStore.t('auth.newPassword') }}</UiLabel>
              <div class="relative">
                <Lock class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <UiInput
                  id="newPassword"
                  v-model="formData.newPassword"
                  :type="showNew ? 'text' : 'password'"
                  placeholder="Enter new password"
                  required
                  :disabled="isLoading"
                  minlength="8"
                  class="pl-10"
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
                  v-model="formData.confirmPassword"
                  :type="showConfirm ? 'text' : 'password'"
                  placeholder="Confirm new password"
                  required
                  :disabled="isLoading"
                  class="pl-10"
                />
                <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" @click="showConfirm = !showConfirm">
                  <EyeOff v-if="showConfirm" class="h-4 w-4" />
                  <Eye v-else class="h-4 w-4" />
                </button>
              </div>
            </div>

            <UiButton type="submit" class="w-full bg-primary hover:bg-primary/90" :disabled="isLoading">
              <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
              {{ isLoading ? 'Changing...' : languageStore.t('auth.changePassword') }}
            </UiButton>
          </form>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Eye, EyeOff, Loader2, Lock, ArrowLeft } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'portal', middleware: 'auth' })

const authStore = useAuthStore()
const languageStore = useLanguageStore()
const router = useRouter()

const isLoading = ref(false)
const showOld = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

const formData = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })

async function handleSubmit() {
  if (formData.newPassword !== formData.confirmPassword) {
    toast.error('Password mismatch', { description: 'New passwords do not match' })
    return
  }
  if (formData.newPassword.length < 8) {
    toast.error('Password too short', { description: 'Password must be at least 8 characters' })
    return
  }
  isLoading.value = true
  try {
    await authStore.changePassword(formData.oldPassword, formData.newPassword)
    toast.success(languageStore.t('auth.passwordChanged'), { description: 'Your password has been updated successfully' })
    router.push('/portal/profile')
  } catch {
    toast.error('Error', { description: 'Could not change password. Please check your old password.' })
  } finally {
    isLoading.value = false
  }
}
</script>
