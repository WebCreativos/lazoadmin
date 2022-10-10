<template>
  <v-card class="rounded-xl" outlined>
    <v-toolbar color="teal darken-3" class="elevation-0 white--text">
      <v-toolbar-title class="font-weight-light">
        Referencias de atencion
      </v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-data-table :items="referenciasList" :headers="headers" hide-default-footer>
        <template v-slot:item.default={item}>
            <v-icon color="success" v-if="item.default">mdi-check</v-icon>
            <v-icon color="red" v-else>mdi-close</v-icon>
        </template>

        <template v-slot:item.actions={item}>
          <v-btn small class="white--text font-weight-light rounded-lg" color="red" @click="deleteReferencia(item.id)">
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
        referenciasList: [],
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
      this.getreferencias()
    },
    methods: {
      getreferencias() {
        this.$axios.get('/referencias')
          .then(response => {
            this.referenciasList = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      deleteReferencia(id) {
        this.$axios.delete('/referencias/' + id)
          .then(response => {
            this.getreferencias()
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
