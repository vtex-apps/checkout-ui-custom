import {
  preserveCookie,
  testSetup,
  updateRetry,
} from '../support/common/support.js'
import { pickupTestCase } from '../support/outputvalidation.js'
import { orderProduct } from '../support/testcase.js'

const { productName, postalCode, prefix } = pickupTestCase

describe(`${prefix} Scenario`, () => {
  // Load test setup
  testSetup()

  it(`${prefix} - Adding Product to Cart`, updateRetry(1), () => {
    // Search the product
    cy.searchProduct(productName)
    // Add product to cart
    cy.addProduct(productName, {
      proceedtoCheckout: true,
    })
  })

  it(
    `${prefix} - Updating Shipping Information for pick up in store`,
    updateRetry(3),
    () => {
      // Update Shipping Section
      cy.updateShippingInformation({ postalCode, pickup: true })
    }
  )

  orderProduct(prefix)
  preserveCookie()
})
