<template lang="html">
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <h1 class="header is-clearfix">
        <div class="control has-addons is-pulled-left" style="margin-bottom: 3px;">
          <span class="button is-not-link" :class="{'is-success': table.status === 'open', 'is-danger': table.status === 'closed' }">
            {{ formattedStatus }}
          </span>
          <span class="button is-light is-not-link">MESA #{{ table.id }}</span>
        </div>
        <div class="is-pulled-right" v-if="hasTickets">
          <div class="control has-addons is-marginless">
            <input type="text" class="input is-disabled" value="Seleccione Ticket">
            <div class="select">
              <select @change="loadTicket" v-model="currentTicket">
                <option v-for="ticket in tickets" v-bind:value="ticket.id">TICKET {{ ticket.number }}</option>
              </select>
            </div>
          </div>
        </div>
      </h1>
      <hr>
      <div v-if="!loadingTickets && !hasTickets">
        Esta mesa no tiene tickets todavia
      </div>
      <div v-if="loadingTickets">
        <Loader></Loader>
      </div> 
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/utils/Loader'
export default {
  name: 'Table',
  data () {
    return {
      tickets: [],
      currentTicket: null,
      loading: false,
      loadingTickets: false
    }
  },
  created () {
    this.fetchTable()
  },
  components: { Loader },
  computed: {
    ...mapGetters({
      table: 'current'
    }),
    formattedStatus () {
      return this.table.status === 'closed' ? 'Cerrada' : 'Abierta'
    },
    hasTickets () {
      return this.tickets.length > 0
    }
  },
  methods: {
    fetchTable () {
      // Get from store
      this.$store.dispatch('setCurrent', this.$route.params.id)
      // Load tickets for this table
      this.loadingTickets = true
      this.$http.get('admin/tables/' + this.$route.params.id + '/tickets').then(
        response => {
          this.loadingTickets = false
          this.tickets = response.data
          if (this.tickets.length > 0) {
            this.currentTicket = this.tickets[0].id
            this.loadTicket()
          }
        },
        error => {
          console.log(error)
          this.loadingTickets = false
        }
      )
    },
    loadTicket () {
      if (this.currentTicket) {
        this.$router.push({ name: 'AdminTicket', params: { ticketId: this.currentTicket } })
      }
    }
  }
}
</script>

<style lang="css">
  h1.header-center { font-size: 25px; font-weight: bolder; text-align: center; margin: 0px;}

  ul#ticket-list  li a {
    border-bottom: solid 1px #ccc;
    color: #666;
    padding: 10px;
  }
  ul#ticket-list li.isClosed {
    background: #f6f6f6;
    color: #666;
  }
</style>
