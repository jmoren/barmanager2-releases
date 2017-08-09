<template>
  <div class="autocomplete-dropdown" style="position:relative">
    <div class="control">
      <input type="search" class="input is-expanded"
         autocomplete="off"
         placeholder="Buscardor..." 
         v-model="query"
         @keydown.down='down'
         @keydown.up='up'
         @keydown.enter='hit'
         @focus="focused = true"
         @keydown.esc='reset'
         @blur="reset"/>
      <ul v-show="focused" id="queryList">
        <!-- for vue@1.0 use: ($item, item) -->
        <li class="empty-item is-danger-text" v-if="filteredSuppliers.length === 0">
          No se encontro ningun resultado
        </li>
        <li v-for="(supplier, $supplier) in filteredSuppliers" :key="supplier.id" :class="activeClass($supplier)" @key.enter="hit" @mousemove="setActive($supplier)" @mousedown.prevent="hit">
          <div class="info">
            <div>{{ supplier.name }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AdminSuppliersAutocomplete',
    props: {
      suppliers: {
        type: Array,
        default: []
      }
    },
    computed: {
      filteredSuppliers () {
        if (this.query) {
          let regex = new RegExp(this.query.toLowerCase())
          return this.suppliers.filter((item) => {
            return regex.test(item.code) || regex.test(item.name.toLowerCase())
          })
        } else {
          return this.suppliers
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
        let index = this.filteredSuppliers.length === 1 ? 0 : this.current
        let found = this.filteredSuppliers[index]
        this.query = found.name
        this.selected = true
        this.$emit('supplier-selected', found)
      },
      reset () {
        if (!this.selected) {
          this.query = null
        }
        this.focused = false
      },
      up (events) {
        if (this.current > 0) {
          this.current--
        } else if (this.current === 0 && this.filteredSuppliers.length > 2) {
          this.current = this.filteredSuppliers.length - 1
        }

        let parent = document.getElementById('queryList')
        let children = parent.getElementsByTagName('li')
        children[this.current].scrollIntoView(false)
      },
      down (events) {
        if (this.current < this.filteredSuppliers.length - 1) {
          this.current++
        } else {
          this.current = 0
        }
        let parent = document.getElementById('queryList')
        let children = parent.getElementsByTagName('li')
        children[this.current].scrollIntoView(false)
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
