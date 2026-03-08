export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  srcDir: 'app',
  ssr: true,
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  css: ['~/assets/css/main.css'],
  imports: {
    autoImport: true,
  },
  typescript: {
    strict: true,
  },
  app: {
    head: {
      title: 'Prakit Media',
      meta: [
        { name: 'description', content: 'Thailand\'s leading media agency with 41 years of expertise' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api',
    },
  },
})
