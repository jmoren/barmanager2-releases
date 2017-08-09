<template lang="html">
  <div class="">
    <modal title="Administrar Cliente" ok-text="Guardar" cancel-text="Cancelar" :on-ok="saveClient" :on-cancel="cancelClient" :width="520" :is-show="isShow" transition="zoom" @close="cancelClient">
      <div class="control">
        <input type="text" class="input" v-model="newClient.name" placeholder="Nombre">
      </div>
      <div class="control">
        <input type="text" class="input" v-model="newClient.phone" placeholder="Telefono">
      </div>
    </modal>
    <h1 class="header">
      <i class="fa fa-users fa-floated"></i>
      Clientes 
      <a @click.prevent="isShow = true" class="button is-light is-pulled-right">Nuevo Cliente</a>
    </h1>
    <hr>
    <table class="table">
      <thead>
        <th>Nombre</th>
        <th>Telefono</th>
        <th>Deuda</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.name }}</td>
          <td>{{ client.phone }}</td>
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
      newClient: { name: null, phone: null },
      originalClient: { id: null, name: null, phone: null },
      clients: [],
      isShow: false
    }
  },
  created () {
    this.fetchClients()
  },
  methods: {
    fetchClients () {
      this.$http.get('admin/clients').then(
        response => {
          this.clients = response.data
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
      let params = { name: this.newClient.name, phone: this.newClient.phone }
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
