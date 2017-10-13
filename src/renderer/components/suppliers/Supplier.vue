<template lang="html">
  <div class="" id="supplier">
    <div v-if="loading"></div>
    <div v-else>
      <h1 class="header">
        Proveedor {{supplier.name }}
      </h1>
      <hr>
      <div>
        <purchase-form :supplier="supplier" @save-purchase="purchase => addPurchase(purchase)"></purchase-form>
        <hr>
        <h4><i class="fa fa-floated fa-tags"></i> Compras Anteriores</h4>
        <div class="purchases-container">
          <div class="box" v-if="purchases.length < 1"><span class="is-danger-text">No hay compras registradas</span></div>
          <collapse accordion v-else>
            <collapse-item v-for="purchase in purchases" :title="'Factura: ' + purchase.number">
              <h4><i class="fa fa-calendar fa-floated"></i> {{ purchase.created_at | moment('dddd DD MMMM, YYYY') }}</h4>
              <table class="table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio unitario</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="entry in purchase.entry_items">
                    <td>{{entry.item.name}}</td>
                    <td>{{entry.price}}</td>
                    <td>{{entry.amount}}</td>
                    <td>{{entry.amount * entry.price}}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="text-info">
                    <td></td>
                    <td></td>
                    <td>TOTAL</td>
                    <td>${{purchase.total}}</td>
                  </tr>
                </tfoot>
              </table>
            </collapse-item>
          </collapse>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Auth from '../../auth'
  import PurchaseForm from './PurchaseForm'

  export default {
    name: 'Supplier',
    components: { PurchaseForm },
    data () {
      return {
        loading: false,
        supplier: { name: '', phone: '' },
        purchases: []
      }
    },
    beforeRouteEnter (to, from, next) {
      if (Auth.user.profile.role === 'cooker') {
        next(vm => vm.$router.push({ name: 'Kitchen' }))
      } else {
        next()
      }
    },
    created () {
      this.fetchSupplier()
      this.fetchPurchases()
    },
    methods: {
      addPurchase (pur) {
        this.fetchPurchases()
      },
      fetchSupplier () {
        this.loading = true
        this.$http.get('admin/suppliers/' + this.$route.params.id).then(
          response => {
            this.supplier = response.data
            this.loading = false
          },
          error => {
            console.log(error)
            this.loading = false
          }
        )
      },
      fetchPurchases () {
        this.loading = true
        this.$http.get('admin/suppliers/' + this.$route.params.id + '/purchases').then(
          response => {
            this.purchases = response.data
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
</script>

<style lang="css">
  #supplier h4 { font-weight: bold; font-size: 16px; margin-bottom: 15px; }
  #supplier .tickets-container { height: 250px; overflow: auto; }
  #supplier .box:last-child { margin-bottom: 20px; }
</style>
