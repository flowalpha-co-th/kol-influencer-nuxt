<template>
  <DialogTitle :class="cn('text-lg font-semibold leading-none tracking-tight', $attrs.class as string)"><slot /></DialogTitle>
</template>
<script setup lang="ts">
import { DialogTitle } from 'reka-ui'
import { cn } from '~/utils/utils'
defineOptions({ inheritAttrs: false })
</script>
