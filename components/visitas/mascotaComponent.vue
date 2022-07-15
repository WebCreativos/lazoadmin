<template>
  <div>
    <v-card class="rounded-xl">
      <v-toolbar color="gd-primary-to-right" elevation="0">
        <v-toolbar-title class="white--text font-weight-light">Atenciones de la mascota {{value.mascota.nombre}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="mr-2 font-weight-light" :disabled="!value.socio.id || !value.mascota.id || value.id" color="white"
          @click="openModalAtencion(createAtencion, 'NUEVA VISITA')">
          Nueva visita
        </v-btn>
        <v-btn class="mr-2 font-weight-light" :disabled="selectedAtencion.length==0" color="white"
          @click="openModalAtencion(createAtencion, 'ACTUALIZAR VISITA')">
          Modificar visita
        </v-btn>
        <v-btn class="font-weight-light" :disabled="selectedAtencion.length==0" color="white" @click="deleteAtencion()">
          Eliminar visita
        </v-btn>
      </v-toolbar>
      <v-card-text class="pa-4 rounded-lg">
        <v-card outlined class="rounded-xl">
          <v-data-table show-select single-select v-model="selectedAtencion" :headers="headers" hide-default-footer
            :items="items.data">
            <template v-slot:item.fecha="{ item }">
              <v-btn outlined small @click="()=>{
                    openModalAtencion(()=>{}, 'VER VISITA', true);
                    atencion = item;
                  }">
                <v-icon>mdi-magnify</v-icon> &nbsp;{{formatDate(item.fecha)}}
              </v-btn>
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
      <v-card-actions class="d-flex justify-center" v-if="atencion.mascota">
          <v-pagination :total-visible="10" :length="Math.ceil(items.length/4)" v-model="page" @input="$emit('changePage',{mascota:atencion.mascota,page:$event})"></v-pagination>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="modalData.openModal" width="80%" height="auto">
      <v-toolbar color="primary" class="elevation-0 white--text font-weight-thin">
        <v-toolbar-title>{{modalData.title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="modalData.openModal = false">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <visitas-data-component class="overflow-card" :openModal="modalData.openModal" :readonly="modalData.readonly" v-model="atencion"
        :handler="modalData.handler">
      </visitas-data-component>
    </v-dialog>
  </div>
</template>

<script>
  import moment from 'moment';
  export default {
    props: {
      items: {
        data:[],
        length:0
      },
      value: {
        default: {
          files: [],
          socio: {
            mascotas: []
          },
          mascota: {},
          productos: [],
          proximas: []
        }
      }
    },
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
          text: "Pronostico",
          value: "pronostico"
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
      openModalAtencion(fn, title, readonly = false) {
        this.modalData.handler = fn;
        this.modalData.title = title;
        this.modalData.readonly = readonly
        this.modalData.openModal = true;
      },
      createAtencion() {
        this.atencion.hora = `${this.atencion.hora}:00.000`
        this.$axios.post('/atencion', this.atencion).then(async response => {
          if (this.atencion.proxima_consulta) {
            this.addToAgenda()
          }
          this.$emit('getAtencionMascota', this.atencion.mascota)
          await this.updateMascota()

          let uploadFiles = this.atencion.files.filter((file) => file instanceof File)
          this.uploadFile(response.data.id, uploadFiles)
          console.log(this.atencion)
          this.formatAtencion()
          this.formatModal()
        }).catch(error => {
          console.log(error);
        });
      },
      updateAtencion() {
        this.$axios.put('/atencion/' + this.atencion.id, this.atencion).then(async response => {
          console.log(this.atencion.mascota)

          let uploadFiles = this.atencion.files.filter((file) => file instanceof File)
          this.uploadFile(response.data.id, uploadFiles)
          this.$emit('getAtencionMascota', this.atencion.mascota)
          this.selectedAtencion = []
          this.formatModal()
        }).catch(error => {
          console.log(error);
        });
      },
      deleteAtencion() {
        this.$axios.delete(`/atencion/${this.atencion.id}`)
          .then(() => {
            this.$emit('getAtencionMascota', this.atencion.mascota)
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
        if (this.atencion.hora_proxima_consulta)
          this.atencion.hora_proxima_consulta = this.atencion.hora_proxima_consulta + ':00.00'

        var agenda = {
          type: 'consulta',
          consulta: {
            socio: this.atencion.socio,
            tipo_consulta: 'Consulta'
          },
          fecha: this.atencion.fecha_proxima_consulta,
          hora: this.atencion.hora_proxima_consulta,
          titulo: 'Nueva consulta para ' + this.atencion.mascota.nombre,
          detalles: this.atencion.proxima_consulta,
          referencias: this.atencion.proxima_referencia
        }

        this.$axios.post('/agendas', agenda).then(data => {
          //clone atencion 
          let proximaAtencion = {
            socio: this.atencion.socio,
            mascota: this.atencion.mascota,
            fecha: agenda.fecha,
            hora: agenda.hora,
            detalles: agenda.detalles,
            referencias: agenda.referencias,
          }
          this.$axios.post('/atencion', proximaAtencion)
        })

      },


      formatDate(date) {
        if(!date) return 'Fecha no asignada'
        return moment(date).format('DD/MM/YYYY')
      },
      formatHour(hour) {
        if(!hour) return 'Hora no asignada'
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
    watch: {
      selectedAtencion(val) {
        if (val.length > 0) {
          this.atencion = JSON.parse(JSON.stringify(val[0]))
        } else {
          this.formatAtencion()
        }
      },
      "modalData.openModal": function(val) {
        if (!val) {
          this.formatAtencion()
        }
      },
      value: {
        handler(val) {
          this.atencion = val
        },
        deep: true
      }

    },

  }

</script>

<style>

</style>
