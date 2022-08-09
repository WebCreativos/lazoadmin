<template>
  <v-card class="rounded-xl">
    <v-toolbar color="gd-primary-to-right" class="elevation-0">
      <v-toolbar-title class="white--text font-weight-light">Mis ventas</v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-title>
      <v-row>
        <v-col class="col-12 col-md-10">
          <v-text-field type="number" v-model="search.codigo" solo dense label="Codigo de venta" class="rounded-lg"></v-text-field>
        </v-col>
        <v-col class="col-12 col-md-2">
          <v-btn class="gd-primary-to-right rounded-lg white--text font-weight-light" @click="getVentas()" height="40" block>
            Buscar&nbsp;&nbsp;<v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-card outlined class="rounded-xl">
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
      </v-card>
    </v-card-text>
  </v-card>
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
