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
      <a @click.prevent="isShow=true" class="is-pulled-right button is-light">Nuevo proveedor</a>
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
  name: 'AdminSuppliers',
  mixins: [alert],
  data () {
    return {
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
    fetchSuppliers () {
      this.$http.get('admin/suppliers').then(
        response => {
          this.suppliers = response.data
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
