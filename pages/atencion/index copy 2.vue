<template>
  <v-container fluid>
    <!--
    <v-row>
      <v-col class="col-12 col-md-12">
        <v-card class="rounded-xl">
          <v-toolbar color="teal darken-4" elevation="0" class="white--text">
            <v-toolbar-title class="font-weight-light">Nueva atencion</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pa-4 rounded-lg">
            <v-row>
              <v-col class="col-md-4 col-12">
                <v-row>
                  <v-col class="col-md-12 col-12">
                    <v-text-field label="NOMBRE" readonly outlined dense filled v-model="atencion.socio.name"
                      class="rounded-lg white--text"> </v-text-field>
                    <v-text-field label="NRO CLIENTE" readonly outlined filled dense v-model="atencion.socio.id"
                      class="rounded-lg white--text"> </v-text-field>
                    <v-text-field label="APELLIDO" readonly outlined dense filled v-model="atencion.socio.last_name"
                      class="rounded-lg white--text"> </v-text-field>
                    <v-text-field label="DIRECCION" readonly outlined dense filled v-model="atencion.socio.address"
                      class="rounded-lg white--text"> </v-text-field>
                    <v-text-field label="TELEFONO" readonly hide-details filled v-model="atencion.socio.phone" outlined
                      dense class="rounded-lg white--text"> </v-text-field>
                  </v-col>
                  <v-col class="col-12 d-flex justify-space-between">
                    <v-row>
                      <v-col class="col-6">
                        <v-btn block class="white--text" color="teal darken-4 font-weight-light rounded-lg"
                          @click="()=>{
                      openModalListSocios = true
                      }">BUSCAR</v-btn>
                      </v-col>
                      <v-col class="col-6">
                        <v-btn block class="white--text" color="teal darken-4 font-weight-light rounded-lg"
                          @click="()=>{
                      createSocioModal = true;
                      }">
                          <v-icon>mdi-plus</v-icon> cliente
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="col-md-4 col-12">
                <v-card outlined class="rounded-xl">
                  <v-data-table show-select single-select v-model="selectedMascota" :items="atencion.socio.mascotas"
                    hide-default-footer :headers="headersMascotas">
                  </v-data-table>
                  <v-card-text>
                    <v-textarea hide-details class="mt-3" label="Observaciones" outlined
                      v-model="atencion.mascota.observaciones" readonly></v-textarea>
                  </v-card-text>
                  <v-card-text>
                    <v-text-field class="mt-3" label="Ultima cuota paga" outlined v-model="atencion.socio.payment_date"
                      readonly></v-text-field>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col class="col-md-4 col-12">
                <v-text-field label="RAZA" readonly v-model="atencion.mascota.raza" outlined dense
                  class="rounded-lg white--text"> </v-text-field>
                <v-text-field label="COLOR" readonly outlined v-model="atencion.mascota.color" dense
                  class="rounded-lg white--text"> </v-text-field>
                <v-select :items="[{
                      text:'Macho',
                      value: 'F'
                    },{
                      text:'Hembra',
                      value: 'M'
                    },{
                      text:'Otro',
                      value: 'NN'
                    }]" label="SEXO" outlined dense v-model="atencion.mascota.sexo" readonly
                  class="rounded-lg white--text">
                </v-select>
                <v-text-field label="EDAD" readonly outlined dense v-model="atencion.mascota.edad"
                  class="rounded-lg white--text"> </v-text-field>
                <v-text-field type="date" label="DECESO" readonly outlined dense v-model="atencion.mascota.deceso"
                  class="rounded-lg white--text"> </v-text-field>
                <v-text-field type="text" label="SOCIO" readonly outlined dense :value="setSocioName(atencion.mascota)"
                  class="rounded-lg white--text"> </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-12">
        <v-card class="rounded-xl">
          <v-toolbar color="teal darken-4" elevation="0">
            <v-toolbar-title class="white--text font-weight-light">Atenciones de la mascota</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn class="mr-2 font-weight-light"
              :disabled="!this.atencion.socio.id || !this.atencion.mascota.id || this.atencion.id" color="white" @click="()=>{
                      modalAtencion = true}">
              Nueva visita
            </v-btn>
            <v-btn class="mr-2 font-weight-light" :disabled="selectedAtencion.length==0" color="white" @click="()=>{
                      modalUpdateAtencion = true}">
              Modificar visita
            </v-btn>
            <v-btn class="font-weight-light" :disabled="selectedAtencion.length==0" color="white"
              @click="deleteMascota()">
              Eliminar visita
            </v-btn>
          </v-toolbar>
          <v-card-text class="pa-4 rounded-lg">
            <v-card outlined class="rounded-xl">
              <v-data-table show-select single-select v-model="selectedAtencion" :headers="headers" hide-default-footer
                :items="consultaItems">
                <template v-slot:item.fecha="{ item }">
                  <v-btn outlined small @click="()=>{
                    openAtencionModal = true;
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
          <v-card-actions>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col class="col-12">
        <visitasAllListComponent></visitasAllListComponent>
      </v-col>
    </v-row>
    <v-dialog v-model="createSocioModal" width="80%" height="auto">
      <v-card>
        <v-toolbar class="elevation-0" color="teal darken-4">
          <v-toolbar-title class="white--text font-weight-thin">Nuevo cliente</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="createSocioModal = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-4 overflow-card">
          <formSociosComponent :handler="createSocio" v-model="socio"></formSociosComponent>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
    <v-dialog v-model="openModalListSocios">
      <SociosListSociosComponent v-model="sociosList">
        <template v-slot:button="{ item }">
          <v-btn outlined @click="($e)=>{
            atencion.socio = item;
            openModalListSocios = false;
        }" color="teal darken-4">
            AGREGAR
          </v-btn>
        </template>
        <template v-slot:extraFields>
          <SociosFindSociosComponent v-model="searchSocios.id"></SociosFindSociosComponent>
        </template>
      </SociosListSociosComponent>
    </v-dialog>
    <v-dialog v-model="modalAtencion" width="80%" height="auto" persistent>
      <v-toolbar color="teal darken-4" class="elevation-0 white--text font-weight-thin">
        <v-toolbar-title>NUEVA VISITA</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="modalAtencion = false">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <visitas-data-component class="overflow-card" v-model="atencion" :handler="createAtencion" :mascota="mascota"
        @changeMascota="($e)=>{
            mascota = $e
          }"></visitas-data-component>
    </v-dialog>
    <v-dialog v-model="modalUpdateAtencion" width="80%" height="auto" persistent>
      <v-toolbar color="teal darken-4" class="elevation-0 white--text font-weight-thin">
        <v-toolbar-title>EDITAR VISITA</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="modalUpdateAtencion = false">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <visitas-data-component v-model="atencion" :handler="updateAtencion" :mascota="mascota" @changeMascota="($e)=>{
              mascota = $e
            }"></visitas-data-component>
    </v-dialog>


    <v-dialog v-model="openAtencionModal" width="80%" height="auto" persistent>
      <v-toolbar color="teal darken-4" class="elevation-0 white--text font-weight-thin">
        <v-toolbar-title>VER VISITA</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="openAtencionModal = false">
          <v-icon color="white">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <visitas-data-component class="overflow-card" readonly v-model="atencion"></visitas-data-component>
    </v-dialog>


