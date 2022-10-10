<template>
  <v-card class="rounded-xl" :height="height">
    <v-toolbar elevation="0" :color="color">
      <v-toolbar-title class="font-weight-light" :class="{'white--text':color!='transparent','black--text':color=='transparent'}">
        {{title}}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="teal darken-4" class="white--text rounded-lg font-weight-light mr-2">
        Escanear codigo
        &nbsp;&nbsp;
        <v-icon>mdi-barcode</v-icon>
      </v-btn>
      <slot name="headerButtons"></slot>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-title>
      <v-row>
        <v-col class="col-md-10">
          <v-text-field solo dense v-model="search.search" label="Buscar producto (Nombre, Codigo)">
          </v-text-field>
        </v-col>
        <v-col class="col-md-2">
          <v-btn block color="teal darken-4" @click="getProducts()"
            class="white--text rounded-lg font-weight-light">
            Buscar&nbsp;<v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="mt-4 mb-4">
      <v-card outlined class="rounded-xl">
        <v-data-table hide-default-footer :headers="headers" :items="productos">
          <template v-slot:item.precio_unidad="{ item }">
            $ {{item.precio_unidad}}
          </template>

          <template v-slot:item.actions="{ item }">
            <slot name="button" :item="item"></slot>
          </template>
        </v-data-table>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props:{
      color:{
        type:String,
        default: 'transparent'
      },
      title:{
        type:String,
        default: 'Productos'
      },
      height:{
        type:String,
        default: 'auto'
      }
    },
    data() {
      return {
        headers: [{
          text: 'Codigo',
          value: 'codigo'
        }, {
          text: 'Nombre',
          value: 'nombre'
        }, {
          text: 'Precio',
          value: 'precio_unidad'
        }, {
          text: 'Acciones',
          value: 'actions',
          align: 'right'
        }],
        productos: [],
        search: {}

      }
    },
    created() {
      this.getProducts()
    },
    methods: {
      getProducts() {
        var query = '';
        if (this.search.search) {
          query =
            `_where[_or][0][nombre_contains]=${this.search.search}&_where[_or][1][id_contains]=${this.search.search}`
        }
        console.log(query)
        this.$axios.get(`/productos?${query}`)
          .then((data) => {
            this.productos = data.data
          })
      }
    }
  }

</script>
