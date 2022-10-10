<template>
  <v-container>
    <v-card class="rounded-xl">
      <v-toolbar color="teal darken-4" elevation="0">
        <v-toolbar-title class="white--text font-weight-light">Consultas antiguas</v-toolbar-title>
      </v-toolbar>
      <v-card-title>
        <v-row>
          <v-col class="col-md-9 col-12">
            <v-row>
              <v-col class="col-md-6">
                <SociosFindSociosComponent v-model="search['socio.name_contains']"></SociosFindSociosComponent>
              </v-col>
              <v-col class="col-md-6">
                <MascotasFindComponent v-model="search['mascota.name_contains']"></MascotasFindComponent>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-md-3 col-12">
            <v-row>
              <v-col class="col-9">
                <v-btn block @click="getAtencions()"
                  class="teal darken-4 font-weight-light rounded-lg white--text" color="teal darken-4">
                  BUSCAR
                </v-btn>
              </v-col>
              <v-col class="col-3">
                <v-btn color="red" block @click="cleanSearch()">
                    <v-icon color="white">mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>

          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items-per-page="25" :items="listAtencions.items" hide-default-footer>
            <template v-slot:item.fecha="{item}">
                {{formatDate(item.fecha)}}
            </template>
            <template v-slot:item.peso="{item}">
                {{item.peso}}KG
            </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-pagination :total-visible="10" :length="Math.ceil(listAtencions.length/25)" v-model="page"></v-pagination>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
    import moment from 'moment';
  export default {
    data() {
      return {
        moment:moment,
        page: 1,
        search: {
          _start: 0,
          _limit: 25,
          _sort: 'fecha:desc',
          "socio.name_contains": '',
          "mascota.nombre_contains": '',
        },
        listAtencions: {
          items: [],
          length: 0
        },
        headers: [{
            text: 'Fecha',
            value: 'fecha'
          },
          {
            text: 'Socio',
            value: 'socio.name'
          },
          {
            text: 'Mascota',
            value: 'mascota.nombre'
          },
          {
            text: 'Peso',
            value: 'peso'
          },
          {
            text: 'Temperatura',
            value: 'temperatura'
          },
          {
            text: 'Observaciones',
            value: 'observaciones'
          },
        ]
      }
    },
    created() {
      this.getAtencions()
    },
    methods: {
        formatDate(date) {
            return moment(date).format('DD/MM/YYYY')
        },
      getAtencions() {
        this.search._start = 25 * (this.page - 1)
        this.search._limit = 25 * (this.page)
        this.listAtencions.items = []
        this.$axios.get('/old-atencions', {
            params: this.search
          })
          .then((data) => {
            this.listAtencions.items = data.data
          })
        this.$axios.get('/old-atencions/count', {
            params: this.search
          })
          .then((data) => {
            this.listAtencions.length = data.data
          })

      },
      cleanSearch() {
        this.search = {
          _start: 0,
          _limit: 25,
          _sort: 'fecha:desc',
          "socio.name_contains": '',
          "mascota.nombre_contains": '',
        }
        this.getAtencions()
      }
    },
    watch: {
      page(val) {
        console.log(val)
        this.getAtencions()
      },
    }
  }

</script>
