<template lang="html">
  <div>
    <div class="ticket-form">
      <div class="columns">
        <div class="column is-6">
          <a class="button is-fullwidth" :class="{'is-primary': newPayment.isFull, 'is-disabled': pending === 0 }" v-shortkey.once="['ctrl', '8']" @shortkey="setAmount(true)" @click.prevent="setAmount(true)">
            <span class="icon is-small"><i class="fa fa-dollar"></i></span>
            <span>Total</span>
          </a>
        </div>
        <div class="column is-6">
          <a class="button is-fullwidth" :class="{'is-primary': !newPayment.isFull, 'is-disabled': pending === 0 }" v-shortkey.once="['ctrl', '9']" @shortkey="setAmount(false)" @click.prevent="setAmount(false)">
            <span class="icon is-small"><i class="fa fa-credit-card"></i></span>
            <span>Parcial</span>
          </a>
        </div>
      </div>
      <hr>
      <div class="columns is-marginless">
        <div class="column is-6" style="padding: 0px 5px">
          <div class="select is-medium">
            <select id="payment-type" v-model="newPayment.type" :disabled="pending === 0">
              <option value="Tarjeta">Tarjeta</option>
              <option value="Efectivo">Efectivo</option>
            </select>
          </div>
        </div>
        <div class="column is-6" style="padding: 0px">
          <input class="input is-medium" step="0.01" type="number" :class="{'is-danger': newPayment.error }"
                @keyup.enter.prevent="addPayment"
                placeholder="Monto" :disabled="pending === 0" v-model="newPayment.amount">
        </div>
      </div>
      <hr>
    </div>
    <div class="ticket-lines">
      <div v-if="loading">
        <Loader></Loader>
      </div>
      <div v-else>
        <table class="table">
          <thead>
            <th></th>
            <th>Tipo</th>
            <th>Monto</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="payment in payments">
              <td>
                <tooltip content="Cancelar pago" v-if="!ticket.closed">
                  <a @click.prevent="removePayment(payment)" class="button is-small is-light">
                    <span class="icon is-small"><i class="fa fa-times-circle is-danger"></i></span>
                  </a>
                </tooltip>
                <span v-else><i class="fa fa-dollar fa-floated"></i></span>
              </td>
              <td><tooltip v-bind:content="payment.type"><tag>{{ payment.type[0] }}</tag></tooltip></td>
              <td><b>${{ payment.amount }}</b></td>
              <td>
                <tooltip content="Poner pago a favor">
                  <a @click.prevent="moveToFavor(payment)" class="button is-light is-small" v-if="ticket.client_id">
                    <span class="icon is-small"><i class="fa fa-arrow-right"></i></span>
                  </a>
                </tooltip>
              </td>
            </tr>
            <tr v-for="payment in ticket.client.in_favor" v-if="pending > 0">
              <td></td>
              <td><tooltip v-bind:content="payment.type"><tag>{{ payment.type[0] }}</tag></tooltip></td>
              <td><b>${{ payment.amount }}</b></td>
              <td>
                <tooltip content="Asignar saldo a favor a este ticket">
                  <a @click.prevent="applyPayment(payment)" class="button is-light is-small">
                    <span class="icon is-small"><i class="fa fa-plus"></i></span>
                  </a>
                </tooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="resume">
      <div class="columns resume-header">
        <div class="column is-8">
          Pagado
        </div>
        <div class="column is-4">${{ subtotal }}</div>
      </div>
      <div class="columns resume-sub-row">
        <div class="column is-4">
          <div>Pendiente</div>
          <p>{{ pending }} $</p>
        </div>
        <div class="column is-4">
          <div>Efectivo:</div>
          <p>{{ totalCash }} $</p>
        </div>
        <div class="column is-4">
          <div>Tarjeta:</div>
          <p>{{ totalCard }} $</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import _ from 'lodash'
  import Loader from '@/components/utils/Loader'

  export default {
    name: 'TicketPAyment',
    components: { Loader },
    props: [ 'ticket', 'total' ],
    data () {
      return {
        loading: false,
        newPayment: { type: 'Efectivo', amount: null, error: null, isFull: false },
        payments: [],
        amountInFavor: 0
      }
    },
    computed: {
      pending () {
        let value = this.total - this.subtotal
        if (value > 0) {
          this.$emit('ticket-not-paid', value)
        } else {
          this.$emit('ticket-paid', value)
        }
        return value
      },
      subtotal () {
        return this.payments.reduce(function (total, payment) {
          return parseFloat(total) + parseFloat(payment.amount)
        }, 0.0)
      },
      totalCash () {
        return this.payments.filter((p) => {
          return p.type === 'Efectivo'
        }).reduce(function (total, payment) {
          return parseFloat(total) + parseFloat(payment.amount)
        }, 0.0)
      },
      totalCard () {
        return this.payments.filter((p) => {
          return p.type === 'Tarjeta'
        }).reduce(function (total, payment) {
          return parseFloat(total) + parseFloat(payment.amount)
        }, 0.0)
      }
    },
    created () {
      this.loadPayments()
    },
    watch: {
      'ticket.closed': 'loadPayments'
    },
    methods: {
      loadPayments () {
        this.loading = true
        this.$http.get('tickets/' + this.ticket.id + '/payments').then(
          response => {
            this.payments = response.data
            if (this.ticket.paid_at) {
              this.paid = true
            }
            this.loading = false
          },
          error => {
            Object.keys(error.data).map((name) => {
              this.$notify.danger({ content: '<b>' + name + ':</b> <p>' + error.data[name].join(', ') + '</p>', duration: 10000 })
            })
            this.loading = false
          }
        )
      },
      addPayment () {
        if (parseFloat(this.newPayment.amount) > this.pending) {
          if (this.ticket.client_id) {
            this.amountInFavor = this.newPayment.amount - this.pending
          } else {
            this.$notify.open({
              type: 'danger',
              content: 'Puede guardar a favor si hay un cliente asignado'
            })
            return false
          }
        }

        let params = {
          ticket_id: this.ticket.id,
          amount: this.newPayment.amount - this.amountInFavor,
          type: this.newPayment.type,
          client_id: this.ticket.client_id,
          in_favor: this.amountInFavor
        }

        this.$http.post('tickets/' + this.ticket.id + '/payments', { payment: params }).then(
          response => {
            this.payments.push(response.data)
            _.extend(this.newPayment, { amount: null, type: 'Efectivo', error: null })
            this.amountInFavor = 0
            if (this.pending === 0) {
              this.$emit('ticket-paid')
            }
          },
          error => {
            Object.keys(error.data).map((name) => {
              this.$notify.danger({ content: '<b>' + name + ':</b> <p>' + error.data[name].join(', ') + '</p>', duration: 10000 })
            })
          }
        )
        //  }
      },
      removePayment (payment) {
        this.$http.delete('tickets/' + this.ticket.id + '/payments/' + payment.id).then(
          () => {
            let index = this.payments.indexOf(payment)
            this.payments.splice(index, 1)
          }
        )
      },
      setAmount (isfull) {
        this.newPayment.isFull = isfull

        if (this.newPayment.isFull) {
          this.newPayment.amount = this.pending
        } else {
          this.newPayment.amount = 0.0
        }
        document.getElementById('payment-type').focus()
      },
      applyPayment (payment) {
        if (this.pending === 0) {
          this.$notify.open({ type: 'danger', content: 'No se puede asignar un pago a un ticket sin pendiente' })
        } else if (this.pending < payment.amount) {
          let params = {
            ticket_id: this.ticket.id,
            amount: this.pending,
            type: this.newPayment.type,
            client_id: this.ticket.client_id
          }

          this.$http.post('payments/' + payment.id + '/transfer', { payment: params }).then(
            response => {
              _.extend(payment, response.data.old_payment)
              this.payments.push(response.data.new_payment)
            }
          )
        } else {
          this.$http.post('payments/' + payment.id + '/apply_payment', { payment: { ticket_id: this.ticket.id } }).then(
            response => {
              let index = this.ticket.client.in_favor.indexOf(payment)
              this.ticket.client.in_favor.splice(index, 1)
              this.payments.push(response.data)
            }
          )
        }
      },
      moveToFavor (payment) {
        this.$http.post('payments/' + payment.id + '/save_for_later').then(
          response => {
            this.ticket.client.in_favor.push(response.data)
            let index = this.payments.indexOf(payment)
            this.payments.splice(index, 1)
          }
        )
      }
    }
  }
</script>

<style lang="css" scoped>
  tr td .amount, th.amount  { text-align: right }
</style>
