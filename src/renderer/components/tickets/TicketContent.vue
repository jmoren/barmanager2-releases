<template lang="html">
  <div class="columns ticket">
    <div class="column is-9">
      <div class="ticket-form">
        <div class="columns">
          <div class="column is-3">
            <a class="button is-fullwidth" v-shortkey.once="['ctrl', '1']" :class="{'is-disabled': ticket.closed, 'is-primary': type === 'Item' }" @shortkey="toggleEntry('Item')" @click.prevent="toggleEntry('Item');">
              <span>Item</span>
            </a>
          </div>
          <div class="column is-3">
            <a class="button is-fullwidth" v-shortkey.once="['ctrl', '2']" :class="{'is-disabled': ticket.closed, 'is-primary': type === 'Promotion' }" @shortkey="toggleEntry('Promotion')" @click.prevent="toggleEntry('Promotion');">
              <span>Promocion</span>
            </a>
          </div>
          <div class="column is-3">
            <a class="button is-fullwidth" v-shortkey.once="['ctrl', '3']" :class="{'is-disabled': ticket.closed, 'is-primary': type === 'Additional' }" @shortkey="toggleEntry('Additional')" @click.prevent="toggleEntry('Additional');">
              <span>Adicional</span>
            </a>
          </div>
          <div class="column is-3">
            <a class="button is-warning is-fullwidth is-outlined" v-shortkey.once="['ctrl', '4']" @shortkey="isShow = true" @click.prevent="isShow = true">
              <span class="icon is-small"><i class="fa fa-star"></i></span>
              <span>Ver Favoritos (ctrl + 4)</span>
            </a>
          </div>
        </div>
        <hr>
        <div v-if="type === 'Item'">
          <ticket-item-form :items="items" :status="ticket.closed" @save-entry="entry => addEntry(entry)"></ticket-item-form>
        </div>
        <div v-if="type === 'Promotion'">
          <ticket-promo-form :promotions="promotions" :status="ticket.closed" @save-entry="entry => addEntry(entry)"></ticket-promo-form>
        </div>
        <div v-if="type === 'Additional'">
          <ticket-additional-form :status="ticket.closed" @save-entry="entry => addEntry(entry)"></ticket-additional-form>
        </div>
        <hr>
      </div>
      <div class="ticket-lines">
        <div v-if="loading">
          <Loader></Loader>
        </div>
        <div v-else>
          <table class="table">
            <thead>
              <th class="hide"></th>
              <th class="has-text-centered hide">Tipo</th>
              <th class="has-text-centered hide">Cod</th>
              <th class="has-text-centered">Cant.</th>
              <th class="has-text-centered hide">Cocina</th>
              <th>Item</th>
              <th class="has-text-centered">P.Unidad</th>
              <th class="has-text-centered">SubTotal</th>
              <th></th>
            </thead>
            <tbody>
              <tr v-if="entries.length < 1">
                <td colspan="9"><div class="empty-message">No hay entradas</div></td>
              </tr>
              <ticket-row v-else v-for="entry in entries" :key="entry.id" :entry="entry" :reasons="reasons" :tclosed="ticket.closed"
                      :tprinted="ticket.printed" @reload-content="fetchEntries" :kitchenView="kitchenView"></ticket-row>
            </tbody>
          </table>
        </div>
      </div>
      <div class="resume">
        <div class="columns resume-header print">
          <div class="column is-4">TOTAL $ {{ total | withDecimals }}</div>
          <div class="column is-4">PENDIENTE $ {{(pending || 0) | withDecimals}}</div>
          <div class="column is-4" v-if="!ticket.table_id">
            <div class="control has-addons is-pulled-right not-print">
              <span class="button is-primary is-not-link"><i class="fa fa-dollar"></i></span>
              <input type="number" step="0.01" v-model="pay_with" class="input" placeholder="Paga el delivery con"
              @keydown.enter="setPayWith()">
            </div>
          </div>
        </div>
        <div class="columns resume-sub-row">
          <div class="column is-4">
            <div> Pedidos Confirmados <b>{{ totalLines }}</b></div>
            <br>
          </div>
          <div class="column is-4">
            <div> Pedidos Cancelados: <b>{{ totalCanceledLines }}</b></div>
            <br>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-3 payments">
      <ticket-payment :ticket="ticket" :total="total" @ticket-paid="setPaid" @ticket-not-paid="setNotPaid"></ticket-payment>
    </div>
    <b-aside :is-show="isShow" :width="500" :show-footer="false" placement="right" title="Favoritos" @close="isShow=false">
      <form name="itemsbulk">
        <h1><b>ITEMS</b></h1>
        <hr>
        <ul>
          <li v-for="item in favoriteData.items" style="margin-bottom: 10px;">
            <tag type="warning"><i class="fa fa-star"></i></tag>
            <tag><b>{{ item.code }}</b></tag>
            <tag><i v-if="item.category.kitchen" class="fa fa-cutlery" style="margin-right: 10px;"></i> {{ item.name }}</tag>
            <div class="is-pulled-right">
              <tag>{{ item.price }}</tag>
              <input type="number" class="quantity input is-small" style="width: 60px;" @change.prevent="event => addItemBulk(event, item)">
            </div>
          </li>
        </ul>
        <br>
        <h1><b>PROMOCIONES</b></h1>
        <hr>
        <ul>
          <li v-for="promotion in favoriteData.promotions" style="margin-bottom: 10px;">
            <tag type="warning"><i class="fa fa-star"></i></tag>
            <tag><b>{{ promotion.code }}</b></tag>
            <tag>{{ promotion.name }}</tag>
            <div class="is-pulled-right">
              <tag>{{ promotion.price }}</tag>
              <input type="number" class="quantity input is-small" style="width: 60px;" @change.prevent="event => addItemBulk(event, promotion)">
            </div>
          </li>
        </ul>
        <hr>
        <div style="text-align: center;">
          <a @click.prevent="sendBulk()" class="button is-primary">Agregar al Ticket</a>
        </div>
      </form>
    </b-aside>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Loader from '@/components/utils/Loader'
  import TicketRow from './TicketRow'
  import TicketPayment from './TicketPayment'
  import TicketItemForm from './TicketItemForm'
  import TicketPromoForm from './TicketPromoForm'
  import TicketAdditionalForm from './TicketAdditionalForm'
  import _ from 'lodash'
  export default {
    name: 'TicketContent',
    props: ['ticket', 'reasons', 'kitchenView'],
    components: {
      TicketRow,
      TicketPayment,
      TicketItemForm,
      TicketPromoForm,
      TicketAdditionalForm,
      Loader
    },
    watch: {
      '$route': 'focusCode',
      'ticket.closed': 'fetchEntries',
      total () {
        this.setPayWith(true)
      }
    },
    data () {
      return {
        type: 'Item',
        items: [],
        promotions: [],
        entries: [],
        isShow: false,
        loading: false,
        pending: 0,
        pay_with: this.ticket.pay_with,
        itemsToAdd: []
      }
    },
    created () {
      this.pending = this.ticket.pending
      this.populateData()
      this.fetchEntries()
      this.focusCode()
    },
    computed: {
      favoriteData () {
        let data = {}
        data.promotions = this.promotions.filter(function (promotion) { return promotion.favorite })
        data.items = this.items.filter(function (item) { return item.favorite })
        return data
      },
      total () {
        this.ticket.total = this.entries.filter((e) => {
          return !e.canceled
        }).reduce(function (total, entry) {
          return parseFloat(total) + parseFloat(entry.subtotal)
        }, 0.0)

        return this.ticket.total
      },
      totalLines () {
        return this.entries.filter((e) => {
          return !e.canceled
        }).length
      },
      totalCanceledLines () {
        return this.entries.filter((e) => {
          return e.canceled
        }).length
      }
    },
    filters: {
      withDecimals: function (value) {
        return parseFloat(value).toFixed(2)
      }
    },
    methods: {
      fetchEntries () {
        if (typeof (this.ticket.id) === 'undefined') {
          return
        }
        this.loading = true
        this.$http.get('tickets/' + this.ticket.id + '/entries').then(
          response => {
            this.entries = response.data
            this.loading = false
          }
        )
      },
      toggleEntry (value) {
        this.type = value
        this.focusCode()
      },
      focusCode () {
        Vue.nextTick(() => {
          let elem = document.getElementById('code')
          if (elem) {
            elem.focus()
          }
        })
      },
      addEntry (entry) {
        let params = {
          ticketable_type: this.type,
          subtotal: entry.subtotal,
          quantity: entry.quantity,
          comment: entry.comment,
          ticket_id: this.ticket.id,
          additional_kitchen: entry.kitchen
        }
        params.ticketable_id = this.type !== 'Additional' ? entry.item.id : null

        this.$http.post('tickets/' + this.ticket.id + '/entries', { entry: params }).then(
          response => {
            var index = this.entries.findIndex(function (entry) {
              return entry.id === response.data.id
            })
            if (index > -1) {
              this.entries.splice(index, 1)
            }
            this.entries.push(response.data)
            this.toggleEntry('Item')
            document.getElementById('code').focus()
          },
          error => {
            this.$notify.open({
              content: error.data || 'Error agregando Item',
              duration: 3000,
              type: 'danger'
            })
          }
        )
      },
      populateData () {
        this.$http.get('items').then(
          response => {
            this.items = response.data
          }
        )
        this.$http.get('promotions').then(
          response => {
            this.promotions = response.data
          }
        )
      },
      setPaid (value) {
        this.$emit('ticket-paid', value)
        this.pending = value
      },
      setNotPaid (value) {
        this.$emit('ticket-not-paid', value)
        this.pending = value
      },
      setPayWith (resetValue) {
        if (this.ticket.table_id) {
          return false
        } else {
          if (resetValue) {
            if (parseFloat(this.pay_with) > 0) {
              this.pay_with = 0
              this.$emit('update-pay', this.pay_with)
            }
          } else {
            if (parseFloat(this.total) > 0 &&
               (parseFloat(this.pay_with) < parseFloat(this.total) || parseFloat(this.pay_with) < parseFloat(this.pending))) {
              this.$notify.open({
                content: 'El pago no puede ser menor al total o pendiente',
                duration: 3000,
                type: 'danger'
              })
            } else {
              this.$emit('update-pay', this.pay_with)
            }
          }
        }
      },
      sendBulk () {
        this.$http.post('tickets/' + this.ticket.id + '/entries/bulk', { bulk: { entries: this.itemsToAdd } }).then(
          response => {
            _.forEach(response.data.entries, (e) => {
              this.entries.push(e)
            })
            this.$notify.open({
              content: `${response.data.meta.total} item agregados`,
              duration: 3000,
              type: 'success',
              placement: 'top-center'
            })
            this.isShow = false
            this.itemsToAdd = []
            let inputs = document.getElementsByClassName('quantity')
            _.forEach(inputs, (input) => {
              input.value = ''
            })
          },
          error => {
            this.isShow = false
            this.$notify.open({
              content: error.data || 'Error agregando Items',
              duration: 3000,
              type: 'danger',
              placement: 'top-center'
            })
          }
        )
      },
      addItemBulk (evt, item) {
        let quantity = evt.target.value
        if (quantity > 0) {
          let subtotal = parseInt(quantity) * parseFloat(item.price)
          let params = {
            ticketable_type: item.type,
            subtotal: subtotal,
            quantity: quantity,
            ticket_id: this.ticket.id,
            additional_kitchen: item.kitchen,
            ticketable_id: item.id
          }

          let exists = this.itemsToAdd.filter((e) => e.ticketable_id === item.id)[0]
          if (exists) {
            _.extend(exists, params)
          } else {
            this.itemsToAdd.push(params)
          }
        } else {
          let exists = this.itemsToAdd.filter((e) => e.ticketable_id === item.id)[0]
          if (exists) {
            let index = this.itemsToAdd.indexOf(exists)
            this.itemsToAdd.splice(index, 1)
          }
        }
      }
    }
  }
