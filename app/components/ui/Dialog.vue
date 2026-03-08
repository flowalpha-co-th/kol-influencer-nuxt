<template>
  <DialogRoot :open="open" @update:open="emit('update:open', $event)">
    <slot />
  </DialogRoot>
</template>
<script setup lang="ts">
import { DialogRoot } from 'reka-ui'
const props = defineProps<{ open?: boolean }>()
const emit = defineEmits<{ (e: 'update:open', val: boolean): void }>()
</script>
