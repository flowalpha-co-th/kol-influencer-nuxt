<template>
  <div v-if="isVisible" class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg">
    <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
            <Cookie class="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 mb-1">{{ languageStore.t('common.cookiePolicy') }}</h3>
            <p class="text-sm text-gray-600 max-w-xl">
              We use cookies to enhance your experience on our website. By continuing to use our site,
              you agree to our use of cookies.
              <NuxtLink to="/cookies" class="text-primary hover:underline ml-1">Learn more</NuxtLink>
            </p>
          </div>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <UiButton variant="outline" size="sm" @click="handleDecline">Decline</UiButton>
          <UiButton size="sm" class="bg-primary hover:bg-primary/90" @click="handleAccept">Accept All</UiButton>
          <UiButton variant="ghost" size="icon" class="shrink-0" @click="handleDecline">
            <X class="h-4 w-4" />
          </UiButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cookie, X } from 'lucide-vue-next'

const languageStore = useLanguageStore()
const isVisible = ref(false)

onMounted(() => {
  const consent = localStorage.getItem('cookie_consent')
  if (!consent) isVisible.value = true
})

function handleAccept() {
  localStorage.setItem('cookie_consent', 'accepted')
  isVisible.value = false
}

function handleDecline() {
  localStorage.setItem('cookie_consent', 'declined')
  isVisible.value = false
}
</script>
