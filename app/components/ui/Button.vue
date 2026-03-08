<template>
  <component
    :is="as || 'button'"
    :class="cn(buttonVariants({ variant, size }), $attrs.class as string)"
    v-bind="omitClass($attrs)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cn } from '~/utils/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-gradient-to-r from-[#0052CC] to-[#1B47A3] text-white shadow-md hover:shadow-lg hover:from-[#0052CC] hover:to-[#0052CC] active:scale-95',
        destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline: 'border-2 bg-transparent transition-colors',
        secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'text-[#5A5A5A] hover:bg-[#E8E8E8] hover:text-[#1B47A3]',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 rounded-full px-4 text-xs',
        lg: 'h-11 rounded-full px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ButtonVariants = VariantProps<typeof buttonVariants>

interface Props {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  as?: string
}

defineProps<Props>()
defineOptions({ inheritAttrs: false })

function omitClass(attrs: Record<string, unknown>) {
  const { class: _, ...rest } = attrs
  return rest
}
</script>
