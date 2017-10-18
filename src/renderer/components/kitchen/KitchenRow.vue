<template>
  <tr>
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
    </td>
  </tr>
</template>

<script>
  import _ from 'lodash'
  import Vue from 'vue'
  export default {
    name: 'KitchenRow',
    props: ['ticket'],
    data () {
      return {
        loading: false,
        removed: false,
        rowExpanded: false
      }
    },
    methods: {
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
