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

onMounted(() => {
  authStore.init()
  languageStore.init()
})
</script>
