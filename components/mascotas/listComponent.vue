<template>
  <v-card class="rounded-xl">
    <v-toolbar color="gd-primary-to-right" class="elevation-0 white--text font-weight-thin">
      <v-toolbar-title>
        Mascotas
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="buttonTitle"></slot>
    </v-toolbar>
    <v-card-title>
      <slot name="extraFields"></slot>
    </v-card-title>
    <v-card-text>
      <v-data-table :items="value.data" :headers="headers" :items-per-page="-1" hide-default-footer>
        <template v-slot:item.nombre="{ item }" >
          <router-link v-if="item.socios.length>0" small block text :to="`/atencion/?mascota=${item.id}&socio=${item.socios[0].id}`">
            {{ item.nombre }}
          </router-link>
          <span v-else>
            {{ item.nombre }}
          </span>
        </template>
        <template v-slot:item.actions="{ item }">
          <slot name="button" :item="item"></slot>
        </template>
      </v-data-table>
    </v-card-text>
      <v-card-actions class="d-flex justify-center">
        <v-pagination :total-visible="10" :length="Math.ceil(value.length/25)" v-model="page" 
        @input="$emit('changePage',page)"></v-pagination>
      </v-card-actions>

  </v-card>
</template>

<script>
  import moment from 'moment'
  export default {
    props: {
      value: {
        default: {
          data: [],
          length: 0
        }
      }
    },
    data() {
      return {
        headers: [{
            text: 'Nombre',
            value: 'nombre'
          },{
            text: 'Dueño',
            value: 'socio.name'
          },
          {
            text: 'Acciones',
            value: 'actions',
            align: 'right'
          }
        ],
        search: "",
        page:1
      }
    },
    methods: {
      formatDate(date) {
        if (date) {
          return moment(date).format('DD/MM/YYYY')
        } else {
          return 'Pago aun no realizado'
        }
      },
    },
  }

</script>

<style>

</style>g
