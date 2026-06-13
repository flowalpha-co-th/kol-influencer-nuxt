<script setup lang="ts">
const { tr } = useLocale()

definePageMeta({ layout: 'portal', middleware: 'auth' })
useHead(() => ({ title: tr('กระเป๋าเงิน — Ripples', 'Wallet — Ripples') }))

type PayStatus = 'pending_verify' | 'ready' | 'paid'

interface Pay {
  c: string
  plat: string
  fee: number
  bonus: number
  s: PayStatus
  date: string
  dateEn: string
  slip: boolean
}

const pays: Pay[] = [
  { c: 'Gadget Review - Smartphone', plat: 'YouTube', fee: 20000, bonus: 2000, s: 'paid', date: 'จ่าย 24 มี.ค. 2026', dateEn: 'Paid 24 Mar 2026', slip: true },
  { c: 'Summer Collection 2026', plat: 'Instagram', fee: 15000, bonus: 0, s: 'paid', date: 'จ่าย 10 มี.ค. 2026', dateEn: 'Paid 10 Mar 2026', slip: true },
  { c: 'New Skincare Launch', plat: 'TikTok', fee: 9500, bonus: 0, s: 'ready', date: 'ครบกำหนด 2 เม.ย. 2026', dateEn: 'Due 2 Apr 2026', slip: false },
  { c: 'Nike Running Club', plat: 'Instagram', fee: 16000, bonus: 1500, s: 'ready', date: 'ครบกำหนด 5 เม.ย. 2026', dateEn: 'Due 5 Apr 2026', slip: false },
  { c: 'Fitness Challenge 30 Days', plat: 'Instagram', fee: 12000, bonus: 0, s: 'pending_verify', date: 'ส่งงาน 25 มี.ค. 2026', dateEn: 'Submitted 25 Mar 2026', slip: false },
]

const net = (p: Pay) => p.fee + p.bonus

interface StatusMeta {
  label: string
  labelEn: string
  cls: string
  ring: string
  ic: string
  icon: string
  amt: string
}
const ST: Record<PayStatus, StatusMeta> = {
  pending_verify: { label: 'รอตรวจสอบ', labelEn: 'Pending verify', cls: 'bg-amber-100 text-amber-700', ring: 'border-amber-100 bg-amber-50/30', ic: 'bg-amber-50 text-amber-500', icon: 'clock', amt: 'text-amber-600' },
  ready: { label: 'พร้อมจ่าย', labelEn: 'Ready', cls: 'bg-blue-100 text-blue-700', ring: 'border-primary/10 bg-primary/5', ic: 'bg-primary/10 text-primary', icon: 'badge-check', amt: 'text-primary' },
  paid: { label: 'จ่ายแล้ว', labelEn: 'Paid', cls: 'bg-green-100 text-green-700', ring: 'border-green-100 bg-green-50/30', ic: 'bg-green-50 text-green-500', icon: 'check-circle', amt: 'text-green-600' },
}

const fmt = (n: number) => n.toLocaleString()
const sumBy = (st: PayStatus) => pays.filter(p => p.s === st).reduce((a, p) => a + net(p), 0)

const readyTotal = sumBy('ready')
const paidTotal = sumBy('paid')
const pendingTotal = sumBy('pending_verify')

type Tab = 'all' | PayStatus
const tabDefs: { key: Tab; label: string; labelEn: string }[] = [
  { key: 'all', label: 'ทั้งหมด', labelEn: 'All' },
  { key: 'pending_verify', label: 'รอตรวจสอบ', labelEn: 'Pending verify' },
  { key: 'ready', label: 'พร้อมจ่าย', labelEn: 'Ready' },
  { key: 'paid', label: 'จ่ายแล้ว', labelEn: 'Paid' },
]
const active = ref<Tab>('all')
const tabCount = (key: Tab) => (key === 'all' ? pays.length : pays.filter(p => p.s === key).length)

const filtered = computed(() => pays.filter(p => active.value === 'all' || p.s === active.value))

// slip modal
const slipPay = ref<Pay | null>(null)
const slipRef = ref('')
function openSlip(p: Pay) {
  const i = pays.indexOf(p)
  slipRef.value = 'RPL-2026-' + String(1037 + i * 219).padStart(5, '0')
  slipPay.value = p
}
function closeSlip() {
  slipPay.value = null
}

