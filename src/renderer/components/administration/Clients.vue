<template lang="html">
  <div class="">
    <modal title="Administrar Cliente" ok-text="Guardar" cancel-text="Cancelar" :on-ok="saveClient" :on-cancel="cancelClient" :width="520" :is-show="isShow" transition="zoom" @close="cancelClient">
      <div class="control">
        <input type="text" class="input" v-model="newClient.name" placeholder="Nombre">
      </div>
      <div class="control">
        <input type="text" class="input" v-model="newClient.phone" placeholder="Telefono">
      </div>
      <div class="control">
        <input type="text" class="input" v-model="newClient.dni" placeholder="DNI">
      </div>
    </modal>
    <h1 class="header">
      <i class="fa fa-users fa-floated"></i>
      Clientes 
      <div class="control has-addons is-pulled-right">
        <input type="text" class="input" v-model="query" @keyup.prevent="reloadClients" placeholder="Filtrar clientes">
        <a @click.prevent="isShow = true" class="button is-light is-pulled-right">Nuevo Cliente</a>
      </div>
      
    </h1>
    <hr>
    <table class="table">
      <thead>
        <th>Nombre</th>
        <th>Telefono</th>
        <th>DNI</th>
        <th>Deuda</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.name }}</td>
          <td>{{ client.phone }}</td>
          <td>{{ client.dni }}</td>
          <td><b class="is-danger-text">${{ client.total_debt || '0.0' }}</b></td>
          <td>
            <div class="control has-addons">
              <a @click.prevent="removeClient(client)" class="button is-light">
                 <span class="icon is-small"><i class="fa fa-trash"></i></span>
              </a>
              <a @click.prevent="setToEdit(client)" class="button is-light">
                 <span class="icon is-small"><i class="fa fa-pencil"></i></span>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination layout="pager" align="left" :page-size="12" v-model="page" :total="meta.total" :change="pageChange"></pagination>
  </div>
</template>

<script>
import _ from 'lodash'
import alert from '../../mixins/Alert'
export default {
  name: 'AdminClients',
  mixins: [alert],
  data () {
    return {
      newClient: { name: '', phone: '', dni: '' },
      originalClient: { id: '', name: '', phone: '', dni: '' },
      clients: [],
      isShow: false,
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
      let url = 'admin/clients?page=' + this.page
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
    saveClient () {
      if (this.newClient.id) {
        this.updateClient()
      } else {
        this.createClient()
      }
    },
    createClient () {
      this.$http.post('admin/clients', { client: this.newClient }).then(
        response => {
          this.clients.push(response.data)
          this.cancelClient()
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    updateClient () {
      let params = { name: this.newClient.name, dni: this.newClient.dni, phone: this.newClient.phone }
      this.$http.put('admin/clients/' + this.newClient.id, { client: params }).then(
        response => {
          _.extend(this.originalClient, response.data)
          this.cancelClient()
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    removeClient (client) {
      this.$http.delete('admin/clients/' + client.id).then(
        () => {
          let index = this.clients.indexOf(client)
          this.clients.splice(index, 1)
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    cancelClient () {
      this.isShow = false
      _.extend(this.newClient, this.originalClient)
      this.newClient = { name: null, phone: null }
    },
    setToEdit (client) {
      this.originalClient = client
      this.newClient = _.clone(client)
      this.isShow = true
    }
  }
}
</script>

<style lang="css">
</style>
