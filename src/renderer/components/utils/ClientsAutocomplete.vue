<template>
  <div class="autocomplete-dropdown" style="position:relative">
    <div class="control">
      <input type="search" class="input is-expanded" id="search-clients"
         autocomplete="off"
         placeholder="Filtrar..." 
         v-model="item.name"
         @keydown.down='down'
         @keydown.up='up'
         @keydown.enter='hit'
         @focus="focused = true"
         @keydown.esc='reset'/>

      <ul v-show="focused" id="queryListClient">
        <li class="empty-item is-danger-text" v-if="filteredClients.length === 0">
          No se encontro ningun resultado
        </li>
        <li v-for="(item, $item) in filteredClients" :key="item.id" :class="activeClass($item)" @mousemove="setActive($item)" @click.prevent="hit">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: 'ClientsAutocomplete',
    props: [ 'clients', 'model' ],
    computed: {
      filteredClients () {
        if (this.clients) {
          if (this.item.name) {
            let regex = new RegExp(this.item.name.toLowerCase())
            return this.clients.filter((client) => {
              return regex.test(client.name.toLowerCase())
            })
          } else {
            return this.clients
          }
        } else {
          return []
        }
      }
    },
    data () {
      return {
        query: null,
        current: -1,
        focused: false,
        item: { name: null }
      }
    },
    methods: {
      hit () {
        let index = this.filteredClients.length === 1 ? 0 : this.current
        this.item = _.clone(this.filteredClients[index])
        this.$emit('set-client', this.item)
        this.focused = false
        document.getElementById('search-clients').blur()
      },
      reset () {
        this.query = null
        this.focused = false
        document.getElementById('search-clients').blur()
      },
      up (events) {
        if (this.current > 0) {
          this.current--
        } else if (this.current === 0 && this.filteredClients.length > 2) {
          this.current = this.filteredClients.length - 1
        }

        let parent = document.getElementById('queryListClient')
        let children = parent.getElementsByTagName('li')
        children[this.current].scrollIntoView(false)
      },
      down (events) {
        if (this.current < this.filteredClients.length - 1) {
          this.current++
        } else {
          this.current = 0
        }
        let parent = document.getElementById('queryListClient')
        let children = parent.getElementsByTagName('li')
        children[this.current].scrollIntoView(false)
      },
      setFocus () {
        document.getElementById('search-clients').focus()
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
  ul { 
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
  li { padding: 5px 10px; }
  li.active { background: #f5f5f5; }
</style>
