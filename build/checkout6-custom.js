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

/***/ "./src/_js/_debug.js":
/*!***************************!*\
  !*** ./src/_js/_debug.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\r\nclass debug {\r\n  constructor(dbg=false, logo='<img src=\"https://via.placeholder.com/160x60\">') {\r\n\r\n    this.classOn=\"debug-on\";\r\n\r\n    this.logo = logo;\r\n    this.headerHTML = `<header class=\"main-header debug-elem\"> <div class=\"container\"> <div class=\"header-link\"> <a href=\"/\" title=\"add more products\" class=\"buy-more-link link\">Continue shopping</a> <a href=\"/checkout/#/cart\" title=\"back to cart\" class=\"back-cart-link link\">Back to Cart</a> </div><a href=\"/\" title=\"Go to homepage\" class=\"logo\">${this.logo}</a> </div></header>`;\r\n    this.footerHTML = `<footer class=\"main-footer debug-elem\"> <div class=\"container\"> <svg class=\"vtex-logo\" height=\"40\" viewBox=\"0 0 115 58\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M48.2904 13.4951H20.8256C18.6959 13.4951 17.3322 15.7303 18.3287 17.5885L21.076 22.7244H16.0956C15.7802 22.7245 15.4701 22.805 15.1955 22.9581C14.9209 23.1112 14.6909 23.3318 14.528 23.5984C14.3651 23.865 14.2746 24.1686 14.2654 24.4799C14.2562 24.7911 14.3286 25.0994 14.4756 25.375L23.3121 41.8868C23.4679 42.1772 23.7009 42.4202 23.986 42.5897C24.2712 42.7592 24.5977 42.8488 24.9306 42.8488C25.2635 42.8488 25.59 42.7592 25.8752 42.5897C26.1603 42.4202 26.3933 42.1772 26.5491 41.8868L28.949 37.4266L31.9598 43.0541C33.0195 45.0333 35.8901 45.037 36.9535 43.0599L50.7197 17.4848C51.6927 15.6759 50.365 13.4951 48.2904 13.4951ZM35.9533 24.4223L30.0175 35.4525C29.9137 35.6456 29.7587 35.8072 29.5689 35.9198C29.3792 36.0325 29.162 36.0921 28.9405 36.0921C28.7191 36.0921 28.5019 36.0325 28.3122 35.9198C28.1224 35.8072 27.9674 35.6456 27.8636 35.4525L21.9851 24.4687C21.8868 24.2856 21.8382 24.0805 21.8437 23.8734C21.8493 23.6662 21.909 23.464 22.017 23.2863C22.125 23.1085 22.2776 22.9614 22.4601 22.859C22.6426 22.7566 22.8488 22.7025 23.0587 22.7019H34.9061C35.1107 22.7019 35.3119 22.7542 35.49 22.8537C35.6682 22.9532 35.8172 23.0965 35.9226 23.2697C36.028 23.4429 36.0862 23.64 36.0916 23.842C36.097 24.044 36.0493 24.2439 35.9533 24.4223Z\" fill=\"#F71963\" style=\" /* fill: #000; */\"></path><path d=\"M77.5031 25.3597H74.4988V35.5249C74.4986 35.6176 74.4613 35.7063 74.3949 35.7718C74.3286 35.8373 74.2387 35.8742 74.1448 35.8744H71.8279C71.7341 35.8742 71.6442 35.8373 71.5779 35.7718C71.5115 35.7063 71.4742 35.6176 71.474 35.5249V25.3597H68.4521C68.4066 25.3616 68.3612 25.3544 68.3186 25.3385C68.2759 25.3227 68.2369 25.2986 68.2039 25.2677C68.1709 25.2367 68.1445 25.1995 68.1264 25.1583C68.1082 25.117 68.0986 25.0726 68.0981 25.0277V23.2297C68.0986 23.1847 68.1082 23.1403 68.1264 23.0991C68.1445 23.0578 68.1709 23.0206 68.2039 22.9897C68.2369 22.9587 68.2759 22.9346 68.3186 22.9188C68.3612 22.903 68.4066 22.8958 68.4521 22.8976H77.5023C77.5961 22.8933 77.6879 22.9257 77.7575 22.988C77.8271 23.0502 77.869 23.1371 77.8739 23.2297V25.0284C77.8688 25.1207 77.827 25.2073 77.7575 25.2693C77.6881 25.3314 77.5966 25.3639 77.5031 25.3597Z\" fill=\"#F71963\"></path><path d=\"M87.1474 35.8013C86.5284 35.8883 85.487 36.0283 83.577 36.0283C81.2953 36.0283 79.2795 35.4519 79.2795 32.2742V26.4742C79.2795 23.2965 81.3137 22.7375 83.5946 22.7375C85.5039 22.7375 86.5284 22.8775 87.1474 22.9645C87.3949 22.9993 87.5014 23.087 87.5014 23.3139V24.9401C87.5012 25.0327 87.4638 25.1215 87.3975 25.187C87.3312 25.2525 87.2412 25.2894 87.1474 25.2896H83.4184C82.5871 25.2896 82.2867 25.5687 82.2867 26.4771V28.0663H87.0064C87.1002 28.0665 87.1902 28.1034 87.2565 28.1689C87.3228 28.2344 87.3602 28.3231 87.3604 28.4158V30.0746C87.3602 30.1672 87.3228 30.2559 87.2565 30.3214C87.1902 30.3869 87.1002 30.4238 87.0064 30.424H82.2867V32.2749C82.2867 33.1826 82.5871 33.4625 83.4184 33.4625H87.1474C87.2412 33.4627 87.3312 33.4995 87.3975 33.565C87.4638 33.6305 87.5012 33.7193 87.5014 33.8119V35.4359C87.5014 35.6614 87.3949 35.7665 87.1474 35.8013Z\" fill=\"#F71963\"></path><path d=\"M100.491 35.8709H97.6795C97.4497 35.8709 97.3432 35.7984 97.2198 35.6091L94.7818 31.7877L92.5728 35.525C92.4487 35.7346 92.3253 35.8745 92.1322 35.8745H89.515C89.338 35.8745 89.2499 35.7694 89.2499 35.6476C89.2533 35.6048 89.2653 35.5632 89.2851 35.525L93.1162 29.2175L89.2455 23.2283C89.2258 23.1963 89.2138 23.1604 89.2102 23.1232C89.2165 23.059 89.2476 22.9997 89.2969 22.9575C89.3462 22.9153 89.4101 22.8933 89.4753 22.8963H92.3224C92.517 22.8963 92.6587 23.071 92.763 23.2283L95.0256 26.7554L97.2154 23.2283C97.3035 23.071 97.4629 22.8963 97.656 22.8963H100.273C100.338 22.8933 100.402 22.9153 100.452 22.9575C100.501 22.9997 100.532 23.059 100.538 23.1232C100.535 23.1604 100.523 23.1963 100.503 23.2283L96.6514 29.2545L100.668 35.525C100.7 35.5783 100.718 35.6382 100.721 35.6998C100.722 35.8013 100.633 35.8709 100.491 35.8709Z\" fill=\"#F71963\"></path><path d=\"M63.8595 22.9324C63.7964 22.9325 63.7352 22.9543 63.6865 22.9939C63.6377 23.0336 63.6044 23.0887 63.5922 23.1499L61.0249 32.5306C60.9896 32.7228 60.9368 32.7924 60.7774 32.7924C60.6181 32.7924 60.5652 32.7199 60.5299 32.5306L57.9597 23.1477C57.9475 23.0865 57.9142 23.0314 57.8654 22.9918C57.8167 22.9521 57.7555 22.9303 57.6924 22.9302H55.1655C55.1244 22.9302 55.0838 22.9394 55.0468 22.9571C55.0098 22.9747 54.9773 23.0004 54.9518 23.0322C54.9262 23.064 54.9083 23.101 54.8993 23.1406C54.8902 23.1802 54.8904 23.2213 54.8996 23.2608C54.8996 23.2608 58.0353 34.0191 58.0698 34.1249C58.4884 35.4067 59.504 36.0193 60.7965 36.0193C62.0273 36.0193 63.1017 35.3777 63.5217 34.1285C63.5716 33.9835 66.6376 23.2601 66.6376 23.2601C66.6467 23.2206 66.6468 23.1796 66.6377 23.1401C66.6286 23.1006 66.6106 23.0636 66.5851 23.032C66.5595 23.0003 66.5271 22.9747 66.4902 22.957C66.4532 22.9394 66.4128 22.9302 66.3717 22.9302L63.8595 22.9324Z\" fill=\"#F71963\"></path><path d=\"M48.2904 13.4951H20.8256C18.6959 13.4951 17.3322 15.7303 18.3287 17.5885L21.076 22.7244H16.0956C15.7802 22.7245 15.4701 22.805 15.1955 22.9581C14.9209 23.1112 14.6909 23.3318 14.528 23.5984C14.3651 23.865 14.2746 24.1686 14.2654 24.4799C14.2562 24.7911 14.3286 25.0994 14.4756 25.375L23.3121 41.8868C23.4679 42.1772 23.7009 42.4202 23.986 42.5897C24.2712 42.7592 24.5977 42.8488 24.9306 42.8488C25.2635 42.8488 25.59 42.7592 25.8752 42.5897C26.1603 42.4202 26.3933 42.1772 26.5491 41.8868L28.949 37.4266L31.9598 43.0541C33.0195 45.0333 35.8901 45.037 36.9535 43.0599L50.7197 17.4848C51.6927 15.6759 50.365 13.4951 48.2904 13.4951ZM35.9533 24.4223L30.0175 35.4525C29.9137 35.6456 29.7587 35.8072 29.5689 35.9198C29.3792 36.0325 29.162 36.0921 28.9405 36.0921C28.7191 36.0921 28.5019 36.0325 28.3122 35.9198C28.1224 35.8072 27.9674 35.6456 27.8636 35.4525L21.9851 24.4687C21.8868 24.2856 21.8382 24.0805 21.8437 23.8734C21.8493 23.6662 21.909 23.464 22.017 23.2863C22.125 23.1085 22.2776 22.9614 22.4601 22.859C22.6426 22.7566 22.8488 22.7025 23.0587 22.7019H34.9061C35.1107 22.7019 35.3119 22.7542 35.49 22.8537C35.6682 22.9532 35.8172 23.0965 35.9226 23.2697C36.028 23.4429 36.0862 23.64 36.0916 23.842C36.097 24.044 36.0493 24.2439 35.9533 24.4223Z\" fill=\"#F71963\"></path></svg> </div></footer>`;\r\n  }\r\n  headernFooter() {\r\n    $(\"body\").prepend(this.headerHTML);\r\n    $(\"body\").append(this.footerHTML);\r\n  }\r\n  start() {\r\n    $(\"body\").addClass(this.classOn)\r\n    this.headernFooter();\r\n    console.log(\"%c >>>>> YOU ARE CURRENTLY DEBUGING THE HEADER, IT'S A BETA! ISSUES CAN HAPPEN... Use `vcustom.debug.stop()` to stop! \", 'background: #111; color: #bada55');\r\n  }\r\n  stop() {\r\n    $(\"body\").removeClass(this.classOn)\r\n    $(\".debug-elem\").remove()\r\n  }\r\n}\r\n\r\nmodule.exports = debug;\n\n//# sourceURL=webpack:///./src/_js/_debug.js?");

