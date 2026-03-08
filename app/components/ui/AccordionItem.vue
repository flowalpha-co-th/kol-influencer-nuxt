<template>
  <AccordionItem :value="value" :class="cn('border-b', $attrs.class as string)">
    <slot />
  </AccordionItem>
</template>
<script setup lang="ts">
import { AccordionItem } from 'reka-ui'
import { cn } from '~/utils/utils'
defineProps<{ value: string }>()
defineOptions({ inheritAttrs: false })
</script>
