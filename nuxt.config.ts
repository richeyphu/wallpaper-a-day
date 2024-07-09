// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2024-07-04',
  srcDir: './src',
  dir: {
    public: '../public'
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/eslint'
  ],
  tailwindcss: {
    editorSupport: true,
    configPath: './tailwind.config.ts'
  },
  googleFonts: {
    families: {
      'Noto Sans Thai': '100..900'
    }
  },
  runtimeConfig: {
    public: {
      baseUrl:
        '' ||
        (process.env.NODE_ENV === 'production'
          ? 'https://wallpaper-a-day.vercel.app'
          : 'http://localhost:3000')
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/gallery': { prerender: true },
    '/posts': { ssr: true },
    '/posts/**': { swr: true }
  },
  nitro: {
    routeRules: {
      '/api/posts/**': {
        proxy:
          'https://public-api.wordpress.com/rest/v1.1/sites/wallpaper-a-day.com/posts/**'
      },
      '/api/counts/**': {
        proxy: process.env.COUNT_API_URL + '/**' || ''
      }
    }
  }
})
