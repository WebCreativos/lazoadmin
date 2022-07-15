<template>
  <v-container fluid>
    <sociosFormComponent :handler="createSocio" v-model="socio">
      Nuevo cliente
    </sociosFormComponent>
    <modal-success :action="()=>{
      this.createSocioModal = false
      }" v-model="createSocioModal">
      <template v-slot:icon>
        mdi-check
        </template> 
        <template v-slot:title>
          <p class="text-h6 mb-0">
            <strong>Socio agregado correctamente!</strong>
          </p>
        </template>
    </modal-success>
  </v-container>
</template>

<script>
  import moment from 'moment'
  export default {
    components: {
    },
    data() {
      return {
        socio: {
          suc:'CASA CENTRAL',
          socio:'SI',
          tipo:'Cliente final',
          user:{},
          mascotas: [{}],
          afiliacion:moment().format('YYYY-MM-DD'),
        },
        createSocioModal: false
      }
    },
    methods: {
      createSocio() {
        if (!this.socio.user.username) {
          this.socio.user.username = Math.floor(Math.random() * 900000000) + 100000000;
        }
        if (!this.socio.user.email) {
          this.socio.user.email = `${this.socio.user.username}@gmail.com`
        }
        if(!this.socio.user.password) {
          this.socio.user.password = this.socio.user.username
        }
        this.$axios.post('/users', this.socio.user).then(response => {
          this.socio.user = response.data
          this.$axios.post('/socios', this.socio).then(response => {
            this.createSocioModal = true
          this.socio = {
            user:{},
            mascotas: [{}]
          }
          })
        }).catch(error => {
          console.log(error);
        });
      },

    }
  }

</script>

