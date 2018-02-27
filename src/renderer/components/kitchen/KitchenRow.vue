<template>
  <tr>
    <td><a @click="loadTicket()" class="button is-light"><i class="fa fa-print"></i></a></td>
    <td style="width:15%">
      <span v-if="ticket.table_id" class="table-id button is-fullwidth is-danger">
        <b>#{{ ticket.table_id }}</b>
      </span>
      <span v-else class="button is-primary"><b>DELIVERY</b></span>
    </td>
    <td style="width:15%">
      <tooltip content="Enviar todo lo pendiente">
        <a @click.prevent="deliverTicket()" class="button is-success" :class="{ 'is-loading': loading }">
          <span class="icon is-small"><i class="fa fa-reply"></i></span>
          <span><b>{{ ticket.number }}</b></span>
        </a>
      </tooltip>
    </td>
    <td>
      <div v-for="(entry, id) in ticket.entries" class="entry-row">
        <div class="entry-comment" v-if="entry.comment">
          <i class="fa fa-exclamation-circle fa-floated"></i> {{ entry.comment }}
        </div>
        <div class="columns">
          <div class="column is-2">
            <tooltip content="Sacar Entrada completa">
              <a class="button is-info" @click="deliverEntry(entry)" :class="{'is-disabled is-success': entry.delivered, 'is-loading': loading }">
                <span class="icon is-small"><i class="fa fa-reply"></i></span>
                <span>Entregar</span>
              </a>
            </tooltip>
          </div>
          <div class="column is-10">
            <div>
              <a class="button is-light" :class="{'is-disabled is-success': entry.delivered, 'is-loading': loading }" @click="toggleShow()">
                <span>{{entry.items[0].name}} x {{entry.items.length}}</span> &nbsp;&nbsp;&nbsp;
                <span class="icon is-small">
                  <i :class="{ 'fa fa-expand': !rowExpanded, 'fa fa-compress': rowExpanded }"></i>
                </span>
              </a>
              <div class="is-pulled-right button is-white is-not-link">
                Pedido: {{entry.items[0].created_at | moment("from") }}
              </div>
            </div>
            <div v-if="rowExpanded" v-for="req in entry.items" class="request-row">
              <tooltip content="Sacar pedido">
                <a class="button is-light" @click="deliverItem(req)" :class="{'is-disabled is-success': req.delivered_at, 'is-loading': loading }">
                  <i class="fa" :class="{'fa-check': req.delivered_at, 'fa-reply': !req.delivered_at }"></i>
                </a>
              </tooltip>
              <span class="button is-light is-not-link">{{ req.name }}</span>
              <div class="is-pulled-right button is-white is-not-link">
                Pedido {{ req.created_at | moment("from") }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <modal :width="520" :is-show="isShow" transition="zoom" :show-footer="false" @close="cancelPrint">
        <div slot="header" class="is-pulled_right" style="width: 100%">
          <a class="button is-primary" @click="print">Imprimir</a>
        </div>
        <div v-if="currentTicket.ticket">
          <div class="is-clearfix" style="font-size: 20px;">
            <div class="is-pulled-right">{{ currentTicket.table ? currentTicket.table.description : 'Delivery' }}</div>
            <div class="is-pulled-left"><b>{{ currentTicket.ticket.number }}</b></div>
          </div>
          <div>
            <i class="fa fa-clock-o" style="padding:2px"></i>
            {{ currentTicket.printed_at | moment('DD MMMM, YYYY HH:mm') }}
          </div>
          <hr>
          <p style="font-size: 14px;" v-if="currentTicket.client">
            Cliente: <br><b>{{ currentTicket.client.name }}</b> - <i class="fa fa-phone" style="padding: 2px;"></i> {{ currentTicket.client.phone }}
          </p>
          <p style="font-size: 14px;">
            Direccion: <br><b>{{ currentTicket.ticket.address || currentTicket.client ? currentTicket.client.address : 'Sin direccion' }}</b>
          </p>
          <hr>
          <div v-if="loadingModal" class="not-print">Cargando...</div>
          <div v-else>
            <table class="table">
              <thead>
                <th>Cant.</th>
                <th>Producto</th>
                <th>Subtotal</th>
              </thead>
              <tbody>
                <tr v-for="(entry, index) in currentTicket.entries" :key="index">
                  <td>{{ entry.quantity }}</td>
                  <td>{{ entry.name }}</td>
                  <td>{{ entry.subtotal }}</td>
                </tr>
              </tbody>
            </table>
            <div class="is-clearfix">
              <div class="is-pulled-left">Total: {{currentTicket.total}}</div>
              <div class="is-pulled-right">Pendiente: {{currentTicket.pending }}</div>
            </div>
            <hr>
            <div v-if="mapConfig.showMap === 'true'">
              <h2 style="font-size: 15px; font-weight: 500;margin-bottom: 10px;">Mapa</h2>
              <div style="margin: auto;" v-bind:style="{ width: mapConfig.width + 'px', height: mapConfig.height + 'px' }">
                <div v-if="loadingMap" class="not-print">cargando mapa...</div>
                <div v-else><img v-bind:src="mapUrl" v-bind:width="mapConfig.width" v-bind:height="mapConfig.height"></div>
              </div>
            </div>
            <div style="text-align: center" class="print">
              <barcode :tag="'img'" :value="currentTicket.ticket.number" :options="{ format: barcodeConfig.format, lastChar: barcodeConfig.lastChar, displayValue: true, height: barcodeConfig.height, width: barcodeConfig.width, background: 'transparent' }"></barcode>
              <p>Ticket no valido como factura</p>
            </div>
          </div>
        </div>
      </modal>
    </td>
  </tr>
</template>

<script>
  import _ from 'lodash'
  import Vue from 'vue'
  export default {
    name: 'KitchenRow',
    props: ['ticket', 'barcodeConfig', 'mapConfig', 'zone'],
    data () {
      return {
        loading: false,
        loadingMap: false,
        removed: false,
        rowExpanded: false,
        currentTicket: { ticket: { client: {} }, client: {} },
        isShow: false,
        loadingModal: false,
        entries: [],
        mapUrl: null,
        geocoder: null
      }
    },
    methods: {
      loadTicket () {
        this.loadingModal = true
        this.$http.get('kitchen/ticket?id=' + this.ticket.id).then(
          response => {
            this.currentTicket = response.data
            this.loadingModal = false
            this.isShow = true
            this.geocoder = new window.google.maps.Geocoder()
            this.geocodeAddress(this.geocoder)
          }
        )
      },
      geocodeAddress (geocoder) {
        /* eslint-disable no-new */
        this.loadingMap = true
        let center = this.ticket.address || this.ticket.client ? this.ticket.client.address : 'undefined'

        if (center !== 'undefined') {
          console.log(center)
          this.geocoder.geocode({ 'address': center }, function (results, status) {
            if (status === 'OK') {
              let position = results[0].geometry.location
              this.mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=16&size=${this.mapConfig.width}x${this.mapConfig.height}&maptype=roadmap&markers=color:red|${position.lat()},${position.lng()}`
              console.log(this.mapUrl)
              this.loadingMap = false
              console.log('listo')
            } else {
              this.loadingMap = false
              alert('Verificar Quizas el ticket no tiene direccion: ' + status)
            }
          }.bind(this))
        }
      },
      print () {
        window.print()
      },
      cancelPrint () {
        this.isShow = false
        this.currentTicket = {}
      },
      toggleShow () {
        this.rowExpanded = !this.rowExpanded
      },
      deliverItem (item) {
        this.loading = true
        this.$http.post('kitchen/deliver_item', { entry_item_id: item.id }).then(
          response => {
            _.extend(item, response.data)
            this.loading = false
          },
          error => {
            console.log(error.data)
            this.loading = false
          }
        )
      },
      deliverEntry (entry) {
        this.loading = true
        this.$http.post('kitchen/deliver_entry', { entry_id: entry.id, zone: this.zone }).then(
          response => {
            this.loading = false
            Vue.delete(this.ticket.entries, entry.id)
            if (Object.keys(this.ticket.entries).length === 0) {
              this.removed = true
              this.$emit('remove-ticket', this.ticket)
            }
          },
          error => {
            console.log(error.data)
            this.loading = false
          }
        )
      },
      deliverTicket () {
        this.loading = true
        this.$http.post('kitchen/deliver_ticket', { ticket_id: this.ticket.id, zone: this.zone }).then(
          response => {
            this.$emit('remove-ticket', this.ticket)
            this.removed = true
            this.loading = false
          },
          error => {
            console.log(error.data)
            this.loading = false
          }
        )
      }
    }
  }
</script>

<style>
  .print { display: none; }
  @media print {
<<<<<<< HEAD
    .not-print { display: none; }
    .modal-card-foot, .modal-card-head { display: none; }
=======
    .modal-card-foot, .modal-card-head, .not-print { display: none; }
>>>>>>> make kitchen map configurable and move print to header
    .print { display: block; }
  }
</style>
