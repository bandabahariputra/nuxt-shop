// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    'nuxt-feather-icons',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  googleFonts: {
    families: {
      'Barlow Condensed': true,
    },
  },
  runtimeConfig: {
    MIDTRANS_ENDPOINT: process.env.MIDTRANS_ENDPOINT,
    MIDTRANS_SERVER_KEY: process.env.MIDTRANS_SERVER_KEY,
    public: {
      MIDTRANS_CLIENT_KEY: process.env.MIDTRANS_CLIENT_KEY,
    },
  },
})
