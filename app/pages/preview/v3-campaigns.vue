<template>
  <div class="relative min-h-screen overflow-x-hidden bg-[#130B38] font-sans text-white">
    <!-- Cosmic aurora background (fixed) -->
    <img src="/sleek/v3/aurora-bg.png" alt="" aria-hidden="true" class="pointer-events-none fixed inset-0 h-full w-full object-cover" />
    <div class="pointer-events-none fixed inset-0 bg-[#130B38]/55" />
    <div class="pointer-events-none fixed inset-0 bg-gradient-to-b from-[#130B38]/30 via-transparent to-[#130B38]/40" />

    <!-- ─────────── SIDEBAR (desktop) ─────────── -->
    <aside class="fixed inset-y-0 left-0 z-50 hidden w-72 flex-col border-r border-white/5 bg-[#160C42]/85 px-6 py-7 backdrop-blur-xl lg:flex">
      <a href="/preview/v3" class="self-center"><img src="/ripples-logo-white.png" alt="Ripples" class="h-16" /></a>

      <div class="mt-8 space-y-2.5">
        <a href="#" class="flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#6D5BFF] to-[#C026D3] px-4 py-3 text-white shadow-[0_0_30px_rgba(139,92,246,0.4)]">
          <span class="text-left">
            <span class="block text-[10px] font-bold uppercase tracking-widest text-white/70">Influencer / Creator</span>
            <span class="block text-sm font-bold">เข้าสู่ระบบ</span>
          </span>
          <ArrowRight class="h-4 w-4" />
        </a>
        <a href="#" class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white backdrop-blur-md">
          <span class="text-left">
            <span class="block text-[10px] font-bold uppercase tracking-widest text-[#C4B5FD]">Marketer</span>
            <span class="block text-sm font-bold">เข้าสู่ระบบ (Out of scope)</span>
          </span>
          <ArrowRight class="h-4 w-4 text-[#C4B5FD]" />
        </a>
      </div>

      <nav class="mt-8 flex flex-1 flex-col gap-0.5">
        <a
          v-for="item in menu"
          :key="item.label"
          :href="item.href"
          :class="[
            'rounded-xl px-3 py-2.5 text-sm font-semibold transition',
            item.active ? 'bg-white/5 text-[#C4B5FD]' : 'text-white/72 hover:bg-white/5 hover:text-[#C4B5FD]',
          ]"
        >
          {{ item.label }}
        </a>
      </nav>

      <div class="mt-6 space-y-5">
        <div class="flex w-fit items-center rounded-full border border-white/10 bg-white/5 p-1">
          <span class="rounded-full bg-gradient-to-r from-[#6D5BFF] to-[#C026D3] px-2.5 py-0.5 text-[10px] font-bold text-white">TH</span>
          <span class="px-2.5 py-0.5 text-[10px] font-bold text-white/60">EN</span>
        </div>
        <p class="text-[11px] leading-relaxed text-white/65">
          Marketplace KOL &amp; Influencer ยุคใหม่ — สำหรับแบรนด์และ creator ในประเทศไทย
        </p>
        <div class="flex items-center gap-4 text-white/55">
          <a v-for="s in socials" :key="s.name" href="#" :aria-label="s.name" class="transition hover:text-[#C4B5FD]">
            <component :is="s.icon" v-if="s.icon" class="h-[18px] w-[18px]" />
            <svg v-else viewBox="0 0 24 24" fill="currentColor" class="h-[18px] w-[18px]" v-html="s.path" />
          </a>
        </div>
      </div>
    </aside>

    <!-- ─────────── TOPBAR (mobile) ─────────── -->
    <header class="sticky top-0 z-50 flex items-center justify-between border-b border-white/5 bg-[#160C42]/80 px-6 py-4 backdrop-blur-xl lg:hidden">
      <a href="/preview/v3"><img src="/ripples-logo-white.png" alt="Ripples" class="h-10" /></a>
      <button class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white" aria-label="Menu">
        <Menu class="h-5 w-5" />
      </button>
    </header>

    <!-- ─────────── MAIN ─────────── -->
    <div class="relative lg:pl-72">
      <main class="mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-14">
        <!-- page header -->
        <section class="mb-8">
          <span class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#C4B5FD]">
            <Sparkles class="h-3.5 w-3.5" /> Campaigns
          </span>
          <h1 class="mt-4 font-heading text-3xl font-bold tracking-tight lg:text-5xl">แคมเปญที่น่าสนใจ</h1>
          <p class="mt-2 max-w-xl text-sm text-white/72 lg:text-base">เลือกแคมเปญที่ใช่ สมัครได้ทันที — แบรนด์ผ่านการตรวจสอบ จ่ายตรงเวลา</p>
        </section>

        <!-- search + filters -->
        <section class="mb-8 rounded-[1.75rem] border border-white/10 bg-white/5 p-5 backdrop-blur-xl lg:p-6">
          <div class="relative">
            <Search class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="ค้นหาแคมเปญ หรือแบรนด์..."
              class="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-white placeholder-white/40 outline-none transition focus:border-[#A78BFA]/50"
            />
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <button
              v-for="(cat, i) in categories"
              :key="cat"
              :class="[
                'rounded-full px-4 py-1.5 text-xs font-bold transition',
                i === 0
                  ? 'bg-gradient-to-r from-[#6D5BFF] to-[#C026D3] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                  : 'border border-white/10 bg-white/5 text-white/70 hover:text-[#C4B5FD]',
              ]"
            >
              {{ cat }}
            </button>
          </div>
        </section>

        <!-- campaigns grid -->
        <section class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="c in campaigns"
            :key="c.title"
            class="group flex flex-col overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 backdrop-blur-xl transition hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]"
          >
            <div class="relative h-48 overflow-hidden">
              <img :src="c.image" :alt="c.title" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#160C42]/60 to-transparent" />
              <span class="absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">{{ c.cat }}</span>
              <span :class="['absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide', c.statusClass]">{{ c.statusLabel }}</span>
            </div>
            <div class="flex flex-1 flex-col p-5">
              <div class="flex items-center gap-2">
                <img :src="c.logo" :alt="c.brand" class="h-6 w-6 rounded-full object-cover" />
                <span class="text-xs text-white/65">{{ c.brand }}</span>
              </div>
              <h3 class="mt-3 line-clamp-1 font-heading text-lg font-bold text-white">{{ c.title }}</h3>
              <p class="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/60">{{ c.desc }}</p>
              <div class="mt-4 flex items-center gap-4 text-xs text-white/60">
                <span class="flex items-center gap-1.5"><Users class="h-4 w-4 text-[#C4B5FD]" /> {{ c.joined }}/{{ c.needed }}</span>
                <span class="flex items-center gap-1.5"><Calendar class="h-4 w-4 text-[#C4B5FD]" /> {{ c.end }}</span>
              </div>
              <div class="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p class="text-[10px] uppercase tracking-widest text-white/50">งบประมาณ</p>
                  <p class="font-bold text-[#D8C9FF]">{{ c.budget }}</p>
                </div>
                <button
                  v-if="c.status === 'open'"
                  class="rounded-xl bg-gradient-to-r from-[#6D5BFF] to-[#C026D3] px-4 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.35)] transition active:translate-y-0.5"
                >
                  สมัครเลย
                </button>
                <button
                  v-else
                  disabled
                  class="cursor-not-allowed rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white/45"
                >
                  {{ c.status === 'closed' ? 'ปิดรับแล้ว' : 'เร็วๆ นี้' }}
                </button>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  Calendar,
  Facebook,
  Instagram,
  Menu,
  Search,
  Sparkles,
  Users,
  Youtube,
} from 'lucide-vue-next'

