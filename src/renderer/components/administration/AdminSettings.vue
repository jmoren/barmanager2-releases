<template>
  <div>
    <modal title="Administrar Condif" ok-text="Guardar" cancel-text="Cancelar" :on-ok="addConfig" :on-cancel="resetConfig" :width="520" :is-show="isShow" transition="zoom" @close="resetConfig">
      <div class="control">
        <input type="text" class="input" v-model="newConfig.key" placeholder="Nombre de la Config" />
      </div>
      <div class="control is-expanded">
        <input type="text" class="input" placeholder="Valor de la config" v-model="newConfig.value"/>
      </div>
    </modal>
    <div class='panel-body'>
       <h1 class="header">
        <i class="fa fa-address-book-o fa-floated"></i>
        Configuración
        <a @click="isShow=true" class="is-pulled-right button is-light">Nueva Config</a>
      </h1>
      <hr>
      <table class="table">
        <thead>
          <th>Nombre</th>
          <th>Valor</th>
          <th></th>
        </thead>
        <tr v-for="(v,k) in configs">
          <td>{{k}}</td>
          <td><input type="text" v-model="configs[k]" class="input" @blur="save(k, configs[k])"/></td>
          <td>
            <a @click.prevent="remove(k)" class="button is-light">
              <i class="fa fa-trash"></i>
            </a>
          </td>
        </tr>
      </table>
      <p><b>Archivo de configuracion:</b> {{path}}</p>
    </div>
  </div>
</template>
<script>

import Vue from 'vue'
const Config = require('electron-config')
const config = new Config()

export default {
  data () {
    return {
      isShow: false,
      newConfig: { key: '', value: '' },
      path: config.path,
      configs: config.store
    }
  },
  methods: {
    resetConfig () {
      this.isShow = false
      this.newConfig = { key: '', value: '' }
    },
    addConfig () {
      this.save(this.newConfig.key, this.newConfig.value)
      this.configs[this.newConfig.key] = this.newConfig.value
      this.resetConfig()
    },
    save (key, value) {
      console.log('Saving config ' + key + ':' + value)
      config.set(key, value)
    },
    remove (key) {
      config.delete(key)
      Vue.delete(this.configs, key)
    }
  }
}
</script>
