const $fn = {

}


class checkoutCustom {
  constructor() {
    this.type = "vertical"; // vertical or horizontal
  }


  general() {
    if(!$(".custom-cart-template-wrap").length) $(".cart-template.mini-cart .cart-fixed > *").wrapAll('<div class="custom-cart-template-wrap">');
  }
  
  builder() {
    let _this = this;
    if(this.type=="vertical") {
      _this.buildVertical()
    } else if(this.type=="horizontal") {
      _this.buildHorizontal()
    } else {
      console.error("No `type` identified, check your code")
    }
  }

  buildVertical() {
    $("body").addClass("body-cart-vertical")
    $(".cart-template .cart-links-bottom:eq(0)").appendTo(".cart-template > .summary-template-holder")
    $(".cart-template .cart-more-options:eq(0), .cart-template .extensions-checkout-buttons-container").appendTo(".cart-template-holder")

  }

  buildHorizontal() {

  }

  checkEmpty(items) {
    if(items.length==0) {
      $("body").addClass("cart-empty")
    } else {
      $("body").removeClass("cart-empty")
    }
  }

  update(orderForm) {
    console.log(orderForm);
    this.checkEmpty(orderForm.items)
  }

  updateStep() {
    console.log(window.location.hash)
    $("body").removeClass("v-custom-step-email v-custom-step-cart v-custom-step-profile v-custom-step-shipping")
    if(window.location.hash=="#/email") {
      $("body").addClass("v-custom-step-email")
    }
    if(window.location.hash=="#/cart") {
      $("body").addClass("v-custom-step-cart")
    }
    if(window.location.hash=="#/profile") {
      $("body").addClass("v-custom-step-profile")
    }
    if(window.location.hash=="#/shipping") {
      $("body").addClass("v-custom-step-shipping")
    }
  }

  init() {
    let _this = this;
    _this.general();
    _this.builder();
    _this.updateStep();
  }
}

let fnsCheckout = new checkoutCustom();

$(document).ajaxComplete(function() {
  fnsCheckout.init()
})

$(window).load(function() {
  fnsCheckout.builder()
})
$(window).on('hashchange', function() {
  fnsCheckout.updateStep();
});

$(window).on('orderFormUpdated.vtex', function(evt, orderForm) {
  fnsCheckout.update(orderForm);
})