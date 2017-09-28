<template>
  <div class="column is-12" style="height: 870px;">
    <h2 class="header" style="height: 45px;">
      Delivery
      <div class="is-pulled-right">
        <div class="control has-addons">
          <a @click.prevent="loadDelivery()" class="button is-ligth">
            <span class="icon is-small"><i class="fa fa-refresh"></i></span>
          </a>
          <a @click.prevent="prepareDelivery()" class="button is-ligth">
            <span class="icon is-small"><i class="fa fa-truck"></i></span>
          </a>
        </div>
      </div>
    </h2>
    <hr>
    <div style="height: 760px; overflow: auto">
      <div class="column subheader is-marginless">Listos para delivery</h1></div>
      <div class="columns is-multiline" v-if="readyToDelivery.length > 0">
        <div class="column is-12" v-for="ticket in readyToDelivery" :key="ticket.id">
          <router-link class="open-table-button button is-fullwidth is-medium is-light" :to="{ name: 'Ticket', params: { id: ticket.id } }">
            <div style="margin: 5px 0">
              Ticket {{ ticket.number }}
              <span><i v-if="ticket.full_delivered" class="fa fa-check-circle is-success is-pulled-right" style="margin: 5px 0px"></i></span>
            </div>
            <div><small>{{ ticket.client.id ? ticket.client.name : 'S/C' }}</small></div>
            <div><small>{{ (ticket.address || (ticket.client || {}).address || 'Sin direccion') | truncate }}</small></div>
          </router-link>
        </div>
      </div>
      <div class="column" v-else>
        <p class="is-danger-text">No hay pedidos listos para delivery</p>
      </div>
      <hr>
      <div class="column subheader is-marginless">Pendientes en cocina</h1></div>
      <div class="columns is-multiline" v-if="pendingToDelivery.length > 0">
        <div class="column is-12" v-for="ticket in pendingToDelivery" :key="ticket.id">
          <router-link class="open-table-button button is-fullwidth is-medium is-primary" :to="{ name: 'Ticket', params: { id: ticket.id } }">
            <div style="margin: 5px 0">
              Ticket {{ ticket.number }}
              <span><i v-if="ticket.full_delivered" class="fa fa-check-circle fa-floated is-success" style="margin: 5px 0px"></i></span>
            </div>
            <div><small>{{ ticket.client.id ? ticket.client.name : 'S/C' }}</small></div>
            <div><small>{{ (ticket.address || (ticket.client || {}).address || 'Sin direccion') | truncate }}</small></div>
          </router-link>
        </div>
      </div>
      <div class="column" v-else>
        <p class="is-danger-text">No hay tickets abiertos</p>
      </div>
      <hr>
      <div class="column subheader is-marginless">En camino</h1></div>
      <div class="columns is-multiline" v-if="inDelivery.length > 0">
        <div class="column is-12" v-for="ticket in inDelivery" :key="ticket.id">
          <router-link class="open-table-button button is-fullwidth is-medium is-success"
              :to="{ name: 'Delivery', params: { id: ticket.delivery.delivery_id } }">
            <div style="margin: 5px 0">
              Ticket {{ ticket.number }}
              <span><i v-if="ticket.full_delivered" class="fa fa-truck is-pulled-right" style="margin: 5px 0px"></i></span>
            </div>
            <div><small>{{ ticket.client.id ? ticket.client.name : 'S/C' }}</small></div>
            <div><small>{{ (ticket.address || (ticket.client || {}).address || 'Sin direccion') | truncate }}</small></div>
          </router-link>
        </div>
      </div>
      <div class="column" v-else>
        <p class="is-danger-text">No hay deliveries en viaje</p>
      </div>
    </div>
    <modal title="Crear Pedido" :show-footer="false" :on-cancel="cancelPedido" :width="1200" :is-show="createPedido" transition="zoom">
      <delivery-composer :tickets="readyToDelivery" @delivery-created="goToDelivery(delivery)" @delivery-canceled="cancelPedido()"></delivery-composer>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DeliveryComposer from '@/components/deliveries/CreateDelivery'

export default {
  name: 'deliveriesBar',
  components: { DeliveryComposer },
  data () {
    return {
      delivery: [],
      createPedido: false
    }
  },
  filters: {
    truncate: function (value) {
      let dots = '...'
      let val = value.substr(0, 40)
      if (value.length > 40) {
        return val + dots
      } else {
        return val
      }
    }
  },
  created () {
    this.loadDelivery()
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
        return del.full_delivered && del.delivery && !del.delivered
      })
    },
    pendingToDelivery () {
      return this.delivery.filter((del) => {
        return !del.full_delivered && !del.delivery
      })
    }
  },
  methods: {
    goToDelivery (data) {
      this.createPedido = false
      this.loadDelivery()
    },
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
  .subheader { color: #666; font-weight: 400; font-size: 14px; text-transform: uppercase; }
</style>
