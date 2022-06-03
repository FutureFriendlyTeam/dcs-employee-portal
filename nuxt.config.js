export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Employee Portal | NSW Government',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
    // 'vue-simple-markdown/dist/vue-simple-markdown.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vue-simple-markdown.js',
    '@/plugins/vue-sticky-directive.client.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    ['vue-scrollto/nuxt', { duration: 1000, offset: -116 }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: ['@nuxtjs/google-fonts'],

  googleFonts: {
    families: {
      'Public+Sans': [400, 500, 700],
    },
  },

  router: {
    linkExactActiveClass: 'underline font-bold',
    extendRoutes(routes, resolve) {
      routes.push(
        {
          name: 'servicePage',
          path: '/services/:serviceId--:serviceName',
          props: true,
          component: resolve(__dirname, 'components/templates/servicePage.vue'),
        },
        {
          name: 'actionPage',
          path: '/services/:serviceId--:serviceName/action/:actionId',
          props: true,
          component: resolve(__dirname, 'components/templates/actionPage.vue'),
        },
        {
          name: 'actionCompletePage',
          path: '/services/:serviceId--:serviceName/action/:actionId/complete',
          props: true,
          component: resolve(
            __dirname,
            'components/templates/actionCompletePage.vue'
          ),
        }
      )
    },
  },
}
