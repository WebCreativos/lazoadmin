<template>
  <v-container fluid>
    <generalCardComponent class="rounded-xl">
      <v-toolbar color="gd-primary-to-right" class="elevation-0">
        <v-toolbar-title class="white--text font-weight-light">Noticias de relevancia</v-toolbar-title>
      </v-toolbar>
      <v-card-actions class="pl-5">
        <v-spacer></v-spacer>
        <v-btn color="gd-primary-to-right" class="white--text font-weight-light" @click="addItem()">
          Agregar noticia&nbsp;<v-icon>mdi-plus</v-icon>    
        </v-btn>
      </v-card-actions>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col class="col-md-3 col-12" v-for="(item,index) in items.otros" :key="index">
            <generalCardComponent class="rounded-xl">
              <v-toolbar class="mb-3 elevation-0" color="gd-primary-to-right" dense>
                <v-toolbar-title class="white--text font-weight-light">Noticia {{(index + 1)}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="deleteOthers(index)" color="white">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text class="pa-4 rounded-lg">
                <formsFieldsTextComponent placeholder="TITULO" v-model="item.title"  dense class="rounded-lg">
                </formsFieldsTextComponent>
                <v-textarea placeholder="TEXTO"  v-model="item.text" dense class="rounded-lg"></v-textarea>
                <input :id="`fileUpload${index}`" type="file"  @input="($event)=>{
                  item.picture = $event.target.files[0]; 
                }" class="hidden" ref="file" hidden>
                <v-btn @click="selectPicture(index)" color="gd-primary" block class="mb-5 white--text font-weight-light rounded-lg">CARGAR FOTO</v-btn>

                <formsFieldsTextComponent placeholder="URL VIDEO"  v-model="item.video" dense hide-details class="rounded-lg"></formsFieldsTextComponent>
              </v-card-text>
            </generalCardComponent>

          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="gd-primary-to-right" class="rounded-lg white--text font-weight-light" @click="createOTher()" large>
          GUARDAR
        </v-btn>
      </v-card-actions>
    </generalCardComponent>
    <modal-success :action="()=>{
      this.otrosModal = false
      }" v-model="otrosModal">
      <template v-slot:icon>
        mdi-check
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>Publicaciones agregadas correctamente!</strong>
        </p>
      </template>
    </modal-success>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        items: {
          otros:[{}]
        },
        otrosModal: false
      }
    },
    created() { 
      this.getOthers()
    },
    methods: {
      addItem() {
        this.$set(this.items.otros, this.items.otros.length, {})
      },
      removeItem() {
        this.$delete(this.items, this.items.length - 1)
      },
      selectPicture(index) {
        document.getElementById('fileUpload' + index).click()
      },
      getOthers() {
        this.$axios.get('/otros').then(response => {
          this.items = response.data
        })
      },
      deleteOthers(index) {
        console.log(index)
        this.$delete(this.items.otros,index)
        console.log(this.items)
      },
      onFileChange(pic, e) {
        return pic = e.target.files[0]
      },
      createOTher() {
        this.$axios.put('/otros',this.items)
          .then(()=>{
            this.otrosModal = true
          })
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
