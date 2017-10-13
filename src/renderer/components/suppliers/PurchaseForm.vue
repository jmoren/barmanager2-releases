<template>
  <div class="box">
    <h4><i class="fa fa-floated fa-credit-card"></i> Ingresar Factura</h4>
    <hr>
    <div class="columns">
      <div class="column is-6">
        <label class="label">Número de Factura</label>
        <p class="control">
          <input class="input" :disabled="loading" type="text" placeholder="Factura" v-model="purchase.number">
        </p>
      </div>
      <div class="column is-6">
        <label class="label">Total $</label>
        <p class="control">
          <input class="input" :disabled="loading" min="1" type="number" :placeholder="purchaseTotal" v-model="purchase.total">
        </p>
      </div>
    </div>
    <hr>
    <form @keyup.enter.prevent="addEntry">
      <div class="columns">
        <div class="column is-6">
          <label class="label">Producto</label>
          <div class="control is-grouped">
            <div class="control">
              <input class="input is-medium" :disabled="loading" id="code" type="text" placeholder="Cod" v-model="item.code" @blur.prevent="pickItem" autofocus>
            </div>
            <div class="control is-expanded">
              <autocomplete @item-selected="getItem" :status="loading" :name="item.name" :items="items"></autocomplete>
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
                <span class="icon is-small">
                  <i class="fa fa-plus"></i>
                </span>
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
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Stock</th>
        <th>Precio Unitario</th>
        <th></th>
        <th>Sub Total</th>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in purchase.entries" :key="index">
          <td>{{ entry.item.name }}</td>
          <td>{{ entry.quantity }}</td>
          <td>{{ entry.item.stock_amount }}</td>
          <td>
            ${{ entry.price }}
          </td>
          <td>
            <tooltip v-if="entry.previous && entry.price > entry.previous.price" content="El precio del producto es mayor al de la útlima compra.">
              <span class="is-danger-text">
                <i class="fa fa-exclamation-triangle"></i>
                Precio anterior: ${{entry.previous.price}}
              </span>
            </tooltip>
          </td>
          <td>{{ entry.subtotal }}</td>
        </tr>
      </tbody>
    </table>
    <hr>
    <div>
      <button class="button is-primary" :disabled="loading || !purchase.number || purchase.entries.length < 1"
          @click.prevent="savePurchase()">Guardar</button>
      <button class="button is-light" @click.prevent="resetForm()">Cancelar</button>
    </div>
  </div>
</template>
<script>
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
        loading: false,
        entry: { price: '', quantity: '', item: {}, previous: {} },
        item: { id: null, name: '', price: null, code: null, description: '' }
      }
    },
    created () {
      if (!this.supplier) {
        this.alert('danger', 'No hay Proveedor seleccionado. Eliga uno nuevamente de la lista de proveedores')
      }
      this.purchase.supplier = this.supplier
      this.fetchItems()
    },
    computed: {
      purchaseTotal () {
        return _.sum(this.purchase.entries.map((e) => e.subtotal))
      }
    },
    methods: {
      resetForm () {
        this.purchase = { total: 0, number: '', entries: [] }
      },
      addEntry () {
        if (this.item.id && this.entry.quantity && this.entry.price) {
          this.entry.item = _.clone(this.item)
          this.entry.subtotal = this.entry.quantity * this.entry.price
          this.purchase.entries.push(_.clone(this.entry))
          this.getLastEntry()
          this.entry = {}
          this.item = {}
        } else {
          this.alert('danger', 'Debe completar todos los datos para agergar un producto')
        }
      },
      getLastEntry () {
        var lastEntry = _.last(this.purchase.entries, 1)
        console.log(lastEntry.item.id)
        this.$http.get('admin/suppliers/' + this.purchase.supplier.id + '/purchases/last_entry' + '?item_id=' + lastEntry.item.id).then(
          (response) => {
            lastEntry.previous = response.data
            this.alert('success', 'Factura guarda correctamente.')
          },
          error => { this.alert('danger', error.data) }
        )
      },
      getItem (item) {
        if (item) {
          this.item = item
        }

        this.pickItem()
      },
      fetchItems () {
        this.$http.get('items').then(
          response => {
            this.items = response.data
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
        this.purchase.total = this.purchaseTotal
        this.$http.post('admin/suppliers/' + this.purchase.supplier.id + '/purchases', { purchase: this.purchase }).then(
          (response) => {
            this.loading = false
            this.alert('success', 'Factura guarda correctamente.')
            this.resetForm()
            this.$emit('save-purchase', this.purchase)
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
