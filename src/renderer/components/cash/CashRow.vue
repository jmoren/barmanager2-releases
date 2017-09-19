<template>
  <div class="card is-fullwidth card-row" @click.prevent="toggle()">
    <div class="card-header">
      <span class="card-header-icon">
        <i class="fa is-primary-text" v-if="enabled" :class="{'fa-plus-circle': !isOpen, 'fa-minus-circle': isOpen}"></i>
      </span>
      <div class="card-header-title">{{title}} </div>
      <span class="card-header-icon value" style="width:100px;"><span class="button is-light is-fullwidth">$ {{total}}</span></span>
    </div>
    <div class="content" v-show="isOpen">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cashRow',
    props: ['title', 'total', 'enabled'],
    data () {
      return {
        isOpen: false
      }
    },
    methods: {
      toggle () {
        if (this.enabled) {
          this.isOpen = !this.isOpen
        }
      }
    }
  }
</script>

<style scoped>
  .card-header { cursor: pointer; }
  .card-header:hover { background: #F9F9F9; }
  .card-header-icon.value { font-weight: bold; }
  .card .content { background: #F9F9F9; padding: 20px; border-top: solid 1px hsla(0,0%,4%,.1); }
</style>
