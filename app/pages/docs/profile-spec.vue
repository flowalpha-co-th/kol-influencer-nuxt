<script setup lang="ts">
definePageMeta({ layout: 'docs' })
useHead(() => ({ title: 'Profile Spec — Ripples' }))

type SrcKind = 'kol' | 'sync' | 'admin'

interface SrcBadge {
  kind: SrcKind
  label: string
}

/** A field row may carry one or more source badges, then free-form cells. */
interface FieldRow {
  field: string
  sources: SrcBadge[]
  cells: string[]
}

const legend: SrcBadge[] = [
  { kind: 'kol', label: 'KOL กรอกเอง' },
  { kind: 'sync', label: 'sync จาก API · อ่านอย่างเดียว' },
  { kind: 'admin', label: 'แอดมินตั้ง · อ่านอย่างเดียว' },
]

interface OverviewItem {
  num: string
  title: string
  desc: string
}

const overview: OverviewItem[] = [
  { num: '1.', title: 'ข้อมูลส่วนตัว', desc: 'พื้นฐาน + พื้นที่/อาชีพ + Niche + บัญชี&ความปลอดภัย + Consent' },
  { num: '2.', title: 'บัญชีโซเชียล', desc: 'เชื่อม OAuth, สถิติ sync (อ่านอย่างเดียว)' },
  { num: '3.', title: 'Rate Card (TIER 1)', desc: 'ราคาอ้างอิงต่อแพลตฟอร์ม + เงื่อนไขรับงาน' },
  { num: '4.', title: 'ยืนยันตัวตน / KYC', desc: 'Identity, ธนาคาร, ภาษี, เอกสาร' },
]

// TAB 1 — ข้อมูลส่วนตัว · cols: ประเภท · Validation · Note
const tab1: FieldRow[] = [
  { field: 'ชื่อจริง / นามสกุล', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['text', 'required · ตรงกับ KYC', 'ชื่อตามบัตรประชาชน'] },
  { field: 'ชื่อในวงการ (display_name)', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['text', 'required · 2–40 ตัว', 'ชื่อที่โชว์ในระบบ/ให้แอดมินเห็น แยกจากชื่อจริง'] },
  { field: 'อีเมล', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['email + verify', 'รูปแบบอีเมล · ต้องยืนยัน', 'ใช้ login + แจ้งเตือน · badge "ยืนยันแล้ว"'] },
  { field: 'เบอร์โทรศัพท์', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['tel + verify', 'ตัวเลข 10 หลัก · OTP', 'ปุ่ม "ส่งรหัสยืนยัน" เมื่อยังไม่ verified'] },
  { field: 'LINE ID', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['text', 'optional', 'ช่องทางติดต่อสำรอง'] },
  { field: 'เพศ (gender)', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['select', 'optional', 'หญิง/ชาย/ไม่ระบุ/อื่น ๆ'] },
  { field: 'ช่วงอายุ (age_range)', sources: [{ kind: 'sync', label: 'KYC' }], cells: ['select', 'auto จากวันเกิด', 'ดึงจากวันเกิดใน KYC เมื่อยืนยันแล้ว'] },
  { field: 'ที่อยู่ (ติดต่อ/จัดส่ง)', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['text', 'required เมื่อรับสินค้าตัวอย่าง', 'คนละช่องกับที่อยู่ทะเบียนบ้านใน KYC'] },
  { field: 'เกี่ยวกับฉัน (bio)', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['textarea', '≤ 300 ตัว', 'แนะนำตัว/สไตล์คอนเทนต์'] },
  { field: 'จังหวัด/พื้นที่หลัก', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['select', 'required', 'ที่อยู่อาศัยหลัก'] },
  { field: 'พื้นที่ทำคอนเทนต์ (coverage)', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['multi-chips', '≥ 1 ค่า', 'ใช้จับคู่แคมเปญที่ระบุพื้นที่'] },
  { field: 'อาชีพ (occupation)', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['text', 'optional', 'อาชีพหลัก'] },
  { field: 'หมวดหมู่ / Niche', sources: [{ kind: 'kol', label: 'KOL' }, { kind: 'admin', label: 'list' }], cells: ['multi-chips', '≥ 1 หมวด', 'ค่าตัวเลือกใช้ชุดเดียวกับฝั่งแอดมิน (sync)'] },
  { field: 'Consent: Terms / Privacy / PDPA', sources: [{ kind: 'sync', label: 'ระบบ' }], cells: ['read + re-accept', 'เก็บ version + วันที่', 'มี version ใหม่ → บังคับยอมรับผ่าน gate ทันทีหลัง login ก่อนใช้งาน + อัปเดตวันที่'] },
  { field: 'Marketing consent', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['toggle', '—', 'เปิด/ปิดได้ในหน้านี้ + บันทึกวันที่'] },
]

