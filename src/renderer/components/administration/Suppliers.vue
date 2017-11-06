<template lang="html">
  <div class="">
    <modal title="Administrar Proveedor" ok-text="Guardar" cancel-text="Cancelar" :on-ok="saveSupplier" :on-cancel="cancelSupplier" :width="520" :is-show="isShow" transition="zoom" @close="cancelSupplier">
      <div class="control">
        <div class="control"><input type="text" class="input" placeholder="Nombre" v-model="newSupplier.name"></div>
        <div class="control"><input type="text" class="input" placeholder="Telefono" v-model="newSupplier.phone"></div>
        <div class="control"><input type="text" class="input" placeholder="Direccion" v-model="newSupplier.address"></div>
      </div>
    </modal>
    <h1 class="header">
      <i class="fa fa-address-book-o fa-floated"></i>
      Proveedores
      <div class="control has-addons is-pulled-right">
        <input type="text" class="input" v-model="query" @keyup.prevent="reloadSuppliers" placeholder="Filtrar proveedores">
        <a @click.prevent="isShow=true" class="is-pulled-right button is-light">Nuevo proveedor</a>
      </div>
    </h1>
    <hr>
    <table class="table">
      <thead>
        <th>Nombre</th>
        <th>Telefono</th>
        <th>Direccion</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="supplier in suppliers" :key="supplier.id">
          <td>{{ supplier.name }}</td>
          <td>{{ supplier.phone }}</td>
          <td>{{ supplier.address }}</td>
          <td>
            <div class="control has-addons">
              <a @click.prevent="removeSupplier(supplier)" class="button is-light">
                 <span class="icon is-small"><i class="fa fa-trash"></i></span>
              </a>
              <a @click.prevent="setToEdit(supplier)" class="button is-light">
                 <span class="icon is-small"><i class="fa fa-pencil"></i></span>
              </a>
              <router-link class="button is-light" :to="{ name: 'Supplier', params: { id: supplier.id } }">Ver Detalles</router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination layout="pager" align="left" :page-size="12" v-model="page" :total="meta.total" :change="pageChange"></pagination>
  </div>
</template>

<script>
import _ from 'lodash'
import alert from '../../mixins/Alert'

export default {
  name: 'AdminSuppliers',
  mixins: [alert],
  data () {
    return {
      query: '',
      page: 1,
      meta: {},
      newSupplier: { name: '', phone: '', address: '' },
      originalSupplier: { id: null, name: '', phone: '', address: '' },
      suppliers: [],
      isShow: false
    }
  },
  created () {
    this.fetchSuppliers()
  },
  methods: {
    reloadSuppliers () {
      this.page = 1
      let isEmpty = this.query.length === 0
      if (isEmpty) {
        this.fetchSuppliers()
      } else if (!isEmpty && this.query.length > 2) {
        this.fetchSuppliers()
      }
    },
    pageChange (page) {
      this.page = page
      this.fetchSuppliers()
    },
    fetchSuppliers () {
      let url = 'admin/suppliers?page=' + this.page
      if (this.query && this.query.length > 2) {
        url = url + '&query=' + this.query
      }
      this.$http.get(url).then(
        response => {
          this.suppliers = response.data.suppliers
          this.meta = response.data.meta
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    saveSupplier () {
      if (this.newSupplier.id) {
        this.updateSupplier()
      } else {
        this.createSupplier()
      }
    },
    createSupplier () {
      this.$http.post('admin/suppliers', { supplier: this.newSupplier }).then(
        (response) => {
          this.suppliers.push(response.data)
          this.cancelSupplier()
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    updateSupplier () {
      let params = {
        name: this.newSupplier.name,
        phone: this.newSupplier.phone,
        address: this.newSupplier.address
      }

      this.$http.put('admin/suppliers/' + this.newSupplier.id, { supplier: params }).then(
        (response) => {
          _.extend(this.originalSupplier, response.data)
          this.cancelSupplier()
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    removeSupplier (supplier) {
      this.$http.delete('admin/suppliers/' + supplier.id).then(
        () => {
          let index = this.suppliers.indexOf(supplier)
          this.suppliers.splice(index, 1)
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    cancelSupplier () {
      this.isShow = false
      _.extend(this.newSupplier, this.originalSupplier)
      this.newSupplier = { name: '', phone: '', address: '' }
    },
    setToEdit (supplier) {
      this.originalSupplier = supplier
      this.newSupplier = _.clone(supplier)
      this.isShow = true
    }
  }
}
</script>

<style lang="css">
</style>
