<template>
  <div id="not-found">
    <div class="content">
      <span class="code">404</span>
      <p class="error-message">Lo siento pero no tenés permisos, o la página no existe</p>
      <p>
        <router-link :to="{ name: 'Tables' }" class="button is-primary is-large">
          <span class="icon"><i class="fa fa-angle-left"></i></span>
          <span>Volver</span>
        </router-link>
        <router-link :to="{ name: 'Login' }" class="button is-primary is-large">
          <span>Login</span>
          <span class="icon"><i class="fa fa-angle-right"></i></span>
        </router-link>
      </p>
      <p class="error-message-footer">
        <small>Contacta al administrador si no esperabas un error</small>
      </p>
    </div>
  </div>
</template>

<script>
  import Auth from '../../auth'
  export default {
    name: 'NotFound',
    data () {
      return {
        user: Auth.user
      }
    }
  }
</script>

<style>
  #not-found {
    margin: 40px 0;
    background: #f1f1f1;
  }

  #not-found .content {
    margin: 40px auto;
    padding: 50px;
    width: 50%;
    text-align: center
  }
  #not-found .content .error-message {
    font-size: 30px;
  }
  #not-found .content .code {
    font-size: 40px;
    font-weight: 600;
    color: #f56954;
  }

  #not-found .content .error-message-footer {
    padding-top: 20px;
    margin: 20px auto;
  }
</style>
