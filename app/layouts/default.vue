<template>
  <div class="min-h-screen flex flex-col bg-white">
    <LayoutPublicNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <LayoutAppFooter />
    <CommonCookieConsent />
  </div>
</template>
