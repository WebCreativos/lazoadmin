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
        consultaItems: {
          data:[],
          length:0,
        },
        search:{}
      }
    },
    created() {},
    methods: {



      //add to agenda 
      async getAtencionMascota(mascota, page = 1) {

        this.search._start = 4*(page-1)
        this.search._limit = 4*(page)
        this.search.mascota = mascota.id
        await this.$axios.get(`/atencion`,{
          params:this.search
        })
          .then(response => {
            this.consultaItems.data = response.data
          })
        await this.$axios.get('/atencion/count', {
            params: {mascota: mascota.id}
          })
          .then(response => {
            this.consultaItems.length = response.data
          })
          .catch(error => {
            console.log(error)
          })

      },

    },
    watch: {
    }
  }

</script>

<style>

</style>
