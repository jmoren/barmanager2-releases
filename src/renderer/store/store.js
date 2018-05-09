import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const DELETE_TABLE = 'DELETE_TABLE'
const UPDATE_TABLE = 'UPDATE_TABLE'
const TRANSLATE_TABLE = 'TRANSLATE_TABLE'
const LOAD_TABLES = 'LOAD_TABLES'
const ADD_TABLE = 'ADD_TABLE'
const SET_DAILY_CASH = 'SET_DAILY_CASH'
const SET_TABLE_BY_ID = 'SET_TABLE_BY_ID'
const LOAD_USERS = 'LOAD_USERS'
const ADD_USER = 'ADD_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const UPDATE_DAILY_CASH = 'UPDATE_DAILY_CASH'
const SET_REASONS = 'SET_REASONS'
const CHANGE_USER_TABLE = 'CHANGE_USER_TABLE'

const state = {
  tables: {
    all: [],
    current: null
  },
  users: [],
  reasons: [],
  cash: {},
  units: {
    'kg': 'Kilogramos',
    'gr': 'Gramos',
    'ml': 'Mililitros',
    'lt': 'Litros',
    'unit': 'Unidades'
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
  openTables: state => {
    return state.tables.all.filter((table) => {
      return table.status === 'open'
    })
  },
  closedTables: state => {
    return state.tables.all.filter((table) => {
      return table.status !== 'open'
    })
  },
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
  },
  removeUser ({ commit }, user) {
    commit(REMOVE_USER, user)
  },
  translateTable ({ commit }, data) {
    commit(TRANSLATE_TABLE, data)
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
  },
  [ADD_TABLE] (state, table) {
    state.tables.all.push(table)
  },
  [UPDATE_TABLE] (state, table) {
    let current = state.tables.all.find(t => t.id === table.id)
    let index = state.tables.all.indexOf(current)
    state.tables.all.splice(index, 1, table)
  },
  [TRANSLATE_TABLE] (state, data) {
    if (data.oldTable) {
      let oldTable = state.tables.all.find(t => t.id === data.oldTable.id)
      let indexOld = state.tables.all.indexOf(oldTable)
      state.tables.all.splice(indexOld, 1, oldTable)
    }
    if (data.oldTable) {
      let newTable = state.tables.all.find(t => t.id === data.newTable.id)
      let indexNew = state.tables.all.indexOf(newTable)
      state.tables.all.splice(indexNew, 1, newTable)
    }
  },
  [DELETE_TABLE] (state, table) {
    let index = state.tables.all.indexOf(table)
    state.tables.all.splice(index, 1)
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
  [REMOVE_USER] (state, user) {
    let index = state.users.indexOf(user)
    state.users.splice(index, 1)
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
