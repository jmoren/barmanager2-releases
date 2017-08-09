<template>
  <div id="login">
    <div class="login-content">
      <h1>Bienvenido</h1>
      <alert type="danger" v-if="error">{{ error.error.user_authentication[0] }}</alert>
      <div class="box">
        <div v-if="!loading">
          <div class="control has-icon has-icon-right">
            <i class="fa fa-envelope"></i>
            <input type="text" placeholder="Email" v-model="credentials.email" class="input is-medium">
          </div>
          <div class="control has-icon has-icon-right">
          <i class="fa fa-lock"></i>
            <input type="password" placeholder="Password" v-model="credentials.password" class="input is-medium">  
          </div>
          <hr>
          <div class="columns">
            <div class="column is-6 is-offset-3">
              <button type="submit" class="button is-fullwidth is-primary is-medium " @click.prevent="submit">Login</button>
            </div>
          </div>
        </div>
        <div v-else>
          <Loader :hide-text="true"></Loader>
        </div>
      </div>
      <small>BarManager 2.0 <i class="fa fa-copyright fa-floated"></i>  2017</small>
    </div>
  </div>
</template>

<script>
  import auth from '../../auth'
  import Loader from '@/components/utils/Loader'
  export default {
    name: 'Login',
    components: { Loader },
    data () {
      return {
        credentials: {
          email: '',
          password: ''
        },
        error: '',
        loading: false
      }
    },
    methods: {
      submit () {
        this.loading = true
        auth.login(this, this.credentials, '/')
      }
    }
  }
</script>

<style scoped>
  .login-content{
    width: 20%;
    margin: 30px auto;
    padding: 40px 0px;
  }

  #login h1 {
    margin-bottom: 20px;
    text-align: center;
    color: #000;
    font-size: 20px;
    font-weight: 500;
  }
  #login {
    margin-top: 100px;
    background: #f1f1f1;
    color: #666;
  }

</style>
