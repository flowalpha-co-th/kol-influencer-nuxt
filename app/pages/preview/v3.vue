<template>
  <div class="relative min-h-screen overflow-x-hidden bg-[#1A2028] pb-24 font-sans text-white">
    <!-- Glow orbs -->
    <div class="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#FEE601] opacity-[0.08] blur-[180px]" />
    <div class="pointer-events-none absolute left-0 top-[800px] h-[400px] w-[400px] rounded-full bg-[#FEE601] opacity-[0.05] blur-[150px]" />
    <div class="pointer-events-none absolute right-0 top-[1800px] hidden h-[450px] w-[450px] rounded-full bg-[#FEE601] opacity-[0.06] blur-[160px] lg:block" />

    <!-- ─────────── HEADER ─────────── -->
    <header class="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#1A2028]/80 px-6 py-4 backdrop-blur-xl lg:px-12">
      <img src="/sleek/v3/logo-light.png" alt="Ripples" class="h-8" />
      <nav class="hidden items-center gap-8 lg:flex">
        <a href="#campaigns" class="text-sm font-medium text-white/70 transition hover:text-[#FEE601]">Campaigns</a>
        <a href="#how" class="text-sm font-medium text-white/70 transition hover:text-[#FEE601]">Journey</a>
        <a href="#for-brands" class="text-sm font-medium text-white/70 transition hover:text-[#FEE601]">For Brands</a>
      </nav>
      <div class="flex items-center gap-4">
        <div class="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
          <span class="rounded-full bg-[#FEE601] px-2 py-0.5 text-[10px] font-bold text-[#1A2028]">TH</span>
          <span class="px-2 py-0.5 text-[10px] font-bold text-white/40">EN</span>
        </div>
        <button class="hidden h-10 items-center rounded-full bg-[#FEE601] px-5 text-sm font-bold text-[#1A2028] shadow-[0_0_30px_rgba(254,230,1,0.3)] lg:flex">
          เข้าสู่ระบบ
        </button>
        <button class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden" aria-label="Menu">
          <Menu class="h-5 w-5" />
        </button>
      </div>
    </header>

    <!-- ─────────── HERO ─────────── -->
    <section class="relative px-6 pt-12 pb-20 lg:px-12 lg:pt-20 lg:pb-28">
      <div class="mx-auto max-w-7xl">
        <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <!-- Text side -->
          <div class="text-center lg:order-1 lg:text-left">
            <div class="mb-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#FEE601]">
              Thailand's #1 Creator Marketplace
            </div>
            <h1 class="mb-8 font-heading text-5xl font-bold leading-[1.1] lg:text-6xl xl:text-7xl">
              Elevate Your<br />
              <span class="bg-gradient-to-r from-[#FEE601] to-[#FFFBE0] bg-clip-text text-transparent">Influence</span>
            </h1>

            <!-- Mobile hero illustration -->
            <div class="relative mx-auto mb-12 aspect-[4/5] w-full max-w-[340px] lg:hidden">
              <div class="absolute inset-0 animate-pulse rounded-[3rem] bg-[#FEE601] opacity-20 blur-[60px]" />
              <div class="pointer-events-none absolute -inset-4 rounded-[3.5rem] border border-[#FEE601]/20" />
              <div class="pointer-events-none absolute -inset-8 rounded-[4rem] border border-[#FEE601]/10" />
              <div class="relative z-10 h-full w-full overflow-hidden rounded-[3rem] border border-white/10 shadow-2xl">
                <img src="/sleek/v3/hero.png" alt="Premium creator" class="h-full w-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-[#1A2028] via-transparent to-transparent opacity-40" />
              </div>
            </div>

            <p class="mb-12 text-lg font-light leading-relaxed text-white/60 lg:max-w-md">
              เปลี่ยนคนติดตามของคุณให้เป็นรายได้จริง<br />กับแบรนด์ระดับท็อปของไทย
            </p>
            <div class="flex flex-col gap-4 lg:max-w-md lg:flex-row">
              <button class="rounded-full bg-[#FEE601] py-5 px-8 text-lg font-bold text-[#1A2028] shadow-[0_0_30px_rgba(254,230,1,0.3)] transition-all hover:shadow-[0_0_50px_rgba(254,230,1,0.5)]">
                เริ่มเป็น Creator
              </button>
              <button class="rounded-full border border-white/10 bg-white/5 py-5 px-8 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/10">
                Explore Campaigns
              </button>
            </div>
          </div>

          <!-- Desktop hero illustration -->
          <div class="relative hidden lg:order-2 lg:block">
            <div class="relative mx-auto aspect-[4/5] w-full max-w-md">
              <div class="absolute inset-0 animate-pulse rounded-[3.5rem] bg-[#FEE601] opacity-20 blur-[80px]" />
              <div class="pointer-events-none absolute -inset-6 rounded-[4rem] border border-[#FEE601]/20" />
              <div class="pointer-events-none absolute -inset-12 rounded-[4.5rem] border border-[#FEE601]/10" />
              <div class="pointer-events-none absolute -inset-20 rounded-[5rem] border border-[#FEE601]/5" />
              <div class="relative z-10 h-full w-full overflow-hidden rounded-[3.5rem] border border-white/10 shadow-2xl">
                <img src="/sleek/v3/hero.png" alt="Premium creator" class="h-full w-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-[#1A2028] via-transparent to-transparent opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── STATS STRIP ─────────── -->
    <section class="grid grid-cols-3 border-y border-white/5 bg-white/[0.02] py-16">
      <div class="text-center">
        <div class="text-2xl font-bold text-[#FEE601] lg:text-5xl">10K+</div>
        <div class="mt-1 text-[8px] uppercase tracking-widest text-white/40 lg:mt-3 lg:text-xs">Creators</div>
      </div>
      <div class="border-x border-white/5 text-center">
        <div class="text-2xl font-bold text-[#FEE601] lg:text-5xl">500+</div>
        <div class="mt-1 text-[8px] uppercase tracking-widest text-white/40 lg:mt-3 lg:text-xs">Brands</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-[#FEE601] lg:text-5xl">7 Days</div>
        <div class="mt-1 text-[8px] uppercase tracking-widest text-white/40 lg:mt-3 lg:text-xs">Payout</div>
      </div>
    </section>

    <!-- ─────────── PREMIUM STANDARD ─────────── -->
    <section class="px-6 py-24 lg:px-12 lg:py-32">
      <div class="mx-auto max-w-6xl">
        <h2 class="mb-12 text-center font-heading text-3xl font-bold lg:mb-16 lg:text-5xl">The Premium Standard</h2>
        <div class="space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
          <div
            v-for="(item, i) in standards"
            :key="item.title"
            class="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl lg:p-10"
          >
            <div
              v-if="i === 0"
              class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-[#FEE601] opacity-10 blur-[40px] transition-opacity group-hover:opacity-20"
            />
            <component :is="item.icon" class="mb-4 h-10 w-10 text-[#FEE601]" />
            <h3 class="mb-2 text-xl font-bold lg:text-2xl">{{ item.title }}</h3>
            <p class="text-sm leading-relaxed text-white/50 lg:text-base">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── PRO SERVICES ─────────── -->
    <section class="bg-white/[0.02] px-6 py-24 lg:px-12 lg:py-32">
      <div class="mx-auto max-w-6xl">
        <div class="mb-12 text-center lg:mb-16">
          <h2 class="mb-2 font-heading text-3xl font-bold lg:text-5xl">Pro Services</h2>
          <p class="text-[10px] uppercase tracking-[0.3em] text-white/30 lg:text-xs">Built for Growth</p>
        </div>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          <div
            v-for="svc in services"
            :key="svc.title"
            class="rounded-3xl border border-white/10 bg-white/5 p-6 lg:p-8"
          >
            <component :is="svc.icon" class="mb-4 h-7 w-7 text-[#FEE601] lg:h-9 lg:w-9" />
            <h4 class="mb-1 text-sm font-bold lg:text-lg">{{ svc.title }}</h4>
            <p class="text-[10px] text-white/40 lg:text-sm">{{ svc.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── JOURNEY TIMELINE ─────────── -->
    <section id="how" class="relative px-6 py-24 lg:px-12 lg:py-32">
      <div class="mx-auto max-w-4xl">
        <!-- Vertical glow line (mobile) -->
        <div class="absolute left-10 top-32 bottom-32 w-px bg-gradient-to-b from-transparent via-[#FEE601]/30 to-transparent lg:hidden" />
        <h2 class="mb-16 font-heading text-3xl font-bold lg:mb-20 lg:text-center lg:text-5xl">Journey to Success</h2>

        <!-- Mobile vertical stack -->
        <div class="space-y-16 lg:hidden">
          <div v-for="(step, i) in journey" :key="step.title" class="relative flex gap-8">
            <div
              :class="[
                'z-10 h-8 w-8 shrink-0 rounded-full',
                i === 0 ? 'bg-[#FEE601] shadow-[0_0_20px_rgba(254,230,1,0.5)]' : 'border border-white/20 bg-white/10',
              ]"
            />
            <div>
              <h4 :class="['mb-2 text-xs font-bold uppercase tracking-widest', i === 0 ? 'text-[#FEE601]' : 'text-white/20']">
                Step {{ String(i + 1).padStart(2, '0') }}
              </h4>
              <h3 class="mb-2 text-xl font-bold">{{ step.title }}</h3>
              <p class="text-sm text-white/40">{{ step.desc }}</p>
            </div>
          </div>
        </div>

        <!-- Desktop horizontal grid -->
        <div class="relative hidden lg:grid lg:grid-cols-4 lg:gap-8">
          <div class="absolute left-10 right-10 top-4 h-px bg-gradient-to-r from-transparent via-[#FEE601]/30 to-transparent" />
          <div v-for="(step, i) in journey" :key="step.title" class="relative">
            <div
              :class="[
                'mb-6 h-8 w-8 rounded-full',
                i === 0 ? 'bg-[#FEE601] shadow-[0_0_20px_rgba(254,230,1,0.5)]' : 'border border-white/20 bg-white/10',
              ]"
            />
            <h4 :class="['mb-2 text-xs font-bold uppercase tracking-widest', i === 0 ? 'text-[#FEE601]' : 'text-white/20']">
              Step {{ String(i + 1).padStart(2, '0') }}
            </h4>
            <h3 class="mb-3 text-xl font-bold">{{ step.title }}</h3>
            <p class="text-sm leading-relaxed text-white/40">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── ACTIVE DEALS ─────────── -->
    <section id="campaigns" class="px-6 py-24 lg:px-12 lg:py-32">
      <div class="mx-auto max-w-6xl">
        <div class="mb-12 flex items-center justify-between">
          <h2 class="font-heading text-3xl font-bold lg:text-5xl">Active Deals</h2>
          <a href="#" class="flex items-center gap-2 text-sm font-bold text-[#FEE601]">
            <span class="hidden sm:inline">View All</span>
            <ArrowRight class="h-5 w-5 lg:h-6 lg:w-6" />
          </a>
        </div>
        <div class="space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
          <article
            v-for="deal in deals"
            :key="deal.title"
            class="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5"
          >
            <div class="relative aspect-video">
              <img :src="deal.image" :alt="deal.title" class="h-full w-full object-cover" />
              <div class="absolute left-6 top-6 rounded-full bg-[#FEE601] px-3 py-1 text-[10px] font-bold uppercase text-[#1A2028]">
                {{ deal.badge }}
              </div>
            </div>
            <div class="p-8">
              <h3 class="mb-2 text-xl font-bold">{{ deal.title }}</h3>
              <p class="mb-4 text-xs text-white/40">{{ deal.brand }}</p>
              <div class="flex items-center justify-between">
                <span class="font-bold text-[#FEE601]">{{ deal.price }}</span>
                <button class="text-xs font-bold uppercase tracking-widest text-white/40 transition hover:text-white">
                  Apply Now
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ─────────── TESTIMONIAL ─────────── -->
    <section class="px-6 py-24 text-center lg:px-12 lg:py-32">
      <div class="mx-auto max-w-3xl">
        <Quote class="mx-auto mb-8 h-16 w-16 fill-[#FEE601]/20 text-[#FEE601]/20 lg:h-20 lg:w-20" />
        <p class="mb-12 text-2xl font-light italic leading-relaxed text-white/80 lg:text-3xl">
          "Now I get paid on time, every time. Tax docs handled perfectly."
        </p>
        <div class="flex flex-col items-center">
          <img
            src="https://randomuser.me/api/portraits/women/68.jpg"
            alt="Mook Beauty"
            class="mb-4 h-16 w-16 rounded-full border-2 border-[#FEE601] lg:h-20 lg:w-20"
          />
          <div class="font-bold">Mook Beauty</div>
          <div class="mt-1 text-[10px] uppercase tracking-widest text-[#FEE601]">@beauty.bymook</div>
        </div>
      </div>
    </section>

    <!-- ─────────── FINAL CTA ─────────── -->
    <section class="px-6 py-24 text-center lg:px-12 lg:py-32">
      <div class="relative mx-auto max-w-3xl overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-12 lg:p-20">
        <div class="absolute right-0 top-0 h-32 w-32 rounded-full bg-[#FEE601] opacity-10 blur-[80px] lg:h-48 lg:w-48" />
        <div class="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-[#FEE601] opacity-10 blur-[80px] lg:h-48 lg:w-48" />
        <h2 class="mb-6 font-heading text-4xl font-bold lg:text-6xl">Ready to Scale?</h2>
        <p class="mx-auto mb-12 max-w-[240px] text-white/50 lg:max-w-md lg:text-lg">
          เข้าร่วมคอมมูนิตี้ Creator อันดับ 1 ของไทยวันนี้
        </p>
        <button class="w-full max-w-sm rounded-full bg-[#FEE601] py-5 px-8 text-lg font-bold text-[#1A2028] shadow-[0_20px_40px_rgba(254,230,1,0.2)] transition hover:shadow-[0_30px_60px_rgba(254,230,1,0.35)]">
          เริ่มเลยตอนนี้
        </button>
      </div>
    </section>

    <!-- ─────────── FOOTER ─────────── -->
    <footer class="border-t border-white/5 bg-[#1A2028] px-6 py-16 text-center lg:px-12">
      <img src="/sleek/v3/logo-light.png" alt="Ripples" class="mx-auto mb-12 h-6" />
      <div class="mb-12 flex justify-center gap-10 text-white/20">
        <a href="#" aria-label="Instagram" class="transition hover:text-[#FEE601]">
          <Instagram class="h-6 w-6" />
        </a>
        <a href="#" aria-label="TikTok" class="transition hover:text-[#FEE601]">
          <svg viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.09Z" />
          </svg>
        </a>
        <a href="#" aria-label="YouTube" class="transition hover:text-[#FEE601]">
          <Youtube class="h-6 w-6" />
        </a>
      </div>
      <div class="flex flex-col items-center gap-8">
        <div class="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-white/20">
          <span>Campaigns</span>
          <span>For Brands</span>
          <span>About</span>
        </div>
        <p class="text-[10px] uppercase tracking-[0.3em] text-white/10">© 2026 Ripples Creator Marketplace</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  BarChart3,
  Instagram,
  Menu,
  MousePointerClick,
  PenLine,
  Quote,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
  Youtube,
  Zap,
} from 'lucide-vue-next'

definePageMeta({ layout: false })

const standards = [
  {
    icon: ShieldCheck,
    title: 'Verified Ecosystem',
    desc: 'ทุกแบรนด์ผ่านการคัดกรองอย่างเข้มงวด มั่นใจได้ในความมั่นคงและจ่ายตรงเวลา',
  },
  {
    icon: Zap,
    title: 'Instant Financials',
    desc: 'ระบบจัดการรายได้และภาษีอัตโนมัติ แม่นยำ รวดเร็ว ไม่ต้องวุ่นวาย',
  },
  {
    icon: Sparkles,
    title: 'Elevated Brands',
    desc: 'ดีลพรีเมียมจากแบรนด์ระดับท็อปที่คัดสรรเพื่อ Creator มืออาชีพ',
  },
]

const services = [
  { icon: Search, title: 'Browse', desc: 'Exclusive deals' },
  { icon: MousePointerClick, title: 'Apply', desc: 'Instant pitching' },
  { icon: PenLine, title: 'Studio', desc: 'Content flow' },
  { icon: BarChart3, title: 'Analytics', desc: 'Real-time stats' },
]

const journey = [
  { title: 'Apply & Verify', desc: 'ยืนยันตัวตนระดับพรีเมียมใน 5 นาที' },
  { title: 'Match Campaigns', desc: 'ค้นพบดีลสุดเอ็กซ์คลูซีฟจากแบรนด์ชั้นนำ' },
  { title: 'Create Masterpieces', desc: 'สร้างสรรค์ผลงานคุณภาพและส่งตรวจในแอป' },
  { title: 'Instant Rewards', desc: 'รับเงินโอนพร้อมเอกสารภาษีครบถ้วน' },
]

const deals = [
  {
    title: 'Fall Makeup Collection',
    brand: 'Luxe Beauty House',
    price: '฿15,000+',
    badge: 'Premium',
    image: '/sleek/v3/campaign.png',
  },
  {
    title: 'Signature Fragrance Launch',
    brand: 'Maison Aroma',
    price: '฿22,000+',
    badge: 'Exclusive',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80',
  },
  {
    title: 'Wellness Retreat Feature',
    brand: 'Serene Spa',
    price: '฿18,000+',
    badge: 'Featured',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
  },
]
</script>
