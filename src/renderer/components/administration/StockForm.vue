<template lang="html">
  <div class="">
    <h1 class="header"><i class="fa fa-tags fa-floated"></i> Control de Stock</h1>
    <hr>
    <div>
      <table class="table">
        <thead>
          <th>Categoria</th>
          <th>Producto</th>
          <th>Cantidad</th>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td><b>{{ item.category.name }} </b></td>
            <td><b>{{ item.name }}</b></td>
            <td>
              <input type="number" v-model="form.stockItems[item.id]" class="input" placeholder="Ingrese la cantidad actual"/>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td><a class="button is-primary is-pulled-right is-fullwidth" :class="{'is-loading': loading}" @click="saveStock">Guardar</a></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/utils/Loader'
import Auth from '../../auth'
import alert from '../../mixins/Alert'
export default {
  name: 'Stock',
  components: { Loader },
  mixins: [alert],
  watch: {
    '$route': 'fetchItems'
  },
  beforeRouteEnter (to, from, next) {
    if (Auth.user.profile.role === 'cooker') {
      next(vm => vm.$router.push({ name: 'Kitchen' }))
    } else {
      next()
    }
  },
  data () {
    return {
      items: [],
      form: {
        stockItems: {}
      },
      loading: false
    }
  },
  created () {
    this.fetchItems()
  },
  methods: {
    saveStock () {
      this.loading = true
      this.$http.post('admin/items/stock', this.form).then(
        response => {
          this.loading = false
          this.alert('success', response.bodyText, 'top-center')
        },
        error => {
          this.loading = false
          this.alert('danger', error.data, 'top-center')
        }
      )
    },
    fetchItems () {
      let url = 'items?stockable=true'
      this.$http.get(url).then(
        response => {
          this.items = response.data
        }
      )
    }
  }
}
</script>

<style lang="css" scoped>
  #items tr { cursor: pointer; }
</style>
