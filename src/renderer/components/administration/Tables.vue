<template lang="html">
  <div class="">
    <modal title="Administrar Mesa" ok-text="Guardar" cancel-text="Cancelar" :on-ok="saveTable" :on-cancel="cancelTable" :width="520" :is-show="isShow" transition="zoom" @close="cancelTable">
      <div class="control">
        <div class="control"><input type="text" class="input" placeholder="Descripcion" v-model="newTable.description"></div>
        <div class="control">
          <div class="select">
            <select v-model="newTable.color">
              <option value=''>Seleccione color</option>
              <option v-for="color in colors" v-bind:value="color.value">{{ color.title }}</option>
            </select>
          </div>
        </div>
      </div>
    </modal>
    <h1 class="header">
      <i class="fa fa-address-book-o fa-floated"></i> 
      Mesas
      <a @click.prevent="isShow=true" class="is-pulled-right button is-light">Nueva Mesa</a>
    </h1>
    <hr>
    <data-table :data="filteredTables">
      <table-toolbar>
        <template slot="right">
          <div class="level-item">
            <p class="control has-addons">
              <input class="input" type="text" v-model="query" placeholder="Filtrar mesas">
              <button class="button">Filtrar</button>
            </p>
          </div>
        </template>
      </table-toolbar>
      <column label="ID" field="id" sorter="custom">
        <template scope="row">
          <router-link :to="{ name: 'AdminTable', params: { id: row.id } }"># {{ row.id }}</router-link>
        </template>
      </column>
      <column label="Color" field="color" sorter="custom">
        <template scope="row">
          <i class="fa fa-circle" :class="row.color"></i>
        </template>
      </column>
      <column label="Descripcion" field="description" sorter="custom"></column>
      <column label="">
        <template scope="row">
          <div class="control has-addons">
            <a @click.prevent="removeTable(row)" class="button is-light">
               <span class="icon is-small"><i class="fa fa-trash"></i></span>
            </a>
            <a @click.prevent="setToEdit(row)" class="button is-light">
               <span class="icon is-small"><i class="fa fa-pencil"></i></span>
            </a>
          </div>
        </template>
      </column>
    </data-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import alert from '../../mixins/Alert'
export default {
  name: 'AdminTables',
  mixins: [alert],
  data () {
    return {
      query: '',
      newTable: { name: '', phone: '', address: '' },
      originalTable: { id: null, name: '', phone: '', address: '' },
      isShow: false,
      colors: [{value: 'is-success', title: 'Verde'}, {value: 'is-danger', title: 'Rojo'}, {value: 'is-warning', title: 'Amarillo'}]
    }
  },
  computed: {
    ...mapGetters({
      tables: 'allTables'
    }),
    filteredTables () {
      if (this.query) {
        let regex = new RegExp(this.query.toLowerCase())
        return this.tables.filter((table) => {
          return regex.test(table.description.toLowerCase())
        })
      } else {
        return this.tables
      }
    }
  },
  methods: {
    saveTable () {
      if (this.newTable.id) {
        this.updateTable()
      } else {
        this.createTable()
      }
    },
    createTable () {
      this.$http.post('admin/tables', { table: this.newTable }).then(
        (response) => {
          this.$store.dispatch('addTable', response.data)
          this.cancelTable()
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    updateTable () {
      let params = {
        color: this.newTable.color,
        description: this.newTable.description
      }

      this.$http.put('admin/tables/' + this.newTable.id, { table: params }).then(
        (response) => {
          this.$store.dispatch('updateTable', response.data)
          this.cancelTable()
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    removeTable (table) {
      this.$http.delete('admin/tables/' + table.id).then(
        () => {
          this.$store.dispatch('deleteTable', table)
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    cancelTable () {
      this.isShow = false
      _.extend(this.newTable, this.originalTable)
      this.newTable = { name: '', phone: '', address: '' }
    },
    setToEdit (table) {
      this.originalTable = table
      this.newTable = _.clone(table)
      this.isShow = true
    }
  }
}
</script>

<style lang="css">
</style>
