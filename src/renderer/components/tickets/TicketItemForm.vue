<template>
  <form @keyup.enter.prevent="addEntry" v-shortkey="['esc']" @shortkey="resetEntry">
    <div class="columns">
      <div class="column is-4">
        <div class="control is-grouped">
          <div class="control">
            <input class="input is-medium" :disabled="status" id="code" type="text" placeholder="Cod" v-model="item.code" @blur.prevent="pickItem" autofocus>
          </div>
          <div class="control">
            <input class="input is-medium" :disabled="status" min="1" type="number" placeholder="Cantidad" v-model="entry.quantity" @change="setTotal">
          </div>
          <div class="control">
            <input class="input is-medium" :disabled="status" type="number" placeholder="Sub total" v-model="entry.subtotal" >
          </div>
        </div>
      </div>
      <div class="column is-8">
        <div class="control is-grouped">
          <div class="control is-expanded">
            <autocomplete @item-selected="getItem" :status="status" :name="item.name" :items="items"></autocomplete>
          </div>
          <div class="control is-expanded">
            <input class="input is-medium" :disabled="status" type="text" placeholder="Nota o comentario" v-model="entry.comment">
          </div>
          <div class="control">
            <button @click.prevent="addEntry()" class="button is-light is-medium"><i class="fa fa-plus"></i></button>
            <button @click.prevent="resetEntry()" class="button is-light is-medium"><i class="fa fa-times"></i></button>
          </div>
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
    name: 'TicketItemForm',
    props: ['items', 'status'],
    components: { autocomplete },
    mixins: [alert],
    data () {
      return {
        entry: { comment: null, subtotal: 0, code: null, quantity: 1 },
        item: { id: null, name: '', price: null, code: null, description: '' }
      }
    },
    methods: {
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
