<template>
  <div class="kitchen">
    <div class="container">
      <div class="columns header">
        <div class="column is-2">
          <tag rounded id="header-icon"><i class="fa fa-floated fa-cutlery"></i></tag> COCINA
        </div>
        <div class="column is-3 has-text-centered">
          <div class="button is-danger is-not-link" v-if="newRequests">
            <span class="icon is-small"><i class="fa fa-exclamation-circle"></i></span>
            <span>Nuevos Pedidos</span>
          </div>
        </div>
        <div class="column is-7 has-text-right" style="margin-top: -5px;">
          <tooltip content="Editar datos personales">
            <router-link :to="{ name: 'Profile' }" class="button is-medium is-light">
              <span class="icon is-small"><i class="fa fa-user-o"></i></span>
              <span>{{ user.profile.name }}</span>
            </router-link>
          </tooltip>
          <div class="button is-light is-medium is-not-link">
            <span class="icon is-small"><i class="fa fa-calendar"></i></span>
            <span>{{ currentTime | moment('DD - MMMM - YYYY') | upercase }}</span>
          </div>
          <div class="button is-light is-medium is-not-link">
            <span class="icon is-small"><i class="fa fa-clock-o"></i></span>
            <span>{{ currentTime | moment('HH:mm:ss')}}</span>
          </div>
          <tooltip v-bind:content="'Recargar tickets - Ultimo check: ' + lastCheck">
            <a @click.prevent="fetchTickets" class="button is-primary is-medium" :class="{'is-disabled': loadingTickets }">
              <span class="icon"><i class="fa fa-refresh" :class="{'fa-spin': loadingTickets }"></i></span>
            </a>
          </tooltip>
        </div>
      </div>
      <hr>
      <div class="kitchen-content">
        <table class="table">
          <thead>
            <th>Mesa #</th>
            <th>Ticket ID</th>
            <th>Pedido</th>
          </thead>
          <tbody>
            <tr v-for="(ticket, id) in currentTickets" :key="id">
              <td style="width:15%">
                <span v-if="ticket.table_id" class="table-id button is-fullwidth is-danger">
                  <b>#{{ ticket.table_id }}</b>
                </span>
                <span v-else class="button is-primary"><b>DELIVERY</b></span>
              </td>
              <td style="width:15%">
                <tooltip content="Enviar todo lo pendiente">
                  <a @click.prevent="deliverTicket(ticket)" class="button is-success">
                    <span class="icon is-small"><i class="fa fa-reply"></i></span>
                    <span><b>{{ ticket.number }}</b></span>
                  </a>
                </tooltip>
              </td>
              <td>
                <div v-for="(entry, id) in ticket.entries" class="entry-row">
                  <div class="entry-comment" v-if="entry.comment"> 
                    <i class="fa fa-exclamation-circle fa-floated"></i> {{ entry.comment | titleize }}
                  </div>
                  <div class="columns">
                    <div class="column is-2">
                      <tooltip content="Sacar Entrada completa">
                        <a class="button is-fullwidth is-light" @click="deliverEntry(ticket, entry)" :class="{'is-disabled is-success': entry.delivered }">
                          <span class="icon is-small"><i class="fa fa-reply"></i></span>
                          <span>Enviar Grupo</span>
                        </a>
                      </tooltip>
                    </div>
                    <div class="column is-10">
                      <div v-for="req in entry.items" class="request-row">
                        <tooltip content="Sacar pedido">
                          <a class="button is-light" @click="deliverItem(req)" :class="{'is-disabled is-success': req.delivered_at }">
                            <i class="fa" :class="{'fa-check': req.delivered_at, 'fa-reply': !req.delivered_at }"></i>
                          </a>
                        </tooltip>
                        <span class="button is-light is-not-link">{{ req.name }}</span>
                        <div class="is-pulled-right button is-white is-not-link">
                          Pedido {{ req.created_at | moment("from") }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="currentTickets.length === 0">
              <td colspan="3">
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

  export default {
    name: 'Kitchen',
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
        user: Auth.user
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
        return this.tickets
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
      deliverItem (item) {
        this.$http.post('kitchen/deliver_item', { entry_item_id: item.id }).then(
          response => {
            _.extend(item, response.data)
          },
          error => {
            console.log(error.data)
          }
        )
      },
      deliverEntry (ticket, entry) {
        this.$http.post('kitchen/deliver_entry', { entry_id: entry.id }).then(
          response => {
            delete ticket.entries[entry.id]
          },
          error => {
            console.log(error.data)
          }
        )
      },
      deliverTicket (ticket) {
        this.$http.post('kitchen/deliver_ticket', { ticket_id: ticket.id }).then(
          response => {
            let index = this.tickets.indexOf(ticket)
            this.tickets.splice(index, 1)
          },
          error => {
            console.log(error.data)
          }
        )
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
  .kitchen .entry-comment { font-weight: bold; background: #f5f5f5; color: #333; padding: 6px; margin-bottom: 10px; border-radius: 4px;}
  .kitchen .empty-message { font-size: 20px; }
</style>
