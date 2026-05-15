<template>
  <div class="relative min-h-screen overflow-x-hidden bg-[#516171] pb-24 font-sans text-white">
    <!-- Subtle grid overlay -->
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.03]"
      :style="{
        backgroundImage:
          'linear-gradient(#FEE601 1px, transparent 1px), linear-gradient(90deg, #FEE601 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }"
    />

    <!-- Glow orbs -->
    <div class="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-[#FEE601] opacity-[0.07] blur-[160px]" />
    <div class="pointer-events-none absolute left-0 top-[1200px] h-[380px] w-[380px] rounded-full bg-[#FEE601] opacity-[0.05] blur-[140px]" />

    <!-- ─────────── HEADER ─────────── -->
    <header class="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#516171]/90 px-6 py-4 backdrop-blur-md lg:px-12">
      <img src="/sleek/v4/logo-light.png" alt="Ripples" class="h-8" />
      <nav class="hidden items-center gap-8 lg:flex">
        <a href="#suite" class="text-sm font-medium text-white/70 transition hover:text-[#FEE601]">Suite</a>
        <a href="#how" class="text-sm font-medium text-white/70 transition hover:text-[#FEE601]">How it works</a>
        <a href="#earnings" class="text-sm font-medium text-white/70 transition hover:text-[#FEE601]">Earnings</a>
      </nav>
      <div class="flex items-center gap-3">
        <div class="hidden items-center rounded-lg border border-white/10 bg-white/5 p-1 lg:flex">
          <span class="rounded-md bg-[#FEE601] px-2 py-0.5 text-[10px] font-bold text-[#516171]">TH</span>
          <span class="px-2 py-0.5 text-[10px] font-bold text-white/40">EN</span>
        </div>
        <button class="rounded-lg bg-[#FEE601] px-4 py-2 text-xs font-bold text-[#516171] lg:px-5 lg:text-sm">
          Log In
        </button>
        <button
          class="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 lg:hidden"
          aria-label="Menu"
        >
          <Menu class="h-5 w-5" />
        </button>
      </div>
    </header>

    <!-- ─────────── HERO ─────────── -->
    <section class="relative px-6 pt-12 pb-16 lg:px-12 lg:pt-20 lg:pb-24">
      <div class="mx-auto max-w-7xl">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <!-- Copy side -->
          <div class="lg:order-1">
            <div class="mb-6 inline-flex items-center gap-2 rounded border border-[#FEE601]/30 bg-[#FEE601]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FEE601]">
              Pro-Creator Platform
            </div>
            <h1 class="mb-6 font-heading text-4xl font-bold leading-tight lg:text-6xl">
              Manage Your Career<br />
              <span class="text-[#FEE601]">Like a Business.</span>
            </h1>
            <p class="mb-10 max-w-[320px] leading-relaxed text-white/60 lg:max-w-md lg:text-lg">
              แพลตฟอร์มฟินเทคสำหรับ Creator มืออาชีพ — ติดตามรายได้, จัดการภาษี, และเติบโตไปกับแบรนด์ระดับท็อปของไทย
            </p>

            <!-- Mobile dashboard card -->
            <div class="relative mb-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl lg:hidden">
              <div class="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#FEE601] opacity-10 blur-[80px]" />
              <div class="mb-6 h-48 overflow-hidden rounded-xl border border-white/5 shadow-inner">
                <img src="/sleek/v4/dashboard.png" alt="Pro Dashboard" class="h-full w-full object-cover" />
              </div>
              <div class="flex items-center justify-between px-2">
                <div>
                  <div class="mb-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Total Earnings
                  </div>
                  <div class="text-2xl font-bold">฿128,500.00</div>
                </div>
                <div class="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEE601] text-[#516171]">
                  <TrendingUp class="h-6 w-6" />
                </div>
              </div>
            </div>

            <div class="flex gap-4 lg:max-w-md">
              <button class="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#FEE601] py-4 font-bold text-[#516171] shadow-[0_0_30px_rgba(254,230,1,0.25)] transition hover:shadow-[0_0_50px_rgba(254,230,1,0.4)]">
                Get Started <ArrowRight class="h-4 w-4" />
              </button>
              <button class="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-4 font-bold text-white transition hover:bg-white/10">
                <Play class="h-4 w-4 fill-current" /> Demo
              </button>
            </div>
          </div>

          <!-- Desktop dashboard card -->
          <div class="relative hidden lg:order-2 lg:block">
            <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
              <div class="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-[#FEE601] opacity-10 blur-[100px]" />
              <div class="mb-8 aspect-[4/3] overflow-hidden rounded-2xl border border-white/5 shadow-inner">
                <img src="/sleek/v4/dashboard.png" alt="Pro Dashboard" class="h-full w-full object-cover" />
              </div>
              <div class="flex items-center justify-between px-2">
                <div>
                  <div class="mb-2 text-xs font-bold uppercase tracking-widest text-white/40">
                    Total Earnings
                  </div>
                  <div class="text-4xl font-bold">฿128,500<span class="text-2xl text-white/40">.00</span></div>
                  <div class="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#FEE601]">
                    <TrendingUp class="h-3 w-3" /> +24.8% this month
                  </div>
                </div>
                <div class="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE601] text-[#516171]">
                  <TrendingUp class="h-7 w-7" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── STATS STRIP ─────────── -->
    <section class="px-6 mb-16 lg:px-12 lg:mb-24">
      <div class="mx-auto flex max-w-7xl divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div v-for="stat in stats" :key="stat.label" class="flex-1 p-6 text-center lg:p-10">
          <div class="text-xl font-bold text-[#FEE601] lg:text-4xl">{{ stat.value }}</div>
          <div class="mt-1 text-[8px] uppercase tracking-widest text-white/40 lg:mt-3 lg:text-xs">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── PROFESSIONAL SUITE ─────────── -->
    <section id="suite" class="px-6 mb-24 lg:px-12 lg:mb-32">
      <div class="mx-auto max-w-7xl">
        <div class="mb-8 flex items-end justify-between lg:mb-14">
          <h2 class="font-heading text-2xl font-bold lg:text-5xl">Professional Suite</h2>
          <div class="text-[10px] font-bold uppercase tracking-widest text-[#FEE601] lg:text-xs">
            Efficiency First
          </div>
        </div>
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
          <div
            v-for="(item, i) in suite"
            :key="item.title"
            class="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-10"
          >
            <div
              v-if="i === 0"
              class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#FEE601] opacity-10 blur-[40px] transition-opacity group-hover:opacity-20 lg:h-32 lg:w-32"
            />
            <div class="flex items-center gap-6 lg:block">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#FEE601]/30 bg-[#FEE601]/10 text-[#FEE601] lg:mb-6 lg:h-14 lg:w-14">
                <component :is="item.icon" class="h-6 w-6 lg:h-7 lg:w-7" />
              </div>
              <div>
                <h3 class="mb-1 font-bold lg:mb-2 lg:text-xl">{{ item.title }}</h3>
                <p class="text-xs text-white/40 lg:text-sm lg:leading-relaxed">{{ item.desc }}</p>
              </div>
            </div>
            <p class="mt-4 hidden text-xs uppercase tracking-widest text-[#FEE601]/60 lg:block">
              {{ item.thai }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── 4-STEP IMPLEMENTATION ─────────── -->
    <section id="how" class="px-6 mb-24 lg:px-12 lg:mb-32">
      <div class="mx-auto max-w-5xl">
        <div class="mb-10 text-center lg:mb-16">
          <h2 class="font-heading text-2xl font-bold lg:text-5xl">4-Step Implementation</h2>
          <p class="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/30 lg:text-xs">
            จาก Onboard ถึง Payout ใน 4 ขั้นตอน
          </p>
        </div>
        <div class="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          <div
            v-for="(step, i) in steps"
            :key="step.title"
            class="flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-8"
          >
            <span class="text-4xl font-black text-white/5 lg:text-5xl">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="flex-1">
              <h4 class="mb-1 font-bold lg:text-lg">{{ step.title }}</h4>
              <p class="text-xs text-white/40 lg:text-sm">{{ step.desc }}</p>
            </div>
            <CheckCircle2 :class="['h-6 w-6 shrink-0 lg:h-7 lg:w-7', i === 0 ? 'text-[#FEE601]' : 'text-white/20']" />
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── EARNINGS PREVIEW ─────────── -->
    <section id="earnings" class="px-6 mb-24 lg:px-12 lg:mb-32">
      <div class="mx-auto max-w-7xl">
        <div class="grid items-center gap-10 lg:grid-cols-5 lg:gap-16">
          <div class="lg:col-span-2 lg:order-2">
            <div class="mb-4 text-[10px] font-bold uppercase tracking-widest text-[#FEE601]">
              Financial Hub
            </div>
            <h2 class="mb-6 font-heading text-3xl font-bold lg:text-5xl">
              Every baht.<br /><span class="text-[#FEE601]">Accounted for.</span>
            </h2>
            <p class="mb-8 text-white/60 lg:text-lg lg:leading-relaxed">
              ใบกำกับภาษีอัตโนมัติ, หัก ณ ที่จ่าย 50 ทวิ, และโอนเข้าบัญชีภายใน 7 วัน — โปร่งใส ตรวจสอบได้ตลอดเวลา
            </p>
            <ul class="space-y-3">
              <li v-for="line in fin" :key="line" class="flex items-start gap-3 text-sm text-white/80">
                <CheckCircle2 class="mt-0.5 h-5 w-5 shrink-0 text-[#FEE601]" />
                <span>{{ line }}</span>
              </li>
            </ul>
          </div>

          <div class="relative lg:col-span-3 lg:order-1">
            <div class="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 lg:p-8">
              <div class="mb-6 flex items-center justify-between">
                <div>
                  <div class="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Payout schedule
                  </div>
                  <div class="mt-1 text-xl font-bold lg:text-2xl">May 2026</div>
                </div>
                <div class="rounded-full border border-[#FEE601]/30 bg-[#FEE601]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#FEE601]">
                  3 Pending
                </div>
              </div>

              <div class="space-y-3">
                <div v-for="row in ledger" :key="row.brand" class="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#FEE601]">
                    <component :is="row.icon" class="h-5 w-5" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <div class="truncate text-sm font-bold">{{ row.brand }}</div>
                    <div class="truncate text-xs text-white/40">{{ row.note }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-bold text-[#FEE601]">{{ row.amount }}</div>
                    <div class="text-[10px] uppercase tracking-widest text-white/40">{{ row.status }}</div>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex items-center justify-between border-t border-white/5 pt-6">
                <div class="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Net this cycle
                </div>
                <div class="text-2xl font-bold lg:text-3xl">฿128,500.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── FINAL CTA ─────────── -->
    <section class="px-6 mb-16 lg:px-12 lg:mb-24">
      <div class="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-10 text-center lg:p-20">
        <div class="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#FEE601] opacity-10 blur-[80px] lg:h-60 lg:w-60" />
        <div class="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#FEE601] opacity-10 blur-[80px] lg:h-60 lg:w-60" />
        <h2 class="mb-4 font-heading text-3xl font-bold lg:text-5xl">
          Run your career like a <span class="text-[#FEE601]">Pro</span>
        </h2>
        <p class="mx-auto mb-10 max-w-md text-white/60 lg:text-lg">
          เปิดใช้ Ripples Pro วันนี้ — ไม่มีค่าธรรมเนียมแรกเข้า, ยกเลิกได้ตลอดเวลา
        </p>
        <button class="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FEE601] px-8 py-4 font-bold text-[#516171] shadow-[0_20px_40px_rgba(254,230,1,0.2)] transition hover:shadow-[0_30px_60px_rgba(254,230,1,0.35)]">
          Activate Pro <ArrowRight class="h-4 w-4" />
        </button>
      </div>
    </section>

    <!-- ─────────── FOOTER ─────────── -->
    <footer class="border-t border-white/5 bg-black/10 px-6 py-12 lg:px-12 lg:py-16">
      <div class="mx-auto max-w-7xl">
        <div class="mb-12 flex items-center justify-between">
          <img src="/sleek/v4/logo-light.png" alt="Ripples" class="h-6" />
          <div class="flex gap-4 text-white/40">
            <a href="#" aria-label="LinkedIn" class="transition hover:text-[#FEE601]">
              <Linkedin class="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" class="transition hover:text-[#FEE601]">
              <Twitter class="h-5 w-5" />
            </a>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-8 text-[10px] font-bold uppercase tracking-widest text-white/40 lg:grid-cols-4">
          <div class="space-y-4">
            <a href="#" class="block transition hover:text-[#FEE601]">Marketplace</a>
            <a href="#" class="block transition hover:text-[#FEE601]">Analytics</a>
            <a href="#" class="block transition hover:text-[#FEE601]">Earnings</a>
          </div>
          <div class="space-y-4">
            <a href="#" class="block transition hover:text-[#FEE601]">For Brands</a>
            <a href="#" class="block transition hover:text-[#FEE601]">Support</a>
            <a href="#" class="block transition hover:text-[#FEE601]">API Docs</a>
          </div>
          <div class="hidden space-y-4 lg:block">
            <a href="#" class="block transition hover:text-[#FEE601]">About</a>
            <a href="#" class="block transition hover:text-[#FEE601]">Careers</a>
            <a href="#" class="block transition hover:text-[#FEE601]">Press</a>
          </div>
          <div class="hidden space-y-4 lg:block">
            <a href="#" class="block transition hover:text-[#FEE601]">Privacy</a>
            <a href="#" class="block transition hover:text-[#FEE601]">Terms</a>
            <a href="#" class="block transition hover:text-[#FEE601]">Contact</a>
          </div>
        </div>
        <p class="mt-16 text-center text-[8px] uppercase tracking-[0.4em] text-white/20">
          © 2026 Ripples Creator Marketplace
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  Landmark,
  Linkedin,
  Menu,
  Play,
  Receipt,
  Sparkles,
  TrendingUp,
  Twitter,
  Wallet,
} from 'lucide-vue-next'

definePageMeta({ layout: false })

const stats = [
  { value: '10K+', label: 'Creators' },
  { value: '98%', label: 'On-Time' },
  { value: '24/7', label: 'Support' },
]

const suite = [
  {
    icon: Briefcase,
    title: 'Campaign Marketplace',
    desc: 'Filtered by niche, budget, and platform metrics.',
    thai: 'คัดดีลตามไนช์ & งบ',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    desc: 'Real-time performance tracking for every post.',
    thai: 'ดูผลงานสด ๆ ทุกโพสต์',
  },
  {
    icon: Landmark,
    title: 'Financial Hub',
    desc: 'Automated invoices, 50 ทวิ, and bank payouts.',
    thai: 'ใบกำกับ + โอนเข้าบัญชี',
  },
]

const steps = [
  { title: 'Onboarding', desc: 'Connect socials & complete KYC verification.' },
  { title: 'Apply', desc: 'Select campaigns using data-driven insights.' },
  { title: 'Create', desc: 'Submit content drafts and revisions in-app.' },
  { title: 'Get Paid', desc: 'Receive payouts with tax docs handled for you.' },
]

const fin = [
  'ใบกำกับภาษีเต็มรูป — ออกอัตโนมัติทุกงาน',
  'หัก ณ ที่จ่าย 50 ทวิ จัดให้ครบ',
  'โอนเข้าบัญชีไทยทุกธนาคารใน 7 วัน',
  'รายงานสรุปรายไตรมาส พร้อมยื่น ภ.ง.ด.',
]

const ledger = [
  { brand: 'Luxe Beauty House', note: 'Fall Makeup Collection', amount: '฿58,000', status: 'Cleared', icon: Sparkles },
  { brand: 'Maison Aroma', note: 'Signature Fragrance Launch', amount: '฿42,500', status: 'Processing', icon: Wallet },
  { brand: 'Serene Spa', note: 'Wellness Retreat Feature', amount: '฿28,000', status: 'Pending', icon: Receipt },
]
</script>
