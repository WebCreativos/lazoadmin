<template>
  <generalCardComponent outlined>
    <v-card-text>
      <v-data-table dense :items="list.data" :headers="headers" :items-per-page="-1" hide-default-footer>
        <template v-slot:item.name="{ item }">
          <router-link small block text :to="`/atencion/?socio=${item.id}`">
            {{ item.name }}
          </router-link>
        </template>
        <template v-slot:item.payment_date="{ item }">
          {{formatDate(item.payment_date)}}
        </template>
        <template v-slot:item.actions="{ item }">
          <slot name="button" :item="item"></slot>
        </template>
      </v-data-table>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-flex justify-center">
      <v-pagination :total-visible="10" :length="Math.ceil(list.length/25)" color="secondary" circle  class="font-weight-bold black--text" v-model="page"
        @input="$emit('changePage',page)"></v-pagination>
    </v-card-actions>

  </generalCardComponent>
</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        headers: [{
            text: 'Nombre',
            value: 'name'
          },
          {
            text: 'DNI',
            value: 'user.username'
          }, {
            text: 'Ultima mes cubierto',
            value: 'payment_date'
          },
          {
            text: '',
            value: 'actions',
            align: 'right'
          }
        ],
        search: "",
        page: 1
      }
    },
    methods: {
      formatDate(date) {
        if (date && date != '1000-01-01') {
          return moment(date).format('MM/YYYY')
        } else {
          return 'Pago aun no realizado'
        }
      },
    },
    computed: {
      list() {
        return this.$store.getters['socios/getAll']
      }
    }
  }

</script>

<style>
  .v-data-table-header {
    height: 50px;
  }

</style>
