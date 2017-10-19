<template>
  <div style="padding: 0 5px;" v-if="pending > 0">
    <hr>
    <div class="control has-addons">
      <input type="number" class="input is-expanded" :max="pending" v-model="payment.amount" :placeholder="'Agregar pago. Pendiente: $' + pending">
      <button class="button is-primary" :disabled="loading || payment.amount <= 0" @click.prevent="create">Agregar</button>
    </div>
    <p><checkbox v-model="payment.add_to_partial" val="true">Agregar a la caja actual?</checkbox></p>
  </div>
</template>

<script>
  export default {
    name: 'supplier-payment',
    props: ['supplier', 'purchase'],
    data () {
      return {
        payment: {
          amount: '',
          bill_number: this.purchase.number,
          add_to_partial: false,
          purchase_id: this.purchase.id,
          supplier_id: this.supplier.id
        },
        loading: false,
        pending: this.purchase.pending
      }
    },
    methods: {
      create () {
        if (this.payment.amount <= 0) {
          alert('El monto no puede ser inferior o igual a 0')
        } else {
          this.loading = true
          this.$http.post('admin/suppliers/' + this.supplier.id + '/purchases/' + this.purchase.id + '/add_payment', { payment: this.payment }).then(
            response => {
              this.purchase.expenses.push(response.data)
              this.payment = { amount: '', add_to_cash: false }
              this.pending -= parseFloat(response.data.amount)
              this.loading = false
            },
            error => {
              console.log(error)
              this.loading = false
            }
          )
        }
      }
    }
  }
</script>

<style>
  
</style>