definePageMeta({ layout: false })

const menu = [
  { label: 'หน้าหลัก', href: '/preview/v3', active: false },
  { label: 'แคมเปญ', href: '/preview/v3-campaigns', active: true },
  { label: 'เกี่ยวกับเรา', href: '#', active: false },
  { label: 'บริการ', href: '#', active: false },
  { label: 'FAQ คำถามที่พบบ่อย', href: '#', active: false },
  { label: 'ช่วยเหลือ', href: '#', active: false },
  { label: 'ติดต่อเรา', href: '#', active: false },
]

const socials = [
  { name: 'Facebook', icon: Facebook, path: '' },
  { name: 'Instagram', icon: Instagram, path: '' },
  { name: 'X', icon: null, path: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>' },
  { name: 'YouTube', icon: Youtube, path: '' },
  { name: 'TikTok', icon: null, path: '<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.66a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.09Z"/>' },
]

const categories = ['ทั้งหมด', 'แฟชั่น', 'ความงาม', 'อาหาร', 'เทคโนโลยี', 'ไลฟ์สไตล์', 'ท่องเที่ยว', 'ฟิตเนส']

const OPEN = { statusLabel: 'เปิดรับสมัคร', statusClass: 'bg-gradient-to-r from-[#8B5CF6] to-[#C026D3] text-white', status: 'open' as const }
const CLOSED = { statusLabel: 'ปิดรับแล้ว', statusClass: 'border border-white/20 bg-white/10 text-white/60 backdrop-blur', status: 'closed' as const }
const SOON = { statusLabel: 'เร็วๆ นี้', statusClass: 'border border-white/20 bg-white/10 text-white/70 backdrop-blur', status: 'draft' as const }

const campaigns = [
  {
    title: 'Summer Collection 2026',
    brand: 'Fashion Brand Co.',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    cat: 'แฟชั่น',
    desc: 'ร่วมโปรโมทคอลเลกชั่นแฟชั่นใหม่ล่าสุดสำหรับซัมเมอร์นี้ มองหา influencer ที่มีสไตล์การแต่งตัวที่โดดเด่นบน Instagram',
    joined: 45, needed: 50, end: '30 เม.ย. 2026', budget: '฿15,000 – 30,000',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
    ...OPEN,
  },
  {
    title: 'Tech Review Q2',
    brand: 'TechZone',
    logo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop',
    cat: 'เทคโนโลยี',
    desc: 'รีวิวสมาร์ทโฟนและแกดเจ็ตใหม่ล่าสุด มองหา tech reviewer ที่มีความรู้ด้านเทคโนโลยีบน YouTube',
    joined: 0, needed: 50, end: '15 มิ.ย. 2026', budget: '฿8,000 – 16,000',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop',
    ...SOON,
  },
  {
    title: 'Food Festival Promo',
    brand: 'Taste Kitchen',
    logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
    cat: 'อาหาร',
    desc: 'โปรโมทเทศกาลอาหารสุดยิ่งใหญ่ มองหา food blogger และ food influencer มารีวิวเมนูเด็ดจากร้านดังทั่วกรุงเทพ',
    joined: 120, needed: 100, end: '28 ก.พ. 2026', budget: '฿10,000 – 20,000',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    ...CLOSED,
  },
  {
    title: "L'Oréal Serum Review",
    brand: "L'Oréal Thailand",
    logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&h=100&fit=crop',
    cat: 'ความงาม',
    desc: 'เปิดตัว serum บำรุงผิวสูตรใหม่จาก L\'Oréal มองหา beauty influencer ที่มีความรู้ด้าน skincare รีวิวจริงจัง',
    joined: 28, needed: 50, end: '1 พ.ค. 2026', budget: '฿12,000 – 24,000',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop',
    ...OPEN,
  },
  {
    title: 'Shopee 11.11 Mega Sale',
    brand: 'Shopee Thailand',
    logo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=100&h=100&fit=crop',
    cat: 'ไลฟ์สไตล์',
    desc: 'มหกรรมช้อปออนไลน์ครั้งยิ่งใหญ่แห่งปี มองหา influencer ทุกสายมาช่วยโปรโมทดีลสุดปัง',
    joined: 200, needed: 200, end: '12 พ.ย. 2025', budget: '฿15,000 – 30,000',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=600&fit=crop',
    ...CLOSED,
  },
  {
    title: 'Nike Running Club',
    brand: 'Nike Thailand',
    logo: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
    cat: 'ไลฟ์สไตล์',
    desc: 'แคมเปญรองเท้าวิ่งคอลเลกชั่นใหม่จาก Nike มองหา fitness influencer มาร่วมท้าทายการวิ่ง',
    joined: 0, needed: 30, end: '30 มิ.ย. 2026', budget: '฿9,000 – 18,000',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop',
    ...SOON,
  },
]
</script>
