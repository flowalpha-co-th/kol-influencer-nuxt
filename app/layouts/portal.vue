<template>
  <div :class="['min-h-screen bg-gray-50', `theme-${themeStore.current}`]">
    <LayoutPortalNavbar />
    <slot />
    <ThemeSwitcher />
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
</script>
