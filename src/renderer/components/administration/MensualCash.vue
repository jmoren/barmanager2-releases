<template>
  <div class="container">
    <h1 class="header">
      Caja {{ currentMonthName.name }} - {{ year }}
    </h1>
    <hr>
    <ul class="breadcrumb is-pulled-right" style="font-size: 14px;">
      <li><router-link :to="{ name: 'MensualCashes' }">Caja mensual</router-link></li>
      <li><i class="fa fa-angle-right"></i></li>
      <li><span>Caja mensual {{currentMonthName.name }}/{{ year }}</span></li>
    </ul>
    RESUMEN
    <hr>
    <table class="table">
      <tr>
        <td>Credit amount</td>
        <td>$ {{ resume.credit_amount }}</td>
      </tr>
      <tr>
        <td>Cash amount</td>
        <td>$ {{ resume.cash_amount }}</td>
      </tr>
      <tr>
        <td>Total sells</td>
        <td>$ {{ resume.total_sells }}</td>
      </tr>
      <tr>
        <td>Tickets count</td>
        <td>$ {{ resume.tickets_count }}</td>
      </tr>
      <tr>
        <td>Debt cash</td>
        <td>$ {{ resume.debt_cash }}</td>
      </tr>
      <tr>
        <td>Debt credit</td>
        <td>$ {{ resume.debt_credit }}</td>
      </tr>
      <tr>
        <td>Favor cash</td>
        <td>$ {{ resume.favor_cash }}</td>
      </tr>
      <tr>
        <td>Favor credit</td>
        <td>$ {{ resume.favor_credit }}</td>
      </tr>
      <tr>
        <td>Vales</td>
        <td>$ {{ resume.total_vales }}</td>
      </tr>
      <tr>
        <td>Gastos</td>
        <td>$ {{ resume.total_expenses }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'mensual-cash',
    computed: {
      ...mapGetters({
        months: 'months'
      }),
      currentMonthName () {
        return this.months.filter((m) => { return m.number === this.month })[0]
      }
    },
    data () {
      return {
        month: this.$route.params.month,
        year: this.$route.params.year,
        resume: {}
      }
    },
    created () {
      this.getMensualCash()
    },
    methods: {
      getMensualCash () {
        this.$http.get('admin/mensual_cashes/' + this.month + '/' + this.year).then(
          (response) => {
            this.resume = response.data
          }
        )
      }
    }
  }
</script>
