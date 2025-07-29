// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    ['motion-v/nuxt', { mode: 'client' }],
    '@nuxtjs/sitemap',
    '@nuxtjs/device',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    [
      'nuxt-jsonld',
      {
        disableOptionsAPI: true
      }
    ],
    '@nuxtjs/seo',
    'nuxt-llms'
  ],

  ssr: true,

  devtools: {
    enabled: true
  },

  app: {
    head: {
      title: 'Bo Cooper | Frontend Developer',
      meta: [
        { name: 'description', content: 'Bo Cooper is a frontend developer based in the US, specializing in Vue.js and Nuxt.js.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: 'favicon/favicon.ico' }
      ]
    }
  },

  css: ['~/assets/css/main.css'],

  features: {
    inlineStyles: true
  },

  compatibilityDate: '2024-11-01',

  nitro: {
    preset: 'node-server',
    compressPublicAssets: true,
    minify: true,
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  vite: {
    build: {
      minify: 'terser',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', '@vue/runtime-core']
          }
        }
      }
    },
    optimizeDeps: {
      exclude: ['fsevents']
    }
    /*
		server: {
			allowedHosts: [ BASE_URL ]
		}
    */
  },

  telemetry: false,

  eslint: {
    config: {
      stylistic: { // https://github.com/eslint-stylistic/eslint-stylistic/blob/main/packages/eslint-plugin/configs/customize.ts
        commaDangle: 'never',
        braceStyle: '1tbs',
        indent: 'tab',
        semi: false,
        quotes: 'single'
      }
    }
  },
  fonts: {
    families: [
      {
        name: 'Poppins',
        provider: 'google'
      }
    ]
  },

  /*
  i18n: {
    vueI18n: './i18n.config.js',
    locales: ['en', 'es'],
    defaultLocale: 'en',
    compilation: {
      strictMessage: false,
      escapeHtml: true
    }
  },
  */

  icon: {
    /* vscode ext -> https://marketplace.visualstudio.com/items?itemName=antfu.iconify
    * https://ui.nuxt.com/getting-started/icons/nuxt#custom-local-collections
    * https://github.com/nuxt/icon?tab=readme-ov-file#custom-local-collections
    */
    customCollections: [
      {
        prefix: 'custom',
        dir: './app/assets/icons'
      }
    ]
  },

  llms: { // https://nuxt.com/modules/llms#nuxt-content
    domain: 'https://example.com',
    title: 'My Application',
    description: 'My Application Description'
  }
})
