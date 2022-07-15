<template>
  <v-container fluid>
    <mascotasFormComponent v-if="showForm" :handler="editMascota" v-model="mascota"></mascotasFormComponent>
    <modal-success :action="()=>{
      this.createMascotaModal = false;
      this.$router.go(-1)
      }" v-model="createMascotaModal">
      <template v-slot:icon>
        mdi-check
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>Mascota editado correctamente!</strong>
        </p>
      </template>
    </modal-success>
  </v-container>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        mascota: {
        },
        createMascotaModal: false,
        showForm: true
      }
    },
    created() {
        this.getMascota();
    },
    methods: {
      getMascota() {
          this.$axios.get(`/mascotas/${this.$route.params.id_mascota}`)
            .then(response => {
                this.mascota = response.data
                this.showForm = false
                setTimeout(()=>{
                    this.showForm = true
                },500)
            })
      },
      editMascota() {
          this.$axios.put(`/mascotas/${this.mascota.id}`, this.mascota).then(response => {
            this.createMascotaModal = true
          })
      },

    }
  }

</script>
