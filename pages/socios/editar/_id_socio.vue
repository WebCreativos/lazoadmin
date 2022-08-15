<template>
  <v-container fluid>
    <sociosFormComponent v-if="showForm" :handler="editSocio" v-model="socio"></sociosFormComponent>
    <modal-success :action="()=>{
      this.createSocioModal = false;
      this.$router.go(-1);
      }" v-model="createSocioModal">
      <template v-slot:icon>
        mdi-check
      </template>
      <template v-slot:title>
        <p class="text-h6 mb-0">
          <strong>Socio editado correctamente!</strong>
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
        socio: {
          user: {},
          mascotas: [{}],
        },
        createSocioModal: false,
        showForm: true
      }
    },
    created() {
        this.getSocio();
    },
    methods: {
      getSocio() {
          this.$axios.get(`/socios/${this.$route.params.id_socio}`)
            .then(response => {
                this.socio = response.data
                this.showForm = false
                setTimeout(()=>{
                    this.showForm = true
                },500)
            })
      },
      editSocio() {
          this.$delete(this.socio,'published_at')
          this.$axios.put(`/socios/${this.socio.id}`, this.socio).then(response => {
            this.createSocioModal = true
          })
      },

    }
  }

</script>
