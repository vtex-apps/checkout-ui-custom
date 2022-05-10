import {
  preserveCookie,
  testSetup,
  updateRetry,
} from '../support/common/support.js'
import selectors from '../support/common/selectors.js'
import { fillLineItems } from '../support/testcase.js'
import { checkoutUiCustomConstants } from '../support/constants.js'
import lineitemProducts from '../support/lineitem-products.js'
import checkoutUiCustomSelectors from '../support/selectors.js'

const prefix = `Line items required scenario`
const product = lineitemProducts.acer.name

describe(`Testing line items(optional) with this product - ${product}`, () => {
  // Load test setup
  testSetup()

  it(`${prefix} - Open Product ${product}`, updateRetry(3), () => {
    // Search the product
    cy.searchProduct(lineitemProducts.acer.name)
    // Add product to cart
    cy.addProduct(lineitemProducts.acer.name, {
      proceedtoCheckout: true,
      productDetailPage: true,
    })
  })

  it(`${prefix} - Verify line items not displaying`, () => {
    cy.get(checkoutUiCustomSelectors.lineItemAssemble).should('not.exist')
    cy.removeProduct(lineitemProducts.acer.id)
    cy.get(checkoutUiCustomSelectors.ChooseProducts)
      .should('be.visible')
      .click()
  })

  it(`${prefix} -Add line items for acer`, updateRetry(3), () => {
    cy.openProduct(lineitemProducts.acer.name, true)
    cy.contains(checkoutUiCustomConstants.addLineItemText).click()
    fillLineItems(
      checkoutUiCustomConstants.lineItems,
      checkoutUiCustomConstants.maxCharecters.max25
    )
    cy.get(selectors.PostalCode)
      .clear()
      .type('33180')
      .type('{enter}')
    cy.get(selectors.ProductsQAShipping).click()
    cy.get(selectors.AddtoCart).click()
  })

  it(`${prefix} - Verify line items displaying`, () => {
    cy.checkoutProduct()
    cy.get(checkoutUiCustomSelectors.lineItemAssemble).should('exist')
  })

  preserveCookie()
})
