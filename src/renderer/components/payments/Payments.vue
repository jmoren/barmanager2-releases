<template lang="html">
  <div class="">
    <h1 class="header"><i class="fa fa-tags fa-floated"></i> Pagos</h1>
    <hr>
    <div v-if="loading">
      <Loader></Loader>
    </div>
    <div v-else>
      <table class="table" id="payments-table">
        <thead>
          <th>Mesa</th>
          <th>Ticket</th>
          <th>Fecha</th>
          <th>Tipo</th>
          <th>Total</th>
        </thead>
        <tbody>
          <tr v-for="payment in payments" :key="payment.id">
            <td style="width: 15%;">
              <tag rounded :class="payment.ticket.table.color" v-if="payment.ticket.table"><b>{{ payment.ticket.table.description }}</b></tag>
              <tag rounded type="light" v-else><b>Delivery</b></tag>
            </td>
            <td>
              <tag rounded><b>{{ payment.favor ? "Pago por adelantado" : payment.ticket.number }} </b></tag>
            </td>
            <td>
              <i class="fa fa-floated fa-check is-success"></i>
              <span>{{ payment.created_at | moment('DD MMMM, YYYY HH:MM') }}</span>
            </td>
            <td>{{ payment.type }}</td>
            <td>${{ payment.amount }}</td>
          </tr>
        </tbody>
      </table>
      <pagination layout="pager" align="left" :page-size="10" :total="meta.total" :change="fetchPayments"></pagination>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/utils/Loader'
import Auth from '../../auth'
export default {
  name: 'Payments',
  components: { Loader },
  watch: {
    '$route': 'fetchPayments'
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
      payments: [],
      meta: {},
      loading: false
    }
  },
  created () {
    this.fetchPayments(1)
  },
  methods: {
    fetchPayments (page) {
      let url = 'payments?page=' + (page || 1)

      if (this.$route.params.cash_id) {
        url = url + '&cash_id=' + this.$route.params.cash_id
      }
      if (this.$route.params.partial_daily_cash_id) {
        url = url + '&partial_daily_cash_id=' + this.$route.params.partial_daily_cash_id
      }
      if (this.$route.params.payment_type) {
        url = url + '&payment_type=' + this.$route.params.payment_type
      }
      if (this.$route.params.payment_favor) {
        url = url + '&payment_favor=' + this.$route.params.payment_favor
      }
      console.log(url)
      this.$http.get(url).then(
        response => {
          this.payments = response.data.payments
          this.meta = response.data.meta
        }
      )
    }
  }
}
</script>

<style lang="css" scoped>
  #payments-table tr { cursor: pointer; }
</style>
