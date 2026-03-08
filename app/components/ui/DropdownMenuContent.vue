<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      :align="align"
      :side-offset="sideOffset ?? 4"
      :class="cn('z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', $attrs.class as string)"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
<script setup lang="ts">
import { DropdownMenuPortal, DropdownMenuContent } from 'reka-ui'
import { cn } from '~/utils/utils'
defineProps<{ align?: 'start' | 'center' | 'end'; sideOffset?: number }>()
defineOptions({ inheritAttrs: false })
</script>
