<script setup lang="ts">
definePageMeta({ layout: 'portal', middleware: 'auth' })
const { tr } = useLocale()
useHead(() => ({ title: tr('งานของฉัน — Ripples', 'My Tasks — Ripples') }))

type Bucket = 'action' | 'review' | 'live' | 'done' | 'rejected'
type Phase = 'brief' | 'storyline' | 'draft' | 'live'
type Action =
  | 'storyline'
  | 'storyline_revise'
  | 'first_draft'
  | 'second_draft'
  | 'final_draft'
  | 'post_link'
  | 'capture'

type Stage = { k: string; ph: Phase; label: string; labelEn: string; bucket: Bucket; act?: Action }

// ── 14-stage content workflow ──
// bucket: action = KOL ต้องทำ · review = รอแอดมิน/แบรนด์ · live = เผยแพร่/เก็บผล · done = เสร็จ
// act:    ประเภท action ที่ KOL ต้องทำ (ถ้า bucket=action)
const STAGES: Stage[] = [
  { k: 'brief_sent', ph: 'brief', label: 'รับบรีฟแล้ว', labelEn: 'Brief received', bucket: 'action', act: 'storyline' },
  { k: 'storyline_sent', ph: 'storyline', label: 'ส่ง Storyline แล้ว', labelEn: 'Storyline submitted', bucket: 'review' },
  { k: 'storyline_feedback', ph: 'storyline', label: 'ได้รับ Feedback', labelEn: 'Feedback received', bucket: 'action', act: 'storyline_revise' },
  { k: 'storyline_revising', ph: 'storyline', label: 'กำลังแก้ Storyline', labelEn: 'Revising storyline', bucket: 'action', act: 'storyline_revise' },
  { k: 'storyline_approved', ph: 'storyline', label: 'Storyline อนุมัติ', labelEn: 'Storyline approved', bucket: 'action', act: 'first_draft' },
  { k: 'first_draft_sent', ph: 'draft', label: 'ส่ง First Draft แล้ว', labelEn: 'First draft submitted', bucket: 'review' },
  { k: 'first_draft_feedback', ph: 'draft', label: 'Feedback First Draft', labelEn: 'First draft feedback', bucket: 'action', act: 'second_draft' },
  { k: 'second_draft_sent', ph: 'draft', label: 'ส่ง Second Draft แล้ว', labelEn: 'Second draft submitted', bucket: 'review' },
  { k: 'second_draft_feedback', ph: 'draft', label: 'Feedback Second Draft', labelEn: 'Second draft feedback', bucket: 'action', act: 'final_draft' },
  { k: 'final_draft', ph: 'draft', label: 'ส่ง Final Draft แล้ว', labelEn: 'Final draft submitted', bucket: 'review' },
  { k: 'draft_approved', ph: 'draft', label: 'Draft อนุมัติ', labelEn: 'Draft approved', bucket: 'action', act: 'post_link' },
  { k: 'posted_with_link', ph: 'live', label: 'โพสต์แล้ว + แนบลิงก์', labelEn: 'Posted + link attached', bucket: 'live' },
  { k: 'waiting_capture_report', ph: 'live', label: 'รอส่ง Capture Report', labelEn: 'Capture report pending', bucket: 'action', act: 'capture' },
  { k: 'capture_report_sent', ph: 'live', label: 'ส่ง Capture Report', labelEn: 'Capture report sent', bucket: 'done' },
]

const PHASES: [Phase, string, string, string][] = [
  ['brief', 'บรีฟ', 'Brief', 'file-text'],
  ['storyline', 'สตอรี่ไลน์', 'Storyline', 'pen-line'],
  ['draft', 'ดราฟต์คอนเทนต์', 'Content draft', 'clapperboard'],
  ['live', 'เผยแพร่ & รายงาน', 'Publish & report', 'rocket'],
]

function idx(k: string) {
  return STAGES.findIndex((s) => s.k === k)
}
function bucketOf(k: string): Bucket {
  return STAGES[idx(k)]!.bucket
}
// effective bucket: a rejected task overrides its stage bucket with 'rejected'
function effBucket(t: Task): Bucket {
  return t.rejected ? 'rejected' : bucketOf(t.stage)
}
function progress(stage: string) {
  return Math.round(((idx(stage) + 1) / STAGES.length) * 100)
}

// platform brand glyphs — keyed by platform name (SVGs inlined in template)
type Platform = 'Instagram' | 'TikTok' | 'YouTube' | 'Facebook' | 'Twitter' | 'Lemon8'
const PLAT_CLS: Record<Platform, string> = {
  Instagram: 'bg-pink-50',
  TikTok: 'bg-ink/5',
  YouTube: 'bg-red-50',
  Facebook: 'bg-blue-50',
  Twitter: 'bg-ink/5',
  Lemon8: 'bg-yellow-50',
}

type Feedback = { u: string; t: string; d: string }
type Task = {
  id: number
  c: string
  brand: string
  plat: Platform
  due: string
  price: number
  stage: string
  fb: Feedback[]
  rejected?: boolean
  rej?: [string, string]
}

