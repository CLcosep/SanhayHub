// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss','@vueuse/nuxt'],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/logo.png' },
      ]
    }
  },
  runtimeConfig: { public: { API: process.env.API } },
  // const API = runtimeConfig().public.API
})
