<template>
  <h3 :class="cn('font-semibold leading-none tracking-tight', $attrs.class as string)" v-bind="omitClass($attrs)"><slot /></h3>
</template>
<script setup lang="ts">
import { cn } from '~/utils/utils'
defineOptions({ inheritAttrs: false })
function omitClass(attrs: Record<string, unknown>) { const { class: _, ...rest } = attrs; return rest }
</script>
