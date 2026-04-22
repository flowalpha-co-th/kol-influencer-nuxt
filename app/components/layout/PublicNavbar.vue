<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent',
    ]"
  >
    <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <img src="/logo.svg" alt="Prakast" class="h-10 w-auto" />
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            :class="[
              'relative text-sm font-medium transition-colors',
              route.path === link.href ? 'text-primary' : 'hover:text-primary',
            ]"
            :style="!route.path.startsWith(link.href) && route.path !== link.href ? { color: '#5A5A5A' } : {}"
          >
            {{ link.label }}
            <span v-if="route.path === link.href" class="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="hidden lg:flex items-center gap-4">
          <CommonLanguageSwitcher />
          <template v-if="isAuthenticated">
            <NuxtLink to="/portal/dashboard">
              <UiButton variant="ghost" size="sm" class="gap-2">
                <User class="h-4 w-4" />
                <span>{{ user?.firstName }}</span>
              </UiButton>
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/login">
              <UiButton variant="ghost" size="sm">{{ languageStore.t('nav.login') }}</UiButton>
            </NuxtLink>
            <NuxtLink to="/register">
              <UiButton size="sm" class="bg-primary hover:bg-primary/90">{{ languageStore.t('nav.joinInfluencer') }}</UiButton>
            </NuxtLink>
          </template>
        </div>

        <!-- Mobile Menu -->
        <UiSheet v-model:open="isOpen">
          <UiSheetTrigger as-child>
            <UiButton variant="ghost" size="icon" class="lg:hidden">
              <Menu class="h-6 w-6" />
            </UiButton>
          </UiSheetTrigger>
          <UiSheetContent side="right" class="w-[300px] sm:w-[400px]">
            <div class="flex flex-col gap-6 mt-8">
              <div class="flex items-center justify-between">
                <span class="font-bold text-lg">Menu</span>
                <CommonLanguageSwitcher />
              </div>
              <nav class="flex flex-col gap-4">
                <NuxtLink
                  v-for="link in navLinks"
                  :key="link.href"
                  :to="link.href"
                  :class="[
                    'text-lg font-medium transition-colors',
                    route.path === link.href ? 'text-primary' : 'hover:text-primary',
                  ]"
                  :style="!route.path.startsWith(link.href) && route.path !== link.href ? { color: '#5A5A5A' } : {}"
                  @click="isOpen = false"
                >
                  {{ link.label }}
                </NuxtLink>
              </nav>
              <div class="border-t pt-6">
                <template v-if="isAuthenticated">
                  <NuxtLink to="/portal/dashboard" @click="isOpen = false">
                    <UiButton class="w-full bg-primary hover:bg-primary/90">
                      <User class="h-4 w-4 mr-2" />
                      {{ languageStore.t('nav.dashboard') }}
                    </UiButton>
                  </NuxtLink>
                </template>
                <template v-else>
                  <div class="flex flex-col gap-3">
                    <NuxtLink to="/login" @click="isOpen = false">
                      <UiButton variant="outline" class="w-full border-[#5A5A5A] text-[#5A5A5A] hover:bg-[#E8E8E8]">{{ languageStore.t('nav.login') }}</UiButton>
                    </NuxtLink>
                    <NuxtLink to="/register" @click="isOpen = false">
                      <UiButton class="w-full bg-primary hover:bg-primary/90">{{ languageStore.t('nav.joinInfluencer') }}</UiButton>
                    </NuxtLink>
                  </div>
                </template>
              </div>
            </div>
          </UiSheetContent>
        </UiSheet>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Menu, User } from 'lucide-vue-next'

const route = useRoute()
const languageStore = useLanguageStore()
const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)

const isScrolled = ref(false)
const isOpen = ref(false)

const navLinks = computed(() => [
  { href: '/', label: languageStore.t('nav.home') },
  { href: '/about', label: languageStore.t('nav.about') },
  { href: '/services', label: languageStore.t('nav.services') },
  { href: '/campaigns', label: languageStore.t('nav.campaigns') },
  // { href: '/blog', label: languageStore.t('nav.blog') }, // hidden - not ready for client
  { href: '/contact', label: languageStore.t('nav.contact') },
])

onMounted(() => {
  const handleScroll = () => { isScrolled.value = window.scrollY > 50 }
  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>
