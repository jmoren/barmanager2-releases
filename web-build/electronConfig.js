module.exports = function () {
  var config = {
    api_url: 'http://0.0.0.0:3000/api/',
    business_name: '',
    business_slogan: '',
    business_phone: '',
    business_address: '',
    barcode_format: 'CODE128',
    barcode_width: '2',
    barcode_height: '60',
    barcode_last_char: '>',
    ticketItemInput: 'Tactil',
    map_visible: false,
    map_width: 300,
    map_height: 300,
    open_payments: true,
    tables_view: 'classic',
    websocket: 'ws://localhost:3000/cable',
    zone_interval: 7000,
    delivery_interval: 10000
  }
  this.set = function (key, value) {
    config[key] = value
  }
  this.get = function (a, b) {
    return config[a] || b
  }
}
