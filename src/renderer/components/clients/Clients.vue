<template lang="html">
  <div class="container">
    <h1 class="header"><tag id="header-icon" rounded><i class="fa fa-users"></i></tag> Clientes</h1>
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
          <th></th>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td># {{ client.id }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.phone }}</td>
            <td>
              <a @click.prevent="addTicket(client)" class="button is-danger">Abrir ticket</a>
              <router-link class="button is-light" :to="{ name: 'Client', params: { id: client.id } }">Ver Detalles</router-link>
            </td>
          </tr>
        </tbody>
      </table>
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
        loading: false
      }
    },
    created () {
      this.fetchClients()
    },
    methods: {
      fetchClients () {
        this.loading = true
        this.$http.get('clients').then(
          response => {
            this.clients = response.data
            this.loading = false
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
