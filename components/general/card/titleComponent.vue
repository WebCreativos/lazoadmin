<template>
  <v-toolbar v-bind="$attrs" :color="color" elevation="0">
    <v-toolbar-title class="font-weight-regular">
      <slot></slot>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <slot name="button"></slot>
  </v-toolbar>
</template>

<script>
  export default {
    props: {
      color: {
        type: String,
        default: 'primary'
      },
      textColor: {
        type: String,
        default: 'white'
      },
    },
    name: 'cardTitle',
  }

</script>
