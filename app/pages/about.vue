<script setup lang="ts">
definePageMeta({ layout: 'default' })
const { tr } = useLocale()
useHead(() => ({ title: tr('เกี่ยวกับเรา — Ripples', 'About us — Ripples') }))

const stats: [string, string, string][] = [
  ['10,000+', 'ครีเอเตอร์ที่ตรวจสอบแล้ว', 'Verified creators'],
  ['500+', 'แบรนด์ที่ไว้วางใจ', 'Brands that trust us'],
  ['98%', 'อัตราความสำเร็จ', 'Success rate'],
  ['24/7', 'ทีมซัพพอร์ต', 'Support team'],
]

const values: [string, string, string, string, string][] = [
  ['target', 'ความโปร่งใส', 'Transparency', 'ทุกตัวเลขบน Ripples ตรวจสอบได้ ทั้งราคา engagement และผลงาน', 'Every number on Ripples is verifiable — pricing, engagement, and results.'],
  ['shield-check', 'ความเชื่อถือได้', 'Reliability', 'สัญญาดิจิทัล เอกสารภาษีครบ ติดตามสถานะทุก milestone — แบรนด์และ creator ไว้ใจกันได้', 'Digital contracts, complete tax documents, and milestone tracking — so brands and creators can trust each other.'],
  ['zap', 'นวัตกรรม', 'Innovation', 'เครื่องมือวัดผลและ dashboard ที่ทันสมัย ช่วยคุณตัดสินใจบน data จริง', 'Modern measurement tools and dashboards that help you decide based on real data.'],
  ['heart', 'ชุมชน', 'Community', 'เราเชื่อว่า creator กับแบรนด์โตไปด้วยกันได้ Ripples คือสะพานเชื่อม', 'We believe creators and brands can grow together — Ripples is the bridge.'],
]

const team: [string, string, number][] = [
  ['Alex K.', 'Founder & CEO', 68],
  ['Sara T.', 'Head of Product', 47],
  ['Chris L.', 'Head of Creator Relations', 13],
  ['Emma P.', 'Head of Brand Success', 32],
]

const features: [string, string][] = [
  ['Creator ทุกคนผ่านการตรวจสอบตัวตน (KYC) และ engagement จริง', 'Every creator is identity-verified (KYC) with real engagement.'],
  ['สัญญาดิจิทัล + เอกสารภาษีครบถ้วน โปร่งใสทั้งสองฝ่าย', 'Digital contracts plus complete tax documents — transparent for both sides.'],
  ['Dashboard วัดผลเรียลไทม์ทุกแคมเปญ', 'A real-time performance dashboard for every campaign.'],
  ['Account manager ดูแลทุก campaign ตั้งแต่ต้นจนจบ', 'An account manager handles every campaign from start to finish.'],
  ['ราคาโปร่งใส ไม่มีค่าใช้จ่ายซ่อน', 'Transparent pricing with no hidden fees.'],
  ['Support 24/7 ตอบเร็วทั้งไทยและอังกฤษ', '24/7 support with fast replies in both Thai and English.'],
]
</script>

