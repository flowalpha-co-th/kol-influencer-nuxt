<template>
  <TabsList :class="cn('inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground', $attrs.class as string)">
    <slot />
  </TabsList>
</template>
<script setup lang="ts">
import { TabsList } from 'reka-ui'
import { cn } from '~/utils/utils'
defineOptions({ inheritAttrs: false })
</script>
