<script setup lang="ts">
import { notifMatrix, notifCats } from '~/data/notifications'
import type { NotifCategory } from '~/data/notifications'

definePageMeta({ layout: 'docs' })
useHead(() => ({ title: 'Notification Spec — Ripples' }))

const catKeys = Object.keys(notifMatrix) as NotifCategory[]

interface DeliverableItem {
  n: string
  text: string
  to?: string
  linkLabel?: string
}

const deliverables: DeliverableItem[] = [
  { n: '1.', text: 'Notification matrix (ตารางด้านล่าง)' },
  { n: '2.', text: 'Notification Center — ', to: '/portal/notifications', linkLabel: 'notifications.html' },
  { n: '3.', text: 'กระดิ่ง + badge + dropdown (ทุกหน้า portal)' },
  { n: '4.', text: 'Notification Settings — ', to: '/portal/notification-settings', linkLabel: 'notification-settings.html' },
  { n: '5.', text: 'Email templates — ', to: '/docs/email-templates', linkLabel: 'email-templates.html' },
  { n: '6.', text: 'กติกากันสแปม (ด้านล่าง)' },
]

const antiSpamRules: string[] = [
  '<b class="text-ink">รวมเป็น digest</b> — แคมเปญแนะนำ/ตรง niche รวมส่งเป็นอีเมลสรุปสัปดาห์ละครั้ง ไม่ส่งทีละแคมเปญ',
  '<b class="text-ink">รวมเหตุการณ์ใกล้กัน</b> — เหตุการณ์ประเภทเดียวกันที่เกิดในช่วงสั้น ๆ (เช่นหลายคอมเมนต์) รวมเป็นอีเมลฉบับเดียว',
  '<b class="text-ink">ไม่ส่งซ้ำ</b> — เหตุการณ์เดิม (เช่นเตือน deadline) ส่งครั้งเดียวต่อรอบ เว้นเหตุการณ์เปลี่ยนสถานะ',
  '<b class="text-ink">ในเว็บไม่จำกัด</b> — Notification Center แสดงทุกเหตุการณ์ตามจริง (กันสแปมใช้กับ "อีเมล" เป็นหลัก)',
  '<b class="text-ink">ความปลอดภัย/การเงิน ไม่เข้า digest</b> — ส่งทันทีและบังคับเสมอ เพราะกระทบบัญชี/เงินโดยตรง',
  '<b class="text-ink">เคารพการตั้งค่า</b> — หมวดที่ KOL ปิดอีเมลไว้ จะไม่ส่งอีเมล (ยกเว้นหมวดบังคับ) แต่ยังเห็นในเว็บ',
]

const centerFeatures: string[] = [
  'ไทมไลน์รวมเรียงใหม่→เก่า + แยกกลุ่ม วันนี้/เมื่อวาน/ก่อนหน้า',
  'ตัวกรองตามหมวด (พร้อมจำนวนต่อหมวด)',
  'read / unread (จุดสี) · กดรายการ = อ่าน + ไปหน้าปลายทาง',
  '“อ่านทั้งหมด” · empty state เมื่อไม่มีรายการ',
  'สลับความหนาแน่นการ์ด แน่น/โปร่ง (จำค่าไว้)',
  'กระดิ่ง dropdown แสดง 5 ล่าสุด + “ดูทั้งหมด”',
]
</script>

