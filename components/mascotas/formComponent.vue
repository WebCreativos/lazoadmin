<template>
  <v-card class="rounded-xl">
    <v-toolbar color="gd-primary-to-right" elevation="0">
      <v-toolbar-title class="white--text font-weight-light">
        Mascotas
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form">
        <v-row>
          <v-col class="col-12 col-md-12">
            <v-text-field label="NOMBRE" class="rounded-lg" outlined dense v-model="mascota.nombre">
            </v-text-field>
          </v-col>
          <v-col class="col-12 col-md-12">
            <mascotasRazasComponent v-model="mascota.raza"></mascotasRazasComponent>
          </v-col>
          <v-col class="col-12 col-md-12">
            <mascotasColoresComponent v-model="mascota.color"></mascotasColoresComponent>
          </v-col>
          <v-col class="col-12 col-md-12">
            <v-text-field type="date" label="Fecha de nacimiento" class="rounded-lg" outlined dense
              v-model="mascota.fecha_nac">
            </v-text-field>
          </v-col>
          <v-col class="col-12 col-md-12">
            <v-text-field type="date" label="Deceso" class="rounded-lg" outlined dense
              v-model="mascota.deceso">
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
                      text:'INDEFINIDO',
                      value: 'C'
                    }]" class="rounded-lg" outlined dense v-model="mascota.sexo">
            </v-select>
          </v-col>
          <v-col class="col-12 col-md-12">
            <v-select label="SOCIO" :items="[{
                      text:'Si',
                      value: 'SI'
                    },{
                      text:'No',
                      value: 'NO'
                    }]" class="rounded-lg" outlined dense v-model="mascota.socio">
            </v-select>
          </v-col>
          <v-col class="col-12">
            <mascotasCreateEspeciesComponent v-model="mascota.especie"></mascotasCreateEspeciesComponent>
          </v-col>
          <v-col class="col-12 col-md-12">
            <v-textarea label="Observaciones" class="rounded-lg" outlined dense v-model="mascota.observaciones">
            </v-textarea>
          </v-col>


          <v-col class="col-12">
            <v-divider></v-divider>
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
      handler: Function
    },
    data() {
      return {
        mascota: this.value,
        rules: {
          required: [value => !!value || 'Este campo es requerido'],
        },
        cuotasList: [],
      }
    },
    created() {},
    mounted() {
      if (this.value) {
        this.mascota = this.value
        if (this.mascota.fecha_nac == '1000-01-01') {
          this.$delete(this.mascota, 'fecha_nac')
        }
      }

    },
    methods: {
      checkHandler() {
        if (!this.$refs.form.validate()) return
        // DATE TO ISO FORMAT MOMENT 
        if (this.mascota.deceso) {
          this.mascota.deceso = moment(this.mascota.deceso).toISOString()
        } else {
          this.$delete(this.mascota, 'deceso')
        }

        if (this.mascota.fecha_nac) {
          this.mascota.fecha_nac = moment(this.mascota.fecha_nac).toISOString()
        } else {
          this.$delete(this.mascota, 'fecha_nac')
        }


        this.$emit('input', this.mascota)
        this.handler();
      },

    },
    watch: {},
  }

</script>

<style lang="scss">
</style>
