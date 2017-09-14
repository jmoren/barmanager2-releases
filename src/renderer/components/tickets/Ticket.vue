<template lang="html">
  <div class="">
    <div v-if="loading">
      loading ticket...
    </div>
    <div v-else>
      <h2 class="print" style="font-weight: 300; font-size: 25px">
        <span v-if="ticket.table">MESA: {{ ticket.table.description }} -</span>
        TICKET # {{ ticket.number }}
      </h2>
      <div id="ticket-options" class="columns not-print">
        <div class="column is-4">
          <h2 class="header">TICKET # {{ ticket.number }}</h2>
        </div>
        <div class="column is-4">
          <div class="columns" v-if="!ticket.closed" >
            <div class="column is-6">
              <table-autocomplete :class="{'is-disabled': ticket.closed || loadingTables, 'is-primary': ticket.table_id, 'is-light': !ticket.table_id, 'column is-5 is-paddingless': true }"
              :query="currentTable" :tables="tables" :ticket="ticket" @remove-table="removeTable" @set-table="table => traslateTicket(table.id)"></table-autocomplete>
            </div>
            <div class="column is-6">
              <clients-autocomplete :ticket="ticket" :clients="clients" @remove-client="removeClient" @set-client="client => assignClient(client.id)"></clients-autocomplete>
            </div>
          </div>
          <div v-else>
            <div class="control has-addons" >
              <a class="button is-not-link is-light" v-if="ticket.table_id">
                <span class="icon is-small"><i class="fa fa-cutlery"></i></span>
                <b>{{ currentTable }}</b>
              </a>
              <router-link :to="{ name: 'Client', params: { id: ticket.client_id } }" v-if="ticket.client_id" class="button is-light">
                <span class="icon is-small"><i class="fa fa-user"></i></span>
                <b>{{ currentClient }}</b>
              </router-link>
            </div>
          </div>
        </div>
        <div class="column is-4 has-text-right">
          <tooltip v-bind:content="ticket.paid ? 'Ticket Pago' : 'Ticket Sin Pagar'">
            <div class="button" :class="{'is-danger': closed && ticket.paid, 'is-success': !closed, 'is-warning': closed && !ticket.paid}">
              <span class="icon is-small"><i class="fa" :class="{'fa-check': ticket.paid, 'fa-exclamation-circle': !ticket.paid }"></i></span>
              <span><b>{{ formattedStatus }}</b></span>
            </div>
          </tooltip>
          <tooltip content="Cerrar ticket (ctrl + c)" v-if="!closed">
            <a @click.prevent="closeTicketModal" class="button is-light" v-shortkey="['ctrl', 'c']"
             @shortkey="closeTicketModal">
              <span class="icon is-small"><i class="fa fa-lock"></i></span>
            </a>
          </tooltip>
          <tooltip v-bind:content=" ticket.printed_at ? 'Ticket impreso. Imprimir nuevamente' : 'Imprimir ticket (ctrl + p)'">
            <pop-confirm content="Despues de imprimir, no se podra modificar el ticket. Seguro de seguir?" icon="question-circle-o" :on-ok="printTicket" :on-cancel="cancelPrint" class="not-print">
              <span class="button is-light" v-shortkey.once="['ctrl', 'p']" @shortkey="printTicket()">
                <span class="icon is-small"><i class="fa fa-print"></i></span>
              </span>
            </pop-confirm>
          </tooltip>
          <tooltip content="Imprimir ticket de cocina">
            <a class="button is-light" @click.prevent="toggleKitchenView">
              <span class="icon is-small"><i class="fa fa-cutlery"></i></span>
            </a>
          </tooltip>
          <tooltip content="Enviar a la impresora fiscal">
            <a class="button is-light" @click.prevent="printFiscalTicket">
              <span class="icon is-small"><i class="fa fa-file-o"></i></span>
            </a>
          </tooltip>
          <tooltip content="Eliminar ticket">
            <button class="button is-light" @click.prevent="deleteTicket">
              <span class="icon is-small"><i class="fa fa-times"></i></span>
            </button>
          </tooltip>
        </div>
      </div>
      <div v-if="ticket.client.id" class="print">
        <h2>CLIENTE: {{ ticket.client.name }}</h2>
        <h3 v-if="ticket.client.address">{{ ticket.client.address }}</h3>
      </div>
      <hr class="not-print"/>
      <div>
        <ticket-content :ticket="ticket" :reasons="reasons" @ticket-paid="setPaid" @ticket-not-paid="setNotPaid" :kitchenView="kitchenView"></ticket-content>
      </div>
      <div class="ticket-footer">
        <div class="columns content">
          <div class="column is-9">
            <div class="columns">
              <div class="column is-8 is-marginless print-center">
                <div class="print"><br /><p>TICKET NO VALIDO COMO FACTURA.</p></div>
                <barcode :value="ticket.number" :options="{ format: barcode.format, lastChar: barcode.lastChar, displayValue: true, height: barcode.height, width: barcode.width, background: 'transparent' }"></barcode>
              </div>
              <div class="column is-4 not-print" style="text-align: right;" v-if="ticket.user">
                Ud ha sido atendido por: <b>{{ ticket.user.name }}</b>
              </div>
            </div>
          </div>
          <div class="column is-3 not-print" style="padding-left: 30px">
            {{ date | moment('DD, MMMM YYYY, HH:mm A') | uppercase }}
          </div>
        </div>
      </div>

      <modal :title="'Ticket Nro. ' + ticket.number" :show-footer="false" :on-cancel="closePrintModal" :is-show="isPrintOpen" transition="zoom">
        <form>
          <div class="columns">
            <div class="column is-5"><input class="input" type="text" v-model="print.customer_name" placeholder="Nombre"></div>
            <div class="column is-7"><input class="input" type="text" v-model="print.customer_address" placeholder="Direccion"></div>
          </div>
          <div class="columns">
            <div class="column is-5">
              <div class="select is-fullwidth">
                <select class="input" v-model="print.customer_doc_type">
                  <option value=''>Seleccione tipo</option>
                  <option value="C">CUIT</option>
                  <option value="0">LE</option>
                  <option value="1">LC</option>
                  <option value="2">DNI</option>
                  <option value="3">Pasaporte</option>
                  <option value="4">CE</option>
                  <option value="5">S/C</option>
                </select>
              </div>
            </div>
            <div class="column is-7"><input class="input" type="text" v-model="print.customer_doc_nbr" placeholder="Numero"></div>
          </div>
          <div class="columns">
            <div class="column is-5">
              <div class="select is-fullwidth">
                <select class="input" v-model="print.ticket_type">
                  <option value=''>Seleccione tipo</option>
                  <option value="A">Factura A</option>
                  <option value="B">Factura B</option>
                </select>
              </div>
            </div>
            <div class="column is-4">
              <div class="select is-fullwidth">
                <select class="is-expanded" v-model="print.iva_type">
                  <option value=''>Seleccione tipo iva</option>
                  <option value="I">Responsable inscripto</option>
                  <option value="N">Responsable no inscripto</option>
                  <option value="E">Exento</option>
                  <option value="A">No Responsable</option>
                  <option value="M">Responsable Monotributo</option>
                  <option value="T">No categorizado</option>
                  <option value="V">Pequeño contribuyente</option>
                  <option value="S">Monotributista social</option>
                  <option value="F">Consumidor final</option>
                </select>
              </div>
            </div>
            <div class="column is-3">
              <div class="select is-fullwidth">
                <select class="is-expanded" v-model="print.iva">
                  <option value=''>Iva</option>
                  <option value="10.5">10.5%</option>
                  <option value="21">21%</option>
                </select>
              </div>
            </div>
          </div>
          <hr class="not-print"/>
          <div class="columns">
            <div class="column is-4 is-offset-2">
              <button @click.prevent="fiscalPrint" class="button is-success is-fullwidth">Imprimir</button>
            </div>
            <div class="column is-4">
              <button @click.prevent="closePrintModal" class="button is-light is-fullwidth">Cancelar</button>
            </div>
          </div>
        </form>
      </modal>
      <modal :title="'TICKET Nro. ' + ticket.number" :show-footer="false" :on-cancel="closeModal" :is-show="isOpen" :ok-loading="true" transition="zoom">
        <form @submit.prevent="closeTicket()">
          <div class="columns modal-row with-border">
            <div class="column is-4">
              <i class="fa fa-floated fa-user-o"></i>
              Cliente</div>
            <div class="column is-8">
              <div>{{ ticket.client_id ? ticket.client.name : 'Sin Cliente' }}</div>
              <div v-if="ticket.client_id" class="is-danger-text ticket-help">
                <tooltip content="Deuda acumulada">
                  <i class="fa fa-exclamation-circle fa-floated"></i>
                  <span>Deuda actual: ${{ ticket.client.total_debt }}</span>
                </tooltip>
              </div>
            </div>
          </div>
          <div class="columns modal-row with-border">
            <div class="column is-4">
              <i class="fa fa-floated fa-clock-o"></i>
              Pagado?</div>
            <div class="column is-8">
              <div>{{ ticket.paid ? 'Si' :  ticket.total === 0 ? 'No hay items para pagar' : 'Sin pagar' }}</div>
              <div v-if="!ticket.paid" class="is-danger-text ticket-help">
                <i class="fa fa-exclamation-circle fa-floated"></i>
                <span v-if="ticket.client_id">Al cerrar se agregara como deuda al cliente</span>
                <span v-else>Debe ingresar pagos en el ticket</span>
              </div>
            </div>
          </div>
          <div class="columns modal-row with-border">
            <div class="column is-4">
              <i class="fa fa-floated fa-thumbs-o-up"></i>
              Todo entregado?</div>
            <div class="column is-8">
              <div class="is-danger-text ticket-help">
                <span><i class="fa fa-exclamation-circle fa-floated"></i></span>
                <span>Al cerrar se entregaran todos los items que esten pendientes</span>
              </div>
            </div>
          </div>
          <div class="columns modal-row">
            <div class="column is-4">
              <i class="fa fa-dollar fa-floated"></i> <span>Total</span>
            </div>
            <div class="column is-6"><b>${{ ticket.total }}</b></div>
          </div>
          <div class="columns modal-row">
            <div class="column is-4">
              <i class="fa fa-dollar fa-floated"></i> <span>Pendiente</span>
            </div>
            <div class="column is-6"><b>${{ ticket.paid ? 0 : ticket.pending }}</b></div>
          </div>
          <div class="columns modal-row" v-if="!ticket.paid">
            <div class="column is-4">Abonar Pendiente</div>
            <div class="column is-8">
              <radio-group v-model="ticket.pay">
                <radio val="efectivo">Efectivo</radio>
                <radio val="tarjeta"> Tarjeta</radio>
                <radio val="empty"> No pagar</radio>
              </radio-group>
            </div>
          </div>
          <hr class="not-print"/>
          <div class="columns">
            <div class="column is-4 is-offset-2">
              <input type="submit" id="submit-ticket-form" class="button is-success is-medium is-fullwidth" :class="{'is-disabled': !canBeClosed && ticket.pay === 'empty'}" value="Cerrar"></input>
            </div>
            <div class="column is-4"><a @click.prevent="closeModal" class="button is-light is-medium is-fullwidth">Cancelar</a></div>
          </div>
        </form>
      </modal>
    </div>
  </div>
