<template>
  <div>
    <v-input hide-details>
      <v-autocomplete small-chips hide-details dense :items="razasList" :class="(!hideAddMore)?'rounded-r-0':''" label="Raza" item-text="nombre" item-value="nombre"  outlined
        v-model="selectedRaza"></v-autocomplete>
        <v-btn class="rounded-l-0 rounded-r-lg" v-if="!hideAddMore" depressed height="40" color="teal darken-4" @click="showrazasModal = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-input>
    <v-dialog v-model="showrazasModal">
      <v-card width="800">
        <v-toolbar color="teal darken-4" elevation="0">
          <v-toolbar-title class="white--text font-weight-light">Razas</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showrazasModal = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-3">
          <v-text-field solo dense label="color" v-model="raza.nombre">
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="white--text" color="teal darken-4 font-weight-light rounded-lg" @click="addRaza()">
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
      value: null,
      hideAddMore:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        raza: {
          nombre: ""
        },
        selectedRaza: {},
        razasList: [],
        showrazasModal: false
      }
    },
    created() {
      this.getRazas()
    },
    mounted() {
      this.selectedRaza = this.value
    },
    methods: {
      addRaza() {
        this.$axios.post(`/razas`, this.raza)
          .then((data) => {
            this.raza.nombre = ""
            this.showrazasModal = false
            this.razasList.push(data.data)
            this.selectedRaza = data.data.id
            this.getrazas()
          })
      },
      getRazas() {
        this.$axios.get('/razas/?_limit=-1')
          .then((data) => {
            this.razasList = data.data
            this.razasList.unshift({
              value: '',
              nombre: 'Seleccione una opcion'
            })
          })
      }
    },
    watch: {
      selectedRaza(val) {
        this.$emit('input', val)
      }
    }
  }

</script>

<style>

</style>
