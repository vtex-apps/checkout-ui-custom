

const debug = require("./_js/_debug.js");
const checkoutCustom = require("./_js/_v.custom.checkout.ui.js");

window.vcustom = {
  checkout: new checkoutCustom({
    type: "vertical", //["vertical" , "horizontal"]
    accordionPayments: true, 
    deliveryDateFormat: false, 
    quantityPriceCart:false
  }),
  debug: new debug({
    dbg:false,
    logo:""
  })
}

vcustom.checkout.start(); 


// vcustom.debug.start(); 