-->
  </v-container>
</template>

<script>
  import moment from 'moment'
  //import FormSociosComponent from '~/components/socios/formSociosComponent.vue'
  import VisitasDataComponent from '~/components/visitas/visitasDataComponent.vue'
  export default {
    components: {
      //FormSociosComponent,
      VisitasDataComponent
    },
    data() {
      return {
        atencion: {
          files: [],
          socio: {
            mascotas: []
          },
          mascota: {},
          productos: [],
          proximas: []
        },
        socio: {
          suc: 'CASA CENTRAL',
          socio: 'SI',
          tipo: 'Cliente final',
          user: {},
          mascotas: [{}],
          afiliacion: moment().format('YYYY-MM-DD'),
        },
        openAtencionModal: false,
        sociosList: [],
        searchSocios: {},
        selectedAtencion: [],
        consultaItems: [],
        consultaItemsAll: [],
        modalAtencion: false,
        modalUpdateAtencion: false,
        selectedMascota: [],
        mascota: {},
        headersMascotas: [{
          text: 'ID Paciente',
          value: 'id',
        }, {
          text: "Paciente",
          value: "nombre"
        }],
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
        openModalListSocios: false,
        createSocioModal: false,
        patologiasList: [
          'Patologia 1',
          'Patologia 2',
          'Patologia 3',
        ],
        patologia: null
      }
    },
    created() {
      this.getSocios()
    },
    methods: {
      getSocios() {
        this.$axios.get('/socios', {
            params: this.searchSocios
          })
          .then(response => {
            this.sociosList = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      async createSocio() {
        if(!this.socio.user.username) {
          this.socio.user.username = Math.floor(Math.random()*90000) + 10000;
        }
        if (!this.socio.user.email) {
          this.socio.user.email = `${this.socio.user.username}@gmail.com`
        }
        if (!this.socio.user.password) {
          this.socio.user.password = this.socio.user.username
        }
        const user = (await this.$axios.post('users/', this.socio.user)).data.id
        this.socio.user = user
        await this.$axios.post('/socios', this.socio).then(response => {
          this.atencion.socio = response.data
          this.socio = {
            user: {},
            mascotas: [{}]
          }
          this.$forceUpdate()
          this.createSocioModal = false;
        }).catch(error => {
          console.log(error);
        });
      },


      cleanSocio() {
        console.log(this.atencion);
        this.consultaItems = []
        this.selectedAtencion = []
        this.selectedMascota = []
      },
      setSocioName(mascota) {
        if (!mascota.socio) return
        return mascota.socio + ' es socio'
      },
      createAtencion() {
        this.atencion.hora = `${this.atencion.hora}:00.000`
        this.$axios.post('/atencion', this.atencion).then(response => {
          if (this.atencion.proxima_consulta) {
            this.addToAgenda()
          }
          this.getAtencionMascota(this.atencion.mascota)

          let uploadFiles = this.atencion.files.filter((file) => file instanceof File)
          this.uploadFile(response.data.id, uploadFiles)
          console.log(this.atencion)
          this.formatAtencion()
          this.modalAtencion = false
        }).catch(error => {
          console.log(error);
        });
      },
      updateAtencion() {
        this.$axios.put('/atencion/' + this.atencion.id, this.atencion).then(async response => {
          console.log(this.atencion.mascota)

          let uploadFiles = this.atencion.files.filter((file) => file instanceof File)
          this.uploadFile(response.data.id, uploadFiles)
          await this.getAtencionMascota(this.atencion.mascota)
          await this.updateMascota()
          this.modalUpdateAtencion = false
          this.selectedAtencion = []

        }).catch(error => {
          console.log(error);
        });
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
        this.$forceUpdate()
      },

      //add to agenda 
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
      updateMascota() {
        this.$axios.put('/mascotas/' + this.mascota.id, this.mascota).then(response => {}).catch(error => {
          console.log(error);
        });
      },
      getAtencionMascota(mascota) {
        this.$axios.get(`/atencion?mascota=${mascota.id}`, this.atencion)
          .then(response => {
            this.consultaItems = response.data
          })
      },
      deleteMascota() {
        this.$axios.delete(`/atencion/${this.atencion.id}`)
          .then(() => {
            this.getAtencionMascota(this.atencion.mascota)
            this.selectedAtencion = []
          })
      },
      deletePatologia(index) {
        this.$delete(this.atencion.patologias, index);
      },
      addPatologia() {
        this.atencion.patologias.push({
          nombre: this.patologia
        });
      },
      formatDate(date) {
        let finalDate = date.split('-')
        return `${finalDate[2]}/${finalDate[1]}/${finalDate[0]}`
      },
      formatHour(hour) {
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
      selectedMascota(val) {
        if (val.length == 0) {
          this.atencion.mascota = {}
          this.consultaItems = []
        } else {
          this.atencion.mascota = val[0]
          this.atencion.mascota.edad = moment().diff(this.atencion.mascota.fecha_nac, 'years')
          this.mascota = val[0]
          this.getAtencionMascota(val[0])
        }
      },
      selectedAtencion(val) {
        if (val.length > 0) {
          this.atencion = JSON.parse(JSON.stringify(val[0]))
        } else {
          //this.formatAtencion()
        }
      },
      searchSocios: {
        handler() {
          this.getSocios()
        },
        deep: true

      }
    }
  }

</script>

<style>

</style>
