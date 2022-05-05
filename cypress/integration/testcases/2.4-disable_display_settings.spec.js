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

      configurations.layout.accordionPayments = false
      configurations.layout.deliveryDateFormat = false
      configurations.layout.showCartQuantityPrice = false
      configurations.layout.showNoteField = false
      configurations.layout.hideEmailStep = false
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

  it(
    'Updating Shipping Information for pick up in store',
    updateRetry(3),
    () => {
      // Update Shipping Section
      cy.updateShippingInformation({ postalCode })
    }
  )
  verifySettings('Disable', false)
  preserveCookie()
})
