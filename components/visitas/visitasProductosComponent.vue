<template>
  <div>
    <generalCardComponent >
      <v-card-title class="font-weight-light">
        Vacunas
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="vacunasHeaders" :items="vacunasList" hide-default-footer>
          <template v-slot:item.actions="{ item }">
              <v-btn block   @click="addProduct(item)">Agregar</v-btn>
          </template>
        </v-data-table>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-title class="font-weight-light">
        Productos de la consulta
        <v-spacer></v-spacer>
        <v-btn  color="primary" @click="modalProductos = true"  v-if="!readonly">
          AGREGAR PRODUCTO&nbsp;<v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="value" hide-default-footer>
          <template v-slot:item.descripcion="{ item }">
            <formsFieldsTextComponent dense  hide-details v-model="item.descripcion"></formsFieldsTextComponent>
          </template>
          <template v-slot:item.observacion="{ item }">
            <formsFieldsTextComponent dense  hide-details v-model="item.observacion"></formsFieldsTextComponent>
          </template>
          <template v-slot:item.precio="{ item }">
            <formsFieldsTextComponent dense  type="number" hide-details v-model="item.precio"></formsFieldsTextComponent>
          </template>
          <template v-slot:item.cant="{ item }">
            <formsFieldsTextComponent dense  type="number" hide-details v-model="item.cant"></formsFieldsTextComponent>
          </template>
          <template v-slot:item.total="{ item }">
            $ {{(item.cant && item.precio) ? item.cant*item.precio : 0}}
          </template>
          <template v-slot:item.delete="{ item }">
            <v-btn small color="red" @click="deleteProduct(item)" v-if="!readonly">
              <v-icon color="white">mdi-delete</v-icon>
            </v-btn>
          </template>


        </v-data-table>
      </v-card-text>

    </generalCardComponent>
    <v-dialog v-model="modalProductos" width="60%">
      <generalCardComponent>
        <v-card-title class="font-weight-light">
          Productos
          <v-spacer></v-spacer>
          <v-btn icon @click="modalProductos = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-data-table :headers="headersProductos" :items="listProductos" hide-default-footer>
            <template v-slot:item.add="{ item }">
              <v-btn  @click="addProduct(item)">Agregar</v-btn>
            </template>

          </v-data-table>
        </v-card-text>
      </generalCardComponent>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      readonly:{
        default:false
      },
      value: Array
    },
    data() {
      return {
        productos: this.value,
        headers: [{
          value: 'producto.nombre',
          text: 'Producto'
        }, {
          value: 'descripcion',
          text: 'Descripcion'
        }, {
          value: 'observacion',
          text: 'Observacion'
        }, {
          value: 'precio',
          text: 'Precio'
        }, {
          value: 'cant',
          text: 'Cantidad'
        }, , {
          value: 'total',
          text: 'Total'
        }, {
          value: 'delete',
          text: 'Eliminar'
        }],
        headersProductos: [{
          value: 'nombre',
          text: 'Nombre'
        }, {
          value: 'comentarios',
          text: 'Descripcion'
        }, {
          value: 'add',
          text: 'Agregar',
          align: 'right'
        }],
        listProductos: [],
        vacunasHeaders: [{
          value: 'nombre',
          text: 'Producto'
        }, {
          value: 'precio_final',
          text: 'Precio'
        }, {
          value: 'cantidad',
          text: 'Cantidad'
        }, {
          value: 'actions',
          text: 'Agregar'
        }],
        vacunasList: [],
        modalProductos: false
      }
    },
    created() {
      this.getProductos()
    },
    methods: {
      async getProductos() {
        var vm = this
        const getProducts = async function (params = {}) {
          return (await vm.$axios.get('/productos', {params : params})).data
        }
        this.listProductos = await getProducts()
        this.vacunasList = await getProducts({
          codigo_in: ['0002','0001'],
        })
      },
      addProduct(product) {
        console.log(product)
        this.$set(this.productos, this.productos.length, {
          producto: product,
          precio: product.precio_final,
          cant: 1,
          total: product.precio,
          id: product.id
        });
        this.modalProductos = false;
      },
      deleteProduct(item) {
        this.productos = this.productos.filter(producto => producto.id != item.id)
      }
    },
    watch: {
      productos(val) {
        if (val != undefined)
          this.$emit('input', val)
      }
    },
  }

</script>
