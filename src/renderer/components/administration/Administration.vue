<template lang="html">
  <div class="container" id="admin-content">
    <div class="columns">
      <div class="column is-2">
        <h1 class="header">Menu</h1>
        <hr>
        <menus label="">
          <menu-item icon="exclamation" :to="{ name: 'PartialDailyCash', params: { id: dailyCash.id } }" v-if="dailyCash.id">
            Caja actual
          </menu-item>
          <li class="nav-item" v-else style="font-size: 14px;padding: 7px;">
            <span class="is-danger-text">No hay caja</span>
          </li>
          <div class="divider" style="height: 3px; margin: 6px 0px;"></div>
          <menu-item icon="bars" :to="{ name: 'AdminItems'}">Items</menu-item>
          <menu-item icon="lightbulb-o" :to="{ name: 'AdminPromotions'}">Promociones</menu-item>
          <menu-item icon="paperclip" :to="{ name: 'AdminCategories'}">Categorias</menu-item>
          <menu-item icon="users" :to="{ name: 'AdminClients'}">Clientes</menu-item>
          <menu-item icon="address-book-o" :to="{ name: 'AdminSuppliers'}">Proveedores</menu-item>
          <menu-item icon="cutlery" :to="{ name: 'AdminTables'}">Mesas</menu-item>
          <menu-item icon="hashtag" :to="{ name: 'AdminCancelReasons'}">Razones</menu-item>

          <div v-if="profile.role !== 'manager'">
            <div class="divider"></div>
            <h2 style="font-weight:300;padding: 10px; color: #f56954">
              <span class="icon"><i class="fa fa-exclamation-circle"></i></span> <span>Admin</span>
            </h2>
            <div class="divider"></div>
            <menu-item icon="ticket" :to="{ name: 'Tickets'}">Tickets</menu-item>
            <menu-item icon="money" :to="{ name: 'Payments'}">Pagos</menu-item>
            <menu-item icon="cog" :to="{ name: 'AdminUsers'}">Usuarios</menu-item>
            <menu-item icon="dollar" :to="{ name: 'AdminDailyCashes'}">Cajas</menu-item>
            <menu-item icon="bar-chart" :to="{ name: 'AdminReports'}">Reportes</menu-item>
          </div>
        </menus>
      </div>
      <div class="column is-10">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Auth from '../../auth'

export default {
  computed: {
    ...mapGetters({
      tables: 'allTables',
      dailyCash: 'currentCash'
    })
  },
  data () {
    return {
      profile: Auth.user.profile
    }
  },
  beforeRouteEnter (to, from, next) {
    if (['manager', 'admin'].indexOf(Auth.user.profile.role) === -1) {
      next(vm => vm.$router.push({ name: 'NotFound' }))
    } else {
      next()
    }
  }
}
</script>

<style lang="css">
  #admin-content { font-size: 18px; }
  #admin-content .is-button-text-left { justify-content: left !important; }
  #admin-content .switchery { margin-top: 5px; }
  li .router-link-exact-active.router-link-active { color: #6cc788; font-weight: 500; }
</style>
