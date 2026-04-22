<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section ref="heroRef" class="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-white to-primary/10" />

      <!-- Decorative background: soft gradient orbs + dot grid -->
      <div
        class="absolute top-20 right-[-100px] w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        :style="{ background: 'radial-gradient(circle, hsl(var(--theme-gradient-via) / 0.5) 0%, hsl(var(--theme-gradient-via) / 0.1) 45%, transparent 70%)', opacity: 'calc(var(--theme-blob-opacity, 0.3) * 1.8)' }"
      />
      <div class="absolute bottom-10 left-10 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-40" :style="{ background: 'hsl(var(--theme-gradient-from) / 0.4)' }" />
      <div class="absolute top-40 left-1/3 w-40 h-40 rounded-full blur-2xl pointer-events-none opacity-30" :style="{ background: 'hsl(var(--theme-gradient-to) / 0.35)' }" />

      <!-- Dot grid pattern (top right) -->
      <div class="absolute top-32 right-10 pointer-events-none opacity-30 hidden md:block">
        <div class="grid grid-cols-8 gap-3">
          <div v-for="i in 48" :key="i" class="w-1.5 h-1.5 rounded-full" :style="{ background: 'hsl(var(--theme-gradient-via))' }"></div>
        </div>
      </div>

      <!-- Wavy line decoration (bottom) -->
      <svg class="absolute bottom-10 right-1/4 w-60 h-12 pointer-events-none opacity-30 hidden md:block" viewBox="0 0 240 48" fill="none">
        <path d="M 0 24 Q 30 8 60 24 T 120 24 T 180 24 T 240 24" stroke="currentColor" stroke-width="3" stroke-linecap="round" :style="{ color: 'hsl(var(--theme-gradient-via))' }" />
      </svg>

      <!-- Floating sparkles -->
      <Sparkles class="absolute top-32 left-10 w-8 h-8 text-yellow-400 opacity-80 floating-sparkle" />
      <Sparkles class="absolute top-1/2 right-1/3 w-6 h-6 text-primary opacity-70 floating-sparkle-2" />
      <Sparkles class="absolute bottom-32 right-20 w-10 h-10 opacity-60 floating-sparkle-3" :style="{ color: 'hsl(var(--theme-gradient-via))' }" />

      <div class="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="space-y-8">
            <div class="hero-subtitle">
              <span class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-white shadow-md border border-primary/10">
                <Sparkles class="w-4 h-4 text-primary" />
                <span class="bg-gradient-to-r from-primary to-[hsl(var(--theme-gradient-via))] bg-clip-text text-transparent font-semibold">
                  {{ languageStore.t('hero.subtitle') }}
                </span>
              </span>
            </div>
            <h1 class="hero-title text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] tracking-tight">
              {{ languageStore.t('hero.titleBefore') }}
              <span class="relative inline-block">
                <span class="relative bg-gradient-to-r from-primary via-[hsl(var(--theme-gradient-via))] to-[hsl(var(--theme-gradient-to))] bg-clip-text text-transparent">
                  {{ languageStore.t('hero.titleHighlight') }}
                </span>
                <svg class="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" preserveAspectRatio="none">
                  <path d="M 0 8 Q 75 0 150 6 T 300 4" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" :style="{ color: 'hsl(var(--theme-gradient-via))' }" />
                </svg>
              </span>
            </h1>
            <p class="hero-desc text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed">
              {{ languageStore.t('hero.description') }}
            </p>
            <div class="hero-buttons flex flex-wrap gap-4">
              <NuxtLink to="/register">
                <UiButton size="lg" class="bg-primary hover:bg-primary/90 text-white px-8 h-14 text-base shadow-lg shadow-primary/30 hover:scale-105 transition">
                  {{ languageStore.t('hero.getStarted') }}
                  <ArrowRight class="ml-2 h-5 w-5" />
                </UiButton>
              </NuxtLink>
              <NuxtLink to="#how-it-works">
                <UiButton size="lg" variant="outline" class="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 h-14 text-base">
                  <PlayCircle class="mr-2 h-5 w-5" />
                  {{ languageStore.t('hero.exploreCampaigns') }}
                </UiButton>
              </NuxtLink>
            </div>
            <!-- Trust strip -->
            <div class="hero-trust flex items-center gap-4 pt-4">
              <div class="flex -space-x-3">
                <img v-for="avatar in trustAvatars" :key="avatar" :src="avatar" alt="" class="w-10 h-10 rounded-full border-2 border-white object-cover shadow" />
                <div class="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-primary to-[hsl(var(--theme-gradient-via))] flex items-center justify-center text-white text-xs font-bold shadow">
                  10K+
                </div>
              </div>
              <div>
                <div class="flex items-center gap-0.5">
                  <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span class="text-sm font-semibold text-gray-900 ml-1">4.9/5</span>
                </div>
                <p class="text-xs text-gray-600">{{ languageStore.t('hero.trustBadge') }}</p>
              </div>
            </div>
          </div>

          <div class="hero-image relative">
            <!-- Main image -->
            <div class="relative rounded-[2rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&h=1000&fit=crop" alt="Creator" class="w-full h-[520px] object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <!-- Floating stat card (top right) -->
            <div class="hero-float-1 absolute -top-6 -right-6 bg-white rounded-2xl shadow-2xl p-5 w-56 border border-gray-100">
              <div class="flex items-center gap-3 mb-2">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(var(--theme-gradient-via))] flex items-center justify-center">
                  <TrendingUp class="w-5 h-5 text-white" />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Avg. Engagement</p>
                  <p class="text-2xl font-bold text-gray-900">+247%</p>
                </div>
              </div>
              <div class="flex items-center gap-1">
                <div v-for="i in 5" :key="i" class="h-1.5 flex-1 rounded-full bg-primary/20">
                  <div class="h-full rounded-full bg-primary transition-all" :style="{ width: i <= 4 ? '100%' : '60%' }" />
                </div>
              </div>
            </div>

            <!-- Floating stat card (bottom left) -->
            <div class="hero-float-2 absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-5 w-64 border border-gray-100">
              <div class="flex items-center gap-3">
                <div class="relative shrink-0">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <Check class="w-6 h-6 text-white" />
                  </div>
                  <div class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-[10px]">
                    <Sparkles class="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <p class="font-semibold text-gray-900 text-sm">Campaign Live!</p>
                  <p class="text-xs text-gray-500">Invoice sent • 2 min ago</p>
                </div>
              </div>
            </div>

            <!-- Floating pill (mid right) -->
            <div class="hero-float-3 absolute top-1/2 -right-8 bg-gradient-to-br from-primary to-[hsl(var(--theme-gradient-via))] rounded-2xl shadow-xl px-4 py-3 text-white">
              <div class="flex items-center gap-2">
                <Users class="w-5 h-5" />
                <div>
                  <p class="text-[10px] opacity-80">Live now</p>
                  <p class="font-bold text-sm">2,431 creators</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section ref="statsRef" class="relative py-24 bg-white overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full blur-3xl opacity-30" :style="{ background: 'linear-gradient(90deg, hsl(var(--theme-gradient-from) / 0.3), hsl(var(--theme-gradient-to) / 0.3))' }" />

      <div class="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-[hsl(var(--theme-gradient-via)/0.1)] border border-primary/20">
            <TrendingUp class="w-4 h-4 text-primary" />
            <span class="text-sm font-semibold text-primary">ตัวเลขที่ทำให้แบรนด์ไว้ใจ</span>
          </span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(stat, i) in statsWithCounter" :key="stat.label" class="stat-item group relative overflow-hidden rounded-3xl p-8 bg-white border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <!-- Number watermark -->
            <span class="absolute -top-2 -right-2 text-[8rem] font-black opacity-[0.05] leading-none select-none">0{{ i + 1 }}</span>
            <!-- Gradient accent circle -->
            <div class="absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" :style="{ background: 'hsl(var(--theme-gradient-via))' }" />

            <div class="relative">
              <div class="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--theme-gradient-via))] items-center justify-center mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <component :is="stat.icon" class="h-7 w-7 text-white" />
              </div>
              <p class="text-5xl sm:text-6xl font-black bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 tabular-nums">{{ stat.displayValue }}</p>
              <p class="text-base font-semibold text-gray-600">{{ stat.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section ref="aboutRef" class="relative py-28 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <!-- Decorative pattern -->
      <div class="absolute top-10 right-10 opacity-20">
        <div class="grid grid-cols-6 gap-3">
          <div v-for="i in 36" :key="i" class="w-2 h-2 rounded-full bg-primary"></div>
        </div>
      </div>

      <div class="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-20 items-center">
          <div class="about-content space-y-6">
            <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles class="w-4 h-4 text-primary" />
              <span class="text-sm font-semibold text-primary">เกี่ยวกับ Prakast</span>
            </span>
            <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">{{ languageStore.t('about.title') }}</h2>
            <p class="text-gray-600 text-lg leading-relaxed">{{ languageStore.t('about.description') }}</p>
            <div class="space-y-5 pt-4">
              <div v-for="(item, idx) in aboutPoints" :key="item" class="flex items-start gap-4 group">
                <div class="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--theme-gradient-via))] flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20 group-hover:scale-110 transition">
                  0{{ idx + 1 }}
                </div>
                <div class="pt-2">
                  <p class="text-gray-800 font-medium leading-relaxed">{{ item }}</p>
                </div>
              </div>
            </div>
            <NuxtLink to="/about">
              <UiButton variant="outline" class="border-gray-300 text-gray-700 hover:bg-gray-50 mt-8 h-12 px-6">
                {{ languageStore.t('about.learnMore') }} <ArrowRight class="ml-2 h-4 w-4" />
              </UiButton>
            </NuxtLink>
          </div>

          <!-- Overlapping image stack -->
          <div class="about-image relative h-[560px]">
            <!-- Background blob -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="w-[90%] h-[90%] rounded-full blur-3xl opacity-30" :style="{ background: 'linear-gradient(135deg, hsl(var(--theme-gradient-from)), hsl(var(--theme-gradient-via)))' }" />
            </div>

            <!-- Main image (back) -->
            <div class="absolute top-0 right-0 w-[70%] h-[70%] rounded-[2rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=700&fit=crop" alt="Creator at work" class="w-full h-full object-cover" />
            </div>

            <!-- Secondary image (front) -->
            <div class="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-[2rem] overflow-hidden shadow-2xl -rotate-3 hover:rotate-0 transition-transform duration-500 z-10">
              <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&h=600&fit=crop" alt="Brand meeting" class="w-full h-full object-cover" />
            </div>

            <!-- Floating badge -->
            <div class="absolute top-1/2 left-8 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-4 z-20 animate-bounce-slow">
              <div class="flex items-center gap-2">
                <div class="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                  <Sparkles class="w-5 h-5 text-white" />
                </div>
                <div>
                  <p class="text-xs text-gray-500">Verified</p>
                  <p class="text-sm font-bold text-gray-900">100% KYC</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section ref="servicesRef" class="relative py-28 bg-white overflow-hidden">
      <div class="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Briefcase class="w-4 h-4 text-primary" />
            <span class="text-sm font-semibold text-primary">{{ languageStore.t('nav.services') }}</span>
          </span>
          <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {{ languageStore.t('services.title') }}
          </h2>
          <p class="text-gray-600 text-lg">เครื่องมือครบทุกขั้นตอน ตั้งแต่หา Creator ไปจนจ่ายเงิน</p>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(service, index) in services" :key="index" class="service-card group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-primary/30 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
            <!-- Number watermark -->
            <span class="absolute -top-4 -right-2 text-[9rem] font-black leading-none select-none bg-gradient-to-br from-gray-900 to-gray-300 bg-clip-text text-transparent opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
              0{{ index + 1 }}
            </span>

            <!-- Gradient glow on hover -->
            <div class="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" :style="{ background: 'hsl(var(--theme-gradient-via))' }" />

            <div class="relative">
              <div class="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--theme-gradient-via))] items-center justify-center mb-6 shadow-xl shadow-primary/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <component :is="service.icon" class="h-8 w-8 text-white" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{{ service.title }}</h3>
              <p class="text-gray-600 leading-relaxed mb-4">{{ service.description }}</p>
              <div class="flex items-center gap-2 text-primary font-semibold text-sm opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                <span>เรียนรู้เพิ่มเติม</span>
                <ArrowRight class="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section id="how-it-works" ref="howItWorksRef" class="relative py-28 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
      <!-- Decorative sparkles -->
      <Sparkles class="absolute top-20 left-10 w-6 h-6 text-yellow-400 opacity-60" />
      <Sparkles class="absolute bottom-32 right-16 w-8 h-8 opacity-50" :style="{ color: 'hsl(var(--theme-gradient-via))' }" />

      <div class="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-20">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <PlayCircle class="w-4 h-4 text-primary" />
            <span class="text-sm font-semibold text-primary">{{ languageStore.t('services.howItWorks.badge') }}</span>
          </span>
          <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {{ languageStore.t('services.howItWorks.title') }}
          </h2>
          <p class="text-gray-600 text-lg">จากไอเดียถึงผลลัพธ์ — 4 ขั้นตอนง่ายๆ จบในไม่กี่นาที</p>
        </div>

        <div class="relative">
          <!-- Connector line (desktop) -->
          <div class="hidden lg:block absolute top-28 left-0 right-0 h-0.5">
            <svg class="w-full h-12" viewBox="0 0 1200 48" preserveAspectRatio="none">
              <path d="M 50 24 Q 300 -10 600 24 T 1150 24" stroke="url(#hiw-gradient)" stroke-width="2" stroke-dasharray="6 6" fill="none" />
              <defs>
                <linearGradient id="hiw-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" :stop-color="'hsl(var(--theme-gradient-from))'" />
                  <stop offset="50%" :stop-color="'hsl(var(--theme-gradient-via))'" />
                  <stop offset="100%" :stop-color="'hsl(var(--theme-gradient-to))'" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div v-for="(step, idx) in howItWorksSteps" :key="idx" class="hiw-step relative group">
              <!-- Step circle -->
              <div class="relative w-24 h-24 mx-auto mb-6">
                <div class="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--theme-gradient-via))] blur-xl opacity-40 group-hover:opacity-70 transition-opacity" />
                <div class="relative w-24 h-24 rounded-full bg-white border-4 border-white shadow-2xl flex items-center justify-center">
                  <component :is="step.icon" class="w-10 h-10 text-primary" />
                </div>
                <!-- Step number badge -->
                <div class="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-gradient-to-br from-primary to-[hsl(var(--theme-gradient-via))] flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {{ idx + 1 }}
                </div>
              </div>
              <div class="text-center">
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ step.title }}</h3>
                <p class="text-gray-600 leading-relaxed">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Campaigns -->
    <section ref="campaignsRef" class="relative py-28 bg-gray-50 overflow-hidden">
      <div class="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Flame class="w-4 h-4 text-primary" />
              <span class="text-sm font-semibold text-primary">{{ languageStore.t('expertise.badge') }}</span>
            </span>
            <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
              {{ languageStore.t('expertise.title') }}
            </h2>
            <p class="text-gray-600 text-lg mt-3">Campaign ที่กำลัง live พร้อมรับ Creator</p>
          </div>
          <NuxtLink to="/campaigns">
            <UiButton variant="outline" class="border-gray-300 text-gray-700 hover:bg-white h-12 px-6">
              {{ languageStore.t('expertise.viewAll') }} <ArrowRight class="ml-2 h-4 w-4" />
            </UiButton>
          </NuxtLink>
        </div>

        <!-- Asymmetric grid: 1 big + 2 small -->
        <div class="grid lg:grid-cols-3 gap-6">
          <!-- Featured (big) -->
          <NuxtLink v-if="featuredCampaigns[0]" :to="`/campaigns/${featuredCampaigns[0].id}`" class="campaign-card group relative lg:col-span-2 lg:row-span-2 overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 min-h-[520px]">
            <img :src="featuredCampaigns[0].image" :alt="featuredCampaigns[0].title" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

            <!-- Live badge -->
            <div class="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-bold shadow-lg">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              LIVE
            </div>
            <div class="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
              {{ featuredCampaigns[0].category }}
            </div>

            <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div class="flex items-center gap-3 mb-4">
                <img :src="featuredCampaigns[0].brandLogo" :alt="featuredCampaigns[0].brandName" class="w-8 h-8 rounded-full object-cover border-2 border-white" />
                <span class="text-sm font-medium text-white/90">{{ featuredCampaigns[0].brandName }}</span>
              </div>
              <h3 class="text-3xl sm:text-4xl font-bold mb-3 leading-tight group-hover:translate-x-2 transition-transform">{{ featuredCampaigns[0].title }}</h3>
              <p class="text-white/80 mb-6 line-clamp-2 max-w-lg">{{ featuredCampaigns[0].description }}</p>
              <div class="flex items-center justify-between pt-4 border-t border-white/20">
                <div>
                  <p class="text-xs text-white/70 mb-1">Budget</p>
                  <p class="text-2xl font-black">฿{{ featuredCampaigns[0].budget.min.toLocaleString() }} - {{ featuredCampaigns[0].budget.max.toLocaleString() }}</p>
                </div>
                <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center group-hover:rotate-45 transition-transform">
                  <ArrowRight class="w-5 h-5 text-gray-900" />
                </div>
              </div>
            </div>
          </NuxtLink>

          <!-- Small cards -->
          <NuxtLink v-for="campaign in featuredCampaigns.slice(1, 3)" :key="campaign.id" :to="`/campaigns/${campaign.id}`" class="campaign-card group relative overflow-hidden rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 bg-white">
            <div class="relative h-48 overflow-hidden">
              <img :src="campaign.image" :alt="campaign.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold">
                {{ campaign.category }}
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-2">
                <img :src="campaign.brandLogo" :alt="campaign.brandName" class="w-5 h-5 rounded-full object-cover" />
                <span class="text-xs text-gray-500">{{ campaign.brandName }}</span>
              </div>
              <h3 class="font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">{{ campaign.title }}</h3>
              <div class="flex items-center justify-between pt-3 border-t">
                <p class="text-sm font-bold text-primary">฿{{ (campaign.budget.min / 1000).toFixed(0) }}K - {{ (campaign.budget.max / 1000).toFixed(0) }}K</p>
                <ArrowRight class="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="relative py-28 bg-white overflow-hidden">
      <!-- Background gradient blob -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[500px] rounded-full blur-3xl opacity-20" :style="{ background: 'linear-gradient(90deg, hsl(var(--theme-gradient-from)), hsl(var(--theme-gradient-via)), hsl(var(--theme-gradient-to)))' }" />

      <div class="relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Star class="w-4 h-4 text-primary fill-primary" />
            <span class="text-sm font-semibold text-primary">{{ languageStore.t('testimonials.badge') }}</span>
          </span>
          <h2 class="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
            {{ languageStore.t('testimonials.title') }}
          </h2>
        </div>

        <!-- Big hero quote -->
        <div class="relative max-w-4xl mx-auto mb-12">
          <div class="relative bg-white rounded-[2rem] p-10 sm:p-14 shadow-2xl border border-gray-100">
            <!-- Quote mark -->
            <div class="absolute -top-6 left-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--theme-gradient-via))] flex items-center justify-center shadow-xl">
              <Quote class="w-7 h-7 text-white" />
            </div>

            <div class="flex gap-1 mb-6 justify-center">
              <Star v-for="i in 5" :key="i" class="w-6 h-6 fill-yellow-400 text-yellow-400" />
            </div>

            <p class="text-2xl sm:text-3xl text-gray-800 font-medium leading-relaxed text-center mb-8 italic">
              "{{ testimonials[0]?.quote }}"
            </p>

            <div class="flex items-center gap-4 justify-center">
              <img :src="testimonials[0]?.avatar" :alt="testimonials[0]?.name" class="w-14 h-14 rounded-full object-cover ring-4 ring-primary/10" />
              <div>
                <p class="font-bold text-gray-900">{{ testimonials[0]?.name }}</p>
                <p class="text-sm text-gray-500">{{ testimonials[0]?.role }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Smaller quotes row -->
        <div class="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div v-for="testimonial in testimonials.slice(1, 3)" :key="testimonial.name" class="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
            <div class="flex gap-1 mb-3">
              <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </div>
            <p class="text-gray-700 leading-relaxed mb-4 line-clamp-3">"{{ testimonial.quote }}"</p>
            <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <p class="font-semibold text-gray-900 text-sm">{{ testimonial.name }}</p>
                <p class="text-xs text-gray-500">{{ testimonial.role }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section ref="ctaRef" class="relative py-28 overflow-hidden">
      <!-- Mesh gradient background -->
      <div
        class="absolute inset-0"
        :style="{
          backgroundImage: `radial-gradient(at 20% 20%, hsl(var(--theme-gradient-from)) 0%, transparent 50%), radial-gradient(at 80% 20%, hsl(var(--theme-gradient-via)) 0%, transparent 50%), radial-gradient(at 60% 80%, hsl(var(--theme-gradient-to)) 0%, transparent 60%), linear-gradient(135deg, hsl(var(--theme-gradient-from)), hsl(var(--theme-gradient-via)) 50%, hsl(var(--theme-gradient-to)))`,
        }"
      />
      <!-- Noise texture overlay -->
      <div class="absolute inset-0 opacity-20 mix-blend-overlay" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E');" />

      <!-- Giant floating sparkle -->
      <Sparkles class="absolute top-16 left-10 w-16 h-16 text-white/30 floating-sparkle" />
      <Sparkles class="absolute bottom-20 right-16 w-20 h-20 text-white/20 floating-sparkle-2" />
      <Sparkles class="absolute top-1/2 right-1/4 w-10 h-10 text-yellow-300/60" />
      <div class="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
      <div class="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />

      <div class="cta-content relative max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-6">
          <Sparkles class="w-4 h-4 text-white" />
          <span class="text-sm font-semibold text-white">พร้อมให้แบรนด์ปัง</span>
        </span>
        <h2 class="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight drop-shadow-lg">
          {{ languageStore.t('cta.title') }}
        </h2>
        <p class="text-white/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">{{ languageStore.t('cta.description') }}</p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink to="/register">
            <UiButton size="lg" class="bg-white text-primary hover:bg-gray-100 px-8 h-14 text-base font-bold shadow-2xl hover:scale-105 transition">
              {{ languageStore.t('cta.button1') }}
              <ArrowRight class="ml-2 h-5 w-5" />
            </UiButton>
          </NuxtLink>
          <NuxtLink to="/campaigns">
            <UiButton size="lg" variant="outline" class="border-white/60 text-white hover:bg-white/20 px-8 h-14 text-base backdrop-blur-md">
              {{ languageStore.t('cta.button2') }}
            </UiButton>
          </NuxtLink>
        </div>

        <!-- Trust logos row -->
        <div class="mt-14 pt-10 border-t border-white/20">
          <p class="text-white/70 text-xs uppercase tracking-widest mb-4 font-semibold">ไม่ต้องบัตรเครดิต · เริ่มฟรี · ยกเลิกได้ตลอด</p>
          <div class="flex items-center justify-center gap-8 flex-wrap text-white/80 text-sm">
            <div class="flex items-center gap-2">
              <Shield class="w-5 h-5" />
              <span>Transparent Billing</span>
            </div>
            <div class="flex items-center gap-2">
              <Check class="w-5 h-5" />
              <span>Verified Creators</span>
            </div>
            <div class="flex items-center gap-2">
              <TrendingUp class="w-5 h-5" />
              <span>Real-time Analytics</span>
            </div>
            <div class="flex items-center gap-2">
              <HeadphonesIcon class="w-5 h-5" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Section (hidden - not ready for client) -->
    <section v-if="false" class="py-20 bg-gray-50">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-4">{{ languageStore.t('mediaInsights.badge') }}</UiBadge>
            <h2 class="text-3xl sm:text-4xl font-bold text-gray-900">{{ languageStore.t('mediaInsights.title') }}</h2>
          </div>
          <NuxtLink to="/blog">
            <UiButton variant="outline" class="border-[#5A5A5A] text-[#5A5A5A] hover:bg-[#E8E8E8]">{{ languageStore.t('mediaInsights.viewMore') }} <ArrowRight class="ml-2 h-4 w-4" /></UiButton>
          </NuxtLink>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UiCard v-for="post in featuredPosts" :key="post.id" class="group border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div class="relative h-48 overflow-hidden">
              <img :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <UiCardContent class="p-6">
              <div class="flex items-center gap-3 mb-3">
                <UiBadge variant="secondary" class="text-xs">{{ post.category }}</UiBadge>
                <span class="text-xs text-gray-500">{{ post.readTime }} min read</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">{{ post.title }}</h3>
              <p class="text-gray-600 text-sm line-clamp-2">{{ post.excerpt }}</p>
            </UiCardContent>
          </UiCard>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight, Users, Briefcase, TrendingUp, Star, Search, BarChart3, Shield, FileText, HeadphonesIcon,
  Sparkles, PlayCircle, Check, Flame, Quote, MessageSquare, FileCheck, Wallet, UserCheck,
} from 'lucide-vue-next'
import { mockCampaigns } from '~/data/mockData'

