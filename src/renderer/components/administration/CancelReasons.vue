<template lang="html">
  <div class="">
    <modal title="Administrar Razon" ok-text="Guardar" cancel-text="Cancelar" :on-ok="saveCancelReason" :on-cancel="cancelReason" :width="520" :is-show="isShow" transition="zoom" @close="cancelReason">
      <div class="control">
        <div class="control"><textarea type="text" class="textarea" placeholder="Descripcion" v-model="newCancelReason.text"></textarea></div>
      </div>
    </modal>
    <h1 class="header">
      <i class="fa fa-address-book-o fa-floated"></i> 
      Razones
      <a @click.prevent="isShow=true" class="is-pulled-right button is-light">Nueva Razon</a>
    </h1>
    <hr>
    <table class="table">
      <thead>
        <th># ID</th>
        <th>Texto</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="reason in reasons" :key="reason.id">
          <td># {{ reason.id }}</td>
          <td>{{ reason.text }}</td>
          <td>
            <div class="control has-addons">
              <a @click.prevent="removeReason(reason)" class="button is-light">
                 <span class="icon is-small"><i class="fa fa-trash"></i></span>
              </a>
              <a @click.prevent="setToEdit(reason)" class="button is-light">
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
import alert from '../../mixins/Alert'

export default {
  name: 'AdminCancelReasons',
  mixins: [alert],
  data () {
    return {
      newCancelReason: { name: '', phone: '', address: '' },
      originalCancelReason: { id: null, name: '', phone: '', address: '' },
      reasons: [],
      isShow: false,
      colors: [{value: 'is-success', title: 'Verde'}, {value: 'is-danger', title: 'Rojo'}, {value: 'is-warning', title: 'Amarillo'}]
    }
  },
  created () {
    this.fetchCancelReasons()
  },
  methods: {
    fetchCancelReasons () {
      this.$http.get('admin/cancel_reasons').then(
        response => {
          this.reasons = response.data
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    saveCancelReason () {
      if (this.newCancelReason.id) {
        this.updateCancelReason()
      } else {
        this.createCancelReason()
      }
    },
    createCancelReason () {
      this.$http.post('admin/cancel_reasons', { cancel_reason: this.newCancelReason }).then(
        (response) => {
          this.reasons.push(response.data)
          this.cancelReason()
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    updateCancelReason () {
      let params = {
        text: this.newCancelReason.text
      }

      this.$http.put('admin/cancel_reasons/' + this.newCancelReason.id, { cancel_reason: params }).then(
        (response) => {
          _.extend(this.originalCancelReason, response.data)
          this.cancelReason()
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    removeReason (reason) {
      this.$http.delete('admin/cancel_reasons/' + reason.id).then(
        () => {
          let index = this.reasons.indexOf(reason)
          this.reasons.splice(index, 1)
        },
        error => {
          this.alert('danger', error.data)
        }
      )
    },
    cancelReason () {
      this.isShow = false
      _.extend(this.newCancelReason, this.originalCancelReason)
      this.newCancelReason = { name: '', phone: '', address: '' }
    },
    setToEdit (cancelReason) {
      this.originalCancelReason = cancelReason
      this.newCancelReason = _.clone(cancelReason)
      this.isShow = true
    }
  }
}
</script>

<style lang="css">
</style>
