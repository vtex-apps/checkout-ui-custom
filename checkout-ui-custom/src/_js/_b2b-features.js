/* eslint-disable no-console */
function buildPOField(lang) {
  if ($('.b2b-purchase-order-number-label').length > 0) return false

  const wrap = $('.payment-confirmation-wrap')

  wrap.prepend(`
  <div class="b2b-purchase-order-number">
  <p class="b2b-purchase-order-number-label">
  <label for="cart-b2b-purchase-order-number">${
    lang ? this.lang.cartPurchaseOrderLabel : 'Reference or PO Number'
  }</label>
  </p>
  <input class="input-small b2b-purchase-order-number-input" type="text" id="cart-b2b-purchase-order-number">
  </div>
  `)

  $('body').on('change', '#cart-b2b-purchase-order-number', function (e) {
    e.preventDefault()

    const orderFormID = vtexjs.checkout.orderFormId
    const purchaseOrderNumber = $(this).val()

    $.ajax({
      url: `${window.location.origin}/api/checkout/pub/orderForm/${orderFormID}/customData/b2b-checkout-ui-custom/purchaseOrderNumber`,
      type: purchaseOrderNumber ? 'PUT' : 'DELETE',
      data: { value: purchaseOrderNumber },
    })
  })
}

module.exports = { buildPOField }
