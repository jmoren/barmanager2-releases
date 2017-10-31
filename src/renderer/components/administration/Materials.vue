<template lang="html">
  <div class="">
    <b-aside :is-show="isShow" :backdrop="false" :width="600" :show-footer="false" placement="right" title="Administrar Materias primas" @close="cancelMaterial">
      <div v-if="newMaterial.id">
        <tag type="success">Editando Materia prima {{ newMaterial.id }}</tag>
      </div>
      <div v-else>
        <tag type="danger">Nueva Materia prima</tag>
      </div>
      <br>
      <div class="control is-grouped">
        <div class="control is-expanded">
          <input type="text" class="input" v-model="newMaterial.name" placeholder="Nombre">
        </div>
      </div>
      <div class="control">
        <div class="control is-expanded">
          <span class="select is-fullwidth">
            <select v-model="newMaterial.mesuring_unit">
              <option value="" disabled selected>Unidad de medida</option>
              <option v-for="(k,v) in units" :key="v" :value="v">{{k}}</option>
            </select>
          </span>
        </div>
      </div>
      <div class="control">
        <div class="control is-grouped">
          <div class="control is-expanded">
            <input type="checkbox" id="checkbox" v-model="newMaterial.stockable">
            <label for="checkbox">Descuenta Stock</label>
          </div>
          <div class="control is-expanded" v-if="newMaterial.stockable">
            <input type="number" :step="0.01" class="input" v-model="newMaterial.stock_discount"  placeholder="% descuento"></input>
          </div>
          <div class="control is-expanded" v-if="newMaterial.stockable">
            <input type="number" :step="0.01" class="input" v-model="newMaterial.stock_amount"  placeholder="Cantidad disponible"></input>
          </div>
        </div>
      </div>
      <hr>
      <div class="control">
        <button @click.prevent="saveMaterial" type="submit" class="button is-primary">Agregar</button>
        <button class="button is-light" @click.prevent="cancelMaterial">Cancelar</button>
      </div>
    </b-aside>
    <h1 class="header">
      <i class="fa fa-bars fa-floated"></i>
      Materias primas
      <div class="control has-addons is-pulled-right">
        <a @click.prevent="openForm" class="button is-light is-pulled-right">Nueva Materia prima</a>
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
          <a class="button is-info" @click.prevent="fetchMaterials">Filtrar</a>
        </div>
        <div class="control is-expanded">
          <a class="button is-warning" @click.prevent="clearFilters">Limpiar filtros</a>
        </div>
      </div>
    </div>
    <hr>
    <table class="table">
      <thead>
        <th><a @click.prevent="sortBy('name')">
          Nombre
          <i class="fa fa-floated fa-arrow-down" v-if="sortByField === 'name'"></i>
        </a></th>
        <th>U. Medida</th>
        <th><a @click.prevent="sortBy('stockable')">
          Descuenta Stock
          <i class="fa fa-floated fa-arrow-down" v-if="sortByField === 'stockable'"></i>
        </a></th>
        <th>Stock</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="material in materials" :key="material.id">
          <td>{{ material.name }}</td>
          <td>{{ units[material.mesuring_unit] }}</td>
          <td>
            {{ material.stockable ? "Si" : "No"}}
          </td>
          <td>
            <span>{{ material.stock_amount }}</span>
          </td>
          <td>
            <div class="control has-addons">
              <a @click.prevent="removeMaterial(material)" class="button is-light">
                <i class="fa fa-trash"></i>
              </a>
              <a @click.prevent="setToEdit(material)" class="button is-light">
                <i class="fa fa-pencil"></i>
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
import { mapGetters } from 'vuex'

export default {
  name: 'AdminMaterials',
  mixins: [alert],
  computed: {
    ...mapGetters({
      units: 'allUnits'
    })
  },
  data () {
    return {
      emptyMaterial: {
        id: null,
        name: null,
        stock_amount: null,
        stock_discount: null,
        stockable: false,
        mesuring_unit: ''
      },
      meta: {},
      filters: { query: '', stockable: 'null' },
      page: 1,
      sortByField: 'name',
      newMaterial: {},
      materials: [],
      isShow: false,
      current: {},
      originalMaterial: {}
    }
  },
  created () {
    this.fetchMaterials()
  },
  methods: {
    clearFilters () {
      this.filters = { query: '', stockable: 'null' }
      this.fetchMaterials()
    },
    sortBy (field) {
      this.sortByField = field
      this.fetchMaterials()
    },
    pageChange (page) {
      this.page = page
      this.fetchMaterials()
    },
    fetchMaterials () {
      this.loading = true
      let url = 'admin/materials?page=' + this.page + '&sort_by=' + this.sortByField
      if (this.filters.query && this.filters.query.length > 2) {
        url = url + '&query=' + this.filters.query
      }
      if (this.filters.stockable !== 'null') {
        url = url + '&stockable=' + this.filters.stockable
      }
      this.$http.get(url).then(
        response => {
          this.loading = false
          this.materials = response.data.materials
          this.meta = response.data.meta
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    saveMaterial () {
      if (this.newMaterial.id) {
        this.updateMaterial()
      } else {
        this.createMaterial()
      }
    },
    openForm () {
      this.isShow = true
      this.newMaterial.code = this.meta.proposed
    },
    createMaterial () {
      this.$http.post('admin/materials', { material: this.newMaterial }).then(
        response => {
          this.materials.push(response.data)
          this.cancelMaterial()
        },
        error => {
          console.log(error.data)
          this.alert('danger', error.data, 'top-center')
        }
      )
    },
    updateMaterial () {
      this.$http.put('admin/materials/' + this.newMaterial.id, { material: this.newMaterial }).then(
        response => {
          this.isShow = false
          _.extend(this.originalItem, response.data)
          this.cancelMaterial()
        },
        error => {
          this.alert('danger', error.data, 'top-center')
        }
      )
    },
    cancelMaterial () {
      this.isShow = false
      this.newMaterial = _.clone(this.emptyMaterial)
    },
    removeMaterial (materia) {
      this.current = materia
      this.$modal.confirm({
        title: 'Elimnar Materia Prima',
        content: 'Seguro de eliminar la materia prima: ' + materia.name + '?',
        onOk: this.confirmDelete,
        okText: 'Si, eliminar',
        transition: 'zoom',
        icon: ''
      })
    },
    confirmDelete () {
      let index = this.materials.indexOf(this.current)
      this.$http.delete('admin/materials/' + this.current.id).then(
        response => {
          this.materials.splice(index, 1)
        },
        error => {
          var name = error.data.materials[0].name
          this.alert('danger', error.data.message + '. RECETAS: ' + name)
        }
      )
    },
    setToEdit (material) {
      this.originalItem = material
      this.newMaterial = _.clone(material)
      this.isShow = true
    }
  }
}
</script>

<style lang="css">
  .switchery {margin-top: 3px; }
  tr:hover td .edit { display: block; }
</style>
