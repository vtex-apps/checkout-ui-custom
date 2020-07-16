/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/_js/_custom.js":
/*!****************************!*\
  !*** ./src/_js/_custom.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//custom\r\n\r\nclass customJs {\r\n  constructor() {\r\n  }\r\n  \r\n  // -- callback ajaxcomplete\r\n  ccAjaxComplete() {\r\n    \r\n  }\r\n  // -- callback orderuptaded\r\n  ccOrderFormUpdated(orderForm) {\r\n\r\n  }\r\n\r\n  init() {\r\n\r\n  }\r\n}\r\n\r\nmodule.exports = customJs;\n\n//# sourceURL=webpack:///./src/_js/_custom.js?");

/***/ }),

/***/ "./src/_js/_locale-infos.js":
/*!**********************************!*\
  !*** ./src/_js/_locale-infos.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports._locale = {\r\n\r\n  CAN: {\r\n    editLabel: \"Edit\",\r\n    paypalImg: \"\",\r\n    paypalPhone: \"1 (888) 221-1161\",\r\n    cartSubmitButton:\"Prooced to Payment\"\r\n  },\r\n  USA: {\r\n    editLabel: \"Edit\",\r\n    paypalImg: \"\",\r\n    paypalPhone: \"1 (888) 221-1161\",\r\n    cartSubmitButton:\"Prooced to Payment\"\r\n  },\r\n  \r\n  \r\n}\r\n \r\n\n\n//# sourceURL=webpack:///./src/_js/_locale-infos.js?");

/***/ }),

