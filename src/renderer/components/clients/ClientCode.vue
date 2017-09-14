<template>
  <tr>
    <td>{{ code.created_at | moment('DD/MM/YYYY') }}</td>
    <td>{{ code.code }}</td>
    <td><i class="fa" :class="{'fa-check is-success': enabled, 'fa-times is-danger': !enabled }"></i></td>
    <td>
      <div class="is-pulled-right">
        <a @click.prevent="deleteCode()" v-if="!enabled" class="button is-small is-danger">
          <i class="fa fa-trash"></i>
        </a>
        <tooltip content="Deshabilitar credencial">
          <a @click.prevent="invalidateCode()" v-if="enabled" class="button is-small is-default">
            <i class="fa fa-flash"></i>
          </a>
        </tooltip>
        <tooltip content="Imprimir credencial">
          <a @click.prevent="printCode()" v-if="enabled" class="button is-small is-primary">
            <i class="fa fa-print"></i>
          </a>
        </tooltip>
      </div>
      <modal title="Credencial" :show-footer="false" :on-cancel="close" :is-show="printing" transition="zoom">
        <p><button @click="print()" class="button is-default">Imprimir</button></p>
        <div class="credential">
          <div class="client-name">
            <p>{{ client.name }}</p>
            <i>{{ client.dni }}</i>
          </div>
          <div class="barcode-image">
            <barcode :value="code.code" :options="{ format: barcode.format, lastChar: barcode.lastChar, displayValue: true, height: barcode.height, width: barcode.width, background: 'transparent' }"></barcode>
          </div>
        </div>
        <div class="credential">
          <div class="bar-name">
            <p>{{ businessName }}</p>
            <small>{{ businessSlogan }}</small><br/>
            <i>Tel: {{ businessPhone }}</i>
          </div>
        </div>
      </modal>
    </td>
  </tr>
</template>

<script>
  const Config = require('electron-config')
  const config = new Config()

  export default {
    name: 'client-code',
    props: ['code', 'client'],
    data () {
      return {
        barcode: {
          format: config.get('barcode_format', 'EAN13'),
          width: config.get('barcode_width', 1),
          height: config.get('barcode_height', 50),
          lastChar: config.get('barcode_last_char', '>')
        },
        loding: false,
        currentCode: {},
        enabled: this.code.enabled,
        printing: false,
        businessName: config.get('business_name', ''),
        businessPhone: config.get('business_phone', ''),
        businessSlogan: config.get('business_slogan', '')
      }
    },
    methods: {
      deleteCode () {
        this.$http.delete('clients/' + this.code.client_id + '/client_codes/' + this.code.id).then(
          response => {
            this.$emit('remove-code')
          }
        )
      },
      invalidateCode () {
        this.$http.put('clients/' + this.code.client_id + '/client_codes/' + this.code.id + '/invalidate').then(
          response => { this.enabled = response.data.enabled }
        )
      },
      printCode () {
        console.log(this.code.code)
        this.printing = true
      },
      print () {
        window.print()
      },
      close () {
        this.printing = false
      }
    }
  }
</script>

<style>
  .credential { width: 300px; height: 200px; border: solid 1px #f1f1f1; border-radius: 5px; padding: 30px 20px; margin: 20px auto; }
  .credential img { height: 60px; }
  .credential .client-name, .credential .bar-name { text-align: center;  }
  .credential .client-name p,
  .credential .bar-name p { font-size: 20px; }
  .credential .client-name i,
  .credential .bar-name i { color: #888; }
  .credential .bar-name p { font-size: 30px; }
  .credential .barcode-image { text-align: center }
  @media print {
    .modal-card-head { display: none; }
    .modal-card-body p button { display: none; }
  }
</style>
