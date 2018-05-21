<template lang="html">
  <tr :class="{'not-print': !!entry.canceled , 'kitchen-row': entry.item.zone, 'not-kitchen-row': !entry.item.zone }" v-if="!(kitchenView && entry.delivered)">
    <td class="has-text-centered not-print">
      <div v-if="!tclosed">
        <popover title="" placement="left" :width="300" trigger="click" :disabled="!!entry.canceled">
          <button class="is-small button is-danger" :class="{ 'is-loading': loading, 'is-disabled': entry.canceled || tclosed }">
            <span class="icon is-small"><i class="fa fa-trash"></i></span>
          </button>
          <div slot="content">
            <h1>Seleccione Razon</h1>
            <hr>
            <div class="control is-grouped">
              <div class="select is-fullwidth">
                <select v-model="cancel_reason">
                  <option value="">Sin Motivo</option>
                  <option v-for="reason in reasons" v-bind:value="reason.id">{{ reason.text }}</option>
                </select>
              </div>
            </div>
            <div class="form-footer has-text-centered">
              <button type="button" class="button is-danger" @click="cancel(entry)">Confirmar</button>
            </div>
          </div>
        </popover>
      </div>
    </td>
    <td class="has-text-centered not-print">
      <tooltip v-bind:content="entry.type_name" placement="top" trigger="hover">
        <span>{{ entry.type }}</span>
      </tooltip>
    </td>
    <td class="has-text-centered not-print">{{ entry.item.code }}</td>
    <td class="has-text-centered">{{ entryQuantity }}</td>
    <td class="has-text-centered not-print">
      <tooltip v-bind:content="entry.item.zone" placement="top" trigger="hover">
        <i v-if="entry.item.zone" class="fa fa-culery fa-floated"></i>
      </tooltip>
    </td>
    <td style="width: 45%;" class="item-desc">
      <div>
        <tooltip v-bind:content="entry.item.description + ' - ' + entry.updated_time" placement="top" trigger="hover">
          <i class="fa fa-question-circle fa-floated"></i>
        </tooltip>
        {{ entry.item.name }}
        <div class="is-pulled-right">
          <popover title="" placement="top" :width="300" trigger="click" v-if="!entry.canceled && !entry.delivered">
            <span class="is-primary-text" style="cursor: pointer">
              <i :class="entry.comment ? '' : 'not-print'"> {{ entry.comment ? entry.comment : 'Agregar nota' }}</i>
            </span>
            <div slot="content"  class="not-print">
              <h1>Agregar nota</h1>
              <hr>
              <div class="control">
                <input type="text" v-model="entry.comment" placeholder="Nota" class="input">
              </div>
              <div class="form-footer has-text-centered">
                <button type="button" class="button is-danger" @click="saveRow(entry)">Actualizar</button>
              </div>
            </div>
          </popover>
          <span class="not-print" style="color: #999" v-else><i>{{ entry.comment || 'Sin comentatrios' }}</i></span>
          <tooltip v-bind:content="entry.canceled ? 'Pedido Cancelado' : entry.delivered ? 'Pedido Entregado' : 'Entregar pedido completo'">
            <a @click.prevent="entry.delivered || entry.canceled ? false : deliverAll(entry)" class="button is-small is-light">
              <span class="icon is-small">
                <i class="fa fa-circle" :class="{'is-warning': !entry.delivered && !entry.canceled,'is-success': entry.delivered, 'is-danger': entry.canceled }"></i>
              </span>
            </a>
          </tooltip>
        </div>
      </div>
      <div class="sub-items not-print" v-if="entry.show">
        <ul>
          <li v-for="item in entry.entry_items">
            <div class="columns">
              <div class="column is-6">
                <span v-if="!tprinted">
                  <popover title="" placement="left" :width="300" trigger="click" v-if="!item.delivered_at" :disabled="!!item.canceled || tprinted">
                    <tooltip :content="item.canceled ? item.cancel_reason ? item.cancel_reason.text : 'Sin motivo' : 'Cancelar item'">
                      <button class="is-small is-light">
                        <i class="fa fa-floated is-danger" :class="{'fa-trash': !item.canceled, 'fa-commenting-o': item.canceled }"></i>
                      </button>
                    </tooltip>
                    <div slot="content">
                      <h1>Seleccione Razon</h1>
                      <hr>
                      <div class="control is-grouped">
                        <div class="select is-fullwidth">
                          <select v-model="cancel_reason">
                            <option value="">Sin Motivo</option>
                            <option v-for="reason in reasons" v-bind:value="reason.id">{{ reason.text }}</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-footer has-text-centered">
                        <button type="button" class="button is-danger" @click.prevent="cancelItem(entry, item)">Confirmar</button>
                      </div>
                    </div>
                  </popover>
                  <tag class="is-small is-light" v-else><i class="fa fa-check is-success fa-floated"></i></tag>
                </span>
                <tooltip v-if="item.created_by" v-bind:content="item.created_by" placement="top" trigger="hover">
                  <i class="fa fa-floated fa-user-o"></i>
                </tooltip>
                <span>{{ item.item_name }}</span>
              </div>
              <div class="column is-6">
                <div class="is-pulled-right">
                  <tooltip content="Entregar item" v-if="!item.delivered_at && !item.canceled">
                    <a @click.prevent="deliverItem(entry, item)" class="button is-small is-light">
                      {{ item.canceled ? 'Cancelado' : item.delivered_at ? 'Entregado' : 'Entregar' }}
                      <span class="icon is-small">
                        <i class="fa fa-circle is-warning"></i>
                      </span>
                    </a>
                  </tooltip>
                  <div class="button is-small is-light is-not-link" v-else style="cursor: default">
                    <span v-if="item.delivered_at">Entregado a las {{item.delivered_at | moment('HH:mm')}}</span>
                    <span v-if="item.canceled && item.delivered_at">/</span>
                    <span>{{ item.canceled ? 'Cancelado' : '' }} </span>
                    <span class="icon is-small"><i class="fa fa-circle" :class="{'is-danger': item.canceled, 'is-success': !item.canceled }"></i></span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </td>
    <td class="has-text-centered not-print">{{ entry.item.price }} </td>
    <td class="has-text-centered">{{ entry.subtotal }}</td>
    <td>
      <div class="is-pulled-right">
        <tooltip content="Aumentar la cantidad">
          <a @click.prevent="increase(entry)" class="button is-small is-primary" :class="{'is-disabled': entry.canceled || tclosed }" v-if="!tclosed && !entry.canceled">
            <span class="icon is-small"><i class="fa fa-plus"></i></span>
          </a>
        </tooltip>
        <tooltip content="Ver cada pedido">
          <a @click="toggleShow()" class="button is-small is-success" v-if="!entry.canceled">
            <span class="icon is-small"><i class="fa fa-database"></i></span>
          </a>
        </tooltip>
      </div>
    </td>
  </tr>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'TicketRow',
  props: ['entry', 'tclosed', 'tprinted', 'reasons', 'kitchenView'],
  data () {
    return {
      loading: false,
      cancel_reason: null
    }
  },
  computed: {
    entryQuantity () {
      if (this.kitchenView) {
        const notDelivered = this.entry.entry_items.map(item => !item.canceled && !item.delivered_at ? 1 : 0)
        return notDelivered.reduce((acc, val) => acc + val)
      } else {
        return this.entry.quantity
      }
    }
  },
  methods: {
    toggleShow () {
      this.entry.show = !this.entry.show
    },
    cancel (entry) {
      this.loading = true
      this.$http.put('tickets/' + entry.ticket_id + '/entries/' + entry.id + '/cancel?reason=' + this.cancel_reason).then(
        () => {
          entry.canceled = true
          this.cancel_reason = null
          this.loading = false
          this.$emit('reload-content')
        },
        error => {
          this.loading = false
          console.log(error.data)
        }
      )
    },
    saveRow (entry) {
      this.$http.put('tickets/' + entry.ticket_id + '/entries/' + entry.id, { entry: { comment: entry.comment } }).then(
        response => {
          console.log(response)
          this.$notify.open({
            type: 'success',
            content: 'Entrada actualizada.'
          })
        }
      )
    },
    increase (entry) {
      this.$http.put('tickets/' + entry.ticket_id + '/entries/' + entry.id + '/increase').then(
        response => {
          _.extend(entry, response.data)
          entry.show = true
        },
        error => {
          console.log(error.data)
        }
      )
    },
    deliverAll (entry) {
      this.$http.put('tickets/' + entry.ticket_id + '/entries/' + entry.id + '/deliver').then(
        response => {
          _.extend(entry, response.data)
          entry.show = true
        },
        error => {
          console.log(error.data)
        }
      )
    },
    deliverItem (entry, item) {
      this.$http.put('tickets/' + entry.ticket_id + '/entries/' + entry.id + '/deliver?item=' + item.id).then(
        response => {
          _.extend(entry, response.data)
          entry.show = true
        },
        error => {
          console.log(error.data)
        }
      )
    },
    cancelItem (entry, item) {
      this.$http.put('tickets/' + entry.ticket_id + '/entries/' + entry.id + '/cancel?item=' + item.id + '&reason=' + this.cancel_reason).then(
        response => {
          _.extend(entry, response.data)
          this.cancel_reason = null
          entry.show = true
          this.$emit('reload-content')
        },
        error => {
          console.log(error.data)
        }
      )
    }
  }
}
</script>

<style lang="css">
  @media print {
    .not-print { display: none; }

    .item-desc { font-size: 24px;}
  }

  .button span.icon { margin: 0px 5px!important; }

  table .sub-items {
    border-top: dashed 1px #ccc;
    padding-top: 5px;
    margin-top: 10px;
  }
  table .sub-items li { padding: 5px 0px; }
  .comment { color: #616161; }
  .is-canceled { cursor: none; opacity: 0.8; text-decoration: line-through;}
</style>
