<template>
  <modal title="Ingreso Items" :is-show="isShow" ok-text="Cerrar" :show-cancel="false"
          transition="fadeDown" @close="isShow=false" class="fullscreen">
    <form @keyup.enter.prevent="addEntry" v-shortkey="['esc']" @shortkey="resetEntry">
      <div class="columns">
        <div class="column is-4" v-if="!selectedCategory.id">
          <div class="list-filter-title">Categorias</div>
          <hr>
          <input type="search" v-model="qCategory" id="code" placeholder="Filtrar Categorias..." class="input is-medium">
          <hr>
          <ul class="list-filter">
            <li class="list-filter-line" v-for="category in catResult" :key="category.id" @click="selectCategory(category)">
              <div class="is-clearfix">
                <a :disabled="status" :class="{'selected': category.id === selectedCategory.id}">
                  {{ category.name }}
                  <div class="is-pulled-right" style="color: #999">{{ category.zone || "No definida" }}</div>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <div class="column is-4" v-if="selectedCategory.id">
          <div class="list-filter-title">
            <tag type="info" size="large" @click="selectedCategory = {}">
              <i class="fa fa-arrow-circle-o-left big-icon"></i>
            </tag>
            Items
          </div>
          <hr>
          <input type="search" v-model="qItem" :disabled="itemResult.length < 1" placeholder="Filtrar Items..." class="input is-medium">
          <hr>
          <ul class="list-filter" v-if="selectedCategory.id">
            <li class="list-filter-line" v-for="it in itemResult" :key="it.id" @click="getItem(it)">
              <a :disabled="status" :class="{'selected': item.id === it.id }">{{ it.name }}</a>
            </li>
          </ul>
        </div>
        <div class="column is-8">
          <div class="is-clearfix">
            <div v-if="item.id">
              <div class="list-filter-title" style="float: left">{{item.name }}</div>
              <div class="control has-addons" style="float: right">
                <a class="button is-primary" @click="incEntryQuantity" :disabled="status">
                  <span class="icon">
                    <i class="fa fa-plus"></i>
                  </span>
                </a>
                <a class="button" @click="decEntryQuantity" :disabled="status">
                  <span class="icon">
                    <i class="fa fa-minus"></i>
                  </span>
                </a>
              </div>
            </div>
            <div v-else>
              <div class="list-filter-title" style="float: left; color: #2673db">No hay Item</div>
            </div>
          </div>
          <hr>
          <ul class="list-filter" v-if="item.id">
            <li class="list-filter-line is-clearfix">
              <div class="is-pulled-left"><b>Cantidad:</b><span class="count">{{ entry.quantity }}</span></div>
              <div class="is-pulled-right"><b>Total:</b><span class="count">${{ entry.subtotal }}</span></div>
            </li>
            <li class="list-filter-line">
              <textarea class="textarea" :disabled="status" type="text" placeholder="Nota o comentario" v-model="entry.comment"></textarea>
            </li>
            <li class="list-filter-line">
              <div class="is-clearfix">
                <a class="button is-outlined is-success is-pulled-left" @click="addEntry">
                  <span class="icon"><i class="fa fa-check"></i></span>
                   Agregar
                </a>
                <a class="button is-outlined is-pulled-right" @click="resetEntry">
                  <span class="icon"><i class="fa fa-times"></i></span>
                  Cancelar
                </a>
              </div>
            </li>
          </ul>
          <div v-else><input type="search" disabled class="input is-medium" value="Seleccione una categoria e item"/></div>
          <hr>
          <div class="item-title">Pedido</div>
          <table class="table entries-list">
            <tr v-for="(entry, index) in entries" :key="index">
             <td style="width: 60%">{{ entry.item.name}} </td>
             <td style="width: 20%">${{ entry.subtotal }}</td>
             <td style="width: 20%">
                <a @click="decreaseItem(entry)">
                 <tag class="is-pulled-right is-danger">
                   <i class="fa fa-minus big-icon"></i>
                 </tag>
                </a>
                <tag class="is-pulled-right">
                  <i v-if="updating === entry.id" class="fa fa-spinner fa-spin"></i>
                  <span v-if="updating !== entry.id">{{ entry.quantity }}</span>
                </tag>
               <a @click="increaseItem(entry)">
                 <tag class="is-pulled-right is-primary">
                   <i class="fa fa-plus big-icon"></i>
                 </tag>
               </a>
             </td>
            </tr>
            <tr class="odd">
              <td><b>Total</b></td>
              <td>${{ticketTotal}}</td>
              <td>
                <tag size="medium" class="is-pulled-right">
                  {{ticketQuantity}}
                </tag>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </form>
  </modal>
