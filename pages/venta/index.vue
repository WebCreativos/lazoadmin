<template>
  <v-container fluid>
    <headersGeneralComponent>
      <template v-slot:icon>
        <img src="/icons/cart.png" alt="icono" width="30" />
      </template>
      <template v-slot:title>
        Ventas
      </template>
    </headersGeneralComponent>

    <v-row>
      <v-col class="col-12">
        <generalCardComponent class="rounded-xl">
          <generalCardTitleComponent class="white--text">Nueva venta</generalCardTitleComponent>
          <v-form ref="form">
            <v-card-text>
              <generalCardComponent outlined>
                <generalCardTitleComponent color="transparent" class="black--text text-subtitle-2 font-weight-regular">
                  <span class="text-subtitle-1 font-weight-regular">Datos de la factura</span>

                </generalCardTitleComponent>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col class="col-md-10">
                      <v-row>
                        <!--
                    <v-col class="col-12 col-md-3">
                      <formsFieldsSelectComponent :items="[{text:'Si',value:false},{text:'No',value:true}]" :rules="rules.required" dense
                         label="Cliente activo" class="font-weight-light" v-model="cliente_activo"></formsFieldsSelectComponent>
                    </v-col>
                    -->
                        <v-col class="col-12 col-md-6">
                          <v-menu ref="menu" class="calendar" v-model="menu" transition="scale-transition" offset-y
                            min-width="290px" :close-on-content-click="false">
                            <template v-slot:activator="{ on }">
                              <div v-on="on" style="cursor:pointer">
                                <formsFieldsTextComponent dense class="selectInput font-weight-light"
                                  label="Seleccione una fecha" :rules="rules.required" :value="formatDate()"
                                  append-icon="mdi-calendar" readonly placeholder="DATE" height="10">
                                </formsFieldsTextComponent>
                              </div>
                            </template>
                            <generalCardComponent>
                              <v-date-picker v-model="venta.fecha" no-title scrollable class="elevation-0">
                              </v-date-picker>
                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.menu.save(menu)">OK</v-btn>
                              </v-card-actions>
                            </generalCardComponent>
                          </v-menu>
                        </v-col>
                        <v-col class="col-md-6">
                          <formsFieldsSelectComponent dense
                            :items="['Efectivo','Factura','Boleta',{value:'NotaCredito',text:'Nota de credito'},{value:'NotaDebito',text:'Nota de debito'}]"
                            :rules="rules.required" v-model="venta.tipo" label="Tipo"></formsFieldsSelectComponent>
                        </v-col>
                        <v-col class="col-md-6">
                          <formsFieldsTextComponent label="Numero de factura (Manual)" dense v-model="venta.codigo"
                            type="number"></formsFieldsTextComponent>
                        </v-col>
                        <v-col class="col-md-6">
                          <formsFieldsTextComponent label="Vendedor" dense v-model="venta.vendedor" type="text">
                          </formsFieldsTextComponent>
                        </v-col>

                      </v-row>
                    </v-col>
                    <v-col class="col-12 col-md-2 d-flex justify-center align-center">
                      <v-btn large fab color="rounded-lg success darken-1" @click="createVenta()">
                        <v-icon>mdi-cart</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </generalCardComponent>
            </v-card-text>
            <v-card-text>
              <generalCardComponent outlined>
                <generalCardTitleComponent color="transparent" class="black--text">
                  <span class="text-subtitle-1 font-weight-regular">Datos del cliente</span>
                </generalCardTitleComponent>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col class="col-12">
                      <SociosFindSociosComponent v-model="findedClient"></SociosFindSociosComponent>
                    </v-col>
                    <v-col class="col-md-12 col-12">
                      <formsFieldsTextComponent label="Nombre" v-model="venta.cliente.nombre">
                      </formsFieldsTextComponent>
                    </v-col>
                    <v-col class="col-md-12 col-12">
                      <formsFieldsTextComponent label="Direccion" v-model="venta.cliente.direccion">
                      </formsFieldsTextComponent>
                    </v-col>

                  </v-row>
                </v-card-text>
              </generalCardComponent>
            </v-card-text>
          </v-form>
          <v-card-text>
            <generalCardComponent outlined>
              <generalCardTitleComponent color="transparent" class="black--text">
                <span class="text-subtitle-1 font-weight-regular">Articulos</span>
              </generalCardTitleComponent>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col class="col-12">
                    <v-row>
                      <v-col class="col-md-12 col-12">
                        <v-input>
                          <v-text-field hide-details solo filled readonly label="Articulo" prepend-inner-icon="mdi-cart"
                            v-model="producto.nombre" class="rounded-r-0" dense>
                          </v-text-field>
                          <v-btn class="rounded-l-0 rounded-r-lg" height="40" color="secondary"
                            @click="showProductsModal = true">
                            <v-icon color="black">mdi-magnify</v-icon>
                          </v-btn>
                        </v-input>
                      </v-col>
                      <v-col>
                        <v-input :disabled="producto.tipo != 'producto'">
                          <div class="d-flex flex-column">
                          <div class="mb-2">
                            <label
                              class="font-weight-regular mb-4 text-uppercase text-subtitle-2 black--text">CANTIDAD</label>
                          </div>
                          <div class="d-flex">
                            <v-text-field type="number" solo readonly hide-details v-model="producto.cantidad"
                              class="rounded-r-0" prepend-inner-icon="mdi-format-list-bulleted" dense>
                            </v-text-field>
                            <v-btn :disabled="producto.cantidad <=1 || producto.cantidad == undefined" @click="()=>{
                              producto.cantidad--
                            }" class="rounded-r-0 rounded-l-0" height="40" color="warning">
                              <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            <v-btn :disabled="producto.cantidad == undefined" @click="()=>{
                              producto.cantidad++
                            }" class="rounded-l-0 rounded-r-lg" height="40" color="success">
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                          </div>
                          </div>
                        </v-input>
                      </v-col>
                      <v-col>
                        <formsFieldsTextComponent type="number" :readonly="producto.descuento == undefined"
                          v-model="producto.descuento" prepend-inner-icon="mdi-percent" label="Descuento" dense>
                        </formsFieldsTextComponent>
                      </v-col>
                      <v-col>
                        <formsFieldsTextComponent v-model="producto.precio" filled
                          :readonly="producto.tipo != 'consulta'" prepend-inner-icon="mdi-currency-usd"
                          label="Precio unidad" dense></formsFieldsTextComponent>
                      </v-col>
                      <v-col class="col-md-12 col-12">
                        <v-btn block color="gd-primary-to-right" class="rounded-lg  font-weight-light white--text"
                          @click="addProduct()" height="40" :disabled="producto.nombre == undefined">
                          Agregar a la venta&nbsp;&nbsp;<v-icon>mdi-cart-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>

                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                <generalCardComponent outlined>
                  <v-card-text>
                    <v-data-table hide-default-footer :headers="headers" :items="venta.productos">
                      <template v-slot:item.precio="{ item }">
                        $ {{item.precio}}
                      </template>
                      <template v-slot:item.descuento="{ item }">
                        {{item.descuento}} %
                      </template>

                      <template v-slot:item.total="{ item }">
                        $ {{checkTotal(item)}}
                      </template>
                      <template v-slot:item.actions="{ item, index }">
                        <v-btn @click="removeProduct(index)" class="rounded-lg white--text font-weight-light"
                          color="red">
                          QUITAR&nbsp;&nbsp;<v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>

                    </v-data-table>
                  </v-card-text>
                </generalCardComponent>
              </v-card-text>
            </generalCardComponent>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

          </v-card-actions>
        </generalCardComponent>
      </v-col>
      <v-col class="col-12">
        <ventasListComponent v-if="showVentasList" v-model="ventas"></ventasListComponent>
      </v-col>
    </v-row>

    <v-dialog v-model="showProductsModal" persistent fullscreen>
      <generalCardComponent min-width="90vw" class="rounded-xl">
        <v-toolbar color="gd-primary-to-right" class="elevation-0">
          <v-toolbar-title class="white--text font-weight-light">Agregar a la venta</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" @click="showProductsModal = false" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-3">
          <productosListComponent>
            <template v-slot:button="{ item }">
              <v-btn class="rounded-lg" color="success darken-1 font-weight-light" @click="setItem(item, 'producto')">
                <span>Seleccionar producto</span>
                <v-icon>mdi-cart-plus</v-icon>
              </v-btn>
            </template>
          </productosListComponent>
        </v-card-text>
        <v-card-text class="mt-3">
          <visitasListComponent>
            <template v-slot:title>
              Consultas pendientes de pago
            </template>
            <template v-slot:button="{ item }">
              <v-btn class="rounded-lg" color="success darken-1 font-weight-light" @click="setItem(item, 'consulta')">
                <span>Seleccionar consulta</span>
                <v-icon>mdi-cart-plus</v-icon>
              </v-btn>
            </template>

          </visitasListComponent>
        </v-card-text>
        <v-card-text class="mt-3">
          <visitasListComponent estado="Finalizada">
            <template v-slot:title>
              Consultas Finalizadas
            </template>
          </visitasListComponent>
        </v-card-text>

      </generalCardComponent>
    </v-dialog>
    <modal-success :action="()=>{
      this.createVentaModal = false
      }" v-model="createVentaModal">
      <template v-slot:icon>
        mdi-check
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>Venta registrada correctamente!</strong>
        </p>
      </template>
    </modal-success>

  </v-container>
