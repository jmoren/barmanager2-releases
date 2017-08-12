<template lang="html">
  <div class="container">
    <h1 class="header"><tag id="header-icon" rounded><i class="fa fa-tags"></i></tag> Tickets</h1>
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
          <th>Numbero</th>
          <th>Total</th>
          <th>Fecha</th>
        </thead>
        <tbody>
          <router-link tag="tr" v-for="ticket in tickets" :key="ticket.id" :to="{ name: 'Ticket', params: { id: ticket.id } }">
            <td style="width: 15%;">
              <tag rounded type="primary" v-if="ticket.table_id"><b>{{ ticket.table.description }}</b></tag>
              <tag rounded type="light" v-else><b>Delivery</b></tag>
            </td>
            <td>
              <tooltip v-bind:content="ticket.closed ? 'Ticket Cerrado' : 'Ticket Abierto'">
                <i class="fa fa-circle fa-floated" 
                  :class="{'is-success': !ticket.closed, 'is-danger': ticket.closed }"></i>
              </tooltip>
            </td>
            <td>
              <i class="fa fa-floated" :class="{'fa-check is-success': ticket.paid_at, 'fa-exclamation-circle is-warning': !ticket.paid_at }"></i>
              <span>{{ ticket.paid_at ? 'Pagado' : 'Pendiente' }}</span>
            </td>
            <td>{{ ticket.number }}</td>
            <td>${{ ticket.partial_total }}</td>
            <td>{{ ticket.created_at | moment('DD MMMM, YYYY')}}</td>
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
