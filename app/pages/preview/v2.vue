<template>
  <div class="relative min-h-screen overflow-x-hidden bg-[#FFFBE0] font-sans text-[#516171]">
    <!-- Polka-dot scatter decorations -->
    <div
      class="pointer-events-none absolute -left-10 top-20 h-40 w-40 opacity-20 lg:h-56 lg:w-56"
      :style="{ backgroundImage: 'radial-gradient(#FEE601 2px, transparent 2px)', backgroundSize: '20px 20px' }"
    />
    <div
      class="pointer-events-none absolute right-[-2.5rem] top-[800px] h-40 w-40 opacity-20 lg:h-56 lg:w-56"
      :style="{ backgroundImage: 'radial-gradient(#FEE601 2px, transparent 2px)', backgroundSize: '20px 20px' }"
    />
    <div
      class="pointer-events-none absolute -left-10 top-[2200px] hidden h-56 w-56 opacity-20 lg:block"
      :style="{ backgroundImage: 'radial-gradient(#FEE601 2px, transparent 2px)', backgroundSize: '20px 20px' }"
    />

    <!-- ─────────── HEADER ─────────── -->
    <header class="sticky top-0 z-50 flex items-center justify-between border-b border-[#FEE601]/20 bg-white/80 px-6 py-4 backdrop-blur-md lg:px-12">
      <img src="/sleek/logo.png" alt="Ripples" class="h-8" />
      <!-- Desktop nav (lg+) -->
      <nav class="hidden items-center gap-8 lg:flex">
        <a href="#campaigns" class="text-sm font-bold text-[#516171] hover:text-[#FEE601]">Campaigns</a>
        <a href="#how" class="text-sm font-bold text-[#516171] hover:text-[#FEE601]">How It Works</a>
        <a href="#for-brands" class="text-sm font-bold text-[#516171] hover:text-[#FEE601]">For Brands</a>
      </nav>
      <div class="flex items-center gap-4">
        <div class="flex items-center rounded-full border border-[#516171]/10 bg-white p-1 shadow-sm">
          <span class="rounded-full bg-[#FEE601] px-2 py-0.5 text-[10px] font-bold text-[#516171]">TH</span>
          <span class="px-2 py-0.5 text-[10px] font-bold text-[#516171]/40">EN</span>
        </div>
        <button class="hidden h-10 items-center rounded-full bg-[#FEE601] px-5 text-sm font-bold text-[#516171] shadow-[0_4px_0_rgb(254_230_1_/_40%)] lg:flex">
          เข้าสู่ระบบ
        </button>
        <button class="flex h-10 w-10 items-center justify-center rounded-full border border-[#516171]/10 bg-white text-[#516171] shadow-sm lg:hidden" aria-label="Menu">
          <Menu class="h-5 w-5" />
        </button>
      </div>
    </header>

    <!-- ─────────── HERO ─────────── -->
    <section class="px-6 pt-12 pb-16 text-center lg:px-12 lg:pt-20 lg:pb-24 lg:text-left">
      <div class="mx-auto max-w-7xl">
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <!-- Text side -->
          <div class="relative z-10 lg:order-1">
            <div class="mb-8 inline-flex items-center gap-2 rounded-full border border-[#FEE601] bg-white px-4 py-1.5 text-[11px] font-bold text-[#516171] shadow-sm">
              <Sparkles class="h-3.5 w-3.5 fill-[#FEE601] text-[#FEE601]" />
              Marketplace สำหรับ Creator อันดับ 1 ของไทย
            </div>
            <h1 class="mb-6 font-heading text-4xl font-bold leading-tight text-[#516171] lg:text-5xl xl:text-6xl">
              เปลี่ยนคนติดตามให้เป็น<br />
              <span class="text-[#FEE601] [text-shadow:_2px_2px_0_rgb(81_97_113_/_10%)]">รายได้จริง</span>
            </h1>
            <!-- Mobile hero illustration -->
            <div class="relative mb-10 aspect-square w-full lg:hidden">
              <div class="absolute inset-0 scale-90 rounded-full bg-white opacity-50 blur-3xl" />
              <img src="/sleek/v2/hero.png" alt="Creator with floating UI elements" class="relative z-10 h-full w-full object-contain" />
            </div>
            <p class="mb-10 px-4 text-sm font-medium leading-relaxed text-[#516171]/70 lg:max-w-md lg:px-0 lg:text-base">
              จับคู่กับแบรนด์ที่ผ่านการตรวจสอบ จ่ายตรงเวลา เอกสารภาษีจัดให้ครบ — ในแอปเดียว
            </p>
            <div class="flex flex-col gap-3 lg:max-w-md lg:flex-row">
              <button class="rounded-2xl bg-[#FEE601] py-4 px-6 text-lg font-bold text-[#516171] shadow-[0_8px_0_rgb(254_230_1_/_30%)] transition-all active:translate-y-1 active:shadow-none">
                เริ่มเป็น Creator ฟรี
              </button>
              <button class="rounded-2xl border-2 border-[#516171]/5 bg-white py-4 px-6 text-sm font-bold text-[#516171]">
                ดู Campaign เปิดรับ
              </button>
            </div>
            <!-- Trust row (desktop only) -->
            <div class="mt-10 hidden items-center gap-4 lg:flex">
              <div class="flex -space-x-2">
                <img v-for="(url, i) in trustAvatars" :key="i" :src="url" class="h-8 w-8 rounded-full border-2 border-[#FFFBE0] object-cover" alt="" />
              </div>
              <div class="text-xs">
                <div class="flex text-[#FEE601]">
                  <Star v-for="n in 5" :key="n" class="h-3.5 w-3.5 fill-current" />
                </div>
                <div class="mt-0.5 font-medium text-[#516171]/70">4.9★ • 10,000+ creators</div>
              </div>
            </div>
          </div>
          <!-- Desktop hero illustration -->
          <div class="relative hidden lg:order-2 lg:block">
            <div class="absolute inset-0 scale-90 rounded-full bg-white opacity-60 blur-3xl" />
            <img src="/sleek/v2/hero.png" alt="Creator with floating UI elements" class="relative z-10 mx-auto h-auto w-full max-w-lg object-contain" />
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── STATS STRIP ─────────── -->
    <section class="mb-20 px-6 lg:mb-28 lg:px-12">
      <div class="mx-auto flex max-w-5xl justify-between rounded-[2.5rem] border border-[#516171]/5 bg-white p-8 shadow-xl shadow-[#516171]/5 lg:p-12">
        <div class="flex-1 text-center">
          <div class="text-2xl font-bold text-[#516171] lg:text-4xl">10K+</div>
          <div class="text-[9px] font-bold uppercase text-[#516171]/40 lg:mt-2 lg:text-xs">Active Creators</div>
        </div>
        <div class="w-px bg-[#516171]/10" />
        <div class="flex-1 text-center">
          <div class="text-2xl font-bold text-[#516171] lg:text-4xl">500+</div>
          <div class="text-[9px] font-bold uppercase text-[#516171]/40 lg:mt-2 lg:text-xs">Verified Brands</div>
        </div>
        <div class="w-px bg-[#516171]/10" />
        <div class="flex-1 text-center">
          <div class="text-2xl font-bold text-[#516171] lg:text-4xl">7 วัน</div>
          <div class="text-[9px] font-bold uppercase text-[#516171]/40 lg:mt-2 lg:text-xs">Avg. Payout</div>
        </div>
      </div>
    </section>

    <!-- ─────────── ABOUT / WHY RIPPLES ─────────── -->
    <section class="mb-24 px-6 lg:mb-32 lg:px-12">
      <div class="mx-auto max-w-7xl">
        <div class="mb-10 text-center lg:mb-14">
          <h2 class="mb-2 font-heading text-2xl font-bold lg:text-4xl">ทำไมต้อง Ripples?</h2>
          <div class="mx-auto h-1 w-12 rounded-full bg-[#FEE601]" />
        </div>
        <div class="space-y-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
          <div
            v-for="why in whys"
            :key="why.title"
            class="flex items-center gap-5 rounded-3xl border border-[#516171]/5 bg-white p-6 lg:flex-col lg:items-start lg:p-8"
          >
            <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FFFBE0]">
              <component :is="why.icon" class="h-7 w-7 fill-[#FEE601] text-[#FEE601]" />
            </div>
            <div>
              <h3 class="font-bold text-[#516171] lg:mb-2 lg:text-lg">{{ why.title }}</h3>
              <p class="text-xs text-[#516171]/60 lg:text-sm lg:leading-relaxed">{{ why.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── SERVICES (4 quick tiles) ─────────── -->
    <section class="mb-24 px-6 lg:mb-32 lg:px-12">
      <div class="mx-auto max-w-7xl">
        <div class="mb-10 text-center lg:mb-14">
          <h2 class="mb-2 font-heading text-2xl font-bold lg:text-4xl">ทุกอย่างในแอปเดียว</h2>
          <p class="hidden text-sm text-[#516171]/60 lg:block lg:text-base">เครื่องมือครบสำหรับ Creator ตั้งแต่หา campaign จนถึงรับเงิน</p>
        </div>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          <div
            v-for="service in services"
            :key="service.title"
            class="rounded-[2rem] border border-[#516171]/5 bg-white p-6 shadow-sm lg:p-8"
          >
            <component :is="service.icon" class="mb-3 h-7 w-7 text-[#FEE601] lg:mb-5 lg:h-8 lg:w-8" />
            <h4 class="mb-1 text-sm font-bold lg:text-base">{{ service.title }}</h4>
            <p class="text-[10px] text-[#516171]/50 lg:text-xs">{{ service.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── HOW IT WORKS (navy block) ─────────── -->
    <section id="how" class="mb-24 px-6 lg:mb-32 lg:px-12">
      <div class="mx-auto max-w-7xl">
        <div class="relative overflow-hidden rounded-[3rem] bg-[#516171] p-10 text-white lg:p-16">
          <div class="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-[#FEE601] opacity-20 blur-[80px] lg:h-60 lg:w-60" />
          <div class="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-[#FEE601] opacity-10 blur-[80px] lg:h-48 lg:w-48" />
          <h2 class="mb-10 font-heading text-2xl font-bold lg:mb-14 lg:text-4xl">เริ่มต้น 4 ขั้นตอนง่ายๆ</h2>
          <div class="space-y-8 lg:grid lg:grid-cols-4 lg:gap-8 lg:space-y-0">
            <div v-for="(step, i) in steps" :key="step" class="flex gap-4 lg:flex-col">
              <div
                :class="[
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-bold lg:h-10 lg:w-10 lg:text-lg',
                  i === 0 ? 'bg-[#FEE601] text-[#516171]' : 'bg-white/20 text-white',
                ]"
              >
                {{ i + 1 }}
              </div>
              <p class="text-sm font-medium lg:text-base lg:leading-relaxed">{{ step }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── FEATURED CAMPAIGNS ─────────── -->
    <section id="campaigns" class="mb-24 px-6 lg:mb-32 lg:px-12">
      <div class="mx-auto max-w-7xl">
        <div class="mb-8 flex items-center justify-between lg:mb-12">
          <h2 class="font-heading text-xl font-bold lg:text-4xl">แคมเปญยอดนิยม</h2>
          <a href="#" class="text-xs font-bold text-[#FEE601] lg:text-sm">ดูทั้งหมด →</a>
        </div>
        <div class="grid gap-4 lg:grid-cols-3 lg:gap-6">
          <article
            v-for="(campaign, i) in campaigns"
            :key="campaign.title"
            class="rounded-3xl border border-[#516171]/5 bg-white p-4 shadow-sm"
          >
            <div class="mb-4 h-40 overflow-hidden rounded-2xl lg:h-48">
              <img :src="campaign.image" :alt="campaign.title" class="h-full w-full object-cover" />
            </div>
            <div class="mb-2 flex items-start justify-between gap-3">
              <h3 class="font-bold text-[#516171]">{{ campaign.title }}</h3>
              <span class="shrink-0 font-bold text-[#FEE601]">{{ campaign.price }}</span>
            </div>
            <p class="mb-3 text-xs text-[#516171]/50">{{ campaign.brand }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in campaign.tags"
                :key="tag"
                class="rounded-md bg-[#FFFBE0] px-2 py-1 text-[9px] font-bold text-[#516171]"
              >
                {{ tag }}
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ─────────── TESTIMONIAL (yellow block) ─────────── -->
    <section class="mb-24 px-6 lg:mb-32 lg:px-12">
      <div class="mx-auto max-w-3xl">
        <div class="relative rounded-[3rem] bg-[#FEE601] p-10 text-center lg:p-16">
          <Quote class="absolute left-1/2 top-6 h-12 w-12 -translate-x-1/2 fill-[#516171]/10 text-[#516171]/10 lg:h-16 lg:w-16" />
          <p class="relative z-10 mb-8 text-lg font-bold italic text-[#516171] lg:mb-10 lg:text-2xl lg:leading-relaxed">
            "ชอบที่ระบบจัดการเอกสารให้หมดเลย ไม่ต้องวุ่นวายเรื่องภาษี จ่ายเงินตรงเวลามากค่ะ"
          </p>
          <div class="flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/women/45.jpg"
              class="mb-3 h-16 w-16 rounded-full border-4 border-white shadow-lg lg:h-20 lg:w-20"
              alt="Creamy K."
            />
            <div class="font-bold text-[#516171]">Creamy K.</div>
            <div class="text-[10px] font-bold uppercase text-[#516171]/50">Lifestyle Creator</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── FINAL CTA ─────────── -->
    <section class="mb-24 px-6 text-center lg:mb-32 lg:px-12">
      <div class="mx-auto max-w-2xl">
        <h2 class="mb-4 font-heading text-3xl font-bold leading-tight text-[#516171] lg:text-5xl">
          พร้อมเปลี่ยนคอนเทนต์เป็น<span class="text-[#FEE601]">รายได้</span>?
        </h2>
        <p class="mb-8 text-sm text-[#516171]/60 lg:text-base">
          สมัครฟรี ไม่มีค่าธรรมเนียมแรกเข้า ยกเลิกได้ทุกเมื่อ
        </p>
        <button class="mb-8 w-full max-w-xs rounded-2xl bg-[#FEE601] py-4 px-8 text-lg font-bold text-[#516171] shadow-[0_8px_0_rgb(254_230_1_/_30%)] transition-all active:translate-y-1 active:shadow-none">
          เริ่มเป็น Creator ฟรี
        </button>
        <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-[#516171]/60">
          <span class="flex items-center gap-1"><Check class="h-3.5 w-3.5" /> Verified Brands</span>
          <span class="flex items-center gap-1"><Check class="h-3.5 w-3.5" /> Auto Tax Docs</span>
          <span class="flex items-center gap-1"><Check class="h-3.5 w-3.5" /> 24/7 Support</span>
        </div>
      </div>
    </section>

    <!-- ─────────── FOOTER ─────────── -->
    <footer class="rounded-t-[3rem] border-t border-[#FEE601]/10 bg-white px-6 py-12 text-center lg:px-12 lg:py-16">
      <img src="/sleek/logo.png" alt="Ripples" class="mx-auto mb-6 h-6" />
      <p class="mb-10 text-xs text-[#516171]/40">© 2026 Ripples Creator Marketplace</p>
      <div class="flex justify-center gap-6 text-[#516171]/20">
        <a href="#" aria-label="Instagram" class="transition hover:text-[#FEE601]">
          <Instagram class="h-6 w-6" />
        </a>
        <a href="#" aria-label="TikTok" class="transition hover:text-[#FEE601]">
          <svg viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.09Z" />
          </svg>
        </a>
        <a href="#" aria-label="Facebook" class="transition hover:text-[#FEE601]">
          <Facebook class="h-6 w-6" />
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  BadgeCheck,
  Brush,
  Check,
  Facebook,
  FileText,
  Instagram,
  Menu,
  Quote,
  Search,
  Send,
  Sparkles,
  Star,
  TrendingUp,
  Wallet,
} from 'lucide-vue-next'

definePageMeta({ layout: false })

const trustAvatars = [
  'https://randomuser.me/api/portraits/women/12.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/55.jpg',
]

const whys = [
  { icon: BadgeCheck, title: 'Verified Brands Only', desc: 'ทุกแบรนด์ผ่านการตรวจสอบ 100% ไม่มีงานหลอก' },
  { icon: FileText, title: 'Auto Tax Docs', desc: 'เอกสารภาษีครบ จบในแอป — 50 ทวิ, ใบกำกับภาษี' },
  { icon: TrendingUp, title: 'Real-time Track', desc: 'ดูรายได้และผลงานได้ทันที ทุกแคมเปญ' },
]

const services = [
  { icon: Search, title: 'Browse', desc: 'ค้นหาแคมเปญ' },
  { icon: Send, title: 'Apply', desc: 'สมัครในคลิกเดียว' },
  { icon: Brush, title: 'Studio', desc: 'ส่งงาน & แก้ไข' },
  { icon: Wallet, title: 'Wallet', desc: 'ถอนเงินเข้าบัญชี' },
]

const steps = [
  'สมัครสมาชิก & ยืนยันตัวตน',
  'เลือกแคมเปญที่ชอบแล้วกดสมัคร',
  'สร้างคอนเทนต์ตามบรีฟ',
  'รับเงินโอนเข้าบัญชีโดยตรง',
]

const campaigns = [
  {
    title: 'Skincare New Collection',
    brand: 'Beauty Brand X',
    price: '฿15,000',
    image: '/sleek/v2/campaign.png',
    tags: ['Instagram', 'Beauty'],
  },
  {
    title: 'Food Delivery Review',
    brand: 'Yum App',
    price: '฿6,000',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80',
    tags: ['TikTok', 'Food'],
  },
  {
    title: 'Tech Accessory Feature',
    brand: 'GearLab',
    price: '฿10,000',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    tags: ['YouTube', 'Tech'],
  },
]
</script>
