<script setup lang="ts">
definePageMeta({ layout: 'docs' })
useHead(() => ({ title: 'Design System — Ripples' }))

interface TocItem {
  href: string
  label: string
}

const toc: TocItem[] = [
  { href: '#brand', label: 'Brand' },
  { href: '#color', label: 'Colors' },
  { href: '#type', label: 'Typography' },
  { href: '#space', label: 'Spacing & Elevation' },
  { href: '#components', label: 'Components' },
  { href: '#overlays', label: 'Overlays & Feedback' },
  { href: '#loading', label: 'Loading & States' },
]

interface ColorSwatch {
  name: string
  hex: string
  bg: string
}

const coreColors: ColorSwatch[] = [
  { name: 'Primary', hex: '#2D5BFF', bg: 'bg-primary' },
  { name: 'Primary Dark', hex: '#1A3FB8', bg: 'bg-primaryDark' },
  { name: 'Primary Light', hex: '#4D8BFF', bg: 'bg-primaryLight' },
  { name: 'Ink', hex: '#0F2747', bg: 'bg-ink' },
  { name: 'Muted', hex: '#5B6B82', bg: 'bg-muted' },
  { name: 'Surface', hex: '#F4F7FB', bg: 'bg-surface' },
]

const statusColors: ColorSwatch[] = [
  { name: 'Success', hex: '#16A34A', bg: 'bg-green-600' },
  { name: 'Pending', hex: '#D97706', bg: 'bg-amber-600' },
  { name: 'Invited', hex: '#7C3AED', bg: 'bg-violet-600' },
  { name: 'Error', hex: '#DC2626', bg: 'bg-red-600' },
]

interface CategoryTint {
  icon: string
  label: string
  tone: string
  iconWrap: string
}

const categoryTints: CategoryTint[] = [
  { icon: 'shield-check', label: 'ความปลอดภัย', tone: 'rose', iconWrap: 'bg-rose-50 text-rose-600' },
  { icon: 'user-check', label: 'โปรไฟล์', tone: 'violet', iconWrap: 'bg-violet-50 text-violet-600' },
  { icon: 'megaphone', label: 'แคมเปญ', tone: 'blue', iconWrap: 'bg-blue-50 text-blue-600' },
  { icon: 'clipboard-list', label: 'งาน', tone: 'amber', iconWrap: 'bg-amber-50 text-amber-600' },
  { icon: 'wallet', label: 'การเงิน', tone: 'green', iconWrap: 'bg-green-50 text-green-600' },
]

interface TypeSample {
  meta: string
  text: string
  cls: string
}

const typeSamples: TypeSample[] = [
  { meta: 'Display · text-7xl / extrabold', text: 'เปลี่ยนคอนเทนต์', cls: 'font-heading text-6xl font-extrabold leading-[1.05] tracking-tight text-ink' },
  { meta: 'H1 · text-4xl / extrabold', text: 'แคมเปญที่น่าสนใจ', cls: 'font-heading text-4xl font-extrabold tracking-tight text-ink' },
  { meta: 'H2 · text-2xl / bold', text: 'ทำไมต้อง Ripples', cls: 'font-heading text-2xl font-bold text-ink' },
  { meta: 'H3 · text-lg / bold', text: 'Verified Brands Only', cls: 'font-heading text-lg font-bold text-ink' },
  { meta: 'Body · text-base / regular · color muted', text: 'จับคู่กับแบรนด์ที่ผ่านการตรวจสอบ จ่ายตรงเวลา เอกสารภาษีจัดให้ครบ — ในที่เดียว', cls: 'text-base leading-relaxed text-muted' },
  { meta: 'Eyebrow · text-sm / bold / uppercase / tracking-[0.25em]', text: 'แบรนด์ชั้นนำที่ไว้วางใจ Ripples', cls: 'text-sm font-bold uppercase tracking-[0.25em] text-[#5B6B82]/70' },
]

interface RadiusSample {
  cls: string
  label: string
}

const radiusSamples: RadiusSample[] = [
  { cls: 'rounded-md', label: 'md · 6px' },
  { cls: 'rounded-lg', label: 'lg · 8px' },
  { cls: 'rounded-xl', label: 'xl · 12px' },
  { cls: 'rounded-2xl', label: '2xl · 16px' },
  { cls: 'rounded-full', label: 'full' },
]

interface ElevationSample {
  cls: string
  label: string
}

const elevationSamples: ElevationSample[] = [
  { cls: 'shadow-sm', label: 'shadow-sm' },
  { cls: 'shadow-[0_24px_50px_-30px_rgb(45_91_255_/_40%)]', label: 'card-hover' },
  { cls: 'shadow-[0_30px_60px_-40px_rgb(45_91_255_/_35%)]', label: 'panel' },
]
</script>

