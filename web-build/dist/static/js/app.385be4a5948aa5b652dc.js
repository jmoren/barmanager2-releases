webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__router__ = __webpack_require__(23);


const LOGIN_URL = 'authenticate';

/* harmony default export */ __webpack_exports__["a"] = ({
  user: {
    authenticated: false,
    profile: {}
  },
  check() {
    __WEBPACK_IMPORTED_MODULE_0__main__["default"].http.get('user', { headers: { 'authorization': 'Bearer ' + localStorage.getItem('id_token') } }).then(response => {
      this.user.authenticated = true;
      this.user.profile = response.data;
    }, error => {
      if (error.status === 0) {
        window.alert('Fallo la conexion con la aplicacion');
      }
      this.user.authenticated = false;
      this.user.profile = {};
      this.logout();
    }).catch(function (error) {
      console.log(error);
    });
  },
  login(context, creds, redirect) {
    __WEBPACK_IMPORTED_MODULE_0__main__["default"].http.post(LOGIN_URL, creds, { headers: { Authorization: null } }).then(response => {
      let token = response.data.auth_token;
      localStorage.setItem('id_token', token);
      __WEBPACK_IMPORTED_MODULE_0__main__["default"].http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

      this.user.authenticated = true;
      this.user.profile = { name: response.data.name, role: response.data.role, email: response.data.email };
      if (this.user.profile.role === 'cooker') {
        __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].push({ name: 'Kitchen' });
      } else {
        __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].push({ name: 'Tables' });
      }
    }, error => {
      context.loading = false;
      context.error = error.data;
      context.$notify.open({
        type: 'danger',
        content: 'Error: ' + error.data
      });
    });
  },
  logout() {
    localStorage.removeItem('id_token');
    __WEBPACK_IMPORTED_MODULE_0__main__["default"].http.headers.common['Authorization'] = null;
    this.user.authenticated = false;
    this.user.profile = {};
    __WEBPACK_IMPORTED_MODULE_1__router__["a" /* default */].push({ name: 'Login' });
  }
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);

/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    parseMessage: function (message) {
      switch (typeof message) {
        case 'string':
          return [message];
        case 'object':
          let acc = [];
          __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(message, (value, key) => {
            acc.push(key + ': ' + value);
          });
          return acc;
        default:
          return [];
      }
    },
    alert: function (type, message, position) {
      let p = 'bottom-center';
      if (position) {
        p = position;
      }
      let msgs = this.parseMessage(message);
      __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(msgs, m => {
        this.$notify.open({
          content: m,
          duration: 5000,
          type: type,
          placement: p
        });
      });
    }
  }
});

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(282)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(214),
  /* template */
  __webpack_require__(414),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-9d72b84c",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ (function(module, exports) {

module.exports = function () {
  this.set = function(key) {
  },
  this.get = function (a, b) {
    var config = {
      api_url: 'http://0.0.0.0:3000/api/'
    }
    return config[a] || b;
  }
}


/***/ }),
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_login_Login__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_login_Login___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_login_Login__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_kitchen_Kitchen__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_kitchen_Kitchen___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_kitchen_Kitchen__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_layouts_PrivateApp__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_layouts_PrivateApp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_layouts_PrivateApp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_tickets_Ticket__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_tickets_Ticket___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_tickets_Ticket__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_tickets_AdminTicket__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_tickets_AdminTicket___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__components_tickets_AdminTicket__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_tickets_Tickets__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_tickets_Tickets___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_tickets_Tickets__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_payments_Payments__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_payments_Payments___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__components_payments_Payments__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_tables_Tables__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_tables_Tables___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__components_tables_Tables__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_tables_AdminTable__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_tables_AdminTable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__components_tables_AdminTable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_clients_Clients__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_clients_Clients___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__components_clients_Clients__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_clients_Client__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_clients_Client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__components_clients_Client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_cash_PartialDailyCash__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_cash_PartialDailyCash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__components_cash_PartialDailyCash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_user_Profile__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_user_Profile___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__components_user_Profile__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_administration_Administration__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_administration_Administration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15__components_administration_Administration__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_administration_Clients__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_administration_Clients___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16__components_administration_Clients__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_administration_Items__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_administration_Items___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_17__components_administration_Items__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_administration_AdminSettings__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_administration_AdminSettings___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18__components_administration_AdminSettings__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_administration_Promotions__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_administration_Promotions___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_19__components_administration_Promotions__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_administration_Categories__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_administration_Categories___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_20__components_administration_Categories__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_administration_Suppliers__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_administration_Suppliers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_21__components_administration_Suppliers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_administration_Tables__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_administration_Tables___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22__components_administration_Tables__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_administration_CancelReasons__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_administration_CancelReasons___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_23__components_administration_CancelReasons__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_administration_DailyCashes__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_administration_DailyCashes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24__components_administration_DailyCashes__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_cash_DailyCash__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_cash_DailyCash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25__components_cash_DailyCash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_administration_Users__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_administration_Users___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26__components_administration_Users__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_administration_Reports__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_administration_Reports___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_27__components_administration_Reports__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_deliveries_Delivery__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_deliveries_Delivery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28__components_deliveries_Delivery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_deliveries_Deliveries__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_deliveries_Deliveries___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_29__components_deliveries_Deliveries__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_notFound_NotFound__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_notFound_NotFound___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_30__components_notFound_NotFound__);



































__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

const router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [{ path: '/',
    component: __WEBPACK_IMPORTED_MODULE_4__components_layouts_PrivateApp___default.a,
    children: [{ path: '',
      name: 'Tables',
      component: __WEBPACK_IMPORTED_MODULE_9__components_tables_Tables___default.a
    }, { path: 'cajas/:id',
      name: 'PartialDailyCash',
      component: __WEBPACK_IMPORTED_MODULE_13__components_cash_PartialDailyCash___default.a,
      meta: { roles: ['admin'] }
    }, { path: 'clientes/:id',
      name: 'Client',
      component: __WEBPACK_IMPORTED_MODULE_12__components_clients_Client___default.a
    }, { path: 'tickets/:id',
      name: 'Ticket',
      component: __WEBPACK_IMPORTED_MODULE_5__components_tickets_Ticket___default.a
    }, { path: 'perfil',
      name: 'Profile',
      component: __WEBPACK_IMPORTED_MODULE_14__components_user_Profile___default.a
    }, { path: 'clientes',
      name: 'Clients',
      component: __WEBPACK_IMPORTED_MODULE_11__components_clients_Clients___default.a
    }, { path: 'tickets',
      name: 'Tickets',
      component: __WEBPACK_IMPORTED_MODULE_7__components_tickets_Tickets___default.a
    }, { path: 'pagos',
      name: 'Payments',
      component: __WEBPACK_IMPORTED_MODULE_8__components_payments_Payments___default.a,
      props: route => ({ query: route.query.q })
    }, {
      path: 'pedido/:id',
      name: 'Delivery',
      component: __WEBPACK_IMPORTED_MODULE_28__components_deliveries_Delivery___default.a
    }, {
      path: 'pedidos',
      name: 'Deliveries',
      component: __WEBPACK_IMPORTED_MODULE_29__components_deliveries_Deliveries___default.a
    }, { path: 'administracion',
      component: __WEBPACK_IMPORTED_MODULE_15__components_administration_Administration___default.a,
      children: [{ path: 'clientes', name: 'AdminClients', component: __WEBPACK_IMPORTED_MODULE_16__components_administration_Clients___default.a, meta: { roles: ['admin', 'manager'] } }, { path: 'items', name: 'AdminItems', component: __WEBPACK_IMPORTED_MODULE_17__components_administration_Items___default.a, meta: { roles: ['admin', 'manager'] } }, { path: 'promociones', name: 'AdminPromotions', component: __WEBPACK_IMPORTED_MODULE_19__components_administration_Promotions___default.a, meta: { roles: ['admin', 'manager'] } }, { path: 'categorias', name: 'AdminCategories', component: __WEBPACK_IMPORTED_MODULE_20__components_administration_Categories___default.a, meta: { roles: ['admin', 'manager'] } }, { path: 'proveedores', name: 'AdminSuppliers', component: __WEBPACK_IMPORTED_MODULE_21__components_administration_Suppliers___default.a, meta: { roles: ['admin', 'manager'] } }, { path: 'mesas', name: 'AdminTables', component: __WEBPACK_IMPORTED_MODULE_22__components_administration_Tables___default.a, meta: { roles: ['admin', 'manager'] } }, { path: 'razones', name: 'AdminCancelReasons', component: __WEBPACK_IMPORTED_MODULE_23__components_administration_CancelReasons___default.a, meta: { roles: ['admin', 'manager'] } }, { path: 'usuarios', name: 'AdminUsers', component: __WEBPACK_IMPORTED_MODULE_26__components_administration_Users___default.a, meta: { roles: ['admin'] } }, { path: 'cajas', name: 'AdminDailyCashes', component: __WEBPACK_IMPORTED_MODULE_24__components_administration_DailyCashes___default.a, meta: { roles: ['admin'] } }, { path: 'reportes', name: 'AdminReports', component: __WEBPACK_IMPORTED_MODULE_27__components_administration_Reports___default.a, meta: { roles: ['admin'] } }, { path: 'Configuracion', name: 'AdminSettings', component: __WEBPACK_IMPORTED_MODULE_18__components_administration_AdminSettings___default.a, meta: { roles: ['admin'] } }, { path: 'cajas/:id/resumen',
        name: 'DailyCash',
        component: __WEBPACK_IMPORTED_MODULE_25__components_cash_DailyCash___default.a,
        meta: { roles: ['admin'] }
      }, {
        path: 'mesas/:id',
        name: 'AdminTable',
        component: __WEBPACK_IMPORTED_MODULE_10__components_tables_AdminTable___default.a,
        children: [{ path: 'ticket/:ticketId', name: 'AdminTicket', component: __WEBPACK_IMPORTED_MODULE_6__components_tickets_AdminTicket___default.a }]
      }]
    }]
  }, { path: '/cocina',
    name: 'Kitchen',
    component: __WEBPACK_IMPORTED_MODULE_3__components_kitchen_Kitchen___default.a,
    role: 'cocina',
    meta: { roles: ['admin', 'cooker'] }
  }, { path: '/login',
    name: 'Login',
    component: __WEBPACK_IMPORTED_MODULE_2__components_login_Login___default.a
  }, {
    path: '/404',
    name: 'NotFound',
    component: __WEBPACK_IMPORTED_MODULE_30__components_notFound_NotFound___default.a
  }, { path: '*', redirect: '/' }]
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__store_store__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_blu__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_blu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_vue_blu__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_resource__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vue_moment__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vue_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_vue_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vue_shortkey__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_vue_shortkey___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_vue_shortkey__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vee_validate__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_chartkick__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_chartkick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_chartkick__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_vue_chartkick__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_vue_chartkick___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_vue_chartkick__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_highcharts__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_highcharts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_highcharts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_vue_barcode__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_vue_barcode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_vue_barcode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_vue_blu_dist_css_vue_blu_min_css__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_vue_blu_dist_css_vue_blu_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_vue_blu_dist_css_vue_blu_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__auth__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__init__ = __webpack_require__(156);




















const Config = __webpack_require__(11);
const config = new Config();

__WEBPACK_IMPORTED_MODULE_16__init__["a" /* default */].init(config);

if (false) Vue.use(require('vue-electron'));
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.productionTip = false;

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
};

__webpack_require__(19);
window.Highcharts = __WEBPACK_IMPORTED_MODULE_12_highcharts___default.a;

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_4_vue_blu___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_5_vue_resource__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_6_vue_moment___default.a, { moment: __WEBPACK_IMPORTED_MODULE_9_moment___default.a });
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_7_vue_shortkey___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_8_vee_validate__["a" /* default */], veeConfig);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_11_vue_chartkick___default.a, { Chartkick: __WEBPACK_IMPORTED_MODULE_10_chartkick___default.a });
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('barcode', __WEBPACK_IMPORTED_MODULE_13_vue_barcode___default.a);

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].http.options.root = config.get('api_url');
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token');

/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0_vue__["default"]);
__WEBPACK_IMPORTED_MODULE_15__auth__["a" /* default */].check();

new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  render: h => h(__WEBPACK_IMPORTED_MODULE_1__App___default.a),
  store: __WEBPACK_IMPORTED_MODULE_3__store_store__["a" /* default */],
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */]
});

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(279)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(213),
  /* template */
  __webpack_require__(411),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-86ee375e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(169),
  /* template */
  __webpack_require__(402),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 154 */,
/* 155 */,
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  init(config) {
    if (config.get('api_url', null) === null) {
      console.log('config');
      config.set('api_url', 'http://localhost:3000/api/');
    }
    if (config.get('business_name', null) === null) {
      config.set('business_name', '');
    }
    if (config.get('business_slogan', null) === null) {
      config.set('business_slogan', '');
    }
    if (config.get('business_phone', null) === null) {
      config.set('business_phone', '');
    }
    if (config.get('barcode_format', null) === null) {
      config.set('barcode_format', 'CODE128');
    }
    if (config.get('barcode_width', null) === null) {
      config.set('barcode_width', '2');
    }
    if (config.get('barcode_height', null) === null) {
      config.set('barcode_height', '60');
    }
    if (config.get('barcode_last_char', null) === null) {
      config.set('barcode_last_char', '>');
    }
  }
});

/***/ }),
/* 157 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);




__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* default */]);

const debug = "production" !== 'production';

const DELETE_TABLE = 'DELETE_TABLE';
const UPDATE_TABLE = 'UPDATE_TABLE';
const LOAD_TABLES = 'LOAD_TABLES';
const ADD_TABLE = 'ADD_TABLE';
const SET_DAILY_CASH = 'SET_DAILY_CASH';
const CLOSE_TABLE = 'CLOSE_TABLE';
const SET_TABLE_BY_ID = 'SET_TABLE_BY_ID';
const LOAD_USERS = 'LOAD_USERS';
const ADD_USER = 'ADD_USER';
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_DAILY_CASH = 'UPDATE_DAILY_CASH';
const SET_REASONS = 'SET_REASONS';
const CHANGE_USER_TABLE = 'CHANGE_USER_TABLE';

const state = {
  tables: {
    all: [],
    current: null,
    open: [],
    closed: []
  },
  users: [],
  reasons: [],
  cash: {}
};

const getters = {
  allTables: state => state.tables.all,
  currentCash: state => state.cash || { user_id: '', init_amount: 0 },
  current: state => state.tables.current,
  openTables: state => state.tables.open,
  closedTables: state => state.tables.closed,
  allUsers: state => state.users,
  allReasons: state => state.reasons
};

const actions = {
  changeUserTable({ commit }, data) {
    commit(CHANGE_USER_TABLE, data);
  },
  setDailyCash({ commit }, dailyCash) {
    commit(SET_DAILY_CASH, dailyCash);
  },
  updateDailyCash({ commit }, dailyCash) {
    commit(UPDATE_DAILY_CASH, dailyCash);
  },
  setReasons({ commit }, reasons) {
    commit(SET_REASONS, reasons);
  },
  setTables({ commit }, tables) {
    commit(LOAD_TABLES, tables);
  },
  closeTable({ commit }, table) {
    commit(CLOSE_TABLE, table);
  },
  addTable({ commit }, table) {
    commit(ADD_TABLE, table);
  },
  updateTable({ commit }, table) {
    commit(UPDATE_TABLE, table);
  },
  deleteTable({ commit }, table) {
    commit(DELETE_TABLE, table);
  },
  setCurrent({ commit }, tableId) {
    commit(SET_TABLE_BY_ID, tableId);
  },
  setUsers({ commit }, users) {
    commit(LOAD_USERS, users);
  },
  updateUser({ commit }, user) {
    commit(UPDATE_USER, user);
  },
  addUser({ commit }, user) {
    commit(ADD_USER, user);
  }
};

const mutations = {
  [CHANGE_USER_TABLE](state, data) {
    let table = state.tables.open.find(t => {
      return t.id === data.table;
    });
    table.current.client = data.client;
  },
  [SET_REASONS](state, reasons) {
    state.reasons = reasons;
  },
  [SET_DAILY_CASH](state, dailyCash) {
    state.cash = dailyCash;
  },
  [UPDATE_DAILY_CASH](state, dailyCash) {
    state.cash = dailyCash;
  },
  [LOAD_TABLES](state, tables) {
    state.tables.all = tables;
    state.tables.open = state.tables.all.filter(t => {
      return !t.closed;
    });
    state.tables.closed = state.tables.all.filter(t => {
      return t.closed;
    });
  },
  [ADD_TABLE](state, table) {
    state.tables.all.push(table);
  },
  [UPDATE_TABLE](state, table) {
    __WEBPACK_IMPORTED_MODULE_2_lodash___default.a.extend(state.tables.all.find(t => t.id === table.id), table);
    state.tables.open = state.tables.all.filter(t => {
      return !t.closed;
    });
    state.tables.closed = state.tables.all.filter(t => {
      return t.closed;
    });
  },
  [DELETE_TABLE](state, table) {
    let index = state.tables.all.indexOf(table);
    state.tables.all.splice(index, 1);
    state.tables.open = state.tables.all.filter(t => {
      return !t.closed;
    });
    state.tables.closed = state.tables.all.filter(t => {
      return t.closed;
    });
  },
  [CLOSE_TABLE](state, table) {
    table.satus = 'closed';
    table.closed = true;
    table.current = {};
    __WEBPACK_IMPORTED_MODULE_2_lodash___default.a.extend(state.tables.all.find(t => t.id === table.id), table);
    state.tables.open = state.tables.all.filter(t => {
      return !t.closed;
    });
    state.tables.closed = state.tables.all.filter(t => {
      return t.closed;
    });
  },
  [SET_TABLE_BY_ID](state, id) {
    state.tables.current = state.tables.all.find(table => table.id === id);
  },
  [LOAD_USERS](state, users) {
    state.users = users;
  },
  [ADD_USER](state, user) {
    state.users.push(user);
  },
  [UPDATE_USER](state, user) {
    __WEBPACK_IMPORTED_MODULE_2_lodash___default.a.extend(state.users.find(u => u.id === user.id), user);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["b" /* default */].Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug
}));

/***/ }),
/* 158 */,
/* 159 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(251)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(170),
  /* template */
  __webpack_require__(377),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'VueGoogleAutocomplete',

  props: {
    id: {
      type: String,
      required: true
    },

    classname: String,

    placeholder: {
      type: String,
      default: 'Start typing'
    },

    types: {
      type: String,
      default: 'address'
    },

    country: {
      type: [String, Array],
      default: null
    },

    enableGeolocation: {
      type: Boolean,
      default: false
    }
  },

  data: function () {
    return {
      autocomplete: null,

      autocompleteText: ''
    };
  },

  watch: {
    autocompleteText: function (newVal, oldVal) {
      this.$emit('inputChange', { newVal, oldVal });
    }
  },

  mounted: function () {
    const options = {};

    if (this.types) {
      options.types = [this.types];
    }

    if (this.country) {
      options.componentRestrictions = {
        country: this.country
      };
    }

    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById(this.id), options);

    this.autocomplete.addListener('place_changed', () => {

      let place = this.autocomplete.getPlace();

      if (!place.geometry) {
        this.$emit('no-results-found', place);
        return;
      }

      let addressComponents = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
      };

      let returnData = {};

      if (place.address_components !== undefined) {
        for (let i = 0; i < place.address_components.length; i++) {
          let addressType = place.address_components[i].types[0];

          if (addressComponents[addressType]) {
            let val = place.address_components[i][addressComponents[addressType]];
            returnData[addressType] = val;
          }
        }

        returnData['latitude'] = place.geometry.location.lat();
        returnData['longitude'] = place.geometry.location.lng();

        this.$emit('placechanged', returnData, place, this.id);

        this.autocompleteText = document.getElementById(this.id).value;
        this.onChange();
      }
    });
  },

  methods: {
    onFocus() {
      this.geolocate();
      this.$emit('focus');
    },

    onBlur() {
      this.$emit('blur');
    },

    onChange() {
      this.$emit('change', this.autocompleteText);
    },

    onKeyPress(event) {
      this.$emit('keypress', event);
    },

    clear() {
      this.autocompleteText = '';
    },

    focus() {
      this.$refs.autocomplete.focus();
    },

    blur() {
      this.$refs.autocomplete.blur();
    },

    update(value) {
      this.autocompleteText = value;
    },

    geolocate() {
      if (this.enableGeolocation) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            let geolocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            let circle = new google.maps.Circle({
              center: geolocation,
              radius: position.coords.accuracy
            });
            this.autocomplete.setBounds(circle.getBounds());
          });
        }
      }
    }
  }
});

/***/ }),
/* 170 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app'
});

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);



const Config = __webpack_require__(11);
const config = new Config();

/* harmony default export */ __webpack_exports__["default"] = ({
  data() {
    return {
      isShow: false,
      newConfig: { key: '', value: '' },
      path: config.path,
      configs: config.store
    };
  },
  methods: {
    resetConfig() {
      this.isShow = false;
      this.newConfig = { key: '', value: '' };
    },
    addConfig() {
      this.save(this.newConfig.key, this.newConfig.value);
      this.configs[this.newConfig.key] = this.newConfig.value;
      this.resetConfig();
    },
    save(key, value) {
      console.log('Saving config ' + key + ':' + value);
      config.set(key, value);
    },
    remove(key) {
      config.delete(key);
      __WEBPACK_IMPORTED_MODULE_0_vue__["default"].delete(this.configs, key);
    }
  }
});

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__(3);






/* harmony default export */ __webpack_exports__["default"] = ({
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])({
    tables: 'allTables',
    dailyCash: 'currentCash'
  })),
  data() {
    return {
      profile: __WEBPACK_IMPORTED_MODULE_2__auth__["a" /* default */].user.profile
    };
  },
  beforeRouteEnter(to, from, next) {
    if (['manager', 'admin'].indexOf(__WEBPACK_IMPORTED_MODULE_2__auth__["a" /* default */].user.profile.role) === -1) {
      next(vm => vm.$router.push({ name: 'NotFound' }));
    } else {
      next();
    }
  }
});

/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_Alert__ = __webpack_require__(4);





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AdminCancelReasons',
  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_Alert__["a" /* default */]],
  data() {
    return {
      newCancelReason: { name: '', phone: '', address: '' },
      originalCancelReason: { id: null, name: '', phone: '', address: '' },
      reasons: [],
      isShow: false,
      colors: [{ value: 'is-success', title: 'Verde' }, { value: 'is-danger', title: 'Rojo' }, { value: 'is-warning', title: 'Amarillo' }]
    };
  },
  created() {
    this.fetchCancelReasons();
  },
  methods: {
    fetchCancelReasons() {
      this.$http.get('admin/cancel_reasons').then(response => {
        this.reasons = response.data;
      }, error => {
        this.alert('danger', error.data);
      });
    },
    saveCancelReason() {
      if (this.newCancelReason.id) {
        this.updateCancelReason();
      } else {
        this.createCancelReason();
      }
    },
    createCancelReason() {
      this.$http.post('admin/cancel_reasons', { cancel_reason: this.newCancelReason }).then(response => {
        this.reasons.push(response.data);
        this.cancelReason();
      }, error => {
        this.alert('danger', error.data);
      });
    },
    updateCancelReason() {
      let params = {
        text: this.newCancelReason.text
      };

      this.$http.put('admin/cancel_reasons/' + this.newCancelReason.id, { cancel_reason: params }).then(response => {
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.originalCancelReason, response.data);
        this.cancelReason();
      }, error => {
        this.alert('danger', error.data);
      });
    },
    removeReason(reason) {
      this.$http.delete('admin/cancel_reasons/' + reason.id).then(() => {
        let index = this.reasons.indexOf(reason);
        this.reasons.splice(index, 1);
      }, error => {
        this.alert('danger', error.data);
      });
    },
    cancelReason() {
      this.isShow = false;
      __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.newCancelReason, this.originalCancelReason);
      this.newCancelReason = { name: '', phone: '', address: '' };
    },
    setToEdit(cancelReason) {
      this.originalCancelReason = cancelReason;
      this.newCancelReason = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.clone(cancelReason);
      this.isShow = true;
    }
  }
});

/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_Alert__ = __webpack_require__(4);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AdminCategories',
  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_Alert__["a" /* default */]],
  data() {
    return {
      newCategory: { name: '', kitchen: false },
      originalCategory: { id: null, name: '', kitchen: false },
      categories: [],
      isShow: false
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    fetchCategories() {
      this.$http.get('admin/categories').then(response => {
        this.categories = response.data;
      }, error => {
        this.alert('danger', error.data);
      });
    },
    saveCategory() {
      if (this.newCategory.id) {
        this.updateCategory();
      } else {
        this.createCategory();
      }
    },
    createCategory() {
      this.$http.post('admin/categories', { category: this.newCategory }).then(response => {
        this.categories.push(response.data);
        this.newCategory = { name: '', kitchen: false };
      }, error => {
        this.alert('danger', error.data);
      });
    },
    updateCategory() {
      let params = { name: this.newCategory.name, kitchen: this.newCategory.kitchen };
      this.$http.put('admin/categories/' + this.newCategory.id, { category: params }).then(response => {
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.originalCategory, response.data);
        this.cancelCategory();
      }, error => {
        this.alert('danger', error.data);
      });
    },
    removeCategory(category) {
      this.$http.delete('admin/categories/' + category.id).then(() => {
        let index = this.categories.indexOf(category);
        this.categories.splice(index, 1);
      }, error => {
        this.alert('danger', error.data);
      });
    },
    cancelCategory() {
      this.isShow = false;
      __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.newCategory, this.originalCategory);
      this.newCategory = { name: '', kitchen: false };
    },
    setToEdit(category) {
      this.originalCategory = category;
      this.newCategory = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.clone(category);
      this.isShow = true;
    }
  }
});

/***/ }),
/* 175 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_google_autocomplete__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_google_autocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_google_autocomplete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_Alert__ = __webpack_require__(4);





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AdminClients',
  components: {
    VueGoogleAutocomplete: __WEBPACK_IMPORTED_MODULE_1_vue_google_autocomplete___default.a
  },
  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_Alert__["a" /* default */]],
  data() {
    return {
      newClient: { name: '', phone: '', dni: '', address: '' },
      originalClient: { id: '', name: '', phone: '', dni: '', address: '' },
      clients: [],
      isShow: false,
      meta: {},
      query: '',
      page: 1
    };
  },
  created() {
    this.fetchClients();
  },
  methods: {
    updateAddress(data, placeData) {
      this.newClient.address = placeData.formatted_address;
      this.$refs.clientAddress.update(this.newClient.address);
    },
    updateAddress2(text) {
      console.log(text);
      this.$refs.clientAddress.update(text);
    },
    pageChange(page) {
      this.page = page;
      this.fetchClients();
    },
    reloadClients() {
      this.page = 1;
      let isEmpty = this.query.length === 0;
      if (isEmpty) {
        this.fetchClients();
      } else if (!isEmpty && this.query.length > 2) {
        this.fetchClients();
      }
    },
    fetchClients() {
      let url = 'admin/clients?page=' + this.page;
      if (this.query && this.query.length > 2) {
        url = url + '&query=' + this.query;
      }
      this.$http.get(url).then(response => {
        this.clients = response.data.clients;
        this.meta = response.data.meta;
      }, error => {
        this.alert('danger', error.data);
      });
    },
    saveClient() {
      if (this.newClient.id) {
        this.updateClient();
      } else {
        this.createClient();
      }
    },
    createClient() {
      this.$http.post('admin/clients', { client: this.newClient }).then(response => {
        this.clients.push(response.data);
        this.cancelClient();
      }, error => {
        this.alert('danger', error.data);
      });
    },
    updateClient() {
      let params = { name: this.newClient.name, dni: this.newClient.dni, phone: this.newClient.phone, address: this.newClient.address };
      this.$http.put('admin/clients/' + this.newClient.id, { client: params }).then(response => {
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.originalClient, response.data);
        this.cancelClient();
      }, error => {
        this.alert('danger', error.data);
      });
    },
    removeClient(client) {
      this.$http.delete('admin/clients/' + client.id).then(() => {
        let index = this.clients.indexOf(client);
        this.clients.splice(index, 1);
      }, error => {
        this.alert('danger', error.data);
      });
    },
    cancelClient() {
      this.isShow = false;
      __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.newClient, this.originalClient);
      this.newClient = { name: null, phone: null, dni: null, address: null };
    },
    setToEdit(client) {
      this.originalClient = client;
      this.newClient = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.clone(client);
      this.isShow = true;
    }
  }
});

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'DailyCashes',
  data() {
    return {
      dailyCashes: [],
      loading: false
    };
  },
  created() {
    this.fetchCashes();
  },
  methods: {
    fetchCashes() {
      this.$http.get('admin/daily_cashes').then(response => {
        this.dailyCashes = response.data;
      });
    }
  }
});

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_Alert__ = __webpack_require__(4);





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AdminItems',
  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_Alert__["a" /* default */]],
  data() {
    return {
      meta: {},
      query: '',
      page: 1,
      newItem: { name: null, description: null, code: null, category_id: '', day_price: null, night_price: null, favorite: false },
      items: [],
      categories: [],
      isShow: false,
      current: {},
      originalItem: {}
    };
  },
  created() {
    this.fetchItems();
    this.fetchCategories();
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.fetchItems();
    },
    fetchItems() {
      this.loading = true;
      let url = 'admin/items?page=' + this.page;
      if (this.query && this.query.length > 2) {
        url = url + '&query=' + this.query;
      }
      this.$http.get(url).then(response => {
        this.loading = false;
        this.items = response.data.items;
        this.meta = response.data.meta;
      }, error => {
        this.alert('danger', error.data);
      });
    },
    fetchCategories() {
      this.$http.get('admin/categories').then(response => {
        this.loading = false;
        this.categories = response.data;
      }, error => {
        this.alert('danger', error.data);
      });
    },
    saveItem() {
      if (this.newItem.id) {
        this.updateItem();
      } else {
        this.createItem();
      }
    },
    openForm() {
      this.isShow = true;
      if (this.items.length > 0) {
        this.newItem.code = parseInt(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.max(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(this.items, function (item) {
          return item.code;
        }))) + 1;
      }
    },
    createItem() {
      this.$http.post('admin/items', { item: this.newItem }).then(response => {
        this.items.push(response.data);
        this.cancelItem();
      }, error => {
        console.log(error.data);
        this.alert('danger', error.data, 'top-center');
      });
    },
    updateItem() {
      this.$http.put('admin/items/' + this.newItem.id, { item: this.newItem }).then(response => {
        this.isShow = false;
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.originalItem, response.data);
        this.cancelItem();
      }, error => {
        this.alert('danger', error.data, 'top-center');
      });
    },
    cancelItem() {
      this.isShow = false;
      __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.newItem, this.originalItem);
      this.newItem = { name: null, description: null, code: null, category_id: '', day_price: null, night_price: null, favorite: false };
    },
    removeItem(item) {
      this.current = item;
      this.$modal.confirm({
        title: 'Elimnar Item',
        content: 'Seguro de eliminar el item ' + item.name + '?',
        onOk: this.confirmDelete,
        okText: 'Si, eliminar',
        transition: 'zoom',
        icon: ''
      });
    },
    confirmDelete() {
      let index = this.items.indexOf(this.current);
      this.$http.delete('admin/items/' + this.current.id).then(response => {
        this.items.splice(index, 1);
      }, error => {
        this.alert('danger', error.data);
      });
    },
    setToEdit(item) {
      this.originalItem = item;
      this.newItem = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.clone(item);
      this.isShow = true;
    }
  }
});

/***/ }),
/* 178 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_admin_ItemsAutocomplete__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_admin_ItemsAutocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils_admin_ItemsAutocomplete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_Alert__ = __webpack_require__(4);





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AdminPromotions',
  components: { autocomplete: __WEBPACK_IMPORTED_MODULE_1__utils_admin_ItemsAutocomplete___default.a },
  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_Alert__["a" /* default */]],
  data() {
    return {
      meta: {},
      query: undefined,
      newPromotion: { name: '', promotion_items: [], day_price: null, night_price: null, favorite: false },
      newItem: { item: {}, quantity: null },
      newItems: [],
      page: 1,
      promotions: [],
      items: [],
      isShow: false,
      originalPromotion: {}
    };
  },
  created() {
    this.fetchPromotions();
    this.fetchItems();
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.fetchPromotions();
    },
    fetchPromotions() {
      let url = 'admin/promotions?page=' + this.page;
      if (this.query && this.query.length > 2) {
        url = url + '&query=' + this.query;
      }
      this.$http.get(url).then(response => {
        this.promotions = response.data.promotions;
        this.meta = response.data.meta;
      }, error => {
        this.alert('danger', error.data);
      });
    },
    fetchItems() {
      this.loading = true;
      this.$http.get('admin/items?paginate=1').then(response => {
        this.loading = false;
        this.items = response.data;
      }, error => {
        this.alert('danger', error.data);
      });
    },
    savePromotion() {
      if (this.newPromotion.id) {
        this.updatePromotion();
      } else {
        this.createPromotion();
      }
    },
    createPromotion() {
      let params = {
        code: this.newPromotion.code,
        name: this.newPromotion.name,
        favorite: this.newPromotion.favorite,
        day_price: this.newPromotion.day_price,
        night_price: this.newPromotion.night_price,
        items: __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(this.newItems, function (entry) {
          let obj = { item: entry.item.id, quantity: entry.quantity };
          return obj;
        })
      };

      this.$http.post('admin/promotions', { promotion: params }).then(response => {
        this.promotions.push(response.data);
        this.cancelPromotion();
      }, error => {
        this.alert('danger', error.data, 'top-center');
      });
    },
    updatePromotion() {
      let params = {
        code: this.newPromotion.code,
        name: this.newPromotion.name,
        favorite: this.newPromotion.favorite,
        day_price: this.newPromotion.day_price,
        night_price: this.newPromotion.night_price,
        items: __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(this.newItems, function (entry) {
          let obj = { item: entry.item.id, quantity: entry.quantity };
          return obj;
        })
      };

      this.$http.put('admin/promotions/' + this.newPromotion.id, { promotion: params }).then(response => {
        this.isShow = false;
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.originalPromotion, response.data);
        this.cancelPromotion();
      }, error => {
        this.alert('danger', error.data, 'top-center');
      });
    },
    removePromotion(promotion) {
      this.current = promotion;
      this.$modal.confirm({
        title: 'Elimnar Promocion',
        content: 'Seguro de eliminar promocion ' + promotion.name + ' ?',
        onOk: this.confirmDelete,
        okText: 'Si, eliminar',
        transition: 'zoom',
        icon: ''
      });
    },
    confirmDelete() {
      let index = this.promotions.indexOf(this.current);
      this.$http.delete('admin/promotions/' + this.current.id).then(response => {
        this.promotions.splice(index, 1);
      }, error => {
        this.alert('danger', error.data);
      });
    },
    setItem(item) {
      this.newItem.item = item;
    },
    cancelPromotion() {
      this.isShow = false;
      __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.newPromotion, this.originalPromotion);
      this.newPromotion = { name: '', promotion_items: [], day_price: null, night_price: null, favorite: false };
      this.newItems = [];
      this.newItem = { item: {}, quantity: 1 };
    },
    addItemToPromotion() {
      if (!this.newItem.item) {
        return;
      }

      this.newItems.push(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend({}, this.newItem));
      this.newItem = { item: '', quantity: null };
    },
    removeItem(entry) {
      let index = this.newItems.indexOf(entry);
      this.newItems.splice(index, 1);
    },
    openForm() {
      this.isShow = true;
      if (this.promotions.length > 0) {
        this.newPromotion.code = parseInt(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.max(__WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(this.promotions, function (promo) {
          return promo.code;
        }))) + 1;
      }
    },
    setToEdit(promotion) {
      this.originalPromotion = promotion;
      this.newPromotion = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.clone(promotion);

      this.newItems = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.map(promotion.promotion_items, function (entry) {
        let obj = { item: { id: entry.id, kitchen: entry.kitchen, name: entry.name }, quantity: entry.size };
        return obj;
      });

      this.isShow = true;
    }
  }
});

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flatpickr_dist_l10n_es__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flatpickr_dist_l10n_es___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flatpickr_dist_l10n_es__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AdminReport',
  data() {
    return {
      data: [],
      range: { from: '', to: '' },
      dateOptions: {
        locale: __WEBPACK_IMPORTED_MODULE_0_flatpickr_dist_l10n_es__["es"],
        format: 'd/m/Y',
        altInput: true
      }
    };
  },
  created() {
    this.fetchValues();
  },
  methods: {
    fetchValues() {
      this.$http.get('admin/reports?from=' + this.range.from + '&to=' + this.range.to).then(response => {
        this.data = response.data.values;
      });
    },
    filterData() {}
  }
});

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_Alert__ = __webpack_require__(4);





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AdminSuppliers',
  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_Alert__["a" /* default */]],
  data() {
    return {
      newSupplier: { name: '', phone: '', address: '' },
      originalSupplier: { id: null, name: '', phone: '', address: '' },
      suppliers: [],
      isShow: false
    };
  },
  created() {
    this.fetchSuppliers();
  },
  methods: {
    fetchSuppliers() {
      this.$http.get('admin/suppliers').then(response => {
        this.suppliers = response.data;
      }, error => {
        this.alert('danger', error.data);
      });
    },
    saveSupplier() {
      if (this.newSupplier.id) {
        this.updateSupplier();
      } else {
        this.createSupplier();
      }
    },
    createSupplier() {
      this.$http.post('admin/suppliers', { supplier: this.newSupplier }).then(response => {
        this.suppliers.push(response.data);
        this.cancelSupplier();
      }, error => {
        this.alert('danger', error.data);
      });
    },
    updateSupplier() {
      let params = {
        name: this.newSupplier.name,
        phone: this.newSupplier.phone,
        address: this.newSupplier.address
      };

      this.$http.put('admin/suppliers/' + this.newSupplier.id, { supplier: params }).then(response => {
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.originalSupplier, response.data);
        this.cancelSupplier();
      }, error => {
        this.alert('danger', error.data);
      });
    },
    removeSupplier(supplier) {
      this.$http.delete('admin/suppliers/' + supplier.id).then(() => {
        let index = this.suppliers.indexOf(supplier);
        this.suppliers.splice(index, 1);
      }, error => {
        this.alert('danger', error.data);
      });
    },
    cancelSupplier() {
      this.isShow = false;
      __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.newSupplier, this.originalSupplier);
      this.newSupplier = { name: '', phone: '', address: '' };
    },
    setToEdit(supplier) {
      this.originalSupplier = supplier;
      this.newSupplier = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.clone(supplier);
      this.isShow = true;
    }
  }
});

/***/ }),
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_Alert__ = __webpack_require__(4);






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AdminTables',
  mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_Alert__["a" /* default */]],
  data() {
    return {
      query: '',
      newTable: { name: '', phone: '', address: '' },
      originalTable: { id: null, name: '', phone: '', address: '' },
      isShow: false,
      colors: [{ value: 'is-success', title: 'Verde' }, { value: 'is-danger', title: 'Rojo' }, { value: 'is-warning', title: 'Amarillo' }]
    };
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])({
    tables: 'allTables'
  }), {
    filteredTables() {
      if (this.query) {
        let regex = new RegExp(this.query.toLowerCase());
        return this.tables.filter(table => {
          return regex.test(table.description.toLowerCase());
        });
      } else {
        return this.tables;
      }
    }
  }),
  methods: {
    saveTable() {
      if (this.newTable.id) {
        this.updateTable();
      } else {
        this.createTable();
      }
    },
    createTable() {
      this.$http.post('admin/tables', { table: this.newTable }).then(response => {
        this.$store.dispatch('addTable', response.data);
        this.cancelTable();
      }, error => {
        this.alert('danger', error.data);
      });
    },
    updateTable() {
      let params = {
        color: this.newTable.color,
        description: this.newTable.description
      };

      this.$http.put('admin/tables/' + this.newTable.id, { table: params }).then(response => {
        this.$store.dispatch('updateTable', response.data);
        this.cancelTable();
      }, error => {
        this.alert('danger', error.data);
      });
    },
    removeTable(table) {
      this.$http.delete('admin/tables/' + table.id).then(() => {
        this.$store.dispatch('deleteTable', table);
      }, error => {
        this.alert('danger', error.data);
      });
    },
    cancelTable() {
      this.isShow = false;
      __WEBPACK_IMPORTED_MODULE_2_lodash___default.a.extend(this.newTable, this.originalTable);
      this.newTable = { name: '', phone: '', address: '' };
    },
    setToEdit(table) {
      this.originalTable = table;
      this.newTable = __WEBPACK_IMPORTED_MODULE_2_lodash___default.a.clone(table);
      this.isShow = true;
    }
  }
});

/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_Alert__ = __webpack_require__(4);







/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AdminUsers',
  mixins: [__WEBPACK_IMPORTED_MODULE_3__mixins_Alert__["a" /* default */]],
  data() {
    return {
      newUser: { name: null, email: null, role: 'user', password: null, password_confirmation: null },
      originalUser: { id: null, name: null, email: null, role: null },
      isShow: false,
      roles: [{ name: 'Admin', value: 'admin' }, { name: 'User', value: 'user' }, { name: 'Manager', value: 'manager' }, { name: 'Cocina', value: 'cooker' }, { name: 'Delivery', value: 'delivery' }]
    };
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["a" /* mapGetters */])({
    users: 'allUsers'
  })),
  methods: {
    fetchUsers() {
      this.$http.get('admin/users').then(response => {
        this.users = response.data;
      }, error => {
        this.alert('danger', error.data);
      });
    },
    saveUser() {
      if (this.newUser.id) {
        this.updateUser();
      } else {
        this.createUser();
      }
    },
    createUser() {
      this.$http.post('admin/users', { user: this.newUser }).then(response => {
        this.$store.dispatch('addUser', response.data);
        this.cancelUser();
      }, error => {
        this.alert('danger', error.data);
      });
    },
    updateUser() {
      let params = { name: this.newUser.name, email: this.newUser.email, role: this.newUser.role };
      this.$http.put('admin/users/' + this.newUser.id, { user: params }).then(response => {
        this.$store.dispatch('updateUser', response.data);
        this.cancelUser();
      }, error => {
        this.alert('danger', error.data);
      });
    },
    removeUser(user) {
      this.$http.delete('admin/users/' + user.id).then(response => {
        this.$store.dispatch('updateUser', response.data);
      }, error => {
        this.alert('danger', error.data);
      });
    },
    cancelUser() {
      this.isShow = false;
      __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.extend(this.newUser, this.originalUser);
      this.newUser = { name: null, email: null, role: 'user' };
    },
    setToEdit(user) {
      this.originalUser = user;
      this.newUser = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.clone(user);
      this.isShow = true;
    }
  }
});

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'cashRow',
  props: ['title', 'total', 'enabled'],
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggle() {
      if (this.enabled) {
        this.isOpen = !this.isOpen;
      }
    }
  }
});

/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_utils_Loader__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_utils_Loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_utils_Loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CashRow__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CashRow___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__CashRow__);






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'DailyCash',
  beforeRouteEnter(to, from, next) {
    if (['manager', 'admin'].indexOf(__WEBPACK_IMPORTED_MODULE_0__auth__["a" /* default */].user.profile.role) === -1) {
      next(vm => vm.$router.push({ name: 'NotFound' }));
    } else {
      next();
    }
  },
  components: { Loader: __WEBPACK_IMPORTED_MODULE_1__components_utils_Loader___default.a, CashRow: __WEBPACK_IMPORTED_MODULE_2__CashRow___default.a },
  data() {
    return {
      cash: {},
      loading: false,
      isOpen: false,
      currentPartial: {}
    };
  },
  computed: {
    totalEgresos() {
      return parseFloat(this.cash.resume.total_expenses) + parseFloat(this.cash.resume.total_vales) + parseFloat(this.cash.resume.total_home);
    },
    totalIngresosCash() {
      return parseFloat(this.cash.resume.cash_amount) + parseFloat(this.cash.resume.debt_cash) + parseFloat(this.cash.resume.favor_cash);
    },
    totalIngresosCredit() {
      return parseFloat(this.cash.resume.credit_amount) + parseFloat(this.cash.resume.debt_credit) + parseFloat(this.cash.resume.favor_credit);
    },
    finalSum() {
      return parseFloat(this.totalIngresosCredit) + parseFloat(this.totalIngresosCash) - parseFloat(this.totalEgresos);
    }
  },
  created() {
    this.loadCash();
  },
  methods: {
    loadCash() {
      this.loading = true;
      this.$http.get('admin/daily_cashes/' + this.$route.params.id).then(response => {
        this.cash = response.data;
        this.loading = false;
      });
    },
    showPartial(id) {
      this.$http.get('admin/partial_daily_cashes/' + id).then(response => {
        this.currentPartial = response.data;
        this.isOpen = true;
      });
    },
    closePartial() {
      this.currentPartial = {};
      this.isOpen = false;
    }
  }
});

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_admin_SupplierAutocomplete__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_admin_SupplierAutocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__utils_admin_SupplierAutocomplete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_Alert__ = __webpack_require__(4);









/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'PartialDailyCash',
  beforeRouteEnter(to, from, next) {
    if (['manager', 'admin'].indexOf(__WEBPACK_IMPORTED_MODULE_2__auth__["a" /* default */].user.profile.role) === -1) {
      next(vm => vm.$router.push({ name: 'NotFound' }));
    } else {
      next();
    }
  },
  mixins: [__WEBPACK_IMPORTED_MODULE_5__mixins_Alert__["a" /* default */]],
  components: { autocomplete: __WEBPACK_IMPORTED_MODULE_4__utils_admin_SupplierAutocomplete___default.a },
  data() {
    return {
      cash: {},
      suppliers: [],
      loading: false,
      newExpenseExtraccion: { has_vale: true, amount: null, type: 'Extraccion', user_id: '' },
      newExpenseGasto: { supplier_id: '', amount: null, type: 'Gasto', bill_number: null },
      toDelete: {},
      newPartialCash: { init_amount: 0.0, user_id: '', manual_cash: '' },
      isOpen: false,
      lastCash: false,
      errorMessage: ''
    };
  },
  filters: {
    withDecimals: function (value) {
      return parseFloat(value).toFixed(2);
    },
    absNumber: function (value) {
      return Math.abs(value);
    }
  },
  validators: {
    checkCashkMax(value) {
      return value <= this.onlyCash;
    },
    checkCardkMax(value) {
      return value <= this.onlyCard;
    }
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])({
    users: 'allUsers',
    current: 'currentCash'
  }), {
    newPartialTotal() {
      let value = parseFloat(this.newPartialCash.credit_amount) + parseFloat(this.newPartialCash.cash_amount);
      if (isNaN(value)) {
        return 0;
      } else {
        return value;
      }
    },
    totalInFavor() {
      return parseFloat(this.cash.favor_credit) + parseFloat(this.cash.favor_cash);
    },
    subCard() {
      return parseFloat(this.cash.credit_amount) + parseFloat(this.cash.debt_credit) + parseFloat(this.cash.favor_credit);
    },
    subCash() {
      return parseFloat(this.cash.cash_amount) + parseFloat(this.cash.debt_cash) + parseFloat(this.cash.favor_cash);
    },
    realCash() {
      return parseFloat(this.subCash) + parseFloat(this.cash.init_amount) - parseFloat(this.debitos) + parseFloat(this.cash.favor_cash);
    },
    total() {
      return parseFloat(this.subCard) + parseFloat(this.subCash) + parseFloat(this.cash.init_amount) - parseFloat(this.debitos) + parseFloat(this.totalInFavor);
    },
    onlyCash() {
      return parseFloat(this.cash.favor_cash) + parseFloat(this.cash.init_amount) + parseFloat(this.subCash) - parseFloat(this.debitos) - parseFloat(this.cash.cash_at_home);
    },
    onlyCard() {
      return parseFloat(this.cash.favor_credit) + parseFloat(this.subCard);
    },
    debitos() {
      return parseFloat(this.totalGasto) + parseFloat(this.totalVales) + parseFloat(this.totalHome);
    },
    totalGasto() {
      if (this.cash.closed_at) {
        return this.cash.total_expenses;
      } else {
        return this.expenseGastos.reduce((sum, expense) => {
          return parseFloat(sum) + parseFloat(expense.amount);
        }, 0.0);
      }
    },
    totalVales() {
      if (this.cash.closed_at) {
        return this.cash.total_vales;
      } else {
        return this.expenseExtracciones.reduce((sum, expense) => {
          if (expense.has_vale) {
            return parseFloat(sum) + parseFloat(expense.amount);
          } else {
            return parseFloat(sum);
          }
        }, 0.0);
      }
    },
    totalHome() {
      if (this.cash.closed_at) {
        return this.cash.total_home;
      } else {
        return this.expenseExtracciones.reduce((sum, expense) => {
          if (!expense.has_vale) {
            return parseFloat(sum) + parseFloat(expense.amount);
          } else {
            return parseFloat(sum);
          }
        }, 0.0);
      }
    },
    expenseGastos() {
      if (this.cash.closed_at) {
        return [];
      } else {
        return this.cash.expenses.filter(expense => {
          return expense.type === 'Gasto';
        });
      }
    },
    expenseExtracciones() {
      if (this.cash.closed_at) {
        return [];
      } else {
        return this.cash.expenses.filter(expense => {
          return expense.type === 'Extraccion';
        });
      }
    }
  }),
  created() {
    this.fetchCash();
    this.fetchSuppliers();
  },
  methods: {
    fetchSuppliers() {
      this.$http.get('admin/suppliers').then(response => {
        this.suppliers = response.data;
      });
    },
    fetchCash(loader) {
      this.loading = true;
      this.$http.get('admin/partial_daily_cashes/' + this.$route.params.id).then(response => {
        this.cash = response.data;
        if (!this.cash.closed_at) {
          __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.extend(this.cash, this.cash.resume);
        }
        this.loading = false;
      });
    },
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
      this.newPartialCash = { init_amount: 0, user_id: '' };
    },
    setSupplier(supplier) {
      this.newExpenseGasto.supplier_id = supplier.id;
    },
    addExpense(type) {
      let model = {};
      if (type === 'Gasto') {
        model = this.newExpenseGasto;
        if (!model.supplier_id || !model.amount) {
          this.$notify.open({
            type: 'danger',
            content: 'No se puede crear un gasto sin proveedor o sin monto'
          });
          return;
        }
      } else {
        model = this.newExpenseExtraccion;
        if (!model.user_id || !model.amount) {
          this.$notify.open({
            type: 'danger',
            content: 'No se puede crear una extraccion sin usuario o sin monto'
          });
          return;
        }
      }
      this.$http.post('admin/partial_daily_cashes/' + this.cash.id + '/expenses', { expense: model }).then(response => {
        this.cash.expenses.push(response.data);
        this.newExpenseExtraccion = { has_vale: true, amount: null, type: 'Extraccion' };
        this.newExpenseGasto = { supplier_id: '', amount: null, type: 'Gasto' };
      });
    },
    removeExpense(expense) {
      this.toDelete = expense;
      this.$modal.confirm({
        title: 'Eliminar Gasto/Extraccion',
        content: 'Seguro de borrar este gasto?',
        onOk: this.deleteExpense,
        onCancel: this.resetExpense
      });
    },
    resetExpense() {
      this.toDelete = {};
    },
    deleteExpense() {
      this.$http.delete('admin/partial_daily_cashes/' + this.cash.id + '/expenses/' + this.toDelete.id).then(() => {
        let index = this.cash.expenses.indexOf(this.toDelete);
        this.cash.expenses.splice(index, 1);
      });
    },
    closeCash() {
      if (!this.lastCash && (!this.newPartialCash.user_id || !this.newPartialCash.init_amount)) {
        this.errorMessage = 'No se puede abrir una caja nueva sin responsable';
        return false;
      } else {
        this.$http.post('admin/partial_daily_cashes/' + this.cash.id + '/close', { last: this.lastCash, partial_daily_cash: this.newPartialCash }).then(response => {
          this.$store.dispatch('updateDailyCash', response.data);
          this.cash = response.data;
          __WEBPACK_IMPORTED_MODULE_3_lodash___default.a.extend(this.cash, response.data.resume);
          this.closeModal();
          if (this.lastCash) {
            this.$store.dispatch('updateDailyCash', {});
          }
        });
      }
    },
    fiscalPrintCash() {
      this.$http.post('fiscal_printer/close_partial_daily_cash').then(response => {
        this.$notify.open({ type: 'success', content: 'Se envio a la impresora fiscal' });
        this.isPrintOpen = false;
      }, error => {
        this.alert('danger', error.data);
      });
    },
    fiscalPrintDay() {
      this.$http.post('fiscal_printer/close').then(response => {
        this.$notify.open({ type: 'success', content: 'Se envio a la impresora fiscal' });
        this.isPrintOpen = false;
      }, error => {
        this.alert('danger', error.data);
      });
    },
    cancelPrint() {
      this.$notify.open({ content: 'Se cancelo la impresion fiscal de la caja parcial' });
    }
  }
});

/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ClientCodes__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ClientCodes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ClientCodes__);






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Client',
  components: { ClientCodes: __WEBPACK_IMPORTED_MODULE_2__ClientCodes___default.a },
  data() {
    return {
      loading: false,
      client: { name: '', phone: '' },
      new_name: '',
      new_phone: '',
      newPayment: { type: 'Efectivo', amount: null },
      mode: 'Parcial',
      newComment: { text: '' }
    };
  },
  beforeRouteEnter(to, from, next) {
    if (__WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].user.profile.role === 'cooker') {
      next(vm => vm.$router.push({ name: 'Kitchen' }));
    } else {
      next();
    }
  },
  watch: {
    '$route': 'fetchClient',
    'mode': 'setValue'
  },
  created() {
    this.fetchClient();
  },
  computed: {
    pending() {
      return this.notPaidTickets.reduce((total, t) => {
        return parseFloat(total) + parseFloat(t.pending);
      }, 0.0);
    },
    notPaidTickets() {
      return this.client.tickets.filter(ticket => {
        return !ticket.paid_at;
      });
    },
    paidTickets() {
      return this.client.tickets.filter(ticket => {
        return ticket.paid_at;
      });
    },
    paymentInFavor() {
      return this.client.payments.filter(payment => {
        return payment.favor;
      });
    },
    commonPayments() {
      return this.client.payments.filter(payment => {
        return !payment.favor;
      });
    }
  },
  methods: {
    dateFrom(date) {
      return __WEBPACK_IMPORTED_MODULE_0_moment___default()(date).fromNow(Date.now());
    },
    formatDate(date) {
      return __WEBPACK_IMPORTED_MODULE_0_moment___default()(date).format('DD MMMM, YYYY');
    },
    fetchClient() {
      this.loading = true;
      this.$http.get('clients/' + this.$route.params.id).then(response => {
        this.client = response.data;
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
    },
    addTicket() {
      this.$http.post('tickets', { ticket: { client_id: this.client.id } }).then(response => {
        this.$router.push({ name: 'Ticket', params: { id: response.data.id } });
      }, error => {
        this.alert('danger', error.data);
      });
    },
    setValue() {
      console.log(this.mode);
      this.newPayment.amount = this.modeTotal ? this.pending : 0;
    },
    assignPayement(payment) {
      this.$http.post('clients/' + this.client.id + '/transfer_payments', { payment_id: payment.id }).then(response => {
        this.client = response.data;
      }, error => {
        console.log(error);
      });
    },
    payDebt() {
      this.$http.post('clients/' + this.client.id + '/pay_debt', { payment: this.newPayment }).then(response => {
        this.client = response.data;
        this.newPayment.amount = 0;
      }, error => {
        console.log(error);
      });
    },
    addComment() {
      this.$http.post('clients/' + this.client.id + '/add_comment', { comment: { text: this.newComment.text } }).then(response => {
        this.client.client_comments.push(response.data);
        this.newComment.text = '';
      });
    },
    removeComment(comment) {
      this.$http.delete('clients/' + this.client.id + '/remove_comment/' + comment.id).then(() => {
        let index = this.client.client_comments.indexOf(comment);
        this.client.client_comments.splice(index, 1);
      });
    }
  }
});

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


const Config = __webpack_require__(11);
const config = new Config();

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'client-code',
  props: ['code', 'client'],
  data() {
    return {
      barcode: {
        format: config.get('barcode_format', 'EAN13'),
        width: config.get('barcode_width', 2),
        height: config.get('barcode_height', 60),
        lastChar: config.get('barcode_last_char', '>')
      },
      loding: false,
      currentCode: {},
      enabled: this.code.enabled,
      printing: false,
      businessName: config.get('business_name', ''),
      businessPhone: config.get('business_phone', ''),
      businessSlogan: config.get('business_slogan', '')
    };
  },
  methods: {
    deleteCode() {
      this.$http.delete('clients/' + this.code.client_id + '/client_codes/' + this.code.id).then(response => {
        this.$emit('remove-code');
      });
    },
    invalidateCode() {
      this.$http.put('clients/' + this.code.client_id + '/client_codes/' + this.code.id + '/invalidate').then(response => {
        this.enabled = response.data.enabled;
      });
    },
    printCode() {
      this.printing = true;
    },
    print() {
      window.print();
    },
    close() {
      this.printing = false;
    }
  }
});

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_utils_Loader__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_utils_Loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_utils_Loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ClientCode__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ClientCode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ClientCode__);





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'client-codes',
  props: ['client'],
  components: { Loader: __WEBPACK_IMPORTED_MODULE_0__components_utils_Loader___default.a, ClientCode: __WEBPACK_IMPORTED_MODULE_1__ClientCode___default.a },
  data() {
    return {
      codes: [],
      loading: false
    };
  },
  created() {
    this.loadCodes();
  },
  methods: {
    loadCodes() {
      this.loading = true;
      this.$http.get('clients/' + this.client.id + '/client_codes').then(response => {
        this.codes = response.data;
        this.loading = false;
      });
    },
    createCode() {
      this.$http.post('clients/' + this.client.id + '/client_codes').then(response => {
        this.codes.push(response.data);
      });
    },
    removeCode(index) {
      this.codes.splice(index, 1);
    }
  }
});

/***/ }),
/* 189 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_utils_Loader__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_utils_Loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_utils_Loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_Alert__ = __webpack_require__(4);






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Clients',
  components: { Loader: __WEBPACK_IMPORTED_MODULE_0__components_utils_Loader___default.a },
  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_Alert__["a" /* default */]],
  beforeRouteEnter(to, from, next) {
    if (__WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].user.profile.role === 'cooker') {
      next(vm => vm.$router.push({ name: 'Kitchen' }));
    } else {
      next();
    }
  },
  data() {
    return {
      clients: [],
      loading: false,
      meta: {},
      query: '',
      page: 1
    };
  },
  created() {
    this.fetchClients();
  },
  methods: {
    pageChange(page) {
      this.page = page;
      this.fetchClients();
    },
    reloadClients() {
      this.page = 1;
      let isEmpty = this.query.length === 0;
      if (isEmpty) {
        this.fetchClients();
      } else if (!isEmpty && this.query.length > 2) {
        this.fetchClients();
      }
    },
    fetchClients() {
      let url = 'clients?page=' + this.page;
      if (this.query && this.query.length > 2) {
        url = url + '&query=' + this.query;
      }
      this.$http.get(url).then(response => {
        this.clients = response.data.clients;
        this.meta = response.data.meta;
      }, error => {
        this.alert('danger', error.data);
      });
    },
    addTicket(client) {
      this.$http.post('tickets', { ticket: { client_id: client.id } }).then(response => {
        this.$router.push({ name: 'Ticket', params: { id: response.data.id } });
      }, error => {
        this.alert('danger', error.data);
      });
    }
  }
});

/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'create-delivery',
  props: ['tickets'],
  data() {
    return {
      newDelivery: { tickets: [], total: 0, moto_id: '' },
      current: null,
      isdragging: false,
      isdragged: false
    };
  },
  computed: {
    total() {
      return this.newDelivery.tickets.reduce((sum, ticket) => {
        return parseFloat(sum) + parseFloat(ticket.partial_total);
      }, 0.0);
    },
    sumChange() {
      return this.newDelivery.tickets.reduce((sum, ticket) => {
        return parseFloat(sum) + parseFloat(ticket.change);
      }, 0.0);
    }
  },
  methods: {
    create() {
      let data = this.newDelivery.tickets.map(ticket => {
        return { ticket_id: ticket.id, pay: ticket.pay };
      });

      this.$http.post('deliveries', { delivery: { moto_id: this.newDelivery.moto_id, total: this.total, ticket_deliveries_attributes: data }
      }).then(response => {
        console.log(response);
        this.$emit('delivery-created', response.data);
      }, error => {
        console.log(error);
      });
    },
    cancelDelivery() {
      __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.each(this.newDelivery.tickets, t => {
        t.added = false;
      });
      this.newDelivery.tickets = [];
      this.$emit('delivery-canceled');
    },
    setChange(ticket) {
      if (ticket.pay) {
        ticket.change = parseFloat(ticket.pay) - parseFloat(ticket.partial_total);
      }
    },
    addItem(evt) {
      if (this.current !== null && this.current >= 0) {
        let t = this.tickets[this.current];
        this.$set(t, 'added', true);
        this.$set(t, 'change', 0);
        this.$set(t, 'pay', 0);
        this.newDelivery.tickets.push(t);
        this.current = null;
      }
    },
    removeFromList(index) {
      let t = this.newDelivery.tickets[index];
      t.added = false;
      t.pay = 0;
      t.change = 0;
      this.newDelivery.tickets.splice(index, 1);
      this.current = null;
    },
    setDragging(index) {
      this.current = index;
    }
  }
});

/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Deliveries',
  data() {
    return {
      deliveries: [],
      loading: false
    };
  },
  created() {
    this.loadDeliveries();
  },
  methods: {
    loadDeliveries() {
      this.loading = true;
      this.$http.get('deliveries').then(response => {
        this.deliveries = response.data;this.loading = false;
      }, error => {
        console.log(error);
      });
    }
  }
});

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_deliveries_CreateDelivery__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_deliveries_CreateDelivery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_deliveries_CreateDelivery__);






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'deliveriesBar',
  components: { DeliveryComposer: __WEBPACK_IMPORTED_MODULE_2__components_deliveries_CreateDelivery___default.a },
  data() {
    return {
      delivery: [],
      createPedido: false
    };
  },
  filters: {
    truncate: function (value) {
      let dots = '...';
      let val = value.substr(0, 40);
      if (value.length > 40) {
        return val + dots;
      } else {
        return val;
      }
    }
  },
  created() {
    this.loadDelivery();
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])({
    tables: 'allTables',
    current: 'currentCash',
    users: 'allUsers'
  }), {
    readyToDelivery() {
      return this.delivery.filter(del => {
        return del.full_delivered && !del.delivery;
      });
    },
    inDelivery() {
      return this.delivery.filter(del => {
        return del.full_delivered && del.delivery && !del.delivered;
      });
    },
    pendingToDelivery() {
      return this.delivery.filter(del => {
        return !del.full_delivered && !del.delivery;
      });
    }
  }),
  methods: {
    goToDelivery(data) {
      this.createPedido = false;
      this.loadDelivery();
    },
    loadDelivery() {
      this.$http.get('tickets?without_table=true').then(response => {
        this.delivery = response.data;
      }, error => {
        this.alert('danger', error.data);
      }).catch(message => console.log(message));
    },
    prepareDelivery() {
      this.createPedido = true;
    },
    cancelPedido() {
      this.createPedido = false;
    }
  }
});

/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


const Config = __webpack_require__(11);
const config = new Config();

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Delivery',
  data() {
    return {
      delivery: {},
      loading: false,
      map: null,
      directionsService: null,
      directionsDisplay: null,
      config: {
        zoom: 6,
        center: { lat: -34.4686234, lng: -58.5181671 }
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.loading = true;
      this.$http.get('deliveries/' + this.$route.params.id).then(response => {
        this.delivery = response.data;
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
    },
    initMap() {
      if (typeof window.google !== 'undefined') {
        this.map = new window.google.maps.Map(document.getElementById('map'), this.config);
        this.directionsService = new window.google.maps.DirectionsService();
        this.directionsDisplay = new window.google.maps.DirectionsRenderer();
        this.directionsDisplay.setMap(this.map);
        this.calculateRoute();
      }
    },
    calculateRoute() {
      console.log(config);
      let _this = this;
      let waypts = this.delivery.ticket_deliveries.map(t => {
        return { location: t.address, stopover: true };
      });

      this.directionsService.route({
        origin: config.get('business_address'),
        destination: config.get('business_address'),
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          _this.directionsDisplay.setDirections(response);
          let route = response.routes[0];
          let summaryPanel = document.getElementById('directions-panel');
          summaryPanel.innerHTML = '';

          for (var i = 0; i < route.legs.length; i++) {
            let routeSegment = i + 1;
            summaryPanel.innerHTML += '<b>Recorrido: ' + routeSegment + '</b><br>';
            summaryPanel.innerHTML += '<div class="routeRow">' + route.legs[i].start_address + ' to ';
            summaryPanel.innerHTML += route.legs[i].end_address + '</div><br>';
            summaryPanel.innerHTML += '<small>Distancia: ' + route.legs[i].distance.text + '</small><br><br>';
          }
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    },
    close() {
      this.$http.put('deliveries/' + this.delivery.id + '/close').then(response => {
        this.delivery = response.data;
      }, error => {
        console.log(error);
      });
    },
    updateTicket(ticket) {
      this.$http.put('ticket_deliveries/' + ticket.id + '/close').then(response => {
        this.delivery = response.data;
      }, error => {
        console.log(error);
      });
    }
  }
});

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__KitchenRow__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__KitchenRow___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__KitchenRow__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue__ = __webpack_require__(6);








/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Kitchen',
  components: { KitchenRow: __WEBPACK_IMPORTED_MODULE_3__KitchenRow___default.a },
  data() {
    return {
      tickets: [],
      current: Date.now(),
      loading: false,
      mainCall: null,
      clock: null,
      newRequests: false,
      lastTimestamp: null,
      audio: null,
      user: __WEBPACK_IMPORTED_MODULE_2__auth__["a" /* default */].user
    };
  },
  filters: {
    upercase(value) {
      return value.toUpperCase();
    },
    titleize(value) {
      let words = value.split(' ');
      return words.map(v => v.charAt(0).toUpperCase() + v.slice(1)).join(' ');
    }
  },
  mounted() {
    this.audio = new Audio('static/sound.mp3');
  },
  computed: {
    loadingTickets() {
      return this.loading;
    },
    currentTickets() {
      return __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.sortBy(this.tickets, 'first_entry');
    },
    currentTime() {
      return this.current;
    },
    lastCheck() {
      return __WEBPACK_IMPORTED_MODULE_0_moment___default()(this.lastTimestamp).format('HH:mm:ss');
    },
    player() {
      return this.audio;
    }
  },
  created() {
    this.loadTickets();
    this.startClock();
  },
  beforeDestroy() {
    clearInterval(this.mainCall);
    clearInterval(this.clock);
  },
  methods: {
    logout() {
      this.$modal.confirm({
        title: 'Salir',
        content: 'Estas seguro de salir?',
        onOk: this.confirmLogout
      });
    },
    confirmLogout() {
      __WEBPACK_IMPORTED_MODULE_2__auth__["a" /* default */].logout();
    },
    startClock() {
      this.clock = setInterval(() => {
        this.current = Date.now();
      }, 1000);
    },
    loadTickets() {
      this.fetchTickets();
      this.mainCall = setInterval(() => {
        this.fetchTickets();
      }, 15000);
    },
    fetchTickets() {
      this.loading = true;
      this.$http.get('kitchen?last_check=' + this.lastTimestamp).then(response => {
        this.newRequests = response.data.has_new_items;
        this.tickets = response.data.t;
        this.loading = false;
        this.lastTimestamp = Date.now();
        if (this.newRequests) {
          this.player.play();
        }
      });
    },
    removeTicket(ticket) {
      __WEBPACK_IMPORTED_MODULE_4_vue__["default"].delete(this.tickets, ticket.id);
      this.$notify.open({ content: 'Ticket enviado', type: 'success' });
    }
  }
});

/***/ }),
/* 195 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue__ = __webpack_require__(6);





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'KitchenRow',
  props: ['ticket'],
  data() {
    return {
      loading: false,
      removed: false
    };
  },
  methods: {
    deliverItem(item) {
      this.loading = true;
      this.$http.post('kitchen/deliver_item', { entry_item_id: item.id }).then(response => {
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.extend(item, response.data);
        this.loading = false;
      }, error => {
        console.log(error.data);
        this.loading = false;
      });
    },
    deliverEntry(entry) {
      this.loading = true;
      this.$http.post('kitchen/deliver_entry', { entry_id: entry.id }).then(response => {
        this.loading = false;
        __WEBPACK_IMPORTED_MODULE_2_vue__["default"].delete(this.ticket.entries, entry.id);
        if (__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(this.ticket.entries).length === 0) {
          this.removed = true;
          this.$emit('remove-ticket', this.ticket);
        }
      }, error => {
        console.log(error.data);
        this.loading = false;
      });
    },
    deliverTicket() {
      this.loading = true;
      this.$http.post('kitchen/deliver_ticket', { ticket_id: this.ticket.id }).then(response => {
        this.$emit('remove-ticket', this.ticket);
        this.removed = true;
        this.loading = false;
      }, error => {
        console.log(error.data);
        this.loading = false;
      });
    }
  }
});

/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_utils_TableAutocomplete__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_utils_TableAutocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_utils_TableAutocomplete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_Alert__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_deliveries_DeliveriesBar__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_deliveries_DeliveriesBar___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_deliveries_DeliveriesBar__);









/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'PrivateApp',
  components: { TableAutocomplete: __WEBPACK_IMPORTED_MODULE_3__components_utils_TableAutocomplete___default.a, deliveriesBar: __WEBPACK_IMPORTED_MODULE_5__components_deliveries_DeliveriesBar___default.a },
  mixins: [__WEBPACK_IMPORTED_MODULE_4__mixins_Alert__["a" /* default */]],
  data() {
    return {
      loading: false,
      user: __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].user,
      isOpen: '',
      clientCode: '',
      mapRoles: {
        user: 'Usuario',
        manager: 'Manager',
        admin: 'Admin',
        cooker: 'Cocinero'
      }
    };
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_vuex__["a" /* mapGetters */])({
    tables: 'allTables',
    dailyCash: 'currentCash',
    openTables: 'openTables'
  }), {
    setPicture() {
      return this.user.profile.gender === 'mujer' ? '/static/woman.png' : '/static/user.jpg';
    },
    isLoggedIn() {
      return this.user.authenticated;
    }
  }),
  created() {
    this.loadTables();
    this.loadPartialDailyCash();
    this.loadUsers();
    this.loadReasons();
  },
  methods: {
    toggleSideBar(name) {
      if (this.isOpen === name) {
        this.isOpen = '';
      } else {
        this.isOpen = name;
      }
    },
    logout() {
      this.$modal.confirm({
        title: 'Salir',
        content: 'Estas seguro de salir?',
        onOk: this.confirmLogout
      });
    },
    confirmLogout() {
      __WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].logout();
    },
    goTo(table) {
      this.$router.push({ name: 'Ticket', params: { id: table.current.id } });
      this.isOpen = '';
    },
    openDeliveryTicket() {
      this.$http.post('tickets', { ticket: { table_id: null } }).then(response => {
        this.$router.push({ name: 'Ticket', params: { id: response.data.id } });
      }, error => {
        console.log(error);
      });
    },
    loadPartialDailyCash() {
      this.loading = true;
      this.$http.get('partial_daily_cashes/current').then(response => {
        this.$store.dispatch('setDailyCash', response.data);
      }, () => {
        console.log('error load daily cash');
        this.loading = false;
      });
    },
    loadTables() {
      this.$http.get('tables').then(response => {
        this.$store.dispatch('setTables', response.data);
        this.loading = false;
      }, error => {
        console.log(error);
        this.loading = false;
      });
    },
    loadUsers() {
      this.$http.get('users').then(response => {
        this.$store.dispatch('setUsers', response.data);
      }, error => {
        console.log(error);
        console.log('error load users');
      });
    },
    loadReasons() {
      this.$http.get('cancel_reasons').then(response => {
        this.$store.dispatch('setReasons', response.data);
      }, error => {
        console.log(error);
        console.log('error loading reasons');
      });
    },
    findClient() {
      let numberRegex = new RegExp(/^\d+$/);

      if (numberRegex.test(this.clientCode)) {
        this.findByNumber();
      } else {
        this.findByCode();
      }
    },
    findByNumber() {
      this.$http.get('clients/search?phone=' + this.clientCode).then(response => {
        this.clientCode = '';
        let client = response.data.client_id;
        this.$router.push({ name: 'Client', params: { id: client } });
      }, () => {
        this.alert('danger', 'No se encontro cliente con este numero');
      });
    },
    findByCode() {
      this.$http.get('client_codes/' + this.clientCode).then(response => {
        this.clientCode = '';
        let code = response.data;
        if (code.enabled) {
          this.$router.push({ name: 'Client', params: { id: response.data.client_id } });
        } else {
          this.alert('danger', 'El codigo buscado esta deshabilitado');
        }
      }, () => {
        this.alert('danger', 'No se encontro el codigo');
      });
    }
  }
});

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_utils_Loader__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_utils_Loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_utils_Loader__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Login',
  components: { Loader: __WEBPACK_IMPORTED_MODULE_1__components_utils_Loader___default.a },
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      error: '',
      loading: false
    };
  },
  methods: {
    submit() {
      this.loading = true;
      __WEBPACK_IMPORTED_MODULE_0__auth__["a" /* default */].login(this, this.credentials, '/');
    }
  }
});

/***/ }),
/* 198 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth__ = __webpack_require__(3);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'NotFound',
  data() {
    return {
      user: __WEBPACK_IMPORTED_MODULE_0__auth__["a" /* default */].user
    };
  }
});

/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_utils_Loader__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_utils_Loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_utils_Loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(3);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Payments',
  components: { Loader: __WEBPACK_IMPORTED_MODULE_0__components_utils_Loader___default.a },
  watch: {
    '$route': 'fetchPayments'
  },
  beforeRouteEnter(to, from, next) {
    if (__WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].user.profile.role === 'cooker') {
      next(vm => vm.$router.push({ name: 'Kitchen' }));
    } else {
      next();
    }
  },
  data() {
    return {
      payments: [],
      meta: {},
      loading: false
    };
  },
  created() {
    this.fetchPayments(1);
  },
  methods: {
    fetchPayments(page) {
      let url = 'payments?page=' + (page || 1);

      if (this.$route.params.cash_id) {
        url = url + '&cash_id=' + this.$route.params.cash_id;
      }
      if (this.$route.params.partial_daily_cash_id) {
        url = url + '&partial_daily_cash_id=' + this.$route.params.partial_daily_cash_id;
      }
      if (this.$route.params.payment_type) {
        url = url + '&payment_type=' + this.$route.params.payment_type;
      }
      if (this.$route.params.payment_favor) {
        url = url + '&payment_favor=' + this.$route.params.payment_favor;
      }
      console.log(url);
      this.$http.get(url).then(response => {
        this.payments = response.data.payments;
        this.meta = response.data.meta;
      });
    }
  }
});

/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_utils_Loader__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_utils_Loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_utils_Loader__);





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Table',
  data() {
    return {
      tickets: [],
      currentTicket: null,
      loading: false,
      loadingTickets: false
    };
  },
  created() {
    this.fetchTable();
  },
  components: { Loader: __WEBPACK_IMPORTED_MODULE_2__components_utils_Loader___default.a },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])({
    table: 'current'
  }), {
    formattedStatus() {
      return this.table.status === 'closed' ? 'Cerrada' : 'Abierta';
    },
    hasTickets() {
      return this.tickets.length > 0;
    }
  }),
  methods: {
    fetchTable() {
      this.$store.dispatch('setCurrent', this.$route.params.id);

      this.loadingTickets = true;
      this.$http.get('admin/tables/' + this.$route.params.id + '/tickets').then(response => {
        this.loadingTickets = false;
        this.tickets = response.data;
        if (this.tickets.length > 0) {
          this.currentTicket = this.tickets[0].id;
          this.loadTicket();
        }
      }, error => {
        console.log(error);
        this.loadingTickets = false;
      });
    },
    loadTicket() {
      if (this.currentTicket) {
        this.$router.push({ name: 'AdminTicket', params: { ticketId: this.currentTicket } });
      }
    }
  }
});

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_utils_Loader__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_utils_Loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_utils_Loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_Alert__ = __webpack_require__(4);








/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Tables',
  mixins: [__WEBPACK_IMPORTED_MODULE_4__mixins_Alert__["a" /* default */]],
  components: { Loader: __WEBPACK_IMPORTED_MODULE_2__components_utils_Loader___default.a },
  beforeRouteEnter(to, from, next) {
    if (__WEBPACK_IMPORTED_MODULE_3__auth__["a" /* default */].user.profile.role === 'cooker') {
      next(vm => vm.$router.push({ name: 'Kitchen' }));
    } else {
      next();
    }
  },
  data() {
    return {
      queryOpen: '',
      queryClosed: '',
      newCash: { init_amount: null, user_id: '' }
    };
  },
  filters: {
    truncate: function (value) {
      let dots = '...';
      let val = value.substr(0, 40);
      if (value.length > 40) {
        return val + dots;
      } else {
        return val;
      }
    }
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* mapGetters */])({
    tables: 'allTables',
    current: 'currentCash',
    users: 'allUsers'
  }), {
    filteredOpenTables() {
      if (this.queryOpen) {
        let regex = new RegExp(this.queryOpen.toLowerCase());
        return this.tablesOpen.filter(table => {
          return regex.test(table.description.toLowerCase());
        });
      } else {
        return this.tablesOpen;
      }
    },
    filteredClosedTables() {
      if (this.queryClosed) {
        let regex = new RegExp(this.queryClosed.toLowerCase());
        return this.tablesClosed.filter(table => {
          return regex.test(table.description.toLowerCase());
        });
      } else {
        return this.tablesClosed;
      }
    },
    tablesOpen() {
      return this.tables.filter(t => {
        return !t.closed;
      });
    },
    tablesClosed() {
      return this.tables.filter(t => {
        return t.closed;
      });
    },
    loading() {
      return this.$parent.loading;
    }
  }),
  methods: {
    openCailyCash() {
      this.$http.post('partial_daily_cashes', {
        partial_daily_cash: { init_amount: this.newCash.init_amount, user_id: this.newCash.user_id }
      }).then(response => {
        this.$store.dispatch('updateDailyCash', response.data);
      }, error => {
        this.alert('danger', error.data);
      });
    },
    openTable(table) {
      this.$http.post('tables/' + table.id + '/open').then(response => {
        this.$store.dispatch('updateTable', response.data);
        this.$router.push({ name: 'Ticket', params: { id: response.data.current.id } });
      }, error => {
        this.alert('danger', error.data);
      });
    }
  }
});

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Ticket',
  watch: {
    '$route': 'fetchTicket'
  },
  filters: {
    withDecimals: function (value) {
      return parseFloat(value).toFixed(2);
    }
  },
  data() {
    return {
      ticket: { id: null, number: null, entries: [], paid_at: null, closed: false }
    };
  },
  created() {
    this.fetchTicket();
  },
  computed: {
    subTotal() {
      return parseFloat(this.ticket.entries.reduce((sum, entry) => {
        return parseFloat(sum) + parseFloat(entry.subtotal);
      }, 0));
    },
    subTotalPay() {
      return parseFloat(this.ticket.payments.reduce((sum, payment) => {
        return parseFloat(sum) + parseFloat(payment.amount);
      }, 0));
    },
    diff() {
      return parseFloat(this.subTotal) - parseFloat(this.subTotalPay);
    }
  },
  methods: {
    reloadInfo() {
      this.fetchTicket();
    },
    fetchTicket(openModal) {
      this.$http.get('admin/tables/' + this.$route.params.id + '/tickets/' + this.$route.params.ticketId).then(response => {
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.ticket, response.data);
      }, () => {
        this.$notify.open({
          type: 'danger',
          content: 'No se encontro el ticket',
          title: 'Error Cargando Ticket'
        });
      });
    }
  }
});

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_google_autocomplete__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_google_autocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_google_autocomplete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TicketContent__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TicketContent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__TicketContent__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_utils_ClientsAutocomplete__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_utils_ClientsAutocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_utils_ClientsAutocomplete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_utils_TableAutocompleteAssign__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_utils_TableAutocompleteAssign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_utils_TableAutocompleteAssign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__auth__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mixins_Alert__ = __webpack_require__(4);











const Config = __webpack_require__(11);
const config = new Config();

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Ticket',
  components: {
    TicketContent: __WEBPACK_IMPORTED_MODULE_2__TicketContent___default.a,
    ClientsAutocomplete: __WEBPACK_IMPORTED_MODULE_3__components_utils_ClientsAutocomplete___default.a,
    TableAutocomplete: __WEBPACK_IMPORTED_MODULE_4__components_utils_TableAutocompleteAssign___default.a,
    VueGoogleAutocomplete: __WEBPACK_IMPORTED_MODULE_1_vue_google_autocomplete___default.a
  },
  mixins: [__WEBPACK_IMPORTED_MODULE_8__mixins_Alert__["a" /* default */]],
  filters: {
    uppercase(value) {
      return value.toUpperCase();
    },
    withDash(value) {
      return value.slice(0, 6) + '-' + value.slice(6, value.length);
    }
  },
  beforeRouteEnter(to, from, next) {
    if (__WEBPACK_IMPORTED_MODULE_7__auth__["a" /* default */].user.profile.role === 'cooker') {
      next(vm => vm.$router.push({ name: 'Kitchen' }));
    } else {
      next();
    }
  },
  watch: {
    '$route': 'fetchTicket'
  },
  created() {
    this.fetchTicket();
  },
  data() {
    return {
      addressInput: '',
      barcode: {
        format: config.get('barcode_format', 'EAN13'),
        width: config.get('barcode_width', 2),
        height: config.get('barcode_height', 60),
        lastChar: config.path
      },
      loading: false,
      loadingClients: false,
      loadingTables: false,
      kitchenView: false,
      clients: [],
      isOpen: false,
      isPrintOpen: false,
      date: Date.now(),
      print: {
        ticket_type: '',
        customer_name: '',
        customer_address: '',
        customer_doc_nbr: '',
        customer_doc_type: '',
        iva_type: '',
        iva: ''
      },
      ticket: {
        client: {},
        table_id: null,
        client_id: null,
        status: null,
        paid_at: null,
        total: 0.0,
        full_delivered: false,
        closed: false,
        paid: false,
        pay: 'efectivo'
      },
      new_table_id: '',
      new_client_id: ''
    };
  },
  computed: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_vuex__["a" /* mapGetters */])({
    tables: 'closedTables',
    reasons: 'allReasons'
  }), {
    closed() {
      return this.ticket.status === 'closed';
    },
    formattedStatus() {
      return this.ticket.status === 'closed' ? 'Cerrado' : 'Abierto';
    },
    canBeClosed() {
      return this.ticket.client_id || this.ticket.paid || this.ticket.total === 0;
    },
    currentTable() {
      if (this.ticket.table_id) {
        return this.ticket.table.description;
      } else {
        return 'Ticket Delivery';
      }
    },
    currentClient() {
      if (this.ticket.client_id) {
        return this.ticket.client.name;
      } else {
        return 'Seleccione Cliente';
      }
    }
  }),
  methods: {
    fetchTicket() {
      this.loading = true;
      this.$http.get('tickets/' + this.$route.params.id).then(response => {
        __WEBPACK_IMPORTED_MODULE_6_lodash___default.a.extend(this.ticket, response.data);
        if (this.ticket.client_id) {
          this.ticket.address = this.ticket.address || this.ticket.client.address;
        }
        this.loading = false;
      }, error => {
        console.log(error.data);
        this.alert('danger', 'No se encontro el ticket');
        this.$router.push({ name: 'Tables' });
      });
    },
    updateTicket(a, placeResultData) {
      this.$http.put('tickets/' + this.ticket.id, { ticket: { address: placeResultData.formatted_address } }).then(() => {
        this.alert('success', 'Se actualizo la direccion para envio');
      }, error => {
        console.log(error.data);
        this.alert('danger', 'No se puedo actualizer la direccion');
      });
    },
    closeTicketModal() {
      this.isOpen = true;
      setTimeout(() => {
        document.getElementById('submit-ticket-form').focus();
      }, 100);
    },
    deleteTicket() {
      this.$modal.confirm({
        title: 'Eliminar ticket',
        content: 'Estas seguro de eliminar este ticket',
        onOk: this.confirmDelete
      });
    },
    confirmDelete() {
      this.$http.delete('tickets/' + this.ticket.id).then(() => {
        if (this.ticket.table) {
          this.$store.dispatch('closeTable', this.ticket.table);
        }
        this.$router.push({ name: 'Tables' });
        this.alert('success', 'Ticket eliminado!');
      }, error => {
        this.alert('danger', error.data);
      });
    },
    closeTicket() {
      if (!this.ticket.pay) {
        this.ticket.pay = 'efectivo';
      }

      this.$http.post('tickets/' + this.$route.params.id + '/close', { ticket: { status: 'closed', pay: this.ticket.pay } }).then(response => {
        this.isOpen = false;
        __WEBPACK_IMPORTED_MODULE_6_lodash___default.a.extend(this.ticket, response.data);
        if (this.ticket.table) {
          this.$store.dispatch('updateTable', response.data.table);
        }
        this.alert('success', 'Ticket cerrado!');
      }, error => {
        this.alert('danger', error.data);
      });
    },
    setPaid(value) {
      this.ticket.paid = true;
      this.ticket.pending = value;
    },
    setNotPaid(value) {
      this.ticket.paid = false;
      this.ticket.pending = value;
    },
    reopenTicket() {
      this.$http.post('tickets/' + this.ticket.id + '/reopen', { ticket: { status: 'open' } }).then(response => {
        __WEBPACK_IMPORTED_MODULE_6_lodash___default.a.extend(this.ticket, response.data);
        this.alert('success', 'Ticket re abierto!');
      }, error => {
        this.alert('danger', error.data);
      });
    },
    removeTable() {
      this.traslateTicket();
    },
    traslateTicket(newTableId) {
      let message = null;
      let kind = null;
      let oldTable = this.ticket.table;
      let params = { table_id: newTableId };
      this.$http.post('tickets/' + this.ticket.id + '/traslate', params).then(response => {
        let newTable = response.data.table;
        __WEBPACK_IMPORTED_MODULE_6_lodash___default.a.extend(this.ticket, response.data);
        kind = 'success';
        if (newTable) {
          this.$store.dispatch('updateTable', newTable);
        }

        if (oldTable) {
          this.$store.dispatch('closeTable', oldTable);
        }
        message = this.ticket.table_id ? 'Nueva Mesa asignada: ' + this.ticket.table.description : 'Ticket Delivery';
        this.alert(kind, message);
      }, error => {
        this.alert('danger', error.data);
      });
    },
    removeClient() {
      this.new_client_id = null;
      this.assignClient();
    },
    assignClient(newClientId) {
      let params = { client_id: newClientId };

      this.$http.post('tickets/' + this.ticket.id + '/assign', params).then(response => {
        __WEBPACK_IMPORTED_MODULE_6_lodash___default.a.extend(this.ticket, response.data);
        let message, kind;

        if (this.ticket.client_id) {
          message = 'Nuevo cliente asignado: ' + this.ticket.client.name;
          kind = 'success';
          this.ticket.address = this.ticket.client.address;

          if (this.ticket.table_id) {
            this.$store.dispatch('changeUserTable', { table: this.ticket.table_id, client: { id: this.ticket.client_id, name: this.ticket.client.name, address: this.ticket.client.address } });
          }
        } else {
          message = 'Ticket sin cliente asignado!';
          kind = 'danger';
          if (this.ticket.table_id) {
            this.$store.dispatch('changeUserTable', { table: this.ticket.table_id, client: { id: null, name: null, address: null } });
          }
        }

        this.alert(kind, message);
      }, error => {
        this.alert('danger', error.data);
      });
    },
    toggleKitchenView() {
      this.kitchenView = true;
      this.printTicket();
    },
    printTicket() {
      this.$http.put('tickets/' + this.ticket.id, { ticket: { printed_at: new Date() } }).then(response => {
        this.ticket = response.data;
        window.print();
        this.kitchenView = false;
      }, error => {
        this.alert('danger', error.data);
        this.kitchenView = false;
      });
    },
    cancelPrint() {
      this.$notify.open({ content: 'Impresion cancelada' });
    },
    fiscalPrint() {
      this.$http.post('fiscal_printer/print', { ticket_id: this.ticket.id, fiscal_printer: this.print }).then(response => {
        this.$notify.open({ type: 'success', content: 'Se envio a la impresora fiscal' });
        this.isPrintOpen = false;
      }, error => {
        this.alert('danger', error.data);
      });
    },
    printFiscalTicket() {
      this.isPrintOpen = true;
    },
    cancelFiscalPrint() {
      this.$notify.open({ content: 'Impresion fiscal cancelada' });
    },
    closeModal() {
      this.isOpen = false;
    },
    closePrintModal() {
      this.isPrintOpen = false;
    }
  }
});

/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'TicketAdditionalForm',
  props: ['status'],
  data() {
    return {
      entry: { quantity: 1, subtotal: 0, comment: null, kitchen: false }
    };
  },
  methods: {
    addEntry() {
      if (this.entry.comment) {
        this.$emit('save-entry', this.entry);
        this.entry = { quantity: 1, subtotal: 0, comment: null, kitchen: false };
      } else {
        this.$notify.open({
          content: 'Tenes que ingresar una descripcion',
          duration: 5000,
          type: 'danger'
        });
      }
    }
  }
});

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_utils_Loader__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_utils_Loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_utils_Loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TicketRow__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TicketRow___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__TicketRow__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TicketPayment__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TicketPayment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__TicketPayment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TicketItemForm__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TicketItemForm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__TicketItemForm__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__TicketPromoForm__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__TicketPromoForm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__TicketPromoForm__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TicketAdditionalForm__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TicketAdditionalForm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__TicketAdditionalForm__);










/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'TicketContent',
  props: ['ticket', 'reasons', 'kitchenView'],
  components: {
    TicketRow: __WEBPACK_IMPORTED_MODULE_2__TicketRow___default.a,
    TicketPayment: __WEBPACK_IMPORTED_MODULE_3__TicketPayment___default.a,
    TicketItemForm: __WEBPACK_IMPORTED_MODULE_4__TicketItemForm___default.a,
    TicketPromoForm: __WEBPACK_IMPORTED_MODULE_5__TicketPromoForm___default.a,
    TicketAdditionalForm: __WEBPACK_IMPORTED_MODULE_6__TicketAdditionalForm___default.a,
    Loader: __WEBPACK_IMPORTED_MODULE_1__components_utils_Loader___default.a
  },
  watch: {
    '$route': 'focusCode',
    'ticket.closed': 'fetchEntries'
  },
  data() {
    return {
      type: 'Item',
      items: [],
      promotions: [],
      entries: [],
      isShow: false,
      loading: false,
      pending: 0
    };
  },
  created() {
    this.pending = this.ticket.pending;
    this.populateData();
    this.fetchEntries();
    this.focusCode();
  },
  computed: {
    favoriteData() {
      let data = {};
      data.promotions = this.promotions.filter(function (promotion) {
        return promotion.favorite;
      });
      data.items = this.items.filter(function (item) {
        return item.favorite;
      });
      return data;
    },
    total() {
      this.ticket.total = this.entries.filter(e => {
        return !e.canceled;
      }).reduce(function (total, entry) {
        return parseFloat(total) + parseFloat(entry.subtotal);
      }, 0.0);

      return this.ticket.total;
    },
    totalLines() {
      return this.entries.filter(e => {
        return !e.canceled;
      }).length;
    },
    totalCanceledLines() {
      return this.entries.filter(e => {
        return e.canceled;
      }).length;
    }
  },
  methods: {
    fetchEntries() {
      if (typeof this.ticket.id === 'undefined') {
        return;
      }
      this.loading = true;
      this.$http.get('tickets/' + this.ticket.id + '/entries').then(response => {
        this.entries = response.data;
        this.loading = false;
      });
    },
    toggleEntry(value) {
      this.type = value;
      this.focusCode();
    },
    focusCode() {
      __WEBPACK_IMPORTED_MODULE_0_vue__["default"].nextTick(() => {
        let elem = document.getElementById('code');
        if (elem) {
          elem.focus();
        }
      });
    },
    addEntry(entry) {
      let params = {
        ticketable_type: this.type,
        subtotal: entry.subtotal,
        quantity: entry.quantity,
        comment: entry.comment,
        ticket_id: this.ticket.id,
        additional_kitchen: entry.kitchen
      };
      params.ticketable_id = this.type !== 'Additional' ? entry.item.id : null;

      this.$http.post('tickets/' + this.ticket.id + '/entries', { entry: params }).then(response => {
        var index = this.entries.findIndex(function (entry) {
          return entry.id === response.data.id;
        });
        if (index > -1) {
          this.entries.splice(index, 1);
        }
        this.entries.push(response.data);
        this.toggleEntry('Item');
        document.getElementById('code').focus();
      }, error => {
        this.$notify.open({
          content: error.data || 'Error agregando Item',
          duration: 3000,
          type: 'danger'
        });
      });
    },
    populateData() {
      this.$http.get('items').then(response => {
        this.items = response.data;
      });
      this.$http.get('promotions').then(response => {
        this.promotions = response.data;
      });
    },
    setPaid(value) {
      this.$emit('ticket-paid', value);
      this.pending = value;
    },
    setNotPaid(value) {
      this.$emit('ticket-not-paid', value);
      this.pending = value;
    }
  }
});

/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ItemsAutocomplete__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ItemsAutocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils_ItemsAutocomplete__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_Alert__ = __webpack_require__(4);





/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'TicketItemForm',
  props: ['items', 'status'],
  components: { autocomplete: __WEBPACK_IMPORTED_MODULE_1__utils_ItemsAutocomplete___default.a },
  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_Alert__["a" /* default */]],
  data() {
    return {
      entry: { comment: null, subtotal: 0, code: null, quantity: 1 },
      item: { id: null, name: '', price: null, code: null, description: '' }
    };
  },
  methods: {
    addEntry() {
      if (this.item.id) {
        this.entry.item = this.item;
        this.$emit('save-entry', this.entry);
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.entry, { comment: null, subtotal: 0, quantity: 1, item: {} });
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.item, { id: null, name: '', price: null, code: null, description: '' });
      } else {
        this.alert('danger', 'No hay item seleccionado');
      }
    },
    setTotal() {
      if (this.item.id) {
        this.entry.subtotal = parseFloat(this.item.price) * parseInt(this.entry.quantity);
      }
    },
    getItem(item) {
      if (item) {
        this.item = item;
      }

      this.pickItem();
    },
    pickItem() {
      if (!this.item.code) {
        return;
      }

      let fi = this.items.find(i => {
        return parseInt(this.item.code) === parseInt(i.code);
      });

      if (fi) {
        this.item = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.clone(fi);
        this.setTotal();
      } else {
        if (this.item.id) {
          __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.item, { id: null, name: '', price: null, code: null, description: '' });
        }
        this.alert('danger', 'Item no encontrado');
      }
    }
  }
});

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_utils_Loader__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_utils_Loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_utils_Loader__);






/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'TicketPAyment',
  components: { Loader: __WEBPACK_IMPORTED_MODULE_2__components_utils_Loader___default.a },
  props: ['ticket', 'total'],
  data() {
    return {
      loading: false,
      newPayment: { type: 'Efectivo', amount: null, error: null, isFull: false },
      payments: [],
      amountInFavor: 0
    };
  },
  computed: {
    pending() {
      let value = this.total - this.subtotal;
      if (value > 0) {
        this.$emit('ticket-not-paid', value);
      } else {
        this.$emit('ticket-paid', value);
      }
      return value;
    },
    subtotal() {
      return this.payments.reduce(function (total, payment) {
        return parseFloat(total) + parseFloat(payment.amount);
      }, 0.0);
    },
    totalCash() {
      return this.payments.filter(p => {
        return p.type === 'Efectivo';
      }).reduce(function (total, payment) {
        return parseFloat(total) + parseFloat(payment.amount);
      }, 0.0);
    },
    totalCard() {
      return this.payments.filter(p => {
        return p.type === 'Tarjeta';
      }).reduce(function (total, payment) {
        return parseFloat(total) + parseFloat(payment.amount);
      }, 0.0);
    }
  },
  created() {
    this.loadPayments();
  },
  watch: {
    'ticket.closed': 'loadPayments'
  },
  methods: {
    loadPayments() {
      this.loading = true;
      this.$http.get('tickets/' + this.ticket.id + '/payments').then(response => {
        this.payments = response.data;
        if (this.ticket.paid_at) {
          this.paid = true;
        }
        this.loading = false;
      }, error => {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(error.data).map(name => {
          this.$notify.danger({ content: '<b>' + name + ':</b> <p>' + error.data[name].join(', ') + '</p>', duration: 10000 });
        });
        this.loading = false;
      });
    },
    addPayment() {
      if (parseFloat(this.newPayment.amount) > this.pending) {
        if (this.ticket.client_id) {
          this.amountInFavor = this.newPayment.amount - this.pending;
        } else {
          this.$notify.open({
            type: 'danger',
            content: 'Puede guardar a favor si hay un cliente asignado'
          });
          return false;
        }
      }

      let params = {
        ticket_id: this.ticket.id,
        amount: this.newPayment.amount - this.amountInFavor,
        type: this.newPayment.type,
        client_id: this.ticket.client_id,
        in_favor: this.amountInFavor
      };

      this.$http.post('tickets/' + this.ticket.id + '/payments', { payment: params }).then(response => {
        this.payments.push(response.data);
        __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.extend(this.newPayment, { amount: null, type: 'Efectivo', error: null });
        this.amountInFavor = 0;
        if (this.pending === 0) {
          this.$emit('ticket-paid');
        }
      }, error => {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_keys___default()(error.data).map(name => {
          this.$notify.danger({ content: '<b>' + name + ':</b> <p>' + error.data[name].join(', ') + '</p>', duration: 10000 });
        });
      });
    },
    removePayment(payment) {
      this.$http.delete('tickets/' + this.ticket.id + '/payments/' + payment.id).then(() => {
        let index = this.payments.indexOf(payment);
        this.payments.splice(index, 1);
      });
    },
    setAmount(isfull) {
      this.newPayment.isFull = isfull;

      if (this.newPayment.isFull) {
        this.newPayment.amount = this.pending;
      } else {
        this.newPayment.amount = 0.0;
      }
      document.getElementById('payment-type').focus();
    },
    applyPayment(payment) {
      if (this.pending === 0) {
        this.$notify.open({ type: 'danger', content: 'No se puede asignar un pago a un ticket sin pendiente' });
      } else if (this.pending < payment.amount) {
        let params = {
          ticket_id: this.ticket.id,
          amount: this.pending,
          type: this.newPayment.type,
          client_id: this.ticket.client_id
        };

        this.$http.post('payments/' + payment.id + '/transfer', { payment: params }).then(response => {
          __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.extend(payment, response.data.old_payment);
          this.payments.push(response.data.new_payment);
        });
      } else {
        this.$http.post('payments/' + payment.id + '/apply_payment', { payment: { ticket_id: this.ticket.id } }).then(response => {
          let index = this.ticket.client.in_favor.indexOf(payment);
          this.ticket.client.in_favor.splice(index, 1);
          this.payments.push(response.data);
        });
      }
    },
    moveToFavor(payment) {
      this.$http.post('payments/' + payment.id + '/save_for_later').then(response => {
        this.ticket.client.in_favor.push(response.data);
        let index = this.payments.indexOf(payment);
        this.payments.splice(index, 1);
      });
    }
  }
});

/***/ }),
/* 208 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ItemsAutocomplete__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_ItemsAutocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__utils_ItemsAutocomplete__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'TicketPromoForm',
  props: ['promotions', 'status'],
  components: { autocomplete: __WEBPACK_IMPORTED_MODULE_1__utils_ItemsAutocomplete___default.a },
  data() {
    return {
      promotion: { id: null, name: '', price: null, code: null, description: '' },
      entry: { comment: null, subtotal: 0, quantity: 1, item: {} }
    };
  },
  methods: {
    addEntry() {
      if (this.promotion.id) {
        this.entry.item = this.promotion;
        this.$emit('save-entry', this.entry);
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.entry, { comment: null, subtotal: 0, quantity: 1, item: {} });
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.promotion, { id: null, name: '', price: null, code: null, description: '' });
      } else {
        this.$notify.open({
          content: 'No hay item seleccionado',
          duration: 5000,
          type: 'danger'
        });
      }
    },
    setTotal() {
      if (this.promotion.id) {
        this.entry.subtotal = parseFloat(this.promotion.price) * parseInt(this.entry.quantity);
      }
    },
    setPromotion(promotion) {
      this.promotion = promotion;
      this.pickPromotion();
    },
    pickPromotion() {
      if (!this.promotion.code) {
        return;
      }

      let fp = this.promotions.find(p => {
        return parseInt(this.promotion.code) === parseInt(p.code);
      });

      if (fp) {
        this.promotion = __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.clone(fp);
        this.setTotal();
      } else {
        if (this.promotion.id) {
          __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(this.promotion, { id: null, name: '', price: null, code: null, description: '' });
        }
        this.$notify.open({
          content: 'Promocion no encontrado',
          duration: 5000,
          type: 'danger'
        });
      }
    }
  }
});

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'TicketRow',
  props: ['entry', 'tclosed', 'tprinted', 'reasons', 'kitchenView'],
  data() {
    return {
      loading: false,
      cancel_reason: null
    };
  },
  methods: {
    toggleShow() {
      this.entry.show = !this.entry.show;
    },
    cancel(entry) {
      this.loading = true;
      this.$http.put('tickets/' + entry.ticket_id + '/entries/' + entry.id + '/cancel?reason=' + this.cancel_reason).then(() => {
        entry.canceled = true;
        this.cancel_reason = null;
        this.loading = false;
        this.$emit('reload-content');
      }, error => {
        this.loading = false;
        console.log(error.data);
      });
    },
    saveRow(entry) {
      this.$http.put('tickets/' + entry.ticket_id + '/entries/' + entry.id, { entry: { comment: entry.comment } }).then(response => {
        console.log(response);
        this.$notify.open({
          type: 'success',
          content: 'Entrada actualizada.'
        });
      });
    },
    increase(entry) {
      this.$http.put('tickets/' + entry.ticket_id + '/entries/' + entry.id + '/increase').then(response => {
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(entry, response.data);
        entry.show = true;
      }, error => {
        console.log(error.data);
      });
    },
    deliverAll(entry) {
      this.$http.put('tickets/' + entry.ticket_id + '/entries/' + entry.id + '/deliver').then(response => {
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(entry, response.data);
        entry.show = true;
      }, error => {
        console.log(error.data);
      });
    },
    deliverItem(entry, item) {
      this.$http.put('tickets/' + entry.ticket_id + '/entries/' + entry.id + '/deliver?item=' + item.id).then(response => {
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(entry, response.data);
        entry.show = true;
      }, error => {
        console.log(error.data);
      });
    },
    cancelItem(entry, item) {
      this.$http.put('tickets/' + entry.ticket_id + '/entries/' + entry.id + '/cancel?item=' + item.id + '&reason=' + this.cancel_reason).then(response => {
        __WEBPACK_IMPORTED_MODULE_0_lodash___default.a.extend(entry, response.data);
        this.cancel_reason = null;
        entry.show = true;
        this.$emit('reload-content');
      }, error => {
        console.log(error.data);
      });
    }
  }
});

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_utils_Loader__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_utils_Loader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_utils_Loader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth__ = __webpack_require__(3);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Tickets',
  components: { Loader: __WEBPACK_IMPORTED_MODULE_0__components_utils_Loader___default.a },
  watch: {
    '$route': 'fetchTickets'
  },
  beforeRouteEnter(to, from, next) {
    if (__WEBPACK_IMPORTED_MODULE_1__auth__["a" /* default */].user.profile.role === 'cooker') {
      next(vm => vm.$router.push({ name: 'Kitchen' }));
    } else {
      next();
    }
  },
  data() {
    return {
      tickets: [],
      meta: {},
      loading: false
    };
  },
  created() {
    this.fetchTickets(1);
  },
  methods: {
    fetchTickets(page) {
      this.$http.get('tickets?page=' + (page || 1)).then(response => {
        this.tickets = response.data.tickets;
        this.meta = response.data.meta;
      });
    }
  }
});

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth__ = __webpack_require__(3);



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Profile',
  data() {
    return {
      user: __WEBPACK_IMPORTED_MODULE_0__auth__["a" /* default */].user,
      authCreds: { password: null, password_confirmation: null },
      oldPassword: null,
      roles: {
        admin: 'Administrador',
        user: 'Usuario',
        manager: 'Manager',
        cooker: 'Cocinero'
      }
    };
  },
  computed: {
    updatePassword() {
      return !!this.authCreds.password && !!this.authCreds.password_confirmation;
    }
  },
  methods: {
    update() {
      let params = {
        name: this.user.profile.name,
        email: this.user.profile.email,
        old_password: this.oldPassword,
        address: this.user.profile.address,
        phone: this.user.profile.phone,
        cuil: this.user.profile.cuil,
        gender: this.user.profile.gender
      };
      if (this.updatePassword) {
        params.password = this.authCreds.password;
        params.password_confirmation = this.authCreds.passwordConfirmation;
      }

      this.$http.put('users/profile', { user: params }).then(response => {
        this.$notify.open({
          type: 'success',
          content: 'Perfil actualizado'
        });
        this.oldPassword = null;
      }, error => {
        this.$notify.open({
          type: 'danger',
          content: error.data.message
        });
      });
    }
  }
});

/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'ClientsAutocomplete',
  props: ['ticket'],
  computed: {
    filteredClients() {
      if (this.query) {
        let regex = new RegExp(this.query.toLowerCase());
        return this.clients.filter(client => {
          return regex.test(client.name.toLowerCase());
        });
      } else {
        return this.clients;
      }
    }
  },
  data() {
    return {
      previousSelection: '',
      query: this.ticket.client.name,
      current: -1,
      focused: false,
      loadingClients: false,
      clients: []
    };
  },
  mounted() {
    this.loadClients();
  },
  methods: {
    hit() {
      let index = this.filteredClients.length === 1 ? 0 : this.current;
      let item = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.clone(this.filteredClients[index]);
      this.$emit('set-client', item);
      this.focused = false;
      this.query = item.name;
      __WEBPACK_IMPORTED_MODULE_0_vue__["default"].nextTick(() => {
        document.getElementById('search-clients').blur();
      });
    },
    removeClient() {
      this.$emit('remove-client');
      this.query = '';
      this.focused = false;
    },
    up(events) {
      if (this.current > 0) {
        this.current--;
      } else if (this.current === 0 && this.filteredClients.length > 2) {
        this.current = this.filteredClients.length - 1;
      }

      let parent = document.getElementById('queryListClient');
      let children = parent.getElementsByTagName('li');
      children[this.current].scrollIntoView(false);
    },
    down(events) {
      if (this.current < this.filteredClients.length - 1) {
        this.current++;
      } else {
        this.current = 0;
      }
      let parent = document.getElementById('queryListClient');
      let children = parent.getElementsByTagName('li');
      children[this.current].scrollIntoView(false);
    },
    setFocus() {
      this.previousSelection = this.query;
      this.query = '';
      this.focused = true;
      document.getElementById('search-clients').focus();
    },
    setBlur() {
      if (this.query.trim() === '') {
        this.query = this.previousSelection;
      }
      this.focused = false;
    },
    setActive(index) {
      this.current = index;
    },
    activeClass(index) {
      return {
        active: this.current === index
      };
    },
    loadClients() {
      if (this.clients.length < 1) {
        this.loadingClients = true;
        this.$http.get('clients?paginate=false').then(response => {
          this.clients = response.data;
          this.loadingClients = false;
        }, error => {
          this.alert('danger', error.data);
          this.loadingClients = false;
        });
      }
    }
  }
});

/***/ }),
/* 213 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'ItemAutocomplete',
  props: {
    items: { type: Array, default: [] },
    status: { type: Boolean, default: false },
    name: null
  },
  watch: {
    name() {
      this.query = this.name;
    }
  },
  computed: {
    filteredItems() {
      if (this.query) {
        let regex = new RegExp(this.query.toLowerCase());
        return this.items.filter(item => {
          return regex.test(item.code) || regex.test(item.name.toLowerCase());
        });
      } else {
        return this.items;
      }
    }
  },
  data() {
    return {
      current: -1,
      focused: false,
      selected: false,
      query: this.name
    };
  },
  methods: {
    hit() {
      let index = this.filteredItems.length === 1 ? 0 : this.current;
      let found = this.filteredItems[index];
      this.$emit('item-selected', found);
      this.query = found.name;
      this.selected = true;
      this.focused = false;
    },
    reset() {
      if (!this.selected) {
        this.query = null;
      }
      this.focused = false;
      document.getElementById('search').blur();
    },
    up(events) {
      if (this.current > 0) {
        this.current--;
      } else if (this.current === 0 && this.filteredItems.length > 2) {
        this.current = this.filteredItems.length - 1;
      }

      let parent = document.getElementById('queryList');
      let children = parent.getElementsByTagName('li');
      children[this.current].scrollIntoView(false);
    },
    down(events) {
      if (this.current < this.filteredItems.length - 1) {
        this.current++;
      } else {
        this.current = 0;
      }
      let parent = document.getElementById('queryList');
      let children = parent.getElementsByTagName('li');
      children[this.current].scrollIntoView(false);
    },
    setFocus() {
      document.getElementById('search').focus();
    },
    setActive(index) {
      this.current = index;
    },
    activeClass(index) {
      return {
        active: this.current === index
      };
    }
  }
});

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Loader',
  props: {
    hideText: {
      type: Boolean,
      default: false
    }
  }
});

/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'TableAutocomplete',
  props: {
    tables: {
      type: Array,
      default: []
    }
  },
  computed: {
    filteredTables() {
      if (this.query) {
        let regex = new RegExp(this.query.toLowerCase());
        return this.tables.filter(table => {
          let tnumber = table.current.id ? table.current.number : '';
          return regex.test(table.description.toLowerCase()) || regex.test(tnumber.toLowerCase());
        });
      } else {
        return this.tables;
      }
    }
  },
  data() {
    return {
      current: -1,
      focused: false,
      query: ''
    };
  },
  methods: {
    hit() {
      let index = this.filteredTables.length === 1 ? 0 : this.current;
      let item = this.filteredTables[index];
      if (!item.closed && item.current.id) {
        this.$router.push({ name: 'Ticket', params: { id: item.current.id } });
        this.reset();
      } else {
        this.$http.post('tables/' + item.id + '/open').then(response => {
          this.$store.dispatch('updateTable', response.data);
          this.$router.push({ name: 'Ticket', params: { id: response.data.current.id } });
          this.reset();
        }, error => {
          this.$notify.open({
            type: 'Danger',
            title: 'Error',
            content: error.data
          });
        });
      }
    },
    reset() {
      this.query = '';
      this.focused = false;
      document.getElementById('search').blur();
    },
    up(events) {
      if (this.current > 0) {
        this.current--;
      } else if (this.current === 0 && this.filteredTables.length > 2) {
        this.current = this.filteredTables.length - 1;
      }

      let parent = document.getElementById('queryList');
      let children = parent.getElementsByTagName('li');
      children[this.current].scrollIntoView(false);
    },
    down(events) {
      if (this.current < this.filteredTables.length - 1) {
        this.current++;
      } else {
        this.current = 0;
      }
      let parent = document.getElementById('queryList');
      let children = parent.getElementsByTagName('li');
      children[this.current].scrollIntoView(false);
    },
    setFocus() {
      this.query = '';
      this.focused = true;
      document.getElementById('search').focus();
    },
    setActive(index) {
      this.current = index;
    },
    activeClass(index) {
      return {
        active: this.current === index
      };
    }
  }
});

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'TableAutocomplete',
  props: ['ticket', 'tables'],
  computed: {
    filteredTables() {
      if (this.query) {
        let regex = new RegExp(this.query.toLowerCase());
        return this.tables.filter(table => {
          return regex.test(table.description.toLowerCase());
        });
      } else {
        return this.tables;
      }
    }
  },
  data() {
    return {
      current: -1,
      focused: false,
      previousSelection: '',
      query: this.ticket.table ? this.ticket.table.description : ''
    };
  },
  methods: {
    hit() {
      let index = this.filteredTables.length === 1 ? 0 : this.current;
      let item = __WEBPACK_IMPORTED_MODULE_1_lodash___default.a.clone(this.filteredTables[index]);
      this.$emit('set-table', item);
      this.focused = false;
      this.query = item.description;
      __WEBPACK_IMPORTED_MODULE_0_vue__["default"].nextTick(() => {
        document.getElementById('assign-input').blur();
      });
    },
    removeTable() {
      this.$emit('remove-table');
      this.focused = false;
      this.query = '';
    },
    up(events) {
      if (this.current > 0) {
        this.current--;
      } else if (this.current === 0 && this.filteredTables.length > 2) {
        this.current = this.filteredTables.length - 1;
      }

      let parent = document.getElementById('assignTableList');
      let children = parent.getElementsByTagName('li');
      children[this.current].scrollIntoView(false);
    },
    down(events) {
      if (this.current < this.filteredTables.length - 1) {
        this.current++;
      } else {
        this.current = 0;
      }
      let parent = document.getElementById('assignTableList');
      let children = parent.getElementsByTagName('li');
      children[this.current].scrollIntoView(false);
    },
    setFocus() {
      this.previousSelection = this.query;
      this.query = '';
      this.focused = true;
      document.getElementById('assign-input').focus();
    },
    setBlur() {
      if (this.query.trim() === '') {
        this.query = this.previousSelection;
      }
      this.focused = false;
    },
    setActive(index) {
      this.current = index;
    },
    activeClass(index) {
      return {
        active: this.current === index
      };
    }
  }
});

/***/ }),
/* 217 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AdminItemAutocomplete',
  props: {
    items: {
      type: Array,
      default: []
    },
    action: {
      type: String,
      default: 'open'
    },
    name: null
  },
  watch: {
    name() {
      this.query = this.name;
    }
  },
  computed: {
    filteredItems() {
      if (this.query) {
        let regex = new RegExp(this.query.toLowerCase());
        return this.items.filter(item => {
          return regex.test(item.code) || regex.test(item.name.toLowerCase());
        });
      } else {
        return this.items;
      }
    }
  },
  data() {
    return {
      current: -1,
      focused: false,
      selected: false,
      query: this.name
    };
  },
  methods: {
    hit() {
      let index = this.filteredItems.length === 1 ? 0 : this.current;
      let found = this.filteredItems[index];
      this.query = found.name;
      this.selected = true;
      this.$emit('set-item', found);
    },
    reset() {
      if (!this.selected) {
        this.query = null;
      }
      this.focused = false;
      document.getElementById('search').blur();
    },
    up(events) {
      if (this.current > 0) {
        this.current--;
      } else if (this.current === 0 && this.filteredItems.length > 2) {
        this.current = this.filteredItems.length - 1;
      }

      let parent = document.getElementById('queryList');
      let children = parent.getElementsByTagName('li');
      children[this.current].scrollIntoView(false);
    },
    down(events) {
      if (this.current < this.filteredItems.length - 1) {
        this.current++;
      } else {
        this.current = 0;
      }
      let parent = document.getElementById('queryList');
      let children = parent.getElementsByTagName('li');
      children[this.current].scrollIntoView(false);
    },
    setFocus() {
      document.getElementById('search').focus();
    },
    setActive(index) {
      this.current = index;
    },
    activeClass(index) {
      return {
        active: this.current === index
      };
    }
  }
});

/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'AdminSuppliersAutocomplete',
  props: {
    suppliers: {
      type: Array,
      default: []
    }
  },
  computed: {
    filteredSuppliers() {
      if (this.query) {
        let regex = new RegExp(this.query.toLowerCase());
        return this.suppliers.filter(item => {
          return regex.test(item.code) || regex.test(item.name.toLowerCase());
        });
      } else {
        return this.suppliers;
      }
    }
  },
  data() {
    return {
      current: -1,
      focused: false,
      selected: false,
      query: this.name
    };
  },
  methods: {
    hit() {
      let index = this.filteredSuppliers.length === 1 ? 0 : this.current;
      let found = this.filteredSuppliers[index];
      this.query = found.name;
      this.selected = true;
      this.$emit('supplier-selected', found);
    },
    reset() {
      if (!this.selected) {
        this.query = null;
      }
      this.focused = false;
    },
    up(events) {
      if (this.current > 0) {
        this.current--;
      } else if (this.current === 0 && this.filteredSuppliers.length > 2) {
        this.current = this.filteredSuppliers.length - 1;
      }

      let parent = document.getElementById('queryList');
      let children = parent.getElementsByTagName('li');
      children[this.current].scrollIntoView(false);
    },
    down(events) {
      if (this.current < this.filteredSuppliers.length - 1) {
        this.current++;
      } else {
        this.current = 0;
      }
      let parent = document.getElementById('queryList');
      let children = parent.getElementsByTagName('li');
      children[this.current].scrollIntoView(false);
    },
    setActive(index) {
      this.current = index;
    },
    activeClass(index) {
      return {
        active: this.current === index
      };
    }
  }
});

/***/ }),
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 248 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 249 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 250 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 251 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 252 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 253 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 254 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 255 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 256 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 257 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 258 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 259 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 260 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 261 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 262 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 263 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 264 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 265 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 266 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 267 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 268 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 269 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 270 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 271 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 272 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 273 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 274 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 275 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 276 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 277 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 278 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 279 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 280 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 281 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 282 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 283 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 284 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 285 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 286 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 287 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 288 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 38,
	"./af.js": 38,
	"./ar": 45,
	"./ar-dz": 39,
	"./ar-dz.js": 39,
	"./ar-kw": 40,
	"./ar-kw.js": 40,
	"./ar-ly": 41,
	"./ar-ly.js": 41,
	"./ar-ma": 42,
	"./ar-ma.js": 42,
	"./ar-sa": 43,
	"./ar-sa.js": 43,
	"./ar-tn": 44,
	"./ar-tn.js": 44,
	"./ar.js": 45,
	"./az": 46,
	"./az.js": 46,
	"./be": 47,
	"./be.js": 47,
	"./bg": 48,
	"./bg.js": 48,
	"./bn": 49,
	"./bn.js": 49,
	"./bo": 50,
	"./bo.js": 50,
	"./br": 51,
	"./br.js": 51,
	"./bs": 52,
	"./bs.js": 52,
	"./ca": 53,
	"./ca.js": 53,
	"./cs": 54,
	"./cs.js": 54,
	"./cv": 55,
	"./cv.js": 55,
	"./cy": 56,
	"./cy.js": 56,
	"./da": 57,
	"./da.js": 57,
	"./de": 60,
	"./de-at": 58,
	"./de-at.js": 58,
	"./de-ch": 59,
	"./de-ch.js": 59,
	"./de.js": 60,
	"./dv": 61,
	"./dv.js": 61,
	"./el": 62,
	"./el.js": 62,
	"./en-au": 63,
	"./en-au.js": 63,
	"./en-ca": 64,
	"./en-ca.js": 64,
	"./en-gb": 65,
	"./en-gb.js": 65,
	"./en-ie": 66,
	"./en-ie.js": 66,
	"./en-nz": 67,
	"./en-nz.js": 67,
	"./eo": 68,
	"./eo.js": 68,
	"./es": 19,
	"./es-do": 69,
	"./es-do.js": 69,
	"./es.js": 19,
	"./et": 70,
	"./et.js": 70,
	"./eu": 71,
	"./eu.js": 71,
	"./fa": 72,
	"./fa.js": 72,
	"./fi": 73,
	"./fi.js": 73,
	"./fo": 74,
	"./fo.js": 74,
	"./fr": 77,
	"./fr-ca": 75,
	"./fr-ca.js": 75,
	"./fr-ch": 76,
	"./fr-ch.js": 76,
	"./fr.js": 77,
	"./fy": 78,
	"./fy.js": 78,
	"./gd": 79,
	"./gd.js": 79,
	"./gl": 80,
	"./gl.js": 80,
	"./gom-latn": 81,
	"./gom-latn.js": 81,
	"./he": 82,
	"./he.js": 82,
	"./hi": 83,
	"./hi.js": 83,
	"./hr": 84,
	"./hr.js": 84,
	"./hu": 85,
	"./hu.js": 85,
	"./hy-am": 86,
	"./hy-am.js": 86,
	"./id": 87,
	"./id.js": 87,
	"./is": 88,
	"./is.js": 88,
	"./it": 89,
	"./it.js": 89,
	"./ja": 90,
	"./ja.js": 90,
	"./jv": 91,
	"./jv.js": 91,
	"./ka": 92,
	"./ka.js": 92,
	"./kk": 93,
	"./kk.js": 93,
	"./km": 94,
	"./km.js": 94,
	"./kn": 95,
	"./kn.js": 95,
	"./ko": 96,
	"./ko.js": 96,
	"./ky": 97,
	"./ky.js": 97,
	"./lb": 98,
	"./lb.js": 98,
	"./lo": 99,
	"./lo.js": 99,
	"./lt": 100,
	"./lt.js": 100,
	"./lv": 101,
	"./lv.js": 101,
	"./me": 102,
	"./me.js": 102,
	"./mi": 103,
	"./mi.js": 103,
	"./mk": 104,
	"./mk.js": 104,
	"./ml": 105,
	"./ml.js": 105,
	"./mr": 106,
	"./mr.js": 106,
	"./ms": 108,
	"./ms-my": 107,
	"./ms-my.js": 107,
	"./ms.js": 108,
	"./my": 109,
	"./my.js": 109,
	"./nb": 110,
	"./nb.js": 110,
	"./ne": 111,
	"./ne.js": 111,
	"./nl": 113,
	"./nl-be": 112,
	"./nl-be.js": 112,
	"./nl.js": 113,
	"./nn": 114,
	"./nn.js": 114,
	"./pa-in": 115,
	"./pa-in.js": 115,
	"./pl": 116,
	"./pl.js": 116,
	"./pt": 118,
	"./pt-br": 117,
	"./pt-br.js": 117,
	"./pt.js": 118,
	"./ro": 119,
	"./ro.js": 119,
	"./ru": 120,
	"./ru.js": 120,
	"./sd": 121,
	"./sd.js": 121,
	"./se": 122,
	"./se.js": 122,
	"./si": 123,
	"./si.js": 123,
	"./sk": 124,
	"./sk.js": 124,
	"./sl": 125,
	"./sl.js": 125,
	"./sq": 126,
	"./sq.js": 126,
	"./sr": 128,
	"./sr-cyrl": 127,
	"./sr-cyrl.js": 127,
	"./sr.js": 128,
	"./ss": 129,
	"./ss.js": 129,
	"./sv": 130,
	"./sv.js": 130,
	"./sw": 131,
	"./sw.js": 131,
	"./ta": 132,
	"./ta.js": 132,
	"./te": 133,
	"./te.js": 133,
	"./tet": 134,
	"./tet.js": 134,
	"./th": 135,
	"./th.js": 135,
	"./tl-ph": 136,
	"./tl-ph.js": 136,
	"./tlh": 137,
	"./tlh.js": 137,
	"./tr": 138,
	"./tr.js": 138,
	"./tzl": 139,
	"./tzl.js": 139,
	"./tzm": 141,
	"./tzm-latn": 140,
	"./tzm-latn.js": 140,
	"./tzm.js": 141,
	"./uk": 142,
	"./uk.js": 142,
	"./ur": 143,
	"./ur.js": 143,
	"./uz": 145,
	"./uz-latn": 144,
	"./uz-latn.js": 144,
	"./uz.js": 145,
	"./vi": 146,
	"./vi.js": 146,
	"./x-pseudo": 147,
	"./x-pseudo.js": 147,
	"./yo": 148,
	"./yo.js": 148,
	"./zh-cn": 149,
	"./zh-cn.js": 149,
	"./zh-hk": 150,
	"./zh-hk.js": 150,
	"./zh-tw": 151,
	"./zh-tw.js": 151
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 324;

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(171),
  /* template */
  __webpack_require__(387),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(264)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(172),
  /* template */
  __webpack_require__(393),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(288)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(173),
  /* template */
  __webpack_require__(420),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(285)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(174),
  /* template */
  __webpack_require__(417),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(277)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(175),
  /* template */
  __webpack_require__(409),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(284)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(176),
  /* template */
  __webpack_require__(416),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(266)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(177),
  /* template */
  __webpack_require__(395),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(286)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(178),
  /* template */
  __webpack_require__(418),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(276)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(179),
  /* template */
  __webpack_require__(408),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(256)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(180),
  /* template */
  __webpack_require__(383),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(274)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(181),
  /* template */
  __webpack_require__(406),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 336 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(273)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(182),
  /* template */
  __webpack_require__(404),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6e541180",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(271)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(183),
  /* template */
  __webpack_require__(401),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-646ef634",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(287)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(184),
  /* template */
  __webpack_require__(419),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(247)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(185),
  /* template */
  __webpack_require__(371),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-00a8e0a4",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(263)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(186),
  /* template */
  __webpack_require__(392),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 341 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(250)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(187),
  /* template */
  __webpack_require__(375),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(188),
  /* template */
  __webpack_require__(376),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(248)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(189),
  /* template */
  __webpack_require__(372),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-01e77a30",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(262)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(190),
  /* template */
  __webpack_require__(390),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3d329294",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(191),
  /* template */
  __webpack_require__(382),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(270)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(192),
  /* template */
  __webpack_require__(400),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5a5a2666",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(275)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(193),
  /* template */
  __webpack_require__(407),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(268)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(194),
  /* template */
  __webpack_require__(397),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5559a3c0",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(195),
  /* template */
  __webpack_require__(391),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 350 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(249)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(196),
  /* template */
  __webpack_require__(374),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 351 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(258)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(197),
  /* template */
  __webpack_require__(385),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2ffd09aa",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 352 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(269)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(198),
  /* template */
  __webpack_require__(399),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 353 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(252)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(199),
  /* template */
  __webpack_require__(378),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0e8dfb36",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 354 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(267)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(200),
  /* template */
  __webpack_require__(396),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 355 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(261)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(201),
  /* template */
  __webpack_require__(389),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3b163794",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 356 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(272)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(202),
  /* template */
  __webpack_require__(403),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6c7bbd7a",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 357 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(254)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(203),
  /* template */
  __webpack_require__(380),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 358 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(204),
  /* template */
  __webpack_require__(373),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 359 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(253)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(205),
  /* template */
  __webpack_require__(379),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 360 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(206),
  /* template */
  __webpack_require__(398),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 361 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(283)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(207),
  /* template */
  __webpack_require__(415),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-9dd4c34e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 362 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(208),
  /* template */
  __webpack_require__(405),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 363 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(260)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(209),
  /* template */
  __webpack_require__(388),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 364 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(281)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(210),
  /* template */
  __webpack_require__(413),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-936f72b4",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 365 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(257)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(211),
  /* template */
  __webpack_require__(384),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-29503464",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 366 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(255)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(212),
  /* template */
  __webpack_require__(381),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-18d63a59",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 367 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(278)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(215),
  /* template */
  __webpack_require__(410),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7f3d5c5f",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 368 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(265)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(216),
  /* template */
  __webpack_require__(394),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4ac60ea4",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 369 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(280)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(217),
  /* template */
  __webpack_require__(412),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8786b65e",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 370 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(259)
}
var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(218),
  /* template */
  __webpack_require__(386),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-336d285b",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 371 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [(_vm.loading) ? _c('div', [_vm._v("Loading...")]) : _c('div', [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-1"
  }, [_c('tooltip', {
    attrs: {
      "content": "Caja Numero",
      "placement": "left"
    }
  }, [_c('tag', {
    staticClass: "tag-header is-pulled-left",
    attrs: {
      "rounded": ""
    }
  }, [_vm._v(_vm._s(_vm.cash.id))])], 1), _vm._v(" "), (_vm.cash.daily_cash_id) ? _c('tag', {
    staticClass: "tag-header is-pulled-left",
    attrs: {
      "rounded": ""
    }
  }, [_vm._v(_vm._s(_vm.cash.id))]) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "column is-4 has-text-centered"
  }, [_c('span', {
    staticClass: "button is-light is-medium is-not-link"
  }, [_c('span', [_vm._v("INICIAL: "), _c('b', [_vm._v("$" + _vm._s(_vm.cash.init_amount))])])]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('span', {
    staticClass: "button is-light is-medium is-not-link"
  }, [_c('span', [_vm._v("ACTUAL: "), _c('b', [_vm._v("$" + _vm._s(_vm.total))])])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-7"
  }, [_c('div', {
    staticClass: "control has-addons is-pulled-right"
  }, [_c('span', {
    staticClass: "button is-medium is-not-link",
    class: {
      'is-success': !_vm.cash.closed_at, 'is-primary': _vm.cash.closed_at
    }
  }, [_vm._v("\n            Caja " + _vm._s(_vm.cash.closed_at ? 'Cerrada' : 'Abierta') + "\n          ")]), _vm._v(" "), _c('span', {
    staticClass: "button is-medium is-light is-not-link"
  }, [_vm._m(1), _c('span', [_c('b', [_vm._v(_vm._s(_vm.cash.user.name))])])]), _vm._v(" "), _c('pop-confirm', {
    attrs: {
      "content": "Imprimir el cierre de la caja parcial",
      "icon": "question-circle-o",
      "on-ok": _vm.fiscalPrintCash,
      "on-cancel": _vm.cancelPrint
    }
  }, [_c('a', {
    staticClass: "button is-medium is-danger"
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-print"
  })]), _vm._v(" "), _c('span', [_vm._v("C. Caja")])])]), _vm._v(" "), _c('pop-confirm', {
    attrs: {
      "content": "Imprimir el cierre diario",
      "icon": "question-circle-o",
      "on-ok": _vm.fiscalPrintDay,
      "on-cancel": _vm.cancelPrint
    }
  }, [_c('a', {
    staticClass: "button is-medium is-danger"
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-print"
  })]), _vm._v(" "), _c('span', [_vm._v("C. Diario")])])])], 1)])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_c('div', {
    staticClass: "resume"
  }, [_c('h2', [_vm._v("Extracciones")]), _vm._v(" "), _c('div', {
    staticClass: "box"
  }, [_c('alert', {
    staticClass: "debit-message"
  }, [_vm._v("TOTAL "), _c('span', {
    staticClass: "is-danger-text"
  }, [_vm._v("$" + _vm._s(_vm.totalVales + _vm.totalHome))])]), _vm._v(" "), (!_vm.cash.closed_at) ? _c('div', {
    staticClass: "ticket-form"
  }, [_c('div', {
    staticClass: "debit-help is-primary-text"
  }, [_c('tag', [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-exclamation"
  })]), _vm._v(" Es extraccion si:")]), _vm._v(" "), _c('p', [_vm._v("La plata sale de la caja del turno para un vale personal (Marcar como vale)")]), _vm._v(" "), _c('p', [_vm._v("La plata sale de la caja del turno para llevar a casa")])], 1), _vm._v(" "), _c('form', {
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.addExpense('Extraccion')
      }
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-2"
  }, [_c('tooltip', {
    attrs: {
      "content": "Es vale?"
    }
  }, [_c('div', {
    staticClass: "select is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newExpenseExtraccion.has_vale),
      expression: "newExpenseExtraccion.has_vale"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.newExpenseExtraccion.has_vale = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "true"
    }
  }, [_vm._v("Si")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "false"
    }
  }, [_vm._v("No")])])])])], 1), _vm._v(" "), _c('div', {
    staticClass: "column is-3"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newExpenseExtraccion.amount),
      expression: "newExpenseExtraccion.amount"
    }],
    staticClass: "input is-expanded",
    attrs: {
      "step": "0.01",
      "type": "number",
      "placeholder": "Monto"
    },
    domProps: {
      "value": (_vm.newExpenseExtraccion.amount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newExpenseExtraccion.amount = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('tooltip', {
    attrs: {
      "content": "Ususario que retira o saca vale."
    }
  }, [_c('div', {
    staticClass: "select is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newExpenseExtraccion.user_id),
      expression: "newExpenseExtraccion.user_id"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.newExpenseExtraccion.user_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Usuario")]), _vm._v(" "), _vm._l((_vm.users), function(user) {
    return _c('option', {
      domProps: {
        "value": user.id
      }
    }, [_vm._v(_vm._s(user.name))])
  })], 2)])])], 1), _vm._v(" "), _c('div', {
    staticClass: "column is-1"
  }, [_c('a', {
    staticClass: "button is-primary",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.addExpense('Extraccion')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-plus fa-floated"
  })])])])])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticStyle: {
      "height": "300px",
      "overflow": "auto"
    }
  }, [_c('table', {
    staticClass: "table"
  }, [_vm._m(2), _vm._v(" "), _c('tbody', _vm._l((_vm.expenseExtracciones), function(debit) {
    return _c('tr', {
      key: debit.id
    }, [_c('td', [_vm._v(_vm._s(debit.has_vale ? 'Vale' : 'Retiro'))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(debit.user.name))]), _vm._v(" "), _c('td', [_vm._v("$" + _vm._s(debit.amount))]), _vm._v(" "), _c('td', [_c('a', {
      staticClass: "button is-small is-light is-pulled-right",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.removeExpense(debit)
        }
      }
    }, [_c('span', {
      staticClass: "fa fa-times is-danger-text"
    })])])])
  }))])])], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('div', {
    staticClass: "resume"
  }, [_c('h2', [_vm._v("Gastos")]), _vm._v(" "), _c('div', {
    staticClass: "box"
  }, [_c('alert', {
    staticClass: "debit-message"
  }, [_vm._v("TOTAL "), _c('span', {
    staticClass: "is-danger-text"
  }, [_vm._v("$" + _vm._s(_vm.totalGasto))])]), _vm._v(" "), (!_vm.cash.closed_at) ? _c('div', {
    staticClass: "ticket-form"
  }, [_c('div', {
    staticClass: "debit-help is-primary-text"
  }, [_c('tag', [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-exclamation"
  })]), _vm._v(" Es gasto si:")]), _vm._v(" "), _c('p', [_vm._v("Si la plata sale de la caja del turno para pagar gastos del bar (ej: proveedores, mozas, etc)")])], 1), _vm._v(" "), _c('form', {
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.addExpense('Gasto')
      }
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-5"
  }, [_c('div', {
    staticClass: "is-fullwidth"
  }, [_c('autocomplete', {
    attrs: {
      "suppliers": _vm.suppliers
    },
    on: {
      "supplier-selected": _vm.setSupplier
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "column is-3"
  }, [_c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newExpenseGasto.amount),
      expression: "newExpenseGasto.amount"
    }],
    staticClass: "input",
    attrs: {
      "step": "0.01",
      "type": "number",
      "placeholder": "Monto"
    },
    domProps: {
      "value": (_vm.newExpenseGasto.amount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newExpenseGasto.amount = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-3"
  }, [_c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newExpenseGasto.bill_number),
      expression: "newExpenseGasto.bill_number"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Nro. Factura"
    },
    domProps: {
      "value": (_vm.newExpenseGasto.bill_number)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newExpenseGasto.bill_number = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-1"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('a', {
    staticClass: "button is-primary",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.addExpense('Gasto')
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-floated fa-plus"
  })])])])])])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticStyle: {
      "height": "300px",
      "overflow": "auto"
    }
  }, [_c('table', {
    staticClass: "table"
  }, [_vm._m(3), _vm._v(" "), _c('tbody', _vm._l((_vm.expenseGastos), function(debit) {
    return _c('tr', {
      key: debit.id
    }, [_c('td', [_vm._v(_vm._s(debit.type))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(debit.supplier.name))]), _vm._v(" "), _c('td', [_vm._v("$" + _vm._s(debit.amount))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(debit.bill_number))]), _vm._v(" "), _c('td', [_c('a', {
      staticClass: "button is-small is-light is-pulled-right",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.removeExpense(debit)
        }
      }
    }, [_c('span', {
      staticClass: "fa fa-times is-danger-text"
    })])])])
  }))])])], 1)])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "resume"
  }, [_c('h2', [_c('tag', {
    staticClass: "header-icon",
    attrs: {
      "rounded": ""
    }
  }, [_c('i', {
    staticClass: "fa fa-floated fa-bar-chart"
  })]), _vm._v("Resumen Total")], 1), _vm._v(" "), _c('table', {
    staticClass: "table is-bordered"
  }, [_c('tr', {
    staticClass: "total"
  }, [_c('td', [_vm._v("CAJA INICIAL")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('span', [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.cash.init_amount)))])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Gastos")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('span', {
    staticClass: "is-danger-text"
  }, [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.totalGasto)))])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Vales")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('span', {
    staticClass: "is-danger-text"
  }, [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.totalVales)))])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Retiros")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('span', {
    staticClass: "is-danger-text"
  }, [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.totalHome)))])])]), _vm._v(" "), _c('tr', {
    staticClass: "subtotal"
  }, [_c('td', [_vm._v("Total Gastos (Gastos + vales + Extracciones)")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('span', {
    staticClass: "is-danger-text"
  }, [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.debitos)))])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Ventas con Tarjeta")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('router-link', {
    staticClass: "is-success-text",
    attrs: {
      "to": {
        name: 'Payments',
        params: {
          partial_daily_cash_id: _vm.cash.id,
          payment_type: 'tarjeta'
        }
      }
    }
  }, [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.cash.credit_amount)))])], 1)]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Pago Deuda con Tarjeta")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('router-link', {
    staticClass: "is-success-text",
    attrs: {
      "to": {
        name: 'Payments',
        params: {
          partial_daily_cash_id: -1,
          payment_type: 'tarjeta'
        }
      }
    }
  }, [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.cash.debt_credit)))])], 1)]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Pagos a favor de cliente Tarjeta")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('span', [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.cash.favor_credit)))])])]), _vm._v(" "), _c('tr', {
    staticClass: "subtotal"
  }, [_c('td', [_vm._v("Total Cobrado con Tarjetas")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('span', {
    staticClass: "is-success-text"
  }, [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.subCard)))])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Pago Efectivo")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('router-link', {
    staticClass: "is-success-text",
    attrs: {
      "to": {
        name: 'Payments',
        params: {
          partial_daily_cash_id: _vm.cash.id,
          payment_type: 'efectivo'
        }
      }
    }
  }, [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.cash.cash_amount)))])], 1)]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Pago Deuda Efectivo")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('router-link', {
    staticClass: "is-success-text",
    attrs: {
      "to": {
        name: 'Payments',
        params: {
          partial_daily_cash_id: -1,
          payment_type: 'efectivo'
        }
      }
    }
  }, [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.cash.debt_cash)))])], 1)]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Pagos a favor de cliente Efectivo")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('span', [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.cash.favor_cash)))])])]), _vm._v(" "), _c('tr', {
    staticClass: "subtotal"
  }, [_c('td', [_vm._v("Total Cobrado en Efectivo")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('span', {
    staticClass: "is-success-text"
  }, [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.subCash)))])])]), _vm._v(" "), _c('tr', {
    staticClass: "subtotal"
  }, [_c('td', [_vm._v("Total Ventas")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('span', {
    staticClass: "is-success-text"
  }, [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.cash.total_paid)))])])]), _vm._v(" "), _c('tr', {
    staticClass: "subtotal"
  }, [_c('td', [_vm._v("Total Fiado")]), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('span', {
    staticClass: "is-success-text"
  }, [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.cash.not_paid)))])])]), _vm._v(" "), _c('tr', {
    staticClass: "total"
  }, [_vm._m(4), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('span', {
    staticClass: "is-success-text"
  }, [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.realCash)))])])]), _vm._v(" "), _c('tr', {
    staticClass: "subtotal"
  }, [_vm._m(5), _vm._v(" "), _c('td', {
    staticClass: "row-value"
  }, [_c('span', {
    staticClass: "is-success-text"
  }, [_vm._v("$" + _vm._s(_vm._f("withDecimals")(_vm.total)))])])])]), _vm._v(" "), (!_vm.cash.closed_at) ? _c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6 is-offset-3 has-text-centered"
  }, [_c('button', {
    staticClass: "button is-danger is-large",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.openModal($event)
      }
    }
  }, [_vm._v("CIERRE TURNO")])])])]) : _vm._e()])]), _vm._v(" "), _c('modal', {
    attrs: {
      "title": 'CIERRE DE CAJA No. ' + _vm.cash.id,
      "show-footer": true,
      "on-ok": _vm.closeCash,
      "on-cancel": _vm.closeModal,
      "is-show": _vm.isOpen,
      "transition": "zoom"
    }
  }, [(_vm.errorMessage) ? _c('alert', {
    attrs: {
      "type": "danger"
    }
  }, [_vm._v(_vm._s(_vm.errorMessage))]) : _vm._e(), _vm._v(" "), _c('alert', {
    staticClass: "is-clearfix"
  }, [_c('div', {
    staticClass: "is-pulled-left"
  }, [_c('span', {
    staticClass: "icon is-small",
    staticStyle: {
      "margin": "2px"
    }
  }, [_c('i', {
    staticClass: "fa fa-exclamation is-danger"
  })]), _vm._v(" "), _c('span', [(_vm.lastCash) ? _c('b', [_vm._v("Cierre de caja y cierre diario")]) : _c('b', [_vm._v("Cierre y Apertura de nuevo turno")])])]), _vm._v(" "), _c('div', {
    staticClass: "is-pulled-right"
  }, [_c('tooltip', {
    attrs: {
      "content": "Es la ultima caja?"
    }
  }, [_c('checkbox', {
    attrs: {
      "val": "true"
    },
    model: {
      value: (_vm.lastCash),
      callback: function($$v) {
        _vm.lastCash = $$v
      },
      expression: "lastCash"
    }
  })], 1)], 1)]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('label', [_vm._v("Arqueo de caja")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newPartialCash.manual_cash),
      expression: "newPartialCash.manual_cash"
    }],
    staticClass: "input",
    attrs: {
      "type": "number",
      "step": "0.01",
      "placeholder": "Monto contado en la caja"
    },
    domProps: {
      "value": (_vm.newPartialCash.manual_cash)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newPartialCash.manual_cash = $event.target.value
      }
    }
  })]), _vm._v(" "), (!_vm.lastCash) ? _c('div', {
    staticClass: "control"
  }, [_c('hr'), _vm._v(" "), _c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('label', [_vm._v("Monto")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newPartialCash.init_amount),
      expression: "newPartialCash.init_amount"
    }],
    staticClass: "input",
    attrs: {
      "type": "number",
      "step": "0.01",
      "placeholder": "Monto inicial"
    },
    domProps: {
      "value": (_vm.newPartialCash.init_amount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newPartialCash.init_amount = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control is-expanded"
  }, [_c('label', [_vm._v("Responsable")]), _vm._v(" "), _c('div', {
    staticClass: "select is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newPartialCash.user_id),
      expression: "newPartialCash.user_id"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.newPartialCash.user_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Seleccione usuario")]), _vm._v(" "), _vm._l((_vm.users), function(user) {
    return _c('option', {
      domProps: {
        "value": user.id
      }
    }, [_vm._v(_vm._s(user.name))])
  })], 2)])])])]) : _vm._e()], 1)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "button is-white is-not-link"
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-angle-right"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-user-o"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("Tipo")]), _vm._v(" "), _c('th', [_vm._v("Usuario")]), _vm._v(" "), _c('th', [_vm._v("Monto")]), _vm._v(" "), _c('th')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("Tipo")]), _vm._v(" "), _c('th', [_vm._v("Usuario")]), _vm._v(" "), _c('th', [_vm._v("Monto")]), _vm._v(" "), _c('th', [_vm._v("Nro Fact")]), _vm._v(" "), _c('th')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('td', [_vm._v("EFECTIVO EN CAJA "), _c('span', {
    staticStyle: {
      "font-size": "17px",
      "color": "#999"
    }
  }, [_vm._v("(Sub Efectivo - Gastos - Retirado)")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('td', [_vm._v("Rentabilidad "), _c('span', {
    staticStyle: {
      "font-size": "17px",
      "color": "#999"
    }
  }, [_vm._v("(Sub Efectivo + Sub Tarjeta - Gastos - Retirado)")])])
}]}

/***/ }),
/* 372 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('h1', {
    staticClass: "header"
  }, [_c('tag', {
    attrs: {
      "id": "header-icon",
      "rounded": ""
    }
  }, [_c('i', {
    staticClass: "fa fa-users"
  })]), _vm._v("\n    Clientes\n    "), _c('div', {
    staticClass: "control has-addons is-pulled-right"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Filtrar clientes"
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "keyup": function($event) {
        $event.preventDefault();
        _vm.reloadClients($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  })])], 1), _vm._v(" "), _c('hr'), _vm._v(" "), (_vm.loading) ? _c('div', [_c('Loader')], 1) : _c('div', [_c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.clients), function(client) {
    return _c('tr', {
      key: client.id
    }, [_c('td', [_vm._v("# " + _vm._s(client.id))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(client.name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(client.phone))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(client.address))]), _vm._v(" "), _c('td', [_c('a', {
      staticClass: "button is-danger",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.addTicket(client)
        }
      }
    }, [_vm._v("Abrir ticket")]), _vm._v(" "), _c('router-link', {
      staticClass: "button is-light",
      attrs: {
        "to": {
          name: 'Client',
          params: {
            id: client.id
          }
        }
      }
    }, [_vm._v("Ver Detalles")])], 1)])
  }))]), _vm._v(" "), _c('pagination', {
    attrs: {
      "layout": "pager",
      "align": "left",
      "page-size": 12,
      "total": _vm.meta.total,
      "change": _vm.pageChange
    },
    model: {
      value: (_vm.page),
      callback: function($$v) {
        _vm.page = $$v
      },
      expression: "page"
    }
  })], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("ID")]), _vm._v(" "), _c('th', [_vm._v("Nombre")]), _vm._v(" "), _c('th', [_vm._v("Telefono")]), _vm._v(" "), _c('th', [_vm._v("Direccion")]), _vm._v(" "), _c('th')])
}]}

/***/ }),
/* 373 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.addEntry($event)
      }
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-7"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.entry.comment),
      expression: "entry.comment"
    }],
    staticClass: "input is-medium",
    attrs: {
      "disabled": _vm.status,
      "type": "text",
      "placeholder": "Adicional"
    },
    domProps: {
      "value": (_vm.entry.comment)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.entry.comment = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "column is-2"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.entry.subtotal),
      expression: "entry.subtotal"
    }],
    staticClass: "input is-medium",
    attrs: {
      "disabled": _vm.status,
      "type": "number",
      "step": "0.01",
      "placeholder": "Sub total"
    },
    domProps: {
      "value": (_vm.entry.subtotal)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.entry.subtotal = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "column is-2"
  }, [_c('div', {
    staticClass: "input is-medium"
  }, [_c('checkbox', {
    attrs: {
      "val": "true"
    },
    model: {
      value: (_vm.entry.kitchen),
      callback: function($$v) {
        _vm.entry.kitchen = $$v
      },
      expression: "entry.kitchen"
    }
  }, [_vm._v(" Cocina?")])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "column is-1"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-light is-medium",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.addEntry()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })])])])])])
},staticRenderFns: []}

/***/ }),
/* 374 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('section', {
    staticClass: "hero is-primary is-fixed"
  }, [_c('div', {
    staticClass: "hero-head"
  }, [_c('div', {
    staticClass: "nav-main"
  }, [_c('div', {}, [_c('nav', {
    staticClass: "nav"
  }, [(_vm.user.profile.role === 'cooker') ? _c('div', {
    staticClass: "nav-left"
  }, [_c('router-link', {
    staticClass: "nav-item brand",
    attrs: {
      "to": {
        name: 'Kitchen'
      }
    }
  }, [_vm._v("Volver a la cocina")])], 1) : _vm._e(), _vm._v(" "), (_vm.user.profile.role !== 'cooker') ? _c('div', {
    staticClass: "nav-left"
  }, [_c('div', {
    staticClass: "nav-item"
  }, [_c('router-link', {
    staticClass: "nav-item is-brand",
    attrs: {
      "to": {
        name: 'Tables'
      }
    }
  }, [_vm._v("Mesas")])], 1), _vm._v(" "), _c('div', {
    staticClass: "nav-item"
  }, [_c('router-link', {
    staticClass: "nav-item",
    attrs: {
      "to": {
        name: 'Clients'
      }
    }
  }, [_vm._v("Clientes")])], 1), _vm._v(" "), _c('div', {
    staticClass: "nav-item"
  }, [_c('router-link', {
    staticClass: "nav-item",
    attrs: {
      "to": {
        name: 'Deliveries'
      }
    }
  }, [_vm._v("Pedidos")])], 1), _vm._v(" "), _c('div', {
    staticClass: "nav-item"
  }, [_c('router-link', {
    staticClass: "button is-primary",
    attrs: {
      "to": {
        name: 'Kitchen'
      }
    }
  }, [_vm._v("Cocina")])], 1), _vm._v(" "), _c('div', {
    staticClass: "nav-item"
  }, [_c('a', {
    directives: [{
      name: "shortkey",
      rawName: "v-shortkey",
      value: (['ctrl', 'd']),
      expression: "['ctrl', 'd']"
    }],
    staticClass: "button is-primary",
    class: {
      'is-disabled': !_vm.dailyCash.id
    },
    on: {
      "shortkey": _vm.openDeliveryTicket,
      "click": function($event) {
        $event.preventDefault();
        _vm.openDeliveryTicket($event)
      }
    }
  }, [_vm._v("\n                  Abrir Delivery\n                ")])]), _vm._v(" "), _c('div', {
    staticClass: "nav-item"
  }, [_c('a', {
    directives: [{
      name: "shortkey",
      rawName: "v-shortkey",
      value: (['ctrl', 'a']),
      expression: "['ctrl', 'a']"
    }],
    staticClass: "button is-primary",
    on: {
      "shortkey": function($event) {
        _vm.toggleSideBar('tables')
      },
      "click": function($event) {
        $event.preventDefault();
        _vm.toggleSideBar('tables')
      }
    }
  }, [_vm._v("Mesas abiertas "), _c('tag', {
    attrs: {
      "rounded": ""
    }
  }, [_vm._v(_vm._s(_vm.openTables.length))])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "nav-item"
  }, [_c('a', {
    directives: [{
      name: "shortkey",
      rawName: "v-shortkey",
      value: (['ctrl', 'b']),
      expression: "['ctrl', 'b']"
    }],
    staticClass: "button is-primary",
    on: {
      "shortkey": function($event) {
        _vm.toggleSideBar('delivery')
      },
      "click": function($event) {
        $event.preventDefault();
        _vm.toggleSideBar('delivery')
      }
    }
  }, [_vm._v("Deliveries ")])])]) : _vm._e(), _vm._v(" "), (_vm.user.profile.role !== 'cooker') ? _c('span', {
    staticClass: "nav-toggle"
  }, [_c('span'), _vm._v(" "), _c('span'), _vm._v(" "), _c('span')]) : _vm._e(), _vm._v(" "), (_vm.user.profile.role !== 'cooker') ? _c('div', {
    staticClass: "nav-right"
  }, [_c('div', {
    staticClass: "nav-item",
    staticStyle: {
      "width": "300px"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.clientCode),
      expression: "clientCode"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Buscar por telefono o credencial"
    },
    domProps: {
      "value": (_vm.clientCode)
    },
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.findClient()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.clientCode = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "nav-item"
  }, [_c('table-autocomplete', {
    class: {
      'is-disabled': !_vm.dailyCash.id
    },
    attrs: {
      "tables": _vm.tables,
      "id-input": "open_table",
      "shortkey": 'g'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "nav-item"
  }, [_c('popover', {
    attrs: {
      "title": "Mi Cuenta",
      "placement": "bottom",
      "width": 300,
      "trigger": "click"
    }
  }, [_c('button', {
    staticClass: "button is-primary"
  }, [_vm._v(_vm._s(_vm.user.profile.name))]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "content"
    },
    slot: "content"
  }, [_c('div', {
    staticClass: "columns",
    staticStyle: {
      "margin-bottom": "0px"
    }
  }, [_c('div', {
    staticClass: "column is-12 has-text-centered"
  }, [_c('h2', [_c('b', [_vm._v(_vm._s(_vm.mapRoles[_vm.user.profile.role]))])])])]), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_c('img', {
    staticStyle: {
      "padding": "2px 0px"
    },
    attrs: {
      "src": _vm.setPicture,
      "alt": ""
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "column is-6",
    staticStyle: {
      "background": "#fff"
    }
  }, [_c('div', {
    staticStyle: {
      "margin": "0px"
    }
  }, [_c('router-link', {
    staticClass: "button is-fullwidth is-light",
    attrs: {
      "to": {
        name: 'Profile'
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-user-o"
  })]), _vm._v(" "), _c('span', [_vm._v("Perfil")])])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin": "15px 0px"
    }
  }, [(['admin', 'manager'].indexOf(_vm.user.profile.role) !== -1) ? _c('router-link', {
    staticClass: "button is-light is-fullwidth",
    attrs: {
      "to": {
        name: 'AdminClients'
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-cog"
  })]), _vm._v(" "), _c('span', [_vm._v("Admin")])]) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin": "0px"
    }
  }, [_c('a', {
    staticClass: "button is-light is-fullwidth",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.logout($event)
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-sign-out"
  })]), _vm._v(" "), _c('span', [_vm._v("Salir")])])])])])])])], 1), _vm._v(" "), _c('div', {
    staticClass: "nav-item"
  }, [_c('popover', {
    attrs: {
      "title": "Ayuda",
      "width": 300,
      "placement": "bottom"
    }
  }, [_c('div', {
    staticClass: "button is-primary"
  }, [_c('i', {
    staticClass: "fa fa-question-circle"
  })]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "content"
    },
    slot: "content"
  }, [_c('h2', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-bottom": "10px",
      "color": "#fff",
      "background": "#0099ff",
      "padding": "5px"
    }
  }, [_c('b', [_vm._v("General")])]), _vm._v(" "), _c('ul', [_c('li', {
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('span', {
    staticClass: "button is-small is-fullwidth is-light is-not-link"
  }, [_c('b', [_vm._v("Ctrl + d")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_vm._v(" Abrir delivery")])])]), _vm._v(" "), _c('li', {
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('span', {
    staticClass: "button is-small is-fullwidth is-light is-not-link"
  }, [_c('b', [_vm._v("Ctrl + g")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_vm._v(" Ir al buscador de mesas")])])]), _vm._v(" "), _c('li', {
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('span', {
    staticClass: "button is-small is-fullwidth is-light is-not-link"
  }, [_c('b', [_vm._v("Ctrl + a")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_vm._v(" Ver mesas abiertas")])])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('h2', {
    staticClass: "has-text-centered",
    staticStyle: {
      "margin-bottom": "10px",
      "color": "#fff",
      "background": "#0099ff",
      "padding": "5px"
    }
  }, [_c('b', [_vm._v("Ticket")])]), _vm._v(" "), _c('ul', [_c('li', {
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('span', {
    staticClass: "button is-small is-fullwidth is-light is-not-link"
  }, [_c('b', [_vm._v("Ctrl + 1")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_vm._v(" Ir a items")])])]), _vm._v(" "), _c('li', {
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('span', {
    staticClass: "button is-small is-fullwidth is-light is-not-link"
  }, [_c('b', [_vm._v("Ctrl + 2")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_vm._v(" Ir a promociones")])])]), _vm._v(" "), _c('li', {
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('span', {
    staticClass: "button is-small is-fullwidth is-light is-not-link"
  }, [_c('b', [_vm._v("Ctrl + 3")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_vm._v(" Ir a adicionales")])])]), _vm._v(" "), _c('li', {
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('span', {
    staticClass: "button is-small is-fullwidth is-light is-not-link"
  }, [_c('b', [_vm._v("Ctrl + 4")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_vm._v(" Ver Favoritos")])])]), _vm._v(" "), _c('li', {
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('span', {
    staticClass: "button is-small is-fullwidth is-light is-not-link"
  }, [_c('b', [_vm._v("Ctrl + c")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_vm._v(" Cerrar ticket")])])]), _vm._v(" "), _c('li', {
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('span', {
    staticClass: "button is-small is-fullwidth is-light is-not-link"
  }, [_c('b', [_vm._v("Ctrl + p")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_vm._v(" Imprimir ticket")])])]), _vm._v(" "), _c('li', {
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('span', {
    staticClass: "button is-small is-fullwidth is-light is-not-link"
  }, [_c('b', [_vm._v("Ctrl + m")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_vm._v(" Cambiar mesa")])])]), _vm._v(" "), _c('li', {
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('span', {
    staticClass: "button is-small is-fullwidth is-light is-not-link"
  }, [_c('b', [_vm._v("Ctrl + n")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_vm._v(" Cambiar cliente")])])])])])])], 1)]) : _vm._e()])])])])]), _vm._v(" "), _c('div', {
    staticClass: "main columns"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isOpen === 'delivery'),
      expression: "isOpen === 'delivery'"
    }],
    staticClass: "shadow-border column is-2"
  }, [_c('deliveries-bar')], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isOpen === 'tables'),
      expression: "isOpen === 'tables'"
    }],
    staticClass: "shadow-border column is-2"
  }, [_c('h2', {
    staticClass: "header"
  }, [_vm._v("\n        Mesas abiertas\n      ")]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('ul', _vm._l((_vm.openTables), function(table) {
    return _c('li', {
      staticStyle: {
        "margin-bottom": "10px"
      }
    }, [_c('div', {
      staticClass: "columns"
    }, [_c('div', {
      staticClass: "column is-7"
    }, [_c('button', {
      staticClass: "button is-light is-fullwidth",
      staticStyle: {
        "justify-content": "flex-start"
      },
      on: {
        "click": function($event) {
          _vm.goTo(table)
        }
      }
    }, [_vm._m(0, true), _vm._v(" "), _c('span', [_vm._v("(" + _vm._s(table.id) + ") " + _vm._s(table.description))])])]), _vm._v(" "), _c('div', {
      staticClass: "column is-5"
    }, [_c('button', {
      staticClass: "button is-success",
      on: {
        "click": function($event) {
          _vm.goTo(table)
        }
      }
    }, [_c('span', [_c('b', [_vm._v("T. " + _vm._s(table.current.number))])]), _vm._v(" "), _vm._m(1, true)])])])])
  }))]), _vm._v(" "), _c('div', {
    staticClass: "ticket-background",
    class: _vm.isOpen !== '' ? 'column is-10' : 'column is-12'
  }, [_c('router-view')], 1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-cutlery"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-angle-right"
  })])
}]}

/***/ }),
/* 375 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('tr', [_c('td', [_vm._v(_vm._s(_vm._f("moment")(_vm.code.created_at, 'DD/MM/YYYY')))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(_vm.code.code))]), _vm._v(" "), _c('td', [_c('i', {
    staticClass: "fa",
    class: {
      'fa-check is-success': _vm.enabled, 'fa-times is-danger': !_vm.enabled
    }
  })]), _vm._v(" "), _c('td', [_c('div', {
    staticClass: "is-pulled-right"
  }, [(!_vm.enabled) ? _c('a', {
    staticClass: "button is-small is-danger",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.deleteCode()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })]) : _vm._e(), _vm._v(" "), _c('tooltip', {
    attrs: {
      "content": "Deshabilitar credencial"
    }
  }, [(_vm.enabled) ? _c('a', {
    staticClass: "button is-small is-default",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.invalidateCode()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-flash"
  })]) : _vm._e()]), _vm._v(" "), _c('tooltip', {
    attrs: {
      "content": "Imprimir credencial"
    }
  }, [(_vm.enabled) ? _c('a', {
    staticClass: "button is-small is-primary",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.printCode()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-print"
  })]) : _vm._e()])], 1), _vm._v(" "), _c('modal', {
    attrs: {
      "title": "Credencial",
      "show-footer": false,
      "on-cancel": _vm.close,
      "is-show": _vm.printing,
      "transition": "zoom"
    }
  }, [_c('p', [_c('button', {
    staticClass: "button is-default",
    on: {
      "click": function($event) {
        _vm.print()
      }
    }
  }, [_vm._v("Imprimir")])]), _vm._v(" "), _c('div', {
    staticClass: "credential"
  }, [_c('div', {
    staticClass: "client-name"
  }, [_c('p', [_vm._v(_vm._s(_vm.client.name))]), _vm._v(" "), _c('i', [_vm._v(_vm._s(_vm.client.dni))])]), _vm._v(" "), _c('div', {
    staticClass: "barcode-image"
  }, [_c('barcode', {
    attrs: {
      "tag": 'img',
      "value": _vm.code.code,
      "options": {
        format: _vm.barcode.format,
        lastChar: _vm.barcode.lastChar,
        displayValue: true,
        height: _vm.barcode.height,
        width: _vm.barcode.width,
        background: 'transparent'
      }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "credential"
  }, [_c('div', {
    staticClass: "bar-name"
  }, [_c('p', [_vm._v(_vm._s(_vm.businessName))]), _vm._v(" "), _c('small', [_vm._v(_vm._s(_vm.businessSlogan))]), _c('br'), _vm._v(" "), _c('i', [_vm._v("Tel: " + _vm._s(_vm.businessPhone))])])])])], 1)])
},staticRenderFns: []}

/***/ }),
/* 376 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "box"
  }, [_c('h4', [_c('i', {
    staticClass: "fa fa-floated fa-code"
  }), _vm._v(" \n    Credenciales\n    "), _c('div', {
    staticClass: "control has-addons is-pulled-right"
  }, [_c('a', {
    staticClass: "button is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.createCode()
      }
    }
  }, [_vm._v("Crear Credencial")])])]), _vm._v(" "), _c('hr'), _vm._v(" "), (_vm.loading) ? _c('Loader') : _c('div', [(_vm.codes.length > 0) ? _c('div', [_c('table', {
    staticClass: "table"
  }, [_c('thead', [_c('th', [_vm._v("Fecha")]), _vm._v(" "), _c('th', [_vm._v("Codigo")]), _vm._v(" "), _c('th', [_vm._v("Valido")]), _vm._v(" "), _c('th')]), _vm._v(" "), _c('tbody', _vm._l((_vm.codes), function(client_code, index) {
    return _c('client-code', {
      key: index,
      attrs: {
        "client": _vm.client,
        "code": client_code
      },
      on: {
        "remove-code": function($event) {
          _vm.removeCode(index)
        }
      }
    })
  }))])]) : _c('div', {
    staticClass: "is-danger-text"
  }, [_vm._v("No hay codigos para este cliente")])])], 1)
},staticRenderFns: []}

/***/ }),
/* 377 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),
/* 378 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('h1', {
    staticClass: "header"
  }, [_c('tag', {
    attrs: {
      "id": "header-icon",
      "rounded": ""
    }
  }, [_c('i', {
    staticClass: "fa fa-tags"
  })]), _vm._v("Pagos")], 1), _vm._v(" "), _c('hr'), _vm._v(" "), (_vm.loading) ? _c('div', [_c('Loader')], 1) : _c('div', [_c('table', {
    staticClass: "table",
    attrs: {
      "id": "payments-table"
    }
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.payments), function(payment) {
    return _c('tr', {
      key: payment.id
    }, [_c('td', {
      staticStyle: {
        "width": "15%"
      }
    }, [(payment.ticket.table) ? _c('tag', {
      class: payment.ticket.table.color,
      attrs: {
        "rounded": ""
      }
    }, [_c('b', [_vm._v(_vm._s(payment.ticket.table.description))])]) : _c('tag', {
      attrs: {
        "rounded": "",
        "type": "light"
      }
    }, [_c('b', [_vm._v("Delivery")])])], 1), _vm._v(" "), _c('td', [_c('tag', {
      attrs: {
        "rounded": ""
      }
    }, [_c('b', [_vm._v(_vm._s(payment.favor ? "Pago por adelantado" : payment.ticket.number) + " ")])])], 1), _vm._v(" "), _c('td', [_c('i', {
      staticClass: "fa fa-floated fa-check is-success"
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm._f("moment")(payment.created_at, 'DD MMMM, YYYY HH:MM')))])]), _vm._v(" "), _c('td', [_vm._v(_vm._s(payment.type))]), _vm._v(" "), _c('td', [_vm._v("$" + _vm._s(payment.amount))])])
  }))]), _vm._v(" "), _c('pagination', {
    attrs: {
      "layout": "pager",
      "align": "left",
      "page-size": 10,
      "total": _vm.meta.total,
      "change": _vm.fetchPayments
    }
  })], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("Mesa")]), _vm._v(" "), _c('th', [_vm._v("Ticket")]), _vm._v(" "), _c('th', [_vm._v("Fecha")]), _vm._v(" "), _c('th', [_vm._v("Tipo")]), _vm._v(" "), _c('th', [_vm._v("Total")])])
}]}

/***/ }),
/* 379 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "columns ticket"
  }, [_c('div', {
    staticClass: "column is-9"
  }, [_c('div', {
    staticClass: "ticket-form"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-3"
  }, [_c('a', {
    directives: [{
      name: "shortkey",
      rawName: "v-shortkey.once",
      value: (['ctrl', '1']),
      expression: "['ctrl', '1']",
      modifiers: {
        "once": true
      }
    }],
    staticClass: "button is-fullwidth",
    class: {
      'is-disabled': _vm.ticket.closed, 'is-primary': _vm.type === 'Item'
    },
    on: {
      "shortkey": function($event) {
        _vm.toggleEntry('Item')
      },
      "click": function($event) {
        $event.preventDefault();
        _vm.toggleEntry('Item');
      }
    }
  }, [_c('span', [_vm._v("Item")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-3"
  }, [_c('a', {
    directives: [{
      name: "shortkey",
      rawName: "v-shortkey.once",
      value: (['ctrl', '2']),
      expression: "['ctrl', '2']",
      modifiers: {
        "once": true
      }
    }],
    staticClass: "button is-fullwidth",
    class: {
      'is-disabled': _vm.ticket.closed, 'is-primary': _vm.type === 'Promotion'
    },
    on: {
      "shortkey": function($event) {
        _vm.toggleEntry('Promotion')
      },
      "click": function($event) {
        $event.preventDefault();
        _vm.toggleEntry('Promotion');
      }
    }
  }, [_c('span', [_vm._v("Promocion")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-3"
  }, [_c('a', {
    directives: [{
      name: "shortkey",
      rawName: "v-shortkey.once",
      value: (['ctrl', '3']),
      expression: "['ctrl', '3']",
      modifiers: {
        "once": true
      }
    }],
    staticClass: "button is-fullwidth",
    class: {
      'is-disabled': _vm.ticket.closed, 'is-primary': _vm.type === 'Additional'
    },
    on: {
      "shortkey": function($event) {
        _vm.toggleEntry('Additional')
      },
      "click": function($event) {
        $event.preventDefault();
        _vm.toggleEntry('Additional');
      }
    }
  }, [_c('span', [_vm._v("Adicional")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-3"
  }, [_c('a', {
    directives: [{
      name: "shortkey",
      rawName: "v-shortkey.once",
      value: (['ctrl', '4']),
      expression: "['ctrl', '4']",
      modifiers: {
        "once": true
      }
    }],
    staticClass: "button is-warning is-fullwidth is-outlined",
    on: {
      "shortkey": function($event) {
        _vm.isShow = true
      },
      "click": function($event) {
        $event.preventDefault();
        _vm.isShow = true
      }
    }
  }, [_vm._m(0), _vm._v(" "), _c('span', [_vm._v("Ver Favoritos (ctrl + 4)")])])])]), _vm._v(" "), _c('hr'), _vm._v(" "), (_vm.type === 'Item') ? _c('div', [_c('ticket-item-form', {
    attrs: {
      "items": _vm.items,
      "status": _vm.ticket.closed
    },
    on: {
      "save-entry": function (entry) { return _vm.addEntry(entry); }
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.type === 'Promotion') ? _c('div', [_c('ticket-promo-form', {
    attrs: {
      "promotions": _vm.promotions,
      "status": _vm.ticket.closed
    },
    on: {
      "save-entry": function (entry) { return _vm.addEntry(entry); }
    }
  })], 1) : _vm._e(), _vm._v(" "), (_vm.type === 'Additional') ? _c('div', [_c('ticket-additional-form', {
    attrs: {
      "status": _vm.ticket.closed
    },
    on: {
      "save-entry": function (entry) { return _vm.addEntry(entry); }
    }
  })], 1) : _vm._e(), _vm._v(" "), _c('hr')]), _vm._v(" "), _c('div', {
    staticClass: "ticket-lines"
  }, [(_vm.loading) ? _c('div', [_c('Loader')], 1) : _c('div', [_c('table', {
    staticClass: "table"
  }, [_vm._m(1), _vm._v(" "), _c('tbody', [(_vm.entries.length < 1) ? _c('tr', [_vm._m(2)]) : _vm._l((_vm.entries), function(entry) {
    return _c('ticket-row', {
      key: entry.id,
      attrs: {
        "entry": entry,
        "reasons": _vm.reasons,
        "tclosed": _vm.ticket.closed,
        "tprinted": _vm.ticket.printed,
        "kitchenView": _vm.kitchenView
      },
      on: {
        "reload-content": _vm.fetchEntries
      }
    })
  })], 2)])])]), _vm._v(" "), _c('div', {
    staticClass: "resume"
  }, [_c('div', {
    staticClass: "columns resume-header print"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_vm._v("TOTAL")]), _vm._v(" "), _c('div', {
    staticClass: "column is-2"
  }, [_vm._v("$ " + _vm._s(_vm.total))]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_vm._v("PENDIENTE")]), _vm._v(" "), _c('div', {
    staticClass: "column is-2"
  }, [_vm._v("$ " + _vm._s(_vm.pending || 0))])]), _vm._v(" "), _c('div', {
    staticClass: "columns resume-sub-row"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_c('div', [_vm._v(" Pedidos Confirmados")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.totalLines))])]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('div', [_vm._v(" Pedidos Cancelados")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.totalCanceledLines))])])])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-3 payments"
  }, [_c('ticket-payment', {
    attrs: {
      "ticket": _vm.ticket,
      "total": _vm.total
    },
    on: {
      "ticket-paid": _vm.setPaid,
      "ticket-not-paid": _vm.setNotPaid
    }
  })], 1), _vm._v(" "), _c('b-aside', {
    attrs: {
      "is-show": _vm.isShow,
      "width": 400,
      "show-footer": false,
      "placement": "right",
      "title": "Favoritos"
    },
    on: {
      "close": function($event) {
        _vm.isShow = false
      }
    }
  }, [_c('h1', [_c('b', [_vm._v("ITEMS")])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('ul', _vm._l((_vm.favoriteData.items), function(item) {
    return _c('li', {
      staticStyle: {
        "margin-bottom": "10px"
      }
    }, [_c('tag', {
      attrs: {
        "type": "warning"
      }
    }, [_c('i', {
      staticClass: "fa fa-star"
    })]), _vm._v(" "), _c('tag', [_c('b', [_vm._v(_vm._s(item.code))])]), _vm._v(" "), _c('tag', [(item.category.kitchen) ? _c('i', {
      staticClass: "fa fa-cutlery",
      staticStyle: {
        "margin-right": "10px"
      }
    }) : _vm._e(), _vm._v(" " + _vm._s(item.name))])], 1)
  })), _vm._v(" "), _c('br'), _vm._v(" "), _c('h1', [_c('b', [_vm._v("PROMOCIONES")])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('ul', _vm._l((_vm.favoriteData.promotions), function(promotion) {
    return _c('li', {
      staticStyle: {
        "margin-bottom": "10px"
      }
    }, [_c('tag', {
      attrs: {
        "type": "warning"
      }
    }, [_c('i', {
      staticClass: "fa fa-star"
    })]), _vm._v(" "), _c('tag', [_c('b', [_vm._v(_vm._s(promotion.code))])]), _vm._v(" "), _c('tag', [_vm._v(_vm._s(promotion.name))])], 1)
  }))])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-star"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', {
    staticClass: "hide"
  }), _vm._v(" "), _c('th', {
    staticClass: "has-text-centered hide"
  }, [_vm._v("Tipo")]), _vm._v(" "), _c('th', {
    staticClass: "has-text-centered hide"
  }, [_vm._v("Cod")]), _vm._v(" "), _c('th', {
    staticClass: "has-text-centered"
  }, [_vm._v("Cant.")]), _vm._v(" "), _c('th', {
    staticClass: "has-text-centered hide"
  }, [_vm._v("Cocina")]), _vm._v(" "), _c('th', [_vm._v("Item")]), _vm._v(" "), _c('th', {
    staticClass: "has-text-centered"
  }, [_vm._v("P.Unidad")]), _vm._v(" "), _c('th', {
    staticClass: "has-text-centered"
  }, [_vm._v("SubTotal")]), _vm._v(" "), _c('th')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('td', {
    attrs: {
      "colspan": "9"
    }
  }, [_c('div', {
    staticClass: "empty-message"
  }, [_vm._v("No hay entradas")])])
}]}

/***/ }),
/* 380 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {}, [(_vm.loading) ? _c('div', [_vm._v("\n    loading ticket...\n  ")]) : _c('div', [_c('div', {
    staticClass: "columns not-print",
    attrs: {
      "id": "ticket-options"
    }
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('h1', {
    staticClass: "header"
  }, [_vm._v("TICKET # " + _vm._s(_vm._f("withDash")(_vm.ticket.number)) + " ")])]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [(!_vm.ticket.closed) ? _c('div', [_c('div', {
    staticClass: "columns",
    staticStyle: {
      "margin-bottom": "0px"
    }
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_c('table-autocomplete', {
    class: {
      'is-disabled': _vm.ticket.closed || _vm.loadingTables, 'is-primary': _vm.ticket.table_id, 'is-light': !_vm.ticket.table_id, 'column is-5 is-paddingless': true
    },
    attrs: {
      "query": _vm.currentTable,
      "tables": _vm.tables,
      "ticket": _vm.ticket
    },
    on: {
      "remove-table": _vm.removeTable,
      "set-table": function (table) { return _vm.traslateTicket(table.id); }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('clients-autocomplete', {
    attrs: {
      "ticket": _vm.ticket,
      "clients": _vm.clients
    },
    on: {
      "remove-client": _vm.removeClient,
      "set-client": function (client) { return _vm.assignClient(client.id); }
    }
  })], 1)]), _vm._v(" "), (!_vm.ticket.table_id) ? _c('div', {
    staticClass: "address"
  }, [_c('tooltip', {
    attrs: {
      "content": "Direccion para envio",
      "trigger": "focus"
    }
  }, [_c('vue-google-autocomplete', {
    ref: "addressInput",
    attrs: {
      "id": "map",
      "country": "ar",
      "value": _vm.ticket.address,
      "enable-geolocation": true,
      "classname": "input",
      "placeholder": "Direccion para envio"
    },
    on: {
      "placechanged": _vm.updateTicket
    }
  })], 1)], 1) : _vm._e()]) : _c('div', [_c('div', {
    staticClass: "control has-addons"
  }, [(_vm.ticket.table_id) ? _c('a', {
    staticClass: "button is-not-link is-light"
  }, [_vm._m(0), _vm._v(" "), _c('b', [_vm._v(_vm._s(_vm.currentTable))])]) : _vm._e(), _vm._v(" "), (_vm.ticket.client_id) ? _c('router-link', {
    staticClass: "button is-light",
    attrs: {
      "to": {
        name: 'Client',
        params: {
          id: _vm.ticket.client_id
        }
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-user"
  })]), _vm._v(" "), _c('b', [_vm._v(_vm._s(_vm.currentClient))])]) : _vm._e()], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "column is-4 has-text-right"
  }, [_c('tooltip', {
    attrs: {
      "content": _vm.ticket.paid ? 'Ticket Pago' : 'Ticket Sin Pagar'
    }
  }, [_c('div', {
    staticClass: "button",
    class: {
      'is-danger': _vm.closed && _vm.ticket.paid, 'is-success': !_vm.closed, 'is-warning': _vm.closed && !_vm.ticket.paid
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa",
    class: {
      'fa-check': _vm.ticket.paid, 'fa-exclamation-circle': !_vm.ticket.paid
    }
  })]), _vm._v(" "), _c('span', [_c('b', [_vm._v(_vm._s(_vm.formattedStatus))])])])]), _vm._v(" "), (!_vm.closed) ? _c('tooltip', {
    attrs: {
      "content": "Cerrar ticket (ctrl + c)"
    }
  }, [_c('a', {
    directives: [{
      name: "shortkey",
      rawName: "v-shortkey",
      value: (['ctrl', 'c']),
      expression: "['ctrl', 'c']"
    }],
    staticClass: "button is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.closeTicketModal($event)
      },
      "shortkey": _vm.closeTicketModal
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-lock"
  })])])]) : _vm._e(), _vm._v(" "), _c('tooltip', {
    attrs: {
      "content": _vm.ticket.printed_at ? 'Ticket impreso. Imprimir nuevamente' : 'Imprimir ticket (ctrl + p)'
    }
  }, [_c('pop-confirm', {
    staticClass: "not-print",
    attrs: {
      "content": "Despues de imprimir, no se podra modificar el ticket. Seguro de seguir?",
      "icon": "question-circle-o",
      "on-ok": _vm.printTicket,
      "on-cancel": _vm.cancelPrint
    }
  }, [_c('span', {
    directives: [{
      name: "shortkey",
      rawName: "v-shortkey.once",
      value: (['ctrl', 'p']),
      expression: "['ctrl', 'p']",
      modifiers: {
        "once": true
      }
    }],
    staticClass: "button is-light",
    on: {
      "shortkey": function($event) {
        _vm.printTicket()
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-print"
  })])])])], 1), _vm._v(" "), _c('tooltip', {
    attrs: {
      "content": "Imprimir ticket de cocina"
    }
  }, [_c('a', {
    staticClass: "button is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.toggleKitchenView($event)
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-cutlery"
  })])])]), _vm._v(" "), _c('tooltip', {
    attrs: {
      "content": "Enviar a la impresora fiscal"
    }
  }, [_c('a', {
    staticClass: "button is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.printFiscalTicket($event)
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-file-o"
  })])])]), _vm._v(" "), _c('tooltip', {
    attrs: {
      "content": "Eliminar ticket"
    }
  }, [_c('button', {
    staticClass: "button is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.deleteTicket($event)
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-times"
  })])])])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "print"
  }, [_c('div', [(_vm.ticket.table_id) ? _c('span', [_vm._v("MESA " + _vm._s(_vm.ticket.table.description))]) : _c('span', {
    staticClass: "is-danger-text"
  }, [_vm._v("DELIVERY")])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-weight": "300",
      "font-size": "25px"
    }
  }, [_vm._v("TICKET # " + _vm._s(_vm._f("withDash")(_vm.ticket.number)))]), _vm._v(" "), (_vm.ticket.client.id) ? _c('div', [_c('h4', [_vm._v("Cliente: " + _vm._s(_vm.ticket.client.name))])]) : _vm._e(), _vm._v(" "), (_vm.ticket.address) ? _c('div', [_c('h4', [_vm._v("Direccion" + _vm._s(_vm.ticket.address))])]) : _vm._e()]), _vm._v(" "), _c('hr', {
    staticClass: "not-print"
  }), _vm._v(" "), _c('div', [_c('ticket-content', {
    attrs: {
      "ticket": _vm.ticket,
      "reasons": _vm.reasons,
      "kitchenView": _vm.kitchenView
    },
    on: {
      "ticket-paid": _vm.setPaid,
      "ticket-not-paid": _vm.setNotPaid
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "ticket-footer"
  }, [_c('div', {
    staticClass: "columns content"
  }, [_c('div', {
    staticClass: "column is-9"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-8 is-marginless print-center"
  }, [_vm._m(1), _vm._v(" "), _c('barcode', {
    attrs: {
      "tag": 'img',
      "value": _vm.ticket.number,
      "options": {
        format: _vm.barcode.format,
        lastChar: _vm.barcode.lastChar,
        displayValue: true,
        height: _vm.barcode.height,
        width: _vm.barcode.width,
        background: 'transparent'
      }
    }
  })], 1), _vm._v(" "), (_vm.ticket.user) ? _c('div', {
    staticClass: "column is-4 not-print",
    staticStyle: {
      "text-align": "right"
    }
  }, [_vm._v("\n              Ud ha sido atendido por: "), _c('b', [_vm._v(_vm._s(_vm.ticket.user.name))])]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "column is-3 not-print",
    staticStyle: {
      "padding-left": "30px"
    }
  }, [_vm._v("\n          " + _vm._s(_vm._f("uppercase")(_vm._f("moment")(_vm.date, 'DD, MMMM YYYY, HH:mm A'))) + "\n        ")])])]), _vm._v(" "), _c('modal', {
    attrs: {
      "title": 'Ticket Nro. ' + _vm.ticket.number,
      "show-footer": false,
      "on-cancel": _vm.closePrintModal,
      "is-show": _vm.isPrintOpen,
      "transition": "zoom"
    }
  }, [_c('form', [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-5"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.print.customer_name),
      expression: "print.customer_name"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Nombre"
    },
    domProps: {
      "value": (_vm.print.customer_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.print.customer_name = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "column is-7"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.print.customer_address),
      expression: "print.customer_address"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Direccion"
    },
    domProps: {
      "value": (_vm.print.customer_address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.print.customer_address = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-5"
  }, [_c('div', {
    staticClass: "select is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.print.customer_doc_type),
      expression: "print.customer_doc_type"
    }],
    staticClass: "input",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.print.customer_doc_type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Seleccione tipo")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "C"
    }
  }, [_vm._v("CUIT")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "0"
    }
  }, [_vm._v("LE")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "1"
    }
  }, [_vm._v("LC")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "2"
    }
  }, [_vm._v("DNI")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "3"
    }
  }, [_vm._v("Pasaporte")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "4"
    }
  }, [_vm._v("CE")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "5"
    }
  }, [_vm._v("S/C")])])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-7"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.print.customer_doc_nbr),
      expression: "print.customer_doc_nbr"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Numero"
    },
    domProps: {
      "value": (_vm.print.customer_doc_nbr)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.print.customer_doc_nbr = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-5"
  }, [_c('div', {
    staticClass: "select is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.print.ticket_type),
      expression: "print.ticket_type"
    }],
    staticClass: "input",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.print.ticket_type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Seleccione tipo")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "A"
    }
  }, [_vm._v("Factura A")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "B"
    }
  }, [_vm._v("Factura B")])])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('div', {
    staticClass: "select is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.print.iva_type),
      expression: "print.iva_type"
    }],
    staticClass: "is-expanded",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.print.iva_type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Seleccione tipo iva")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "I"
    }
  }, [_vm._v("Responsable inscripto")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "N"
    }
  }, [_vm._v("Responsable no inscripto")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "E"
    }
  }, [_vm._v("Exento")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "A"
    }
  }, [_vm._v("No Responsable")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "M"
    }
  }, [_vm._v("Responsable Monotributo")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "T"
    }
  }, [_vm._v("No categorizado")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "V"
    }
  }, [_vm._v("Pequeño contribuyente")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "S"
    }
  }, [_vm._v("Monotributista social")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "F"
    }
  }, [_vm._v("Consumidor final")])])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-3"
  }, [_c('div', {
    staticClass: "select is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.print.iva),
      expression: "print.iva"
    }],
    staticClass: "is-expanded",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.print.iva = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Iva")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "10.5"
    }
  }, [_vm._v("10.5%")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "21"
    }
  }, [_vm._v("21%")])])])])]), _vm._v(" "), _c('hr', {
    staticClass: "not-print"
  }), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4 is-offset-2"
  }, [_c('button', {
    staticClass: "button is-success is-fullwidth",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.fiscalPrint($event)
      }
    }
  }, [_vm._v("Imprimir")])]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('button', {
    staticClass: "button is-light is-fullwidth",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.closePrintModal($event)
      }
    }
  }, [_vm._v("Cancelar")])])])])]), _vm._v(" "), _c('modal', {
    attrs: {
      "title": 'TICKET Nro. ' + _vm.ticket.number,
      "show-footer": false,
      "on-cancel": _vm.closeModal,
      "is-show": _vm.isOpen,
      "ok-loading": true,
      "transition": "zoom"
    }
  }, [_c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.closeTicket()
      }
    }
  }, [_c('div', {
    staticClass: "columns modal-row with-border"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('i', {
    staticClass: "fa fa-floated fa-user-o"
  }), _vm._v("\n            Cliente")]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('div', [_vm._v(_vm._s(_vm.ticket.client_id ? _vm.ticket.client.name : 'Sin Cliente'))]), _vm._v(" "), (_vm.ticket.client_id) ? _c('div', {
    staticClass: "is-danger-text ticket-help"
  }, [_c('tooltip', {
    attrs: {
      "content": "Deuda acumulada"
    }
  }, [_c('i', {
    staticClass: "fa fa-exclamation-circle fa-floated"
  }), _vm._v(" "), _c('span', [_vm._v("Deuda actual: $" + _vm._s(_vm.ticket.client.total_debt))])])], 1) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "columns modal-row with-border"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('i', {
    staticClass: "fa fa-floated fa-clock-o"
  }), _vm._v("\n            Pagado?")]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('div', [_vm._v(_vm._s(_vm.ticket.paid ? 'Si' : _vm.ticket.total === 0 ? 'No hay items para pagar' : 'Sin pagar'))]), _vm._v(" "), (!_vm.ticket.paid) ? _c('div', {
    staticClass: "is-danger-text ticket-help"
  }, [_c('i', {
    staticClass: "fa fa-exclamation-circle fa-floated"
  }), _vm._v(" "), (_vm.ticket.client_id) ? _c('span', [_vm._v("Al cerrar se agregara como deuda al cliente")]) : _c('span', [_vm._v("Debe ingresar pagos en el ticket")])]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "columns modal-row with-border"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('i', {
    staticClass: "fa fa-floated fa-thumbs-o-up"
  }), _vm._v("\n            Todo entregado?")]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('div', {
    staticClass: "is-danger-text ticket-help"
  }, [_c('span', [_c('i', {
    staticClass: "fa fa-exclamation-circle fa-floated"
  })]), _vm._v(" "), _c('span', [_vm._v("Al cerrar se entregaran todos los items que esten pendientes")])])])]), _vm._v(" "), _c('div', {
    staticClass: "columns modal-row"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('i', {
    staticClass: "fa fa-dollar fa-floated"
  }), _vm._v(" "), _c('span', [_vm._v("Total")])]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('b', [_vm._v("$" + _vm._s(_vm.ticket.total))])])]), _vm._v(" "), _c('div', {
    staticClass: "columns modal-row"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('i', {
    staticClass: "fa fa-dollar fa-floated"
  }), _vm._v(" "), _c('span', [_vm._v("Pendiente")])]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('b', [_vm._v("$" + _vm._s(_vm.ticket.paid ? 0 : _vm.ticket.pending))])])]), _vm._v(" "), (!_vm.ticket.paid) ? _c('div', {
    staticClass: "columns modal-row"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_vm._v("Abonar Pendiente")]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('radio-group', {
    model: {
      value: (_vm.ticket.pay),
      callback: function($$v) {
        _vm.ticket.pay = $$v
      },
      expression: "ticket.pay"
    }
  }, [_c('radio', {
    attrs: {
      "val": "efectivo"
    }
  }, [_vm._v("Efectivo")]), _vm._v(" "), _c('radio', {
    attrs: {
      "val": "tarjeta"
    }
  }, [_vm._v(" Tarjeta")]), _vm._v(" "), _c('radio', {
    attrs: {
      "val": "empty"
    }
  }, [_vm._v(" No pagar")])], 1)], 1)]) : _vm._e(), _vm._v(" "), _c('hr', {
    staticClass: "not-print"
  }), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4 is-offset-2"
  }, [_c('input', {
    staticClass: "button is-success is-medium is-fullwidth",
    class: {
      'is-disabled': !_vm.canBeClosed && _vm.ticket.pay === 'empty'
    },
    attrs: {
      "type": "submit",
      "id": "submit-ticket-form",
      "value": "Cerrar"
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('a', {
    staticClass: "button is-light is-medium is-fullwidth",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.closeModal($event)
      }
    }
  }, [_vm._v("Cancelar")])])])])])], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-cutlery"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "print"
  }, [_c('br'), _c('p', [_vm._v("TICKET NO VALIDO COMO FACTURA.")])])
}]}

/***/ }),
/* 381 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "autocomplete-dropdown",
    staticStyle: {
      "position": "relative"
    }
  }, [_c('div', {
    staticClass: "control has-addons"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }, {
      name: "shortkey",
      rawName: "v-shortkey",
      value: (['ctrl', 'n']),
      expression: "['ctrl', 'n']"
    }],
    staticClass: "input",
    class: {
      'is-disabled': _vm.ticket.closed || _vm.loadingClients
    },
    attrs: {
      "type": "search",
      "id": "search-clients",
      "autocomplete": "off",
      "placeholder": "Asignar cliente..."
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
        $event.preventDefault();
        _vm.down($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
        $event.preventDefault();
        _vm.up($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.hit($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        $event.preventDefault();
        _vm.setBlur($event)
      }],
      "focus": _vm.setFocus,
      "shortkey": _vm.setFocus,
      "blur": _vm.setBlur,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "button is-primary",
    class: {
      'is-disabled': !_vm.ticket.client_id
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.removeClient($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-times"
  })])]), _vm._v(" "), _c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.focused),
      expression: "focused"
    }],
    attrs: {
      "id": "queryListClient"
    }
  }, [(_vm.filteredClients.length === 0) ? _c('li', {
    staticClass: "empty-item is-danger-text"
  }, [_vm._v("\n      No se encontro ningun resultado\n    ")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.filteredClients), function(item, $item) {
    return _c('li', {
      key: item.id,
      class: _vm.activeClass($item),
      on: {
        "key": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
          _vm.hit($event)
        },
        "mousemove": function($event) {
          _vm.setActive($item)
        },
        "mousedown": function($event) {
          $event.preventDefault();
          _vm.hit($event)
        }
      }
    }, [_vm._v("\n      " + _vm._s(item.name) + "\n    ")])
  })], 2)])
},staticRenderFns: []}

/***/ }),
/* 382 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('h1', {
    staticClass: "header"
  }, [_vm._v("Pedidos enviados")]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _vm._l((_vm.deliveries), function(delivery) {
    return _c('tr', {
      key: delivery.id
    }, [_c('td', [_c('router-link', {
      attrs: {
        "to": {
          name: 'Delivery',
          params: {
            id: delivery.id
          }
        }
      }
    }, [_vm._v("# " + _vm._s(delivery.id))])], 1), _vm._v(" "), _c('td', [_vm._v(_vm._s(delivery.state))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(delivery.user.name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(_vm._f("moment")(delivery.created_at, 'DD/MM/YYYY HH:mm A')))]), _vm._v(" "), _c('td', [_vm._v("$ " + _vm._s(delivery.total))]), _vm._v(" "), _c('td', [(!delivery.delivered_at) ? _c('a', {
      staticClass: "button is-small is-danger",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.close()
        }
      }
    }, [_vm._v("Cerrar pedido")]) : _vm._e()])])
  })], 2)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("Pedido")]), _vm._v(" "), _c('th', [_vm._v("Estado")]), _vm._v(" "), _c('th', [_vm._v("Usuario")]), _vm._v(" "), _c('th', [_vm._v("Fecha")]), _vm._v(" "), _c('th', [_vm._v("Total")]), _vm._v(" "), _c('th')])
}]}

/***/ }),
/* 383 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {}, [_c('modal', {
    attrs: {
      "title": "Administrar Proveedor",
      "ok-text": "Guardar",
      "cancel-text": "Cancelar",
      "on-ok": _vm.saveSupplier,
      "on-cancel": _vm.cancelSupplier,
      "width": 520,
      "is-show": _vm.isShow,
      "transition": "zoom"
    },
    on: {
      "close": _vm.cancelSupplier
    }
  }, [_c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newSupplier.name),
      expression: "newSupplier.name"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Nombre"
    },
    domProps: {
      "value": (_vm.newSupplier.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newSupplier.name = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newSupplier.phone),
      expression: "newSupplier.phone"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Telefono"
    },
    domProps: {
      "value": (_vm.newSupplier.phone)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newSupplier.phone = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newSupplier.address),
      expression: "newSupplier.address"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Direccion"
    },
    domProps: {
      "value": (_vm.newSupplier.address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newSupplier.address = $event.target.value
      }
    }
  })])])]), _vm._v(" "), _c('h1', {
    staticClass: "header"
  }, [_c('i', {
    staticClass: "fa fa-address-book-o fa-floated"
  }), _vm._v(" \n    Proveedores\n    "), _c('a', {
    staticClass: "is-pulled-right button is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.isShow = true
      }
    }
  }, [_vm._v("Nuevo proveedor")])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.suppliers), function(supplier) {
    return _c('tr', {
      key: supplier.id
    }, [_c('td', [_vm._v(_vm._s(supplier.name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(supplier.phone))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(supplier.address))]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "control has-addons"
    }, [_c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.removeSupplier(supplier)
        }
      }
    }, [_vm._m(1, true)]), _vm._v(" "), _c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.setToEdit(supplier)
        }
      }
    }, [_vm._m(2, true)])])])])
  }))])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("Nombre")]), _vm._v(" "), _c('th', [_vm._v("Telefono")]), _vm._v(" "), _c('th', [_vm._v("Direccion")]), _vm._v(" "), _c('th')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-pencil"
  })])
}]}

/***/ }),
/* 384 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container",
    attrs: {
      "id": "user-profile"
    }
  }, [_c('h1', {
    staticClass: "header"
  }, [_c('tag', {
    attrs: {
      "rounded": "",
      "id": "header-icon"
    }
  }, [_c('i', {
    staticClass: "fa fa-user"
  })]), _vm._v(" Perfil")], 1), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_c('div', {
    staticClass: "control has-icon"
  }, [_c('i', {
    staticClass: "fa fa-envelope"
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user.profile.email),
      expression: "user.profile.email"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "text",
      "disabled": "",
      "readonly": "readonly"
    },
    domProps: {
      "value": (_vm.user.profile.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user.profile.email = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('div', {
    staticClass: "control has-icon"
  }, [_c('i', {
    staticClass: "fa fa-cog"
  }), _vm._v(" "), _c('div', {
    staticClass: "input is-medium",
    attrs: {
      "disabled": "",
      "readonly": "readonly"
    }
  }, [_vm._v(_vm._s(_vm.roles[_vm.user.profile.role]))])])])]), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_c('tooltip', {
    attrs: {
      "content": "Nombre completo"
    }
  }, [_c('div', {
    staticClass: "control has-icon"
  }, [_c('i', {
    staticClass: "fa fa-user"
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user.profile.name),
      expression: "user.profile.name"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": (_vm.user.profile.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user.profile.name = $event.target.value
      }
    }
  })])])], 1), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('tooltip', {
    attrs: {
      "content": "Direccion completa"
    }
  }, [_c('div', {
    staticClass: "control has-icon"
  }, [_c('i', {
    staticClass: "fa fa-home"
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user.profile.address),
      expression: "user.profile.address"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "text",
      "placeholder": "Agregar Direccion"
    },
    domProps: {
      "value": (_vm.user.profile.address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user.profile.address = $event.target.value
      }
    }
  })])])], 1)]), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_c('tooltip', {
    attrs: {
      "content": "El numero de Telefono"
    }
  }, [_c('div', {
    staticClass: "control has-icon"
  }, [_c('i', {
    staticClass: "fa fa-phone"
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user.profile.phone),
      expression: "user.profile.phone"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "text",
      "placeholder": "Agregar Telefono"
    },
    domProps: {
      "value": (_vm.user.profile.phone)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user.profile.phone = $event.target.value
      }
    }
  })])])], 1), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('tooltip', {
    attrs: {
      "content": "El numero de CUIL"
    }
  }, [_c('div', {
    staticClass: "control is-expanded has-icon"
  }, [_c('i', {
    staticClass: "fa fa-tag"
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user.profile.cuil),
      expression: "user.profile.cuil"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "text",
      "placeholder": "Agregar CUIL"
    },
    domProps: {
      "value": (_vm.user.profile.cuil)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.user.profile.cuil = $event.target.value
      }
    }
  })])])], 1), _vm._v(" "), _c('div', {
    staticClass: "column is-2"
  }, [_c('radio-group', {
    staticClass: "is-pulled-right",
    model: {
      value: (_vm.user.profile.gender),
      callback: function($$v) {
        _vm.user.profile.gender = $$v
      },
      expression: "user.profile.gender"
    }
  }, [_c('radio-button', {
    staticClass: "is-medium",
    attrs: {
      "val": "mujer"
    }
  }, [_vm._v("Mujer")]), _vm._v(" "), _c('radio-button', {
    staticClass: "is-medium",
    attrs: {
      "val": "hombre"
    }
  }, [_vm._v("Hombre")])], 1)], 1)]), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_c('div', {
    staticClass: "control is-expanded has-icon"
  }, [_c('i', {
    staticClass: "fa fa-lock"
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.authCreds.password),
      expression: "authCreds.password"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "password",
      "placeholder": "Contraseña nueva"
    },
    domProps: {
      "value": (_vm.authCreds.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.authCreds.password = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('div', {
    staticClass: "control is-expanded has-icon"
  }, [_c('i', {
    staticClass: "fa fa-lock"
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.authCreds.password_confirmation),
      expression: "authCreds.password_confirmation"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "password",
      "placeholder": "Confirmar contraseña"
    },
    domProps: {
      "value": (_vm.authCreds.password_confirmation)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.authCreds.password_confirmation = $event.target.value
      }
    }
  })])])]), _vm._v(" "), (_vm.updatePassword) ? _c('div', {
    staticClass: "is-danger-text",
    staticStyle: {
      "font-size": "15px",
      "margin": "5px 0px"
    }
  }, [(_vm.authCreds.password === _vm.authCreds.password_confirmation) ? _c('span', [_vm._v(" Se actualizara la contraseña")]) : _c('span', [_vm._v("La confirmacion de la contraseña es incorrecta")])]) : _vm._e(), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.oldPassword),
      expression: "oldPassword"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "password",
      "placeholder": "Contraseña Actual"
    },
    domProps: {
      "value": (_vm.oldPassword)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.oldPassword = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('button', {
    staticClass: "button is-medium is-primary",
    class: {
      'is-disabled': !_vm.oldPassword
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.update($event)
      }
    }
  }, [_vm._v("\n        Guardar\n      ")])])])])
},staticRenderFns: []}

/***/ }),
/* 385 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "login"
    }
  }, [_c('div', {
    staticClass: "login-content"
  }, [_c('h1', [_vm._v("Bienvenido")]), _vm._v(" "), (_vm.error) ? _c('alert', {
    attrs: {
      "type": "danger"
    }
  }, [_vm._v(_vm._s(_vm.error.error.user_authentication[0]))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "box"
  }, [(!_vm.loading) ? _c('div', [_c('div', {
    staticClass: "control has-icon has-icon-right"
  }, [_c('i', {
    staticClass: "fa fa-envelope"
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.credentials.email),
      expression: "credentials.email"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "text",
      "placeholder": "Email"
    },
    domProps: {
      "value": (_vm.credentials.email)
    },
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.submit()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.credentials.email = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control has-icon has-icon-right"
  }, [_c('i', {
    staticClass: "fa fa-lock"
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.credentials.password),
      expression: "credentials.password"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "password",
      "placeholder": "Password"
    },
    domProps: {
      "value": (_vm.credentials.password)
    },
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.submit()
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.credentials.password = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6 is-offset-3"
  }, [_c('button', {
    staticClass: "button is-fullwidth is-primary is-medium ",
    attrs: {
      "type": "submit"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.submit($event)
      }
    }
  }, [_vm._v("Login")])])])]) : _c('div', [_c('Loader', {
    attrs: {
      "hide-text": true
    }
  })], 1)]), _vm._v(" "), _vm._m(0)], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('small', [_vm._v("BarManager 2.0 "), _c('i', {
    staticClass: "fa fa-copyright fa-floated"
  }), _vm._v("  2017")])
}]}

/***/ }),
/* 386 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "autocomplete-dropdown",
    staticStyle: {
      "position": "relative"
    }
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }],
    staticClass: "input is-expanded",
    attrs: {
      "type": "search",
      "autocomplete": "off",
      "placeholder": "Buscardor..."
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
        _vm.down($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
        _vm.up($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.hit($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        _vm.reset($event)
      }],
      "focus": function($event) {
        _vm.focused = true
      },
      "blur": _vm.reset,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  }), _vm._v(" "), _c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.focused),
      expression: "focused"
    }],
    attrs: {
      "id": "queryList"
    }
  }, [(_vm.filteredSuppliers.length === 0) ? _c('li', {
    staticClass: "empty-item is-danger-text"
  }, [_vm._v("\n        No se encontro ningun resultado\n      ")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.filteredSuppliers), function(supplier, $supplier) {
    return _c('li', {
      key: supplier.id,
      class: _vm.activeClass($supplier),
      on: {
        "key": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
          _vm.hit($event)
        },
        "mousemove": function($event) {
          _vm.setActive($supplier)
        },
        "mousedown": function($event) {
          $event.preventDefault();
          _vm.hit($event)
        }
      }
    }, [_c('div', {
      staticClass: "info"
    }, [_c('div', [_vm._v(_vm._s(supplier.name))])])])
  })], 2)])])
},staticRenderFns: []}

/***/ }),
/* 387 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('modal', {
    attrs: {
      "title": "Administrar Condif",
      "ok-text": "Guardar",
      "cancel-text": "Cancelar",
      "on-ok": _vm.addConfig,
      "on-cancel": _vm.resetConfig,
      "width": 520,
      "is-show": _vm.isShow,
      "transition": "zoom"
    },
    on: {
      "close": _vm.resetConfig
    }
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newConfig.key),
      expression: "newConfig.key"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Nombre de la Config"
    },
    domProps: {
      "value": (_vm.newConfig.key)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newConfig.key = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newConfig.value),
      expression: "newConfig.value"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Valor de la config"
    },
    domProps: {
      "value": (_vm.newConfig.value)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newConfig.value = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('h1', {
    staticClass: "header"
  }, [_c('i', {
    staticClass: "fa fa-address-book-o fa-floated"
  }), _vm._v("\n      Configuración\n      "), _c('a', {
    staticClass: "is-pulled-right button is-light",
    on: {
      "click": function($event) {
        _vm.isShow = true
      }
    }
  }, [_vm._v("Nueva Config")])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _vm._l((_vm.configs), function(v, k) {
    return _c('tr', [_c('td', [_vm._v(_vm._s(k))]), _vm._v(" "), _c('td', [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.configs[k]),
        expression: "configs[k]"
      }],
      staticClass: "input",
      attrs: {
        "type": "text"
      },
      domProps: {
        "value": (_vm.configs[k])
      },
      on: {
        "blur": function($event) {
          _vm.save(k, _vm.configs[k])
        },
        "input": function($event) {
          if ($event.target.composing) { return; }
          _vm.$set(_vm.configs, k, $event.target.value)
        }
      }
    })]), _vm._v(" "), _c('td', [_c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.remove(k)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-trash"
    })])])])
  })], 2), _vm._v(" "), _c('p', [_c('b', [_vm._v("Archivo de configuracion:")]), _vm._v(" " + _vm._s(_vm.path))])])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("Nombre")]), _vm._v(" "), _c('th', [_vm._v("Valor")]), _vm._v(" "), _c('th')])
}]}

/***/ }),
/* 388 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (!(_vm.kitchenView && !_vm.entry.item.kitchen)) ? _c('tr', {
    class: {
      'not-print': !!_vm.entry.canceled, 'kitchen-row': _vm.entry.item.kitchen, 'not-kitchen-row': !_vm.entry.item.kitchen
    }
  }, [_c('td', {
    staticClass: "has-text-centered not-print"
  }, [(!_vm.tclosed) ? _c('div', [_c('popover', {
    attrs: {
      "title": "",
      "placement": "left",
      "width": 300,
      "trigger": "click",
      "disabled": !!_vm.entry.canceled
    }
  }, [_c('button', {
    staticClass: "is-small button is-danger",
    class: {
      'is-loading': _vm.loading, 'is-disabled': _vm.entry.canceled || _vm.tclosed
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })])]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "content"
    },
    slot: "content"
  }, [_c('h1', [_vm._v("Seleccione Razon")]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "select is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.cancel_reason),
      expression: "cancel_reason"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.cancel_reason = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Sin Motivo")]), _vm._v(" "), _vm._l((_vm.reasons), function(reason) {
    return _c('option', {
      domProps: {
        "value": reason.id
      }
    }, [_vm._v(_vm._s(reason.text))])
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "form-footer has-text-centered"
  }, [_c('button', {
    staticClass: "button is-danger",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.cancel(_vm.entry)
      }
    }
  }, [_vm._v("Confirmar")])])])])], 1) : _vm._e()]), _vm._v(" "), _c('td', {
    staticClass: "has-text-centered not-print"
  }, [_c('tooltip', {
    attrs: {
      "content": _vm.entry.type_name,
      "placement": "top",
      "trigger": "hover"
    }
  }, [_c('span', [_vm._v(_vm._s(_vm.entry.type))])])], 1), _vm._v(" "), _c('td', {
    staticClass: "has-text-centered not-print"
  }, [_vm._v(_vm._s(_vm.entry.item.code))]), _vm._v(" "), _c('td', {
    staticClass: "has-text-centered"
  }, [_vm._v(_vm._s(_vm.entry.quantity))]), _vm._v(" "), _c('td', {
    staticClass: "has-text-centered not-print"
  }, [(_vm.entry.item.kitchen) ? _c('i', {
    staticClass: "fa fa-cutlery fa-floated"
  }) : _vm._e()]), _vm._v(" "), _c('td', {
    staticStyle: {
      "width": "45%"
    }
  }, [_c('div', [_c('tooltip', {
    attrs: {
      "content": _vm.entry.item.description + ' - ' + _vm.entry.updated_time,
      "placement": "top",
      "trigger": "hover"
    }
  }, [_c('i', {
    staticClass: "fa fa-question-circle fa-floated"
  })]), _vm._v("\n      " + _vm._s(_vm.entry.item.name) + "\n      "), _c('div', {
    staticClass: "is-pulled-right"
  }, [(!_vm.entry.canceled && !_vm.entry.delivered) ? _c('popover', {
    staticClass: "not-print",
    attrs: {
      "title": "",
      "placement": "top",
      "width": 300,
      "trigger": "click"
    }
  }, [_c('span', {
    staticClass: "is-primary-text",
    staticStyle: {
      "cursor": "pointer"
    }
  }, [_c('i', [_vm._v(" " + _vm._s(_vm.entry.comment ? _vm.entry.comment : 'Agregar nota'))])]), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "content"
    },
    slot: "content"
  }, [_c('h1', [_vm._v("Agregar nota")]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.entry.comment),
      expression: "entry.comment"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Nota"
    },
    domProps: {
      "value": (_vm.entry.comment)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.entry.comment = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "form-footer has-text-centered"
  }, [_c('button', {
    staticClass: "button is-danger",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.saveRow(_vm.entry)
      }
    }
  }, [_vm._v("Actualizar")])])])]) : _c('span', {
    staticClass: "not-print",
    staticStyle: {
      "color": "#999"
    }
  }, [_c('i', [_vm._v(_vm._s(_vm.entry.comment || 'Sin comentatrios'))])]), _vm._v(" "), _c('tooltip', {
    attrs: {
      "content": _vm.entry.canceled ? 'Pedido Cancelado' : _vm.entry.delivered ? 'Pedido Entregado' : 'Entregar pedido completo'
    }
  }, [_c('a', {
    staticClass: "button is-small is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.entry.delivered || _vm.entry.canceled ? false : _vm.deliverAll(_vm.entry)
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-circle",
    class: {
      'is-warning': !_vm.entry.delivered && !_vm.entry.canceled, 'is-success': _vm.entry.delivered, 'is-danger': _vm.entry.canceled
    }
  })])])])], 1)], 1), _vm._v(" "), (_vm.entry.show) ? _c('div', {
    staticClass: "sub-items"
  }, [_c('ul', _vm._l((_vm.entry.entry_items), function(item) {
    return _c('li', [_c('div', {
      staticClass: "columns"
    }, [_c('div', {
      staticClass: "column is-6"
    }, [(!_vm.tprinted) ? _c('span', [(!item.delivered_at) ? _c('popover', {
      attrs: {
        "title": "",
        "placement": "left",
        "width": 300,
        "trigger": "click",
        "disabled": !!item.canceled || _vm.tprinted
      }
    }, [_c('tooltip', {
      attrs: {
        "content": item.canceled ? item.cancel_reason ? item.cancel_reason.text : 'Sin motivo' : 'Cancelar item'
      }
    }, [_c('button', {
      staticClass: "is-small is-light"
    }, [_c('i', {
      staticClass: "fa fa-floated is-danger",
      class: {
        'fa-trash': !item.canceled, 'fa-commenting-o': item.canceled
      }
    })])]), _vm._v(" "), _c('div', {
      attrs: {
        "slot": "content"
      },
      slot: "content"
    }, [_c('h1', [_vm._v("Seleccione Razon")]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
      staticClass: "control is-grouped"
    }, [_c('div', {
      staticClass: "select is-fullwidth"
    }, [_c('select', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (_vm.cancel_reason),
        expression: "cancel_reason"
      }],
      on: {
        "change": function($event) {
          var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
            return o.selected
          }).map(function(o) {
            var val = "_value" in o ? o._value : o.value;
            return val
          });
          _vm.cancel_reason = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
        }
      }
    }, [_c('option', {
      attrs: {
        "value": ""
      }
    }, [_vm._v("Sin Motivo")]), _vm._v(" "), _vm._l((_vm.reasons), function(reason) {
      return _c('option', {
        domProps: {
          "value": reason.id
        }
      }, [_vm._v(_vm._s(reason.text))])
    })], 2)])]), _vm._v(" "), _c('div', {
      staticClass: "form-footer has-text-centered"
    }, [_c('button', {
      staticClass: "button is-danger",
      attrs: {
        "type": "button"
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.cancelItem(_vm.entry, item)
        }
      }
    }, [_vm._v("Confirmar")])])])], 1) : _c('tag', {
      staticClass: "is-small is-light"
    }, [_c('i', {
      staticClass: "fa fa-check is-success fa-floated"
    })])], 1) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(item.item_name))])]), _vm._v(" "), _c('div', {
      staticClass: "column is-6"
    }, [_c('div', {
      staticClass: "is-pulled-right"
    }, [(!item.delivered_at && !item.canceled) ? _c('tooltip', {
      attrs: {
        "content": "Entregar item"
      }
    }, [_c('a', {
      staticClass: "button is-small is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.deliverItem(_vm.entry, item)
        }
      }
    }, [_vm._v("\n                    " + _vm._s(item.canceled ? 'Cancelado' : item.delivered_at ? 'Entregado' : 'Entregar') + "\n                    "), _c('span', {
      staticClass: "icon is-small"
    }, [_c('i', {
      staticClass: "fa fa-circle is-warning"
    })])])]) : _c('div', {
      staticClass: "button is-small is-light is-not-link",
      staticStyle: {
        "cursor": "default"
      }
    }, [_c('span', [_vm._v(_vm._s(item.delivered_at ? 'Entregado' : ''))]), _vm._v(" "), (item.canceled && item.delivered_at) ? _c('span', [_vm._v("/")]) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(item.canceled ? 'Cancelado' : '') + " ")]), _vm._v(" "), _c('span', {
      staticClass: "icon is-small"
    }, [_c('i', {
      staticClass: "fa fa-circle",
      class: {
        'is-danger': item.canceled, 'is-success': !item.canceled
      }
    })])])], 1)])])])
  }))]) : _vm._e()]), _vm._v(" "), _c('td', {
    staticClass: "has-text-centered"
  }, [_vm._v(_vm._s(_vm.entry.item.price) + " ")]), _vm._v(" "), _c('td', {
    staticClass: "has-text-centered"
  }, [_vm._v(_vm._s(_vm.entry.subtotal))]), _vm._v(" "), _c('td', [_c('div', {
    staticClass: "is-pulled-right"
  }, [_c('tooltip', {
    attrs: {
      "content": "Aumentar la cantidad"
    }
  }, [(!_vm.tclosed && !_vm.entry.canceled) ? _c('a', {
    staticClass: "button is-small is-primary",
    class: {
      'is-disabled': _vm.entry.canceled || _vm.tclosed
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.increase(_vm.entry)
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })])]) : _vm._e()]), _vm._v(" "), _c('tooltip', {
    attrs: {
      "content": "Ver cada pedido"
    }
  }, [(!_vm.entry.canceled) ? _c('a', {
    staticClass: "button is-small is-success",
    on: {
      "click": function($event) {
        _vm.toggleShow()
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-database"
  })])]) : _vm._e()])], 1)])]) : _vm._e()
},staticRenderFns: []}

/***/ }),
/* 389 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {}, [(_vm.loading) ? _c('div', [_c('Loader')], 1) : _c('div', [(_vm.current.open) ? _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-9"
  }, [(_vm.tablesOpen.length > 0) ? _c('div', {
    staticStyle: {
      "margin-bottom": "40px"
    }
  }, [_c('h1', {
    staticClass: "header"
  }, [_vm._v("\n            Mesas Abiertas\n            "), _c('div', {
    staticClass: "control has-addons is-pulled-right"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.queryOpen),
      expression: "queryOpen"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Filtrar mesas abiertas"
    },
    domProps: {
      "value": (_vm.queryOpen)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.queryOpen = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "columns is-multiline"
  }, _vm._l((_vm.filteredOpenTables), function(table) {
    return _c('div', {
      key: table.id,
      staticClass: "column is-3"
    }, [_c('router-link', {
      staticClass: "open-table-button is-fullwidth button is-medium",
      class: table.color,
      attrs: {
        "to": {
          name: 'Ticket',
          params: {
            id: table.current.id
          }
        }
      }
    }, [_c('div', {
      staticStyle: {
        "margin": "5px 0"
      }
    }, [_vm._v(_vm._s(table.description))]), _vm._v(" "), (table.current.client.id) ? _c('div', [_c('small', [_vm._v(_vm._s(table.current.client.name))])]) : _vm._e(), _vm._v(" "), (table.current.client.id) ? _c('div', [_c('small', [_vm._v(_vm._s(_vm._f("truncate")(table.current.client.address || 'Sin direccion')))])]) : _vm._e()])], 1)
  }))]) : _vm._e(), _vm._v(" "), (_vm.tablesClosed.length > 0) ? _c('div', [_c('h1', {
    staticClass: "header"
  }, [_vm._v("\n            Mesas Cerradas\n            "), _c('div', {
    staticClass: "control has-addons is-pulled-right"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.queryClosed),
      expression: "queryClosed"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Filtrar mesas cerradas"
    },
    domProps: {
      "value": (_vm.queryClosed)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.queryClosed = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "columns is-multiline"
  }, _vm._l((_vm.filteredClosedTables), function(table) {
    return _c('div', {
      key: table.id,
      staticClass: "column is-3"
    }, [_c('div', {
      staticClass: "is-clearfix"
    }, [_c('a', {
      staticClass: "button is-fullwidth is-outlined is-medium",
      class: table.color,
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.openTable(table)
        }
      }
    }, [_vm._v("\n                  " + _vm._s(table.description) + "\n                ")])])])
  }))]) : _vm._e()])]) : _c('div', {
    staticClass: "daily-cash-form"
  }, [_c('h1', {
    staticClass: "header"
  }, [_c('tag', {
    staticClass: "medium",
    attrs: {
      "rounded": "",
      "type": "danger"
    }
  }, [_c('i', {
    staticClass: "fa fa-exclamation"
  })]), _vm._v("\n        Abrir caja para iniciar el turno\n      ")], 1), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newCash.init_amount),
      expression: "newCash.init_amount"
    }],
    staticClass: "input",
    attrs: {
      "type": "number",
      "step": "0.01",
      "placeholder": "Monto inicial"
    },
    domProps: {
      "value": (_vm.newCash.init_amount)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newCash.init_amount = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control is-expanded"
  }, [_c('div', {
    staticClass: "select is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newCash.user_id),
      expression: "newCash.user_id"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.newCash.user_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.users), function(user) {
    return _c('option', {
      domProps: {
        "value": user.id
      }
    }, [_vm._v(_vm._s(user.name))])
  }))])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-fullwidth is-primary",
    class: {
      'is-disabled': !_vm.newCash.init_amount || !_vm.newCash.user_id
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.openCailyCash($event)
      }
    }
  }, [_vm._v("Abrir")])])])])])])
},staticRenderFns: []}

/***/ }),
/* 390 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('h1', {
    staticStyle: {
      "font-size": "18px",
      "font-weight": "400",
      "margin-bottom": "10px"
    }
  }, [_vm._v("Pedidos listos para enviar: " + _vm._s(_vm.tickets.length))]), _vm._v(" "), _c('div', {
    staticStyle: {
      "height": "600px",
      "overflow": "auto"
    }
  }, [_c('ul', _vm._l((_vm.tickets), function(ticket, $index) {
    return _c('li', {
      staticClass: "dticket",
      class: {
        'disabled': !ticket.address, added: ticket.added, dragging: _vm.isdragged && _vm.current === $index
      },
      attrs: {
        "id": $index,
        "draggable": ticket.address && !ticket.added
      },
      on: {
        "drag": function($event) {
          _vm.setDragging($index)
        },
        "dragstart": function($event) {
          _vm.isdragged = true;
          _vm.isdragging = true
        },
        "dragend": function($event) {
          _vm.isdragging = false;
          _vm.current = null;
        }
      }
    }, [_c('div', {
      staticClass: "is-clearfix"
    }, [(ticket.added) ? _c('i', {
      staticClass: "fa fa-check fa-floated"
    }) : _vm._e(), _vm._v("\n              # " + _vm._s(ticket.number) + " \n              "), _c('b', {
      staticClass: "is-pulled-right"
    }, [_vm._v("$" + _vm._s(ticket.partial_total))])]), _vm._v(" "), _c('p', {
      staticStyle: {
        "margin": "10px 0px"
      }
    }, [_c('i', {
      staticClass: "fa fa-home fa-floated"
    }), _vm._v(" " + _vm._s(ticket.address || 'Sin direccion no se puede enviar') + "\n            ")])])
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('div', {
    staticClass: "box",
    staticStyle: {
      "min-height": "70px",
      "width": "100%"
    }
  }, [_c('div', {
    staticClass: "dragZone",
    class: {
      'dragEnter': _vm.isdragging
    },
    on: {
      "dragover": function($event) {
        $event.preventDefault();
      },
      "drop": _vm.addItem,
      "dragoever": function($event) {
        _vm.isdragging = true
      }
    }
  }, [_vm._m(0)]), _vm._v(" "), (_vm.newDelivery.tickets.length > 0) ? _c('div', [_c('h4', {
    staticStyle: {
      "font-size": "18px",
      "font-weight": "400",
      "margin": "5px 0px"
    }
  }, [_vm._v("Pedidos (" + _vm._s(_vm.newDelivery.tickets.length) + ")")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "height": "400px",
      "overflow": "auto"
    }
  }, _vm._l((_vm.newDelivery.tickets), function(ticket, $index) {
    return _c('div', {
      key: ticket.id,
      staticClass: "dticket"
    }, [_c('div', {
      staticClass: "columns"
    }, [_c('div', {
      staticClass: "column"
    }, [_c('span', {
      staticClass: "button is-fullwidth is-not-link is-light"
    }, [_vm._v("# " + _vm._s(ticket.number))])]), _vm._v(" "), _c('div', {
      staticClass: "column"
    }, [_c('span', {
      staticClass: "button is-fullwidth is-not-link is-light"
    }, [_vm._v("$ " + _vm._s(ticket.partial_total))])]), _vm._v(" "), (!ticket.paid) ? _c('div', {
      staticClass: "column"
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: (ticket.pay),
        expression: "ticket.pay"
      }],
      staticClass: "input",
      attrs: {
        "type": "number",
        "step": "0.01"
      },
      domProps: {
        "value": (ticket.pay)
      },
      on: {
        "blur": function($event) {
          _vm.setChange(ticket)
        },
        "input": function($event) {
          if ($event.target.composing) { return; }
          ticket.pay = $event.target.value
        }
      }
    }), _vm._v(" "), _c('span', {
      staticClass: "button is-fullwidth is-light is-not-link"
    }, [_vm._v("Llevar cambio: $ " + _vm._s(ticket.change))])]) : _c('div', {
      staticClass: "column"
    }, [_vm._m(1, true)]), _vm._v(" "), _c('div', {
      staticClass: "column"
    }, [_c('a', {
      staticClass: "button is-danger",
      on: {
        "click": function($event) {
          _vm.removeFromList($index)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-trash"
    })])])]), _vm._v(" "), _c('div', {
      staticClass: "columns"
    }, [_c('div', {
      staticClass: "column"
    }, [_c('i', {
      staticClass: "fa fa-home fa-floated"
    }), _vm._v(" " + _vm._s(ticket.address))])])])
  }))]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "box is-clearfix"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column"
  }, [_c('span', {
    staticClass: "select is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newDelivery.moto_id),
      expression: "newDelivery.moto_id"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.newDelivery.moto_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "1"
    }
  }, [_vm._v("Moto 1")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "2"
    }
  }, [_vm._v("Moto 2")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "3"
    }
  }, [_vm._v("Moto 3")])])])]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('div', {
    staticClass: "control has-addons"
  }, [_c('span', {
    staticClass: "button is-not-link is-light"
  }, [_vm._v("Total cobrar: $ " + _vm._s(_vm.total))]), _vm._v(" "), _c('span', {
    staticClass: "button is-not-link is-light"
  }, [_vm._v("Total cambio: $ " + _vm._s(_vm.sumChange))])])]), _vm._v(" "), _c('div', {
    staticClass: "column"
  }, [_c('div', {
    staticClass: "control has-addons is-pulled-right"
  }, [_c('button', {
    staticClass: "button is-success",
    attrs: {
      "disabled": _vm.newDelivery.tickets.length < 1
    },
    on: {
      "click": function($event) {
        _vm.create()
      }
    }
  }, [_vm._v("Crear Pedido\n              ")]), _vm._v(" "), _c('a', {
    staticClass: "button is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.cancelDelivery()
      }
    }
  }, [_vm._v("Cancelar")])])])])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "drag-message"
  }, [_c('p', [_vm._v("Arrastra los tickets para enviar")]), _vm._v(" "), _c('p', [_c('i', {
    staticClass: "fa fa-upload"
  })])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "padding": "7px 5px"
    }
  }, [_c('i', {
    staticClass: "fa fa-check-circle fa-floated is-success",
    staticStyle: {
      "margin-right": "10px"
    }
  }), _vm._v(" "), _c('b', [_vm._v("Ticket pagado")])])
}]}

/***/ }),
/* 391 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('tr', [_c('td', {
    staticStyle: {
      "width": "15%"
    }
  }, [(_vm.ticket.table_id) ? _c('span', {
    staticClass: "table-id button is-fullwidth is-danger"
  }, [_c('b', [_vm._v("#" + _vm._s(_vm.ticket.table_id))])]) : _c('span', {
    staticClass: "button is-primary"
  }, [_c('b', [_vm._v("DELIVERY")])])]), _vm._v(" "), _c('td', {
    staticStyle: {
      "width": "15%"
    }
  }, [_c('tooltip', {
    attrs: {
      "content": "Enviar todo lo pendiente"
    }
  }, [_c('a', {
    staticClass: "button is-success",
    class: {
      'is-loading': _vm.loading
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.deliverTicket()
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-reply"
  })]), _vm._v(" "), _c('span', [_c('b', [_vm._v(_vm._s(_vm.ticket.number))])])])])], 1), _vm._v(" "), _c('td', _vm._l((_vm.ticket.entries), function(entry, id) {
    return _c('div', {
      staticClass: "entry-row"
    }, [(entry.comment) ? _c('div', {
      staticClass: "entry-comment"
    }, [_c('i', {
      staticClass: "fa fa-exclamation-circle fa-floated"
    }), _vm._v(" " + _vm._s(_vm._f("titleize")(entry.comment)) + "\n      ")]) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "columns"
    }, [_c('div', {
      staticClass: "column is-2"
    }, [_c('tooltip', {
      attrs: {
        "content": "Sacar Entrada completa"
      }
    }, [_c('a', {
      staticClass: "button is-fullwidth is-light",
      class: {
        'is-disabled is-success': entry.delivered, 'is-loading': _vm.loading
      },
      on: {
        "click": function($event) {
          _vm.deliverEntry(entry)
        }
      }
    }, [_c('span', {
      staticClass: "icon is-small"
    }, [_c('i', {
      staticClass: "fa fa-reply"
    })]), _vm._v(" "), _c('span', [_vm._v("Enviar Grupo")])])])], 1), _vm._v(" "), _c('div', {
      staticClass: "column is-10"
    }, _vm._l((entry.items), function(req) {
      return _c('div', {
        staticClass: "request-row"
      }, [_c('tooltip', {
        attrs: {
          "content": "Sacar pedido"
        }
      }, [_c('a', {
        staticClass: "button is-light",
        class: {
          'is-disabled is-success': req.delivered_at, 'is-loading': _vm.loading
        },
        on: {
          "click": function($event) {
            _vm.deliverItem(req)
          }
        }
      }, [_c('i', {
        staticClass: "fa",
        class: {
          'fa-check': req.delivered_at, 'fa-reply': !req.delivered_at
        }
      })])]), _vm._v(" "), _c('span', {
        staticClass: "button is-light is-not-link"
      }, [_vm._v(_vm._s(req.name))]), _vm._v(" "), _c('div', {
        staticClass: "is-pulled-right button is-white is-not-link"
      }, [_vm._v("\n              Pedido " + _vm._s(_vm._f("moment")(req.created_at, "from")) + "\n            ")])], 1)
    }))])])
  }))])
},staticRenderFns: []}

/***/ }),
/* 392 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container",
    attrs: {
      "id": "client"
    }
  }, [(_vm.loading) ? _c('div') : _c('div', [_c('h1', {
    staticClass: "header"
  }, [_vm._v("\n      Cliente " + _vm._s(_vm.client.name) + "\n      "), _c('div', {
    staticClass: "control has-addons is-pulled-right"
  }, [_c('a', {
    staticClass: "button is-danger",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.addTicket(_vm.client)
      }
    }
  }, [_vm._v("Abrir ticket")])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_c('div', {
    staticClass: "box"
  }, [_vm._m(0), _vm._v(" "), _c('hr'), _vm._v(" "), _c('form', {
    staticClass: "ticket-form"
  }, [_c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "control is-expanded"
  }, [_c('div', {
    staticClass: "select is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newPayment.type),
      expression: "newPayment.type"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.newPayment.type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "Efectivo"
    }
  }, [_vm._v("Efectivo")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "Tarjeta"
    }
  }, [_vm._v("Tarjeta")])])])]), _vm._v(" "), _c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newPayment.amount),
      expression: "newPayment.amount"
    }],
    staticClass: "input",
    attrs: {
      "step": "0.01",
      "type": "number",
      "placeholder": "Monto"
    },
    domProps: {
      "value": (_vm.newPayment.amount)
    },
    on: {
      "keydown": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.payDebt($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newPayment.amount = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('a', {
    staticClass: "button is-primary",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.payDebt($event)
      }
    }
  }, [_vm._v("Pagar")])])])]), _vm._v(" "), (_vm.paymentInFavor.length > 0) ? _c('div', [_c('hr'), _vm._v(" "), _c('ul', _vm._l((_vm.paymentInFavor), function(payment) {
    return _c('li', {
      key: payment.id,
      staticStyle: {
        "margin-bottom": "5px"
      },
      attrs: {
        "date": _vm.formatDate(payment.created_at)
      }
    }, [_c('div', {
      staticClass: "columns",
      staticStyle: {
        "font-size": "16px"
      }
    }, [_c('div', {
      staticClass: "column is-1"
    }, [_c('tooltip', {
      attrs: {
        "content": "A favor"
      }
    }, [_c('i', {
      staticClass: "fa fa-floated fa-circle is-danger"
    })])], 1), _vm._v(" "), _c('div', {
      staticClass: "column is-2"
    }, [_vm._v(_vm._s(payment.type))]), _vm._v(" "), _c('div', {
      staticClass: "column is-4"
    }, [_c('b', [_vm._v("$ " + _vm._s(payment.amount))])]), _vm._v(" "), _c('div', {
      staticClass: "column is-4"
    }, [_vm._v(_vm._s(_vm._f("moment")(payment.created_at, 'DD MMMM, YYYY')))]), _vm._v(" "), (_vm.pending > 0) ? _c('div', {
      staticClass: "column is-1"
    }, [_c('tooltip', {
      attrs: {
        "content": "Aplicar saldo a favor a la deuda"
      }
    }, [_c('button', {
      staticClass: "button is-small is-success is-outlined",
      on: {
        "click": function($event) {
          _vm.assignPayement(payment)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-download"
    })])])], 1) : _vm._e()])])
  }))]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('client-codes', {
    attrs: {
      "client": _vm.client
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "box"
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_c('div', {
    staticClass: "button is-light is-not-link"
  }, [_vm._v("Tickets cerrados")]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "tickets-container"
  }, [_c('table', {
    staticClass: "table"
  }, [_vm._m(2), _vm._v(" "), _vm._l((_vm.paidTickets), function(ticket) {
    return _c('tr', [_c('td', [_vm._v(_vm._s(ticket.number))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(_vm._f("moment")(ticket.created_at, 'DD MMMM, YYYY')))]), _vm._v(" "), _c('td', [_c('b', [_vm._v("$ " + _vm._s(ticket.total))])]), _vm._v(" "), _c('td', [_vm._v(_vm._s(_vm._f("moment")(ticket.paid_at, 'DD MMMM, YYYY')))])])
  })], 2)])]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('div', {
    staticClass: "button is-light is-not-link"
  }, [_vm._v("Monto deuda actual:")]), _vm._v(" "), _c('div', {
    staticClass: "button is-light is-not-link"
  }, [_c('b', {
    staticClass: "is-danger-text"
  }, [_vm._v("$" + _vm._s(_vm.pending))])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "tickets-container"
  }, [_c('table', {
    staticClass: "table"
  }, [_vm._m(3), _vm._v(" "), _vm._l((_vm.notPaidTickets), function(ticket) {
    return _c('tr', [_c('td', [_c('tooltip', {
      attrs: {
        "content": ticket.status === 'closed' ? 'Ticket cerrado' : 'Ticket abierto'
      }
    }, [_c('i', {
      staticClass: "fa fa-floated fa-circle",
      class: {
        'is-success': ticket.status !== 'closed', 'is-danger': ticket.status === 'closed'
      }
    })])], 1), _vm._v(" "), _c('td', [_vm._v(_vm._s(ticket.number))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(_vm._f("moment")(ticket.created_at, 'DD MMMM, YYYY')))]), _vm._v(" "), _c('td', [_c('b', [_vm._v("$" + _vm._s(ticket.total))])]), _vm._v(" "), _c('td', [_c('b', {
      staticClass: "is-danger-text"
    }, [_vm._v("$" + _vm._s(ticket.pending))])])])
  })], 2)])])])]), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_c('div', {
    staticClass: "box"
  }, [_vm._m(4), _vm._v(" "), (_vm.commonPayments.length > 0) ? _c('div', [_c('table', {
    staticClass: "table"
  }, [_vm._m(5), _vm._v(" "), _c('tbody', _vm._l((_vm.commonPayments), function(payment) {
    return _c('tr', {
      key: payment.id,
      staticStyle: {
        "margin-bottom": "5px"
      },
      attrs: {
        "date": _vm.formatDate(payment.created_at)
      }
    }, [_c('td', [_c('router-link', {
      attrs: {
        "to": {
          name: 'Ticket',
          params: {
            id: payment.ticket_id
          }
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-angle-right fa-floated"
    }), _vm._v(" " + _vm._s(payment.ticket.number) + "\n                    ")])], 1), _vm._v(" "), _c('td', [_vm._v(_vm._s(_vm._f("moment")(payment.created_at, 'DD MMMM, YYYY - hh:mm A')))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(payment.type))]), _vm._v(" "), _c('td', [_c('b', [_vm._v("$ " + _vm._s(payment.amount))])])])
  }))])]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('div', {
    staticClass: "box"
  }, [_vm._m(6), _vm._v(" "), _c('div', {
    staticClass: "ticket-form"
  }, [_c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newComment.text),
      expression: "newComment.text"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Agregar nota"
    },
    domProps: {
      "value": (_vm.newComment.text)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newComment.text = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-primary",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.addComment($event)
      }
    }
  }, [_vm._v("Agregar")])])])]), _vm._v(" "), (_vm.client.client_comments.length > 0) ? _c('div', [_c('hr'), _vm._v(" "), _c('ul', _vm._l((_vm.client.client_comments), function(comment) {
    return _c('li', {
      key: _vm.client.id,
      attrs: {
        "date": _vm.dateFrom(_vm.client.date),
        "type": "primary"
      }
    }, [_c('i', {
      staticClass: "fa fa-angle-right fa-floated"
    }), _vm._v(" "), _c('span', {
      staticStyle: {
        "font-size": "16px"
      }
    }, [_vm._v(_vm._s(comment.text))]), _vm._v(" "), _c('a', {
      staticClass: "is-pulled-right button is-small is-danger",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.removeComment(comment)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-trash"
    })])])
  }))]) : _vm._e()])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h4', [_c('i', {
    staticClass: "fa fa-floated fa-credit-card"
  }), _vm._v(" Ingresar Pago")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h4', [_c('i', {
    staticClass: "fa fa-floated fa-tags"
  }), _vm._v(" Tickets")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("Num")]), _vm._v(" "), _c('th', [_vm._v("Fecha Ticket")]), _vm._v(" "), _c('th', [_vm._v("Total")]), _vm._v(" "), _c('th', [_vm._v("Fecha Pago")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th'), _vm._v(" "), _c('th', [_vm._v("Num")]), _vm._v(" "), _c('th', [_vm._v("Fecha Ticket")]), _vm._v(" "), _c('th', [_vm._v("Total")]), _vm._v(" "), _c('th', [_vm._v("Pendiente")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h4', [_c('i', {
    staticClass: "fa fa-floated fa-credit-card"
  }), _vm._v(" Pagos anteriores")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("Ticket")]), _vm._v(" "), _c('th', [_vm._v("Fecha")]), _vm._v(" "), _c('th', [_vm._v("Tipo")]), _vm._v(" "), _c('th', [_vm._v("Monto")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h4', [_c('i', {
    staticClass: "fa fa-floated fa-comments"
  }), _vm._v(" Notas")])
}]}

/***/ }),
/* 393 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container",
    attrs: {
      "id": "admin-content"
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-2"
  }, [_c('h1', {
    staticClass: "header"
  }, [_vm._v("Menu")]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('menus', {
    attrs: {
      "label": ""
    }
  }, [(_vm.dailyCash.id) ? _c('menu-item', {
    attrs: {
      "icon": "exclamation",
      "to": {
        name: 'PartialDailyCash',
        params: {
          id: _vm.dailyCash.id
        }
      }
    }
  }, [_vm._v("\n          Caja actual\n        ")]) : _c('li', {
    staticClass: "nav-item",
    staticStyle: {
      "font-size": "14px",
      "padding": "7px"
    }
  }, [_c('span', {
    staticClass: "is-danger-text"
  }, [_vm._v("No hay caja")])]), _vm._v(" "), _c('div', {
    staticClass: "divider",
    staticStyle: {
      "height": "3px",
      "margin": "6px 0px"
    }
  }), _vm._v(" "), _c('menu-item', {
    attrs: {
      "icon": "bars",
      "to": {
        name: 'AdminItems'
      }
    }
  }, [_vm._v("Items")]), _vm._v(" "), _c('menu-item', {
    attrs: {
      "icon": "lightbulb-o",
      "to": {
        name: 'AdminPromotions'
      }
    }
  }, [_vm._v("Promociones")]), _vm._v(" "), _c('menu-item', {
    attrs: {
      "icon": "paperclip",
      "to": {
        name: 'AdminCategories'
      }
    }
  }, [_vm._v("Categorias")]), _vm._v(" "), _c('menu-item', {
    attrs: {
      "icon": "users",
      "to": {
        name: 'AdminClients'
      }
    }
  }, [_vm._v("Clientes")]), _vm._v(" "), _c('menu-item', {
    attrs: {
      "icon": "address-book-o",
      "to": {
        name: 'AdminSuppliers'
      }
    }
  }, [_vm._v("Proveedores")]), _vm._v(" "), _c('menu-item', {
    attrs: {
      "icon": "cutlery",
      "to": {
        name: 'AdminTables'
      }
    }
  }, [_vm._v("Mesas")]), _vm._v(" "), _c('menu-item', {
    attrs: {
      "icon": "hashtag",
      "to": {
        name: 'AdminCancelReasons'
      }
    }
  }, [_vm._v("Razones")]), _vm._v(" "), (_vm.profile.role !== 'manager') ? _c('div', [_c('div', {
    staticClass: "divider"
  }), _vm._v(" "), _c('h2', {
    staticStyle: {
      "font-weight": "300",
      "padding": "10px",
      "color": "#f56954"
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-exclamation-circle"
  })]), _vm._v(" "), _c('span', [_vm._v("Admin")])]), _vm._v(" "), _c('div', {
    staticClass: "divider"
  }), _vm._v(" "), _c('menu-item', {
    attrs: {
      "icon": "ticket",
      "to": {
        name: 'Tickets'
      }
    }
  }, [_vm._v("Tickets")]), _vm._v(" "), _c('menu-item', {
    attrs: {
      "icon": "money",
      "to": {
        name: 'Payments'
      }
    }
  }, [_vm._v("Pagos")]), _vm._v(" "), _c('menu-item', {
    attrs: {
      "icon": "cog",
      "to": {
        name: 'AdminUsers'
      }
    }
  }, [_vm._v("Usuarios")]), _vm._v(" "), _c('menu-item', {
    attrs: {
      "icon": "dollar",
      "to": {
        name: 'AdminDailyCashes'
      }
    }
  }, [_vm._v("Cajas")]), _vm._v(" "), _c('menu-item', {
    attrs: {
      "icon": "bar-chart",
      "to": {
        name: 'AdminReports'
      }
    }
  }, [_vm._v("Reportes")]), _vm._v(" "), _c('menu-item', {
    attrs: {
      "icon": "cogs",
      "to": {
        name: 'AdminSettings'
      }
    }
  }, [_vm._v("Settings")])], 1) : _vm._e()], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "column is-10"
  }, [_c('router-view')], 1)])])
},staticRenderFns: []}

/***/ }),
/* 394 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "autocomplete-dropdown",
    staticStyle: {
      "position": "relative",
      "width": "100%"
    }
  }, [_c('div', {
    staticClass: "control has-addons"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }, {
      name: "shortkey",
      rawName: "v-shortkey",
      value: (['ctrl', 'm']),
      expression: "['ctrl', 'm']"
    }],
    staticClass: "input",
    class: {
      'is-disabled': _vm.ticket.closed
    },
    attrs: {
      "type": "search",
      "id": "assign-input",
      "autocomplete": "off",
      "placeholder": "Asignar Mesa..."
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
        $event.preventDefault();
        _vm.down($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
        $event.preventDefault();
        _vm.up($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.hit($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        $event.preventDefault();
        _vm.setBlur($event)
      }],
      "focus": _vm.setFocus,
      "shortkey": _vm.setFocus,
      "blur": _vm.setBlur,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "button is-primary",
    class: {
      'is-disabled': !_vm.ticket.table_id
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.removeTable($event)
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-times"
  })])]), _vm._v(" "), _c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.focused),
      expression: "focused"
    }],
    attrs: {
      "id": "assignTableList"
    }
  }, [(_vm.filteredTables.length === 0) ? _c('li', {
    staticClass: "empty-item is-danger-text"
  }, [_vm._v("\n      No se encontro ningun resultado\n    ")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.filteredTables), function(item, $item) {
    return _c('li', {
      key: item.id,
      class: _vm.activeClass($item),
      on: {
        "key": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
          _vm.hit($event)
        },
        "mousemove": function($event) {
          _vm.setActive($item)
        },
        "mousedown": function($event) {
          $event.preventDefault();
          _vm.hit($event)
        }
      }
    }, [_c('div', {
      staticClass: "indicator"
    }, [_c('span', {
      staticClass: "icon is-small"
    }, [_c('i', {
      staticClass: "fa fa-circle",
      class: {
        'is-danger-text': item.closed, 'is-success-text': !item.closed
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "info",
      class: item.color
    }, [_c('div', [_vm._v(_vm._s(item.description))]), _vm._v(" "), _c('small', [_vm._v(_vm._s(item.closed ? 'Cerrada' : 'Abierta: Ticket ' + item.current.number))])])])
  })], 2)])
},staticRenderFns: []}

/***/ }),
/* 395 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {}, [_c('b-aside', {
    attrs: {
      "is-show": _vm.isShow,
      "backdrop": false,
      "width": 600,
      "show-footer": false,
      "placement": "right",
      "title": "Administrar Item"
    },
    on: {
      "close": _vm.cancelItem
    }
  }, [(_vm.newItem.id) ? _c('div', [_c('tag', {
    attrs: {
      "type": "success"
    }
  }, [_vm._v("Editando Item " + _vm._s(_vm.newItem.id))])], 1) : _c('div', [_c('tag', {
    attrs: {
      "type": "danger"
    }
  }, [_vm._v("Nuevo item")])], 1), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newItem.code),
      expression: "newItem.code"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Codigo"
    },
    domProps: {
      "value": (_vm.newItem.code)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newItem.code = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newItem.name),
      expression: "newItem.name"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Nombre"
    },
    domProps: {
      "value": (_vm.newItem.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newItem.name = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newItem.description),
      expression: "newItem.description"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Descripcion"
    },
    domProps: {
      "value": (_vm.newItem.description)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newItem.description = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newItem.day_price),
      expression: "newItem.day_price"
    }],
    staticClass: "input",
    attrs: {
      "type": "number",
      "step": 0.01,
      "placeholder": "Precio dia"
    },
    domProps: {
      "value": (_vm.newItem.day_price)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newItem.day_price = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newItem.night_price),
      expression: "newItem.night_price"
    }],
    staticClass: "input",
    attrs: {
      "type": "number",
      "step": 0.01,
      "placeholder": "Precio noche"
    },
    domProps: {
      "value": (_vm.newItem.night_price)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newItem.night_price = $event.target.value
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "control is-expanded"
  }, [_c('span', {
    staticClass: "select is-fullwidth"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newItem.category_id),
      expression: "newItem.category_id"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.newItem.category_id = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Seleccione categoria")]), _vm._v(" "), _vm._l((_vm.categories), function(category) {
    return _c('option', {
      domProps: {
        "value": category.id
      }
    }, [_vm._v(_vm._s(category.name))])
  })], 2)])])]), _vm._v(" "), _c('div', {
    staticClass: "controle"
  }, [_c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "control is-expanded"
  }, [_c('checkbox', {
    attrs: {
      "val": "true",
      "checked": _vm.newItem.favorite
    },
    model: {
      value: (_vm.newItem.favorite),
      callback: function($$v) {
        _vm.newItem.favorite = $$v
      },
      expression: "newItem.favorite"
    }
  }, [_vm._v("Favorito")])], 1)])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-primary",
    attrs: {
      "type": "submit"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.saveItem($event)
      }
    }
  }, [_vm._v("Agregar")]), _vm._v(" "), _c('button', {
    staticClass: "button is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.cancelItem($event)
      }
    }
  }, [_vm._v("Cancelar")])])]), _vm._v(" "), _c('h1', {
    staticClass: "header"
  }, [_c('i', {
    staticClass: "fa fa-bars fa-floated"
  }), _vm._v("\n    Items\n    "), _c('div', {
    staticClass: "control has-addons is-pulled-right"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Filtrar items"
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "keyup": function($event) {
        $event.preventDefault();
        _vm.fetchItems($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "button is-light is-pulled-right",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.openForm($event)
      }
    }
  }, [_vm._v("Nuevo Item")])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.items), function(item) {
    return _c('tr', {
      key: item.id
    }, [_c('td', [_c('tooltip', {
      attrs: {
        "content": item.favorite ? 'Item favorito' : 'No esta en la lista de favoritos'
      }
    }, [_c('i', {
      staticClass: "fa fa-floated",
      class: {
        'fa-star is-warning': item.favorite, 'fa-star-o': !item.favorite
      }
    })]), _vm._v(" "), _c('tooltip', {
      attrs: {
        "content": "Item de cocina"
      }
    }, [(item.category.kitchen) ? _c('tag', [_c('i', {
      staticClass: "fa fa-floated fa-cutlery"
    })]) : _vm._e()], 1)], 1), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.code))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.category.name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "columns"
    }, [_c('div', {
      staticClass: "column is-6"
    }, [_c('span', {
      staticClass: "button is-fullwidth is-light"
    }, [_vm._v("$" + _vm._s(item.day_price))])]), _vm._v(" "), _c('div', {
      staticClass: "column is-6"
    }, [_c('span', {
      staticClass: "button is-fullwidth is-light"
    }, [_vm._v("$" + _vm._s(item.night_price))])])])]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "control has-addons"
    }, [_c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.removeItem(item)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-trash"
    })]), _vm._v(" "), _c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.setToEdit(item)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-pencil"
    })])])])])
  }))]), _vm._v(" "), _c('pagination', {
    attrs: {
      "layout": "pager",
      "align": "left",
      "page-size": 10,
      "total": _vm.meta.total,
      "change": _vm.pageChange
    },
    model: {
      value: (_vm.page),
      callback: function($$v) {
        _vm.page = $$v
      },
      expression: "page"
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th'), _vm._v(" "), _c('th', [_vm._v("Cod")]), _vm._v(" "), _c('th', [_vm._v("Categoria")]), _vm._v(" "), _c('th', [_vm._v("Nombre")]), _vm._v(" "), _c('th', [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_vm._v("Precio Dia")]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_vm._v("Precio Noche")])])]), _vm._v(" "), _c('th')])
}]}

/***/ }),
/* 396 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.loading) ? _c('div', [_vm._v("Loading...")]) : _c('div', [_c('h1', {
    staticClass: "header is-clearfix"
  }, [_c('div', {
    staticClass: "control has-addons is-pulled-left",
    staticStyle: {
      "margin-bottom": "3px"
    }
  }, [_c('span', {
    staticClass: "button is-not-link",
    class: {
      'is-success': _vm.table.status === 'open', 'is-danger': _vm.table.status === 'closed'
    }
  }, [_vm._v("\n          " + _vm._s(_vm.formattedStatus) + "\n        ")]), _vm._v(" "), _c('span', {
    staticClass: "button is-light is-not-link"
  }, [_vm._v("MESA #" + _vm._s(_vm.table.id))])]), _vm._v(" "), (_vm.hasTickets) ? _c('div', {
    staticClass: "is-pulled-right"
  }, [_c('div', {
    staticClass: "control has-addons is-marginless"
  }, [_c('input', {
    staticClass: "input is-disabled",
    attrs: {
      "type": "text",
      "value": "Seleccione Ticket"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.currentTicket),
      expression: "currentTicket"
    }],
    on: {
      "change": [function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.currentTicket = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }, _vm.loadTicket]
    }
  }, _vm._l((_vm.tickets), function(ticket) {
    return _c('option', {
      domProps: {
        "value": ticket.id
      }
    }, [_vm._v("TICKET " + _vm._s(ticket.number))])
  }))])])]) : _vm._e()]), _vm._v(" "), _c('hr'), _vm._v(" "), (!_vm.loadingTickets && !_vm.hasTickets) ? _c('div', [_vm._v("\n      Esta mesa no tiene tickets todavia\n    ")]) : _vm._e(), _vm._v(" "), (_vm.loadingTickets) ? _c('div', [_c('Loader')], 1) : _vm._e(), _vm._v(" "), _c('router-view')], 1)])
},staticRenderFns: []}

/***/ }),
/* 397 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "kitchen"
  }, [_c('div', {
    staticClass: "container"
  }, [_c('div', {
    staticClass: "columns header"
  }, [_c('div', {
    staticClass: "column is-2"
  }, [_c('tag', {
    attrs: {
      "rounded": "",
      "id": "header-icon"
    }
  }, [_c('i', {
    staticClass: "fa fa-floated fa-cutlery"
  })]), _vm._v(" COCINA\n      ")], 1), _vm._v(" "), _c('div', {
    staticClass: "column is-3 has-text-centered"
  }, [(_vm.newRequests) ? _c('div', {
    staticClass: "button is-danger is-not-link"
  }, [_vm._m(0), _vm._v(" "), _c('span', [_vm._v("Nuevos Pedidos")])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "column is-7 has-text-right",
    staticStyle: {
      "margin-top": "-5px"
    }
  }, [_c('tooltip', {
    attrs: {
      "content": 'Recargar tickets - Ultimo check: ' + _vm.lastCheck
    }
  }, [_c('a', {
    staticClass: "button is-primary is-medium",
    class: {
      'is-disabled': _vm.loadingTickets
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.fetchTickets($event)
      }
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-refresh",
    class: {
      'fa-spin': _vm.loadingTickets
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "button is-light is-medium is-not-link"
  }, [_vm._m(1), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm._f("upercase")(_vm._f("moment")(_vm.currentTime, 'DD - MMMM - YYYY'))))])]), _vm._v(" "), _c('div', {
    staticClass: "button is-light is-medium is-not-link"
  }, [_vm._m(2), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm._f("moment")(_vm.currentTime, 'HH:mm:ss')))])]), _vm._v(" "), _c('a', {
    staticClass: "button is-light is-medium",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.logout($event)
      }
    }
  }, [_vm._m(3), _vm._v(" "), _c('span', [_vm._v("Salir")])])], 1)]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "kitchen-content"
  }, [_c('table', {
    staticClass: "table"
  }, [_vm._m(4), _vm._v(" "), _c('tbody', [_vm._l((_vm.currentTickets), function(ticket, id) {
    return _c('kitchen-row', {
      key: id,
      attrs: {
        "ticket": ticket
      },
      on: {
        "remove-ticket": function($event) {
          _vm.removeTicket(ticket)
        }
      }
    })
  }), _vm._v(" "), (_vm.currentTickets.length === 0) ? _c('tr', [_vm._m(5)]) : _vm._e()], 2)])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-exclamation-circle"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-calendar"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-clock-o"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-sign-out"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("Mesa #")]), _vm._v(" "), _c('th', [_vm._v("Ticket ID")]), _vm._v(" "), _c('th', [_vm._v("Pedido")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('td', {
    attrs: {
      "colspan": "3"
    }
  }, [_c('p', {
    staticClass: "empty-message has-text-centered is-danger-text"
  }, [_vm._v("No hay item en la cocina")])])
}]}

/***/ }),
/* 398 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.addEntry($event)
      }
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.item.code),
      expression: "item.code"
    }],
    staticClass: "input is-medium",
    attrs: {
      "disabled": _vm.status,
      "id": "code",
      "type": "text",
      "placeholder": "Cod",
      "autofocus": ""
    },
    domProps: {
      "value": (_vm.item.code)
    },
    on: {
      "blur": function($event) {
        $event.preventDefault();
        _vm.pickItem($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.item.code = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.entry.quantity),
      expression: "entry.quantity"
    }],
    staticClass: "input is-medium",
    attrs: {
      "disabled": _vm.status,
      "min": "1",
      "type": "number",
      "placeholder": "Cantidad"
    },
    domProps: {
      "value": (_vm.entry.quantity)
    },
    on: {
      "change": _vm.setTotal,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.entry.quantity = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.entry.subtotal),
      expression: "entry.subtotal"
    }],
    staticClass: "input is-medium",
    attrs: {
      "disabled": _vm.status,
      "type": "number",
      "placeholder": "Sub total"
    },
    domProps: {
      "value": (_vm.entry.subtotal)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.entry.subtotal = $event.target.value
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "control is-expanded"
  }, [_c('autocomplete', {
    attrs: {
      "status": _vm.status,
      "name": _vm.item.name,
      "items": _vm.items
    },
    on: {
      "item-selected": _vm.getItem
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.entry.comment),
      expression: "entry.comment"
    }],
    staticClass: "input is-medium",
    attrs: {
      "disabled": _vm.status,
      "type": "text",
      "placeholder": "Nota o comentario"
    },
    domProps: {
      "value": (_vm.entry.comment)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.entry.comment = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-light is-medium",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.addEntry()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })])])])])])])
},staticRenderFns: []}

/***/ }),
/* 399 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "not-found"
    }
  }, [_c('div', {
    staticClass: "content"
  }, [_c('span', {
    staticClass: "code"
  }, [_vm._v("404")]), _vm._v(" "), _c('p', {
    staticClass: "error-message"
  }, [_vm._v("Lo siento pero no tenés permisos, o la página no existe")]), _vm._v(" "), _c('p', [_c('router-link', {
    staticClass: "button is-primary is-large",
    attrs: {
      "to": {
        name: 'Tables'
      }
    }
  }, [_c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-angle-left"
  })]), _vm._v(" "), _c('span', [_vm._v("Volver")])]), _vm._v(" "), _c('router-link', {
    staticClass: "button is-primary is-large",
    attrs: {
      "to": {
        name: 'Login'
      }
    }
  }, [_c('span', [_vm._v("Login")]), _vm._v(" "), _c('span', {
    staticClass: "icon"
  }, [_c('i', {
    staticClass: "fa fa-angle-right"
  })])])], 1), _vm._v(" "), _vm._m(0)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticClass: "error-message-footer"
  }, [_c('small', [_vm._v("Contacta al administrador si no esperabas un error")])])
}]}

/***/ }),
/* 400 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "column is-12"
  }, [_c('h2', {
    staticClass: "header"
  }, [_vm._v("\n    Delivery\n    "), _c('div', {
    staticClass: "is-pulled-right"
  }, [_c('div', {
    staticClass: "control has-addons"
  }, [_c('a', {
    staticClass: "button is-ligth",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.loadDelivery()
      }
    }
  }, [_vm._m(0)]), _vm._v(" "), _c('a', {
    staticClass: "button is-ligth",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.prepareDelivery()
      }
    }
  }, [_vm._m(1)])])])]), _vm._v(" "), _c('hr'), _vm._v(" "), (_vm.readyToDelivery.length > 0) ? _c('div', {
    staticClass: "columns is-multiline"
  }, [_vm._m(2), _vm._v(" "), _vm._l((_vm.readyToDelivery), function(ticket) {
    return _c('div', {
      key: ticket.id,
      staticClass: "column is-12"
    }, [_c('router-link', {
      staticClass: "open-table-button button is-fullwidth is-medium is-light",
      attrs: {
        "to": {
          name: 'Ticket',
          params: {
            id: ticket.id
          }
        }
      }
    }, [_c('div', {
      staticStyle: {
        "margin": "5px 0"
      }
    }, [_vm._v("\n          Delivery Nro. " + _vm._s(ticket.number) + "\n          "), _c('span', [(ticket.full_delivered) ? _c('i', {
      staticClass: "fa fa-check-circle is-success is-pulled-right"
    }) : _vm._e()])]), _vm._v(" "), _c('div', [_c('small', [_vm._v(_vm._s(ticket.client.id ? ticket.client.name : 'S/C'))])]), _vm._v(" "), _c('div', [_c('small', [_vm._v(_vm._s(_vm._f("truncate")((ticket.address || (ticket.client || {}).address || 'Sin direccion'))))])])])], 1)
  })], 2) : _c('div', {
    staticClass: "column is-12"
  }, [_c('p', {
    staticClass: "is-danger-text"
  }, [_vm._v("No hay pedidos listos para delivery")])]), _vm._v(" "), _c('hr'), _vm._v(" "), (_vm.pendingToDelivery.length > 0) ? _c('div', {
    staticClass: "columns is-multiline"
  }, _vm._l((_vm.pendingToDelivery), function(ticket) {
    return _c('div', {
      key: ticket.id,
      staticClass: "column is-12"
    }, [_c('router-link', {
      staticClass: "open-table-button button is-fullwidth is-medium is-primary",
      attrs: {
        "to": {
          name: 'Ticket',
          params: {
            id: ticket.id
          }
        }
      }
    }, [_c('div', {
      staticStyle: {
        "margin": "5px 0"
      }
    }, [_vm._v("\n          Delivery Nro. " + _vm._s(ticket.number) + "\n          "), _c('span', [(ticket.full_delivered) ? _c('i', {
      staticClass: "fa fa-check-circle fa-floated is-success"
    }) : _vm._e()])]), _vm._v(" "), _c('div', [_c('small', [_vm._v(_vm._s(ticket.client.id ? ticket.client.name : 'S/C'))])]), _vm._v(" "), _c('div', [_c('small', [_vm._v(_vm._s(_vm._f("truncate")((ticket.address || (ticket.client || {}).address || 'Sin direccion'))))])])])], 1)
  })) : _c('div', {
    staticClass: "column is-12"
  }, [_c('p', {
    staticClass: "is-danger-text"
  }, [_vm._v("No hay tickets abiertos")])]), _vm._v(" "), _c('hr'), _vm._v(" "), (_vm.inDelivery.length > 0) ? _c('div', {
    staticClass: "columns is-multiline"
  }, _vm._l((_vm.inDelivery), function(ticket) {
    return _c('div', {
      key: ticket.id,
      staticClass: "column is-12"
    }, [_c('router-link', {
      staticClass: "open-table-button button is-fullwidth is-medium is-success",
      attrs: {
        "to": {
          name: 'Delivery',
          params: {
            id: ticket.delivery.delivery_id
          }
        }
      }
    }, [_c('div', {
      staticStyle: {
        "margin": "5px 0"
      }
    }, [_vm._v("\n          Delivery Nro. " + _vm._s(ticket.number) + "\n          "), _c('span', [(ticket.full_delivered) ? _c('i', {
      staticClass: "fa fa-truck is-pulled-right"
    }) : _vm._e()])]), _vm._v(" "), _c('div', [_c('small', [_vm._v(_vm._s(ticket.client.id ? ticket.client.name : 'S/C'))])]), _vm._v(" "), _c('div', [_c('small', [_vm._v(_vm._s(_vm._f("truncate")((ticket.address || (ticket.client || {}).address || 'Sin direccion'))))])])])], 1)
  })) : _c('div', {
    staticClass: "column is-12"
  }, [_c('p', {
    staticClass: "is-danger-text"
  }, [_vm._v("No hay deliveries pendiente")])]), _vm._v(" "), _c('modal', {
    attrs: {
      "title": "Crear Pedido",
      "show-footer": false,
      "on-cancel": _vm.cancelPedido,
      "width": 1200,
      "is-show": _vm.createPedido,
      "transition": "zoom"
    }
  }, [_c('delivery-composer', {
    attrs: {
      "tickets": _vm.readyToDelivery
    },
    on: {
      "delivery-created": function($event) {
        _vm.goToDelivery(_vm.delivery)
      },
      "delivery-canceled": function($event) {
        _vm.cancelPedido()
      }
    }
  })], 1)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-refresh"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-truck"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "column is-12 is-danger-text has-text-centered is-marginless is-paddingless"
  }, [_c('span', {
    staticClass: "subheader"
  }, [_vm._v(" Pedidos listos para delivery")]), _vm._v(" "), _c('i', {
    staticClass: " header fa fa-arrow-down"
  })])
}]}

/***/ }),
/* 401 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "card is-fullwidth card-row",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.toggle()
      }
    }
  }, [_c('div', {
    staticClass: "card-header"
  }, [_c('span', {
    staticClass: "card-header-icon"
  }, [(_vm.enabled) ? _c('i', {
    staticClass: "fa is-primary-text",
    class: {
      'fa-plus-circle': !_vm.isOpen, 'fa-minus-circle': _vm.isOpen
    }
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "card-header-title"
  }, [_vm._v(_vm._s(_vm.title) + " ")]), _vm._v(" "), _c('span', {
    staticClass: "card-header-icon value",
    staticStyle: {
      "width": "100px"
    }
  }, [_c('span', {
    staticClass: "button is-light is-fullwidth"
  }, [_vm._v("$ " + _vm._s(_vm.total))])])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isOpen),
      expression: "isOpen"
    }],
    staticClass: "content"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}

/***/ }),
/* 402 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.autocompleteText),
      expression: "autocompleteText"
    }],
    ref: "autocomplete",
    class: _vm.classname,
    attrs: {
      "type": "text",
      "id": _vm.id,
      "placeholder": _vm.placeholder
    },
    domProps: {
      "value": (_vm.autocompleteText)
    },
    on: {
      "focus": function($event) {
        _vm.onFocus()
      },
      "blur": function($event) {
        _vm.onBlur()
      },
      "change": _vm.onChange,
      "keypress": _vm.onKeyPress,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.autocompleteText = $event.target.value
      }
    }
  })
},staticRenderFns: []}

/***/ }),
/* 403 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return (_vm.ticket.id) ? _c('div', [_c('div', {
    staticClass: "is-clearfix",
    staticStyle: {
      "margin-bottom": "-8px"
    }
  }, [_c('button', {
    staticClass: "button is-light is-not-link"
  }, [_c('span', [_vm._v("Nro. "), _c('b', [_vm._v(_vm._s(_vm.ticket.number))])])]), _vm._v(" "), _c('div', {
    staticClass: "is-pulled-right"
  }, [_c('button', {
    staticClass: "button is-light is-not-link"
  }, [_vm._m(0), _vm._v(" "), _c('span', [_c('b', [_vm._v(_vm._s(_vm._f("moment")(_vm.ticket.created_at, 'DD MMMM, YYYY')))])])]), _vm._v(" "), (_vm.ticket.client_id) ? _c('button', {
    staticClass: "button is-light is-not-link"
  }, [_vm._m(1), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.ticket.client.name))])]) : _vm._e(), _vm._v(" "), _c('tooltip', {
    attrs: {
      "content": "Recargar informacion"
    }
  }, [_c('a', {
    staticClass: "button is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.reloadInfo($event)
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-refresh"
  })])])]), _vm._v(" "), _c('tooltip', {
    attrs: {
      "content": "Imprimir Ticket Fiscal"
    }
  }, [_c('a', {
    staticClass: "button is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.reloadInfo($event)
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-print"
  })])])])], 1)]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('h4', {
    staticClass: "sub-header"
  }, [_vm._v("Items")]), _vm._v(" "), _c('div', {
    staticClass: "box"
  }, [_vm._m(2), _vm._v(" "), _c('ul', _vm._l((_vm.ticket.entries), function(entry) {
    return _c('li', {
      key: entry.id
    }, [_c('div', {
      staticClass: "columns entries-row"
    }, [_c('div', {
      staticClass: "column is-2"
    }, [_vm._v("\n            " + _vm._s(entry.ticketable_type) + "\n          ")]), _vm._v(" "), _c('div', {
      staticClass: "column is-1"
    }, [_vm._v("\n            " + _vm._s(entry.quantity) + "\n          ")]), _vm._v(" "), _c('div', {
      staticClass: "column is-7"
    }, [_vm._v("\n            " + _vm._s(entry.item.name) + "\n            "), (entry.comment) ? _c('div', {
      staticClass: "is-pulled-right"
    }, [_c('i', [_vm._v("Nota: " + _vm._s(entry.comment))])]) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "column is-2 has-text-right"
    }, [_c('b', [_vm._v("$ " + _vm._s(_vm._f("withDecimals")(entry.subtotal)))])])])])
  })), _vm._v(" "), _c('div', {
    staticClass: "columns entries-footer"
  }, [_c('div', {
    staticClass: "column is-10"
  }, [_vm._v("TOTAL")]), _vm._v(" "), _c('div', {
    staticClass: "column is-2 has-text-right"
  }, [_vm._v("$ " + _vm._s(_vm._f("withDecimals")(_vm.subTotal)))])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('h4', {
    staticClass: "sub-header-inner"
  }, [_vm._v("Pagos Realizados:")]), _vm._v(" "), _c('ul', _vm._l((_vm.ticket.payments), function(payment) {
    return _c('li', [_c('div', {
      staticClass: "columns entries-payment"
    }, [_c('div', {
      staticClass: "column is-10 is-paddingless"
    }, [_c('div', {
      staticClass: "columns"
    }, [_c('div', {
      staticClass: "column is-2"
    }, [_c('span', {
      staticClass: "button is-light is-fullwidth is-not-link"
    }, [_vm._v(_vm._s(_vm._f("moment")(payment.created_at, 'DD MMMM, YYYY')))])]), _vm._v(" "), _c('div', {
      staticClass: "column is-2"
    }, [_c('span', {
      staticClass: "button is-light is-fullwidth is-not-link"
    }, [_vm._v(_vm._s(payment.type))])])])]), _vm._v(" "), _c('div', {
      staticClass: "column is-2  is-paddingless has-text-right is-success-text"
    }, [_c('b', [_vm._v("$ " + _vm._s(_vm._f("withDecimals")(payment.amount)))])])])])
  })), _vm._v(" "), (_vm.diff > 0) ? _c('div', [_c('hr'), _vm._v(" "), _c('div', {
    staticClass: "columns entries-footer"
  }, [_c('div', {
    staticClass: "column is-10"
  }, [_vm._v("DEUDA")]), _vm._v(" "), _c('div', {
    staticClass: "column is-2 has-text-right is-danger-text"
  }, [_c('b', [_vm._v("$ " + _vm._s(_vm._f("withDecimals")(_vm.diff)))])])])]) : _vm._e()]), _vm._v(" "), _c('hr'), _vm._v(" "), _vm._m(3)]) : _vm._e()
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-calendar-check-o"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-user-o"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "columns entries-header"
  }, [_c('div', {
    staticClass: "column is-2"
  }, [_vm._v("Tipo")]), _vm._v(" "), _c('div', {
    staticClass: "column is-1"
  }, [_vm._v("Cant.")]), _vm._v(" "), _c('div', {
    staticClass: "column is-7"
  }, [_vm._v("Descripcion")]), _vm._v(" "), _c('div', {
    staticClass: "column is-2 has-text-right"
  }, [_vm._v("Subtotal")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "has-text-centered"
  }, [_c('p', [_vm._v("Bar Zaraza")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "font-size": "14px"
    }
  }, [_c('i', [_vm._v("Direccion 123, Ciudad. Bs As, Argentina")]), _vm._v(" "), _c('i', [_vm._v("Tel: 23423432")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('small', [_vm._v("CUIT: 12-123131212-0")])])])
}]}

/***/ }),
/* 404 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {}, [_c('modal', {
    attrs: {
      "title": "Administrar Ususarios",
      "ok-text": "Guardar",
      "cancel-text": "Cancelar",
      "on-ok": _vm.saveUser,
      "on-cancel": _vm.cancelUser,
      "width": 520,
      "is-show": _vm.isShow,
      "transition": "zoom"
    },
    on: {
      "close": _vm.cancelUser
    }
  }, [_c('div', {
    staticClass: "control"
  }, [_c('label', [_vm._v("Nombre")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newUser.name),
      expression: "newUser.name"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "text",
      "placeholder": "Agregar Nombre"
    },
    domProps: {
      "value": (_vm.newUser.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newUser.name = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('label', [_vm._v("Email")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newUser.email),
      expression: "newUser.email"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "text",
      "placeholder": "Agregar Email"
    },
    domProps: {
      "value": (_vm.newUser.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newUser.email = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('label', [_vm._v("Direccion")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newUser.address),
      expression: "newUser.address"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "text",
      "placeholder": "Agregar Direccion"
    },
    domProps: {
      "value": (_vm.newUser.address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newUser.address = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('label', [_vm._v("Telefono")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newUser.phone),
      expression: "newUser.phone"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "text",
      "placeholder": "Agregar Telefono"
    },
    domProps: {
      "value": (_vm.newUser.phone)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newUser.phone = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('label', [_vm._v("CUIL")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newUser.cuil),
      expression: "newUser.cuil"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "text",
      "placeholder": "Agregar Cuil"
    },
    domProps: {
      "value": (_vm.newUser.cuil)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newUser.cuil = $event.target.value
      }
    }
  })]), _vm._v(" "), (!_vm.newUser.id) ? _c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('label', [_vm._v("Contraseña")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newUser.password),
      expression: "newUser.password"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "password",
      "placeholder": "Contraseña"
    },
    domProps: {
      "value": (_vm.newUser.password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newUser.password = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('label', [_vm._v("Confirmar contraseña")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newUser.password_confirmation),
      expression: "newUser.password_confirmation"
    }],
    staticClass: "input is-medium",
    attrs: {
      "type": "password",
      "placeholder": "Confirmar contraseña"
    },
    domProps: {
      "value": (_vm.newUser.password_confirmation)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newUser.password_confirmation = $event.target.value
      }
    }
  })])])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "control is-medium"
  }, [_c('label', [_vm._v("Seleccione role:")]), _vm._v(" "), _c('radio-group', {
    model: {
      value: (_vm.newUser.role),
      callback: function($$v) {
        _vm.newUser.role = $$v
      },
      expression: "newUser.role"
    }
  }, _vm._l((_vm.roles), function(role) {
    return _c('radio-button', {
      key: role.value,
      staticClass: "is-medium",
      attrs: {
        "val": role.value
      }
    }, [_vm._v(_vm._s(role.name))])
  }))], 1)]), _vm._v(" "), _c('h1', {
    staticClass: "header"
  }, [_c('i', {
    staticClass: "fa fa-users fa-floated"
  }), _vm._v(" \n    Usuarios \n    "), _c('a', {
    staticClass: "button is-light is-pulled-right",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.isShow = true
      }
    }
  }, [_vm._v("Nuevo User")])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.users), function(user) {
    return _c('tr', {
      key: user.id
    }, [_c('td', [_vm._v(_vm._s(user.name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(user.email))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(user.role))]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "control has-addons"
    }, [_c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.removeUser(user)
        }
      }
    }, [_vm._m(1, true)]), _vm._v(" "), _c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.setToEdit(user)
        }
      }
    }, [_vm._m(2, true)])])])])
  }))])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("Nombre")]), _vm._v(" "), _c('th', [_vm._v("Email")]), _vm._v(" "), _c('th', [_vm._v("Role")]), _vm._v(" "), _c('th')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-pencil"
  })])
}]}

/***/ }),
/* 405 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.addEntry($event)
      }
    }
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.promotion.code),
      expression: "promotion.code"
    }],
    staticClass: "input is-medium",
    attrs: {
      "disabled": _vm.status,
      "id": "code",
      "type": "text",
      "placeholder": "Cod",
      "autofocus": ""
    },
    domProps: {
      "value": (_vm.promotion.code)
    },
    on: {
      "blur": function($event) {
        $event.preventDefault();
        _vm.pickPromotion($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.promotion.code = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.entry.quantity),
      expression: "entry.quantity"
    }],
    staticClass: "input is-medium",
    attrs: {
      "disabled": _vm.status,
      "min": "1",
      "type": "number",
      "placeholder": "Cantidad"
    },
    domProps: {
      "value": (_vm.entry.quantity)
    },
    on: {
      "change": _vm.setTotal,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.entry.quantity = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.entry.subtotal),
      expression: "entry.subtotal"
    }],
    staticClass: "input is-medium",
    attrs: {
      "disabled": _vm.status,
      "type": "number",
      "placeholder": "Sub total"
    },
    domProps: {
      "value": (_vm.entry.subtotal)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.entry.subtotal = $event.target.value
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-8"
  }, [_c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "control is-expanded"
  }, [_c('autocomplete', {
    attrs: {
      "name": _vm.promotion.name,
      "items": _vm.promotions
    },
    on: {
      "item-selected": _vm.setPromotion
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.entry.comment),
      expression: "entry.comment"
    }],
    staticClass: "input is-medium",
    attrs: {
      "disabled": _vm.status,
      "type": "text",
      "placeholder": "Nota o comentario"
    },
    domProps: {
      "value": (_vm.entry.comment)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.entry.comment = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-light is-medium",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.addEntry()
      }
    }
  }, [_c('i', {
    staticClass: "fa fa-plus"
  })])])])])])])
},staticRenderFns: []}

/***/ }),
/* 406 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {}, [_c('modal', {
    attrs: {
      "title": "Administrar Mesa",
      "ok-text": "Guardar",
      "cancel-text": "Cancelar",
      "on-ok": _vm.saveTable,
      "on-cancel": _vm.cancelTable,
      "width": 520,
      "is-show": _vm.isShow,
      "transition": "zoom"
    },
    on: {
      "close": _vm.cancelTable
    }
  }, [_c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newTable.description),
      expression: "newTable.description"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Descripcion"
    },
    domProps: {
      "value": (_vm.newTable.description)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newTable.description = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "select"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newTable.color),
      expression: "newTable.color"
    }],
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.newTable.color = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": ""
    }
  }, [_vm._v("Seleccione color")]), _vm._v(" "), _vm._l((_vm.colors), function(color) {
    return _c('option', {
      domProps: {
        "value": color.value
      }
    }, [_vm._v(_vm._s(color.title))])
  })], 2)])])])]), _vm._v(" "), _c('h1', {
    staticClass: "header"
  }, [_c('i', {
    staticClass: "fa fa-address-book-o fa-floated"
  }), _vm._v(" \n    Mesas\n    "), _c('a', {
    staticClass: "is-pulled-right button is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.isShow = true
      }
    }
  }, [_vm._v("Nueva Mesa")])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('data-table', {
    attrs: {
      "data": _vm.filteredTables
    }
  }, [_c('table-toolbar', [_c('template', {
    attrs: {
      "slot": "right"
    },
    slot: "right"
  }, [_c('div', {
    staticClass: "level-item"
  }, [_c('p', {
    staticClass: "control has-addons"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Filtrar mesas"
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "button"
  }, [_vm._v("Filtrar")])])])])], 2), _vm._v(" "), _c('column', {
    attrs: {
      "label": "ID",
      "field": "id",
      "sorter": "custom"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(row) {
        return [_c('router-link', {
          attrs: {
            "to": {
              name: 'AdminTable',
              params: {
                id: row.id
              }
            }
          }
        }, [_vm._v("# " + _vm._s(row.id))])]
      }
    }])
  }), _vm._v(" "), _c('column', {
    attrs: {
      "label": "Color",
      "field": "color",
      "sorter": "custom"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(row) {
        return [_c('i', {
          staticClass: "fa fa-circle",
          class: row.color
        })]
      }
    }])
  }), _vm._v(" "), _c('column', {
    attrs: {
      "label": "Descripcion",
      "field": "description",
      "sorter": "custom"
    }
  }), _vm._v(" "), _c('column', {
    attrs: {
      "label": ""
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(row) {
        return [_c('div', {
          staticClass: "control has-addons"
        }, [_c('a', {
          staticClass: "button is-light",
          on: {
            "click": function($event) {
              $event.preventDefault();
              _vm.removeTable(row)
            }
          }
        }, [_c('span', {
          staticClass: "icon is-small"
        }, [_c('i', {
          staticClass: "fa fa-trash"
        })])]), _vm._v(" "), _c('a', {
          staticClass: "button is-light",
          on: {
            "click": function($event) {
              $event.preventDefault();
              _vm.setToEdit(row)
            }
          }
        }, [_c('span', {
          staticClass: "icon is-small"
        }, [_c('i', {
          staticClass: "fa fa-pencil"
        })])])])]
      }
    }])
  })], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 407 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {}, [(_vm.loading) ? _c('div', [_vm._v("Cargando...")]) : _c('div', [_c('h1', {
    staticClass: "header"
  }, [_vm._v("\n      Pedido #" + _vm._s(_vm.delivery.id) + "\n      "), _c('div', {
    staticClass: "is-pulled-right"
  }, [_c('router-link', {
    staticClass: "button is-light",
    attrs: {
      "to": {
        name: 'Deliveries'
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-chevron-left fa-floated"
  })]), _vm._v(" "), _c('span', [_vm._v("Volver")])])], 1)]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-3"
  }, [_c('div', {
    staticClass: "box"
  }, [_c('table', {
    staticClass: "table"
  }, [_c('tr', [_c('td', [_vm._v("Creado")]), _c('td', [_c('b', [_vm._v(_vm._s(_vm._f("moment")(_vm.delivery.created_at, 'DD/MM/YY HH:mm A')))])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Entregado")]), _c('td', [_c('b', [_vm._v(_vm._s(_vm._f("moment")(_vm.delivery.delivered_at, 'DD/MM/YY HH:mm A')))])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Estado")]), _c('td', [_c('b', [_vm._v(_vm._s(_vm.delivery.state))])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Creado")]), _c('td', [_c('b', [_vm._v(_vm._s(_vm.delivery.user.name))])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Total")]), _c('td', [_c('b', [_vm._v(_vm._s(_vm.delivery.total))])])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Enviado")]), _c('td', [_c('b', [_vm._v("Moto " + _vm._s(_vm.delivery.moto_id))])])])]), _vm._v(" "), _c('div', {
    staticClass: "has-text-centered"
  }, [_c('button', {
    staticClass: "button is-success is-fullwidth",
    attrs: {
      "disabled": _vm.delivery.delivered_at
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.close()
      }
    }
  }, [_vm._v("Cerrar envio")])])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-9"
  }, [_c('div', {
    staticClass: "box"
  }, [_c('h2', {
    staticClass: "header"
  }, [_vm._v("Tickets enviados")]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _vm._l((_vm.delivery.ticket_deliveries), function(ticket) {
    return _c('tr', [_c('td', [_c('router-link', {
      attrs: {
        "to": {
          name: 'Ticket',
          params: {
            id: ticket.ticket_id
          }
        }
      }
    }, [_vm._v(_vm._s(ticket.number))])], 1), _vm._v(" "), _c('td', [_vm._v(_vm._s(ticket.paid ? 'Si' : 'No'))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(ticket.client.name))]), _vm._v(" "), _c('td', [_c('i', {
      staticClass: "fa fa-home fa-floated"
    }), _vm._v(" " + _vm._s(ticket.address))]), _vm._v(" "), _c('td', [_vm._v("$ " + _vm._s(ticket.total))]), _vm._v(" "), _c('td', [_vm._v("$ " + _vm._s(ticket.payment))]), _vm._v(" "), _c('td', [_c('b-switch', {
      attrs: {
        "on-change": function (ticket) { return _vm.updateTicket; }
      },
      model: {
        value: (ticket.delivered),
        callback: function($$v) {
          ticket.delivered = $$v
        },
        expression: "ticket.delivered"
      }
    })], 1)])
  })], 2)])])]), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-3"
  }, [_c('div', {
    staticClass: "box"
  }, [_c('a', {
    staticClass: "button is-light",
    on: {
      "click": function($event) {
        _vm.initMap()
      }
    }
  }, [_vm._m(1), _vm._v(" "), _c('span', [_vm._v("Cargar Mapa")])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    attrs: {
      "id": "directions-panel"
    }
  })])]), _vm._v(" "), _vm._m(2)])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("T. Nro")]), _vm._v(" "), _c('th', [_vm._v("Pagado")]), _vm._v(" "), _c('th', [_vm._v("Client")]), _vm._v(" "), _c('th', [_vm._v("Direccion")]), _vm._v(" "), _c('th', [_vm._v("Total")]), _vm._v(" "), _c('th', [_vm._v("Pago")]), _vm._v(" "), _c('th', [_vm._v("Entregado")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-map-marker"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "column is-9"
  }, [_c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticStyle: {
      "height": "565px",
      "width": "100%"
    },
    attrs: {
      "id": "map"
    }
  })])])
}]}

/***/ }),
/* 408 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_vm._m(0), _vm._v(" "), _c('hr'), _vm._v(" "), _c('h2', [_vm._v("Razones de cancelamiento")]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "box"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('datepicker', {
    attrs: {
      "placeholder": "Desde...",
      "options": _vm.dateOptions
    },
    model: {
      value: (_vm.range.from),
      callback: function($$v) {
        _vm.range.from = $$v
      },
      expression: "range.from"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('datepicker', {
    attrs: {
      "placeholder": "Hasta...",
      "options": _vm.dateOptions
    },
    model: {
      value: (_vm.range.to),
      callback: function($$v) {
        _vm.range.to = $$v
      },
      expression: "range.to"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('button', {
    staticClass: "button is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.fetchValues($event)
      }
    }
  }, [_vm._m(1), _vm._v(" "), _c('span', [_vm._v("Actualizar")])])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('column-chart', {
    attrs: {
      "stacked": true,
      "data": _vm.data
    }
  })], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('h1', {
    staticClass: "header"
  }, [_c('i', {
    staticClass: "fa fa-bar-chart fa-floated"
  }), _vm._v("  Reporte")])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-refresh"
  })])
}]}

/***/ }),
/* 409 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {}, [_c('modal', {
    attrs: {
      "title": "Administrar Cliente",
      "ok-text": "Guardar",
      "cancel-text": "Cancelar",
      "on-ok": _vm.saveClient,
      "on-cancel": _vm.cancelClient,
      "width": 520,
      "is-show": _vm.isShow,
      "transition": "zoom"
    },
    on: {
      "close": _vm.cancelClient
    }
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newClient.name),
      expression: "newClient.name"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Nombre"
    },
    domProps: {
      "value": (_vm.newClient.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newClient.name = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newClient.phone),
      expression: "newClient.phone"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Telefono"
    },
    domProps: {
      "value": (_vm.newClient.phone)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newClient.phone = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newClient.dni),
      expression: "newClient.dni"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "DNI"
    },
    domProps: {
      "value": (_vm.newClient.dni)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newClient.dni = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('vue-google-autocomplete', {
    ref: "clientAddress",
    attrs: {
      "id": "clientAddressInput",
      "country": "ar",
      "enable-geolocation": true,
      "classname": "input",
      "placeholder": _vm.newClient.address || 'Direccion para envio'
    },
    on: {
      "placechanged": _vm.updateAddress
    },
    model: {
      value: (_vm.newClient.Address),
      callback: function($$v) {
        _vm.newClient.Address = $$v
      },
      expression: "newClient.Address"
    }
  })], 1)]), _vm._v(" "), _c('h1', {
    staticClass: "header"
  }, [_c('i', {
    staticClass: "fa fa-users fa-floated"
  }), _vm._v("\n    Clientes\n    "), _c('div', {
    staticClass: "control has-addons is-pulled-right"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Filtrar clientes"
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "keyup": function($event) {
        $event.preventDefault();
        _vm.reloadClients($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "button is-light is-pulled-right",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.isShow = true
      }
    }
  }, [_vm._v("Nuevo Cliente")])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.clients), function(client) {
    return _c('tr', {
      key: client.id
    }, [_c('td', [_vm._v(_vm._s(client.name))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(client.phone))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(client.dni))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(client.address))]), _vm._v(" "), _c('td', [_c('b', {
      staticClass: "is-danger-text"
    }, [_vm._v("$" + _vm._s(client.total_debt || '0.0'))])]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "control has-addons"
    }, [_c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.removeClient(client)
        }
      }
    }, [_vm._m(1, true)]), _vm._v(" "), _c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.setToEdit(client)
        }
      }
    }, [_vm._m(2, true)])])])])
  }))]), _vm._v(" "), _c('pagination', {
    attrs: {
      "layout": "pager",
      "align": "left",
      "page-size": 12,
      "total": _vm.meta.total,
      "change": _vm.pageChange
    },
    model: {
      value: (_vm.page),
      callback: function($$v) {
        _vm.page = $$v
      },
      expression: "page"
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("Nombre")]), _vm._v(" "), _c('th', [_vm._v("Telefono")]), _vm._v(" "), _c('th', [_vm._v("DNI")]), _vm._v(" "), _c('th', [_vm._v("Direción")]), _vm._v(" "), _c('th', [_vm._v("Deuda")]), _vm._v(" "), _c('th')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-pencil"
  })])
}]}

/***/ }),
/* 410 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "autocomplete-dropdown",
    staticStyle: {
      "position": "relative"
    }
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }, {
      name: "shortkey",
      rawName: "v-shortkey",
      value: (['f1']),
      expression: "['f1']"
    }],
    staticClass: "input is-expanded",
    attrs: {
      "type": "search",
      "id": "search",
      "autocomplete": "off",
      "placeholder": "Buscardor..."
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
        _vm.down($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
        _vm.up($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.hit($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        _vm.reset($event)
      }],
      "focus": function($event) {
        _vm.focused = true
      },
      "shortkey": _vm.setFocus,
      "blur": function($event) {
        _vm.focused = false
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  }), _vm._v(" "), _c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.focused),
      expression: "focused"
    }],
    attrs: {
      "id": "queryList"
    }
  }, [(_vm.filteredTables.length === 0) ? _c('li', {
    staticClass: "empty-item is-danger-text"
  }, [_vm._v("\n        No se encontro ningun resultado\n      ")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.filteredTables), function(item, $item) {
    return _c('li', {
      key: item.id,
      class: _vm.activeClass($item),
      on: {
        "key": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
          _vm.hit($event)
        },
        "mousemove": function($event) {
          _vm.setActive($item)
        },
        "mousedown": function($event) {
          $event.preventDefault();
          _vm.hit($event)
        }
      }
    }, [_c('div', {
      staticClass: "indicator"
    }, [_c('span', {
      staticClass: "icon is-small"
    }, [_c('i', {
      staticClass: "fa fa-circle",
      class: {
        'is-danger-text': item.closed, 'is-success-text': !item.closed
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "info",
      class: item.color
    }, [_c('div', [_vm._v(_vm._s(item.description))]), _vm._v(" "), _c('small', [_vm._v(_vm._s(item.closed ? 'Cerrada' : 'Abierta: Ticket ' + item.current.number))])])])
  })], 2)])])
},staticRenderFns: []}

/***/ }),
/* 411 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "autocomplete-dropdown",
    staticStyle: {
      "position": "relative"
    }
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }],
    staticClass: "input is-medium is-expanded",
    attrs: {
      "type": "text",
      "autocomplete": "off",
      "placeholder": "Buscardor...",
      "disabled": _vm.status
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
        _vm.down($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
        _vm.up($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.hit($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        _vm.reset($event)
      }],
      "focus": function($event) {
        _vm.focused = true
      },
      "blur": _vm.reset,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  }), _vm._v(" "), _c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.focused),
      expression: "focused"
    }],
    attrs: {
      "id": "queryList"
    }
  }, [(_vm.filteredItems.length === 0) ? _c('li', {
    staticClass: "empty-item is-danger-text"
  }, [_vm._v("\n        No se encontro ningun resultado\n      ")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.filteredItems), function(item, $item) {
    return _c('li', {
      key: item.id,
      class: _vm.activeClass($item),
      on: {
        "key": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
          _vm.hit($event)
        },
        "mousemove": function($event) {
          _vm.setActive($item)
        },
        "mousedown": function($event) {
          $event.preventDefault();
          _vm.hit($event)
        }
      }
    }, [_c('div', {
      staticClass: "info"
    }, [_c('div', [_vm._v(_vm._s(item.name))])])])
  })], 2)])])
},staticRenderFns: []}

/***/ }),
/* 412 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "autocomplete-dropdown",
    staticStyle: {
      "position": "relative"
    }
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }],
    staticClass: "input is-expanded",
    attrs: {
      "type": "search",
      "autocomplete": "off",
      "placeholder": "Buscardor..."
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "keydown": [function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "down", 40)) { return null; }
        _vm.down($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "up", 38)) { return null; }
        _vm.up($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        _vm.hit($event)
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27)) { return null; }
        _vm.reset($event)
      }],
      "focus": function($event) {
        _vm.focused = true
      },
      "blur": _vm.reset,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  }), _vm._v(" "), _c('ul', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.focused),
      expression: "focused"
    }],
    attrs: {
      "id": "queryList"
    }
  }, [(_vm.filteredItems.length === 0) ? _c('li', {
    staticClass: "empty-item is-danger-text"
  }, [_vm._v("\n        No se encontro ningun resultado\n      ")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.filteredItems), function(item, $item) {
    return _c('li', {
      key: item.id,
      class: _vm.activeClass($item),
      on: {
        "key": function($event) {
          if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
          _vm.hit($event)
        },
        "mousemove": function($event) {
          _vm.setActive($item)
        },
        "mousedown": function($event) {
          $event.preventDefault();
          _vm.hit($event)
        }
      }
    }, [_c('div', {
      staticClass: "info"
    }, [_c('div', [_vm._v(_vm._s(item.name))])])])
  })], 2)])])
},staticRenderFns: []}

/***/ }),
/* 413 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('h1', {
    staticClass: "header"
  }, [_c('tag', {
    attrs: {
      "id": "header-icon",
      "rounded": ""
    }
  }, [_c('i', {
    staticClass: "fa fa-tags"
  })]), _vm._v(" Tickets")], 1), _vm._v(" "), _c('hr'), _vm._v(" "), (_vm.loading) ? _c('div', [_c('Loader')], 1) : _c('div', [_c('table', {
    staticClass: "table",
    attrs: {
      "id": "tickets-table"
    }
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.tickets), function(ticket) {
    return _c('router-link', {
      key: ticket.id,
      attrs: {
        "tag": "tr",
        "to": {
          name: 'Ticket',
          params: {
            id: ticket.id
          }
        }
      }
    }, [_c('td', {
      staticStyle: {
        "width": "15%"
      }
    }, [(ticket.table_id) ? _c('tag', {
      class: ticket.table.color,
      attrs: {
        "rounded": ""
      }
    }, [_c('b', [_vm._v(_vm._s(ticket.table.description))])]) : _c('tag', {
      attrs: {
        "rounded": "",
        "type": "light"
      }
    }, [_c('b', [_vm._v("Delivery")])])], 1), _vm._v(" "), _c('td', [_c('tooltip', {
      attrs: {
        "content": ticket.closed ? 'Ticket Cerrado' : 'Ticket Abierto'
      }
    }, [_c('i', {
      staticClass: "fa fa-circle fa-floated",
      class: {
        'is-success': !ticket.closed, 'is-danger': ticket.closed
      }
    })])], 1), _vm._v(" "), _c('td', [_c('i', {
      staticClass: "fa fa-floated",
      class: {
        'fa-check is-success': ticket.paid_at, 'fa-exclamation-circle is-warning': !ticket.paid_at
      }
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(ticket.paid_at ? 'Pagado' : 'Pendiente'))])]), _vm._v(" "), _c('td', [_vm._v(_vm._s(ticket.number))]), _vm._v(" "), _c('td', [_vm._v("$" + _vm._s(ticket.partial_total))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(_vm._f("moment")(ticket.created_at, 'DD MMMM, YYYY')))])])
  }))]), _vm._v(" "), _c('pagination', {
    attrs: {
      "layout": "pager",
      "align": "left",
      "page-size": 10,
      "total": _vm.meta.total,
      "change": _vm.fetchTickets
    }
  })], 1)])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("Mesa")]), _vm._v(" "), _c('th', [_vm._v("Estado")]), _vm._v(" "), _c('th', [_vm._v("Pagado")]), _vm._v(" "), _c('th', [_vm._v("Numero")]), _vm._v(" "), _c('th', [_vm._v("Total")]), _vm._v(" "), _c('th', [_vm._v("Fecha")])])
}]}

/***/ }),
/* 414 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "bar-loader"
  }), _vm._v(" "), (!_vm.hideText) ? _c('div', {
    staticClass: "bar-loader-text"
  }, [_vm._v("Cargando...")]) : _vm._e()])
},staticRenderFns: []}

/***/ }),
/* 415 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "ticket-form"
  }, [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_c('a', {
    directives: [{
      name: "shortkey",
      rawName: "v-shortkey.once",
      value: (['ctrl', '8']),
      expression: "['ctrl', '8']",
      modifiers: {
        "once": true
      }
    }],
    staticClass: "button is-fullwidth",
    class: {
      'is-primary': _vm.newPayment.isFull, 'is-disabled': _vm.pending === 0
    },
    on: {
      "shortkey": function($event) {
        _vm.setAmount(true)
      },
      "click": function($event) {
        $event.preventDefault();
        _vm.setAmount(true)
      }
    }
  }, [_vm._m(0), _vm._v(" "), _c('span', [_vm._v("Total")])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('a', {
    directives: [{
      name: "shortkey",
      rawName: "v-shortkey.once",
      value: (['ctrl', '9']),
      expression: "['ctrl', '9']",
      modifiers: {
        "once": true
      }
    }],
    staticClass: "button is-fullwidth",
    class: {
      'is-primary': !_vm.newPayment.isFull, 'is-disabled': _vm.pending === 0
    },
    on: {
      "shortkey": function($event) {
        _vm.setAmount(false)
      },
      "click": function($event) {
        $event.preventDefault();
        _vm.setAmount(false)
      }
    }
  }, [_vm._m(1), _vm._v(" "), _c('span', [_vm._v("Parcial")])])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "columns is-marginless"
  }, [_c('div', {
    staticClass: "column is-6",
    staticStyle: {
      "padding": "0px 5px"
    }
  }, [_c('div', {
    staticClass: "select is-medium"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newPayment.type),
      expression: "newPayment.type"
    }],
    attrs: {
      "id": "payment-type",
      "disabled": _vm.pending === 0
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.newPayment.type = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "Tarjeta"
    }
  }, [_vm._v("Tarjeta")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "Efectivo"
    }
  }, [_vm._v("Efectivo")])])])]), _vm._v(" "), _c('div', {
    staticClass: "column is-6",
    staticStyle: {
      "padding": "0px"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newPayment.amount),
      expression: "newPayment.amount"
    }],
    staticClass: "input is-medium",
    class: {
      'is-danger': _vm.newPayment.error
    },
    attrs: {
      "step": "0.01",
      "type": "number",
      "placeholder": "Monto",
      "disabled": _vm.pending === 0
    },
    domProps: {
      "value": (_vm.newPayment.amount)
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
        $event.preventDefault();
        _vm.addPayment($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newPayment.amount = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('hr')]), _vm._v(" "), _c('div', {
    staticClass: "ticket-lines"
  }, [(_vm.loading) ? _c('div', [_c('Loader')], 1) : _c('div', [_c('table', {
    staticClass: "table"
  }, [_vm._m(2), _vm._v(" "), _c('tbody', [_vm._l((_vm.payments), function(payment) {
    return _c('tr', [_c('td', [(!_vm.ticket.closed) ? _c('tooltip', {
      attrs: {
        "content": "Cancelar pago"
      }
    }, [_c('a', {
      staticClass: "button is-small is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.removePayment(payment)
        }
      }
    }, [_c('span', {
      staticClass: "icon is-small"
    }, [_c('i', {
      staticClass: "fa fa-times-circle is-danger"
    })])])]) : _c('span', [_c('i', {
      staticClass: "fa fa-dollar fa-floated"
    })])], 1), _vm._v(" "), _c('td', [_c('tooltip', {
      attrs: {
        "content": payment.type
      }
    }, [_c('tag', [_vm._v(_vm._s(payment.type[0]))])], 1)], 1), _vm._v(" "), _c('td', [_c('b', [_vm._v("$" + _vm._s(payment.amount))])]), _vm._v(" "), _c('td', [_c('tooltip', {
      attrs: {
        "content": "Poner pago a favor"
      }
    }, [(_vm.ticket.client_id) ? _c('a', {
      staticClass: "button is-light is-small",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.moveToFavor(payment)
        }
      }
    }, [_c('span', {
      staticClass: "icon is-small"
    }, [_c('i', {
      staticClass: "fa fa-arrow-right"
    })])]) : _vm._e()])], 1)])
  }), _vm._v(" "), _vm._l((_vm.ticket.client.in_favor), function(payment) {
    return (_vm.pending > 0) ? _c('tr', [_c('td'), _vm._v(" "), _c('td', [_c('tooltip', {
      attrs: {
        "content": payment.type
      }
    }, [_c('tag', [_vm._v(_vm._s(payment.type[0]))])], 1)], 1), _vm._v(" "), _c('td', [_c('b', [_vm._v("$" + _vm._s(payment.amount))])]), _vm._v(" "), _c('td', [_c('tooltip', {
      attrs: {
        "content": "Asignar saldo a favor a este ticket"
      }
    }, [_c('a', {
      staticClass: "button is-light is-small",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.applyPayment(payment)
        }
      }
    }, [_c('span', {
      staticClass: "icon is-small"
    }, [_c('i', {
      staticClass: "fa fa-plus"
    })])])])], 1)]) : _vm._e()
  })], 2)])])]), _vm._v(" "), _c('div', {
    staticClass: "resume"
  }, [_c('div', {
    staticClass: "columns resume-header"
  }, [_c('div', {
    staticClass: "column is-8"
  }, [_vm._v("\n        Pagado\n      ")]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_vm._v("$" + _vm._s(_vm.subtotal))])]), _vm._v(" "), _c('div', {
    staticClass: "columns resume-sub-row"
  }, [_c('div', {
    staticClass: "column is-4"
  }, [_c('div', [_vm._v("Pendiente")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.pending) + " $")])]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('div', [_vm._v("Efectivo:")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.totalCash) + " $")])]), _vm._v(" "), _c('div', {
    staticClass: "column is-4"
  }, [_c('div', [_vm._v("Tarjeta:")]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.totalCard) + " $")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-dollar"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-credit-card"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th'), _vm._v(" "), _c('th', [_vm._v("Tipo")]), _vm._v(" "), _c('th', [_vm._v("Monto")]), _vm._v(" "), _c('th')])
}]}

/***/ }),
/* 416 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container"
  }, [_c('h1', {
    staticClass: "header"
  }, [_vm._v("Cajas")]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.dailyCashes), function(cash) {
    return _c('tr', {
      key: cash.id
    }, [_c('td', [_vm._v(_vm._s(cash.id))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(_vm._f("moment")(cash.cash_date, 'DD MMMM, YYYY')))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(cash.partial_daily_cashes.length))]), _vm._v(" "), _c('td', [_c('router-link', {
      staticClass: "button is-light",
      attrs: {
        "to": {
          name: 'DailyCash',
          params: {
            id: cash.id
          }
        }
      }
    }, [_vm._v("Detalles")])], 1)])
  }))])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("ID")]), _vm._v(" "), _c('th', [_vm._v("Fecha")]), _vm._v(" "), _c('th', [_vm._v("# Cajas Parciales")]), _vm._v(" "), _c('th')])
}]}

/***/ }),
/* 417 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {}, [_c('modal', {
    attrs: {
      "title": "Administrar Categoria",
      "ok-text": "Guardar",
      "cancel-text": "Cancelar",
      "on-ok": _vm.saveCategory,
      "on-cancel": _vm.cancelCategory,
      "width": 520,
      "is-show": _vm.isShow,
      "transition": "zoom"
    },
    on: {
      "close": _vm.cancelCategory
    }
  }, [_c('div', {
    staticClass: "control"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newCategory.name),
      expression: "newCategory.name"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Categoria"
    },
    domProps: {
      "value": (_vm.newCategory.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newCategory.name = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control is-expanded"
  }, [_c('checkbox', {
    attrs: {
      "val": "true",
      "checked": _vm.newCategory.kitchen
    },
    model: {
      value: (_vm.newCategory.kitchen),
      callback: function($$v) {
        _vm.newCategory.kitchen = $$v
      },
      expression: "newCategory.kitchen"
    }
  }, [_vm._v("Es de cocina?")])], 1)]), _vm._v(" "), _c('h1', {
    staticClass: "header"
  }, [_c('i', {
    staticClass: "fa fa-paperclip fa-floated"
  }), _vm._v(" \n    Categorias\n    "), _c('a', {
    staticClass: "is-pulled-right button is-light",
    on: {
      "click": function($event) {
        _vm.isShow = true
      }
    }
  }, [_vm._v("Nueva Categoria")])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.categories), function(category) {
    return _c('tr', {
      key: category.id
    }, [_c('td', [_vm._v(_vm._s(category.name))]), _vm._v(" "), _c('td', [(category.kitchen) ? _c('tag', [_c('i', {
      staticClass: "fa fa-floated fa-cutlery"
    })]) : _vm._e()], 1), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "control has-addons"
    }, [_c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.removeCategory(category)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-trash"
    })]), _vm._v(" "), _c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.setToEdit(category)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-pencil"
    })])])])])
  }))])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("Nombre")]), _vm._v(" "), _c('th', [_vm._v("Para Cocina")]), _vm._v(" "), _c('th')])
}]}

/***/ }),
/* 418 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "promotions"
    }
  }, [_c('b-aside', {
    attrs: {
      "is-show": _vm.isShow,
      "width": 600,
      "backdrop": false,
      "show-footer": false,
      "placement": "right",
      "title": "Administrar Promocion"
    },
    on: {
      "close": _vm.cancelPromotion
    }
  }, [(_vm.newPromotion.id) ? _c('div', [_c('tag', {
    attrs: {
      "type": "success"
    }
  }, [_vm._v("Editando Promotion " + _vm._s(_vm.newPromotion.id))])], 1) : _c('div', [_c('tag', {
    attrs: {
      "type": "danger"
    }
  }, [_vm._v("Nuevo Promotion")])], 1), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newPromotion.code),
      expression: "newPromotion.code"
    }],
    staticClass: "input is-expanded",
    attrs: {
      "type": "text",
      "placeholder": "Codigo"
    },
    domProps: {
      "value": (_vm.newPromotion.code)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newPromotion.code = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newPromotion.name),
      expression: "newPromotion.name"
    }],
    staticClass: "input is-expanded",
    attrs: {
      "type": "text",
      "placeholder": "Nombre"
    },
    domProps: {
      "value": (_vm.newPromotion.name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newPromotion.name = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newPromotion.day_price),
      expression: "newPromotion.day_price"
    }],
    staticClass: "input is-expanded",
    attrs: {
      "type": "number",
      "step": 0.01,
      "placeholder": "Precio dia"
    },
    domProps: {
      "value": (_vm.newPromotion.day_price)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newPromotion.day_price = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "control is-expanded"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newPromotion.night_price),
      expression: "newPromotion.night_price"
    }],
    staticClass: "input is-expanded",
    attrs: {
      "type": "number",
      "step": 0.01,
      "placeholder": "Precio noche"
    },
    domProps: {
      "value": (_vm.newPromotion.night_price)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newPromotion.night_price = $event.target.value
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('h4', [_vm._v("Adicionar items")]), _vm._v(" "), _c('div', {
    staticClass: "control has-addons",
    staticStyle: {
      "border-top": "solid 1px #ddd",
      "margin-top": "10px",
      "padding": "10px 0px"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newItem.quantity),
      expression: "newItem.quantity"
    }],
    staticClass: "input",
    staticStyle: {
      "width": "5em"
    },
    attrs: {
      "type": "number",
      "placeholder": "Cant"
    },
    domProps: {
      "value": (_vm.newItem.quantity)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newItem.quantity = $event.target.value
      }
    }
  }), _vm._v(" "), _c('autocomplete', {
    attrs: {
      "items": _vm.items,
      "name": _vm.newItem.item.name
    },
    on: {
      "set-item": _vm.setItem
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "button is-primary",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.addItemToPromotion($event)
      }
    }
  }, [_vm._v("Agregar")])], 1), _vm._v(" "), _c('h2', [_vm._v("Items")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "border-top": "solid 1px #ddd",
      "margin-top": "10px",
      "padding": "10px 0px"
    }
  }, [(_vm.newItems.length > 0) ? _c('ul', {
    attrs: {
      "id": "promotion-item-rows"
    }
  }, _vm._l((_vm.newItems), function(entry) {
    return _c('li', {
      staticClass: "item-row"
    }, [_c('tag', {
      attrs: {
        "type": "danger"
      }
    }, [_c('a', {
      staticStyle: {
        "color": "#fff"
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.removeItem(entry)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-floated fa-trash"
    })])]), _vm._v(" "), _c('span', {
      staticClass: "button is-white is-small"
    }, [_c('i', {
      staticClass: "fa fa-floated fa-angle-right"
    })]), _vm._v(" "), _c('tag', [_c('b', [_vm._v(_vm._s(entry.quantity))])]), _vm._v(" "), _c('tag', [_vm._v(_vm._s(entry.item.name))]), _vm._v(" "), (entry.item.kitchen) ? _c('span', [_c('tooltip', {
      attrs: {
        "content": "Es de cocina",
        "placement": "right"
      }
    }, [_c('tag', [_c('i', {
      staticClass: "fa fa-cutlery"
    })])], 1)], 1) : _vm._e()], 1)
  })) : _c('div', {
    staticClass: "is-danger-text"
  }, [_vm._v("No hay items todavia")])])]), _vm._v(" "), _c('div', {
    staticClass: "controle"
  }, [_c('div', {
    staticClass: "control is-grouped"
  }, [_c('div', {
    staticClass: "control is-expanded"
  }, [_c('checkbox', {
    attrs: {
      "val": "true",
      "checked": !!_vm.newPromotion.favorite
    },
    model: {
      value: (_vm.newPromotion.favorite),
      callback: function($$v) {
        _vm.newPromotion.favorite = $$v
      },
      expression: "newPromotion.favorite"
    }
  }, [_vm._v("Favorito")])], 1)])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "control"
  }, [_c('button', {
    staticClass: "button is-primary",
    attrs: {
      "type": "submit"
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.savePromotion($event)
      }
    }
  }, [_vm._v("Guardar")]), _vm._v(" "), _c('button', {
    staticClass: "button is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.cancelPromotion($event)
      }
    }
  }, [_vm._v("Cancelar")])])]), _vm._v(" "), _c('h1', {
    staticClass: "header"
  }, [_c('i', {
    staticClass: "fa fa-lightbulb-o fa-floated"
  }), _vm._v("\n    Promociones\n    "), _c('div', {
    staticClass: "control has-addons is-pulled-right"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }],
    staticClass: "input",
    attrs: {
      "type": "text",
      "placeholder": "Filtrar promos"
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "keyup": function($event) {
        $event.preventDefault();
        _vm.fetchPromotions($event)
      },
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "button is-light is-pulled-right",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.openForm($event)
      }
    }
  }, [_vm._v("Nueva Promocion")])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.promotions), function(promotion) {
    return _c('tr', {
      key: promotion.id
    }, [_c('td', [_vm._v(_vm._s(promotion.code))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(promotion.name))]), _vm._v(" "), _c('td', [_c('ul', {
      staticClass: "promotion-items"
    }, _vm._l((promotion.promotion_items), function(item) {
      return _c('li', {
        key: item.id,
        staticStyle: {
          "margin-bottom": "10px"
        }
      }, [_c('div', {
        staticClass: "columns"
      }, [_c('div', {
        staticClass: "column is-10"
      }, [_c('tag', {
        staticStyle: {
          "font-size": "14px"
        },
        attrs: {
          "type": "warning"
        }
      }, [_c('b', [_vm._v(_vm._s(item.size))])]), _vm._v(" "), _c('tag', {
        staticStyle: {
          "font-size": "14px"
        }
      }, [_vm._v(_vm._s(item.name))])], 1), _vm._v(" "), (item.kitchen) ? _c('div', {
        staticClass: "column is-2 is-pulled-right"
      }, [_c('tooltip', {
        attrs: {
          "content": "Es item de cocina"
        }
      }, [_c('tag', {
        staticStyle: {
          "font-size": "14px"
        }
      }, [_c('i', {
        staticClass: "fa fa-floated fa-cutlery"
      })])], 1)], 1) : _vm._e()])])
    }))]), _vm._v(" "), _c('td', [_vm._v("$" + _vm._s(promotion.day_price))]), _vm._v(" "), _c('td', [_vm._v("$" + _vm._s(promotion.night_price))]), _vm._v(" "), _c('td', [_c('i', {
      staticClass: "fa fa-floated",
      class: {
        'fa-star is-warning': promotion.favorite, 'fa-star-o': !promotion.favorite
      }
    })]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "control has-addons"
    }, [_c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.removePromotion(promotion)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-trash"
    })]), _vm._v(" "), _c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.setToEdit(promotion)
        }
      }
    }, [_c('i', {
      staticClass: "fa fa-pencil"
    })])])])])
  }))]), _vm._v(" "), _c('pagination', {
    attrs: {
      "layout": "pager",
      "align": "left",
      "page-size": 20,
      "total": _vm.meta.total,
      "change": _vm.pageChange
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("Cod")]), _vm._v(" "), _c('th', [_vm._v("Nombre")]), _vm._v(" "), _c('th', [_vm._v("Items")]), _vm._v(" "), _c('th', [_vm._v("Precio Dia")]), _vm._v(" "), _c('th', [_vm._v("Precio Noche")]), _vm._v(" "), _c('th', [_vm._v("Favorito")]), _vm._v(" "), _c('th')])
}]}

/***/ }),
/* 419 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.loading) ? _c('Loader') : _c('div', [_c('h1', {
    staticClass: "header"
  }, [_vm._v("\n      Caja Diaria - " + _vm._s(_vm._f("moment")(_vm.cash.cash_date, 'DD MMMM, YYYY')) + "\n    ")]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-bottom": "20px"
    }
  }, [_c('cash-row', {
    attrs: {
      "enabled": false,
      "title": "Ventas Totales",
      "total": _vm.cash.resume.total_sells
    }
  }, [_vm._v("\n        Suma de los tickets\n      ")]), _vm._v(" "), _c('cash-row', {
    attrs: {
      "enabled": true,
      "title": "Total Efectivo",
      "total": _vm.cash.resume.cash_amount
    }
  }, [_c('router-link', {
    staticClass: "button is-primary",
    attrs: {
      "to": {
        name: 'Payments',
        params: {
          cash_id: _vm.cash.id,
          payment_type: 'efectivo'
        }
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-link"
  })]), _vm._v(" "), _c('span', [_vm._v("Ver pagos")])])], 1), _vm._v(" "), _c('cash-row', {
    attrs: {
      "enabled": true,
      "title": "Total Tarjeta",
      "total": _vm.cash.resume.credit_amount
    }
  }, [_c('router-link', {
    staticClass: "button is-primary",
    attrs: {
      "to": {
        name: 'Payments',
        params: {
          cash_id: _vm.cash.id,
          payment_type: 'tarjeta'
        }
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-link"
  })]), _vm._v(" "), _c('span', [_vm._v("Ver Pagos")])])], 1), _vm._v(" "), _c('cash-row', {
    attrs: {
      "enabled": true,
      "title": "Pagos Deudas Efectivo",
      "total": _vm.cash.resume.debt_cash
    }
  }, [_c('router-link', {
    staticClass: "button is-primary",
    attrs: {
      "to": {
        name: 'Payments',
        params: {
          cash_id: _vm.cash.id,
          partial_daily_cash_id: -1,
          payment_favor: false,
          payment_type: 'tarjeta'
        }
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-link"
  })]), _vm._v(" "), _c('span', [_vm._v("Ver Pagos")])])], 1), _vm._v(" "), _c('cash-row', {
    attrs: {
      "enabled": true,
      "title": "Pagos Deudas Tarjeta",
      "total": _vm.cash.resume.debt_credit
    }
  }, [_c('router-link', {
    staticClass: "button is-primary",
    attrs: {
      "to": {
        name: 'Payments',
        params: {
          cash_id: _vm.cash.id,
          partial_daily_cash_id: -1,
          payment_favor: false,
          payment_type: 'tarjeta'
        }
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-link"
  })]), _vm._v(" "), _c('span', [_vm._v("Ver Pagos")])])], 1), _vm._v(" "), _c('cash-row', {
    attrs: {
      "enabled": true,
      "title": "Pagos a Favor Efectivo",
      "total": _vm.cash.resume.favor_cash
    }
  }, [_c('router-link', {
    staticClass: "button is-primary",
    attrs: {
      "to": {
        name: 'Payments',
        params: {
          cash_id: _vm.cash.id,
          payment_favor: true,
          payment_type: 'efectivo'
        }
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-link"
  })]), _vm._v(" "), _c('span', [_vm._v("Ver Pagos")])])], 1), _vm._v(" "), _c('cash-row', {
    attrs: {
      "enabled": true,
      "title": "Pagos a Favor Tarjeta",
      "total": _vm.cash.resume.favor_credit
    }
  }, [_c('router-link', {
    staticClass: "button is-primary",
    attrs: {
      "to": {
        name: 'Payments',
        params: {
          cash_id: _vm.cash.id,
          payment_favor: true,
          payment_type: 'tarjeta'
        }
      }
    }
  }, [_c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-link"
  })]), _vm._v(" "), _c('span', [_vm._v("Ver Pagos")])])], 1), _vm._v(" "), _c('cash-row', {
    attrs: {
      "enabled": true,
      "title": "Total Extraccion",
      "total": _vm.cash.resume.total_home
    }
  }, [_c('div', [_c('b', [_vm._v("Usuarios")])]), _vm._v(" "), (_vm.cash.expenses.extracciones.length < 1) ? _c('div', {
    staticClass: "is-danger-text",
    staticStyle: {
      "padding": "10px 0px"
    }
  }, [_vm._v("No hay extracciones")]) : _vm._e(), _vm._v(" "), _c('ul', {
    staticClass: "expense-list"
  }, _vm._l((_vm.cash.expenses.extracciones), function(ext, index) {
    return _c('li', {
      key: index
    }, [_c('i', {
      staticClass: "fa fa-angle-right fa-floated",
      staticStyle: {
        "margin-right": "10px"
      }
    }), _vm._v(" " + _vm._s(ext.name) + ": "), _c('b', [_vm._v("$" + _vm._s(ext.total))]), _vm._v(" "), _c('ul', _vm._l((ext.list), function(e, index) {
      return _c('li', {
        key: index
      }, [_c('span', [_vm._v(_vm._s(_vm._f("moment")(e.created_at, 'DD MMMM, YYYY HH:MM')) + " - $" + _vm._s(e.amount))])])
    }))])
  }))]), _vm._v(" "), _c('cash-row', {
    attrs: {
      "enabled": true,
      "title": "Total Vales",
      "total": _vm.cash.resume.total_vales
    }
  }, [_c('div', [_c('b', [_vm._v("Usuarios")])]), _vm._v(" "), (_vm.cash.expenses.vales.length < 1) ? _c('div', {
    staticClass: "is-danger-text",
    staticStyle: {
      "padding": "10px 0px"
    }
  }, [_vm._v("No hay vales")]) : _vm._e(), _vm._v(" "), _c('ul', {
    staticClass: "expense-list"
  }, _vm._l((_vm.cash.expenses.vales), function(vale, index) {
    return _c('li', {
      key: index
    }, [_c('i', {
      staticClass: "fa fa-angle-right fa-floated",
      staticStyle: {
        "margin-right": "10px"
      }
    }), _vm._v(" " + _vm._s(vale.name) + ": "), _c('b', [_vm._v("$" + _vm._s(vale.total))]), _vm._v(" "), _c('ul', _vm._l((vale.list), function(v, index) {
      return _c('li', {
        key: index
      }, [_c('span', [_vm._v(_vm._s(_vm._f("moment")(v.created_at, 'DD MMMM, YYYY HH:MM')) + " - $" + _vm._s(v.amount))])])
    }))])
  }))]), _vm._v(" "), _c('cash-row', {
    attrs: {
      "enabled": true,
      "title": "Total Gastos",
      "total": _vm.cash.resume.total_expenses
    }
  }, [_c('div', [_c('b', [_vm._v("Proveedores")])]), _vm._v(" "), (_vm.cash.expenses.gastos.length < 1) ? _c('div', {
    staticClass: "is-danger-text",
    staticStyle: {
      "padding": "10px 0px"
    }
  }, [_vm._v("No hay gastos")]) : _vm._e(), _vm._v(" "), _c('ul', {
    staticClass: "expense-list"
  }, _vm._l((_vm.cash.expenses.gastos), function(gasto, index) {
    return _c('li', {
      key: index
    }, [_c('i', {
      staticClass: "fa fa-angle-right fa-floated",
      staticStyle: {
        "margin-right": "10px"
      }
    }), _vm._v(" " + _vm._s(gasto.name) + ": "), _c('b', [_vm._v("$" + _vm._s(gasto.total))]), _vm._v(" "), _c('ul', _vm._l((gasto.list), function(g, index) {
      return _c('li', {
        key: index
      }, [_c('span', [_vm._v(_vm._s(_vm._f("moment")(g.created_at, 'DD MMMM, YYYY HH:MM')) + " - $" + _vm._s(g.amount))])])
    }))])
  }))])], 1), _vm._v(" "), _c('div', {
    staticClass: "box"
  }, [_c('h1', [_vm._v("Resumen")]), _vm._v(" "), _c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-10"
  }, [_c('div', {
    staticClass: "button is-light is-not-link"
  }, [_vm._v("Total Diario $ " + _vm._s(_vm.finalSum))]), _vm._v(" "), _c('tooltip', {
    attrs: {
      "content": "Monto efectivo"
    }
  }, [_c('div', {
    staticClass: "button is-light"
  }, [_vm._v("Total Ingresos $ " + _vm._s(_vm.totalIngresosCash))])]), _vm._v(" "), _c('tooltip', {
    attrs: {
      "content": "Monto en tarjeta"
    }
  }, [_c('div', {
    staticClass: "button is-light"
  }, [_vm._v("Total Ingresos $ " + _vm._s(_vm.totalIngresosCredit))])]), _vm._v(" "), _c('div', {
    staticClass: "button is-light"
  }, [_vm._v("Total Egresos  $ " + _vm._s(_vm.totalEgresos))])], 1), _vm._v(" "), _c('div', {
    staticClass: "column is-2"
  }, [_c('div', {
    staticClass: "button is-light is-not-link"
  }, [_vm._v("Tickets Generados " + _vm._s(_vm.cash.resume.tickets_count))])])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "box"
  }, [_c('h1', [_vm._v("Cajas Parciales")]), _vm._v(" "), _c('div', {
    staticClass: "partial-bar is-clearfix"
  }, [_c('div', {
    staticClass: "columns is-multiline"
  }, _vm._l((_vm.cash.partial_daily_cashes), function(partial) {
    return _c('div', {
      key: partial.id,
      staticClass: "column is-4"
    }, [_c('div', {
      staticClass: "control has-addons"
    }, [_c('tooltip', {
      attrs: {
        "content": "Responsable"
      }
    }, [_c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.showPartial(partial.id)
        }
      }
    }, [_vm._v("\n                  #" + _vm._s(partial.id) + "\n                  "), _c('span', {
      staticClass: "icon is-small"
    }, [_c('i', {
      staticClass: "fa fa-angle-right"
    })]), _vm._v("\n                   " + _vm._s(partial.user.name) + "\n                 ")])]), _vm._v(" "), _c('tooltip', {
      attrs: {
        "content": "Caja Total"
      }
    }, [_c('div', {
      staticClass: "button is-light"
    }, [_vm._v("$" + _vm._s(partial.total))])]), _vm._v(" "), _c('tooltip', {
      attrs: {
        "content": "Hora cierre"
      }
    }, [_c('div', {
      staticClass: "button is-light"
    }, [_vm._v(_vm._s(_vm._f("moment")(partial.closed_at, 'HH:MM') + ' hs'))])])], 1)])
  }))])])]), _vm._v(" "), _c('modal', {
    attrs: {
      "title": 'CAJA PARCIAL No. ' + _vm.currentPartial.id,
      "show-footer": false,
      "on-cancel": _vm.closePartial,
      "is-show": _vm.isOpen,
      "transition": "zoom"
    }
  }, [(_vm.currentPartial.id) ? _c('div', [_c('div', {
    staticClass: "columns"
  }, [_c('div', {
    staticClass: "column is-6"
  }, [_vm._v("Responsable "), _c('b', [_vm._v(_vm._s(_vm.currentPartial.user.name))])]), _vm._v(" "), _c('div', {
    staticClass: "column is-6"
  }, [_c('tooltip', {
    attrs: {
      "content": "Fecha hora de cierre"
    }
  }, [_vm._v("\n            Fecha/Hora "), _c('b', [_vm._v(_vm._s(_vm._f("moment")(_vm.currentPartial.closed_at, 'DD/MM/YYYY hh:mm A')))])])], 1)]), _vm._v(" "), _c('table', {
    staticClass: "table"
  }, [_c('thead', [_c('th', [_vm._v("Concepto")]), _vm._v(" "), _c('th', [_vm._v("Monto")])]), _vm._v(" "), _c('tbody', [_c('tr', [_c('td', [_vm._v("Apertura de caja      ")]), _c('td', [_vm._v("$ " + _vm._s(_vm.currentPartial.init_amount))])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Ventas Totales        ")]), _c('td', [_vm._v("$ " + _vm._s(_vm.currentPartial.resume.total_sells))])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Total Efectivo        ")]), _c('td', [_vm._v("$ " + _vm._s(_vm.currentPartial.resume.cash_amount))])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Total Tarjeta         ")]), _c('td', [_vm._v("$ " + _vm._s(_vm.currentPartial.resume.credit_amount))])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Pagos Deudas Efectivo ")]), _c('td', [_vm._v("$ " + _vm._s(_vm.currentPartial.resume.debt_cash))])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Pagos Deudas Tarjeta  ")]), _c('td', [_vm._v("$ " + _vm._s(_vm.currentPartial.resume.debt_credit))])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Pagos a Favor Efectivo")]), _c('td', [_vm._v("$ " + _vm._s(_vm.currentPartial.resume.favor_cash))])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Pagos a Favor Tarjeta ")]), _c('td', [_vm._v("$ " + _vm._s(_vm.currentPartial.resume.favor_credit))])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Total Extracciones    ")]), _c('td', [_vm._v("$ " + _vm._s(_vm.currentPartial.resume.total_home))])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Total Vales           ")]), _c('td', [_vm._v("$ " + _vm._s(_vm.currentPartial.resume.total_vales))])]), _vm._v(" "), _c('tr', [_c('td', [_vm._v("Total Gastos          ")]), _c('td', [_vm._v("$ " + _vm._s(_vm.currentPartial.resume.total_expenses))])])])])]) : _vm._e()])], 1)
},staticRenderFns: []}

/***/ }),
/* 420 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {}, [_c('modal', {
    attrs: {
      "title": "Administrar Razon",
      "ok-text": "Guardar",
      "cancel-text": "Cancelar",
      "on-ok": _vm.saveCancelReason,
      "on-cancel": _vm.cancelReason,
      "width": 520,
      "is-show": _vm.isShow,
      "transition": "zoom"
    },
    on: {
      "close": _vm.cancelReason
    }
  }, [_c('div', {
    staticClass: "control"
  }, [_c('div', {
    staticClass: "control"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.newCancelReason.text),
      expression: "newCancelReason.text"
    }],
    staticClass: "textarea",
    attrs: {
      "type": "text",
      "placeholder": "Descripcion"
    },
    domProps: {
      "value": (_vm.newCancelReason.text)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.newCancelReason.text = $event.target.value
      }
    }
  })])])]), _vm._v(" "), _c('h1', {
    staticClass: "header"
  }, [_c('i', {
    staticClass: "fa fa-address-book-o fa-floated"
  }), _vm._v(" \n    Razones\n    "), _c('a', {
    staticClass: "is-pulled-right button is-light",
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.isShow = true
      }
    }
  }, [_vm._v("Nueva Razon")])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('table', {
    staticClass: "table"
  }, [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.reasons), function(reason) {
    return _c('tr', {
      key: reason.id
    }, [_c('td', [_vm._v("# " + _vm._s(reason.id))]), _vm._v(" "), _c('td', [_vm._v(_vm._s(reason.text))]), _vm._v(" "), _c('td', [_c('div', {
      staticClass: "control has-addons"
    }, [_c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.removeReason(reason)
        }
      }
    }, [_vm._m(1, true)]), _vm._v(" "), _c('a', {
      staticClass: "button is-light",
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.setToEdit(reason)
        }
      }
    }, [_vm._m(2, true)])])])])
  }))])], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('th', [_vm._v("# ID")]), _vm._v(" "), _c('th', [_vm._v("Texto")]), _vm._v(" "), _c('th')])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-trash"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    staticClass: "icon is-small"
  }, [_c('i', {
    staticClass: "fa fa-pencil"
  })])
}]}

/***/ }),
/* 421 */,
/* 422 */,
/* 423 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
],[24]);
//# sourceMappingURL=app.385be4a5948aa5b652dc.js.map