import { verifySettings } from '../../support/checkout-ui-custom'
import {
  preserveCookie,
  testSetup,
  updateRetry,
} from '../../support/common/support'
import { updateSettings } from '../../support/configuration'
import { singleProduct } from '../../support/common/outputvalidation'

const CONFIG = 'config'

describe('Testing -> Disable display setting', () => {
  const { productName, postalCode } = singleProduct

  testSetup()

  it('Update Settings', updateRetry(3), () => {
    cy.getCheckOutItems().then(items => {
      const configurations = items[CONFIG]

      configurations.layout.accordionPayments = true
      configurations.layout.deliveryDateFormat = true
      configurations.layout.showCartQuantityPrice = true
      configurations.layout.showNoteField = true
      configurations.layout.hideEmailStep = true
      configurations.layout.customAddressForm = true

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
      cy.updateShippingInformation({ postalCode })
    }
  )

  it(`display google address form format`, updateRetry(2), () => {
    cy.get('.checkout-steps_item_cart').click()
  })

  verifySettings('Enable', true)
  preserveCookie()
})
