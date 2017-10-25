<template lang="html">
  <div class="" id="supplier">
    <div v-if="loading"></div>
    <div v-else>
      <h1 class="header">
        Proveedor {{supplier.name }}
        <div class="is-pulled-right">
          <div class="control" style="width: 300px;">
            <input type="text" v-model="query" class="input" placeholder="Filtrar factura por numero">
          </div>
        </div>
      </h1>
      <hr>
      <tabs layout="top">
        <tab-item label="Nueva Factura">
          <div class="purchases-container">
            <purchase-form :supplier="supplier" @save-purchase="updateView"></purchase-form>
          </div>
        </tab-item>
        <tab-item label="Compras Anteriores">
          <div class="purchases-container">
            <div v-if="loadingPurchases">
              loading...
            </div>
            <div v-else>
              <div v-if="purchases.purchases.length < 1"><span class="is-danger-text">No hay compras registradas</span></div>
              <div v-else>
                <div class="purchase-list" >
                  <div class="purchase-list-item" v-for="purchase in filteredPurchases">
                    <div class="header-item">
                      <div class="header-title" @click.prevent="toggleRow(purchase)">
                        <h5>
                          <i class="fa fa-circle fa-floated" :class="{'is-danger': parseFloat(purchase.pending) > 0, 'is-success': parseFloat(purchase.pending) === 0}"></i>
                          <span>Factura Nro. {{ purchase.number }} </span>
                          <span v-if="purchase.pending > 0"> - Pendiente: $ {{ purchase.pending }}</span>
                        </h5>
                      </div>
                      <span class="icon-indicator">
                        <i class="fa" :class="{'fa-angle-right': purchase.id !== currentPurchase.id, 'fa-angle-down': purchase.id === currentPurchase.id}"></i>
                      </span> 
                    </div>
                    <div class="content" :class="{ 'active': currentPurchase.id === purchase.id }">
                      <p>Fecha: {{ purchase.created_at | moment('dddd DD MMMM, YYYY') }}</p>
                      <div class="columns">
                        <div class="column is-7 purchase-section">
                          <div class="title">Items</div>
                          <table class="table">
                            <thead>
                              <th>Producto</th>
                              <th>Precio unitario</th>
                              <th>Cantidad</th>
                              <th>Subtotal</th>
                            </thead>
                            <tbody>
                              <tr v-for="entry in purchase.entry_items" :key="entry.id">
                                <td>{{entry.item.name}}</td>
                                <td>{{entry.price}}</td>
                                <td>$ {{entry.amount}}</td>
                                <td>$ {{entry.amount * entry.price}}</td>
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colspan="3">Total</td><td><span class="is-danger-text">${{purchase.total}}</span></td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                        <div class="column is-5 purchase-section">
                          <div class="title">Pagos</div>
                          <table class="table">
                            <thead>
                              <th>Fecha de pago</th>
                              <th>Monto</th>
                              <th>Quien Pago</th>
                            </thead>
                            <tbody>
                              <tr v-if="purchase.expenses.length === 0"><td colspan="3">No hay pagos para esta factura</td></tr>
                              <tr v-for="(expense, index) in purchase.expenses" v-else>
                                <td>{{ expense.created_at | moment('DD/MM/YYYY HH:MM a')}}</td>
                                <td>$ {{ expense.amount }}</td>
                                <td><span v-if="expense.user">{{ expense.user.name }}</span></td>
                              </tr>
                            </tbody>
                            <supplier-payment :supplier="supplier" :purchase="purchase" @update-pending="updateView"></supplier-payment>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr>
            <pagination layout="pager" align="left" :total="purchases.meta.total" :change="fetchPurchases"></pagination>
          </div>
        </tab-item>
        <tab-item label="Dueda y Pagos">
          <div class="purchases-container">
            <div v-if="loadingExpenses">
              loading...
            </div>
            <div v-else>
              <div class="columns">
                <div class="column is-6">
                  <div class="control has-addons">
                    <button class="button is-light" @click.prevent="payment.amount = supplier.pending">
                      Deuda total: $ {{ supplier.pending }}
                    </button>
                    <input type="number" min="0" v-model="payment.amount" :max="supplier.pending" class="input is-expanded" placeholder="Pagar deuda">
                    <span class="button">
                      <checkbox v-if="supplier.partial_cash_open" v-model="payment.add_to_partial" val="true">Cargar a la caja</checkbox>
                    </span>
                    <button class="button is-primary" @click="savePayment()">Guardar</button>
                  </div>
                </div>
              </div>
              <hr>
              <div v-if="expenses.length < 1"><span class="is-danger-text">No hay pagos registradas</span></div>
              <div v-else>
                <table class="table">
                  <thead>
                    <th>Pagos</th>
                    <th>Fecha</th>
                    <th>Monto</th>
                    <th>Facrtura</th>
                    <th>Quien Pago</th>
                    <th></th>
                  </thead>
                  <tbody>
                    <tr v-for="gasto in expenses.gastos" :key="gasto.id">
                      <td># {{ gasto.id }}</td>
                      <td>{{ gasto.created_at | moment('DD/MM/YYYY HH:MM a')}}</td>
                      <td>$ {{ gasto.amount }}</td>
                      <td><span v-if="gasto.purchase.id">Nro: {{ gasto.purchase.number }}</span></td>
                      <td><span v-if="gasto.user">{{ gasto.user.name }}</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr>
            <pagination layout="pager" align="left" :total="expenses.meta.total" :change="fetchExpenses"></pagination>
          </div>
        </tab-item>
      </tabs>
    </div>
  </div>
