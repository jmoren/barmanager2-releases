  import _ from 'lodash'
  export default {
    methods: {
      parseMessage: function (message) {
        switch (typeof message) {
          case 'string':
            return [message]
          case 'object':
            let acc = []
            _.map(message, (value, key) => {
              acc.push(key + ': ' + value)
            })
            return acc
          default:
            return []
        }
      },
      alert: function (type, message, position) {
        let p = 'bottom-center'
        if (position) { p = position }
        let msgs = this.parseMessage(message)
        _.map(msgs, (m) => {
          this.$notify.open({
            content: m,
            duration: 5000,
            type: type,
            placement: p
          })
        })
      }
    }
  }
