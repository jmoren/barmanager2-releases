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
          <i class="fa fa-exclamation-circle fa-floated"></i> {{ entry.comment | titleize }}
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
      <modal title="Imprimir" ok-text="Imprimir" cancel-text="Cancelar" :on-ok="print" :on-cancel="cancelPrint" :width="520" :is-show="isShow" transition="zoom" @close="cancelPrint">
        <div v-if="currentTicket.ticket">
          <div class="is-clearfix" style="font-size: 20px;">
            <div class="is-pulled-right">{{ currentTicket.table ? currentTicket.table.description : 'Delivery' }}</div>
            <div class="is-pulled-left"><b>{{ currentTicket.ticket.number }}</b></div>
          </div>
          <div>
            <i class="fa fa-clock-o" style="padding:2px"></i>
            {{ currentTicket.printed_at | moment('DD MMMM, YYYY hh:mm') }}
          </div>
          <hr>
          <p style="font-size: 14px;" v-if="currentTicket.client">
            Cliente: <br><b>{{ currentTicket.client.name }}</b> - <i class="fa fa-phone" style="padding: 2px;"></i> {{ currentTicket.client.phone }}
          </p>
          <p style="font-size: 14px;">
            Direccion: <br><b>{{ currentTicket.ticket.address || currentTicket.client.address }}</b>
          </p>
          <hr>
          <div v-if="loadingModal">Cargando...</div>
          <div v-else>
            <table class="table">
              <thead>
                <th>Cant.</th>
                <th>Producto</th>
                <th>Comentario</th>
                <th>Subtotal</th>
              </thead>
              <tbody>
                <tr v-for="(entry, index) in currentTicket.entries" :key="index">
                  <td>{{ entry.quantity }}</td>
                  <td>{{ entry.name }}</td>
                  <td>{{ entry.comment }}</td>
                  <td>{{ entry.subtotal }}</td>
                </tr>
              </tbody>
            </table>
            <div class="is-clearfix">
              <div class="is-pulled-left">Total: {{currentTicket.total}}</div>
              <div class="is-pulled-right">Pending: {{currentTicket.pending }}</div>
            </div>
            <hr>
            <h2 style="font-size: 15px; font-weight: 500;margin-bottom: 10px;">Mapa</h2>
            <div id="map" style="height: 200px; width: 100%"></div>
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
    props: ['ticket', 'barcodeConfig'],
    data () {
      return {
        loading: false,
        removed: false,
        rowExpanded: false,
        currentTicket: {},
        isShow: false,
        loadingModal: false,
        entries: [],
        map: null,
        geocoder: null,
        config: {
          zoom: 16,
          center: { lat: -34.4686234, lng: -58.5181671 }
        }
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
            setTimeout(() => {
              this.map = new window.google.maps.Map(document.getElementById('map'), this.config)
              this.geocoder = new window.google.maps.Geocoder()
              this.geocodeAddress(this.geocoder, this.map)
            }, 1000)
          }
        )
      },
      geocodeAddress (geocoder, resultsMap) {
        /* eslint-disable no-new */
        this.geocoder.geocode({ 'address': this.ticket.address || this.ticket.client.address }, function (results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location)
            new window.google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            })
            this.loadMap = false
          } else {
            alert('Geocode was not successful for the following reason: ' + status)
          }
        })
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
        this.$http.post('kitchen/deliver_entry', { entry_id: entry.id }).then(
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
        this.$http.post('kitchen/deliver_ticket', { ticket_id: this.ticket.id }).then(
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
    .modal-card-foot, .modal-card-head { display: none; }
    .print { display: block; }
  }
</style>