const languageStore = useLanguageStore()

const heroRef = ref<HTMLElement>()
const statsRef = ref<HTMLElement>()
const aboutRef = ref<HTMLElement>()
const servicesRef = ref<HTMLElement>()
const howItWorksRef = ref<HTMLElement>()
const campaignsRef = ref<HTMLElement>()
const ctaRef = ref<HTMLElement>()

const featuredCampaigns = mockCampaigns.slice(0, 3)

const trustAvatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
]

interface StatConfig {
  icon: typeof Users
  target: number
  suffix: string
  label: string
}

const statConfigs: StatConfig[] = [
  { icon: Users, target: 10000, suffix: '+', label: 'Verified Creators' },
  { icon: Briefcase, target: 500, suffix: '+', label: 'Trusted Brands' },
  { icon: TrendingUp, target: 98, suffix: '%', label: 'Success Rate' },
]

const counterValues = ref<number[]>(statConfigs.map(() => 0))
const statsWithCounter = computed(() =>
  statConfigs.map((s, i) => ({
    icon: s.icon,
    label: s.label,
    displayValue: `${Math.round(counterValues.value[i]).toLocaleString()}${s.suffix}`,
  })),
)

const aboutPoints = computed(() => [
  languageStore.t('about.points.point1'),
  languageStore.t('about.points.point2'),
  languageStore.t('about.points.point3'),
])

