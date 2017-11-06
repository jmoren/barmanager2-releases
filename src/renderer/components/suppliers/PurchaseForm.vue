<template>
  <div class="">
    <div class="columns">
      <div class="column is-6">
        <label class="label">Número de Factura</label>
        <p class="control">
          <input class="input is-medium" :disabled="loading" type="text" placeholder="Factura" v-model="purchase.number">
        </p>
      </div>
      <div class="column is-6">
        <label class="label">Total $ <span class="is-pulled-right">Suma parcial: {{purchasePartialTotal}}</span></label>
        <p class="control">
          <input class="input is-medium" :disabled="loading" min="1" type="number" v-model="purchase.total">
        </p>
      </div>
    </div>
    <hr>
    <form>
      <div class="columns">
        <div class="column is-6">
          <label class="label">Producto</label>
          <div class="control is-grouped">
            <div class="control select is-medium">
             <select v-model="currentType">
               <option value="material">Material</option>
               <option value="item">Item</option>
             </select>
            </div>
            <div class="control" v-if="currentType === 'item'">
              <input class="input is-medium" :disabled="loading" id="code" type="text" placeholder="Cod" v-model="item.code" @blur.prevent="pickItem" autofocus>
            </div>
            <div class="control is-expanded">
              <autocomplete @item-selected="getItem" :status="loading" :name="item.name" :items="currentList"></autocomplete>
            </div>
            <div class="control" v-if="currentType === 'material'">
              <input class="input is-medium" disabled :value="item.mesuring_unit">
            </div>
          </div>
        </div>
        <div class="column is-3">
          <label class="label">Cantidad</label>
          <div class="control">
            <input class="input is-medium" :disabled="loading" min="1" type="number" placeholder="Cantidad" v-model="entry.quantity">
          </div>
        </div>
        <div class="column is-3">
          <label class="label">Precio Unitario</label>
          <div class="control is-grouped">
            <div class="control">
              <input class="input is-medium" :disabled="loading" type="number" placeholder="Precio unitario" v-model="entry.price" >
            </div>
            <div class="control is-expanded">
              <button @click.prevent="addEntry()" class="button is-light is-medium is-fullwidth">
                <span class="icon is-small"><i class="fa fa-plus"></i></span>
                <span>Agregar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </form>
    <br/>
    <table class="table">
      <thead>
        <th>Tipo</th>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Stock</th>
        <th>Precio Unitario</th>
        <th>Sub Total</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-if="purchase.entries.length < 1">
          <td colspan="4"><div class="is-danger-text">No hay item seleccionados</div></td>
        </tr>
        <tr v-for="(entry, index) in purchase.entries" :key="index" v-else>
          <td>{{ entry.type }}</td>
          <td>{{ entry.item.name }}</td>
          <td>{{ entry.quantity }}</td>
          <td>{{ entry.item.stock_amount }}</td>
          <td>${{ entry.price }}</td>
          <td>{{ entry.subtotal }}</td>
          <td>
            <tooltip v-if="entry.previous && entry.price > entry.previous.price" content="El precio del producto es mayor al de la útlima compra.">
              <tag type="danger" size="medium" rounded>
                <span class="icon is-small"><i class="fa fa-exclamation-circle"></i></span>
                <span>Precio anterior: ${{entry.previous.price}}</span>
              </tag>
            </tooltip>
          </td>
        </tr>
      </tbody>
    </table>
    <hr>
    <div class="columns">
      <div class="column is-4">
        <checkbox v-model="payExpense" val="true">Pagar factura</checkbox>
      </div>
      <div class="column is-4" v-if="payExpense">
        <checkbox v-if="supplier.partial_cash_open" v-model="addToPartial" val="true">Cargar el gasto a la caja</checkbox>
      </div>
    </div>
    <div class="columns" v-if="payExpense">
      <div class="column is-4">
        <input type="number" v-model="partialValue" class="input" placeholder="Cantidad a pagar">
      </div>
    </div>
    <hr>
    <div>
      <button class="button is-primary" :disabled="loading || !purchase.number || purchase.entries.length < 1"
          @click.prevent="savePurchase()">Guardar</button>
      <button class="button is-light" @click.prevent="resetForm()">Cancelar</button>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import _ from 'lodash'
  import autocomplete from '../utils/ItemsAutocomplete'
  import alert from '../../mixins/Alert'
  export default {
    name: 'PurchaseForm',
    props: ['supplier'],
    components: { autocomplete },
    mixins: [alert],
    data () {
      return {
        purchase: { total: '', number: '', entries: [] },
        items: [],
        materials: [],
        loading: false,
        entry: { price: '', quantity: '', item: {}, previous: {} },
        item: { id: null, name: '', price: null, code: null, description: '' },
        payExpense: false,
        addToPartial: false,
        payTotal: false,
        partialValue: '',
        currentType: '',
        currentList: []
      }
    },
    watch: {
      currentType () {
        if (this.currentType === 'item') {
          this.currentList = this.items
          this.entry.type = 'Item'
          this.item = {}
        } else if (this.currentType === 'material') {
          this.currentList = this.materials
          this.entry.type = 'Material'
          this.item = {}
        } else {
          this.currentList = []
          this.entry = { type: '' }
          this.item = {}
        }
      }
    },
    created () {
      if (!this.supplier) {
        this.alert('danger', 'No hay Proveedor seleccionado. Eliga uno nuevamente de la lista de proveedores')
      }
      this.fetchItems()
      this.fetchMaterials()
    },
    computed: {
      purchasePartialTotal () {
        return _.sum(this.purchase.entries.map((e) => e.subtotal))
      }
    },
    methods: {
      resetForm () {
        this.purchase = { total: 0, number: '', entries: [] }
        this.partialValue = 0
        this.addToPartial = false
        this.payExpense = false
        this.payTotal = false
      },
      addEntry () {
        if (this.item.id && this.entry.quantity && this.entry.price) {
          this.entry.item = _.clone(this.item)
          this.entry.subtotal = this.entry.quantity * this.entry.price

          this.purchase.entries.push(_.clone(this.entry))

          this.getLastEntry()

          //  clean entry and item
          this.entry = {}
          this.item = {}
        } else {
          this.alert('danger', 'Debe completar todos los datos para agergar un producto')
        }
      },
      getLastEntry () {
        let entry = _.last(this.purchase.entries)
        this.$http.get('admin/suppliers/' + this.supplier.id + '/purchases/last_entry' + '?item_id=' + entry.item.id).then(
          (response) => {
            Vue.nextTick(() => {
              entry.previous = response.data
            })
          },
          error => {
            this.alert('danger', error.data)
          }
        )
      },
      getItem (item) {
        if (item) {
          this.item = item
        }

        this.pickItem()
      },
      fetchItems () {
        this.$http.get('items?paginate=1').then(
          response => {
            this.items = response.data
          }
        )
      },
      fetchMaterials () {
        this.$http.get('admin/materials?paginate=1').then(
          response => {
            this.materials = response.data
          }
        )
      },
      pickItem () {
        if (!this.item.code) { return }

        let fi = this.items.find((i) => { return parseInt(this.item.code) === parseInt(i.code) })

        if (fi) {
          this.item = _.clone(fi)
        } else {
          if (this.item.id) {
            _.extend(this.item, { id: null, name: '', price: null, code: null, description: '' })
          }
          this.alert('danger', 'Item no encontrado')
        }
      },
      savePurchase () {
        this.loading = true

        this.purchase.partial_total = this.payTotal ? null : this.partialValue

        this.purchase.add_to_partial = this.addToPartial
        this.purchase.add_expense = this.payExpense

        this.$http.post('admin/suppliers/' + this.supplier.id + '/purchases', { purchase: this.purchase }).then(
          (response) => {
            this.loading = false
            this.alert('success', 'Factura guarda correctamente.')
            this.resetForm()
            this.$emit('save-purchase')
          },
          error => {
            this.alert('danger', error.data)
            this.loading = false
          }
        )
      }
    }
  }
</script>
