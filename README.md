# KOL Influencer

KOL & Influencer management platform built with Nuxt 4, Pinia, and TailwindCSS.

## Tech Stack

- [Nuxt 4](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) — state management
- [TailwindCSS](https://tailwindcss.com/) — styling
- [Reka UI](https://reka-ui.com/) — headless UI components
- [GSAP](https://gsap.com/) — animations
- [Zod](https://zod.dev/) — schema validation
- [VueUse](https://vueuse.org/) — composable utilities

## Project Structure

```
app/
├── assets/
├── components/
├── composables/
├── data/
├── layouts/
├── middleware/
├── pages/
│   ├── portal/        # Authenticated influencer portal
│   │   ├── dashboard.vue
│   │   ├── campaigns.vue
│   │   ├── tasks.vue
│   │   ├── wallet.vue
│   │   └── profile.vue
│   ├── campaigns/
│   ├── login.vue
│   ├── register.vue
│   └── index.vue
├── plugins/
├── stores/
├── types/
└── utils/
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
