<template>
  <div class="relative min-h-screen overflow-x-hidden bg-surface font-sans text-ink antialiased">
    <LayoutGridOverlay />
    <LayoutAppSidebar mode="portal" />
    <LayoutMobileTopbar mode="portal" />

    <div class="relative lg:pl-72">
      <slot />
    </div>

    <CommonCookieConsent />
  </div>
</template>
