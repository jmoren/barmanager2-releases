<template>
  <div id="app" >
    <section class="hero is-primary is-fixed not-print">
      <div class="hero-head">
        <div class="nav-main">
          <div class="">
            <nav class="nav">
              <div class="nav-left" v-if="user.profile.role === 'cooker'">
                <router-link class="nav-item brand" :to="{ name: 'Kitchen' }">Volver a las zonas</router-link>
              </div>
              <div class="nav-left" v-if="user.profile.role !== 'cooker'">
                <div class="nav-item">
                  <a class="button is-primary" @click.prevent="goBack()" style="font-size:20px;">
                    <i class="fa fa-arrow-circle-o-left fa-2"></i>
                  </a>
                </div>
                <div class="nav-item">
                  <router-link class="nav-item is-brand" :to="{ name: 'Tables' }">Mesas</router-link>
                </div>
                <div class="nav-item">
                  <router-link class="nav-item" :to="{ name: 'Clients'}">Clientes</router-link>
                </div>
                <div class="nav-item">
                  <router-link class="button is-primary" :to="{ name: 'Kitchen'}">Zonas</router-link>
                </div>
                <div class="nav-item">
                  <a class="button is-primary" :class="{'is-disabled': !dailyCash.id }" v-shortkey="['ctrl', 'd']" @shortkey="openDeliveryTicket" @click.prevent="openDeliveryTicket">
                    Abrir Delivery
                  </a>
                </div>
                <div class="nav-item"><a class="button is-primary" v-shortkey="['ctrl', 'a']" @shortkey="toggleSideBar('tables')" @click.prevent="toggleSideBar('tables')">Mesas abiertas <tag rounded>{{ openTables.length }}</tag>  </a></div>
                <div class="nav-item"><a class="button is-primary" v-shortkey="['ctrl', 'b']" @shortkey="toggleSideBar('delivery')" @click.prevent="toggleSideBar('delivery')">Deliveries </a></div>
              </div>
              <span class="nav-toggle" v-if="user.profile.role !== 'cooker'">
                <span></span>
                <span></span>
                <span></span>
              </span>
              <div class="nav-right not-print" v-if="user.profile.role !== 'cooker'">
                <div class="nav-item" style="width:300px;">
                  <input type="text" v-model="clientCode" class="input" @keydown.enter.prevent="findClient()"
                        placeholder="Buscar por telefono o credencial">
                </div>
                <div class="nav-item">
                  <table-autocomplete :tables="tables" id-input="open_table" :class="{'is-disabled': !dailyCash.id }" :shortkey="'g'">
                  </table-autocomplete>
                </div>
                <div class="nav-item">
                  <popover title="Mi Cuenta" placement="bottom" :width="300" trigger="click">
                    <button class="button is-primary">{{ user.profile.name }}</button>
                    <div slot="content">
                      <div class="columns" style="margin-bottom: 0px;">
                        <div class="column is-12">
                          <div style="float: left">Rol: <b>{{ mapRoles[user.profile.role] }}</b></div>
                          <div style="float: right">Version: <b>{{ version }}</b></div>
                        </div>
                      </div>
                      <div>
                        <div style="margin: 0px;" >
                          <router-link :to="{ name: 'Profile' }" class="button is-fullwidth is-light">
                            <span class="icon is-small"><i class="fa fa-user-o"></i></span>
                            <span>Perfil</span>
                          </router-link>
                        </div>
                        <div  style="margin: 15px 0px" v-if="dailyCash.id">
                          <router-link :to="{ name: 'PartialDailyCash', params: { id: dailyCash.id }}" class="button is-light is-fullwidth" v-if="['admin', 'manager'].indexOf(user.profile.role) !== -1">
                            <span class="icon is-small"><i class="fa fa-money"></i></span>
                            <span>Caja Actual</span>
                          </router-link>
                        </div>
                        <div  style="margin: 15px 0px">
                          <router-link :to="{ name: 'AdminClients'}" class="button is-light is-fullwidth" v-if="['admin', 'manager'].indexOf(user.profile.role) !== -1">
                            <span class="icon is-small"><i class="fa fa-cog"></i></span>
                            <span>Admin</span>
                          </router-link>
                        </div>
                        <div style="margin: 0px;" >
                          <a @click.prevent="logout" class="button is-light is-fullwidth">
                            <span class="icon is-small"><i class="fa fa-sign-out"></i></span>
                            <span>Salir</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </popover>
                </div>
                <div class="nav-item">
                  <popover title="Ayuda" :width="300" placement="bottom">
                    <div class="button is-primary"><i class="fa fa-question-circle"></i></div>
                    <div slot="content">
                      <h2 style="margin-bottom: 10px; color:#fff; background: #0099ff; padding: 5px;" class="has-text-centered"><b>General</b></h2>
                      <ul>
                        <li style="margin-bottom: 5px;">
                          <div class="columns">
                            <div class="column is-4">
                              <span class="button is-small is-fullwidth is-light is-not-link"><b>Ctrl + d</b></span>
                            </div>
                            <div class="column is-8"> Abrir delivery</div>
                          </div>
                        </li>
                        <li style="margin-bottom: 5px;">
                          <div class="columns">
                            <div class="column is-4">
                              <span class="button is-small is-fullwidth is-light is-not-link"><b>Ctrl + g</b></span>
                            </div>
                            <div class="column is-8"> Ir al buscador de mesas</div>
                          </div>
                        </li>
                        <li style="margin-bottom: 5px;">
                          <div class="columns">
                            <div class="column is-4">
                              <span class="button is-small is-fullwidth is-light is-not-link"><b>Ctrl + a</b></span>
                            </div>
                            <div class="column is-8"> Ver mesas abiertas</div>
                          </div>
                        </li>
                      </ul>
                      <hr>
                      <h2 style="margin-bottom: 10px; color:#fff; background: #0099ff; padding: 5px;" class="has-text-centered"><b>Ticket</b></h2>
                      <ul>
                        <li style="margin-bottom: 5px;">
                          <div class="columns">
                            <div class="column is-4">
                              <span class="button is-small is-fullwidth is-light is-not-link"><b>Ctrl + 1</b></span>
                            </div>
                            <div class="column is-8"> Ir a items</div>
                          </div>
                        </li>
                        <li style="margin-bottom: 5px;">
                          <div class="columns">
                            <div class="column is-4">
                              <span class="button is-small is-fullwidth is-light is-not-link"><b>Ctrl + 2</b></span>
                            </div>
                            <div class="column is-8"> Ir a promociones</div>
                          </div>
                        </li>
                        <li style="margin-bottom: 5px;">
                          <div class="columns">
                            <div class="column is-4">
                              <span class="button is-small is-fullwidth is-light is-not-link"><b>Ctrl + 3</b></span>
                            </div>
                            <div class="column is-8"> Ir a adicionales</div>
                          </div>
                        </li>
                        <li style="margin-bottom: 5px;">
                          <div class="columns">
                            <div class="column is-4">
                              <span class="button is-small is-fullwidth is-light is-not-link"><b>Ctrl + 4</b></span>
                            </div>
                            <div class="column is-8"> Ver Favoritos</div>
                          </div>
                        </li>
                        <li style="margin-bottom: 5px;">
                          <div class="columns">
                            <div class="column is-4">
                              <span class="button is-small is-fullwidth is-light is-not-link"><b>Ctrl + c</b></span>
                            </div>
                            <div class="column is-8"> Cerrar ticket</div>
                          </div>
                        </li>
                        <li style="margin-bottom: 5px;">
                          <div class="columns">
                            <div class="column is-4">
                              <span class="button is-small is-fullwidth is-light is-not-link"><b>Ctrl + p</b></span>
                            </div>
                            <div class="column is-8"> Imprimir ticket</div>
                          </div>
                        </li>
                        <li style="margin-bottom: 5px;">
                          <div class="columns">
                            <div class="column is-4">
                              <span class="button is-small is-fullwidth is-light is-not-link"><b>Ctrl + m</b></span>
                            </div>
                            <div class="column is-8"> Cambiar mesa</div>
                          </div>
                        </li>
                        <li style="margin-bottom: 5px;">
                          <div class="columns">
                            <div class="column is-4">
                              <span class="button is-small is-fullwidth is-light is-not-link"><b>Ctrl + n</b></span>
                            </div>
                            <div class="column is-8"> Cambiar cliente</div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </popover>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </section>
    <div class="main columns" style="height: 850px; overflow: scroll;">
      <div v-show="isOpen === 'delivery'" class="not-print shadow-border column is-3">
        <deliveries-bar></deliveries-bar>
      </div>
      <div v-show="isOpen === 'tables'" class="not-print shadow-border column is-3">
        <div class="column is-12" style="height: 870px;">
          <h2 class="header" style="height: 45px;">
            Mesas abiertas
          </h2>
          <hr>
          <div style="height: 760px; overflow: auto">
            <div class="columns is-multiline">
              <div v-for="table in openTables" style="margin-bottom: 10px;" class="column  is-12">
                <router-link class="open-table-button button is-fullwidth is-medium is-light"
                  :to="{ name: 'Ticket', params: { id: table.current.id } }">
                  <div style="margin: 5px 0">
                    <i class="fa fa-cutlery fa-floated"></i> {{ table.description }}
                  </div>
                  <div style="font-size: 14px;">Ticket: {{ table.current.number }}</div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="main-window" :class="isOpen !== '' ? 'column is-9' : 'column is-12'">
        <router-view></router-view>
      </div>
    </div>
    <div id="updater">
      {{ message.message }}
    </div>
  </div>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import Auth from '../../auth'
  import { mapGetters } from 'vuex'
  import TableAutocomplete from '@/components/utils/TableAutocomplete'
  import alert from '../../mixins/Alert'
  import deliveriesBar from '@/components/deliveries/DeliveriesBar'
  const appPackage = require('../../../../package.json')
  export default {
    name: 'PrivateApp',
    components: { TableAutocomplete, deliveriesBar },
    mixins: [alert],
    data () {
      return {
        loading: false,
        user: Auth.user,
        isOpen: '',
        clientCode: '',
        mapRoles: {
          user: 'Usuario',
          manager: 'Manager',
          admin: 'Admin',
          cooker: 'Cocinero'
        },
        version: appPackage.version,
        message: {}
      }
    },
    computed: {
      ...mapGetters({
        tables: 'allTables',
        dailyCash: 'currentCash',
        openTables: 'openTables'
      }),
      setPicture () {
        return this.user.profile.gender === 'mujer' ? '/static/woman.png' : '/static/user.jpg'
      },
      isLoggedIn () {
        return this.user.authenticated
      }
    },
    created () {
      this.loadTables()
      this.loadPartialDailyCash()
      this.loadUsers()
      this.loadReasons()
      ipcRenderer.send('ready-to-messages', {})

      ipcRenderer.on('message', (event, message) => {
        console.log(message)
        this.message = message
      })
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      },
      toggleSideBar (name) {
        if (this.isOpen === name) {
          this.isOpen = ''
        } else {
          this.isOpen = name
        }
      },
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
      goTo (table) {
        this.$router.push({ name: 'Ticket', params: { id: table.current.id } })
        this.isOpen = ''
      },
      openDeliveryTicket () {
        this.$http.post('tickets', { ticket: { table_id: null } }).then(
          response => {
            this.$router.push({ name: 'Ticket', params: { id: response.data.id } })
          },
          error => {
            console.log(error)
          }
        )
      },
      loadPartialDailyCash () {
        this.loading = true
        this.$http.get('partial_daily_cashes/current').then(
          response => {
            this.$store.dispatch('setDailyCash', response.data)
          },
          () => {
            console.log('error load daily cash')
            this.loading = false
          }
        )
      },
      loadTables () {
        this.$http.get('tables').then(
          response => {
            this.$store.dispatch('setTables', response.data)
            this.loading = false
          },
          error => {
            console.log(error)
            this.loading = false
          }
        )
      },
      loadUsers () {
        this.$http.get('users').then(
          response => {
            this.$store.dispatch('setUsers', response.data)
          },
          error => {
            console.log(error)
            console.log('error load users')
          }
        )
      },
      loadReasons () {
        this.$http.get('cancel_reasons').then(
          response => {
            this.$store.dispatch('setReasons', response.data)
          },
          error => {
            console.log(error)
            console.log('error loading reasons')
          }
        )
      },
      findClient () {
        let numberRegex = new RegExp(/^\d+$/)

        if (numberRegex.test(this.clientCode)) {
          this.findByNumber()
        } else {
          this.findByCode()
        }
      },
      findByNumber () {
        this.$http.get('clients/search?phone=' + this.clientCode).then(
          response => {
            this.clientCode = ''
            let client = response.data.client_id
            this.$router.push({ name: 'Client', params: { id: client } })
          },
          () => {
            this.alert('danger', 'No se encontro cliente con este numero')
          }
        )
      },
      findByCode () {
        this.$http.get('client_codes/' + this.clientCode).then(
          response => {
            this.clientCode = ''
            let code = response.data
            if (code.enabled) {
              this.$router.push({ name: 'Client', params: { id: response.data.client_id } })
            } else {
              this.alert('danger', 'El codigo buscado esta deshabilitado')
            }
          },
          () => {
            this.alert('danger', 'No se encontro el codigo')
          }
        )
      }
    }
  }
</script>

<style>
  #app {
    font-family: Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 15px;
  }
  .is-fixed { position: fixed; top: 0; width: 100%; z-index: 1000; }
  .nav-main { margin: auto 15px;}
  .empty-message { color: #f56954; text-align: center; font-size: 15px;}
  .nav-right { flex-grow: initial; }
  .nav-item { padding: 5px; }
  .open-table-button { font-weight: bold !important; height: 70px !important; display:inline-block !important; text-align: left !important;  }

  .main.columns { top: 55px; left: 10px; right: 10px; position: absolute; height: 100%; width: 100%; }
  .main.columns .shadow-border { box-shadow: 0px 0px 15px #ccc; height: 95%; overflow: auto; margin-right: 10px;}
  .main.columns .main-window { padding: 30px 15px !important; }

  .pac-container {
    z-index: 100000 !important;
  }

  @media print {
    .not-print { display: none; }
    .print { display: block; }
  }
  #updater {
    position: absolute;
    height: 2em;
    bottom: 0px;
    line-height: 2em;
    padding: 0px 10px;
    background: #3c81df;
    color: #fff;
    width: 100%;
  }
</style>
