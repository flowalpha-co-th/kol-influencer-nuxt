<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <!-- Hero -->
    <section class="bg-white border-b border-gray-100 py-12">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <NuxtLink to="/register" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          {{ languageStore.t('terms.hero.backLink') }}
        </NuxtLink>
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ languageStore.t('terms.hero.title') }}</h1>
            <p class="text-gray-500 mt-1 text-sm">{{ languageStore.t('terms.hero.updated') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div
          v-for="section in sections"
          :key="section.num"
          class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div class="flex items-center gap-3 px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <span class="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
              {{ section.num }}
            </span>
            <h2 class="font-semibold text-gray-900">{{ section.title }}</h2>
          </div>
          <p class="px-6 py-4 text-gray-600 leading-relaxed text-sm whitespace-pre-line">{{ section.content }}</p>
        </div>

        <!-- Legal Entity -->
        <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">{{ languageStore.t('terms.contact.entityLabel') }}</p>
          <p class="font-semibold text-gray-900 mb-2">{{ entityName }}</p>
          <p class="text-sm text-gray-600">{{ entityAddress }}</p>
        </div>

        <!-- Contact -->
        <div class="bg-primary/5 rounded-xl border border-primary/10 p-6 flex items-start gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <p class="text-sm text-gray-600">
            {{ languageStore.t('terms.contact.question') }}
            <a href="mailto:legal@ripples.com" class="text-primary font-medium hover:underline">legal@ripples.com</a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const languageStore = useLanguageStore()

const sections = computed(() =>
  Array.from({ length: 13 }, (_, i) => ({
    num: String(i + 1),
    title: languageStore.t(`terms.sections.s${i + 1}Title`),
    content: languageStore.t(`terms.sections.s${i + 1}Content`),
  }))
)

const entityName = computed(() =>
  languageStore.language === 'th'
    ? languageStore.t('terms.contact.entityNameTh')
    : languageStore.t('terms.contact.entityNameEn')
)
const entityAddress = computed(() =>
  languageStore.language === 'th'
    ? languageStore.t('terms.contact.entityAddressTh')
    : languageStore.t('terms.contact.entityAddressEn')
)
</script>
