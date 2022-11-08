<template>
  <v-dialog v-model="value" fullscreen>
    <v-toolbar elevation="0" color="gd-primary-to-right">
      <v-toolbar-title class="white--text font-weight-light">COMPRA DE MERCADERIA</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon color="white" @click="$emit('input', false)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <generalCardComponent flat>
      <v-card-text>

        <v-row class="mb-3">
          <v-col class="col-md-12 col-12">
            <generalCardComponent class="rounded-xl">
              <v-toolbar elevation="0" color="primary">
                <v-toolbar-title class="font-weight-light white--text">
                  Seleccione el distribuidor
                </v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                <productosCreateDistribuidoresComponent v-model="compra.distribuidor">
                </productosCreateDistribuidoresComponent>
              </v-card-text>
            </generalCardComponent>
          </v-col>
          <v-col class="col-md-6 col-12">
            <generalCardComponent class="rounded-xl" height="330">
              <v-toolbar elevation="0" color="primary" class="mt-2">
                <v-toolbar-title class="font-weight-light white--text">
                  Datos de la factura
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-row>
                  <v-col class="col-md-6 col-12">
                    <formsFieldsTextComponent
                      label="Número de factura"
                      dense
                      v-model="compra.nrofactura"
                      
                    ></formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-md-6 col-12">
                    <formsFieldsTextComponent
                      label="Fecha de factura"
                      dense
                      type="date"
                      :rules="[(v) => !!v || 'Fecha de factura es requerida']"
                      v-model="compra.fecha"
                      
                    ></formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-md-6 col-12">
                    <formsFieldsTextComponent
                      label="Total"
                      dense
                      type="number"
                      v-model="compra.total"
                      
                    ></formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-md-6 col-12">
                    <formsFieldsTextComponent
                      label="Monto entregado"
                      dense
                      type="number"
                      v-model="compra.entrega"
                      
                    ></formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-md-12 col-12">
                    <formsFieldsSelectComponent
                      label="Iva incluido"
                      dense
                      :items="[{text:'Si',value:true},{text:'No',value:false}]"
                      v-model="compra.iva_incluido"
                      
                    ></formsFieldsSelectComponent>
                  </v-col>

                </v-row>
              </v-card-text>
            </generalCardComponent>
          </v-col>
          <v-col class="col-md-6 col-12"> 
            <ProductosListComponent color="primary" height="340" title="Seleccione los productos">
              <template v-slot:button="{ item }">
                <v-btn @click="setItem(item)" v-if="!selectedItem(item)" color="gd-primary-to-right"
                  class="rounded-lg white--text font-weight-light">SELECCIONAR</v-btn>
                <v-btn @click="removeItem(item)" v-else color="red" class="rounded-lg white--text font-weight-light">
                  ELIMINAR&nbsp;
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
            </ProductosListComponent>

          </v-col>
          <v-col class="col-12 col-md-12">
            <generalCardComponent class="rounded-xl">
              <v-toolbar elevation="0" color="primary">
                <v-toolbar-title class="font-weight-light white--text">
                  Compras de mercaderia
                </v-toolbar-title>
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                <v-data-table :headers="filterHeaders" :items="compra.productos" hide-default-footer>
                  <template v-slot:item.precio_unidad="{ item }">
                    <formsFieldsTextComponent type="number"  dense hide-details v-model="item.precio_unidad"></formsFieldsTextComponent>
                  </template>
                  <template v-slot:item.cantidad="{ item }">
                    <formsFieldsTextComponent type="number"  dense hide-details v-model="item.cantidad"></formsFieldsTextComponent>
                  </template>
                  <template v-slot:item.iva="{ item }">
                    <formsFieldsTextComponent type="number"  dense hide-details v-model="item.iva"></formsFieldsTextComponent>
                  </template>
                  <template v-slot:item.descuento="{ item }">
                    <v-input hide-details style="width:100%">
                      <formsFieldsTextComponent type="number" class="rounded-r-0" style="width:50%"  dense hide-details v-model="item.descuento"></formsFieldsTextComponent>
                      <formsFieldsSelectComponent style="width:50%" :items="[{text:'Porcentaje (%)',value:'porcentaje'},{text:'Fijo ($)',value:'fijo'}]" class="rounded-l-0" value="Porcentaje (%)"   dense hide-details v-model="item.tipo_descuento"></formsFieldsSelectComponent>
                    </v-input>
                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn color="red" @click="removeItem(item)">
                      <v-icon color="white">mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card-text>
            </generalCardComponent>
          </v-col>
        </v-row>



      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success darken-1" :disabled="compra.productos.length == 0" class="rounded-lg white--text font-weight-light"
          @click="saveCompras()">AGREGAR COMPRAS</v-btn>
      </v-card-actions>
    </generalCardComponent>
    <modal-success :action="()=>{
      this.$emit('input', false);
      this.successCompras = false
      }" v-model="successCompras">
      <template v-slot:icon>
        mdi-check
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>Compras agregadas correctamente!</strong>
        </p>
      </template>
    </modal-success>
  </v-dialog>

</template>

<script>
  import moment from 'moment';
  export default {
    props: {
      value: Boolean,
    },
    data() {
      return {
        stepper: 1,
        compra: {
          distribuidor:1,
          productos:[]
        },
        headers: [{
            text: 'Codigo',
            value: 'codigo'
          },
          {
            text: 'Nombre',
            value: 'nombre'
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
            text: '% IVA',
            value: 'iva'
          },
          {
            text: 'Descuento',
            value: 'descuento'
          },

          {
            text: 'Acciones',
            value: 'actions'
          }
        ],
        successCompras: false
      }
    },
    mounted(){
      this.compra.fecha = moment().format('YYYY-MM-DD')
    },
    methods: {
      setItem(item) {
        this.compra.productos.push({
          producto: item.id,
          codigo: item.codigo,
          nombre: item.nombre,
          precio_unidad: 0,
          entrega: 0,
          cantidad: 1,
          descuento:0
        })
      },
      selectedItem(item) {
        return this.compra.productos.find(producto => producto == item) ? true : false
      },
      removeItem(item) {
        this.compra.productos = this.compra.productos.filter(producto => producto != item)
      },
      async saveCompras() {
        await this.$axios.post('/compras-mercaderias', this.compra)
        this.successCompras = true
        this.$root.$emit('updateCompras', true)
      }
    },
    computed:{
      filterHeaders() {
        return this.headers.filter((h)=>{
          if(this.compra.iva_incluido) {
            if(h.value == 'iva') return false
          }
          return h
        })
      }
    }
  }

</script>

<style>

</style>