<template>
  <div class="mx-auto max-w-4xl rounded-2xl border border-[#0F2747]/10 bg-white p-6 shadow-[0_30px_80px_-50px_rgba(15,39,71,.5)] sm:p-8 lg:p-12">
    <header class="border-b border-[#0F2747]/10 pb-6">
      <div class="flex items-center justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.25em] text-primary">Design Spec · Notifications</p>
          <h1 class="mt-2 font-heading text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">ระบบการแจ้งเตือน (KOL)</h1>
          <p class="mt-2 max-w-xl text-sm leading-relaxed text-muted">Notification matrix · ช่องทาง · ลิงก์ปลายทาง · อีเมลบังคับ · กติกากันสแปม</p>
        </div>
        <img src="/ripples-logo.png" alt="Ripples" class="h-16 shrink-0" />
      </div>
      <div class="mt-5 flex flex-wrap items-center gap-3 text-[11px]">
        <span class="rounded-md bg-surface px-2 py-1"><b class="text-ink">ในเว็บ</b> = Notification Center + กระดิ่ง</span>
        <span class="rounded-md bg-surface px-2 py-1"><b class="text-ink">อีเมล</b> = ส่งเข้าอีเมล</span>
        <span class="must">บังคับ</span><span class="text-muted">= ปิดไม่ได้ (ความปลอดภัย/การเงิน)</span>
        <div class="ml-auto flex gap-2">
          <NuxtLink to="/portal/notifications" class="rounded-md bg-primary px-3 py-1 font-bold text-white">Notification Center →</NuxtLink>
          <NuxtLink to="/docs/email-templates" class="rounded-md border border-primary/30 px-3 py-1 font-bold text-primary">Email →</NuxtLink>
        </div>
      </div>
    </header>

    <!-- deliverables -->
    <section class="mt-8">
      <h2 class="font-heading text-lg font-extrabold text-ink">สิ่งที่ส่งมอบ</h2>
      <ol class="mt-3 grid gap-2 text-sm sm:grid-cols-2">
        <li v-for="d in deliverables" :key="d.n" class="rounded-lg bg-surface p-3">
          <b>{{ d.n }}</b> {{ d.text }}<NuxtLink v-if="d.to" :to="d.to" class="font-bold text-primary">{{ d.linkLabel }}</NuxtLink>
        </li>
      </ol>
    </section>

    <!-- matrix -->
    <section class="mt-9">
      <h2 class="font-heading text-lg font-extrabold text-ink">Notification Matrix</h2>
      <template v-for="key in catKeys" :key="key">
        <h3 class="mt-7 flex items-center gap-2 font-heading text-base font-bold text-ink">
          {{ notifCats[key].label }}
          <span v-if="notifCats[key].locked" class="must">หมวดบังคับอีเมล</span>
        </h3>
        <table class="mt-2">
          <thead>
            <tr>
              <th style="width:34%">เหตุการณ์</th>
              <th style="width:22%">Trigger</th>
              <th class="ctr" style="width:9%">ในเว็บ</th>
              <th class="ctr" style="width:9%">อีเมล</th>
              <th class="ctr" style="width:10%">บังคับ</th>
              <th>ลิงก์ปลายทาง</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(e, i) in notifMatrix[key]" :key="i">
              <td>
                {{ e.event }}
                <template v-if="e.note"><br /><span style="color:#9aa6b5">{{ e.note }}</span></template>
              </td>
              <td>{{ e.trigger }}</td>
              <td class="ctr"><span v-if="e.web" class="yes">✓</span><span v-else class="no">–</span></td>
              <td class="ctr"><span v-if="e.email" class="yes">✓</span><span v-else class="no">–</span></td>
              <td class="ctr"><span v-if="e.mandatory" class="must">บังคับ</span><span v-else class="no">–</span></td>
              <td><code style="font-size:12px;color:#2D5BFF">{{ e.link }}</code></td>
            </tr>
          </tbody>
        </table>
      </template>
    </section>

    <!-- anti-spam -->
    <section class="mt-10 break-inside-avoid">
      <h2 class="font-heading text-lg font-extrabold text-ink">กติกากันสแปม (Anti-spam)</h2>
      <ul class="mt-3 space-y-2 text-sm text-muted">
        <li v-for="(rule, i) in antiSpamRules" :key="i" class="rounded-lg bg-surface p-3">• <span v-html="rule" /></li>
      </ul>
    </section>

    <!-- center features -->
    <section class="mt-10 break-inside-avoid">
      <h2 class="font-heading text-lg font-extrabold text-ink">Notification Center — พฤติกรรม</h2>
      <ul class="mt-3 grid gap-2 text-sm text-muted sm:grid-cols-2">
        <li v-for="(f, i) in centerFeatures" :key="i" class="rounded-lg bg-surface p-3">{{ f }}</li>
      </ul>
    </section>

    <footer class="mt-10 border-t border-[#0F2747]/10 pt-5 text-[11px] text-[#5B6B82]/60">
      Ripples · Notification System Spec · มุม KOL · ทุก noti มีลิงก์ปลายทาง · เรื่องเงิน + ความปลอดภัย = อีเมลบังคับ
    </footer>
  </div>
</template>

<style scoped>
th,
td {
  border: 1px solid #0f274722;
  padding: 8px 10px;
  vertical-align: top;
  text-align: left;
  font-size: 13px;
}
th {
  background: #f4f7fb;
  font-weight: 700;
  color: #0f2747;
}
td {
  color: #344256;
}
table {
  border-collapse: collapse;
  width: 100%;
}
.yes {
  color: #1f8a5b;
  font-weight: 700;
}
.no {
  color: #9aa6b5;
}
.must {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  background: #ffe4e6;
  color: #be123c;
  white-space: nowrap;
}
.ctr {
  text-align: center;
}
@media print {
  .noprint {
    display: none !important;
  }
}
</style>
