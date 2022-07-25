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
    created() {},
    computed: {
      consultaItems() {
        return this.$store.getters['atentions/get']
      }
    }
  }

</script>

<style>

</style>
