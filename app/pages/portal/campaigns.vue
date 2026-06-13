<script setup lang="ts">
const { tr } = useLocale()
definePageMeta({ layout: 'portal', middleware: 'auth' })
useHead(() => ({ title: tr('แคมเปญ — Ripples', 'Campaigns — Ripples') }))

type AppState = 'none' | 'applied' | 'invited' | 'selected' | 'closed'
interface Campaign {
  t: string
  b: string
  plat: string
  cat: string
  d: string
  dEn: string
  j: number
  n: number
  end: string
  min: number
  max: number
  app: AppState
  final?: number
  img: string
  logo: string
}

// category keys are Thai (used for filtering); English labels via catEn lookup
const cats = ['ทั้งหมด', 'แฟชั่น', 'ความงาม', 'อาหาร', 'เทคโนโลยี', 'ไลฟ์สไตล์', 'ฟิตเนส']
const catEn: Record<string, string> = {
  'ทั้งหมด': 'All',
  'แฟชั่น': 'Fashion',
  'ความงาม': 'Beauty',
  'อาหาร': 'Food',
  'เทคโนโลยี': 'Technology',
  'ไลฟ์สไตล์': 'Lifestyle',
  'ฟิตเนส': 'Fitness',
}
const catLabel = (c: string) => tr(c, catEn[c] ?? c)

// app: none(เปิดรับ) / applied(สมัครแล้ว รอคัดเลือก) / invited(ได้รับเชิญ เคาะราคาแล้ว) / selected(ได้รับเลือก กำลังทำ) / closed
const baseCampaigns: Campaign[] = [
  { t: 'Summer Collection 2026', b: 'Fashion Brand Co.', plat: 'Instagram', cat: 'แฟชั่น', d: 'ร่วมโปรโมทคอลเลกชั่นแฟชั่นใหม่ล่าสุดสำหรับซัมเมอร์นี้ มองหา influencer สไตล์โดดเด่นบน Instagram', dEn: 'Help promote the latest summer fashion collection. Looking for influencers with standout style on Instagram.', j: 45, n: 50, end: '30 เม.ย. 2026', min: 15000, max: 30000, app: 'none', img: 'photo-1469334031218-e382a71b716b', logo: 'photo-1441986300917-64674bd600d8' },
  { t: "L'Oréal Serum Review", b: "L'Oréal Thailand", plat: 'Instagram', cat: 'ความงาม', d: 'เปิดตัว serum บำรุงผิวสูตรใหม่ มองหา beauty influencer ที่มีความรู้ด้าน skincare', dEn: 'Launching a new skincare serum. Looking for beauty influencers with skincare expertise.', j: 28, n: 50, end: '1 พ.ค. 2026', min: 12000, max: 24000, app: 'applied', img: 'photo-1556228578-0d85b1a4d571', logo: 'photo-1522335789203-aabd1fc54bc9' },
  { t: 'Nike Running Club', b: 'Nike Thailand', plat: 'Instagram', cat: 'ฟิตเนส', d: 'แคมเปญรองเท้าวิ่งคอลเลกชั่นใหม่ มองหา fitness influencer มาร่วมท้าทายการวิ่ง', dEn: 'New running shoe collection campaign. Looking for fitness influencers to join the running challenge.', j: 12, n: 30, end: '30 มิ.ย. 2026', min: 9000, max: 18000, app: 'invited', final: 16000, img: 'photo-1542291026-7eec264c27ff', logo: 'photo-1542291026-7eec264c27ff' },
  { t: 'Tech Review Q2', b: 'TechZone', plat: 'YouTube', cat: 'เทคโนโลยี', d: 'รีวิวสมาร์ทโฟนและแกดเจ็ตใหม่ล่าสุด มองหา tech reviewer บน YouTube', dEn: 'Reviewing the latest smartphones and gadgets. Looking for tech reviewers on YouTube.', j: 8, n: 50, end: '15 มิ.ย. 2026', min: 8000, max: 16000, app: 'none', img: 'photo-1511707171634-5f897ff02aa9', logo: 'photo-1519389950473-47ba0277781c' },
  { t: 'Food Festival Promo', b: 'Taste Kitchen', plat: 'TikTok', cat: 'อาหาร', d: 'โปรโมทเทศกาลอาหารสุดยิ่งใหญ่ มองหา food blogger มารีวิวเมนูเด็ด', dEn: 'Promoting a major food festival. Looking for food bloggers to review signature dishes.', j: 100, n: 100, end: '28 ก.พ. 2026', min: 10000, max: 20000, app: 'selected', final: 15000, img: 'photo-1414235077428-338989a2e8c0', logo: 'photo-1517248135467-4c7edcad34c4' },
  { t: 'Shopee 11.11 Mega Sale', b: 'Shopee Thailand', plat: 'TikTok', cat: 'ไลฟ์สไตล์', d: 'มหกรรมช้อปออนไลน์ครั้งยิ่งใหญ่แห่งปี มองหา influencer ทุกสายช่วยโปรโมท', dEn: "The year's biggest online shopping festival. Looking for influencers across all niches to help promote.", j: 200, n: 200, end: '12 พ.ย. 2025', min: 15000, max: 30000, app: 'closed', img: 'photo-1607082349566-187342175e2f', logo: 'photo-1607082348824-0a96f2a4b9da' },
]

