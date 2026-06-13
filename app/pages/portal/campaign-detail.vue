<script setup lang="ts">
const { tr } = useLocale()
definePageMeta({ layout: 'portal', middleware: 'auth' })
useHead(() => ({ title: tr('รายละเอียดแคมเปญ — Ripples', 'Campaign details — Ripples') }))

type State = 'open' | 'applied' | 'invited' | 'selected' | 'accepted' | 'live' | 'completed' | 'rejected'

// ── สถานะความสัมพันธ์ของ KOL กับแคมเปญ (8 สถานะ) ──
const STATES: Record<State, { n: number, badge: string, badgeEn: string, camp: string, campEn: string, dot: string }> = {
  open: { n: 1, badge: 'ยังไม่สมัคร · เปิดรับ', badgeEn: 'Not applied · Open', camp: 'เปิดรับสมัคร', campEn: 'Open', dot: 'bg-emerald-400' },
  applied: { n: 2, badge: 'สมัครแล้ว · รอพิจารณา', badgeEn: 'Applied · In review', camp: 'กำลังคัดเลือก', campEn: 'Selecting', dot: 'bg-amber-400' },
  invited: { n: 3, badge: 'ได้รับคำเชิญจากแบรนด์', badgeEn: 'Invited by the brand', camp: 'กำลังคัดเลือก', campEn: 'Selecting', dot: 'bg-violet-400' },
  selected: { n: 4, badge: 'ได้รับเลือก · รอตอบรับ', badgeEn: 'Selected · Awaiting acceptance', camp: 'กำลังคัดเลือก', campEn: 'Selecting', dot: 'bg-sky-400' },
  accepted: { n: 5, badge: 'ตอบรับแล้ว · กำลังทำงาน', badgeEn: 'Accepted · In progress', camp: 'กำลังดำเนินงาน', campEn: 'In progress', dot: 'bg-primaryLight' },
  live: { n: 6, badge: 'โพสต์แล้ว · เก็บผล', badgeEn: 'Posted · Collecting results', camp: 'กำลังดำเนินงาน', campEn: 'In progress', dot: 'bg-fuchsia-400' },
  completed: { n: 7, badge: 'จบงาน · รับเงิน', badgeEn: 'Completed · Paid', camp: 'จบแคมเปญ', campEn: 'Completed', dot: 'bg-green-400' },
  rejected: { n: 8, badge: 'ไม่ได้รับเลือก', badgeEn: 'Not selected', camp: 'ปิดรับแล้ว', campEn: 'Closed', dot: 'bg-[#9AA7B8]' },
}
const STATE_ORDER: State[] = ['open', 'applied', 'invited', 'selected', 'accepted', 'live', 'completed', 'rejected']
const STATE_LABEL: Record<State, string> = {
  open: 'ยังไม่สมัคร / เปิดรับ', applied: 'สมัครแล้ว รอผล', invited: 'ถูกเชิญ',
  selected: 'ได้รับเลือก (เคาะราคาแล้ว)', accepted: 'ตอบรับ · กำลังทำงาน', live: 'โพสต์แล้ว / เก็บผล',
  completed: 'จบงาน · จ่ายเงิน', rejected: 'ถูกปฏิเสธ / ปิดรับ',
}
const STATE_LABEL_EN: Record<State, string> = {
  open: 'Not applied / Open', applied: 'Applied, in review', invited: 'Invited',
  selected: 'Selected (price set)', accepted: 'Accepted · In progress', live: 'Posted / Collecting results',
  completed: 'Completed · Paid', rejected: 'Rejected / Closed',
}

// ── ข้อมูลแคมเปญตัวอย่าง (มุมของ KOL คนเดียว, platform = Instagram) ──
const CAMP = {
  title: 'Summer Collection 2026',
  brand: 'Fashion Brand Co.',
  platform: 'Instagram',
  cat: 'แฟชั่น',
  catEn: 'Fashion',
  objective: 'Awareness + Sales',
  start: '1 เม.ย. 2026', end: '30 เม.ย. 2026', deadline: '15 เม.ย. 2026',
  desc: 'โปรโมทคอลเลกชั่นแฟชั่นซัมเมอร์ 2026 ผ่านรีวิวการแต่งตัวในสไตล์ของคุณ เน้นลุคใส่จริงในชีวิตประจำวัน กลุ่มเป้าหมายผู้หญิง 18–34 ปี ที่สนใจแฟชั่นและไลฟ์สไตล์',
  descEn: 'Promote the Summer 2026 fashion collection through outfit reviews in your own style, focusing on real everyday looks. Target audience: women aged 18–34 interested in fashion and lifestyle.',
  payTerm: 'จ่ายหลังจบงาน 100% · เครดิต 30 วัน',
  payTermEn: '100% paid on completion · 30-day credit',
  budgetMin: 15000, budgetMax: 30000,
  finalPrice: 22000, bonus: 2000,
  reqFollowers: 20000, reqER: 3,
  format: 'Reel (30–60 วินาที) + 3 Stories',
  formatEn: 'Reel (30–60 sec) + 3 Stories',
  postCount: '1 Reel + 3 Stories',
  goalReach: '80,000', goalEng: '5%',
  briefText: 'ถ่ายลุคจากคอลเลกชั่นซัมเมอร์อย่างน้อย 3 เซ็ต โชว์การมิกซ์แอนด์แมตช์ในสถานที่จริง (คาเฟ่/กลางแจ้ง) เล่าจุดเด่นของเนื้อผ้าระบายอากาศและสีสันประจำซีซั่น พร้อมแนบโค้ดส่วนลดเปิดตัว',
  briefTextEn: 'Shoot at least 3 looks from the summer collection, showing mix-and-match styling in real locations (cafe / outdoors). Highlight the breathable fabric and seasonal colours, and include the launch discount code.',
  hashtags: ['#SummerVibes2026', '#FashionBrandCo', '#OOTD'],
  mentions: ['@fashionbrand.official'],
  dos: ['รีวิวด้วยภาษาของตัวเอง จริงใจ', 'แท็กแบรนด์ + ใส่ hashtag ให้ครบ', 'ส่ง draft ให้ตรวจก่อนโพสต์จริง'],
  dosEn: ['Review genuinely in your own words', 'Tag the brand + include all hashtags', 'Submit a draft for review before posting'],
  donts: ['กล่าวอ้างเกินจริง', 'เทียบคู่แข่งโดยตรง', 'ลบ/แก้โพสต์ก่อนครบ 30 วัน'],
  dontsEn: ['Make exaggerated claims', 'Directly compare with competitors', 'Delete/edit the post before 30 days'],
  refs: ['Moodboard_Summer26.pdf', 'Brand_Guideline.pdf'],
  postUrl: 'https://www.instagram.com/reel/Cx8a2b3dEf/',
  reach: '92,400', impr: '121,800', likes: '8,240', comments: '412', shares: '233',
  payAccount: 'ธ.กสิกรไทย · xxx-x-x4821-x',
  payAccountEn: 'Kasikornbank · xxx-x-x4821-x',
  payDue: '15 พ.ค. 2026', payPaid: '14 พ.ค. 2026',
}
const ME = { followers: 45200, er: 4.8, handle: '@somsai_jd' }

const money = (n: number) => `฿${n.toLocaleString()}`

// state via query / localStorage
const route = useRoute()
const state = ref<State>('open')
const wfStep = ref<number | null>(null)

onMounted(() => {
  const qsState = route.query.state as string | undefined
  if (qsState && qsState in STATES) {
    state.value = qsState as State
  }
  else {
    try {
      const ls = localStorage.getItem('ripplesCampState')
      if (ls && ls in STATES) state.value = ls as State
    }
    catch { /* ignore */ }
  }
  if (route.query.title) CAMP.title = String(route.query.title)
  if (route.query.brand) CAMP.brand = String(route.query.brand)
})

const isPriced = computed(() => (['selected', 'accepted', 'live', 'completed'] as State[]).includes(state.value))
const showWorkflow = computed(() => (['accepted', 'live', 'completed'] as State[]).includes(state.value))
const showResults = computed(() => (['live', 'completed'] as State[]).includes(state.value))
const showPayment = computed(() => state.value === 'completed')
const contractConfirmed = computed(() => (['accepted', 'live', 'completed'] as State[]).includes(state.value))

const st = computed(() => STATES[state.value])
const passF = computed(() => ME.followers >= CAMP.reqFollowers)
const passE = computed(() => ME.er >= CAMP.reqER)
const eligible = computed(() => passF.value && passE.value)
const net = computed(() => CAMP.finalPrice + CAMP.bonus)

