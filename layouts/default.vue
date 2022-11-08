<template>
  <v-app>
    <generalNavigationComponent></generalNavigationComponent>
    <!--
    <v-app-bar app color="secondary" class="elevation-0 background-toolbar" width="120%" style="left:0" height="120">
    </v-app-bar>
      -->
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
  export default {
    //middleware:'auth',
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
      }
    }
  }

</script>

<style lang="scss">
  .background-toolbar {
    background: linear-gradient(90deg, #d53369 0%, #daae51 100%)
  }



  .v-navigation-drawer__border {
    display: none !important;
  }

</style>
