import checkoutUiCustomSelectors from './checkout-ui-custom.selectors'
import selectors from './common/selectors'
import { updateRetry } from './common/support'

export function orderProduct(pickup = false) {
  it('Place the order', () => {
    if (pickup) {
      cy.get(selectors.CalculateShipping).click()
      cy.get(selectors.GotoPaymentBtn).click()
    }

    cy.get(selectors.PromissoryPayment)
      .should('be.visible')
      .click()
    cy.get(selectors.BuyNowBtn)
      .should('be.visible')
      .last()
      .click()
  })
}

export function verifySettings(type, enable = false) {
  it(`${type} display items unit price`, updateRetry(2), () => {
    cy.get(checkoutUiCustomSelectors.cartLink).click()
    if (enable) {
      cy.get(checkoutUiCustomSelectors.quantityUnityPrice).should('exist')
    } else {
      cy.get(checkoutUiCustomSelectors.quantityUnityPrice).should('not.exist')
    }

    cy.get(selectors.ProceedtoPaymentBtn).click()
  })

  // it(`${type} display google address form format`, updateRetry(2), () => {
  //   cy.get('.checkout-steps_item_cart').click()
  //   if (enable) {
  //     cy.get('.v-custom-quantity-price__list--selling').should('exist')
  //   } else {
  //     cy.get('.v-custom-quantity-price__list--selling').should('not.exist')
  //   }

  //   cy.get(selectors.ProceedtoPaymentBtn).click()
  // })

  it(`${type} Hide email step`, updateRetry(2), () => {
    if (enable) {
      cy.get(checkoutUiCustomSelectors.hideEmailHeader).should('not.be.visible')
    } else {
      cy.get(checkoutUiCustomSelectors.hideEmailHeader).should('be.visible')
    }
  })

  it(`${type} display simplified shipping date`, updateRetry(2), () => {
    if (enable) {
      cy.get(checkoutUiCustomSelectors.shippingTimeInfo).should('exist')
      // cy.get('.v-changeShippingTimeInfo-elem-active').should(
      //   'contains',
      //   'Arrives by'
      // )
    } else {
      cy.get(checkoutUiCustomSelectors.shippingTimeInfo).should('not.exist')
    }
  })

  it(`${type} display payment options as accordion`, updateRetry(2), () => {
    if (enable) {
      cy.get(checkoutUiCustomSelectors.paymentAccordion).should('exist')
    } else {
      cy.get(checkoutUiCustomSelectors.paymentAccordion).should('not.exist')
    }
  })

  it(`${type} display notes field`, updateRetry(2), () => {
    if (enable) {
      cy.get(checkoutUiCustomSelectors.summaryNote).should('be.visible')
    } else {
      cy.get(checkoutUiCustomSelectors.summaryNote).should('not.be.visible')
    }
  })
}

export function fillLineItems(items, maxChar) {
  cy.get(checkoutUiCustomSelectors.productLineItem)
    .first()
    .type(items.lineItem1)
    .should('have.attr', 'maxlength')
    .then(maxlength => {
      cy.log(maxlength)
      expect(maxlength).to.equal(maxChar)
    })
  cy.get(checkoutUiCustomSelectors.productLineItem)
    .eq(1)
    .type(items.lineItem2)
  cy.get(checkoutUiCustomSelectors.productLineItem)
    .eq(2)
    .type(items.lineItem3)
}
