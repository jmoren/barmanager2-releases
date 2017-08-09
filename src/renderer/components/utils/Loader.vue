<template lang="html">
  <div>
    <div class="bar-loader"></div>
    <div class="bar-loader-text" v-if="!hideText">Cargando...</div>
  </div>
</template>

<script>
  export default {
    name: 'Loader',
    props: {
      hideText: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="css">
  .bar-loader-text { text-align: center; }
  .bar-loader {
    height: 4px;
    width: 50%;
    position: relative;
    overflow: hidden;
    background-color: #eee;
    margin: 30px auto 20px auto;
  }
  .bar-loader:before{
    display: block;
    position: absolute;
    content: "";
    left: -200px;
    width: 200px;
    height: 4px;
    background-color: #3c81df;
    animation: loading 2s linear infinite;
  }

  @keyframes loading {
    from {left: -200px; width: 30%;}
    50% {width: 30%;}
    70% {width: 70%;}
    80% { left: 50%;}
    95% {left: 120%;}
    to {left: 100%;}
  }
</style>
