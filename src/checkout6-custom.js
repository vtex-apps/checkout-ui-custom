class checkoutCustom {
  constructor() {
    this.type = "vertical"; // vertical or horizontal
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
  	$(".cart-template .cart-more-options:eq(0), .cart-template .extensions-checkout-buttons-container").appendTo(".cart-template-holder")
  	$(".cart-template .cart-links-bottom:eq(0)").appendTo(".summary-template-holder")
  }

  buildHorizontal() {

  }

  init() {
  	let _this = this;
  	_this.builder();
  }
}

let fnsCheckout = new checkoutCustom();

window.onload = function(){
	fnsCheckout.init()
}