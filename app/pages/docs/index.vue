<script setup lang="ts">
const { tr } = useLocale()

definePageMeta({ layout: 'docs' })
useHead(() => ({ title: tr('เอกสารสำหรับทีม — Ripples', 'Team Docs — Ripples') }))

interface DocCard {
  to: string
  icon: string
  title: string
  titleEn: string
  desc: string
  descEn: string
}

const docs: DocCard[] = [
  {
    to: '/docs/design-system',
    icon: 'swatch-book',
    title: 'Design System',
    titleEn: 'Design System',
    desc: 'โทเคนสี ตัวอักษร ระยะห่าง และแกลเลอรีคอมโพเนนต์ทั้งหมดในภาษาดีไซน์ v4',
    descEn: 'Color tokens, typography, spacing, and the full component gallery in the v4 design language.',
  },
  {
    to: '/docs/email-templates',
    icon: 'mail',
    title: 'โครง Email Template',
    titleEn: 'Email templates',
    desc: 'ตัวอย่างอีเมลแบรนด์ทุกเหตุการณ์ — OTP, อัปเดต consent, การจ่ายเงิน และตัวอย่างกันสแปม',
    descEn: 'Branded email mockups for every event — OTP, consent updates, payments, and anti-spam examples.',
  },
  {
    to: '/docs/notifications-spec',
    icon: 'list-checks',
    title: 'Notification Spec',
    titleEn: 'Notification spec',
    desc: 'เมทริกซ์การแจ้งเตือน (เหตุการณ์ × web/email/บังคับ/ลิงก์) พร้อมกฎกันสแปม',
    descEn: 'Notification matrix (event × web/email/mandatory/link) plus anti-spam rules.',
  },
  {
    to: '/docs/profile-spec',
    icon: 'clipboard-list',
    title: 'Profile Spec',
    titleEn: 'Profile spec',
    desc: 'รายการฟิลด์โปรไฟล์ (กรอกเอง / ซิงก์จาก API / แอดมินตั้ง), การตรวจสอบ, สถานะ และ edge cases',
    descEn: 'Profile field inventory (self-entered / API-synced / admin-set), validation, states, and edge cases.',
  },
]
</script>

<template>
  <div>
    <section class="mb-10">
      <span class="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
        <Icon name="file-text" class="h-3.5 w-3.5" /> {{ tr('เอกสารสำหรับทีม', 'Team Docs') }}
      </span>
      <h1 class="mt-4 font-heading text-3xl font-extrabold leading-[1.3] tracking-tight text-ink lg:text-4xl">
        {{ tr('เอกสารอ้างอิง & เทมเพลต', 'Reference docs & templates') }}
      </h1>
      <p class="mt-3 max-w-2xl text-sm leading-relaxed text-muted lg:text-base">
        {{ tr('เอกสารสเปกและเทมเพลตสำหรับทีม/ลูกค้าตรวจสอบยืนยัน — ไม่ใช่หน้าใช้งานจริงของครีเอเตอร์', 'Spec documents and templates for the team/client to review and confirm — not creator-facing app screens.') }}
      </p>
    </section>

    <section class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="d in docs"
        :key="d.to"
        :to="d.to"
        class="group flex flex-col gap-3 rounded-xl border border-[#0F2747]/10 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-30px_rgb(45_91_255_/_40%)]"
      >
        <div class="flex items-center justify-between">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10"><Icon :name="d.icon" class="h-6 w-6 text-primary" /></div>
          <Icon name="arrow-up-right" class="h-4 w-4 text-[#5B6B82]/40 transition group-hover:text-primary" />
        </div>
        <div>
          <p class="font-heading text-base font-bold text-ink">{{ tr(d.title, d.titleEn) }}</p>
          <p class="mt-1.5 text-sm leading-relaxed text-muted">{{ tr(d.desc, d.descEn) }}</p>
        </div>
      </NuxtLink>
    </section>
  </div>
</template>
