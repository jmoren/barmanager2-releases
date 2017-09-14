<template lang="html">
  <div class="container" id="client">
    <div v-if="loading"></div>
    <div v-else>
      <h1 class="header">
        Cliente {{client.name }}
        <div class="control has-addons is-pulled-right">
          <a @click.prevent="addTicket(client)" class="button is-danger">Abrir ticket</a>
        </div>
      </h1>
      <hr>
      <div class="columns">
        <div class="column is-6">
          <div class="box">
            <h4><i class="fa fa-floated fa-credit-card"></i> Ingresar Pago</h4>
            <hr>
            <form class="ticket-form">
              <div class="control is-grouped">
                <div class="control is-expanded">
                  <div class="select is-fullwidth">
                    <select v-model="newPayment.type">
                      <option value="Efectivo">Efectivo</option>
                      <option value="Tarjeta">Tarjeta</option>
                    </select>
                  </div>
                </div>
                <div class="control is-expanded">
                  <input class="input" step="0.01" type="number" placeholder="Monto" @keydown.enter.prevent="payDebt" v-model="newPayment.amount">
                </div>
                <div class="control">
                  <a class="button is-primary" @click.prevent="payDebt">Pagar</a>
                </div>
              </div>
            </form>
            <div v-if="paymentInFavor.length > 0">
              <hr>
              <ul>
                <li v-for="payment in paymentInFavor" :key="payment.id" v-bind:date="formatDate(payment.created_at)" style="margin-bottom: 5px;">
                  <div class="columns" style="font-size: 16px;">
                    <div class="column is-1"><tooltip content="A favor"><i class="fa fa-floated fa-circle is-danger"></i></tooltip></div>
                    <div class="column is-2">{{ payment.type }}</div>
                    <div class="column is-4"><b>$ {{ payment.amount }}</b></div>
                    <div class="column is-4">{{ payment.created_at | moment('DD MMMM, YYYY') }}</div>
                    <div class="column is-1" v-if="pending > 0">
                      <tooltip content="Aplicar saldo a favor a la deuda">
                        <button class="button is-small is-success is-outlined" @click="assignPayement(payment)"><i class="fa fa-download"></i></button>
                      </tooltip>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <client-codes :client="client"></client-codes>
        </div>
      </div>
      <div class="box">
        <h4><i class="fa fa-floated fa-tags"></i> Tickets</h4>
        <div class="columns">
          <div class="column is-6">
            <div class="button is-light is-not-link">Tickets cerrados</div>
            <hr>
            <div class="tickets-container">
              <table class="table">
                <thead>
                  <th>Num</th>
                  <th>Fecha Ticket</th>
                  <th>Total</th>
                  <th>Fecha Pago</th>
                </thead>
                <tr v-for="ticket in paidTickets">
                  <td>{{ ticket.number }}</td>
                  <td>{{ ticket.created_at | moment('DD MMMM, YYYY') }}</td>
                  <td><b>$ {{ ticket.total }}</b></td>
                  <td>{{ ticket.paid_at | moment('DD MMMM, YYYY')}}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="column is-6">
            <div class="button is-light is-not-link">Monto deuda actual:</div>
            <div class="button is-light is-not-link"><b class="is-danger-text">${{ pending }}</b></div>
            <hr>
            <div class="tickets-container">
              <table class="table">
                <thead>
                  <th></th>
                  <th>Num</th>
                  <th>Fecha Ticket</th>
                  <th>Total</th>
                  <th>Pendiente</th>
                </thead>
                <tr v-for="ticket in notPaidTickets">
                  <td>
                    <tooltip v-bind:content="ticket.status === 'closed' ? 'Ticket cerrado' : 'Ticket abierto'">
                      <i class="fa fa-floated fa-circle" 
                         :class="{'is-success': ticket.status !== 'closed', 'is-danger': ticket.status === 'closed'}"></i>
                    </tooltip>
                  </td>
                  <td>{{ ticket.number }}</td>
                  <td>{{ ticket.created_at | moment('DD MMMM, YYYY') }}</td>
                  <td><b>${{ ticket.total }}</b></td>
                  <td><b class="is-danger-text">${{ ticket.pending }}</b></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-6">
          <div class="box">
            <h4><i class="fa fa-floated fa-credit-card"></i> Pagos anteriores</h4>
            <div v-if="commonPayments.length > 0">
              <table class="table">
                <thead>
                  <th>Ticket</th>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Monto</th>
                </thead>
                <tbody>
                  <tr v-for="payment in commonPayments" :key="payment.id" v-bind:date="formatDate(payment.created_at)" style="margin-bottom: 5px;">
                    <td>
                      <router-link :to="{ name: 'Ticket', params: { id: payment.ticket_id } }"> 
                        <i class="fa fa-angle-right fa-floated"></i> {{ payment.ticket.number }}
                      </router-link>
                    </td>
                    <td>{{ payment.created_at | moment('DD MMMM, YYYY - hh:mm A') }}</td>
                    <td>{{ payment.type }}</td>
                    <td><b>$ {{ payment.amount }}</b></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="box">
            <h4><i class="fa fa-floated fa-comments"></i> Notas</h4>
            <div class="ticket-form">
              <div class="control is-grouped">
                <div class="control is-expanded">
                  <input type="text" v-model="newComment.text" class="input" placeholder="Agregar nota">
                </div>
                <div class="control"><button @click.prevent="addComment" class="button is-primary">Agregar</button></div>
              </div>
            </div>
            <div v-if="client.client_comments.length > 0">
              <hr>
              <ul>
                <li v-for="comment in client.client_comments" :key="client.id" v-bind:date="dateFrom(client.date)" type="primary">
                  <i class="fa fa-angle-right fa-floated"></i>
                  <span style="font-size: 16px;">{{ comment.text }}</span>
                  <a @click.prevent="removeComment(comment)" class="is-pulled-right button is-small is-danger"><i class="fa fa-trash"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import Auth from '../../auth'
  import ClientCodes from './ClientCodes'

  export default {
    name: 'Client',
    components: { ClientCodes },
    data () {
      return {
        loading: false,
        client: { name: '', phone: '' },
        new_name: '',
        new_phone: '',
        newPayment: { type: 'Efectivo', amount: null },
        mode: 'Parcial',
        newComment: { text: '' }
      }
    },
    beforeRouteEnter (to, from, next) {
      if (Auth.user.profile.role === 'cooker') {
        next(vm => vm.$router.push({ name: 'Kitchen' }))
      } else {
        next()
      }
    },
    watch: {
      '$route': 'fetchClient',
      'mode': 'setValue'
    },
    created () {
      this.fetchClient()
    },
    computed: {
      pending () {
        return this.notPaidTickets.reduce((total, t) => {
          return parseFloat(total) + parseFloat(t.pending)
        }, 0.0)
      },
      notPaidTickets () {
        return this.client.tickets.filter((ticket) => {
          return !ticket.paid_at
        })
      },
      paidTickets () {
        return this.client.tickets.filter((ticket) => {
          return ticket.paid_at
        })
      },
      paymentInFavor () {
        return this.client.payments.filter((payment) => {
          return payment.favor
        })
      },
      commonPayments () {
        return this.client.payments.filter((payment) => {
          return !payment.favor
        })
      }
    },
    methods: {
      dateFrom (date) {
        return moment(date).fromNow(Date.now())
      },
      formatDate (date) {
        return moment(date).format('DD MMMM, YYYY')
      },
      fetchClient () {
        this.loading = true
        this.$http.get('clients/' + this.$route.params.id).then(
          response => {
            this.client = response.data
            this.loading = false
          },
          error => {
            console.log(error)
            this.loading = false
          }
        )
      },
      addTicket () {
        this.$http.post('tickets', { ticket: { client_id: this.client.id } }).then(
          response => {
            this.$router.push({ name: 'Ticket', params: { id: response.data.id } })
          },
          error => {
            this.alert('danger', error.data)
          }
        )
      },
      setValue () {
        console.log(this.mode)
        this.newPayment.amount = (this.modeTotal ? this.pending : 0)
      },
      assignPayement (payment) {
        this.$http.post('clients/' + this.client.id + '/transfer_payments', { payment_id: payment.id }).then(
          response => {
            this.client = response.data
          },
          error => {
            console.log(error)
          }
        )
      },
      payDebt () {
        this.$http.post('clients/' + this.client.id + '/pay_debt', { payment: this.newPayment }).then(
          response => {
            this.client = response.data
            this.newPayment.amount = 0
          },
          error => {
            console.log(error)
          }
        )
      },
      addComment () {
        this.$http.post('clients/' + this.client.id + '/add_comment', { comment: { text: this.newComment.text } }).then(
          response => {
            this.client.client_comments.push(response.data)
            this.newComment.text = ''
          }
        )
      },
      removeComment (comment) {
        this.$http.delete('clients/' + this.client.id + '/remove_comment/' + comment.id).then(
          () => {
            let index = this.client.client_comments.indexOf(comment)
            this.client.client_comments.splice(index, 1)
          }
        )
      }
    }
  }
</script>

<style lang="css">
  #client h4 { font-weight: bold; font-size: 16px; margin-bottom: 15px; }
  #client .tickets-container { height: 250px; overflow: auto; }
  #client .box:last-child { margin-bottom: 20px; }
</style>