// --- mock generator: บวกแคมเปญจำลองอีกชุดเพื่อทดสอบ pagination / โหลดเพิ่ม ---
function buildCampaigns(): Campaign[] {
  const list: Campaign[] = baseCampaigns.map(c => ({ ...c }))
  const imgPool: Record<string, string[]> = {
    'แฟชั่น': ['photo-1490481651871-ab68de25d43d', 'photo-1483985988355-763728e1935b', 'photo-1485231183945-fffde7cc051e', 'photo-1539109136881-3be0616acf4b'],
    'ความงาม': ['photo-1596462502278-27bfdc403348', 'photo-1620916566398-39f1143ab7be', 'photo-1512496015851-a90fb38ba796', 'photo-1503236823255-94609f598e71'],
    'อาหาร': ['photo-1504674900247-0877df9cc836', 'photo-1540189549336-e6e99c3679fe', 'photo-1565299624946-b28f40a0ae38', 'photo-1476224203421-9ac39bcb3327'],
    'เทคโนโลยี': ['photo-1518770660439-4636190af475', 'photo-1498049794561-7780e7231661', 'photo-1517336714731-489689fd1ca8', 'photo-1531297484001-80022131f5a1'],
    'ไลฟ์สไตล์': ['photo-1556742049-0cfed4f6a45d', 'photo-1556228720-195a672e8a03', 'photo-1542435503-956c469947f6', 'photo-1517245386807-bb43f82c33c4'],
    'ฟิตเนส': ['photo-1571019613454-1cb2f99b2d8b', 'photo-1517836357463-d25dfeac3438', 'photo-1534258936925-c58bed479fcb', 'photo-1518611012118-696072aa579a'],
  }
  const brands = ['Aura', 'Nova', 'Pulse', 'Lumi', 'Vibe', 'Bloom', 'Urban', 'Stellar', 'Fresh', 'Peak', 'Glow', 'Zenith', 'Maple', 'Coral', 'Drift', 'Echo', 'Halo', 'Onyx']
  const titles: Record<string, string[]> = {
    'แฟชั่น': ['New Arrivals Drop', 'Streetwear Capsule', 'Denim Reload', 'Resort Collection', 'Monochrome Edit'],
    'ความงาม': ['Glow Serum Launch', 'Matte Lip Series', 'Skincare Routine', 'Clean Beauty Set', 'Sunscreen Reboot'],
    'อาหาร': ['Signature Menu Tasting', 'Plant-Based Launch', 'Dessert Pop-up', 'Coffee Origin Series', 'Midnight Snack Box'],
    'เทคโนโลยี': ['Smartphone Unboxing', 'Earbuds Review', 'Smart Home Setup', 'Laptop Challenge', 'Gadget Roundup'],
    'ไลฟ์สไตล์': ['City Weekend Guide', 'Home Makeover', 'Travel Essentials', 'Minimal Desk Setup', 'Self-care Sunday'],
    'ฟิตเนส': ['30-Day Challenge', 'Gym Wear Drop', 'Protein Launch', 'Morning Run Series', 'Yoga Flow Sessions'],
  }
  const descs: Record<string, string> = {
    'แฟชั่น': 'มองหา influencer สายแฟชั่นมาถ่ายลุคและรีวิวคอลเลกชั่นใหม่ให้โดดเด่นบนฟีด',
    'ความงาม': 'มองหา beauty creator มารีวิวการใช้งานจริง เน้นเล่าขั้นตอนและผลลัพธ์ที่เห็นได้',
    'อาหาร': 'มองหา food creator มาถ่ายเมนูและบอกต่อรสชาติแบบน่ากิน กระตุ้นการสั่งซื้อ',
    'เทคโนโลยี': 'มองหา tech reviewer มาเล่าฟีเจอร์เด่นและประสบการณ์ใช้งานแบบเข้าใจง่าย',
    'ไลฟ์สไตล์': 'มองหา lifestyle creator มาเล่าเรื่องราวการใช้งานในชีวิตประจำวันให้เข้าถึงง่าย',
    'ฟิตเนส': 'มองหา fitness creator มาร่วมท้าทายและสร้างแรงบันดาลใจให้สายออกกำลังกาย',
  }
  const descsEn: Record<string, string> = {
    'แฟชั่น': 'Looking for fashion creators to shoot looks and review the new collection so it stands out in the feed.',
    'ความงาม': 'Looking for beauty creators to review real-world use, focusing on the routine and visible results.',
    'อาหาร': 'Looking for food creators to shoot dishes and share their flavour appetisingly to drive orders.',
    'เทคโนโลยี': 'Looking for tech reviewers to walk through key features and the user experience in an easy-to-follow way.',
    'ไลฟ์สไตล์': 'Looking for lifestyle creators to tell relatable stories of everyday use.',
    'ฟิตเนส': 'Looking for fitness creators to join the challenge and inspire the workout community.',
  }
  const plats = ['Instagram', 'TikTok', 'YouTube', 'Facebook']
  const months = ['ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.']
  const apps: AppState[] = ['none', 'none', 'none', 'none', 'applied', 'applied', 'closed']
  const catList = ['แฟชั่น', 'ความงาม', 'อาหาร', 'เทคโนโลยี', 'ไลฟ์สไตล์', 'ฟิตเนส']
  let seed = 7
  const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff }
  const pick = <T>(a: T[]): T => a[Math.floor(rnd() * a.length)] as T
  for (let i = 0; i < 42; i++) {
    const cat = catList[i % catList.length] as string
    const brand = `${brands[i % brands.length]} ${cat}`
    const minB = (5 + Math.floor(rnd() * 16)) * 1000
    const maxB = Math.min(30000, minB + (4 + Math.floor(rnd() * 12)) * 1000)
    const cap = pick([20, 30, 50, 80, 100])
    list.push({
      t: `${brands[i % brands.length]} · ${pick(titles[cat] as string[])}`,
      b: brand, plat: pick(plats), cat, d: descs[cat] as string, dEn: descsEn[cat] as string,
      j: Math.floor(rnd() * cap), n: cap,
      end: `${1 + Math.floor(rnd() * 28)} ${pick(months)} 2026`,
      min: minB, max: maxB, app: pick(apps),
      img: pick(imgPool[cat] as string[]), logo: pick(imgPool[cat] as string[]),
    })
  }
  return list
}

