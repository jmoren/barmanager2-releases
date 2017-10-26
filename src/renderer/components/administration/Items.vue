<template lang="html">
  <div class="">
    <b-aside :is-show="isShow" :backdrop="false" :width="600" :show-footer="false" placement="right" title="Administrar Item" @close="cancelItem">
      <div v-if="newItem.id">
        <tag type="success">Editando Item {{ newItem.id }}</tag>
      </div>
      <div v-else>
        <tag type="danger">Nuevo item</tag>
      </div>
      <br>
      <div class="control is-grouped">
        <div class="control">
          <input class="input" v-model="newItem.code" placeholder="Código" min="1" type="number" >
        </div>
        <div class="control is-expanded">
          <input type="text" class="input" v-model="newItem.name" placeholder="Nombre">
        </div>
      </div>
      <div class="control">
        <div class="control is-expanded">
          <input type="text" class="input" v-model="newItem.description" placeholder="Descripcion">
        </div>
      </div>
      <div class="control">
        <div class="control is-grouped">
          <div class="control is-expanded">
            <input type="number" :step="0.01" class="input" v-model="newItem.day_price"  placeholder="Precio dia"></input>
          </div>
          <div class="control is-expanded">
            <input type="number" :step="0.01" class="input" v-model="newItem.night_price"  placeholder="Precio noche"></input>
          </div>
        </div>
      </div>
      <div class="control">
        <div class="control is-grouped">
          <div class="control is-expanded">
            <input type="checkbox" id="checkbox" v-model="newItem.stockable">
            <label for="checkbox">Descuenta Stock</label>
          </div>
          <div class="control is-expanded" v-if="newItem.stockable">
            <input type="number" :step="0.01" class="input" v-model="newItem.stock_discount"  placeholder="% descuento"></input>
          </div>
          <div class="control is-expanded" v-if="newItem.stockable">
            <input type="number" :step="0.01" class="input" v-model="newItem.stock_amount"  placeholder="Cantidad disponible"></input>
          </div>
        </div>
      </div>
      <div class="control">
        <div class="control is-expanded">
          <span class="select is-fullwidth">
            <select v-model="newItem.category_id">
              <option value="">Seleccione categoria</option>
              <option v-for="category in categories" v-bind:value="category.id">{{ category.name }}</option>
            </select>
          </span>
        </div>
      </div>
      <div class="control">
        <div class="control is-grouped">
          <div class="control is-expanded">
            <checkbox val="true" :checked="newItem.favorite" v-model="newItem.favorite">Favorito</checkbox>
          </div>
        </div>
      </div>
      <hr>
      <div class="control">
        <button @click.prevent="saveItem" type="submit" class="button is-primary">Agregar</button>
        <button class="button is-light" @click.prevent="cancelItem">Cancelar</button>
      </div>
    </b-aside>
    <AdminRecipe :item="currentItem" @recipe-modal-closed="currentItem = {}" ></AdminRecipe>
    <h1 class="header">
      <i class="fa fa-bars fa-floated"></i>
      Items
      <div class="control has-addons is-pulled-right">
        <a @click.prevent="openForm" class="button is-light is-pulled-right">Nuevo Item</a>
      </div>
    </h1>
    <hr>
    <div class="columns">
      <div class="column is-4 control is-horizontal">
        <div class="control-label">
          <label class="label">Nombre</label>
        </div>
        <div class="control">
          <input type="text" class="input" v-model="filters.query" placeholder="Filtrar items">
        </div>
      </div>
      <div class="column is-4 control is-horizontal">
        <div class="control-label">
          <label class="label">D. Stock</label>
        </div>
        <div class="control has-addons">
          <radio-group v-model="filters.stockable">
            <radio-button val="null">-</radio-button>
            <radio-button val="true">SI</radio-button>
            <radio-button val="false">No</radio-button>
          </radio-group>
        </div>
      </div>
      <div class="control is-grouped is-horizontal column is-1">
        <div class="control is-expanded">
          <a class="button is-info" @click.prevent="fetchItems">Filtrar</a>
        </div>
        <div class="control is-expanded">
          <a class="button is-warning" @click.prevent="clearFilters">Limpiar filtros</a>
        </div>
      </div>
    </div>
    <hr>
    <table class="table">
      <thead>
        <th></th>
        <th>
          <a @click.prevent="sortBy('code')">
            Cod
            <i class="fa fa-floated fa-arrow-down" v-if="sortByField === 'code'"></i>
          </a>
        </th>
        <th>Categoria</th>
        <th><a @click.prevent="sortBy('name')">
          Nombre
          <i class="fa fa-floated fa-arrow-down" v-if="sortByField === 'name'"></i>
        </a></th>
        <th>
          <div class="columns">
            <div class="column is-6"><a @click.prevent="sortBy('day_price')">
              Precio Dia
              <i class="fa fa-floated fa-arrow-down" v-if="sortByField === 'day_price'"></i>
            </a></div>
            <div class="column is-6"><a @click.prevent="sortBy('night_price')">
              Precio Noche
              <i class="fa fa-floated fa-arrow-down" v-if="sortByField === 'night_price'"></i>
            </a></div>
          </div>
        </th>
        <th><a @click.prevent="sortBy('name')">
          Descuenta Stock
          <i class="fa fa-floated fa-arrow-down" v-if="sortByField === 'stockable'"></i>
        </a></th>
        <th>Stock</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>
            <tooltip v-bind:content="item.favorite ? 'Item favorito' : 'No esta en la lista de favoritos'">
              <i class="fa fa-floated" :class="{'fa-star is-warning': item.favorite, 'fa-star-o': !item.favorite}"></i>
            </tooltip>
            <tooltip content="Item de cocina"><tag v-if="item.category.kitchen"><i class="fa fa-floated fa-cutlery"></i></tag></tooltip>
          </td>
          <td>{{ item.code }}</td>
          <td>{{ item.category.name }}</td>
          <td>{{ item.name }}</td>
          <td>
            <div class="columns">
              <div class="column is-6"><span class="button is-fullwidth is-light">${{ item.day_price }}</span></div>
              <div class="column is-6"><span class="button is-fullwidth is-light">${{ item.night_price}}</span></div>
            </div>
          </td>
          <td>
            {{ item.stockable ? "Si" : "No"}}
          </td>
          <td>
            {{ item.stock_amount }}
          </td>
          <td>
            <div class="control has-addons">
              <a @click.prevent="removeItem(item)" class="button is-light">
                <i class="fa fa-trash"></i>
              </a>
              <a @click.prevent="setToEdit(item)" class="button is-light">
                <i class="fa fa-pencil"></i>
              </a>
              <a @click.prevent="currentItem = item" class="button is-light">
                <i class="fa fa-reorder"></i>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination layout="pager" align="left" :page-size="10" v-model="page" :total="meta.total" :change="pageChange"></pagination>
  </div>
