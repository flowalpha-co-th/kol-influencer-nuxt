<template>
  <AccordionContent :class="cn('overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down', $attrs.class as string)">
    <div class="pb-4 pt-0"><slot /></div>
  </AccordionContent>
</template>
<script setup lang="ts">
import { AccordionContent } from 'reka-ui'
import { cn } from '~/utils/utils'
defineOptions({ inheritAttrs: false })
</script>
