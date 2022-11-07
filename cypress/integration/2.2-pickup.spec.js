import {
  loginViaCookies,
  updateRetry,
  preserveCookie,
} from '../support/common/support.js'
import { pickupTestCase } from '../support/outputvalidation.js'

const { productName, postalCode, prefix } = pickupTestCase

describe(`${prefix} Scenario`, () => {
  loginViaCookies()

  it(`${prefix} - Adding Product to Cart`, updateRetry(1), () => {
    // Search the product
    cy.searchProduct(productName)
    // Add product to cart
    cy.addProduct(productName, {
      proceedtoCheckout: true,
    })
  })

  it(`In ${prefix} Updating product quantity to 2`, updateRetry(3), () => {
    // Update Product quantity to 2
    cy.updateProductQuantity(pickupTestCase, {
      quantity: '2',
    })
  })

  it(
    `${prefix} - Updating Shipping Information for pick up in store`,
    updateRetry(3),
    () => {
      // Update Shipping Section
      cy.updateShippingInformation({
        postalCode,
        pickup: true,
        timeout: 12000,
        checkoutcustom: true,
      })
    }
  )

  it(`${prefix} - Order the product`, () => {
    cy.orderProduct()
  })
  preserveCookie()
})
