import { PRODUCTS } from './common/utils.js'

function generatePayload(prefix) {
  return {
    prefix,
    postalCode: '33180',
    totalAmount: '$ 1,160.95',
    tax: '0',
    taxWithoutExemption: '$ 75.95',
    productPrice: '540.00',
    subTotal: '$ 1,080.00',
    productName: PRODUCTS.coconut,
    productQuantity: '2',
    totalProductPrice: '1085.00',
    totalWithoutTax: '$ 1,085.00',
  }
}

export default {
  pickupTestCase: generatePayload('Pickup'),
  checkoutScenario: generatePayload('checkoutScenario'),
  layoutScenario: generatePayload('layoutScenario'),
  testCustomJSAndCSS: generatePayload('Custom JS And CSS Scenario'),
}
