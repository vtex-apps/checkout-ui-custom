

const debug = require("./_js/_debug.js");
const checkoutCustom = require("./_js/_v.custom.checkout.ui.js");

window.vcustom = {
  checkout: new checkoutCustom({
    type: "vertical", //["vertical" , "horizontal"]
    accordionPayments: true, 
    deliveryDateFormat: false, 
    quantityPriceCart:false,
    showNoteField:false
  }),
  debug: new debug({
    dbg:false,
    logo:""
  })
}

vcustom.checkout.start(); 

$(function() {
  window.vcustom.debug.headernFooter()
  $("header.main-header.debug-elem .logo").html(`<img src="/arquivos/logo.png">`)
  vcustom.checkout.addStepsHeader()

})

$(document).ajaxComplete(function() {  //s2
  $(".coupon-value").attr("placeholder","cupom de desconto");
})


// vcustom.debug.start(); 


