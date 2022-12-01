import {
  loginViaCookies,
  updateRetry,
  preserveCookie,
} from '../support/common/support.js'
import {
  getById,
  getHistory,
  getLast,
  getSetupConfig,
  saveChanges,
  ValidategetByIdResponse,
  validateGetHistoryResponse,
  validateGetSetUpConfigResponse,
  validateGetVersionResponse,
  version,
} from '../support/grapqhl_testcase.js'
import { graphql } from '../support/common/graphql_utils'
import { ENVS } from '../support/constants.js'

describe('Testing GraphQL queries & mutation', () => {
  const workspace = Cypress.env('workspace').name
  const { CONFIG_SETTINGS } = ENVS
  const ID = 'id'

  loginViaCookies()

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
      response.body.data.getLast.workspace = workspace // changing workspace master to dynamic workspace
      cy.setCheckOutItem(CONFIG_SETTINGS, response.body.data.getLast)
    })
  })

  it('Verifying getId query', updateRetry(2), () => {
    // Below Id we use it from line  no 46
    cy.getCheckOutItems().then(items => {
      graphql(getById(items[ID]), ValidategetByIdResponse)
    })
  })

  it('Verifying saveChanges mutation', updateRetry(5), () => {
    cy.addDelayBetweenRetries(5000)
    cy.getCheckOutItems().then(items => {
      graphql(saveChanges(items[CONFIG_SETTINGS]), response => {
        expect(response.body.data.saveChanges).to.include('DocumentId')
      })
    })
  })
  preserveCookie()
})
