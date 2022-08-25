import { loginViaCookies, updateRetry } from '../support/common/support.js'
import { discountProduct } from '../support/outputvalidation.js'
import selectors from '../support/common/selectors.js'
import checkoutUiCustomSelectors from '../support/selectors.js'

function discountValidation(quantity = 1) {
  const productPrice = 10 * quantity

  // Discounts should be shown
  cy.get(selectors.Discounts).should('be.exist')
  cy.get(checkoutUiCustomSelectors.DiscountAmount)
    .first()
    .should('have.text', `$ -${productPrice}.00`)
}

describe('Testing Checkout with different scenarios', () => {
  // Load test setup
  loginViaCookies()

  const { prefix, productName, productPrice } = discountProduct

  it(`In ${prefix} - Adding product,remove product and add product again`, () => {
    // Search the product
    cy.searchProduct(productName)
    // Add product to cart
    cy.addProduct(productName)
    discountValidation()
    // Remove the product
    cy.removeProduct('880270')
    // Search the product
    cy.searchProduct(productName)
    // Add product to cart
    cy.addProduct(productName)
  })

  it(`In ${prefix} Updating product quantity to 2`, updateRetry(3), () => {
    // Update Product quantity to 2
    cy.updateProductQuantity(discountProduct, {
      quantity: '2',
    })
    discountValidation(2)
  })

  it(`In ${prefix} - Updating Shipping Information`, updateRetry(3), () => {
    // Update Shipping Section
    cy.updateShippingInformation({ ...discountProduct, checkoutcustom: true })
  })

  it(`In ${prefix} Updating product quantity to 1`, updateRetry(2), () => {
    // Update Product quantity to 1
    cy.updateProductQuantity(discountProduct, {
      quantity: '1',
      verifySubTotal: false,
    })
    discountValidation()
    cy.get(selectors.SubTotal, { timeout: 10000 }).contains(productPrice)
    cy.get(selectors.ProceedtoPaymentBtn).should('be.visible').click()
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
      cy.get(checkoutUiCustomSelectors.VatRemoveButton)
        .should('be.visible')
        .click()
      cy.get(selectors.VatInput).should('be.empty')
    }
  )
})
