<template>
  <div>
    <Loader v-if="loading"></Loader>
    <div v-else>
      <h1 class="header">
        Caja Diaria - {{ cash.cash_date | moment('DD MMMM, YYYY') }}
        <div class="is-pulled-right">
          <div class="control has-addons is-marginless">
            <div class="select">
              <select v-model="currentPartial">
                <option v-for="partial in cash.partial_daily_cashes" v-bind:value="partial">Caja Parcial #{{ partial.id }}</option>
              </select>
            </div>
            <button class="button is-light" @click="openModal">Ver</button>
          </div>
        </div>
      </h1>
      <hr>
      <table class="table">
        <thead>
          <th>Concepto</th>
          <th>Monto</th>
        </thead>
        <tbody>
          <tr><td>Ventas Totales        </td><td>$ {{ cash.resume.total_sells   }}</td></tr>
          <tr><td>Total Efectivo        </td><td>$ {{ cash.resume.cash_amount   }}</td></tr>
          <tr><td>Total Tarjeta         </td><td>$ {{ cash.resume.credit_amount }}</td></tr>
          <tr><td>Pagos Deudas Efectivo </td><td>$ {{ cash.resume.debt_cash     }}</td></tr>
          <tr><td>Pagos Deudas Tarjeta  </td><td>$ {{ cash.resume.debt_credit   }}</td></tr>
          <tr><td>Pagos a Favor Efectivo</td><td>$ {{ cash.resume.favor_cash    }}</td></tr>
          <tr><td>Pagos a Favor Tarjeta </td><td>$ {{ cash.resume.favor_credit  }}</td></tr>
          <tr><td>Total Extracciones    </td><td>$ {{ cash.resume.total_home    }}</td></tr>
          <tr><td>Total Vales           </td><td>$ {{ cash.resume.total_vales   }}</td></tr>
          <tr><td>Total Gastos          </td><td>$ {{ cash.resume.total_expenses}}</td></tr>
        </tbody>
      </table>
      <hr>
      <div class="columns">
        <div class="column is-10">
          <div class="button is-light is-not-link">Total Diario $ {{ finalSum }}</div>
          <tooltip content="Monto efectivo">
            <div class="button is-light">Total Ingresos $ {{ totalIngresosCash }}</div>
          </tooltip>
          <tooltip content="Monto en tarjeta">
            <div class="button is-light">Total Ingresos $ {{ totalIngresosCredit }}</div>
          </tooltip>
          <div class="button is-light">Total Egresos  $ {{ totalEgresos }}</div>
        </div>
        <div class="column is-2">
          <div class="button is-light is-not-link">Tickets Generados {{ cash.resume.tickets_count }}</div>
        </div>
      </div>
    </div>
    <modal :title="'CAJA PARCIAL No. ' + currentPartial.id" :show-footer="false" :on-cancel="closeModal" :is-show="isOpen" transition="zoom">
      <div v-if="currentPartial.id">
        <div class="columns">
          <div class="column is-6">Responsable <b>{{ currentPartial.user.name }}</b></div>
          <div class="column is-6">
            <tooltip content="Fecha hora de cierre">
              Fecha/Hora <b>{{ currentPartial.closed_at | moment('DD MMMM, YYYY hh:mm A')}}</b>
            </tooltip>
          </div>
        </div>
        <table class="table">
          <thead>
            <th>Concepto</th>
            <th>Monto</th>
          </thead>
          <tbody>
            <tr><td>Apertura de caja      </td><td>$ {{ currentPartial.init_amount          }}</td></tr>
            <tr><td>Ventas Totales        </td><td>$ {{ currentPartial.resume.total_sells   }}</td></tr>
            <tr><td>Total Efectivo        </td><td>$ {{ currentPartial.resume.cash_amount   }}</td></tr>
            <tr><td>Total Tarjeta         </td><td>$ {{ currentPartial.resume.credit_amount }}</td></tr>
            <tr><td>Pagos Deudas Efectivo </td><td>$ {{ currentPartial.resume.debt_cash     }}</td></tr>
            <tr><td>Pagos Deudas Tarjeta  </td><td>$ {{ currentPartial.resume.debt_credit   }}</td></tr>
            <tr><td>Pagos a Favor Efectivo</td><td>$ {{ currentPartial.resume.favor_cash    }}</td></tr>
            <tr><td>Pagos a Favor Tarjeta </td><td>$ {{ currentPartial.resume.favor_credit  }}</td></tr>
            <tr><td>Total Extracciones    </td><td>$ {{ currentPartial.resume.total_home    }}</td></tr>
            <tr><td>Total Vales           </td><td>$ {{ currentPartial.resume.total_vales   }}</td></tr>
            <tr><td>Total Gastos          </td><td>$ {{ currentPartial.resume.total_expenses}}</td></tr>
          </tbody>
        </table>
      </div>
    </modal>
  </div>
</template>

<script>
  import Auth from '../../auth'
  import Loader from '@/components/utils/Loader'
  export default {
    name: 'DailyCash',
    beforeRouteEnter (to, from, next) {
      if (['manager', 'admin'].indexOf(Auth.user.profile.role) === -1) {
        next(vm => vm.$router.push({ name: 'NotFound' }))
      } else {
        next()
      }
    },
    components: { Loader },
    data () {
      return {
        cash: {},
        loading: false,
        isOpen: false,
        currentPartial: {}
      }
    },
    computed: {
      totalEgresos () {
        return parseFloat(this.cash.resume.total_expenses) + parseFloat(this.cash.resume.total_vales) + parseFloat(this.cash.resume.total_home)
      },
      totalIngresosCash () {
        return parseFloat(this.cash.resume.cash_amount) + parseFloat(this.cash.resume.debt_cash) + parseFloat(this.cash.resume.favor_cash)
      },
      totalIngresosCredit () {
        return parseFloat(this.cash.resume.credit_amount) + parseFloat(this.cash.resume.debt_credit) + parseFloat(this.cash.resume.favor_credit)
      },
      finalSum () {
        return parseFloat(this.totalIngresosCredit) + parseFloat(this.totalIngresosCash) - parseFloat(this.totalEgresos)
      }
    },
    created () {
      this.loadCash()
    },
    methods: {
      loadCash () {
        this.loading = true
        this.$http.get('admin/daily_cashes/' + this.$route.params.id).then(
          response => {
            this.cash = response.data
            this.loading = false
          }
        )
      },
      openModal () {
        this.isOpen = true
      },
      closeModal () {
        this.isOpen = false
      }
    }
  }
</script>
