<script setup lang="ts">
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'auth' })
const { tr } = useLocale()
useHead(() => ({ title: tr('สมัครสมาชิก — Ripples', 'Sign Up — Ripples') }))

const authStore = useAuthStore()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const accepted = ref(false)
const showPw = ref(false)
const showConfirm = ref(false)
const loading = ref(false)
const error = ref('')

async function onSubmit() {
  error.value = ''
  if (!firstName.value || !lastName.value || !email.value || !username.value || !password.value) {
    error.value = tr('กรุณากรอกข้อมูลให้ครบทุกช่อง', 'Please fill in all fields')
    return
  }
  if (password.value.length < 8) {
    error.value = tr('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร', 'Password must be at least 8 characters')
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = tr('รหัสผ่านไม่ตรงกัน', 'Passwords do not match')
    return
  }
  if (!accepted.value) {
    error.value = tr('กรุณายอมรับเงื่อนไขก่อนดำเนินการต่อ', 'Please accept the terms before continuing')
    return
  }
  loading.value = true
  try {
    await authStore.register({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      username: username.value,
      password: password.value,
    })
    toast.success(tr('สมัครสมาชิกสำเร็จ', 'Account created successfully'))
    await navigateTo('/portal/dashboard')
  } catch {
    error.value = tr('สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่', 'Sign up failed. Please try again')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="relative w-full max-w-lg">
    <div class="rounded-2xl border border-[#0F2747]/10 bg-white p-8 shadow-[0_30px_70px_-35px_rgb(45_91_255_/_45%)]">
      <NuxtLink to="/" class="mb-6 block"><img src="/ripples-logo.png" alt="Ripples" class="mx-auto h-20" /></NuxtLink>
      <h1 class="text-center font-heading text-2xl font-extrabold text-ink">{{ tr('สมัครสมาชิก', 'Sign Up') }}</h1>
      <p class="mt-1 text-center text-sm text-muted">{{ tr('สร้างบัญชีใหม่เพื่อเริ่มต้นเป็น Creator', 'Create a new account to start as a Creator') }}</p>

      <form class="mt-7 space-y-4" novalidate @submit.prevent="onSubmit">
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink">{{ tr('ชื่อ', 'First name') }}</label>
            <input v-model="firstName" type="text" :placeholder="tr('ชื่อ', 'First name')" class="w-full rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary/50" />
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink">{{ tr('นามสกุล', 'Last name') }}</label>
            <input v-model="lastName" type="text" :placeholder="tr('นามสกุล', 'Last name')" class="w-full rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary/50" />
          </div>
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-ink">{{ tr('อีเมล', 'Email') }}</label>
          <input v-model="email" type="email" placeholder="your@email.com" class="w-full rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary/50" />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-ink">{{ tr('ชื่อผู้ใช้', 'Username') }}</label>
          <input v-model="username" type="text" placeholder="username" class="w-full rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-3 text-sm outline-none transition focus:border-primary/50" />
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink">{{ tr('รหัสผ่าน', 'Password') }}</label>
            <div class="relative">
              <input v-model="password" :type="showPw ? 'text' : 'password'" placeholder="••••••••" class="w-full rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-3 pr-11 text-sm outline-none transition focus:border-primary/50" />
              <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6B82]/60 transition hover:text-ink" @click="showPw = !showPw"><Icon :name="showPw ? 'eye-off' : 'eye'" class="h-4 w-4" /></button>
            </div>
          </div>
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-ink">{{ tr('ยืนยันรหัสผ่าน', 'Confirm password') }}</label>
            <div class="relative">
              <input v-model="confirmPassword" :type="showConfirm ? 'text' : 'password'" placeholder="••••••••" class="w-full rounded-lg border border-[#0F2747]/15 bg-surface px-4 py-3 pr-11 text-sm outline-none transition focus:border-primary/50" />
              <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6B82]/60 transition hover:text-ink" @click="showConfirm = !showConfirm"><Icon :name="showConfirm ? 'eye-off' : 'eye'" class="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <label class="flex items-start gap-2 text-xs leading-relaxed text-muted">
          <input v-model="accepted" type="checkbox" class="mt-0.5 h-4 w-4 rounded border-[#0F2747]/20 text-primary" />
          <span>{{ tr('ฉันยอมรับ', 'I accept the') }} <NuxtLink to="/terms" class="font-semibold text-primary hover:underline">{{ tr('ข้อกำหนดและเงื่อนไข', 'Terms and Conditions') }}</NuxtLink> {{ tr('และ', 'and') }} <NuxtLink to="/privacy" class="font-semibold text-primary hover:underline">{{ tr('นโยบายความเป็นส่วนตัว', 'Privacy Policy') }}</NuxtLink></span>
        </label>
        <p v-if="error" class="flex items-center gap-1 text-xs font-medium text-red-500"><Icon name="alert-circle" class="h-3.5 w-3.5 shrink-0" /> {{ error }}</p>
        <button type="submit" :disabled="loading" class="w-full rounded-lg bg-primary px-4 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_-10px_rgb(45_91_255_/_70%)] transition hover:bg-primaryDark active:translate-y-0.5 disabled:opacity-60">
          {{ loading ? tr('กำลังสมัคร...', 'Signing up...') : tr('สมัครสมาชิก', 'Sign Up') }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-muted">{{ tr('มีบัญชีแล้ว?', 'Already have an account?') }} <NuxtLink to="/login" class="font-semibold text-primary hover:underline">{{ tr('เข้าสู่ระบบ', 'Sign In') }}</NuxtLink></p>
    </div>

    <p class="mt-6 text-center"><NuxtLink to="/" class="text-sm text-[#5B6B82]/70 transition hover:text-ink">{{ tr('← กลับหน้าหลัก', '← Back to home') }}</NuxtLink></p>
  </div>
</template>
