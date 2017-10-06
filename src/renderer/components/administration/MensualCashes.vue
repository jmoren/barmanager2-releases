<template>
  <div class="container">
    <h1 class="header">
      Cajas Mensuales
      <div class="is-pulled-right">
        <div class="control has-addons">
          <span class="button is-light">{{ currentMonthName.name }}</span>
          <span class="button is-primary">{{ currentYear }}</span>
        </div>
      </div>
    </h1>
    <hr>
    <div class="control has-addons">
      <span class="button is-not-link">Seleccione año</span>
      <div class="select">
        <select v-model="currentYear">
          <option value="2015">2015</option>
          <option value="2016">2016</option>
          <option value="2017">2017</option>
        </select>
      </div>
    </div>
    <hr>
    <div class="columns is-multiline">
      <div class="column is-3" v-for="month in months">
        <router-link :to="{ name: 'MensualCash', params: { month: month.number, year: currentYear } }" class="button is-fullwidth is-medium is-primary">
          Mes {{ month.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'mensual-cashes',
    data () {
      return {
        currentYear: (new Date()).getYear() + 1900,
        currentMonth: (new Date()).getMonth() + 1
      }
    },
    computed: {
      ...mapGetters({
        months: 'months'
      }),
      currentMonthName () {
        return this.months.filter((m) => { return m.number === this.currentMonth })[0]
      }
    }
  }
</script>