<template>
  <div class="mx-auto max-w-5xl">
    <!-- header -->
    <header class="mb-14 flex flex-col gap-6 border-b border-[#0F2747]/10 pb-10 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-5">
        <img src="/ripples-logo.png" alt="Ripples" class="h-24" />
        <div>
          <span class="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">Design System</span>
          <h1 class="mt-3 font-heading text-4xl font-extrabold tracking-tight text-ink">Ripples v4</h1>
          <p class="mt-1 text-sm text-muted">ภาษาดีไซน์เดียวสำหรับทุกหน้า — Creator Marketplace</p>
        </div>
      </div>
      <NuxtLink to="/docs" class="inline-flex shrink-0 items-center gap-2 rounded-lg border border-[#0F2747]/10 bg-white px-5 py-3 text-sm font-bold text-ink shadow-sm transition hover:border-primary/40 hover:text-primary">ดูทุกหน้า <Icon name="arrow-up-right" class="h-4 w-4" /></NuxtLink>
    </header>

    <!-- toc -->
    <nav class="mb-16 flex flex-wrap gap-2">
      <a v-for="t in toc" :key="t.href" :href="t.href" class="rounded-lg bg-white px-4 py-2 text-sm font-bold text-muted shadow-sm transition hover:text-primary">{{ t.label }}</a>
    </nav>

    <!-- ── BRAND ── -->
    <section id="brand" class="mb-20 scroll-mt-8">
      <div class="mb-6 flex items-baseline gap-3"><span class="text-sm font-bold uppercase tracking-[0.25em] text-[#5B6B82]/70">01</span><h2 class="font-heading text-2xl font-extrabold tracking-tight text-ink">Brand</h2></div>
      <div class="grid gap-5 sm:grid-cols-2">
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-4 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Logo · light</p>
          <div class="flex items-center justify-center rounded-lg bg-surface py-10"><img src="/ripples-logo.png" alt="Ripples" class="h-28" /></div>
        </div>
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-4 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Logo · on dark</p>
          <div class="flex items-center justify-center rounded-lg bg-gradient-to-br from-ink to-primaryDark py-10"><img src="/ripples-logo-white.png" alt="Ripples" class="h-28" /></div>
        </div>
      </div>
      <div class="mt-5 rounded-xl border border-[#0F2747]/10 bg-white p-7 shadow-sm">
        <p class="text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Motif · Ripple</p>
        <p class="mt-2 max-w-2xl text-sm leading-relaxed text-muted">มาร์ก "r" รูปคลื่นน้ำสีน้ำเงินไล่เฉด สื่อถึงเสียงของ creator ที่กระเพื่อมออกไป — ใช้คู่กับพื้นตาราง (grid overlay) จางๆ และวงเรืองแสง (soft glow) สีน้ำเงินเป็นพื้นหลังตกแต่ง</p>
        <div class="mt-4 flex flex-wrap gap-4">
          <div class="relative h-24 w-24 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primaryDark"><div class="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/15 blur-xl"></div></div>
          <div class="h-24 w-24 rounded-xl border border-[#0F2747]/10" style="background-image:linear-gradient(#2D5BFF 1px,transparent 1px),linear-gradient(90deg,#2D5BFF 1px,transparent 1px);background-size:16px 16px;opacity:.5"></div>
        </div>
      </div>
    </section>

    <!-- ── COLORS ── -->
    <section id="color" class="mb-20 scroll-mt-8">
      <div class="mb-6 flex items-baseline gap-3"><span class="text-sm font-bold uppercase tracking-[0.25em] text-[#5B6B82]/70">02</span><h2 class="font-heading text-2xl font-extrabold tracking-tight text-ink">Colors</h2></div>
      <p class="mb-3 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Primary & ink</p>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <div v-for="c in coreColors" :key="c.name" class="overflow-hidden rounded-xl border border-[#0F2747]/10 bg-white shadow-sm">
          <div class="h-20" :class="c.bg"></div>
          <div class="p-3"><p class="text-sm font-bold text-ink">{{ c.name }}</p><p class="mono text-[11px] text-muted">{{ c.hex }}</p></div>
        </div>
      </div>
      <p class="mb-3 mt-8 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Status (functional)</p>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div v-for="c in statusColors" :key="c.name" class="overflow-hidden rounded-xl border border-[#0F2747]/10 bg-white shadow-sm">
          <div class="h-16" :class="c.bg"></div>
          <div class="p-3"><p class="text-sm font-bold text-ink">{{ c.name }}</p><p class="mono text-[11px] text-muted">{{ c.hex }}</p></div>
        </div>
      </div>
      <p class="mb-3 mt-8 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Notification category tints</p>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div v-for="t in categoryTints" :key="t.tone" class="rounded-xl border border-[#0F2747]/10 bg-white p-4 text-center shadow-sm"><span class="mx-auto flex h-11 w-11 items-center justify-center rounded-xl" :class="t.iconWrap"><Icon :name="t.icon" class="h-5 w-5" /></span><p class="mt-3 text-sm font-bold text-ink">{{ t.label }}</p><p class="mono text-[11px] text-muted">{{ t.tone }}</p></div>
      </div>
    </section>

    <!-- ── TYPOGRAPHY ── -->
    <section id="type" class="mb-20 scroll-mt-8">
      <div class="mb-6 flex items-baseline gap-3"><span class="text-sm font-bold uppercase tracking-[0.25em] text-[#5B6B82]/70">03</span><h2 class="font-heading text-2xl font-extrabold tracking-tight text-ink">Typography</h2></div>
      <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
        <p class="text-sm text-muted">Typeface — <span class="font-bold text-ink">Prompt</span> (Google Fonts) · headings + body · weights 300–800</p>
        <div class="mt-8 space-y-6 divide-y divide-[#0F2747]/10">
          <div v-for="(s, i) in typeSamples" :key="s.meta" :class="i === 0 ? '' : 'pt-6'"><p class="mono text-[11px] text-[#5B6B82]/60">{{ s.meta }}</p><p :class="s.cls">{{ s.text }}</p></div>
        </div>
      </div>
    </section>

    <!-- ── SPACING & ELEVATION ── -->
    <section id="space" class="mb-20 scroll-mt-8">
      <div class="mb-6 flex items-baseline gap-3"><span class="text-sm font-bold uppercase tracking-[0.25em] text-[#5B6B82]/70">04</span><h2 class="font-heading text-2xl font-extrabold tracking-tight text-ink">Spacing & Elevation</h2></div>
      <div class="grid gap-5 lg:grid-cols-2">
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Radius</p>
          <div class="flex flex-wrap items-end gap-5">
            <div v-for="r in radiusSamples" :key="r.label" class="text-center"><div class="h-16 w-16 border-2 border-primary/30 bg-primary/10" :class="r.cls"></div><p class="mono mt-2 text-[11px] text-muted">{{ r.label }}</p></div>
          </div>
        </div>
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Elevation</p>
          <div class="flex flex-wrap items-end gap-6">
            <div v-for="e in elevationSamples" :key="e.label" class="text-center"><div class="h-16 w-24 rounded-xl bg-white" :class="e.cls"></div><p class="mono mt-3 text-[11px] text-muted">{{ e.label }}</p></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── COMPONENTS ── -->
    <section id="components" class="mb-10 scroll-mt-8">
      <div class="mb-6 flex items-baseline gap-3"><span class="text-sm font-bold uppercase tracking-[0.25em] text-[#5B6B82]/70">05</span><h2 class="font-heading text-2xl font-extrabold tracking-tight text-ink">Components</h2></div>

      <div class="space-y-5">
        <!-- buttons -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Buttons</p>
          <div class="flex flex-wrap items-center gap-4">
            <button type="button" class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgb(45_91_255_/_70%)] transition hover:bg-primaryDark active:translate-y-0.5">Primary <Icon name="arrow-right" class="h-4 w-4" /></button>
            <button type="button" class="inline-flex items-center gap-2 rounded-lg border border-[#0F2747]/15 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-primary/40 hover:text-primary">Secondary</button>
            <button type="button" class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-primary transition hover:bg-primary/5">Ghost <Icon name="arrow-right" class="h-4 w-4" /></button>
            <button type="button" disabled class="cursor-not-allowed rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white opacity-50">Disabled</button>
          </div>
        </div>

        <!-- badges & chips -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Badges & status chips</p>
          <div class="flex flex-wrap items-center gap-3">
            <span class="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary"><Icon name="sparkles" class="h-3.5 w-3.5" /> Eyebrow pill</span>
            <span class="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary">เปิดรับสมัคร</span>
            <span class="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-700">รอตรวจ</span>
            <span class="rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-bold text-violet-700">ได้รับเชิญ</span>
            <span class="rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-bold text-green-700">เสร็จสิ้น</span>
            <span class="rounded-full bg-red-100 px-2.5 py-1 text-[11px] font-bold text-red-700">ต้องแก้ไข</span>
          </div>
        </div>

        <!-- inputs -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Form inputs</p>
          <div class="grid gap-5 sm:grid-cols-2">
            <div><label class="mb-1.5 block text-sm font-semibold text-ink">ปกติ</label><input placeholder="กรอกข้อมูล..." class="w-full rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary/50" /></div>
            <div><label class="mb-1.5 block text-sm font-semibold text-ink">Error</label><input value="ผิดพลาด" class="w-full rounded-lg border border-red-400 bg-red-50/40 px-4 py-3 text-sm outline-none" /><p class="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-500"><Icon name="alert-circle" class="h-3.5 w-3.5" /> กรุณากรอกข้อมูลให้ถูกต้อง</p></div>
          </div>
          <div class="mt-5 flex flex-wrap gap-2">
            <button type="button" class="rounded-md bg-primary px-4 py-1.5 text-xs font-bold text-white">Filter active</button>
            <button type="button" class="rounded-md border border-[#0F2747]/10 bg-surface px-4 py-1.5 text-xs font-bold text-muted">Filter</button>
            <button type="button" class="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white">Niche selected</button>
            <button type="button" class="rounded-full bg-surface px-5 py-2.5 text-sm font-semibold text-muted">Niche</button>
          </div>
        </div>

        <!-- cards -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Cards</p>
          <div class="grid gap-5 sm:grid-cols-3">
            <div class="rounded-xl border border-[#0F2747]/10 bg-white p-6 shadow-sm">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10"><Icon name="badge-check" class="h-6 w-6 text-primary" /></div>
              <h3 class="mt-4 font-heading text-base font-bold text-ink">Feature card</h3>
              <p class="mt-1 text-sm text-muted">ไอคอน + หัวข้อ + คำอธิบายสั้น</p>
            </div>
            <div class="overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primaryDark p-6 text-white">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg border border-white/20 bg-white/10"><Icon name="user-plus" class="h-6 w-6" /></div>
              <h3 class="mt-4 font-heading text-base font-extrabold">Gradient CTA</h3>
              <p class="mt-1 text-sm text-white/80">การ์ดเน้น action หลัก</p>
            </div>
            <div class="flex flex-col justify-between rounded-xl border border-[#0F2747]/10 bg-white p-6 shadow-sm">
              <div><p class="text-xs text-muted">ยอดเงิน</p><p class="font-heading text-2xl font-extrabold text-primary">฿125,000</p></div>
              <p class="mt-3 text-[10px] font-bold uppercase tracking-widest text-[#5B6B82]/50">Stat card</p>
            </div>
          </div>
        </div>

        <!-- nav + tabs -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Sidebar nav & tabs</p>
          <div class="grid gap-6 sm:grid-cols-2">
            <div class="space-y-1">
              <a class="block rounded-lg bg-primary/10 px-3 py-2.5 text-sm font-semibold text-primary">เมนู active</a>
              <a class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-muted transition hover:bg-primary/5 hover:text-primary">เมนูปกติ</a>
              <a class="block rounded-lg px-3 py-2.5 text-sm font-semibold text-muted transition hover:bg-primary/5 hover:text-primary">เมนูปกติ</a>
            </div>
            <div class="flex flex-wrap gap-2">
              <button type="button" class="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white">Tab active</button>
              <button type="button" class="rounded-lg border border-[#0F2747]/10 bg-white px-4 py-2 text-sm font-bold text-muted">Tab</button>
              <button type="button" class="rounded-lg border border-[#0F2747]/10 bg-white px-4 py-2 text-sm font-bold text-muted">Tab</button>
            </div>
          </div>
        </div>

        <!-- toggle switch -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Toggle switch</p>
          <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
            <div class="flex items-center gap-3"><span class="relative h-7 w-12 rounded-full bg-primary"><span class="absolute left-6 top-1 h-5 w-5 rounded-full bg-white shadow"></span></span><span class="text-sm font-semibold text-ink">เปิด</span></div>
            <div class="flex items-center gap-3"><span class="relative h-7 w-12 rounded-full bg-[#0F2747]/15"><span class="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow"></span></span><span class="text-sm font-semibold text-muted">ปิด</span></div>
            <div class="flex items-center gap-3"><span class="relative h-7 w-12 rounded-full bg-primary opacity-60"><span class="absolute left-6 top-1 h-5 w-5 rounded-full bg-white shadow"></span></span><span class="flex items-center gap-1 text-sm font-semibold text-muted"><Icon name="lock" class="h-3.5 w-3.5" /> ล็อก (บังคับเปิด)</span></div>
          </div>
        </div>

        <!-- data source tags -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-2 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Data source tags</p>
          <p class="mb-5 text-sm text-muted">กำกับที่มาของข้อมูลในฟอร์ม — KOL กรอกเอง / ดึงจาก API (อ่านอย่างเดียว) / แอดมินตั้ง</p>
          <div class="flex flex-wrap items-center gap-3">
            <span class="rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-bold text-green-600">KOL กรอกเอง</span>
            <span class="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-600">sync · อ่านอย่างเดียว</span>
            <span class="rounded bg-violet-50 px-1.5 py-0.5 text-[10px] font-bold text-violet-600">แอดมินตั้ง</span>
            <span class="inline-flex items-center gap-1 rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-bold text-green-600"><Icon name="badge-check" class="h-3 w-3" /> ยืนยันแล้ว</span>
          </div>
        </div>

        <!-- progress / completeness -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Progress · profile completeness</p>
          <div class="flex items-center justify-between"><p class="text-sm font-bold text-ink">ความครบของโปรไฟล์</p><p class="font-heading text-lg font-extrabold text-primary">60%</p></div>
          <div class="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-surface"><div class="h-full rounded-full bg-gradient-to-r from-primary to-primaryLight" style="width:60%"></div></div>
          <div class="mt-3 flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"><Icon name="check" class="h-3 w-3" /> ข้อมูลพื้นฐาน</span>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"><Icon name="check" class="h-3 w-3" /> เชื่อมโซเชียล</span>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted"><Icon name="circle" class="h-3 w-3" /> ตั้ง Rate Card</span>
            <span class="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-muted"><Icon name="circle" class="h-3 w-3" /> ยืนยันตัวตน</span>
          </div>
        </div>

        <!-- notification item -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Notification item (unread / urgent)</p>
          <div class="space-y-3">
            <a class="group flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/[0.035] p-5 shadow-sm">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600"><Icon name="check-circle" class="h-5 w-5" /></span>
              <span class="min-w-0 flex-1">
                <span class="flex flex-wrap items-center gap-2"><span class="font-bold text-ink">จ่ายเงินแล้ว ฿18,000</span><span class="h-2 w-2 rounded-full bg-green-500"></span></span>
                <span class="mt-0.5 block text-sm text-muted">ค่างานแคมเปญ “Glow Serum Launch” โอนเข้าบัญชีเรียบร้อย</span>
                <span class="mt-2 flex items-center gap-2"><span class="inline-flex items-center gap-1 rounded-md bg-green-50 px-1.5 py-0.5 text-[11px] font-bold text-green-700">การเงิน</span><span class="text-[11px] text-[#5B6B82]/55">12 นาทีที่แล้ว</span></span>
              </span>
              <Icon name="chevron-right" class="ml-1 mt-1 h-4 w-4 shrink-0 text-[#5B6B82]/35" />
            </a>
            <a class="group flex items-start gap-4 rounded-xl border border-[#0F2747]/10 bg-white p-5">
              <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><Icon name="alarm-clock" class="h-5 w-5" /></span>
              <span class="min-w-0 flex-1">
                <span class="flex flex-wrap items-center gap-2"><span class="font-bold text-ink">ใกล้ถึง deadline ส่งงาน</span><span class="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700"><Icon name="alarm-clock" class="h-3 w-3" /> ด่วน</span></span>
                <span class="mt-0.5 block text-sm text-muted">งาน “รีล Instagram — Glow Serum” ครบกำหนดพรุ่งนี้ 18:00 น.</span>
                <span class="mt-2 flex items-center gap-2"><span class="inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-[11px] font-bold text-amber-700">งาน</span><span class="text-[11px] text-[#5B6B82]/55">1 ชม. ที่แล้ว</span></span>
              </span>
              <Icon name="chevron-right" class="ml-1 mt-1 h-4 w-4 shrink-0 text-[#5B6B82]/35" />
            </a>
          </div>
        </div>

        <!-- filter chips w/ count -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Filter chips (with count)</p>
          <div class="flex flex-wrap gap-2">
            <button type="button" class="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-sm font-bold text-white shadow-sm"><Icon name="inbox" class="h-4 w-4" /> ทั้งหมด <span class="rounded-full bg-white/25 px-1.5 text-[11px]">11</span></button>
            <button type="button" class="inline-flex items-center gap-1.5 rounded-full border border-[#0F2747]/10 bg-white px-3.5 py-2 text-sm font-bold text-muted transition hover:text-primary"><Icon name="megaphone" class="h-4 w-4" /> แคมเปญ <span class="rounded-full bg-surface px-1.5 text-[11px]">3</span></button>
            <button type="button" class="inline-flex items-center gap-1.5 rounded-full border border-[#0F2747]/10 bg-white px-3.5 py-2 text-sm font-bold text-muted transition hover:text-primary"><Icon name="wallet" class="h-4 w-4" /> การเงิน <span class="rounded-full bg-surface px-1.5 text-[11px]">2</span></button>
          </div>
        </div>

        <!-- identity chip + toast -->
        <div class="grid gap-5 lg:grid-cols-2">
          <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
            <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Identity chip + bell</p>
            <div class="flex items-center gap-3 rounded-xl border border-[#0F2747]/10 bg-surface p-3">
              <img src="https://i.pravatar.cc/120?img=32" alt="" class="h-11 w-11 shrink-0 rounded-full object-cover" />
              <div class="min-w-0 flex-1"><p class="truncate text-sm font-bold text-ink">สมใจ ใจดี</p><p class="text-xs text-muted">Creator · @somsai_jd</p></div>
              <span class="relative flex h-10 w-10 items-center justify-center rounded-lg border border-[#0F2747]/10 bg-white text-ink shadow-sm"><Icon name="bell" class="h-5 w-5" /><span class="absolute -right-1.5 -top-1.5 flex min-w-[18px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">4</span></span>
            </div>
          </div>
          <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
            <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Toast</p>
            <div class="flex items-center justify-center rounded-xl bg-surface py-8">
              <div class="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white shadow-xl"><Icon name="check" class="h-4 w-4" /> บันทึกโปรไฟล์แล้ว</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── LOADING & STATES ── -->
    <section id="loading" class="mb-10 scroll-mt-8">
      <div class="mb-2 flex items-baseline gap-3"><span class="text-sm font-bold uppercase tracking-[0.25em] text-[#5B6B82]/70">06</span><h2 class="font-heading text-2xl font-extrabold tracking-tight text-ink">Loading & States</h2></div>
      <p class="mb-6 max-w-2xl text-sm text-muted">เลือกรูปแบบให้ตรงบริบท: <strong class="text-ink">Skeleton</strong> สำหรับโหลดเนื้อหาที่รู้โครงสร้าง (การ์ด/ลิสต์), <strong class="text-ink">Spinner</strong> สำหรับ action สั้นๆ หรือทั้งหน้า, <strong class="text-ink">ปุ่มโหลด</strong> ตอน submit, และ <strong class="text-ink">Empty state</strong> เมื่อไม่มีข้อมูล</p>

      <div class="space-y-5">
        <!-- spinners -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-6 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Spinner & inline</p>
          <div class="flex flex-wrap items-center gap-10">
            <div class="text-center"><div class="mx-auto h-5 w-5 animate-spin rounded-full border-2 border-primary/25 border-t-primary"></div><p class="mono mt-3 text-[11px] text-muted">sm</p></div>
            <div class="text-center"><div class="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary/25 border-t-primary"></div><p class="mono mt-3 text-[11px] text-muted">md</p></div>
            <div class="text-center"><div class="mx-auto h-12 w-12 animate-spin rounded-full border-[3px] border-primary/20 border-t-primary"></div><p class="mono mt-3 text-[11px] text-muted">lg</p></div>
            <div class="text-center"><div class="flex items-center gap-1.5"><span class="dot h-2.5 w-2.5 rounded-full bg-primary" style="animation-delay:-0.32s"></span><span class="dot h-2.5 w-2.5 rounded-full bg-primary" style="animation-delay:-0.16s"></span><span class="dot h-2.5 w-2.5 rounded-full bg-primary"></span></div><p class="mono mt-3 text-[11px] text-muted">dots</p></div>
            <div class="flex items-center gap-2 text-sm font-semibold text-muted"><span class="h-4 w-4 animate-spin rounded-full border-2 border-muted/30 border-t-muted"></span> กำลังโหลด...</div>
          </div>
        </div>

        <!-- button loading -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-6 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Button · loading state</p>
          <div class="flex flex-wrap items-center gap-4">
            <button type="button" disabled class="inline-flex cursor-wait items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white opacity-80"><span class="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span> กำลังบันทึก...</button>
            <button type="button" disabled class="inline-flex cursor-wait items-center gap-2 rounded-lg border border-[#0F2747]/15 bg-white px-6 py-3 text-sm font-bold text-muted"><span class="h-4 w-4 animate-spin rounded-full border-2 border-muted/30 border-t-muted"></span> กำลังส่ง...</button>
          </div>
        </div>

        <!-- skeleton card -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-6 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Skeleton · campaign card</p>
          <div class="grid gap-5 sm:grid-cols-3">
            <div v-for="n in 3" :key="n" class="overflow-hidden rounded-xl border border-[#0F2747]/10 bg-white"><div class="skeleton h-40 w-full"></div><div class="space-y-3 p-5"><div class="skeleton h-3 w-1/3 rounded"></div><div class="skeleton h-4 w-3/4 rounded"></div><div class="skeleton h-3 w-full rounded"></div><div class="flex items-center justify-between pt-2"><div class="skeleton h-6 w-24 rounded"></div><div class="skeleton h-9 w-20 rounded-lg"></div></div></div></div>
          </div>
        </div>

        <!-- skeleton list -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-6 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Skeleton · list / table row</p>
          <div class="space-y-3">
            <div class="flex items-center gap-4 rounded-xl border border-[#0F2747]/10 bg-surface p-4"><div class="skeleton h-11 w-11 rounded-xl"></div><div class="flex-1 space-y-2"><div class="skeleton h-3.5 w-1/2 rounded"></div><div class="skeleton h-3 w-1/3 rounded"></div></div><div class="skeleton h-6 w-20 rounded-full"></div></div>
            <div class="flex items-center gap-4 rounded-xl border border-[#0F2747]/10 bg-surface p-4"><div class="skeleton h-11 w-11 rounded-xl"></div><div class="flex-1 space-y-2"><div class="skeleton h-3.5 w-2/3 rounded"></div><div class="skeleton h-3 w-1/4 rounded"></div></div><div class="skeleton h-6 w-20 rounded-full"></div></div>
            <div class="flex items-center gap-4 rounded-xl border border-[#0F2747]/10 bg-surface p-4"><div class="skeleton h-11 w-11 rounded-xl"></div><div class="flex-1 space-y-2"><div class="skeleton h-3.5 w-1/2 rounded"></div><div class="skeleton h-3 w-2/5 rounded"></div></div><div class="skeleton h-6 w-20 rounded-full"></div></div>
          </div>
        </div>

        <!-- section + empty -->
        <div class="grid gap-5 lg:grid-cols-2">
          <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
            <p class="mb-6 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Section / page loader</p>
            <div class="flex flex-col items-center justify-center rounded-xl bg-surface py-12">
              <div class="relative flex h-14 w-14 items-center justify-center"><div class="absolute inset-0 animate-spin rounded-full border-[3px] border-primary/20 border-t-primary"></div><div class="h-6 w-6 animate-pulse rounded-full bg-primary/20"></div></div>
              <p class="mt-4 text-sm font-semibold text-muted">กำลังโหลดข้อมูล...</p>
            </div>
          </div>
          <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
            <p class="mb-6 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Empty state</p>
            <div class="flex flex-col items-center justify-center rounded-xl bg-surface py-10 text-center">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10"><Icon name="inbox" class="h-7 w-7 text-primary" /></div>
              <p class="mt-4 font-heading text-base font-bold text-ink">ยังไม่มีแคมเปญ</p>
              <p class="mt-1 text-sm text-muted">เมื่อมีแคมเปญที่ตรงกับคุณ จะแสดงที่นี่</p>
              <button type="button" class="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-primaryDark">ค้นหาแคมเปญ <Icon name="arrow-right" class="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── OVERLAYS & FEEDBACK ── -->
    <section id="overlays" class="mb-10 scroll-mt-8">
      <div class="mb-6 flex items-baseline gap-3"><span class="text-sm font-bold uppercase tracking-[0.25em] text-[#5B6B82]/70">07</span><h2 class="font-heading text-2xl font-extrabold tracking-tight text-ink">Overlays & Feedback</h2></div>
      <div class="space-y-5">

        <!-- status banners -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Status banners · KYC states</p>
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4"><Icon name="upload" class="mt-0.5 h-6 w-6 shrink-0 text-primary" /><div><p class="font-bold text-ink">ยังไม่ส่ง</p><p class="text-sm text-muted">อัปโหลดเอกสารเพื่อยืนยันบัญชีและเริ่มรับเงิน</p></div></div>
            <div class="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900"><Icon name="clock" class="mt-0.5 h-6 w-6 shrink-0 text-amber-600" /><div><p class="font-bold">กำลังตรวจสอบ</p><p class="text-sm opacity-90">ใช้เวลา 1–2 วันทำการ ระหว่างนี้แก้ไขข้อมูลไม่ได้</p></div></div>
            <div class="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-900"><Icon name="check-circle" class="mt-0.5 h-6 w-6 shrink-0 text-green-600" /><div><p class="font-bold">อนุมัติแล้ว</p><p class="text-sm opacity-90">บัญชีได้รับการยืนยันครบถ้วน พร้อมรับเงิน</p></div></div>
            <div class="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-900"><Icon name="x-circle" class="mt-0.5 h-6 w-6 shrink-0 text-red-600" /><div><p class="font-bold">ถูกปฏิเสธ</p><p class="text-sm opacity-90">ภาพหน้าสมุดบัญชีไม่ชัด — กรุณาอัปโหลดใหม่</p></div></div>
          </div>
        </div>

        <!-- modal -->
        <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
          <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Modal · dialog</p>
          <div class="flex justify-center rounded-xl bg-ink/[0.06] p-6">
            <div class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-[#0F2747]/10">
              <div class="flex items-center justify-between"><h3 class="font-heading text-lg font-bold text-ink">เปลี่ยนรหัสผ่าน</h3><Icon name="x" class="h-5 w-5 text-[#5B6B82]/60" /></div>
              <div class="mt-4 space-y-3">
                <div><label class="mb-1.5 block text-sm font-semibold text-ink">รหัสผ่านใหม่</label><input type="password" placeholder="อย่างน้อย 8 ตัว" class="w-full rounded-lg border border-[#0F2747]/15 bg-white px-3.5 py-2.5 text-sm outline-none" /></div>
              </div>
              <div class="mt-5 flex gap-2"><button type="button" class="flex-1 rounded-lg border border-[#0F2747]/10 px-4 py-2.5 text-sm font-bold text-ink">ยกเลิก</button><button type="button" class="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white">บันทึก</button></div>
            </div>
          </div>
        </div>

        <!-- dropdown + cookie -->
        <div class="grid gap-5 lg:grid-cols-2">
          <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
            <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Notification dropdown</p>
            <div class="mx-auto max-w-[340px] overflow-hidden rounded-2xl border border-[#0F2747]/10 shadow-xl">
              <div class="flex items-center justify-between border-b border-[#0F2747]/10 px-4 py-3.5"><p class="text-sm font-extrabold text-ink">การแจ้งเตือน <span class="text-muted">(4 ใหม่)</span></p><span class="text-xs font-bold text-primary">อ่านทั้งหมด</span></div>
              <div class="bg-primary/[0.03] flex items-start gap-3 px-4 py-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600"><Icon name="check-circle" class="h-[18px] w-[18px]" /></span><div class="min-w-0"><div class="flex items-center gap-1.5"><p class="truncate text-sm font-bold text-ink">จ่ายเงินแล้ว ฿18,000</p><span class="h-1.5 w-1.5 rounded-full bg-green-500"></span></div><p class="text-xs text-muted">โอนเข้าบัญชีเรียบร้อย</p><p class="mt-1 text-[11px] text-[#5B6B82]/55">12 นาทีที่แล้ว</p></div></div>
              <div class="flex items-start gap-3 px-4 py-3"><span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600"><Icon name="alarm-clock" class="h-[18px] w-[18px]" /></span><div class="min-w-0"><p class="truncate text-sm font-bold text-ink">ใกล้ถึง deadline ส่งงาน</p><p class="text-xs text-muted">ครบกำหนดพรุ่งนี้ 18:00 น.</p><p class="mt-1 text-[11px] text-[#5B6B82]/55">1 ชม. ที่แล้ว</p></div></div>
              <div class="block border-t border-[#0F2747]/10 bg-surface px-4 py-3 text-center text-sm font-bold text-primary">ดูทั้งหมด</div>
            </div>
          </div>
          <div class="rounded-xl border border-[#0F2747]/10 bg-white p-8 shadow-sm">
            <p class="mb-5 text-xs font-bold uppercase tracking-widest text-[#5B6B82]/60">Cookie consent</p>
            <div class="mx-auto max-w-sm rounded-2xl border border-[#0F2747]/10 bg-white p-5 shadow-xl">
              <div class="flex items-start gap-3"><div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon name="cookie" class="h-6 w-6" /></div><div><p class="font-heading text-base font-extrabold text-ink">เราใช้คุกกี้</p><p class="mt-1 text-sm leading-relaxed text-muted">เพื่อให้เว็บทำงานได้ดีและแนะนำแคมเปญที่ตรงกับคุณ</p></div></div>
              <div class="mt-4 flex flex-col gap-2 sm:flex-row-reverse"><button type="button" class="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white">ยอมรับทั้งหมด</button><button type="button" class="flex-1 rounded-lg border border-[#0F2747]/15 bg-white px-4 py-2.5 text-sm font-bold text-ink">เฉพาะที่จำเป็น</button></div>
              <p class="mt-2 text-center text-xs font-bold text-muted">ตั้งค่าคุกกี้</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="mt-16 flex items-center gap-3 border-t border-[#0F2747]/10 pt-8">
      <img src="/ripples-logo.png" alt="Ripples" class="h-12" />
      <p class="text-[11px] text-[#5B6B82]/60">© 2026 Ripples · Design System v4</p>
    </footer>
  </div>
</template>

<style scoped>
.mono {
  font-family: 'JetBrains Mono', monospace;
}
@keyframes ripShimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
.skeleton {
  background: linear-gradient(90deg, #e6ecf5 25%, #f4f7fb 37%, #e6ecf5 63%);
  background-size: 200% 100%;
  animation: ripShimmer 1.4s ease-in-out infinite;
}
@keyframes ripBounce {
  0%,
  80%,
  100% {
    transform: scale(0.5);
    opacity: 0.4;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
.dot {
  animation: ripBounce 1.2s infinite ease-in-out both;
}
</style>
