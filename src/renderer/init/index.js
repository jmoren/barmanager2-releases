export default {
  init (config) {
    if (config.get('api_url', null) === null) {
      config.set('api_url', 'http://localhost:3000/api/')
    }
    if (config.get('websocket', null) === null) {
      config.set('websocket', 'ws://localhost:3000/cable')
    }
    if (config.get('business_name', null) === null) {
      config.set('business_name', '')
    }
    if (config.get('business_slogan', null) === null) {
      config.set('business_slogan', '')
    }
    if (config.get('business_phone', null) === null) {
      config.set('business_phone', '')
    }
    if (config.get('business_address', null) === null) {
      config.set('business_address', '')
    }
    if (config.get('barcode_format', null) === null) {
      config.set('barcode_format', 'CODE128')
    }
    if (config.get('barcode_width', null) === null) {
      config.set('barcode_width', '2')
    }
    if (config.get('barcode_height', null) === null) {
      config.set('barcode_height', '60')
    }
    if (config.get('barcode_last_char', null) === null) {
      config.set('barcode_last_char', '>')
    }
    if (config.get('ticket_item_input', null) === null) {
      config.set('ticket_item_input', 'Classic')
    }
    if (config.get('map_visible', null) === null) {
      config.set('map_visible', false)
    }
    if (config.get('map_width', null) === null) {
      config.set('map_width', 300)
    }
    if (config.get('map_height', null) === null) {
      config.set('map_height', 300)
    }
    if (config.get('open_payments', null) === null) {
      config.set('open_payments', true)
    }
    if (config.get('tables_view', null) === null) {
      config.set('tables_view', 'classic')
    }
    if (config.get('delivery_interval', null) === null) {
      config.set('delivery_interval', 7000)
    }
    if (config.get('zone_interval', null) === null) {
      config.set('zone_interval', 10000)
    }
  }
}
