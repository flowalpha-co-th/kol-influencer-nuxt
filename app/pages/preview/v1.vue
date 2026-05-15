<template>
  <div class="relative min-h-screen overflow-x-hidden bg-[#F8F9FA] font-sans text-[#516171]">
    <!-- Decorative concentric ripples (top-left) -->
    <div class="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full border border-[#516171]/10 opacity-50" />
    <div class="pointer-events-none absolute -left-16 top-24 h-56 w-56 rounded-full border border-[#516171]/10 opacity-50" />
    <div class="pointer-events-none absolute -left-12 top-28 h-48 w-48 rounded-full border border-[#516171]/10 opacity-50" />

    <!-- ─────────── HEADER ─────────── -->
    <header class="sticky top-0 z-50 flex items-center justify-between border-b border-[#D1D8E0] bg-[#F8F9FA]/80 px-6 py-4 backdrop-blur-md lg:px-12">
      <div class="flex items-center gap-2">
        <img src="/sleek/logo.png" alt="Ripples" class="h-7" />
      </div>
      <!-- Desktop nav (lg+) -->
      <nav class="hidden items-center gap-8 lg:flex">
        <a href="#campaigns" class="text-sm font-medium text-[#516171] hover:text-[#FEE601]">Campaigns</a>
        <a href="#how" class="text-sm font-medium text-[#516171] hover:text-[#FEE601]">How It Works</a>
        <a href="#for-brands" class="text-sm font-medium text-[#516171] hover:text-[#FEE601]">For Brands</a>
      </nav>
      <div class="flex items-center gap-4">
        <span class="text-xs font-medium uppercase tracking-wider text-[#8B9DAF]">TH / EN</span>
        <button class="hidden h-10 items-center rounded-full bg-[#516171] px-5 text-sm font-medium text-white lg:flex">
          เข้าสู่ระบบ
        </button>
        <button class="flex h-10 w-10 items-center justify-center rounded-full bg-[#516171] text-[#FEE601] lg:hidden" aria-label="Menu">
          <Menu class="h-5 w-5" />
        </button>
      </div>
    </header>

    <!-- ─────────── HERO ─────────── -->
    <section class="relative pt-8 pb-12 lg:pb-20 lg:pt-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <!-- Left: text content -->
          <div class="relative z-10">
            <div class="mb-6 inline-block rounded-full bg-[#516171] px-3 py-1 text-xs font-medium text-[#FEE601]">
              Marketplace สำหรับ Creator อันดับ 1 ของไทย
            </div>
            <h1 class="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-[3.5rem] xl:text-6xl">
              เปลี่ยนคนติดตามของคุณให้เป็น<br />
              <span class="mt-1 inline-block rotate-1 bg-[#FEE601] px-2 text-[#516171]">รายได้จริง</span>
            </h1>
            <p class="mb-8 max-w-md text-sm leading-relaxed text-[#516171]/80 lg:text-base">
              จับคู่กับแบรนด์ที่ผ่านการตรวจสอบ จ่ายตรงเวลา เอกสารภาษีจัดให้ครบ — ในแอปเดียว
            </p>
            <div class="mb-8 flex w-full max-w-sm flex-col gap-3 lg:max-w-md lg:flex-row">
              <button class="group flex items-center justify-between rounded-full bg-[#516171] px-6 py-4 font-medium text-white lg:flex-1">
                <span>เริ่มเป็น Creator ฟรี</span>
                <ArrowUpRight class="h-5 w-5 text-[#FEE601] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
              <button class="rounded-full border border-[#D1D8E0] px-6 py-4 text-center font-medium text-[#516171] hover:bg-white">
                ดู Campaign เปิดรับ
              </button>
            </div>
            <!-- Trust row -->
            <div class="flex items-center gap-4">
              <div class="flex -space-x-2">
                <img v-for="(url, i) in trustAvatars" :key="i" :src="url" class="h-8 w-8 rounded-full border-2 border-[#F8F9FA] object-cover" alt="" />
              </div>
              <div class="text-xs">
                <div class="flex text-[#FEE601]">
                  <Star v-for="n in 5" :key="n" class="h-3.5 w-3.5 fill-current" />
                </div>
                <div class="mt-0.5 font-medium text-[#516171]/70">4.9★ • 10,000+ creators</div>
              </div>
            </div>
          </div>

          <!-- Right: hero photo + floating chips -->
          <div class="relative">
            <div class="relative h-[400px] w-full overflow-hidden rounded-[1.5rem] lg:h-[520px]">
              <img src="/sleek/hero.jpg" alt="Creator lifestyle" class="h-full w-full object-cover object-top" />
              <div class="absolute right-6 top-6 rotate-3 rounded-full bg-[#516171] px-3 py-1.5 text-xs font-bold text-[#FEE601] shadow-lg">
                Beauty
              </div>
              <div class="absolute bottom-24 right-4 rotate-6 rounded-full bg-[#516171] px-3 py-1.5 text-xs font-bold text-[#FEE601] shadow-lg">
                Authentic
              </div>
              <div class="absolute bottom-12 left-6 -rotate-6 rounded-full bg-[#516171] px-3 py-1.5 text-xs font-bold text-[#FEE601] shadow-lg">
                Lifestyle
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── STATS STRIP ─────────── -->
    <section class="border-y border-[#D1D8E0]">
      <div class="mx-auto flex max-w-7xl items-stretch justify-between px-6 py-8 lg:px-12 lg:py-12">
        <div class="flex-1 text-center">
          <div class="text-2xl font-bold lg:text-4xl">10,000+</div>
          <div class="mt-1 text-xs text-[#8B9DAF] lg:text-sm">Active creators</div>
        </div>
        <div class="w-px bg-[#D1D8E0]" />
        <div class="flex-1 text-center">
          <div class="text-2xl font-bold lg:text-4xl">500+</div>
          <div class="mt-1 text-xs text-[#8B9DAF] lg:text-sm">Verified brands</div>
        </div>
        <div class="w-px bg-[#D1D8E0]" />
        <div class="flex-1 text-center">
          <div class="text-2xl font-bold text-[#FEE601] drop-shadow-sm lg:text-4xl">7 วัน</div>
          <div class="mt-1 text-xs text-[#8B9DAF] lg:text-sm">Avg. payout</div>
        </div>
      </div>
    </section>

    <!-- ─────────── YELLOW KYC BLOCK ─────────── -->
    <section class="relative overflow-hidden bg-[#FEE601] py-16 text-[#516171] lg:py-24">
      <div class="absolute -bottom-10 -right-10 h-40 w-40 rounded-full border-2 border-[#516171]/20" />
      <div class="absolute -bottom-16 -right-16 h-52 w-52 rounded-full border-2 border-[#516171]/20" />
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div class="mb-6 inline-block rounded-full bg-[#516171] px-3 py-1 text-xs font-bold text-[#FEE601]">
              100% KYC Verified Brands
            </div>
            <h2 class="mb-8 font-bold leading-snug text-3xl lg:text-5xl">
              ที่ที่ Creator ตัวจริง<br />
              เจอแบรนด์ตัวจริง
            </h2>
            <p class="hidden max-w-md text-base leading-relaxed text-[#516171]/90 lg:block">
              ทุกแบรนด์บน Ripples ผ่านการยืนยันตัวตน — ไม่ต้องเสี่ยงเจอมิจฉาชีพ ไม่ต้องลุ้นว่าจะเบี้ยวจ่ายหรือไม่
            </p>
          </div>
          <ul class="space-y-6">
            <li class="flex gap-4">
              <CheckCircle2 class="mt-0.5 h-5 w-5 shrink-0 fill-[#516171] text-[#FEE601]" />
              <div>
                <strong class="mb-1 block font-medium">ทุกแบรนด์ผ่าน KYC</strong>
                <span class="text-sm opacity-90">ไม่มีงานหลอก ไม่มีเบี้ยวจ่าย</span>
              </div>
            </li>
            <li class="flex gap-4">
              <ReceiptText class="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <strong class="mb-1 block font-medium">ราคาโปร่งใส</strong>
                <span class="text-sm opacity-90">เอกสารภาษีอัตโนมัติ หัก ณ ที่จ่ายถูกต้อง</span>
              </div>
            </li>
            <li class="flex gap-4">
              <TrendingUp class="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <strong class="mb-1 block font-medium">Dashboard เรียลไทม์</strong>
                <span class="text-sm opacity-90">ติดตามรายได้และผลงานแบบ real-time</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ─────────── 6 FEATURE CARDS ─────────── -->
    <section class="py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="mb-10 lg:mb-14 max-w-2xl">
          <h2 class="text-2xl font-bold leading-tight lg:text-4xl">ทุกอย่างที่คุณต้องการ ในแอปเดียว</h2>
          <p class="mt-3 text-sm text-[#8B9DAF] lg:text-base">เครื่องมือครบสำหรับ Creator ตั้งแต่หา campaign จนถึงรับเงิน</p>
        </div>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="rounded-[1.5rem] border border-[#D1D8E0] bg-white p-5 shadow-sm lg:p-7"
          >
            <component :is="feature.icon" class="mb-3 h-6 w-6 text-[#516171] lg:h-7 lg:w-7" />
            <h3 class="mb-1 text-sm font-bold lg:text-base">{{ feature.title }}</h3>
            <p class="text-xs text-[#8B9DAF] lg:text-sm">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── 4-STEP TIMELINE ─────────── -->
    <section id="how" class="bg-white py-12 lg:py-20">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <h2 class="mb-8 text-2xl font-bold lg:mb-14 lg:text-4xl">เริ่มต้น 4 ขั้นตอน</h2>
        <!-- Mobile: vertical timeline -->
        <div class="relative space-y-8 border-l-2 border-[#D1D8E0] pl-6 lg:hidden">
          <div v-for="(step, i) in steps" :key="step.title" class="relative">
            <div
              :class="[
                'absolute -left-[35px] flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ring-4 ring-white',
                i === steps.length - 1 ? 'bg-[#FEE601] text-[#516171]' : 'bg-[#516171] text-[#FEE601]',
              ]"
            >
              {{ i + 1 }}
            </div>
            <h4 class="mb-1 text-sm font-bold">{{ step.title }}</h4>
            <p class="text-xs text-[#8B9DAF]">{{ step.desc }}</p>
          </div>
        </div>
        <!-- Desktop: horizontal timeline -->
        <div class="hidden lg:block">
          <div class="relative grid grid-cols-4 gap-6">
            <div class="absolute left-0 right-0 top-3 h-0.5 bg-[#D1D8E0]" />
            <div v-for="(step, i) in steps" :key="step.title" class="relative">
              <div
                :class="[
                  'mb-5 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ring-4 ring-white',
                  i === steps.length - 1 ? 'bg-[#FEE601] text-[#516171]' : 'bg-[#516171] text-[#FEE601]',
                ]"
              >
                {{ i + 1 }}
              </div>
              <h4 class="mb-1.5 text-base font-bold">{{ step.title }}</h4>
              <p class="text-sm leading-relaxed text-[#8B9DAF]">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── CAMPAIGNS เปิดรับ ─────────── -->
    <section id="campaigns" class="overflow-hidden py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <div class="mb-8 flex items-center justify-between lg:mb-12">
          <h2 class="text-2xl font-bold lg:text-4xl">Campaigns เปิดรับ</h2>
          <button class="text-sm font-medium underline lg:text-base">ดูทั้งหมด →</button>
        </div>

        <!-- Big featured campaign -->
        <div class="mb-4 grid grid-cols-1 gap-4 lg:mb-6 lg:grid-cols-2 lg:gap-6">
          <div class="relative h-64 overflow-hidden rounded-[2rem] bg-[#516171] p-6 text-white shadow-xl lg:h-80 lg:p-10">
            <div class="absolute right-0 top-0 h-32 w-32 rounded-bl-[100px] bg-[#FEE601] opacity-10 lg:h-40 lg:w-40" />
            <div class="mb-4 inline-block rounded-full bg-[#FEE601] px-3 py-1 text-xs font-bold text-[#516171]">
              ฿8,000–15,000
            </div>
            <h3 class="mb-2 pr-12 text-xl font-bold lg:text-2xl">
              Fall makeup collection — 5 creators needed
            </h3>
            <p class="mb-6 text-xs opacity-70 lg:text-sm">Beauty Brand X</p>
            <button class="mt-auto inline-block rounded-full bg-[#FEE601] px-4 py-2 text-xs font-bold text-[#516171] lg:text-sm">
              Apply Now
            </button>
            <img src="/sleek/campaign.jpg" class="absolute bottom-0 right-0 h-24 w-24 rounded-tl-2xl object-cover opacity-80 mix-blend-luminosity lg:h-36 lg:w-36" alt="" />
          </div>

          <!-- Two side-by-side cards (on lg+ joins the big card row) -->
          <div class="grid grid-cols-2 gap-4 lg:contents">
            <div class="relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-[#FEE601] p-5 lg:p-7">
              <div class="mb-2 text-xs font-bold text-[#516171]">฿3,000–6,000</div>
              <h4 class="mb-4 text-sm font-bold text-[#516171] lg:text-lg">Food Delivery App Review</h4>
              <button class="self-start rounded-full bg-[#516171] px-3 py-1.5 text-xs font-bold text-[#FEE601]">
                Apply
              </button>
            </div>
            <div class="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#D1D8E0] bg-white p-5 lg:p-7">
              <div class="mb-2 text-xs font-bold">฿5,000–10,000</div>
              <h4 class="mb-4 text-sm font-bold lg:text-lg">Tech Accessory Feature</h4>
              <button class="self-start rounded-full bg-[#516171] px-3 py-1.5 text-xs font-bold text-[#FEE601]">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── TESTIMONIAL ─────────── -->
    <section class="border-y border-[#D1D8E0] bg-white py-16 lg:py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-12">
        <h2 class="mb-8 text-2xl font-bold lg:mb-12 lg:text-4xl">เสียงจาก Creator</h2>
        <div class="mx-auto max-w-3xl rounded-[2rem] border border-[#D1D8E0] bg-[#F8F9FA] p-6 lg:p-10">
          <div class="mb-4 flex text-[#FEE601] text-sm">
            <Star v-for="n in 5" :key="n" class="h-4 w-4 fill-current" />
          </div>
          <p class="mb-6 text-sm font-medium italic leading-relaxed lg:text-lg">
            "ก่อนใช้ Ripples เคยโดนเบี้ยวค่าตัวบ่อยมาก ตอนนี้สบายใจ จ่ายตรงเวลาทุกครั้ง
            เอกสารภาษีก็จัดให้ ไม่ต้องปวดหัวอีกต่อไป"
          </p>
          <div class="flex items-center gap-3">
            <img src="https://randomuser.me/api/portraits/women/68.jpg" class="h-10 w-10 rounded-full lg:h-12 lg:w-12" alt="" />
            <div>
              <div class="text-sm font-bold">Mook Beauty</div>
              <div class="text-xs text-[#8B9DAF]">@beauty.bymook · 78K followers</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ─────────── BOTTOM CTA ─────────── -->
    <section class="py-16 text-center lg:py-24">
      <div class="mx-auto max-w-2xl px-6">
        <h2 class="mb-4 font-bold leading-tight text-3xl lg:text-5xl">
          พร้อมเปลี่ยนคอนเทนต์เป็นรายได้แล้วหรือยัง?
        </h2>
        <p class="mb-8 text-sm text-[#8B9DAF] lg:text-base">
          สมัครฟรี ไม่มีค่าธรรมเนียมแรกเข้า ยกเลิกได้ทุกเมื่อ
        </p>
        <button class="mx-auto mb-8 flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-[#516171] px-8 py-4 font-bold text-[#FEE601]">
          เริ่มเป็น Creator
          <ArrowRight class="h-5 w-5" />
        </button>
        <div class="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-medium text-[#8B9DAF]">
          <span class="flex items-center gap-1"><Check class="h-3.5 w-3.5" /> Verified Brands</span>
          <span class="flex items-center gap-1"><Check class="h-3.5 w-3.5" /> Auto Tax Docs</span>
          <span class="flex items-center gap-1"><Check class="h-3.5 w-3.5" /> 24/7 Support</span>
        </div>
      </div>
    </section>

    <!-- ─────────── FOOTER ─────────── -->
    <footer class="rounded-t-[40px] bg-[#516171] px-6 py-12 text-white lg:px-12 lg:py-16">
      <div class="mx-auto max-w-7xl">
        <div class="grid gap-8 lg:grid-cols-4">
          <div class="lg:col-span-1">
            <img src="/sleek/logo-gray.png" alt="Ripples" class="mb-4 h-6" />
            <p class="text-xs leading-relaxed opacity-70">
              Marketplace สำหรับ Creator อันดับ 1 ของไทย — จับคู่กับแบรนด์ที่ผ่านการตรวจสอบ
            </p>
          </div>
          <div class="grid grid-cols-2 gap-6 lg:col-span-2 lg:grid-cols-3">
            <div class="space-y-3 text-sm opacity-80">
              <p class="mb-2 text-xs font-bold uppercase tracking-wider opacity-60">Platform</p>
              <a href="#" class="block hover:text-[#FEE601]">Campaigns</a>
              <a href="#" class="block hover:text-[#FEE601]">How It Works</a>
              <a href="#" class="block hover:text-[#FEE601]">For Brands</a>
            </div>
            <div class="space-y-3 text-sm opacity-80">
              <p class="mb-2 text-xs font-bold uppercase tracking-wider opacity-60">Company</p>
              <a href="#" class="block hover:text-[#FEE601]">About</a>
              <a href="#" class="block hover:text-[#FEE601]">Help</a>
              <a href="#" class="block hover:text-[#FEE601]">Contact</a>
            </div>
            <div class="space-y-3 text-sm opacity-80">
              <p class="mb-2 text-xs font-bold uppercase tracking-wider opacity-60">Legal</p>
              <a href="/terms" class="block hover:text-[#FEE601]">Terms</a>
              <a href="/privacy" class="block hover:text-[#FEE601]">Privacy</a>
              <a href="/cookies" class="block hover:text-[#FEE601]">Cookies</a>
            </div>
          </div>
        </div>
        <div class="mt-10 flex items-center justify-between border-t border-white/10 pt-6 text-xs opacity-50">
          <span>© 2026 Ripples</span>
          <span class="uppercase">TH / EN</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  FileText,
  Menu,
  MousePointerClick,
  ReceiptText,
  Search,
  Star,
  TrendingUp,
  Video,
  Wallet,
  Zap,
} from 'lucide-vue-next'

definePageMeta({ layout: false })

const trustAvatars = [
  'https://randomuser.me/api/portraits/women/12.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/55.jpg',
]

const features = [
  { icon: Search, title: 'Browse Campaigns', desc: 'Filter by category & budget' },
  { icon: MousePointerClick, title: 'One-Click Apply', desc: 'Pitch with auto-filled portfolio' },
  { icon: Video, title: 'Content Studio', desc: 'Brief, drafts, approval' },
  { icon: Wallet, title: 'Earnings Dashboard', desc: 'Track payouts pending' },
  { icon: Zap, title: 'Fast Payouts', desc: 'Money in bank in 7 days' },
  { icon: FileText, title: 'Auto Tax Docs', desc: '50 ทวิ, ใบกำกับภาษี ครบจบ' },
]

const steps = [
  { title: 'Sign Up & Verify', desc: 'Connect socials, verify identity (5 min)' },
  { title: 'Browse & Apply', desc: 'Find campaigns matching your vibe' },
  { title: 'Create & Approve', desc: 'Upload drafts, get brand approval' },
  { title: 'Get Paid', desc: 'Automatic invoice + tax docs + bank transfer' },
]
</script>
