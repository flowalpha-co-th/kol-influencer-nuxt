<template>
  <div class="min-h-screen bg-gray-50 pt-20">
    <!-- Hero -->
    <section class="bg-white border-b border-gray-100 py-12">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <NuxtLink to="/register" class="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary mb-6 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          กลับไปสมัครสมาชิก
        </NuxtLink>
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">นโยบายความเป็นส่วนตัว</h1>
            <p class="text-gray-500 mt-1 text-sm">อัปเดตล่าสุด: 1 มกราคม 2026 · อ่านประมาณ 4 นาที</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Summary Banner -->
    <section class="py-6">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p class="text-sm text-blue-700">เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ ข้อมูลของคุณจะถูกใช้เพื่อให้บริการแพลตฟอร์มเท่านั้น และเราจะไม่ขายข้อมูลส่วนตัวของคุณให้กับบุคคลที่สาม</p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="pb-12">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div
          v-for="section in sections"
          :key="section.title"
          class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
        >
          <div class="flex items-center gap-3 px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <span class="w-7 h-7 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">
              {{ section.num }}
            </span>
            <h2 class="font-semibold text-gray-900">{{ section.title }}</h2>
          </div>
          <p class="px-6 py-4 text-gray-600 leading-relaxed text-sm">{{ section.content }}</p>
        </div>

        <!-- Contact -->
        <div class="bg-primary/5 rounded-xl border border-primary/10 p-6 flex items-start gap-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <p class="text-sm text-gray-600">
            มีคำถามเกี่ยวกับความเป็นส่วนตัว? ติดต่อเราได้ที่
            <a href="mailto:privacy@prakit.com" class="text-primary font-medium hover:underline">privacy@prakit.com</a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const sections = [
  {
    num: '1',
    title: 'ข้อมูลที่เราเก็บรวบรวม',
    content: 'เราเก็บรวบรวมข้อมูลที่คุณให้โดยตรง ได้แก่ ชื่อ อีเมล เบอร์โทรศัพท์ บัญชีโซเชียลมีเดีย รายละเอียดบัญชีธนาคาร และเอกสารยืนยันตัวตน นอกจากนี้เรายังเก็บข้อมูลการใช้งาน ที่อยู่ IP และข้อมูลอุปกรณ์โดยอัตโนมัติเมื่อคุณใช้แพลตฟอร์ม',
  },
  {
    num: '2',
    title: 'วิธีที่เราใช้ข้อมูลของคุณ',
    content: 'เราใช้ข้อมูลของคุณเพื่อให้บริการและปรับปรุงบริการ ประมวลผลการชำระเงิน ยืนยันตัวตน จับคู่อินฟลูเอนเซอร์กับแคมเปญ สื่อสารกับคุณเกี่ยวกับบัญชีของคุณ ส่งการแจ้งเตือนที่เกี่ยวข้อง และปฏิบัติตามข้อกำหนดทางกฎหมาย',
  },
  {
    num: '3',
    title: 'การแบ่งปันข้อมูล',
    content: 'เราแบ่งปันข้อมูลโปรไฟล์ของคุณ (ชื่อ สถิติโซเชียล หมวดหมู่เนื้อหา) กับแบรนด์เมื่อคุณสมัครแคมเปญ เราไม่ขายข้อมูลส่วนตัวของคุณให้กับบุคคลที่สาม เราอาจแบ่งปันข้อมูลกับผู้ให้บริการที่ช่วยดำเนินการแพลตฟอร์มภายใต้ข้อตกลงการรักษาความลับที่เข้มงวด',
  },
  {
    num: '4',
    title: 'ความปลอดภัยของข้อมูล',
    content: 'เราดำเนินการมาตรการความปลอดภัยตามมาตรฐานอุตสาหกรรม รวมถึงการเข้ารหัส เซิร์ฟเวอร์ที่ปลอดภัย และการตรวจสอบความปลอดภัยเป็นประจำเพื่อปกป้องข้อมูลส่วนตัวของคุณ อย่างไรก็ตาม ไม่มีวิธีการส่งข้อมูลผ่านอินเทอร์เน็ตใดที่ปลอดภัย 100%',
  },
  {
    num: '5',
    title: 'การเก็บรักษาข้อมูล',
    content: 'เราเก็บรักษาข้อมูลส่วนตัวของคุณตราบเท่าที่บัญชีของคุณยังใช้งานอยู่หรือตามที่จำเป็นในการให้บริการ บันทึกทางการเงินจะถูกเก็บรักษาไว้ 7 ปีตามที่กฎหมายไทยกำหนด คุณสามารถขอลบข้อมูลของคุณได้ โดยขึ้นอยู่กับข้อกำหนดการเก็บรักษาตามกฎหมาย',
  },
  {
    num: '6',
    title: 'สิทธิ์ของคุณ',
    content: 'คุณมีสิทธิ์เข้าถึง แก้ไข หรือลบข้อมูลส่วนตัวของคุณ คุณสามารถเลือกไม่รับการสื่อสารทางการตลาดได้ตลอดเวลา หากต้องการใช้สิทธิ์เหล่านี้ โปรดติดต่อทีมความเป็นส่วนตัวของเรา เราจะตอบกลับคำขอของคุณภายใน 30 วัน',
  },
  {
    num: '7',
    title: 'คุกกี้',
    content: 'เราใช้คุกกี้และเทคโนโลยีติดตามที่คล้ายกันเพื่อเพิ่มประสบการณ์ของคุณ วิเคราะห์รูปแบบการใช้งาน และนำเสนอเนื้อหาที่เกี่ยวข้อง คุณสามารถควบคุมการตั้งค่าคุกกี้ผ่านการตั้งค่าเบราว์เซอร์หรือศูนย์ความต้องการคุกกี้ของเรา',
  },
  {
    num: '8',
    title: 'การเปลี่ยนแปลงนโยบายนี้',
    content: 'เราอาจอัปเดตนโยบายความเป็นส่วนตัวนี้เป็นครั้งคราว เราจะแจ้งให้คุณทราบถึงการเปลี่ยนแปลงที่สำคัญผ่านทางอีเมลหรือประกาศที่โดดเด่นบนแพลตฟอร์ม การใช้แพลตฟอร์มต่อไปหลังจากการเปลี่ยนแปลงถือเป็นการยอมรับนโยบายใหม่',
  },
]
</script>
