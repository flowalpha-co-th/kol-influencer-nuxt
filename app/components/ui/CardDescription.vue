<template>
  <p :class="cn('text-sm text-muted-foreground', $attrs.class as string)" v-bind="omitClass($attrs)"><slot /></p>
</template>
<script setup lang="ts">
import { cn } from '~/utils/utils'
defineOptions({ inheritAttrs: false })
function omitClass(attrs: Record<string, unknown>) { const { class: _, ...rest } = attrs; return rest }
</script>
