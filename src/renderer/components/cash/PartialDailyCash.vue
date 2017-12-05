<template>
  <div class="">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="columns not-print">
        <div class="column is-1">
          <tooltip content="Caja Numero" placement="left"><tag class="tag-header is-pulled-left" rounded>{{ cash.id }}</tag></tooltip>
          <tag v-if="cash.daily_cash_id" class="tag-header is-pulled-left" rounded>{{ cash.id }}</tag>
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
            <pop-confirm content="Imprimir resumen" icon="question-circle-o" :on-ok="printSummary" :on-cancel="cancelPrint">
              <a class="button is-medium" v-shortkey.once="['ctrl', 'p']" @shortkey="printSummary()">
                <span class="icon is-small"><i class="fa fa-print"></i></span>
              </a>
            </pop-confirm>
          </div>
        </div>
      </div>
      <hr>
      <div class="columns not-print">
        <div class="column is-6">
          <div class="resume">
            <h2>
              Extracciones y Vales
              <div class="is-pulled-right">
                <popover :with="600">
                  <tag type="danger" rounded><i class="fa fa-question"></i></tag>
                  <div slot="content">
                    <div class="debit-help is-primary-text">
                      <tag><span class="icon is-small"><i class="fa fa-exclamation"></i></span> Es extraccion si:</tag>
                      <p>La plata sale de la caja del turno para un vale personal (Marcar como vale)</p>
                      <p>La plata sale de la caja del turno para llevar a casa</p>
                    </div>
                  </div>
                </popover>
              </div>
            </h2>
            <div class="box">
              <alert class="debit-message">TOTAL <span class="is-danger-text">${{ (parseFloat(cash.total_vales) + parseFloat(cash.total_home)) | withDecimals }}</span></alert>
              <div style="height: 300px; overflow: auto">
                <table class="table">
                  <thead>
                    <th>Tipo</th>
                    <th>Usuario</th>
                    <th>Monto</th>
                    <th></th>
                  </thead>
                  <tbody>
                    <tr @keydown.enter.prevent="addExpense('Extraccion')" class="form">
                      <td>
                        <div class="select is-fullwidth">
                          <select v-model="newExpenseExtraccion.has_vale">
                            <option value="true">Vale</option>
                            <option value="false">Retiro</option>
                          </select>
                        </div>
                      </td>
                      <td>
                        <div class="select is-fullwidth">
                          <select v-model="newExpenseExtraccion.user_id">
                            <option value=''>Usuario</option>
                            <option v-for="user in users" v-bind:value="user.id" :key="user.id">{{ user.name }}</option>
                          </select>
                        </div>
                      </td>
                      <td>
                        <input class="input is-expanded" step="0.01" type="number" placeholder="Monto" v-model="newExpenseExtraccion.amount">
                      </td>
                      <td>
                        <a class="button is-primary is-small is-pulled-right" @click.prevent="addExpense('Extraccion')">
                          <i class="fa fa-plus fa-floated"></i>
                        </a>
                      </td>
                    </tr>
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
              <alert class="debit-message">TOTAL <span class="is-danger-text">${{ parseFloat(cash.total_expenses) | withDecimals }}</span></alert>
              <div style="height: 300px; overflow: auto">
                <table class="table">
                  <thead>
                    <th>Tipo</th>
                    <th>Proveedor</th>
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
      <PartialDailySummary :summary="cash"></PartialDailySummary>
      <div class="box not-print" v-if="!cash.closed_at">
        <div class="columns">
          <div class="column is-6 is-offset-3 has-text-centered">
            <button class="button is-danger is-large" @click.prevent="openModal" :disabled="closingCash">CIERRE TURNO</button>
          </div>
        </div>
      </div>
    </div>
    <modal :title="'CIERRE DE CAJA No. ' + cash.id" :show-footer="false" :is-show="isOpen" transition="zoom">
      <alert type="danger" v-if="errorMessage">
        {{errorMessage}}
        <div v-if="openTickets.length">
          <label>Tickets abiertos:</label>
          <router-link v-for="op in openTickets" :key="op.id" :to="{ name: 'Ticket', params: { id: op.id } }" class="button is-light is-small" style="margin-right: 5px;">{{op.format_number}}</router-link>
        </div>
      </alert>
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
      <div class="control">
        <label>Arqueo de caja</label>
        <input type="number" class="input" step="0.01" placeholder="Monto contado en la caja" v-model="newPartialCash.manual_cash">
      </div>
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
      <div class="control">
        <a class="button is-primary" @click="closeCash()" :disabled="closingCash">
          <i v-if="closingCash" class="fa fa-spin fa-spinner"></i>
          Cerrar caja
        </a>
        <a class="button is-light" @click="closeModal()" :disabled="closingCash">Cancelar</a>
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
  import PartialDailySummary from '@/components/cash/Summary'

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
    components: { autocomplete, PartialDailySummary },
    data () {
      return {
        cash: {},
        suppliers: [],
        loading: false,
        newExpenseExtraccion: { has_vale: true, amount: null, type: 'Extraccion', user_id: '' },
        newExpenseGasto: { supplier_id: '', amount: null, type: 'Gasto', bill_number: null },
        toDelete: {},
        newPartialCash: { init_amount: 0.0, user_id: '', manual_cash: '' },
        isOpen: false,
        lastCash: false,
        errorMessage: '',
        closingCash: false,
        openTickets: []
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
      printSummary () {
        window.print()
      },
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
        this.errorMessage = ''
        this.openTickers = []
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
            this.fetchCash()
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
            this.fetchCash()
          }
        )
      },
      closeCash () {
        if (!this.lastCash && (!this.newPartialCash.user_id || !this.newPartialCash.init_amount)) {
          this.errorMessage = 'No se puede abrir una caja nueva sin responsable'
          return false
        } else {
          this.closingCash = true
          this.$http.post('admin/partial_daily_cashes/' + this.cash.id + '/close', { last: this.lastCash, partial_daily_cash: this.newPartialCash }).then(
            response => {
              this.$store.dispatch('updateDailyCash', response.data)
              this.cash = response.data
              _.extend(this.cash, response.data.resume)
              if (this.lastCash) {
                this.$store.dispatch('updateDailyCash', {})
              }
              this.closeModal()
              this.closingCash = false
            },
            error => {
              this.errorMessage = error.data.message
              this.closingCash = false
              this.openTickets = error.data.open_tickets
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
  .tag-header {
    padding: 15px 20px;
    height: 55px;
    width: 55px;
    font-weight: 500;
    font-size: 20px;
    margin-top: -5px;
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
  }
  .debit-help .tag { text-transform: uppercase; margin-bottom: 5px; }
  .debit-help p {
    padding: 5px 0px;
  }
  .header-icon {
    height: 44px;
    font-size: 20px;
    padding-left: 12px;
    padding-right: 12px;
    margin-top: -5px;
  }
  table tr.form:hover { background-color: #fff; }
  input.disabled { background: #0099ff; }

  @media print {
    .not-print { display: none !important; }
  }
</style>
