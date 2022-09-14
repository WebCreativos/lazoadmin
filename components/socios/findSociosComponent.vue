<template>
    <v-combobox full-width class="font-weight-light" no-filter :hide-details="hideDetails" :items="socios" dense :loading="isLoading" :search-input.sync="search"
      hide-no-data item-value="name" item-text="name" placeholder="Buscar socios...(Nombre, direccion...)" :return-object="returnObject"   outlined :rounded="rounded" background-color="white" v-model="result" 
      @keyup.enter="result = search">
      <template v-slot:append-outer v-if="icon">
        <v-slide-x-reverse-transition mode="out-in">
          <v-btn text @click="emitSearch()">
            <v-icon>search</v-icon>
          </v-btn>
        </v-slide-x-reverse-transition>
      </template>
    <template v-slot:item="data">
      <b>Nombre:</b> {{data.item.name}}<span v-show="data.item.address"> | <b>Direccion:</b> {{data.item.address}}</span> 
    </template>
    </v-combobox>
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
      returnObject:{
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      socios: [],
      isLoading: false,
      search: "",
      result: null
    }),
    methods: {},
    watch: {
      search(val) {
        // Items have already been requested
        this.isLoading = true;
        // Lazily load input items
        const query = `?_where[_or][0][name_contains]=${val}&_where[_or][1][last_name_contains]=${val}&_where[_or][2][address_contains]=${val}&_where[_or][3][user.username_contains]=${val}`
        this.$axios
          .get(`/socios/${query}`)
          .then(data => {
            this.socios = data.data;
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
