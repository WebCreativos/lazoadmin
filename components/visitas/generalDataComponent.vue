<template>
  <div>
    <generalCardComponent class="rounded-xl">
      <GeneralCardTitleComponent class="white--text">
        Nueva visita
      </GeneralCardTitleComponent>
      <v-card-text class="pa-4 rounded-lg">
        <v-row>
          <v-col class="col-md-6 col-12">
            <GeneralCardComponent outlined min-height="500">
              <v-card-text>
                <formsFieldsTextComponent label="NOMBRE" readonly dense filled v-model="value.socio.name"
                  class="rounded-lg white--text"> </formsFieldsTextComponent>
                <formsFieldsTextComponent label="NRO CLIENTE" readonly filled dense v-model="value.socio.id"
                  class="rounded-lg white--text"> </formsFieldsTextComponent>
                <formsFieldsTextComponent label="DIRECCION" readonly dense filled v-model="value.socio.address"
                  class="rounded-lg white--text"> </formsFieldsTextComponent>
                <formsFieldsTextComponent label="TELEFONO" readonly hide-details filled v-model="value.socio.phone"
                  dense class="rounded-lg white--text"> </formsFieldsTextComponent>

              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col class="col-4">
                    <v-btn block class="rounded-lg black--text font-weight-regular" color="secondary" @click="()=>{
                      listSociosModal = true
                      }">BUSCAR</v-btn>
                  </v-col>
                  <v-col class="col-4">
                    <v-btn block class="rounded-lg black--text font-weight-regular" color="secondary" @click="()=>{
                      createSocioModal = true;
                      }">
                      <v-icon>mdi-plus</v-icon> cliente
                    </v-btn>
                  </v-col>
                  <v-col class="col-4">
                    <v-btn block class="rounded-lg black--text font-weight-regular" color="secondary"
                      :disabled="!value.socio.id" :to="`/socios/editar/${value.socio.id}`">
                      <v-icon>mdi-pencil</v-icon> Editar cliente
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </GeneralCardComponent>
          </v-col>
          <v-col class="col-md-6 col-12">
            <generalCardComponent outlined min-height="500">
              <v-data-table show-select single-select v-if="!refreshPetTable" @input="getAtentionsPet($event)"
                :items-per-page="6" :page="pagePets" :items="value.socio.mascotas" hide-default-footer
                :headers="headersMascotas">
                <template v-slot:item.nombre="{ item }">
                  <v-btn block small @click="openEditPetModal(item)">
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
            </generalCardComponent>
          </v-col>
        </v-row>
      </v-card-text>
    </generalCardComponent>
    <v-dialog v-model="createSocioModal" width="80%" height="auto" persistent>
      <generalCardComponent>
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
      </generalCardComponent>
    </v-dialog>
    <v-dialog v-model="listSociosModal">
      <GeneralCardComponent>
        <GeneralCardTitleComponent class="white--text">Socios</GeneralCardTitleComponent>
        <v-card-title>
          <v-row>
            <v-col class="col-md-10 col-12">
              <SociosFindSociosComponent v-model="searchSocios.name_contains"></SociosFindSociosComponent>
            </v-col>
            <v-col class="col-md-2 col-12">
              <v-btn block  height="40" color="secondary" @click="getSocios()">
                <v-icon color="black">mdi-magnify</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <SociosListComponent icon v-model="sociosList" @changePage="getSocios($event)">
            <template v-slot:button="{ item }">
              <v-btn fab x-small color="secondary" class="my-3 black--text rounded-lg elevation-2" @click="setSocio(item)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
          </SociosListComponent>
        </v-card-text>
      </GeneralCardComponent>
    </v-dialog>
    <v-dialog v-model="updateMascotasModal">
      <MascotasFormComponent :value="selectedPet" @input="selectedPet = $event" :handler="updatePet">
      </MascotasFormComponent>
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
        updateMascotasModal: false,
        selectedPet: {},
        refreshPetTable: false,
        searchSocios: {},
        socio: {
          suc: 'CASA CENTRAL',
          socio: 'SI',
          tipo: 'Cliente final',
          user: {},
          mascotas: [{}],
          afiliacion: moment().format('YYYY-MM-DD'),
        },
        razasList: [],
        headersMascotas: [{
          text: "Paciente",
          value: "nombre"
        }, {
          text: 'Estado',
          value: 'state'
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
        this.$axios.put('/mascotas/' + this.selectedPet.id, this.selectedPet)
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
          params: {
            _sort: 'id:desc',
            name_contains: this.searchSocios.name_contains,
          }
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
        if (mascota.socio && mascota.socio.toUpperCase() == 'SI') {
          return 'SOCIO'
        } else {
          return 'NO SOCIO'
        }
      },
      setSocioName(mascota) {
        if (!mascota.socio) return "NO SOCIO"
        return (mascota.socio.toUpperCase() == 'SI') ? 'SOCIO' : 'No SOCIO'
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

  }

</script>