/***/ "./src/checkout6-custom.js":
/*!*********************************!*\
  !*** ./src/checkout6-custom.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { _locale } = __webpack_require__(/*! ./_js/_locale-infos.js */ \"./src/_js/_locale-infos.js\");\r\nconst _customJs = __webpack_require__(/*! ./_js/_custom.js */ \"./src/_js/_custom.js\");\r\nconst customJs = new _customJs();\r\n\r\n\r\nclass checkoutCustom {\r\n  constructor() {\r\n    this.type = \"vertical\"; // [\"vertical\"]\r\n    this.orderForm = \"\"; \r\n    this.orderId = this.orderForm ? this.orderForm.orderFormId : \"\";\r\n    this.lang = \"\";\r\n\r\n    this.accordionPayments = true;\r\n\r\n  }\r\n\r\n\r\n  general() {\r\n    if(!$(\".custom-cart-template-wrap\").length) $(\".cart-template.mini-cart .cart-fixed > *\").wrapAll('<div class=\"custom-cart-template-wrap\">');\r\n  \r\n    $(\".table.cart-items tbody tr.product-item\").each(function (w) {\r\n      if ($(this).find(\".v-custom-product-item-wrap\").length > 0) return false\r\n      $(this).find(\"> *\").wrapAll(`<div class=\"v-custom-product-item-wrap\">`)\r\n    })\r\n  }\r\n  \r\n  builder() {\r\n    let _this = this;\r\n    if(this.type==\"vertical\") {\r\n      _this.buildVertical()\r\n    } else if(this.type==\"horizontal\") {\r\n      _this.buildHorizontal()\r\n    } else {\r\n      console.error(\"No `type` identified, check your code\")\r\n    }\r\n  }\r\n\r\n  buildVertical() {\r\n    $(\"body\").addClass(\"body-cart-vertical\")\r\n    $(\".cart-template .cart-links-bottom:eq(0)\").appendTo(\".cart-template > .summary-template-holder\")\r\n    $(\".cart-template .cart-more-options:eq(0), .cart-template .extensions-checkout-buttons-container\").appendTo(\".cart-template-holder\")\r\n\r\n  }\r\n\r\n  buildHorizontal() {\r\n\r\n  }\r\n\r\n  checkEmpty(items) {\r\n    if(items.length==0) {\r\n      $(\"body\").addClass(\"v-custom-cart-empty\")\r\n    } else {\r\n      $(\"body\").removeClass(\"v-custom-cart-empty\")\r\n    }\r\n  }\r\n\r\n  addEditButtoninLogin() {\r\n    $(\"#v-custom-edit-login-data\").remove();\r\n    $(\".client-pre-email h3.client-pre-email-h span\").append(`\r\n      <a id=\"v-custom-edit-login-data\" class=\"link-box-edit btn btn-small\" style=\"\" title=\"${this.lang ? this.lang.editLabel:true}\">\r\n        <i class=\"icon-edit\"></i>\r\n        <i class=\"icon-spinner icon-spin icon-3x\"></i>\r\n      </a>\r\n    `);\r\n  }\r\n\r\n  addStepsHeader() {\r\n\r\n    if($(\".checkout-steps\").length>0) return false\r\n\r\n    let addStepsHeaderHtml = `\r\n      <div class=\"checkout-steps container-cart container\">\r\n        <div class=\"checkout-steps-wrap\">\r\n          <span class=\"checkout-steps_bar\">\r\n            <span class=\"checkout-steps_bar_inner\"></span>\r\n            <span class=\"checkout-steps_bar_inner-active\"></span>\r\n          </span>\r\n          <div class=\"checkout-steps_items\">\r\n            <span class=\"checkout-steps_item checkout-steps_item_cart\">\r\n              <span class=\"text\">Cart</span>\r\n            </span>\r\n            <span class=\"checkout-steps_item checkout-steps_item_identification\">\r\n              <span class=\"text\">Identification</span>\r\n            </span>\r\n            <span class=\"checkout-steps_item checkout-steps_item_shipping\">\r\n              <span class=\"text\">Shipping</span>\r\n            </span>\r\n            <span class=\"checkout-steps_item checkout-steps_item_payment\">\r\n              <span class=\"text\">Payment</span>\r\n            </span>\r\n            <span class=\"checkout-steps_item checkout-steps_item_confirmation\">\r\n              <span class=\"text\">Confirmation</span>\r\n            </span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    `;\r\n    \r\n    $(\".container.container-main\").before(addStepsHeaderHtml)\r\n  }\r\n\r\n  addAssemblies(orderForm) {\r\n    try {\r\n      $.each(orderForm.items, function(i) {\r\n        let _item = this;\r\n\r\n        if(_item.assemblies.length>0) {\r\n          let _assembliesHtml = `<div class=\"v-custom-assemblies\">`\r\n          $.each(_item.assemblies, function(w) {\r\n            let _assemblies = this;\r\n\r\n            let inptValues = _assemblies.inputValues;\r\n            _assembliesHtml += `<p>${_assemblies.id}</p>`;\r\n            _assembliesHtml += `<ul class=\"v-custom-assemblies__values\">`;\r\n              Object.entries(inptValues).forEach(([key, val]) => {\r\n                _assembliesHtml += `<li class=\"v-custom-assemblies__values__item assembly-${key.toLowerCase().replace(/ /g, \"-\")}\">\r\n                                      <strong>${key}</strong>\r\n                                      <span>${val.trim()}</span>\r\n                                    </li>`;\r\n              });\r\n            _assembliesHtml += `</ul>`;\r\n          })\r\n          _assembliesHtml += `</div>`;\r\n          $(`.table.cart-items tbody tr.product-item:eq(${i}) .v-custom-assemblies`).remove();\r\n          $(`.table.cart-items tbody tr.product-item:eq(${i})`).addClass(\"v-custom-assemblies-in\").find(\"td.product-name\").append(_assembliesHtml);\r\n        }\r\n\r\n      })\r\n    } catch(e) {\r\n\r\n    }\r\n    \r\n  }\r\n\r\n  bundleItems(orderForm) {\r\n    try {\r\n      $.each(orderForm.items, function (i) {\r\n        if (this.bundleItems.length > 0) {\r\n          $(`.table.cart-items tbody tr.product-item:eq(${i})`).addClass(\"v-custom-bundles-in\").find(\"td.product-name\");\r\n        } else {\r\n          $(`.table.cart-items tbody tr.product-item:eq(${i})`).removeClass(\"v-custom-bundles-in\");\r\n        }\r\n      });\r\n      $(\".table.cart-items tbody tr.item-service\").each(function (w) {\r\n        if ($(this).find(\".v-custom-trservice-wrap\").length > 0) return false\r\n        $(this).find(\"> *\").wrapAll(`<div class=\"v-custom-trservice-wrap\">`)\r\n      })\r\n    } catch (e) { }\r\n  }\r\n\r\n  buildMiniCart(orderForm) {\r\n    /* overode refresh from vtex */\r\n    let _this = this;\r\n    if (orderForm.items.filter(item => { return item.parentItemIndex != null }).length == 0) { return false; }\r\n    if ($(`.mini-cart .cart-items`).text().trim()!=\"\") {\r\n      $(`.mini-cart .cart-items`).html(`${$(`.mini-cart .cart-items`).html()}`);\r\n      $.each(orderForm.items, function (i) {\r\n        if (this.availability == \"available\") {\r\n          $(`.mini-cart .cart-items li:eq(${i})`).find(\".item-unavailable\").remove()\r\n        }\r\n      });\r\n    }\r\n\r\n  }\r\n  \r\n  removeMCLoader () { $(`.mini-cart .cart-items`).addClass(\"v-loaded\"); }\r\n  indexedInItems(orderForm) {\r\n    let _this = this;\r\n    try {\r\n      if (orderForm.items.filter(item => { return item.parentItemIndex != null }).length == 0) { _this.removeMCLoader(); return false;}\r\n      if (orderForm.items) {\r\n        $.each(orderForm.items, function (i) {\r\n          if (this.parentItemIndex!=null) {\r\n            $(`.table.cart-items tbody tr.product-item:eq(${i}), .mini-cart .cart-items li:eq(${i}) `).addClass(\"v-custom-indexed-item\")\r\n            //$(`.table.cart-items tbody tr.product-item:eq(${i})`).appendTo(`.table.cart-items tbody tr.product-item:eq(${this.parentItemIndex})`);\r\n            $(`.table.cart-items tbody tr.product-item:eq(${this.parentItemIndex}), .mini-cart .cart-items li:eq(${this.parentItemIndex})`).addClass(\"v-custom-indexedItems-in\");\r\n            \r\n            if ($(`.mini-cart .cart-items li`).length>0) {\r\n              $(`.mini-cart .cart-items li:eq(${i})`).appendTo(`.mini-cart .cart-items li:eq(${this.parentItemIndex})`);\r\n            }\r\n          }\r\n        });\r\n        _this.removeMCLoader();\r\n      }\r\n      \r\n    } catch (e) { _this.removeMCLoader(); }\r\n  }\r\n\r\n  update(orderForm) {\r\n    this.checkEmpty(orderForm.items);\r\n    this.addAssemblies(orderForm);\r\n    this.bundleItems(orderForm);\r\n    \r\n    this.buildMiniCart(orderForm);\r\n    this.indexedInItems(orderForm);\r\n    \r\n  }\r\n\r\n  updateStep() {\r\n\r\n    let prefixClass = \"v-custom-step-\";\r\n    let bClassStep = [\r\n      \"cart\",\r\n      \"email\",\r\n      \"profile\",\r\n      \"shipping\",\r\n      \"payment\"\r\n    ];\r\n\r\n    $(\"body\").removeClass(bClassStep.map(step => { return prefixClass+step }).join(\" \"))\r\n    if(window.location.hash) {\r\n      let hashstep = window.location.hash.split(\"/\")[1];\r\n      if(typeof bClassStep.find(st => { return st==hashstep })) {\r\n        $(\"body\").addClass(prefixClass+hashstep)\r\n      }\r\n    }\r\n    \r\n  }\r\n\r\n  updateLang(orderForm) {\r\n    this.lang = _locale[orderForm.storePreferencesData.countryCode];\r\n\r\n    if (!this.lang) return false;\r\n    const _lang = this.lang;\r\n\r\n    $(\".link-box-edit\").attr(\"title\", _lang.editLabel);\r\n\r\n    $(\"#cart-to-orderform\").text(_lang.cartSubmitButton)\r\n\r\n    //paypal\r\n    if (_lang.paypalImg) {\r\n      $(\".payment-paypal-title-short-logo\").css(\"background-image\", _lang.paypalImg);\r\n    } else if (_lang.paypalImg==\"\") {\r\n      $(\".payment-paypal-title-short-logo\").hide();\r\n    }\r\n    $(\".payment-paypal-help-number\").text(_lang.paypalPhone);\r\n  }\r\n\r\n  paymentBuilder() {\r\n    \r\n\r\n    if(this.accordionPayments) {\r\n      if ($(\".payment-group-list-btn\").find(\".v-custom-payment-item-wrap\").length > 0) return false\r\n\r\n      $(\".payment-group-item\").each(function(i) {\r\n        $(this).wrap(`<div class='v-custom-payment-item-wrap ${ $(this).hasClass(\"active\") ? \"active\" : \"\" }'></div>`);\r\n      });\r\n\r\n      $(\".payment-group-item\").each(function(i) {\r\n        $(`#payment-data .steps-view > div:eq(${0})`).appendTo($(this).closest(\".v-custom-payment-item-wrap\"));\r\n      });\r\n    }\r\n  }\r\n\r\n  bind() {\r\n    let _this = this;\r\n    $(\"body\").on(\"click\", \"#v-custom-edit-login-data\", function(e) {\r\n\r\n      e.preventDefault();\r\n\r\n      $(this).addClass(\"active\");\r\n\r\n      var data = null;\r\n      var xhr = new XMLHttpRequest();\r\n      xhr.addEventListener(\"readystatechange\", function () {\r\n        if (this.readyState === this.DONE) { \r\n          location.reload(); \r\n          setTimeout(function() {\r\n            $(\"#v-custom-edit-login-data\").removeClass(\"active\");\r\n          },1000)\r\n        }\r\n      });\r\n\r\n      xhr.open(\"GET\", `/checkout/changeToAnonymousUser/${_this.orderForm.orderFormId}`);\r\n      xhr.setRequestHeader(\"content-type\", \"application/json\");\r\n      xhr.setRequestHeader(\"accept\", \"application/json\");\r\n\r\n      xhr.send(data);\r\n\r\n\r\n    })\r\n\r\n    $(\"body\").on(\"click\", \".v-custom-payment-item-wrap\", function(e) {\r\n      $(\".v-custom-payment-item-wrap\").removeClass(\"active\")\r\n      $(this).addClass(\"active\")\r\n    });\r\n\r\n  }\r\n\r\n  init() {\r\n    let _this = this;\r\n    \r\n    _this.orderForm = vtexjs.checkout.orderForm ? vtexjs.checkout.orderForm : false;\r\n    _this.general();\r\n    _this.updateStep();\r\n    _this.addStepsHeader();\r\n    _this.builder();\r\n    _this.paymentBuilder();\r\n    if (_this.orderForm) {\r\n      _this.updateLang(_this.orderForm)\r\n      _this.addAssemblies(_this.orderForm);\r\n      _this.buildMiniCart(_this.orderForm);\r\n      _this.indexedInItems(_this.orderForm);\r\n      _this.bundleItems(_this.orderForm);\r\n    }\r\n    _this.addEditButtoninLogin();\r\n  } \r\n}\r\n\r\nwindow.vcustomCheckout = new checkoutCustom();  \r\n  \r\n \r\n$(function() {\r\n  vcustomCheckout.bind(); \r\n  customJs.init();\r\n});\r\n\r\n$(document).ajaxComplete(function() {\r\n  vcustomCheckout.init();\r\n  customJs.ccAjaxComplete();\r\n})\r\n\r\n\r\n$(window).on('hashchange', function() {\r\n  vcustomCheckout.updateStep();\r\n  vcustomCheckout.buildMiniCart(vtexjs.checkout.orderForm);\r\n  vcustomCheckout.indexedInItems(vtexjs.checkout.orderForm);\r\n});\r\n\r\n$(window).on('orderFormUpdated.vtex', function(evt, orderForm) {\r\n  vcustomCheckout.update(orderForm);\r\n  customJs.ccOrderFormUpdated(orderForm);\r\n})\r\n \r\n$(window).load(function() {\r\n  vcustomCheckout.init()\r\n})\n\n//# sourceURL=webpack:///./src/checkout6-custom.js?");

/***/ }),

/***/ "./src/checkout6-custom.scss":
/*!***********************************!*\
  !*** ./src/checkout6-custom.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"checkout6-custom.css\";\n\n//# sourceURL=webpack:///./src/checkout6-custom.scss?");

/***/ }),

/***/ 0:
/*!*******************************************************************!*\
  !*** multi ./src/checkout6-custom.js ./src/checkout6-custom.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/checkout6-custom.js */\"./src/checkout6-custom.js\");\nmodule.exports = __webpack_require__(/*! ./src/checkout6-custom.scss */\"./src/checkout6-custom.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/checkout6-custom.js_./src/checkout6-custom.scss?");

/***/ })

/******/ });