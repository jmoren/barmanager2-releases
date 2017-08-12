<template lang="html">
  <div id="promotions">
    <b-aside :is-show="isShow" :width="600" :backdrop="false" :show-footer="false" placement="right" title="Administrar Promocion" @close="cancelPromotion">
      <div v-if="newPromotion.id">
        <tag type="success">Editando Promotion {{ newPromotion.id }}</tag>
      </div>
      <div v-else>
        <tag type="danger">Nuevo Promotion</tag>
      </div>
      <br>
      <div class="control is-grouped">
        <div class="control is-expanded">
          <input type="text" class="input is-expanded" v-model="newPromotion.code" placeholder="Codigo">
        </div>
        <div class="control is-expanded">
          <input type="text" class="input is-expanded" v-model="newPromotion.name" placeholder="Nombre">
        </div>
      </div>
      <div class="control">
        <div class="control is-grouped">
          <div class="control is-expanded">
            <input type="number" :step="0.01" class="input is-expanded" v-model="newPromotion.day_price"  placeholder="Precio dia"></input>
          </div>
          <div class="control is-expanded">
            <input type="number" :step="0.01" class="input is-expanded" v-model="newPromotion.night_price"  placeholder="Precio noche"></input>
          </div>
        </div>
      </div>
      <div class="control">
        <h4>Adicionar items</h4>
        <div class="control has-addons" style="border-top: solid 1px #ddd; margin-top: 10px; padding: 10px 0px;">
          <input type="number" class="input" v-model="newItem.quantity" style="width:5em;" placeholder="Cant">
          <autocomplete :items="items" @set-item="setItem" :name="newItem.item.name"></autocomplete>
          <a class="button is-primary" @click.prevent="addItemToPromotion">Agregar</a>
        </div>
        <h2>Items</h2>
        <div style="border-top: solid 1px #ddd; margin-top: 10px; padding: 10px 0px;">
          <ul v-if="newItems.length > 0" id="promotion-item-rows">
          <li v-for="entry in newItems" class="item-row">
            <tag type="danger"><a @click.prevent="removeItem(entry)" style="color: #fff;"><i class="fa fa-floated fa-trash"></i></a></tag>
            <span class="button is-white is-small"><i class="fa fa-floated fa-angle-right"></i></span>
            <tag><b>{{ entry.quantity }}</b></tag>
            <tag>{{ entry.item.name }}</tag>
            <span v-if="entry.item.kitchen">
              <tooltip content="Es de cocina" placement="right">
                <tag><i class="fa fa-cutlery"></i></tag>
              </tooltip>
            </span>
          </li>
          </ul>
          <div v-else class="is-danger-text">No hay items todavia</div>
        </div>
      </div>
      <div class="controle">
        <div class="control is-grouped">
          <div class="control is-expanded">
            <checkbox val="true" :checked="!!newPromotion.favorite" v-model="newPromotion.favorite">Favorito</checkbox>
          </div>
        </div>
      </div>
      <hr>
      <div class="control">
        <button @click.prevent="savePromotion" type="submit" class="button is-primary">Guardar</button>
        <button class="button is-light" @click.prevent="cancelPromotion">Cancelar</button>
      </div>
    </b-aside>
    <h1 class="header">
      <i class="fa fa-lightbulb-o fa-floated"></i> 
      Promociones
      <div class="control has-addons is-pulled-right">
        <input type="text" class="input" v-model="query" @keyup.prevent="fetchPromotions" placeholder="Filtrar promos">
        <a @click.prevent="openForm" class="button is-light is-pulled-right">Nueva Promocion</a>
      </div>
    </h1>
    <hr>
    <table class="table">
      <thead>
        <th>Cod</th>
        <th>Nombre</th>
        <th>Items</th>
        <th>Precio Dia</th>
        <th>Precio Noche</th>
        <th>Favorito</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="promotion in promotions" :key="promotion.id">
          <td>{{ promotion.code }}</td>
          <td>{{ promotion.name }}</td>
          <td>
            <ul class="promotion-items">
              <li v-for="item in promotion.promotion_items" :key="item.id" style="margin-bottom: 10px">
                <div class="columns">
                  <div class="column is-10">
                    <tag style="font-size: 14px;" type="warning"><b>{{item.size}}</b></tag> 
                    <tag style="font-size: 14px;">{{ item.name }}</tag>
                  </div>
                  <div class="column is-2 is-pulled-right" v-if="item.kitchen">
                    <tooltip content="Es item de cocina">
                      <tag style="font-size: 14px;"><i class="fa fa-floated fa-cutlery"></i></tag>
                    </tooltip>
                  </div>
                </div>
              </li>
            </ul>
          </td>
          <td>${{ promotion.day_price }}</td>
          <td>${{ promotion.night_price}}</td>
          <td><i class="fa fa-floated" :class="{'fa-star is-warning': promotion.favorite, 'fa-star-o': !promotion.favorite}"></i></td>
          <td>
            <div class="control has-addons">
              <a @click.prevent="removePromotion(promotion)" class="button is-light">
                <i class="fa fa-trash"></i>
              </a>
              <a @click.prevent="setToEdit(promotion)" class="button is-light">
                <i class="fa fa-pencil"></i>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination layout="pager" align="left" :page-size="20" :total="meta.total" :change="fetchPromotions"></pagination>
  </div>
