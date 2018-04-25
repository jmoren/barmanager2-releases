<template lang="html">
  <div class="">
    <div v-if="loading">
      <Loader></Loader>
    </div>
    <div v-else>
      <div class="columns" v-if="current.open">
        <div class="column is-12">
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
      current: 'currentCash',
      users: 'allUsers'
    }),
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
    updateTable (x, y, w, h) {
      const data = { 'table': { x: x, y: y, width: w, height: h } }
      this.$http.put('tables/' + this.selectedTable.id, data).then(
        response => {
          this.$store.dispatch('updateTable', response.data)
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    goToTable (ticketId) {
      this.$router.push({ name: 'Ticket', params: { id: ticketId } })
    },
    openTable (table) {
      if (!table.closed) {
        this.goToTable(table.current.id)
      } else {
        this.$http.post('tables/' + table.id + '/open').then(
          response => {
            this.$store.dispatch('updateTable', response.data)
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
