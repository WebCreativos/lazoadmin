<template>
  <v-form ref="form">
    <v-card>
      <v-card-text class="overflow-card">
        <v-row>
            <!--
          <v-col class="col-12">
            <v-text-field type="text" label="SOCIO" readonly outlined filled dense
              :value="setSocioName(atencion.mascota)" class="rounded-lg white--text"> </v-text-field>
          </v-col>
            -->
          <v-col class="col-12">
            <v-text-field outlined :readonly="readonly" type="date" v-model="atencion.fecha" label="Fecha">
            </v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-text-field outlined :readonly="readonly" type="time" v-model="atencion.hora" label="Hora"></v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-text-field outlined :readonly="readonly" v-model="atencion.peso" type="number" label="Peso">
            </v-text-field>
          </v-col>
          <v-col class="col-12">
            <v-text-field outlined :readonly="readonly" v-model="atencion.temperatura" type="number"
              label="Temperatura"></v-text-field>
          </v-col>
          <v-col class="col-12">
            <createReferenciasComponent v-model="atencion.referencias"></createReferenciasComponent>
          </v-col>
          <v-col class="col-12">
            <v-textarea outlined :readonly="readonly" v-model="atencion.anamnesis" label="Anamnesis"></v-textarea>
          </v-col>
          <v-col class="col-12">
            <v-textarea outlined :readonly="readonly" v-model="atencion.EOG" label="EOG"></v-textarea>
          </v-col>
          <v-col class="col-12">
            <v-textarea outlined :readonly="readonly" v-model="atencion.tratamiento" label="Tratamiento"></v-textarea>
          </v-col>
          <v-col class="col-12">
            <v-select outlined :readonly="readonly" v-model="atencion.proxima_consulta" :items="['Si','No']"
              label="Tendra proxima consulta?"></v-select>
          </v-col>
          <v-col class="col-12">
            <v-card class="rounded-lg" outlined v-show="atencion.proxima_consulta == 'Si'">
              <v-card-title class="font-weight-light">Proxima consulta</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col class="col-12">
                    <v-text-field outlined type="date" :readonly="readonly" v-model="atencion.fecha_proxima_consulta"
                      label="Fecha de proxima consulta">
                    </v-text-field>
                  </v-col>
                  <v-col class="col-12">
                    <v-text-field outlined type="time" :readonly="readonly" v-model="atencion.hora_proxima_consulta"
                      label="Hora de proxima consulta">
                    </v-text-field>
                  </v-col>
                  <v-col class="col-12">
                    <v-textarea outlined :readonly="readonly" v-model="atencion.motivo_proxima_consulta"
                      label="Motivo de proxima consulta">
                    </v-textarea>
                  </v-col>
                  <v-col class="col-12">
                    <createReferenciasComponent v-model="atencion.proxima_referencia"></createReferenciasComponent>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="col-12">
            <v-textarea outlined :readonly="readonly" v-model="atencion.referencias_caja"
              label="Referencias de la caja"></v-textarea>
          </v-col>

          <v-col class="col-12">
            <v-checkbox outlined :readonly="readonly" v-model="atencion.con_costo" label="Consulta con costo">
            </v-checkbox>
          </v-col>
          <v-col class="col-12" v-show="atencion.con_costo">
            <v-text-field outlined :readonly="readonly" v-model="atencion.costo" type="number" label="Costo ($)">
            </v-text-field>
          </v-col>

          <v-col class="col-12">
            <UploadFilesComponent v-model="atencion.files" :readonly="readonly"></UploadFilesComponent>
          </v-col>

          <v-col class="col-12">
            <visitas-productos-component  v-if="!readonly" :readonly="readonly" v-model="atencion.productos">
            </visitas-productos-component>
          </v-col>
          <v-col class="col-12">
            <visitasProximaComponent :readonly="readonly" v-model="atencion.proximas"></visitasProximaComponent>
          </v-col>

        </v-row>
        <v-divider></v-divider>
        <v-card-actions v-if="!readonly">
          <v-spacer></v-spacer>
          <v-btn color="teal darken-4" depressed @click="checkHandler()">Finalizar visita</v-btn>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-form>
</template>

<script>
  import _ from 'lodash';
  import visitasProductosComponent from './visitasProductosComponent.vue';
  import createReferenciasComponent from './createReferenciasComponent.vue';
  import moment from 'moment';
  export default {
    components: {
      visitasProductosComponent,
      createReferenciasComponent
    },

    props: {
      openModal: {
        default: false
      },
      handler: Function,
      readonly: {
        default: false,
        type: Boolean
      }
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
        proximaConsulta: 'No',
        rules: {
          required: [value => !!value || 'Este campo es requerido.'],
        }
      }
    },
    mounted() {
      this.atencion = _.cloneDeep(this.$store.getters['atentions/get'])
      if (!this.atencion.id) {
        this.atencion.fecha = moment().format('YYYY-MM-DD');
        this.atencion.hora = moment().format('HH:mm');
        this.$forceUpdate()
      }

    },
    methods: {
      checkHandler() {
        if (!this.$refs.form.validate()) return
        this.$store.dispatch('atentions/setSingle',this.atencion)
        this.handler();

      },
      onFileChange(e) {
        this.atencion.file = e.target.files[0]
      },
      setSocioName(mascota) {
        if (!mascota.socio) return
      },

    },
    computed:{
      value() {
        return this.$store.getters['atentions/get']
      }
    },
    watch: {
      value: {
        handler(newValue) {
          this.atencion = _.cloneDeep(newValue)
        },
        deep: true
      },
      openModal(value) {
        if (!this.atencion.id) {
          this.atencion.fecha = moment().format('YYYY-MM-DD');
          this.atencion.hora = moment().format('HH:mm');
          this.$forceUpdate()
        }
      }
    }
  }

</script>

<style>

</style>