</template>

<script>
import _ from 'lodash'
import alert from '../../mixins/Alert'
import AdminRecipe from '@/components/administration/Recipe'

export default {
  name: 'AdminItems',
  mixins: [alert],
  components: {
    AdminRecipe
  },
  data () {
    return {
      currentItem: {},
      emptyItem: {
        id: null,
        name: null,
        description: null,
        code: null,
        category_id: '',
        day_price: null,
        night_price: null,
        favorite: false,
        stock_amount: null,
        stock_discount: null,
        stockable: false
      },
      meta: {},
      filters: { query: '', stockable: 'null' },
      page: 1,
      sortByField: 'code',
      newItem: {},
      items: [],
      categories: [],
      isShow: false,
      current: {},
      originalItem: {}
    }
  },
  created () {
    this.fetchItems()
    this.fetchCategories()
  },
  methods: {
    clearFilters () {
      this.filters = { query: '', stockable: 'null' }
      this.fetchItems()
    },
    sortBy (field) {
      this.sortByField = field
      this.fetchItems()
    },
    pageChange (page) {
      this.page = page
      this.fetchItems()
    },
    fetchItems () {
      this.loading = true
      let url = 'admin/items?page=' + this.page + '&sort_by=' + this.sortByField
      if (this.filters.query && this.filters.query.length > 2) {
        url = url + '&query=' + this.filters.query
      }
      if (this.filters.stockable !== 'null') {
        url = url + '&stockable=' + this.filters.stockable
      }
      this.$http.get(url).then(
        response => {
          this.loading = false
          this.items = response.data.items
          this.meta = response.data.meta
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    fetchCategories () {
      this.$http.get('admin/categories').then(
        response => {
          this.loading = false
          this.categories = response.data
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    saveItem () {
      if (this.newItem.id) {
        this.updateItem()
      } else {
        this.createItem()
      }
    },
    openForm () {
      this.isShow = true
      this.newItem.code = this.meta.proposed
    },
    createItem () {
      this.$http.post('admin/items', { item: this.newItem }).then(
        response => {
          this.items.push(response.data)
          this.meta.proposed = this.meta.proposed + 1
          this.cancelItem()
        },
        error => {
          console.log(error.data)
          this.alert('danger', error.data, 'top-center')
        }
      )
    },
    updateItem () {
      this.$http.put('admin/items/' + this.newItem.id, { item: this.newItem }).then(
        response => {
          this.isShow = false
          _.extend(this.originalItem, response.data)
          this.cancelItem()
        },
        error => {
          this.alert('danger', error.data, 'top-center')
        }
      )
    },
    cancelItem () {
      this.isShow = false
      this.newItem = _.clone(this.emptyItem)
    },
    removeItem (item) {
      this.current = item
      this.$modal.confirm({
        title: 'Elimnar Item',
        content: 'Seguro de eliminar el item ' + item.name + '?',
        onOk: this.confirmDelete,
        okText: 'Si, eliminar',
        transition: 'zoom',
        icon: ''
      })
    },
    confirmDelete () {
      let index = this.items.indexOf(this.current)
      this.$http.delete('admin/items/' + this.current.id).then(
        response => {
          this.items.splice(index, 1)
        },
        error => {
          var promoName = error.data.promotions[0].name
          this.alert('danger', error.data.message + '. PROMO: ' + promoName)
        }
      )
    },
    setToEdit (item) {
      this.originalItem = item
      this.newItem = _.clone(item)
      this.isShow = true
    }
  }
}
</script>

<style lang="css">
  .switchery {margin-top: 3px; }
  tr:hover td .edit { display: block; }
</style>
