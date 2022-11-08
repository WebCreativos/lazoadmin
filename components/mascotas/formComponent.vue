<template>
  <generalCardComponent class="rounded-xl">
    <v-toolbar color="gd-primary-to-right" elevation="0">
      <v-toolbar-title class="white--text font-weight-light">
        Mascotas
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="openChangeSociosModal = true"  color="white" class="mr-3">CAMBIAR DE SOCIO</v-btn>
      <v-btn color="white" v-if="mascota.id" @click="deletePet()"  class="white--text font-weight-bold">
        Borrar
        <v-icon color="red">
          mdi-delete
        </v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text class="py-3">
      <v-form ref="form">
        <v-row>
          <v-col class="col-12 col-md-12">
            <formsFieldsTextComponent label="NOMBRE" class="rounded-lg"  dense v-model="mascota.nombre">
            </formsFieldsTextComponent>
          </v-col>
          <v-col class="col-12 col-md-12">
            <mascotasRazasComponent v-model="mascota.raza"></mascotasRazasComponent>
          </v-col>
          <v-col class="col-12 col-md-12">
            <mascotasColoresComponent v-model="mascota.color"></mascotasColoresComponent>
          </v-col>
          <v-col class="col-12 col-md-12">
            <formsFieldsTextComponent type="date" label="Fecha de nacimiento" class="rounded-lg"  dense
              v-model="mascota.fecha_nac">
            </formsFieldsTextComponent>
          </v-col>
          <v-col class="col-12 col-md-12">
            <formsFieldsTextComponent type="date" label="Fecha de deceso" class="rounded-lg"  dense
              v-model="mascota.deceso">
            </formsFieldsTextComponent>
          </v-col>
          <v-col class="col-12 col-md-12">
            <formsFieldsSelectComponent label="SEXO" :items="[{
                      text:'Macho',
                      value: 'M'
                    },{
                      text:'Hembra',
                      value: 'H'
                    },{
                      text:'INDEFINIDO',
                      value: 'C'
                    }]" class="rounded-lg"  dense v-model="mascota.sexo">
            </formsFieldsSelectComponent>
          </v-col>
          <v-col class="col-12 col-md-12">
            <formsFieldsSelectComponent label="SOCIO" :items="[{
                      text:'Si',
                      value: 'SI'
                    },{
                      text:'No',
                      value: 'NO'
                    }]" class="rounded-lg"  dense v-model="mascota.socio">
            </formsFieldsSelectComponent>
          </v-col>
          <v-col class="col-12">
            <mascotasCreateEspeciesComponent v-model="mascota.especie"></mascotasCreateEspeciesComponent>
          </v-col>
          <v-col class="col-12 col-md-12">
            <formsFieldsTextComponent label="Numero de chip" class="rounded-lg"  dense v-model="mascota.nro_chip">
            </formsFieldsTextComponent>
          </v-col>
          <v-col class="col-12 col-md-12">
            <v-textarea label="Observaciones" class="rounded-lg"  dense v-model="mascota.observaciones">
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
    <v-dialog width="500" v-model="openChangeSociosModal">
      <generalCardComponent>
        <v-toolbar color="primary" elevation="0">
          Seleccione el socio
        </v-toolbar>
        <v-card-text class="py-4">
          <SociosFindSociosComponent returnObject v-model="data"></SociosFindSociosComponent>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gd-primary white--text" @click="changeSocio()">
            Cambiar socio
          </v-btn>
        </v-card-actions>
      </generalCardComponent>
    </v-dialog>
    <v-snackbar color="success" v-model="successChangeSocios">
      Socio cambiado correctamente
    </v-snackbar>
  </generalCardComponent>
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
        data:{},
        mascota: this.value,
        openChangeSociosModal: false,
        successChangeSocios:false,
        rules: {
          required: [value => !!value || 'Este campo es requerido'],
        },
        cuotasList: [],
      }
    },
    created() {},
    mounted() {
      if (this.value) {
        this.mascota = JSON.parse(JSON.stringify(this.value))
        if(this.mascota.socio == null) {
          this.mascota.socio = 'NO'
        }
        if(this.mascota.socio) {
          this.mascota.socio = this.mascota.socio.toUpperCase()
        }
        if (this.mascota.fecha_nac == '1000-01-01') {
          this.$delete(this.mascota, 'fecha_nac')
        }
      }

    },
    methods: {
      checkHandler() {
        if (!this.$refs.form.validate()) return
        // DATE TO ISO FORMAT MOMENT 
        if (!this.mascota.deceso) {
          this.$delete(this.mascota, 'deceso')
        } 
        if (!this.mascota.fecha_nac) {
          this.$delete(this.mascota, 'fecha_nac')
        } 
        this.$emit('input', this.mascota)
        this.handler();
      },
      changeSocio(){
        console.log({
          mascota: this.mascota.id,
          socio: this.data
        })
        this.$axios.post('/mascotas/changeSocio', {
          mascota: this.mascota.id,
          socio: this.data.id
        }).then(res => {
          this.successChangeSocios = true
          this.openChangeSociosModal = false
        })
      },
      deletePet() {
      let c = confirm("Esta seguro que desea eliminar esta mascota?")
      if (c) {
        this.$axios.delete(`/mascotas/${this.mascota.id}`)
          .then(()=>{
            this.$router.go(-1)
          })
      }
    },
    },
    watch: {
      value:{
        handler(val){
          this.mascota = JSON.parse(JSON.stringify(val))
        },
        deep: true
      }
    },
  }

</script>

<style lang="scss">
</style>