const services = computed(() => [
  { icon: Search, title: languageStore.t('services.service1'), description: languageStore.t('services.service1Desc') },
  { icon: FileText, title: languageStore.t('services.service2'), description: languageStore.t('services.service2Desc') },
  { icon: FileCheck, title: languageStore.t('services.service3'), description: languageStore.t('services.service3Desc') },
  { icon: BarChart3, title: languageStore.t('services.service4'), description: languageStore.t('services.service4Desc') },
  { icon: HeadphonesIcon, title: languageStore.t('services.service5'), description: languageStore.t('services.service5Desc') },
  { icon: Shield, title: languageStore.t('services.service6'), description: languageStore.t('services.service6Desc') },
])

const howItWorksSteps = computed(() => [
  { icon: UserCheck, title: languageStore.t('services.howItWorks.step1Title'), description: languageStore.t('services.howItWorks.step1Description') },
  { icon: MessageSquare, title: languageStore.t('services.howItWorks.step2Title'), description: languageStore.t('services.howItWorks.step2Description') },
  { icon: PlayCircle, title: languageStore.t('services.howItWorks.step3Title'), description: languageStore.t('services.howItWorks.step3Description') },
  { icon: Wallet, title: languageStore.t('services.howItWorks.step4Title'), description: languageStore.t('services.howItWorks.step4Description') },
])

