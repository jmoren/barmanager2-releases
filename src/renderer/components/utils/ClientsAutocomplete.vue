<template>
  <div class="autocomplete-dropdown" style="position:relative;">
    <div class="control has-addons">
      <input type="search" class="input is-expanded" id="search-clients"
         :class="{'is-disabled': ticket.closed || loadingClients }"
         autocomplete="off"
         placeholder="Filtrar..."
         v-model="query"
         @keydown.down.prevent='down'
         @keydown.up.prevent='up'
         @keydown.enter.prevent='hit'
         @keydown.esc.prevent='reset'
         @focus="setFocus"
         @blur="setBlur"/>
      <a class="button is-primary" :class="{'is-disabled': !ticket.client_id }" @click.prevent="removeClient">
        <i class="fa fa-times"></i>
      </a>
    </div>
    <ul v-show="focused" id="queryListClient">
      <li class="empty-item is-danger-text" v-if="filteredClients.length === 0">
        No se encontro ningun resultado
      </li>
      <li v-for="(item, $item) in filteredClients" :key="item.id" :class="activeClass($item)" @mousemove="setActive($item)" @click.prevent="hit">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
  import _ from 'lodash'
  export default {
    name: 'ClientsAutocomplete',
    props: ['ticket'],
    computed: {
      filteredClients () {
        if (this.query) {
          let regex = new RegExp(this.query.toLowerCase())
          return this.clients.filter((client) => {
            return regex.test(client.name.toLowerCase())
          })
        } else {
          return this.clients
        }
      }
    },
    data () {
      return {
        query: this.ticket.client.name,
        current: -1,
        focused: false,
        loadingClients: false,
        clients: []
      }
    },
    mounted () {
      this.loadClients()
    },
    methods: {
      hit () {
        let index = this.filteredClients.length === 1 ? 0 : this.current
        this.item = _.clone(this.filteredClients[index])
        this.$emit('set-client', this.item)
        this.focused = false
        this.query = this.item.name
        document.getElementById('search-clients').blur()
      },
      removeTable () {
        this.$emit('remove-client')
        this.query = ''
      },
      reset () {
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
        this.query = ''
        this.focused = true
        document.getElementById('search-clients').focus()
      },
      setBlur () {
        console.log(this.query)
        if (this.ticket.client_id) {
          this.query = this.ticket.client.name
        }
        this.focused = false
        console.log(this.query)
      },
      setActive (index) {
        this.current = index
      },
      activeClass (index) {
        return {
          active: this.current === index
        }
      },
      loadClients () {
        if (this.clients.length < 1) {
          this.loadingClients = true
          this.$http.get('clients?paginate=false').then(
            response => {
              this.clients = response.data
              this.loadingClients = false
            },
            error => {
              this.alert('danger', error.data)
              this.loadingClients = false
            }
          )
        }
      }
    }
  }
</script>

<style scoped>
  input[type=search] { border-radius: 4px; }
  ul {
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
  li { font-weight: 500; padding: 5px 10px; }
  li.active { background: #3c81df; }
  li.active { color: #fff;}
</style>
