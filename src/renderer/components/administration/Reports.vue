<template>
  <div>
    <h1 class="header"><i class="fa fa-bar-chart fa-floated"></i>  Reporte</h1>
    <hr>
    <div class="columns">
      <div class="column is-3">
        <span class="select is-fullwidth">
          <select v-model="group_entity">
            <option >Seleccione una opcion</option>
            <option value="table">Mesa</option>
            <option value="user">Usuario</option>
            <option value="client">Cliente</option>
          </select>
        </span>
      </div>
      <div class="column is-3"><datepicker placeholder="Desde..." :options="dateOptions" v-model="range.from"></datepicker></div>
      <div class="column is-3"><datepicker placeholder="Hasta..." :options="dateOptions" v-model="range.to"></datepicker></div>
      <div class="column is-3">
        <button class="button is-light" @click.prevent="generateReportBy()">
          <span class="icon is-small"><i class="fa fa-list"></i></span>
          <span>Cargar Reportes</span>
        </button>
      </div>
    </div>
    <div class="box">
      <h4>Reporte de Cancelamiento</h4>
      <hr>
      <column-chart :stacked="true" :data="data"></column-chart>
    </div>
    <div class="box" v-if="group_entity">
      <h4>Reporte de Ventas: <span>Por <b>{{ entities[group_entity] }}</b></span></h4>
      <hr>
      <bar-chart :stacked="true" label="Tickets" :data="data_sells"></bar-chart>
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
        data_sells: [],
        group_entity: undefined,
        range: { from: '', to: '' },
        entities: { table: 'Mesas', client: 'Cliente', user: 'Usuario' },
        dateOptions: {
          locale: es,
          format: 'd/m/Y',
          altInput: true
        }
      }
    },
    created () {
      this.loadReports()
    },
    methods: {
      loadReports () {
        this.fetchValues()
        this.generateReportBy()
      },
      fetchValues () {
        this.$http.get('admin/reports/canceled_products?from=' + this.range.from + '&to=' + this.range.to).then(
          response => {
            this.data = response.data.values
          })
      },
      generateReportBy () {
        if (this.group_entity) {
          this.$http.get('admin/reports/sells_by?from=' + this.range.from + '&to=' + this.range.to + '&group_entity=' + this.group_entity).then(
            response => {
              this.data_sells = response.data
            },
            error => {
              console.log(error)
            }
          )
        }
      }
    }
  }
</script>