const tasks: Task[] = [
  { id: 1, c: 'Summer Collection 2026', brand: 'Fashion Brand Co.', plat: 'Instagram', due: '15 มี.ค. 2026', price: 18000, stage: 'brief_sent', fb: [] },
  { id: 2, c: 'New Skincare Launch', brand: 'GlowLab Beauty', plat: 'TikTok', due: '20 มี.ค. 2026', price: 9500, stage: 'first_draft_feedback', fb: [{ u: 'Glow Beauty', t: 'วิดีโอดีมากค่ะ แต่รบกวนเพิ่มการแสดงวิธีใช้ผลิตภัณฑ์ในวินาทีที่ 15-25 ด้วยนะคะ', d: '19 มี.ค.' }] },
  { id: 3, c: 'Gadget Review - Smartphone', brand: 'TechZone', plat: 'YouTube', due: '25 มี.ค. 2026', price: 22000, stage: 'draft_approved', fb: [] },
  { id: 4, c: 'Fitness Challenge 30 Days', brand: 'FitPro Studio', plat: 'Instagram', due: '5 เม.ย. 2026', price: 12000, stage: 'waiting_capture_report', fb: [] },
  { id: 5, c: 'Food Festival Promo', brand: 'Taste Kitchen', plat: 'TikTok', due: '28 ก.พ. 2026', price: 15000, stage: 'capture_report_sent', fb: [] },
  { id: 6, c: 'Mineral Water รุ่นใหม่', brand: 'Pure Hydra', plat: 'Facebook', due: '10 เม.ย. 2026', price: 8000, stage: 'brief_sent', fb: [] },
  { id: 7, c: 'Coffee Drop Teaser', brand: 'CafeNord', plat: 'Twitter', due: '3 เม.ย. 2026', price: 6000, stage: 'draft_approved', fb: [] },
  { id: 8, c: 'Skincare Routine รีวิว', brand: 'Aura Cosmetics', plat: 'Lemon8', due: '18 เม.ย. 2026', price: 7000, stage: 'first_draft_feedback', fb: [{ u: 'Aura', t: 'รูปสวยมากค่ะ ขอเพิ่มข้อความบรรยายส่วนผสมในรูปที่ 3 ด้วยนะคะ', d: '17 เม.ย.' }] },
  { id: 9, c: 'Energy Drink Launch', brand: 'Volt Beverage', plat: 'TikTok', due: '12 มี.ค. 2026', price: 11000, stage: 'brief_sent', fb: [], rejected: true, rej: ['ราคาที่เสนอสูงกว่างบของแคมเปญ จึงไม่ผ่านการพิจารณา', 'The quoted price was over the campaign budget, so it was not approved.'] },
  { id: 10, c: 'Travel Vlog Bangkok', brand: 'Wander Co.', plat: 'YouTube', due: '8 มี.ค. 2026', price: 16000, stage: 'brief_sent', fb: [], rejected: true, rej: ['ไม่ได้รับเลือกสำหรับแคมเปญนี้ — แบรนด์เลือก KOL รายอื่น', 'Not selected for this campaign — the brand chose another creator.'] },
]

