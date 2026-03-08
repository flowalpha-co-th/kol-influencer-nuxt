<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section ref="heroRef" class="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />
      <div class="absolute top-20 right-0 w-[600px] h-[600px] opacity-30">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#ff4b2f" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.3C87.4,-31.5,90,-14.1,87.8,2.3C85.6,18.7,78.6,34.1,68.8,46.8C59,59.5,46.4,69.5,32.6,75.3C18.8,81.1,3.8,82.7,-10.4,80.6C-24.6,78.5,-38,72.7,-49.6,63.9C-61.2,55.1,-71,43.3,-76.8,29.3C-82.6,15.3,-84.4,-0.9,-81.1,-15.8C-77.8,-30.7,-69.4,-44.3,-58.1,-53.8C-46.8,-63.3,-32.6,-68.7,-18.1,-75.3C-3.6,-81.9,11.2,-89.7,25.6,-88.8C40,-87.9,53.9,-78.3,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>
      <div class="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <div class="hero-subtitle">
              <span class="inline-block px-4 py-2 text-sm font-medium rounded-full bg-gradient-to-r from-primary/15 to-indigo-500/15 border border-primary/20">
                <span class="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
                  {{ languageStore.t('hero.subtitle') }}
                </span>
              </span>
            </div>
            <h1 class="hero-title text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {{ languageStore.t('hero.title') }}
            </h1>
            <p class="hero-desc text-lg text-gray-600 max-w-lg leading-relaxed">
              {{ languageStore.t('hero.description') }}
            </p>
            <div class="hero-buttons flex flex-wrap gap-4">
              <NuxtLink to="/contact">
                <UiButton size="lg" class="bg-primary hover:bg-primary/90 text-white px-8">
                  {{ languageStore.t('hero.getStarted') }}
                  <ArrowRight class="ml-2 h-5 w-5" />
                </UiButton>
              </NuxtLink>
              <NuxtLink to="/services">
                <UiButton size="lg" variant="outline" class="border-[#5A5A5A] text-[#5A5A5A] hover:bg-[#E8E8E8] px-8">
                  {{ languageStore.t('hero.exploreCampaigns') }}
                </UiButton>
              </NuxtLink>
            </div>
          </div>
          <div class="hero-image relative">
            <div class="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop" alt="Influencer" class="w-full h-auto object-cover" />
              <div class="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Star class="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900">Premium Platform</p>
                    <p class="text-sm text-gray-500">Trusted by 10,000+ influencers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section ref="statsRef" class="py-16 bg-white">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="stat-item flex items-center gap-4 p-6 bg-gradient-to-br from-primary/5 to-indigo-500/5 rounded-2xl border border-primary/10">
            <div class="w-14 h-14 bg-gradient-to-br from-primary/15 to-indigo-500/15 rounded-xl flex items-center justify-center">
              <component :is="stat.icon" class="h-7 w-7 text-primary" />
            </div>
            <div>
              <p class="text-3xl font-bold text-gray-900">{{ stat.value }}</p>
              <p class="text-gray-600">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section ref="aboutRef" class="py-20 bg-gray-50">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="about-content space-y-6">
            <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0">{{ languageStore.t('common.learnMore').replace('Learn More', 'About') }}</UiBadge>
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">{{ languageStore.t('about.title') }}</h2>
            <p class="text-gray-600 text-lg leading-relaxed">{{ languageStore.t('about.description') }}</p>
            <div class="space-y-4 pt-4">
              <div v-for="item in aboutPoints" :key="item" class="flex items-center gap-3">
                <CheckCircle class="h-5 w-5 text-primary shrink-0" />
                <span class="text-gray-700">{{ item }}</span>
              </div>
            </div>
            <NuxtLink to="/about">
              <UiButton variant="outline" class="border-[#5A5A5A] text-[#5A5A5A] hover:bg-[#E8E8E8] mt-6">
                {{ languageStore.t('about.learnMore') }} <ArrowRight class="ml-2 h-4 w-4" />
              </UiButton>
            </NuxtLink>
          </div>
          <div class="about-image relative">
            <div class="relative rounded-3xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" alt="Team collaboration" class="w-full h-auto object-cover" />
            </div>
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            <div class="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section ref="servicesRef" class="py-20 bg-white">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-4">{{ languageStore.t('nav.services') }}</UiBadge>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{{ languageStore.t('services.title') }}</h2>
          <NuxtLink to="/services" class="text-gray-500 hover:text-primary transition-colors text-sm">{{ languageStore.t('common.viewAll') }} →</NuxtLink>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UiCard v-for="(service, index) in services" :key="index" class="service-card group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-2">
            <UiCardContent class="p-8">
              <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-indigo-500 group-hover:scale-110 transition-all duration-300">
                <component :is="service.icon" class="h-7 w-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ service.title }}</h3>
              <p class="text-gray-600">{{ service.description }}</p>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Featured Campaigns -->
    <section ref="campaignsRef" class="py-20 bg-gray-50">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-4">{{ languageStore.t('expertise.badge') }}</UiBadge>
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">{{ languageStore.t('expertise.title') }}</h2>
          </div>
          <NuxtLink to="/campaigns">
            <UiButton variant="outline" class="border-[#5A5A5A] text-[#5A5A5A] hover:bg-[#E8E8E8]">{{ languageStore.t('expertise.viewAll') }} <ArrowRight class="ml-2 h-4 w-4" /></UiButton>
          </NuxtLink>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UiCard v-for="campaign in featuredCampaigns" :key="campaign.id" class="campaign-card group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
            <div class="relative h-48 overflow-hidden">
              <img :src="campaign.image" :alt="campaign.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute top-4 left-4">
                <UiBadge class="bg-white/90 text-gray-900 backdrop-blur-sm">{{ campaign.category }}</UiBadge>
              </div>
            </div>
            <UiCardContent class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <img :src="campaign.brandLogo" :alt="campaign.brandName" class="w-6 h-6 rounded-full object-cover" />
                <span class="text-sm text-gray-500">{{ campaign.brandName }}</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{{ campaign.title }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ campaign.description }}</p>
              <div class="flex items-center justify-between pt-4 border-t">
                <div>
                  <p class="text-sm text-gray-500">Budget</p>
                  <p class="font-semibold text-primary">฿{{ campaign.budget.min.toLocaleString() }} - {{ campaign.budget.max.toLocaleString() }}</p>
                </div>
                <NuxtLink :to="`/campaigns/${campaign.id}`">
                  <UiButton size="sm" variant="outline">View Details</UiButton>
                </NuxtLink>
              </div>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 bg-white">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-4">{{ languageStore.t('testimonials.badge') }}</UiBadge>
          <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">{{ languageStore.t('testimonials.title') }}</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <UiCard v-for="testimonial in testimonials" :key="testimonial.name" class="border-0 shadow-md">
            <UiCardContent class="p-8">
              <div class="flex gap-1 mb-4">
                <Star v-for="i in 5" :key="i" class="h-5 w-5 fill-yellow-400 text-yellow-400" />
              </div>
              <p class="text-gray-700 mb-6 leading-relaxed">"{{ testimonial.quote }}"</p>
              <div class="flex items-center gap-3">
                <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p class="font-semibold text-gray-900">{{ testimonial.name }}</p>
                  <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section ref="ctaRef" class="py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-indigo-700" />
      <div class="cta-content relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">{{ languageStore.t('cta.title') }}</h2>
        <p class="text-white/90 text-lg max-w-2xl mx-auto mb-10">{{ languageStore.t('cta.description') }}</p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/contact">
            <UiButton size="lg" class="bg-white text-primary hover:bg-gray-100 px-8">{{ languageStore.t('cta.button1') }}</UiButton>
          </NuxtLink>
          <NuxtLink to="/about">
            <UiButton size="lg" variant="outline" class="border-white text-white hover:bg-white/20 px-8">{{ languageStore.t('cta.button2') }}</UiButton>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Blog Section (hidden - not ready for client) -->
    <section v-if="false" class="py-20 bg-gray-50">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-4">{{ languageStore.t('mediaInsights.badge') }}</UiBadge>
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">{{ languageStore.t('mediaInsights.title') }}</h2>
          </div>
          <NuxtLink to="/blog">
            <UiButton variant="outline" class="border-[#5A5A5A] text-[#5A5A5A] hover:bg-[#E8E8E8]">{{ languageStore.t('mediaInsights.viewMore') }} <ArrowRight class="ml-2 h-4 w-4" /></UiButton>
          </NuxtLink>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UiCard v-for="post in featuredPosts" :key="post.id" class="group border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div class="relative h-48 overflow-hidden">
              <img :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <UiCardContent class="p-6">
              <div class="flex items-center gap-3 mb-3">
                <UiBadge variant="secondary" class="text-xs">{{ post.category }}</UiBadge>
                <span class="text-xs text-gray-500">{{ post.readTime }} min read</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">{{ post.title }}</h3>
              <p class="text-gray-600 text-sm line-clamp-2">{{ post.excerpt }}</p>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Users, Building2, Wallet, CheckCircle, Star, Search, BarChart3, Shield, FileText, HeadphonesIcon } from 'lucide-vue-next'
