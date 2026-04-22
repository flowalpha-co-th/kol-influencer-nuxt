<template>
  <div :class="['min-h-screen', `theme-${themeStore.current}`]">
    <slot />
    <ThemeSwitcher />
  </div>
</template>

<script setup lang="ts">
const themeStore = useThemeStore()
</script>
