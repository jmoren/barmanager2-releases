<template>
  <div class="">
    <h1 class="header">
      Caja {{ currentMonthName.name }} - {{ year }}
      <ul class="breadcrumb is-pulled-right" style="font-size: 14px; margin: 5px 0px;">
        <li><router-link :to="{ name: 'MensualCashes' }">Caja mensual</router-link></li>
        <li><i class="fa fa-angle-right"></i></li>
        <li><span> {{currentMonthName.name }}/{{ year }}</span></li>
      </ul>
    </h1>
    <hr>
    RESUMEN
    <hr>
    <div class="box">
      <div style="margin-bottom:20px;">
        <cash-row :enabled="false" title="Ventas en efectivo" :total="totalCash"></cash-row>
        <cash-row :enabled="false" title="Ventas en tarjeta" :total="totalCredit"></cash-row>
      </div>
      <div style="margin-bottom:20px;">
        <cash-row :enabled="false" title="Ventas Totales" :total="resume.total_sells"></cash-row>
        <cash-row :enabled="false" title="Total Gastos" :total="totalExpenses"></cash-row>
        <cash-row :enabled="false" title="Balance" :total="balance"></cash-row>
      </div>
      <div style="margin-bottom:20px;">
        <cash-row :enabled="true" title="Vales" :total="resume.total_vales">
          <div><b>Usuarios</b></div>
          <div v-if="details.vales">
            <div class="is-danger-text" v-if="details.vales.length < 1" style="padding: 10px 0px;">No hay vales</div>
            <ul class="details-list">
              <li v-for="(vales, index) in details.vales" :key="index" class="main-li-row">
                <div class="columns">
                  <div class="column">
                    <div style="padding: 10px 0px">
                      <i class="fa fa-angle-right fa-floated" style="margin-right: 10px;"></i> {{ vales.name }}: <b>${{ vales.total }}</b>
                    </div>
                  </div>
                  <div class="column">
                    <ul>
                      <li v-for="(e, index) in vales.list" :key="index">
                        <div class="padding: 10px 0px">
                          <i class="fa fa-plus fa-floated" style="font-size: 15px"></i>
                          {{e.created_at | moment('DD MMMM, YYYY HH:MM') }} - ${{e.amount}}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </cash-row>
        <cash-row :enabled="true" title="Proveedores" :total="resume.total_expenses">
          <div><b>Proveedores</b></div>
          <div v-if="details.gastos">
            <div class="is-danger-text" v-if="details.gastos.length < 1" style="padding: 10px 0px;">No hay gastos</div>
            <ul class="details-list">
              <li v-for="(gastos, index) in details.gastos" :key="index" class="main-li-row">
                <div class="columns">
                  <div class="column">
                    <div style="padding: 10px 0px">
                      <i class="fa fa-angle-right fa-floated" style="margin-right: 10px;"></i> {{ gastos.name }}: <b>${{ gastos.total }}</b>
                    </div>
                  </div>
                  <div class="column">
                    <ul>
                      <li v-for="(g, index) in gastos.list" :key="index">
                        <div style="padding: 10px 0px">
                          <i class="fa fa-plus fa-floated" style="font-size: 15px"></i>
                          {{g.created_at | moment('DD MMMM, YYYY HH:MM') }} - ${{g.amount}}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </cash-row>
      </div>
    </div>
    <div class="box">
      <h2 class="header">Grafico</h2>
      <hr>
      <line-chart :data="report"></line-chart>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CashRow from '@/components/cash/CashRow'
  export default {
    name: 'mensual-cash',
    components: { CashRow },
    computed: {
      ...mapGetters({
        months: 'months'
      }),
      totalCredit () {
        return parseFloat(this.resume.credit_amount) + parseFloat(this.resume.debt_credit) + parseFloat(this.resume.favor_credit)
      },
      totalCash () {
        return parseFloat(this.resume.cash_amount) + parseFloat(this.resume.debt_cash) + parseFloat(this.resume.favor_cash)
      },
      currentMonthName () {
        return this.months.filter((m) => { return m.number === this.month })[0]
      },
      totalExpenses () {
        return parseFloat(this.resume.total_vales) + parseFloat(this.resume.total_expenses)
      },
      balance () {
        return parseFloat(this.totalCredit + this.totalCash - this.resume.total_vales - this.resume.total_expenses)
      }
    },
    data () {
      return {
        month: this.$route.params.month,
        year: this.$route.params.year,
        resume: {},
        report: [],
        details: {}
      }
    },
    created () {
      this.getMensualCash()
      this.getReportData()
    },
    methods: {
      getMensualCash () {
        this.$http.get('admin/mensual_cashes/' + this.month + '/' + this.year).then(
          (response) => {
            this.resume = response.data
          }
        )
      },
      getReportData () {
        this.$http.get('admin/mensual_cashes/' + this.month + '/' + this.year + '/report').then(
          (response) => {
            this.report = response.data.graph
            this.details = response.data.details
          }
        )
      }
    }
  }
</script>

<style>
  .box ul { padding: 0; margin: 0px; list-style: none;  }
  .box ul.details-list li.main-li-row { padding-bottom:10px; margin-bottom: 10px; border-bottom: solid 1px #ccc; }
  .box ul ul { padding: 0; margin: 0px; list-style: none;  }
</style>
