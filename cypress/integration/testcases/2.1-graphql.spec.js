import { testSetup, updateRetry } from '../../support/common/support'
import {
  getById,
  getHistory,
  getLast,
  getSetupConfig,
  graphql,
  saveChanges,
  ValidategetByIdResponse,
  validateGetHistoryResponse,
  validateGetSetUpConfigResponse,
  validateGetVersionResponse,
  version,
} from '../../support/checkout-ui-custom-settings'

describe('Testing GraphQL queries', () => {
  const workspace = Cypress.env('workspace').name

  const ID = 'id'
  const CONFIG = 'config'

  // Load test setup
  testSetup()

  it('Verifying getHistory query', updateRetry(2), () => {
    graphql(getHistory(), validateGetHistoryResponse)
  })

  it('Verifying version query', updateRetry(2), () => {
    graphql(version(), validateGetVersionResponse)
  })

  it('Verifying getSetupConfig query', updateRetry(2), () => {
    graphql(getSetupConfig(), validateGetSetUpConfigResponse)
  })

  it('Verifying getLast query with workspace master', updateRetry(2), () => {
    const WORKSPACE = 'master'

    graphql(getLast(WORKSPACE), response => {
      expect(response.body.data.getLast.workspace).to.equal(WORKSPACE)
      expect(response.body.data.getLast.id).to.not.equal(null)
      cy.setCheckOutItem(ID, response.body.data.getLast.id)
      delete response.body.data.getLast.id
      cy.setCheckOutItem(CONFIG, response.body.data.getLast)
    })
  })

  it('Verifying getId query', updateRetry(2), () => {
    cy.getCheckOutItems().then(items => {
      graphql(getById(items[ID]), ValidategetByIdResponse)
    })
  })

  it('Verifying saveChanges mutation', updateRetry(5), () => {
    cy.addDelayBetweenRetries(5000)
    cy.getCheckOutItems().then(items => {
      graphql(saveChanges(workspace, items[CONFIG]), response => {
        expect(response.body.data.saveChanges).to.include('DocumentId')
      })
    })
  })
})
