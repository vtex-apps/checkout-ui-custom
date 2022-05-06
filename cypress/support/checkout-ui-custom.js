import selectors from './common/selectors'
import { updateRetry } from './common/support'

export function orderProduct() {
  it('Place the order', () => {
    // cy.get(selectors.CalculateShipping).click()
    // cy.get(selectors.GotoPaymentBtn).click()
    cy.get(selectors.PromissoryPayment).click()
    cy.get(selectors.BuyNowBtn).click()
  })
}

export function verifySettings(type, enable = false) {
  it(`${type} display items unit price`, updateRetry(2), () => {
    cy.get('.checkout-steps_item_cart').click()
    if (enable) {
      cy.get('.v-custom-quantity-price__list--selling').should('exist')
    } else {
      cy.get('.v-custom-quantity-price__list--selling').should('not.exist')
    }

    cy.get(selectors.ProceedtoPaymentBtn).click()
  })

  // if (enable === true) {
  it(`${type} Hide email step`, updateRetry(2), () => {
    if (enable) {
      cy.get('.client-pre-email-h').should('not.be.visible')
    } else {
      cy.get('.client-pre-email-h').should('be.visible')
    }
  })
  // }

  it(`${type} display simplified shipping date`, updateRetry(2), () => {
    if (enable) {
      cy.get('.v-changeShippingTimeInfo-active').should('exist')
      // cy.get('.v-changeShippingTimeInfo-elem-active').should(
      //   'contains',
      //   'Arrives by'
      // )
    } else {
      cy.get('.v-changeShippingTimeInfo-active').should('not.exist')
    }
  })

  it(`${type} display payment options as accordion`, updateRetry(2), () => {
    if (enable) {
      cy.get('.v-custom-payment-item-wrap').should('exist')
    } else {
      cy.get('.v-custom-payment-item-wrap').should('not.exist')
    }
  })

  it(`${type} display notes field`, updateRetry(2), () => {
    if (enable) {
      cy.get('.summary-note').should('be.visible')
    } else {
      cy.get('.summary-note').should('not.be.visible')
    }
  })
}
