<template>
  <v-container fluid>
    <MascotasListComponent @changePage="getMascotas($event)" v-model="mascotasList">
      <template v-slot:extraFields>
        <v-row>
          <v-col class="col-md-5">
            <MascotasFindComponent v-model="search.nombre_contains"></MascotasFindComponent>
          </v-col>
          <v-col class="col-md-5">
            <mascotasRazasComponent v-model="search.raza"></mascotasRazasComponent>
          </v-col>
          <v-col class="col-md-2">
            <v-btn block color="gd-primary-to-right" @click="getMascotas()"
              class="white--text rounded-lg font-weight-light">
              Buscar&nbsp;<v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </template>
      <template v-slot:button="{ item }">
        <v-btn class="gd-primary-to-right font-weight-light rounded-lg white--text" :to="`/mascotas/editar/${item.id}`"
          color="primary">
          EDITAR
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
    },
    watch: {
    }
  }

</script>

<style>

</style>
