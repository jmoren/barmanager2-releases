<template>
  <div class="box">
    <h4>
      <i class="fa fa-floated fa-credit-card"></i> ) 
      Credenciales
      <div class="control has-addons is-pulled-right">
        <a class="button is-light" @click.prevent="createCode()">Crear Credencial</a>
      </div>
    </h4>
    <hr>
    <Loader v-if="loading"></Loader>
    <div v-else>
      <div v-if="codes.length > 0">
        <table class="table">
          <thead>
            <th>Fecha</th>
            <th>Codigo</th>
            <th>Valido</th>
            <th></th>
          </thead>
          <tbody>
            <client-code v-for="(client_code, index) in codes" :key="index" :client="client" :code="client_code" @remove-code="removeCode(index)"></client-code>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import Loader from '@/components/utils/Loader'
  import ClientCode from './ClientCode'

  export default {
    name: 'client-codes',
    props: ['client'],
    components: { Loader, ClientCode },
    data () {
      return {
        codes: [],
        loading: false
      }
    },
    created () {
      this.loadCodes()
    },
    methods: {
      loadCodes () {
        this.loading = true
        this.$http.get('clients/' + this.client.id + '/client_codes').then(
          response => {
            this.codes = response.data
            this.loading = false
          }
        )
      },
      createCode () {
        this.$http.post('clients/' + this.client.id + '/client_codes').then(
          response => {
            this.codes.push(response.data)
          }
        )
      },
      removeCode (index) {
        this.codes.splice(index, 1)
      }
    }
  }
</script>
