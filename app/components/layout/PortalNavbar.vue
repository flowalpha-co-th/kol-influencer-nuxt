<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm'
        : 'bg-white border-b border-gray-100'
    ]"
  >
    <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/portal/dashboard" class="flex items-center gap-2">
          <div class="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-lg">K</span>
          </div>
          <span class="font-bold text-lg text-charcoal hidden sm:block">KOL Portal</span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex items-center gap-1">
          <NuxtLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            :class="[
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              route.path === item.href
                ? 'bg-primary/10 text-primary'
                : 'text-charcoal hover:text-primary',
            ]"
          >
            <component :is="item.icon" class="h-4 w-4" />
            {{ item.label }}
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <CommonLanguageSwitcher />

          <!-- Notifications -->
          <NuxtLink to="/portal/notifications">
            <UiButton variant="ghost" size="icon" class="relative text-charcoal hover:text-primary">
              <Bell class="h-5 w-5" />
              <UiBadge v-if="unreadCount > 0" class="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-white text-xs">
                {{ unreadCount }}
              </UiBadge>
            </UiButton>
          </NuxtLink>

          <!-- Avatar - Desktop -->
          <div class="hidden md:flex items-center gap-3 ml-2">
            <UiAvatar class="h-8 w-8">
              <UiAvatarImage :src="user?.avatar" :alt="user?.firstName" />
              <UiAvatarFallback class="bg-primary/10 text-primary">
                {{ user?.firstName?.[0] }}{{ user?.lastName?.[0] }}
              </UiAvatarFallback>
            </UiAvatar>
            <div class="hidden lg:block">
              <p class="text-sm font-medium text-charcoal">{{ user?.firstName }}</p>
              <p class="text-xs text-gray-500">Influencer</p>
            </div>
          </div>

          <!-- Mobile Menu -->
          <UiSheet v-model:open="isOpen">
            <UiSheetTrigger as-child>
              <UiButton variant="ghost" size="icon" class="lg:hidden text-charcoal">
                <Menu class="h-6 w-6" />
              </UiButton>
            </UiSheetTrigger>
            <UiSheetContent side="right" class="w-[300px] sm:w-[350px]">
              <div class="flex flex-col gap-6 mt-4">
                <div class="flex items-center gap-3 pb-6 border-b">
                  <UiAvatar class="h-12 w-12">
                    <UiAvatarImage :src="user?.avatar" :alt="user?.firstName" />
                    <UiAvatarFallback class="bg-primary/10 text-primary text-lg">
                      {{ user?.firstName?.[0] }}{{ user?.lastName?.[0] }}
                    </UiAvatarFallback>
                  </UiAvatar>
                  <div>
                    <p class="font-medium text-charcoal">{{ user?.firstName }} {{ user?.lastName }}</p>
                    <p class="text-sm text-gray-500">{{ user?.email }}</p>
                  </div>
                </div>
                <nav class="flex flex-col gap-2">
                  <NuxtLink
                    v-for="item in navItems"
                    :key="item.href"
                    :to="item.href"
                    :class="[
                      'flex items-center justify-between p-3 rounded-lg transition-colors',
                      route.path === item.href ? 'bg-primary/10 text-primary' : 'text-charcoal hover:text-primary hover:bg-nimbus/20',
                    ]"
                    @click="isOpen = false"
                  >
                    <div class="flex items-center gap-3">
                      <component :is="item.icon" class="h-5 w-5" />
                      <span class="font-medium">{{ item.label }}</span>
                    </div>
                    <ChevronRight class="h-4 w-4 text-gray-400" />
                  </NuxtLink>
                </nav>
                <div class="border-t pt-4 mt-auto">
                  <UiButton
                    variant="ghost"
                    class="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    @click="handleLogout"
                  >
                    <LogOut class="h-5 w-5 mr-3" />
                    {{ languageStore.t('nav.logout') }}
                  </UiButton>
                </div>
              </div>
            </UiSheetContent>
          </UiSheet>

          <!-- Logout - Desktop -->
          <UiButton
            variant="ghost"
            size="icon"
            class="hidden lg:flex text-charcoal hover:text-red-600"
            @click="handleLogout"
          >
            <LogOut class="h-5 w-5" />
          </UiButton>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Menu, Bell, LayoutDashboard, User, Wallet, Briefcase, CheckSquare, LogOut, ChevronRight } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const languageStore = useLanguageStore()
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const isOpen = ref(false)
const isScrolled = ref(false)
const unreadCount = 3

const navItems = computed(() => [
  { href: '/portal/dashboard', label: languageStore.t('nav.dashboard'), icon: LayoutDashboard },
  { href: '/portal/profile', label: languageStore.t('nav.profile'), icon: User },
  { href: '/portal/campaigns', label: languageStore.t('nav.campaigns'), icon: Briefcase },
  { href: '/portal/tasks', label: languageStore.t('nav.tasks'), icon: CheckSquare },
  { href: '/portal/wallet', label: languageStore.t('nav.wallet'), icon: Wallet },
])

function handleLogout() {
  authStore.logout()
  router.push('/')
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 0
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 0
  })
})
</script>