</template>

<script>
import _ from 'lodash'
import autocomplete from '../utils/admin/ItemsAutocomplete'
import alert from '../../mixins/Alert'
export default {
  name: 'AdminPromotions',
  components: { autocomplete },
  mixins: [alert],
  data () {
    return {
      meta: {},
      query: undefined,
      newPromotion: { name: '', promotion_items: [], day_price: null, night_price: null, favorite: false },
      newItem: { item: {}, quantity: null },
      newItems: [],
      promotions: [],
      items: [],
      isShow: false,
      originalPromotion: {}
    }
  },
  created () {
    this.fetchPromotions()
    this.fetchItems()
  },
  methods: {
    fetchPromotions () {
      let url = 'admin/promotions'
      if (this.query && this.query.length > 2) {
        url = url + '?query=' + this.query
      }
      this.$http.get(url).then(
        response => {
          this.promotions = response.data.promotions
          this.meta = response.data.meta
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    fetchItems () {
      this.loading = true
      this.$http.get('admin/items?paginate=1').then(
        response => {
          this.loading = false
          this.items = response.data
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    savePromotion () {
      if (this.newPromotion.id) {
        this.updatePromotion()
      } else {
        this.createPromotion()
      }
    },
    createPromotion () {
      let params = {
        code: this.newPromotion.code,
        name: this.newPromotion.name,
        favorite: this.newPromotion.favorite,
        day_price: this.newPromotion.day_price,
        night_price: this.newPromotion.night_price,
        items: _.map(this.newItems, function (entry) {
          let obj = { item: entry.item.id, quantity: entry.quantity }
          return obj
        })
      }

      this.$http.post('admin/promotions', { promotion: params }).then(
        response => {
          this.promotions.push(response.data)
          this.cancelPromotion()
        },
        error => {
          this.alert('danger', error.data, 'top-center')
        }
      )
    },
    updatePromotion () {
      let params = {
        code: this.newPromotion.code,
        name: this.newPromotion.name,
        favorite: this.newPromotion.favorite,
        day_price: this.newPromotion.day_price,
        night_price: this.newPromotion.night_price,
        items: _.map(this.newItems, function (entry) {
          let obj = { item: entry.item.id, quantity: entry.quantity }
          return obj
        })
      }

      this.$http.put('admin/promotions/' + this.newPromotion.id, { promotion: params }).then(
        response => {
          this.isShow = false
          _.extend(this.originalPromotion, response.data)
          this.cancelPromotion()
        },
        error => {
          this.alert('danger', error.data, 'top-center')
        }
      )
    },
    removePromotion (promotion) {
      this.current = promotion
      this.$modal.confirm({
        title: 'Elimnar Promocion',
        content: 'Seguro de eliminar promocion ' + promotion.name + ' ?',
        onOk: this.confirmDelete,
        okText: 'Si, eliminar',
        transition: 'zoom',
        icon: ''
      })
    },
    confirmDelete () {
      let index = this.promotions.indexOf(this.current)
      this.$http.delete('admin/promotions/' + this.current.id).then(
        response => {
          this.promotions.splice(index, 1)
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    setItem (item) {
      this.newItem.item = item
    },
    cancelPromotion () {
      this.isShow = false
      _.extend(this.newPromotion, this.originalPromotion)
      this.newPromotion = { name: '', promotion_items: [], day_price: null, night_price: null, favorite: false }
      this.newItems = []
      this.newItem = { item: {}, quantity: 1 }
    },
    addItemToPromotion () {
      if (!this.newItem.item) { return }

      this.newItems.push(_.extend({}, this.newItem))
      this.newItem = { item: '', quantity: null }
    },
    removeItem (entry) {
      let index = this.newItems.indexOf(entry)
      this.newItems.splice(index, 1)
    },
    openForm () {
      this.isShow = true
      if (this.promotions.length > 0) {
        this.newPromotion.code = parseInt(_.max(_.map(this.promotions, function (promo) { return promo.code }))) + 1
      }
    },
    setToEdit (promotion) {
      this.originalPromotion = promotion
      this.newPromotion = _.clone(promotion)

      this.newItems = _.map(promotion.promotion_items, function (entry) {
        let obj = { item: { id: entry.id, kitchen: entry.kitchen, name: entry.name }, quantity: entry.size }
        return obj
      })

      this.isShow = true
    }
  }
}
</script>

<style lang="css">
  #promotion-item-rows .item-row { margin-bottom: 10px; }
  .switchery {margin-top: 5px; }
</style>
