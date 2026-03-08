<template>
  <div class="min-h-screen pt-20">
    <section class="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto">
          <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-6">Legal</UiBadge>
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p class="text-gray-500">Last updated: January 1, 2026</p>
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
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
            <div class="space-y-4">
              <div v-for="type in cookieTypes" :key="type.name" class="p-4 border rounded-xl">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="font-semibold text-gray-900">{{ type.name }}</h3>
                  <UiBadge :variant="type.required ? 'default' : 'secondary'" class="text-xs">
                    {{ type.required ? 'Required' : 'Optional' }}
                  </UiBadge>
                </div>
                <p class="text-sm text-gray-600">{{ type.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 p-6 bg-gray-50 rounded-xl">
          <p class="text-gray-600 text-sm">
            For cookie-related questions, contact us at
            <a href="mailto:privacy@prakit.com" class="text-primary hover:underline">privacy@prakit.com</a>.
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
    title: 'What Are Cookies?',
    content: 'Cookies are small text files placed on your device when you visit a website. They help websites remember your preferences, keep you logged in, and understand how you use the site. We use cookies and similar technologies like local storage and session storage.',
  },
  {
    title: 'How We Use Cookies',
    content: 'We use cookies to keep you logged in to your account, remember your language preference, analyze how you use the Platform to improve it, measure the effectiveness of our campaigns, and provide personalized content and recommendations.',
  },
  {
    title: 'Managing Cookies',
    content: 'You can control cookies through your browser settings. Disabling certain cookies may affect Platform functionality. Essential cookies cannot be disabled as they are required for the Platform to function properly.',
  },
  {
    title: 'Third-Party Cookies',
    content: 'Some cookies are placed by third-party services that appear on our pages, such as analytics providers and social media platforms. These are governed by the respective third parties\' privacy policies.',
  },
]

const cookieTypes = [
  {
    name: 'Essential Cookies',
    required: true,
    description: 'Required for basic Platform functionality including authentication, session management, and security features. Cannot be disabled.',
  },
  {
    name: 'Preference Cookies',
    required: false,
    description: 'Remember your settings and preferences such as language selection, so you don\'t have to re-enter them each visit.',
  },
  {
    name: 'Analytics Cookies',
    required: false,
    description: 'Help us understand how visitors interact with the Platform by collecting anonymous usage statistics to improve our services.',
  },
  {
    name: 'Marketing Cookies',
    required: false,
    description: 'Used to track visitors across websites to display relevant and engaging advertisements based on your interests.',
  },
]
</script>
