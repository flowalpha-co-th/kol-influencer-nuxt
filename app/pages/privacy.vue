<script setup lang="ts">
const { tr } = useLocale()
definePageMeta({ layout: 'default' })
useHead(() => ({ title: tr('นโยบายความเป็นส่วนตัว — Ripples', 'Privacy Policy — Ripples') }))

type Section = { title: string; titleEn: string; body: string; bodyEn: string }
const sections: Section[] = [
  ['บทนำ', 'Introduction', 'บริษัท ประกิต โฮลดิ้งส์ จำกัด (มหาชน) ("บริษัท") ได้พัฒนาแพลตฟอร์ม Ripples ("แพลตฟอร์ม") เพื่อทำหน้าที่เป็นสื่อกลางในการเชื่อมต่อระหว่าง Creator และแบรนด์ (รวมเรียกว่า "ผู้ใช้บริการ") ให้มีประสิทธิภาพมากที่สุด โปรดศึกษานโยบายความเป็นส่วนตัวฉบับนี้โดยละเอียดก่อนการใช้งาน เมื่อผู้ใช้บริการกด "ยอมรับ" ก่อนเริ่มใช้บริการ ถือว่าได้ยินยอมและยอมรับนโยบายฉบับนี้โดยสมบูรณ์', 'PRAKIT HOLDINGS PUBLIC COMPANY LIMITED ("Company") developed the Ripples platform ("Platform") to serve as a marketplace connecting Creators and Brands (collectively, "Users") as efficiently as possible. Please read this Privacy Policy carefully before using the Platform. By clicking "Accept" before using our service, the User is deemed to have fully consented to and accepted this Policy.'],
  ['จุดประสงค์ของการเก็บข้อมูล', 'Purpose of Data Collection', 'บริษัทจำเป็นต้องเก็บรวบรวมข้อมูลส่วนบุคคลของผู้ใช้บริการและยืนยันว่าจะไม่เปิดเผยข้อมูลโดยไม่ได้รับความยินยอมล่วงหน้า เพื่อวัตถุประสงค์: เพื่อพัฒนาระบบและยกระดับประสบการณ์การใช้งาน; เพื่อระบุตัวตนของผู้ใช้บริการและใช้ในการติดต่อประสานงาน; เพื่อป้องกันการแอบอ้างจากบุคคลที่ไม่ได้รับอนุญาต; เพื่อปฏิบัติตามข้อกำหนดทางกฎหมายที่เกี่ยวข้อง', 'The Company collects Users’ personal data and affirms that it will not disclose such data without prior consent, for the following purposes: to develop the system and improve the service experience for both Creators and Brands; to verify the identity of Users and to facilitate communication between the Company, Users, and other related parties involved in providing services; to prevent unauthorized access by persons not authorized by the Company; to comply with applicable legal requirements.'],
  ['รายการข้อมูลที่ถูกจัดเก็บ', 'Data Collected and How We Manage It', 'ข้อมูลที่บริษัทจัดเก็บประกอบด้วย: ข้อมูลส่วนบุคคลของ Creator ได้แก่ ชื่อ-นามสกุล อีเมล เบอร์โทรศัพท์ วันเกิด เพศ จังหวัดที่อาศัย อาชีพ ความถนัดและความสนใจ; ข้อมูลและบัญชีโซเชียลมีเดีย เช่น Facebook, Instagram, TikTok, Twitter รวมถึงสถิติ engagement; ข้อมูลของแบรนด์สำหรับการสร้างบัญชี รวมถึงที่อยู่กิจการและรายละเอียดสินค้า/บริการ; ข้อมูลที่จัดเก็บโดยอัตโนมัติผ่านระบบคุกกี้ (Cookies)', 'The data we collect includes: Creator personal data required for registration, including first and last name, email, phone number, date of birth, gender, city of residence, occupation, skills, and interests; Creator social media account data such as Facebook, Instagram, TikTok, and Twitter, including profile information, analytics, engagement statistics, and other data appearing in such accounts; if another person submits data or connects through the same social media account as a Creator, the Company will treat that person as the Creator’s representative or the same person—please manage access to your own social accounts accordingly; Brand account data used to register and communicate with Creators and the Company, including business address and product/service details; data automatically collected via cookies stored on the User’s device to manage services. If the Company or a Brand wishes to use or disclose any data to third parties, the User will be notified and consent obtained each time.'],
  ['การจัดเก็บและรักษาข้อมูล', 'Data Retention', 'บริษัทจะเก็บรักษาข้อมูลส่วนบุคคลของผู้ใช้บริการตลอดระยะเวลาที่ผู้ใช้บริการยังคงใช้บริการแพลตฟอร์ม บันทึกทางการเงินและภาษีจะถูกเก็บรักษาไว้ไม่น้อยกว่า 7 ปีตามที่กฎหมายไทยกำหนด หากผู้ใช้บริการลบข้อมูลหรือขอยกเลิกการลงทะเบียน ข้อมูลจะถูกลบออกจากแพลตฟอร์มและบริษัทไม่สามารถกู้คืนข้อมูลดังกล่าวกลับมาได้', 'The Company retains personal data for as long as the User continues to use the Platform. Financial and tax records are retained for no less than 7 years as required by Thai law. If the User deletes their data or cancels registration, the data will be removed from the Platform and the Company cannot recover it.'],
  ['การเข้าถึงข้อมูลและความปลอดภัย', 'Access & Security', '5.1 ผู้มีสิทธิ์เข้าถึงข้อมูล ได้แก่: ตัวผู้ใช้บริการเอง; แบรนด์ที่ใช้ข้อมูลประกอบการตัดสินใจเลือก Creator; บุคคลหรือบริษัทภายนอกตามที่ผู้ใช้บริการได้ให้ความยินยอมไว้  5.2 บริษัทให้ความสำคัญกับความปลอดภัยของข้อมูล โดยจำกัดสิทธิ์การเข้าถึงฐานข้อมูลและเซิร์ฟเวอร์ มีการสำรองข้อมูลผ่านบริการคลาวด์ที่เชื่อถือได้ และตรวจสอบความปลอดภัยอย่างสม่ำเสมอ', '5.1 Besides the Company, parties authorized to access User data include: the User themselves, who is responsible for keeping personal data accurate and up to date; Brands, which may be individuals or entities owning products or services registered on the Platform, using the data to help select Creators suitable for their campaigns; external individuals or companies that wish to market to Users where the User has consented to such disclosure. If the Company wishes to disclose personal data to any party outside this scope, it will notify and obtain consent before doing so.  5.2 The Company prioritizes data security by restricting access to databases and servers, backing up User personal data with trusted cloud services, and conducting regular security audits. Users are nonetheless advised to take care when accessing the Platform by avoiding public networks in order to prevent potential harm.'],
  ['ข้อจำกัดความรับผิด', 'Limitation of Liability', 'บริษัทจำกัดความรับผิดเฉพาะกรณีที่เกิดความเสียหายจากความประมาทของบริษัทที่ส่งผลต่อการรั่วไหลของข้อมูลส่วนบุคคลสู่สาธารณะหรือบุคคลภายนอก โดยบริษัทจะพิจารณาชดเชยค่าเสียหายตามสมควร ทั้งนี้ บริษัทไม่รับผิดชอบต่อข้อมูลหรือเนื้อหาที่อยู่นอกเหนือขอบเขตการให้บริการของแพลตฟอร์ม', 'The Company’s liability is limited to damage caused by the Company’s negligence resulting in disclosure of User personal data to the public or third parties, where such disclosure causes harm to the User. In such cases the Company will assess reasonable compensation. The Company is not responsible for data or content outside the scope of the Platform services, or for issues arising from third parties, whether or not they acted through the Platform.'],
  ['การเปลี่ยนแปลงนโยบาย', 'Changes to This Policy', 'บริษัทสงวนสิทธิ์ในการแก้ไขนโยบายความเป็นส่วนตัวให้มีความถูกต้อง สอดคล้องกับหลักกฎหมาย และเป็นปัจจุบันอยู่เสมอ นโยบายฉบับแก้ไขจะมีผลบังคับใช้ทันทีหลังประกาศบนแพลตฟอร์ม ผู้ใช้บริการควรตรวจสอบนโยบายอยู่สม่ำเสมอเพื่อเข้าใจข้อกำหนดล่าสุดของบริษัท', 'The Company reserves the right to amend this Privacy Policy to keep it accurate, legally compliant, and current, so that services remain effective and secure. Amendments take effect upon publication on the Platform. The Company will notify Users in advance before the changes take effect. Users should review this policy regularly to understand the Company’s latest requirements.'],
  ['ช่องทางการติดต่อ', 'Contact', 'หากผู้ใช้บริการมีข้อสงสัยหรือคำถามเกี่ยวกับนโยบายความเป็นส่วนตัวฉบับนี้ สามารถติดต่อบริษัทได้ที่ privacy@ripples.com หรือทางไปรษณีย์ที่ บริษัท ประกิต โฮลดิ้งส์ จำกัด (มหาชน) เลขที่ 88 ซอยสุขุมวิท 62 แยก 3 แขวงพระโขนงใต้ เขตพระโขนง กรุงเทพมหานคร 10260', 'If the User has any questions or inquiries about this Privacy Policy, please contact the Company at privacy@ripples.com or by post at PRAKIT HOLDINGS PUBLIC COMPANY LIMITED, 88 Soi Sukhumvit 62 Yaek 3, Phra Khanong Tai, Phra Khanong, Bangkok 10260.'],
].map(([title, titleEn, body, bodyEn]) => ({ title: title!, titleEn: titleEn!, body: body!, bodyEn: bodyEn! }))
</script>

