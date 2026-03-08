<template>
  <img v-if="src" :src="src" :alt="alt" :class="cn('aspect-square h-full w-full object-cover', $attrs.class as string)" v-bind="omitClass($attrs)" @error="onError" />
</template>
<script setup lang="ts">
import { cn } from '~/utils/utils'
const emit = defineEmits(['error'])
defineProps<{ src?: string; alt?: string }>()
defineOptions({ inheritAttrs: false })
function omitClass(attrs: Record<string, unknown>) { const { class: _, ...rest } = attrs; return rest }
function onError() { emit('error') }
</script>
