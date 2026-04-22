<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
    <!-- Panel -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div
        v-if="open"
        class="bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 min-w-[240px] origin-bottom-right"
      >
        <div class="flex items-center justify-between px-2 mb-2">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Preview Theme</p>
          <button
            @click="open = false"
            class="text-gray-400 hover:text-gray-600 transition"
            aria-label="Close"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
        <div class="flex flex-col gap-1">
          <button
            v-for="opt in options"
            :key="opt.value"
            @click="select(opt.value)"
            :class="[
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition',
              themeStore.current === opt.value
                ? 'bg-gray-900 text-white'
                : 'hover:bg-gray-50 text-gray-800',
            ]"
          >
            <span
              class="w-9 h-9 rounded-full border-2 border-white shadow shrink-0"
              :style="{ background: opt.swatch }"
            />
            <div class="flex-1">
              <div class="text-sm font-medium">{{ opt.label }}</div>
              <div
                :class="[
                  'text-xs',
                  themeStore.current === opt.value ? 'text-gray-300' : 'text-gray-500',
                ]"
              >
                {{ opt.hint }}
              </div>
            </div>
            <Check v-if="themeStore.current === opt.value" class="w-4 h-4 shrink-0" />
          </button>
        </div>
        <p class="text-[10px] text-gray-400 mt-2 px-2">เลือก theme เพื่อ preview · apply ทุกหน้า</p>
      </div>
    </Transition>

    <!-- FAB -->
    <button
      @click="open = !open"
      class="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 active:scale-95 transition"
      :style="{ background: currentSwatch }"
      aria-label="Switch theme"
    >
      <Palette class="w-6 h-6" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Palette, Check, X } from 'lucide-vue-next'

const themeStore = useThemeStore()
const open = ref(false)

interface Option {
  value: 'corporate' | 'neon' | 'premium'
  label: string
  hint: string
  swatch: string
}

const options: Option[] = [
  {
    value: 'corporate',
    label: 'Corporate',
    hint: 'มืออาชีพ เรียบร้อย',
    swatch: 'linear-gradient(135deg, #1E53B8 0%, #6366F1 100%)',
  },
  {
    value: 'neon',
    label: 'Neon Spotlight',
    hint: 'อลังการ KOL Gen-Z',
    swatch: 'linear-gradient(135deg, #FF0099 0%, #9333EA 50%, #00E5FF 100%)',
  },
  {
    value: 'premium',
    label: 'Purple Premium',
    hint: 'หรู กึ่งกลาง',
    swatch: 'linear-gradient(135deg, #6B2FB8 0%, #FFB800 100%)',
  },
]

const currentSwatch = computed(
  () => options.find(o => o.value === themeStore.current)?.swatch ?? options[0].swatch,
)

function select(v: Option['value']) {
  themeStore.set(v)
}

onMounted(() => themeStore.init())
</script>