</script>

<style lang="css">
  .ticket-lines {
    min-height: 350px;
    max-height: 350px;
    margin: 0 5px;
    overflow: auto;
    border: 1px solid rgb(236, 236, 236);
    border: 1px solid rgba(236, 236, 236, .5);
  }
  .ticket-form { padding: 5px; }
  .ticket-form hr:last-child { margin-bottom: 5px; }
  .ticket-sub-header { padding: 10px 5px; font-weight: bold; font-size: 18px; border-bottom: solid 1px #eee; margin-bottom: 10px; }
  .ticket .resume { margin: 30px 15px 0px 15px; }
  .ticket .resume .resume-header { padding: 5px 0px; background: #F3F4F4; border-bottom: solid 1px #ccc; font-size: 20px; font-weight: 400; }
  .ticket .resume .resume-sub-row { padding: 5px 0px; background: #F6F6F6; font-size: 15px; font-weight: 100; }

  tr.is-closed { opacity: 0.8 }
  @media print {
    .ticket-form, .payments.column.is-3, .resume .resume-sub-row, a.button, button.button, .not-print { display: none; }
    .fa.fa-question-circle { display: none; }
    .ticket-lines { overflow: visible; border: none; max-height: none;}
    .resume .column { float: left; }
    table thead th.hide { display: none !important; }
    table tbody tr td, table thead th { text-align: left; font-size: 12px !important;  }
    .resume .columns .column { font-size: 12px; }
  }
</style>