// ── WORKFLOW (14 ขั้นตอน) ──
type WfKind = 'action' | 'review' | 'revision' | 'approved' | 'done'
const WF: { t: string, tEn: string, k: WfKind }[] = [
  { t: 'รับบรีฟงาน', tEn: 'Receive the brief', k: 'action' },
  { t: 'ยืนยัน & เซ็นสัญญา', tEn: 'Confirm & sign contract', k: 'action' },
  { t: 'ส่ง Storyline / คอนเซ็ปต์', tEn: 'Submit storyline / concept', k: 'action' },
  { t: 'แบรนด์ตรวจ Storyline', tEn: 'Brand reviews storyline', k: 'review' },
  { t: 'แก้ไข Storyline', tEn: 'Revise storyline', k: 'revision' },
  { t: 'Storyline อนุมัติ', tEn: 'Storyline approved', k: 'approved' },
  { t: 'ส่ง Draft คอนเทนต์', tEn: 'Submit content draft', k: 'action' },
  { t: 'แบรนด์ตรวจ Draft', tEn: 'Brand reviews draft', k: 'review' },
  { t: 'แก้ไข Draft', tEn: 'Revise draft', k: 'revision' },
  { t: 'Draft อนุมัติ', tEn: 'Draft approved', k: 'approved' },
  { t: 'โพสต์จริง + แนบลิงก์', tEn: 'Go live + attach link', k: 'action' },
  { t: 'ตรวจการเผยแพร่', tEn: 'Verify the post', k: 'review' },
  { t: 'ส่ง Capture Report', tEn: 'Submit capture report', k: 'action' },
  { t: 'จบงาน & รับเงิน', tEn: 'Complete & get paid', k: 'done' },
]
interface WorkMsg { who: string, when: string, whenEn: string, text: string, textEn: string }
const WORK = {
  storyline: 'เปิดด้วยช็อตเดินเข้าคาเฟ่กลางแจ้งยามเช้า → โชว์ 3 ลุคมิกซ์แอนด์แมตช์ (เดรสซัมเมอร์ / เซ็ตลินิน / ชุดเลเยอร์) เน้นช็อตโคลสอัปเนื้อผ้ากับแสงธรรมชาติ → ปิดด้วย CTA โค้ดส่วนลด',
  caption: 'ซัมเมอร์นี้ขอจัดเต็ม 3 ลุคสุดโปรดจาก @fashionbrand.official ☀️ เนื้อผ้าใส่สบายระบายอากาศดีมาก ใส่เดินทั้งวันก็ไม่ร้อน 🌿 ใช้โค้ด SUMMER15 ลดเพิ่ม 15% นะคะ #SummerVibes2026 #FashionBrandCo #OOTD',
  storylineMsg: { who: 'Fashion Brand Co.', when: '8 เม.ย. 10:20', whenEn: 'Apr 8, 10:20', text: 'Storyline ผ่านแล้วค่ะ เริ่มถ่ายได้เลย เน้นช่วงโชว์เนื้อผ้ากับแสงธรรมชาตินะคะ', textEn: 'The storyline is approved — you can start shooting. Please emphasise showing the fabric in natural light.' } as WorkMsg,
  storylineRev: { who: 'Fashion Brand Co.', when: '7 เม.ย. 16:05', whenEn: 'Apr 7, 16:05', text: 'รบกวนปรับ storyline เพิ่มช็อต flat-lay โชว์ดีเทลกระดุม + ป้ายแบรนด์ให้ชัดอีกนิดนะคะ แล้วส่งกลับมาได้เลย', textEn: 'Please tweak the storyline to add a flat-lay shot showing the button details + brand label more clearly, then send it back.' } as WorkMsg,
  draftRev: { who: 'Fashion Brand Co.', when: '11 เม.ย. 14:30', whenEn: 'Apr 11, 14:30', text: 'Draft สวยมากค่ะ! ขอปรับแคปชั่นให้ขึ้น mention แบรนด์ตั้งแต่ต้นโพสต์ แล้วโพสต์ได้เลย', textEn: 'The draft looks great! Please move the brand mention to the start of the caption, then you can post.' } as WorkMsg,
}

function wfCurrent(s: State) {
  return s === 'accepted' ? 3 : s === 'live' ? 12 : s === 'completed' ? 14 : 0
}
const effStep = computed(() => wfStep.value !== null ? wfStep.value : wfCurrent(state.value))
const wfPct = computed(() => {
  const cur = effStep.value
  return cur >= WF.length ? 100 : Math.round((cur - 1) / (WF.length - 1) * 100)
})

const PILL: Record<WfKind, [string, string, string]> = {
  action: ['bg-primary text-white', 'ต้องทำ', 'To do'],
  review: ['bg-amber-100 text-amber-700', 'รอตรวจ', 'In review'],
  revision: ['bg-red-100 text-red-600', 'ต้องแก้ไข', 'Needs revision'],
  approved: ['bg-green-100 text-green-700', 'อนุมัติ', 'Approved'],
  done: ['bg-green-100 text-green-700', 'จบงาน', 'Done'],
}

// per-step panel scheme colors (full class strings so Tailwind keeps them)
type Scheme = 'primary' | 'amber' | 'red' | 'green' | 'fuchsia'
const WRAP: Record<Scheme, { box: string, head: string, badge: string, icon: string, desc: string }> = {
  primary: { box: 'border-primary/15 bg-primary/[0.05]', head: 'text-ink', badge: 'bg-primary/10 text-primary', icon: 'text-primary', desc: 'text-primary' },
  amber: { box: 'border-amber-200 bg-amber-50', head: 'text-amber-900', badge: 'bg-amber-100 text-amber-600', icon: 'text-amber-600', desc: 'text-amber-600' },
  red: { box: 'border-red-200 bg-red-50', head: 'text-red-900', badge: 'bg-red-100 text-red-600', icon: 'text-red-600', desc: 'text-red-600' },
  green: { box: 'border-green-200 bg-green-50', head: 'text-green-900', badge: 'bg-green-100 text-green-600', icon: 'text-green-600', desc: 'text-green-600' },
  fuchsia: { box: 'border-fuchsia-200 bg-fuchsia-50', head: 'text-fuchsia-900', badge: 'bg-fuchsia-100 text-fuchsia-600', icon: 'text-fuchsia-600', desc: 'text-fuchsia-600' },
}
function wfBtnClass(scheme: Scheme) {
  return scheme === 'green' ? 'bg-green-600 hover:bg-green-700' : scheme === 'fuchsia' ? 'bg-fuchsia-600 hover:bg-fuchsia-700' : 'bg-primary hover:bg-primaryDark'
}

// editable step fields (local refs so textboxes/inputs work)
const storylineDraft = ref(WORK.storyline)
const captionDraft = ref(WORK.caption)
const postLink = ref('')

// banner config for read-only states
type BannerColor = 'amber' | 'violet' | 'sky' | 'slate'
const BANNER: Record<BannerColor, { box: string, badge: string, icon: string, title: string, sub: string }> = {
  amber: { box: 'border-amber-200 bg-amber-50', badge: 'bg-amber-100 text-amber-600', icon: 'text-amber-600', title: 'text-amber-900', sub: 'text-amber-700' },
  violet: { box: 'border-violet-200 bg-violet-50', badge: 'bg-violet-100 text-violet-600', icon: 'text-violet-600', title: 'text-violet-900', sub: 'text-violet-700' },
  sky: { box: 'border-sky-200 bg-sky-50', badge: 'bg-sky-100 text-sky-600', icon: 'text-sky-600', title: 'text-sky-900', sub: 'text-sky-700' },
  slate: { box: 'border-[#0F2747]/15 bg-surface', badge: 'bg-[#0F2747]/8 text-muted', icon: 'text-muted', title: 'text-ink', sub: 'text-muted' },
}
const statusBanner = computed<{ color: BannerColor, icon: string, title: string, sub: string } | null>(() => {
  switch (state.value) {
    case 'applied': return { color: 'amber', icon: 'clock', title: tr('ใบสมัครของคุณกำลังรอพิจารณา', 'Your application is under review'), sub: tr('แอดมินกำลังคัดเลือก KOL สำหรับแคมเปญนี้ เราจะแจ้งเตือนทันทีที่มีผล', 'The admin is selecting KOLs for this campaign. We will notify you as soon as there is a result.') }
    case 'invited': return { color: 'violet', icon: 'mail-open', title: tr('แบรนด์เชิญคุณเข้าร่วมแคมเปญนี้', 'The brand invited you to join this campaign'), sub: tr('ตอบรับคำเชิญเพื่อเข้าสู่ขั้นตอนการพิจารณาและเคาะราคา', 'Accept the invitation to move into the review and pricing stage.') }
    case 'selected': return { color: 'sky', icon: 'party-popper', title: tr('ยินดีด้วย! คุณได้รับเลือก', "Congratulations! You've been selected"), sub: tr('แอดมินเคาะราคาจริงให้แล้ว ตรวจสอบรายละเอียดงาน + ราคา แล้วตอบรับเพื่อเริ่มงาน', 'The admin has set your final price. Review the job details + price, then accept to get started.') }
    case 'rejected': return { color: 'slate', icon: 'x-circle', title: tr('แคมเปญนี้ไม่ได้เลือกคุณในรอบนี้', 'This campaign did not select you this round'), sub: tr('ขอบคุณที่สนใจ — ยังมีแคมเปญอื่นที่เหมาะกับคุณรออยู่ ลองดูเพิ่มได้เลย', "Thanks for your interest — there are other campaigns that suit you. Take a look.") }
    default: return null
  }
})

