<template>
  <div :class="cn('flex flex-col space-y-1.5 p-6', $attrs.class as string)" v-bind="omitClass($attrs)"><slot /></div>
</template>
<script setup lang="ts">
import { cn } from '~/utils/utils'
defineOptions({ inheritAttrs: false })
function omitClass(attrs: Record<string, unknown>) { const { class: _, ...rest } = attrs; return rest }
</script>
