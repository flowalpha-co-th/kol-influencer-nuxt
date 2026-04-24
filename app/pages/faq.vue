<template>
  <div class="min-h-screen pt-20">
    <!-- Hero -->
    <section class="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto">
          <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-6">{{ languageStore.t('faq.badge') }}</UiBadge>
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">{{ languageStore.t('faq.title') }}</h1>
          <p class="text-xl text-gray-600">{{ languageStore.t('faq.subtitle') }}</p>
        </div>
      </div>
    </section>

    <!-- Search -->
    <section class="py-8 bg-white border-b">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-xl mx-auto">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <UiInput v-model="searchQuery" :placeholder="languageStore.t('faq.searchPlaceholder')" class="pl-12 h-14 text-lg" />
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-4 gap-8">
          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <UiCard class="border-0 shadow-md sticky top-24">
              <UiCardContent class="p-4">
                <h3 class="font-semibold text-gray-900 mb-4">{{ languageStore.t('faq.categoriesTitle') }}</h3>
                <div class="space-y-2">
                  <button
                    v-for="category in categories"
                    :key="category"
                    class="w-full text-left px-4 py-2 rounded-lg transition-colors"
                    :class="selectedCategory === category ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'"
                    @click="selectedCategory = category"
                  >
                    {{ languageStore.t(`faq.categories.${category}`) }}
                  </button>
                </div>
              </UiCardContent>
            </UiCard>
          </div>

          <!-- FAQ List -->
          <div class="lg:col-span-3">
            <UiAccordion type="single" collapsible class="space-y-4">
              <UiAccordionItem
                v-for="faq in filteredFAQs"
                :key="faq.id"
                :value="faq.id"
                class="bg-white rounded-xl shadow-md border-0 px-6"
              >
                <UiAccordionTrigger class="text-left font-semibold text-gray-900 hover:no-underline py-6">
                  {{ faq.question }}
                </UiAccordionTrigger>
                <UiAccordionContent class="text-gray-600 pb-6 leading-relaxed">
                  {{ faq.answer }}
                </UiAccordionContent>
              </UiAccordionItem>
            </UiAccordion>

            <div v-if="filteredFAQs.length === 0" class="text-center py-16 bg-white rounded-xl">
              <p class="text-gray-500">{{ languageStore.t('faq.noResults') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact CTA -->
    <section class="py-20 bg-white">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <UiCard class="border-0 shadow-xl bg-gradient-to-r from-primary to-red-600">
          <UiCardContent class="p-12 text-center text-white">
            <MessageCircle class="h-12 w-12 mx-auto mb-6" />
            <h2 class="text-3xl font-bold mb-4">{{ languageStore.t('faq.cta.title') }}</h2>
            <p class="text-white/90 mb-8 max-w-xl mx-auto">{{ languageStore.t('faq.cta.description') }}</p>
            <NuxtLink to="/contact">
              <UiButton variant="secondary" size="lg">{{ languageStore.t('faq.cta.button') }}</UiButton>
            </NuxtLink>
          </UiCardContent>
        </UiCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Search, MessageCircle } from 'lucide-vue-next'
import { mockFAQs } from '~/data/mockData'

definePageMeta({ layout: 'default' })

const languageStore = useLanguageStore()

const searchQuery = ref('')
const selectedCategory = ref('all')
const categories = ['all', 'general', 'payment', 'campaigns', 'requirements']

const filteredFAQs = computed(() =>
  mockFAQs.filter(faq => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'all' || faq.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
)
</script>