// ── action bar ──
const actionNote = computed(() => {
  switch (state.value) {
    case 'open': return eligible.value ? tr('คุณเข้าเกณฑ์ — สมัครได้เลย', "You meet the criteria — apply now") : tr('ยอดผู้ติดตาม / engagement ยังไม่ถึงเกณฑ์', 'Your followers / engagement do not meet the criteria yet')
    case 'applied': return tr('ยกเลิกใบสมัครได้ก่อนปิดรับ', 'You can withdraw your application before applications close')
    case 'invited': return tr('ตอบรับเพื่อเข้าสู่การพิจารณา', 'Accept to enter the review stage')
    case 'selected': return tr(`ราคาจริง ${money(CAMP.finalPrice)} · ${CAMP.payTerm}`, `Final price ${money(CAMP.finalPrice)} · ${CAMP.payTermEn}`)
    case 'accepted': return tr('ขั้นต่อไป: ส่ง Draft ให้แบรนด์ตรวจ', 'Next: submit a draft for the brand to review')
    case 'live': return tr('โพสต์แล้ว — เหลือส่ง capture report', 'Posted — only the capture report remains')
    case 'completed': return tr(`จ่ายแล้ว ${money(net.value)} เมื่อ ${CAMP.payPaid}`, `Paid ${money(net.value)} on ${CAMP.payPaid}`)
    case 'rejected': return tr('แคมเปญนี้ปิดสำหรับคุณแล้ว', 'This campaign is now closed for you')
    default: return ''
  }
})

// switcher panel
const switchOpen = ref(false)

// ── navigation / mutations ──
function go(s: State) {
  if (!(s in STATES)) return
  state.value = s
  wfStep.value = null
  try { localStorage.setItem('ripplesCampState', s) }
  catch { /* ignore */ }
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}
function goStep(n: number) {
  wfStep.value = Math.max(1, Math.min(WF.length, n))
  nextTick(() => scrollTo('workflowAnchor'))
}
function resetStep() {
  wfStep.value = null
}
function scrollTo(id: string) {
  if (!import.meta.client) return
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 16, behavior: 'smooth' })
}

// brief check items for step 12
const publishChecks: [string, string][] = [
  ['โพสต์เผยแพร่เป็นสาธารณะ', 'Post is published publicly'],
  ['ใส่ hashtag ครบทุกตัว', 'All hashtags included'],
  ['แท็ก @fashionbrand.official ครบ', 'Tagged @fashionbrand.official'],
]
const captureStats: [string, string][] = [['Reach', '92,400'], ['Likes', '8,240'], ['Comments', '412']]
const resultStats: [string, string, string][] = [
  ['eye', 'Reach', CAMP.reach],
  ['activity', 'Impressions', CAMP.impr],
  ['heart', 'Likes', CAMP.likes],
  ['message-circle', 'Comments', CAMP.comments],
  ['share-2', 'Shares', CAMP.shares],
]
</script>

