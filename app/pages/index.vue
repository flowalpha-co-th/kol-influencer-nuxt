<script setup lang="ts">
definePageMeta({ layout: 'default' })
const { tr } = useLocale()
useHead(() => ({ title: tr('Ripples — เปลี่ยนคอนเทนต์ให้เป็นรายได้จริง', 'Ripples — Turn content into real income') }))

const authStore = useAuthStore()
function goCampaigns() {
  if (authStore.isAuthenticated) {
    return navigateTo('/portal/campaigns')
  }
  return navigateTo({ path: '/login', query: { redirect: '/portal/campaigns' } })
}

const stats: [string, string, string][] = [
  ['10K+', 'ครีเอเตอร์ที่ใช้งาน', 'Active creators'],
  ['500+', 'แบรนด์ที่ตรวจสอบแล้ว', 'Verified brands'],
  ['7 วัน', 'จ่ายเงินเฉลี่ย', 'Avg. payout time'],
  ['฿500M+', 'จ่ายแล้วทั้งหมด', 'Total paid out'],
]

const whys: [string, string, string, string, string][] = [
  ['badge-check', 'แบรนด์ตรวจสอบแล้วเท่านั้น', 'Verified brands only', 'ทุกแบรนด์ผ่านการตรวจสอบ 100% ไม่มีงานหลอก รับงานได้อย่างมั่นใจ', 'Every brand is 100% verified — no fake jobs, accept work with confidence.'],
  ['file-text', 'เอกสารภาษีอัตโนมัติ', 'Automatic tax documents', 'เอกสารภาษีครบ จบในแอป — 50 ทวิ, ใบกำกับภาษี ออกให้อัตโนมัติ', 'All your tax documents in one app — withholding certificates and tax invoices issued automatically.'],
  ['trending-up', 'ติดตามผลเรียลไทม์', 'Real-time tracking', 'ดูรายได้และผลงานได้ทันทีทุกแคมเปญ โปร่งใส ตรวจสอบได้ตลอดเวลา', 'See your earnings and performance instantly on every campaign — transparent and verifiable anytime.'],
]

const steps: [string, string][] = [
  ['สมัครสมาชิก & ยืนยันตัวตน', 'Sign up & verify your identity'],
  ['เลือกแคมเปญที่ชอบแล้วกดสมัคร', 'Pick a campaign you love and apply'],
  ['สร้างคอนเทนต์ตามบรีฟ', 'Create content following the brief'],
  ['รับเงินโอนเข้าบัญชีโดยตรง', 'Get paid directly to your account'],
]

// trusted brands marquee — inline SVG marks
type Brand = { n: string; c: string; i: string; t: string }
const brandsA: Brand[] = [
  { n: 'Luxe Beauty', c: '#B76E79', i: 'spark', t: 'Beauty' }, { n: 'TechZone', c: '#2D5BFF', i: 'hex', t: 'Zone' },
  { n: 'Taste Kitchen', c: '#E1772B', i: 'disc', t: 'Kitchen' }, { n: 'GlowLab', c: '#D89B00', i: 'ring', t: 'Lab' },
  { n: 'FitPro', c: '#1F8A5B', i: 'bolt', t: 'Pro' }, { n: 'Maison Aroma', c: '#6E4E9E', i: 'drop', t: 'Aroma' },
  { n: 'UrbanThread', c: '#0F2747', i: 'square', t: 'Thread' }, { n: 'PureLeaf', c: '#3FA34D', i: 'leaf', t: 'Leaf' },
  { n: 'NovaPlay', c: '#7C3AED', i: 'tri', t: 'Play' }, { n: 'CafeNord', c: '#8A5A2B', i: 'disc', t: 'Nord' },
  { n: 'PixelByte', c: '#2D5BFF', i: 'square', t: 'Byte' },
]
const brandsB: Brand[] = [
  { n: 'Verdant', c: '#1F8A5B', i: 'leaf', t: 'dant' }, { n: 'Aurio', c: '#C99700', i: 'diamond', t: 'rio' },
  { n: 'SnackLab', c: '#E1772B', i: 'disc', t: 'Lab' }, { n: 'MoveOn', c: '#0EA5A5', i: 'bolt', t: 'On' },
  { n: 'Lumiere', c: '#B76E79', i: 'ring', t: 'iere' }, { n: 'ByteCart', c: '#2D5BFF', i: 'hex', t: 'Cart' },
  { n: 'Zenith', c: '#0F2747', i: 'diamond', t: 'nith' }, { n: 'Hydra', c: '#0EA5A5', i: 'drop', t: 'dra' },
  { n: 'Solace', c: '#6E4E9E', i: 'spark', t: 'lace' }, { n: 'NimbusTV', c: '#2D5BFF', i: 'disc', t: 'TV' },
  { n: 'Bloome', c: '#E0578B', i: 'spark', t: 'oome' },
]