import { mockCampaigns, mockBlogPosts } from '~/data/mockData'

const languageStore = useLanguageStore()

const heroRef = ref<HTMLElement>()
const statsRef = ref<HTMLElement>()
const aboutRef = ref<HTMLElement>()
const servicesRef = ref<HTMLElement>()
const campaignsRef = ref<HTMLElement>()
const ctaRef = ref<HTMLElement>()

const featuredCampaigns = mockCampaigns.slice(0, 3)
const featuredPosts = mockBlogPosts.slice(0, 3)

const stats = computed(() => [
  { icon: Users, value: '40+', label: 'Expert Strategists' },
  { icon: Building2, value: '1978', label: 'Since Established' },
  { icon: Wallet, value: '41 Years', label: 'Of Excellence' },
])

const aboutPoints = computed(() => [
  languageStore.t('about.points.point1'),
  languageStore.t('about.points.point2'),
  languageStore.t('about.points.point3'),
])

const services = computed(() => [
  { icon: BarChart3, title: languageStore.t('services.service1'), description: languageStore.t('services.service1Desc') },
  { icon: Search, title: languageStore.t('services.service2'), description: languageStore.t('services.service2Desc') },
  { icon: FileText, title: languageStore.t('services.service3'), description: languageStore.t('services.service3Desc') },
  { icon: Star, title: languageStore.t('services.service4'), description: languageStore.t('services.service4Desc') },
  { icon: HeadphonesIcon, title: languageStore.t('services.service5'), description: languageStore.t('services.service5Desc') },
  { icon: Shield, title: languageStore.t('services.service6'), description: languageStore.t('services.service6Desc') },
])

