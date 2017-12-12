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
              <tr><td>Creado</td><td><b>{{ delivery.created_at | moment('DD/MM/YY HH:mm') }}</b></td></tr>
              <tr><td>Entregado</td><td><b>{{ delivery.delivered_at | moment('DD/MM/YY HH:mm') }}</b></td></tr>
              <tr><td>Estado</td><td><b>{{ delivery.state }}</b></td></tr>
              <tr><td>Creado</td><td><b>{{ delivery.user.name }}</b></td></tr>
              <tr><td>Total</td><td> <b>$ {{ delivery.total }}</b></td></tr>
              <tr><td>Enviado</td><td><b>Moto {{ delivery.moto_id }}</b></td></tr>
            </table>
            <div class="has-text-centered">
              <button class="button is-success is-fullwidth" :disabled="delivery.delivered_at" @click.prevent="isShow = true">Cerrar envio</button>
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
                <th>Prepago</th>
                <th>Entregado</th>
              </thead>
              <tr v-for="ticket in delivery.ticket_deliveries">
                <td><router-link :to="{ name: 'Ticket', params: { id: ticket.ticket_id } }">{{ ticket.number }}</router-link></td>
                <td>{{ ticket.paid ? 'Si' : 'No'}}</td>
                <td>{{ ticket.client.name }}</td>
                <td> <i class="fa fa-home fa-floated"></i> {{ ticket.address }}</td>
                <td>$ {{ ticket.total }}</td>
                <td>$ {{ ticket.payment }}</td>
                <td>
                  <b-switch v-model="ticket.delivered" :disabled="delivery.delivered_at"></b-switch>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-3">
          <div class="box">
            <a @click="initMap()" class="button is-light">
              <span class="icon is-small"><i class="fa fa-map-marker"></i></span>
              <span>Cargar Mapa</span>
            </a>
            <hr>
            <div id="directions-panel"></div>
          </div>
        </div>
        <div class="column is-9">
          <div class="box">
            <div id="map" style="height: 565px; width: 100%"></div>
          </div>
        </div>
      </div>
    </div>
    <modal title="Cerrar Pedido" ok-text="Guardar" :on-cancel="() => { isShow = false} " cancel-text="Cancelar" :on-ok="close" :width="520" :is-show="isShow" transition="zoom" @close="isShow = false">
      <h1 class="subtitle is-danger-text">Estás seguro que queres cerrar este pedido?</h1>
      <alert type="primary">
        Todos los ticket se cerrarán y se les agregará un pago en efectivo por el total pendiente.
        Excepto los que hayas marcado como no entregados.
      </alert>
      <div class="control is-expanded" v-if="notDeliveredTickets.length > 0">
        <h3 class="is-danger-text">Tickets no entregados:</h3>
        <ul>
          <li v-for="ticket in notDeliveredTickets">
            <b>#{{ticket.number}}: </b>{{ticket.address || ticket.client.address}}
          </li>
        </ul>
      </div>
    </modal>
  </div>
</template>

<script>
  const Config = require('electron-config')
  const config = new Config()

  export default {
    name: 'Delivery',
    data () {
      return {
        isShow: false,
        delivery: {
          ticket_deliveries: []
        },
        loading: false,
        map: null,
        directionsService: null,
        directionsDisplay: null,
        config: {
          zoom: 6,
          center: { lat: -34.4686234, lng: -58.5181671 }
        }
      }
    },
    created () {
      this.load()
    },
    computed: {
      notDeliveredTickets () {
        return this.delivery.ticket_deliveries.filter((t) => { return t.delivered ? null : t })
      },
      deliveredTickets () {
        return this.delivery.ticket_deliveries.filter((t) => { return t.delivered ? t : null })
      }
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
      initMap () {
        this.map = new window.google.maps.Map(document.getElementById('map'), this.config)
        this.directionsService = new window.google.maps.DirectionsService()
        this.directionsDisplay = new window.google.maps.DirectionsRenderer()
        this.directionsDisplay.setMap(this.map)
        this.calculateRoute()
      },
      calculateRoute () {
        let _this = this
        let waypts = this.delivery.ticket_deliveries.map((t) => { return { location: t.address, stopover: true } })

        this.directionsService.route({
          origin: config.get('business_address'),
          destination: config.get('business_address'),
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'DRIVING'
        }, function (response, status) {
          if (status === 'OK') {
            _this.directionsDisplay.setDirections(response)
            let route = response.routes[0]
            let summaryPanel = document.getElementById('directions-panel')
            summaryPanel.innerHTML = ''
            // For each route, display summary information.
            for (var i = 0; i < route.legs.length; i++) {
              let routeSegment = i + 1
              summaryPanel.innerHTML += '<b>Recorrido: ' + routeSegment + '</b><br>'
              summaryPanel.innerHTML += '<div class="routeRow">' + route.legs[i].start_address + ' to '
              summaryPanel.innerHTML += route.legs[i].end_address + '</div><br>'
              summaryPanel.innerHTML += '<small>Distancia: ' + route.legs[i].distance.text + '</small><br><br>'
            }
          } else {
            window.alert('Directions request failed due to ' + status)
          }
        })
      },
      close () {
        var notDelivered = { nd: this.notDeliveredTickets.map((t) => { return t.id }) }
        this.$http.put('deliveries/' + this.delivery.id + '/close', { delivery: notDelivered }).then(
          response => {
            this.delivery = response.data
          },
          error => {
            console.log(error)
          }
        )
      }
    }
  }
</script>

<style>
  .routeRow { font-size: 14px; }
</style>