<template>
  <div>
    <section class="mb-8 border-b border-[#0F2747]/10 pb-8">
      <NuxtLink to="/register" class="flex w-fit items-center gap-1.5 text-sm font-semibold text-primary"><Icon name="arrow-left" class="h-4 w-4" /> {{ tr('กลับไปสมัครสมาชิก', 'Back to registration') }}</NuxtLink>
      <span class="mt-6 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary">
        <Icon name="shield" class="h-3.5 w-3.5" /> {{ tr('ทางกฎหมาย', 'Legal') }}
      </span>
      <h1 class="mt-4 font-heading text-3xl font-extrabold leading-[1.3] tracking-tight text-ink lg:text-5xl">{{ tr('นโยบายความเป็นส่วนตัว', 'Privacy Policy') }}</h1>
      <p class="mt-3 text-sm text-muted">{{ tr('อัปเดตล่าสุด: 1 มกราคม 2026 · อ่านประมาณ 6 นาที', 'Last updated: January 1, 2026 · 6 min read') }}</p>
    </section>

    <div class="mb-10 flex items-start gap-4 rounded-xl border border-primary/20 bg-primary/5 p-6">
      <Icon name="lock" class="mt-0.5 h-6 w-6 shrink-0 text-primary" />
      <p class="text-sm leading-relaxed text-ink">{{ tr('เราให้ความสำคัญกับความเป็นส่วนตัวของคุณ ข้อมูลของคุณจะถูกใช้เพื่อให้บริการแพลตฟอร์มเท่านั้น และเราจะไม่ขายข้อมูลส่วนบุคคลของคุณให้กับบุคคลที่สาม', 'We take your privacy seriously. Your data is used solely to provide the Platform and we do not sell your personal information to third parties.') }}</p>
    </div>

    <div class="grid gap-10 lg:grid-cols-4">
      <aside class="lg:col-span-1">
        <nav class="lg:sticky lg:top-6">
          <p class="mb-3 text-[11px] font-bold uppercase tracking-widest text-[#5B6B82]/60">{{ tr('สารบัญ', 'Contents') }}</p>
          <ol class="space-y-1.5 text-sm">
            <li v-for="(s, i) in sections" :key="i">
              <a :href="`#s${i + 1}`" class="text-muted transition hover:text-primary">{{ i + 1 }}. {{ tr(s.title, s.titleEn) }}</a>
            </li>
          </ol>
        </nav>
      </aside>
      <article class="space-y-8 lg:col-span-3">
        <section v-for="(s, i) in sections" :id="`s${i + 1}`" :key="i" class="scroll-mt-6">
          <h2 class="flex items-baseline gap-3 font-heading text-xl font-bold text-ink"><span class="text-primary">{{ i + 1 }}.</span> {{ tr(s.title, s.titleEn) }}</h2>
          <p class="mt-3 text-sm leading-[1.9] text-muted">{{ tr(s.body, s.bodyEn) }}</p>
        </section>
      </article>
    </div>

    <section class="mt-12 rounded-xl border border-[#0F2747]/10 bg-white p-7 shadow-sm">
      <p class="text-sm text-muted">{{ tr('มีคำถามเกี่ยวกับนโยบายฉบับนี้? ติดต่อเราได้ที่', 'Questions about this policy? Reach us at') }} <a href="mailto:privacy@ripples.com" class="font-semibold text-primary">privacy@ripples.com</a></p>
      <div class="mt-4 border-t border-[#0F2747]/10 pt-4 text-xs leading-relaxed text-[#5B6B82]/80">
        <p class="font-semibold text-ink">{{ tr('ผู้ควบคุมข้อมูล: บริษัท ประกิต โฮลดิ้งส์ จำกัด (มหาชน)', 'Data Controller: PRAKIT HOLDINGS PUBLIC COMPANY LIMITED') }}</p>
        <p>{{ tr('88 ซอยสุขุมวิท 62 แยก 3 แขวงพระโขนงใต้ เขตพระโขนง กรุงเทพมหานคร 10260', '88 Soi Sukhumvit 62 Yaek 3, Phra Khanong Tai, Phra Khanong, Bangkok 10260') }}</p>
      </div>
    </section>
  </div>
</template>
