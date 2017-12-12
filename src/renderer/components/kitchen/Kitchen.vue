<template>
  <div class="kitchen">
    <div class="container">
      <div class="columns header">
        <div class="column is-3">
          <tag rounded id="header-icon"><i class="fa fa-floated fa-cutlery"></i></tag> COCINA
        </div>
        <div class="column is-2 has-text-centered">
          <div class="button is-danger is-not-link" v-if="newRequests">
            <span class="icon is-small"><i class="fa fa-exclamation-circle"></i></span>
            <span>Nuevos Pedidos</span>
          </div>
        </div>
        <div class="column is-7 has-text-right" style="margin-top: -5px;">
          <tooltip v-bind:content="'Recargar tickets - Ultimo check: ' + lastCheck">
            <a @click.prevent="fetchTickets" class="button is-primary" :class="{'is-disabled': loadingTickets }">
              <span class="icon"><i class="fa fa-refresh" :class="{'fa-spin': loadingTickets }"></i></span>
            </a>
          </tooltip>
          <tooltip content="Sync kitchen">
            <a @click.prevent="syncKitchen" class="button is-danger" :class="{'is-disabled': loadingTickets }">
              <span class="icon"><i class="fa fa-retweet" :class="{'fa-spin': loadingTickets }"></i></span>
            </a>
          </tooltip>
          <div class="button is-light is-not-link">
            <span class="icon is-small"><i class="fa fa-calendar"></i></span>
            <span>{{ currentTime | moment('DD - MMMM - YYYY') | upercase }}</span>
          </div>
          <div class="button is-light is-not-link">
            <span class="icon is-small"><i class="fa fa-clock-o"></i></span>
            <span>{{ currentTime | moment('HH:mm:ss')}}</span>
          </div>
          <a @click.prevent="logout" class="button is-light">
            <span class="icon is-small"><i class="fa fa-sign-out"></i></span>
            <span>Salir</span>
          </a>
        </div>
      </div>
      <div class="is-clearfix">
        <router-link :to="{ name: 'Tables'}" style="float:right" v-if="['admin'].indexOf(user.profile.role) > -1">
          <span class="icon is-small"><i class="fa fa-arrow-left"></i></span>
          <span>Volver</span>
        </router-link>
      </div>
      <hr>
      <div class="kitchen-content">
        <table class="table">
          <thead>
            <th></th>
            <th>Mesa #</th>
            <th>Ticket ID</th>
            <th>Pedido</th>
          </thead>
          <tbody>
            <kitchen-row v-for="(ticket, id) in currentTickets" :ticket="ticket" :key="id" :barcodeConfig="barcode" :mapConfig="mapConfig" @remove-ticket="removeTicket(ticket)"></kitchen-row>
            <tr v-if="currentTickets.length === 0">
              <td colspan="4">
                <p class="empty-message has-text-centered is-danger-text">No hay item en la cocina</p></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import _ from 'lodash'
  import Auth from '../../auth'
  import KitchenRow from './KitchenRow'
  import Vue from 'vue'
  const Config = require('electron-config')
  const config = new Config()

  export default {
    name: 'Kitchen',
    components: { KitchenRow },
    data () {
      return {
        tickets: [],
        current: Date.now(),
        loading: false,
        mainCall: null,
        clock: null,
        newRequests: false,
        lastTimestamp: null,
        audio: null,
        user: Auth.user,
        mapConfig: {
          showMap: config.get('map_visible', false),
          width: config.get('map_width', 200),
          height: config.get('map_height', 200)
        },
        barcode: {
          format: config.get('barcode_format', 'EAN13'),
          width: 1,
          height: 20,
          lastChar: config.path
        }
      }
    },
    filters: {
      upercase (value) {
        return value.toUpperCase()
      },
      titleize (value) {
        let words = value.split(' ')
        return words.map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' ')
      }
    },
    mounted () {
      this.audio = new Audio('static/sound.mp3')
    },
    computed: {
      loadingTickets () {
        return this.loading
      },
      currentTickets () {
        return _.sortBy(this.tickets, 'first_entry')
      },
      currentTime () {
        return this.current
      },
      lastCheck () {
        return moment(this.lastTimestamp).format('HH:mm:ss')
      },
      player () {
        return this.audio
      }
    },
    created () {
      this.loadTickets()
      this.startClock()
    },
    beforeDestroy () {
      clearInterval(this.mainCall)
      clearInterval(this.clock)
    },
    methods: {
      logout () {
        this.$modal.confirm({
          title: 'Salir',
          content: 'Estas seguro de salir?',
          onOk: this.confirmLogout
        })
      },
      confirmLogout () {
        Auth.logout()
      },
      startClock () {
        this.clock = setInterval(() => {
          this.current = Date.now()
        }, 1000)
      },
      loadTickets () {
        this.fetchTickets()
        this.mainCall = setInterval(() => {
          this.fetchTickets()
        }, 15000)
      },
      syncKitchen () {
        this.loading = true
        this.$http.get('kitchen/sync').then(
          response => {
            console.log('SYNC')
            this.fetchTickets()
          }
        )
      },
      fetchTickets () {
        this.loading = true
        this.$http.get('kitchen?last_check=' + this.lastTimestamp).then(
          response => {
            this.newRequests = response.data.has_new_items
            this.tickets = response.data.t
            this.loading = false
            this.lastTimestamp = Date.now()
            if (this.newRequests) {
              this.player.play()
            }
          }
        )
      },
      removeTicket (ticket) {
        Vue.delete(this.tickets, ticket.id)
        this.$notify.open({ content: 'Ticket enviado', type: 'success' })
      }
    }
  }
</script>

<style scoped>
  .kitchen .container { font-size: 15px; padding-top: 40px; padding-bottom: 40px; height: 100%; }
  .kitchen .container .tag { font-size: 15px; }
  .kitchen .kitchen-content table { background: #fff; min-height: 200px; }
  .kitchen .kitchen-content table tr:hover td { background: #fff; }
  .kitchen .kitchen-content table tr td { padding: 10px 8px; }
  .kitchen .kitchen-content table tr td:last-childe { padding-right: 0px; }
  .kitchen .entry-row {
    margin-bottom: 10px;
    border-bottom: dashed 2px #ddd;
    padding-bottom: 20px;
  }
  .kitchen .entry-row.danger { border-color: #f56954; }
  .kitchen .request-row { margin-bottom: 5px; }
  .kitchen .entry-comment { font-weight: bold; background: #0099ff; color: #333; padding: 6px; margin-bottom: 10px; border-radius: 4px;}
  .kitchen .empty-message { font-size: 20px; }
</style>
