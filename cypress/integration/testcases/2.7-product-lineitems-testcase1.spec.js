import {
  preserveCookie,
  testSetup,
  updateRetry,
} from '../../support/common/support'
import selectors from '../../support/common/selectors'
import { fillLineItems } from '../../support/checkout-ui-custom'
import { checkoutUiCustomConstants } from '../../support/checkout-ui-custom.constants'
import lineitemProducts from '../../support/lineitem-products'
import checkoutUiCustomSelectors from '../../support/checkout-ui-custom.selectors'

describe(`Testing product ${lineitemProducts.acer.name} line items`, () => {
  // Load test setup
  testSetup()

  it('open Product', updateRetry(3), () => {
    // Search the product
    cy.searchProduct(lineitemProducts.acer.name)
    // Add product to cart
    cy.addProduct(lineitemProducts.acer.name, {
      proceedtoCheckout: true,
      productDetailPage: true,
    })
  })

  it('Verify line items not displaying', () => {
    cy.get(checkoutUiCustomSelectors.lineItemAssemble).should('not.exist')
    cy.removeProductAndGoToStorefront(lineitemProducts.acer.id)
  })

  it('Add line items for acer', updateRetry(3), () => {
    cy.openProduct(lineitemProducts.acer.name, true)
    cy.contains(checkoutUiCustomConstants.addLineItemText).click()
    fillLineItems(
      checkoutUiCustomConstants.lineItems,
      checkoutUiCustomConstants.maxCharecters.max25
    )
    cy.get('[name=postalCode]')
      .clear()
      .type('33180')
      .type('{enter}')
    cy.get(selectors.ProductsQAShipping).click()
    cy.get(selectors.AddtoCart).click()
  })

  it('Verify line items displaying', () => {
    cy.checkoutProduct()
    cy.get(checkoutUiCustomSelectors.lineItemAssemble).should('exist')
  })

  preserveCookie()
})
