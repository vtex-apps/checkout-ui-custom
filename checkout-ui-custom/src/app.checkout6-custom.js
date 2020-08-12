const debug = require('./_js/_debug.js')
const checkoutCustom = require('./_js/_v.custom.checkout.ui.js')

window.vcustom = {
  checkout: new checkoutCustom({
    type: '{{type}}', //["vertical" , "horizontal"]
    accordionPayments: JSON.parse('{{accordionPayments}}'),
    deliveryDateFormat: JSON.parse('{{deliveryDateFormat}}'),
    quantityPriceCart: JSON.parse('{{quantityPriceCart}}'),
    showNoteField: JSON.parse('{{showNoteField}}'),
  }),
  debug: new debug({
    dbg: false,
    logo: '',
  }),
}

vcustom.checkout.start()