const testimonials = computed(() => [
  { quote: languageStore.t('testimonials.testimonial1'), name: languageStore.t('testimonials.testimonial1Name'), role: languageStore.t('testimonials.testimonial1Role'), avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
  { quote: languageStore.t('testimonials.testimonial2'), name: languageStore.t('testimonials.testimonial2Name'), role: languageStore.t('testimonials.testimonial2Role'), avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
  { quote: languageStore.t('testimonials.testimonial3'), name: languageStore.t('testimonials.testimonial3Name'), role: languageStore.t('testimonials.testimonial3Role'), avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
])

function animateCounters() {
  const duration = 1600
  const start = performance.now()
  const startValues = statConfigs.map(() => 0)
  const step = (now: number) => {
    const t = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    counterValues.value = statConfigs.map((s, i) => startValues[i] + (s.target - startValues[i]) * eased)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

onMounted(async () => {
  const { default: gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  const ctx = gsap.context(() => {
    gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6, delay: 0.2, ease: 'power3.out' })
    gsap.from('.hero-title', { opacity: 0, y: 30, duration: 0.8, delay: 0.4, ease: 'power3.out' })
    gsap.from('.hero-desc', { opacity: 0, y: 20, duration: 0.6, delay: 0.6, ease: 'power3.out' })
    gsap.from('.hero-buttons', { opacity: 0, y: 20, duration: 0.6, delay: 0.8, ease: 'power3.out' })
    gsap.from('.hero-trust', { opacity: 0, y: 20, duration: 0.6, delay: 1, ease: 'power3.out' })
    gsap.from('.hero-image', { opacity: 0, scale: 0.9, duration: 1, delay: 0.3, ease: 'power3.out' })
    gsap.from('.hero-float-1', { opacity: 0, y: -20, x: 20, duration: 0.8, delay: 1.2, ease: 'back.out(1.7)' })
    gsap.from('.hero-float-2', { opacity: 0, y: 20, x: -20, duration: 0.8, delay: 1.4, ease: 'back.out(1.7)' })
    gsap.from('.hero-float-3', { opacity: 0, x: 30, duration: 0.8, delay: 1.6, ease: 'back.out(1.7)' })

    ScrollTrigger.create({
      trigger: statsRef.value,
      start: 'top 80%',
      once: true,
      onEnter: animateCounters,
    })

    gsap.fromTo('.stat-item',
      { opacity: 0, y: 40 },
      { scrollTrigger: { trigger: statsRef.value, start: 'top 85%', once: true }, opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.4)' },
    )
    gsap.from('.about-content', { scrollTrigger: { trigger: aboutRef.value, start: 'top 70%' }, opacity: 0, x: -50, duration: 0.8, ease: 'power3.out' })
    gsap.from('.about-image', { scrollTrigger: { trigger: aboutRef.value, start: 'top 70%' }, opacity: 0, x: 50, duration: 0.8, delay: 0.2, ease: 'power3.out' })
    gsap.fromTo('.service-card',
      { opacity: 0, y: 40 },
      { scrollTrigger: { trigger: servicesRef.value, start: 'top 85%', once: true }, opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(1.2)', clearProps: 'all' },
    )
    gsap.fromTo('.hiw-step',
      { opacity: 0, y: 40, scale: 0.8 },
      { scrollTrigger: { trigger: howItWorksRef.value, start: 'top 80%', once: true }, opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.15, ease: 'back.out(1.5)' },
    )
    gsap.fromTo('.campaign-card',
      { opacity: 0, y: 50 },
      { scrollTrigger: { trigger: campaignsRef.value, start: 'top 85%', once: true }, opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', clearProps: 'all' },
    )
    gsap.from('.cta-content', { scrollTrigger: { trigger: ctaRef.value, start: 'top 75%' }, opacity: 0, y: 40, duration: 0.9, ease: 'power3.out' })
  })
  onUnmounted(() => ctx.revert())
})
</script>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(-50%) translateY(0px); }
  50% { transform: translateY(-50%) translateY(-10px); }
}
.animate-bounce-slow {
  animation: bounce-slow 3s ease-in-out infinite;
}

@keyframes float-sparkle {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-12px) rotate(15deg); }
  66% { transform: translateY(6px) rotate(-10deg); }
}
.floating-sparkle {
  animation: float-sparkle 4s ease-in-out infinite;
}
.floating-sparkle-2 {
  animation: float-sparkle 5s ease-in-out infinite 0.5s;
}
.floating-sparkle-3 {
  animation: float-sparkle 6s ease-in-out infinite 1s;
}
</style>
