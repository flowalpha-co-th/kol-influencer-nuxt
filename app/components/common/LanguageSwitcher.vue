<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="ghost" size="sm" class="gap-2">
        <Globe class="h-4 w-4" />
        <span class="uppercase">{{ language }}</span>
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end">
      <UiDropdownMenuItem @click="setLanguage('th')">
        <span :class="language === 'th' ? 'font-semibold text-primary' : ''">ไทย (TH)</span>
      </UiDropdownMenuItem>
      <UiDropdownMenuItem @click="setLanguage('en')">
        <span :class="language === 'en' ? 'font-semibold text-primary' : ''">English (EN)</span>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

<script setup lang="ts">
import { Globe } from 'lucide-vue-next'

const languageStore = useLanguageStore()
const { language } = storeToRefs(languageStore)
const { setLanguage } = languageStore
</script>
