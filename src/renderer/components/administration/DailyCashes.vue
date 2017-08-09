<template>
  <div class="container">
    <h1 class="header">Cajas</h1>
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
  </div>
</template>

<script>
  export default {
    name: 'DailyCashes',
    data () {
      return {
        dailyCashes: [],
        loading: false
      }
    },
    created () {
      this.fetchCashes()
    },
    methods: {
      fetchCashes () {
        this.$http.get('admin/daily_cashes').then(
          response => {
            this.dailyCashes = response.data
          }
        )
      }
    }
  }
</script>

<style>

</style>
