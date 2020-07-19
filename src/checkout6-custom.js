
const checkoutCustom = require("./_js/_v.custom.checkout.ui.js");

/*
  Parameters on following order:
    type ["vertical" , "horizontal"]
    accordionPayments [boolean]
    deliveryDateFormat [boolean]
*/
window.vcustomCheckout = new checkoutCustom("vertical", true, true);
vcustomCheckout.start();