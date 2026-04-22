<template>
  <div class="min-h-screen pt-20">
    <!-- Hero -->
    <section class="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="about-hero-content text-center max-w-3xl mx-auto">
          <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-6">{{ languageStore.t('about.badge') }}</UiBadge>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {{ languageStore.t('about.title') }}
          </h1>
          <p class="text-xl text-gray-600 leading-relaxed">
            {{ languageStore.t('about.description') }}
          </p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-16 bg-white">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <p class="text-4xl sm:text-5xl font-bold text-primary mb-2">{{ stat.value }}</p>
            <p class="text-gray-600">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">{{ languageStore.t('about.story.title') }}</h2>
            <div class="space-y-4 text-gray-600 leading-relaxed">
              <p>{{ languageStore.t('about.story.paragraph1') }}</p>
              <p>{{ languageStore.t('about.story.paragraph2') }}</p>
              <p>{{ languageStore.t('about.story.paragraph3') }}</p>
            </div>
          </div>
          <div class="relative">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" alt="Our team" class="rounded-3xl shadow-xl" />
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            <div class="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="values-section py-20 bg-white">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-4">{{ languageStore.t('about.whyUs.badge') }}</UiBadge>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">{{ languageStore.t('about.whyUs.title') }}</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          <UiCard v-for="value in values" :key="value.title" class="value-card border-0 shadow-md hover:shadow-lg transition-shadow">
            <UiCardContent class="p-8">
              <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <component :is="value.icon" class="h-7 w-7 text-primary" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ value.title }}</h3>
              <p class="text-gray-600">{{ value.description }}</p>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="team-section py-20 bg-gray-50">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-4">{{ languageStore.t('about.team.badge') }}</UiBadge>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">{{ languageStore.t('about.team.title') }}</h2>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <UiCard v-for="member in team" :key="member.name" class="team-card border-0 shadow-md overflow-hidden">
            <div class="aspect-square overflow-hidden">
              <img :src="member.image" :alt="member.name" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <UiCardContent class="p-6 text-center">
              <h3 class="text-lg font-semibold text-gray-900">{{ member.name }}</h3>
              <p class="text-gray-500">{{ member.role }}</p>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Why Us -->
    <section class="py-20 bg-white">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-4">{{ languageStore.t('about.whyUs.badge') }}</UiBadge>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">{{ languageStore.t('about.whyUs.title') }}</h2>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="feature in features" :key="feature" class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <CheckCircle class="h-5 w-5 text-primary shrink-0" />
            <span class="text-gray-700">{{ feature }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Target, Zap, Heart, Globe, CheckCircle } from 'lucide-vue-next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguageStore } from '~/stores/language'

gsap.registerPlugin(ScrollTrigger)

definePageMeta({ layout: 'default' })

const languageStore = useLanguageStore()

const stats = computed(() => [
  { value: languageStore.t('about.stats.stat1Value'), label: languageStore.t('about.stats.stat1Label') },
  { value: languageStore.t('about.stats.stat2Value'), label: languageStore.t('about.stats.stat2Label') },
  { value: languageStore.t('about.stats.stat3Value'), label: languageStore.t('about.stats.stat3Label') },
  { value: languageStore.t('about.stats.stat4Value'), label: languageStore.t('about.stats.stat4Label') },
])

const values = computed(() => [
  { icon: Target, title: languageStore.t('about.values.value1Title'), description: languageStore.t('about.values.value1Description') },
  { icon: Zap, title: languageStore.t('about.values.value2Title'), description: languageStore.t('about.values.value2Description') },
  { icon: Heart, title: languageStore.t('about.values.value3Title'), description: languageStore.t('about.values.value3Description') },
  { icon: Globe, title: languageStore.t('about.values.value4Title'), description: languageStore.t('about.values.value4Description') },
])

const team = computed(() => [
  { name: languageStore.t('about.team.member1Name'), role: languageStore.t('about.team.member1Role'), image: 'https://i.pravatar.cc/600?img=68' },
  { name: languageStore.t('about.team.member2Name'), role: languageStore.t('about.team.member2Role'), image: 'https://i.pravatar.cc/600?img=47' },
  { name: languageStore.t('about.team.member3Name'), role: languageStore.t('about.team.member3Role'), image: 'https://i.pravatar.cc/600?img=13' },
  { name: languageStore.t('about.team.member4Name'), role: languageStore.t('about.team.member4Role'), image: 'https://i.pravatar.cc/600?img=32' },
])

const features = computed(() => [
  languageStore.t('about.whyUs.feature1'),
  languageStore.t('about.whyUs.feature2'),
  languageStore.t('about.whyUs.feature3'),
  languageStore.t('about.whyUs.feature4'),
  languageStore.t('about.whyUs.feature5'),
  languageStore.t('about.whyUs.feature6'),
])

onMounted(() => {
  const ctx = gsap.context(() => {
    gsap.from('.about-hero-content', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
    gsap.from('.value-card', { scrollTrigger: { trigger: '.values-section', start: 'top 70%' }, opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out' })
    gsap.from('.team-card', { scrollTrigger: { trigger: '.team-section', start: 'top 70%' }, opacity: 0, y: 40, duration: 0.6, stagger: 0.1, ease: 'power3.out' })
  })
  onUnmounted(() => ctx.revert())
})
</script>
