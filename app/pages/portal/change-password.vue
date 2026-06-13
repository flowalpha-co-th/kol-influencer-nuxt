<script setup lang="ts">
definePageMeta({ layout: 'portal', middleware: 'auth' })
const { tr } = useLocale()
useHead(() => ({ title: tr('เปลี่ยนรหัสผ่าน — Ripples', 'Change Password — Ripples') }))

const auth = useAuthStore()

const oldPw = ref('')
const newPw = ref('')
const confirmPw = ref('')

const showOld = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

const error = ref('')
const success = ref(false)

async function submit() {
  error.value = ''
  if (newPw.value.length < 8) {
    error.value = tr('รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร', 'New password must be at least 8 characters')
    return
  }
  if (newPw.value !== confirmPw.value) {
    error.value = tr('รหัสผ่านใหม่และการยืนยันไม่ตรงกัน', 'New password and confirmation do not match')
    return
  }
  await auth.changePassword(oldPw.value, newPw.value)
  success.value = true
  oldPw.value = ''
  newPw.value = ''
  confirmPw.value = ''
  showOld.value = false
  showNew.value = false
  showConfirm.value = false
}
</script>

<template>
  <main class="mx-auto max-w-2xl px-6 py-10 lg:px-12 lg:py-14">
    <section class="mb-8">
      <NuxtLink to="/portal/profile" class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
        <Icon name="arrow-left" class="h-4 w-4" /> {{ tr('กลับไปโปรไฟล์', 'Back to profile') }}
      </NuxtLink>
      <h1 class="mt-4 font-heading text-3xl font-extrabold tracking-tight text-ink lg:text-4xl">{{ tr('เปลี่ยนรหัสผ่าน', 'Change Password') }}</h1>
      <p class="mt-1 text-sm text-muted">{{ tr('อัปเดตรหัสผ่านของคุณเพื่อความปลอดภัย', 'Update your password to keep your account secure') }}</p>
    </section>

    <div class="rounded-xl border border-[#0F2747]/10 bg-white p-7 shadow-sm lg:p-8">
      <form class="space-y-5" novalidate @submit.prevent="submit">
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-ink">{{ tr('รหัสผ่านเดิม', 'Current password') }}</label>
          <div class="relative">
            <input
              v-model="oldPw"
              required
              :type="showOld ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-3 pr-11 text-sm outline-none transition focus:border-primary/50"
            />
            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6B82]/60 transition hover:text-ink" @click="showOld = !showOld">
              <Icon :name="showOld ? 'eye-off' : 'eye'" class="h-4 w-4" />
            </button>
          </div>
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-ink">{{ tr('รหัสผ่านใหม่', 'New password') }}</label>
          <div class="relative">
            <input
              v-model="newPw"
              required
              :type="showNew ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-3 pr-11 text-sm outline-none transition focus:border-primary/50"
            />
            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6B82]/60 transition hover:text-ink" @click="showNew = !showNew">
              <Icon :name="showNew ? 'eye-off' : 'eye'" class="h-4 w-4" />
            </button>
          </div>
          <p class="mt-1.5 text-xs text-[#5B6B82]/70">{{ tr('อย่างน้อย 8 ตัวอักษร ประกอบด้วยตัวอักษรและตัวเลข', 'At least 8 characters, including letters and numbers') }}</p>
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-ink">{{ tr('ยืนยันรหัสผ่านใหม่', 'Confirm new password') }}</label>
          <div class="relative">
            <input
              v-model="confirmPw"
              required
              :type="showConfirm ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-3 pr-11 text-sm outline-none transition focus:border-primary/50"
            />
            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6B82]/60 transition hover:text-ink" @click="showConfirm = !showConfirm">
              <Icon :name="showConfirm ? 'eye-off' : 'eye'" class="h-4 w-4" />
            </button>
          </div>
        </div>

        <p v-if="error" class="text-sm font-semibold text-red-600">{{ error }}</p>

        <div class="flex gap-3 pt-2">
          <button type="submit" class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgb(45_91_255_/_70%)] transition hover:bg-primaryDark active:translate-y-0.5">
            <Icon name="lock" class="h-4 w-4" /> {{ tr('เปลี่ยนรหัสผ่าน', 'Change Password') }}
          </button>
          <NuxtLink to="/portal/profile" class="inline-flex items-center rounded-lg border border-[#0F2747]/10 bg-white px-6 py-3 text-sm font-bold text-ink transition hover:border-primary/40 hover:text-primary">{{ tr('ยกเลิก', 'Cancel') }}</NuxtLink>
        </div>
      </form>
      <div v-if="success" class="mt-5 flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <Icon name="check-circle" class="h-6 w-6 shrink-0 text-primary" />
        <div>
          <p class="font-bold text-ink">{{ tr('เปลี่ยนรหัสผ่านสำเร็จ', 'Password changed successfully') }}</p>
          <p class="text-sm text-muted">{{ tr('รหัสผ่านของคุณได้รับการอัปเดตแล้ว', 'Your password has been updated') }}</p>
        </div>
      </div>
    </div>
  </main>
</template>
