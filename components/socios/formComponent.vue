<template>
  <v-card class="rounded-xl">
    <v-toolbar color="gd-primary-to-right" elevation="0">
      <v-toolbar-title class="white--text font-weight-light">
        <slot></slot>
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text class="pa-2">
      <v-form ref="form">
        <v-row>
          <v-col class="col-md-12">
            <v-text-field label="CLIENTE AGREGADO" :value="setValueCreatedAt(socio.created_at)" outlined
              dense class="rounded-lg"></v-text-field>
            <v-text-field label="NOMBRE SOCIO" class="rounded-lg" hide-details outlined dense v-model="socio.name">
            </v-text-field>
          </v-col>
          <v-col class="col-12 col-md-6">
            <v-text-field label="DOCUMENTO" type="number" class="rounded-lg" outlined dense
              v-model="socio.doc">
            </v-text-field>
            <v-text-field label="DIRECCION" class="rounded-lg" outlined dense v-model="socio.address">
            </v-text-field>
            <v-text-field label="DIRECCION COBRANZA  (Opcional)" v-model="socio.direccion_cobranza" class="rounded-lg"
              outlined dense>
            </v-text-field>
            <v-text-field label="LOCALIDAD" class="rounded-lg" outlined dense v-model="socio.localidad">
            </v-text-field>
            <v-text-field label="RUT (Opcional)" type="number" v-model="socio.rut" class="rounded-lg" outlined
              dense>
            </v-text-field>
            <v-select label="TIPO" :items="['Cliente final']" v-model="socio.tipo" class="rounded-lg" outlined dense>
            </v-select>

          </v-col>
          <v-col class="col-12 col-md-6">
            <v-text-field label="FECHA AFILIACION (Opcional)" type="date" v-model="socio.afiliacion" class="rounded-lg"
              outlined dense>
            </v-text-field>
            <v-select label="SOCIO" :items="['Si','No']" v-model="socio.socio" class="rounded-lg" outlined dense>
            </v-select>
            <v-select label="SUCURSAL" :items="['CASA CENTRAL']" v-model="socio.suc" class="rounded-lg" outlined dense>
            </v-select>
            <v-text-field label="TELEFONO" type="text" class="rounded-lg" outlined dense v-model="socio.phone">
            </v-text-field>
            <v-text-field label="CORREO  (Opcional)" type="email" class="rounded-lg" outlined dense
              v-model="socio.email">
            </v-text-field>
          </v-col>
          <template v-if="socio.socio == 'Si'">
            <v-col class="col-md-6">
              <v-select label="CUOTA" :items="cuotasList" v-model="socio.cuota" item-text="nombre" item-value="id"
                class="rounded-lg" outlined dense :rules="rules.required">
              </v-select>
            </v-col>
            <v-col class="col-md-6">
              <v-select label="METODO DE PAGO" :items="['Mostrador','Automatico oca','Automatico (Otras)']"
                v-model="socio.metodo_pago" class="rounded-lg" outlined dense :rules="rules.required">
              </v-select>
            </v-col>
            <v-col class="col-md-12" v-if="socio.metodo_pago == 'Automatico oca' || socio.metodo_pago == 'Automatico (Otras)'">
              <v-text-field label="TARJETA"
                v-model="socio.tarjeta" class="rounded-lg" outlined dense>
              </v-text-field>
            </v-col>

          </template>
          <v-col class="col-12 col-md-12">
            <v-card outlined dense class="rounded-xl">
              <v-toolbar color="gd-primary-to-right white--text" elevation="0">
                <v-toolbar-title class="font-weight-light">
                  Mascotas
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-row v-for="(mascota,index) in socio.mascotas" :key="index">
                  <v-col class="col-12 col-md-12">
                    <v-text-field label="NOMBRE" class="rounded-lg" outlined dense
                      v-model="socio.mascotas[index].nombre">
                    </v-text-field>
                  </v-col>
                  <v-col class="col-12 col-md-12">
                      <mascotasRazasComponent v-model="socio.mascotas[index].raza"></mascotasRazasComponent>
                  </v-col>
                  <v-col class="col-12 col-md-12">
            <mascotasColoresComponent v-model="socio.mascotas[index].color"></mascotasColoresComponent>
                  </v-col>
                  <v-col class="col-12 col-md-12">
                    <v-text-field type="date" label="Fecha de nacimiento" class="rounded-lg" outlined dense
                      v-model="socio.mascotas[index].fecha_nac">
                    </v-text-field>
                  </v-col>
                  <v-col class="col-12 col-md-12">
                    <v-select label="SEXO" :items="[{
                      text:'Macho',
                      value: 'M'
                    },{
                      text:'Hembra',
                      value: 'H'
                    },{
                      text:'Indefinido',
                      value: 'C'
                    }]" class="rounded-lg" outlined dense v-model="socio.mascotas[index].sexo">
                    </v-select>
                  </v-col>
                  <v-col class="col-12 col-md-12">
                    <v-select label="SOCIO" :items="[{
                      text:'Si',
                      value: 'Si'
                    },{
                      text:'No',
                      value: 'No'
                    }]" class="rounded-lg" outlined dense v-model="socio.mascotas[index].socio">
                    </v-select>
                  </v-col>
                  <v-col class="col-12">
                    <sociosCreateEspeciesComponent v-model="socio.mascotas[index].especie">
                    </sociosCreateEspeciesComponent>
                  </v-col>
                  <v-col class="col-12 col-md-12">
                    <v-textarea label="Observaciones" class="rounded-lg" outlined dense
                      v-model="socio.mascotas[index].observaciones">
                    </v-textarea>
                  </v-col>


                  <v-col class="col-12">
                    <v-divider></v-divider>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-title>
                <v-btn color="gd-primary-to-right" v-if="socio.mascotas.length>1" depressed @click="deleteMascota()"
                  class="white--text font-weight-light rounded-lg mr-1">
                  Eliminar
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-btn color="gd-primary-to-right" class="white--text font-weight-light rounded-lg"
                  @click="addMascota()">
                  Agregar
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="gd-primary-to-right" class="mb-5 white--text font-weight-light" @click="checkHandler()">
        Guardar
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      value: Object,
      handler: Function,
      openModal: false
    },
    data() {
      return {
        socio: this.value,
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
          color:{},especie:{},raza:{}
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
            if (!this.socio.cuota)
              this.socio.cuota = defaultCuota.id
          })
          .catch(error => {
            console.log(error);
          });
      },
      setValueCreatedAt(value) {
        return moment(value).format('DD/MM/YYYY');
      }

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
