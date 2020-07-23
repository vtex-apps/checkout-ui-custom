

const debug = require("./_js/_debug.js");
const checkoutCustom = require("./_js/_v.custom.checkout.ui.js");

window.vcustom = {
  checkout: new checkoutCustom({
    type: "vertical", //["vertical" , "horizontal"]
    accordionPayments: true, 
    deliveryDateFormat: true
  }),
  debug: new debug(false)
}

vcustom.checkout.start(); 


$(document).ready(() => {
  vcustom.debug.start();
})

