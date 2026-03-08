<template>
  <TabsRoot v-bind="props" class="">
    <slot />
  </TabsRoot>
</template>
<script setup lang="ts">
import { TabsRoot } from 'reka-ui'
const props = defineProps<{ defaultValue?: string; modelValue?: string }>()
</script>
