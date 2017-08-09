<template>
  <div class="autocomplete-dropdown" style="position:relative">
    <div class="control">
      <input type="search" class="input is-expanded" id="search"
         autocomplete="off"
         placeholder="Buscardor..." 
         v-model="query"
         @keydown.down='down'
         @keydown.up='up'
         @keydown.enter='hit'
         @focus="focused = true"
         @keydown.esc='reset'
         @blur="reset"
         v-shortkey="['ctrl', 's']"
         @shortkey="setFocus"/>
      <ul v-show="focused" id="queryList">
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
          <div class="info">
            <div>Mesa {{ item.id }} - {{ item.description }}</div>
            <small>{{ item.closed ? 'Cerrada' : 'Abierta: Ticket ' + item.current.number }}</small>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TableAutocomplete',
    props: {
      tables: {
        type: Array,
        default: []
      },
      action: {
        type: String,
        default: 'open'
      }
    },
    computed: {
      filteredTables () {
        if (this.query) {
          let regex = new RegExp(this.query.toLowerCase())
          return this.tables.filter((table) => {
            return regex.test(table.id) || regex.test(table.description.toLowerCase())
          })
        } else {
          return this.tables
        }
      }
    },
    data () {
      return {
        query: null,
        current: -1,
        focused: false
      }
    },
    methods: {
      hit () {
        let index = this.filteredTables.length === 1 ? 0 : this.current
        let item = this.filteredTables[index]

        if (this.action === 'assign') {
          this.$emit('set-table', item)
          this.focused = false
          this.query = item.id + ' ' + item.description
        } else {
          if (!item.closed && item.current.id) {
            this.$router.push({ name: 'Ticket', params: { id: item.current.id } })
            this.reset()
          } else {
            this.$http.post('tables/' + item.id + '/open').then(
              response => {
                this.$store.dispatch('updateTable', response.data)
                this.$router.push({ name: 'Ticket', params: { id: response.data.current.id } })
                this.reset()
              },
              error => {
                this.$notify.open({
                  type: 'Danger',
                  title: 'Error',
                  content: error.data
                })
              }
            )
          }
        }
      },
      reset () {
        this.query = null
        this.focused = false
        document.getElementById('search').blur()
      },
      up (events) {
        if (this.current > 0) {
          this.current--
        } else if (this.current === 0 && this.filteredTables.length > 2) {
          this.current = this.filteredTables.length - 1
        }

        let parent = document.getElementById('queryList')
        let children = parent.getElementsByTagName('li')
        children[this.current].scrollIntoView(false)
      },
      down (events) {
        if (this.current < this.filteredTables.length - 1) {
          this.current++
        } else {
          this.current = 0
        }
        let parent = document.getElementById('queryList')
        let children = parent.getElementsByTagName('li')
        children[this.current].scrollIntoView(false)
      },
      setFocus () {
        document.getElementById('search').focus()
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
  input[type=search] { border-radius: 4px; }
  .autocomplete-dropdown ul {
    position: absolute;
    max-height: 300;
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
  .autocomplete-dropdown .control input:focus { background: #f5f5f5; }
  .autocomplete-dropdown .control ul li:first-child { margin-top: 0px !important; }
  .autocomplete-dropdown .control ul li:last-child { margin-bottom: 0px !important; }
  .autocomplete-dropdown .control ul li.active {
    background: #f5f5f5
  }
  .autocomplete-dropdown .control ul li.empty-item:hover { background: #fff; }
  .autocomplete-dropdown .control ul li.empty-item {
    font-weight: 400;
    padding: 10px;
  }
  .autocomplete-dropdown .control ul li .indicator { float:left; width: 10%; text-align: left; }
  .autocomplete-dropdown .control ul li .info { float:left; color: #333; width: 90%; text-align: left; }
</style>