</template>
<script>
  import Auth from '../../auth'
  import PurchaseForm from './PurchaseForm'
  import SupplierPayment from './SupplierPayment'
  export default {
    name: 'Supplier',
    components: { PurchaseForm, SupplierPayment },
    data () {
      return {
        loading: false,
        loadingExpenses: false,
        loadingPurchases: false,
        supplier: { name: '', phone: '' },
        purchases: { purchases: [], meta: {} },
        expenses: { gastos: [], meta: {} },
        currentPurchase: {},
        query: '',
        addToPartial: false,
        payment: { amount: '', add_to_partial: false }
      }
    },
    beforeRouteEnter (to, from, next) {
      if (Auth.user.profile.role === 'cooker') {
        next(vm => vm.$router.push({ name: 'Kitchen' }))
      } else {
        next()
      }
    },
    computed: {
      filteredPurchases () {
        if (this.query.trim() !== '') {
          return this.purchases.purchases.filter((p) => {
            return p.number.match(this.query)
          })
        } else {
          return this.purchases.purchases
        }
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
            this.fetchPurchases(1)
            this.fetchExpenses(1)
          },
          error => {
            console.log(error)
            this.loading = false
          }
        )
      },
      fetchPurchases (page) {
        this.loadingPurchases = true
        this.$http.get('admin/suppliers/' + this.supplier.id + '/purchases?page=' + (page || 1)).then(
          response => {
            this.purchases = response.data
            this.loadingPurchases = false
          },
          error => {
            console.log(error)
            this.loadingPurchases = false
          }
        )
      },
      fetchExpenses (page) {
        this.loadingExpenses = true
        this.$http.get('admin/suppliers/' + this.supplier.id + '/expenses?page=' + (page || 1)).then(
          response => {
            this.expenses = response.data
            this.loadingExpenses = false
          },
          error => {
            console.log(error)
            this.loadingExpenses = false
          }
        )
      },
      toggleRow (purchase) {
        if (this.currentPurchase.id === purchase.id) {
          this.currentPurchase = {}
        } else {
          this.currentPurchase = purchase
        }
      },
      updateView () {
        this.fetchSupplier()
      },
      savePayment () {
        this.$http.post('admin/suppliers/' + this.supplier.id + '/add_payment', { payment: this.payment }).then(
          response => {
            this.payment = { amount: '', addToPartial: false }
            this.updateView()
          },
          error => {
            console.log(error)
          }
        )
      }
    }
  }
</script>

<style lang="css">
  #supplier h4 { font-weight: bold; font-size: 18px; margin: 15px 0px; }
  #supplier h5 { font-weight: bold; font-size: 17px; margin-bottom: 10px; }
  #supplier .tickets-container { height: 250px; overflow: auto; }
  #supplier .box:last-child { margin-bottom: 20px; }
  table tr:hover, table tr td:hover { background-color: #fff !important; }
  .tabs a {padding: 10px 12px;}
  .tabs .purchases-container { margin-top: 15px; }
  .purchase-list .purchase-list-item { padding: 5px 0px; line-height: 35px; border-bottom: solid 1px #e4e4e4; }
  .purchase-list .purchase-list-item:last-child { border-bottom: none; }
  .purchase-list-item .content { display: none; border: solid 1px #d4d4d4; padding: 10px; }
  .purchase-list-item .content.active { display: block; }
  .purchase-list-item .content p { font-size: 15px; }
  .tabs .purchase-list-item .header-item { 
    align-items: stretch;
    box-shadow: 0 1px 2px hsla(0,0%,4%,.1);
    display: flex;
    cursor: pointer;
  }
  .tabs .purchase-list-item .header-item:first-child { box-shadow: none; }
  .tabs .purchase-list-item .header-item .header-title { 
    align-items: flex-start;
    color: #363636;
    display: flex;
    flex-grow: 1;
  }
  .tabs .purchase-list-item .header-item .icon-indicator {
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .purchase-list-item .purchase-section .title { font-size: 18px; background: #f1f1f1; padding: 8px; }
</style>
