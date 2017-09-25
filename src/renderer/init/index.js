export default {
  init (config) {
    if (config.get('api_url', null) === null) {
      console.log('config')
      config.set('api_url', 'http://localhost:3000/api/')
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
  }
}