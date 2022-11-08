<template>
  <v-container fluid>
    <headersGeneralComponent>
      <template v-slot:icon>
        <img src="/icons/dog.png" alt="icono" width="30" />
      </template>
      <template v-slot:title>
        Mascotas
      </template>
    </headersGeneralComponent>
    <GeneralCardComponent>
      <v-card-title class="primary">
        <formsFieldsTextButtonComponent class="elevation-6 rounded-lg" background-color="white"
          @click="getSocios($event)" label="Buscar...">
          <template v-slot:icon>
            <v-icon>mdi-magnify</v-icon>
          </template>
        </formsFieldsTextButtonComponent>
      </v-card-title>
      <MascotasListComponent @changePage="getMascotas($event)" v-model="mascotasList">
        <template v-slot:button="{ item }">
          <mascotasActionsButtonComponent :item="item" />
        </template>
      </MascotasListComponent>
    </GeneralCardComponent>
  </v-container>
</template>

<script>
  import modalSuccess from '~/components/modalSuccess.vue';
  import moment from 'moment';
  export default {
    components: {
      modalSuccess
    },
    data() {
      return {
        showExtraFilters: false,
        search: {},
        mascotasList: {
          data: [],
          length: 0
        },
        pageItems: 0
      }
    },
    created() {
      this.getMascotas()
    },
    methods: {
      async getMascotas(page = 1) {
        if (this.search.raza == 'Seleccione una opcion')
          this.$delete(this.search, 'raza')
        this.search._start = (page - 1) * 25;
        this.search._limit = page * 25;
        this.mascotasList.data = []
        this.mascotasList.length = 0
        await this.$axios.get('/mascotas', {
            params: this.search
          })
          .then(response => {
            this.mascotasList.data = response.data
          })

        await this.$axios.get('/mascotas/count', {
            params: this.search
          })
          .then(response => {
            this.mascotasList.length = response.data
          })
      },
      deleteMascota(id) {
        let confirm = window.confirm('Esta seguro que desea eliminar esta mascota?')
        if (confirm) {
          this.$axios.delete('/mascotas/' + id)
            .then(response => {
              this.getMascotas()
            })
        }
      }
    },
    watch: {}
  }

</script>

<style>

</style>
