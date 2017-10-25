<template lang="html">
  <div class="container">
    <h1 class="header">
      <tag id="header-icon" rounded><i class="fa fa-users"></i></tag>
      Clientes
      <div class="control has-addons is-pulled-right">
        <input type="text" class="input" v-model="query" @keyup.prevent="reloadClients" placeholder="Filtrar clientes">
      </div>
    </h1>
    <hr>
    <div v-if="loading">
      <Loader></Loader>
    </div>
    <div v-else>
      <table class="table">
        <thead>
          <th>ID</th>
          <th>Nombre</th>
          <th>Telefono</th>
          <th>Direccion</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td># {{ client.id }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.phone }}</td>
            <td>{{ client.address }}</td>
            <td>
              <a @click.prevent="addTicket(client)" class="button is-danger">Abrir ticket</a>
              <router-link class="button is-light" :to="{ name: 'Client', params: { id: client.id } }">Ver Detalles</router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <pagination layout="pager" align="left" :page-size="12" :total="meta.total" :change="pageChange"></pagination>
    </div>
  </div>
</template>

<script>
  import Loader from '@/components/utils/Loader'
  import Auth from '../../auth'
  import alert from '../../mixins/Alert'

  export default {
    name: 'Clients',
    components: { Loader },
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
        clients: [],
        loading: false,
        meta: {},
        query: '',
        page: 1
      }
    },
    created () {
      this.fetchClients()
    },
    methods: {
      pageChange (page) {
        this.page = page
        this.fetchClients()
      },
      reloadClients () {
        this.page = 1
        let isEmpty = this.query.length === 0
        if (isEmpty) {
          this.fetchClients()
        } else if (!isEmpty && this.query.length > 2) {
          this.fetchClients()
        }
      },
      fetchClients () {
        let url = 'clients?page=' + this.page
        if (this.query && this.query.length > 2) {
          url = url + '&query=' + this.query
        }
        this.$http.get(url).then(
          response => {
            this.clients = response.data.clients
            this.meta = response.data.meta
          },
          error => {
            this.alert('danger', error.data)
          }
        )
      },
      addTicket (client) {
        this.$http.post('tickets', { ticket: { client_id: client.id } }).then(
          response => {
            this.$router.push({ name: 'Ticket', params: { id: response.data.id } })
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
  table tr:hover td { background-color: #fff !important; }
</style>
