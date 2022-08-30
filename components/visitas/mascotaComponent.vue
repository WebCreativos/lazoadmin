<template>
  <div>
    <v-card class="rounded-xl">
      <v-toolbar color="gd-primary-to-right" elevation="0">
        <v-toolbar-title class="white--text font-weight-light">Atenciones de la mascota {{value.mascota.nombre}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="mr-2 font-weight-light" :disabled="(!value.socio.id || !value.mascota.id || value.id!=undefined)"
          color="white" @click="openModalAtencion(createAtencion, 'NUEVA VISITA')">
          Nueva visita
        </v-btn>
        <v-btn class="mr-2 font-weight-light" :disabled="selectedAtencion.length==0" color="white"
          @click="openModalAtencion(updateAtencion, 'ACTUALIZAR VISITA')">
          Modificar visita
        </v-btn>
        <v-btn class="font-weight-light mr-2" :disabled="selectedAtencion.length==0" color="white"
          @click="deleteAtencion()">
          Eliminar visita
        </v-btn>
        <v-btn outlined :disabled="!value.mascota.id" class="white--text font-weight-light" @click="exportData()">
          Descargar&nbsp;<v-icon>mdi-download</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text class="pa-4 rounded-lg">
        <v-card outlined class="rounded-xl">
          <v-data-table show-select single-select v-model="selectedAtencion" :headers="headers" hide-default-footer
            :items="consultaItems.data">
            <template v-slot:item.fecha="{ item }">
              <v-btn outlined small @click="()=>{
                    openModalAtencion(()=>{}, 'VER VISITA',item, true);
                    atencion = item;
                  }">
                <v-icon>mdi-magnify</v-icon> &nbsp;{{formatDate(item.fecha)}}
              </v-btn>
            </template>
            <template v-slot:item.hora="{ item }">
              {{formatHour(item.hora)}}
            </template>
            <template v-slot:item.anamnesis="{ item }">
              <generalButtonShowMoreComponent :value="item.anamnesis"
                :callback="openModalAtencion.bind(null,()=>{}, 'VER VISITA',item, true)">
              </generalButtonShowMoreComponent>
            </template>
            <template v-slot:item.EOG="{ item }">
              <generalButtonShowMoreComponent :value="item.EOG"
                :callback="openModalAtencion.bind(null,()=>{}, 'VER VISITA',item, true)">
              </generalButtonShowMoreComponent>
            </template>
            <template v-slot:item.tratamiento="{ item }">
              <generalButtonShowMoreComponent :value="item.tratamiento"
                :callback="openModalAtencion.bind(null,()=>{}, 'VER VISITA',item, true)">
              </generalButtonShowMoreComponent>
            </template>
            <template v-slot:item.hora="{ item }">
              {{formatHour(item.hora)}}
            </template>
            <template v-slot:item.examenes="{ item }">
              <v-icon color="success" v-if="item.files.length>0">mdi-check</v-icon>
              <v-icon color="red" v-else>mdi-close</v-icon>
            </template>

          </v-data-table>
        </v-card>
      </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-pagination :total-visible="10" :length="Math.ceil(consultaItems.length/10)" v-model="page"></v-pagination>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="modalData.openModal" width="80%" height="auto">
      <v-toolbar color="primary" class="elevation-0 white--text font-weight-thin">
        <v-toolbar-title>{{modalData.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeModalAtencion()">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <visitas-data-component class="overflow-card" :openModal="modalData.openModal" :readonly="modalData.readonly"
        :handler="modalData.handler">
      </visitas-data-component>
    </v-dialog>
  </div>
</template>

<script>
  import _ from 'lodash';
  import moment from 'moment';
  import {
    json2excel,
  } from 'js2excel';

  export default {
    props: {},
    data() {
      return {
        page: 1,
        modalData: {
          handler: Function,
          title: String,
          readonly: false,
          openModal: false
        },
        atencion: this.value,
        createAtencionModal: false,
        updateAtencionModal: false,
        openAtencionModal: false,
        selectedAtencion: [],
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
          text: "Referencias",
          value: "referencias.nombre"
        }, {
          text: "Anamnesis",
          value: "anamnesis"
        }, {
          text: "Examenes",
          value: "examenes"
        }, {
          text: "Tratamiento",
          value: "tratamiento"
        }],
      }
    },
    methods: {
      openModalAtencion(fn, title, atencion, readonly = false) {
        this.modalData.handler = fn;
        this.modalData.title = title;
        this.modalData.readonly = readonly
        this.modalData.openModal = true;
        if (atencion) {
          delete atencion.socio
          console.log(atencion)
          this.$store.dispatch('atentions/setSingle', atencion)
        }
      },
      closeModalAtencion(){
        this.modalData.openModal = false;
        this.$store.dispatch('atentions/setSingle', {id:undefined})
      },
      async createAtencion() {
        this.$store.dispatch('atentions/create').then(() => {
          if(this.value.fecha_proxima_consulta) {
            this.addToAgenda()
          }
          setTimeout(() => {
            this.$store.dispatch('atentions/findAll', {
              page: 1,
              mascota: this.value.mascota.id
            })
            this.$store.dispatch('atentions/cleanSelected')
            this.formatModal()
          }, 1000);
        })
      },
      async updateAtencion() {
        this.$store.dispatch('atentions/update').then(() => {
          if(this.value.fecha_proxima_consulta) {
            this.addToAgenda()
          }
          setTimeout(() => {
            this.$store.dispatch('atentions/findAll', {
              page: 1,
              mascota: this.value.mascota.id
            })
            this.selectedAtencion = []
            this.formatModal()
          }, 1000);

        })
      },

      exportData() {
        this.$axios.get('/atencion', {
          params: {
            mascota: this.value.mascota.id
          }
        },).then((items) => {
          let data = items.data.map((item) => {
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
              name: 'Consultas - ' + this.value.mascota.nombre,
              formateDate: 'yyyy/mm/dd'
            });
          } catch (e) {
            console.error('export error');
          }

        })

      },


      deleteAtencion() {
        this.$axios.delete(`/atencion/${this.atencion.id}`)
          .then(() => {
            this.$store.dispatch('atentions/findAll', {
              page: 1,
              mascota: this.value.mascota.id
            })
            this.selectedAtencion = []
          })
      },
      formatAtencion() {
        let atencion = JSON.parse(JSON.stringify(this.atencion))
        this.atencion = {
          files: [],
          socio: atencion.socio,
          mascota: atencion.mascota,
          productos: [],
          proximas: []
        }
        this.$emit('input', this.atencion)
        this.$forceUpdate()
      },
      formatModal() {
        this.modalData = {
          handler: Function,
          title: String,
          readonly: false,
          openModal: false
        }

      },
      updateMascota() {
        this.$axios.put('/mascotas/' + this.atencion.mascota.id, this.atencion.mascota).then(response => {}).catch(
          error => {
            console.log(error);
          });
      },

      addToAgenda() {
        if (this.value.hora_proxima_consulta)
          this.value.hora_proxima_consulta = this.value.hora_proxima_consulta + ':00.00'

        var agenda = {
          type: 'consulta',
          consulta: {
            socio: this.value.socio,
            tipo_consulta: 'Consulta'
          },
          fecha: this.value.fecha_proxima_consulta,
          hora: this.value.hora_proxima_consulta,
          titulo: 'Nueva consulta para ' + this.value.mascota.nombre,
          detalles: this.value.proxima_consulta,
          referencias: this.value.proxima_referencia
        }

        this.$axios.post('/agendas', agenda).then(data => {
          //clone atencion 
          let proximaAtencion = {
            socio: this.value.socio,
            mascota: this.value.mascota,
            fecha: agenda.fecha,
            hora: agenda.hora ?? "07:00:00.00",
            detalles: agenda.detalles,
            referencias: agenda.referencias,
          }
          this.$axios.post('/atencion', proximaAtencion)
        })

      },


      formatDate(date) {
        if (!date) return 'Fecha no asignada'
        return moment(date).format('DD/MM/YYYY')
      },
      formatHour(hour) {
        if (!hour) return 'Hora no asignada'
        let finalHour = hour.split(':')
        return `${finalHour[0]}:${finalHour[1]}`
      },
      uploadFile(idAtencion, files) {
        console.log
        if (files.length == 0) return


        let data = new FormData()
        data.append('ref', 'atencion')
        data.append('refId', idAtencion)
        data.append('field', 'files')
        for (let file in files) {
          if (files[file] instanceof File) {
            data.append('files', files[file], files[file].name)
          }
        }
        this.$axios.post('/upload', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          console.log(response);
        }).catch(error => {
          console.log(error);
        });
      },

    },
    computed: {
      value() {
        let atencion = this.$store.getters['atentions/get']
        console.log(atencion)
        if (atencion) {
          return atencion
        }
        return {
          length:0
        }
      },
      consultaItems() {
        return this.$store.getters['atentions/getList']
      }
    },
    watch: {
      selectedAtencion(val) {
        if (val.length > 0) {
          let atencion = JSON.parse(JSON.stringify(val[0]))
          delete atencion.socio
          this.$store.dispatch('atentions/setSingle', atencion)
        } else {
          this.$store.dispatch('atentions/cleanSelected')
        }
      },
      page(val){
            this.$store.dispatch('atentions/findAll', {
              page: val,
              mascota: this.value.mascota.id
            })
      },
      value: {
        handler(newValue) {
          console.log(newValue)
          this.atencion = _.cloneDeep(newValue)
        },
        deep: true
      },
      "modalData.openModal": function (val) {
        if (!val) {
          this.formatAtencion()
        }
      },

    },

  }

</script>

<style>

</style>
