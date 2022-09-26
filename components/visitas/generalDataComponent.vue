<template>
  <div>
    <v-card class="rounded-xl">
      <v-toolbar color="gd-primary-to-right" elevation="0" class="white--text">
        <v-toolbar-title class="font-weight-light">Nueva atencion</v-toolbar-title>
      </v-toolbar>
      <v-card-text class="pa-4 rounded-lg">
        <v-row>
          <v-col class="col-md-4 col-12">
            <v-row>
              <v-col class="col-md-12 col-12">
                <v-text-field label="NOMBRE" readonly outlined dense filled v-model="value.socio.name"
                  class="rounded-lg white--text"> </v-text-field>
                <v-text-field label="NRO CLIENTE" readonly outlined filled dense v-model="value.socio.id"
                  class="rounded-lg white--text"> </v-text-field>
                <v-text-field label="DIRECCION" readonly outlined dense filled v-model="value.socio.address"
                  class="rounded-lg white--text"> </v-text-field>
                <v-text-field label="TELEFONO" readonly hide-details filled v-model="value.socio.phone" outlined dense
                  class="rounded-lg white--text"> </v-text-field>
              </v-col>
              <v-col class="col-12 d-flex justify-space-between">
                <v-row>
                  <v-col class="col-6">
                    <v-btn block class="white--text" color="gd-primary-to-right font-weight-light rounded-lg" @click="()=>{
                      listSociosModal = true
                      }">BUSCAR</v-btn>
                  </v-col>
                  <v-col class="col-6">
                    <v-btn block class="white--text" color="gd-primary-to-right font-weight-light rounded-lg" @click="()=>{
                      createSocioModal = true;
                      }">
                      <v-icon>mdi-plus</v-icon> cliente
                    </v-btn>
                  </v-col>
                  <v-col class="col-12">
                    <v-btn block class="white--text" color="gd-primary-to-right font-weight-light rounded-lg"
                      :disabled="!value.socio.id" :to="`/socios/editar/${value.socio.id}`">
                      <v-icon>mdi-pencil</v-icon> Editar cliente
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-md-4 col-12">
            <v-card outlined class="rounded-xl">
              <v-data-table show-select single-select v-if="!refreshPetTable" @input="getAtentionsPet($event)" :items-per-page="6"
                :page="pagePets" :items="value.socio.mascotas" hide-default-footer :headers="headersMascotas">
                <template v-slot:item.nombre="{ item }">
                  <v-btn outlined block small @click="openEditPetModal(item)">
                    <div class="d-flex justify-space-between align-center" style="width:100%">
                      {{item.nombre}}<v-icon>mdi-pen</v-icon>
                    </div>
                  </v-btn>
                </template>
                <template v-slot:item.state="{ item }">
                  {{setState(item)}}
                </template>
              </v-data-table>
              <v-card-actions class="d-flex justify-center">
                <v-pagination v-model="pagePets" :length="cantPets()"></v-pagination>
              </v-card-actions>
              <v-card-text>
                <v-textarea hide-details class="mt-3" label="Observaciones" outlined
                  v-model="value.mascota.observaciones" readonly></v-textarea>
              </v-card-text>
              <v-card-text>
                <v-text-field class="mt-3" label="Ultima cuota paga" outlined v-model="value.socio.payment_date"
                  readonly></v-text-field>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="col-md-4 col-12">
            <v-text-field label="NOMBRE" readonly v-model="value.mascota.nombre" outlined dense
              class="rounded-lg white--text"> </v-text-field>
            <v-text-field label="RAZA" readonly v-model="value.mascota.raza" outlined dense
              class="rounded-lg white--text"> </v-text-field> 
            <v-text-field label="COLOR" readonly outlined v-model="value.mascota.color" dense
              class="rounded-lg white--text"> </v-text-field>
            <v-select :items="[{
                      text:'Macho',
                      value: 'M'
                    },{
                      text:'Hembra',
                      value: 'H'
                    },{
                      text:'CASTRADO',
                      value: 'C'
                    }]" label="SEXO" outlined dense v-model="value.mascota.sexo" readonly
              class="rounded-lg white--text">
            </v-select>
            <v-text-field label="EDAD" readonly outlined dense :value="checkYears(value.mascota.fecha_nac)"
              class="rounded-lg white--text"> </v-text-field>
            <v-text-field type="date" label="DECESO" readonly outlined dense :value="checkDate(value.mascota.deceso)"
              class="rounded-lg white--text"> </v-text-field>
            <v-text-field type="text" label="SOCIO" readonly outlined dense :value="setSocioName(value.mascota)"
              class="rounded-lg white--text"> </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-dialog v-model="createSocioModal" width="80%" height="auto" persistent>
      <v-card>
        <v-toolbar class="elevation-0" color="primary">
          <v-toolbar-title class="white--text font-weight-thin">Nuevo cliente</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="createSocioModal = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-4 overflow-card">
          <sociosFormComponent :handler="createSocio" :openModal="createSocioModal" v-model="socio">
          </sociosFormComponent>
        </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
    <v-dialog v-model="listSociosModal">
      <SociosListSociosComponent v-model="sociosList" @changePage="getSocios($event)">
        <template v-slot:button="{ item }">
          <v-btn small class="my-3 gd-primary font-weight-light white--text" @click="setSocio(item)">
            AGREGAR
          </v-btn>
        </template>
        <template v-slot:extraFields>
          <SociosFindSociosComponent v-model="searchSocios.name_contains"></SociosFindSociosComponent>
        </template>
      </SociosListSociosComponent>
    </v-dialog>
    <v-dialog v-model="updateMascotasModal">
        <MascotasFormComponent :value="selectedPet" :handler="updatePet"></MascotasFormComponent>
    </v-dialog>
  </div>
