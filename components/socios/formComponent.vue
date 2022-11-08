<template>
  <generalCardComponent class="rounded-xl">
    <GeneralCardTitleComponent class="white--text">
      <slot></slot>
    </GeneralCardTitleComponent>
    <v-card-text class="pa-2">
      <v-form ref="form">
        <v-row>
          <v-col class="col-12 col-md-6">
            <formsFieldsTextComponent label="DOCUMENTO" type="number" class="rounded-lg"  v-model="doc">
            </formsFieldsTextComponent>
            <formsFieldsTextComponent label="DIRECCION" class="rounded-lg"  v-model="address">
            </formsFieldsTextComponent>
            <formsFieldsTextComponent label="DIRECCION COBRANZA  (Opcional)" v-model="direccion_cobranza"
              class="rounded-lg" >
            </formsFieldsTextComponent>
            <formsFieldsTextComponent label="LOCALIDAD" class="rounded-lg"  v-model="localidad">
            </formsFieldsTextComponent>
            <formsFieldsTextComponent label="RUT (Opcional)" type="number" v-model="rut" class="rounded-lg" >
            </formsFieldsTextComponent>
          </v-col>
          <v-col class="col-12 col-md-6">
            <formsFieldsTextComponent label="FECHA AFILIACION (Opcional)" type="date" v-model="afiliacion"
              class="rounded-lg" >
            </formsFieldsTextComponent>
            <formsFieldsSelectComponent label="SOCIO" :items="['Si','No']" v-model="socio" class="rounded-lg" >
            </formsFieldsSelectComponent>
            <formsFieldsTextComponent label="TELEFONO" type="text" class="rounded-lg"  v-model="phone">
            </formsFieldsTextComponent>
            <formsFieldsTextComponent label="CORREO  (Opcional)" type="email" class="rounded-lg"  v-model="email">
            </formsFieldsTextComponent>
            <formsFieldsSelectComponent label="TIPO" :items="['Cliente final']" v-model="tipo" class="rounded-lg" >
            </formsFieldsSelectComponent>
          </v-col>
          <template v-if="socio == 'Si'">
            <v-col class="col-md-6">
              <formsFieldsSelectComponent label="CUOTA" :items="cuotasList" v-model="cuota" item-text="nombre"
                item-value="id" class="rounded-lg"  :rules="rules.required">
              </formsFieldsSelectComponent>
            </v-col>
          </template>
          <v-col class="col-12 col-md-12">
            <generalCardComponent outlined class="rounded-xl">
              <GeneralCardTitleComponent color="transparent" >
                <span class="text-subtitle-1 font-weight-regular">Mascotas</span>
              </GeneralCardTitleComponent>
              <v-divider></v-divider>
              <v-card-text>
                <v-row v-for="(mascota,index) in mascotas" :key="index">
                  <v-col class="col-12 col-md-6">
                    <formsFieldsTextComponent label="NOMBRE" class="rounded-lg"  v-model="mascota.nombre">
                    </formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-12 col-md-6">
                    <mascotasRazasComponent v-model="mascota.raza"></mascotasRazasComponent>
                  </v-col>
                  <v-col class="col-12 col-md-6">
                    <mascotasColoresComponent v-model="mascota.color"></mascotasColoresComponent>
                  </v-col>
                  <v-col class="col-12 col-md-6">
                    <MascotasEspeciesComponent v-model="mascota.especie">
                    </MascotasEspeciesComponent>
                  </v-col>
                  <v-col class="col-12 col-md-6">
                    <formsFieldsTextComponent type="date" label="Fecha de nacimiento" class="rounded-lg" 
                      v-model="mascota.fecha_nac">
                    </formsFieldsTextComponent>
                  </v-col>
                  <v-col class="col-12 col-md-6">
                    <formsFieldsSelectComponent label="SEXO" :items="[{
                      text:'Macho',
                      value: 'M'
                    },{
                      text:'Hembra',
                      value: 'H'
                    },{
                      text:'Indefinido',
                      value: 'C'
                    }]" class="rounded-lg"  v-model="mascota.sexo">
                    </formsFieldsSelectComponent>
                  </v-col>
                  <v-col class="col-12 col-md-12">
                    <formsFieldsSelectComponent label="SOCIO" :items="[{
                      text:'Si',
                      value: 'Si'
                    },{
                      text:'No',
                      value: 'No'
                    }]" class="rounded-lg"  v-model="mascota.socio">
                    </formsFieldsSelectComponent>
                  </v-col>
                  <v-col class="col-12 col-md-12">
                    <FormsFieldsTextareaComponent label="Observaciones" class="rounded-lg"  v-model="mascota.observaciones">
                    </FormsFieldsTextareaComponent>
                  </v-col>


                  <v-col class="col-12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-title>
                <v-btn color="secondary" v-if="mascotas.length>1" depressed @click="deleteMascota()"
                  class="black--text font-weight-regular rounded-lg mr-1">
                  Eliminar
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-btn color="secondary" class="black--text font-weight-regular rounded-lg"
                  @click="addMascota()">
                  Agregar
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-card-title>
            </generalCardComponent>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="secondary" class="black--text font-weight-regular rounded-lg mr-1" @click="checkHandler()">
        Guardar
      </v-btn>
    </v-card-actions>

  </generalCardComponent>
</template>

<script>
  import moment from 'moment'
  import {
    mapFields,
    mapMultiRowFields
  } from 'vuex-map-fields';

  export default {
    props: {
      value: Object,
      handler: Function,
      openModal: false
    },
    data() {
      return {
        rules: {
          required: [value => !!value || 'Este campo es requerido'],
        },
        cuotasList: [],
      }
    },
    created() {
      this.getCuotas()
    },
    methods: {
      addMascota() {
        this.$set(this.socio.mascotas, this.socio.mascotas.length, {
          color: {},
          especie: {},
          raza: {}
        });
      },
      deleteMascota() {
        this.$delete(this.socio.mascotas, this.socio.mascotas.length - 1);
      },
      checkHandler() {
        if (!this.$refs.form.validate()) return
        this.handler();
        this.$emit('input', this.socio)
      },
      getCuotas() {
        this.$axios.get('/cuotas')
          .then(response => {
            this.cuotasList = response.data;
            let defaultCuota = response.data.find((c) => c.default)
          })
          .catch(error => {
            console.log(error);
          });
      },
      setValueCreatedAt(value) {
        return moment(value).format('DD/MM/YYYY');
      }

    },
    computed: {
      ...mapFields('socios', [
        'socio.name',
        'socio.address',
        'socio.doc',
        'socio.direccion_cobranza',
        'socio.localidad',
        'socio.rut',
        'socio.tipo',
        'socio.afiliacion',
        'socio.socio',
        'socio.phone',
        'socio.email',
        'socio.cuota',
      ]),
      ...mapMultiRowFields('socios', [
        'socio.mascotas',
      ]),
    },
    watch: {
      openModal() {
        if (this.openModal) {
          this.socio = {
            suc: 'CASA CENTRAL',
            socio: 'SI',
            tipo: 'Cliente final',
            user: {},
            mascotas: [{}],
            afiliacion: moment().format('YYYY-MM-DD'),
          }
        }
      }
    },
  }

</script>

<style lang="scss">
</style>
