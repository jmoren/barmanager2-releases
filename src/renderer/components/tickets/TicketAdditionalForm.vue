<template>
  <form @keyup.enter.prevent="addEntry" v-shortkey="['esc']" @shortkey="resetEntry">
    <div class="columns">
      <div class="column is-7">
        <input class="input is-medium" :disabled="status" type="text" placeholder="Adicional" v-model="entry.comment">
      </div>
      <div class="column is-2">
        <input class="input is-medium" :disabled="status" type="number" step="0.01" placeholder="Sub total" v-model="entry.subtotal" >
      </div>
      <div class="column is-2">
        <div class="input is-medium">
          <checkbox v-model="entry.kitchen" val="true"> Cocina?</checkbox>
        </div>
      </div>
      <div class="column is-1">
        <div class="control">
          <button @click.prevent="addEntry()" class="button is-light is-medium"><i class="fa fa-plus"></i></button>
          <button @click.prevent="resetEntry()" class="button is-light is-medium"><i class="fa fa-times"></i></button>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
  export default {
    name: 'TicketAdditionalForm',
    props: ['status'],
    data () {
      return {
        entry: { quantity: 1, subtotal: 0, comment: null, kitchen: false }
      }
    },
    methods: {
      resetEntry () {
        this.entry = { comment: null, subtotal: 0, quantity: 1, item: {} }
      },
      addEntry () {
        if (this.entry.comment) {
          this.$emit('save-entry', this.entry)
          this.entry = { quantity: 1, subtotal: 0, comment: null, kitchen: false }
        } else {
          this.$notify.open({
            content: 'Tenes que ingresar una descripcion',
            duration: 5000,
            type: 'danger'
          })
        }
      }
    }
  }
</script>
