<template>
  <v-card class="rounded-xl">
    <v-card-title class="font-weight-light">
      <slot name="title"></slot>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-title>
      <v-row>
        <v-col class="col-md-7">
          <v-text-field solo dense v-model="search.search" prepend-inner-icon="mdi-account-search"
            label="Buscar (Nombre del socio, Nombre de la mascota)">
          </v-text-field>
        </v-col>
        <v-col class="col-md-3">
          <v-menu ref="menu" class="calendar" v-model="menu" transition="scale-transition" offset-y min-width="290px"
            :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <div v-on="on" style="cursor:pointer">
                <v-text-field solo dense class="selectInput font-weight-light" :value="formatDate(search.fecha)"
                  append-icon="mdi-calendar" readonly placeholder="DATE" height="10">
                </v-text-field>
              </div>
            </template>
            <v-card>
              <v-date-picker v-model="search.fecha" no-title scrollable class="elevation-0">
              </v-date-picker>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false;search.fecha=''">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(menu)">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-col>

        <v-col class="col-md-2">
          <v-btn block height="40" color="gd-primary" @click="getAtenciones()" class="rounded-lg white--text font-weight-light">
            Buscar&nbsp;<v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-card outlined class="rounded-xl">
        <v-card-text>
          <v-data-table hide-default-footer :headers="headers" :items="atenciones">
          <template v-slot:item.actions = "{ item }">
            <slot name="button" :item="item"></slot>
          </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>

</template>


<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        headers: [{
            text: 'Nombre del socio',
            align: 'left',
            sortable: false,
            value: 'socio.name'
          },
          {
            text: 'Nombre de la mascota',
            align: 'left',
            sortable: false,
            value: 'mascota.nombre'
          },
          {
            text: 'Fecha de la consulta',
            align: 'left',
            sortable: false,
            value: 'fecha'
          },
          {
            text: 'Estado',
            align: 'left',
            sortable: false,
            value: 'estado'
          },
          {
            text: 'Acciones',
            align: 'left',
            sortable: false,
            value: 'actions'
          }
        ],
        atenciones:[],
        menu: false,
        search: {}
      }
    },
    created() {
      this.$root.$on('generatedSale',()=>{
        this.getAtenciones()
      })
    },
    methods: {
      formatDate(date) {
        if (date)
          return moment(date).format('DD/MM/YYYY')
        return "Seleccione una fecha"
      },
      getAtenciones() {
        var query = "estado=Pendiente"
        if(this.search.search) {
          query = `&_where[_or][0][socio.name_contains]=${this.search.search}&_where[_or][1][mascota.nombre_contains]=${this.search.search}`
        }
        if(this.search.fecha) {
          query = `${query}&_where[fecha]=${this.search.fecha}`
        } else {
          query = `${query}&_where[fecha_lte]=${moment().format('YYYY-MM-DD')}`
        }
        this.$axios.get(`/atencion?${query}`)
          .then((data) =>{
            this.atenciones = data.data
          })
      }

    }
  }

</script>
