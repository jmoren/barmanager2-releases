<template lang="html">
  <div class="">
    <h1 class="header">
      <i class="fa fa-tags fa-floated"></i>
      Tickets
      <div class="control has-addons is-pulled-right">
        <div class="control is-grouped" style="margin-right: 20px;">
          <div class="control is-expanded">
            <input type="text" class="input" v-model="filters.query" placeholder="Nro ticket">
          </div>
          <div class="control has-addons">
            <tooltip content="Estado del ticket">
              <radio-group v-model="filters.status">
                <radio-button val="null">Todos</radio-button>
                <radio-button val="open">Abierto</radio-button>
                <radio-button val="closed">Cerrado</radio-button>
              </radio-group>
            </tooltip>
          </div>
          <div class="control has-addons">
            <a class="button is-success" @click.prevent="fetchTickets()"><i class="fa fa-filter"></i></a>
            <a class="button is-light" @click.prevent="clearFilters"><i class="fa fa-times"></i></a>
          </div>
        </div>
      </div>
    </h1>
    <hr>
    <div v-if="loading">
      <Loader></Loader>
    </div>
    <div v-else>
      <table class="table" id="tickets-table">
        <thead>
          <th>Mesa</th>
          <th>Estado</th>
          <th>Deuda</th>
          <th>Numero</th>
          <th>Total</th>
          <th>Fecha</th>
          <th>Razon</th>
        </thead>
        <tbody>
          <router-link tag="tr" v-for="ticket in tickets" :key="ticket.id" :to="{ name: 'Ticket', params: { id: ticket.id } }">
            <td style="width: 15%;">
              <span v-if="ticket.table_id"><b>{{ ticket.table.description }}</b></span>
              <span v-else><b>Delivery</b></span>
            </td>
            <td>
              <div class="button is-light is-fullwidth is-small">
                <span class="icon is-small">
                  <i class="fa fa-circle" :class="{'is-danger': ticket.status === 'canceled', 'is-success': ticket.status === 'open', 'is-warning': ticket.status === 'closed' }"></i>
                </span>
                <span>{{ ticket.status_name }}</span>
              </div>
            </td>
            <td>
              <i class="fa fa-floated" :class="{'fa-check is-success': ticket.paid_at, 'fa-exclamation-circle is-warning': !ticket.paid_at }"></i>
              <span>{{ ticket.paid_at ? 'Pagado' : 'Pendiente: $' + ticket.pending}}</span>
            </td>
            <td>{{ ticket.number }}</td>
            <td>${{ ticket.partial_total }}</td>
            <td>{{ ticket.created_at | moment('DD MMMM, YYYY')}}</td>
            <td>{{ ticket.cancel_reason.text }}</td>
          </router-link>
        </tbody>
      </table>
      <pagination layout="pager" align="left" :page-size="10" :total="meta.total" :change="fetchTickets"></pagination>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/utils/Loader'
import Auth from '../../auth'
export default {
  name: 'Tickets',
  components: { Loader },
  watch: {
    '$route': 'fetchTickets'
  },
  beforeRouteEnter (to, from, next) {
    if (Auth.user.profile.role === 'cooker') {
      next(vm => vm.$router.push({ name: 'Kitchen' }))
    } else {
      next()
    }
  },
  data () {
    return {
      filters: { query: '', status: null },
      tickets: [],
      meta: {},
      loading: false
    }
  },
  created () {
    this.fetchTickets(1)
  },
  methods: {
    clearFilters () {
      this.filters = { query: '', status: null }
      this.fetchTickets(1)
    },
    fetchTickets (page) {
      let url = 'tickets?page=' + (page || 1)

      if (this.$route.params.partial_daily_cash_id) {
        url = url + '&partial_daily_cash_id=' + this.$route.params.partial_daily_cash_id
      }
      if (typeof (this.$route.params.not_paid) === 'boolean') {
        url = url + '&not_paid=' + this.$route.params.not_paid
      }

      if (this.filters.status !== null) {
        url = url + '&status=' + this.filters.status
      }

      if (this.filters.query !== '') {
        url = url + '&number=' + parseInt(this.filters.query.slice(0, -2), 10)
      }

      this.$http.get(url).then(
        response => {
          this.tickets = response.data.tickets
          this.meta = response.data.meta
        }
      )
    }
  }
}
</script>

<style lang="css" scoped>
  #tickets-table tr { cursor: pointer; }
</style>
