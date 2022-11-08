<template>
  <div>


    <generalCardComponent v-show="value.mascota.nombre">
      <GeneralCardTitleComponent class="white--text">
        <v-toolbar-title>{{value.mascota.nombre}}, {{checkYears(value.mascota.fecha_nac)}}, M</v-toolbar-title>
        <template v-slot:button>
          <v-chip class="mr-2">{{value.mascota.color}}</v-chip>
          <v-chip>{{value.mascota.raza}}</v-chip>

        </template>
      </GeneralCardTitleComponent>
      <v-divider></v-divider>
      <v-card-title class="primary">
        <v-tabs :vertical="$vuetify.breakpoint.smAndDown" grow v-model="tab" hide-slider slider-color="primary"
          background-color="primary" active-class="active-tab">
          <v-tab class="white--text">Resumen medico</v-tab>
          <v-tab class="white--text">Consultas anteriores</v-tab>
          <v-tab class="white--text">Analisis</v-tab>
        </v-tabs>
      </v-card-title>
      <v-card-text class="py-3">
        <generalCardComponent outlined>
          <v-data-table show-select single-select v-model="selectedAtencion" :headers="headers" hide-default-footer
            :items="consultaItems.data">
            <template v-slot:item.fecha="{ item }">
              <v-btn small @click="()=>{
                    openModalAtencion(()=>{}, 'VER VISITA',item, true);
                    atencion = item;
                  }">
                <v-icon>mdi-magnify</v-icon> &nbsp;{{formatDate(item.fecha)}}
              </v-btn>
            </template>
            <template v-slot:item.hora="{ item }">
              {{formatHour(item.hora)}}
            </template>
            <template v-slot:item.EOG="{ item }">
              <span v-if="item.EOG">
                {{item.EOG.substring(0, 20)}}
              </span>
            </template>
            <template v-slot:item.anamnesis="{ item }">
              <span v-if="item.anamnesis">
                {{item.anamnesis.substring(0, 20)}}
              </span>
            </template>
            <template v-slot:item.tratamiento="{ item }">
              <span v-if="item.tratamiento">
                {{item.tratamiento.substring(0, 20)}}
              </span>

            </template>
            <template v-slot:item.examenes="{ item }">
              <v-icon color="success" v-if="item.files.length>0">mdi-check</v-icon>
              <v-icon color="red" v-else>mdi-close</v-icon>
            </template>
            <template v-slot:item.update="{item}">
              <v-btn small class="mr-2 font-weight-light" outlined
                @click="openModalAtencion(updateAtencion, 'ACTUALIZAR VISITA',item)">
                Modificar
              </v-btn>
            </template>
          </v-data-table>
        </generalCardComponent>

      </v-card-text>
    </generalCardComponent>
    <v-dialog v-model="modalData.openModal" fullscreen>
      <GeneralCardComponent>
        <GeneralCardTitleComponent class="white--text">
          {{modalData.title}}
          <template v-slot:button>
            <v-btn icon @click="closeModalAtencion()">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </template>
        </GeneralCardTitleComponent>
        <v-card-text class="py-4">
          <visitas-data-component :openModal="modalData.openModal" :readonly="modalData.readonly"
            :handler="modalData.handler">
          </visitas-data-component>
        </v-card-text>
      </GeneralCardComponent>
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
        dataMoveAtention: {},
        dataMoveSocio: {},
        dataMoveMascotas: [],
        successChangeMascota: false,
        atencion: this.value,
        openChangeAtentionsModal: false,
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
        }, {
          text: "Modificar",
          value: "update"
        }, {
          text: "Acciones",
          value: "actions"
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
          this.$store.dispatch('atentions/setSingle', atencion)
        } else {
          if (this.consultaItems.data.length > 0) {
            console.log(this.consultaItems.data[this.consultaItems.data.length - 1] ?.peso)
            let peso = this.consultaItems.data[this.consultaItems.data.length - 1] ?.peso
            this.$store.dispatch('atentions/setSingle', {
              peso: peso
            })
          }
        }
      },
      checkYears(date) {
        console.log(date)
        if (date == "1000-01-01") return "-"
        let monthsDate = moment().diff(date, 'months')
        if (monthsDate > 12) {
          return Math.round(monthsDate / 12) + ' años'
        } else {
          return monthsDate + ' meses'
        }
      },

      closeModalAtencion() {
        this.modalData.openModal = false;
        this.$store.dispatch('atentions/cleanSelected')
      },
      async createAtencion() {
        this.$store.dispatch('atentions/create').then(() => {
          if (this.value.fecha_proxima_consulta) {
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
          if (this.value.fecha_proxima_consulta) {
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
      deleteAtencion(item) {
        let c = confirm('¿Está seguro de eliminar la atención?')
        if (c) {
          console.log("hola")
          return
          this.$store.dispatch('atentions/delete', item.id).then(() => {
            this.$store.dispatch('atentions/findAll', {
              page: 1,
              mascota: this.value.mascota.id
            })
          })
        }
        this.$store.dispatch('atentions/delete', item.id).then(() => {
          setTimeout(() => {
            this.$store.dispatch('atentions/findAll', {
              page: 1,
              mascota: this.value.mascota.id
            })
            this.selectedAtencion = []
          }, 1000);
        })
      },
      changeAtentionPet() {
        this.$axios.put(`/atencion/${this.dataMoveAtention.atencion}`, {
            mascota: this.dataMoveAtention.mascota
          })
          .then(() => {
            this.successChangeMascota = true
            this.$store.dispatch('atentions/findAll', {
              page: 1,
              mascota: this.value.mascota.id
            })
            this.openChangeAtentionsModal = false
          })
      },
      exportData() {
        this.$axios.get('/atencion', {
          params: {
            mascota: this.value.mascota.id
          }
        }, ).then((items) => {
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
          length: 0
        }
      },
      consultaItems() {
        return this.$store.getters['atentions/getList']
      }
    },
    watch: {
      dataMoveSocio: {
        handler() {
          if (this.dataMoveSocio != null) {
            this.dataMoveMascotas = this.dataMoveSocio.mascotas
          }
        },
        deep: true
      },
    },
    selectedAtencion: {
      handler() {
        if (val.length > 0) {
          let atencion = JSON.parse(JSON.stringify(val[0]))
          delete atencion.socio
          console.log(atencion)
          this.$store.dispatch('atentions/setSingle', atencion)
        } else {
          this.$store.dispatch('atentions/cleanSelected')
        }

      },
      deep: true
    },
    page(val) {
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

  }

</script>

<style>

</style>
