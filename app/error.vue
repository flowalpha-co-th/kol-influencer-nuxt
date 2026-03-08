<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/10 px-4">
    <div class="text-center max-w-md">
      <div class="text-8xl font-bold text-primary mb-4">{{ error?.statusCode || 500 }}</div>
      <h1 class="text-2xl font-bold text-gray-900 mb-4">
        {{ error?.statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong' }}
      </h1>
      <p class="text-gray-600 mb-8">
        {{ error?.statusCode === 404
          ? "The page you're looking for doesn't exist or has been moved."
          : "We're sorry, an unexpected error occurred. Please try again." }}
      </p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          class="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          @click="handleError"
        >
          Go Home
        </button>
        <button
          class="inline-flex items-center justify-center px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          @click="clearError({ redirect: useRoute().fullPath })"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

function handleError() {
  clearError({ redirect: '/' })
}
</script>
