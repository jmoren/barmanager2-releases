<template>
  <form @keyup.enter.prevent="addEntry" v-shortkey="['esc']" @shortkey="resetEntry">
    <div class="columns">
      <div class="column is-4">
        <div class="control is-grouped">
          <div class="control">
            <input class="input is-medium" :disabled="status" id="code" type="text" placeholder="Cod" v-model="promotion.code" @blur.prevent="pickPromotion" autofocus>
          </div>
          <div class="control">
            <input class="input is-medium" :disabled="status" min="1" @change="setTotal" type="number" placeholder="Cantidad" v-model="entry.quantity">
          </div>
          <div class="control">
            <input class="input is-medium" :disabled="status" type="number" placeholder="Sub total" v-model="entry.subtotal" >
          </div>
        </div>
      </div>
      <div class="column is-8">
        <div class="control is-grouped">
          <div class="control is-expanded">
            <autocomplete @item-selected="setPromotion" :name="promotion.name" :items="promotions"></autocomplete>
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
    <hr>
  </form>
</template>
<script>
  import _ from 'lodash'
  import autocomplete from '../utils/ItemsAutocomplete'
  export default {
    name: 'TicketPromoForm',
    props: ['promotions', 'status'],
    components: { autocomplete },
    data () {
      return {
        promotion: { id: null, name: '', price: null, code: null, description: '' },
        entry: { comment: null, subtotal: 0, quantity: 1, item: {} }
      }
    },
    methods: {
      resetEntry () {
        this.entry = { comment: null, subtotal: 0, quantity: 1, item: {} }
        this.promotion = { id: null, name: '', price: null, code: null, description: '' }
      },
      addEntry () {
        if (this.promotion.id) {
          this.entry.item = this.promotion
          this.$emit('save-entry', this.entry)
          _.extend(this.entry, { comment: null, subtotal: 0, quantity: 1, item: {} })
          _.extend(this.promotion, { id: null, name: '', price: null, code: null, description: '' })
        }
      },
      setTotal () {
        if (this.promotion.id) {
          this.entry.subtotal = parseFloat(this.promotion.price) * parseInt(this.entry.quantity)
        }
      },
      setPromotion (p) {
        if (p) {
          this.promotion = p
        }
        this.pickPromotion()
      },
      pickPromotion () {
        if (!this.promotion.code) { return }

        let fp = this.promotions.find((p) => {
          return parseInt(this.promotion.code) === parseInt(p.code)
        })

        if (fp) {
          this.promotion = _.clone(fp)
          this.setTotal()
        } else {
          if (this.promotion.id) {
            _.extend(this.promotion, { id: null, name: '', price: null, code: null, description: '' })
          }
          this.$notify.open({
            content: 'Promocion no encontrado',
            duration: 5000,
            type: 'danger'
          })
        }
      }
    }
  }
</script>
