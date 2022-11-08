<template>
  <div>
    <FormsFieldsSelectButtonComponent :items="especiesList" label="Especie" item-text="nombre"
      item-value="id" return-object :handler="()=>{showespeciesModal = true}" v-model="selectedespecie">
    </FormsFieldsSelectButtonComponent>
    <generalCreateDialogComponent :handler="addEspecie" title="Agregar especie" v-model="showespeciesModal"></generalCreateDialogComponent>
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
        if (val != undefined)
          this.$emit('input', val.id)
      }
    }
  }

</script>

<style>

</style>