</template>

<script>
import TicketContent from './TicketContent'
import ClientsAutocomplete from '@/components/utils/ClientsAutocomplete'
import TableAutocomplete from '@/components/utils/TableAutocompleteAssign'
import { mapGetters } from 'vuex'
import _ from 'lodash'
import Auth from '../../auth'
import alert from '../../mixins/Alert'
const Config = require('electron-config')
const config = new Config()

export default {
  name: 'Ticket',
  components: {
    TicketContent,
    ClientsAutocomplete,
    TableAutocomplete
  },
  mixins: [alert],
  filters: {
    uppercase (value) {
      return value.toUpperCase()
    }
  },
  beforeRouteEnter (to, from, next) {
    if (Auth.user.profile.role === 'cooker') {
      next(vm => vm.$router.push({ name: 'Kitchen' }))
    } else {
      next()
    }
  },
  watch: {
    '$route': 'fetchTicket'
  },
  created () {
    this.fetchTicket()
  },
  data () {
    return {
      barcode: {
        format: config.get('barcode_format', 'EAN13'),
        width: config.get('barcode_width', 2),
        height: config.get('barcode_height', 60),
        lastChar: config.get('barcode_lastChar', '>')
      },
      loading: false,
      loadingClients: false,
      loadingTables: false,
      kitchenView: false,
      clients: [],
      isOpen: false,
      isPrintOpen: false,
      date: Date.now(),
      print: {
        ticket_type: '',
        customer_name: '',
        customer_address: '',
        customer_doc_nbr: '',
        customer_doc_type: '',
        iva_type: '',
        iva: ''
      },
      ticket: {
        client: {},
        table_id: null,
        client_id: null,
        status: null,
        paid_at: null,
        total: 0.0,
        full_delivered: false,
        closed: false,
        paid: false,
        pay: 'efectivo'
      },
      new_table_id: '',
      new_client_id: ''
    }
  },
  computed: {
    ...mapGetters({
      tables: 'closedTables',
      reasons: 'allReasons'
    }),
    closed () {
      return this.ticket.status === 'closed'
    },
    formattedStatus () {
      return this.ticket.status === 'closed' ? 'Cerrado' : 'Abierto'
    },
    canBeClosed () {
      return (this.ticket.client_id || this.ticket.paid || this.ticket.total === 0)
    },
    currentTable () {
      if (this.ticket.table_id) {
        return this.ticket.table.description
      } else {
        return 'Ticket Delivery'
      }
    },
    currentClient () {
      if (this.ticket.client_id) {
        return this.ticket.client.name
      } else {
        return 'Seleccione Cliente'
      }
    }
  },
  methods: {
    fetchTicket () {
      this.loading = true
      this.$http.get('tickets/' + this.$route.params.id).then(
        response => {
          _.extend(this.ticket, response.data)
          this.loading = false
        },
        error => {
          console.log(error.data)
          this.alert('danger', 'No se encontro el ticket')
          this.$router.push({ name: 'Tables' })
        }
      )
    },
    closeTicketModal () {
      this.isOpen = true
      setTimeout(() => {
        document.getElementById('submit-ticket-form').focus()
      }, 100)
    },
    deleteTicket () {
      this.$modal.confirm({
        title: 'Eliminar ticket',
        content: 'Estas seguro de eliminar este ticket',
        onOk: this.confirmDelete
      })
    },
    confirmDelete () {
      this.$http.delete('tickets/' + this.ticket.id).then(
        () => {
          if (this.ticket.table) {
            this.$store.dispatch('closeTable', this.ticket.table)
          }
          this.$router.push({ name: 'Tables' })
          this.alert('success', 'Ticket eliminado!')
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    closeTicket () {
      this.$http.post('tickets/' + this.$route.params.id + '/close', { ticket: { status: 'closed', pay: this.ticket.pay } }).then(
        response => {
          this.isOpen = false
          _.extend(this.ticket, response.data)
          if (this.ticket.table) {
            this.$store.dispatch('updateTable', response.data.table)
          }
          this.alert('success', 'Ticket cerrado!')
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    setPaid (value) {
      this.ticket.paid = true
      this.ticket.pending = value
    },
    setNotPaid (value) {
      this.ticket.paid = false
      this.ticket.pending = value
    },
    reopenTicket () {
      this.$http.post('tickets/' + this.ticket.id + '/reopen', { ticket: { status: 'open' } }).then(
        response => {
          _.extend(this.ticket, response.data)
          this.alert('success', 'Ticket re abierto!')
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    removeTable () {
      this.traslateTicket()
    },
    traslateTicket (newTableId) {
      let message = null
      let kind = null
      let oldTable = this.ticket.table
      let params = { table_id: newTableId }
      this.$http.post('tickets/' + this.ticket.id + '/traslate', params).then(
        response => {
          let newTable = response.data.table
          _.extend(this.ticket, response.data)
          kind = 'success'
          if (newTable) {
            this.$store.dispatch('updateTable', newTable)
          }

          if (oldTable) {
            this.$store.dispatch('closeTable', oldTable)
          }
          message = this.ticket.table_id ? 'Nueva Mesa asignada: ' + this.ticket.table.description : 'Ticket Delivery'
          this.alert(kind, message)
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    removeClient () {
      this.new_client_id = null
      this.assignClient()
    },
    assignClient (newClientId) {
      let params = { client_id: newClientId }

      this.$http.post('tickets/' + this.ticket.id + '/assign', params).then(
        response => {
          _.extend(this.ticket, response.data)
          let message, kind

          if (this.ticket.client_id) {
            message = 'Nuevo cliente asignado: ' + this.ticket.client.name
            kind = 'success'
          } else {
            message = 'Ticket sin cliente asignado!'
            kind = 'danger'
          }

          this.alert(kind, message)
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    toggleKitchenView () {
      this.kitchenView = true
      this.printTicket()
    },
    printTicket () {
      this.$http.put('tickets/' + this.ticket.id, { ticket: { printed_at: new Date() } }).then(
        response => {
          this.ticket = response.data
          window.print()
          this.kitchenView = false
        },
        error => {
          this.alert('danger', error.data)
          this.kitchenView = false
        }
      )
    },
    cancelPrint () {
      this.$notify.open({content: 'Impresion cancelada'})
    },
    fiscalPrint () {
      this.$http.post('fiscal_printer/print', { ticket_id: this.ticket.id, fiscal_printer: this.print }).then(
        response => {
          this.$notify.open({ type: 'success', content: 'Se envio a la impresora fiscal' })
          this.isPrintOpen = false
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    printFiscalTicket () {
      this.isPrintOpen = true
    },
    cancelFiscalPrint () {
      this.$notify.open({content: 'Impresion fiscal cancelada'})
    },
    closeModal () {
      this.isOpen = false
    },
    closePrintModal () {
      this.isPrintOpen = false
    }
  }
}
</script>

<style lang="css">
  .popover-content hr { margin: 15px 0px;}
  .popover-content h1 { font-weight: bold; font-size: 15px; margin: 0px;}
  .popover-content .form-footer { margin: 15px 0;}

  .modal .columns.modal-row {
    font-size: 18px;
    margin: 10px 5px;
    padding-bottom: 10px;
  }
  .modal .columns.modal-row .column { padding-left: 0; padding-right: 0; }
  .modal .columns.modal-row span { font-size: 15px; }
  .modal .columns.modal-row.with-border { border-bottom: dashed 1px #eee; }
  .modal .columns.modal-row .ticket-help { margin-top: 5px; }

  li.active { background: #F5F5F5; }
  .ticket-footer { margin: 20px 5px; }
  .ticket-footer .content { margin-top: 10px; padding: 10px 15px; background: #f9f9f9; }
  .print { display: none; }
  @media print {
    .not-print, .hero.is-primary.is-fixed, .popover { display: none !important; }
    .print-center { text-align: center; }
    .print { display: block; }
    .ticket .resume .resume-header { border-bottom: none; }
    .modal .columns.modal-row .column span { font-size: 14px; }
  }
</style>
