import {
  testSetup,
  updateRetry,
  preserveCookie,
} from '../support/common/support.js'
import { checkoutScenario } from '../support/outputvalidation.js'
import { orderProduct } from '../support/testcase.js'
import selectors from '../support/common/selectors.js'

describe('Testing single product and total amounts', () => {
  // Load test setup
  testSetup()

  const { prefix, productName, productPrice } = checkoutScenario

  it(`In ${prefix} - Adding product,remove product and add product again`, () => {
    // Search the product
    cy.searchProduct(productName)
    // Add product to cart
    cy.addProduct(productName)
    // Remove the product
    cy.removeProduct('880300')
    // Search the product
    cy.searchProduct(productName)
    // Add product to cart
    cy.addProduct(productName)
  })

  it(`In ${prefix} Updating product quantity to 2`, updateRetry(3), () => {
    // Update Product quantity to 2
    cy.updateProductQuantity(checkoutScenario, {
      quantity: '2',
    })
  })

  it(`In ${prefix} - Updating Shipping Information`, updateRetry(3), () => {
    // Update Shipping Section
    cy.updateShippingInformation(checkoutScenario)
  })

  it(`In ${prefix} Updating product quantity to 1`, updateRetry(2), () => {
    // Update Product quantity to 2
    cy.updateProductQuantity(checkoutScenario, {
      quantity: '1',
      verifySubTotal: false,
    })
    cy.get(selectors.SubTotal, { timeout: 10000 }).contains(productPrice)
    cy.get(selectors.ProceedtoPaymentBtn)
      .should('be.visible')
      .click()
  })

  orderProduct(prefix)
  preserveCookie()
})
