<template lang="html">
  <div class="container" id="supplier">
    <div v-if="loading"></div>
    <div v-else>
      <h1 class="header">
        Proveedor {{supplier.name }}
      </h1>
      <hr>
      <div class="columns">
        <purchase-form :supplier="supplier"></purchase-form>
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
        supplier: { name: '', phone: '' }
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
    },
    methods: {
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
      }
    }
  }
</script>

<style lang="css">
  #supplier h4 { font-weight: bold; font-size: 16px; margin-bottom: 15px; }
  #supplier .tickets-container { height: 250px; overflow: auto; }
  #supplier .box:last-child { margin-bottom: 20px; }
</style>
