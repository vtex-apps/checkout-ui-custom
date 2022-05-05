import selectors from './common/selectors'

export function orderProduct() {
  it('Place the order', () => {
    cy.get(selectors.CalculateShipping).click()
    cy.get(selectors.GotoPaymentBtn).click()
    cy.get(selectors.PromissoryPayment).click()
    cy.get(selectors.BuyNowBtn).click()
  })
}
