const debug = require('./_js/_debug.js')
const checkoutCustom = require('./_js/_v.custom.checkout.ui.js')

window.vcustom = {
  checkout: new checkoutCustom({
    type: '"{{type}}"', //["vertical" , "horizontal"]
    accordionPayments: "{{accordionPayments}}",
    deliveryDateFormat: "{{deliveryDateFormat}}",
    quantityPriceCart: "{{showCartQuantityPrice}}",
    showNoteField: "{{showNoteField}}",
    hideEmailStep:"{{hideEmailStep}}"
  }),
  debug: new debug({
    dbg: false,
    logo: '',
  }),
}

vcustom.checkout.start()
