<template lang="html">
  <div class="">
    <div v-if="loading">
      loading ticket...
    </div>
    <div v-else>
      <div class="print">
        <div style="font-weight: 300; font-size: 15px">TICKET # {{ ticket.number | withDash }}</div>
        <div style="font-weight: 300; font-size: 15px">{{ Date.now() | moment('DD MMMM, YYYY h:mm:ss a') }}</div>
        <div style="font-weight: 300; font-size: 25px">
          <span v-if="ticket.table_id">MESA {{ ticket.table.description }}</span>
          <span v-else class="is-danger-text">DELIVERY</span>
        </div>
        <div v-if="ticket.client.id"><h4>Cliente: {{ ticket.client.name }}</h4></div>
        <div v-if="ticket.address"><h4>Direccion: {{ ticket.address }}</h4></div>
        <div v-if="ticket.address_complement">Complemento: {{ ticket.address_complement }}</div>
      </div>
      <div id="ticket-options" class="columns not-print">
        <div class="column is-3">
          <h1 class="header">TICKET # {{ ticket.number | withDash }} </h1>
          <div style="font-size: 13px;">
            <a @click="editAddress()"><i class="fa fa-edit fa-floated"></i></a>
            Direccion: {{ ticket.address }}<br>
            <span style="color: #7D7E7F">Complementos: {{ ticket.address_complement || '---'}}</span>
          </div>
        </div>
        <div class="column is-6">
          <div v-if="!ticket.closed">
            <div class="columns" style="margin-bottom:0px;">
              <div class="column is-6">
                <table-autocomplete :class="{'is-disabled': ticket.closed || loadingTables, 'is-primary': ticket.table_id, 'is-light': !ticket.table_id }"
                :query="currentTable" :tables="tables" :ticket="ticket" @remove-table="removeTable" @set-table="table => traslateTicket(table.id)"></table-autocomplete>
              </div>
              <div class="column is-6">
                <clients-autocomplete :ticket="ticket" :clients="clients" @remove-client="removeClient" @set-client="client => assignClient(client.id)"></clients-autocomplete>
              </div>
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
        <div class="column is-3">
          <div class="control has-addons is-pulled-right">
            <tooltip v-bind:content="ticket.paid ? 'Ticket Pago' : 'Ticket Sin Pagar'">
              <div class="button" :class="{'is-danger': closed, 'is-success': !closed, 'is-warning': ticket.canceled_at}">
                <b>{{ ticket.status_name }}</b>
              </div>
            </tooltip>
            <tooltip content="Cerrar ticket (ctrl + c)" v-if="!closed && !ticket.canceled_at">
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
            <tooltip content="Ingresar Pagos">
              <a class="button is-light" @click.prevent="openPayments = !openPayments">
                <span class="icon is-small"><i class="fa fa-credit-card"></i></span>
              </a>
            </tooltip>
            <tooltip content="Enviar a la impresora fiscal">
              <a class="button is-light" @click.prevent="printFiscalTicket">
                <span class="icon is-small"><i class="fa fa-file-o"></i></span>
              </a>
            </tooltip>
            <tooltip content="Eliminar ticket">
              <button class="button is-light" @click.prevent="deleteTicket" v-if="!ticket.canceled_at">
                <span class="icon is-small"><i class="fa fa-times"></i></span>
              </button>
            </tooltip>
          </div>
        </div>
      </div>
      <hr class="not-print"/>
      <div id="ticket-content">
        <ticket-content :open-payments="openPayments" :ticket="ticket" :reasons="reasons" @update-pay="value => updatePayWith(value)" @ticket-paid="setPaid"
          @ticket-not-paid="setNotPaid" :kitchenView="kitchenView">
        </ticket-content>
        <div class="control has-addons" style="padding: 0 5px;">
          <input class="input" style="width:200px" type="text" value="Ud ha sido atendido por: " disabled  readonly="readonly">
          <div class="select">
            <select v-model="ticket.user_id" @change="updateTicket()">
              <option v-for="user in users" :key="user.id" :value="user.id" :disabled="user.id == currentUser.profile.id">
                {{ user.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <modal :title="'Ticket Nro. ' + ticket.number"
        :show-footer="false" :on-cancel="closePrintModal" :is-show="isPrintOpen" transition="zoom">
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

      <modal :title="'TICKET Nro. ' + ticket.number"
        :show-footer="false" :on-cancel="closeModal" :is-show="isOpen" :ok-loading="true" transition="zoom">
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

      <modal :title="'Editar Direccion - TICKET Nro. ' + ticket.number"
        :show-footer="true" :on-ok="updateTicketAddress" :is-show="addressOpen" :on-cancel="closeAddress">
        <p>Direccion actual: {{ ticket.address }}</p>
        <p>Complemento: {{ ticket.address_complement }}</p>
        <hr>
        <div class="control has-icon has-icon-left">
          <i v-if="ticket.address_not_validated" class="fa fa-warning" style="color: red;"></i>
          <vue-google-autocomplete ref="addressInput" id="map" country="ar" :value="ticket.address" :enable-geolocation="true" classname="input" placeholder="Direccion alternativa para envio" @clear="clearAddress" @placechanged="updateAddress" @no-results-found="(ob) => notFoundAddress(ob)"></vue-google-autocomplete>
          <textarea v-model="ticket.address_complement" rows="5" class="textarea" placeholder="Piso, Departamento, bloque u otros datos."></textarea>
        </div>
      </modal>

      <modal :title="'TICKET Nro. ' + ticket.number" :on-footer="false"
        :show-footer="false" :on-cancel="closeCancelTicket" :is-show="cancelTicketModal">
        <alert><b>Estas seguro de cancelar este ticket?</b></alert>
        <hr>
        <h3 style="font-size: 17px; font-weight: 400; margin-bottom: 15px">Seleccione una razon</h3>
        <div class="control">
          <div class="select is-fullwidth">
            <select v-model="ticket.cancel_reason_id">
              <option v-for="reason in reasons" :key="reason.id" :value="reason.id">{{ reason.text }}</option>
            </select>
          </div>
        </div>
        <hr>
        <button @click.prevent="confirmDelete" class="button is-danger">Cancelar Ticket</button>
        <button @click.prevent="cancelTicketModal = false" class="button is-light">Cerrar</button>
      </modal>
    </div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from './TicketAddress'
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
    TableAutocomplete,
    VueGoogleAutocomplete
  },
  mixins: [alert],
  filters: {
    uppercase (value) {
      return value.toUpperCase()
    },
    withDash (value) {
      return value.slice(0, 6) + '-' + value.slice(6, value.length)
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
    this.loadUsers()
  },
  data () {
    return {
      addressInput: '',
      users: [],
      openPayments: config.get('open_payments', true),
      barcode: {
        format: config.get('barcode_format', 'EAN13'),
        width: config.get('barcode_width', 2),
        height: config.get('barcode_height', 60),
        lastChar: config.path
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
        iva: '21'
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
        pay: 'efectivo',
        canceled_at: '',
        cancel_reason_id: ''
      },
      new_table_id: '',
      new_client_id: '',
      cancelTicketModal: false,
      addressOpen: false,
      currentUser: Auth.user
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
          if (this.ticket.client_id) {
            this.ticket.address = this.ticket.address || this.ticket.client.address
          }
          this.loading = false
        },
        error => {
          console.log(error.data)
          this.alert('danger', 'No se encontro el ticket')
          this.$router.push({ name: 'Tables' })
        }
      )
    },
    clearAddress () {
      this.$http.put('tickets/' + this.ticket.id, { ticket: { address: '', address_not_validated: false } }).then(
        (response) => {
          _.extend(this.ticket, response.data)
          this.alert('success', 'Se actualizo la direccion para envio')
        },
        () => {
          this.alert('danger', 'No se puedo actualizer la direccion')
        }
      )
    },
    updateAddress (a, placeResultData) {
      this.ticket.address = placeResultData.formatted_address
      this.ticket.address_not_validated = false
      this.updateTicket()
    },
    updatePayWith (value) {
      this.ticket.pay_with = value
      this.updateTicket()
    },
    updateTicket () {
      let data = {
        pay_with: this.ticket.pay_with,
        address: this.ticket.address,
        address_not_validated: this.ticket.address_not_validated,
        address_complement: this.ticket.address_complement,
        user_id: this.ticket.user_id
      }

      this.$http.put('tickets/' + this.ticket.id, { ticket: data }).then(
        (response) => {
          _.extend(this.ticket, response.data)
          this.alert('success', 'Se actualizo el ticket')
        },
        (error) => {
          console.log(error.data)
          this.alert('danger', 'No se puedo actualizer el ticket')
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
      this.cancelTicketModal = true
    },
    confirmDelete () {
      this.$http.post('tickets/' + this.ticket.id + '/cancel', { ticket: { cancel_reason_id: this.ticket.cancel_reason_id } }).then(
        (response) => {
          _.extend(this.ticket, response.data)
          this.cancelTicketModal = false
          this.alert('success', 'Ticket eliminado!')
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    closeTicket () {
      if (!this.ticket.pay) {
        this.ticket.pay = 'efectivo'
      }

      this.$http.post('tickets/' + this.$route.params.id + '/close', { ticket: { status: 'closed', pay: this.ticket.pay } }).then(
        response => {
          this.isOpen = false
          _.extend(this.ticket, response.data)
          if (this.ticket.table) {
            this.$store.dispatch('updateTable', [response.data.table])
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
      let params = { table_id: newTableId }
      this.$http.post('tickets/' + this.ticket.id + '/traslate', params).then(
        response => {
          _.extend(this.ticket, response.data)
          document.getElementById('code').focus()
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
            if (this.ticket.client.address) {
              this.ticket.address = this.ticket.client.address
            }
            if (this.ticket.client.address_complement) {
              this.ticket.address_complement = this.ticket.client.address_complement
            }
            // should update the store
            if (this.ticket.table_id) {
              this.$store.dispatch('changeUserTable', { table: this.ticket.table_id, client: { id: this.ticket.client_id, name: this.ticket.client.name, address: this.ticket.client.address } })
            }
          } else {
            message = 'Ticket sin cliente asignado!'
            kind = 'danger'
            if (this.ticket.table_id) {
              this.$store.dispatch('changeUserTable', { table: this.ticket.table_id, client: { id: null, name: null, address: null } })
            }
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
    closeCancelTicket () {
      this.cancelTicketModal = false
    },
    notFoundAddress (res) {
      this.ticket.address = res.name
      this.ticket.address_not_validated = true
      this.updateTicket()
    },
    updateTicketAddress () {
      this.addressOpen = false
      this.updateTicket()
    },
    editAddress () {
      this.addressOpen = true
    },
    closeAddress () {
      this.addressOpen = false
    },
    loadUsers () {
      this.$http.get('users').then(
        response => {
          this.users = response.data
        },
        error => {
          this.alert('danger', error.data)
        }
      )
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
  #ticket-footer { margin-top: 10px; }
  #ticket-footer .content { margin: 10px 5px 0px 5px; padding: 10px; background: #F6F6F6; }
  .print { display: none; }

  @media print {
    .not-print, .hero.is-primary.is-fixed, .popover, .notifications { display: none !important; }
    .print-center { text-align: center; }
    .print { display: block; }
    .ticket .resume .resume-header { border-bottom: none; }
    .modal .columns.modal-row .column span { font-size: 14px; }
  }
</style>