// TAB 2 — บัญชีโซเชียล · cols: ประเภท · Note
const tab2: FieldRow[] = [
  { field: 'โลโก้ + ชื่อแพลตฟอร์ม', sources: [{ kind: 'admin', label: 'ระบบ' }], cells: ['static', '—'] },
  { field: '@handle / ชื่อเพจ · profile_url', sources: [{ kind: 'sync', label: 'sync' }], cells: ['read-only', 'ได้จาก OAuth'] },
  { field: 'followers · ER%', sources: [{ kind: 'sync', label: 'sync' }], cells: ['read-only', 'TikTok/YT ไม่มี reach → ER คิดจากยอดวิว'] },
  { field: 'badge "ยืนยันแล้ว"', sources: [{ kind: 'sync', label: 'sync' }], cells: ['read-only', 'บัญชีผ่าน OAuth สำเร็จ'] },
  { field: 'last_synced_at', sources: [{ kind: 'sync', label: 'sync' }], cells: ['read-only', '"sync ล่าสุดเมื่อ…"'] },
  { field: 'demographic (กลุ่มผู้ติดตาม)', sources: [{ kind: 'sync', label: 'sync' }], cells: ['read-only', 'เพศ/อายุ/พื้นที่ ถ้ามี'] },
  { field: 'สถานะเชื่อมต่อ', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['action', 'เชื่อมแล้ว→"ยกเลิกเชื่อมต่อ" / ยังไม่เชื่อม→"เชื่อม OAuth"'] },
]

// TAB 3a — รูปแบบราคาต่อแพลตฟอร์ม
interface RateFormat {
  platform: string
  formats: string
  note?: string
}

const rateFormats: RateFormat[] = [
  { platform: 'Instagram', formats: 'โพสต์ · สตอรี่ · รีล · ไลฟ์' },
  { platform: 'TikTok', formats: 'วิดีโอ · ไลฟ์ ', note: '(ไม่ใช่ "รีล")' },
  { platform: 'Facebook', formats: 'โพสต์ · สตอรี่ · รีล · ไลฟ์' },
  { platform: 'YouTube', formats: 'วิดีโอ · Shorts · ไลฟ์' },
  { platform: 'X (Twitter)', formats: 'โพสต์' },
  { platform: 'Lemon8', formats: 'โพสต์ · วิดีโอ' },
]

// TAB 3b — fields · cols: Validation · Note
const tab3: FieldRow[] = [
  { field: 'ราคาต่อรูปแบบ', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['ตัวเลข ≥ 0 · ว่างได้', 'ว่าง = ไม่รับงานรูปแบบนั้น'] },
  { field: 'Usage rights / Exclusivity (วัน) / Turnaround (วัน)', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['ตัวเลขวัน ≥ 0', 'กล่อง "เงื่อนไขการรับงาน"'] },
  { field: 'แบรนด์ที่เคยร่วมงาน · รับงานโฆษณา (Yes/No)', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['optional', 'ออปชันเสริม'] },
]

// TAB 4 — KYC · cols: Validation · Note
const tab4: FieldRow[] = [
  { field: 'ชื่อ-นามสกุล ไทย / อังกฤษ', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['required', 'ตามบัตร/พาสปอร์ต'] },
  { field: 'เลขบัตรประชาชน', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['13 หลัก · checksum', 'ตรวจหลักสุดท้ายอัตโนมัติ'] },
  { field: 'วันเกิด', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['date · อายุ ≥ 15', 'ใช้คำนวณช่วงอายุ'] },
  { field: 'ที่อยู่ตามทะเบียนบ้าน', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['required', 'สำหรับเอกสารภาษี'] },
  { field: 'ธนาคาร / เลขบัญชี / ชื่อบัญชี', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['เลขบัญชี 10–12 หลัก · ชื่อตรงกับบัตร', 'สำหรับรับเงิน'] },
  { field: 'เลขผู้เสียภาษี', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['13 หลัก (บุคคล=เลขบัตร)', '—'] },
  { field: 'ประเภทผู้เสียภาษี · จด VAT', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['บุคคล/นิติบุคคล', 'นิติบุคคล → โชว์ ชื่อบริษัท, เลขสาขา, ที่อยู่จดทะเบียน, ประเภทธุรกิจ'] },
  { field: 'เอกสาร: บัตร (หน้า/หลัง), เซลฟี่คู่บัตร, หน้าสมุดบัญชี', sources: [{ kind: 'kol', label: 'KOL' }], cells: ['JPG/PNG/PDF ≤ 10MB', 'หน้า/หลังแยกไฟล์'] },
  { field: 'สถานะ KYC · เหตุผลปฏิเสธ', sources: [{ kind: 'admin', label: 'แอดมิน' }], cells: ['read-only', 'none / pending / approved / rejected (+reason)'] },
]

