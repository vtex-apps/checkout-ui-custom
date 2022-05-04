import { FAIL_ON_STATUS_CODE } from './common/constants'

const config = Cypress.env()

// Constants
const { vtex } = config.base

export function graphql(getQuery, validateResponseFn = null) {
  const { query, queryVariables } = getQuery

  // Define constants
  const APP_NAME = 'vtex.checkout-ui-custom'
  const APP_VERSION = '*.x'
  const APP = `${APP_NAME}@${APP_VERSION}`
  const CUSTOM_URL = `${vtex.baseUrl}/_v/private/admin-graphql-ide/v0/${APP}`

  cy.request({
    method: 'POST',
    url: CUSTOM_URL,
    ...FAIL_ON_STATUS_CODE,
    body: {
      query,
      variables: queryVariables,
    },
  }).as('RESPONSE')

  if (validateResponseFn) {
    cy.get('@RESPONSE').then(response => {
      expect(response.status).to.equal(200)
      expect(response.body.data).to.not.equal(null)
    })
  } else {
    return cy.get('@RESPONSE')
  }
}

export function getSettings(workspace) {
  const ob = { workspace }
  const query =
    'query' +
    '($workspace: String!)' +
    '{ getLast(workspace: $workspace){id,workspace,layout}}'

  return {
    query,
    queryVariables: ob,
  }
}

export function saveChanges(workspace, layout) {
  const query =
    'mutation' + `{saveChanges(workspace: ${workspace}, layout: ${layout})}`

  const queryVariables = {
    workspace: 'master',
    layout,
  }

  cy.log(queryVariables)

  return {
    query,
    queryVariables,
  }
}
