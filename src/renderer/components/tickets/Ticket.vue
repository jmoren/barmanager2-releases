<template lang="html">
  <div class="" v-shortkey.once="['ctrl', 'p']" @shortkey="printTicket()">
    <div v-if="loading">
      loading ticket...
    </div>
    <div v-else>
      <div id="ticket-options" class="columns is-marginless">
        <div class="column is-4 is-paddingless">
          <span class="only-print" v-if="ticket.table">Mesa {{ ticket.table.description }}</span>
          <h1 class="header">TICKET # {{ ticket.number }}</h1>
        </div>
        <div class="column is-5 is-paddingless">
          <div v-if="!ticket.closed">
            <tooltip content="Cambiar de mesa o asignar una">
              <popover title="" placement="top" trigger="click">
                <button class="button" :class="{'is-disabled': ticket.closed || loadingTables, 'is-primary': ticket.table_id, 'is-light': !ticket.table_id }">
                  <span class="icon is-small">
                    <i class="fa" :class="{'fa-circle-o-notch fa-spin': loadingTables, 'fa-cutlery': !loadingTables }"></i>
                  </span>
                  <b>{{ currentTable }}</b>
                </button>
                <div slot="content">
                  <h1>Seleccione mesa</h1>
                  <hr>
                  <table-autocomplete :tables="tables" action="assign" @set-table="table => new_table_id = table.id"></table-autocomplete>
                  <div class="form-footer has-text-centered">
                    <button type="button" class="button is-success" @click="traslateTicket()">Actualizar</button>
                  </div>
                </div>
              </popover>
              <button v-if="this.ticket.table_id" class="button is-primary" @click.prevent="removeTable"><i class="fa fa-times"></i></button>
            </tooltip>

            <tooltip content="Asignar o cambiar de cliente">
              <popover title="" placement="top" trigger="click">
                <button class="button" @click.prevent="loadClients" :class="{'is-disabled': ticket.closed || loadingClients, 'is-primary': ticket.client_id, 'is-light': !ticket.client_id }">
                  <span class="icon is-small">
                    <i class="fa" :class="{'fa-circle-o-notch fa-spin': loadingClients, 'fa-user': !loadingClients }"></i>
                  </span>
                  <b>{{ currentClient }}</b>
                </button>
                <div slot="content">
                  <h1>Seleccione cliente</h1>
                  <hr>
                  <clients-autocomplete :clients="clients" @set-client="client => new_client_id = client.id"></clients-autocomplete>
                  <div class="form-footer has-text-centered">
                    <button type="button" class="button is-success" @click="assignClient()">Actualizar</button>
                  </div>
                </div>
              </popover>
              <button v-if="this.ticket.client_id" class="button is-primary" @click.prevent="removeClient"><i class="fa fa-times"></i></button>
            </tooltip>
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
        <div class="column is-3 is-paddingless has-text-right">
          <tooltip v-bind:content="ticket.paid ? 'Ticket Pago' : 'Ticket Sin Pagar'">
            <div class="button" :class="{'is-danger': closed && ticket.paid, 'is-success': !closed, 'is-warning': closed && !ticket.paid}">
              <span class="icon is-small"><i class="fa" :class="{'fa-check': ticket.paid, 'fa-exclamation-circle': !ticket.paid }"></i></span>
              <span><b>{{ formattedStatus }}</b></span>
            </div>
          </tooltip>
          <tooltip content="Cerrar ticket" v-if="!closed">
            <a @click.prevent="reloadTicket" class="button is-light">
              <span class="icon is-small"><i class="fa fa-lock"></i></span>
            </a>
          </tooltip>
          <tooltip content="Abrir ticket" v-if="closed">
            <a @click.prevent="reopenTicket" class="button is-light">
              <span class="icon is-small"><i class="fa fa-unlock"></i></span>
            </a>
          </tooltip>
          <tooltip v-bind:content=" ticket.printed_at ? 'Ticket impreso. Imprimir nuevamente' : 'Imprimir ticket'">
            <pop-confirm content="Despues de imprimir, no se podra modificar el ticket. Seguro de seguir?" icon="question-circle-o" :on-ok="printTicket" :on-cancel="cancelPrint" class="not-print">
              <span class="button is-light">
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
      <hr>
      <ticket-content :ticket="ticket" :reasons="reasons" @ticket-paid="setPaid" @ticket-not-paid="setNotPaid" :kitchenView="kitchenView"></ticket-content>
      <div class="ticket-footer" v-if="ticket.user">
        <div class="content">
          Ud ha sido atendido por: <b>{{ ticket.user.name }}</b>
        </div>
      </div>
      <modal  :title="'Ticket Nro. ' + ticket.number" :show-footer="false" :on-cancel="closePrintModal" :is-show="isPrintOpen" transition="zoom">
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
          <hr>
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
            <i class="fa fa-dollar fa-floated"></i> Total
          </div>
          <div class="column is-8"><b>${{ ticket.total }}</b></div>
        </div>
        <div class="columns modal-row">
          <div class="column is-4">
            <i class="fa fa-dollar fa-floated"></i> Pendiente
          </div>
          <div class="column is-8"><b>${{ ticket.paid ? 0 : ticket.pending }}</b></div>
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
        <hr>
        <div class="columns">
          <div class="column is-4 is-offset-2">
            <a @click.prevent="closeTicket()" class="button is-success is-medium is-fullwidth" :class="{'is-disabled': !canBeClosed && ticket.pay === 'empty'}">Cerrar</a>
          </div>
          <div class="column is-4"><a @click.prevent="closeModal" class="button is-light is-medium is-fullwidth">Cancelar</a></div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import TicketContent from './TicketContent'
import ClientsAutocomplete from '@/components/utils/ClientsAutocomplete'
import TableAutocomplete from '@/components/utils/TableAutocomplete'
import { mapGetters } from 'vuex'
import _ from 'lodash'
import Auth from '../../auth'
import alert from '../../mixins/Alert'

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
      loading: false,
      loadingClients: false,
      loadingTables: false,
      kitchenView: false,
      clients: [],
      isOpen: false,
      isPrintOpen: false,
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
        pay: 'empty'
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
    reloadTicket () {
      this.isOpen = true
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
      this.new_table_id = null
      this.traslateTicket()
    },
    traslateTicket () {
      let message = null
      let kind = null
      let oldTable = this.ticket.table
      let newTable = null
      let params = { table_id: this.new_table_id }
      this.$http.post('tickets/' + this.ticket.id + '/traslate', params).then(
        response => {
          newTable = response.data.table
          _.extend(this.ticket, response.data)
          kind = 'success'
          this.new_table_id = null
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
    assignClient () {
      let params = { client_id: this.new_client_id }

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
    },
    loadClients () {
      if (this.clients.length < 1) {
        this.loadingClients = true
        this.$http.get('clients/').then(
          response => {
            this.clients = response.data
            this.loadingClients = false
          },
          error => {
            this.alert('danger', error.data)
            this.loadingClients = false
          }
        )
      }
      document.getElementById('search-clients').focus()
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
  .ticket-footer { margin: 10px 5px; border-top: solid 2px #f1f1f1; }
  .ticket-footer .content { margin-top: 10px; padding: 10px 15px; background: #f9f9f9; }
  .only-print { display: none }
  @media print {
    .only-print { display: block; }
    .hero.is-primary.is-fixed, #ticket-options .column.is-5, #ticket-options .column.is-3{ display: none; }
    .popover { display: none !important; }
  }
</style>