// STATES
interface StateRow {
  dim: string
  states: string
  behavior: string
}

const states: StateRow[] = [
  { dim: 'โหมดหน้า', states: 'อ่านอย่างเดียว ↔ แก้ไข', behavior: 'default = อ่าน · กด "แก้ไขโปรไฟล์" → input ปลดล็อก ปุ่มเปลี่ยนเป็น "บันทึก" (เขียว) · field ที่มาจาก sync/แอดมิน ล็อกเสมอ' },
  { dim: 'KYC', states: 'none / pending / approved / rejected', behavior: 'none→ฟอร์มแก้ได้ + ปุ่มส่ง · pending→ฟอร์ม read-only · approved→read-only + ปลดล็อก "พร้อมรับเงิน" · rejected→โชว์เหตุผล + แก้แล้วส่งใหม่ได้' },
  { dim: 'โซเชียล', states: 'มีบัญชี / ยังไม่เชื่อม (empty)', behavior: 'empty → empty-state พร้อมปุ่มเชื่อมแต่ละแพลตฟอร์ม' },
  { dim: 'Consent', states: 'เป็นปัจจุบัน / มีเวอร์ชันใหม่', behavior: 'มีเวอร์ชันใหม่ → แสดง consent gate แบบบล็อกทันทีหลัง login (ติ๊กยอมรับจึงกดปุ่มได้) · ไม่ยอมรับ = ใช้งานต่อไม่ได้ · มีแถบสรุปในแท็บข้อมูลส่วนตัวด้วย' },
]

// LOGIC cards
interface LogicCard {
  title: string
  body: string
}

const logicCards: LogicCard[] = [
  { title: 'พร้อมรับงาน', body: 'ข้อมูลส่วนตัวครบ และ เชื่อมโซเชียล ≥ 1 และ เลือก Niche ≥ 1 และ ตั้ง Rate Card ≥ 1 รายการ' },
  { title: 'พร้อมรับเงิน', body: 'KYC = approved (ผ่านการตรวจสอบเอกสาร + บัญชีธนาคาร + ข้อมูลภาษี)' },
]

// EDGE cases — markup keeps bold lead + trailing text
interface EdgeCase {
  lead: string
  rest: string
}

const edgeCases: EdgeCase[] = [
  { lead: 'ยังไม่เชื่อมโซเชียล', rest: ' → empty-state + ปุ่มเชื่อมแต่ละแพลตฟอร์ม · completeness ไม่ขึ้น "เชื่อมโซเชียล"' },
  { lead: 'ยังไม่ตั้ง Rate Card', rest: ' → ทุกช่องเป็น placeholder "ไม่รับงาน" · "พร้อมรับงาน" ยังไม่ติ๊ก' },
  { lead: 'KYC ถูกปฏิเสธ', rest: ' → แถบแดง + เหตุผล · ฟอร์มกลับมาแก้ได้ · ปุ่ม "แก้ไขแล้วส่งใหม่"' },
  { lead: 'มี Consent version ใหม่', rest: ' → แสดง consent gate แบบบล็อกทันทีหลัง login · ต้องติ๊กยอมรับก่อนจึงกดปุ่มได้ · มีปุ่ม "ออกจากระบบ" ถ้าไม่ยอมรับ' },
  { lead: 'TikTok / YouTube ไม่มี reach', rest: ' → แสดงเท่าที่มี + หมายเหตุ "ER คิดจากยอดวิว"' },
  { lead: 'เบอร์/อีเมลยังไม่ยืนยัน', rest: ' → badge เตือน + ปุ่มส่งรหัสยืนยัน · บล็อกการรับเงินถ้าจำเป็น' },
]

const deferred: string[] = [
  'Portfolio / ผลงานย้อนหลังแบบแกลเลอรี',
  'การตั้งค่าการแจ้งเตือนละเอียด (per-channel)',
  '2FA / ประวัติการเข้าสู่ระบบ',
  'เชื่อมหลายบัญชีต่อแพลตฟอร์ม (multi-account)',
  'ดาวน์โหลด media kit อัตโนมัติ',
]

const srcClass: Record<SrcKind, string> = {
  kol: 'src s-kol',
  sync: 'src s-sync',
  admin: 'src s-admin',
}
</script>

