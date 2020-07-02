class checkoutCustom {
  constructor() {
    this.type = "vertical"; // ["vertical"]
    this.orderForm = ""; 
    this.orderId = this.orderForm ? this.orderForm.orderFormId : "";

  }


  general() {
    if(!$(".custom-cart-template-wrap").length) $(".cart-template.mini-cart .cart-fixed > *").wrapAll('<div class="custom-cart-template-wrap">');
  
    $(".table.cart-items tbody tr.product-item").each(function (w) {
      if ($(this).find(".v-custom-product-item-wrap").length > 0) return false
      $(this).find("> *").wrapAll(`<div class="v-custom-product-item-wrap">`)
    })
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
      $("body").addClass("v-custom-cart-empty")
    } else {
      $("body").removeClass("v-custom-cart-empty")
    }
  }

  addEditButtoninLogin() {
    $("#v-custom-edit-login-data").remove();
    $(".client-pre-email h3.client-pre-email-h span").append(`
      <a id="v-custom-edit-login-data" class="link-box-edit btn btn-small" style="" title="Edit">
        <i class="icon-edit"></i>
        <i class="icon-spinner icon-spin icon-3x"></i>
      </a>
    `);
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
    $(".container.container-main").before(addStepsHeaderHtml)
  }

  addAssemblies(orderForm) {
    try {
      if(orderForm.items) {
        $.each(orderForm.items, function(i) {
          let _item = this;

          if(_item.assemblies.length>0) {
            let _assembliesHtml = `<div class="v-custom-assemblies">`
            $.each(_item.assemblies, function(w) {
              let _assemblies = this;

              let inptValues = _assemblies.inputValues;
              _assembliesHtml += `<p>${_assemblies.id}</p>`;
              _assembliesHtml += `<ul class="v-custom-assemblies__values">`;
                Object.entries(inptValues).forEach(([key, val]) => {
                  _assembliesHtml += `<li class="v-custom-assemblies__values__item">
                                        <strong>${key}</strong>
                                        <span>${val.trim()}</span>
                                      </li>`;
                });
              _assembliesHtml += `</ul>`;
            })
            _assembliesHtml += `</div>`;
            $(`.table.cart-items tbody tr.product-item:eq(${i}) .v-custom-assemblies`).remove();
            $(`.table.cart-items tbody tr.product-item:eq(${i})`).addClass("v-custom-assemblies-in").find("td.product-name").append(_assembliesHtml);
          }

        })
      }
    } catch(e) {

    }
    
  }

  bundleItems(orderForm) {
    try {
      if (orderForm.items) {
        $.each(orderForm.items, function (i) {
          if (this.bundleItems.length > 0) {
            $(`.table.cart-items tbody tr.product-item:eq(${i})`).addClass("v-custom-bundles-in").find("td.product-name");
          } else {
            $(`.table.cart-items tbody tr.product-item:eq(${i})`).removeClass("v-custom-bundles-in");
          }
        });
        $(".table.cart-items tbody tr.item-service").each(function (w) {
          if ($(this).find(".v-custom-trservice-wrap").length > 0) return false
          $(this).find("> *").wrapAll(`<div class="v-custom-trservice-wrap">`)
        })
      }
    } catch (e) { }
  }

  buildMiniCart() {
    /* overode refresh from vtex */
    $(`.mini-cart .cart-items`).html(`${$(`.mini-cart .cart-items`).html()}`)
  }

  removeMCLoader () { $(`.mini-cart .cart-items`).addClass("v-loaded"); }
  indexedInItems(orderForm) {
    let _this = this;
    try {
      if (vtexjs.checkout.orderForm.items.filter(item => { return item.parentItemIndex != null }).length == 0) { _this.removeMCLoader(); return false;}
      if (orderForm.items && $(`.mini-cart .cart-items li`).length) {
        $.each(orderForm.items, function (i) {
          if (this.parentItemIndex!=null) {
            $(`.table.cart-items tbody tr.product-item:eq(${i})`).addClass("v-custom-indexed-item").appendTo(`.table.cart-items tbody tr.product-item:eq(${this.parentItemIndex})`);
            $(`.table.cart-items tbody tr.product-item:eq(${this.parentItemIndex})`).addClass("v-custom-indexedItems-in");
            
            $(`.mini-cart .cart-items li:eq(${i})`).addClass("v-custom-indexed-item").appendTo(`.mini-cart .cart-items li:eq(${this.parentItemIndex})`);
            $(`.mini-cart .cart-items li:eq(${this.parentItemIndex})`).addClass("v-custom-indexedItems-in");
          }
        });
        _this.removeMCLoader();
      }
      
    } catch (e) { _this.removeMCLoader(); }
  }

  update(orderForm) {
    this.checkEmpty(orderForm.items);
    this.addAssemblies(orderForm);
    this.bundleItems(orderForm);
    
    this.buildMiniCart();
    this.indexedInItems(orderForm);
    
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

  bind() {
    let _this = this;
    $("body").on("click", "#v-custom-edit-login-data", function(e) {

      e.preventDefault();

      $(this).addClass("active");

      var data = null;
      var xhr = new XMLHttpRequest();
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) { 
          location.reload(); 
          setTimeout(function() {
            $("#v-custom-edit-login-data").removeClass("active");
          },1000)
        }
      });

      xhr.open("GET", `/checkout/changeToAnonymousUser/${_this.orderForm.orderFormId}`);
      xhr.setRequestHeader("content-type", "application/json");
      xhr.setRequestHeader("accept", "application/json");

      xhr.send(data);


    })
  }

  init() {
    let _this = this;
    
    _this.orderForm = vtexjs.checkout.orderForm ? vtexjs.checkout.orderForm : "";

    _this.general();
    _this.updateStep();
    _this.addStepsHeader();
    _this.builder();
    _this.addAssemblies(_this.orderForm);
    _this.indexedInItems(_this.orderForm);
    _this.bundleItems(_this.orderForm);
    _this.addEditButtoninLogin();
  }
}

let fnsCheckout = new checkoutCustom();


$(function() {
  fnsCheckout.bind();
  
});

$(document).ajaxComplete(function() {
  fnsCheckout.init()
  console.log(">> initx")
})


$(window).on('hashchange', function() {
  fnsCheckout.updateStep();
  fnsCheckout.buildMiniCart();
  fnsCheckout.indexedInItems(vtexjs.checkout.orderForm);
  console.log(">> hashx")
});

$(window).on('orderFormUpdated.vtex', function(evt, orderForm) {
  fnsCheckout.update(orderForm);
  console.log(">> updatedx")
})