const campaigns = ref<Campaign[]>(buildCampaigns())

const APP: Record<AppState, { label: string, labelEn: string, cls: string }> = {
  none: { label: 'เปิดรับสมัคร', labelEn: 'Open', cls: 'bg-primary text-white' },
  applied: { label: 'สมัครแล้ว · รอคัดเลือก', labelEn: 'Applied · In review', cls: 'bg-amber-100 text-amber-700' },
  invited: { label: 'ได้รับเชิญ', labelEn: 'Invited', cls: 'bg-violet-100 text-violet-700' },
  selected: { label: 'ได้รับเลือก · กำลังทำ', labelEn: 'Selected · In progress', cls: 'bg-green-100 text-green-700' },
  closed: { label: 'ปิดรับแล้ว', labelEn: 'Closed', cls: 'bg-white/90 text-muted backdrop-blur' },
}
const statusFilters: [string, string, string][] = [['all', 'ทั้งหมด', 'All'], ['none', 'เปิดรับ', 'Open'], ['applied', 'สมัครแล้ว', 'Applied'], ['invited', 'ได้รับเชิญ', 'Invited'], ['selected', 'กำลังทำ', 'In progress']]
const STATUS_DOT: Record<string, string> = { all: 'bg-primary', none: 'bg-primary', applied: 'bg-amber-400', invited: 'bg-violet-400', selected: 'bg-green-500' }

const BUDGET_MIN = 0
const BUDGET_MAX = 30000
const budgetPresets: { label: string, labelEn: string, lo: number, hi: number }[] = [
  { label: 'ทั้งหมด', labelEn: 'All', lo: 0, hi: 30000 },
  { label: 'ต่ำกว่า ฿10K', labelEn: 'Under ฿10K', lo: 0, hi: 10000 },
  { label: '฿10K–20K', labelEn: '฿10K–20K', lo: 10000, hi: 20000 },
  { label: '฿20K ขึ้นไป', labelEn: '฿20K and up', lo: 20000, hi: 30000 },
]

const money = (n: number) => `฿${n.toLocaleString()}`

const CHIP_ON = 'bg-primary text-white shadow-[0_8px_18px_-8px_rgb(45_91_255_/_65%)]'
const CHIP_OFF = 'border border-[#0F2747]/10 bg-white text-muted hover:border-primary/30 hover:text-primary'

// reactive filter state
const actCat = ref('ทั้งหมด')
const actStatus = ref('all')
const q = ref('')
const bLo = ref(BUDGET_MIN)
const bHi = ref(BUDGET_MAX)

const PAGE_SIZE = 9
const page = ref(1)
const shown = ref(PAGE_SIZE)
const viewMode = ref<'infinite' | 'pagination'>('infinite')
const filterOpen = ref(false)

