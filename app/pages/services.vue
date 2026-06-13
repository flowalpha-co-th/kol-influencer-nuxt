<script setup lang="ts">
definePageMeta({ layout: 'default' })
const { tr } = useLocale()
useHead(() => ({ title: tr('บริการ — Ripples', 'Services — Ripples') }))

type Service = { icon: string; title: string; titleEn: string; desc: string; descEn: string; feats: [string, string][] }
const services: Service[] = [
  { icon: 'search', title: 'หาแคมเปญที่ใช่', titleEn: 'Find the right campaigns', desc: 'เจอแบรนด์ที่ตรงกับสไตล์ หมวดหมู่ และเรตราคาของคุณ', descEn: 'Discover brands that match your style, category, and rate.', feats: [['ค้นหาด้วยตัวกรองหลายชั้น', 'Multi-layered search filters'], ['จับคู่ตามกลุ่มผู้ติดตาม', 'Matching by audience'], ['แนะนำแคมเปญอัตโนมัติ', 'Automatic campaign recommendations'], ['เห็นเรตราคาก่อนสมัคร', 'See rates before you apply']] },
  { icon: 'badge-check', title: 'แบรนด์ตรวจสอบแล้ว', titleEn: 'Verified brands', desc: 'ทุกแบรนด์ผ่านการตรวจสอบ 100% ไม่มีงานหลอก รับงานได้มั่นใจ', descEn: 'Every brand is 100% verified — no fake jobs, accept work with confidence.', feats: [['ยืนยันตัวตนแบรนด์', 'Brand identity verification'], ['รีวิวจากครีเอเตอร์จริง', 'Reviews from real creators'], ['ไม่มีงานหลอก/มิจฉาชีพ', 'No scams or fake jobs'], ['รายงานปัญหาได้ทันที', 'Report issues instantly']] },
  { icon: 'file-signature', title: 'บรีฟ & สัญญาชัดเจน', titleEn: 'Clear briefs & contracts', desc: 'เงื่อนไขงาน ขอบเขต และไทม์ไลน์ครบในสัญญาดิจิทัลฉบับเดียว', descEn: 'Terms, scope, and timeline all in a single digital contract.', feats: [['บรีฟงานละเอียด', 'Detailed work briefs'], ['สัญญาดิจิทัลมีผลตามกฎหมาย', 'Legally binding digital contracts'], ['ไทม์ไลน์ชัดเจน', 'Clear timelines'], ['แจ้งเตือนทุกกำหนดส่ง', 'Reminders for every deadline']] },
  { icon: 'check-circle', title: 'ส่งงาน & อนุมัติ', titleEn: 'Submit & approve', desc: 'ส่งงานให้แบรนด์ตรวจ แก้ไข และอนุมัติก่อนโพสต์จริงในที่เดียว', descEn: 'Submit work for brands to review, revise, and approve before posting — all in one place.', feats: [['ส่งงานออนไลน์', 'Submit work online'], ['รับคอมเมนต์/รอบแก้ไข', 'Receive comments and revisions'], ['เก็บประวัติทุกเวอร์ชัน', 'Keep a history of every version'], ['อนุมัติแล้วโพสต์ได้เลย', 'Post right after approval']] },
  { icon: 'wallet', title: 'จ่ายตรงเวลา', titleEn: 'On-time payments', desc: 'รับเงินเฉลี่ยภายใน 30 วันหลังงานผ่าน ติดตามสถานะได้ทุกขั้น', descEn: 'Get paid within 30 days on average after approval, and track the status at every step.', feats: [['จ่ายเฉลี่ยภายใน 30 วัน', 'Paid within 30 days on average'], ['ติดตามสถานะการจ่าย', 'Track payment status'], ['ดูรายได้แบบเรียลไทม์', 'View earnings in real time'], ['แจ้งเตือนเมื่อเงินเข้า', 'Get notified when money arrives']] },
  { icon: 'file-text', title: 'เอกสารภาษีครบ', titleEn: 'Complete tax documents', desc: 'หนังสือรับรองหัก ณ ที่จ่ายและเอกสารภาษีออกให้อัตโนมัติ', descEn: 'Withholding tax certificates and tax documents issued automatically.', feats: [['หนังสือรับรองหัก ณ ที่จ่าย (50 ทวิ)', 'Withholding tax certificates (50 Tawi)'], ['ใบเสร็จ/ใบกำกับภาษี', 'Receipts and tax invoices'], ['สรุปรายได้รายปี', 'Annual income summaries'], ['ดาวน์โหลดเป็น PDF', 'Download as PDF']] },
]

