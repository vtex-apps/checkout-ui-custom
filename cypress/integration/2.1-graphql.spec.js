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
import getConfiguration from '../support/common/checkout_ui_custom.js'

describe('Testing GraphQL queries & mutation', () => {
  const workspace = Cypress.env('workspace').name
  const { CONFIG_SETTINGS } = ENVS
  const ID = 'id'
  const APP = 'vtex.checkout-ui-custom@*.x'

  loginViaCookies()
  it('Verifying getHistory query', updateRetry(2), () => {
    graphql(APP, getHistory(), validateGetHistoryResponse)
  })

  it('Verifying version query', updateRetry(2), () => {
    graphql(APP, version(), validateGetVersionResponse)
  })

  it('Verifying getSetupConfig query', updateRetry(2), () => {
    cy.setCheckOutItem(CONFIG_SETTINGS, getConfiguration(workspace))
    graphql(APP, getSetupConfig(), validateGetSetUpConfigResponse)
  })

  it('Verifying saveChanges mutation', updateRetry(5), () => {
    cy.addDelayBetweenRetries(5000)
    cy.getCheckOutItems().then(items => {
      graphql(APP, saveChanges(items[CONFIG_SETTINGS]), response => {
        expect(response.body.data.saveChanges).to.include('DocumentId')
      })
    })
  })

  it(
    `Verifying getLast query with workspace ${workspace}`,
    updateRetry(2),
    () => {
      graphql(APP, getLast(workspace), response => {
        expect(response.body.data.getLast.workspace).to.equal(workspace)
        expect(response.body.data.getLast.id).to.not.equal(null)
        cy.setCheckOutItem(ID, response.body.data.getLast.id)
      })
    }
  )

  it('Verifying getId query', updateRetry(2), () => {
    cy.getCheckOutItems().then(items => {
      graphql(APP, getById(items[ID]), ValidategetByIdResponse)
    })
  })
  preserveCookie()
})