onMounted(() => {
  try {
    const vm = localStorage.getItem('ripplesViewMode')
    if (vm === 'infinite' || vm === 'pagination') viewMode.value = vm
    filterOpen.value = localStorage.getItem('ripplesFilterOpen') === '1'
  }
  catch { /* ignore */ }
})

function statusCount(s: string) {
  return s === 'all' ? campaigns.value.length : campaigns.value.filter(c => c.app === s).length
}

const filteredList = computed(() => campaigns.value.filter((c) => {
  const ql = q.value.toLowerCase()
  return (actStatus.value === 'all' || c.app === actStatus.value)
    && (actCat.value === 'ทั้งหมด' || c.cat === actCat.value)
    && (c.t.toLowerCase().includes(ql) || c.b.toLowerCase().includes(ql))
    && (c.min <= bHi.value && c.max >= bLo.value)
}))

const anyFilter = computed(() => actStatus.value !== 'all' || actCat.value !== 'ทั้งหมด' || q.value !== '' || bLo.value !== BUDGET_MIN || bHi.value !== BUDGET_MAX)

// reset page when filters change
watch([actStatus, actCat, q, bLo, bHi, viewMode], () => {
  page.value = 1
  shown.value = PAGE_SIZE
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredList.value.length / PAGE_SIZE)))

const slice = computed<Campaign[]>(() => {
  const list = filteredList.value
  if (viewMode.value === 'pagination') {
    const p = Math.min(page.value, totalPages.value)
    const start = (p - 1) * PAGE_SIZE
    return list.slice(start, start + PAGE_SIZE)
  }
  return list.slice(0, shown.value)
})

const gridCount = computed(() => {
  const list = filteredList.value
  if (!list.length) return ''
  if (viewMode.value === 'pagination') {
    const p = Math.min(page.value, totalPages.value)
    const start = (p - 1) * PAGE_SIZE
    return tr(
      `แสดง ${start + 1}–${start + slice.value.length} จาก ${list.length} · หน้า ${p}/${totalPages.value}`,
      `Showing ${start + 1}–${start + slice.value.length} of ${list.length} · Page ${p}/${totalPages.value}`,
    )
  }
  return tr(`แสดง ${slice.value.length} จาก ${list.length} แคมเปญ`, `Showing ${slice.value.length} of ${list.length} campaigns`)
})

const resultCount = computed(() => anyFilter.value
  ? tr(`พบ ${filteredList.value.length} จาก ${campaigns.value.length} แคมเปญ`, `Found ${filteredList.value.length} of ${campaigns.value.length} campaigns`)
  : tr(`แสดงทั้งหมด ${campaigns.value.length} แคมเปญ`, `Showing all ${campaigns.value.length} campaigns`))

const budgetHiLabel = computed(() => bHi.value >= BUDGET_MAX ? `${money(BUDGET_MAX)}+` : money(bHi.value))
const budgetFillLeft = computed(() => (bLo.value - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN) * 100)
const budgetFillWidth = computed(() => (bHi.value - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN) * 100 - budgetFillLeft.value)
const budgetActive = computed(() => !(bLo.value === BUDGET_MIN && bHi.value === BUDGET_MAX))

// active summary chips
type ChipKind = 'search' | 'status' | 'cat' | 'budget'
const activeChips = computed<[ChipKind, string][]>(() => {
  const chips: [ChipKind, string][] = []
  if (q.value) chips.push(['search', tr(`ค้นหา: “${q.value}”`, `Search: “${q.value}”`)])
  if (actStatus.value !== 'all') chips.push(['status', statusLabel(actStatus.value)])
  if (actCat.value !== 'ทั้งหมด') chips.push(['cat', catLabel(actCat.value)])
  if (bLo.value !== BUDGET_MIN || bHi.value !== BUDGET_MAX) chips.push(['budget', `${money(bLo.value)}–${budgetHiLabel.value}`])
  return chips
})
const activeCount = computed(() => activeChips.value.length)
const showSummary = computed(() => activeChips.value.length > 0 && !filterOpen.value)

function statusLabel(s: string) {
  const f = statusFilters.find(x => x[0] === s)
  return f ? tr(f[1], f[2]) : s
}

function isInvitedOrSelected(c: Campaign) {
  return c.app === 'invited' || c.app === 'selected'
}

const pagerNums = computed<(number | '…')[]>(() => {
  const out: (number | '…')[] = []
  const pages = totalPages.value
  const p = Math.min(page.value, pages)
  for (let i = 1; i <= pages; i++) {
    if (i === 1 || i === pages || (i >= p - 1 && i <= p + 1)) out.push(i)
    else if (i === p - 2 || i === p + 2) out.push('…')
  }
  return out
})
const remain = computed(() => filteredList.value.length - shown.value)

