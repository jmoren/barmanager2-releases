<template>
  <div>
    <Loader v-if="loading"></Loader>
    <div v-else>
      <h1 class="header">
        Caja Diaria - {{ cash.cash_date | moment('DD MMMM, YYYY') }}
      </h1>
      <hr>
      <div style="margin-bottom:20px;">
        <cash-row :enabled="false" title="Ventas Totales" :total="cash.resume.total_sells">
          Suma de los tickets
        </cash-row>
        <cash-row :enabled="true" title="Total Efectivo" :total="cash.resume.cash_amount">
          <router-link class="button is-primary"
                  :to="{ name: 'Payments', params: { cash_id: cash.id, payment_type: 'efectivo' } }">
            <span class="icon is-small"><i class="fa fa-link"></i></span>
            <span>Ver pagos</span>
          </router-link>
        </cash-row>
        <cash-row :enabled="true" title="Total Tarjeta" :total="cash.resume.credit_amount">
          <router-link class="button is-primary"
                  :to="{ name: 'Payments', params: { cash_id: cash.id, payment_type: 'tarjeta' } }">
            <span class="icon is-small"><i class="fa fa-link"></i></span>
            <span>Ver Pagos</span>
          </router-link>
        </cash-row>
        <cash-row :enabled="true" title="Pagos Deudas Efectivo" :total="cash.resume.debt_cash">
          <router-link class="button is-primary"
                        :to="{ name: 'Payments', params: { cash_id: cash.id, partial_daily_cash_id: -1, payment_favor: false, payment_type: 'tarjeta' } }">
            <span class="icon is-small"><i class="fa fa-link"></i></span>
            <span>Ver Pagos</span>
          </router-link>
        </cash-row>
        <cash-row :enabled="true" title="Pagos Deudas Tarjeta" :total="cash.resume.debt_credit">
          <router-link class="button is-primary"
                        :to="{ name: 'Payments', params: { cash_id: cash.id, partial_daily_cash_id: -1, payment_favor: false, payment_type: 'tarjeta' } }">
            <span class="icon is-small"><i class="fa fa-link"></i></span>
            <span>Ver Pagos</span>
          </router-link>
        </cash-row>
        <cash-row :enabled="true" title="Pagos a Favor Efectivo" :total="cash.resume.favor_cash">
          <router-link class="button is-primary"
                        :to="{ name: 'Payments', params: { cash_id: cash.id, payment_favor: true, payment_type: 'efectivo' } }">
            <span class="icon is-small"><i class="fa fa-link"></i></span>
            <span>Ver Pagos</span>
          </router-link>
        </cash-row>
        <cash-row :enabled="true" title="Pagos a Favor Tarjeta" :total="cash.resume.favor_credit">
          <router-link class="button is-primary"
                        :to="{ name: 'Payments', params: { cash_id: cash.id, payment_favor: true, payment_type: 'tarjeta' } }">
            <span class="icon is-small"><i class="fa fa-link"></i></span>
            <span>Ver Pagos</span>
          </router-link>
        </cash-row>
        <cash-row :enabled="true" title="Total Extraccion" :total="cash.resume.total_home">
          <div><b>Usuarios</b></div>
          <div class="is-danger-text" v-if="cash.expenses.extracciones.length < 1" style="padding: 10px 0px;">No hay extracciones</div>
          <ul class="expense-list">
            <li v-for="(ext, index) in cash.expenses.extracciones" :key="index">
              <i class="fa fa-angle-right fa-floated" style="margin-right: 10px;"></i> {{ ext.name }}: <b>${{ ext.total }}</b>
              <ul>
                <li v-for="(e, index) in ext.list" :key="index">
                  <span>{{e.created_at | moment('DD MMMM, YYYY HH:mm') }} - ${{e.amount}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </cash-row>
        <cash-row :enabled="true" title="Total Vales" :total="cash.resume.total_vales">
          <div><b>Usuarios</b></div>
          <div class="is-danger-text" v-if="cash.expenses.vales.length < 1" style="padding: 10px 0px;">No hay vales</div>
          <ul class="expense-list">
            <li v-for="(vale, index) in cash.expenses.vales" :key="index">
              <i class="fa fa-angle-right fa-floated" style="margin-right: 10px;"></i> {{ vale.name }}: <b>${{ vale.total }}</b>
              <ul>
                <li v-for="(v, index) in vale.list" :key="index">
                  <span>{{v.created_at | moment('DD MMMM, YYYY HH:mm') }} - ${{v.amount}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </cash-row>
        <cash-row :enabled="true" title="Total Gastos" :total="cash.resume.total_expenses">
          <div><b>Proveedores</b></div>
          <div class="is-danger-text" v-if="cash.expenses.gastos.length < 1" style="padding: 10px 0px;">No hay gastos</div>
          <ul class="expense-list">
            <li v-for="(gasto, index) in cash.expenses.gastos" :key="index">
              <i class="fa fa-angle-right fa-floated" style="margin-right: 10px;"></i> {{ gasto.name }}: <b>${{ gasto.total }}</b>
              <ul>
                <li v-for="(g, index) in gasto.list" :key="index">
                  <span>{{g.created_at | moment('DD MMMM, YYYY HH:mm') }} - ${{g.amount}}</span>
                </li>
              </ul>
            </li>
          </ul>
        </cash-row>
      </div>
      <hr>
      <div class="box">
        <h1>Cajas Parciales</h1>
        <div class="partial-bar is-clearfix">
          <table class="table">
            <thead>
              <th></th>
              <th>Responsable</th>
              <th>Total</th>
              <th>Fecha/hora Apertura</th>
              <th>Fecha/hora Cierre</th>
            </thead>
            <tbody>
              <tr v-for="partial in cash.partial_daily_cashes" :key="partial.id">
                <td><a @click.prevent="showPartial(partial.id)">#{{ partial.id }}</a></td>
                <td>{{ partial.user.name }}</td>
                <td>${{ partial.total }}</td>
                <td>{{ partial.created_at | moment('DD MMMM, YYYY HH:mm') }}</td>
                <td>{{ partial.closed_at | moment('DD MMMM, YYYY HH:mm') }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <modal :title="'CAJA PARCIAL No. ' + currentPartial.id" :show-footer="false" :on-cancel="closePartial" :is-show="isOpen" transition="zoom">
      <div v-if="currentPartial.id">
        <div class="columns">
          <div class="column is-6">Responsable <b>{{ currentPartial.user.name }}</b></div>
          <div class="column is-6">
            <tooltip content="Fecha hora de cierre">
              Fecha/Hora <b>{{ currentPartial.closed_at | moment('DD/MM/YYYY HH:mm')}}</b>
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
  import CashRow from './CashRow'

  export default {
    name: 'DailyCash',
    beforeRouteEnter (to, from, next) {
      if (['manager', 'admin'].indexOf(Auth.user.profile.role) === -1) {
        next(vm => vm.$router.push({ name: 'NotFound' }))
      } else {
        next()
      }
    },
    components: { Loader, CashRow },
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
      showPartial (id) {
        this.$http.get('admin/partial_daily_cashes/' + id).then(
          response => {
            this.currentPartial = response.data
            this.isOpen = true
          }
        )
      },
      closePartial () {
        this.currentPartial = {}
        this.isOpen = false
      }
    }
  }
</script>

<style>
  .box h1 { padding: 5px 0; margin-bottom: 10px; }
  .card .content .expense-list { padding: 0; margin: 0px; list-style: none;  }
  .card .content .expense-list li { padding: 10px 0px; }
</style>
