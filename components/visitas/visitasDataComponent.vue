<template>
  <generalCardComponent outlined>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <!--
          <v-col class="col-12">
            <formsFieldsTextComponent type="text" label="SOCIO" readonly  filled dense
              :value="setSocioName(atencion.mascota)" class="rounded-lg white--text"> </formsFieldsTextComponent>
          </v-col>
            -->
          <v-col class="col-12 col-md-6">
            <formsFieldsTextComponent :readonly="readonly" type="date" v-model="atencion.fecha" label="Fecha">
            </formsFieldsTextComponent>
          </v-col>
          <v-col class="col-12  col-md-6">
            <formsFieldsTextComponent :readonly="readonly" type="time" v-model="atencion.hora" label="Hora">
            </formsFieldsTextComponent>
          </v-col>
          <v-col class="col-12  col-md-6">
            <formsFieldsTextComponent :readonly="readonly" v-model="atencion.peso" type="number" label="Peso">
            </formsFieldsTextComponent>
          </v-col>
          <v-col class="col-12  col-md-6">
            <formsFieldsTextComponent :readonly="readonly" v-model="atencion.temperatura" type="number"
              label="Temperatura"></formsFieldsTextComponent>
          </v-col>
          <v-col class="col-12 col-md-12">
            <createReferenciasComponent v-model="atencion.referencias"></createReferenciasComponent>
          </v-col>
          <v-col class="col-12 col-md-6">
            <FormsFieldsTextareaComponent :readonly="readonly" v-model="atencion.anamnesis" label="Anamnesis"></FormsFieldsTextareaComponent>
          </v-col>
          <v-col class="col-12 col-md-6">
            <FormsFieldsTextareaComponent :readonly="readonly" v-model="atencion.EOG" label="EOG"></FormsFieldsTextareaComponent>
          </v-col>
          <v-col class="col-12 col-md-12">
            <FormsFieldsTextareaComponent :readonly="readonly" v-model="atencion.tratamiento" label="Tratamiento"></FormsFieldsTextareaComponent>
          </v-col>
          <v-col class="col-12">
            <formsFieldsSelectComponent :readonly="readonly" v-model="atencion.proxima_consulta" :items="['Si','No']"
              label="Tendra proxima consulta?"></formsFieldsSelectComponent>
          </v-col>
          <v-col class="col-12">
            <generalCardComponent class="rounded-lg" v-show="atencion.proxima_consulta == 'Si'">
              <v-card-title class="font-weight-light">Proxima consulta</v-card-title>
              <v-card-text>
                <v-row>
                  <v-col class="col-12">
                    <formsFieldsTextComponent type="date" :readonly="readonly" v-model="atencion.fecha_proxima_consulta"
                      label="Fecha de proxima consulta">
                    </formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-12">
                    <formsFieldsTextComponent type="time" :readonly="readonly" v-model="atencion.hora_proxima_consulta"
                      label="Hora de proxima consulta">
                    </formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-12">
                    <v-textarea :readonly="readonly" v-model="atencion.motivo_proxima_consulta"
                      label="Motivo de proxima consulta">
                    </v-textarea>
                  </v-col>
                  <v-col class="col-12">
                    <createReferenciasComponent v-model="atencion.proxima_referencia"></createReferenciasComponent>
                  </v-col>
                </v-row>
              </v-card-text>
            </generalCardComponent>
          </v-col>
          <v-col class="col-12">
            <v-checkbox :readonly="readonly" v-model="atencion.con_costo" label="Consulta con costo">
            </v-checkbox>
          </v-col>
          <v-col class="col-12" v-show="atencion.con_costo">
            <formsFieldsTextComponent :readonly="readonly" v-model="atencion.costo" type="number" label="Costo ($)">
            </formsFieldsTextComponent>
          </v-col>
        </v-row>
      </v-form>
      <v-divider></v-divider>
    </v-card-text>
    <v-card-actions v-if="!readonly">
      <v-spacer></v-spacer>
      <v-btn color="primary" depressed @click="checkHandler()">Finalizar visita</v-btn>
    </v-card-actions>
  </generalCardComponent>
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
        this.$store.dispatch('atentions/setSingle', this.atencion)
        this.handler();

      },
      onFileChange(e) {
        this.atencion.file = e.target.files[0]
      },
      setSocioName(mascota) {
        if (!mascota.socio) return
      },

    },
    computed: {
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
