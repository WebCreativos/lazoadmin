<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12">
        <v-card class="rounded-xl">
          <v-toolbar color="gd-primary-to-right" class="elevation-0 white--text">
            <v-toolbar-title class="font-weight-light">
              Configuracion
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <configuracionColoresComponent></configuracionColoresComponent>
          </v-card-text>
          <v-card-text>
            <configuracionRazasComponent></configuracionRazasComponent>
          </v-card-text>

          <v-card-text>
            <configuracionReferenciasComponent></configuracionReferenciasComponent>
          </v-card-text>
          <v-card-text>
            <configuracionEspeciesComponent></configuracionEspeciesComponent>
          </v-card-text>
          <v-card-text>
            <configuracionCuotasComponent></configuracionCuotasComponent>
          </v-card-text>
          <v-card-text>
            <v-card class="rounded-xl" outlined>
              <v-toolbar color="gd-primary-to-right white--text" class="elevation-0">
                <v-toolbar-title class="font-weight-light">
                  Usuarios
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn class="white--text font-weight-light rounded-lg" color="gd-primary-to-right"
                  @click="openModalUsers = true">Agregar</v-btn>
              </v-toolbar>
              <v-card-text>
                <v-data-table :items="users" :headers="headers" hide-default-footer>
                  <template v-slot:item.edit={item}>
                    <v-btn class="white--text font-weight-light rounded-lg" color="gd-primary-to-right" @click="()=>{
                        openModalEditUsers = true;
                        user = item;
                    }">
                      Editar
                    </v-btn>
                  </template>

                  <template v-slot:item.permisos.atencion={item}>
                    <v-icon color="success" v-if="item.permisos.atencion">mdi-check</v-icon>
                    <v-icon color="red" v-else>mdi-close</v-icon>
                  </template>
                  <template v-slot:item.permisos.socios={item}>
                    <v-icon color="success" v-if="item.permisos.socios">mdi-check</v-icon>
                    <v-icon color="red" v-else>mdi-close</v-icon>
                  </template>

                  <template v-slot:item.permisos.agenda={item}>
                    <v-icon color="success" v-if="item.permisos.agenda">mdi-check</v-icon>
                    <v-icon color="red" v-else>mdi-close</v-icon>
                  </template>

                  <template v-slot:item.permisos.venta={item}>
                    <v-icon color="success" v-if="item.permisos.venta">mdi-check</v-icon>
                    <v-icon color="red" v-else>mdi-close</v-icon>
                  </template>

                </v-data-table>
              </v-card-text>
            </v-card>

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="gd-primary-to-right" @click="changeConfiguracion()"
              class="white--text font-weight-light rounded-lg">Guardar configuraciones</v-btn>
          </v-card-actions>
          <!-- 
          <v-toolbar color="gd-primary-to-right" class="elevation-0 white--text">
            <v-toolbar-title class="font-weight-light">
              Exportar informacion
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-row>
              <v-col class="col-md-12 col-12">
                <v-card class="rounded-xl">
                  <v-toolbar color="gd-primary-to-right" class="elevation-0 white--text">
                    <v-toolbar-title class="font-weight-light">Consultas</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-row>
                      <v-col class="col-md-6">
                        <v-text-field outlined dense type="date" v-model="searchConsultas.fecha_gte"
                          label="Fecha desde"></v-text-field>
                      </v-col>
                      <v-col class="col-md-6">
                        <v-text-field outlined dense type="date" v-model="searchConsultas.fecha_lte"
                          label="Fecha hasta"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="gd-primary-to-right" @click="generateConsultas()"
                      class="white--text font-weight-light rounded-lg">Exportar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col class="col-md-12 col-12">
                <v-card class="rounded-xl">
                  <v-toolbar color="gd-primary-to-right" class="elevation-0 white--text">
                    <v-toolbar-title class="font-weight-light">Facturas</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                    <v-row>
                      <v-col class="col-md-6">
                        <v-text-field outlined dense type="date" v-model="searchFacturas.fecha_gte"
                          label="Fecha desde"></v-text-field>
                      </v-col>
                      <v-col class="col-md-6">
                        <v-text-field outlined dense type="date" v-model="searchFacturas.fecha_lte"
                          label="Fecha hasta"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="gd-primary-to-right" @click="changeConfiguracion()"
                      class="white--text font-weight-light rounded-lg">Exportar</v-btn>
                  </v-card-actions>

                </v-card>

              </v-col>
              <v-col class="col-md-12 col-12">
                <v-card class="rounded-xl">
                  <v-toolbar color="gd-primary-to-right" class="elevation-0 white--text">
                    <v-toolbar-title class="font-weight-light">Debitos</v-toolbar-title>
                  </v-toolbar>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="gd-primary-to-right" @click="changeConfiguracion()"
                      class="white--text font-weight-light rounded-lg">Exportar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          -->
        </v-card>
      </v-col>
      <v-col class="col-12">
      </v-col>
    </v-row>

    <v-snackbar v-model="openSnack">
      Configuraciones guardadas
      <v-btn color="white" text @click="openSnack = false">Cerrar</v-btn>
    </v-snackbar>
    <v-dialog v-model="openModalUsers">
      <info-user-component v-model="user">
        <template v-slot:header>
          <v-toolbar class="mb-3 elevation-0" color="primary">
            <v-toolbar-title class="white--text">Agregar usuarios</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="openModalUsers = false" color="white">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:button>
          <v-btn depressed color="primary" @click="addUser()">Agregar</v-btn>
        </template>
      </info-user-component>
    </v-dialog>
    <v-dialog v-model="openModalEditUsers">
      <info-user-component v-model="user">
        <template v-slot:header>
          <v-toolbar class="mb-3 elevation-0" color="primary">
            <v-toolbar-title class="white--text">Editar usuario</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="()=>{
                openModalEditUsers = false;
                user = {};
                }" color="white">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:button>
          <v-btn depressed color="primary" @click="updateUser()">Editar</v-btn>
        </template>
      </info-user-component>
    </v-dialog>

  </v-container>
