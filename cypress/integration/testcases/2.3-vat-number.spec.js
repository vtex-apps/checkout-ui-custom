import checkoutUiCustomSelectors from '../../support/checkout-ui-custom.selectors'
import selectors from '../../support/common/selectors'
import { updateRetry } from '../../support/common/support'
import { checkoutUiCustomConstants } from '../../support/checkout-ui-custom.constants'

it(
  `verify user is able to provide input to vatNumber field and able to clear the vatnumber value`,
  updateRetry(3),
  () => {
    // Providing VAT number
    cy.get(selectors.VatInput).type(checkoutUiCustomConstants.vatText)
    cy.get(selectors.SubmitVat).click()
    // Tax should not exist
    cy.get(checkoutUiCustomSelectors.vatRemoveButton).click()
    cy.get(selectors.VatInput).should('be.empty')
  }
)
