<template>
  <transition name="fade-transition">
    <div class="loading-page" v-if="loading">
      <img src="/loading.jpg" class="full-size">
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        duration:2000
      }
    },
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        setTimeout(() => {
        this.loading = false                
        }, 1000);
      }

    }
  }

</script>

<style scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;

  }

  .full-size {
    width: 100%;
    height: 100%;
  }

</style>
