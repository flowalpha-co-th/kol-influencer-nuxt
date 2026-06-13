<script setup lang="ts">
const languageStore = useLanguageStore()
</script>

<template>
  <div class="flex w-fit items-center rounded-md border border-[#0F2747]/10 bg-white p-1 shadow-sm">
    <button
      type="button"
      class="rounded px-2.5 py-0.5 text-[10px] font-bold transition"
      :class="languageStore.language === 'th' ? 'bg-primary text-white' : 'text-[#5B6B82]/40 hover:text-ink'"
      @click="languageStore.setLanguage('th')"
    >
      TH
    </button>
    <button
      type="button"
      class="rounded px-2.5 py-0.5 text-[10px] font-bold transition"
      :class="languageStore.language === 'en' ? 'bg-primary text-white' : 'text-[#5B6B82]/40 hover:text-ink'"
      @click="languageStore.setLanguage('en')"
    >
      EN
    </button>
  </div>
</template>
