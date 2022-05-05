import { testSetup, updateRetry } from '../../support/common/support'
import { singleProduct } from '../../support/common/outputvalidation'
import { orderProduct } from '../../support/checkout-ui-custom'

describe('Testing single product and total amounts', () => {
  const { productName, postalCode } = singleProduct

  // Load test setup
  testSetup()

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
      cy.log(postalCode)
      cy.updateShippingInformation({ postalCode, pickup: true })
    }
  )

  orderProduct()
})
