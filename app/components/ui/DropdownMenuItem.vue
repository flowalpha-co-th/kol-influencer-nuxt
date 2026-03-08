<template>
  <DropdownMenuItem
    :class="cn('relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0', $attrs.class as string)"
    v-bind="omitClass($attrs)"
    @select="emit('click')"
  >
    <slot />
  </DropdownMenuItem>
</template>
<script setup lang="ts">
import { DropdownMenuItem } from 'reka-ui'
import { cn } from '~/utils/utils'
const emit = defineEmits(['click'])
defineOptions({ inheritAttrs: false })
function omitClass(attrs: Record<string, unknown>) { const { class: _, ...rest } = attrs; return rest }
</script>
