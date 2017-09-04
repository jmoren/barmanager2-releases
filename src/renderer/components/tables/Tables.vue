<template lang="html">
  <div class="">
    <div v-if="loading">
      <Loader></Loader>
    </div>
    <div v-else>
      <div class="columns" v-if="current.open">
        <div class="column is-3">
          <h1 class="header">Delivery</h1>
          <hr>
          <div class="columns is-multiline" v-if="delivery.length > 0">
            <div class="column is-12" v-for="ticket in delivery" :key="ticket.id">
              <router-link class="table-button button is-fullwidth is-medium is-primary" :to="{ name: 'Ticket', params: { id: ticket.id } }">
                Delivery Nro. {{ ticket.number }}
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
                <div class="is-clearfix">
                  <tooltip v-bind:content="'T. ' + table.current.number">
                    <router-link class="table-button button is-fullwidth is-medium" :class="table.color" :to="{ name: 'Ticket', params: { id: table.current.id } }">
                      {{ table.description}}
                    </router-link>
                  </tooltip>
                </div>
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
                  <a class="table-button button is-fullwidth is-outlined is-medium" :class="table.color" @click.prevent="openTable(table)">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/utils/Loader'
import Auth from '../../auth'
import alert from '../../mixins/Alert'

export default {
  name: 'Tables',
  mixins: [alert],
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
      newCash: { init_amount: null, user_id: '' }
    }
  },
  components: { Loader },
  computed: {
    ...mapGetters({
      tables: 'allTables',
      current: 'currentCash',
      users: 'allUsers'
    }),
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
  mounted () {
    console.log('mounted')
    document.getElementById('search').focus()
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
    }
  }
}
</script>

<style lang="css" scoped>
  a.table-button.button { font-weight: bold; justify-content: space-between; }
  a .table-cell { color: #fff; }
</style>
