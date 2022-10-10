<template>
  <div>
    <v-input>
      <v-select solo dense hide-details :items="referenciasList" label="Nombre del referencia" class="rounded-r-0"
        item-text="nombre" item-value="id" return-object v-model="selectedreferencia">
      </v-select>
      <v-btn class="rounded-l-0 rounded-r-lg" height="40" color="teal darken-4" @click="showreferenciasModal = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-input>
    <v-dialog v-model="showreferenciasModal">
      <v-card width="800">
        <v-toolbar color="teal darken-4" elevation="0">
          <v-toolbar-title class="white--text font-weight-light">Referencias</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showreferenciasModal = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-3">
          <v-text-field solo dense label="referencia" v-model="referencia.nombre">
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="white--text" color="teal darken-4 font-weight-light rounded-lg"
            @click="addReferencia()">
            AGREGAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      value: null
    },
    data() {
      return {
        referencia: {
          nombre: ""
        },
        selectedreferencia: {},
        referenciasList: [],
        showreferenciasModal: false
      }
    },
    created() {
      this.getreferencias()
    },
    mounted() {
    },
    methods: {
      addReferencia() {
        if(!this.checkReferencia()) return
        this.$axios.post(`/referencias`, this.referencia)
          .then((data) => {
            this.referencia.nombre = ""
            this.showreferenciasModal = false
            this.selectedreferencia = data.data.id
            this.getreferencias()
          })
      },
      getreferencias() {
        this.$axios.get('/referencias')
          .then((data) => {
            this.referenciasList = data.data
            console.log(this.value)
            if(this.value.id) {
              this.selectedreferencia = this.referenciasList.find((referencia) => referencia.id == this.value.id)
            } 
            this.referenciasList.unshift({
              id: null,
              nombre: "Seleccione una referencia"
            })
          })
      },
      checkReferencia() {
        if(this.referencia.nombre == "")
          return false
        
        if(this.referenciasList.find((e)=>e.nombre == this.referencia.nombre))
          return false
        
        return true
      }
    },
    watch: {
      selectedreferencia(val) {
        this.$emit('input', val.id)
      }
    }
  }

</script>

<style>

</style>
