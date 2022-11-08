<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12 col-md-12">
        <generalCardComponent class="rounded-lg">
          <v-card-title class="font-weight-light">
            Consultas pendientes
          </v-card-title>
          <v-card-text>
            <v-data-table :headers="headersPendientes" :items="consultasPendientes" hide-default-footer>
              <template v-slot:item.fecha="{ item }">
                {{formatDate(item.fecha)}}
              </template>
              <template v-slot:item.hora="{ item }">
                {{formatHour(item.hora)}}
              </template>
              <template v-slot:item.acciones="{ item }">
                <v-btn small depressed color="success" @click="showConsulta(item)">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <v-btn small depressed color="red" @click="eliminarConsulta()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>

              </template>

            </v-data-table>
          </v-card-text>
        </generalCardComponent>
      </v-col>
      <v-col class="col-12 col-md-12">
        <generalCardComponent>
          <v-card-title class="font-weight-light">
            Consultas aprobadas
            <v-spacer></v-spacer>
            <v-btn  @click="dialogAgregarConsulta = true">AGREGAR CONSULTA</v-btn>
          </v-card-title>
          <v-card-text>
            <v-data-table :headers="headersAprobados" :items="consultasAprobadas" hide-default-footer>
              <template v-slot:item.fecha="{ item }">
                {{formatDate(item.fecha)}}
              </template>
              <template v-slot:item.hora="{ item }">
                {{formatHour(item.hora)}}
              </template>
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  {{ item.detalles }}
                </td>
              </template>
              <template v-slot:item.acciones="{ item }">
                <v-btn small depressed color="red" @click="eliminarConsulta()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>

              </template>

            </v-data-table>

          </v-card-text>
        </generalCardComponent>

      </v-col>
    </v-row>
    <v-dialog v-model="openDialogEditConsulta" persistent>
      <generalCardComponent width="600">
        <v-toolbar color="primary elevation-0">
          <v-toolbar-title class="font-weight-light white--text">Aprobar hora y fecha de la consulta</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="openDialogEditConsulta = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-3">
          <formsFieldsTextComponent type="date" label="Fecha"  v-model="consulta.fecha"></formsFieldsTextComponent>
          <formsFieldsTextComponent type="time" label="Hora"  v-model="consulta.hora"></formsFieldsTextComponent>
        </v-card-text>
        <v-card-actions>
          <v-btn block @click="aprobarConsulta()" color="success">APROBAR CONSULTA</v-btn>
        </v-card-actions>
      </generalCardComponent>
    </v-dialog>
    <v-dialog v-model="dialogAgregarConsulta" persistent>
      <generalCardComponent width="600">
        <v-toolbar color="primary elevation-0">
          <v-toolbar-title class="font-weight-light white--text">Agregar nueva consulta</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialogAgregarConsulta = false">
            <v-icon color="white">mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="mt-2">
          <v-form ref="form">
            <formsFieldsSelectComponent :items="['Higiene','Consulta','Medicacion','Otro']" :rules="rules.required"
              v-model="nuevaConsulta.tipo" label="Tipo de consulta" ></formsFieldsSelectComponent>
            <formsFieldsTextComponent type="date" label="Fecha deseada" v-model="nuevaConsulta.fecha" :rules="rules.required"
              >
            </formsFieldsTextComponent>
            <formsFieldsSelectComponent type="date" label="Socio" :items="socios" item-text="name" item-value="id"
              v-model="nuevaConsulta.socio" :rules="rules.required" >
            </formsFieldsSelectComponent>
            <formsFieldsTextComponent type="time" label="Hora deseada (Opcional)" v-model="nuevaConsulta.hora"
              :rules="rules.required" ></formsFieldsTextComponent>
            <v-textarea  label="Detalles (Indique los detalles de su consulta)" :rules="rules.required"
              v-model="nuevaConsulta.detalles" :counter="250" maxlength="250"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn block @click="agregarConsulta()" color="success">AGREGAR CONSULTA</v-btn>
        </v-card-actions>
      </generalCardComponent>
    </v-dialog>

  </v-container>
</template>

<script>
  import moment from 'moment';
  export default {
    data() {
      return {
        consultasAprobadas: [],
        consultasPendientes: [],
        consulta: {},
        nuevaConsulta: {},
        rules: {
          required: [value => !!value || 'Este campo es requerido.'],
          min: value => value.length >= 3 || 'Este campo debe tener al menos 3 caracteres.',
          max: value => value.length <= 250 || 'Este campo debe tener como maximo 250 caracteres.'
        },
        headersPendientes: [{
            text: 'Tipo',
            value: 'tipo'
          },
          {
            text: 'Fecha',
            value: 'fecha'
          },
          {
            text: 'Hora',
            value: 'hora'
          },
          {
            text: 'Detalles',
            value: 'detalles'
          },
          {
            text: '',
            value: 'acciones',
            align: 'right'
          }
        ],
        headersAprobados: [{
            text: 'Tipo',
            value: 'tipo'
          },
          {
            text: 'Fecha',
            value: 'fecha'
          },
          {
            text: 'Hora',
            value: 'hora'
          },
          {
            text: 'Cancelar consulta',
            value: 'acciones',
            align: 'right'
          }
        ],
        socios: [],
        openDialogEditConsulta: false,
        dialogAgregarConsulta: false

      }
    },
    created() {
      this.getConsultas()
      this.getSocios()
    },
    methods: {
      getConsultas() {
        this.$axios.get('/consultas')
          .then(response => {
            this.consultasAprobadas = response.data.filter((consulta) => {
              return consulta.aprobada == true //&& consulta.fecha <= new Date();
            })
            this.consultasPendientes = response.data.filter((consulta) => {
              return consulta.aprobada == false //&& consulta.fecha <= new Date();
            })
          })
          .catch(error => {
            console.log(error);
          })
      },
      showConsulta(consulta) {
        this.consulta = consulta;
        this.openDialogEditConsulta = true
      },
      aprobarConsulta() {
        this.$axios.put('/consultas/' + this.consulta.id, {
            aprobada: true,
            fecha: this.consulta.fecha,
            hora: this.consulta.hora + ':00.00',
          })
          .then(response => {
            this.getConsultas()
            this.openDialogEditConsulta = false
          })
          .catch(error => {
            console.log(error)
          })
      },
      eliminarConsulta(consulta) {
        this.$axios.delete('/consultas/' + consulta.id)
          .then(response => {
            this.getConsultas()
          })
          .catch(error => {
            console.log(error)
          })
      },
      agregarConsulta() {
          if(!this.$refs.form.validate()) return
          this.nuevaConsulta.hora = this.nuevaConsulta.hora+':00.00'
        this.$axios.post('/consultas', {
            ...this.nuevaConsulta,
            aprobada: true
          })
          .then(() => {
            this.getConsultas()
            this.dialogAgregarConsulta = false
            this.nuevaConsulta = {}
          })
      },
      getSocios() {
        this.$axios.get('/socios')
          .then(response => {
            this.socios = response.data
          })
          .catch(error => {
            console.log(error)
          })
      },
      formatDate(date) {
        return moment(date).format('DD/MM/YYYY')
      },
      formatHour(date) {
        return moment(date, 'HH:mm:ss').format('HH:mm')
      },
    }
  }

</script>
