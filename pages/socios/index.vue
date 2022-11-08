<template>
  <v-container fluid>
    <headersGeneralComponent>
      <template v-slot:icon>
        <img src="/icons/users.png" alt="icono" width="30" />
      </template>
      <template v-slot:title>
        Socios
      </template>
      <template v-slot:subtitle>
        <v-btn to="/socios/registro" large class="font-weight-regular rounded-lg black--text" color="secondary">
          AGREGAR SOCIO <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
    </headersGeneralComponent>
    <v-row>
      <v-col class="col-12">
        <generalCardComponent elevation="6">
          <v-card-title class="text-subtitle-1 font-weight-regular primary">
            <formsFieldsTextButtonComponent class="elevation-6 rounded-lg" background-color="white"
              @click="getSocios($event)" label="Buscar...">
              <template v-slot:icon>
                <v-icon>mdi-magnify</v-icon>
              </template>
            </formsFieldsTextButtonComponent>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <SociosListComponent>
              <template v-slot:button="{ item }">
                <sociosActionsButtonComponent :item="item" />
              </template>
            </SociosListComponent>
          </v-card-text>
        </generalCardComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import modalSuccess from '~/components/modalSuccess.vue';
  import moment from 'moment';
  export default {
    components: {
      modalSuccess
    },
    data() {
      return {
        search: {
          _sort: 'id:desc',
          old_client: false
        },
      }
    },
    created() {
      this.getSocios()
    },
    methods: {
      async getSocios(page = 1) {
        this.$store.dispatch('socios/findAll', {
          params: this.search,
          page: page
        })
      },
    },
    computed: {
    }
  }

</script>

<style>

</style>
