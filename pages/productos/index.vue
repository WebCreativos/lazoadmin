<template>
  <v-container fluid>
    <generalCardComponent class="rounded-xl">
      <v-toolbar card class="gd-primary-to-right" elevation="0">
        <v-toolbar-title class="white--text font-weight-light">AGREGAR PRODUCTO</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form">
          <v-row>
            <v-col class="col-12 col-md-7">
              <v-row>
                <v-col class="col-12 col-md-6">
                  <formsFieldsTextComponent label="CODIGO" :rules="rules.codigo" type="number" v-model="product.codigo" class="rounded-lg" solo dense>
                  </formsFieldsTextComponent>
                  <generalCardComponent color="gd-primary-to-right" class="rounded-lg elevation-0" height="400">
                    <v-card-text>
                      <input id="fileUpload" type="file" @input="onFileChange($event)" ref="file" hidden>
                      <v-btn @click="selectPicture()" block class="mb-5" depressed>CARGAR FOTO</v-btn>
                      <v-img :src="previewImg()" v-if="product.foto" width="100%" contain height="200"></v-img>
                    </v-card-text>
                  </generalCardComponent>
                </v-col>
                <v-col class="col-12 col-md-6">
                  <formsFieldsTextComponent label="NOMBRE" v-model="product.nombre" class="rounded-lg" solo dense></formsFieldsTextComponent>
                  <formsFieldsTextComponent label="COSTO/UNIDAD" type="number" v-model="product.precio_unidad" class="rounded-lg"
                    solo dense></formsFieldsTextComponent>
                  <formsFieldsTextComponent label="CANTIDAD" :rules="rules.minNumber" type="number" v-model="product.cantidad" class="rounded-lg" solo dense>
                  </formsFieldsTextComponent>
                  <formsFieldsTextComponent label="PRECIO FINAL" type="number" v-model="product.precio_final" class="rounded-lg"
                    solo dense></formsFieldsTextComponent>
                  <formsFieldsTextComponent label="FECHA DE COMPRA" type="date" v-model="product.fecha_compra" class="rounded-lg"
                    solo dense></formsFieldsTextComponent>
                  <formsFieldsTextComponent label="VENCIMIENTO" type="date" v-model="product.vencimiento" class="rounded-lg" solo
                    dense></formsFieldsTextComponent>

                </v-col>
              </v-row>
            </v-col>
            <v-col class="col-12 col-md-5">
              <v-textarea label="COMENTARIOS" v-model="product.comentarios" hide-details solo dense
                class="rounded-lg pt-0"></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="gd-primary-to-right" class="rounded-lg white--text font-weight-light" depressed large
          @click="createProduct()">
          GUARDAR
        </v-btn>
      </v-card-actions>
    </generalCardComponent>
    <modal-success :action="()=>{
      this.dialog = false
      }" v-model="dialog">
      <template v-slot:icon>
        mdi-check
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>Producto agregado correctamente!</strong>
        </p>
      </template>
    </modal-success>
    <modal-success color="red" :action="()=>{
      this.errorDialog = false
      }" v-model="errorDialog">
      <template v-slot:icon>
        mdi-close
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>El codigo del producto ya existe!</strong>
        </p>
      </template>
    </modal-success>

  </v-container>
</template>

<script>
  import modalSuccess from '~/components/modalSuccess.vue'
  export default {
    components: {
      modalSuccess
    },
    data() {
      return {
        product: {
          cantidad:1
        },
        dialog: false,
        errorDialog: false,
        dialogDistribuidores: false,
        rules: {
          codigo: [
            v => !!v || 'El codigo es requerido',
            v => (v && v.length <= 10) || 'El codigo debe tener menos de 10 caracteres'
          ],
          nombre: [
            v => !!v || 'El nombre es requerido',
            v => (v && v.length <= 50) || 'El nombre debe tener menos de 50 caracteres'
          ],
          minNumber: [
            v => !!v || 'la cantidad es requerida',
          ],

        }
      }
    },
    mounted() {
      this.initReader()
    },
    methods: {
      selectPicture() {
        this.$refs.file.click();
      },
      onFileChange(e) {
        this.product.foto = e.target.files[0]
      },
      createImage(file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.product.foto = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      async createProduct() {
        if (!this.$refs.form.validate()) return
        let data = new FormData();

        if (this.product.foto != undefined) {
          data.append('files.foto', this.product.foto);
        }

        data.append('data', JSON.stringify(this.product));
        this.$axios.post('/productos', data)
          .then(() => {
            this.product = {}
          }).catch(() => {
            this.errorDialog = true

          })
      },
      initReader() {
        new Promise((resolve, reject) => {
          setTimeout(() => {
            Quagga.init({
              inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#scanner-container')
              },
              decoder: {
                readers: ["code_128_reader"]
              }
            }, function (err) {
              if (err) {
                console.log(err);
                return
              }
              Quagga.start();
              resolve(true)
            });
          }, 2000);

        }).then(() => {
          Quagga.onDetected((data) => {
            console.log(data)
          });
        })
      },
      previewImg() {
        return URL.createObjectURL(this.product.foto)
      },
    }
  }

</script>

<style lang="scss">

</style>
