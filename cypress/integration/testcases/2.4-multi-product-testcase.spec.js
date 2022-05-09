import { testSetup, updateRetry } from '../../support/common/support'
import { multiProduct } from '../../support/common/outputvalidation'
import { orderProduct } from '../../support/checkout-ui-custom'

describe('Testing single product and total amounts', () => {
  // Load test setup
  testSetup()
  const { prefix, product1Name, product2Name, postalCode } = multiProduct

  it(`In ${prefix} - Adding Multiple Product to Cart`, updateRetry(3), () => {
    // Search the product
    cy.searchProduct(product1Name)
    // Add product to cart
    cy.addProduct(product1Name, { proceedtoCheckout: false })
    // Search the product
    cy.searchProduct(product2Name)
    // Add product to cart
    cy.addProduct(product2Name)
  })

  it(`In ${prefix} Updating product quantity to 2`, updateRetry(3), () => {
    // Update Product quantity to 2
    cy.updateProductQuantity(multiProduct, {
      quantity: '2',
    })
  })

  it(`In ${prefix} Remove product`, updateRetry(3), () => {
    // Update Product quantity to 2
    cy.get('#item-remove-880300')
      .should('be.visible')
      .click()
  })
  it(`In ${prefix} - Updating Shipping Information`, updateRetry(3), () => {
    // Update Shipping Section
    cy.updateShippingInformation({ postalCode })
  })

  orderProduct()
})
