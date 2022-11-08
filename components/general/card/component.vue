<template>
  <v-card class="rounded-xl card" v-bind="$attrs" :class="{'fill-height':fillHeight}">
      <slot></slot>
  </v-card>
</template>

<script>
export default {
  props: {
    fillHeight: {
      type: Boolean,
      default: false
    } 
  }
}
</script>

<style scoped>
.card :deep(.generalCardComponent__title){
  font-family: 'Montserrat'!important;
}
</style>