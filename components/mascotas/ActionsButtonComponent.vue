<template>
  <v-btn-toggle class="my-3 elevation-1 rounded-lg" dense background-color="secondary" color="primary">
    <v-btn color="secondary" class="black--text font-weight-bold" :to="`/mascotas/editar/${item.id}`">
      Editar&nbsp;<v-icon color="black">mdi-pencil</v-icon>
    </v-btn>
    <v-btn icon @click="actionDelete(item.id)">
      <v-icon color="red">ion-ios-trash</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script>
  export default {
    props: {
      item: {
        type: Object,
        default: () => {}
      }
    },
    methods: {
      actionDelete(id) {
        let confirm = window.confirm('Esta seguro que desea eliminar esta mascota?')
        if (confirm) {
          this.$axios.delete('/mascotas/' + id)
            .then(()=>{

            })
        }
      }
    }
  }

</script>

<style>

</style>
