<template>
    <generalCardComponent >
      <v-card-title>
        <v-btn  color="primary" @click="addConsulta()" v-if="!readonly">
          AGREGAR CONSULTAS&nbsp;<v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items="value" hide-default-footer>
          <template v-slot:item.fecha="{ item }">
            <formsFieldsTextComponent dense  hide-details type="date" v-model="item.fecha"></formsFieldsTextComponent>
          </template>
          <template v-slot:item.referencias="{ item }">
            <formsFieldsTextComponent dense  hide-details v-model="item.referencias"></formsFieldsTextComponent>
          </template>
          <template v-slot:item.observacion="{ item }">
            <formsFieldsTextComponent dense   hide-details v-model="item.observacion"></formsFieldsTextComponent>
          </template>
          <template v-slot:item.delete="{ item }">
            <v-btn small color="red" @click="deleteProduct(item)"  v-if="!readonly">
              <v-icon color="white">mdi-delete</v-icon>
            </v-btn>
          </template>


        </v-data-table>
      </v-card-text>
    </generalCardComponent>
</template>

<script>
  export default {
    props: {
      readonly:{
        default:false
      },
      value: Array
    },
    data() {
      return {
        proximas: this.value,
        headers: [{
          value: 'fecha',
          text: 'Fecha'
        }, {
          value: 'referencias',
          text: 'Referencias'
        }, {
          value: 'observacion',
          text: 'Observacion'
        },{
          value: 'delete',
          text: 'Eliminar'
        }],
      }
    },
    created(){
    },
    methods:{
        addConsulta(){
            this.$set(this.proximas,this.proximas.length, {});
        },
        deleteProduct(item) {
          this.proximas = this.proximas.filter(producto => producto.id != item.id)
        }
    },
    watch: {
      proximas(val) {
        if(val!=undefined)
            this.$emit('input', val)
      }
    },
  }

</script>
