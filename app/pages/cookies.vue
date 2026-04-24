<template>
  <div class="min-h-screen pt-20">
    <section class="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto">
          <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-6">{{ languageStore.t('cookies.badge') }}</UiBadge>
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{{ languageStore.t('cookies.title') }}</h1>
          <p class="text-gray-500">{{ languageStore.t('cookies.updated') }}</p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-8">
          <div v-for="section in sections" :key="section.title">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ section.title }}</h2>
            <p class="text-gray-600 leading-relaxed">{{ section.content }}</p>
          </div>

          <!-- Cookie Types Table -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ languageStore.t('cookies.typesTitle') }}</h2>
            <div class="space-y-4">
              <div v-for="type in cookieTypes" :key="type.name" class="p-4 border rounded-xl">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-semibold text-gray-900">{{ type.name }}</h3>
                  <UiBadge :variant="type.required ? 'default' : 'secondary'" class="text-xs">
                    {{ type.required ? languageStore.t('cookies.required') : languageStore.t('cookies.optional') }}
                  </UiBadge>
                </div>
                <p class="text-sm text-gray-600">{{ type.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 p-6 bg-gray-50 rounded-xl">
          <p class="text-gray-600 text-sm">
            {{ languageStore.t('cookies.contact') }}
            <a href="mailto:privacy@ripples.com" class="text-primary hover:underline">privacy@ripples.com</a>.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const languageStore = useLanguageStore()

const sections = computed(() =>
  Array.from({ length: 4 }, (_, i) => ({
    title: languageStore.t(`cookies.sections.s${i + 1}Title`),
    content: languageStore.t(`cookies.sections.s${i + 1}Content`),
  }))
)

const cookieTypes = computed(() => [
  { name: languageStore.t('cookies.types.t1Name'), required: true, description: languageStore.t('cookies.types.t1Desc') },
  { name: languageStore.t('cookies.types.t2Name'), required: false, description: languageStore.t('cookies.types.t2Desc') },
  { name: languageStore.t('cookies.types.t3Name'), required: false, description: languageStore.t('cookies.types.t3Desc') },
  { name: languageStore.t('cookies.types.t4Name'), required: false, description: languageStore.t('cookies.types.t4Desc') },
])
</script>
