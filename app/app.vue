<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toaster position="top-right" rich-colors />
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'

const authStore = useAuthStore()
const languageStore = useLanguageStore()
const { lang } = useLocale()

useHead({ htmlAttrs: { lang } })

onMounted(() => {
  authStore.restore()
  languageStore.init()
})
</script>
