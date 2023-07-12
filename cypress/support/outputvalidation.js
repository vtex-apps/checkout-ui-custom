import { PRODUCTS } from './common/utils.js'

function generatePayload(prefix) {
  return {
    prefix,
    postalCode: '33180',
    totalAmount: '$ 1,160.95',
    productPrice: '540.00',
    subTotal: '$ 1,080.00',
    productName: PRODUCTS.coconut,
  }
}

export default {
  pickupTestCase: generatePayload('Pickup'),
  discountProduct: {
    // custom JS and CSS + Add/remove product + Update product quantity 1
    prefix: 'discountProduct',
    postalCode: '33180',
    productPrice: '100.00',
    totalAmount: '$ 101.65',
    subTotal: '$ 200.00',
    productName: PRODUCTS.cauliflower,
  },
  layoutScenario: generatePayload('layoutScenario'),
  testCustomJSAndCSS: generatePayload('Custom JS And CSS Scenario'),
}
