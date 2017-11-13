<template>
  <div class="resume">
    <h2>Resumen Total</h2>
    <table class="table is-bordered">
    <tr class="total">
      <td>CAJA INICIAL</td>
      <td class="row-value"><span>${{ summary.init_amount | withDecimals  }}</span></td>
    </tr>
    <tr>
      <td>Gastos</td>
      <td class="row-value"><span class="is-danger-text">${{ summary.total_expenses | withDecimals  }}</span></td>
    </tr>
    <tr>
      <td>Vales</td>
      <td class="row-value"><span class="is-danger-text">${{ summary.total_vales | withDecimals }}</span></td>
    </tr>
    <tr>
      <td>Retiros</td>
      <td class="row-value"><span class="is-danger-text">${{ summary.total_home | withDecimals }}</span></td>
    </tr>
    <tr class="subtotal">
      <td>Total Gastos (Gastos + vales + Extracciones)</td>
      <td class="row-value"><span class="is-danger-text">${{ debitos  | withDecimals }}</span></td>
    </tr>
    <tr>
      <td>Ventas con Tarjeta</td>
      <td class="row-value">
        <router-link :to="{
          name: 'Payments',
          params: { partial_daily_cash_id: summary.id, payment_type: 'tarjeta', debt: false } }" class="is-success-text">
            ${{ summary.credit_amount | withDecimals }}
        </router-link>
      </td>
    </tr>
    <tr>
      <td>Pago Deuda con Tarjeta</td>
      <td class="row-value">
        <router-link :to="{
          name: 'Payments',
          params: { partial_daily_cash_id: summary.id, payment_type: 'tarjeta', debt: true } }" class="is-success-text">
            ${{ summary.debt_credit | withDecimals }}
        </router-link>
      </td>
    </tr>
    <tr>
      <td>Pagos a favor de cliente Tarjeta</td>
      <td class="row-value">
        <router-link :to="{
          name: 'Payments',
          params: { partial_daily_cash_id: summary.id, payment_type: 'tarjeta', payment_favor: true } }" class="is-success-text">
            ${{ summary.favor_credit | withDecimals }}
        </router-link>
      </td>
    </tr>
    <tr class="subtotal">
      <td>Total Cobrado con Tarjetas</td>
      <td class="row-value"><span class="is-success-text">${{ subCard | withDecimals }}</span></td></tr>
    <tr>
      <td>Pago Efectivo</td>
      <td class="row-value">
        <router-link :to="{
          name: 'Payments',
          params: { partial_daily_cash_id: summary.id, payment_type: 'efectivo', debt: false } }" class="is-success-text">
            ${{ summary.cash_amount | withDecimals }}
        </router-link>
      </td>
    </tr>
    <tr>
      <td>Pago Deuda Efectivo</td>
      <td class="row-value">
        <router-link :to="{
          name: 'Payments',
          params: { partial_daily_cash_id: summary.id, payment_type: 'efectivo', debt: true } }" class="is-success-text">
            ${{ summary.debt_cash | withDecimals}}
        </router-link>
      </td>
    </tr>
    <tr>
      <td>Pagos a favor de cliente Efectivo</td>
      <td class="row-value">
        <router-link :to="{
          name: 'Payments',
          params: { partial_daily_cash_id: summary.id, payment_type: 'efectivo', payment_favor: true } }" class="is-success-text">
            ${{ summary.favor_cash | withDecimals }}
        </router-link>
      </td>
    </tr>
    <tr class="subtotal">
      <td>Total Cobrado en Efectivo</td>
      <td class="row-value"><span class="is-success-text">${{ subCash | withDecimals }}</span></td>
    </tr>
    <tr class="subtotal">
      <td>Total Ventas</td>
      <td class="row-value">
        <router-link :to="{
          name: 'Tickets',
          params: { partial_daily_cash_id: summary.id} }" class="is-success-text">
            ${{ summary.total_sells | withDecimals}}
        </router-link>
      </td>
    </tr>
    <tr class="subtotal">
      <td>Total Fiado</td>
      <td class="row-value">
        <router-link :to="{
          name: 'Tickets',
          params: { partial_daily_cash_id: summary.id, not_paid: true } }" class="is-success-text">
            ${{ summary.not_paid | withDecimals}}
        </router-link>
      </td>
    </tr>
    <tr class="total">
      <td>EFECTIVO EN CAJA <span style="font-size: 17px; color: #999">(Sub Efectivo - Gastos - Retirado)</span></td>
      <td class="row-value"><span class="is-success-text">${{ realCash | withDecimals }}</span></td>
    </tr>
    <tr class="subtotal">
      <td>Rentabilidad <span style="font-size: 17px; color: #999">(Sub Efectivo + Sub Tarjeta - Gastos - Retirado)</span></td>
      <td class="row-value"><span class="is-success-text">${{ total | withDecimals }}</span></td>
    </tr>
  </table>
  </div>
</template>

<script>
  export default {
    name: 'PartialDailySummary',
    props: ['summary'],
    computed: {
      debitos () {
        return parseFloat(this.summary.total_expenses) + parseFloat(this.summary.total_vales) + parseFloat(this.summary.total_home)
      },
      subCard () {
        return parseFloat(this.summary.credit_amount) + parseFloat(this.summary.debt_credit) + parseFloat(this.summary.favor_credit)
      },
      subCash () {
        return parseFloat(this.summary.cash_amount) + parseFloat(this.summary.debt_cash) + parseFloat(this.summary.favor_cash)
      },
      realCash () {
        return parseFloat(this.subCash) + parseFloat(this.summary.init_amount) - parseFloat(this.debitos) + parseFloat(this.summary.favor_cash)
      },
      totalInFavor () {
        return parseFloat(this.summary.favor_credit) + parseFloat(this.summary.favor_cash)
      },
      total () {
        return parseFloat(this.subCard) + parseFloat(this.subCash) + parseFloat(this.summary.init_amount) - parseFloat(this.debitos) + parseFloat(this.totalInFavor)
      }
    },
    filters: {
      withDecimals: function (value) {
        return parseFloat(value).toFixed(2)
      }
    }
  }
</script>
<style>
  tr.total td { font-size: 25px; }
  tr.subtotal td { background: #F5F5F5; }
  td.row-value { font-weight: bold; }
  tr.divider td { background-color: #F5F5F5; height: 5px; padding: 5px 0px; }
  .resume h2{
    font-weight: bold;
    font-size: 25px;
    margin: 20px 0px 10px;
  }

  .resume .tag-label {
    padding: 5px 0px;
    font-weight: bold;
    text-align: center;
    margin-top: 5px;
  }

  .resume .tag.medium {
    padding: 15px 25px;
    height: 90px;
    width: 90px;
    font-weight: 500;
    font-size: 20px;
  }

  .resume .tag.big {
    padding: 15px 25px;
    height: 110px;
    width: 110px;
    font-weight: 500;
    font-size: 20px;
  }

  @media print {
    .not-print { display: none !important; }
  }
</style>
