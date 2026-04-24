<template>
  <div class="min-h-screen pt-20">
    <!-- Hero -->
    <section class="py-20 bg-gradient-to-br from-primary/5 via-white to-primary/10">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto">
          <UiBadge variant="secondary" class="bg-primary/10 text-primary border-0 mb-6">{{ languageStore.t('blog.badge') }}</UiBadge>
          <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">{{ languageStore.t('blog.title') }}</h1>
          <p class="text-xl text-gray-600">{{ languageStore.t('blog.subtitle') }}</p>
        </div>
      </div>
    </section>

    <!-- Search & Filter -->
    <section class="py-8 bg-white border-b">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div class="relative w-full sm:w-96">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <UiInput v-model="searchQuery" :placeholder="languageStore.t('blog.searchPlaceholder')" class="pl-10" />
          </div>
          <div class="flex gap-2 flex-wrap justify-center">
            <UiButton
              v-for="category in categories"
              :key="category"
              :variant="selectedCategory === category ? 'default' : 'outline'"
              size="sm"
              :class="selectedCategory === category ? 'bg-primary' : ''"
              @click="selectedCategory = category"
            >
              {{ languageStore.t(`blog.categories.${category}`) }}
            </UiButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Posts -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UiCard
            v-for="post in filteredPosts"
            :key="post.id"
            class="group border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                :src="post.image"
                :alt="post.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute top-4 left-4">
                <UiBadge class="bg-white/90 text-gray-900 backdrop-blur-sm">{{ languageStore.t(`blog.categories.${post.category}`) }}</UiBadge>
              </div>
            </div>
            <UiCardContent class="p-6">
              <div class="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span class="flex items-center gap-1">
                  <Calendar class="h-4 w-4" />
                  {{ post.publishedAt }}
                </span>
                <span class="flex items-center gap-1">
                  <Clock class="h-4 w-4" />
                  {{ post.readTime }} {{ languageStore.t('blog.minRead') }}
                </span>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {{ post.title }}
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ post.excerpt }}</p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <User class="h-4 w-4 text-gray-400" />
                  <span class="text-sm text-gray-600">{{ post.author.name }}</span>
                </div>
                <UiButton variant="ghost" size="sm" class="text-primary">
                  {{ languageStore.t('blog.readMore') }}
                  <ArrowRight class="ml-1 h-4 w-4" />
                </UiButton>
              </div>
            </UiCardContent>
          </UiCard>
        </div>

        <div v-if="filteredPosts.length === 0" class="text-center py-16">
          <p class="text-gray-500">{{ languageStore.t('blog.noResults') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Search, Calendar, Clock, ArrowRight, User } from 'lucide-vue-next'
import { mockBlogPosts } from '~/data/mockData'

definePageMeta({ layout: 'default' })

const languageStore = useLanguageStore()

// Hidden - not ready for client. Redirect to home if accessed directly.
const router = useRouter()
onMounted(() => router.replace('/'))

const searchQuery = ref('')
const selectedCategory = ref('all')
const categories = ['all', 'tips', 'guide', 'analytics', 'business']

const filteredPosts = computed(() =>
  mockBlogPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'all' || post.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
)
</script>
