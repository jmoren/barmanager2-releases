<template lang="html">
  <div class="">
    <modal title="Administrar Categoria" ok-text="Guardar" cancel-text="Cancelar" :on-ok="saveCategory" :on-cancel="cancelCategory" :width="520" :is-show="isShow" transition="zoom" @close="cancelCategory">
      <div class="control">
        <input type="text" class="input" v-model="newCategory.name" placeholder="Categoria">
      </div>
      <div class="control is-expanded">
        <checkbox val="true" :checked="newCategory.kitchen" v-model="newCategory.kitchen">Es de cocina?</checkbox>
      </div>
    </modal>
    <h1 class="header">
      <i class="fa fa-paperclip fa-floated"></i> 
      Categorias
      <a @click="isShow=true" class="is-pulled-right button is-light">Nueva Categoria</a>
    </h1>
    <hr>
    <table class="table">
      <thead>
        <th>Nombre</th>
        <th>Para Cocina</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.name }}</td>
          <td><tag v-if="category.kitchen"><i class="fa fa-floated fa-cutlery"></i></tag></td>
          <td>
            <div class="control has-addons">
              <a @click.prevent="removeCategory(category)" class="button is-light">
                <i class="fa fa-trash"></i>
              </a>
              <a @click.prevent="setToEdit(category)" class="button is-light">
                <i class="fa fa-pencil"></i>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import _ from 'lodash'
import alert from '../../mixins/Alert'
export default {
  name: 'AdminCategories',
  mixins: [alert],
  data () {
    return {
      newCategory: { name: '', kitchen: false },
      originalCategory: { id: null, name: '', kitchen: false },
      categories: [],
      isShow: false
    }
  },
  created () {
    this.fetchCategories()
  },
  methods: {
    fetchCategories () {
      this.$http.get('admin/categories').then(
        response => {
          this.categories = response.data
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    saveCategory () {
      if (this.newCategory.id) {
        this.updateCategory()
      } else {
        this.createCategory()
      }
    },
    createCategory () {
      this.$http.post('admin/categories', { category: this.newCategory }).then(
        response => {
          this.categories.push(response.data)
          this.newCategory = { name: '', kitchen: false }
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    updateCategory () {
      let params = { name: this.newCategory.name, kitchen: this.newCategory.kitchen }
      this.$http.put('admin/categories/' + this.newCategory.id, { category: params }).then(
        response => {
          _.extend(this.originalCategory, response.data)
          this.cancelCategory()
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    removeCategory (category) {
      this.$http.delete('admin/categories/' + category.id).then(
        () => {
          let index = this.categories.indexOf(category)
          this.categories.splice(index, 1)
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    cancelCategory () {
      this.isShow = false
      _.extend(this.newCategory, this.originalCategory)
      this.newCategory = { name: '', kitchen: false }
    },
    setToEdit (category) {
      this.originalCategory = category
      this.newCategory = _.clone(category)
      this.isShow = true
    }
  }
}
</script>

<style lang="css">

</style>
