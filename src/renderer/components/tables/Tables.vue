<template lang="html">
  <div class="">
    <div v-if="loading">
      <Loader></Loader>
    </div>
    <div v-else>
      <div class="columns" v-if="current.open">
        <div class="column is-3">
          <h2 class="header">
            Delivery
            <div class="is-pulled-right">
              <div class="control has-addons">
                <a @click.prevent="loadDelivery()" class="button is-ligth">
                  <span class="icon is-small"><i class="fa fa-refresh"></i></span>
                  <span>Recargar</span>
                </a>
                <a @click.prevent="prepareDelivery()" class="button is-ligth">
                  <span class="icon is-small"><i class="fa fa-plus"></i></span>
                  <span>Pedido</span>
                </a>
              </div>
            </div>
          </h2>
          <hr>
          <div class="columns is-multiline" v-if="delivery.length > 0">
            <div class="column is-12" v-for="ticket in readyToDelivery" :key="ticket.id">
              <router-link class="open-table-button button is-fullwidth is-medium is-light" :to="{ name: 'Ticket', params: { id: ticket.id } }">
                <div style="margin: 5px 0">
                  Delivery Nro. {{ ticket.number }}
                  <span><i v-if="ticket.full_delivered" class="fa fa-check-circle fa-floated is-success"></i></span>
                </div>
                <div><small>{{ ticket.client.id ? ticket.client.name : 'S/C' }}</small></div>
                <div><small>{{ (ticket.address || 'Sin direccion') | truncate }}</small></div>
              </router-link>
            </div>
            <div class="column is-12" v-for="ticket in pendingToDelivery" :key="ticket.id">
              <router-link class="open-table-button button is-fullwidth is-medium is-primary" :to="{ name: 'Ticket', params: { id: ticket.id } }">
                <div style="margin: 5px 0">
                  Delivery Nro. {{ ticket.number }}
                  <span><i v-if="ticket.full_delivered" class="fa fa-check-circle fa-floated is-success"></i></span>
                </div>
                <p v-if="ticket.client.id"><small>{{ ticket.client.name }}</small></p>
                <div v-if="ticket.client.id"><small>{{ ticket.address || 'Sin direccion'}}</small></div>
              </router-link>
            </div>
            <div class="column is-12" v-for="ticket in inDelivery" :key="ticket.id">
              <router-link class="open-table-button button is-fullwidth is-medium is-primary" :to="{ name: 'Ticket', params: { id: ticket.id } }">
                <div style="margin: 5px 0">
                  Delivery Nro. {{ ticket.number }}
                  <span><i v-if="ticket.full_delivered" class="fa fa-check-circle fa-floated is-success"></i></span>
                </div>
                <p v-if="ticket.client.id"><small>{{ ticket.client.name }}</small></p>
                <div v-if="ticket.client.id"><small>{{ ticket.address || 'Sin direccion'}}</small></div>
              </router-link>
            </div>
          </div>
          <div class="column is-12" v-else>
            <p class="is-danger-text">No hay deliveries pendiente</p>
          </div>
        </div>
        <div class="column is-9">
          <div v-if="tablesOpen.length > 0" style="margin-bottom: 40px;">
            <h1 class="header">
              Mesas Abiertas
              <div class="control has-addons is-pulled-right">
                <input type="text" class="input" v-model="queryOpen" placeholder="Filtrar mesas abiertas">
              </div>
            </h1>
            <hr>
            <div class="columns is-multiline">
              <div class="column is-3" v-for="table in filteredOpenTables" :key="table.id">
                <router-link class="open-table-button is-fullwidth button is-medium" :class="table.color" :to="{ name: 'Ticket', params: { id: table.current.id } }">
                  <div style="margin: 5px 0">{{ table.description}}</div>
                  <div v-if="table.current.client.id"><small>{{ table.current.client.name }}</small></div>
                  <div v-if="table.current.client.id"><small>{{ table.current.client.address || 'Sin direccion'}}</small></div>
                </router-link>
              </div>
            </div>
          </div>
          <div v-if="tablesClosed.length > 0">
            <h1 class="header">
              Mesas Cerradas
              <div class="control has-addons is-pulled-right">
                <input type="text" class="input" v-model="queryClosed" placeholder="Filtrar mesas cerradas">
              </div>
            </h1>
            <hr>
            <div class="columns is-multiline">
              <div class="column is-3" v-for="table in filteredClosedTables" :key="table.id">
                <div class="is-clearfix">
                  <a class="button is-fullwidth is-outlined is-medium" :class="table.color" @click.prevent="openTable(table)">
                    {{ table.description}}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="daily-cash-form" v-else>
        <h1 class="header">
          <tag class="medium" rounded type="danger"><i class="fa fa-exclamation"></i></tag>
          Abrir caja para iniciar el turno
        </h1>
        <hr>
        <div class="box">
          <div class="control">
            <input type="number" class="input" step="0.01" placeholder="Monto inicial" v-model="newCash.init_amount">
          </div>
          <div class="control is-expanded">
            <div class="select is-fullwidth">
              <select v-model="newCash.user_id">
                <option v-for="user in users" v-bind:value="user.id">{{ user.name }}</option>
              </select>
            </div>
          </div>
          <hr>
          <div class="control">
            <button @click.prevent='openCailyCash' class="button is-fullwidth is-primary" :class="{'is-disabled': !newCash.init_amount || !newCash.user_id }">Abrir</button>
          </div>
        </div>
      </div>
    </div>
    <modal title="Crear Pedido" :show-footer="false" :on-cancel="cancelPedido" :width="1200" :is-show="createPedido" transition="zoom">
      <delivery-composer :tickets="readyToDelivery"></delivery-composer>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/utils/Loader'