const brandPaths: Record<string, string> = {
  spark: 'M12 1.5c.6 5 3.5 7.9 9 9-5.5 1.1-8.4 4-9 9-.6-5-3.5-7.9-9-9 5.5-1.1 8.4-4 9-9z',
  hex: 'M12 2l8.66 5v10L12 22 3.34 17V7L12 2z',
  disc: 'M12 3a9 9 0 100 18 9 9 0 000-18z',
  ring: 'M12 4a8 8 0 100 16 8 8 0 000-16z',
  bolt: 'M13 2L4 14h6l-1 8 9-12h-6l1-8z',
  drop: 'M12 2C12 2 5 10 5 15a7 7 0 0014 0c0-5-7-13-7-13z',
  diamond: 'M12 2l7 10-7 10-7-10 7-10z',
  square: 'M8.5 4h7A4.5 4.5 0 0120 8.5v7a4.5 4.5 0 01-4.5 4.5h-7A4.5 4.5 0 014 15.5v-7A4.5 4.5 0 018.5 4z',
  tri: 'M12 3l9 16H3z',
  leaf: 'M20 4C9 4 4 9 4 16v4h4c7 0 12-5 12-16z',
}
const strokeMarks = new Set(['hex', 'ring'])

function splitName(b: Brand) {
  if (b.t && b.n.endsWith(b.t)) return { head: b.n.slice(0, b.n.length - b.t.length), tail: b.t }
  return { head: b.n, tail: '' }
}
</script>

