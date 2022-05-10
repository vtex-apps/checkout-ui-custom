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

describe(`Testing product ${lineitemProducts.jumper.name} line items`, () => {
  // Load test setup
  testSetup()

  it('open Product', updateRetry(3), () => {
    // Search the product
    cy.searchProduct(lineitemProducts.jumper.name)
    // Add product to cart
    cy.openProduct(lineitemProducts.jumper.name, true)
  })

  it('Verify line items required', () => {
    fillLineItems(
      checkoutUiCustomConstants.lineItems,
      checkoutUiCustomConstants.maxCharecters.max10
    )
    cy.get(selectors.AddtoCart).click()
  })

  it('Verify line items displaying', () => {
    cy.checkoutProduct()
    cy.get(checkoutUiCustomSelectors.lineItemAssemble).should('exist')
  })

  preserveCookie()
})