</template>

<script>
  import moment from 'moment';
  export default {
    data() {
      return {
        pagePets: 1,
        createSocioModal: false,
        listSociosModal: false,
        updateMascotasModal:false,
        selectedPet:{},
        refreshPetTable:false,
        searchSocios: {},
        socio: {
          suc: 'CASA CENTRAL',
          socio: 'SI',
          tipo: 'Cliente final',
          user: {},
          mascotas: [{}],
          afiliacion: moment().format('YYYY-MM-DD'),
        },
        razasList:[],
        headersMascotas: [{
          text: 'ID Paciente',
          value: 'id',
        }, {
          text: '',
          value: 'state'
        }, {
          text: "Paciente",
          value: "nombre"
        }],
        pageItems: 0,

      }
    },
    created() {
      this.getSocios()
      this.getRazas()
    },
    methods: {
      openEditPetModal(item) {
        this.selectedPet = item
        this.$forceUpdate()
        this.updateMascotasModal = true
      },
      getRazas() {
        this.$axios.get('/razas')
          .then((data) => {
            this.razasList = data.data
            this.razasList.unshift({
              value: '',
              nombre: 'Seleccione una opcion'
            })
          })
      },
      updatePet() {
        this.$axios.put('/mascotas/'+this.selectedPet.id, this.selectedPet)
          .then((data) => {
            this.updateMascotasModal = false
            const findIndex = this.value.socio.mascotas.findIndex((item) => item.id === data.data.id)
            this.$store.dispatch('atentions/updatePetInSociosList', {
              index: findIndex,
              pet: data.data
            })
            this.refreshPetTable = true 
            setTimeout(() => {
              this.refreshPetTable = false
            }, 500);
          })
      },
      getAtentionsPet(petSelected) {
        if (petSelected.length > 0) {
          let search = {
            page: 1,
            mascota: petSelected[0].id
          }
          this.$store.dispatch('atentions/setMascota', petSelected[0])
          this.$store.dispatch('atentions/findAll', search)
        } else {
          this.$store.dispatch('atentions/setMascota', {})
          this.$store.dispatch('atentions/cleanAll')
        }
      },
      async getSocios(page = 1) {
        this.$store.dispatch('socios/findAll', {
          page: page,
          name: this.searchSocios.name_contains
        })

      },
      cantPets() {
        if (this.value ?.socio ?.mascotas ?.length > 0) {
          return Math.ceil(this.value.socio.mascotas.length / 6)
        } else {
          return 0
        }
      },
      async createSocio() {
        if (!this.socio.user.username) {
          this.socio.user.username = Math.floor(Math.random() * 900000000) + 100000000;
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
          this.$emit('input', {
            ...this.value,
            socio: response.data
          })
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
      setSocio(socio) {
        this.$store.dispatch('atentions/setSocio', socio)
        this.listSociosModal = false
      },
      sociosMascotas() {
        if (this.value.socio.mascotas != undefined) {
          return this.value.socio.mascotas
        }
        return []
      },
      setState(mascota) {
        let ActualDate = moment()
        if (mascota.deceso != "1000-01-01") {
          if (ActualDate.isAfter(mascota.deceso)) {
            return '#'
          } else {}
        }
        if (mascota.socio == "S") {
          return 'SOCIO'
        } else {
          return 'NO SOCIO'
        }
      },
      setSocioName(mascota) {
        if (!mascota.socio) return
        return (mascota.socio=='S')?  'Si': 'No' + ' es socio'
      },
      checkDate(date) {
        if (date == "1000-01-01") return "-"
        return date
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
    },
    computed: {
      sociosList() {
        return this.$store.getters['socios/getList']
      },
      value() {
        return this.$store.getters['atentions/get']
      }
    },
    watch: {
      searchSocios: {
        handler() {
          this.getSocios()
        },
        deep: true

      }
    },

  }

</script>
