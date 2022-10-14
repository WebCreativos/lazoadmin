<template>
  <div>
    <v-card class="rounded-xl">
      <v-toolbar color="gd-primary-to-right" elevation="0">
        <v-toolbar-title class="white--text font-weight-light">Consultas</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn outlined class="white--text font-weight-light" @click="exportDataProximas()">
          Descargar&nbsp;<v-icon>mdi-download</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title>
        <v-row>
          <v-col class="col-12">
            <visitasCreateReferenciasComponent v-model="search.referencias"></visitasCreateReferenciasComponent>
          </v-col>
          <v-col class="col-12">
            <v-input hide-details>
              <v-text-field hide-details v-model="search.fecha_gte" type="date" class="rounded-r-0" height="40"
                dense outlined label="Fecha desde"></v-text-field>
              <v-text-field hide-details v-model="search.fecha_lte" type="date" class="rounded-l-0" height="40"
                dense outlined label="Fecha hasta"></v-text-field>
            </v-input>
          </v-col>
          <v-col class="col-12">
            <v-btn @click="items.page = 1;getAtenciones()" color="gd-primary-to-right" height="40" depressed
              class="white--text font-weight-light" block>
              Buscar&nbsp;<v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>

      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table :headers="headers" hide-default-footer :items="items.data" :items-per-page="25">
          <template v-slot:item.fecha="{ item }">
              <v-btn outlined small @click="showModalAtencion(item)">
                <v-icon>mdi-magnify</v-icon> &nbsp;{{formatDate(item.fecha)}}
              </v-btn>
          </template>
          <template v-slot:item.clientName="{ item }">
            {{clientName(item.mascota)}}
          </template>

          <template v-slot:item.hora="{ item }">
            {{formatHour(item.hora)}}
          </template>
          <template v-slot:item.EOG="{ item }">
            <span v-if="item.EOG">
              {{item.EOG.substring(0,30)}}...
            </span>
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-pagination :total-visible="10" :length="Math.ceil(items.length/25)" v-model="items.page"></v-pagination>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="openAtencionModal" width="80%"  height="auto">
      <v-toolbar color="primary" class="elevation-0 white--text font-weight-thin">
        <v-toolbar-title>VER VISITA</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="openAtencionModal = false">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <visitas-data-component class="overflow-card" readonly v-model="atencion"></visitas-data-component>
    </v-dialog>

  </div>
</template>

<script>
var qs = require('qs');
  import {
    json2excel,
  } from 'js2excel';
  import moment from 'moment'
  export default {
    data() {
      return {
        headers: [{
          text: "Fecha",
          value: "fecha"
        }, {
          text: "Hora",
          value: "hora"
        }, {
          text: "EOG",
          value: "EOG"
        }, {
          text: "Nombre del cliente",
          value: "mascota.socio.name"
        }, {
          text: "Nombre de la mascota",
          value: "mascota.nombre"
        }, {
          text: "Referencias",
          value: "referencias.nombre"
        }, {
          text: "Anamnesis",
          value: "anamnesis"
        }, {
          text: "Tratamiento",
          value: "tratamiento"
        }],
        items: {
          data:[],
          length:0,
          page:1
        },
        atencion: {},
        headersProximas: [{
          text: "Fecha",
          value: "fecha"
        }, {
          text: "Hora",
          value: "hora"
        }, {
          text: "Nombre del cliente",
          value: "mascota.socio.name"
        }, {
          text: "Nombre de la mascota",
          value: "mascota.nombre"
        }, {
          text: "Anamnesis",
          value: "anamnesis"
        }],
        search: { },
        openAtencionModal: false
      }
    },
    mounted() {
      this.search.fecha_gte = moment().format('YYYY-MM-DD')
      this.search.fecha_lte = moment().add(7, 'days').format('YYYY-MM-DD')
      this.getAtenciones()
    },
    methods: {
      async getAtenciones() {
        this.search._start = 25*(this.items.page-1)
        this.search._limit = 25*(this.items.page)

        this.items.data = []
        await this.$axios.get('/atencion', {
            params: {...this.search,_sort:'fecha:desc'}
          })
          .then(response => {
            this.items.data = response.data.filter((item)=>{
              if(item.mascota.deceso == null || item.mascota.deceso =="1000-01-01") {
                return item
              }
            })
          })
          .catch(error => {
            console.log(error)
          })
        await this.$axios.get('/atencion/count', {
            params: this.search,
          })
          .then(response => {
            this.items.length = response.data.filter((item)=>{
              if(item.mascota.deceso == null || item.mascota.deceso =="1000-01-01") {
                return item
              }
            })
          })
          .catch(error => {
            console.log(error)
          })

      },
      formatDate(date) {
        let finalDate = date.split('-')
        return `${finalDate[2]}/${finalDate[1]}/${finalDate[0]}`
      },
      formatHour(hour) {
        if(!hour) return 'Hora no asignada'
        let finalHour = hour.split(':')
        return `${finalHour[0]}:${finalHour[1]}`
      },
      showModalAtencion(atencion) {
        this.atencion = {}
        this.atencion = atencion
        this.$forceUpdate()
        this.$axios.get('/socios/'+atencion.socio.id)
          .then((data)=>{
            this.$store.dispatch('atentions/setSocio', data.data)
            this.$store.dispatch('atentions/setMascota', {})
            this.openAtencionModal = true
          })
      },
      clientName(pet){
        if(pet.socios){
          return pet.socios[0].name
        }
      },
      exportData() {
        console.log(this.items)
        let data = this.items.data.map((item) => {
          return {
            Fecha: this.formatDate(item.fecha),
            Hora: this.formatHour(item.hora),
            EOG: item.EOG,
            Mascota: item.mascota.nombre,
            Referencias: item.referencias,
            Anamnesis: item.anamnesis,
            Pronostico: item.pronostico,
            Tratamiento: item.tratamiento
          }
        })
        try {
          json2excel({
            data,
            name: 'Consultas',
            formateDate: 'yyyy/mm/dd'
          });
        } catch (e) {
          console.error('export error');
        }

      },
      exportDataProximas() {
        let data = this.items.data.map((item) => {
          return {
            Fecha: this.formatDate(item.fecha),
            Hora: this.formatHour(item.hora),
            Cliente: `${item.socio.name}`,
            Telefono: `${item.socio.phone}`,
            Mascota: item.mascota.nombre,
            Motivo: item.referencias?.nombre,
          }
        })
        try {
          json2excel({
            data,
            name: 'Consultas',
            formateDate: 'yyyy/mm/dd'
          });
        } catch (e) {
          console.error('export error');
        }

      }
    },
    watch:{
      "items.page": function(val) {
        this.getAtenciones()
      }
    }
  }

</script>

<style>

</style>
