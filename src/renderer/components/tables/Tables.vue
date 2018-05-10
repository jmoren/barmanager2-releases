<template lang="html">
  <div class="">
    <div v-if="loading">
      <Loader></Loader>
    </div>
    <div v-else>
      <div class="columns" v-if="current.open">
        <div class="column is-12"  v-if="tablesView === 'map'">
          <div v-bind:style="screenStyle">
            <vue-draggable-resizable
              @activated="onActivated(t)"
              @dragstop="updateTable"
              @resizestop="updateTable"
              v-for="t in tables"
              :key="t.id"
              :w=t.width
              :h=t.height
              :x=t.x
              :y=t.y
              :parent="true"
              style="border: 1px solid gray;"
              :class="{'red-table': t.closed, 'green-table': !t.closed }">
              <a @click="openTable(t)" style="color: white; font-size: 16px;"><b>{{t.description}}</b></a>
              <div>
                <p v-if="t.current.id" class="is-fullwidth">
                  <span class="icon">
                    <i class="fa fa-dollar"></i>
                  </span>
                  <span>{{` ${t.current.pending} / ${t.current.total}`}}</span>
                </p>

                <p v-if="t.current.id && t.current.client.id" class="is-fullwidth">
                  <span class="icon">
                    <i class="fa fa-user"></i>
                  </span>
                  <span>{{` ${t.current.client.name}`}}</span>
                </p>
              </div>
            </vue-draggable-resizable>
          </div>
        </div>
        <div class="column is-12" v-else>
          <div v-if="openTables.length > 0" style="margin-bottom: 40px;">
            <h1 class="header">
              Mesas Abiertas ({{ openTables.length }})
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
                  <div v-if="table.current.client.id"><small>{{ table.current.client.address || 'Sin direccion' | truncate }}</small></div>
                </router-link>
              </div>
            </div>
          </div>
          <div v-if="closedTables.length > 0">
            <h1 class="header">
              Mesas Cerradas ({{ closedTables.length }})
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/utils/Loader'
import Auth from '../../auth'
import alert from '../../mixins/Alert'
import VueDraggableResizable from 'vue-draggable-resizable'

const Config = require('electron-config')
const config = new Config()

export default {
  name: 'Tables',
  mixins: [alert],
  components: { Loader, VueDraggableResizable },
  beforeRouteEnter (to, from, next) {
    if (Auth.user.profile.role === 'cooker') {
      next(vm => vm.$router.push({ name: 'Kitchen' }))
    } else {
      next()
    }
  },
  data () {
    return {
      screenStyle: {
        height: '1000px',
        width: window.innerWidth,
        border: '1px solid gray',
        position: 'relative'
      },
      selectedTable: { x: 0, y: 0, width: 100, height: 100 },
      tablesView: config.get('tablesView', 'classic'),
      queryOpen: '',
      queryClosed: '',
      last_cash: {},
      newCash: { init_amount: null, user_id: '' }
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
  computed: {
    ...mapGetters({
      tables: 'allTables',
      openTables: 'openTables',
      closedTables: 'closedTables',
      current: 'currentCash',
      users: 'allUsers'
    }),
    filteredOpenTables () {
      if (this.queryOpen) {
        let regex = new RegExp(this.queryOpen.toLowerCase())
        return this.openTables.filter((table) => {
          return regex.test(table.description.toLowerCase())
        })
      } else {
        return this.openTables
      }
    },
    filteredClosedTables () {
      if (this.queryClosed) {
        let regex = new RegExp(this.queryClosed.toLowerCase())
        return this.closedTables.filter((table) => {
          return regex.test(table.description.toLowerCase())
        })
      } else {
        return this.closedTables
      }
    },
    loading () {
      return this.$parent.loading
    }
  },
  created () {
    this.loadLastCash()
  },
  methods: {
    onActivated (table) {
      this.selectedTable = table
    },
    loadLastCash () {
      if (this.current.open) { return false }
      this.$http.get('partial_daily_cashes/last').then(
        response => {
          this.last_cash = response.data
          this.newCash.init_amount = this.last_cash.manual_cash
        },
        error => {
          console.log(error)
        }
      )
    },
    updateTable (x, y, w, h) {
      const data = { 'table': { x: x, y: y, width: w, height: h } }
      this.$http.put('tables/' + this.selectedTable.id, data).then(
        response => {
          this.$store.dispatch('updateTable', [response.data])
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    goToTable (ticketId) {
      this.$router.push({ name: 'Ticket', params: { id: ticketId } })
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
      if (!table.closed) {
        this.goToTable(table.current.id)
      } else {
        this.$http.post('tables/' + table.id + '/open').then(
          response => {
            this.$store.dispatch('updateTable', [response.data])
            this.goToTable(response.data.current.id)
          },
          error => {
            this.alert('danger', error.data)
          }
        )
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .open-table-button { font-weight: bold; height: 70px; display:inline-block; text-align: left;  }
  .red-table { background-color: red !important; color: white; text-align: center; }
  .green-table { background-color: green !important; color: white; text-align: center; }
</style>
