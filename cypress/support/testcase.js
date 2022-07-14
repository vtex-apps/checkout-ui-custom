import selectors from './common/selectors.js'
import { updateRetry } from './common/support.js'
import checkoutUiCustomSelectors from './selectors.js'
import { layoutScenario } from './outputvalidation.js'

export function orderProduct(prefix) {
  it(`In ${prefix} - Place the order`, updateRetry(2), () => {
    cy.get('body').then(($body) => {
      if ($body.find(selectors.ReceiverName).length) {
        cy.get(selectors.ReceiverName, { timeout: 5000 }).type('Syed')
        cy.get(selectors.GotoPaymentBtn).click()
      }
    })

    cy.get(selectors.PromissoryPayment, { timeout: 5000 })
      .should('be.visible')
      .click()
    cy.get(selectors.BuyNowBtn, { timeout: 10000 })
      .should('be.visible')
      .last()
      .click()
    cy.get(selectors.Search, { timeout: 30000 })
  })
}

function proceedToPayment() {
  cy.get('body').then(($body) => {
    const btn = selectors.ProceedtoPaymentBtn

    if ($body.find(btn).length) {
      cy.get(btn).then(($el) => {
        if (Cypress.dom.isVisible($el)) {
          cy.get(selectors.ProceedtoPaymentBtn).click()
        }
      })
    }
  })
}

export function verifySettings(type) {
  const enable = /Enable/.test(type)

  const { productName } = layoutScenario
  const prefix = `${type} Layout Setting`

  it(`${prefix} - Adding Product to Cart`, () => {
    // Search the product
    cy.searchProduct(productName)
    // Add product to cart
    cy.addProduct(productName, {
      proceedtoCheckout: true,
    })
  })

  it(`${prefix} - Updating product quantity to 2`, updateRetry(3), () => {
    // Update Product quantity to 2
    cy.updateProductQuantity(layoutScenario, {
      quantity: '2',
    })
  })

  it(`${prefix} - Updating Shipping Information`, updateRetry(3), () => {
    // Update Shipping Section
    cy.updateShippingInformation(layoutScenario)
  })

  it(`${prefix} - Display items unit price option`, updateRetry(2), () => {
    cy.get(checkoutUiCustomSelectors.CartLink).click()
    if (enable) {
      cy.get(checkoutUiCustomSelectors.QuantityUnitPrice).should('exist')
    } else {
      cy.get(checkoutUiCustomSelectors.QuantityUnitPrice).should('not.exist')
    }

    proceedToPayment()
  })

  it(
    `${prefix} - Display google address form format option`,
    updateRetry(2),
    () => {
      it(`display google address form format`, updateRetry(2), () => {
        cy.get(checkoutUiCustomSelectors.ChangeShipping).click()
        cy.get(checkoutUiCustomSelectors.EditAddressButton)
          .should('be.visible')
          .click()
        if (enable) {
          cy.get(checkoutUiCustomSelectors.CustomShipAddress).should(
            'be.visible'
          )
          cy.get(checkoutUiCustomSelectors.CustomShipAddress)
            .clear()
            .type('19501 Biscayne Blvd {downarrow}{enter}')
        } else {
          cy.get(selectors.ShipCountry, { timeout: 5000 })
            .should('not.be.disabled')
            .select('USA')
        }

        cy.get(selectors.GotoPaymentBtn).click()
        proceedToPayment()
      })
    }
  )

  it(`${prefix} - Testing Hide email step, Simplified shipping date, payment options as accordian & notes field`, () => {
    proceedToPayment()
    if (enable) {
      cy.get(checkoutUiCustomSelectors.HideEmailHeader).should('not.be.visible')
      cy.get(checkoutUiCustomSelectors.ShippingTimeInfo).should('exist')
      cy.get(checkoutUiCustomSelectors.PaymentAccordion).should('exist')
      cy.get(checkoutUiCustomSelectors.SummaryNote).should('be.visible')
    } else {
      cy.get(checkoutUiCustomSelectors.HideEmailHeader).should('be.visible')
      cy.get(checkoutUiCustomSelectors.ShippingTimeInfo).should('not.exist')
      cy.get(checkoutUiCustomSelectors.PaymentAccordion).should('not.exist')
      cy.get(checkoutUiCustomSelectors.SummaryNote).should('not.be.visible')
    }
  })
}

export function fillLineItems(items, maxChar) {
  cy.get(checkoutUiCustomSelectors.ProductLineItem)
    .first()
    .type(items.lineItem1)
    .should('have.attr', 'maxlength')
    .then((maxlength) => {
      cy.log(maxlength)
      expect(maxlength).to.equal(maxChar)
    })
  cy.get(checkoutUiCustomSelectors.ProductLineItem).eq(1).type(items.lineItem2)
  cy.get(checkoutUiCustomSelectors.ProductLineItem).eq(2).type(items.lineItem3)
}
