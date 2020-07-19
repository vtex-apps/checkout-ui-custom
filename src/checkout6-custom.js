
const checkoutCustom = require("./_js/_v.custom.checkout.ui.js");


window.vcustomCheckout = new checkoutCustom({
  type: "vertical", //["vertical" , "horizontal"]
  accordionPayments: false, 
  deliveryDateFormat: true
});
vcustomCheckout.start();