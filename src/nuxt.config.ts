// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  app: {
    head: {
      htmlAttrs: {
        lang: 'ja'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0',
      title: 'TO DO LIST',
      meta: [
        {name: 'description', content: 'Nuxt3 to do list'}
      ]
    },
  },
  
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/variables.scss";',
        },
      },
    },
  },

  css: ['@/assets/css/reset.css'],

  plugins: [],

  modules: ['dayjs-nuxt'],

  dayjs: {
    locales: ['ja'],
    defaultLocale: 'ja',
    defaultTimeZone: 'Asia/Tokyo',
  },
})