const BUCKET: Record<Bucket, { label: string; labelEn: string; cls: string; dot: string }> = {
  action: { label: 'ต้องดำเนินการ', labelEn: 'Action needed', cls: 'bg-primary/10 text-primary', dot: 'bg-primary' },
  review: { label: 'รอตรวจ', labelEn: 'In review', cls: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
  live: { label: 'เผยแพร่ / เก็บผล', labelEn: 'Publish / collect', cls: 'bg-violet-100 text-violet-700', dot: 'bg-violet-500' },
  done: { label: 'เสร็จสิ้น', labelEn: 'Completed', cls: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
  rejected: { label: 'ไม่ผ่าน', labelEn: 'Not passed', cls: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
}
const tabs: [Bucket, string, string][] = [
  ['action', 'ต้องดำเนินการ', 'Action needed'],
  ['review', 'รอตรวจ', 'In review'],
  ['live', 'เผยแพร่ & รายงาน', 'Publish & report'],
  ['done', 'เสร็จสิ้น', 'Completed'],
  ['rejected', 'ไม่ผ่าน', 'Not passed'],
]

const active = ref<Bucket>('action')

function countOf(bucket: Bucket) {
  return tasks.filter((t) => effBucket(t) === bucket).length
}
const visibleTasks = computed(() => tasks.filter((t) => effBucket(t) === active.value))

function fmtPrice(n: number) {
  return n.toLocaleString()
}

// ── timeline rows for the modal ──
type TimelineRow = { stage: Stage; done: boolean; on: boolean }
type PhaseGroup = { ph: Phase; label: string; labelEn: string; icon: string; rows: TimelineRow[] }
function timelineGroups(t: Task): PhaseGroup[] {
  const cur = idx(t.stage)
  return PHASES.map(([ph, label, labelEn, icon]) => ({
    ph,
    label,
    labelEn,
    icon,
    rows: STAGES.map((s, i) => ({ stage: s, i }))
      .filter((x) => x.stage.ph === ph)
      .map((x) => ({ stage: x.stage, done: x.i < cur, on: x.i === cur })),
  }))
}

// ── chat ──
type ChatMsg = { who: 'me' | 'brand'; name?: string; t: string; tEn?: string; time: string }
function chatInitials(n?: string) {
  const m = (n || '').trim().split(/\s+/)
  return (m[0]?.[0] ?? '') + (m[1]?.[0] ?? '')
}
function buildChat(brand: string): ChatMsg[] {
  return [
    { who: 'brand', name: brand, t: 'ยินดีต้อนรับเข้าแคมเปญค่ะ ส่งบรีฟให้ทางอีเมลแล้ว รบกวนดูรายละเอียดแล้วเริ่มทำ storyline ได้เลยนะคะ', tEn: 'Welcome to the campaign! We have emailed you the brief. Please review the details and go ahead with the storyline.', time: '1 มี.ค. 09:02' },
    { who: 'me', t: 'รับทราบค่ะ อ่านบรีฟแล้ว เดี๋ยวร่าง storyline ส่งภายในวันนี้นะคะ', tEn: 'Got it, I have read the brief. I will draft the storyline and send it over today.', time: '09:15' },
    { who: 'me', t: 'ส่ง storyline แล้วค่ะ เน้นรีวิวเนื้อสัมผัส + before/after 7 วัน', tEn: 'Storyline sent. It focuses on a texture review plus a 7-day before/after.', time: '14:40' },
    { who: 'brand', name: brand, t: 'ได้รับแล้วค่ะ โดยรวมดีมาก ขอให้พูดถึงส่วนผสมหลัก (Niacinamide) เพิ่มอีกนิดนะคะ', tEn: 'Received, looks great overall. Could you mention the key ingredient (Niacinamide) a bit more?', time: '2 มี.ค. 10:05' },
    { who: 'me', t: 'โอเคค่ะ เดี๋ยวเพิ่มช่วงเกริ่นส่วนผสมให้ แล้วส่ง storyline ใหม่', tEn: 'Sure, I will add an intro about the ingredients and resend the storyline.', time: '10:22' },
    { who: 'me', t: 'อัปเดต storyline เวอร์ชัน 2 ให้แล้วค่ะ', tEn: 'Storyline version 2 has been updated for you.', time: '11:30' },
    { who: 'brand', name: brand, t: 'เพอร์เฟกต์ค่ะ อนุมัติ storyline ถ่าย first draft ได้เลย', tEn: 'Perfect, the storyline is approved. Go ahead and shoot the first draft.', time: '13:00' },
    { who: 'me', t: 'ขอบคุณค่ะ เริ่มถ่ายพรุ่งนี้ คาดส่ง first draft ภายใน 5 มี.ค.', tEn: 'Thank you! I will start shooting tomorrow and expect to send the first draft by Mar 5.', time: '13:10' },
    { who: 'me', t: 'ส่ง first draft แล้วนะคะ เป็นคลิป 60 วินาที', tEn: 'First draft sent — it is a 60-second clip.', time: '5 มี.ค. 16:20' },
    { who: 'brand', name: brand, t: 'ดีมากค่ะ รบกวนเพิ่มการแสดงวิธีใช้ในวินาทีที่ 15-25 และใส่ CTA ตอนท้ายด้วยนะคะ', tEn: 'Very nice. Please add a how-to-use demo at seconds 15-25 and a CTA at the end.', time: '6 มี.ค. 09:30' },
    { who: 'me', t: 'รับทราบค่ะ เดี๋ยวแก้แล้วส่ง second draft', tEn: 'Understood, I will revise and send the second draft.', time: '09:45' },
    { who: 'me', t: 'ส่ง second draft แล้วค่ะ ปรับตาม feedback ครบทุกจุด', tEn: 'Second draft sent, with every point of feedback addressed.', time: '7 มี.ค. 15:10' },
    { who: 'brand', name: brand, t: 'เยี่ยมเลยค่ะ เหลือปรับซับไตเติลให้เข้าโทนแบรนด์นิดนึง แล้วทำ final ได้เลย', tEn: 'Excellent! Just tweak the subtitles to match the brand tone, then proceed to the final.', time: '8 มี.ค. 10:00' },
    { who: 'me', t: 'จัดให้ค่ะ ส่ง final draft แล้วนะคะ', tEn: 'Done — final draft sent.', time: '9 มี.ค. 11:20' },
    { who: 'brand', name: brand, t: 'อนุมัติ final ค่ะ โพสต์ได้ตามวันที่ตกลงเลย อย่าลืมแนบลิงก์หลังโพสต์นะคะ', tEn: 'Final approved! You can post on the agreed date. Do not forget to attach the link after posting.', time: '9 มี.ค. 14:30' },
    { who: 'me', t: 'รับทราบค่ะ จะโพสต์วันที่ 12 และส่งลิงก์ให้ทันทีค่ะ', tEn: 'Got it, I will post on the 12th and send the link right away.', time: '14:35' },
    { who: 'brand', name: brand, t: 'ขอบคุณมากค่ะ ทำงานด้วยแล้วสบายใจเลย เดี๋ยวรอ capture report หลังโพสต์ครบ 48 ชม. นะคะ', tEn: 'Thank you so much, a pleasure working with you. We will await the capture report 48 hours after posting.', time: '14:40' },
  ]
}

// brief data (static across tasks in the prototype) — [th, en] pairs (brand handle/hashtags kept as-is)
const briefDeliverables: [string, string][] = [
  ['1 Reel (30–60 วิ)', '1 Reel (30–60 sec)'],
  ['3 Stories', '3 Stories'],
  ['แท็กแบรนด์', 'Tag the brand'],
  ['ปักลิงก์โปรโมชั่น', 'Pin the promo link'],
]
const briefHashtags = ['#รีวิวจริง', '#ของดีบอกต่อ', '@brand.official']
const briefPoints: [string, string][] = [
  ['เน้นรีวิวจากการใช้จริง 7 วัน เห็นผลชัด', 'Focus on a genuine 7-day review with clear results'],
  ['พูดถึงส่วนผสมหลักและจุดเด่นของสินค้า', 'Mention the key ingredients and product highlights'],
  ['แสดงวิธีใช้ที่ถูกต้อง พร้อมโชว์เนื้อสัมผัส', 'Show the correct usage and the product texture'],
  ['แนบโค้ดส่วนลดเปิดตัว + CTA ชวนกดลิงก์', 'Include the launch discount code + a CTA to tap the link'],
]
const briefDo: [string, string][] = [
  ['รีวิวด้วยภาษาของตัวเอง จริงใจ', 'Review honestly, in your own words'],
  ['ติดแท็กแบรนด์ + hashtag ให้ครบ', 'Tag the brand and add all hashtags'],
  ['ส่ง draft ให้ตรวจก่อนโพสต์จริง', 'Submit the draft for review before posting live'],
]
const briefDont: [string, string][] = [
  ['กล่าวอ้างเกินจริง / อ้างรักษาโรค', 'Make exaggerated or medical-cure claims'],
  ['เทียบคู่แข่งโดยตรง', 'Compare directly with competitors'],
  ['ลบ / แก้โพสต์ก่อนครบ 30 วัน', 'Delete or edit the post before 30 days'],
]

// ── modal state ──
const openId = ref<number | null>(null)
const current = computed(() => tasks.find((t) => t.id === openId.value) ?? null)
const currentStage = computed(() => (current.value ? STAGES[idx(current.value.stage)]! : null))
const currentBucket = computed(() => (current.value ? BUCKET[effBucket(current.value)] : null))

const chatMessages = ref<ChatMsg[]>([])
const chatInput = ref('')
const chatThread = ref<HTMLElement | null>(null)

async function scrollChatToBottom() {
  await nextTick()
  const el = chatThread.value
  if (el) el.scrollTop = el.scrollHeight
}

function openTask(id: number) {
  openId.value = id
  const t = tasks.find((x) => x.id === id)
  chatMessages.value = t ? buildChat(t.brand) : []
  chatInput.value = ''
  scrollChatToBottom()
}
function closeTask() {
  openId.value = null
}
function sendChat() {
  const v = chatInput.value.trim()
  if (!v) return
  const d = new Date()
  const hh = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  chatMessages.value.push({ who: 'me', t: v, time: hh })
  chatInput.value = ''
  scrollChatToBottom()
}
</script>

<template>
  <main class="mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-14">
    <section class="mb-8">
      <h1 class="font-heading text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">{{ tr('งานของฉัน', 'My Tasks') }}</h1>
      <p class="mt-1 text-sm text-muted">{{ tr('ติดตามขั้นตอนการผลิตคอนเทนต์ของแต่ละแคมเปญ — 14 ขั้นตอน ตั้งแต่บรีฟจนส่ง capture report', 'Track the content production stages of each campaign — 14 stages, from brief to capture report.') }}</p>
    </section>

    <!-- stats -->
    <section class="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <div v-for="tb in tabs" :key="`stat-${tb[0]}`" class="rounded-xl border border-[#0F2747]/10 bg-white p-4 shadow-sm">
        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full" :class="BUCKET[tb[0]].dot" />
          <p class="text-xs text-muted">{{ tr(tb[1], tb[2]) }}</p>
        </div>
        <p class="mt-1 font-heading text-2xl font-extrabold text-ink">{{ countOf(tb[0]) }}</p>
      </div>
    </section>

    <!-- tabs -->
    <section class="mb-6 flex flex-wrap gap-2">
      <button
        v-for="tb in tabs"
        :key="`tab-${tb[0]}`"
        type="button"
        class="rounded-lg px-4 py-2 text-sm font-bold transition"
        :class="tb[0] === active ? 'bg-primary text-white' : 'border border-[#0F2747]/10 bg-white text-muted hover:text-primary'"
        @click="active = tb[0]"
      >
        {{ tr(tb[1], tb[2]) }} ({{ countOf(tb[0]) }})
      </button>
    </section>

    <section class="space-y-4">
      <div
        v-for="t in visibleTasks"
        :key="t.id"
        class="cursor-pointer rounded-xl border border-[#0F2747]/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-[0_24px_50px_-30px_rgb(45_91_255_/_35%)]"
        @click="openTask(t.id)"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="flex items-start gap-4">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl" :class="PLAT_CLS[t.plat]">
              <!-- Instagram -->
              <svg v-if="t.plat === 'Instagram'" viewBox="0 0 24 24" class="h-6 w-6">
                <defs>
                  <radialGradient :id="`igtp-card-${t.id}`" cx="30%" cy="107%" r="150%">
                    <stop offset="0%" stop-color="#fdf497" />
                    <stop offset="45%" stop-color="#fd5949" />
                    <stop offset="60%" stop-color="#d6249f" />
                    <stop offset="90%" stop-color="#285AEB" />
                  </radialGradient>
                </defs>
                <path :fill="`url(#igtp-card-${t.id})`" d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
              </svg>
              <!-- TikTok -->
              <svg v-else-if="t.plat === 'TikTok'" viewBox="0 0 24 24" class="h-6 w-6">
                <path fill="#010101" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
              </svg>
              <!-- YouTube -->
              <svg v-else-if="t.plat === 'YouTube'" viewBox="0 0 24 24" class="h-6 w-6">
                <path fill="#FF0000" d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
              </svg>
              <!-- Facebook -->
              <svg v-else-if="t.plat === 'Facebook'" viewBox="0 0 24 24" class="h-6 w-6">
                <path fill="#1877F2" d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07z" />
              </svg>
              <!-- Twitter / X -->
              <svg v-else-if="t.plat === 'Twitter'" viewBox="0 0 24 24" class="h-6 w-6">
                <path fill="#000" d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25H8.08l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z" />
              </svg>
              <!-- Lemon8 -->
              <svg v-else-if="t.plat === 'Lemon8'" viewBox="0 0 24 24" class="h-6 w-6">
                <rect width="24" height="24" rx="6" fill="#FAE500" />
                <text x="12" y="14.5" font-family="Georgia, serif" font-size="6.2" font-style="italic" font-weight="700" fill="#111" text-anchor="middle" letter-spacing="-0.2">Lemon</text>
                <text x="12" y="20.5" font-family="Georgia, serif" font-size="6.2" font-style="italic" font-weight="700" fill="#111" text-anchor="middle">8</text>
              </svg>
            </div>
            <div>
              <h3 class="font-heading text-base font-bold text-ink">{{ t.c }}</h3>
              <p class="text-sm text-muted">{{ t.brand }} · {{ t.plat }}</p>
              <div class="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted">
                <span v-if="t.rejected" class="flex items-center gap-1.5 text-red-600">
                  <Icon name="x-circle" class="h-4 w-4" /> {{ tr('ไม่ผ่านการพิจารณา', 'Not selected') }}
                </span>
                <span v-else class="flex items-center gap-1.5">
                  <Icon name="git-commit-vertical" class="h-4 w-4 text-primary" /> {{ tr(STAGES[idx(t.stage)]!.label, STAGES[idx(t.stage)]!.labelEn) }}
                </span>
                <span class="flex items-center gap-1.5">
                  <Icon name="calendar" class="h-4 w-4" /> {{ t.due }}
                </span>
              </div>
            </div>
          </div>
          <div class="shrink-0 text-right">
            <span class="rounded-full px-2.5 py-1 text-[11px] font-bold" :class="BUCKET[effBucket(t)].cls">{{ tr(BUCKET[effBucket(t)].label, BUCKET[effBucket(t)].labelEn) }}</span>
            <p class="mt-2 font-heading text-lg font-extrabold" :class="t.rejected ? 'text-muted line-through' : 'text-primary'">฿{{ fmtPrice(t.price) }}</p>
            <p class="text-[10px] uppercase tracking-widest text-[#5B6B82]/50">{{ t.rejected ? tr('ราคาที่เสนอ', 'Quoted price') : 'Final price' }}</p>
          </div>
        </div>
        <!-- progress bar — only for tasks that passed review and entered production -->
        <div v-if="!t.rejected" class="mt-4">
          <div class="flex items-center justify-between text-[11px] text-muted">
            <span>{{ tr('ความคืบหน้า · ขั้นที่', 'Progress · stage') }} {{ idx(t.stage) + 1 }}/14</span>
            <span class="font-bold text-primary">{{ progress(t.stage) }}%</span>
          </div>
          <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface">
            <div class="h-full rounded-full bg-primary" :style="{ width: progress(t.stage) + '%' }" />
          </div>
        </div>
        <!-- rejection reason — replaces progress for not-selected tasks -->
        <div v-else class="mt-4 flex items-start gap-2 rounded-lg border border-red-100 bg-red-50/60 px-3 py-2.5 text-xs text-red-700">
          <Icon name="info" class="mt-0.5 h-4 w-4 shrink-0" />
          <span>{{ t.rej ? tr(t.rej[0], t.rej[1]) : tr('ไม่ผ่านการพิจารณาของแอดมิน/แบรนด์', 'Not approved by the admin / brand.') }}</span>
        </div>
      </div>
    </section>
    <p v-if="visibleTasks.length === 0" class="py-12 text-center text-muted">{{ tr('ไม่มีงานในหมวดหมู่นี้', 'No tasks in this category') }}</p>

    <!-- detail modal -->
    <Teleport to="body">
      <div
        v-if="current && currentStage && currentBucket"
        class="fixed inset-0 z-[60] flex bg-surface"
        @click.self="closeTask"
      >
        <div class="h-full w-full overflow-y-auto">
          <!-- sticky header -->
          <div class="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#0F2747]/10 bg-white/95 px-6 py-4 backdrop-blur-md lg:px-10">
            <div class="flex min-w-0 items-center gap-3">
              <button type="button" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-surface" @click="closeTask">
                <Icon name="arrow-left" class="h-5 w-5" />
              </button>
              <div class="min-w-0">
                <h2 class="truncate font-heading text-lg font-bold text-ink lg:text-xl">{{ current.c }}</h2>
                <p class="truncate text-sm text-muted">{{ current.brand }} · {{ current.plat }}</p>
              </div>
            </div>
            <button type="button" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-surface" @click="closeTask">
              <Icon name="x" class="h-5 w-5" />
            </button>
          </div>

          <!-- gradient hero -->
          <div class="relative overflow-hidden bg-gradient-to-br from-ink to-primaryDark px-6 py-9 lg:px-10">
            <div class="pointer-events-none absolute inset-0 opacity-[0.07]" style="background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:36px 36px" />
            <div class="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
            <div class="relative mx-auto max-w-5xl">
              <div class="flex flex-wrap items-center gap-2">
                <span class="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                  <span class="h-1.5 w-1.5 rounded-full" :class="currentBucket.dot" />{{ tr(currentBucket.label, currentBucket.labelEn) }}
                </span>
                <span class="rounded-md bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">{{ current.plat }}</span>
              </div>
              <h1 class="mt-4 font-heading text-3xl font-extrabold leading-tight text-white lg:text-4xl">{{ current.c }}</h1>
              <p class="mt-1 text-white/70">{{ current.brand }}</p>
              <div class="mt-6 flex flex-wrap gap-3">
                <div class="rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur">
                  <p class="text-[10px] font-bold uppercase tracking-widest text-white/50">{{ tr('กำหนดส่ง', 'Due date') }}</p>
                  <p class="mt-0.5 font-bold text-white">{{ current.due }}</p>
                </div>
                <div class="rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur">
                  <p class="text-[10px] font-bold uppercase tracking-widest text-white/50">{{ current.rejected ? tr('ราคาที่เสนอ', 'Quoted price') : 'Final price · TIER 3' }}</p>
                  <p class="mt-0.5 font-bold text-white">฿{{ fmtPrice(current.price) }}</p>
                </div>
                <div v-if="!current.rejected" class="rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur">
                  <p class="text-[10px] font-bold uppercase tracking-widest text-white/50">{{ tr('ความคืบหน้า', 'Progress') }}</p>
                  <p class="mt-0.5 font-bold text-white">{{ tr('ขั้น', 'Stage') }} {{ idx(current.stage) + 1 }}/14 · {{ progress(current.stage) }}%</p>
                </div>
              </div>
            </div>
          </div>

          <!-- body -->
          <div class="mx-auto max-w-5xl px-6 py-8 lg:px-10">
            <!-- rejected: no production — show the review decision only -->
            <div v-if="current.rejected" class="rounded-2xl border border-red-200 bg-red-50/50 p-6 shadow-sm lg:p-8">
              <div class="flex items-start gap-3">
                <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <Icon name="x-circle" class="h-6 w-6" />
                </span>
                <div>
                  <h3 class="font-heading text-lg font-bold text-ink">{{ tr('ไม่ผ่านการพิจารณา', 'Not selected') }}</h3>
                  <p class="mt-1 text-sm text-muted">{{ tr('แอดมิน/แบรนด์พิจารณาแล้วว่าจะไม่จ้างสำหรับแคมเปญนี้ จึงยังไม่เริ่มขั้นตอนการผลิต', 'The admin / brand reviewed the application and decided not to proceed, so production never started.') }}</p>
                </div>
              </div>
              <div class="mt-5 rounded-xl border border-red-100 bg-white p-4">
                <p class="text-[11px] font-bold uppercase tracking-widest text-red-500/70">{{ tr('เหตุผล', 'Reason') }}</p>
                <p class="mt-1 text-sm leading-relaxed text-ink/80">{{ current.rej ? tr(current.rej[0], current.rej[1]) : tr('ไม่ผ่านการพิจารณาของแอดมิน/แบรนด์', 'Not approved by the admin / brand.') }}</p>
              </div>
              <div class="mt-4 flex flex-wrap gap-3">
                <div class="rounded-xl bg-surface px-4 py-2.5">
                  <p class="text-[10px] font-bold uppercase tracking-widest text-[#5B6B82]/60">{{ tr('ราคาที่เสนอ', 'Quoted price') }}</p>
                  <p class="mt-0.5 font-bold text-ink">฿{{ fmtPrice(current.price) }}</p>
                </div>
                <div class="rounded-xl bg-surface px-4 py-2.5">
                  <p class="text-[10px] font-bold uppercase tracking-widest text-[#5B6B82]/60">{{ tr('แพลตฟอร์ม', 'Platform') }}</p>
                  <p class="mt-0.5 font-bold text-ink">{{ current.plat }}</p>
                </div>
              </div>
              <p class="mt-5 text-xs text-muted">{{ tr('ไม่ต้องกังวล — ลองสมัครแคมเปญอื่นที่เหมาะกับคุณได้เลย', 'Don’t worry — feel free to apply to other campaigns that suit you.') }}</p>
            </div>

            <!-- brief -->
            <div v-if="!current.rejected" class="rounded-2xl border border-[#0F2747]/10 bg-white p-6 shadow-sm lg:p-8">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <h3 class="flex items-center gap-2 font-heading text-lg font-bold text-ink">
                  <Icon name="file-text" class="h-5 w-5 text-primary" /> {{ tr('บรีฟงานจากแบรนด์', 'Brief from the brand') }}
                </h3>
                <span class="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">{{ current.plat }}</span>
              </div>
              <p class="mt-1 text-xs text-muted">{{ tr('ส่งโดย', 'From') }} {{ current.brand }} · {{ tr('อัปเดต', 'Updated') }} 1 มี.ค. 2026</p>
              <div class="mt-6 grid gap-6 sm:grid-cols-2">
                <div class="sm:col-span-2">
                  <p class="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/60">{{ tr('วัตถุประสงค์', 'Objective') }}</p>
                  <p class="text-sm leading-relaxed text-muted">{{ tr('สร้างการรับรู้และกระตุ้นยอดขายผลิตภัณฑ์ใหม่ ผ่านรีวิวที่จริงใจในสไตล์ของคุณ กลุ่มเป้าหมายผู้หญิง 18–34 ปี', 'Build awareness and drive sales of the new product through an authentic review in your own style. Target audience: women aged 18–34.') }}</p>
                </div>
                <div>
                  <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/60">{{ tr('สิ่งที่ต้องส่งมอบ', 'Deliverables') }}</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="x in briefDeliverables" :key="x[0]" class="rounded-md bg-surface px-3 py-1.5 text-xs font-semibold text-ink">{{ tr(x[0], x[1]) }}</span>
                  </div>
                </div>
                <div>
                  <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/60">Hashtag &amp; Mention</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="x in briefHashtags" :key="x" class="rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">{{ x }}</span>
                  </div>
                </div>
                <div class="sm:col-span-2">
                  <p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/60">{{ tr('ประเด็นหลักที่ต้องสื่อ', 'Key messages to convey') }}</p>
                  <ul class="space-y-1.5">
                    <li v-for="x in briefPoints" :key="x[0]" class="flex items-start gap-2 text-sm text-muted">
                      <Icon name="check-circle" class="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span>{{ tr(x[0], x[1]) }}</span>
                    </li>
                  </ul>
                </div>
                <div class="rounded-xl border border-green-100 bg-green-50/40 p-4">
                  <p class="mb-2 flex items-center gap-1.5 text-sm font-bold text-green-700">
                    <Icon name="check" class="h-4 w-4" /> {{ tr('ควรทำ', 'Do') }}
                  </p>
                  <ul class="space-y-1.5">
                    <li v-for="x in briefDo" :key="x[0]" class="flex items-start gap-2 text-sm text-ink/80">
                      <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" /><span>{{ tr(x[0], x[1]) }}</span>
                    </li>
                  </ul>
                </div>
                <div class="rounded-xl border border-red-100 bg-red-50/40 p-4">
                  <p class="mb-2 flex items-center gap-1.5 text-sm font-bold text-red-600">
                    <Icon name="x" class="h-4 w-4" /> {{ tr('ห้ามทำ', 'Don\'t') }}
                  </p>
                  <ul class="space-y-1.5">
                    <li v-for="x in briefDont" :key="x[0]" class="flex items-start gap-2 text-sm text-ink/80">
                      <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" /><span>{{ tr(x[0], x[1]) }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-if="!current.rejected" class="mt-6 grid gap-6 lg:grid-cols-5">
              <!-- timeline -->
              <div class="rounded-2xl border border-[#0F2747]/10 bg-white p-6 shadow-sm lg:col-span-2 lg:p-8">
                <h3 class="font-heading text-lg font-bold text-ink">{{ tr('ขั้นตอนการผลิต', 'Production stages') }} <span class="font-medium text-muted">(14 stage)</span></h3>
                <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-surface">
                  <div class="h-full rounded-full bg-primary transition-all" :style="{ width: progress(current.stage) + '%' }" />
                </div>
                <div class="mt-6 space-y-6">
                  <div v-for="grp in timelineGroups(current)" :key="grp.ph">
                    <div class="mb-2 flex items-center gap-2">
                      <span class="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon :name="grp.icon" class="h-4 w-4" />
                      </span>
                      <p class="text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/60">{{ tr(grp.label, grp.labelEn) }}</p>
                    </div>
                    <div class="ml-3 space-y-0.5 border-l-2 border-dashed border-[#0F2747]/10 pl-5">
                      <div
                        v-for="row in grp.rows"
                        :key="row.stage.k"
                        class="-ml-3 flex items-center gap-3 rounded-lg py-2 pl-3 pr-3"
                        :class="row.on ? 'bg-primary/5' : ''"
                      >
                        <span v-if="row.done" class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                          <Icon name="check" class="h-3.5 w-3.5" />
                        </span>
                        <span v-else-if="row.on" class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary ring-4 ring-primary/15">
                          <span class="h-2 w-2 animate-pulse rounded-full bg-white" />
                        </span>
                        <span v-else class="h-6 w-6 shrink-0 rounded-full border-2 border-[#0F2747]/15 bg-white" />
                        <span class="text-sm" :class="row.on ? 'font-bold text-ink' : row.done ? 'text-ink/70' : 'text-[#5B6B82]/45'">{{ tr(row.stage.label, row.stage.labelEn) }}</span>
                        <span v-if="row.on" class="ml-auto rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">{{ tr('ตอนนี้', 'Now') }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- right column: action panel + chat -->
              <div class="space-y-6 lg:col-span-3">
                <div class="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/[0.07] to-transparent p-6 shadow-sm">
                  <h3 class="mb-4 flex items-center gap-2 font-heading text-lg font-bold text-ink">
                    <Icon name="circle-dot" class="h-5 w-5 text-primary" /> {{ tr('สิ่งที่ต้องทำตอนนี้', 'What to do now') }}
                  </h3>

                  <!-- review state -->
                  <div v-if="currentStage.bucket === 'review'" class="rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <p class="flex items-center gap-2 font-bold text-amber-900"><Icon name="clock" class="h-4 w-4" /> {{ tr('รอแอดมิน / แบรนด์ตรวจ', 'Awaiting admin / brand review') }}</p>
                    <p class="mt-1 text-sm text-amber-700">{{ tr('เราจะแจ้งเตือนทันทีที่มี feedback หรือผลอนุมัติ', 'We will notify you the moment there is feedback or an approval.') }}</p>
                  </div>

                  <!-- done state -->
                  <div v-else-if="currentStage.bucket === 'done'" class="rounded-xl border border-green-200 bg-green-50 p-4">
                    <p class="flex items-center gap-2 font-bold text-green-900"><Icon name="check-circle" class="h-4 w-4" /> {{ tr('ส่ง Capture Report เรียบร้อย', 'Capture report submitted') }}</p>
                    <p class="mt-1 text-sm text-green-700">{{ tr('งานเสร็จสมบูรณ์ รอแคมเปญปิดเพื่อรับเงิน', 'The task is complete. Awaiting campaign close to receive payment.') }}</p>
                  </div>

                  <!-- action states -->
                  <div v-else class="space-y-3">
                    <template v-if="currentStage.act === 'storyline'">
                      <div>
                        <label class="mb-1 block text-sm font-semibold text-ink">{{ tr('Storyline / แนวทางคอนเทนต์', 'Storyline / content direction') }}</label>
                        <textarea rows="3" class="w-full rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-3 text-sm outline-none focus:border-primary/50" />
                      </div>
                      <div>
                        <label class="mb-1 block text-sm font-semibold text-ink">{{ tr('แนบ moodboard (ถ้ามี)', 'Attach moodboard (optional)') }}</label>
                        <label class="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#0F2747]/15 p-3 transition hover:border-primary/50">
                          <Icon name="upload" class="h-5 w-5 text-[#5B6B82]/60" /><span class="text-sm text-muted">{{ tr('คลิกเพื่อเลือกไฟล์', 'Click to choose a file') }}</span>
                        </label>
                      </div>
                      <button type="button" class="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primaryDark" @click="closeTask">{{ tr('ส่ง Storyline', 'Submit storyline') }}</button>
                    </template>

                    <template v-else-if="currentStage.act === 'storyline_revise'">
                      <div>
                        <label class="mb-1 block text-sm font-semibold text-ink">{{ tr('Storyline (แก้ไขตาม feedback)', 'Storyline (revised per feedback)') }}</label>
                        <textarea rows="3" class="w-full rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-3 text-sm outline-none focus:border-primary/50" />
                      </div>
                      <button type="button" class="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primaryDark" @click="closeTask">{{ tr('ส่ง Storyline ใหม่', 'Resubmit storyline') }}</button>
                    </template>

                    <template v-else-if="currentStage.act === 'first_draft'">
                      <div>
                        <label class="mb-1 block text-sm font-semibold text-ink">{{ tr('First Draft (รูป / วิดีโอ)', 'First draft (photo / video)') }}</label>
                        <label class="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#0F2747]/15 p-3 transition hover:border-primary/50">
                          <Icon name="upload" class="h-5 w-5 text-[#5B6B82]/60" /><span class="text-sm text-muted">{{ tr('คลิกเพื่อเลือกไฟล์', 'Click to choose a file') }}</span>
                        </label>
                      </div>
                      <div>
                        <label class="mb-1 block text-sm font-semibold text-ink">Caption</label>
                        <textarea rows="3" class="w-full rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-3 text-sm outline-none focus:border-primary/50" />
                      </div>
                      <button type="button" class="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primaryDark" @click="closeTask">{{ tr('ส่ง First Draft', 'Submit first draft') }}</button>
                    </template>

                    <template v-else-if="currentStage.act === 'second_draft'">
                      <div>
                        <label class="mb-1 block text-sm font-semibold text-ink">{{ tr('Second Draft (แก้ตาม feedback)', 'Second draft (revised per feedback)') }}</label>
                        <label class="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#0F2747]/15 p-3 transition hover:border-primary/50">
                          <Icon name="upload" class="h-5 w-5 text-[#5B6B82]/60" /><span class="text-sm text-muted">{{ tr('คลิกเพื่อเลือกไฟล์', 'Click to choose a file') }}</span>
                        </label>
                      </div>
                      <button type="button" class="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primaryDark" @click="closeTask">{{ tr('ส่ง Second Draft', 'Submit second draft') }}</button>
                    </template>

                    <template v-else-if="currentStage.act === 'final_draft'">
                      <div>
                        <label class="mb-1 block text-sm font-semibold text-ink">Final Draft</label>
                        <label class="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#0F2747]/15 p-3 transition hover:border-primary/50">
                          <Icon name="upload" class="h-5 w-5 text-[#5B6B82]/60" /><span class="text-sm text-muted">{{ tr('คลิกเพื่อเลือกไฟล์', 'Click to choose a file') }}</span>
                        </label>
                      </div>
                      <button type="button" class="w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primaryDark" @click="closeTask">{{ tr('ส่ง Final Draft', 'Submit final draft') }}</button>
                    </template>

                    <template v-else-if="currentStage.act === 'post_link'">
                      <div class="rounded-xl border border-green-200 bg-green-50 p-4">
                        <p class="flex items-center gap-2 font-bold text-green-900"><Icon name="rocket" class="h-4 w-4" /> {{ tr('Draft อนุมัติแล้ว — โพสต์ได้เลย!', 'Draft approved — you can post now!') }}</p>
                        <p class="mt-1 text-sm text-green-700">{{ tr('เผยแพร่งานจริงแล้วแนบลิงก์โพสต์ด้านล่าง', 'Publish the content live, then attach the post link below.') }}</p>
                      </div>
                      <div>
                        <label class="mb-1 block text-sm font-semibold text-ink">{{ tr('ลิงก์โพสต์จริง (Post URL)', 'Live post link (Post URL)') }}</label>
                        <input placeholder="https://www.instagram.com/p/..." class="w-full rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-3 text-sm outline-none focus:border-primary/50" />
                      </div>
                      <button type="button" class="w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-green-700" @click="closeTask">{{ tr('ยืนยันโพสต์ + แนบลิงก์', 'Confirm post + attach link') }}</button>
                    </template>

                    <template v-else-if="currentStage.act === 'capture'">
                      <div class="rounded-xl border border-violet-200 bg-violet-50 p-4">
                        <p class="flex items-center gap-2 font-bold text-violet-900"><Icon name="bar-chart-3" class="h-4 w-4" /> {{ tr('ถึงเวลาส่ง Capture Report', 'Time to submit the capture report') }}</p>
                        <p class="mt-1 text-sm text-violet-700">{{ tr('แนบสกรีนช็อตยอด views / likes / reach หลังโพสต์ครบ 48 ชม.', 'Attach screenshots of views / likes / reach, 48 hours after posting.') }}</p>
                      </div>
                      <div>
                        <label class="mb-1 block text-sm font-semibold text-ink">{{ tr('Capture Report (สกรีนช็อตสถิติ)', 'Capture report (stats screenshots)') }}</label>
                        <label class="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#0F2747]/15 p-3 transition hover:border-primary/50">
                          <Icon name="upload" class="h-5 w-5 text-[#5B6B82]/60" /><span class="text-sm text-muted">{{ tr('คลิกเพื่อเลือกไฟล์', 'Click to choose a file') }}</span>
                        </label>
                      </div>
                      <button type="button" class="w-full rounded-lg bg-violet-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-700" @click="closeTask">{{ tr('ส่ง Capture Report', 'Submit capture report') }}</button>
                    </template>
                  </div>
                </div>

                <!-- chat -->
                <div class="flex flex-col rounded-2xl border border-[#0F2747]/10 bg-white shadow-sm">
                  <div class="flex items-center gap-2 border-b border-[#0F2747]/10 p-5">
                    <Icon name="messages-square" class="h-5 w-5 text-primary" />
                    <div>
                      <h3 class="font-heading text-lg font-bold text-ink">{{ tr('การพูดคุย &amp; Feedback', 'Conversation &amp; Feedback') }}</h3>
                      <p class="text-xs text-muted">{{ tr('คุยกับทีมงานของแบรนด์ได้โดยตรง', 'Chat directly with the brand team.') }}</p>
                    </div>
                  </div>
                  <div ref="chatThread" class="max-h-[560px] space-y-4 overflow-y-auto p-5">
                    <template v-for="(m, i) in chatMessages" :key="i">
                      <div v-if="m.who === 'me'" class="flex justify-end">
                        <div class="max-w-[85%]">
                          <div class="rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm leading-relaxed text-white">{{ tr(m.t, m.tEn ?? m.t) }}</div>
                          <p class="mt-1 text-right text-[10px] text-[#5B6B82]/50">{{ tr('คุณ', 'You') }} · {{ m.time }}</p>
                        </div>
                      </div>
                      <div v-else class="flex justify-start gap-2.5">
                        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold uppercase text-primary">{{ chatInitials(m.name) }}</div>
                        <div class="max-w-[85%]">
                          <div class="rounded-2xl rounded-tl-md bg-surface px-4 py-2.5 text-sm leading-relaxed text-ink">{{ tr(m.t, m.tEn ?? m.t) }}</div>
                          <p class="mt-1 text-[10px] text-[#5B6B82]/50">{{ m.name }} · {{ m.time }}</p>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div class="flex items-center gap-2 border-t border-[#0F2747]/10 p-4">
                    <input
                      v-model="chatInput"
                      :placeholder="tr('พิมพ์ข้อความถึงแบรนด์...', 'Type a message to the brand...')"
                      class="flex-1 rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-2.5 text-sm outline-none transition focus:border-primary/50"
                      @keydown.enter="sendChat"
                    />
                    <button type="button" :aria-label="tr('ส่ง', 'Send')" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition hover:bg-primaryDark" @click="sendChat">
                      <Icon name="send" class="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </main>
</template>
