<template>
  <div v-if="value">
    <span v-show="value.length>50">
      {{value.substr(0,50)}}...&nbsp;
      <a @click="callback()">
        Ver mas
      </a>
    </span>
    <span v-show="value.length<=50">
      {{value}}
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      value: String,
      callback: Function,
    }
  }

</script>
