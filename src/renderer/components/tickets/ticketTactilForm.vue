<template>
  <form @keyup.enter.prevent="addEntry" v-shortkey="['esc']" @shortkey="resetEntry">
    <div class="columns">
      <div class="column is-4">
        <h3>Categorias</h3>
        <ul>
          <li v-for="category in categories" :key="category.id" @click="selectCategory(category)">
            <a :disabled="status">{{ category.name }} - {{ category.zone || "No definida" }}</a>
          </li>
        </ul>
      </div>
      <div class="column is-4">
        <h3>Items</h3>
        <ul>
          <li v-for="item in filteredItems" :key="items.id" @click="getItem(item)">
            <a :disabled="status">{{ item.name }}</a>
        </li>
        </ul>
      </div>
      <div class="column is-4" v-if="this.item.id">
        <h3>Resumen</h3>
        <div class="columns">
          <div class="column is-4">
            {{this.item.name}}
          </div>
          <div class="column is-2">
            <a class="button is-primary" @click="incEntryQuantity" :disabled="status">
              <span class="icon">
                <i class="fa fa-plus"></i>
              </span>
            </a>
          </div>
          <div class="column is-2">
            <a class="button is-danger" @click="decEntryQuantity" :disabled="status">
              <span class="icon">
                <i class="fa fa-minus"></i>
              </span>
            </a>
          </div>
        </div>
        <div>
            <input class="input is-medium" :disabled="status" type="text" placeholder="Nota o comentario" v-model="entry.comment">
            Cantidad: {{ this.entry.quantity }} </br>
            Total: ${{ this.entry.subtotal }} </br>
        </div>
        <div>
          <a class="button is-primary" @click="addEntry">
            <span class="icon">
              <i class="fa fa-check"></i>
            </span>
          </a>
          <a class="button is-danger" @click="resetEntry">
            <span class="icon">
              <i class="fa fa-times"></i>
            </span>
          </a>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
  import _ from 'lodash'
  import autocomplete from '../utils/ItemsAutocomplete'
  import alert from '../../mixins/Alert'
  export default {
    name: 'TicketTactilForm',
    props: ['categories', 'items', 'status'],
    components: { autocomplete },
    mixins: [alert],
    data () {
      return {
        selectedCategory: null,
        entry: { comment: null, subtotal: 0, code: null, quantity: 1 },
        item: { id: null, name: '', price: null, code: null, description: '' }
      }
    },
    computed: {
      filteredItems () {
        return this.selectedCategory ? this.items.filter(it => it.category.id === this.selectedCategory.id) : this.items
      }
    },
    methods: {
      incEntryQuantity () {
        this.entry.quantity += 1
        this.setTotal()
      },
      decEntryQuantity () {
        this.entry.quantity -= 1
        this.setTotal()
      },
      selectCategory (category) {
        this.selectedCategory = category
      },
      resetEntry () {
        this.entry = { comment: null, subtotal: 0, quantity: 1, item: {} }
        this.item = { id: null, name: '', price: null, code: null, description: '' }
      },
      addEntry () {
        if (this.item.id) {
          this.entry.item = this.item
          this.$emit('save-entry', this.entry)
          _.extend(this.entry, { comment: null, subtotal: 0, quantity: 1, item: {} })
          _.extend(this.item, { id: null, name: '', price: null, code: null, description: '' })
        }
      },
      setTotal () {
        if (this.item.id) {
          this.entry.subtotal = parseFloat(this.item.price) * parseInt(this.entry.quantity)
        }
      },
      getItem (item) {
        if (item) {
          this.item = item
        }

        this.pickItem()
      },
      pickItem () {
        if (!this.item.code) { return }

        let fi = this.items.find((i) => { return parseInt(this.item.code) === parseInt(i.code) })

        if (fi) {
          this.item = _.clone(fi)
          this.setTotal()
        } else {
          if (this.item.id) {
            _.extend(this.item, { id: null, name: '', price: null, code: null, description: '' })
          }
          this.alert('danger', 'Item no encontrado')
        }
      }
    }
  }
</script>
