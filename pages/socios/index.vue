<template>
  <v-container fluid>
    <SociosListSociosComponent @changePage="getSocios($event)" v-model="sociosList">
      <template v-slot:extraFields>
        <v-row>
          <v-col class="col-md-11 col-sm-10 col-12">
            <SociosFindSociosComponent v-model="search.name_contains"></SociosFindSociosComponent>

          </v-col>
          <v-col class="col-md-1 col-sm-2 col-12">
            <v-switch
            class="mt-0"
            hide-details
      v-model="search.old_client"
      default="false"
      label="C. antiguo"
    ></v-switch>
          </v-col>
        </v-row>
      </template>
      <template v-slot:buttonTitle>
        <v-btn to="/socios/registro" class="font-weight-light rounded-lg white--text" color="gd-primary-to-right">
          AGREGAR SOCIO
        </v-btn>
      </template>
      <template v-slot:button="{ item }">
        <v-btn class="gd-primary-to-right font-weight-light rounded-lg white--text" @click="()=>{
          openModalPaymentServices = true;
          dataPayment.client = item
          }" color="primary">
          VALIDAR PAGO
        </v-btn>
        <v-btn class="gd-primary-to-right font-weight-light rounded-lg white--text" :to="`/socios/editar/${item.id}`"
          color="primary">
          EDITAR
        </v-btn>
        <v-btn class="font-weight-light rounded-lg white--text" color="red" @click="deleteSocio(item.id)">
          ELIMINAR
        </v-btn>
      </template>
    </SociosListSociosComponent>
    <v-dialog v-model="openModalPaymentServices">
      <v-card width="600">
        <v-toolbar color="gd-primary-to-right font-weight-light" elevation="0">
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
          <v-btn color="gd-primary-to-right" class="font-weight-light white--text rounded-lg"
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
          _sort:'id:desc',
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
        let search = `?_start=${(page - 1) * 25}&_limit=${page * 25}&_sort=id:desc`;
        this.sociosList.data = []
        this.sociosList.length = 0
        console.log(search)
        if(this.search.name_contains) {
          search = `${search}&_where[_or][0][name_contains]=${this.search.name_contains}&_where[_or][1][last_name_contains]=${this.search.name_contains}&_where[_or][2][address_contains]=${this.search.name_contains}&_where[_or][3][user.username_contains]=${this.search.name_contains}`
        }
        await this.$axios.get('/socios' + search)
          .then(response => {
            console.log(response)
            this.sociosList.data = response.data
          })

        await this.$axios.get('/socios/count',{params: this.search})
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
        this.dataPayment.client.payment_date = moment(this.dataPayment.client.payment_date ?? new Date()).add(this.dataPayment.months, 'months').format('YYYY-MM-DD')
        this.$axios.put(`/socios/${this.dataPayment.client.id}`, this.dataPayment.client).then(response => {
          this.openModalPaymentServices = false;
          this.openAlertPayment = false
          this.getSocios();
        })
      }
    },
    watch: {
      search: {
        handler() {
          this.getSocios()
        },
        deep: true
      },
    }
  }

</script>

<style>

</style>
