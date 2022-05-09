import { testSetup, updateRetry } from '../../support/common/support'
import { singleProduct } from '../../support/common/outputvalidation'
import { orderProduct } from '../../support/checkout-ui-custom'

describe('Testing single product and total amounts', () => {
  // Load test setup
  testSetup()
  const { productName, postalCode, prefix } = singleProduct

  it(`In ${prefix} - Adding Product to Cart`, updateRetry(3), () => {
    // Search the product
    cy.searchProduct(productName)
    // Add product to cart
    cy.addProduct(productName)
  })

  it(`In ${prefix} Updating product quantity to 2`, updateRetry(3), () => {
    // Update Product quantity to 2
    cy.updateProductQuantity(singleProduct, {
      quantity: '2',
    })
  })

  it(`In ${prefix} - Updating Shipping Information`, updateRetry(3), () => {
    // Update Shipping Section
    cy.updateShippingInformation({ postalCode })
  })

  orderProduct()
})
