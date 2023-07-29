// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESSTOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESHTOKEN_SECRET,
  },
});
