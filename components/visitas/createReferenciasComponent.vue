<template>
  <div>

    <FormsFieldsSelectButtonComponent :items="referenciasList" label="Nombre del referencia" item-text="nombre"
      item-value="id" return-object :handler="()=>{showcoloresModal = true}" v-model="selectedreferencia">
    </FormsFieldsSelectButtonComponent>
    <generalCreateDialogComponent :handler="addReferencia" title="Agregar referencia" v-model="showreferenciasModal">
    </generalCreateDialogComponent>
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
    mounted() {},
    methods: {
      addReferencia() {
        if (!this.checkReferencia()) return
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
            if (this.value && this.value.id) {
              this.selectedreferencia = this.referenciasList.find((referencia) => referencia.id == this.value.id)
            }
            this.referenciasList.unshift({
              id: null,
              nombre: "Seleccione una referencia"
            })
          })
      },
      checkReferencia() {
        if (this.referencia.nombre == "")
          return false

        if (this.referenciasList.find((e) => e.nombre == this.referencia.nombre))
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
