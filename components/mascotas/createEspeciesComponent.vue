<template>
  <div>
    <v-input>
      <v-select outlined dense hide-details :items="especiesList" label="Nombre de la especie" class="rounded-r-0"
        item-text="nombre" item-value="id" return-object  v-model="selectedespecie">
      </v-select>
      <v-btn class="rounded-l-0 rounded-r-lg" depressed height="40" color="primary" @click="showespeciesModal = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-input>
    <v-dialog v-model="showespeciesModal">
      <v-card width="800">
        <v-toolbar color="gd-primary-to-right" elevation="0">
          <v-toolbar-title class="white--text font-weight-light">Especies</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showespeciesModal = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-3">
          <v-text-field solo dense label="especie" v-model="especie.nombre">
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="white--text" color="gd-primary-to-right font-weight-light rounded-lg"
            @click="addEspecie()">
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
        especie: {
          nombre: ""
        },
        selectedespecie: {},
        especiesList: [],
        showespeciesModal: false
      }
    },
    created() {
      this.getespecies()
    },
    mounted() {
      this.selectedespecie = this.value
    },
    methods: {
      addEspecie() {
        this.$axios.post(`/especies`, this.especie)
          .then((data) => {
            this.especie.nombre = ""
            this.showespeciesModal = false
            this.selectedespecie = data.data.id
            this.getespecies()
          })
      },
      getespecies() {
        this.$axios.get('/especies')
          .then((data) => {
            this.especiesList = data.data
          })
      }
    },
    watch: {
      selectedespecie(val) {
        if(val.id)
          this.$emit('input', val.id)
      }
    }
  }

</script>

<style>

</style>
