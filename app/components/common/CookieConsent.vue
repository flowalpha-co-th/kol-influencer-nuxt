<script setup lang="ts">
const { visible, forceSettings, store, initBanner, close } = useCookieConsent()
const { tr } = useLocale()

const showSettings = ref(false)

const cats = [
  { key: 'necessary', label: 'จำเป็นต่อการใช้งาน', labelEn: 'Strictly necessary', desc: 'ทำให้เว็บทำงานได้ เช่น การเข้าสู่ระบบและความปลอดภัย — เปิดตลอด', descEn: 'Required for the site to work — e.g. sign-in and security. Always on.', locked: true },
  { key: 'functional', label: 'การใช้งาน (Functional)', labelEn: 'Functional', desc: 'จดจำการตั้งค่า เช่น ภาษาและตัวเลือกที่คุณเลือกไว้', descEn: 'Remember your settings, such as language and your saved choices.', locked: false },
  { key: 'analytics', label: 'การวิเคราะห์ (Analytics)', labelEn: 'Analytics', desc: 'ช่วยให้เราเข้าใจการใช้งานเพื่อปรับปรุงเว็บ', descEn: 'Help us understand usage so we can improve the site.', locked: false },
  { key: 'marketing', label: 'การตลาด (Marketing)', labelEn: 'Marketing', desc: 'ใช้แนะนำแคมเปญ/เนื้อหาที่ตรงกับคุณมากขึ้น', descEn: 'Used to recommend campaigns and content that match you better.', locked: false },
] as const

const choice = reactive<Record<string, boolean>>({
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
})

onMounted(() => initBanner())

watch(forceSettings, (v) => {
  if (v) showSettings.value = true
})

function acceptAll() {
  store({ necessary: true, functional: true, analytics: true, marketing: true })
  close()
}
function necessaryOnly() {
  store({ necessary: true, functional: false, analytics: false, marketing: false })
  close()
}
function save() {
  store({ necessary: true, functional: !!choice.functional, analytics: !!choice.analytics, marketing: !!choice.marketing })
  close()
}
function toggle(key: string) {
  choice[key] = !choice[key]
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-x-0 bottom-0 z-[85] flex justify-center p-4 sm:bottom-5 sm:left-auto sm:right-5 sm:p-0"
    >
      <div class="w-full max-w-md overflow-hidden rounded-2xl border border-[#0F2747]/10 bg-white shadow-[0_30px_70px_-25px_rgba(15,39,71,.45)]">
        <!-- banner -->
        <div v-if="!showSettings" class="p-5">
          <div class="flex items-start gap-3">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon name="cookie" class="h-6 w-6" />
            </div>
            <div>
              <p class="font-heading text-base font-extrabold text-ink">{{ tr('เราใช้คุกกี้', 'We use cookies') }}</p>
              <p class="mt-1 text-sm leading-relaxed text-muted">
                {{ tr('เพื่อให้เว็บทำงานได้ดี วิเคราะห์การใช้งาน และแนะนำแคมเปญที่ตรงกับคุณ — อ่าน', 'To keep the site working well, analyze usage, and recommend campaigns that match you — read our ') }}<NuxtLink to="/cookies" class="font-bold text-primary hover:underline">{{ tr('นโยบายคุกกี้', 'Cookie Policy') }}</NuxtLink>
              </p>
            </div>
          </div>
          <div class="mt-4 flex flex-col gap-2 sm:flex-row-reverse">
            <button type="button" class="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primaryDark" @click="acceptAll">{{ tr('ยอมรับทั้งหมด', 'Accept all') }}</button>
            <button type="button" class="flex-1 rounded-lg border border-[#0F2747]/15 bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-surface" @click="necessaryOnly">{{ tr('เฉพาะที่จำเป็น', 'Necessary only') }}</button>
          </div>
          <button type="button" class="mt-2 w-full rounded-lg py-2 text-center text-xs font-bold text-muted transition hover:text-primary" @click="showSettings = true">{{ tr('ตั้งค่าคุกกี้', 'Cookie settings') }}</button>
        </div>

        <!-- settings -->
        <div v-else class="p-5">
          <div class="flex items-center justify-between">
            <p class="font-heading text-base font-extrabold text-ink">{{ tr('ตั้งค่าคุกกี้', 'Cookie settings') }}</p>
            <button type="button" class="text-[#5B6B82]/60 transition hover:text-ink" @click="close">
              <Icon name="x" class="h-5 w-5" />
            </button>
          </div>
          <div class="mt-4 max-h-[46vh] space-y-2.5 overflow-y-auto">
            <div v-for="c in cats" :key="c.key" class="flex items-start justify-between gap-3 rounded-xl border border-[#0F2747]/10 p-3.5">
              <div>
                <p class="text-sm font-bold text-ink">
                  {{ tr(c.label, c.labelEn) }}
                  <span v-if="c.locked" class="ml-1 rounded bg-surface px-1.5 py-0.5 text-[10px] font-bold text-muted">{{ tr('จำเป็น', 'Required') }}</span>
                </p>
                <p class="mt-0.5 text-xs leading-relaxed text-muted">{{ tr(c.desc, c.descEn) }}</p>
              </div>
              <button
                type="button"
                :disabled="c.locked"
                :class="[
                  'relative h-6 w-11 shrink-0 rounded-full transition',
                  (c.locked || choice[c.key]) ? 'bg-primary' : 'bg-[#0F2747]/15',
                  c.locked ? 'cursor-not-allowed opacity-60' : '',
                ]"
                @click="!c.locked && toggle(c.key)"
              >
                <span :class="['absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all', (c.locked || choice[c.key]) ? 'left-6' : 'left-1']" />
              </button>
            </div>
          </div>
          <div class="mt-4 flex flex-col gap-2 sm:flex-row-reverse">
            <button type="button" class="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white transition hover:bg-primaryDark" @click="save">{{ tr('บันทึกตัวเลือก', 'Save choices') }}</button>
            <button type="button" class="flex-1 rounded-lg border border-[#0F2747]/15 bg-white px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-surface" @click="acceptAll">{{ tr('ยอมรับทั้งหมด', 'Accept all') }}</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
