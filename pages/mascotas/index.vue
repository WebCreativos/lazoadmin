<template>
  <v-container fluid>
    <MascotasListComponent @changePage="getMascotas($event)" v-model="mascotasList">
      <template v-slot:extraFields>
        <v-card outlined width="100%" class="rounded-lg">
          <v-card-text>
            <v-row>
              <v-col class="col-md-9">
                <v-text-field v-model="search.nombre_contains" hide-details label="Nombre" outlined dense>
                </v-text-field>
              </v-col>
              <v-col class="col-md-3">
                <v-btn block color="teal darken-4" @click="getMascotas()"
                  class="white--text rounded-lg font-weight-light">
                  Buscar&nbsp;<v-icon>mdi-magnify</v-icon>
                </v-btn>
              </v-col>

              <!--

          <v-col class="col-md-2 col-sm-2 col-12">
            <v-switch class="mt-0" hide-details v-model="search.old_pet" default="false" label="Masc. antigua">
            </v-switch>
          </v-col>
          -->
            </v-row>
            <v-row v-if="showExtraFilters">
              <v-col class="col-md-6">
                <v-text-field v-model="search.nro_chip" hide-details label="Nro Chip" outlined dense></v-text-field>
              </v-col>
              <v-col class="col-md-6">
                <mascotasRazasComponent hideAddMore v-model="search.raza"></mascotasRazasComponent>
              </v-col>
            </v-row>

          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn small outlined @click="showExtraFilters = !showExtraFilters">
              <span v-show="!showExtraFilters">VER MAS FILTROS</span>
              <span v-show="showExtraFilters">VER MENOS FILTROS</span>
            </v-btn>

          </v-card-actions>
        </v-card>
      </template>
      <template v-slot:button="{ item }">
        <v-btn class="teal darken-4 font-weight-light rounded-lg white--text" :to="`/mascotas/editar/${item.id}`"
          color="teal darken-4">
          EDITAR
        </v-btn>
        <v-btn class="font-weight-light rounded-lg white--text" color="red" @click="deleteMascota(item.id)">
          ELIMINAR
        </v-btn>
      </template>
    </MascotasListComponent>
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
