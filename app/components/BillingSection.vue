<script setup lang="ts">
const { tr } = useLocale()

const props = defineProps<{ price: number; campaignName: string }>()

// settled = KOL ได้แนบใบแจ้งหนี้ หรือกดยินยอมแล้ว
const settled = defineModel<boolean>('settled', { default: false })

// 'invoice' = แนบใบแจ้งหนี้เอง · 'consent' = ไม่มีใบแจ้งหนี้ → ยินยอมให้ตั้งเบิกแทน
const mode = ref<'invoice' | 'consent' | null>(null)
const invoiceFiles = ref<File[]>([])
const consentGiven = ref(false)
const consentOpen = ref(false)

watchEffect(() => {
  settled.value =
    (mode.value === 'invoice' && invoiceFiles.value.length > 0) ||
    (mode.value === 'consent' && consentGiven.value)
})

function selectInvoice() {
  mode.value = 'invoice'
}
function openConsent() {
  consentOpen.value = true
}
function agreeConsent() {
  mode.value = 'consent'
  consentGiven.value = true
  consentOpen.value = false
}
function fmtPrice(n: number) {
  return n.toLocaleString()
}
</script>

<template>
  <div>
    <div class="grid gap-2 sm:grid-cols-2">
      <button
        type="button"
        class="flex items-center gap-2.5 rounded-xl border p-3 text-left text-sm font-semibold transition"
        :class="mode === 'invoice' ? 'border-primary bg-primary/[0.06] text-primary' : 'border-[#0F2747]/15 bg-white text-ink hover:border-primary/40'"
        @click="selectInvoice"
      >
        <Icon name="file-text" class="h-5 w-5 shrink-0" />
        <span>{{ tr('มีใบแจ้งหนี้', 'I have an invoice') }}</span>
        <Icon v-if="mode === 'invoice'" name="check" class="ml-auto h-4 w-4 shrink-0" />
      </button>
      <button
        type="button"
        class="flex items-center gap-2.5 rounded-xl border p-3 text-left text-sm font-semibold transition"
        :class="mode === 'consent' && consentGiven ? 'border-primary bg-primary/[0.06] text-primary' : 'border-[#0F2747]/15 bg-white text-ink hover:border-primary/40'"
        @click="openConsent"
      >
        <Icon name="file-check" class="h-5 w-5 shrink-0" />
        <span>{{ tr('ไม่มีใบแจ้งหนี้', 'No invoice') }}</span>
        <Icon v-if="mode === 'consent' && consentGiven" name="check" class="ml-auto h-4 w-4 shrink-0" />
      </button>
    </div>

    <!-- invoice upload -->
    <div v-if="mode === 'invoice'" class="mt-3">
      <label class="mb-1 block text-xs font-semibold text-ink">{{ tr('ไฟล์ใบแจ้งหนี้', 'Invoice file') }}</label>
      <FileDropzone v-model:files="invoiceFiles" :hint="tr('PDF, รูป, ไฟล์อื่นๆ', 'PDF, images, any file')" />
    </div>

    <!-- consent confirmed -->
    <div v-else-if="mode === 'consent' && consentGiven" class="mt-3 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5 text-xs text-green-700">
      <Icon name="check-circle" class="mt-0.5 h-4 w-4 shrink-0" />
      <span>{{ tr('ยินยอมให้ตั้งเบิกเรียบร้อยแล้ว', 'Consent to file the billing has been recorded.') }} · ฿{{ fmtPrice(price) }}</span>
    </div>

    <!-- consent popup -->
    <Teleport to="body">
      <div
        v-if="consentOpen"
        class="fixed inset-0 z-[70] flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm"
        @click.self="consentOpen = false"
      >
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex items-start gap-3">
            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon name="file-check" class="h-6 w-6" />
            </span>
            <div>
              <h3 class="font-heading text-lg font-bold text-ink">{{ tr('เอกสารยินยอมรับทราบ', 'Consent & acknowledgement') }}</h3>
              <p class="text-xs text-muted">{{ tr('สำหรับกรณีไม่มีใบแจ้งหนี้', 'For creators without an invoice') }}</p>
            </div>
          </div>

          <div class="mt-4 rounded-xl border border-[#0F2747]/10 bg-surface p-4 text-sm leading-relaxed text-ink/80">
            {{ tr(
              `ข้าพเจ้ายินยอมและรับทราบให้ทาง Ripples นำข้อมูลของข้าพเจ้าในระบบไปใช้ในการตั้งเบิกค่าใช้จ่าย และยินยอมรับค่าตอบแทนสำหรับงาน “${campaignName}” เป็นจำนวนเงิน ฿${fmtPrice(price)} ตามที่ได้ตกลงกันไว้`,
              `I consent and acknowledge that Ripples may use my information in the system to file for reimbursement, and I agree to receive the compensation for “${campaignName}” in the amount of ฿${fmtPrice(price)} as agreed.`,
            ) }}
          </div>

          <div class="mt-4 flex items-center justify-between rounded-xl bg-primary/[0.06] px-4 py-3">
            <span class="text-sm text-muted">{{ tr('ยอดค่าตอบแทนงานนี้', 'Compensation for this task') }}</span>
            <span class="font-heading text-xl font-extrabold text-primary">฿{{ fmtPrice(price) }}</span>
          </div>

          <div class="mt-5 flex gap-3">
            <button
              type="button"
              class="flex-1 rounded-lg border border-[#0F2747]/15 bg-white px-4 py-3 text-sm font-bold text-muted transition hover:bg-surface"
              @click="consentOpen = false"
            >
              {{ tr('ยกเลิก', 'Cancel') }}
            </button>
            <button
              type="button"
              class="flex-1 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primaryDark"
              @click="agreeConsent"
            >
              {{ tr('ยินยอม', 'I consent') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
