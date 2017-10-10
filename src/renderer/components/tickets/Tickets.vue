<template lang="html">
  <div class="">
    <h1 class="header">
      <i class="fa fa-tags fa-floated"></i>
      Tickets
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
          <th>Pagado</th>
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
              <span>{{ ticket.paid_at ? 'Pagado' : 'Pendiente' }}</span>
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
      tickets: [],
      meta: {},
      loading: false
    }
  },
  created () {
    this.fetchTickets(1)
  },
  methods: {
    fetchTickets (page) {
      this.$http.get('tickets?page=' + (page || 1)).then(
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
