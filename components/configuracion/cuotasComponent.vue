<template>
  <generalCardComponent class="rounded-xl">
    <GeneralCardTitleComponent class="white--text">Cuotas</GeneralCardTitleComponent>
    <v-form ref="form">
      <v-card-title>
        <v-row>
          <v-col class="col-12 col-md-10">
            <v-row>
              <v-col class="col-md-5">
                <formsFieldsTextComponent hide-details label="Nombre del plan" class="rounded-lg" solo dense
                  :rules="rules.required" v-model="cuota.nombre">
                </formsFieldsTextComponent>
              </v-col>
              <v-col class="col-md-5">
                <formsFieldsTextComponent hide-details label="Valor de la cuota" class="rounded-lg" type="number" solo
                  dense :rules="rules.required" v-model="cuota.valor">
                </formsFieldsTextComponent>
              </v-col>
              <v-col class="col-md-2 d-flex align-end">
                <v-switch hide-details inset v-model="cuota.default" class="mb-2" label="Cuota base"></v-switch>
              </v-col>

            </v-row>
          </v-col>
          <v-col class="col-md-2 col-12  d-flex align-end">
            <v-btn color="secondary" block height="38" class="rounded-lg black--text font-weight-regular"
              @click="createCuota()">Guardar</v-btn>
          </v-col>
        </v-row>
      </v-card-title>
    </v-form>
    <v-divider></v-divider>
    <v-card-text>
      <v-data-table :items="cuotasList" :headers="headers" hide-default-footer>
        <template v-slot:item.default={item}>
          <v-icon color="success" v-if="item.default">mdi-check</v-icon>
          <v-icon color="red" v-else>mdi-close</v-icon>
        </template>

        <template v-slot:item.actions={item}>
          <v-btn-toggle class="my-3 rounded-lg elevation-1" dense background-color="secondary" color="primary" >
            <v-btn color="transparent" class="font-weight-bold" @click="setDefaultCuota(item)">
               <v-icon>mdi-check</v-icon>&nbsp;Cuota base
            </v-btn>
            <v-btn icon color="transparent" class="font-weight-light" @click="deleteCuota(item.id)">
              <v-icon color="red">ion-ios-trash</v-icon>
            </v-btn>
          </v-btn-toggle>
        </template>

      </v-data-table>

    </v-card-text>
  </generalCardComponent>

</template>

<script>
  export default {
    data() {
      return {
        cuota: {},
        cuotasList: [],
        rules: {
          required: [value => !!value || 'Required.']
        },
        headers: [{
            text: 'Nombre del plan',
            align: 'left',
            sortable: false,
            value: 'nombre'
          },
          {
            text: 'Valor de la cuota',
            align: 'left',
            sortable: false,
            value: 'valor'
          },
          {
            text: 'Predeterminada',
            align: 'center',
            sortable: false,
            value: 'default'
          },
          {
            text: 'Acciones',
            align: 'right',
            sortable: false,
            value: 'actions'
          }
        ]
      }
    },
    created() {
      this.getCuotas()
    },
    methods: {
      getCuotas() {
        this.$axios.get('/cuotas')
          .then(response => {
            this.cuotasList = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      createCuota() {
        if (!this.$refs.form.validate()) return
        this.$axios.post('/cuotas', this.cuota)
          .then(response => {
            this.cuotasList.push(response.data);
            this.cuota = {};
          })
          .catch(error => {
            console.log(error);
          });
      },
      updateCuota(cuota) {
        this.$axios.put('/cuotas/' + cuota.id, cuota)
          .then(response => {
            this.getCuotas()
          })
          .catch(error => {
            console.log(error);
          });

      },
      setDefaultCuota(cuota) {
        let oldDefaultCuota = this.cuotasList.find((c) => c.default)
        if (oldDefaultCuota) {
          oldDefaultCuota.default = false
          this.updateCuota(oldDefaultCuota)
        }
        cuota.default = true
        this.updateCuota(cuota)

      },
      deleteCuota(id) {
        this.$axios.delete('/cuotas/' + id)
          .then(response => {
            this.getCuotas()
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }

</script>

<style>

</style>
