<template>
  <generalCardComponent class="rounded-xl" >
          <GeneralCardTitleComponent class="white--text">Colores</GeneralCardTitleComponent>
    <v-card-title>
      <v-row>
        <v-col class="col-md-10 col-12">
          <formsFieldsTextComponent dense  label="Color" v-model="color.nombre" />
        </v-col>
        <v-col class="col-md-2 d-flex align-end">
          <v-btn color="secondary" block height="38" class="rounded-lg black--text font-weight-regular" large @click="addColor()">GUARDAR</v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-divider></v-divider>
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
  </generalCardComponent>

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