<template>
  <div>
    <!-- intro -->
    <section class="mb-12">
      <span class="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
        <Icon name="sparkles" class="h-3.5 w-3.5" /> {{ tr('เกี่ยวกับเรา', 'About us') }}
      </span>
      <h1 class="mt-5 max-w-3xl font-heading text-4xl font-extrabold leading-[1.5] tracking-tight text-ink lg:text-6xl">
        {{ tr('พื้นที่ที่แบรนด์เจอ', 'Where brands meet') }} <span class="text-primary">{{ tr('Creator ตัวจริง', 'real creators') }}</span>
      </h1>
      <p class="mt-5 max-w-2xl text-sm leading-relaxed text-muted lg:text-lg">
        {{ tr('Marketplace ยุคใหม่ — KOL ผ่านการตรวจสอบ engagement จริง วัดผลได้ทุกแคมเปญ ดูแลตั้งแต่เลือก creator บรีฟงาน ตรวจเนื้อหา จนถึงออกเอกสารครบถ้วน', 'A modern marketplace — verified KOLs with real engagement, measurable results on every campaign, handled from picking creators and briefing to content review and full documentation.') }}
      </p>
    </section>

    <!-- stats -->
    <section class="mb-16">
      <div class="grid grid-cols-2 divide-x divide-y divide-[#0F2747]/10 overflow-hidden rounded-xl border border-[#0F2747]/10 bg-white shadow-[0_30px_60px_-40px_rgb(45_91_255_/_35%)] sm:grid-cols-4 sm:divide-y-0">
        <div v-for="s in stats" :key="s[1]" class="p-8 text-center lg:p-10">
          <div class="font-heading text-3xl font-extrabold text-primary lg:text-5xl">{{ s[0] }}</div>
          <div class="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#5B6B82]/60 lg:text-xs">{{ tr(s[1], s[2]) }}</div>
        </div>
      </div>
    </section>

    <!-- story -->
    <section class="mb-20 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <h2 class="font-heading text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">{{ tr('ทำไมเราสร้าง Ripples', 'Why we built Ripples') }}</h2>
        <div class="mt-5 space-y-4 text-sm leading-relaxed text-muted lg:text-base">
          <p>{{ tr('วงการ KOL ในไทยโตเร็วมาก แต่แบรนด์ยังหา creator ที่ใช่ยาก ปัญหา fake followers, engagement ปลอม, สื่อสารกันวุ่นวาย — Ripples เกิดขึ้นเพื่อแก้โจทย์เหล่านี้ในที่เดียว', "Thailand's KOL scene is growing fast, but brands still struggle to find the right creators. Fake followers, fake engagement, and messy communication — Ripples was built to solve all of these in one place.") }}</p>
          <p>{{ tr('เราคัดกรอง creator ทุกคนผ่าน KYC และวิเคราะห์ engagement จริง ตัวเลขในโปรไฟล์โปร่งใส ตรวจสอบได้ ไม่มี bot ไม่มี fake', 'We screen every creator through KYC and analyze real engagement. Profile numbers are transparent and verifiable — no bots, no fakes.') }}</p>
          <p>{{ tr('ตั้งแต่เลือก creator, บรีฟงาน, ตรวจเนื้อหา, go live, วัดผล จนจ่ายเงิน — จบในที่เดียว เรียลไทม์ ปลอดภัยทั้งสองฝ่าย', 'From picking creators, briefing, and content review to going live, measuring results, and payment — all in one place, in real time, safe for both sides.') }}</p>
        </div>
      </div>
      <div class="relative">
        <img src="/about-team.jpg" :alt="tr('ทีม Ripples', 'The Ripples team')" class="w-full rounded-xl border border-[#0F2747]/10 object-cover shadow-[0_30px_60px_-30px_rgb(45_91_255_/_45%)]" />
        <div class="absolute -bottom-5 -left-5 -z-10 h-32 w-32 rounded-2xl bg-primary/10" />
        <div class="absolute -right-5 -top-5 -z-10 h-24 w-24 rounded-full bg-primary/20" />
      </div>
    </section>

    <!-- values -->
    <section class="mb-20">
      <div class="mb-8 max-w-xl">
        <span class="text-sm font-bold uppercase tracking-[0.25em] text-[#5B6B82]/70">{{ tr('ค่านิยมของเรา', 'Our values') }}</span>
        <h2 class="mt-2 font-heading text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">{{ tr('สิ่งที่เรายึดถือ', 'What we stand for') }}</h2>
      </div>
      <div class="grid gap-5 sm:grid-cols-2">
        <div v-for="v in values" :key="v[1]" class="rounded-xl border border-[#0F2747]/10 bg-white p-7 shadow-sm transition-shadow hover:shadow-[0_24px_50px_-30px_rgb(45_91_255_/_35%)]">
          <div class="flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10"><Icon :name="v[0]" class="h-7 w-7 text-primary" /></div>
          <h3 class="mt-5 font-heading text-xl font-bold text-ink">{{ tr(v[1], v[2]) }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ tr(v[3], v[4]) }}</p>
        </div>
      </div>
    </section>

    <!-- team -->
    <section class="mb-20">
      <div class="mb-8 max-w-xl">
        <span class="text-sm font-bold uppercase tracking-[0.25em] text-[#5B6B82]/70">{{ tr('ทีมของเรา', 'Our team') }}</span>
        <h2 class="mt-2 font-heading text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">{{ tr('ทีมเบื้องหลัง Ripples', 'The team behind Ripples') }}</h2>
      </div>
      <div class="grid grid-cols-2 gap-5 lg:grid-cols-4">
        <div v-for="m in team" :key="m[0]" class="overflow-hidden rounded-xl border border-[#0F2747]/10 bg-white shadow-sm">
          <div class="aspect-square overflow-hidden"><img :src="`https://i.pravatar.cc/600?img=${m[2]}`" :alt="m[0]" class="h-full w-full object-cover transition-transform duration-500 hover:scale-105" /></div>
          <div class="p-5 text-center"><h3 class="font-heading text-base font-bold text-ink">{{ m[0] }}</h3><p class="mt-0.5 text-xs text-muted">{{ m[1] }}</p></div>
        </div>
      </div>
    </section>

    <!-- why us -->
    <section>
      <div class="mb-8 max-w-xl">
        <span class="text-sm font-bold uppercase tracking-[0.25em] text-[#5B6B82]/70">{{ tr('ทำไมต้องเลือกเรา', 'Why choose us') }}</span>
        <h2 class="mt-2 font-heading text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">{{ tr('ทำไมแบรนด์เลือก Ripples', 'Why brands choose Ripples') }}</h2>
      </div>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="f in features" :key="f[0]" class="flex items-start gap-3 rounded-xl border border-[#0F2747]/10 bg-white p-4 shadow-sm">
          <Icon name="check-circle" class="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <span class="text-sm leading-relaxed text-ink">{{ tr(f[0], f[1]) }}</span>
        </div>
      </div>
    </section>
  </div>
</template>
