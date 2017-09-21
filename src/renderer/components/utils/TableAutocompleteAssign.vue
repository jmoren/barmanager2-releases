<template>
  <div class="autocomplete-dropdown" style="position:relative; width: 100%;">
    <div class="control has-addons">
      <input type="search" class="input" id="assign-input"
         :class="{'is-disabled': ticket.closed }"
         autocomplete="off"
         placeholder="Asignar Mesa..."
         v-model="query"
         @keydown.down.prevent='down'
         @keydown.up.prevent='up'
         @keydown.enter.prevent='hit'
         @keydown.esc.prevent='setBlur'
         @focus="setFocus"
         v-shortkey="['ctrl', 'm']"
         @shortkey="setFocus"
         @blur="setBlur"/>
      <a class="button is-primary" :class="{'is-disabled': !ticket.table_id }" @click.prevent="removeTable">
        <i class="fa fa-times"></i>
      </a>
    </div>
    <ul v-show="focused" id="assignTableList">
      <!-- for vue@1.0 use: ($item, item) -->
      <li class="empty-item is-danger-text" v-if="filteredTables.length === 0">
        No se encontro ningun resultado
      </li>
      <li v-for="(item, $item) in filteredTables" :key="item.id" :class="activeClass($item)" @key.enter="hit" @mousemove="setActive($item)" @mousedown.prevent="hit">
        <div class="indicator">
          <span class="icon is-small">
            <i class="fa fa-circle" :class="{'is-danger-text': item.closed, 'is-success-text': !item.closed }"></i>
          </span>
        </div>
        <div class="info" :class="item.color">
          <div>{{ item.description }}</div>
          <small>{{ item.closed ? 'Cerrada' : 'Abierta: Ticket ' + item.current.number }}</small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue'
  import _ from 'lodash'
  export default {
    name: 'TableAutocomplete',
    props: ['ticket', 'tables'],
    computed: {
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
    data () {
      return {
        current: -1,
        focused: false,
        previousSelection: '',
        query: this.ticket.table ? this.ticket.table.description : ''
      }
    },
    methods: {
      hit () {
        let index = this.filteredTables.length === 1 ? 0 : this.current
        let item = _.clone(this.filteredTables[index])
        this.$emit('set-table', item)
        this.focused = false
        this.query = item.description
        Vue.nextTick(() => {
          document.getElementById('assign-input').blur()
        })
      },
      removeTable () {
        this.$emit('remove-table')
        this.focused = false
        this.query = ''
      },
      up (events) {
        if (this.current > 0) {
          this.current--
        } else if (this.current === 0 && this.filteredTables.length > 2) {
          this.current = this.filteredTables.length - 1
        }

        let parent = document.getElementById('assignTableList')
        let children = parent.getElementsByTagName('li')
        children[this.current].scrollIntoView(false)
      },
      down (events) {
        if (this.current < this.filteredTables.length - 1) {
          this.current++
        } else {
          this.current = 0
        }
        let parent = document.getElementById('assignTableList')
        let children = parent.getElementsByTagName('li')
        children[this.current].scrollIntoView(false)
      },
      setFocus () {
        this.previousSelection = this.query
        this.query = ''
        this.focused = true
        document.getElementById('assign-input').focus()
      },
      setBlur () {
        if (this.query.trim() === '') {
          this.query = this.previousSelection
        }
        this.focused = false
      },
      setActive (index) {
        this.current = index
      },
      activeClass (index) {
        return {
          active: this.current === index
        }
      }
    }
  }
</script>

<style scoped>
  input { border-radius: 4px; }
  .autocomplete-dropdown ul {
    position: absolute;
    min-height: 10px;
    max-height: 600px;
    overflow: auto;
    top: 35px;
    z-index: 1000;
    background: #fff;
    color: #666;
    right: 0px;
    border-radius: 4px;
    width: 100%;
    box-shadow: 0 2px 3px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1);
  }
  .autocomplete-dropdown ul li {
    display: inline-flex;
    vertical-align: top;
    align-items: center;
    padding: 5px 10px;
    margin: 5px 0px;
    width: 100%;
  }
  .autocomplete-dropdown .control input { width: 300px; }
  .autocomplete-dropdown .control input:focus { background: #fff; }
  .autocomplete-dropdown ul li:first-child { margin-top: 0px !important; }
  .autocomplete-dropdown ul li:last-child { margin-bottom: 0px !important; }
  .autocomplete-dropdown ul li.active { background: #3c81df; color: #fff; }
  .autocomplete-dropdown ul li.empty-item:hover { background: #fff; }
  .autocomplete-dropdown ul li.empty-item {
    font-weight: 400;
    padding: 10px;
  }
  .autocomplete-dropdown ul li .indicator { float:left; width: 10%; text-align: left; }
  .autocomplete-dropdown ul li .info { float:left; font-weight: 500; color: #333; width: 90%; padding: 5px 10px; text-align: left; }
  .autocomplete-dropdown ul li.active .info { color: #fff;}
</style>