<template>
  <div>
    <main class="mx-auto max-w-5xl px-6 pb-32 pt-8 lg:px-10 lg:pt-10">
      <NuxtLink to="/portal/campaigns" class="mb-5 inline-flex items-center gap-1.5 text-sm font-bold text-muted transition hover:text-primary"><Icon name="arrow-left" class="h-4 w-4" /> {{ tr('กลับไปหน้าแคมเปญ', 'Back to campaigns') }}</NuxtLink>

      <!-- A. HERO HEADER -->
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink to-primaryDark px-6 py-9 lg:px-10 lg:py-11">
        <div class="pointer-events-none absolute inset-0 opacity-[0.07]" style="background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:36px 36px" />
        <div class="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
        <div class="relative">
          <div class="flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold text-white backdrop-blur"><span class="h-1.5 w-1.5 rounded-full" :class="st.dot" />{{ tr(st.camp, st.campEn) }}</span>
            <span class="rounded-md bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">{{ tr(CAMP.cat, CAMP.catEn) }}</span>
            <span class="rounded-md bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">{{ CAMP.platform }}</span>
          </div>
          <h1 class="mt-4 font-heading text-3xl font-extrabold leading-tight text-white lg:text-4xl">{{ CAMP.title }}</h1>
          <p class="mt-1 text-white/70">{{ CAMP.brand }}</p>
          <div class="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 backdrop-blur"><Icon name="user-check" class="h-4 w-4 text-white" /><span class="text-sm font-bold text-white">{{ tr('สถานะของฉัน:', 'My status:') }} {{ tr(st.badge, st.badgeEn) }}</span></div>
          <div class="mt-6 flex flex-wrap gap-3">
            <div class="rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur"><p class="text-[10px] font-bold uppercase tracking-widest text-white/50">{{ tr('ช่วงแคมเปญ', 'Campaign period') }}</p><p class="mt-0.5 font-bold text-white">{{ CAMP.start }} – {{ CAMP.end }}</p></div>
            <div class="rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur"><p class="text-[10px] font-bold uppercase tracking-widest text-white/50">{{ tr('กำหนดส่งงาน', 'Submission deadline') }}</p><p class="mt-0.5 font-bold text-white">{{ CAMP.deadline }}</p></div>
            <div class="rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur">
              <p class="text-[10px] font-bold uppercase tracking-widest text-white/50">{{ isPriced ? tr('ราคาจริงที่ตกลง', 'Agreed final price') : tr('งบที่เสนอ (ช่วง)', 'Offered budget (range)') }}</p>
              <p class="mt-0.5 font-bold text-white">{{ isPriced ? money(CAMP.finalPrice) : `${money(CAMP.budgetMin)}–${money(CAMP.budgetMax)}` }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 space-y-6">
        <!-- read-only status banner -->
        <div v-if="statusBanner" class="flex items-start gap-3.5 rounded-2xl border p-5" :class="BANNER[statusBanner.color].box">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl" :class="BANNER[statusBanner.color].badge"><Icon :name="statusBanner.icon" class="h-[22px] w-[22px]" :class="BANNER[statusBanner.color].icon" /></span>
          <div>
            <p class="font-heading text-base font-bold" :class="BANNER[statusBanner.color].title">{{ statusBanner.title }}</p>
            <p class="mt-0.5 text-sm" :class="BANNER[statusBanner.color].sub">{{ statusBanner.sub }}</p>
          </div>
        </div>

        <!-- B. ภาพรวมแคมเปญ -->
        <section class="rounded-2xl border border-[#0F2747]/10 bg-white p-6 shadow-sm lg:p-8">
          <h2 class="mb-5 flex items-center gap-2.5 font-heading text-lg font-bold text-ink"><span class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon name="layout-template" class="h-5 w-5" /></span>{{ tr('ภาพรวมแคมเปญ', 'Campaign overview') }}</h2>
          <p class="text-sm leading-relaxed text-muted">{{ tr(CAMP.desc, CAMP.descEn) }}</p>
          <div class="mt-6 grid gap-5 sm:grid-cols-2">
            <div><p class="text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr('วัตถุประสงค์', 'Objective') }}</p><p class="mt-1 font-bold text-ink">{{ CAMP.objective }}</p></div>
            <div><p class="text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr('เงื่อนไขการจ่าย', 'Payment terms') }}</p><p class="mt-1 font-bold text-ink">{{ tr(CAMP.payTerm, CAMP.payTermEn) }}</p></div>
            <div class="sm:col-span-2">
              <div class="rounded-xl border border-[#0F2747]/10 bg-surface/60 p-4">
                <p class="mb-3 flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr('เกณฑ์ผู้เข้าร่วม', 'Eligibility criteria') }} <span class="rounded-full px-2 py-0.5 text-[10px]" :class="eligible ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'">{{ eligible ? tr('คุณเข้าเกณฑ์', 'You qualify') : tr('ยังไม่ครบเกณฑ์', 'Not yet eligible') }}</span></p>
                <ul class="space-y-2">
                  <li class="flex items-center gap-2.5 text-sm">
                    <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" :class="passF ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'"><Icon :name="passF ? 'check' : 'x'" class="h-3 w-3" /></span>
                    <span class="text-ink/80">{{ tr(`ผู้ติดตามขั้นต่ำ ${CAMP.reqFollowers.toLocaleString()}`, `Minimum ${CAMP.reqFollowers.toLocaleString()} followers`) }}</span><span class="ml-auto text-xs font-semibold" :class="passF ? 'text-green-600' : 'text-red-500'">{{ ME.followers.toLocaleString() }}</span>
                  </li>
                  <li class="flex items-center gap-2.5 text-sm">
                    <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full" :class="passE ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'"><Icon :name="passE ? 'check' : 'x'" class="h-3 w-3" /></span>
                    <span class="text-ink/80">Engagement rate ≥ {{ CAMP.reqER }}%</span><span class="ml-auto text-xs font-semibold" :class="passE ? 'text-green-600' : 'text-red-500'">{{ ME.er }}%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <!-- C. BRIEF งานของฉัน -->
        <section class="rounded-2xl border border-[#0F2747]/10 bg-white p-6 shadow-sm lg:p-8">
          <h2 class="mb-5 flex items-center gap-2.5 font-heading text-lg font-bold text-ink"><span class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon name="file-text" class="h-5 w-5" /></span>{{ tr('Brief งานของฉัน', 'My brief') }} <span class="ml-1 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary align-middle">{{ CAMP.platform }}</span></h2>
          <div class="grid gap-6 sm:grid-cols-2">
            <div class="sm:col-span-2 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div v-for="cell in [['แพลตฟอร์ม', 'Platform', CAMP.platform], ['รูปแบบคอนเทนต์', 'Content format', tr(CAMP.format, CAMP.formatEn)], ['จำนวนที่ต้องส่ง', 'Deliverables', CAMP.postCount], ['เป้า Reach', 'Reach goal', CAMP.goalReach], ['เป้า Engagement', 'Engagement goal', CAMP.goalEng], ['กำหนดส่ง', 'Deadline', CAMP.deadline]]" :key="cell[0]" class="rounded-xl border border-[#0F2747]/10 bg-surface/50 p-4">
                <p class="text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr(cell[0]!, cell[1]!) }}</p><p class="mt-1 font-bold text-ink">{{ cell[2] }}</p>
              </div>
            </div>
            <div class="sm:col-span-2"><p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr('รายละเอียดงาน', 'Job details') }}</p><p class="text-sm leading-relaxed text-muted">{{ tr(CAMP.briefText, CAMP.briefTextEn) }}</p></div>
            <div><p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr('Hashtag บังคับ', 'Required hashtags') }}</p><div class="flex flex-wrap gap-2"><span v-for="h in CAMP.hashtags" :key="h" class="rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">{{ h }}</span></div></div>
            <div><p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr('Mention บังคับ', 'Required mentions') }}</p><div class="flex flex-wrap gap-2"><span v-for="m in CAMP.mentions" :key="m" class="rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">{{ m }}</span></div></div>
            <div class="rounded-xl border border-green-100 bg-green-50/40 p-4"><p class="mb-2 flex items-center gap-1.5 text-sm font-bold text-green-700"><Icon name="check" class="h-4 w-4" /> {{ tr('ควรทำ', 'Do') }}</p><ul class="space-y-1.5"><li v-for="(x, i) in CAMP.dos" :key="x" class="flex items-start gap-2 text-sm text-ink/80"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" /><span>{{ tr(x, CAMP.dosEn[i]!) }}</span></li></ul></div>
            <div class="rounded-xl border border-red-100 bg-red-50/40 p-4"><p class="mb-2 flex items-center gap-1.5 text-sm font-bold text-red-600"><Icon name="x" class="h-4 w-4" /> {{ tr('ห้ามทำ', "Don't") }}</p><ul class="space-y-1.5"><li v-for="(x, i) in CAMP.donts" :key="x" class="flex items-start gap-2 text-sm text-ink/80"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" /><span>{{ tr(x, CAMP.dontsEn[i]!) }}</span></li></ul></div>
            <div class="sm:col-span-2"><p class="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr('ไฟล์อ้างอิง', 'Reference files') }}</p><div class="flex flex-wrap gap-2"><a v-for="f in CAMP.refs" :key="f" href="#" class="inline-flex items-center gap-2 rounded-lg border border-[#0F2747]/12 bg-white px-3 py-2 text-xs font-semibold text-ink transition hover:border-primary/40 hover:text-primary"><Icon name="paperclip" class="h-3.5 w-3.5" /> {{ f }}</a></div></div>
          </div>
        </section>

        <!-- D. เรื่องเงิน -->
        <section class="rounded-2xl border border-[#0F2747]/10 bg-white p-6 shadow-sm lg:p-8">
          <h2 class="mb-5 flex items-center gap-2.5 font-heading text-lg font-bold text-ink"><span class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon name="wallet" class="h-5 w-5" /></span>{{ tr('เรื่องเงิน', 'Payment') }}</h2>
          <template v-if="isPriced">
            <div class="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p class="text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr('ราคาจริงที่ตกลง (Final price)', 'Agreed final price') }}</p>
                <p class="mt-1 font-heading text-3xl font-extrabold text-primary">{{ money(CAMP.finalPrice) }}</p>
                <p class="text-xs text-[#5B6B82]/60 line-through">{{ tr(`งบที่เสนอเดิม ${money(CAMP.budgetMin)}–${money(CAMP.budgetMax)}`, `Original budget ${money(CAMP.budgetMin)}–${money(CAMP.budgetMax)}`) }}</p>
              </div>
              <div class="rounded-xl bg-surface px-4 py-2.5"><p class="text-[10px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr('เงื่อนไขการจ่าย', 'Payment terms') }}</p><p class="mt-0.5 text-sm font-bold text-ink">{{ tr(CAMP.payTerm, CAMP.payTermEn) }}</p></div>
            </div>
            <a href="#" class="mt-5 flex items-center justify-between gap-3 rounded-xl border border-[#0F2747]/12 bg-white px-4 py-3 transition hover:border-primary/40">
              <span class="flex items-center gap-2.5 text-sm font-semibold text-ink"><Icon name="file-signature" class="h-5 w-5 text-primary" /> {{ tr('ข้อตกลงการจ้างงาน (Contract)', 'Engagement agreement (Contract)') }}</span>
              <span class="flex items-center gap-1.5 text-xs font-bold" :class="contractConfirmed ? 'text-green-600' : 'text-primary'"><Icon v-if="contractConfirmed" name="check-circle" class="h-4 w-4" />{{ contractConfirmed ? tr(' ยืนยันแล้ว', ' Confirmed') : tr('กดเพื่ออ่าน & ยืนยัน', 'Tap to read & confirm') }}</span>
            </a>
          </template>
          <template v-else>
            <div>
              <p class="text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr(`งบที่เสนอสำหรับ ${CAMP.platform} (ช่วง)`, `Offered budget for ${CAMP.platform} (range)`) }}</p>
              <p class="mt-1 font-heading text-3xl font-extrabold text-primary">{{ money(CAMP.budgetMin) }} – {{ money(CAMP.budgetMax) }}</p>
              <p class="mt-2 flex items-center gap-1.5 text-xs text-muted"><Icon name="info" class="h-3.5 w-3.5" /> {{ tr('นี่คือช่วงงบของแคมเปญ — ราคาจริงจะถูกเคาะโดยแอดมินตอนคัดเลือก', "This is the campaign's budget range — your actual fee is finalised by the admin during selection.") }}</p>
            </div>
            <div class="mt-4 rounded-xl bg-surface px-4 py-3"><p class="text-[10px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr('เงื่อนไขการจ่าย', 'Payment terms') }}</p><p class="mt-0.5 text-sm font-bold text-ink">{{ tr(CAMP.payTerm, CAMP.payTermEn) }}</p></div>
          </template>
        </section>

        <!-- E. WORKFLOW -->
        <template v-if="showWorkflow">
          <div id="workflowAnchor" class="scroll-mt-6" />
          <section class="rounded-2xl border border-[#0F2747]/10 bg-white p-6 shadow-sm lg:p-8">
            <h2 class="mb-5 flex items-center gap-2.5 font-heading text-lg font-bold text-ink"><span class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon name="git-commit-vertical" class="h-5 w-5" /></span>{{ tr('งานของฉัน · Workflow', 'My work · Workflow') }}</h2>
            <div class="flex items-center justify-between gap-3">
              <p class="text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr(`ความคืบหน้า · ขั้นที่ ${effStep}/${WF.length}`, `Progress · Step ${effStep}/${WF.length}`) }}</p>
              <div class="flex items-center gap-2.5">
                <button v-if="wfStep !== null" type="button" class="text-[11px] font-bold text-primary hover:text-primaryDark" @click="resetStep">{{ tr('กลับสู่ขั้นจริง', 'Back to current step') }}</button>
                <p class="text-xs font-bold text-primary">{{ wfPct }}%</p>
              </div>
            </div>
            <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-surface"><div class="h-full rounded-full bg-primary transition-all" :style="{ width: `${wfPct}%` }" /></div>
            <p class="mt-2 flex items-center gap-1.5 text-[11px] text-[#5B6B82]/55"><Icon name="hand" class="h-3.5 w-3.5" /> {{ tr('กดที่ขั้นตอนเพื่อดูว่าหน้าตาการแสดงผลแต่ละขั้นเป็นยังไง', 'Tap a step to preview how each stage looks.') }}</p>
            <div class="mt-4 space-y-0">
              <template v-for="(step, i) in WF" :key="step.t">
                <div v-if="i > 0" class="ml-[21px] h-2 w-0.5 bg-[#0F2747]/10" />
                <button type="button" class="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition hover:bg-surface" :class="(i + 1) === effStep ? 'bg-primary/5' : ''" @click="goStep(i + 1)">
                  <span v-if="(i + 1) < effStep" class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white"><Icon name="check" class="h-4 w-4" /></span>
                  <span v-else-if="(i + 1) === effStep" class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary ring-4 ring-primary/15"><span class="h-2 w-2 animate-pulse rounded-full bg-white" /></span>
                  <span v-else class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#0F2747]/15 bg-white text-[10px] font-bold text-[#5B6B82]/45">{{ i + 1 }}</span>
                  <span class="text-sm" :class="(i + 1) === effStep ? 'font-bold text-ink' : (i + 1) < effStep ? 'text-ink/70' : 'text-[#5B6B82]/45'">{{ tr(step.t, step.tEn) }}<span v-if="step.k === 'revision'" class="text-[10px] font-normal text-[#5B6B82]/40"> {{ tr('(เฉพาะเมื่อขอแก้)', '(only if revision requested)') }}</span></span>
                  <span v-if="(i + 1) === effStep" class="ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold" :class="PILL[step.k][0]">{{ tr(PILL[step.k][1], PILL[step.k][2]) }}</span>
                  <span v-else-if="(i + 1) < effStep" class="ml-auto text-[10px] font-bold text-primary/60">{{ tr('เสร็จ', 'Done') }}</span>
                </button>
              </template>
            </div>

            <!-- per-step panel -->
            <div v-if="effStep === 1" class="mt-6 rounded-2xl border p-5" :class="WRAP.primary.box">
              <p class="flex items-center gap-2.5 font-bold" :class="WRAP.primary.head"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="WRAP.primary.badge"><Icon name="book-open" class="h-[18px] w-[18px]" /></span>{{ tr('สิ่งที่ต้องทำ: อ่านบรีฟ & ยืนยันรับงาน', 'To do: read the brief & accept the job') }}</p>
              <p class="mb-4 mt-1.5 text-sm" :class="WRAP.primary.desc">{{ tr('อ่านรายละเอียดงาน, Do / Don’t และไฟล์อ้างอิงด้านบนให้ครบ แล้วกดยืนยันเพื่อเริ่มกระบวนการ', 'Read the job details, do/don’t list, and reference files above, then confirm to start.') }}</p>
              <button type="button" class="mt-1 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition active:translate-y-0.5" :class="wfBtnClass('primary')" @click="goStep(2)"><Icon name="check" class="h-4 w-4" /> {{ tr('ยืนยันรับงาน', 'Accept the job') }}</button>
            </div>

            <div v-else-if="effStep === 2" class="mt-6 rounded-2xl border p-5" :class="WRAP.primary.box">
              <p class="flex items-center gap-2.5 font-bold" :class="WRAP.primary.head"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="WRAP.primary.badge"><Icon name="file-signature" class="h-[18px] w-[18px]" /></span>{{ tr('สิ่งที่ต้องทำ: ตรวจ & เซ็นสัญญาดิจิทัล', 'To do: review & sign the digital contract') }}</p>
              <p class="mb-4 mt-1.5 text-sm" :class="WRAP.primary.desc">{{ tr('ตรวจราคาจริงและเงื่อนไขการจ่าย แล้วเซ็นเพื่อยืนยันการรับงาน', 'Review the final price and payment terms, then sign to confirm the job.') }}</p>
              <div class="mb-3 rounded-xl border border-[#0F2747]/10 bg-white p-4"><div class="flex items-center justify-between text-sm"><span class="text-muted">{{ tr('ค่าตัว (Fee)', 'Fee') }}</span><span class="font-bold text-ink">{{ money(CAMP.finalPrice) }}</span></div><div class="mt-2 flex items-center justify-between text-sm"><span class="text-muted">{{ tr('เงื่อนไขการจ่าย', 'Payment terms') }}</span><span class="font-semibold text-ink">{{ tr(CAMP.payTerm, CAMP.payTermEn) }}</span></div></div>
              <button type="button" class="mt-1 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition active:translate-y-0.5" :class="wfBtnClass('primary')" @click="goStep(3)"><Icon name="pen-tool" class="h-4 w-4" /> {{ tr('เซ็นสัญญา & ไปต่อ', 'Sign & continue') }}</button>
            </div>

            <div v-else-if="effStep === 3" class="mt-6 rounded-2xl border p-5" :class="WRAP.primary.box">
              <p class="flex items-center gap-2.5 font-bold" :class="WRAP.primary.head"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="WRAP.primary.badge"><Icon name="lightbulb" class="h-[18px] w-[18px]" /></span>{{ tr('สิ่งที่ต้องทำ: ส่ง Storyline / คอนเซ็ปต์', 'To do: submit storyline / concept') }}</p>
              <p class="mb-4 mt-1.5 text-sm" :class="WRAP.primary.desc">{{ tr('อธิบายไอเดีย ลำดับการเล่าเรื่อง และมู้ดของคอนเทนต์ก่อนถ่ายจริง', 'Describe your idea, narrative flow, and content mood before shooting.') }}</p>
              <div class="mb-3"><label class="mb-1 block text-sm font-semibold text-ink">{{ tr('Storyline / คอนเซ็ปต์', 'Storyline / concept') }}</label><textarea v-model="storylineDraft" rows="3" class="w-full rounded-lg border border-[#0F2747]/15 bg-white px-4 py-2.5 text-sm leading-relaxed text-ink outline-none focus:border-primary/50" /></div>
              <div class="mb-3"><label class="mb-1 block text-sm font-semibold text-ink">{{ tr('แนบ Moodboard (ถ้ามี)', 'Attach a moodboard (optional)') }}</label><label class="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#0F2747]/15 bg-white p-3 transition hover:border-primary/50"><Icon name="upload" class="h-5 w-5 text-[#5B6B82]/60" /><span class="text-sm text-muted">{{ tr('คลิกเพื่อเลือกไฟล์ หรือลากมาวาง', 'Click to choose a file or drag and drop') }}</span><input type="file" class="hidden" /></label></div>
              <button type="button" class="mt-1 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition active:translate-y-0.5" :class="wfBtnClass('primary')" @click="goStep(4)"><Icon name="send" class="h-4 w-4" /> {{ tr('ส่ง Storyline ให้แบรนด์ตรวจ', 'Submit storyline for review') }}</button>
            </div>

            <div v-else-if="effStep === 4" class="mt-6 rounded-2xl border p-5" :class="WRAP.amber.box">
              <p class="flex items-center gap-2.5 font-bold" :class="WRAP.amber.head"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="WRAP.amber.badge"><Icon name="clock" class="h-[18px] w-[18px]" /></span>{{ tr('รอแบรนด์ตรวจ Storyline', 'Waiting for the brand to review the storyline') }}</p>
              <p class="mb-4 mt-1.5 text-sm" :class="WRAP.amber.desc">{{ tr('ส่ง Storyline เรียบร้อย ปกติแบรนด์ใช้เวลาตรวจ 1–2 วันทำการ', 'Storyline submitted. Brands usually take 1–2 business days to review.') }}</p>
              <div class="mb-3 rounded-xl border border-[#0F2747]/10 bg-white p-4"><p class="mb-1 text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr('Storyline ที่ส่งไป', 'Submitted storyline') }}</p><p class="text-sm leading-relaxed text-ink/80">{{ storylineDraft }}</p></div>
              <div class="mb-3 flex items-center gap-2 rounded-xl border border-[#0F2747]/10 bg-white px-4 py-3 text-sm text-muted"><Icon name="message-square-dashed" class="h-4 w-4" /> {{ tr('ยังไม่มี feedback จากแบรนด์', 'No feedback from the brand yet') }}</div>
              <div class="mt-2 rounded-xl border border-dashed border-[#0F2747]/15 bg-white/60 p-3"><p class="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55"><Icon name="git-branch" class="h-3.5 w-3.5" /> {{ tr('จำลองผลการตรวจ', 'Simulate review outcome') }}</p><div class="flex flex-wrap gap-2">
                <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-2 text-xs font-bold transition border-red-200 text-red-600 hover:bg-red-50" @click="goStep(5)"><Icon name="rotate-ccw" class="h-3.5 w-3.5" /> {{ tr('แบรนด์ขอแก้', 'Brand requests changes') }}</button>
                <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-2 text-xs font-bold transition border-green-200 text-green-700 hover:bg-green-50" @click="goStep(6)"><Icon name="check" class="h-3.5 w-3.5" /> {{ tr('แบรนด์อนุมัติ', 'Brand approves') }}</button>
              </div></div>
            </div>

            <div v-else-if="effStep === 5" class="mt-6 rounded-2xl border p-5" :class="WRAP.red.box">
              <p class="flex items-center gap-2.5 font-bold" :class="WRAP.red.head"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="WRAP.red.badge"><Icon name="rotate-ccw" class="h-[18px] w-[18px]" /></span>{{ tr('ต้องแก้ไข: Storyline', 'Needs revision: storyline') }}</p>
              <p class="mb-4 mt-1.5 text-sm" :class="WRAP.red.desc">{{ tr('แบรนด์ขอปรับ storyline ดูคอมเมนต์ด้านล่างแล้วแก้ส่งกลับ', 'The brand requested storyline changes. Review the comment below, revise, and resend.') }}</p>
              <div class="mb-3 space-y-2.5"><div class="flex gap-2.5"><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">FB</div><div><div class="rounded-2xl rounded-tl-md bg-white px-4 py-2.5 text-sm leading-relaxed text-ink shadow-sm">{{ tr(WORK.storylineRev.text, WORK.storylineRev.textEn) }}</div><p class="mt-1 text-[10px] text-[#5B6B82]/50">{{ WORK.storylineRev.who }} · {{ tr(WORK.storylineRev.when, WORK.storylineRev.whenEn) }}</p></div></div></div>
              <div class="mb-3"><label class="mb-1 block text-sm font-semibold text-ink">{{ tr('Storyline (แก้ไขแล้ว)', 'Storyline (revised)') }}</label><textarea v-model="storylineDraft" rows="3" class="w-full rounded-lg border border-[#0F2747]/15 bg-white px-4 py-2.5 text-sm leading-relaxed text-ink outline-none focus:border-primary/50" /></div>
              <div class="mb-3"><label class="mb-1 block text-sm font-semibold text-ink">{{ tr('แนบ Moodboard เพิ่มเติม', 'Attach an additional moodboard') }}</label><label class="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#0F2747]/15 bg-white p-3 transition hover:border-primary/50"><Icon name="upload" class="h-5 w-5 text-[#5B6B82]/60" /><span class="text-sm text-muted">{{ tr('คลิกเพื่อเลือกไฟล์ หรือลากมาวาง', 'Click to choose a file or drag and drop') }}</span><input type="file" class="hidden" /></label></div>
              <button type="button" class="mt-1 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition active:translate-y-0.5" :class="wfBtnClass('primary')" @click="goStep(4)"><Icon name="send" class="h-4 w-4" /> {{ tr('ส่ง Storyline ที่แก้แล้ว', 'Send revised storyline') }}</button>
            </div>

            <div v-else-if="effStep === 6" class="mt-6 rounded-2xl border p-5" :class="WRAP.green.box">
              <p class="flex items-center gap-2.5 font-bold" :class="WRAP.green.head"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="WRAP.green.badge"><Icon name="check-circle" class="h-[18px] w-[18px]" /></span>{{ tr('Storyline อนุมัติแล้ว', 'Storyline approved') }}</p>
              <p class="mb-4 mt-1.5 text-sm" :class="WRAP.green.desc">{{ tr('แบรนด์อนุมัติคอนเซ็ปต์แล้ว เริ่มถ่ายทำได้เลย', 'The brand approved your concept — you can start shooting.') }}</p>
              <div class="mb-3 space-y-2.5"><div class="flex gap-2.5"><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">FB</div><div><div class="rounded-2xl rounded-tl-md bg-white px-4 py-2.5 text-sm leading-relaxed text-ink shadow-sm">{{ tr(WORK.storylineMsg.text, WORK.storylineMsg.textEn) }}</div><p class="mt-1 text-[10px] text-[#5B6B82]/50">{{ WORK.storylineMsg.who }} · {{ tr(WORK.storylineMsg.when, WORK.storylineMsg.whenEn) }}</p></div></div></div>
              <button type="button" class="mt-1 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition active:translate-y-0.5" :class="wfBtnClass('green')" @click="goStep(7)"><Icon name="arrow-right" class="h-4 w-4" /> {{ tr('เริ่มถ่าย & ไปส่ง Draft', 'Start shooting & submit draft') }}</button>
            </div>

            <div v-else-if="effStep === 7" class="mt-6 rounded-2xl border p-5" :class="WRAP.primary.box">
              <p class="flex items-center gap-2.5 font-bold" :class="WRAP.primary.head"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="WRAP.primary.badge"><Icon name="image" class="h-[18px] w-[18px]" /></span>{{ tr('สิ่งที่ต้องทำ: ส่ง Draft คอนเทนต์', 'To do: submit content draft') }}</p>
              <p class="mb-4 mt-1.5 text-sm" :class="WRAP.primary.desc">{{ tr('อัปโหลดคอนเทนต์ที่ถ่าย/ตัดต่อเสร็จ พร้อมแคปชั่น ให้แบรนด์ตรวจก่อนโพสต์จริง', 'Upload your finished content and caption for the brand to review before going live.') }}</p>
              <div class="mb-3"><label class="mb-1 block text-sm font-semibold text-ink">{{ tr('Draft (รูป / วิดีโอ Reel)', 'Draft (photo / Reel video)') }}</label><label class="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#0F2747]/15 bg-white p-3 transition hover:border-primary/50"><Icon name="upload" class="h-5 w-5 text-[#5B6B82]/60" /><span class="text-sm text-muted">{{ tr('คลิกเพื่อเลือกไฟล์ หรือลากมาวาง', 'Click to choose a file or drag and drop') }}</span><input type="file" class="hidden" /></label></div>
              <div class="mb-3"><label class="mb-1 block text-sm font-semibold text-ink">{{ tr('แคปชั่นประกอบโพสต์', 'Post caption') }}</label><textarea v-model="captionDraft" rows="3" class="w-full rounded-lg border border-[#0F2747]/15 bg-white px-4 py-2.5 text-sm leading-relaxed text-ink outline-none focus:border-primary/50" /></div>
              <button type="button" class="mt-1 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition active:translate-y-0.5" :class="wfBtnClass('primary')" @click="goStep(8)"><Icon name="send" class="h-4 w-4" /> {{ tr('ส่ง Draft ให้แบรนด์ตรวจ', 'Submit draft for review') }}</button>
            </div>

            <div v-else-if="effStep === 8" class="mt-6 rounded-2xl border p-5" :class="WRAP.amber.box">
              <p class="flex items-center gap-2.5 font-bold" :class="WRAP.amber.head"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="WRAP.amber.badge"><Icon name="clock" class="h-[18px] w-[18px]" /></span>{{ tr('รอแบรนด์ตรวจ Draft', 'Waiting for the brand to review the draft') }}</p>
              <p class="mb-4 mt-1.5 text-sm" :class="WRAP.amber.desc">{{ tr('ส่ง Draft แล้ว รอแบรนด์ตรวจก่อนอนุมัติให้โพสต์', 'Draft submitted. Waiting for the brand to review before approving the post.') }}</p>
              <div class="mb-3"><label class="mb-1 block text-sm font-semibold text-ink">{{ tr('Draft ที่ส่งไป', 'Submitted draft') }}</label><label class="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#0F2747]/15 bg-white p-3 transition hover:border-primary/50"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon name="file-check-2" class="h-5 w-5" /></span><span class="truncate text-sm font-semibold text-ink">summer_reel_draft_v1.mp4</span><Icon name="check-circle" class="ml-auto h-4 w-4 text-green-500" /><input type="file" class="hidden" /></label></div>
              <div class="mb-3 rounded-xl border border-[#0F2747]/10 bg-white p-4"><p class="mb-1 text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr('แคปชั่นที่ส่งไป', 'Submitted caption') }}</p><p class="text-sm leading-relaxed text-ink/80">{{ captionDraft }}</p></div>
              <div class="mt-2 rounded-xl border border-dashed border-[#0F2747]/15 bg-white/60 p-3"><p class="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55"><Icon name="git-branch" class="h-3.5 w-3.5" /> {{ tr('จำลองผลการตรวจ', 'Simulate review outcome') }}</p><div class="flex flex-wrap gap-2">
                <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-2 text-xs font-bold transition border-red-200 text-red-600 hover:bg-red-50" @click="goStep(9)"><Icon name="rotate-ccw" class="h-3.5 w-3.5" /> {{ tr('แบรนด์ขอแก้', 'Brand requests changes') }}</button>
                <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-2 text-xs font-bold transition border-green-200 text-green-700 hover:bg-green-50" @click="goStep(10)"><Icon name="check" class="h-3.5 w-3.5" /> {{ tr('แบรนด์อนุมัติ', 'Brand approves') }}</button>
              </div></div>
            </div>

            <div v-else-if="effStep === 9" class="mt-6 rounded-2xl border p-5" :class="WRAP.red.box">
              <p class="flex items-center gap-2.5 font-bold" :class="WRAP.red.head"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="WRAP.red.badge"><Icon name="rotate-ccw" class="h-[18px] w-[18px]" /></span>{{ tr('ต้องแก้ไข: Draft', 'Needs revision: draft') }}</p>
              <p class="mb-4 mt-1.5 text-sm" :class="WRAP.red.desc">{{ tr('แบรนด์ขอปรับ draft ดูคอมเมนต์แล้วส่งใหม่', 'The brand requested draft changes. Review the comment and resend.') }}</p>
              <div class="mb-3 space-y-2.5"><div class="flex gap-2.5"><div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">FB</div><div><div class="rounded-2xl rounded-tl-md bg-white px-4 py-2.5 text-sm leading-relaxed text-ink shadow-sm">{{ tr(WORK.draftRev.text, WORK.draftRev.textEn) }}</div><p class="mt-1 text-[10px] text-[#5B6B82]/50">{{ WORK.draftRev.who }} · {{ tr(WORK.draftRev.when, WORK.draftRev.whenEn) }}</p></div></div></div>
              <div class="mb-3"><label class="mb-1 block text-sm font-semibold text-ink">{{ tr('Draft (แก้ไขแล้ว)', 'Draft (revised)') }}</label><label class="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#0F2747]/15 bg-white p-3 transition hover:border-primary/50"><Icon name="upload" class="h-5 w-5 text-[#5B6B82]/60" /><span class="text-sm text-muted">{{ tr('คลิกเพื่อเลือกไฟล์ หรือลากมาวาง', 'Click to choose a file or drag and drop') }}</span><input type="file" class="hidden" /></label></div>
              <div class="mb-3"><label class="mb-1 block text-sm font-semibold text-ink">{{ tr('แคปชั่น (แก้ไขแล้ว)', 'Caption (revised)') }}</label><textarea v-model="captionDraft" rows="3" class="w-full rounded-lg border border-[#0F2747]/15 bg-white px-4 py-2.5 text-sm leading-relaxed text-ink outline-none focus:border-primary/50" /></div>
              <button type="button" class="mt-1 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition active:translate-y-0.5" :class="wfBtnClass('primary')" @click="goStep(8)"><Icon name="send" class="h-4 w-4" /> {{ tr('ส่ง Draft ที่แก้แล้ว', 'Send revised draft') }}</button>
            </div>

            <div v-else-if="effStep === 10" class="mt-6 rounded-2xl border p-5" :class="WRAP.green.box">
              <p class="flex items-center gap-2.5 font-bold" :class="WRAP.green.head"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="WRAP.green.badge"><Icon name="rocket" class="h-[18px] w-[18px]" /></span>{{ tr('Draft อนุมัติแล้ว — พร้อมโพสต์', 'Draft approved — ready to post') }}</p>
              <p class="mb-4 mt-1.5 text-sm" :class="WRAP.green.desc">{{ tr('แบรนด์อนุมัติคอนเทนต์แล้ว โพสต์ลงแพลตฟอร์มจริงได้เลย', 'The brand approved your content — you can post it to the live platform.') }}</p>
              <button type="button" class="mt-1 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition active:translate-y-0.5" :class="wfBtnClass('green')" @click="goStep(11)"><Icon name="arrow-right" class="h-4 w-4" /> {{ tr('ไปขั้นโพสต์จริง', 'Go to the posting step') }}</button>
            </div>

            <div v-else-if="effStep === 11" class="mt-6 rounded-2xl border p-5" :class="WRAP.fuchsia.box">
              <p class="flex items-center gap-2.5 font-bold" :class="WRAP.fuchsia.head"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="WRAP.fuchsia.badge"><Icon name="link" class="h-[18px] w-[18px]" /></span>{{ tr('สิ่งที่ต้องทำ: โพสต์จริง + แนบลิงก์', 'To do: go live + attach link') }}</p>
              <p class="mb-4 mt-1.5 text-sm" :class="WRAP.fuchsia.desc">{{ tr('โพสต์คอนเทนต์ที่อนุมัติแล้วลงบัญชีจริง แล้ววางลิงก์โพสต์ที่นี่', 'Post the approved content to your live account, then paste the post link here.') }}</p>
              <div class="mb-3"><label class="mb-1 block text-sm font-semibold text-ink">{{ tr('ลิงก์โพสต์จริง', 'Live post link') }}</label><input v-model="postLink" class="w-full rounded-lg border border-[#0F2747]/15 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-primary/50" placeholder="https://www.instagram.com/reel/..." /></div>
              <button type="button" class="mt-1 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition active:translate-y-0.5" :class="wfBtnClass('fuchsia')" @click="goStep(12)"><Icon name="check" class="h-4 w-4" /> {{ tr('ยืนยันการโพสต์', 'Confirm the post') }}</button>
            </div>

            <div v-else-if="effStep === 12" class="mt-6 rounded-2xl border p-5" :class="WRAP.amber.box">
              <p class="flex items-center gap-2.5 font-bold" :class="WRAP.amber.head"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="WRAP.amber.badge"><Icon name="search-check" class="h-[18px] w-[18px]" /></span>{{ tr('ตรวจการเผยแพร่', 'Verify the post') }}</p>
              <p class="mb-4 mt-1.5 text-sm" :class="WRAP.amber.desc">{{ tr('ระบบ/แบรนด์ตรวจว่าโพสต์ตรงตามบรีฟ และจะคงโพสต์ไว้จนครบกำหนด', 'The system/brand checks the post matches the brief, and it stays live until the required period ends.') }}</p>
              <a :href="CAMP.postUrl" target="_blank" class="mb-3 flex items-center justify-between gap-3 rounded-xl border border-[#0F2747]/12 bg-white px-4 py-3 transition hover:border-primary/40"><span class="flex min-w-0 items-center gap-2.5 text-sm font-semibold text-ink"><Icon name="instagram" class="h-[18px] w-[18px] shrink-0 text-primary" /><span class="truncate">{{ CAMP.postUrl }}</span></span><Icon name="external-link" class="h-4 w-4 shrink-0 text-muted" /></a>
              <div class="mb-3 space-y-2 rounded-xl border border-[#0F2747]/10 bg-white p-4"><div v-for="it in publishChecks" :key="it[0]" class="flex items-center gap-2.5 text-sm"><span class="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600"><Icon name="check" class="h-3 w-3" /></span><span class="text-ink/80">{{ tr(it[0], it[1]) }}</span></div></div>
              <div class="mt-2 rounded-xl border border-dashed border-[#0F2747]/15 bg-white/60 p-3"><p class="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55"><Icon name="git-branch" class="h-3.5 w-3.5" /> {{ tr('จำลองผลการตรวจ', 'Simulate review outcome') }}</p><div class="flex flex-wrap gap-2">
                <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border bg-white px-3 py-2 text-xs font-bold transition border-green-200 text-green-700 hover:bg-green-50" @click="goStep(13)"><Icon name="check" class="h-3.5 w-3.5" /> {{ tr('ผ่านการตรวจ → เก็บผล', 'Passed → collect results') }}</button>
              </div></div>
            </div>

            <div v-else-if="effStep === 13" class="mt-6 rounded-2xl border p-5" :class="WRAP.fuchsia.box">
              <p class="flex items-center gap-2.5 font-bold" :class="WRAP.fuchsia.head"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="WRAP.fuchsia.badge"><Icon name="bar-chart-3" class="h-[18px] w-[18px]" /></span>{{ tr('สิ่งที่ต้องทำ: ส่ง Capture Report', 'To do: submit capture report') }}</p>
              <p class="mb-4 mt-1.5 text-sm" :class="WRAP.fuchsia.desc">{{ tr('หลังโพสต์ครบ 48 ชม. แนบสกรีนช็อตสถิติจริงจากแพลตฟอร์ม', 'After the post has been live for 48 hours, attach screenshots of the real platform stats.') }}</p>
              <div class="mb-3"><label class="mb-1 block text-sm font-semibold text-ink">{{ tr('สกรีนช็อต Insights', 'Insights screenshot') }}</label><label class="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#0F2747]/15 bg-white p-3 transition hover:border-primary/50"><Icon name="upload" class="h-5 w-5 text-[#5B6B82]/60" /><span class="text-sm text-muted">{{ tr('คลิกเพื่อเลือกไฟล์ หรือลากมาวาง', 'Click to choose a file or drag and drop') }}</span><input type="file" class="hidden" /></label></div>
              <div class="mb-3 grid grid-cols-3 gap-2"><div v-for="x in captureStats" :key="x[0]"><label class="mb-1 block text-xs font-semibold text-ink">{{ x[0] }}</label><input class="w-full rounded-lg border border-[#0F2747]/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-primary/50" :placeholder="x[1]" /></div></div>
              <button type="button" class="mt-1 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold text-white transition active:translate-y-0.5" :class="wfBtnClass('fuchsia')" @click="goStep(14)"><Icon name="send" class="h-4 w-4" /> {{ tr('ส่ง Capture Report', 'Submit capture report') }}</button>
            </div>

            <div v-else-if="effStep === 14" class="mt-6 rounded-2xl border p-5" :class="WRAP.green.box">
              <p class="flex items-center gap-2.5 font-bold" :class="WRAP.green.head"><span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" :class="WRAP.green.badge"><Icon name="party-popper" class="h-[18px] w-[18px]" /></span>{{ tr('จบงานสมบูรณ์ทุกขั้นตอน', 'All steps completed') }}</p>
              <p class="mb-4 mt-1.5 text-sm" :class="WRAP.green.desc">{{ tr('ขอบคุณสำหรับผลงานที่ยอดเยี่ยม! ดูผลลัพธ์และการจ่ายเงินด้านล่าง', 'Thank you for the great work! See your results and payment below.') }}</p>
              <div class="flex flex-wrap gap-2">
                <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-white px-3 py-2 text-xs font-bold text-green-700 transition hover:bg-green-50" @click="scrollTo('resultsAnchor')"><Icon name="bar-chart-3" class="h-3.5 w-3.5" /> {{ tr('ดูผลลัพธ์โพสต์', 'View post results') }}</button>
                <button type="button" class="inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-white px-3 py-2 text-xs font-bold text-green-700 transition hover:bg-green-50" @click="scrollTo('paymentAnchor')"><Icon name="banknote" class="h-3.5 w-3.5" /> {{ tr('ดูการจ่ายเงิน', 'View payment') }}</button>
              </div>
            </div>
          </section>
        </template>

        <!-- F. ผลลัพธ์โพสต์ -->
        <div id="resultsAnchor" class="scroll-mt-6" />
        <section v-if="showResults" class="rounded-2xl border border-[#0F2747]/10 bg-white p-6 shadow-sm lg:p-8">
          <h2 class="mb-5 flex items-center gap-2.5 font-heading text-lg font-bold text-ink"><span class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon name="bar-chart-3" class="h-5 w-5" /></span>{{ tr('ผลลัพธ์โพสต์ของฉัน', 'My post results') }}</h2>
          <a :href="CAMP.postUrl" target="_blank" class="mb-5 flex items-center justify-between gap-3 rounded-xl border border-[#0F2747]/12 bg-white px-4 py-3 transition hover:border-primary/40"><span class="flex min-w-0 items-center gap-2.5 text-sm font-semibold text-ink"><Icon name="link" class="h-[18px] w-[18px] shrink-0 text-primary" /><span class="truncate">{{ CAMP.postUrl }}</span></span><Icon name="external-link" class="h-4 w-4 shrink-0 text-muted" /></a>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-5">
            <div v-for="s in resultStats" :key="s[1]" class="rounded-xl border border-[#0F2747]/10 bg-surface/50 p-4 text-center"><Icon :name="s[0]" class="mx-auto h-5 w-5 text-primary" /><p class="mt-2 font-heading text-xl font-extrabold text-ink">{{ s[2] }}</p><p class="text-[11px] text-muted">{{ s[1] }}</p></div>
          </div>
          <p class="mt-4 flex items-center gap-1.5 rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-700"><Icon name="trending-up" class="h-4 w-4" /> {{ tr(`Reach ทำได้ ${CAMP.reach} — เกินเป้า ${CAMP.goalReach} ของแคมเปญ`, `Reach hit ${CAMP.reach} — exceeding the campaign goal of ${CAMP.goalReach}`) }}</p>
        </section>

        <!-- G. การจ่ายเงิน -->
        <div id="paymentAnchor" class="scroll-mt-6" />
        <section v-if="showPayment" class="rounded-2xl border border-[#0F2747]/10 bg-white p-6 shadow-sm lg:p-8">
          <h2 class="mb-5 flex items-center gap-2.5 font-heading text-lg font-bold text-ink"><span class="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon name="banknote" class="h-5 w-5" /></span>{{ tr('การจ่ายเงิน', 'Payment') }}</h2>
          <div class="grid gap-5 sm:grid-cols-2">
            <div class="rounded-xl border border-[#0F2747]/10 bg-surface/50 p-5">
              <div class="flex items-center justify-between text-sm"><span class="text-muted">{{ tr('ค่าตัว (Fee)', 'Fee') }}</span><span class="font-semibold text-ink">{{ money(CAMP.finalPrice) }}</span></div>
              <div class="mt-2 flex items-center justify-between text-sm"><span class="text-muted">{{ tr('โบนัส (เกินเป้า engagement)', 'Bonus (exceeded engagement goal)') }}</span><span class="font-semibold text-green-600">+{{ money(CAMP.bonus) }}</span></div>
              <div class="mt-3 border-t border-[#0F2747]/10 pt-3 flex items-center justify-between"><span class="text-sm font-bold text-ink">{{ tr('ยอดสุทธิ', 'Net total') }}</span><span class="font-heading text-2xl font-extrabold text-primary">{{ money(net) }}</span></div>
            </div>
            <div class="space-y-3">
              <div class="flex items-center gap-2.5 rounded-xl border border-green-200 bg-green-50 px-4 py-3"><span class="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600"><Icon name="check" class="h-4 w-4" /></span><div><p class="text-sm font-bold text-green-800">{{ tr('จ่ายแล้ว', 'Paid') }}</p><p class="text-xs text-green-600">{{ tr(`โอนเมื่อ ${CAMP.payPaid}`, `Transferred on ${CAMP.payPaid}`) }}</p></div></div>
              <div><p class="text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr('บัญชีที่รับเงิน', 'Receiving account') }}</p><p class="mt-1 font-bold text-ink">{{ tr(CAMP.payAccount, CAMP.payAccountEn) }}</p></div>
              <a href="#" class="flex items-center justify-between gap-2 rounded-xl border border-[#0F2747]/12 bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-primary/40 hover:text-primary"><span class="flex items-center gap-2"><Icon name="receipt" class="h-[18px] w-[18px] text-primary" /> {{ tr('สลิปการโอนเงิน', 'Transfer slip') }}</span><Icon name="download" class="h-4 w-4" /></a>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- H. sticky action bar -->
    <div class="fixed inset-x-0 bottom-0 z-40 border-t border-[#0F2747]/10 bg-white/95 backdrop-blur-md lg:left-72">
      <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3.5 lg:px-10">
        <div class="min-w-0"><p class="truncate text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/55">{{ tr('สิ่งที่ต้องทำต่อ', 'Next step') }}</p><p class="truncate text-sm font-semibold text-ink">{{ actionNote }}</p></div>
        <div class="flex shrink-0 items-center gap-2.5">
          <!-- open -->
          <template v-if="state === 'open'">
            <button v-if="eligible" type="button" class="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgb(45_91_255_/_70%)] transition hover:bg-primaryDark active:translate-y-0.5" @click="go('applied')"><Icon name="send" class="h-4 w-4" /> {{ tr('สมัครเข้าร่วมแคมเปญ', 'Apply to this campaign') }}</button>
            <button v-else disabled type="button" class="flex items-center justify-center gap-2 rounded-xl bg-surface px-6 py-3.5 text-sm font-bold text-[#5B6B82]/45">{{ tr('ยังไม่เข้าเกณฑ์', 'Not eligible') }}</button>
          </template>
          <!-- applied -->
          <template v-else-if="state === 'applied'">
            <button type="button" class="rounded-xl border border-[#0F2747]/12 bg-white px-5 py-3.5 text-sm font-bold text-muted transition hover:border-red-300 hover:text-red-500" @click="go('open')">{{ tr('ยกเลิกใบสมัคร', 'Withdraw application') }}</button>
            <button disabled type="button" class="flex items-center justify-center gap-2 rounded-xl bg-amber-50 px-6 py-3.5 text-sm font-bold text-amber-600"><Icon name="clock" class="h-4 w-4" /> {{ tr('รอผลการพิจารณา', 'Awaiting review') }}</button>
          </template>
          <!-- invited -->
          <template v-else-if="state === 'invited'">
            <button type="button" class="rounded-xl border border-[#0F2747]/12 bg-white px-5 py-3.5 text-sm font-bold text-muted transition hover:border-red-300 hover:text-red-500" @click="go('rejected')">{{ tr('ปฏิเสธ', 'Decline') }}</button>
            <button type="button" class="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgb(45_91_255_/_70%)] transition hover:bg-primaryDark active:translate-y-0.5" @click="go('applied')"><Icon name="check" class="h-4 w-4" /> {{ tr('ตอบรับคำเชิญ', 'Accept invitation') }}</button>
          </template>
          <!-- selected -->
          <template v-else-if="state === 'selected'">
            <button type="button" class="rounded-xl border border-[#0F2747]/12 bg-white px-5 py-3.5 text-sm font-bold text-muted transition hover:border-red-300 hover:text-red-500" @click="go('rejected')">{{ tr('ปฏิเสธงาน', 'Decline job') }}</button>
            <button type="button" class="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgb(45_91_255_/_70%)] transition hover:bg-primaryDark active:translate-y-0.5" @click="go('accepted')"><Icon name="check-circle" class="h-4 w-4" /> {{ tr('ตอบรับงาน', 'Accept job') }} · {{ money(CAMP.finalPrice) }}</button>
          </template>
          <!-- accepted -->
          <template v-else-if="state === 'accepted'">
            <button type="button" class="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgb(45_91_255_/_70%)] transition hover:bg-primaryDark active:translate-y-0.5" @click="scrollTo('workflowAnchor')"><Icon name="arrow-down" class="h-4 w-4" /> {{ tr('ไปที่งานของฉัน · ส่ง Draft', 'Go to my work · submit draft') }}</button>
          </template>
          <!-- live -->
          <template v-else-if="state === 'live'">
            <button type="button" class="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgb(45_91_255_/_70%)] transition hover:bg-primaryDark active:translate-y-0.5" @click="scrollTo('workflowAnchor')"><Icon name="bar-chart-3" class="h-4 w-4" /> {{ tr('ส่ง Capture Report', 'Submit capture report') }}</button>
          </template>
          <!-- completed -->
          <template v-else-if="state === 'completed'">
            <button type="button" class="rounded-xl border border-[#0F2747]/12 bg-white px-5 py-3.5 text-sm font-bold text-muted transition hover:border-red-300 hover:text-red-500">{{ tr('ดาวน์โหลดใบเสร็จ', 'Download receipt') }}</button>
            <button type="button" class="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_24px_-10px_rgb(45_91_255_/_70%)] transition hover:bg-primaryDark active:translate-y-0.5"><Icon name="receipt" class="h-4 w-4" /> {{ tr('ดูสลิปการโอน', 'View transfer slip') }}</button>
          </template>
          <!-- rejected -->
          <template v-else-if="state === 'rejected'">
            <NuxtLink to="/portal/campaigns" class="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primaryDark"><Icon name="search" class="h-4 w-4" /> {{ tr('ดูแคมเปญอื่น', 'Browse other campaigns') }}</NuxtLink>
          </template>
        </div>
      </div>
    </div>

    <!-- demo state switcher -->
    <div class="fixed bottom-24 right-4 z-50 lg:bottom-6 lg:right-6">
      <button type="button" class="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-primaryDark" @click="switchOpen = !switchOpen">
        <Icon name="layers" class="h-4 w-4" /> <span>{{ tr('พรีวิวสถานะ', 'Preview status') }}</span>
      </button>
      <div v-show="switchOpen" class="absolute bottom-12 right-0 w-60 rounded-2xl border border-[#0F2747]/10 bg-white p-2 shadow-2xl">
        <p class="px-2 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#5B6B82]/50">{{ tr('สถานะของฉันในแคมเปญ (เดโม)', 'My status in the campaign (demo)') }}</p>
        <div class="space-y-0.5">
          <button v-for="k in STATE_ORDER" :key="k" type="button" class="flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-left text-xs font-semibold transition" :class="k === state ? 'bg-primary text-white' : 'text-ink hover:bg-surface'" @click="go(k)">
            <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold" :class="k === state ? 'bg-white/25 text-white' : 'bg-surface text-muted'">{{ STATES[k].n }}</span>
            {{ tr(STATE_LABEL[k], STATE_LABEL_EN[k]) }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