</template>

<script>
  import InfoUserComponent from '~/components/usuarios/infoUserComponent.vue'
  import moment from 'moment'
  export default {
    components: {
      InfoUserComponent
    },
    data() {

      return {
        openModalUsers: false,
        openModalEditUsers: false,
        user: {
          permisos: {}
        },
        configuracion: {},
        openSnack: false,
        headers: [{
          value: 'username',
          text: 'CI',
        },{
          value: 'name',
          text: 'Nombre',
        }, {
          text: 'Editar socios',
          value: 'permisos.socios',
          align: 'left'
        }, {
          text: 'Crear atencion',
          value: 'permisos.atencion',
          align: 'left'
        }, {
          text: 'Usar agenda',
          value: 'permisos.agenda',
          align: 'left'
        }, {
          text: 'Agregar venta',
          value: 'permisos.venta',
          align: 'left'
        }, {
          value: 'edit',
          text: 'Editar',
          align: 'right'
        }],
        users: [],
        searchFacturas: {},
        searchConsultas: {}

      }
    },
    created() {
      this.getConfiguracion()
      this.getUsers()
      this.searchFacturas.fecha_gte = moment().startOf('month').format('YYYY-MM-DD')
      this.searchFacturas.fecha_lte = moment().endOf('month').format('YYYY-MM-DD')
      this.searchConsultas.fecha_gte = moment().startOf('month').format('YYYY-MM-DD')
      this.searchConsultas.fecha_lte = moment().endOf('month').format('YYYY-MM-DD')

    },
    methods: {
      getConfiguracion() {
        this.$axios.get('/configuracions')
          .then(response => {
            this.configuracion = response.data[response.data.length - 1] || {}
          })
          .catch(error => {
            console.log(error);
          })
      },
      changeConfiguracion() {
        this.$axios.post('/configuracions', this.configuracion)
          .then(() => {
            this.openSnack = true
          })
      },
      getUsers() {
        this.$axios.get('/users', {
            params: {
              rol: 'Administrador'
            }
          })
          .then(response => {
            this.users = response.data
          })
          .catch(error => {
            console.log(error);
          })
      },
      addUser() {
        this.user.rol = "Administrador"
        this.user.email = this.user.username + '@gmail.com'
        this.$axios.post('/users', this.user)
          .then(() => {
            this.getUsers()
            this.openModalUsers = false
          })
      },
      updateUser() {
        this.$axios.put(`/users/${this.user.id}`, this.user)
          .then(() => {
            this.getUsers()
            this.openModalEditUsers = false
            this.user = {}
          })
      },
      generateConsultas(){
        this.$axios.get('/atencion/excel', {
            params: {
              ...this.searchConsultas
            }
          })
          .then(response => {
            window.open(response.data.url)
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  }

</script>

<style>

</style>
