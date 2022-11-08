<template>
  <v-container fluid>
    <generalCardComponent>
      <v-card-text>
        <v-row>
          <v-col class="col-12 col-md-5">
            <generalCardComponent color="blue darken-4 rounded-lg" class="elevation-0" height="400">
              <v-card-text>
                <v-row>
                  <v-col class="col-12 col-md-6">
                    <formsFieldsTextComponent placeholder="MANUAL (codigo)" background-color="success darken--4"
                      class="input-socio rounded-lg" ></formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-12 col-md-6">
                    <formsFieldsTextComponent placeholder="PRODUCTO" readonly background-color="success" class="input-socio rounded-lg"
                      >
                    </formsFieldsTextComponent>
                    <formsFieldsTextComponent placeholder="CANTIDAD" readonly background-color="success" class="input-socio rounded-lg"
                      >
                    </formsFieldsTextComponent>
                    <formsFieldsTextComponent placeholder="PRECIO" readonly background-color="success" class="input-socio rounded-lg"
                      >
                    </formsFieldsTextComponent>
                    <formsFieldsTextComponent placeholder="DESCUENTO" readonly background-color="success" class="input-socio rounded-lg"
                      >
                    </formsFieldsTextComponent>
                  </v-col>
                </v-row>
              </v-card-text>
            </generalCardComponent>
          </v-col>
          <v-col class="col-md-2 col-12"></v-col>
          <v-col class="col-12 col-md-5">
            <generalCardComponent color="blue darken-4 rounded-lg" class="elevation-0 pa-3" height="400">
              <v-card-text class="rounded-lg success" style="height:90%">
                FACTURA FINAL
              </v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn width="50%" color="red" class="font-weight-thin" depressed @click="createVentaModal = true">PAGAR</v-btn>
              </v-card-actions>
            </generalCardComponent>
          </v-col>
        </v-row>

      </v-card-text>
    </generalCardComponent>


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
  export default {
    data() {
      return {
      createVentaModal: false
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
