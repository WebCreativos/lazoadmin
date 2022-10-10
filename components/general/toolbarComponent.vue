<template>
  <v-toolbar class="elevation-0 teal darken-4">
    <v-toolbar-title class="font-weight-light white--text">
        <slot name="title"></slot>
    </v-toolbar-title>
        <v-spacer></v-spacer>
        <slot name="buttons"></slot>
  </v-toolbar>
</template>
