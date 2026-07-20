<script setup lang="ts">
const { tr } = useLocale()

const props = withDefaults(
  defineProps<{
    accept?: string
    multiple?: boolean
    hint?: string
  }>(),
  { accept: '', multiple: true, hint: '' },
)

// v-model:files — array of chosen files, owned by the parent so it can reset per task
const files = defineModel<File[]>('files', { default: () => [] })

const input = ref<HTMLInputElement | null>(null)

function pick() {
  input.value?.click()
}

function onChange(e: Event) {
  const list = (e.target as HTMLInputElement).files
  if (!list) return
  const incoming = Array.from(list)
  files.value = props.multiple ? [...files.value, ...incoming] : incoming.slice(0, 1)
  // allow re-selecting the same file again later
  if (input.value) input.value.value = ''
}

function removeAt(i: number) {
  files.value = files.value.filter((_, idx) => idx !== i)
}

function fmtSize(n: number) {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(0)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}
</script>

<template>
  <div>
    <input
      ref="input"
      type="file"
      class="hidden"
      :accept="accept || undefined"
      :multiple="multiple"
      @change="onChange"
    />
    <button
      type="button"
      class="flex w-full cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#0F2747]/15 p-3 text-left transition hover:border-primary/50"
      @click="pick"
    >
      <Icon name="upload" class="h-5 w-5 shrink-0 text-[#5B6B82]/60" />
      <span class="text-sm text-muted">
        {{ files.length ? tr('เลือกไฟล์เพิ่ม', 'Add more files') : tr('คลิกเพื่อเลือกไฟล์', 'Click to choose a file') }}
        <span v-if="hint" class="text-[#5B6B82]/50"> · {{ hint }}</span>
      </span>
    </button>

    <ul v-if="files.length" class="mt-2 space-y-1.5">
      <li
        v-for="(f, i) in files"
        :key="`${f.name}-${i}`"
        class="flex items-center gap-2.5 rounded-lg border border-[#0F2747]/10 bg-surface px-3 py-2"
      >
        <Icon name="file" class="h-4 w-4 shrink-0 text-primary" />
        <span class="min-w-0 flex-1 truncate text-sm text-ink">{{ f.name }}</span>
        <span class="shrink-0 text-[11px] text-[#5B6B82]/60">{{ fmtSize(f.size) }}</span>
        <button
          type="button"
          :aria-label="tr('ลบไฟล์', 'Remove file')"
          class="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[#5B6B82]/60 transition hover:bg-red-50 hover:text-red-600"
          @click="removeAt(i)"
        >
          <Icon name="x" class="h-4 w-4" />
        </button>
      </li>
    </ul>
  </div>
</template>
