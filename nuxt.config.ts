// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  colorMode: {
    classPrefix: ''
  },
  runtimeConfig: {
    stripeAppKey: process.env.NUXT_STRIPE_APP_KEY,
    stripeSecretKey: process.env.NUXT_STRIPE_SECRET_KEY,
    public: {
      appDomain: process.env.NUXT_PUBLIC_APP_DOMAIN,
    }
  }
})
