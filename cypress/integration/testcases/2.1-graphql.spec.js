import { testSetup, updateRetry } from '../../support/common/support'
import { singleProduct } from '../../support/common/outputvalidation'
import {
  getSettings,
  graphql,
  saveChanges,
} from '../../support/checkout-ui-custom-settings'

describe('Testing Multi Product tax and total amounts', () => {
  const { configuration } = singleProduct
  const workspace = Cypress.env('workspace').name

  // Load test setup
  testSetup(false)

  it('Verify reviews by shopperId query', updateRetry(2), () => {
    graphql(getSettings(workspace))
  })

  it('Verify reviews by shopperId query', updateRetry(2), () => {
    graphql(saveChanges(workspace, configuration))
  })
})
