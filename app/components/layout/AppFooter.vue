<template>
  <footer class="bg-white border-t">
    <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <NuxtLink to="/" class="flex items-center gap-2 mb-6">
            <div class="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span class="text-white font-bold text-xl">P</span>
            </div>
            <span class="font-bold text-xl text-gray-900">Prakit Media</span>
          </NuxtLink>
          <p class="text-gray-600 text-sm mb-6 leading-relaxed">{{ languageStore.t('footer.description') }}</p>
          <div class="flex gap-2.5">
            <!-- Facebook -->
            <a href="#" aria-label="Facebook"
              class="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm transition-all duration-200 hover:border-[#1877F2] hover:shadow-md hover:scale-110 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="transition-opacity duration-200">
                <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <!-- Instagram -->
            <a href="#" aria-label="Instagram"
              class="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm transition-all duration-200 hover:border-[#E1306C] hover:shadow-md hover:scale-110 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" style="stop-color:#F58529"/>
                    <stop offset="50%" style="stop-color:#E1306C"/>
                    <stop offset="100%" style="stop-color:#833AB4"/>
                  </linearGradient>
                </defs>
                <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            <!-- X (Twitter) -->
            <a href="#" aria-label="X (Twitter)"
              class="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm transition-all duration-200 hover:border-gray-900 hover:shadow-md hover:scale-110 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                <path fill="#000000" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <!-- YouTube -->
            <a href="#" aria-label="YouTube"
              class="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm transition-all duration-200 hover:border-[#FF0000] hover:shadow-md hover:scale-110 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <!-- TikTok -->
            <a href="#" aria-label="TikTok"
              class="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm transition-all duration-200 hover:border-gray-900 hover:shadow-md hover:scale-110 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                <path fill="#010101" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-6">{{ languageStore.t('footer.quickLinks') }}</h3>
          <ul class="space-y-3">
            <li v-for="link in quickLinks" :key="link.href">
              <NuxtLink :to="link.href" class="text-gray-600 hover:text-primary transition-colors text-sm">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-6">{{ languageStore.t('footer.services') }}</h3>
          <ul class="space-y-3">
            <li v-for="link in serviceLinks" :key="link.href">
              <NuxtLink :to="link.href" class="text-gray-600 hover:text-primary transition-colors text-sm">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-6">{{ languageStore.t('footer.newsletter') }}</h3>
          <p class="text-gray-600 text-sm mb-4">{{ languageStore.t('footer.newsletterDesc') }}</p>
          <form class="flex gap-2" @submit.prevent="handleSubscribe">
            <UiInput
              v-model="email"
              type="email"
              :placeholder="languageStore.t('common.emailPlaceholder')"
              class="flex-1"
            />
            <UiButton type="submit" size="icon" class="bg-primary hover:bg-primary/90 shrink-0">
              <Send class="h-4 w-4" />
            </UiButton>
          </form>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="py-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-gray-500 text-sm">
          © 2026 {{ languageStore.t('common.companyName') }}. {{ languageStore.t('common.allRightsReserved') }}.
        </p>
        <div class="flex gap-6">
          <NuxtLink to="/privacy" class="text-gray-500 hover:text-primary text-sm transition-colors">
            {{ languageStore.t('common.privacyPolicy') }}
          </NuxtLink>
          <NuxtLink to="/terms" class="text-gray-500 hover:text-primary text-sm transition-colors">
            {{ languageStore.t('common.termsOfService') }}
          </NuxtLink>
          <NuxtLink to="/cookies" class="text-gray-500 hover:text-primary text-sm transition-colors">
            {{ languageStore.t('common.cookiePolicy') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Send } from 'lucide-vue-next'

const languageStore = useLanguageStore()
const email = ref('')

const quickLinks = computed(() => [
  { href: '/', label: languageStore.t('nav.home') },
  { href: '/about', label: languageStore.t('nav.about') },
  { href: '/services', label: languageStore.t('nav.services') },
  { href: '/campaigns', label: languageStore.t('nav.campaigns') },
  { href: '/blog', label: languageStore.t('nav.blog') },
  { href: '/contact', label: languageStore.t('nav.contact') },
])

const serviceLinks = computed(() => [
  { href: '/register', label: languageStore.t('footer.forInfluencers') },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: languageStore.t('footer.support') },
])

function handleSubscribe() {
  console.log('Subscribe:', email.value)
  email.value = ''
}
</script>
