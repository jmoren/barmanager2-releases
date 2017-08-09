<template>
  <div>
    <h1 class="header"><i class="fa fa-bar-chart fa-floated"></i>  Reporte</h1>
    <hr>
    <h2>Razones de cancelamiento</h2>
    <br>
    <div class="box">
      <div class="columns">
        <div class="column is-4"><datepicker placeholder="Desde..." :options="dateOptions" v-model="range.from"></datepicker></div>
        <div class="column is-4"><datepicker placeholder="Hasta..." :options="dateOptions" v-model="range.to"></datepicker></div>
        <div class="column is-4">
          <button class="button is-light" @click.prevent="fetchValues">
            <span class="icon is-small"><i class="fa fa-refresh"></i></span>
            <span>Actualizar</span>
          </button>
        </div>
      </div>
      <hr>
      <column-chart :stacked="true" :data="data"></column-chart>
    </div>
  </div>
</template>

<script>
  import { es } from 'flatpickr/dist/l10n/es'
  export default {
    name: 'AdminReport',
    data () {
      return {
        data: [],
        range: { from: '', to: '' },
        dateOptions: {
          locale: es,
          format: 'd/m/Y',
          altInput: true
        }
      }
    },
    created () {
      this.fetchValues()
    },
    methods: {
      fetchValues () {
        this.$http.get('admin/reports?from=' + this.range.from + '&to=' + this.range.to).then(response => { this.data = response.data.values })
      },
      filterData () {

      }
    }
  }
</script>

<style>
  
</style>