// actions / mutations (local ref)
function onBudgetMin(e: Event) {
  const v = +(e.target as HTMLInputElement).value
  bLo.value = Math.max(BUDGET_MIN, Math.min(v, bHi.value - 1000))
}
function onBudgetMax(e: Event) {
  const v = +(e.target as HTMLInputElement).value
  bHi.value = Math.min(BUDGET_MAX, Math.max(v, bLo.value + 1000))
}
function setPreset(p: { lo: number, hi: number }) {
  bLo.value = p.lo
  bHi.value = p.hi
}
function resetBudget() {
  bLo.value = BUDGET_MIN
  bHi.value = BUDGET_MAX
}
function clearAll() {
  actStatus.value = 'all'
  actCat.value = 'ทั้งหมด'
  q.value = ''
  bLo.value = BUDGET_MIN
  bHi.value = BUDGET_MAX
}
function clearChip(kind: ChipKind) {
  if (kind === 'search') q.value = ''
  if (kind === 'status') actStatus.value = 'all'
  if (kind === 'cat') actCat.value = 'ทั้งหมด'
  if (kind === 'budget') { bLo.value = BUDGET_MIN; bHi.value = BUDGET_MAX }
}
function toggleFilter() {
  filterOpen.value = !filterOpen.value
  try { localStorage.setItem('ripplesFilterOpen', filterOpen.value ? '1' : '0') }
  catch { /* ignore */ }
}
function setViewMode(v: 'infinite' | 'pagination') {
  viewMode.value = v
  try { localStorage.setItem('ripplesViewMode', v) }
  catch { /* ignore */ }
}
function goPage(p: number) {
  page.value = p
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}
function loadMore() {
  shown.value += PAGE_SIZE
}

// per-card cta state changes
function apply(c: Campaign) { c.app = 'applied' }
function accept(c: Campaign) { c.app = 'selected' }
const declined = ref<Set<Campaign>>(new Set())
function decline(c: Campaign) { declined.value = new Set([...declined.value, c]) }

