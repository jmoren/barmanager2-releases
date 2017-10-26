<template lang="html">
  <modal title="Administrar Receta" ok-text="Guardar" cancel-text="Cancelar" :on-ok="saveRecipe" :on-cancel="cancelRecipe"  :width="520" :is-show="isShow" transition="zoom" @close="currentItem = {}">
    <div id="recipes" class="box">
      <div v-if="recipe.id">
        <tag type="success">Editando Receta de {{ item.name }}</tag>
        <a @click.prevent="removeRecipe" class="is-danger button is-small">
          <span class="is-small icon">
            <i class="fa fa-trash"></i>
          </span>
          <span>
            Eliminar receta
          </span>
        </a>
      </div>
      <div v-else>
        <tag type="danger">Creando receta para {{item.name}}</tag>
      </div>
      <br>
      <div class="control">
        <h4>Adicionar Materia prima</h4>
        <div class="control has-addons" style="border-top: solid 1px #ddd; margin-top: 10px; padding: 10px 0px;">
          <input type="number" class="input" v-model="materialEntry.quantity" style="width:5em;" placeholder="Cant">
          <autocomplete :items="materials" @set-item="setMaterialEntry" :name="materialEntry.material.name"></autocomplete>
          <a class="button is-primary" @click.prevent="addMaterialToRecipe">Agregar</a>
        </div>
        <h2>Materias primas</h2>
        <div style="border-top: solid 1px #ddd; margin-top: 10px; padding: 10px 0px;">
          <ul v-if="materialsEntries.length > 0" id="recipe-item-rows">
            <li v-for="entry in materialsEntries" class="item-row">
              <tag type="danger"><a @click.prevent="removeEntry(entry)" style="color: #fff;"><i class="fa fa-floated fa-trash"></i></a></tag>
              <span class="button is-white is-small"><i class="fa fa-floated fa-angle-right"></i></span>
              <tag><b>{{ entry.quantity }}</b></tag>
              <tag>{{ entry.material.name }}</tag>
            </li>
          </ul>
          <div v-else class="is-danger-text">No hay materia prima agregada todavia</div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import _ from 'lodash'
import autocomplete from '../utils/admin/ItemsAutocomplete'
import alert from '../../mixins/Alert'
export default {
  name: 'AdminRecipe',
  components: { autocomplete },
  props: ['item'],
  mixins: [alert],
  data () {
    return {
      isShow: false,
      recipe: { id: '', materials: [] },
      materialEntry: { material: {}, quantity: 0 },
      materialsEntries: [],
      showForm: false,
      materials: []
    }
  },
  created () {
    this.fetchMaterials()
  },
  watch: {
    'item': 'fetchRecipe'
  },
  methods: {
    fetchRecipe () {
      if (this.item.id) {
        let url = 'admin/items/' + this.item.id + '/recipe'
        this.$http.get(url).then(
          response => {
            this.recipe = response.data
            this.materialsEntries = this.recipe.materials.map((m) => { return { material: _.find(this.materials, (mat) => { return mat.id === m.id }), quantity: m.quantity } })
            this.isShow = true
          },
          error => {
            this.alert('danger', error.data)
          }
        )
      }
    },
    fetchMaterials () {
      this.loading = true
      this.$http.get('admin/materials').then(
        response => {
          this.materials = response.data.materials
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    saveRecipe () {
      if (this.recipe.id) {
        this.updateRecipe()
      } else {
        this.createRecipe()
      }
    },
    createRecipe () {
      let params = {
        materials: _.map(this.materialsEntries, function (entry) {
          let obj = { id: entry.material.id, quantity: entry.quantity }
          return obj
        })
      }

      this.$http.post('admin/items/' + this.item.id + '/recipes', { recipe: params }).then(
        response => {
          this.recipe = response.data
          this.cancelRecipe()
        },
        error => {
          this.alert('danger', error.data, 'top-center')
        }
      )
    },
    updateRecipe () {
      let params = {
        materials: _.map(this.materialsEntries, function (entry) {
          let obj = { id: entry.material.id, quantity: entry.quantity }
          return obj
        })
      }

      this.$http.put('admin/items/' + this.item.id + '/recipes/' + this.recipe.id, { recipe: params }).then(
        response => {
          this.isShow = false
          _.extend(this.recipe, response.data)
          this.cancelRecipe()
        },
        error => {
          this.alert('danger', error.data, 'top-center')
        }
      )
    },
    removeRecipe (recipe) {
      this.current = recipe
      this.$modal.confirm({
        title: 'Elimnar Receta',
        content: 'Seguro de eliminar receta ' + this.item.name + ' ?',
        onOk: this.confirmDelete,
        okText: 'Si, eliminar',
        transition: 'zoom',
        icon: ''
      })
    },
    confirmDelete () {
      this.$http.delete('admin/items/' + this.item.id + '/recipes/' + this.recipe.id).then(
        () => { this.cancelRecipe() },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    setMaterialEntry (material) {
      this.materialEntry.material = material
    },
    cancelRecipe () {
      this.recipe = { id: null, materials: [] }
      this.materialsEntries = []
      this.materialEntry = { material: {}, quantity: 0 }
      this.isShow = false
      this.$emit('recipe-modal-closed')
    },
    addMaterialToRecipe () {
      if (!this.materialEntry.material) { return }

      this.materialsEntries.push(_.extend({}, this.materialEntry))
      this.materialEntry = { material: {}, quantity: null }
    },
    removeEntry (entry) {
      let index = this.materialsEntries.indexOf(entry)
      this.materialsEntries.splice(index, 1)
    }
  }
}
</script>

<style lang="css">
  #recipe-item-rows .item-row { margin-bottom: 10px; }
  .switchery {margin-top: 5px; }
</style>