</template>
<script>
  import _ from 'lodash'
  import autocomplete from '../utils/ItemsAutocomplete'
  import alert from '../../mixins/Alert'
  export default {
    name: 'TicketTactilForm',
    props: ['categories', 'items', 'status', 'entries'],
    components: { autocomplete },
    mixins: [alert],
    data () {
      return {
        updating: '',
        isShow: false,
        qItem: '',
        qCategory: '',
        selectedCategory: {},
        entry: { comment: null, subtotal: 0, code: null, quantity: 1 },
        item: { id: null, name: '', price: null, code: null, description: '' }
      }
    },
    computed: {
      itemResult () {
        if (this.qItem) {
          return this.filteredItems.filter((i) => i.name.toLowerCase().match(this.qItem.toLowerCase()))
        } else {
          return this.filteredItems
        }
      },
      catResult () {
        if (this.qCategory) {
          return this.categories.filter((i) => i.name.toLowerCase().match(this.qCategory.toLowerCase()))
        } else {
          return this.categories
        }
      },
      filteredItems () {
        return this.selectedCategory ? this.items.filter(it => it.category.id === this.selectedCategory.id) : this.items
      },
      ticketTotal () {
        return this.entries.filter((e) => {
          return !e.canceled
        }).reduce(function (total, entry) {
          return parseFloat(total) + parseFloat(entry.subtotal)
        }, 0.0)
      },
      ticketQuantity () {
        return this.entries.filter((e) => {
          return !e.canceled
        }).reduce(function (total, entry) {
          return parseFloat(total) + parseFloat(entry.quantity)
        }, 0.0)
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
        this.item = { id: null, name: '', price: null, code: null, description: '' }
      },
      resetEntry () {
        this.entry = { comment: null, subtotal: 0, quantity: 1, item: {} }
        this.item = { id: null, name: '', price: null, code: null, description: '' }
      },
      addEntry () {
        if (this.item.id) {
          this.entry.item = this.item
          this.$emit('save-entry', this.entry)
          this.resetEntry()
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
      },
      openForm () {
        this.isShow = true
      },
      decreaseItem (entry) {
        this.updating = entry.id
        this.$http.put('tickets/' + entry.ticket_id + '/entries/' + entry.id + '/cancel?item=' + entry.entry_items[0].id + '&reason=1').then(
          response => {
            _.extend(entry, response.data)
            this.$emit('reload-content')
            this.updating = ''
          },
          error => {
            console.log(error.data)
            this.updating = ''
          }
        )
      },
      increaseItem (entry) {
        this.updating = entry.id
        this.$http.put(`tickets/${entry.ticket_id}/entries/${entry.id}/increase`).then(
          response => {
            _.extend(entry, response.data)
            this.updating = ''
          },
          error => {
            console.log(error.data)
            this.updating = ''
          }
        )
      }
    }
  }
</script>

<style lang="css">
  .fullscreen .modal-card { width: 100% !important; height: 100% !important; margin: 10px !important; }
  .item-title { font-weight: 500; font-size: 24px; }
  .list-filter-title { font-weight: 500; font-size: 24px; }
  .list-filter { list-style: none; padding: 0px; margin: 0px; }
  .list-filter .list-filter-line { font-size: 17px; padding: 10px 0px; border-bottom: solid 1px #f1f1f1; }
  .list-filter .list-filter-line:last-child { border-bottom: none; }
  .list-filter .list-filter-line a { cursor: pointer; }
  .list-filter .list-filter-line .selected { color: red; }
  .list-filter .list-filter-line .count { margin-left: 10px; }
  .big-icon, .table.entries-list td { padding: 5px 0px; font-size: 18px; }
</style>
