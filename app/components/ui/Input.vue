<template>
  <input
    :class="cn('flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', $attrs.class as string)"
    v-bind="omitClassAndModel($attrs)"
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
<script setup lang="ts">
import { cn } from '~/utils/utils'
defineOptions({ inheritAttrs: false })
const props = defineProps<{ modelValue?: string | number }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
function omitClassAndModel(attrs: Record<string, unknown>) {
  const { class: _, modelValue: __, 'onUpdate:modelValue': ___, ...rest } = attrs
  return rest
}
</script>
