<template>
  <div>
    <v-input>
      <v-select solo dense hide-details :items="distribuidoresList" label="Nombre del distribuidor" class="rounded-r-0"
        item-text="nombre" item-value="id" return-object v-model="selectedDistribuidor">
      </v-select>
      <v-btn class="rounded-l-0 rounded-r-lg" height="40" color="teal darken-3" @click="showDistribuidoresModal = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-input>
    <v-dialog v-model="showDistribuidoresModal">
      <v-card width="800">
        <v-toolbar color="teal darken-3" elevation="0">
          <v-toolbar-title class="white--text font-weight-light">Distribuidores</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showDistribuidoresModal = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-3">
          <v-text-field solo dense label="distribuidor" v-model="distribuidor.nombre">
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="white--text" color="teal darken-3 font-weight-light rounded-lg"
            @click="addDistribuidor()">
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
      value: Number
    },
    data() {
      return {
        distribuidor: {
          nombre: ""
        },
        selectedDistribuidor: this.value,
        distribuidoresList: [],
        showDistribuidoresModal: false
      }
    },
    created() {
      this.getDistribuidores()
    },
    mounted() {
      if(localStorage.getItem('distribuidor')){
        this.selectedDistribuidor = JSON.parse(localStorage.getItem('distribuidor'))
      }
    },
    methods: {
      addDistribuidor() {
        this.$axios.post(`/distribuidores`, this.distribuidor)
          .then((data) => {
            this.distribuidor.nombre = ""
            this.showDistribuidoresModal = false
            this.selectedDistribuidor = data.data.id
            this.getDistribuidores()
          })
      },
      getDistribuidores() {
        this.$axios.get('/distribuidores')
          .then((data) => {
            this.distribuidoresList = data.data
          })
      }
    },
    watch: {
      selectedDistribuidor(val) {
        localStorage.setItem('distribuidor', JSON.stringify(val))
        this.$emit('input', val.id)
      }
    }
  }

</script>

<style>

</style>
