<template>
  <TabsContent
    :value="value"
    :class="cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', $attrs.class as string)"
  >
    <slot />
  </TabsContent>
</template>
<script setup lang="ts">
import { TabsContent } from 'reka-ui'
import { cn } from '~/utils/utils'
defineProps<{ value: string }>()
defineOptions({ inheritAttrs: false })
</script>
