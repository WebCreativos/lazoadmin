<template>
  <v-app>
    <v-navigation-drawer :value="true" class="elevation-2 rounded-r-xl elevation-0" hide-overlay height="99.9%" app
      permanent>
      <v-app-bar height="120" color="teal darken-4" class="elevation-0">
      </v-app-bar>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="teal darken-4" height="50" width="50" class="btn-navigation"
              active-class="btn-navigation-active" to="/venta">
              <v-icon>mdi-cart</v-icon><br>
              <span>VENTA</span>
            </v-btn>

          </v-list-item-content>
        </v-list-item>

        <v-list-group no-action append-icon="">
            <template v-slot:activator>
              <v-list-item-content>
                    <v-btn text color="teal darken-4" height="50" width="50" class="btn-navigation"
                  active-class="btn-navigation-active">
                  <v-icon>mdi-doctor</v-icon><br>
                  <span>ATENCIONES</span>
                </v-btn>
              </v-list-item-content>
            </template>
            <v-list-item class="pl-12" to="/atencion">
              <v-list-item-content>
                <v-btn text color="teal darken-4" height="50" width="50" to="/atencion" class="btn-navigation"
                  active-class="btn-navigation-active"  exact>
                  <v-icon>mdi-doctor</v-icon>
                  <span>Nueva atencion</span>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-list-item class="pl-12" link to="/atencion/antiguo" >
              <v-list-item-content>
                <v-btn text color="teal darken-4" height="50" width="50" class="btn-navigation"
                  active-class="btn-navigation-active" to="/atencion/antiguo"  exact>
                  <v-icon>mdi-format-list-bulleted</v-icon>
                  <span>Cons. antiguas</span>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="teal darken-4" height="50" width="50" class="btn-navigation"
              active-class="btn-navigation-active" to="/productos/listado">
              <v-icon>mdi-cart-plus</v-icon><br>
              <span>PRODUCTOS</span>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="teal darken-4" height="50" width="50" class="btn-navigation"
              active-class="btn-navigation-active" to="/socios">
              <v-icon>mdi-account-plus</v-icon><br>
              <span>CLIENTES</span>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="teal darken-4" height="50" width="50" class="btn-navigation"
              active-class="btn-navigation-active" to="/mascotas">
              <v-icon>mdi-dog</v-icon><br>
              <span>MASCOTAS</span>
            </v-btn>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-btn text color="teal darken-4" height="50" width="50"  class="btn-navigation"
              active-class="btn-navigation-active" to="/mensajes">
              <v-icon>mdi-comment</v-icon><br>
              <span>MENSAJES</span>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="teal darken-4" height="50" width="50" class="btn-navigation"
              active-class="btn-navigation-active" to="/agenda">
              <v-icon>mdi-calendar</v-icon><br>
              <span>AGENDA</span>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="teal darken-4" height="50" width="50" class="btn-navigation"
              active-class="btn-navigation-active" to="/otros">
              <v-icon>mdi-record</v-icon><br>
              <span>OTROS</span>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-btn text color="teal darken-4" height="50" width="50" class="btn-navigation"
              active-class="btn-navigation-active" to="/configuracion">
              <v-icon>mdi-cog</v-icon><br>
              <span>CONFIGURACION</span>
            </v-btn>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <!--
    <v-app-bar app color="secondary" class="elevation-0 background-toolbar" width="120%" style="left:0" height="120">
    </v-app-bar>
      -->
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    //middleware:'auth',
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
      }
    }
  }

</script>

<style lang="scss">
  .background-toolbar {
    background: linear-gradient(90deg, #d53369 0%, #daae51 100%)
  }

  .btn-navigation {
    border: 1px solid #80808024;
    border-radius: 15px !important;
    padding: 0 !important;
    .v-btn__content {
      width:100%;
      justify-content: start;
      height: 100%;
      align-items: center;
      margin-left:40px;
    }
    span {
      text-transform: capitalize;
      font-weight: 300;
      margin-left:10px;
    }
  }

  .btn-navigation-active {
    span {
      color: white;
    }

    background:linear-gradient(90deg, #03989e, #037176);
    border-color:transparent;
  }

  .v-navigation-drawer__border {
    display: none !important;
  }

</style>
