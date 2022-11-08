<template>
  <v-container fluid>
    <sociosFormComponent :handler="editSocio">
      Editar socio
    </sociosFormComponent>
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
    components: {},
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
        this.$store.dispatch('socios/find', this.$route.params.id)
      },
      editSocio() {
        this.$store.dispatch('socios/update')
      },

    }
  }

</script>
