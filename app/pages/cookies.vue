<script setup lang="ts">
const { tr } = useLocale()
definePageMeta({ layout: 'default' })
useHead(() => ({ title: tr('นโยบายคุกกี้ — Ripples', 'Cookie Policy — Ripples') }))

type Section = { title: string; titleEn: string; body: string; bodyEn: string }
const sections: Section[] = [
  ['คุกกี้คืออะไร?', 'What Are Cookies?', 'คุกกี้คือไฟล์ข้อความขนาดเล็กที่ถูกวางบนอุปกรณ์ของคุณเมื่อคุณเข้าชมเว็บไซต์ ช่วยให้เว็บไซต์จดจำการตั้งค่า คงการ login และเข้าใจวิธีที่คุณใช้ไซต์ เราใช้คุกกี้และเทคโนโลยีที่คล้ายกัน เช่น local storage และ session storage', 'Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how you use the site. We use cookies and similar technologies like local storage and session storage.'],
  ['วิธีที่เราใช้คุกกี้', 'How We Use Cookies', 'เราใช้คุกกี้เพื่อคงการ login ในบัญชีของคุณ จดจำการตั้งค่าภาษา วิเคราะห์การใช้งานเพื่อปรับปรุงแพลตฟอร์ม วัดประสิทธิภาพของแคมเปญ และให้เนื้อหาและคำแนะนำที่ตรงกับคุณ', 'We use cookies to keep you logged in to your account, remember your language preference, analyze how you use the Platform to improve it, measure the effectiveness of our campaigns, and provide personalized content and recommendations.'],
  ['การจัดการคุกกี้', 'Managing Cookies', 'คุณสามารถควบคุมคุกกี้ผ่านการตั้งค่าเบราว์เซอร์ การปิดคุกกี้บางประเภทอาจส่งผลต่อฟังก์ชันของแพลตฟอร์ม คุกกี้ที่จำเป็นไม่สามารถปิดได้เนื่องจากจำเป็นสำหรับการทำงานของแพลตฟอร์ม', 'You can control cookies through your browser settings. Disabling certain cookies may affect Platform functionality. Essential cookies cannot be disabled as they are required for the Platform to function properly.'],
  ['คุกกี้ของบุคคลที่สาม', 'Third-Party Cookies', 'คุกกี้บางประเภทถูกวางโดยบริการของบุคคลที่สามที่ปรากฏในหน้าของเรา เช่น ผู้ให้บริการ analytics และแพลตฟอร์มโซเชียล ซึ่งจะอยู่ภายใต้นโยบายความเป็นส่วนตัวของบุคคลที่สามนั้นๆ', "Some cookies are placed by third-party services that appear on our pages, such as analytics providers and social media platforms. These are governed by the respective third parties' privacy policies."],
].map(([title, titleEn, body, bodyEn]) => ({ title: title!, titleEn: titleEn!, body: body!, bodyEn: bodyEn! }))

type CookieType = { name: string; nameEn: string; desc: string; descEn: string; badge: string; badgeEn: string; required: boolean }
const types: CookieType[] = [
  ['คุกกี้ที่จำเป็น', 'Essential Cookies', 'จำเป็นสำหรับการทำงานพื้นฐานของแพลตฟอร์ม เช่น การยืนยันตัวตน การจัดการ session และระบบความปลอดภัย ไม่สามารถปิดได้', 'Required for basic Platform functionality including authentication, session management, and security features. Cannot be disabled.', 'จำเป็น', 'Required', true],
  ['คุกกี้ความต้องการ', 'Preference Cookies', 'จดจำการตั้งค่าและความต้องการของคุณ เช่น ภาษา เพื่อให้ไม่ต้องกรอกใหม่ทุกครั้งที่เข้าชม', "Remember your settings and preferences such as language selection, so you don't have to re-enter them each visit.", 'ทางเลือก', 'Optional', false],
  ['คุกกี้วิเคราะห์', 'Analytics Cookies', 'ช่วยให้เราเข้าใจวิธีที่ผู้เข้าชมใช้แพลตฟอร์มโดยเก็บสถิติแบบไม่ระบุตัวตนเพื่อปรับปรุงบริการ', 'Help us understand how visitors interact with the Platform by collecting anonymous usage statistics to improve our services.', 'ทางเลือก', 'Optional', false],
  ['คุกกี้การตลาด', 'Marketing Cookies', 'ใช้ติดตามผู้เข้าชมข้ามเว็บไซต์เพื่อแสดงโฆษณาที่ตรงกับความสนใจของคุณ', 'Used to track visitors across websites to display relevant and engaging advertisements based on your interests.', 'ทางเลือก', 'Optional', false],
].map(([name, nameEn, desc, descEn, badge, badgeEn, required]) => ({ name, nameEn, desc, descEn, badge, badgeEn, required } as CookieType))
</script>

<template>
  <div>
    <section class="mb-10 border-b border-[#0F2747]/10 pb-8">
      <span class="inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
        <Icon name="cookie" class="h-3.5 w-3.5" /> {{ tr('ทางกฎหมาย', 'Legal') }}
      </span>
      <h1 class="mt-4 font-heading text-3xl font-extrabold leading-[1.3] tracking-tight text-ink lg:text-5xl">{{ tr('นโยบายคุกกี้', 'Cookie Policy') }}</h1>
      <p class="mt-3 text-sm text-muted">{{ tr('อัปเดตล่าสุด: 1 มกราคม 2026', 'Last updated: January 1, 2026') }}</p>
    </section>

    <article class="mx-auto max-w-3xl space-y-8">
      <section v-for="(s, i) in sections" :key="i">
        <h2 class="flex items-baseline gap-3 font-heading text-xl font-bold text-ink"><span class="text-primary">{{ i + 1 }}.</span> {{ tr(s.title, s.titleEn) }}</h2>
        <p class="mt-3 text-sm leading-[1.9] text-muted">{{ tr(s.body, s.bodyEn) }}</p>
      </section>
    </article>

    <section class="mx-auto mt-12 max-w-3xl">
      <h2 class="font-heading text-2xl font-extrabold tracking-tight text-ink">{{ tr('ประเภทคุกกี้ที่เราใช้', 'Types of Cookies We Use') }}</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div v-for="t in types" :key="t.name" class="rounded-xl border border-[#0F2747]/10 bg-white p-6 shadow-sm">
          <div class="flex items-center justify-between">
            <h3 class="font-heading text-base font-bold text-ink">{{ tr(t.name, t.nameEn) }}</h3>
            <span :class="['rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide', t.required ? 'bg-primary text-white' : 'border border-[#0F2747]/15 bg-surface text-muted']">{{ tr(t.badge, t.badgeEn) }}</span>
          </div>
          <p class="mt-3 text-sm leading-relaxed text-muted">{{ tr(t.desc, t.descEn) }}</p>
        </div>
      </div>
    </section>

    <section class="mx-auto mt-12 max-w-3xl rounded-xl border border-[#0F2747]/10 bg-white p-7 shadow-sm">
      <p class="text-sm text-muted">{{ tr('สำหรับคำถามเกี่ยวกับคุกกี้ ติดต่อเราได้ที่', 'For cookie-related questions, contact us at') }} <NuxtLink to="/contact" class="font-semibold text-primary">{{ tr('ติดต่อเรา', 'Contact us') }}</NuxtLink></p>
    </section>
  </div>
</template>
