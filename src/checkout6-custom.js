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

  addStepsHeader() {

    if($(".checkout-steps").length>0) return false

    let addStepsHeaderHtml = `
      <div class="checkout-steps container-cart container">
        <div class="checkout-steps-wrap">
          <span class="checkout-steps_bar">
            <span class="checkout-steps_bar_inner"></span>
            <span class="checkout-steps_bar_inner-active"></span>
          </span>
          <div class="checkout-steps_items">
            <span class="checkout-steps_item checkout-steps_item_cart">
              <span class="text">Cart</span>
            </span>
            <span class="checkout-steps_item checkout-steps_item_identification">
              <span class="text">Login</span>
            </span>
            <span class="checkout-steps_item checkout-steps_item_payment">
              <span class="text">Payment</span>
            </span>
            <span class="checkout-steps_item checkout-steps_item_confirmation">
              <span class="text">Confirmation</span>
            </span>
          </div>
        </div>
      </div>
    `;
    $("body .main-header").after(addStepsHeaderHtml)
  }

  update(orderForm) {
    this.checkEmpty(orderForm.items)
  }

  updateStep() {

    let prefixClass = "v-custom-step-";
    let bClassStep = [
      "cart",
      "email",
      "profile",
      "shipping",
      "payment"
    ];

    $("body").removeClass(bClassStep.map(step => { return prefixClass+step }).join(" "))
    if(window.location.hash) {
      let hashstep = window.location.hash.split("/")[1];
      if(typeof bClassStep.find(st => { return st==hashstep })) {
        $("body").addClass(prefixClass+hashstep)
      }
    }
    
  }

  init() {
    let _this = this;
    _this.general();
    _this.builder();
    _this.updateStep();
    _this.addStepsHeader();
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