<template>
  <div class="relative min-h-screen overflow-x-hidden bg-surface font-sans text-ink antialiased">
    <LayoutGridOverlay />
    <LayoutAppSidebar mode="public" />
    <LayoutMobileTopbar mode="public" />

    <div class="relative lg:pl-72">
      <main class="mx-auto max-w-6xl px-6 py-10 lg:px-12 lg:py-14">
        <slot />
        <LayoutAppFooter />
      </main>
    </div>

    <CommonCookieConsent />
  </div>
</template>
