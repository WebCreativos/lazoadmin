<template>
  <div>
    <v-card class="rounded-xl">
      <v-toolbar elevation="0" color="teal darken-4">
        <v-toolbar-title class="font-weight-light white--text">
          Compras de mercaderia
        </v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table :headers="headers" :items="compras" hide-default-footer>
          <template v-slot:item.entrega="{ item }">
            $ {{ item.entrega }}
          </template>

          <template v-slot:item.total="{ item }">
            $ {{ item.total }}
          </template>
          <template v-slot:item.apagar="{ item }">
            $ {{ item.total - item.entrega }}
          </template>

          <template v-slot:item.actions="{ item }">
            <v-btn small color="teal darken-4" @click="openModalProducts(item)"
              class="white--text font-weight-light rounded-lg">
              <v-icon>mdi-magnify</v-icon> Ver compra
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <v-dialog persistent v-model="productosCompraModal">
      <v-card class="rounded-xl">
        <v-toolbar color="teal darken-4" class="elevation-0">
          <v-toolbar-title class="font-weight-light white--text">
            Detalles de la compra
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="productosCompraModal = false">
            <v-icon class="font-weight-light white--text">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-3">
          <v-row>
            <v-col class="col-12 col-md-6">
              <v-text-field label="Nro de factura" dense hide-details :value="compra.nrofactura" outlined readonly>
              </v-text-field>
            </v-col>
            <v-col class="col-12 col-md-6">
              <v-text-field label="Distribuidor" dense hide-details :value="compra.distribuidor.nombre" outlined readonly>
              </v-text-field>
            </v-col>
            <v-col class="col-12 col-md-6">
              <v-text-field type="number" label="Total" prepend-inner-icon="mdi-currency-usd" dense hide-details
                :value="compra.total" outlined readonly>
              </v-text-field>
            </v-col>
            <v-col class="col-12 col-md-6">
              <v-input>
                <v-text-field type="number" class="rounded-r-0" label="Monto entregado"
                  prepend-inner-icon="mdi-currency-usd" dense hide-details v-model="compra.entrega" outlined>
                </v-text-field>
                <v-btn class="font-weight-light rounded-l-0 white--text" height="40" color="teal darken-4"
                  @click="updateProduct()" depressed>
                  Actualizar&nbsp;<v-icon>mdi-save</v-icon>
                </v-btn>
              </v-input>
            </v-col>
            <v-col class="col-12">
              <v-card class="rounded-xl" outlined>
                <v-toolbar elevation="0" color="teal darken-4">
                  <v-toolbar-title class="font-weight-light white--text">
                    Productos
                  </v-toolbar-title>
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text>
                  <v-data-table :headers="headersProductos" :items="compra.productos" hide-default-footer>
                    <template v-slot:item.precio_unidad="{ item }">
                      $ {{item.precio_unidad}}
                    </template>
                    <template v-slot:item.total="{ item }">
                      ${{setTotal(item)}}
                    </template>
                  </v-data-table>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class=" pa-4">
                    <v-spacer></v-spacer>
                    <h2 class="font-weight-light">Total a pagar: <span>$ {{compra.total - compra.entrega}}</span></h2>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
    <modal-success :action="()=>{
      this.$emit('input', false);
      this.successEditCompra = false
      }" v-model="successEditCompra">
      <template v-slot:icon>
        mdi-check
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>Monto actualizado correctamente!</strong>
        </p>
      </template>
    </modal-success>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        compras: [],
        compra: {
            distribuidor:{

            }
        },
        productosCompraModal: false,
        successEditCompra: false,
        headers: [{
            text: 'Nro de factura',
            value: 'nrofactura'
          },
          {
            text: 'Distribuidor',
            value: 'distribuidor.nombre'
          },
          {
            text: 'Fecha',
            value: 'fecha'
          },
          {
            text: 'Total',
            value: 'total'
          },
          {
            text: 'Monto entregado',
            value: 'entrega'
          },
          {
            text: 'A pagar',
            value: 'apagar'
          },
          {
            text: 'Acciones',
            value: 'actions'
          }
        ],
        headersProductos: [{
            text: 'Codigo',
            value: 'codigo'
          },
          {
            text: 'Nombre',
            value: 'producto.nombre'
          },
          {
            text: 'Precio',
            value: 'precio_unidad'
          },
          {
            text: 'Cantidad',
            value: 'cantidad'
          },
          {
            text: 'Total',
            value: 'total'
          }
        ],

      }
    },
    created() {
      this.getCompras()
    },
    mounted() {
        this.$root.$on('updateCompras',()=>{
            this.getCompras()
        })
    },
    methods: {
      getCompras() {
        this.$axios.get('/compras-mercaderias').then(response => {
          this.compras = response.data;
        });
      },
      openModalProducts(item) {
        this.compra = item;
        this.productosCompraModal = true;
      },
      updateProduct() {
        this.$axios.put('/compras-mercaderias/' + this.compra.id, this.compra).then(response => {
          this.successEditCompra = true;
        });
      },
      setTotal(item) {
        return Math.round(item.precio_unidad * item.cantidad);
      }
    }
  }

</script>

<style>

</style>
