import dotenv from 'dotenv'
dotenv.config()
const contentful = require('contentful')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'contentful-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/contentful', '~/plugins/posts'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  env: {
    CONTENTFUL_SPACE: process.env.CONTENTFUL_SPACE,
    CONTENTFUL_ACCESSTOKEN: process.env.CONTENTFUL_ACCESSTOKEN,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // GraphQl Apollo Client
    '@nuxtjs/apollo',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  apollo: {
    includeNodeModules: true,
    clientConfigs: {
      default: {
        httpEndpoint: `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE}?access_token=${process.env.CONTENTFUL_ACCESSTOKEN}`,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  /*
   ** Build configuration
   */
  build: {},

  generate: {
    routes: () => {
      const client = contentful.createClient({
        space: process.env.CONTENTFUL_ENVIRONMENT,
        accessToken: process.env.CONTENTFUL_ACCESSTOKEN,
      })

      return client
        .getEntries({
          content_type: 'blogPost',
        })
        .then((response) => {
          return response.items.map((entry) => {
            return {
              route: entry.fields.slug,
              payload: entry,
            }
          })
        })
    },
    dir: 'dist',
    devtools: true,
  },
}
