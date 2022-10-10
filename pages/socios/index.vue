<template>
  <v-container fluid>
    <SociosListSociosComponent @changePage="getSocios($event)" v-model="sociosList">
      <template v-slot:extraFields>
        <v-card outlined width="100%" class="rounded-lg">
          <v-card-text>
            <v-row>
              <v-col class="col-md-6 col-sm-6 col-12">
                <SociosFindSociosComponent hideDetails v-model="search.name_contains"></SociosFindSociosComponent>

              </v-col>
              <v-col class="col-md-3 col-sm-3 col-12 d-flex align-center">
                <v-switch class="mt-0" inset hide-details v-model="search.old_client" default="false"
                  label="Cliente antiguo">
                </v-switch>
              </v-col>
              <v-col class="col-md-3">
                <v-btn block color="teal darken-4" @click="getSocios()"
                  class="white--text rounded-lg font-weight-light">
                  Buscar&nbsp;<v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </template>
      <template v-slot:buttonTitle>
        <v-btn to="/socios/registro" class="font-weight-light rounded-lg white--text" color="teal darken-4">
          AGREGAR SOCIO
        </v-btn>
      </template>
      <template v-slot:button="{ item }">
        <v-row no-gutters>
          <v-col class="pa-2">
            <v-btn block small class="teal darken-4 font-weight-light rounded-lg white--text" @click="()=>{
          openModalPaymentServices = true;
          dataPayment.client = item
          }" color="teal darken-4">
              VALIDAR PAGO
            </v-btn>
          </v-col>
          <v-col class="pa-2">
            <v-btn block small class="teal darken-4 font-weight-light rounded-lg white--text"
              :to="`/socios/editar/${item.id}`" color="teal darken-4">
              EDITAR
            </v-btn>
          </v-col>
          <v-col class="pa-2">
            <v-btn block small class="font-weight-light rounded-lg white--text" color="red"
              @click="deleteSocio(item.id)">
              ELIMINAR
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </SociosListSociosComponent>
    <v-dialog v-model="openModalPaymentServices">
      <v-card width="600">
        <v-toolbar color="teal darken-4 font-weight-light" elevation="0">
          <v-toolbar-title class="white--text">Pagar servicios</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="openModalPaymentServices = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="ma-2">
          <v-text-field outlined dense label="Cantidad de meses" hide-details type="number"
            v-model="dataPayment.months"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal darken-4" class="font-weight-light white--text rounded-lg"
            @click="openAlertPayment = true">Pagar servicios</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <modalSuccess :action="payServices" color="red" v-model="openAlertPayment">
      <template v-slot:icon>
        mdi-alert
      </template>
      <template v-slot:title>
        Esta seguro que va a acreditar <b class="red--text">{{dataPayment.months}}</b> cuotas?
      </template>
      <template v-slot:buttonCancel>
        <v-btn rounded class="white--text" color="red" @click="openAlertPayment = false">Cancelar</v-btn>
      </template>
    </modalSuccess>
  </v-container>
</template>

<script>
  import modalSuccess from '~/components/modalSuccess.vue';
  import moment from 'moment';
  var qs = require('qs');
  export default {
    components: {
      modalSuccess
    },
    data() {
      return {
        openModalPaymentServices: false,
        openAlertPayment: false,
        dataPayment: {
          months: 1,
          client: {}
        },
        search: {
          _sort: 'id:desc',
          old_client: false
        },
        sociosList: {
          data: [],
          length: 0
        },
        pageItems: 0
      }
    },
    created() {
      this.getSocios()
    },
    methods: {
      async getSocios(page = 1) {
        this.sociosList.data = []
        this.sociosList.length = 0

        let params = {
          _where: {
            _or: []
          }
        }
        if (this.search.name_contains) {
          params._where._or.push({
            'name_contains': this.search.name_contains
          })
          params._where._or.push({
            'address_contains': this.search.name_contains
          })
          params._where._or.push({
            'user.username_contains': this.search.name_contains
          })
        }
        if(this.search.old_client){
          params.old_client = this.search.old_client
        }
        console.log(params)
        await this.$axios.get('/socios', {
            params: {
              ...params,
              _start: (page - 1) * 25,
              _limit: page * 25,
              _sort: 'id:desc',
            },
            paramsSerializer: params => {
              return qs.stringify(params, {
                arrayFormat: 'indices'
              })
            },

          })
          .then(response => {
            console.log(response)
            this.sociosList.data = response.data
          })

        await this.$axios.get('/socios/count', {
            params: params,
            paramsSerializer: params => {
              return qs.stringify(params, {
                arrayFormat: 'indices'
              })
            },

          })
          .then(response => {
            this.sociosList.length = response.data
          })
      },
      deleteSocio(id) {
        let confirm = window.confirm('Esta seguro que desea eliminar este cliente?')
        if (confirm) {
          this.$axios.delete('/socios/' + id)
            .then(response => {
              this.getSocios()
            })
        }
      },
      payServices() {
        this.dataPayment.client.payment_date = moment(this.dataPayment.client.payment_date || new Date()).add(this
          .dataPayment.months, 'months').format('YYYY-MM-DD')
        this.$axios.put(`/socios/${this.dataPayment.client.id}`, this.dataPayment.client).then(response => {
          this.openModalPaymentServices = false;
          this.openAlertPayment = false
          this.getSocios();
        })
      }
    },
    watch: {}
  }

</script>

<style>

</style>
