import colors from 'vuetify/es5/util/colors'

export default {
  mode:'spa',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'Appets - Administracion',
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    "@nuxtjs/auth"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api2.descuentosya.uy/',
    //baseURL: 'http://localhost:1338/' 
  },
  auth: {
    autoLogout: true,
    localStorage: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: "/auth/local/",
            method: "post",
            propertyName: "jwt"
          },
          logout: false,
          user: {
            url: "/users/me/",
            method: "get",
            propertyName: false
          },
        },
        tokenRequired: true,
        tokenType: "Bearer"
      }
    },
    redirect: {
      login: "/login",
      logout: "/login",
      user: "/"
    }
  },
  pwa: {
    icon: {
      source:'~/icon.png',
    }
  },  
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#333350",
          accent: colors.grey.darken3,
          secondary: "#ffc107",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