<template>
  <div class="mx-auto max-w-4xl rounded-2xl border border-[#0F2747]/10 bg-white p-6 shadow-[0_30px_80px_-50px_rgba(15,39,71,.5)] sm:p-8 lg:p-12">
    <!-- header -->
    <section class="mb-9 border-b border-[#0F2747]/10 pb-6">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.25em] text-primary">Design Spec · Influencer Portal</p>
          <h1 class="mt-2 font-heading text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">หน้าโปรไฟล์ (KOL)</h1>
          <p class="mt-2 max-w-xl text-sm leading-relaxed text-muted">Field inventory · validation · states · logic — มุม KOL ของตัวเองเท่านั้น ไม่มีข้อมูลภายในแอดมิน</p>
        </div>
        <img src="/ripples-logo.png" alt="Ripples" class="h-16 shrink-0" />
      </div>
      <div class="mt-5 flex flex-wrap items-center gap-2 text-[11px]">
        <span v-for="l in legend" :key="l.kind" :class="srcClass[l.kind]">{{ l.label }}</span>
        <NuxtLink to="/portal/profile" class="ml-auto inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1 font-bold text-white">
          เปิด prototype <Icon name="arrow-right" class="h-3.5 w-3.5" />
        </NuxtLink>
      </div>
    </section>

    <!-- 4 tabs / overview -->
    <section class="mt-8">
      <h2 class="font-heading text-xl font-extrabold text-ink">โครงหน้า — 4 แท็บ</h2>
      <ol class="mt-3 grid gap-2 sm:grid-cols-2">
        <li v-for="o in overview" :key="o.num" class="rounded-lg bg-surface p-3 text-sm"><b>{{ o.num }} {{ o.title }}</b> — {{ o.desc }}</li>
      </ol>
      <p class="mt-3 text-sm text-muted">ทั้งหน้ามี 2 โหมด: <b class="text-ink">อ่านอย่างเดียว</b> (default) ↔ <b class="text-ink">แก้ไข</b> (กด "แก้ไขโปรไฟล์"). Pricing 3 tier — หน้านี้ KOL ตั้งได้แค่ TIER 1; งบแคมเปญ (TIER 2) และราคาจริง (TIER 3 แอดมินเคาะ) ไม่อยู่ในหน้านี้.</p>
    </section>

    <!-- TAB 1 -->
    <section class="mt-9 break-inside-avoid">
      <h2 class="font-heading text-lg font-extrabold text-ink">แท็บ 1 — ข้อมูลส่วนตัว</h2>
      <table class="mt-3">
        <thead>
          <tr>
            <th style="width: 24%">Field</th>
            <th style="width: 12%">ที่มา</th>
            <th style="width: 18%">ประเภท</th>
            <th style="width: 23%">Validation</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in tab1" :key="r.field">
            <td>{{ r.field }}</td>
            <td>
              <span v-for="(s, i) in r.sources" :key="i" :class="srcClass[s.kind]">{{ s.label }}</span>
            </td>
            <td v-for="(c, ci) in r.cells" :key="ci">{{ c }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- TAB 2 -->
    <section class="mt-9 break-inside-avoid">
      <h2 class="font-heading text-lg font-extrabold text-ink">แท็บ 2 — บัญชีโซเชียล</h2>
      <p class="mt-2 text-sm text-muted">ต่อแพลตฟอร์ม: IG / TikTok / FB / YouTube / X / Lemon8. <b class="text-ink">handle / followers / ER มาจาก sync — KOL แก้ไม่ได้</b>.</p>
      <table class="mt-3">
        <thead>
          <tr>
            <th style="width: 26%">Field</th>
            <th style="width: 14%">ที่มา</th>
            <th style="width: 18%">ประเภท</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in tab2" :key="r.field">
            <td>{{ r.field }}</td>
            <td>
              <span v-for="(s, i) in r.sources" :key="i" :class="srcClass[s.kind]">{{ s.label }}</span>
            </td>
            <td v-for="(c, ci) in r.cells" :key="ci">{{ c }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- TAB 3 -->
    <section class="mt-9 break-inside-avoid">
      <h2 class="font-heading text-lg font-extrabold text-ink">แท็บ 3 — Rate Card (TIER 1)</h2>
      <p class="mt-2 text-sm text-muted">โชว์การ์ดราคาครบทุกแพลตฟอร์ม ชื่อช่องตรงกับแพลตฟอร์ม · ช่องว่าง = placeholder "ไม่รับงาน".</p>
      <table class="mt-3">
        <thead>
          <tr>
            <th style="width: 22%">แพลตฟอร์ม</th>
            <th>รูปแบบ (ช่องราคา บาท)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rateFormats" :key="r.platform">
            <td>{{ r.platform }}</td>
            <td>{{ r.formats }}<span v-if="r.note" class="text-muted">{{ r.note }}</span></td>
          </tr>
        </tbody>
      </table>
      <table class="mt-3">
        <thead>
          <tr>
            <th style="width: 24%">Field</th>
            <th style="width: 14%">ที่มา</th>
            <th style="width: 20%">Validation</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in tab3" :key="r.field">
            <td>{{ r.field }}</td>
            <td>
              <span v-for="(s, i) in r.sources" :key="i" :class="srcClass[s.kind]">{{ s.label }}</span>
            </td>
            <td v-for="(c, ci) in r.cells" :key="ci">{{ c }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- TAB 4 -->
    <section class="mt-9 break-inside-avoid">
      <h2 class="font-heading text-lg font-extrabold text-ink">แท็บ 4 — ยืนยันตัวตน / KYC</h2>
      <table class="mt-3">
        <thead>
          <tr>
            <th style="width: 28%">Field</th>
            <th style="width: 12%">ที่มา</th>
            <th style="width: 26%">Validation</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in tab4" :key="r.field">
            <td>{{ r.field }}</td>
            <td>
              <span v-for="(s, i) in r.sources" :key="i" :class="srcClass[s.kind]">{{ s.label }}</span>
            </td>
            <td v-for="(c, ci) in r.cells" :key="ci">{{ c }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- STATES -->
    <section class="mt-9 break-inside-avoid">
      <h2 class="font-heading text-lg font-extrabold text-ink">States ของหน้า</h2>
      <table class="mt-3">
        <thead>
          <tr>
            <th style="width: 22%">มิติ</th>
            <th style="width: 30%">สถานะ</th>
            <th>พฤติกรรม</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="s in states" :key="s.dim">
            <td>{{ s.dim }}</td>
            <td>{{ s.states }}</td>
            <td>{{ s.behavior }}</td>
          </tr>
        </tbody>
      </table>
      <p class="mt-3 text-xs text-muted">ใน prototype มีแถบ <b>"สำหรับรีวิว (ไม่ใช่ UI จริง)"</b> สำหรับสลับสถานะข้างต้นเพื่อตรวจงาน — ตัดออกก่อน production.</p>
    </section>

    <!-- LOGIC -->
    <section class="mt-9 break-inside-avoid">
      <h2 class="font-heading text-lg font-extrabold text-ink">Logic — "พร้อมรับงาน" / "พร้อมรับเงิน"</h2>
      <div class="mt-3 grid gap-3 sm:grid-cols-2">
        <div v-for="c in logicCards" :key="c.title" class="rounded-xl border border-[#0F2747]/10 bg-surface p-4">
          <p class="font-bold text-ink">{{ c.title }}</p>
          <p class="mt-1 text-sm text-muted">{{ c.body }}</p>
        </div>
      </div>
      <p class="mt-3 text-sm text-muted">Profile completeness % = สัดส่วน checklist ที่ทำครบ (ข้อมูลพื้นฐาน · Niche · โซเชียล · Rate Card · KYC) แสดงเป็นแถบบนสุดของหน้า</p>
    </section>

    <!-- EDGE -->
    <section class="mt-9 break-inside-avoid">
      <h2 class="font-heading text-lg font-extrabold text-ink">Empty / Edge cases</h2>
      <ul class="mt-3 space-y-2 text-sm text-muted">
        <li v-for="(e, i) in edgeCases" :key="i" class="rounded-lg bg-surface p-3">• <b class="text-ink">{{ e.lead }}</b>{{ e.rest }}</li>
      </ul>
    </section>

    <!-- DEFERRED -->
    <section class="mt-9 break-inside-avoid">
      <h2 class="font-heading text-lg font-extrabold text-ink">Deferred (นอกขอบเขตรอบนี้)</h2>
      <ul class="mt-3 space-y-1.5 text-sm text-muted">
        <li v-for="(d, i) in deferred" :key="i">• {{ d }}</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  border: 1px solid #0f274722;
  padding: 8px 10px;
  vertical-align: top;
  text-align: left;
}
th {
  background: #f4f7fb;
  font-weight: 700;
  color: #0f2747;
}
td {
  font-size: 13px;
  color: #344256;
}
.src {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 4px;
  white-space: nowrap;
}
.s-kol {
  background: #e8fff1;
  color: #1f8a5b;
}
.s-sync {
  background: #eaf1ff;
  color: #2d5bff;
}
.s-admin {
  background: #f2ebff;
  color: #6e4e9e;
}
</style>
