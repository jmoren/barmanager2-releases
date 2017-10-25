<template>
  <div class="autocomplete-dropdown" style="position:relative">
    <div class="control">
      <input type="text" class="input is-medium is-expanded"
         autocomplete="off"
         placeholder="Buscardor..."
         v-model="query"
         @keydown.down='down'
         @keydown.up='up'
         @keydown.enter='hit'
         @focus="focused = true"
         @keydown.esc='reset'
         @blur="reset"
         :disabled="status"/>
      <ul v-show="focused" id="queryList">
        <!-- for vue@1.0 use: ($item, item) -->
        <li class="empty-item is-danger-text" v-if="filteredItems.length === 0">
          No se encontro ningun resultado
        </li>
        <li v-for="(item, $item) in filteredItems" :key="item.id" :class="activeClass($item)" @key.enter="hit" @mousemove="setActive($item)" @mousedown.prevent="hit">
          <div class="info">
            <div>{{ item.name }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ItemAutocomplete',
    props: {
      items: { type: Array, default: [] },
      status: { type: Boolean, default: false },
      name: null
    },
    watch: {
      name () {
        this.query = this.name
      }
    },
    computed: {
      filteredItems () {
        if (this.query) {
          let regex = new RegExp(this.query.toLowerCase())
          return this.items.filter((item) => {
            return regex.test(item.code) || regex.test(item.name.toLowerCase())
          })
        } else {
          return this.items
        }
      }
    },
    data () {
      return {
        current: -1,
        focused: false,
        selected: false,
        query: this.name
      }
    },
    methods: {
      hit () {
        let index = this.filteredItems.length === 1 ? 0 : this.current
        let found = this.filteredItems[index]
        this.$emit('item-selected', found)
        this.query = found.name
        this.selected = true
        this.focused = false
      },
      reset () {
        if (!this.selected) {
          this.query = null
        }
        this.focused = false
        document.getElementById('search').blur()
      },
      up (events) {
        if (this.current > 0) {
          this.current--
        } else if (this.current === 0 && this.filteredItems.length > 2) {
          this.current = this.filteredItems.length - 1
        }

        let parent = document.getElementById('queryList')
        let children = parent.getElementsByTagName('li')
        children[this.current].scrollIntoView(false)
      },
      down (events) {
        if (this.current < this.filteredItems.length - 1) {
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
  .autocomplete-dropdown ul {
    position: absolute;
    overflow: auto;
    display: block;
    top: 45px;
    z-index: 10000;
    background: #fff;
    color: #666;
    right: 0px;
    border-radius: 4px;
    width: 100%;
    box-shadow: 0 2px 3px hsla(0,0%,4%,.1), 0 0 0 1px hsla(0,0%,4%,.1);
    height: 200px;
  }
  .autocomplete-dropdown ul li {
    display: inline-flex;
    vertical-align: top;
    align-items: center;
    padding: 5px 10px;
    margin: 5px 0px;
    width: 100%;
    display: flex;
  }
  .autocomplete-dropdown .control ul li:first-child { margin-top: 0px !important; }
  .autocomplete-dropdown .control ul li:last-child { margin-bottom: 0px !important; }
  .autocomplete-dropdown .control ul li { font-weight: 500; padding: 5px 10px; }
  .autocomplete-dropdown .control ul li.active { background: #3c81df; display: flex; }
  .autocomplete-dropdown .control ul li.empty-item:hover { background: #fff; }
  .autocomplete-dropdown .control ul li.empty-item {
    font-weight: 400;
    padding: 10px;
  }
  .autocomplete-dropdown .control ul li .indicator { float:left; color: #333; width: 10%; text-align: left; }
  .autocomplete-dropdown .control ul li.active .info { float:left; color: #fff; width: 90%; text-align: left; }
</style>
