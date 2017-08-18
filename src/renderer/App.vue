<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  html { height: 100% !important; padding: 0px !important; margin: 0px !important; }
  body { min-height: 100%; background: #fff; }
  .is-not-link { pointer-events: none; }
  .fa.is-success { color: #6cc788 }
  .fa.is-danger  { color: #f56954 }
  .fa.is-warning { color: #f39c12 }
  .fa.fa-floated { display: inline; margin: 5px 0px }

  .is-danger-text  { color: #f56954 }
  .is-success-text { color: #6cc788 }
  .is-primary-text { color: #3c81df }
  .is-orange-text  { color: #f2711c; }

  .is-orange, .is-orange:active, .is-orange:focus { background-color: #f2711c; color: #fff; border-color: #f26202}
  .is-orange.is-active, .is-orange:hover { background-color: #f26202; color: #fff; }

  .header { font-size: 25px; font-weight: bolder; margin: 0px !important;}
  .main { padding: 80px 15px 0px !important; }
  h1.header { font-size: 25px; font-weight: bolder; margin-bottom: 20px;}
  .daily-cash-form {
    width: 40%;
    margin: 20px auto;
  }
  .daily-cash-form .tag.medium { 
    height: 30px;
    width: 30px;
    margin-top: 1px;
    font-size: 20px; 
  }
   #header-icon {
    height: 44px; 
    font-size: 20px; 
    width: 44px;
    margin-top: -5px;
  }
</style>
