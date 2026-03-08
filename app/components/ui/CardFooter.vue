<template>
  <div :class="cn('flex items-center p-6 pt-0', $attrs.class as string)" v-bind="omitClass($attrs)"><slot /></div>
</template>
<script setup lang="ts">
import { cn } from '~/utils/utils'
defineOptions({ inheritAttrs: false })
function omitClass(attrs: Record<string, unknown>) { const { class: _, ...rest } = attrs; return rest }
</script>