</template>

<script>
  import moment from 'moment'
  import ventasListComponent from '~/components/ventas/ventasListComponent.vue'
  import visitasListComponent from '~/components/visitas/visitasListComponent.vue'
  export default {
    components: {
      ventasListComponent,
      visitasListComponent,
    },
    data() {
      return {
        venta: {
          tipo: 'Efectivo',
          cliente: {},
          productos: []
        },
        rules: {
          required: [value => !!value || 'Este campo es requerido'],
        },
        ventas: [],
        producto: {},
        findedClient: Number,
        cliente_activo: null,
        search: {},
        headers: [{
            text: 'COD',
            align: 'left',
            value: 'codigo'
          }, {
            text: 'Articulo',
            align: 'left',
            value: 'nombre'
          },
          {
            text: 'Precio',
            align: 'left',
            value: 'precio'
          },
          {
            text: 'Cantidad',
            align: 'left',
            value: 'cantidad'
          },
          {
            text: 'Descuento',
            align: 'left',
            value: 'descuento'
          },
          {
            text: 'Total',
            align: 'left',
            value: 'total'
          }, {
            text: 'Acciones',
            align: 'right',
            value: 'actions'
          }
        ],
        referenciaConsulta: '',
        headersProducts: [{
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
        showProductsModal: false,
        showVentasList: true,
        createVentaModal: false,
        menu: false
      }
    },
    mounted() {},
    methods: {
      formatDate() {
        if (this.venta.fecha)
          return moment(this.venta.fecha).format('DD/MM/YYYY')
        return ""
      },
      setItem(item, tipo) {



        if (tipo == 'consulta') {
          this.producto = {
            nombre: 'Consulta',
            precio: (item.con_costo) ? item.costo : 'Sin costo',
            cantidad: 1,
            descuento: 0,
            tipo: tipo,
            codigo: 'C' + item.id,
            productos: item.productos,
            item: item
          }
          if (item.socio) {
            this.venta.cliente.nombre = item.socio.name
            this.venta.cliente.direccion = item.socio.address
          }
          if (item.referencias_caja) {
            this.referenciaConsulta = item.referencias_caja
          }
        } else {
          this.producto = {
            nombre: item.nombre,
            precio: item.precio_final,
            cantidad: 1,
            descuento: 0,
            tipo: tipo,
            codigo: 'P' + item.id

          }
        }
        this.showProductsModal = false
      },
      checkTotal(item) {
        if (!item.con_costo && item.tipo == 'consulta') return 'Sin costo'
        return Math.round((item.precio * item.cantidad) - (item.precio * item.cantidad) * (item.descuento / 100))
      },
      addProduct() {
        this.$set(this.venta.productos, this.venta.productos.length, this.producto)
        if (this.producto.tipo == 'consulta') {
          this.producto.productos.filter((item) => {
            console.log(item)
            this.$set(this.venta.productos, this.venta.productos.length, {
              nombre: item.producto.nombre,
              precio: item.precio * item.cant,
              cantidad: 1,
              descuento: 0,
              tipo: 'producto',
              codigo: 'C' + item.id,
            })
          })
        }
        this.producto = {}
      },
      removeProduct(index) {
        this.$delete(this.venta.productos, index)
      },
      createVenta() {
        if (!this.$refs.form.validate() && this.venta.productos.length == 0) return
        if (this.venta.tipo == 'Efectivo') {
          let c = confirm("Esta seguro que desea agregar venta?")
          if (!c) return
          this.venta.productos.filter(async (pr) => {
            if (pr.tipo == 'consulta') {
              let cons = pr.item
              cons.estado = 'Finalizada'
              await this.$axios.put(`/atencion/${pr.item.id}`, cons)
            }
          })
        }
        this.$axios.post('/ventas', this.venta)
          .then(() => {
            this.showVentasList = false
            this.venta = {
                cliente: {},
                productos: []
              },
              this.$root.$emit('generatedSale');
            setTimeout(() => {
              this.showVentasList = true
            }, 500);
          })
      },
      getSocios(val) {
        this.$axios.get(`/socios/${val}`)
          .then(data => {
            this.findedClient = data.data
          })
          .catch(error => {
            console.log(error)
          })
      },
    },
    watch: {
      findedClient(val) {
        this.venta.cliente.direccion = val.address
        this.venta.cliente.nombre = val.name
        this.getSocios(val)
      }
    }
  }

</script>

<style lang="scss">
  .input-socio {
    border: none !important;

    input {
      ::placeholder {
        color: #fff !important;
      }

      color:white !important
    }
  }

</style>
