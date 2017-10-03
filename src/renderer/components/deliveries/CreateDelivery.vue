<template>
  <div>
    <div class="columns">
      <div class="column is-4">
        <h1 style="font-size: 18px; font-weight: 400; margin-bottom: 10px;">Pedidos listos para enviar: {{ tickets.length }}</h1>
        <div style="height: 600px; overflow: auto;">
          <ul>
            <li v-for="(ticket, $index) in tickets" :id="$index" class="dticket" :draggable="ticket.address && !ticket.added" 
                  :class="{'disabled': !ticket.address, added: ticket.added, dragging: isdragged && current === $index }" 
                  @drag="setDragging($index)" @dragstart="isdragged = true; isdragging = true" @dragend="isdragging = false; current = null;">
              <div class="is-clearfix">
                <i class="fa fa-check fa-floated" v-if="ticket.added"></i>
                # {{ ticket.number }} 
                <b class="is-pulled-right">${{ ticket.partial_total }}</b>
              </div>
              <p style="margin: 10px 0px;">
                <i class="fa fa-home fa-floated"></i> {{ ticket.address || 'Sin direccion no se puede enviar'}}
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="column is-8">
        <div class="box" style="min-height: 70px; width: 100%;">
          <div @dragover.prevent @drop="addItem" class="dragZone" :class="{'dragEnter': isdragging }" @dragoever="isdragging = true">
            <div class="drag-message">
              <p>Arrastra los tickets para enviar</p>
              <p><i class="fa fa-upload"></i></p>
            </div>
          </div>
          <div v-if="newDelivery.tickets.length > 0">
            <h4 style="font-size: 18px; font-weight: 400; margin: 5px 0px;">Pedidos ({{ newDelivery.tickets.length }})</h4>
            <div style="height: 400px; overflow: auto">
              <div v-for="(ticket, $index) in newDelivery.tickets" :key="ticket.id" class="dticket">
                <div class="columns">
                  <div class="column is-3"><span class="button is-fullwidth is-not-link is-light"># {{ ticket.number }}</span></div>
                  <div class="column is-2"><span class="button is-fullwidth is-not-link is-light">$ {{ ticket.partial_total }}</span></div>
                  <div class="column is-5">
                    <div v-if="!ticket.paid">
                      <div class="control has-addons">
                        <input type="number" step="0.01" v-model="ticket.pay" class="input" @blur="setChange(ticket)">
                        <span class="button is-light is-not-link">$ {{ ticket.change }}</span>
                      </div>
                    </div>
                    <div v-else>
                      <div style="padding:7px 5px">
                        <i class="fa fa-check-circle fa-floated is-success" style="margin-right:10px"></i> <b>Ticket pagado</b>
                      </div>
                    </div>
                  </div>
                  <div class="column is-2">
                    <a class="button is-danger is-pulled-right" @click="removeFromList($index)"><i class="fa fa-trash"></i></a>
                  </div>
                </div>
                <div class="columns"><div class="column"><i class="fa fa-home fa-floated"></i> {{ ticket.address }}</div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="box is-clearfix">
          <div class="columns">
            <div class="column">
              <span class="select is-fullwidth">
                <select v-model="newDelivery.moto_id">
                  <option value="1">Moto 1</option>
                  <option value="2">Moto 2</option>
                  <option value="3">Moto 3</option>
                </select>
              </span>
            </div>
            <div class="column">
              <div class="control has-addons">
                <span class="button is-not-link is-light">Total cobrar: $ {{ total }}</span>
                <span class="button is-not-link is-light">Total cambio: $ {{ sumChange }}</span>
              </div>
            </div>
            <div class="column">
              <div class="control has-addons is-pulled-right">
                <button class="button is-success" :disabled="newDelivery.tickets.length < 1"
                  @click="create()">Crear Pedido
                </button>
                <a class="button is-light" @click.prevent="cancelDelivery()">Cancelar</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: 'create-delivery',
    props: ['tickets'],
    data () {
      return {
        newDelivery: { tickets: [], total: 0, moto_id: '' },
        current: null,
        isdragging: false,
        isdragged: false
      }
    },
    computed: {
      total () {
        return this.newDelivery.tickets.reduce((sum, ticket) => {
          return parseFloat(sum) + parseFloat(ticket.partial_total)
        }, 0.0)
      },
      sumChange () {
        return this.newDelivery.tickets.reduce((sum, ticket) => {
          return parseFloat(sum) + parseFloat(ticket.change)
        }, 0.0)
      }
    },
    methods: {
      create () {
        let data = this.newDelivery.tickets.map((ticket) => {
          return { ticket_id: ticket.id, pay: ticket.pay }
        })

        this.$http.post('deliveries', { delivery:
          { moto_id: this.newDelivery.moto_id, total: this.total, ticket_deliveries_attributes: data }
        }).then(
          (response) => {
            console.log(response)
            this.$emit('delivery-created', response.data)
          },
          (error) => {
            console.log(error)
          }
        )
      },
      cancelDelivery () {
        _.each(this.newDelivery.tickets, (t) => { t.added = false })
        this.newDelivery.tickets = []
        this.$emit('delivery-canceled')
      },
      setChange (ticket) {
        if (ticket.pay) {
          ticket.change = parseFloat(ticket.pay) - parseFloat(ticket.partial_total)
        }
      },
      addItem (evt) {
        if (this.current !== null && this.current >= 0) {
          let t = this.tickets[this.current]
          this.$set(t, 'added', true)
          this.$set(t, 'change', 0)
          this.$set(t, 'pay', 0)
          this.newDelivery.tickets.push(t)
          this.current = null
        }
      },
      removeFromList (index) {
        let t = this.newDelivery.tickets[index]
        t.added = false
        t.pay = 0
        t.change = 0
        this.newDelivery.tickets.splice(index, 1)
        this.current = null
      },
      setDragging (index) {
        this.current = index
      }
    }
  }
</script>

<style scoped>
  ul { list-style: none; padding-right: 10px; margin: 0px; }
  table tr:hover { background: #fff !important; }
  .dticket { border: solid 1px #f1f1f1; padding: 5px; margin-bottom: 5px; }
  .dticket.disabled { opacity: .5; }
  .dticket.added { opacity: .8; background: #80C088 !important; color: #fff; }
  .dticket.dragging { background: #FC7135 !important; color: #fff !important; opacity: 0.8; }
  .drag-message { padding: 20px; vertical-align: middle; text-align: center; }
  .dragZone { min-height: 70px; border: dashed 2px #ccc; padding: 5px; margin-bottom: 20px; }
  .dragEnter { border-color: red; }
</style>
