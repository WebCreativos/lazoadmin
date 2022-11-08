<template>
  <div>
    <FormsFieldsSelectButtonComponent :items="razasList" label="Raza" item-text="nombre"
      item-value="id" return-object :handler="()=>{showrazasModal = true}" v-model="selectedRaza">
    </FormsFieldsSelectButtonComponent>
    <generalCreateDialogComponent :handler="addRaza" title="Agregar raza" v-model="showrazasModal"></generalCreateDialogComponent>
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
