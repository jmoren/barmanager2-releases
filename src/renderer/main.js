// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import VueBlu from 'vue-blu'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'
import VueShortkey from 'vue-shortkey'
import VeeValidate from 'vee-validate'
import moment from 'moment'
import Chartkick from 'chartkick'
import VueChartkick from 'vue-chartkick'
import Highcharts from 'highcharts'
import VueBarcode from 'vue-barcode'

import 'vue-blu/dist/css/vue-blu.min.css'
import Auth from './auth'

const Config = require('electron-config')
const config = new Config()
if (config.get('api_url', null) === null) {
  config.set('api_url', 'http://localhost:3000/api/')
}

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

const veeConfig = {
  errorBagName: 'errors',
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'en',
  dictionary: null,
  strict: true,
  enableAutoClasses: false,
  events: 'input|blur',
  inject: true
}

//  const moment = require('moment')
require('moment/locale/es')
window.Highcharts = Highcharts

//  Vue.use(VueCharts)
Vue.use(VueBlu)
Vue.use(VueResource)
Vue.use(VueMoment, { moment })
Vue.use(VueShortkey)
Vue.use(VeeValidate, veeConfig)
Vue.use(VueChartkick, { Chartkick })
Vue.component('barcode', VueBarcode)

Vue.http.options.root = config.get('api_url')
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

export default Vue
Auth.check()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
