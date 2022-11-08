<template>
  <generalCardComponent class="rounded-xl">
    <generalCardTitleComponent class="white--text">Mis ventas</generalCardTitleComponent>
    <v-divider></v-divider>
    <v-card-title>
      <v-row>
        <v-col class="col-12 col-md-10">
          <formsFieldsTextComponent type="number" v-model="search.codigo" solo dense label="Codigo de venta" class="rounded-lg"></formsFieldsTextComponent>
        </v-col>
        <v-col class="col-12 col-md-2 d-flex align-end">
          <v-btn color="secondary" class="rounded-lg black--text" @click="getVentas()" height="40" block>
            Buscar&nbsp;&nbsp;<v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <generalCardComponent  class="rounded-xl">
        <v-card-text>
          <v-data-table hide-default-footer :headers="headers" :items="ventas" :items-per-page="-1">
            <template v-slot:item.cliente="{ item }">
              {{item.cliente.nombre}} {{item.cliente.nombre}}
            </template>
            <template v-slot:item.total="{ item }">
              ${{checkTotal(item.productos)}}
            </template>

          </v-data-table>
        </v-card-text>
      </generalCardComponent>
    </v-card-text>
  </generalCardComponent>
</template>

<script>
  import moment from 'moment';
  export default {
    data() {
      return {
        ventas: [],
        headers: [{
          'text': 'Codigo',
          'value': 'codigo'
        }, {
          'text': 'Tipo',
          'value': 'tipo'
        }, {
          'text': 'Cliente',
          'value': 'cliente'
        }, {
          'text': 'Fecha',
          'value': 'fecha'
        }, {
          'text': 'Total',
          'value': 'total'
        }, {
          'text': 'Acciones',
          'value': 'actions',
          align: 'right'
        }],
        search: {},
        clientsList:[],
        isLoading: false,

      }
    },
    created(){
      this.getVentas()
    },
    mounted(){
      this.$root.$on('generatedSale',()=>{
        this.getVentas()
      })
    },
    methods: {
      checkTotal(productos) {
        return productos.reduce((a, b) => {
          return a + b.precio
        }, 0)
      },
      getVentas() {
        if(this.search.codigo == '') {
          this.$delete(this.search,'codigo')
        }
        this.search.fecha_lte = moment().format('YYYY-MM-DD')
        this.$axios.get('/ventas',{
          params:{
            ...this.search,
            _sort:'fecha:desc'
          }
        })
          .then(response => {
            this.ventas = response.data
          })
      }
    },

  }

</script>
