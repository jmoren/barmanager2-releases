<template>
  <div class="container">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="columns">
        <div class="column is-1">
          <tooltip content="Caja Numero" placement="left"><tag class="tag-header is-pulled-left" rounded>{{ cash.id }}</tag></tooltip>
          <tag v-if="cash.daily_cash_id" class="tag-header is-pulled-left" rounded>{{ cash.id }}</tag>
        </div>
        <div class="column is-4 has-text-centered">
          <span class="button is-light is-medium is-not-link"><span>INICIAL: <b>${{ cash.init_amount }}</b></span></span>
          <span class="button is-white is-not-link"><span class="icon"><i class="fa fa-angle-right"></i></span></span>
          <span class="button is-light is-medium is-not-link"><span>ACTUAL: <b>${{ total }}</b></span></span>
        </div>
        <div class="column is-7">
          <div class="control has-addons is-pulled-right">
            <span class="button is-medium is-not-link" :class="{'is-success': !cash.closed_at, 'is-primary': cash.closed_at}">
              Caja {{ cash.closed_at ? 'Cerrada' : 'Abierta' }}
            </span>
            <span class="button is-medium is-light is-not-link">
              <span class="icon is-small"><i class="fa fa-user-o"></i></span><span><b>{{ cash.user.name }}</b></span>
            </span>
            <pop-confirm content="Imprimir el cierre de la caja parcial" icon="question-circle-o" :on-ok="fiscalPrintCash" :on-cancel="cancelPrint">
              <a class="button is-medium is-danger">
                <span class="icon is-small"><i class="fa fa-print"></i></span>
                <span>C. Caja</span>
              </a>
            </pop-confirm>
            <pop-confirm content="Imprimir el cierre diario" icon="question-circle-o" :on-ok="fiscalPrintDay" :on-cancel="cancelPrint">
              <a class="button is-medium is-danger">
                <span class="icon is-small"><i class="fa fa-print"></i></span>
                <span>C. Diario</span>
              </a>
            </pop-confirm>
          </div>
        </div>
      </div>
      <hr>
      <div class="columns">
        <div class="column is-6">
          <div class="resume">
            <h2>Extracciones</h2>
            <div class="box">
              <alert class="debit-message">TOTAL <span class="is-danger-text">${{ totalVales + totalHome }}</span></alert>
              <div class="ticket-form" v-if="!cash.closed_at">
                <div class="debit-help is-primary-text">
                  <tag><span class="icon is-small"><i class="fa fa-exclamation"></i></span> Es extraccion si:</tag>
                  <p>La plata sale de la caja del turno para un vale personal (Marcar como vale)</p>
                  <p>La plata sale de la caja del turno para llevar a casa</p>
                </div>
                <form @keydown.enter.prevent="addExpense('Extraccion')">
                  <div class="columns">
                    <div class="column is-2">
                      <tooltip content="Es vale?">
                        <div class="select is-fullwidth">
                          <select v-model="newExpenseExtraccion.has_vale">
                            <option value="true">Si</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </tooltip>
                    </div>
                    <div class="column is-3">
                      <input class="input is-expanded" step="0.01" type="number" placeholder="Monto" v-model="newExpenseExtraccion.amount">
                    </div>
                    <div class="column is-6">
                      <tooltip content="Ususario que retira o saca vale.">
                        <div class="select is-fullwidth">
                          <select v-model="newExpenseExtraccion.user_id">
                            <option value=''>Usuario</option>
                            <option v-for="user in users" v-bind:value="user.id">{{ user.name }}</option>
                          </select>
                        </div>
                      </tooltip>
                    </div>
                    <div class="column is-1">
                      <a class="button is-primary" @click.prevent="addExpense('Extraccion')">
                        <i class="fa fa-plus fa-floated"></i></a>
                    </div>
                  </div>
                </form>
              </div>
              <div style="height: 300px; overflow: auto">
                <table class="table">
                  <thead>
                    <th>Tipo</th>
                    <th>Usuario</th>
                    <th>Monto</th>
                    <th></th>
                  </thead>
                  <tbody>
                    <tr v-for="debit in expenseExtracciones" :key="debit.id">
                      <td>{{ debit.has_vale ? 'Vale' : 'Retiro' }}</td>
                      <td>{{ debit.user.name }}</td>
                      <td>${{ debit.amount }}</td>
                      <td>
                        <a @click.prevent="removeExpense(debit)" class="button is-small is-light is-pulled-right">
                          <span class="fa fa-times is-danger-text"></span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="resume">
            <h2>Gastos</h2>
            <div class="box">
              <alert class="debit-message">TOTAL <span class="is-danger-text">${{ totalGasto }}</span></alert>
              <div class="ticket-form" v-if="!cash.closed_at">
                <div class="debit-help is-primary-text">
                  <tag><span class="icon is-small"><i class="fa fa-exclamation"></i></span> Es gasto si:</tag>
                  <p>Si la plata sale de la caja del turno para pagar gastos del bar (ej: proveedores, mozas, etc)</p>
                </div>
                <form @keydown.enter.prevent="addExpense('Gasto')">
                  <div class="columns">
                    <div class="column is-5">
                      <div class="is-fullwidth">
                        <autocomplete :suppliers="suppliers" @supplier-selected="setSupplier"></autocomplete>
                      </div>
                    </div>
                    <div class="column is-3">
                      <div class="control is-expanded">
                        <input class="input" step="0.01" type="number" placeholder="Monto" v-model="newExpenseGasto.amount">
                      </div>
                    </div>
                    <div class="column is-3">
                      <div class="control is-expanded">
                        <input class="input" type="text" placeholder="Nro. Factura" v-model="newExpenseGasto.bill_number">
                      </div>
                    </div>
                    <div class="column is-1">
                      <div class="control">
                        <a class="button is-primary" @click.prevent="addExpense('Gasto')">
                          <i class="fa fa-floated fa-plus"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div style="height: 300px; overflow: auto">
                <table class="table">
                  <thead>
                    <th>Tipo</th>
                    <th>Usuario</th>
                    <th>Monto</th>
                    <th>Nro Fact</th>
                    <th></th>
                  </thead>
                  <tbody>
                    <tr v-for="debit in expenseGastos" :key="debit.id">
                      <td>{{ debit.type }}</td>
                      <td>{{ debit.supplier.name }}</td>
                      <td>${{ debit.amount }}</td>
                      <td>{{ debit.bill_number }}</td>
                      <td>
                        <a @click.prevent="removeExpense(debit)" class="button is-small is-light is-pulled-right">
                          <span class="fa fa-times is-danger-text"></span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr>
      <div class="resume">
        <h2><tag rounded class="header-icon"><i class="fa fa-floated fa-bar-chart"></i></tag>Resumen Total</h2>
        <table class="table is-bordered">
          <tr class="total">
            <td>CAJA INICIAL</td>
            <td class="row-value"><span>${{ cash.init_amount | withDecimals  }}</span></td>
          </tr>
          <tr>
            <td>Gastos</td>
            <td class="row-value"><span class="is-danger-text">${{ totalGasto | withDecimals  }}</span></td>
          </tr>
          <tr>
            <td>Vales</td>
            <td class="row-value"><span class="is-danger-text">${{ totalVales | withDecimals }}</span></td>
          </tr>
          <tr>
            <td>Retiros</td>
            <td class="row-value"><span class="is-danger-text">${{ totalHome | withDecimals }}</span></td>
          </tr>
          <tr class="subtotal">
            <td>Gastos totales (Gastos + Extracciones)</td>
            <td class="row-value"><span class="is-danger-text">${{ debitos  | withDecimals }}</span></td>
          </tr>
          <tr>
            <td>Pago Tarjeta</td>
            <td class="row-value">
              <router-link :to="{ name: 'Payments', params: { partial_daily_cash_id: cash.id, payment_type: 'tarjeta', payment_favor: false } }" class="is-success-text">${{ cash.credit_amount | withDecimals }}</router-link>
            </td>
          </tr>
          <tr>
            <td>Pago Deuda Tarjeta</td>
            <td class="row-value">
              <router-link :to="{ name: 'Payments', params: { partial_daily_cash_id: cash.id, payment_type: 'tarjeta', payment_favor: true } }" class="is-success-text">${{ cash.debt_credit | withDecimals }}</router-link>
            </td>
          </tr>
          <tr class="subtotal">
            <td>Sub Tarjeta</td>
            <td class="row-value"><span class="is-success-text">${{ subCard | withDecimals }}</span></td></tr>
          <tr>
            <td>Pago Efectivo</td>
            <td class="row-value">
              <router-link :to="{ name: 'Payments', params: { partial_daily_cash_id: cash.id, payment_type: 'efectivo', payment_favor: false } }" class="is-success-text">${{ cash.cash_amount | withDecimals }}</router-link>
            </td>
          </tr>
          <tr>
            <td>Pago Deuda Efectivo</td>
            <td class="row-value">
              <router-link :to="{ name: 'Payments', params: { partial_daily_cash_id: cash.id, payment_type: 'efectivo', payment_favor: true } }" class="is-success-text">${{ cash.debt_cash | withDecimals}}</router-link>
            </td>
          </tr>
          <tr class="subtotal">
            <td>Sub Efectivo</td>
            <td class="row-value"><span class="is-success-text">${{ subCash | withDecimals }}</span></td>
          </tr>
          <tr>
            <td>Pagos a favor de cliente Tarjeta</td>
            <td class="row-value"><span>${{ cash.favor_credit | withDecimals }}</span></td></tr>
          <tr>
            <td>Pagos a favor de cliente Efectivo</td>
            <td class="row-value"><span>${{ cash.favor_cash | withDecimals }}</span></td></tr>
          <tr class="subtotal">
            <td>Sub a favor</td>
            <td class="row-value"><span class="is-primary-text">${{ totalInFavor | withDecimals }}</span></td>
          </tr>
          <tr class="subtotal">
            <td>EFECTIVO EN CAJA <span style="font-size: 17px; color: #999">(Sub Efectivo - Gastos - Retirado)</span></td>
            <td class="row-value"><span class="is-success-text">${{ realCash | withDecimals }}</span></td>
          </tr>
          <tr class="total">
            <td>CAJA REAL <span style="font-size: 17px; color: #999">(Sub Efectivo + Sub Tarjeta - Gastos - Retirado)</span></td>
            <td class="row-value"><span class="is-success-text">${{ total | withDecimals }}</span></td>
          </tr>
        </table>
        <div class="box" v-if="!cash.closed_at">
          <div class="columns">
            <div class="column is-6 is-offset-3 has-text-centered">
              <button class="button is-danger is-large" @click.prevent="openModal">CIERRE TURNO</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal :title="'CIERRE DE CAJA No. ' + cash.id" :show-footer="true" :on-ok="closeCash" :on-cancel="closeModal" :is-show="isOpen" transition="zoom">
      <alert type="danger" v-if="errorMessage">{{errorMessage}}</alert>
      <alert class="is-clearfix">
        <div class="is-pulled-left">
          <span class="icon is-small" style="margin: 2px;"><i class="fa fa-exclamation is-danger"></i></span>
          <span>
            <b v-if="lastCash">Cierre de caja y cierre diario</b>
            <b v-else>Cierre y Apertura de nuevo turno</b>
          </span>
        </div>
        <div class="is-pulled-right">
          <tooltip content="Es la ultima caja?">
            <checkbox val="true" v-model="lastCash"></checkbox>
          </tooltip>
        </div>
      </alert>
      <div class="control" v-if="!lastCash">
        <hr>
        <div class="control is-grouped" >
          <div class="control">
            <label>Monto</label>
            <input type="number" class="input" step="0.01" placeholder="Monto inicial" v-model="newPartialCash.init_amount">
          </div>
          <div class="control is-expanded">
            <label>Responsable</label>
            <div class="select is-fullwidth">
              <select v-model="newPartialCash.user_id">
                <option value=''>Seleccione usuario</option>
                <option v-for="user in users" v-bind:value="user.id">{{ user.name }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Auth from '../../auth'
  import _ from 'lodash'
  import autocomplete from '../utils/admin/SupplierAutocomplete'
  import alert from '../../mixins/Alert'

  export default {
    name: 'PartialDailyCash',
    beforeRouteEnter (to, from, next) {
      if (['manager', 'admin'].indexOf(Auth.user.profile.role) === -1) {
        next(vm => vm.$router.push({ name: 'NotFound' }))
      } else {
        next()
      }
    },
    mixins: [alert],
    components: { autocomplete },
    data () {
      return {
        cash: {},
        suppliers: [],
        loading: false,
        newExpenseExtraccion: { has_vale: true, amount: null, type: 'Extraccion', user_id: '' },
        newExpenseGasto: { supplier_id: '', amount: null, type: 'Gasto', bill_number: null },
        toDelete: {},
        newPartialCash: { init_amount: 0.0, user_id: '' },
        isOpen: false,
        lastCash: false,
        errorMessage: ''
      }
    },
    filters: {
      withDecimals: function (value) {
        return parseFloat(value).toFixed(2)
      },
      absNumber: function (value) {
        return Math.abs(value)
      }
    },
    validators: {
      checkCashkMax (value) {
        return value <= this.onlyCash
      },
      checkCardkMax (value) {
        return value <= this.onlyCard
      }
    },
    computed: {
      ...mapGetters({
        users: 'allUsers',
        current: 'currentCash'
      }),
      newPartialTotal () {
        let value = parseFloat(this.newPartialCash.credit_amount) + parseFloat(this.newPartialCash.cash_amount)
        if (isNaN(value)) {
          return 0
        } else {
          return value
        }
      },
      totalInFavor () {
        return parseFloat(this.cash.favor_credit) + parseFloat(this.cash.favor_cash)
      },
      subCard () {
        return parseFloat(this.cash.credit_amount) + parseFloat(this.cash.debt_credit)
      },
      subCash () {
        return parseFloat(this.cash.cash_amount) + parseFloat(this.cash.debt_cash)
      },
      realCash () {
        return parseFloat(this.subCash) + parseFloat(this.cash.init_amount) - parseFloat(this.debitos) + parseFloat(this.cash.favor_cash)
      },
      total () {
        return parseFloat(this.subCard) + parseFloat(this.subCash) + parseFloat(this.cash.init_amount) - parseFloat(this.debitos) + parseFloat(this.totalInFavor)
      },
      onlyCash () {
        return parseFloat(this.cash.favor_cash) + parseFloat(this.cash.init_amount) + parseFloat(this.subCash) - parseFloat(this.debitos) - parseFloat(this.cash.cash_at_home)
      },
      onlyCard () {
        return parseFloat(this.cash.favor_credit) + parseFloat(this.subCard)
      },
      debitos () {
        return parseFloat(this.totalGasto) + parseFloat(this.totalVales) + parseFloat(this.totalHome)
      },
      totalGasto () {
        if (this.cash.closed_at) {
          return this.cash.total_expenses
        } else {
          return this.expenseGastos.reduce((sum, expense) => {
            return parseFloat(sum) + parseFloat(expense.amount)
          }, 0.0)
        }
      },
      totalVales () {
        if (this.cash.closed_at) {
          return this.cash.total_vales
        } else {
          return this.expenseExtracciones.reduce((sum, expense) => {
            if (expense.has_vale) {
              return parseFloat(sum) + parseFloat(expense.amount)
            } else {
              return parseFloat(sum)
            }
          }, 0.0)
        }
      },
      totalHome () {
        if (this.cash.closed_at) {
          return this.cash.total_home
        } else {
          return this.expenseExtracciones.reduce((sum, expense) => {
            if (!expense.has_vale) {
              return parseFloat(sum) + parseFloat(expense.amount)
            } else {
              return parseFloat(sum)
            }
          }, 0.0)
        }
      },
      expenseGastos () {
        if (this.cash.closed_at) {
          return []
        } else {
          return this.cash.expenses.filter((expense) => {
            return expense.type === 'Gasto'
          })
        }
      },
      expenseExtracciones () {
        if (this.cash.closed_at) {
          return []
        } else {
          return this.cash.expenses.filter((expense) => {
            return expense.type === 'Extraccion'
          })
        }
      }
    },
    created () {
      this.fetchCash()
      this.fetchSuppliers()
    },
    methods: {
      fetchSuppliers () {
        this.$http.get('admin/suppliers').then(
          response => {
            this.suppliers = response.data
          }
        )
      },
      fetchCash (loader) {
        this.loading = true
        this.$http.get('admin/partial_daily_cashes/' + this.$route.params.id).then(
          response => {
            this.cash = response.data
            if (!this.cash.closed_at) {
              _.extend(this.cash, this.cash.resume)
            }
            this.loading = false
          }
        )
      },
      openModal () {
        this.isOpen = true
      },
      closeModal () {
        this.isOpen = false
        this.newPartialCash = { init_amount: 0, user_id: '' }
      },
      setSupplier (supplier) {
        this.newExpenseGasto.supplier_id = supplier.id
      },
      addExpense (type) {
        let model = {}
        if (type === 'Gasto') {
          model = this.newExpenseGasto
          if (!model.supplier_id || !model.amount) {
            this.$notify.open({
              type: 'danger',
              content: 'No se puede crear un gasto sin proveedor o sin monto'
            })
            return
          }
        } else {
          model = this.newExpenseExtraccion
          if (!model.user_id || !model.amount) {
            this.$notify.open({
              type: 'danger',
              content: 'No se puede crear una extraccion sin usuario o sin monto'
            })
            return
          }
        }
        this.$http.post('admin/partial_daily_cashes/' + this.cash.id + '/expenses', { expense: model }).then(
          response => {
            this.cash.expenses.push(response.data)
            this.newExpenseExtraccion = { has_vale: true, amount: null, type: 'Extraccion' }
            this.newExpenseGasto = { supplier_id: '', amount: null, type: 'Gasto' }
          }
        )
      },
      removeExpense (expense) {
        this.toDelete = expense
        this.$modal.confirm({
          title: 'Eliminar Gasto/Extraccion',
          content: 'Seguro de borrar este gasto?',
          onOk: this.deleteExpense,
          onCancel: this.resetExpense
        })
      },
      resetExpense () {
        this.toDelete = {}
      },
      deleteExpense () {
        this.$http.delete('admin/partial_daily_cashes/' + this.cash.id + '/expenses/' + this.toDelete.id).then(
          () => {
            let index = this.cash.expenses.indexOf(this.toDelete)
            this.cash.expenses.splice(index, 1)
          }
        )
      },
      closeCash () {
        if (!this.lastCash && (!this.newPartialCash.user_id || !this.newPartialCash.init_amount)) {
          this.errorMessage = 'No se puede abrir una caja nueva sin responsable'
          return false
        } else {
          this.$http.post('admin/partial_daily_cashes/' + this.cash.id + '/close', { last: this.lastCash, partial_daily_cash: this.newPartialCash }).then(
            response => {
              this.$store.dispatch('updateDailyCash', response.data)
              this.cash = response.data
              _.extend(this.cash, response.data.resume)
              this.closeModal()
              if (this.lastCash) {
                this.$store.dispatch('updateDailyCash', {})
              }
            }
          )
        }
      },
      fiscalPrintCash () {
        this.$http.post('fiscal_printer/close_partial_daily_cash').then(
          response => {
            this.$notify.open({ type: 'success', content: 'Se envio a la impresora fiscal' })
            this.isPrintOpen = false
          },
          error => {
            this.alert('danger', error.data)
          }
        )
      },
      fiscalPrintDay () {
        this.$http.post('fiscal_printer/close').then(
          response => {
            this.$notify.open({ type: 'success', content: 'Se envio a la impresora fiscal' })
            this.isPrintOpen = false
          },
          error => {
            this.alert('danger', error.data)
          }
        )
      },
      cancelPrint () {
        this.$notify.open({ content: 'Se cancelo la impresion fiscal de la caja parcial' })
      }
    }
  }
</script>

<style scoped>
  .resume h2{
    font-weight: bold;
    font-size: 25px;
    margin: 20px 0px 10px;
  }

  .resume .tag-label {
    padding: 5px 0px;
    font-weight: bold;
    text-align: center;
    margin-top: 5px;
  }

  .tag-header {
    padding: 15px 20px;
    height: 55px;
    width: 55px;
    font-weight: 500;
    font-size: 20px;
    margin-top: -5px;
  }
  .resume .tag.medium {
    padding: 15px 25px;
    height: 90px;
    width: 90px;
    font-weight: 500;
    font-size: 20px;
  }

  .resume .tag.big {
    padding: 15px 25px;
    height: 110px;
    width: 110px;
    font-weight: 500;
    font-size: 20px;
  }

  .alert.debit-message {
    font-size: 25px !important;
    font-weight: bold;
  }

  .debit-help {
    border: solid 2px #0099ff;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 10px;
    height: 150px;
  }
  .debit-help .tag { text-transform: uppercase; margin-bottom: 5px; }
  .debit-help p {
    padding: 5px 0px;
  }

  .ticket-form {
    margin-bottom: 20px;
  }
  .header-icon {
    height: 44px;
    font-size: 20px;
    padding-left: 12px;
    padding-right: 12px;
    margin-top: -5px;
  }
  input.disabled { background: #0099ff; }
  tr.total td { font-size: 25px; }
  tr.subtotal td { background: #F5F5F5; }
  td.row-value { font-weight: bold; }
  tr.divider td { background-color: #F5F5F5; height: 5px; padding: 5px 0px; }
</style>