// infinite scroll
function onScroll() {
  if (viewMode.value !== 'infinite' || !import.meta.client) return
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 600) {
    if (shown.value < filteredList.value.length) shown.value += PAGE_SIZE
  }
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <main class="mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-14">
    <section class="mb-8">
      <h1 class="font-heading text-3xl font-extrabold tracking-tight text-ink lg:text-5xl">{{ tr('แคมเปญที่น่าสนใจ', 'Campaigns for you') }}</h1>
      <p class="mt-2 max-w-2xl text-sm text-muted lg:text-base">{{ tr('เลือกแคมเปญที่ใช่ สมัครได้ทันที — แคมเปญตั้งงบเป็นช่วง (budget range) ส่วนราคาจริงที่ได้รับ แอดมินจะเคาะตอนคัดเลือก', 'Find the right campaign and apply instantly — each campaign sets a budget range, and the admin finalises your actual fee during selection.') }}</p>
    </section>

    <!-- search + filters -->
    <section class="mb-6 overflow-hidden rounded-2xl border border-[#0F2747]/10 bg-white shadow-[0_18px_44px_-30px_rgb(15_39_71_/_45%)]">
      <div class="flex items-center justify-between gap-3 border-b border-[#0F2747]/[0.07] bg-gradient-to-r from-surface to-white px-5 py-4 lg:px-7">
        <button type="button" class="flex flex-1 items-center gap-3 text-left" @click="toggleFilter">
          <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon name="sliders-horizontal" class="h-5 w-5" /></span>
          <div class="min-w-0">
            <p class="flex items-center gap-1.5 font-heading text-sm font-bold text-ink">{{ tr('ตัวกรองแคมเปญ', 'Campaign filters') }} <span v-if="activeCount" class="rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-bold tabular-nums text-white">{{ activeCount }}</span></p>
            <p class="truncate text-[11px] text-muted">{{ resultCount }}</p>
          </div>
        </button>
        <div class="flex shrink-0 items-center gap-2">
          <button v-if="anyFilter" type="button" class="flex items-center gap-1.5 rounded-lg border border-[#0F2747]/12 bg-white px-3 py-1.5 text-xs font-bold text-muted transition hover:border-primary/40 hover:text-primary" @click="clearAll"><Icon name="rotate-ccw" class="h-3.5 w-3.5" /> {{ tr('ล้าง', 'Clear') }}</button>
          <button type="button" class="flex items-center gap-1.5 rounded-lg border border-[#0F2747]/12 bg-white px-3 py-1.5 text-xs font-bold text-muted transition hover:border-primary/40 hover:text-primary" @click="toggleFilter"><span>{{ filterOpen ? tr('ซ่อน', 'Hide') : tr('ตัวกรอง', 'Filters') }}</span> <Icon name="chevron-down" class="h-4 w-4 transition-transform" :class="filterOpen ? 'rotate-180' : ''" /></button>
        </div>
      </div>

      <div v-if="showSummary" class="flex flex-wrap gap-1.5 border-b border-[#0F2747]/[0.07] px-5 py-3 lg:px-7">
        <button v-for="c in activeChips" :key="c[0]" type="button" class="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold text-primary transition hover:bg-primary/15" @click="clearChip(c[0])">{{ c[1] }} <Icon name="x" class="h-3 w-3" /></button>
      </div>

      <div v-show="filterOpen" class="space-y-5 p-5 lg:p-7">
        <div class="relative">
          <Icon name="search" class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#5B6B82]/50" />
          <input v-model="q" type="text" :placeholder="tr('ค้นหาแคมเปญ หรือแบรนด์...', 'Search campaigns or brands...')" class="w-full rounded-xl border border-[#0F2747]/12 bg-surface py-3 pl-12 pr-4 text-sm text-ink placeholder-[#5B6B82]/50 outline-none transition focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/10" />
        </div>

        <div>
          <div class="mb-2.5 flex items-center gap-2">
            <Icon name="briefcase" class="h-3.5 w-3.5 text-primary/60" />
            <p class="text-[11px] font-bold uppercase tracking-widest text-muted">{{ tr('สถานะงานของฉัน', 'My status') }}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button v-for="s in statusFilters" :key="s[0]" type="button" class="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition" :class="s[0] === actStatus ? CHIP_ON : CHIP_OFF" @click="actStatus = s[0]">
              <span class="h-2 w-2 rounded-full" :class="s[0] === actStatus ? 'bg-white' : STATUS_DOT[s[0]]" />{{ tr(s[1], s[2]) }}
              <span class="rounded-full px-1.5 py-0.5 text-[10px] tabular-nums" :class="s[0] === actStatus ? 'bg-white/25 text-white' : 'bg-surface text-muted'">{{ statusCount(s[0]) }}</span>
            </button>
          </div>
        </div>

        <div class="border-t border-[#0F2747]/[0.07] pt-5">
          <div class="mb-2.5 flex items-center gap-2">
            <Icon name="tag" class="h-3.5 w-3.5 text-primary/60" />
            <p class="text-[11px] font-bold uppercase tracking-widest text-muted">{{ tr('หมวดหมู่', 'Category') }}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <button v-for="c in cats" :key="c" type="button" class="rounded-full px-4 py-1.5 text-xs font-bold transition" :class="c === actCat ? CHIP_ON : CHIP_OFF" @click="actCat = c">{{ catLabel(c) }}</button>
          </div>
        </div>

        <div class="border-t border-[#0F2747]/[0.07] pt-5">
          <div class="mb-2.5 flex items-center gap-2">
            <Icon name="wallet" class="h-3.5 w-3.5 text-primary/60" />
            <p class="text-[11px] font-bold uppercase tracking-widest text-muted">{{ tr('ช่วงงบประมาณ', 'Budget range') }}</p>
            <button v-if="budgetActive" type="button" class="text-[11px] font-bold text-primary hover:text-primaryDark" @click="resetBudget">{{ tr('· ล้างค่า', '· Reset') }}</button>
          </div>
          <div class="flex flex-wrap gap-2">
            <button v-for="p in budgetPresets" :key="p.label" type="button" class="whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition" :class="bLo === p.lo && bHi === p.hi ? CHIP_ON : CHIP_OFF" @click="setPreset(p)">{{ tr(p.label, p.labelEn) }}</button>
          </div>
          <div class="mt-5 flex items-center gap-3 rounded-xl border border-[#0F2747]/[0.07] bg-surface/60 p-4">
            <span class="min-w-[78px] rounded-lg border border-[#0F2747]/10 bg-white px-3 py-2 text-center text-sm font-bold tabular-nums text-ink">{{ money(bLo) }}</span>
            <div class="rng flex-1">
              <div class="pointer-events-none absolute left-0 top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-[#0F2747]/10" />
              <div class="pointer-events-none absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary" :style="{ left: `${budgetFillLeft}%`, width: `${budgetFillWidth}%` }" />
              <input type="range" min="0" max="30000" step="1000" :value="bLo" :aria-label="tr('งบต่ำสุด', 'Minimum budget')" @input="onBudgetMin" />
              <input type="range" min="0" max="30000" step="1000" :value="bHi" :aria-label="tr('งบสูงสุด', 'Maximum budget')" @input="onBudgetMax" />
            </div>
            <span class="min-w-[78px] rounded-lg border border-[#0F2747]/10 bg-white px-3 py-2 text-center text-sm font-bold tabular-nums text-ink">{{ budgetHiLabel }}</span>
          </div>
        </div>
      </div>
    </section>

    <div class="mb-4 flex items-center justify-between gap-3">
      <p class="text-xs text-muted">{{ gridCount }}</p>
      <div class="inline-flex shrink-0 rounded-lg border border-[#0F2747]/10 bg-white p-1 text-xs font-bold">
        <button type="button" class="flex items-center gap-1.5 rounded-md px-3 py-1.5 transition" :class="viewMode === 'infinite' ? 'bg-primary text-white' : 'text-muted hover:text-primary'" @click="setViewMode('infinite')"><Icon name="mouse-pointer-2" class="h-3.5 w-3.5" /> {{ tr('เลื่อนต่อเนื่อง', 'Infinite scroll') }}</button>
        <button type="button" class="flex items-center gap-1.5 rounded-md px-3 py-1.5 transition" :class="viewMode === 'pagination' ? 'bg-primary text-white' : 'text-muted hover:text-primary'" @click="setViewMode('pagination')"><Icon name="layout-grid" class="h-3.5 w-3.5" /> {{ tr('แบ่งหน้า', 'Pages') }}</button>
      </div>
    </div>

    <section class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <article v-for="c in slice" :key="`${c.t}-${c.b}`" class="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[#0F2747]/10 bg-white shadow-sm transition-shadow hover:shadow-[0_24px_50px_-30px_rgb(45_91_255_/_40%)]">
        <NuxtLink to="/portal/campaign-detail" class="flex flex-1 flex-col">
          <div class="relative h-44 overflow-hidden">
            <img :src="`https://images.unsplash.com/${c.img}?w=800&h=600&fit=crop`" :alt="c.t" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span class="absolute left-4 top-4 rounded-md bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary backdrop-blur">{{ catLabel(c.cat) }}</span>
            <span class="absolute right-4 top-4 rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-wide" :class="APP[c.app].cls">{{ tr(APP[c.app].label, APP[c.app].labelEn) }}</span>
          </div>
          <div class="flex flex-1 flex-col p-5">
            <div class="flex items-center gap-2"><img :src="`https://images.unsplash.com/${c.logo}?w=100&h=100&fit=crop`" class="h-6 w-6 rounded-full object-cover" :alt="c.b" /><span class="text-xs text-muted">{{ c.b }} · {{ c.plat }}</span></div>
            <h3 class="mt-3 line-clamp-1 font-heading text-lg font-bold text-ink">{{ c.t }}</h3>
            <p class="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-[#5B6B82]/80">{{ tr(c.d, c.dEn) }}</p>
            <div class="mt-3 flex items-center gap-4 text-xs text-muted">
              <span class="flex items-center gap-1.5"><Icon name="users" class="h-4 w-4 text-primary" /> {{ c.j }}/{{ c.n }}</span>
              <span class="flex items-center gap-1.5"><Icon name="calendar" class="h-4 w-4 text-primary" /> {{ c.end }}</span>
            </div>
            <div class="mt-4 border-t border-[#0F2747]/10 pt-4">
              <div v-if="c.app === 'invited'" class="mb-3 flex items-center gap-2 rounded-lg bg-violet-50 p-2.5 text-xs text-violet-700"><Icon name="mail-open" class="h-4 w-4 shrink-0" /> {{ tr('แบรนด์เชิญคุณร่วมงาน พร้อมเสนอราคาแล้ว', 'The brand invited you to collaborate and has made an offer') }}</div>
              <div class="flex items-center justify-between gap-2">
                <div v-if="isInvitedOrSelected(c)">
                  <p class="text-[10px] uppercase tracking-widest text-[#5B6B82]/50">{{ tr('ราคาจริง · TIER 3', 'Final price · TIER 3') }}</p>
                  <p class="font-bold text-primary">{{ money(c.final!) }}</p>
                  <p class="text-[10px] text-[#5B6B82]/50 line-through">{{ money(c.min) }}–{{ money(c.max) }}</p>
                </div>
                <div v-else>
                  <p class="text-[10px] uppercase tracking-widest text-[#5B6B82]/50">{{ tr('งบประมาณ (ช่วง)', 'Budget (range)') }}</p>
                  <p class="font-bold text-primary">{{ money(c.min) }} – {{ money(c.max) }}</p>
                </div>
                <span @click.prevent.stop>
                  <button v-if="c.app === 'none'" type="button" class="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white transition hover:bg-primaryDark active:translate-y-0.5" @click="apply(c)">{{ tr('สมัครเลย', 'Apply now') }}</button>
                  <button v-else-if="c.app === 'applied'" disabled type="button" class="cursor-default rounded-lg bg-amber-50 px-4 py-2 text-xs font-bold text-amber-600">{{ tr('รอผลคัดเลือก', 'Awaiting selection') }}</button>
                  <template v-else-if="c.app === 'invited'">
                    <span v-if="declined.has(c)" class="text-xs font-bold text-muted">{{ tr('ปฏิเสธข้อเสนอแล้ว', 'Offer declined') }}</span>
                    <div v-else class="flex gap-2">
                      <button type="button" class="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-white transition hover:bg-primaryDark" @click="accept(c)">{{ tr('ตอบรับ', 'Accept') }}</button>
                      <button type="button" class="rounded-lg border border-[#0F2747]/15 px-3 py-2 text-xs font-bold text-muted transition hover:text-ink" @click="decline(c)">{{ tr('ปฏิเสธ', 'Decline') }}</button>
                    </div>
                  </template>
                  <button v-else-if="c.app === 'selected'" type="button" class="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-green-700" @click="navigateTo('/portal/tasks')">{{ tr('ไปที่งาน', 'Go to task') }} <Icon name="arrow-right" class="h-3.5 w-3.5" /></button>
                  <button v-else disabled type="button" class="cursor-not-allowed rounded-lg border border-[#0F2747]/10 bg-surface px-4 py-2 text-xs font-bold text-[#5B6B82]/45">{{ tr('ปิดรับแล้ว', 'Closed') }}</button>
                </span>
              </div>
            </div>
          </div>
        </NuxtLink>
      </article>
    </section>
    <p v-if="filteredList.length === 0" class="py-16 text-center text-muted">{{ tr('ไม่พบแคมเปญตามที่ค้นหา', 'No campaigns match your search') }}</p>

    <div class="mt-8">
      <template v-if="filteredList.length > 0">
        <div v-if="viewMode === 'pagination'" class="flex flex-wrap items-center justify-center gap-1.5">
          <button type="button" :disabled="page === 1" class="inline-flex h-9 min-w-[36px] items-center justify-center rounded-lg px-3 text-xs font-bold transition" :class="page === 1 ? 'border border-[#0F2747]/8 bg-surface text-[#5B6B82]/40' : 'border border-[#0F2747]/10 bg-white text-muted hover:border-primary/30 hover:text-primary'" @click="goPage(page - 1)">‹ {{ tr('ก่อนหน้า', 'Prev') }}</button>
          <template v-for="(p, i) in pagerNums" :key="`p-${i}`">
            <span v-if="p === '…'" class="px-1 text-muted">…</span>
            <button v-else type="button" class="inline-flex h-9 min-w-[36px] items-center justify-center rounded-lg px-3 text-xs font-bold transition" :class="p === Math.min(page, totalPages) ? 'bg-primary text-white shadow-[0_8px_18px_-8px_rgb(45_91_255_/_65%)]' : 'border border-[#0F2747]/10 bg-white text-muted hover:border-primary/30 hover:text-primary'" @click="goPage(p)">{{ p }}</button>
          </template>
          <button type="button" :disabled="page >= totalPages" class="inline-flex h-9 min-w-[36px] items-center justify-center rounded-lg px-3 text-xs font-bold transition" :class="page >= totalPages ? 'border border-[#0F2747]/8 bg-surface text-[#5B6B82]/40' : 'border border-[#0F2747]/10 bg-white text-muted hover:border-primary/30 hover:text-primary'" @click="goPage(page + 1)">{{ tr('ถัดไป', 'Next') }} ›</button>
        </div>
        <template v-else>
          <p v-if="shown >= filteredList.length" class="text-center text-xs text-[#5B6B82]/60">{{ tr(`— แสดงครบทั้ง ${filteredList.length} แคมเปญแล้ว —`, `— All ${filteredList.length} campaigns shown —`) }}</p>
          <div v-else class="flex justify-center">
            <button type="button" class="inline-flex items-center gap-2 rounded-xl border border-primary/25 bg-primary/5 px-6 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white" @click="loadMore"><Icon name="plus" class="h-4 w-4" /> {{ tr('โหลดเพิ่มเติม', 'Load more') }} <span class="text-xs font-medium opacity-70">{{ tr(`(เหลืออีก ${remain})`, `(${remain} more)`) }}</span></button>
          </div>
        </template>
      </template>
    </div>
  </main>
</template>

<style scoped>
/* dual range slider */
.rng { position: relative; height: 36px; }
.rng input[type=range] { position: absolute; left: 0; top: 0; width: 100%; margin: 0; height: 36px; -webkit-appearance: none; appearance: none; background: transparent; pointer-events: none; }
.rng input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; height: 20px; width: 20px; border-radius: 9999px; background: #fff; border: 3px solid #2D5BFF; box-shadow: 0 2px 6px rgb(15 39 71 / 25%); cursor: pointer; pointer-events: auto; margin-top: -8px; }
.rng input[type=range]::-moz-range-thumb { height: 20px; width: 20px; border-radius: 9999px; background: #fff; border: 3px solid #2D5BFF; box-shadow: 0 2px 6px rgb(15 39 71 / 25%); cursor: pointer; pointer-events: auto; }
.rng input[type=range]::-webkit-slider-runnable-track { height: 4px; background: transparent; }
.rng input[type=range]::-moz-range-track { height: 4px; background: transparent; }
</style>
