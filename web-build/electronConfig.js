module.exports = function () {
  this.set = function(key) {
  },
  this.get = function (a, b) {
    var config = {
      api_url: 'http://0.0.0.0:3000/api/',
      ticketItemInput: 'Tactil'
    }
    return config[a] || b;
  }
}
