<template>
  <div class="">
    <h1 class="header">Cajas Diarias</h1>
    <hr>
    <table class="table">
      <thead>
        <th>ID</th>
        <th>Fecha</th>
        <th># Cajas Parciales</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="cash in dailyCashes" :key="cash.id">
          <td>{{ cash.id }}</td>
          <td>{{ cash.cash_date | moment('DD MMMM, YYYY') }}</td>
          <td>{{ cash.partial_daily_cashes.length }}</td>
          <td>
            <router-link :to="{ name: 'DailyCash', params: { id: cash.id } }" class="button is-light">Detalles</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination layout="pager" align="left" :page-size="10" :total="meta.total" :change="fetchCashes"></pagination>
  </div>
</template>

<script>
  export default {
    name: 'DailyCashes',
    data () {
      return {
        dailyCashes: [],
        loading: false,
        meta: {}
      }
    },
    created () {
      this.fetchCashes(1)
    },
    methods: {
      fetchCashes (page) {
        this.$http.get('admin/daily_cashes?page=' + (page || 1)).then(
          response => {
            this.dailyCashes = response.data.daily_cashes
            this.meta = response.data.meta
          }
        )
      }
    }
  }
</script>

<style>

</style>