<template>
  <div>
    <!-- editorial intro -->
    <section class="mb-5 lg:mb-6">
      <span class="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
        <Icon name="sparkles" class="h-3.5 w-3.5" /> {{ tr('ครีเอเตอร์ มาร์เก็ตเพลส', 'Creator marketplace') }}
      </span>
      <div class="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h1 class="font-heading text-3xl font-extrabold leading-[1.25] tracking-tight text-ink sm:text-4xl lg:text-5xl">
          {{ tr('เปลี่ยนคอนเทนต์ให้เป็น', 'Turn your content into') }} <span class="text-primary">{{ tr('รายได้จริง', 'real income') }}</span>
        </h1>
        <NuxtLink to="/register" class="inline-flex w-fit shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgb(45_91_255_/_70%)] transition-all hover:bg-primaryDark active:translate-y-0.5">
          {{ tr('เริ่มเป็น Creator ฟรี', 'Become a Creator — free') }} <Icon name="arrow-right" class="h-4 w-4" />
        </NuxtLink>
      </div>
      <p class="mt-3 max-w-xl text-sm leading-relaxed text-muted lg:text-base">
        {{ tr('จับคู่กับแบรนด์ที่ผ่านการตรวจสอบ จ่ายตรงเวลา เอกสารภาษีจัดให้ครบ — ในที่เดียว', 'Match with verified brands, get paid on time, and have all your tax documents handled — all in one place.') }}
      </p>
    </section>

    <!-- campaigns teaser -->
    <section>
      <div class="grid gap-5 lg:grid-cols-3">
        <article role="button" tabindex="0" class="group relative cursor-pointer overflow-hidden rounded-xl border border-[#0F2747]/10 lg:col-span-2 lg:row-span-2" @click="goCampaigns" @keydown.enter="goCampaigns">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80" alt="Summer Collection 2026" class="h-full min-h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0F2747] via-[#0F2747]/40 to-transparent" />
          <div class="absolute left-6 right-6 top-6 flex items-center justify-between">
            <span class="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white"><span class="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> {{ tr('เปิดรับ', 'Open') }}</span>
            <span class="rounded-md bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">{{ tr('แฟชั่น', 'Fashion') }}</span>
          </div>
          <div class="absolute inset-x-0 bottom-0 p-6 text-white lg:p-8">
            <p class="text-xs font-medium text-white/70">Fashion Brand Co.</p>
            <h3 class="mt-1 font-heading text-2xl font-extrabold lg:text-3xl">Summer Collection 2026</h3>
            <p class="mt-2 max-w-md text-xs text-white/70 lg:text-sm">{{ tr('ร่วมโปรโมทคอลเลกชั่นแฟชั่นใหม่ล่าสุดสำหรับซัมเมอร์นี้ มองหา Influencer ที่สไตล์การแต่งตัวโดดเด่นบน Instagram', 'Help promote the latest summer fashion collection. Looking for influencers with standout style on Instagram.') }}</p>
            <div class="mt-4 flex items-center justify-between">
              <div><span class="block text-[10px] uppercase tracking-widest text-white/50">{{ tr('งบประมาณ', 'Budget') }}</span><span class="font-bold">฿15,000 – 30,000</span></div>
              <span class="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-primary transition-transform group-hover:translate-x-1"><Icon name="arrow-right" class="h-5 w-5" /></span>
            </div>
          </div>
        </article>

        <article role="button" tabindex="0" class="group relative min-h-[200px] cursor-pointer overflow-hidden rounded-xl border border-[#0F2747]/10 shadow-sm" @click="goCampaigns" @keydown.enter="goCampaigns">
          <img src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80" alt="Tech Review Q2" class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0F2747] via-[#0F2747]/40 to-transparent" />
          <div class="relative flex h-full flex-col justify-end p-5">
            <span class="w-fit rounded-md bg-white/85 px-2 py-0.5 text-[9px] font-bold uppercase text-primary backdrop-blur">{{ tr('เทคโนโลยี', 'Technology') }}</span>
            <h3 class="mt-2 font-heading text-lg font-bold text-white">Tech Review Q2</h3>
            <p class="text-xs text-white/75">TechZone</p>
            <span class="mt-1 text-sm font-bold text-white">฿8K – 16K</span>
          </div>
        </article>

        <article role="button" tabindex="0" class="group relative min-h-[200px] cursor-pointer overflow-hidden rounded-xl border border-[#0F2747]/10 shadow-sm" @click="goCampaigns" @keydown.enter="goCampaigns">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80" alt="Food Festival Promo" class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div class="absolute inset-0 bg-gradient-to-t from-[#0F2747] via-[#0F2747]/40 to-transparent" />
          <div class="relative flex h-full flex-col justify-end p-5">
            <span class="w-fit rounded-md bg-white/85 px-2 py-0.5 text-[9px] font-bold uppercase text-primary backdrop-blur">{{ tr('อาหาร', 'Food') }}</span>
            <h3 class="mt-2 font-heading text-lg font-bold text-white">Food Festival Promo</h3>
            <p class="text-xs text-white/75">Taste Kitchen</p>
            <span class="mt-1 text-sm font-bold text-white">฿10K – 20K</span>
          </div>
        </article>
      </div>

      <div class="mt-5 grid gap-5 sm:grid-cols-2">
        <article role="button" tabindex="0" class="group cursor-pointer overflow-hidden rounded-xl border border-[#0F2747]/10 bg-white shadow-sm transition-shadow hover:shadow-[0_24px_50px_-30px_rgb(45_91_255_/_40%)]" @click="goCampaigns" @keydown.enter="goCampaigns">
          <div class="relative h-40 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80" alt="Skincare Glow Set" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span class="absolute left-4 top-4 rounded-md bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary backdrop-blur">{{ tr('ความงาม', 'Beauty') }}</span>
          </div>
          <div class="p-5">
            <p class="text-xs text-muted">GlowLab Beauty</p>
            <h3 class="mt-0.5 font-heading text-lg font-bold text-ink">Skincare Glow Set</h3>
            <p class="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#5B6B82]/80">{{ tr('รีวิวเซ็ตสกินแคร์ตัวใหม่ เน้นผิวกระจ่างใส สำหรับสาย beauty บน TikTok & Instagram', 'Review the new skincare set focused on radiant skin — for beauty creators on TikTok & Instagram.') }}</p>
            <div class="mt-4 flex items-center justify-between">
              <div><span class="block text-[10px] uppercase tracking-widest text-[#5B6B82]/40">{{ tr('งบประมาณ', 'Budget') }}</span><span class="font-bold text-primary">฿12,000 – 25,000</span></div>
              <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:translate-x-1"><Icon name="arrow-right" class="h-4 w-4" /></span>
            </div>
          </div>
        </article>
        <article role="button" tabindex="0" class="group cursor-pointer overflow-hidden rounded-xl border border-[#0F2747]/10 bg-white shadow-sm transition-shadow hover:shadow-[0_24px_50px_-30px_rgb(45_91_255_/_40%)]" @click="goCampaigns" @keydown.enter="goCampaigns">
          <div class="relative h-40 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80" alt="30-Day Fitness Challenge" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span class="absolute left-4 top-4 rounded-md bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary backdrop-blur">{{ tr('ฟิตเนส', 'Fitness') }}</span>
          </div>
          <div class="p-5">
            <p class="text-xs text-muted">FitPro Studio</p>
            <h3 class="mt-0.5 font-heading text-lg font-bold text-ink">30-Day Fitness Challenge</h3>
            <p class="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#5B6B82]/80">{{ tr('ชวนสายเฮลท์ตี้ร่วมชาเลนจ์ออกกำลังกาย 30 วัน พร้อมรีวิวอุปกรณ์ฟิตเนสรุ่นใหม่', 'Inviting health-conscious creators to join a 30-day workout challenge and review the latest fitness gear.') }}</p>
            <div class="mt-4 flex items-center justify-between">
              <div><span class="block text-[10px] uppercase tracking-widest text-[#5B6B82]/40">{{ tr('งบประมาณ', 'Budget') }}</span><span class="font-bold text-primary">฿9,000 – 18,000</span></div>
              <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:translate-x-1"><Icon name="arrow-right" class="h-4 w-4" /></span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- trusted brands -->
    <section class="mt-16 lg:mt-24">
      <p class="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-[#5B6B82]/70">{{ tr('แบรนด์ชั้นนำที่ไว้วางใจ Ripples', 'Leading brands that trust Ripples') }}</p>
      <div class="rip-marquee relative overflow-hidden py-1">
        <div class="flex overflow-hidden">
          <div class="rip-track animate-marquee-left">
            <template v-for="pass in 2" :key="pass">
              <div v-for="b in brandsA" :key="`a${pass}-${b.n}`" class="flex shrink-0 items-center gap-2.5 rounded-xl border border-[#0F2747]/[0.06] bg-white px-5 py-3 opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0">
                <svg viewBox="0 0 24 24" class="h-7 w-7 shrink-0">
                  <path :d="brandPaths[b.i]" :fill="strokeMarks.has(b.i) ? 'none' : b.c" :stroke="strokeMarks.has(b.i) ? b.c : 'none'" :stroke-width="strokeMarks.has(b.i) ? 2.4 : 0" stroke-linejoin="round" />
                </svg>
                <span class="whitespace-nowrap font-heading text-[15px] font-bold tracking-tight text-[#16235C]">{{ splitName(b).head }}<span :style="{ color: b.c }">{{ splitName(b).tail }}</span></span>
              </div>
            </template>
          </div>
        </div>
        <div class="mt-3 flex overflow-hidden">
          <div class="rip-track animate-marquee-right">
            <template v-for="pass in 2" :key="pass">
              <div v-for="b in brandsB" :key="`b${pass}-${b.n}`" class="flex shrink-0 items-center gap-2.5 rounded-xl border border-[#0F2747]/[0.06] bg-white px-5 py-3 opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0">
                <svg viewBox="0 0 24 24" class="h-7 w-7 shrink-0">
                  <path :d="brandPaths[b.i]" :fill="strokeMarks.has(b.i) ? 'none' : b.c" :stroke="strokeMarks.has(b.i) ? b.c : 'none'" :stroke-width="strokeMarks.has(b.i) ? 2.4 : 0" stroke-linejoin="round" />
                </svg>
                <span class="whitespace-nowrap font-heading text-[15px] font-bold tracking-tight text-[#16235C]">{{ splitName(b).head }}<span :style="{ color: b.c }">{{ splitName(b).tail }}</span></span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- stats -->
    <section class="mt-8 lg:mt-10">
      <div class="grid grid-cols-2 divide-x divide-y divide-[#0F2747]/10 overflow-hidden rounded-xl border border-[#0F2747]/10 bg-white shadow-[0_30px_60px_-40px_rgb(45_91_255_/_35%)] sm:grid-cols-4 sm:divide-y-0">
        <div v-for="s in stats" :key="s[1]" class="p-8 text-center lg:p-10">
          <div class="font-heading text-3xl font-extrabold text-primary lg:text-5xl">{{ s[0] }}</div>
          <div class="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#5B6B82]/60 lg:text-xs">{{ tr(s[1], s[2]) }}</div>
        </div>
      </div>
    </section>

    <!-- why -->
    <section class="mt-16 lg:mt-28">
      <h2 class="font-heading text-3xl font-extrabold tracking-tight text-ink lg:text-5xl">{{ tr('ทำไมต้อง', 'Why') }} <span class="text-primary">Ripples</span></h2>
      <p class="mt-2 max-w-lg text-sm text-muted lg:text-base">{{ tr('เครื่องมือครบสำหรับ Creator ตั้งแต่หา campaign จนถึงรับเงิน — จบในที่เดียว', 'Every tool a creator needs, from finding campaigns to getting paid — all in one place.') }}</p>
      <div class="mt-8 grid gap-5 sm:grid-cols-3">
        <div v-for="w in whys" :key="w[1]" class="rounded-xl border border-[#0F2747]/10 bg-white p-7 shadow-sm">
          <div class="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-primary/10"><Icon :name="w[0]" class="h-6 w-6 text-primary" /></div>
          <h3 class="mt-5 font-heading text-lg font-bold text-ink">{{ tr(w[1], w[2]) }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ tr(w[3], w[4]) }}</p>
        </div>
      </div>
    </section>

    <!-- how -->
    <section class="mt-16 lg:mt-28">
      <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-ink to-primaryDark p-8 text-white lg:p-14">
        <div class="pointer-events-none absolute inset-0 opacity-[0.06]" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 40px 40px" />
        <h2 class="relative font-heading text-2xl font-extrabold tracking-tight lg:text-4xl">{{ tr('เริ่มต้น 4 ขั้นตอนง่าย ๆ', 'Get started in 4 easy steps') }}</h2>
        <div class="relative mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div v-for="(s, i) in steps" :key="s[0]" class="flex gap-4 lg:flex-col">
            <div :class="['flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-heading text-lg font-extrabold', i === 0 ? 'bg-primaryLight text-ink' : 'border border-white/15 bg-white/10 text-white']">{{ i + 1 }}</div>
            <p class="text-sm font-medium leading-relaxed lg:text-base">{{ tr(s[0], s[1]) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- cta -->
    <section class="mt-16 text-center lg:mt-28">
      <h2 class="font-heading text-3xl font-extrabold leading-[1.5] tracking-tight text-ink lg:text-6xl">{{ tr('พร้อมเปลี่ยนคอนเทนต์', 'Ready to turn content') }}<br />{{ tr('เป็น', 'into ') }}<span class="text-primary">{{ tr('รายได้', 'income') }}</span>?</h2>
      <p class="mt-4 text-sm text-muted lg:text-base">{{ tr('สมัครฟรี ไม่มีค่าธรรมเนียมแรกเข้า ยกเลิกได้ทุกเมื่อ', 'Sign up free, no entry fees, cancel anytime.') }}</p>
      <NuxtLink to="/register" class="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white shadow-[0_12px_30px_-10px_rgb(45_91_255_/_70%)] transition-all hover:bg-primaryDark active:translate-y-0.5">
        {{ tr('เริ่มเป็น Creator ฟรี', 'Become a Creator — free') }} <Icon name="arrow-right" class="h-5 w-5" />
      </NuxtLink>
    </section>
  </div>
</template>
