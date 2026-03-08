<template>
  <div
    :class="cn(
      'shrink-0 bg-border',
      orientation === 'vertical' ? 'h-full w-[1px]' : 'h-[1px] w-full',
      $attrs.class as string
    )"
    v-bind="omitClass($attrs)"
  />
</template>
<script setup lang="ts">
import { cn } from '~/utils/utils'
defineProps<{ orientation?: 'horizontal' | 'vertical' }>()
defineOptions({ inheritAttrs: false })
function omitClass(attrs: Record<string, unknown>) { const { class: _, ...rest } = attrs; return rest }
</script>