const slipDate = computed(() =>
  slipPay.value ? tr(slipPay.value.date.replace('จ่าย ', ''), slipPay.value.dateEn.replace('Paid ', '')) : ''
)
</script>

<template>
  <main class="mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-14">
    <section class="mb-8">
      <h1 class="font-heading text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">{{ tr('กระเป๋าเงิน', 'Wallet') }}</h1>
      <p class="mt-1 text-sm text-muted">{{ tr('รายได้จากแต่ละแคมเปญ — ค่างาน + โบนัส, สถานะการจ่าย และหลักฐานโอน', 'Earnings by campaign — fee + bonus, payment status, and transfer slips') }}</p>
    </section>

    <!-- balance cards -->
    <section class="mb-8 grid gap-5 sm:grid-cols-3">
      <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primaryDark p-6 text-white shadow-[0_20px_50px_-25px_rgb(45_91_255_/_60%)]">
        <div class="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div class="relative flex items-center justify-between">
          <div>
            <p class="text-sm text-white/80">{{ tr('พร้อมถอน (Ready)', 'Ready to withdraw') }}</p>
            <p class="mt-1 font-heading text-4xl font-extrabold">฿{{ fmt(readyTotal) }}</p>
          </div>
          <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20"><Icon name="wallet" class="h-7 w-7" /></div>
        </div>
      </div>
      <div class="rounded-xl border border-[#0F2747]/10 bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted">{{ tr('จ่ายแล้วทั้งหมด (Paid)', 'Total paid') }}</p>
            <p class="mt-1 font-heading text-2xl font-extrabold text-ink">฿{{ fmt(paidTotal) }}</p>
          </div>
          <div class="flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10"><Icon name="trending-up" class="h-7 w-7 text-primary" /></div>
        </div>
      </div>
      <div class="rounded-xl border border-[#0F2747]/10 bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-muted">{{ tr('รอตรวจสอบ (Pending verify)', 'Pending verify') }}</p>
            <p class="mt-1 font-heading text-2xl font-extrabold text-amber-600">฿{{ fmt(pendingTotal) }}</p>
          </div>
          <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-50"><Icon name="clock" class="h-7 w-7 text-amber-500" /></div>
        </div>
      </div>
    </section>

    <!-- history -->
    <section class="rounded-xl border border-[#0F2747]/10 bg-white p-6 shadow-sm">
      <h2 class="font-heading text-lg font-bold text-ink">{{ tr('รายการรับเงินรายแคมเปญ', 'Payouts by campaign') }}</h2>
      <div class="mt-5 flex flex-wrap gap-2">
        <button
          v-for="d in tabDefs"
          :key="d.key"
          type="button"
          :class="['rounded-lg px-4 py-2 text-sm font-bold transition', active === d.key ? 'bg-primary text-white' : 'border border-[#0F2747]/10 bg-surface text-muted hover:text-primary']"
          @click="active = d.key"
        >
          {{ tr(d.label, d.labelEn) }} ({{ tabCount(d.key) }})
        </button>
      </div>
      <div class="mt-5 space-y-3">
        <div
          v-for="(p, i) in filtered"
          :key="p.c + i"
          :class="['flex items-center justify-between rounded-xl border p-4', ST[p.s].ring]"
        >
          <div class="flex items-center gap-4">
            <div :class="['flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', ST[p.s].ic]">
              <Icon :name="ST[p.s].icon" class="h-5 w-5" />
            </div>
            <div>
              <p class="text-sm font-semibold text-ink">{{ p.c }}</p>
              <p class="text-xs text-muted">{{ p.plat }}</p>
              <div class="mt-0.5 flex flex-col">
                <span class="text-[11px] text-muted">
                  <template v-if="p.bonus">{{ tr('ค่างาน', 'Fee') }} ฿{{ fmt(p.fee) }} + {{ tr('โบนัส', 'Bonus') }} ฿{{ fmt(p.bonus) }}</template>
                  <template v-else>{{ tr('ค่างาน', 'Fee') }} ฿{{ fmt(p.fee) }}</template>
                </span>
                <span class="text-[11px] text-[#5B6B82]/60">{{ tr(p.date, p.dateEn) }}</span>
                <button
                  v-if="p.slip"
                  type="button"
                  class="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
                  @click="openSlip(p)"
                >
                  <Icon name="receipt" class="h-3.5 w-3.5" /> {{ tr('ดูสลิปโอนเงิน', 'View transfer slip') }}
                </button>
              </div>
            </div>
          </div>
          <div class="text-right">
            <p class="text-[10px] uppercase tracking-widest text-[#5B6B82]/50">Net</p>
            <p :class="['text-lg font-bold', ST[p.s].amt]">฿{{ fmt(net(p)) }}</p>
            <span :class="['rounded-full px-2.5 py-0.5 text-xs font-bold', ST[p.s].cls]">{{ tr(ST[p.s].label, ST[p.s].labelEn) }}</span>
          </div>
        </div>
      </div>
      <p v-if="filtered.length === 0" class="py-8 text-center text-sm text-muted">{{ tr('ไม่มีรายการในหมวดนี้', 'No items in this category') }}</p>
    </section>

    <!-- slip modal -->
    <div
      v-if="slipPay"
      class="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      @click.self="closeSlip"
    >
      <div class="w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div class="relative bg-gradient-to-br from-primary to-primaryDark p-7 text-center text-white">
          <button type="button" class="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10" @click="closeSlip">
            <Icon name="x" class="h-5 w-5" />
          </button>
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15"><Icon name="check" class="h-8 w-8" /></div>
          <p class="mt-3 text-sm text-white/80">{{ tr('โอนเงินสำเร็จ', 'Transfer successful') }}</p>
          <p class="mt-1 font-heading text-4xl font-extrabold">฿{{ fmt(net(slipPay)) }}</p>
        </div>
        <div class="space-y-3 p-6 text-sm">
          <div class="flex items-start justify-between gap-4"><span class="shrink-0 text-muted">{{ tr('จาก', 'From') }}</span><span class="text-right font-semibold text-ink">{{ tr('Ripples (ประกิต โฮลดิ้งฯ)', 'Ripples (Prakit Holdings)') }}</span></div>
          <div class="flex items-start justify-between gap-4"><span class="shrink-0 text-muted">{{ tr('เข้าบัญชี', 'To account') }}</span><span class="text-right font-semibold text-ink">{{ tr('สมใจ ใจดี', 'Somjai Jaidee') }}</span></div>
          <div class="flex items-start justify-between gap-4"><span class="shrink-0 text-muted">{{ tr('ธนาคาร', 'Bank') }}</span><span class="text-right font-semibold text-ink">{{ tr('กสิกรไทย', 'KBANK') }} · xxx-x-x789-0</span></div>
          <div class="flex items-start justify-between gap-4"><span class="shrink-0 text-muted">{{ tr('แคมเปญ', 'Campaign') }}</span><span class="text-right font-semibold text-ink">{{ slipPay.c }}</span></div>
          <div class="flex items-start justify-between gap-4"><span class="shrink-0 text-muted">{{ tr('รายละเอียด', 'Details') }}</span><span class="text-right font-semibold text-ink">{{ tr('ค่างาน', 'Fee') }} ฿{{ fmt(slipPay.fee) }}<template v-if="slipPay.bonus"> + {{ tr('โบนัส', 'Bonus') }} ฿{{ fmt(slipPay.bonus) }}</template></span></div>
          <div class="flex items-start justify-between gap-4"><span class="shrink-0 text-muted">{{ tr('วันที่', 'Date') }}</span><span class="text-right font-semibold text-ink">{{ slipDate }} · {{ tr('14:32 น.', '14:32') }}</span></div>
          <div class="flex items-start justify-between gap-4"><span class="shrink-0 text-muted">{{ tr('เลขอ้างอิง', 'Reference') }}</span><span class="text-right font-semibold text-ink">{{ slipRef }}</span></div>
        </div>
        <div class="border-t border-dashed border-[#0F2747]/15 p-4 text-center">
          <p class="text-[11px] text-[#5B6B82]/60">{{ tr('สลิปนี้ออกโดยระบบ Ripples — ใช้เป็นหลักฐานการโอน', 'This slip is issued by Ripples — valid as proof of transfer') }}</p>
        </div>
      </div>
    </div>
  </main>
</template>