const steps: [string, string, string, string][] = [
  ['หาแคมเปญ', 'Find a campaign', 'เลือกงานจากแบรนด์ที่ตรวจสอบแล้ว ตรงกับสไตล์ หมวดหมู่ และเรตราคาของคุณ', 'Pick jobs from verified brands that match your style, category, and rate.'],
  ['ตกลงบรีฟ & สัญญา', 'Agree on brief & contract', 'ดูเงื่อนไข ขอบเขตงาน และไทม์ไลน์ ตกลงแล้วเซ็นสัญญาดิจิทัลในระบบ', 'Review the terms, scope, and timeline, then sign the digital contract in the system.'],
  ['ส่งงาน & อนุมัติ', 'Submit & approve', 'ส่งงานให้แบรนด์ตรวจ แก้ไขตามคอมเมนต์ พออนุมัติแล้วโพสต์จริงได้เลย', 'Submit work for the brand to review, revise per their comments, and post once approved.'],
  ['รับเงิน & เอกสารภาษี', 'Get paid & tax documents', 'รับเงินตรงเวลาเฉลี่ยภายใน 30 วัน พร้อมเอกสารภาษีออกให้อัตโนมัติ', 'Get paid on time within 30 days on average, with tax documents issued automatically.'],
]
</script>

<template>
  <div>
    <section class="mb-12">
      <span class="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
        <Icon name="sparkles" class="h-3.5 w-3.5" /> {{ tr('บริการของเรา', 'Our services') }}
      </span>
      <h1 class="mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-[1.5] tracking-tight text-ink lg:text-6xl">
        {{ tr('ทุกอย่างที่ครีเอเตอร์ต้องการ', 'Everything a creator needs') }} <span class="text-primary">{{ tr('จบในที่เดียว', 'all in one place') }}</span>
      </h1>
      <p class="mt-5 max-w-2xl text-sm leading-relaxed text-muted lg:text-lg">
        {{ tr('ตั้งแต่หาแคมเปญที่ใช่ ส่งงาน ไปจนรับเงินและเอกสารภาษี Ripples ดูแลให้ครบทุกขั้นตอน', 'From finding the right campaigns and submitting work to getting paid and receiving tax documents, Ripples covers every step.') }}
      </p>
    </section>

    <!-- services grid -->
    <section class="mb-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="s in services" :key="s.title" class="flex flex-col rounded-xl border border-[#0F2747]/10 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-[0_24px_50px_-30px_rgb(45_91_255_/_40%)]">
        <div class="flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10"><Icon :name="s.icon" class="h-7 w-7 text-primary" /></div>
        <h3 class="mt-5 font-heading text-xl font-bold text-ink">{{ tr(s.title, s.titleEn) }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">{{ tr(s.desc, s.descEn) }}</p>
        <ul class="mt-4 space-y-2 border-t border-[#0F2747]/10 pt-4">
          <li v-for="f in s.feats" :key="f[0]" class="flex items-center gap-2 text-xs text-muted"><Icon name="check-circle" class="h-4 w-4 shrink-0 text-primary" />{{ tr(f[0], f[1]) }}</li>
        </ul>
      </div>
    </section>

    <!-- how it works -->
    <section class="mb-20">
      <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-ink to-primaryDark p-8 text-white lg:p-14">
        <div class="pointer-events-none absolute inset-0 opacity-[0.06]" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 40px 40px" />
        <span class="relative text-sm font-bold uppercase tracking-[0.25em] text-white/70">{{ tr('วิธีการทำงาน', 'How it works') }}</span>
        <h2 class="relative mt-2 font-heading text-2xl font-extrabold tracking-tight lg:text-4xl">{{ tr('ง่าย โปร่งใส 4 ขั้นตอน', 'Simple and transparent — 4 steps') }}</h2>
        <div class="relative mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div v-for="(s, i) in steps" :key="s[0]" class="flex gap-4 lg:flex-col">
            <div :class="['flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-heading text-lg font-extrabold', i === 0 ? 'bg-primaryLight text-ink' : 'border border-white/15 bg-white/10 text-white']">{{ i + 1 }}</div>
            <div><h3 class="font-heading text-base font-bold">{{ tr(s[0], s[1]) }}</h3><p class="mt-1 text-sm leading-relaxed text-white/75">{{ tr(s[2], s[3]) }}</p></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primaryDark p-10 text-center text-white lg:p-16">
      <h2 class="font-heading text-3xl font-extrabold leading-tight tracking-tight lg:text-5xl">{{ tr('พร้อมเปลี่ยนคอนเทนต์เป็นรายได้หรือยัง?', 'Ready to turn your content into income?') }}</h2>
      <p class="mx-auto mt-4 max-w-xl text-sm text-white/80 lg:text-lg">{{ tr('สมัครฟรี รับงานจากแบรนด์ตรวจสอบแล้วได้ทันที จ่ายตรงเวลา เอกสารภาษีครบ', 'Sign up free and start accepting jobs from verified brands right away — paid on time, with complete tax documents.') }}</p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <NuxtLink to="/register" class="inline-flex items-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-primary transition hover:bg-white/90">{{ tr('เริ่มเป็น Creator ฟรี', 'Become a Creator — free') }} <Icon name="arrow-right" class="h-4 w-4" /></NuxtLink>
        <NuxtLink to="/contact" class="inline-flex items-center gap-2 rounded-lg border border-white/40 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10">{{ tr('ติดต่อเรา', 'Contact us') }}</NuxtLink>
      </div>
    </section>
  </div>
</template>
