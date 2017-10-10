import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/login/Login'
import Kitchen from '@/components/kitchen/Kitchen'
import PrivateApp from '@/components/layouts/PrivateApp'

import Ticket from '@/components/tickets/Ticket'
import AdminTicket from '@/components/tickets/AdminTicket'
import Tickets from '@/components/tickets/Tickets'
import Payments from '@/components/payments/Payments'
import Tables from '@/components/tables/Tables'
import AdminTable from '@/components/tables/AdminTable'
import Clients from '@/components/clients/Clients'
import Client from '@/components/clients/Client'
import PartialDailyCash from '@/components/cash/PartialDailyCash'
import Profile from '@/components/user/Profile'
import Administration from '@/components/administration/Administration'
import AdminClients from '@/components/administration/Clients'
import AdminItems from '@/components/administration/Items'
import AdminSettings from '@/components/administration/AdminSettings'
import AdminPromotions from '@/components/administration/Promotions'
import AdminCategories from '@/components/administration/Categories'
import AdminSuppliers from '@/components/administration/Suppliers'
import AdminTables from '@/components/administration/Tables'
import AdminCancelReasons from '@/components/administration/CancelReasons'
import AdminDailyCashes from '@/components/administration/DailyCashes'
import DailyCash from '@/components/cash/DailyCash'
import AdminUsers from '@/components/administration/Users'
import AdminReports from '@/components/administration/Reports'
import Delivery from '@/components/deliveries/Delivery'
import Deliveries from '@/components/deliveries/Deliveries'
import MensualCashes from '@/components/administration/MensualCashes'
import MensualCash from '@/components/administration/MensualCash'

import NotFound from '@/components/notFound/NotFound'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/',
      component: PrivateApp,
      children: [
        { path: '',
          name: 'Tables',
          component: Tables
        },
        { path: 'cajas/:id',
          name: 'PartialDailyCash',
          component: PartialDailyCash,
          meta: { roles: ['admin'] }
        },
        { path: 'clientes/:id',
          name: 'Client',
          component: Client
        },
        { path: 'tickets/:id',
          name: 'Ticket',
          component: Ticket
        },
        { path: 'perfil',
          name: 'Profile',
          component: Profile
        },
        { path: 'clientes',
          name: 'Clients',
          component: Clients
        },
        {
          path: 'pedido/:id',
          name: 'Delivery',
          component: Delivery
        },
        {
          path: 'pedidos',
          name: 'Deliveries',
          component: Deliveries
        },
        { path: 'administracion',
          component: Administration,
          children: [
            { path: 'clientes', name: 'AdminClients', component: AdminClients, meta: { roles: ['admin', 'manager'] } },
            { path: 'items', name: 'AdminItems', component: AdminItems, meta: { roles: ['admin', 'manager'] } },
            { path: 'promociones', name: 'AdminPromotions', component: AdminPromotions, meta: { roles: ['admin', 'manager'] } },
            { path: 'categorias', name: 'AdminCategories', component: AdminCategories, meta: { roles: ['admin', 'manager'] } },
            { path: 'proveedores', name: 'AdminSuppliers', component: AdminSuppliers, meta: { roles: ['admin', 'manager'] } },
            { path: 'mesas', name: 'AdminTables', component: AdminTables, meta: { roles: ['admin', 'manager'] } },
            { path: 'razones', name: 'AdminCancelReasons', component: AdminCancelReasons, meta: { roles: ['admin', 'manager'] } },
            { path: 'usuarios', name: 'AdminUsers', component: AdminUsers, meta: { roles: ['admin'] } },
            { path: 'cajas', name: 'AdminDailyCashes', component: AdminDailyCashes, meta: { roles: ['admin'] } },
            { path: 'reportes', name: 'AdminReports', component: AdminReports, meta: { roles: ['admin'] } },
            { path: 'Configuracion', name: 'AdminSettings', component: AdminSettings, meta: { roles: ['admin'] } },
            { path: 'tickets', name: 'Tickets', component: Tickets },
            { path: 'pagos', name: 'Payments', component: Payments, props: (route) => ({ query: route.query.q }) },
            { path: 'cajas/:id/resumen', name: 'DailyCash', component: DailyCash, meta: { roles: ['admin'] } },
            { path: 'cajas/mensuales', name: 'MensualCashes', component: MensualCashes, meta: { roler: ['admin'] } },
            { path: 'cajas/:month/:year', name: 'MensualCash', component: MensualCash, meta: { roler: ['admin'] } },
            {
              path: 'mesas/:id',
              name: 'AdminTable',
              component: AdminTable,
              children: [
                { path: 'ticket/:ticketId', name: 'AdminTicket', component: AdminTicket }
              ]
            }
          ]
        }
      ]
    },
    { path: '/cocina',
      name: 'Kitchen',
      component: Kitchen,
      role: 'cocina',
      meta: { roles: ['admin', 'cooker'] }
    },
    { path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    },
    { path: '*', redirect: '/' }
  ]
})

export default router
