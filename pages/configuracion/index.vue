<template>
  <v-container fluid>
    <headersGeneralComponent>
      <template v-slot:icon>
        <img src="/icons/cog.png" alt="icono" width="30" />
      </template>
      <template v-slot:title>
        CONFIGURACION
      </template>
    </headersGeneralComponent>

    <v-row>
      <v-col class="col-12">
        <configuracionColoresComponent></configuracionColoresComponent>
      </v-col>
      <v-col class="col-12">
        <configuracionRazasComponent></configuracionRazasComponent>
      </v-col>
      <v-col class="col-12">
        <configuracionReferenciasComponent></configuracionReferenciasComponent>
      </v-col>
      <v-col class="col-12">
        <configuracionEspeciesComponent></configuracionEspeciesComponent>
      </v-col>
      <v-col class="col-12">
        <configuracionCuotasComponent></configuracionCuotasComponent>
      </v-col>
      <v-col class="col-12">
        <generalCardComponent class="rounded-xl">
          <GeneralCardTitleComponent class="white--text">
            Usuarios
            <template v-slot:button>
              <v-btn class="black--text font-weight-regular rounded-lg" color="secondary"
                @click="openModalUsers = true">Agregar</v-btn>

            </template>
          </GeneralCardTitleComponent>
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
                <v-icon color="success" v-if="item.permisos && item.permisos.atencion">mdi-check</v-icon>
                <v-icon color="red" v-else>mdi-close</v-icon>
              </template>
              <template v-slot:item.permisos.socios={item}>
                <v-icon color="success" v-if="item.permisos && item.permisos.socios">mdi-check</v-icon>
                <v-icon color="red" v-else>mdi-close</v-icon>
              </template>

              <template v-slot:item.permisos.agenda={item}>
                <v-icon color="success" v-if="item.permisos && item.permisos.agenda">mdi-check</v-icon>
                <v-icon color="red" v-else>mdi-close</v-icon>
              </template>

              <template v-slot:item.permisos.venta={item}>
                <v-icon color="success" v-if="item.permisos && item.permisos.venta">mdi-check</v-icon>
                <v-icon color="red" v-else>mdi-close</v-icon>
              </template>

            </v-data-table>
          </v-card-text>
        </generalCardComponent>
      </v-col>


      <v-col class="col-12">
        <generalCardComponent>
          <GeneralCardTitleComponent class="white--text">Logs</GeneralCardTitleComponent>
          <v-card-text>
            <v-data-table :items="logsList" :headers="headerLogs" hide-default-footer>
              <template v-slot:item.eventType={item}>
                <v-chip v-if="item.eventType=='Create'" color="success" class="white--text font-weight-regular" label>
                  Nuevo registro</v-chip>
                <v-chip v-else-if="item.eventType=='Update'" color="blue" class="white--text font-weight-regular" label>
                  Registro actualizado</v-chip>
                <v-chip v-else-if="item.eventType=='Delete'" color="red" class="white--text font-weight-regular" label>
                  Registro eliminado</v-chip>
              </template>
            </v-data-table>
          </v-card-text>
        </generalCardComponent>
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
        }, {
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
        headerLogs: [{
          value: 'eventLevel',
          text: 'Nivel de evento',
        }, {
          value: 'collectionName',
          text: 'Coleccion',
        }, {
          value: 'eventType',
          text: 'Tipo de evento',
        }, {
          value: 'eventDate',
          text: 'Fecha',
        }],
        logsList: [],
        users: [],
        searchFacturas: {},
        searchConsultas: {}

      }
    },
    created() {
      this.getConfiguracion()
      this.getUsers()
      this.getLogs()
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
      getLogs() {
        this.$axios.get('/logs')
          .then(response => {
            this.logsList = response.data
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
      generateConsultas() {
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
