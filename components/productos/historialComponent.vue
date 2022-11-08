<template>
  <div>
    <generalCardComponent>
      <v-card-title>
        <v-input>
          <formsFieldsTextComponent placeholder="Buscar producto" class="rounded-r-0"  dense hide-details height="40"
            v-model="search.nombre_contains"></formsFieldsTextComponent>
          <v-btn depressed height="40" color="primary" class="rounded-l-0" @click="getProducts()">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-input>
      </v-card-title>
      <v-card-text class="font-weight-light">
        <v-data-table :headers="headers" :items="products" hide-default-footer>
          <template v-slot:item.ver_historial={item} depressed>
            <v-btn color="primary" @click="getHistorial(item)" depressed>Ver historial</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </generalCardComponent>
    <v-dialog v-model="openModalProduct" persistent>
      <generalCardComponent >
        <v-toolbar color="primary" class="elevation-0">
          <v-toolbar-title class="font-weight-light white--text">
           Historial del producto
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="openModalProduct = false" class="white--text">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-data-table :headers="headersHistorial" hide-default-footer :items="historialProductos">
              <template v-slot:item.producto.precio_unidad = {item}>
                  $ {{item.producto.precio_unidad}}
              </template>
              <template v-slot:item.total = {item}>
                  $ {{item.total}}
              </template>

              <template v-slot:item.fecha = {item}>
                  {{formatDate(item.fecha)}}
              </template>
          </v-data-table>
        </v-card-text>
      </generalCardComponent>
    </v-dialog>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        search: {},
        products: [],
        product: {},
        headers: [{
          text: 'Nombre',
          value: 'nombre'
        },{
          text: 'Ver historial',
          value: 'ver_historial',
          align: 'right'
        }],
        headersHistorial: [{
          text: 'Fecha',
          value: 'fecha'
        }, {
          text: 'Precio',
          value: 'producto.precio_unidad'
        }, {
          text: 'Cantidad',
          value: 'producto.cantidad'
        }, {
          text: 'Precio total',
          value: 'total'
        }, {
          text: 'Distribuidor',
          value: 'distribuidor.nombre'
        }],
        historialProductos: [],
        openModalProduct: false
      }
    },
    created() {
      this.getProducts()
    },
    methods: {
      getProducts() {
        this.$axios.get('/productos', {
          params: this.search
        }).then(response => {
          response.data.filter((value) => {
            if (this.products.find(product => product.nombre === value.nombre)) {
              console.log("aca")
              return false;
            }
            this.products.push(value)
          });
        });
      },
      getHistorial(product) {
          this.openModalProduct = true
        this.$axios.get('/compras-mercaderias?productos.producto='+product.id).then(response => {
            this.historialProductos = response.data.map((d)=>{
              d.producto = d.productos.find((p)=>p.producto = product.id)
              return d
            })
        });
      },
      formatDate(date) {
        return moment(date).format('DD/MM/YYYY')
      },

    }
  }

</script>

<style>

</style>
