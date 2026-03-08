<template>
  <label :class="cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', $attrs.class as string)" v-bind="omitClass($attrs)"><slot /></label>
</template>
<script setup lang="ts">
import { cn } from '~/utils/utils'
defineOptions({ inheritAttrs: false })
function omitClass(attrs: Record<string, unknown>) { const { class: _, ...rest } = attrs; return rest }
</script>
