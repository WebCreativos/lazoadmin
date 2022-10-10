<template>
  <v-card class="rounded-xl" outlined>
    <v-toolbar color="teal darken-3" class="elevation-0 white--text">
      <v-toolbar-title class="font-weight-light">
        Cuotas
      </v-toolbar-title>
    </v-toolbar>
    <v-form ref="form">
      <v-card-title>
        <v-row>
          <v-col class="col-12 col-md-10">
            <v-row>
              <v-col class="col-md-4">
                <v-text-field hide-details label="Nombre del plan" class="rounded-lg" solo dense :rules="rules.required"
                  v-model="cuota.nombre">
                </v-text-field>
              </v-col>
              <v-col class="col-md-4">
                <v-text-field hide-details label="Valor de la cuota" class="rounded-lg" type="number" solo dense
                  :rules="rules.required" v-model="cuota.valor">
                </v-text-field>
              </v-col>
              <v-col class="col-md-4">
                <v-switch hide-details v-model="cuota.default" class="mt-1" label="Cuota base"></v-switch>
              </v-col>

            </v-row>
          </v-col>
          <v-col class="col-md-2 col-12">
            <v-btn color="teal darken-3" @click="createCuota()" block
              class="rounded-lg white--text font-weight-light">Guardar</v-btn>
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
          <v-btn small class="white--text font-weight-light rounded-lg" @click="setDefaultCuota(item)" color="teal darken-3">
            Cuota base <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn small class="white--text font-weight-light rounded-lg" color="red" @click="deleteCuota(item.id)">
            Eliminar <v-icon>mdi-delete</v-icon>
          </v-btn>

        </template>

      </v-data-table>

    </v-card-text>
  </v-card>

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
          if(!this.$refs.form.validate()) return
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
        let oldDefaultCuota = this.cuotasList.find((c)=>c.default)
        if(oldDefaultCuota) {
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
