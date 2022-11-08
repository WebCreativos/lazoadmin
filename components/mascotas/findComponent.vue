<template>
  <v-autocomplete full-width class="font-weight-light" no-filter :hide-details="hideDetails" :items="mascotas" dense
    :loading="isLoading" :search-input.sync="search" hide-no-data item-value="nombre" item-text="nombre"
    placeholder="Nombre de la mascota"  :rounded="rounded" background-color="white" v-model="result"
    @keyup.enter="result = search">
    <template v-slot:append-outer v-if="icon">
      <v-slide-x-reverse-transition mode="out-in">
        <v-btn text @click="emitSearch()">
          <v-icon>search</v-icon>
        </v-btn>
      </v-slide-x-reverse-transition>
    </template>

  </v-autocomplete>
</template>
<script>
  /* eslint-disable */
  export default {
    name: "autocomplete",
    props: {
      outlined: Boolean,
      solo: Boolean,
      rounded: Boolean,
      value: String,
      icon: Boolean,
      hideDetails: Boolean,
    },
    data: () => ({
      mascotas: [],
      isLoading: false,
      search: "",
      result: {}
    }),
    methods: {},
    watch: {
      search(val) {
        // Items have already been requested
        this.isLoading = true;
        // Lazily load input items
        const query = `?_where[_or][0][nombre_contains]=${val}`
        this.$axios
          .get(`/mascotas/search/${query}`)
          .then(data => {
            this.mascotas = data.data;
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => (this.isLoading = false));
      },
      result(val) {
        console.log(val);
        this.$emit("input", val);
      }
    }
  };

</script>
