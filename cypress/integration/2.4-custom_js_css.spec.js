import { testSetup, updateRetry } from '../support/common/support.js'
import { testCustomJSAndCSS } from '../support/outputvalidation.js'
import { orderProduct } from '../support/testcase.js'
import selectors from '../support/common/selectors.js'

describe('Testing Custom JS and CSS', () => {
  // Load test setup
  testSetup()
  const { productName, postalCode, prefix } = testCustomJSAndCSS

  it(`In ${prefix} - Adding Product to Cart`, updateRetry(3), () => {
    // Search the product
    cy.searchProduct(productName)
    // Add product to cart
    cy.addProduct(productName)
  })

  it(`In ${prefix} Updating product quantity to 2`, updateRetry(3), () => {
    // Update Product quantity to 2
    cy.updateProductQuantity(testCustomJSAndCSS, {
      quantity: '2',
    })
  })
  it(`In ${prefix} - Updating Shipping Information`, updateRetry(3), () => {
    // Update Shipping Section
    cy.updateShippingInformation({ postalCode })
  })
  it(
    `${prefix} - vat number should be visible & test input field`,
    updateRetry(3),
    () => {
      // VAT number field should be visibel to the user
      cy.get(selectors.VatInput).should('be.visible')
      // Providing VAT number
      cy.get(selectors.VatInput).type('FR40303265045')
      cy.get(selectors.SubmitVat).click()
      // Tax should not exist
      cy.get('.vat-number__button--remove').click()
      cy.get(selectors.VatInput).should('be.empty')
    }
  )

  orderProduct(prefix)
})
