<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12">
        <ProductosListComponent color="teal darken-4">
          <template v-slot:headerButtons>
            <v-btn color="teal darken-4" class="rounded-lg white--text font-weight-light" to="/productos">
              AGREGAR PRODUCTO
            </v-btn>
            &nbsp;&nbsp;
            <v-btn color="teal darken-4" class="rounded-lg white--text font-weight-light mr-2"
              @click="openModalHistorial = true">
              Ver historial de productos
            </v-btn>
            <v-btn color="teal darken-4" class="rounded-lg white--text font-weight-light"
              @click="compraModal = true">
              COMPRA DE MERCADERIA
            </v-btn>
          </template>
          <template v-slot:button="{ item }">
            <v-btn :to="`/productos/editar/${item.id}`" color="teal darken-4"
              class="rounded-lg white--text font-weight-light">Editar</v-btn>
          </template>
        </ProductosListComponent>

      </v-col>
      <v-col class="col-12">
        <productosComprasListComponent></productosComprasListComponent>
      </v-col>
    </v-row>
    <v-dialog v-model="openModalHistorial" persistent width="600">
      <v-toolbar color="teal darken-4" class="elevation-0">
        <v-toolbar-title class="font-weight-light white--text">
          Historial de productos
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="openModalHistorial = false">
          <v-icon class="font-weight-light white--text">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <ProductosHistorialComponent></ProductosHistorialComponent>
    </v-dialog>
    <productosCompraMercaderiaComponent v-model="compraModal"></productosCompraMercaderiaComponent>
  </v-container>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        openModalHistorial: false,
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
          text: 'Distribuidor',
          value: 'distribuidor'
        }, {
          text: 'Editar',
          value: 'editar',
          align: 'right'
        }],
        products: [],
        compra: {},
        compraModal: false
      }
    },
    created() {
      this.getProducts();
    },
    methods: {
      getProducts() {
        this.$axios.get('/productos').then(response => {
          this.products = response.data;
        });
      }
    }
  }

</script>

<style>

</style>
