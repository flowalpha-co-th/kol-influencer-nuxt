<template>
  <div :class="['min-h-screen flex flex-col bg-white', `theme-${themeStore.current}`]">
    <LayoutPublicNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutAppFooter />
    <CommonCookieConsent />
    <ThemeSwitcher />
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
</script>
