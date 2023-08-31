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
    private: {
      stripeAppKey: process.env.STRIPE_APP_KEY,
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    },
    public: {
      appDomain: process.env.APP_DOMAIN,
    }
  }
})
