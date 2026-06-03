<template>
  <div class="relative min-h-screen overflow-x-hidden bg-[#F4F7FB] font-sans text-[#0F2747]">
    <!-- Subtle grid overlay -->
    <div
      class="pointer-events-none fixed inset-0 opacity-[0.04]"
      :style="{
        backgroundImage:
          'linear-gradient(#2D5BFF 1px, transparent 1px), linear-gradient(90deg, #2D5BFF 1px, transparent 1px)',
        backgroundSize: '44px 44px',
      }"
    />

    <!-- ─────────── SIDEBAR (desktop) ─────────── -->
    <aside class="fixed inset-y-0 left-0 z-50 hidden w-72 flex-col border-r border-[#0F2747]/10 bg-white px-6 py-7 lg:flex">
      <img src="/ripples-logo.svg" alt="Ripples" class="h-16 self-center" />

      <!-- dual login -->
      <div class="mt-7 space-y-2.5">
        <a href="#" class="flex items-center justify-between rounded-lg bg-[#2D5BFF] px-4 py-3 text-white shadow-[0_6px_16px_-6px_rgb(45_91_255_/_55%)]">
          <span class="text-left">
            <span class="block text-[10px] font-bold uppercase tracking-widest text-white/70">Influencer / Creator</span>
            <span class="block text-sm font-bold">เข้าสู่ระบบ</span>
          </span>
          <ArrowRight class="h-4 w-4" />
        </a>
        <a href="#" class="flex items-center justify-between rounded-lg border border-[#0F2747]/15 bg-[#F4F7FB] px-4 py-3 text-[#0F2747]">
          <span class="text-left">
            <span class="block text-[10px] font-bold uppercase tracking-widest text-[#2D5BFF]">Marketer</span>
            <span class="block text-sm font-bold">เข้าสู่ระบบ (Out of scope)</span>
          </span>
          <ArrowRight class="h-4 w-4 text-[#2D5BFF]" />
        </a>
      </div>

      <!-- menu -->
      <nav class="mt-7 flex flex-1 flex-col gap-0.5">
        <a
          v-for="item in menu"
          :key="item.label"
          href="#"
          :class="[
            'rounded-lg px-3 py-2.5 text-sm font-semibold transition',
            item.active ? 'bg-[#2D5BFF]/10 text-[#2D5BFF]' : 'text-[#5B6B82] hover:bg-[#2D5BFF]/5 hover:text-[#2D5BFF]',
          ]"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- footer of sidebar -->
      <div class="mt-6 space-y-5">
        <div class="flex w-fit items-center rounded-md border border-[#0F2747]/10 bg-white p-1 shadow-sm">
          <span class="rounded bg-[#2D5BFF] px-2.5 py-0.5 text-[10px] font-bold text-white">TH</span>
          <span class="px-2.5 py-0.5 text-[10px] font-bold text-[#5B6B82]/40">EN</span>
        </div>
        <p class="text-[11px] leading-relaxed text-[#5B6B82]">
          Marketplace KOL &amp; Influencer ยุคใหม่ — สำหรับแบรนด์และ creator ในประเทศไทย
        </p>
        <div class="flex items-center gap-4 text-[#5B6B82]/40">
          <a v-for="s in socials" :key="s.name" href="#" :aria-label="s.name" class="transition hover:text-[#2D5BFF]">
            <component :is="s.icon" v-if="s.icon" class="h-[18px] w-[18px]" />
            <svg v-else viewBox="0 0 24 24" fill="currentColor" class="h-[18px] w-[18px]" v-html="s.path" />
          </a>
        </div>
      </div>
    </aside>

    <!-- ─────────── TOPBAR (mobile) ─────────── -->
    <header class="sticky top-0 z-50 flex items-center justify-between border-b border-[#0F2747]/10 bg-white/90 px-6 py-4 backdrop-blur-md lg:hidden">
      <img src="/ripples-logo.svg" alt="Ripples" class="h-10" />
      <button class="flex h-10 w-10 items-center justify-center rounded-lg border border-[#0F2747]/10 bg-white text-[#0F2747] shadow-sm" aria-label="Menu">
        <Menu class="h-5 w-5" />
      </button>
    </header>

    <!-- ─────────── MAIN ─────────── -->
    <div class="relative lg:pl-72">
      <main class="mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-14">
        <!-- editorial intro -->
        <section class="mb-10 lg:mb-14">
          <span class="inline-flex items-center gap-2 rounded-md border border-[#2D5BFF]/20 bg-[#2D5BFF]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#2D5BFF]">
            <Sparkles class="h-3.5 w-3.5" /> Creator Marketplace
          </span>
          <h1 class="mt-5 font-heading text-4xl font-extrabold leading-[1.0] tracking-tight text-[#0F2747] sm:text-5xl lg:text-7xl">
            เปลี่ยนคอนเทนต์<br />
            ให้เป็น<span class="text-[#2D5BFF]">รายได้จริง</span>
          </h1>
          <p class="mt-5 max-w-xl text-sm leading-relaxed text-[#5B6B82] lg:text-base">
            จับคู่กับแบรนด์ที่ผ่านการตรวจสอบ จ่ายตรงเวลา เอกสารภาษีจัดให้ครบ — ในที่เดียว
          </p>
        </section>

        <!-- role cards -->
        <section class="mb-14 grid gap-5 sm:grid-cols-2 lg:mb-20">
          <a
            href="#"
            class="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2D5BFF] to-[#1A3FB8] p-8 text-white lg:p-10"
          >
            <div class="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10 blur-2xl transition-transform group-hover:scale-125" />
            <div class="flex h-12 w-12 items-center justify-center rounded-lg border border-white/20 bg-white/10">
              <UserPlus class="h-6 w-6" />
            </div>
            <h2 class="mt-6 font-heading text-2xl font-extrabold leading-tight lg:text-3xl">
              สมัครเข้าเป็น<br />INFLUENCER / CREATOR
            </h2>
            <p class="mt-2 text-sm text-white/80">เพื่อร่วมงานกับเรา รับงานรีวิวจากแบรนด์ชั้นนำ</p>
            <span class="mt-6 inline-flex items-center gap-2 text-sm font-bold">
              เริ่มเลย <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>

          <a
            href="#"
            class="group relative overflow-hidden rounded-xl border border-[#0F2747]/10 bg-white p-8 text-[#0F2747] shadow-[0_20px_50px_-30px_rgb(15_39_71_/_40%)] lg:p-10"
          >
            <div class="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#2D5BFF]/5 blur-2xl transition-transform group-hover:scale-125" />
            <div class="flex h-12 w-12 items-center justify-center rounded-lg border border-[#2D5BFF]/20 bg-[#2D5BFF]/10 text-[#2D5BFF]">
              <Megaphone class="h-6 w-6" />
            </div>
            <h2 class="mt-6 font-heading text-2xl font-extrabold leading-tight lg:text-3xl">
              เปิดบัญชีเป็น<br />MARKETER (Out of scope)
            </h2>
            <p class="mt-2 text-sm text-[#5B6B82]">เพื่อสร้างแคมเปญรีวิวสินค้า หา creator ที่ใช่</p>
            <span class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#2D5BFF]">
              สร้างแคมเปญ <ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </section>

        <!-- trusted brands -->
        <section class="mb-14 lg:mb-20">
          <p class="mb-5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#5B6B82]/50">
            แบรนด์ชั้นนำที่ไว้วางใจ Ripples
          </p>
          <div class="grid grid-cols-2 divide-x divide-y divide-[#0F2747]/10 overflow-hidden rounded-xl border border-[#0F2747]/10 bg-white sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
            <div
              v-for="b in brands"
              :key="b.name"
              class="flex items-center justify-center gap-2 p-5 opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
            >
              <span class="flex h-7 w-7 items-center justify-center rounded-md bg-[#2D5BFF]/10 text-xs font-extrabold text-[#2D5BFF]">{{ b.name[0] }}</span>
              <span class="font-heading text-sm font-extrabold tracking-tight text-[#0F2747]">{{ b.name }}</span>
            </div>
          </div>
        </section>

        <!-- campaigns -->
        <section>
          <div class="mb-6 flex items-end justify-between">
            <div>
              <h2 class="font-heading text-2xl font-extrabold tracking-tight text-[#0F2747] lg:text-4xl">
                แคมเปญที่น่าสนใจ
              </h2>
              <p class="mt-1 text-xs text-[#5B6B82] lg:text-sm">ตัวอย่างแคมเปญจากแบรนด์ — เข้าสู่ระบบเพื่อดูทั้งหมดและสมัครงาน</p>
            </div>
            <a href="/preview/v4-campaigns" class="shrink-0 text-xs font-bold text-[#2D5BFF] lg:text-sm">เข้าสู่ระบบเพื่อดูทั้งหมด →</a>
          </div>

          <div class="grid gap-5 lg:grid-cols-3">
            <!-- featured -->
            <article class="group relative overflow-hidden rounded-xl border border-[#0F2747]/10 lg:col-span-2 lg:row-span-2">
              <img :src="featured.image" :alt="featured.title" class="h-full min-h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0F2747] via-[#0F2747]/40 to-transparent" />
              <div class="absolute left-6 right-6 top-6 flex items-center justify-between">
                <span class="flex items-center gap-1.5 rounded-md bg-[#2D5BFF] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Live
                </span>
                <span class="rounded-md bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">{{ featured.tag }}</span>
              </div>
              <div class="absolute inset-x-0 bottom-0 p-6 text-white lg:p-8">
                <p class="text-xs font-medium text-white/70">{{ featured.brand }}</p>
                <h3 class="mt-1 font-heading text-2xl font-extrabold lg:text-3xl">{{ featured.title }}</h3>
                <p class="mt-2 max-w-md text-xs text-white/70 lg:text-sm">{{ featured.desc }}</p>
                <div class="mt-4 flex items-center justify-between">
                  <div>
                    <span class="block text-[10px] uppercase tracking-widest text-white/50">Budget</span>
                    <span class="font-bold">{{ featured.budget }}</span>
                  </div>
                  <span class="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#2D5BFF] transition-transform group-hover:translate-x-1">
                    <ArrowRight class="h-5 w-5" />
                  </span>
                </div>
              </div>
            </article>

            <!-- side campaigns -->
            <article
              v-for="c in campaigns"
              :key="c.title"
              class="group relative min-h-[200px] overflow-hidden rounded-xl border border-[#0F2747]/10 shadow-sm"
            >
              <img :src="c.image" :alt="c.title" class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#0F2747] via-[#0F2747]/40 to-transparent" />
              <div class="relative flex h-full flex-col justify-end p-5">
                <span class="w-fit rounded-md bg-white/85 px-2 py-0.5 text-[9px] font-bold uppercase text-[#2D5BFF] backdrop-blur">{{ c.tag }}</span>
                <h3 class="mt-2 font-heading text-lg font-bold text-white">{{ c.title }}</h3>
                <p class="text-xs text-white/75">{{ c.brand }}</p>
                <span class="mt-1 text-sm font-bold text-white">{{ c.budget }}</span>
              </div>
            </article>
          </div>

          <!-- more campaigns -->
          <div class="mt-5 grid gap-5 sm:grid-cols-2">
            <article
              v-for="c in more"
              :key="c.title"
              class="group overflow-hidden rounded-xl border border-[#0F2747]/10 bg-white shadow-sm transition-shadow hover:shadow-[0_24px_50px_-30px_rgb(45_91_255_/_40%)]"
            >
              <div class="relative h-40 overflow-hidden">
                <img :src="c.image" :alt="c.title" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span class="absolute left-4 top-4 rounded-md bg-white/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#2D5BFF] backdrop-blur">{{ c.tag }}</span>
              </div>
              <div class="p-5">
                <p class="text-xs text-[#5B6B82]">{{ c.brand }}</p>
                <h3 class="mt-0.5 font-heading text-lg font-bold text-[#0F2747]">{{ c.title }}</h3>
                <p class="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#5B6B82]/80">{{ c.desc }}</p>
                <div class="mt-4 flex items-center justify-between">
                  <div>
                    <span class="block text-[10px] uppercase tracking-widest text-[#5B6B82]/40">Budget</span>
                    <span class="font-bold text-[#2D5BFF]">{{ c.budget }}</span>
                  </div>
                  <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2D5BFF]/10 text-[#2D5BFF] transition-transform group-hover:translate-x-1">
                    <ArrowRight class="h-4 w-4" />
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <!-- ─────────── STATS ─────────── -->
        <section class="mt-16 lg:mt-24">
          <div class="grid grid-cols-2 divide-x divide-y divide-[#0F2747]/10 overflow-hidden rounded-xl border border-[#0F2747]/10 bg-white shadow-[0_30px_60px_-40px_rgb(45_91_255_/_35%)] sm:grid-cols-4 sm:divide-y-0">
            <div v-for="s in stats" :key="s.label" class="p-8 text-center lg:p-10">
              <div class="font-heading text-3xl font-extrabold text-[#2D5BFF] lg:text-5xl">{{ s.value }}</div>
              <div class="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#5B6B82]/60 lg:text-xs">{{ s.label }}</div>
            </div>
          </div>
        </section>

        <!-- ─────────── WHY ─────────── -->
        <section class="mt-16 lg:mt-28">
          <h2 class="font-heading text-3xl font-extrabold tracking-tight text-[#0F2747] lg:text-5xl">
            ทำไมต้อง <span class="text-[#2D5BFF]">Ripples</span>
          </h2>
          <p class="mt-2 max-w-lg text-sm text-[#5B6B82] lg:text-base">เครื่องมือครบสำหรับ Creator ตั้งแต่หา campaign จนถึงรับเงิน — จบในที่เดียว</p>
          <div class="mt-8 grid gap-5 sm:grid-cols-3">
            <div v-for="w in whys" :key="w.title" class="rounded-xl border border-[#0F2747]/10 bg-white p-7 shadow-sm">
              <div class="flex h-12 w-12 items-center justify-center rounded-lg border border-[#2D5BFF]/20 bg-[#2D5BFF]/10">
                <component :is="w.icon" class="h-6 w-6 text-[#2D5BFF]" />
              </div>
              <h3 class="mt-5 font-heading text-lg font-bold text-[#0F2747]">{{ w.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-[#5B6B82]">{{ w.desc }}</p>
            </div>
          </div>
        </section>

        <!-- ─────────── HOW ─────────── -->
        <section class="mt-16 lg:mt-28">
          <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#0F2747] to-[#1A3FB8] p-8 text-white lg:p-14">
            <div
              class="pointer-events-none absolute inset-0 opacity-[0.06]"
              :style="{
                backgroundImage:
                  'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }"
            />
            <h2 class="relative font-heading text-2xl font-extrabold tracking-tight lg:text-4xl">เริ่มต้น 4 ขั้นตอนง่ายๆ</h2>
            <div class="relative mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              <div v-for="(step, i) in steps" :key="step" class="flex gap-4 lg:flex-col">
                <div
                  :class="[
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-heading text-lg font-extrabold',
                    i === 0 ? 'bg-[#4D8BFF] text-[#0F2747]' : 'border border-white/15 bg-white/10 text-white',
                  ]"
                >
                  {{ i + 1 }}
                </div>
                <p class="text-sm font-medium leading-relaxed lg:text-base">{{ step }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- ─────────── CTA ─────────── -->
        <section class="mt-16 text-center lg:mt-28">
          <h2 class="font-heading text-3xl font-extrabold leading-tight tracking-tight text-[#0F2747] lg:text-6xl">
            พร้อมเปลี่ยนคอนเทนต์<br />เป็น<span class="text-[#2D5BFF]">รายได้</span>?
          </h2>
          <p class="mt-4 text-sm text-[#5B6B82] lg:text-base">สมัครฟรี ไม่มีค่าธรรมเนียมแรกเข้า ยกเลิกได้ทุกเมื่อ</p>
          <button class="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#2D5BFF] px-8 py-4 text-lg font-bold text-white shadow-[0_12px_30px_-10px_rgb(45_91_255_/_70%)] transition-all active:translate-y-0.5">
            เริ่มเป็น Creator ฟรี <ArrowRight class="h-5 w-5" />
          </button>
        </section>

        <!-- ─────────── FOOTER ─────────── -->
        <footer class="mt-16 flex flex-col items-center gap-3 border-t border-[#0F2747]/10 pt-8 text-center lg:mt-24">
          <img src="/ripples-logo.svg" alt="Ripples" class="h-12" />
          <p class="text-[11px] text-[#5B6B82]/50">© 2026 Ripples Creator Marketplace</p>
        </footer>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  BadgeCheck,
  Facebook,
  FileText,
  Instagram,
  Megaphone,
  Menu,
  Sparkles,
  TrendingUp,
  UserPlus,
  Youtube,
} from 'lucide-vue-next'

definePageMeta({ layout: false })

const menu = [
  { label: 'หน้าหลัก', active: true },
  { label: 'เกี่ยวกับเรา', active: false },
  { label: 'บริการ', active: false },
  { label: 'FAQ คำถามที่พบบ่อย', active: false },
  { label: 'ช่วยเหลือ', active: false },
  { label: 'ติดต่อเรา', active: false },
]

const socials = [
  { name: 'Facebook', icon: Facebook, path: '' },
  { name: 'Instagram', icon: Instagram, path: '' },
  { name: 'X', icon: null, path: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>' },
  { name: 'YouTube', icon: Youtube, path: '' },
  { name: 'TikTok', icon: null, path: '<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.09Z"/>' },
]

const brands = [
  { name: 'Luxe Beauty' },
  { name: 'TechZone' },
  { name: 'Taste Kitchen' },
  { name: 'GlowLab' },
  { name: 'FitPro' },
  { name: 'Maison Aroma' },
]

const featured = {
  title: 'Summer Collection 2026',
  brand: 'Fashion Brand Co.',
  tag: 'fashion',
  budget: '฿15,000 – 30,000',
  desc: 'ร่วมโปรโมทคอลเลกชั่นแฟชั่นใหม่ล่าสุดสำหรับซัมเมอร์นี้ มองหา Influencer ที่สไตล์การแต่งตัวโดดเด่นบน Instagram',
  image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1000&q=80',
}

const campaigns = [
  {
    title: 'Tech Review Q2',
    brand: 'TechZone',
    tag: 'tech',
    budget: '฿8K – 16K',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80',
  },
  {
    title: 'Food Festival Promo',
    brand: 'Taste Kitchen',
    tag: 'food',
    budget: '฿10K – 20K',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
  },
]

const more = [
  {
    title: 'Skincare Glow Set',
    brand: 'GlowLab Beauty',
    tag: 'beauty',
    budget: '฿12,000 – 25,000',
    desc: 'รีวิวเซ็ตสกินแคร์ตัวใหม่ เน้นผิวกระจ่างใส สำหรับสาย beauty บน TikTok & Instagram',
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80',
  },
  {
    title: '30-Day Fitness Challenge',
    brand: 'FitPro Studio',
    tag: 'fitness',
    budget: '฿9,000 – 18,000',
    desc: 'ชวนสายเฮลท์ตี้ร่วมชาเลนจ์ออกกำลังกาย 30 วัน พร้อมรีวิวอุปกรณ์ฟิตเนสรุ่นใหม่',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80',
  },
]

const stats = [
  { value: '10K+', label: 'Active Creators' },
  { value: '500+', label: 'Verified Brands' },
  { value: '7 วัน', label: 'Avg. Payout' },
  { value: '฿500M+', label: 'Total Paid' },
]

const whys = [
  { icon: BadgeCheck, title: 'Verified Brands Only', desc: 'ทุกแบรนด์ผ่านการตรวจสอบ 100% ไม่มีงานหลอก รับงานได้อย่างมั่นใจ' },
  { icon: FileText, title: 'Auto Tax Docs', desc: 'เอกสารภาษีครบ จบในแอป — 50 ทวิ, ใบกำกับภาษี ออกให้อัตโนมัติ' },
  { icon: TrendingUp, title: 'Real-time Tracking', desc: 'ดูรายได้และผลงานได้ทันทีทุกแคมเปญ โปร่งใส ตรวจสอบได้ตลอดเวลา' },
]

const steps = [
  'สมัครสมาชิก & ยืนยันตัวตน',
  'เลือกแคมเปญที่ชอบแล้วกดสมัคร',
  'สร้างคอนเทนต์ตามบรีฟ',
  'รับเงินโอนเข้าบัญชีโดยตรง',
]
</script>
