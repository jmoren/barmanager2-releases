import Vue from '../main'
import router from '../router'
const LOGIN_URL = 'authenticate'

export default {
  // user object is how we check auth status
  user: {
    authenticated: false,
    profile: {}
  },
  check () {
    Vue.http.get('user', { headers: { 'authorization': 'Bearer ' + localStorage.getItem('id_token') } }).then(
      response => {
        this.user.authenticated = true
        this.user.profile = response.data
      },
      (error) => {
        if (error.status === 0) {
          window.alert('Fallo la conexion con la aplicacion')
        }
        this.user.authenticated = false
        this.user.profile = {}
        this.logout()
      }
    ).catch(function (error) {
      console.log(error)
    })
  },
  login (context, creds, redirect) {
    Vue.http.post(LOGIN_URL, creds, { headers: { Authorization: null } }).then(
      response => {
        let token = response.data.auth_token
        localStorage.setItem('id_token', token)
        Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

        this.user.authenticated = true
        this.user.profile = { name: response.data.name, role: response.data.role, email: response.data.email }
        if (this.user.profile.role === 'cooker') {
          router.push({ name: 'Kitchen' })
        } else {
          router.push({ name: 'Tables' })
        }
      },
      error => {
        context.loading = false
        context.error = error.data
        context.$notify.open({
          type: 'danger',
          content: 'Error: ' + error.data
        })
      }
    )
  },
  logout () {
    localStorage.removeItem('id_token')
    Vue.http.headers.common['Authorization'] = null
    this.user.authenticated = false
    this.user.profile = {}
    router.push({ name: 'Login' })
  }
}
