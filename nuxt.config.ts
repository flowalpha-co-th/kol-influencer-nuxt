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
      title: 'Ripples',
      meta: [
        { name: 'description', content: 'Modern KOL & influencer marketplace — where brands meet creators' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api',
    },
  },
  routeRules: {
    '/campaigns': { redirect: '/portal/campaigns' },
    '/campaigns/**': { redirect: '/portal/campaigns' },
  },
})
