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
              <p>Aca va el drag</p>
              <p><i class="fa fa-upload"></i></p>
            </div>
          </div>
          <div v-if="newDelivery.tickets.length > 0">
            <h4 style="font-size: 18px; font-weight: 400; margin: 5px 0px;">Pedidos ({{ newDelivery.tickets.length }})</h4>
            <div style="height: 400px; overflow: auto">
              <div v-for="(ticket, $index) in newDelivery.tickets" :key="ticket.id" class="dticket">
                <div class="columns">
                  <div class="column"><span class="button is-fullwidth is-not-link is-light"># {{ ticket.number }}</span></div>
                  <div class="column"><span class="button is-fullwidth is-not-link is-light">$ {{ ticket.partial_total }}</span></div>
                  <div class="column"><input type="number" step="0.01" v-model="ticket.pay" class="input" @blur="setChange(ticket)"></div>
                  <div class="column"><span class="button is-fullwidth is-light is-not-link">Llevar cambio: $ {{ ticket.change }}</span></div>
                  <div class="column"><a class="button is-danger" @click="removeFromList($index)"><i class="fa fa-trash"></i></a></div>
                </div>
                <div class="columns"><div class="column"><i class="fa fa-home fa-floated"></i> {{ ticket.address }}</div></div>
              </div>
            </div>
          </div>
        </div>
        <div class="box is-clearfix">
          <div class="is-pulled-left">
            <span class="button is-light is-medium">Total cobrar: $ {{ total }}</span>
            <span class="button is-light is-medium">Total cambio: $ {{ sumChange }}</span>
          </div>
          <div class="is-pulled-right">
            <button class="button is-success is-medium" :disabled="newDelivery.tickets.length < 1"
                @click="create()">Crear Pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'create-delivery',
    props: ['tickets'],
    data () {
      return {
        newDelivery: { tickets: [], total: 0 },
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
        alert('Crear Pedido')
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
