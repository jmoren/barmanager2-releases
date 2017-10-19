<template lang="html">
  <div class="">
    <modal title="Administrar Ususarios" ok-text="Guardar" cancel-text="Cancelar" :on-ok="saveUser" :on-cancel="cancelUser" :width="1020" :is-show="isShow" transition="zoom" @close="cancelUser">
      <div class="columns is-multiline">
        <div class="column is-6">
          <div class="control">
            <label>Nombre</label>
            <input type="text" class="input" v-model="newUser.name" placeholder="Agregar Nombre">
          </div>
        </div>
        <div class="column is-3">
          <div class="control">
            <label>DNI</label>
            <input type="text" class="input" v-model="newUser.dni" placeholder="Agregar DNI">
          </div>
        </div>
        <div class="column is-3">
          <div class="control">
            <label>Email</label>
            <input type="text" class="input" v-model="newUser.email" placeholder="Agregar Email">
          </div>
        </div>

        <div class="column is-3">
          <div class="control">
            <label>Telefono</label>
            <input type="text" class="input" v-model="newUser.phone" placeholder="Agregar Telefono">
          </div>
        </div>
        <div class="column is-3">
          <div class="control">
            <label>Telefono Alternativo</label>
            <input type="text" class="input" v-model="newUser.alt_phone" placeholder="Agregar Telefono Alternativo">
          </div>
        </div>
        <div class="column is-3">
          <div class="control">
            <label>CUIL</label>
            <input type="text" class="input" v-model="newUser.cuil" placeholder="Agregar Cuil">
          </div>
        </div>
        <div class="column is-3">
          <div class="control">
            <label>Libreta San.</label>
            <input type="text" class="input" v-model="newUser.sanitary_number" placeholder="Agregar Libreta sanitaria">
          </div>
        </div>

        <div class="column is-6">
          <div class="control">
            <label>Direccion</label>
            <input type="text" class="input" v-model="newUser.address" placeholder="Agregar Direccion">
          </div>
        </div>
        <div class="column is-3">
          <div class="control">
            <label>Fecha de Ingreso</label>
            <datepicker placeholder="Fecha de ingreso" :options="dateOptions" v-model="newUser.start_date"></datepicker>
          </div>
        </div>
        <div class="column is-3">
          <div class="control">
            <label>Fecha de Salida</label>
            <datepicker placeholder="Fecha de salida" :options="dateOptions" v-model="newUser.end_date"></datepicker>
          </div>
        </div>
        <div class="column is-6">
          <div class="control">
            <label>Seleccione role:</label>
            <radio-group v-model="newUser.role">
              <radio-button v-bind:val="role.value" v-for="role in roles" :key="role.value">{{ role.name }}</radio-button>
            </radio-group>
          </div>
        </div>
        <div class="column is-6">
          <div class="control">
            <label>Seleccione Sexo:</label>
            <radio-group v-model="newUser.gender">
              <radio-button val="male">Hombre</radio-button>
              <radio-button val="female">Mujer</radio-button>
            </radio-group>
          </div>
        </div>
        <div class="column is-6" v-if="!newUser.id">
          <div class="control">
            <label>Contraseña</label>
            <input type="password" class="input" v-model="newUser.password" placeholder="Contraseña">
          </div>
        </div>
        <div class="column is-6" v-if="!newUser.id">
          <div class="control">
            <label>Confirmar contraseña</label>
            <input type="password" class="input" v-model="newUser.password_confirmation" placeholder="Confirmar contraseña">
          </div>
        </div>
      </div>
    </modal>
    <h1 class="header">
      <i class="fa fa-users fa-floated"></i>
      Usuarios
      <a @click.prevent="isShow = true" class="button is-light is-pulled-right">Nuevo User</a>
    </h1>
    <hr>
    <table class="table">
      <thead>
        <th>Nombre</th>
        <th>Email</th>
        <th>DNI</th>
        <th>CUIL</th>
        <th>Libreta Sanitaria</th>
        <th>Dirección</th>
        <th>Teléfonos</th>
        <th>Role</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.dni }}</td>
          <td>{{ user.cuil }}</td>
          <td>{{ user.sanitary_number }}</td>
          <td>{{ user.address }}</td>
          <td>{{ phones(user) }}</td>
          <td>{{ user.role }}</td>
          <td>
            <div class="control has-addons">
              <a @click.prevent="removeUser(user)" class="button is-light">
                 <span class="icon is-small"><i class="fa fa-trash"></i></span>
              </a>
              <a @click.prevent="setToEdit(user)" class="button is-light">
                 <span class="icon is-small"><i class="fa fa-pencil"></i></span>
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import alert from '../../mixins/Alert'

export default {
  name: 'AdminUsers',
  mixins: [alert],
  data () {
    return {
      newUser: {},
      originalUser: {},
      isShow: false,
      roles: [
        { name: 'Admin', value: 'admin' },
        { name: 'User', value: 'user' },
        { name: 'Manager', value: 'manager' },
        { name: 'Cocina', value: 'cooker' },
        { name: 'Delivery', value: 'delivery' }
      ],
      dateOptions: {
        dateFormat: 'd/m/Y'
      }
    }
  },
  computed: {
    ...mapGetters({
      users: 'allUsers'
    })
  },
  methods: {
    fetchUsers () {
      this.$http.get('admin/users').then(
        response => {
          this.users = response.data
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    saveUser () {
      if (this.newUser.id) {
        this.updateUser()
      } else {
        this.createUser()
      }
    },
    createUser () {
      this.$http.post('admin/users', { user: this.newUser }).then(
        response => {
          this.$store.dispatch('addUser', response.data)
          this.cancelUser()
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    updateUser () {
      this.$http.put('admin/users/' + this.newUser.id, { user: this.newUser }).then(
        response => {
          this.$store.dispatch('updateUser', response.data)
          this.cancelUser()
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    removeUser (user) {
      this.$http.delete('admin/users/' + user.id).then(
        response => {
          this.$store.dispatch('updateUser', response.data)
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    cancelUser () {
      this.isShow = false
      _.extend(this.newUser, this.originalUser)
      this.newUser = { name: null, email: null, role: 'user' }
    },
    setToEdit (user) {
      this.originalUser = user
      this.newUser = {}
      this.newUser = _.clone(user)
      this.isShow = true
    },
    phones (user) {
      return _.filter([user.phone, user.alt_phone]).join(' / ')
    }
  }
}
</script>

<style lang="css" scoped>
  .control label { margin: 10px 5px; display: block; font-size: 15px; font-weight: 400}
</style>
