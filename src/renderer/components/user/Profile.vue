<template>
  <div class="container" id="user-profile">
    <h1 class="header"><tag rounded id="header-icon"><i class="fa fa-user"></i></tag> Perfil</h1>
    <hr>
    <div class="columns">
      <div class="column is-6">
        <div class="control has-icon">
          <i class="fa fa-envelope"></i>
          <input class="input is-medium" type="text" v-model="user.profile.email" disabled readonly="readonly"/>
        </div>
      </div>
      <div class="column is-6">
        <div class="control has-icon">
          <i class="fa fa-cog"></i>
          <div class="input is-medium" disabled readonly="readonly">{{ roles[user.profile.role] }}</div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6">
        <tooltip content="Nombre completo">
          <div class="control has-icon">
            <i class="fa fa-user"></i>
            <input class="input is-medium" type="text" v-model="user.profile.name"/>
          </div>
        </tooltip>
      </div>
      <div class="column is-6">
        <tooltip content="Direccion completa">
          <div class="control has-icon">
            <i class="fa fa-home"></i>
            <input class="input is-medium" type="text" v-model="user.profile.address" placeholder="Agregar Direccion"/>
          </div>
        </tooltip>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6">
        <tooltip content="El numero de Telefono">
          <div class="control has-icon">
            <i class="fa fa-phone"></i>
            <input class="input is-medium" type="text" v-model="user.profile.phone" placeholder="Agregar Telefono" />
          </div>
        </tooltip>
      </div>
      <div class="column is-4">
        <tooltip content="El numero de CUIL">
          <div class="control is-expanded has-icon">
            <i class="fa fa-tag"></i>
            <input class="input is-medium" type="text" v-model="user.profile.cuil" placeholder="Agregar CUIL" />
          </div>
        </tooltip>
      </div>
      <div class="column is-2">
        <radio-group v-model="user.profile.gender" class="is-pulled-right">
          <radio-button class="is-medium" val="mujer">Mujer</radio-button>
          <radio-button class="is-medium" val="hombre">Hombre</radio-button>
        </radio-group>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6">
        <div class="control is-expanded has-icon">
          <i class="fa fa-lock"></i>
          <input class="input is-medium" type="password" v-model="authCreds.password" placeholder="Contraseña nueva" />
        </div>
      </div>
      <div class="column is-6">
        <div class="control is-expanded has-icon">
          <i class="fa fa-lock"></i>
          <input class="input is-medium" type="password" v-model="authCreds.password_confirmation" placeholder="Confirmar contraseña" />
        </div>
      </div>
    </div>
    <div v-if="updatePassword" class="is-danger-text" style="font-size: 15px;margin: 5px 0px;">
      <span v-if="authCreds.password === authCreds.password_confirmation"> Se actualizara la contraseña</span>
      <span v-else>La confirmacion de la contraseña es incorrecta</span>
    </div>
    <hr>
    <div class="columns">
      <div class="column is-6">
        <input class="input is-medium" type="password" v-model="oldPassword" placeholder="Contraseña Actual" />
      </div>
      <div class="column is-6">
        <button @click.prevent="update" class="button is-medium is-primary" :class="{'is-disabled': !oldPassword }">
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import Auth from '../../auth'
  export default {
    name: 'Profile',
    data () {
      return {
        user: Auth.user,
        authCreds: { password: null, password_confirmation: null },
        oldPassword: null,
        roles: {
          admin: 'Administrador',
          user: 'Usuario',
          manager: 'Manager',
          cooker: 'Cocinero'
        }
      }
    },
    computed: {
      updatePassword () {
        return !!this.authCreds.password && !!this.authCreds.password_confirmation
      }
    },
    methods: {
      update () {
        let params = {
          name: this.user.profile.name,
          email: this.user.profile.email,
          old_password: this.oldPassword,
          address: this.user.profile.address,
          phone: this.user.profile.phone,
          cuil: this.user.profile.cuil,
          gender: this.user.profile.gender
        }
        if (this.updatePassword) {
          params.password = this.authCreds.password
          params.password_confirmation = this.authCreds.passwordConfirmation
        }

        this.$http.put('users/profile', { user: params }).then(
          response => {
            this.$notify.open({
              type: 'success',
              content: 'Perfil actualizado'
            })
            this.oldPassword = null
          },
          error => {
            this.$notify.open({
              type: 'danger',
              content: error.data.message
            })
          }
        )
      }
    }
  }
</script>

<style scoped>
  .control.has-icon>.fa { top: 8px; }
  h1.sub-header { font-size: 18px; font-weight: 400; margin: 25px 0px 15px; }
  .control.user-footer { text-align: right; margin: 20px auto; }
</style>
