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
  validateSaveChangesResponse,
  version,
} from '../../support/checkout-ui-custom-settings'
import configuration from '../../support/configuration'

describe('Testing GraphQL queries', () => {
  const config = configuration
  const workspace = Cypress.env('workspace').name

  // Load test setup
  testSetup()

  it('Get History', () => {
    graphql(getHistory(), validateGetHistoryResponse)
  })

  it('Get Version', () => {
    graphql(version(), validateGetVersionResponse)
  })

  it('Get Setupconfig', () => {
    graphql(getSetupConfig(), validateGetSetUpConfigResponse)
  })

  it('Verify get settings query', updateRetry(2), () => {
    graphql(getLast(workspace), response => {
      expect(response.body.data).to.not.equal(null)
      cy.setCheckOutItem('value', response.body)
    })
  })

  it('getById', () => {
    cy.getCheckOutItem().then(check => {
      graphql(getById(check), ValidategetByIdResponse)
    })
  })

  it('Verify save changes', updateRetry(2), () => {
    cy.log(workspace)
    graphql(
      saveChanges(workspace, config.configurationSettings),
      validateSaveChangesResponse
    )
  })
})
