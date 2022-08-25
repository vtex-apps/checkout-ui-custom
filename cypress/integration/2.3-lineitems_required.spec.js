import { loginViaCookies, updateRetry } from '../support/common/support.js'
import selectors from '../support/common/selectors.js'
import { fillLineItems } from '../support/testcase.js'
import { checkoutUiCustomConstants } from '../support/constants.js'
import lineitemProducts from '../support/lineitem-products.js'
import checkoutUiCustomSelectors from '../support/selectors.js'

const prefix = `Line items required scenario`
const product = lineitemProducts.jumper.name

describe(`Testing line items(required) with this product - ${product}`, () => {
  loginViaCookies()

  it(`${prefix} - Open Product ${product}`, updateRetry(3), () => {
    // Search the product
    cy.searchProduct(lineitemProducts.jumper.name)
    // Add product to cart
    cy.addProduct(lineitemProducts.jumper.name, {
      proceedtoCheckout: true,
      productDetailPage: true,
    })
  })

  it(`${prefix} - Verify line items displayed in checkout ui`, () => {
    cy.get(checkoutUiCustomSelectors.LineItemAssemble).should('exist')
    cy.removeProduct(lineitemProducts.jumper.id)
    cy.get(checkoutUiCustomSelectors.ChooseProducts)
      .should('be.visible')
      .click()
  })

  it(`${prefix} - Add line items for ${product}`, updateRetry(3), () => {
    cy.openProduct(lineitemProducts.jumper.name, true)
    fillLineItems(
      checkoutUiCustomConstants.lineItems,
      checkoutUiCustomConstants.maxCharecters.max10
    )
    cy.get(selectors.AddtoCart).should('be.visible').click()
  })

  it(`${prefix} - Verify line items are displaying in checkout`, () => {
    cy.checkoutProduct()
    cy.get(checkoutUiCustomSelectors.LineItemAssemble).should('exist')
  })
})
