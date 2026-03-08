<template>
  <AccordionRoot v-bind="props" :class="$attrs.class as string">
    <slot />
  </AccordionRoot>
</template>
<script setup lang="ts">
import { AccordionRoot } from 'reka-ui'
const props = defineProps<{ type?: 'single' | 'multiple'; collapsible?: boolean; defaultValue?: string }>()
defineOptions({ inheritAttrs: false })
</script>
