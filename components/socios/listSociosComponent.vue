<template>
  <v-card class="rounded-xl">
    <v-toolbar color="gd-primary-to-right" class="elevation-0 white--text font-weight-thin">
      <v-toolbar-title>
        Socios
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <slot name="buttonTitle"></slot>
    </v-toolbar>
    <v-card-title>
      <slot name="extraFields"></slot>
    </v-card-title>
    <v-card-text>
      <v-card outlined>
        <v-card-text class="pt-0">
          <v-data-table dense :items="value.data" :headers="headers" :items-per-page="-1" hide-default-footer>
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
      </v-card>
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
            text: 'Acciones',
            value: 'actions',
            align: 'center'
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
  }

</script>

<style>
.v-data-table-header{
  height: 50px;
}
</style>
