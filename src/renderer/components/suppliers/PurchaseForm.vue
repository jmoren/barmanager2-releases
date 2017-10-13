<template>
  <div class="box">
    <h4><i class="fa fa-floated fa-credit-card"></i> Ingresar Factura</h4>
    <hr>
    <div class="columns">
      <div class="column is-6">
        <label class="label">Número de Factura</label>
        <p class="control">
          <input class="input" :disabled="status" type="text" placeholder="Factura" v-model="purchase.number">
        </p>
      </div>
      <div class="column is-6">
        <label class="label">Total $</label>
        <p class="control">
          <input class="input" :disabled="status" min="1" type="number" :placeholder="purchaseTotal" v-model="purchase.total">
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
              <input class="input is-medium" :disabled="status" id="code" type="text" placeholder="Cod" v-model="item.code" @blur.prevent="pickItem" autofocus>
            </div>
            <div class="control is-expanded">
              <autocomplete @item-selected="getItem" :status="status" :name="item.name" :items="items"></autocomplete>
            </div>
          </div>
        </div>
        <div class="column is-3">
          <label class="label">Cantidad</label>
          <div class="control">
            <input class="input is-medium" :disabled="status" min="1" type="number" placeholder="Cantidad" v-model="entry.quantity">
          </div>
        </div>
        <div class="column is-3">
          <label class="label">Precio Unitario</label>
          <div class="control is-grouped">
            <div class="control">
              <input class="input is-medium" :disabled="status" type="number" placeholder="Precio unitario" v-model="entry.price" >
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
    <data-table :data="purchase.entries">
      <column label="Producto">
        <template scope="row">
          <tag type="primary">{{ row.item.name }}</tag>
        </template>
      </column>
      <column label="Cantidad" field="quantity"></column>
      <column label="Stock Actual">
        <template scope="row">
          {{ row.item.stock_amount }}
        </template>
      </column>
      <column label="Precio Unitario" field="price"></column>
      <column label="Sub Total" field="subtotal"></column>
    </data-table>
    <hr>
    <div>
      <button class="button is-primary" @click.prevent="savePurchase()">Guardar</button>
      <button class="button is-link" @click.prevent="resetForm()">Cancelar</button>
    </div>
  </div>
</template>
<script>
  import _ from 'lodash'
  import autocomplete from '../utils/ItemsAutocomplete'
  import alert from '../../mixins/Alert'
  export default {
    name: 'PurchaseForm',
    props: ['supplier', 'status'],
    components: { autocomplete },
    mixins: [alert],
    data () {
      return {
        purchase: { total: 0, number: '', entries: [] },
        items: [],
        entry: { price: 0, quantity: 0, item: {} },
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
        if (this.item.id) {
          this.entry.item = _.clone(this.item)
          this.entry.subtotal = this.entry.quantity * this.entry.price

          this.purchase.entries.push(_.clone(this.entry))
          this.entry = {}
          this.item = {}
        } else {
          this.alert('danger', 'No hay item seleccionado')
        }
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
        this.status = 'disabled'
        this.$http.post('admin/suppliers/' + this.purchase.supplier.id + '/purchases', { purchase: this.purchase }).then(
          (response) => {
            this.status = ''
            this.alert('success', 'Factura guarda correctamente.')
            this.resetForm()
            this.$emit('save-purchase', this.purchase)
          },
          error => {
            this.alert('danger', error.data)
            this.status = ''
          }
        )
      }
    }
  }
</script>
