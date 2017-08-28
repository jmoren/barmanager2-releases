<template>
  <div v-if="ticket.id">
    <div class="is-clearfix" style="margin-bottom: -8px;">
      <button class="button is-light is-not-link">
        <span>Nro. <b>{{ ticket.number }}</b></span>
      </button>
      <div class="is-pulled-right">
        <button class="button is-light is-not-link">
          <span class="icon is-small"><i class="fa fa-calendar-check-o"></i></span>
          <span><b>{{ ticket.created_at | moment('DD MMMM, YYYY')}}</b></span>
        </button>
        <button class="button is-light is-not-link" v-if="ticket.client_id">
          <span class="icon is-small"><i class="fa fa-user-o"></i></span>
          <span>{{ ticket.client.name }}</span>
        </button>
        <tooltip content="Recargar informacion">
          <a @click.prevent="reloadInfo" class="button is-light"><span class="icon is-small"><i class="fa fa-refresh"></i></span></a>
        </tooltip>
        <tooltip content="Imprimir Ticket Fiscal">
          <a @click.prevent="reloadInfo" class="button is-light"><span class="icon is-small"><i class="fa fa-print"></i></span></a>
        </tooltip>
      </div>
    </div>
    <hr>
    <h4 class="sub-header">Items</h4>
    <div class="box">
      <div class="columns entries-header">
        <div class="column is-2">Tipo</div>
        <div class="column is-1">Cant.</div>
        <div class="column is-7">Descripcion</div>
        <div class="column is-2 has-text-right">Subtotal</div>
      </div>
      <ul>
        <li v-for="entry in ticket.entries" :key="entry.id">
          <div class="columns entries-row">
            <div class="column is-2">
              {{ entry.ticketable_type }}
            </div>
            <div class="column is-1">
              {{ entry.quantity }}
            </div>
            <div class="column is-7">
              {{ entry.item.name }}
              <div v-if="entry.comment" class="is-pulled-right">
                <i>Nota: {{ entry.comment }}</i>
              </div>
            </div>
            <div class="column is-2 has-text-right">
              <b>$ {{ entry.subtotal | withDecimals }}</b>
            </div>
          </div>
        </li>
      </ul>
      <div class="columns entries-footer">
        <div class="column is-10">TOTAL</div>
        <div class="column is-2 has-text-right">$ {{ subTotal | withDecimals }}</div>
      </div>
      <hr>
      <h4 class="sub-header-inner">Pagos Realizados:</h4>
      <ul>
        <li v-for="payment in ticket.payments">
          <div class="columns entries-payment">
            <div class="column is-10 is-paddingless">
              <div class="columns">
                <div class="column is-2">
                  <span class="button is-light is-fullwidth is-not-link">{{ payment.created_at | moment('DD MMMM, YYYY') }}</span>
                </div>
                <div class="column is-2">
                  <span class="button is-light is-fullwidth is-not-link">{{ payment.type }}</span>
                </div>
              </div>
            </div>
            <div class="column is-2  is-paddingless has-text-right is-success-text"><b>$ {{ payment.amount | withDecimals }}</b></div>
          </div>
        </li>
      </ul>
      <div v-if="diff > 0">
        <hr>
        <div class="columns entries-footer">
          <div class="column is-10">DEUDA</div>
          <div class="column is-2 has-text-right is-danger-text">
            <b>$ {{ diff | withDecimals }}</b>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="has-text-centered">
      <p>Bar Zaraza</p>
      <div style="font-size: 14px;">
        <i>Direccion 123, Ciudad. Bs As, Argentina</i>
        <i>Tel: 23423432</i>
        <br>
        <small>CUIT: 12-123131212-0</small>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: 'Ticket',
    watch: {
      '$route': 'fetchTicket'
    },
    filters: {
      withDecimals: function (value) {
        return parseFloat(value).toFixed(2)
      }
    },
    data () {
      return {
        ticket: { id: null, number: null, entries: [], paid_at: null, closed: false }
      }
    },
    created () {
      this.fetchTicket()
    },
    computed: {
      subTotal () {
        return parseFloat(this.ticket.entries.reduce((sum, entry) => {
          return parseFloat(sum) + parseFloat(entry.subtotal)
        }, 0))
      },
      subTotalPay () {
        return parseFloat(this.ticket.payments.reduce((sum, payment) => {
          return parseFloat(sum) + parseFloat(payment.amount)
        }, 0))
      },
      diff () {
        return parseFloat(this.subTotal) - parseFloat(this.subTotalPay)
      }
    },
    methods: {
      reloadInfo () {
        this.fetchTicket()
      },
      fetchTicket (openModal) {
        this.$http.get('admin/tables/' + this.$route.params.id + '/tickets/' + this.$route.params.ticketId).then(
          response => {
            _.extend(this.ticket, response.data)
          },
          () => {
            this.$notify.open({
              type: 'danger',
              content: 'No se encontro el ticket',
              title: 'Error Cargando Ticket'
            })
          }
        )
      }
    }
  }
</script>

<style scoped>
  .sub-header {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 15px;
  }
  .sub-header-inner {
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 15px;
    padding: 0px 5px
  }
  .entries-header {
    font-weight: bold;
    border-bottom: solid 2px #ccc;
    margin: 10px 5px;
    padding: 10px 0px;
  }
  .entries-footer {
    font-weight: bold;
    padding: 10px 0px;
    background: #0099ff;
    margin: 10px 1px;
  }
  .entries-row {
    border-bottom: dashed 1px #ccc;
    padding: 5px 0px;
    margin: 0px 0px 5px 0px;
  }
  .entries-payment {
    margin: 5px 5px;
  }

  .entries-payment .is-2 {
    padding-right: 5px !important;
  }
</style>
