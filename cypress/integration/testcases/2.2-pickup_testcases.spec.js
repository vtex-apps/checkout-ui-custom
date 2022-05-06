import {
  preserveCookie,
  testSetup,
  updateRetry,
} from '../../support/common/support'
import { singleProduct } from '../../support/common/outputvalidation'
import { orderProduct } from '../../support/checkout-ui-custom'
import { updateSettings } from '../../support/configuration'

const CONFIG = 'config'

describe('Testing single product and total amounts', () => {
  const { productName, postalCode } = singleProduct

  // Load test setup
  testSetup()

  it('Update Settings', updateRetry(3), () => {
    cy.getCheckOutItems().then(items => {
      const configurations = items[CONFIG]

      configurations.layout.accordionPayments = false
      configurations.layout.deliveryDateFormat = false
      configurations.layout.showCartQuantityPrice = false
      configurations.layout.showNoteField = false
      configurations.layout.hideEmailStep = true
      configurations.layout.customAddressForm = false

      updateSettings(configurations)
    })
  })

  it('Adding Product to Cart', updateRetry(3), () => {
    // Search the product
    cy.searchProduct(productName)
    // Add product to cart
    cy.addProduct(productName, {
      proceedtoCheckout: true,
    })
  })

  it('Updating product quantity to 2', updateRetry(3), () => {
    // Update Product quantity to 2
    cy.updateProductQuantity(singleProduct, {
      quantity: '2',
    })
  })

  it(
    'Updating Shipping Information for pick up in store',
    updateRetry(3),
    () => {
      // Update Shipping Section
      cy.updateShippingInformation({ postalCode, pickup: true })
    }
  )

  orderProduct()
  preserveCookie()
})
