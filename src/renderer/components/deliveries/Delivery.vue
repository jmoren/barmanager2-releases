<template>
  <div class="">
    <div v-if="loading">Cargando...</div>
    <div v-else>
      <h1 class="header">
        Pedido #{{ delivery.id }}
        <div class="is-pulled-right">
          <router-link :to="{ name: 'Deliveries' }" class="button is-light">
            <span class="icon is-small"><i class="fa fa-chevron-left fa-floated"></i></span>
            <span>Volver</span>
          </router-link>
        </div>
      </h1>
      <hr>
      <div class="columns">
        <div class="column is-3">
          <div class="box">
            <table class="table">
              <tr><td>Creado</td><td><b>{{ delivery.created_at | moment('DD/MM/YY HH:mm A') }}</b></td></tr>
              <tr><td>Entregado</td><td><b>{{ delivery.delivered_at | moment('DD/MM/YY HH:mm A') }}</b></td></tr>
              <tr><td>Estado</td><td><b>{{ delivery.state }}</b></td></tr>
              <tr><td>Creado</td><td><b>{{ delivery.user.name }}</b></td></tr>
              <tr><td>Total</td><td> <b>{{ delivery.total }}</b></td></tr>
              <tr><td>Enviado</td><td><b>Moto {{ delivery.moto_id }}</b></td></tr>
            </table>
            <div class="has-text-centered">
              <button class="button is-success is-fullwidth" :disabled="delivery.delivered_at" @click.prevent="close()">Cerrar envio</button>
            </div>
          </div>
        </div>
        <div class="column is-9">
          <div class="box">
            <h2 class="header">Tickets enviados</h2>
            <hr>
            <table class="table">
              <thead>
                <th>T. Nro</th>
                <th>Pagado</th>
                <th>Client</th>
                <th>Direccion</th>
                <th>Total</th>
                <th>Pago</th>
                <th></th>
              </thead>
              <tr v-for="ticket in delivery.ticket_deliveries">
                <td><router-link :to="{ name: 'Ticket', params: { id: ticket.ticket_id } }">{{ ticket.number }}</router-link></td>
                <td>{{ ticket.paid ? 'Si' : 'No'}}</td>
                <td>{{ ticket.client.name }}</td>
                <td> <i class="fa fa-home fa-floated"></i> {{ ticket.address }}</td>
                <td>$ {{ ticket.total }}</td>
                <td>$ {{ ticket.payment }}</td>
                <td>
                  <label class="checkbox blu-checkbox is-primary" :class="{'on': ticket.delivered }">
                    <input type="checkbox" v-model="ticket.delivered" @change="updateState(ticket)">
                  </label>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Delivery',
    data () {
      return {
        delivery: {},
        loading: false
      }
    },
    created () {
      this.load()
    },
    methods: {
      load () {
        this.loading = true
        this.$http.get('deliveries/' + this.$route.params.id).then(
          response => {
            this.delivery = response.data
            this.loading = false
          },
          error => {
            console.log(error)
            this.loading = false
          }
        )
      },
      close () {
        this.$http.put('deliveries/' + this.delivery.id + '/close').then(
          response => {
            this.delivery = response.data
          },
          error => {
            console.log(error)
          }
        )
      },
      updateState (ticket) {
        console.log(ticket.delivered)
      }
    }
  }
</script>
