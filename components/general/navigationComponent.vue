<template>
  <div>
    <v-navigation-drawer :value="!mobileMenu" color="primary" app class="navigation-drawer">
      <template v-slot:prepend>
        <v-img src="/logo.png" width="100%" contain position="center center" class="mt-3"></v-img>
      </template>
      <v-divider class="my-4"></v-divider>
      <v-list>
        <template v-for="(item, i) in items">
          <v-list-group v-if="item.subItems" :key="i" append-icon="" no-action>
            <template v-slot:activator>
              <v-list-item-content>
                <v-btn outlined color="secondary" block height="50" class="btn-navigation"
                  active-class="btn-navigation-active primary white--text">
                  <img :src="`/icons/${item.icon}.png`">
                  <span>{{item.title}}</span>
                </v-btn>
              </v-list-item-content>
            </template>
            <v-list-item class="pl-12" link v-for="(subItem,si) in item.subItems" :key="'s'+si">
              <v-list-item-content>
                <v-btn text color="secondary" block height="50" class="btn-navigation"
                  active-class="btn-navigation-active  white--text" :to="subItem.to" exact>
                  <img :src="`/icons/${subItem.icon}.png`">
                  <span>{{subItem.title}}</span>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item :key="i+'n'" v-else>
            <v-list-item-content>
              <v-btn outlined color="secondary" block height="50" class="btn-navigation"
                active-class="btn-navigation-active  white--text" :to="item.to">
                <img width="35" :src="`/icons/${item.icon}.png`">
                <span>{{item.title}}</span>
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-btn color="secondary" outlined height="50" block large class="btn-navigation">
                <img width="35" :src="`/icons/logout.png`">
                <span>Cerrar sesion</span>
              </v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </template>
    </v-navigation-drawer>
    <v-bottom-navigation app v-show="mobileMenu" background-color="primary" class="rounded-t-xl">
      <template v-for="(item, i) in bottomItems">

        <v-bottom-sheet v-if="item.subItems" :key="i" class="rounded-t-xl">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" icon color="primary" v-on="on">
              <img :src="`/icons/${item.icon}.png`">
            </v-btn>
          </template>
          <v-list color="primary">
            <v-list-item v-for="(subItem,i) in item.subItems" :key="i">
              <v-list-item-content>
                <v-btn outlined color="secondary" outlined block height="50" class="btn-navigation"
                  active-class="btn-navigation-active  white--text" :to="subItem.to" exact>
                  <img :src="`/icons/${subItem.icon}.png`">
                  <span>{{subItem.title}}</span>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-bottom-sheet>
        <template v-else>
          <v-btn :key="i+'n'" color="primary" icon :to="item.to">
              <img :src="`/icons/${item.icon}.png`">
          </v-btn>
        </template>
      </template>

    </v-bottom-navigation>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [{
            icon: 'cart',
            title: 'Venta',
            to: '/venta'
          },
          {
            icon: 'doctor',
            title: 'Atencion',
            to: '/atencion'
          },
          {
            icon: 'users',
            title: 'Socios',
            to: '/socios'
          },
          {
            icon: 'dog',
            title: 'Mascotas',
            to: '/mascotas'
          },
          {
            icon: 'calendar',
            title: 'Calendario',
            to: '/agenda'
          },
          {
            icon: 'cog',
            title: 'Configuracion',
            to: '/configuracion'
          },
        ],
        bottomItems: [{
            icon: 'cart',
            title: 'Venta',
            to: '/venta'
          },
          {
            icon: 'doctor',
            title: 'Atencion',
            to: '/atencion'
          },
          {
            icon: 'users',
            title: 'Socios',
            to: '/socios'
          },
          {
            icon: 'dog',
            title: 'Mascotas',
            to: '/mascotas'
          },
          {
            icon: 'mdi-dots-horizontal',
            title: 'More',
            subItems: [{
                icon: 'calendar',
                title: 'Calendario',
                to: '/agenda'
              },
              {
                icon: 'cog',
                title: 'Configuracion',
                to: '/configuracion'
              },
            ]
          },

        ],

      }
    },
    methods: {
      checkTabType(item) {
        if (item.subItems) {
          return 'v-list-group'
        } else {
          return 'v-list-item'
        }
      }

    },
    computed: {
      mobileMenu() {
        return this.$vuetify.breakpoint.mdAndDown
      }
    }
  }

</script>

<style lang="scss">
  .navigation-drawer {
    border-top-right-radius: 35px;
    border-bottom-right-radius: 35px;
  }

  .btn-navigation {
    border: 1px solid #80808024;
    border-radius: 15px !important;
    padding: 0 !important;

    .v-btn__content {
      width: 100%;
      justify-content: start;
      height: 100%;
      align-items: center;
      margin-left: 40px;
    }

    span {
      text-transform: capitalize;
      font-weight: 500;
      margin-left: 10px;
    }
  }

  .btn-navigation-active {
    span {
      color: white;
    }
  }

  .app-bar {
    border-bottom: 1px solid #0000000d !important;
  }

</style>
