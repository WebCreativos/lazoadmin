<template>
  <v-container fluid>
    <v-row>
      <v-col class="col-12 col-md-12">
        <v-card class="rounded-xl">
          <visitasGeneralDataComponent v-model="atencion" @mascota="mascota = $event"
            @getAtencionMascota="getAtencionMascota($event)"></visitasGeneralDataComponent>
        </v-card>
      </v-col>
      <v-col class="col-12">
        <visitasMascotaComponent 
        @changePage="getAtencionMascota($event.mascota,$event.page)"
        :items="consultaItems" 
        @getAtencionMascota="getAtencionMascota($event)" 
        v-model="atencion"></visitasMascotaComponent>
      </v-col>
      <v-col class="col-12">
        <visitasAllListComponent></visitasAllListComponent>
      </v-col>
    </v-row>





  </v-container>
</template>

<script>
  import moment from 'moment'
  import VisitasDataComponent from '~/components/visitas/visitasDataComponent.vue'
  export default {
    components: {
      VisitasDataComponent
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
        pageItems:0,
        search:{}
      }
    },
    created() {
      this.$store.dispatch('atentions/cleanAll')
      this.$store.dispatch('atentions/cleanSingle')
      this.$store.dispatch('atentions/cleanSelected')
      this.checkHiperLinks()
    },
    methods:{
      checkHiperLinks(){
        if(this.$route.query.socio){
          this.$axios.get(`/socios/${this.$route.query.socio}`).then(data=>{
            this.$store.dispatch('atentions/setSocio', data.data)
            if(this.$route.query.mascota) {
              let hiperLinkPet = data.data.mascotas.find((p)=>p.id == this.$route.query.mascota)
              this.$store.dispatch('atentions/setMascota', hiperLinkPet)
            }
          })
        }
      }
    },
    computed: {
      consultaItems() {
        return this.$store.getters['atentions/get']
      }
    },
  }

</script>

<style>

</style>
