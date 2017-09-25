<template>
  <div class="container">
    <h1 class="header">Pedidos enviados</h1>
    <hr>
    <table class="table">
      <thead>
        <th>Pedido</th>
        <th>Estado</th>
        <th>Usuario</th>
        <th>Fecha</th>
        <th>Total</th>
        <th></th>
      </thead>
      <tr v-for="delivery in deliveries" :key="delivery.id">
        <td><router-link :to="{ name: 'Delivery', params: { id: delivery.id } }"># {{ delivery.id }}</router-link></td>
        <td>{{ delivery.state }}</td>
        <td>{{ delivery.user.name }}</td>
        <td>{{ delivery.created_at | moment('DD/MM/YYYY HH:mm A') }}</td>
        <td>$ {{ delivery.total }}</td>
        <td><a @click.prevent="close()" class="button is-small is-danger" v-if="!delivery.delivered_at">Cerrar pedido</a></td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'Deliveries',
    data () {
      return {
        deliveries: [],
        loading: false
      }
    },
    created () {
      this.loadDeliveries()
    },
    methods: {
      loadDeliveries () {
        this.loading = true
        this.$http.get('deliveries').then(
          response => { this.deliveries = response.data; this.loading = false },
          error => { console.log(error) }
        )
      }
    }
  }
</script>
