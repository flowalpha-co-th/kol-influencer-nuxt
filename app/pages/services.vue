<template>
  <div class="min-h-screen pt-20">
    <!-- Hero -->
    <section class="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto">
          <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-6">{{ languageStore.t('services.badge') }}</UiBadge>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {{ languageStore.t('services.title') }}
          </h1>
          <p class="text-xl text-gray-600 leading-relaxed">
            {{ languageStore.t('services.description') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-20 bg-white">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UiCard v-for="service in services" :key="service.title" class="border-0 shadow-md hover:shadow-xl transition-all duration-300">
            <UiCardContent class="p-8">
              <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <component :is="service.icon" class="h-7 w-7 text-primary" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ service.title }}</h3>
              <p class="text-gray-600 mb-4">{{ service.description }}</p>
              <ul class="space-y-2">
                <li v-for="feature in service.features" :key="feature" class="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle class="h-4 w-4 text-primary shrink-0" />
                  {{ feature }}
                </li>
              </ul>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-4">{{ languageStore.t('services.howItWorks.badge') }}</UiBadge>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">{{ languageStore.t('services.howItWorks.title') }}</h2>
        </div>
        <div class="grid md:grid-cols-4 gap-8">
          <div v-for="(step, index) in steps" :key="step.title" class="text-center">
            <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
              {{ index + 1 }}
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ step.title }}</h3>
            <p class="text-gray-600 text-sm">{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-primary">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl font-bold text-white mb-6">{{ languageStore.t('services.ctaSection.title') }}</h2>
        <p class="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
          {{ languageStore.t('services.ctaSection.description') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/contact">
            <UiButton size="lg" class="bg-white text-primary hover:bg-white/90 px-8">
              {{ languageStore.t('services.ctaSection.button1') }}
            </UiButton>
          </NuxtLink>
          <NuxtLink to="/about">
            <UiButton size="lg" variant="outline" class="border-white text-white hover:bg-white/10 px-8">
              {{ languageStore.t('services.ctaSection.button2') }}
            </UiButton>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  Search,
  BarChart3,
  CreditCard,
  Shield,
  HeadphonesIcon,
  FileText,
  CheckCircle,
} from 'lucide-vue-next'
import { useLanguageStore } from '~/stores/language'

definePageMeta({ layout: 'default' })

const languageStore = useLanguageStore()

const services = computed(() => [
  {
    icon: Search,
    title: languageStore.t('services.service1'),
    description: languageStore.t('services.service1Desc'),
    features: [
      languageStore.t('services.service1Feature1'),
      languageStore.t('services.service1Feature2'),
      languageStore.t('services.service1Feature3'),
      languageStore.t('services.service1Feature4'),
    ],
  },
  {
    icon: BarChart3,
    title: languageStore.t('services.service2'),
    description: languageStore.t('services.service2Desc'),
    features: [
      languageStore.t('services.service2Feature1'),
      languageStore.t('services.service2Feature2'),
      languageStore.t('services.service2Feature3'),
      languageStore.t('services.service2Feature4'),
    ],
  },
  {
    icon: CreditCard,
    title: languageStore.t('services.service3'),
    description: languageStore.t('services.service3Desc'),
    features: [
      languageStore.t('services.service3Feature1'),
      languageStore.t('services.service3Feature2'),
      languageStore.t('services.service3Feature3'),
      languageStore.t('services.service3Feature4'),
    ],
  },
  {
    icon: Shield,
    title: languageStore.t('services.service4'),
    description: languageStore.t('services.service4Desc'),
    features: [
      languageStore.t('services.service4Feature1'),
      languageStore.t('services.service4Feature2'),
      languageStore.t('services.service4Feature3'),
      languageStore.t('services.service4Feature4'),
    ],
  },
  {
    icon: HeadphonesIcon,
    title: languageStore.t('services.service5'),
    description: languageStore.t('services.service5Desc'),
    features: [
      languageStore.t('services.service5Feature1'),
      languageStore.t('services.service5Feature2'),
      languageStore.t('services.service5Feature3'),
      languageStore.t('services.service5Feature4'),
    ],
  },
  {
    icon: FileText,
    title: languageStore.t('services.service6'),
    description: languageStore.t('services.service6Desc'),
    features: [
      languageStore.t('services.service6Feature1'),
      languageStore.t('services.service6Feature2'),
      languageStore.t('services.service6Feature3'),
      languageStore.t('services.service6Feature4'),
    ],
  },
])

const steps = computed(() => [
  {
    title: languageStore.t('services.howItWorks.step1Title'),
    description: languageStore.t('services.howItWorks.step1Description'),
  },
  {
    title: languageStore.t('services.howItWorks.step2Title'),
    description: languageStore.t('services.howItWorks.step2Description'),
  },
  {
    title: languageStore.t('services.howItWorks.step3Title'),
    description: languageStore.t('services.howItWorks.step3Description'),
  },
  {
    title: languageStore.t('services.howItWorks.step4Title'),
    description: languageStore.t('services.howItWorks.step4Description'),
  },
])
</script>
