<template>
  <div class="min-h-screen pt-20">
    <!-- Hero -->
    <section class="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto">
          <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-6">{{ languageStore.t('contact.badge') }}</UiBadge>
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">{{ languageStore.t('contact.title') }}</h1>
          <p class="text-xl text-gray-600">{{ languageStore.t('contact.subtitle') }}</p>
        </div>
      </div>
    </section>

    <!-- Contact Info -->
    <section class="py-16 bg-white">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <UiCard v-for="info in contactInfo" :key="info.titleKey" class="border-0 shadow-md">
            <UiCardContent class="p-6 text-center">
              <div class="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <component :is="info.icon" class="h-6 w-6 text-primary" />
              </div>
              <h3 class="font-semibold text-gray-900 mb-1">{{ languageStore.t(info.titleKey) }}</h3>
              <p class="text-primary font-medium">{{ info.content }}</p>
              <p class="text-sm text-gray-500">{{ languageStore.t(info.descKey) }}</p>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16">
          <!-- Form -->
          <UiCard class="border-0 shadow-xl">
            <UiCardContent class="p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">{{ languageStore.t('contact.form.title') }}</h2>
              <form class="space-y-6" @submit.prevent="handleSubmit">
                <div class="grid sm:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <UiLabel for="name">{{ languageStore.t('auth.firstName') }}</UiLabel>
                    <UiInput id="name" v-model="formData.name" :placeholder="languageStore.t('contact.form.namePlaceholder')" required :disabled="isLoading" />
                  </div>
                  <div class="space-y-2">
                    <UiLabel for="email">{{ languageStore.t('auth.email') }}</UiLabel>
                    <UiInput id="email" v-model="formData.email" type="email" :placeholder="languageStore.t('contact.form.emailPlaceholder')" required :disabled="isLoading" />
                  </div>
                </div>
                <div class="space-y-2">
                  <UiLabel for="subject">{{ languageStore.t('common.subject') }}</UiLabel>
                  <UiInput id="subject" v-model="formData.subject" :placeholder="languageStore.t('contact.form.subjectPlaceholder')" required :disabled="isLoading" />
                </div>
                <div class="space-y-2">
                  <UiLabel for="message">{{ languageStore.t('common.message') }}</UiLabel>
                  <UiTextarea id="message" v-model="formData.message" :placeholder="languageStore.t('contact.form.messagePlaceholder')" :rows="5" required :disabled="isLoading" />
                </div>
                <UiButton type="submit" class="w-full bg-primary hover:bg-primary/90" :disabled="isLoading">
                  <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                  <Send v-else class="mr-2 h-4 w-4" />
                  {{ isLoading ? languageStore.t('contact.form.sending') : languageStore.t('contact.form.send') }}
                </UiButton>
              </form>
            </UiCardContent>
          </UiCard>

          <!-- Image -->
          <div class="relative">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
              alt="Our office"
              class="rounded-3xl shadow-xl w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />
            <div class="absolute bottom-8 left-8 right-8 text-white">
              <h3 class="text-2xl font-bold mb-2">{{ languageStore.t('contact.office.title') }}</h3>
              <p class="text-white/80">{{ languageStore.t('contact.office.address') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ CTA -->
    <section class="py-20 bg-white">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">{{ languageStore.t('contact.faq.title') }}</h2>
        <p class="text-gray-600 mb-8 max-w-xl mx-auto">{{ languageStore.t('contact.faq.description') }}</p>
        <NuxtLink to="/faq">
          <UiButton variant="outline">{{ languageStore.t('contact.faq.button') }}</UiButton>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Mail, Phone, MapPin, Clock, Send, Loader2 } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'default' })

const languageStore = useLanguageStore()
const isLoading = ref(false)
const formData = reactive({ name: '', email: '', subject: '', message: '' })

const contactInfo = [
  { icon: Mail, titleKey: 'contact.info.emailTitle', content: 'info@ripples.com', descKey: 'contact.info.emailDesc' },
  { icon: Phone, titleKey: 'contact.info.phoneTitle', content: '02-715-3000', descKey: 'contact.info.phoneDesc' },
  { icon: MapPin, titleKey: 'contact.info.officeTitle', content: 'Bangkok, Thailand', descKey: 'contact.info.officeDesc' },
  { icon: Clock, titleKey: 'contact.info.hoursTitle', content: 'Mon - Fri: 9AM - 6PM', descKey: 'contact.info.hoursDesc' },
]

async function handleSubmit() {
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  toast.success(languageStore.t('contact.form.successTitle'), { description: languageStore.t('contact.form.successDesc') })
  Object.assign(formData, { name: '', email: '', subject: '', message: '' })
  isLoading.value = false
}
</script>
