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
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <div>
            <h1 class="text-3xl font-bold text-gray-900">ข้อกำหนดการใช้บริการ</h1>
            <p class="text-gray-500 mt-1 text-sm">อัปเดตล่าสุด: 1 มกราคม 2026 · อ่านประมาณ 5 นาที</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="py-12">
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
            มีคำถามเกี่ยวกับข้อกำหนดเหล่านี้? ติดต่อเราได้ที่
            <a href="mailto:legal@prakast.com" class="text-primary font-medium hover:underline">legal@prakast.com</a>
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
    title: 'การยอมรับข้อกำหนด',
    content: 'เมื่อคุณเข้าถึงและใช้ KOL Platform ("แพลตฟอร์ม") คุณยอมรับและตกลงที่จะปฏิบัติตามข้อกำหนดและเงื่อนไขของข้อตกลงนี้ หากคุณไม่เห็นด้วยกับข้อกำหนดเหล่านี้ กรุณาอย่าใช้แพลตฟอร์ม',
  },
  {
    num: '2',
    title: 'คำอธิบายบริการ',
    content: 'KOL Platform ให้บริการแพลตฟอร์มการตลาดอินฟลูเอนเซอร์ที่เชื่อมต่อครีเอเตอร์คอนเทนต์ (อินฟลูเอนเซอร์) กับแบรนด์สำหรับการทำแคมเปญร่วมกัน เราอำนวยความสะดวกในการค้นพบแคมเปญ การสมัคร การส่งเนื้อหา การตรวจสอบ และการประมวลผลการชำระเงิน',
  },
  {
    num: '3',
    title: 'บัญชีผู้ใช้',
    content: 'หากต้องการเข้าถึงฟีเจอร์บางอย่างของแพลตฟอร์ม คุณต้องลงทะเบียนบัญชี คุณมีหน้าที่รับผิดชอบในการรักษาความลับของข้อมูลบัญชีของคุณ และสำหรับกิจกรรมทั้งหมดที่เกิดขึ้นภายใต้บัญชีของคุณ คุณต้องให้ข้อมูลที่ถูกต้องและครบถ้วนในระหว่างการลงทะเบียน',
  },
  {
    num: '4',
    title: 'ข้อผูกพันของอินฟลูเอนเซอร์',
    content: 'อินฟลูเอนเซอร์ตกลงที่จะสร้างเนื้อหาที่สอดคล้องกับบรีฟของแคมเปญ แนวทางแพลตฟอร์ม และกฎหมายที่บังคับใช้ เนื้อหาต้องเป็นต้นฉบับ ไม่ละเมิดสิทธิ์ของบุคคลที่สาม และปฏิบัติตามข้อกำหนดการเปิดเผยโฆษณา เช่น #ad, #sponsored',
  },
  {
    num: '5',
    title: 'เงื่อนไขการชำระเงิน',
    content: 'การชำระเงินจะดำเนินการเมื่อแคมเปญเสร็จสิ้นและได้รับการอนุมัติจากแบรนด์ แพลตฟอร์มเรียกเก็บค่าธรรมเนียมบริการในแต่ละธุรกรรม จำนวนการถอนขั้นต่ำคือ ฿1,000 การชำระเงินจะโอนเข้าบัญชีธนาคารที่ลงทะเบียนไว้ภายใน 3-5 วันทำการ',
  },
  {
    num: '6',
    title: 'ทรัพย์สินทางปัญญา',
    content: 'เนื้อหาที่อินฟลูเอนเซอร์สร้างสำหรับแคมเปญจะมอบสิทธิ์ให้แบรนด์ที่เกี่ยวข้องในการใช้งาน แสดง และเผยแพร่เนื้อหาตามที่ระบุไว้ในข้อตกลงแคมเปญ อินฟลูเอนเซอร์ยังคงสิทธิ์ในทรัพย์สินทางปัญญาพื้นฐาน เว้นแต่จะตกลงกันเป็นอย่างอื่น',
  },
  {
    num: '7',
    title: 'กิจกรรมต้องห้าม',
    content: 'ผู้ใช้งานห้ามใช้แพลตฟอร์มเพื่อวัตถุประสงค์ที่ฉ้อโกง โพสต์ข้อมูลเท็จ คุกคามผู้ใช้รายอื่น ละเมิดกฎหมายที่บังคับใช้ หรือพยายามหลีกเลี่ยงค่าธรรมเนียมแพลตฟอร์มโดยทำธุรกรรมนอกแพลตฟอร์ม',
  },
  {
    num: '8',
    title: 'การยกเลิกบัญชี',
    content: 'เราขอสงวนสิทธิ์ในการระงับหรือยกเลิกบัญชีที่ละเมิดข้อกำหนดเหล่านี้ ผู้ใช้สามารถปิดบัญชีได้ตลอดเวลา ข้อผูกพันแคมเปญที่ค้างอยู่ต้องได้รับการปฏิบัติตามก่อนปิดบัญชี',
  },
  {
    num: '9',
    title: 'การจำกัดความรับผิด',
    content: 'KOL Platform ไม่รับผิดชอบต่อความเสียหายทางอ้อม อุบัติเหตุ หรือความเสียหายที่เป็นผลสืบเนื่องจากการใช้แพลตฟอร์ม ความรับผิดของเราจำกัดอยู่ที่จำนวนค่าธรรมเนียมที่คุณจ่ายในช่วง 12 เดือนก่อนการเรียกร้อง',
  },
  {
    num: '10',
    title: 'กฎหมายที่ใช้บังคับ',
    content: 'ข้อกำหนดเหล่านี้จะถูกควบคุมและตีความตามกฎหมายของประเทศไทย ข้อพิพาทใดๆ จะได้รับการแก้ไขในศาลของกรุงเทพมหานคร ประเทศไทย',
  },
]
</script>