const testimonials = computed(() => [
  { quote: languageStore.t('testimonials.testimonial1'), name: languageStore.t('testimonials.testimonial1Name'), role: languageStore.t('testimonials.testimonial1Role'), avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
  { quote: languageStore.t('testimonials.testimonial2'), name: languageStore.t('testimonials.testimonial2Name'), role: languageStore.t('testimonials.testimonial2Role'), avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
  { quote: languageStore.t('testimonials.testimonial3'), name: languageStore.t('testimonials.testimonial3Name'), role: languageStore.t('testimonials.testimonial3Role'), avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
])

onMounted(async () => {
  const { default: gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const ctx = gsap.context(() => {
    gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6, delay: 0.2, ease: 'power3.out' })
    gsap.from('.hero-title', { opacity: 0, y: 30, duration: 0.8, delay: 0.4, ease: 'power3.out' })
    gsap.from('.hero-desc', { opacity: 0, y: 20, duration: 0.6, delay: 0.6, ease: 'power3.out' })
    gsap.from('.hero-buttons', { opacity: 0, y: 20, duration: 0.6, delay: 0.8, ease: 'power3.out' })
    gsap.from('.hero-image', { opacity: 0, x: 50, duration: 1, delay: 0.3, ease: 'power3.out' })
    gsap.from('.stat-item', { scrollTrigger: { trigger: statsRef.value, start: 'top 80%' }, opacity: 0, y: 30, duration: 0.6, stagger: 0.15, ease: 'power3.out' })
    gsap.from('.about-content', { scrollTrigger: { trigger: aboutRef.value, start: 'top 70%' }, opacity: 0, x: -50, duration: 0.8, ease: 'power3.out' })
    gsap.from('.about-image', { scrollTrigger: { trigger: aboutRef.value, start: 'top 70%' }, opacity: 0, x: 50, duration: 0.8, delay: 0.2, ease: 'power3.out' })
    gsap.fromTo('.service-card',
      { opacity: 0, y: 40 },
      { scrollTrigger: { trigger: servicesRef.value, start: 'top 85%', once: true }, opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)', clearProps: 'all' }
    )
    gsap.fromTo('.campaign-card',
      { opacity: 0, y: 50 },
      { scrollTrigger: { trigger: campaignsRef.value, start: 'top 85%', once: true }, opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', clearProps: 'all' }
    )
    gsap.from('.cta-content', { scrollTrigger: { trigger: ctaRef.value, start: 'top 70%' }, opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
  })
  onUnmounted(() => ctx.revert())
})
</script>
