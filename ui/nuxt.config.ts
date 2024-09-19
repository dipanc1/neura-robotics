import { defineNuxtConfig, } from 'nuxt/config';

export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt'
  ],

  build: {
    transpile: ['@pinia/nuxt']
  },

  plugins: [
    '~/plugins/toast.ts'
  ],

  compatibilityDate: '2024-09-18'
});