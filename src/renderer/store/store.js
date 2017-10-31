import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const DELETE_TABLE = 'DELETE_TABLE'
const UPDATE_TABLE = 'UPDATE_TABLE'
const LOAD_TABLES = 'LOAD_TABLES'
const ADD_TABLE = 'ADD_TABLE'
const SET_DAILY_CASH = 'SET_DAILY_CASH'
const CLOSE_TABLE = 'CLOSE_TABLE'
const SET_TABLE_BY_ID = 'SET_TABLE_BY_ID'
const LOAD_USERS = 'LOAD_USERS'
const ADD_USER = 'ADD_USER'
const UPDATE_USER = 'UPDATE_USER'
const UPDATE_DAILY_CASH = 'UPDATE_DAILY_CASH'
const SET_REASONS = 'SET_REASONS'
const CHANGE_USER_TABLE = 'CHANGE_USER_TABLE'

const state = {
  tables: {
    all: [],
    current: null,
    open: [],
    closed: []
  },
  users: [],
  reasons: [],
  cash: {},
  units: {
    'gr': 'Gramos',
    'ml': 'Mililitros',
    'Units': 'Unidades'
  },
  months: [
    { name: 'Enero', number: 1 },
    { name: 'Febrero', number: 2 },
    { name: 'Marzo', number: 3 },
    { name: 'Abril', number: 4 },
    { name: 'Mayo', number: 5 },
    { name: 'Junio', number: 6 },
    { name: 'Julio', number: 7 },
    { name: 'Agosto', number: 8 },
    { name: 'Septiembre', number: 9 },
    { name: 'Octubre', number: 10 },
    { name: 'Noviembre', number: 11 },
    { name: 'Diciembre', number: 12 }
  ]
}

const getters = {
  allTables: state => state.tables.all,
  currentCash: state => state.cash || { user_id: '', init_amount: 0 },
  current: state => state.tables.current,
  openTables: state => state.tables.open,
  closedTables: state => state.tables.closed,
  allUsers: state => state.users,
  allReasons: state => state.reasons,
  months: state => state.months,
  allUnits: state => state.units
}

// actions
const actions = {
  changeUserTable ({ commit }, data) {
    commit(CHANGE_USER_TABLE, data)
  },
  setDailyCash ({ commit }, dailyCash) {
    commit(SET_DAILY_CASH, dailyCash)
  },
  updateDailyCash ({ commit }, dailyCash) {
    commit(UPDATE_DAILY_CASH, dailyCash)
  },
  setReasons ({ commit }, reasons) {
    commit(SET_REASONS, reasons)
  },
  setTables ({ commit }, tables) {
    commit(LOAD_TABLES, tables)
  },
  closeTable ({ commit }, table) {
    commit(CLOSE_TABLE, table)
  },
  addTable ({ commit }, table) {
    commit(ADD_TABLE, table)
  },
  updateTable ({ commit }, table) {
    commit(UPDATE_TABLE, table)
  },
  deleteTable ({ commit }, table) {
    commit(DELETE_TABLE, table)
  },
  setCurrent ({ commit }, tableId) {
    commit(SET_TABLE_BY_ID, tableId)
  },
  setUsers ({ commit }, users) {
    commit(LOAD_USERS, users)
  },
  updateUser ({ commit }, user) {
    commit(UPDATE_USER, user)
  },
  addUser ({ commit }, user) {
    commit(ADD_USER, user)
  }
}

// mutations
const mutations = {
  [CHANGE_USER_TABLE] (state, data) {
    let table = state.tables.open.find((t) => { return t.id === data.table })
    table.current.client = data.client
  },
  [SET_REASONS] (state, reasons) {
    state.reasons = reasons
  },
  [SET_DAILY_CASH] (state, dailyCash) {
    state.cash = dailyCash
  },
  [UPDATE_DAILY_CASH] (state, dailyCash) {
    state.cash = dailyCash
  },
  [LOAD_TABLES] (state, tables) {
    state.tables.all = tables
    state.tables.open = state.tables.all.filter((t) => { return !t.closed })
    state.tables.closed = state.tables.all.filter((t) => { return t.closed })
  },
  [ADD_TABLE] (state, table) {
    state.tables.all.push(table)
  },
  [UPDATE_TABLE] (state, table) {
    _.extend(state.tables.all.find(t => t.id === table.id), table)
    state.tables.open = state.tables.all.filter((t) => { return !t.closed })
    state.tables.closed = state.tables.all.filter((t) => { return t.closed })
  },
  [DELETE_TABLE] (state, table) {
    let index = state.tables.all.indexOf(table)
    state.tables.all.splice(index, 1)
    state.tables.open = state.tables.all.filter((t) => { return !t.closed })
    state.tables.closed = state.tables.all.filter((t) => { return t.closed })
  },
  [CLOSE_TABLE] (state, table) {
    table.satus = 'closed'
    table.closed = true
    table.current = {}
    _.extend(state.tables.all.find(t => t.id === table.id), table)
    state.tables.open = state.tables.all.filter((t) => { return !t.closed })
    state.tables.closed = state.tables.all.filter((t) => { return t.closed })
  },
  [SET_TABLE_BY_ID] (state, id) {
    state.tables.current = state.tables.all.find((table) => table.id === id)
  },
  [LOAD_USERS] (state, users) {
    state.users = users
  },
  [ADD_USER] (state, user) {
    state.users.push(user)
  },
  [UPDATE_USER] (state, user) {
    _.extend(state.users.find(u => u.id === user.id), user)
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug
})