import Auth from '../../auth'
import alert from '../../mixins/Alert'
import DeliveryComposer from '@/components/deliveries/CreateDelivery'

export default {
  name: 'Tables',
  mixins: [alert],
  components: { Loader, DeliveryComposer },
  beforeRouteEnter (to, from, next) {
    if (Auth.user.profile.role === 'cooker') {
      next(vm => vm.$router.push({ name: 'Kitchen' }))
    } else {
      next()
    }
  },
  data () {
    return {
      queryOpen: '',
      queryClosed: '',
      delivery: [],
      newCash: { init_amount: null, user_id: '' },
      createPedido: false
    }
  },
  filters: {
    truncate: function (value) {
      let dots = '...'
      let val = value.substr(0, 60)
      if (value.length > 60) {
        return val + dots
      } else {
        return val
      }
    }
  },
  computed: {
    ...mapGetters({
      tables: 'allTables',
      current: 'currentCash',
      users: 'allUsers'
    }),
    readyToDelivery () {
      return this.delivery.filter((del) => {
        return del.full_delivered && !del.delivery
      })
    },
    inDelivery () {
      return this.delivery.filter((del) => {
        return del.full_delivered && del.delivery
      })
    },
    pendingToDelivery () {
      return this.delivery.filter((del) => {
        return !del.full_delivered && !del.delivery
      })
    },
    filteredOpenTables () {
      if (this.queryOpen) {
        let regex = new RegExp(this.queryOpen.toLowerCase())
        return this.tablesOpen.filter((table) => {
          return regex.test(table.description.toLowerCase())
        })
      } else {
        return this.tablesOpen
      }
    },
    filteredClosedTables () {
      if (this.queryClosed) {
        let regex = new RegExp(this.queryClosed.toLowerCase())
        return this.tablesClosed.filter((table) => {
          return regex.test(table.description.toLowerCase())
        })
      } else {
        return this.tablesClosed
      }
    },
    tablesOpen () {
      return this.tables.filter((t) => { return !t.closed })
    },
    tablesClosed () {
      return this.tables.filter((t) => { return t.closed })
    },
    loading () {
      return this.$parent.loading
    }
  },
  created () {
    this.loadDelivery()
  },
  methods: {
    loadDelivery () {
      this.$http.get('tickets?without_table=true').then(
        response => {
          this.delivery = response.data
        },
        error => {
          this.alert('danger', error.data)
        }
      ).catch(message => console.log(message))
    },
    openCailyCash () {
      this.$http.post('partial_daily_cashes', {
        partial_daily_cash: { init_amount: this.newCash.init_amount, user_id: this.newCash.user_id }
      }).then(
        response => {
          this.$store.dispatch('updateDailyCash', response.data)
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    openTable (table) {
      this.$http.post('tables/' + table.id + '/open').then(
        response => {
          this.$store.dispatch('updateTable', response.data)
          this.$router.push({ name: 'Ticket', params: { id: response.data.current.id } })
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    prepareDelivery () {
      this.createPedido = true
    },
    cancelPedido () {
      this.createPedido = false
    }
  }
}
</script>

<style lang="css" scoped>
  .open-table-button { font-weight: bold; height: 70px; display:inline-block; text-align: left;  }
</style>