/***/ }),

/***/ "./src/_js/_locale-infos.js":
/*!**********************************!*\
  !*** ./src/_js/_locale-infos.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports._locale = {\r\n  \r\n  BRA: {\r\n    editLabel: \"Editar\",\r\n    deliveryDateText:\"Entrega até\",\r\n    PickupDateText:\"Pronto até\"\r\n  },\r\n  CAN: {\r\n    editLabel: \"Edit\",\r\n    paypalImg: \"\",\r\n    paypalPhone: \"1 (888) 221-1161\",\r\n    cartSubmitButton:\"Prooced to Payment\",\r\n    deliveryDateText:\"Arrives by\",\r\n    PickupDateText:\"Ready by\"\r\n  },\r\n  USA: {\r\n    editLabel: \"Edit\",\r\n    paypalImg: \"\",\r\n    paypalPhone: \"1 (888) 221-1161\",\r\n    cartSubmitButton:\"Prooced to Payment\",\r\n    deliveryDateText:\"Arrives by\",\r\n    PickupDateText:\"Ready by\"\r\n  },\r\n\r\n}\r\n \r\n\n\n//# sourceURL=webpack:///./src/_js/_locale-infos.js?");

/***/ }),

/***/ "./src/_js/_v.custom.checkout.ui.js":
/*!******************************************!*\
  !*** ./src/_js/_v.custom.checkout.ui.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { _locale } = __webpack_require__(/*! ./_locale-infos.js */ \"./src/_js/_locale-infos.js\");\r\n\r\n\r\nclass checkoutCustom {\r\n  constructor({\r\n    type = \"vertical\", \r\n    accordionPayments = true, \r\n    deliveryDateFormat = false\r\n  } = {}) {\r\n    this.type = type; // [\"vertical\"]\r\n    this.orderForm = \"\"; \r\n    this.orderId = this.orderForm ? this.orderForm.orderFormId : \"\";\r\n    this.lang = \"\";\r\n\r\n    this.accordionPayments = accordionPayments;\r\n    this.deliveryDateFormat = deliveryDateFormat;\r\n\r\n  } \r\n\r\n\r\n  general() {\r\n    if(!$(\".custom-cart-template-wrap\").length) $(\".cart-template.mini-cart .cart-fixed > *\").wrapAll('<div class=\"custom-cart-template-wrap\">');\r\n  \r\n    $(\".table.cart-items tbody tr.product-item\").each(function (w) {\r\n      if ($(this).find(\".v-custom-product-item-wrap\").length > 0) return false\r\n      $(this).find(\"> *\").wrapAll(`<div class=\"v-custom-product-item-wrap\">`)\r\n    })\r\n  }\r\n  \r\n  builder() {\r\n    let _this = this;\r\n    if(this.type==\"vertical\") {\r\n      _this.buildVertical()\r\n    } else if(this.type==\"horizontal\") {\r\n      _this.buildHorizontal()\r\n    } else {\r\n      console.error(\"No `type` identified, check your code\")\r\n    }\r\n  }\r\n\r\n  buildVertical() {\r\n    $(\"body\").addClass(\"body-cart-vertical\")\r\n    $(\".cart-template .cart-links-bottom:eq(0)\").appendTo(\".cart-template > .summary-template-holder\")\r\n    $(\".cart-template .cart-more-options:eq(0), .cart-template .extensions-checkout-buttons-container\").appendTo(\".cart-template-holder\")\r\n\r\n  }\r\n\r\n  buildHorizontal() {\r\n\r\n  }\r\n\r\n  checkEmpty(items) {\r\n    if(items.length==0) {\r\n      $(\"body\").addClass(\"v-custom-cart-empty\")\r\n    } else {\r\n      $(\"body\").removeClass(\"v-custom-cart-empty\")\r\n    }\r\n  }\r\n\r\n  addEditButtoninLogin() {\r\n    $(\"#v-custom-edit-login-data\").remove();\r\n    $(\".client-pre-email h3.client-pre-email-h span\").append(`\r\n      <a id=\"v-custom-edit-login-data\" class=\"link-box-edit btn btn-small\" style=\"\" title=\"${this.lang ? this.lang.editLabel:true}\">\r\n        <i class=\"icon-edit\"></i>\r\n        <i class=\"icon-spinner icon-spin icon-3x\"></i>\r\n      </a>\r\n    `);\r\n  }\r\n\r\n  addStepsHeader() {\r\n\r\n    if($(\".checkout-steps\").length>0) return false\r\n\r\n    let addStepsHeaderHtml = `\r\n      <div class=\"checkout-steps\">\r\n        <div class=\"checkout-steps-wrap\">\r\n          <span class=\"checkout-steps_bar\">\r\n            <span class=\"checkout-steps_bar_inner\"></span>\r\n            <span class=\"checkout-steps_bar_inner-active\"></span>\r\n          </span>\r\n          <div class=\"checkout-steps_items\">\r\n            <span class=\"checkout-steps_item checkout-steps_item_cart\">\r\n              <span class=\"text\">Cart</span>\r\n            </span>\r\n            <span class=\"checkout-steps_item checkout-steps_item_identification\">\r\n              <span class=\"text\">Identification</span>\r\n            </span>\r\n            <span class=\"checkout-steps_item checkout-steps_item_shipping\">\r\n              <span class=\"text\">Shipping</span>\r\n            </span>\r\n            <span class=\"checkout-steps_item checkout-steps_item_payment\">\r\n              <span class=\"text\">Payment</span>\r\n            </span>\r\n            <span class=\"checkout-steps_item checkout-steps_item_confirmation\">\r\n              <span class=\"text\">Confirmation</span>\r\n            </span>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    `;\r\n    if($(\"header.main-header\").length) $(\"header.main-header .container\").append(addStepsHeaderHtml)\r\n  }\r\n\r\n  addAssemblies(orderForm) {\r\n    try {\r\n      $.each(orderForm.items, function(i) {\r\n        let _item = this;\r\n\r\n        if(_item.assemblies.length>0) {\r\n          let _assembliesHtml = `<div class=\"v-custom-assemblies\">`\r\n          $.each(_item.assemblies, function(w) {\r\n            let _assemblies = this;\r\n\r\n            let inptValues = _assemblies.inputValues;\r\n            _assembliesHtml += `<p>${_assemblies.id}</p>`;\r\n            _assembliesHtml += `<ul class=\"v-custom-assemblies__values\">`;\r\n              Object.entries(inptValues).forEach(([key, val]) => {\r\n                _assembliesHtml += `<li class=\"v-custom-assemblies__values__item assembly-${key.toLowerCase().replace(/ /g, \"-\")}\">\r\n                                      <strong>${key}</strong>\r\n                                      <span>${val.trim()}</span>\r\n                                    </li>`;\r\n              });\r\n            _assembliesHtml += `</ul>`;\r\n          })\r\n          _assembliesHtml += `</div>`;\r\n          $(`.table.cart-items tbody tr.product-item:eq(${i}) .v-custom-assemblies`).remove();\r\n          $(`.table.cart-items tbody tr.product-item:eq(${i})`).addClass(\"v-custom-assemblies-in\").find(\"td.product-name\").append(_assembliesHtml);\r\n        }\r\n\r\n      })\r\n    } catch(e) {\r\n\r\n    }\r\n    \r\n  }\r\n\r\n  bundleItems(orderForm) {\r\n    try {\r\n      $.each(orderForm.items, function (i) {\r\n        if (this.bundleItems.length > 0) {\r\n          $(`.table.cart-items tbody tr.product-item:eq(${i})`).addClass(\"v-custom-bundles-in\").find(\"td.product-name\");\r\n        } else {\r\n          $(`.table.cart-items tbody tr.product-item:eq(${i})`).removeClass(\"v-custom-bundles-in\");\r\n        }\r\n      });\r\n      $(\".table.cart-items tbody tr.item-service\").each(function (w) {\r\n        if ($(this).find(\".v-custom-trservice-wrap\").length > 0) return false\r\n        $(this).find(\"> *\").wrapAll(`<div class=\"v-custom-trservice-wrap\">`)\r\n      })\r\n    } catch (e) { }\r\n  }\r\n\r\n  buildMiniCart(orderForm) {\r\n    /* overode refresh from vtex */\r\n    let _this = this;\r\n    if (orderForm.items.filter(item => { return item.parentItemIndex != null }).length == 0) { return false; }\r\n    if ($(`.mini-cart .cart-items`).text().trim()!=\"\") {\r\n      $(`.mini-cart .cart-items`).html(`${$(`.mini-cart .cart-items`).html()}`);\r\n      $.each(orderForm.items, function (i) {\r\n        if (this.availability == \"available\") {\r\n          $(`.mini-cart .cart-items li:eq(${i})`).find(\".item-unavailable\").remove()\r\n        }\r\n      });\r\n    }\r\n\r\n  }\r\n  \r\n  removeMCLoader () { $(`.mini-cart .cart-items`).addClass(\"v-loaded\"); }\r\n  indexedInItems(orderForm) {\r\n    let _this = this;\r\n    try {\r\n      if (orderForm.items.filter(item => { return item.parentItemIndex != null }).length == 0) { _this.removeMCLoader(); return false;}\r\n      if (orderForm.items) {\r\n        $.each(orderForm.items, function (i) {\r\n          if (this.parentItemIndex!=null) {\r\n            $(`.table.cart-items tbody tr.product-item:eq(${i}), .mini-cart .cart-items li:eq(${i}) `).addClass(\"v-custom-indexed-item\")\r\n            //$(`.table.cart-items tbody tr.product-item:eq(${i})`).appendTo(`.table.cart-items tbody tr.product-item:eq(${this.parentItemIndex})`);\r\n            $(`.table.cart-items tbody tr.product-item:eq(${this.parentItemIndex}), .mini-cart .cart-items li:eq(${this.parentItemIndex})`).addClass(\"v-custom-indexedItems-in\");\r\n            \r\n            if ($(`.mini-cart .cart-items li`).length>0) {\r\n              $(`.mini-cart .cart-items li:eq(${i})`).appendTo(`.mini-cart .cart-items li:eq(${this.parentItemIndex})`);\r\n            }\r\n          }\r\n        });\r\n        _this.removeMCLoader();\r\n      }\r\n      \r\n    } catch (e) { _this.removeMCLoader(); }\r\n  }\r\n\r\n  \r\n  addBusinessDays(n, lang = i18n.options.lng) {\r\n    let _this = this;\r\n    let d = new Date();\r\n    d = new Date(d.getTime());\r\n    let day = d.getDay();\r\n    d.setDate(d.getDate() + n + (day === 6 ? 2 : +!day) + (Math.floor((n - 1 + (day % 6 || 1)) / 5) * 2));\r\n    \r\n    let doptions = { weekday: 'long', month: 'short', day: 'numeric' };\r\n\r\n    if(lang==\"pt\") doptions = { weekday: 'short', month: 'short', day: 'numeric' };\r\n\r\n    d = d.toLocaleDateString(lang, doptions);\r\n  \r\n\r\n    return d\r\n  }\r\n\r\n  changeShippingTimeInfo() {\r\n    let _this = this;\r\n    $(\"body\").addClass(\"v-custom-changeShippingTimeInfo\");\r\n    let mainSTIelems = [\r\n      \".shp-summary-package-time > span\", \r\n      \"p.vtex-omnishipping-1-x-sla.sla\", \r\n      \".vtex-omnishipping-1-x-leanShippingTextLabelSingle > span\",\r\n      \"span.shipping-date\",\r\n      \".shp-option-text-time\",\r\n      \".pkpmodal-pickup-point-sla\"\r\n    ];\r\n    try {\r\n      $(`\r\n        .vtex-omnishipping-1-x-summaryPackage.shp-summary-package:not(.v-changeShippingTimeInfo-active), \r\n        .vtex-omnishipping-1-x-leanShippingOption, \r\n        .vtex-omnishipping-1-x-packageItem:not(.v-changeShippingTimeInfo-active),\r\n        .orderform-template .cart-template.mini-cart .item,\r\n        .vtex-pickup-points-modal-3-x-pickupPointSlaAvailability        \r\n      `).each(function(i) {\r\n        let days = parseInt($(this).find(mainSTIelems.map(elem => elem+\":not(.v-changeShippingTimeInfo-elem-active)\").join(\", \")).text().match(/\\d+/));\r\n        if(days) {\r\n          let _delivtext = _this.lang.deliveryDateText;\r\n          if(!! $(this).find(mainSTIelems.join(\", \")).text().toLowerCase().match(/(ready in up)|(pronto)/gm)) _delivtext = _this.lang.PickupDateText; // check if is pickup. OBS: none of others solutions worked, needs constantly update\r\n          $(this).find(mainSTIelems.join(\", \")).html(`${_delivtext} <strong>${_this.addBusinessDays(days)}</strong>`).addClass(\"v-changeShippingTimeInfo-elem-active\");\r\n        }\r\n        $(this).addClass(\"v-changeShippingTimeInfo-active\");\r\n      });\r\n    } catch(e) {}\r\n  }\r\n\r\n  changeShippingTimeInfoInit() {\r\n    let _this = this;\r\n    if(_this.lang && _this.deliveryDateFormat) {\r\n      _this.changeShippingTimeInfo();\r\n    }\r\n  }\r\n\r\n  update(orderForm) {\r\n    this.checkEmpty(orderForm.items);\r\n    this.addAssemblies(orderForm);\r\n    this.bundleItems(orderForm);\r\n    \r\n    this.buildMiniCart(orderForm);\r\n    this.indexedInItems(orderForm);\r\n    \r\n  }\r\n\r\n  updateStep() {\r\n\r\n    let prefixClass = \"v-custom-step-\";\r\n    let bClassStep = [\r\n      \"cart\",\r\n      \"email\",\r\n      \"profile\",\r\n      \"shipping\",\r\n      \"payment\"\r\n    ];\r\n\r\n    $(\"body\").removeClass(bClassStep.map(step => { return prefixClass+step }).join(\" \"))\r\n    if(window.location.hash) {\r\n      let hashstep = window.location.hash.split(\"/\")[1];\r\n      if(typeof bClassStep.find(st => { return st==hashstep })) {\r\n        $(\"body\").addClass(prefixClass+hashstep)\r\n      }\r\n    }\r\n    \r\n  }\r\n\r\n  updateLang(orderForm) {\r\n    this.lang = _locale[orderForm.storePreferencesData.countryCode];\r\n\r\n    if (!this.lang) return false;\r\n    const _lang = this.lang;\r\n\r\n    if(_lang.editLabel)  $(\".link-box-edit\").attr(\"title\", _lang.editLabel);\r\n    if(_lang.cartSubmitButton) $(\"#cart-to-orderform\").text(_lang.cartSubmitButton)\r\n\r\n    //paypal\r\n    if(_lang.paypalPhone) $(\".payment-paypal-help-number\").text(_lang.paypalPhone);\r\n\r\n    if (_lang.paypalImg) {\r\n      $(\".payment-paypal-title-short-logo\").css(\"background-image\", _lang.paypalImg);\r\n    } else if (_lang.paypalImg==\"\") {\r\n      $(\".payment-paypal-title-short-logo\").hide();\r\n    }\r\n    \r\n  }\r\n\r\n  paymentBuilder() {\r\n    \r\n\r\n    if(this.accordionPayments) {\r\n      $(\"body\").addClass(\"v-custom-paymentBuilder-accordion\");\r\n      \r\n      if ($(\".payment-group-list-btn\").find(\".v-custom-payment-item-wrap\").length > 0) return false\r\n\r\n      $(\".payment-group-item\").each(function(i) {\r\n        $(this).wrap(`<div class='v-custom-payment-item-wrap ${ $(this).hasClass(\"active\") ? \"active\" : \"\" }'></div>`);\r\n      });\r\n\r\n      $(\".payment-group-item\").each(function(i) {\r\n        $(`#payment-data .steps-view > div:eq(${0})`).appendTo($(this).closest(\".v-custom-payment-item-wrap\"));\r\n      });\r\n    }\r\n  }\r\n\r\n  bind() {\r\n    let _this = this;\r\n    $(\"body\").on(\"click\", \"#v-custom-edit-login-data\", function(e) {\r\n\r\n      e.preventDefault();\r\n\r\n      $(this).addClass(\"active\");\r\n\r\n      var data = null;\r\n      var xhr = new XMLHttpRequest();\r\n      xhr.addEventListener(\"readystatechange\", function () {\r\n        if (this.readyState === this.DONE) { \r\n          location.reload(); \r\n          setTimeout(function() {\r\n            $(\"#v-custom-edit-login-data\").removeClass(\"active\");\r\n          },1000)\r\n        }\r\n      });\r\n\r\n      xhr.open(\"GET\", `/checkout/changeToAnonymousUser/${_this.orderForm.orderFormId}`);\r\n      xhr.setRequestHeader(\"content-type\", \"application/json\");\r\n      xhr.setRequestHeader(\"accept\", \"application/json\");\r\n\r\n      xhr.send(data);\r\n\r\n\r\n    })\r\n\r\n    $(\"body\").on(\"click\", \".v-custom-payment-item-wrap\", function(e) {\r\n      $(\".v-custom-payment-item-wrap\").removeClass(\"active\")\r\n      $(this).addClass(\"active\")\r\n    });\r\n\r\n    $(\"body\").on(\"click\", \".vtex-pickup-points-modal-3-x-pickupDetailsHeaderButton, #map-canvas img, .vtex-omnishipping-1-x-pickupPointChange, .pkpmodal-pickup-point, .vtex-pickup-points-modal-3-x-modalDetailsBackLnk\", function(e) {\r\n      setTimeout(() => {\r\n        _this.changeShippingTimeInfoInit();\r\n      }, 100);\r\n    });\r\n\r\n  }\r\n\r\n  init() {\r\n    let _this = this;\r\n    \r\n    _this.orderForm = vtexjs.checkout.orderForm ? vtexjs.checkout.orderForm : false;\r\n    _this.general();\r\n    _this.updateStep();\r\n    _this.addStepsHeader();\r\n    _this.builder();\r\n    _this.paymentBuilder();\r\n    _this.changeShippingTimeInfoInit();\r\n    if (_this.orderForm) {\r\n      _this.updateLang(_this.orderForm)\r\n      _this.addAssemblies(_this.orderForm);\r\n      _this.buildMiniCart(_this.orderForm);\r\n      _this.indexedInItems(_this.orderForm);\r\n      _this.bundleItems(_this.orderForm);\r\n    }\r\n    _this.addEditButtoninLogin();\r\n  }\r\n  \r\n  start() {\r\n    let _this = this;\r\n    $(function() {\r\n      _this.bind(); \r\n    });\r\n\r\n    $(document).ajaxComplete(function() {\r\n      _this.init();\r\n    })\r\n\r\n\r\n    $(window).on('hashchange', function() {\r\n      _this.updateStep();\r\n      _this.changeShippingTimeInfoInit()\r\n      _this.paymentBuilder();\r\n      if(_this.orderForm) {\r\n        _this.buildMiniCart(_this.orderForm);\r\n        _this.indexedInItems(_this.orderForm);\r\n      }\r\n    });\r\n\r\n    $(window).on('orderFormUpdated.vtex', function(evt, orderForm) {\r\n      _this.update(orderForm);\r\n    })\r\n  }\r\n}\r\n\r\nmodule.exports = checkoutCustom;\r\n\r\n\n\n//# sourceURL=webpack:///./src/_js/_v.custom.checkout.ui.js?");

/***/ }),

/***/ "./src/checkout6-custom.js":
/*!*********************************!*\
  !*** ./src/checkout6-custom.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\r\n\r\nconst debug = __webpack_require__(/*! ./_js/_debug.js */ \"./src/_js/_debug.js\");\r\nconst checkoutCustom = __webpack_require__(/*! ./_js/_v.custom.checkout.ui.js */ \"./src/_js/_v.custom.checkout.ui.js\");\r\n\r\nwindow.vcustom = {\r\n  checkout: new checkoutCustom({\r\n    type: \"vertical\", //[\"vertical\" , \"horizontal\"]\r\n    accordionPayments: true, \r\n    deliveryDateFormat: true\r\n  }),\r\n  debug: new debug(false)\r\n}\r\n\r\nvcustom.checkout.start(); \r\n\r\n\r\n//\r\n\n\n//# sourceURL=webpack:///./src/checkout6-custom.js?");

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