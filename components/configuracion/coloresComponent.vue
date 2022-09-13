<template>
  <v-card class="rounded-xl" outlined>
    <v-toolbar color="gd-primary-to-right" class="elevation-0 white--text">
      <v-toolbar-title class="font-weight-light">
        Colores
      </v-toolbar-title>
    </v-toolbar>
    <v-card-title>
      <v-row>
        <v-col class="col-md-9">
          <v-text-field dense outlined label="Color" v-model="color.nombre" />
        </v-col>
        <v-col class="col-md-3">
          <v-btn color="gd-primary-to-right" block height="38" class="white--text" large @click="addColor()">GUARDAR</v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-data-table :items="coloresList" :headers="headers" :page="page" hide-default-footer>
        <template v-slot:item.default={item}>
            <v-icon color="success" v-if="item.default">mdi-check</v-icon>
            <v-icon color="red" v-else>mdi-close</v-icon>
        </template>

        <template v-slot:item.actions={item}>
          <v-btn small class="white--text font-weight-light rounded-lg" color="red" @click="deleteColor(item.id)">
            Eliminar <v-icon>mdi-delete</v-icon>
          </v-btn>

        </template>

      </v-data-table>

    </v-card-text>
    <v-card-actions class="d-flex justify-center">
      <v-pagination v-model="page" total-visible="10" :length="Math.round(coloresList.length/10)"></v-pagination>
    </v-card-actions>
  </v-card>

</template>

<script>
  export default {
    data() {
      return {
        page: 1,
        cuota: {},
        coloresList: [],
        rules: {
          required: [value => !!value || 'Required.']
        },
        color:{},
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
      this.getColores()
    },
    methods: {
      getColores() {
        this.$axios.get('/colores')
          .then(response => {
            this.coloresList = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      },
      addColor(){
        this.$axios.post('/colores',this.color)
          .then(response => {
            this.getColores()
            this.color = {}
          })
          .catch(error => {
            console.log(error);
          });
      },
      },
      deleteColor(id) {
        this.$axios.delete('/colores/' + id)
          .then(response => {
            this.getColores()
          })
          .catch(error => {
            console.log(error);
          });
      }
    }

</script>

<style>

</style>
