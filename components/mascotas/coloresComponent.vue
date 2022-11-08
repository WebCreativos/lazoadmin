<template>
  <div>
    <FormsFieldsSelectButtonComponent :items="coloresList" label="Color" item-text="nombre"
      item-value="id" return-object :handler="()=>{showcoloresModal = true}" v-model="selectedColor">
    </FormsFieldsSelectButtonComponent>
    <generalCreateDialogComponent :handler="addColor" title="Agregar color" v-model="showcoloresModal"></generalCreateDialogComponent>
  </div>
</template>

<script>
  export default {
    props: {
      value: null
    },
    data() {
      return {
        color: {
          nombre: ""
        },
        selectedColor: {},
        coloresList: [],
        showcoloresModal: false
      }
    },
    created() {
      this.getColores()
    },
    mounted() {
      this.selectedColor = this.value
    },
    methods: {
      addColor() {
        this.$axios.post(`/colores/`, this.color)
          .then((data) => {
            this.color.nombre = ""
            this.showcoloresModal = false
            this.coloresList.push(data.data)
            this.selectedColor = data.data.id
            this.getcolores()
          })
      },
      getColores() {
        this.$axios.get('/colores/?_limit=-1')
          .then((data) => {
            this.coloresList = data.data
          })
      }
    },
    watch: {
      selectedColor(val) {
        this.$emit('input', val)
      }
    }
  }

</script>

<style>

</style>
