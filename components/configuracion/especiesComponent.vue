<template>
  <v-card class="rounded-xl" outlined>
    <v-toolbar color="teal darken-4" class="elevation-0 white--text">
      <v-toolbar-title class="font-weight-light">
        Especies
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-data-table :items="especiesList" :headers="headers" hide-default-footer>
        <template v-slot:item.default={item}>
            <v-icon color="success" v-if="item.default">mdi-check</v-icon>
            <v-icon color="red" v-else>mdi-close</v-icon>
        </template>

        <template v-slot:item.actions={item}>
          <v-btn small class="white--text font-weight-light rounded-lg" color="red" @click="deleteEspecie(item.id)">
            Eliminar <v-icon>mdi-delete</v-icon>
          </v-btn>

        </template>

      </v-data-table>

    </v-card-text>
  </v-card>

</template>

<script>
  export default {
    data() {
      return {
        cuota: {},
        especiesList: [],
        rules: {
          required: [value => !!value || 'Required.']
        },
        headers: [{
            text: 'Nombre',
            align: 'left',
            sortable: false,
            value: 'nombre'
          },
          {
            text: 'Acciones',
            align: 'right',
            sortable: false,
            value: 'actions'
          }
        ]
      }
    },
    created() {
      this.getespecies()
    },
    methods: {
      getespecies() {
        this.$axios.get('/especies?_limit=-1')
          .then(response => {
            this.especiesList = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      deleteEspecie(id) {
        this.$axios.delete('/especies/' + id)
          .then(response => {
            this.getespecies()
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }

</script>

<style>

</style>
