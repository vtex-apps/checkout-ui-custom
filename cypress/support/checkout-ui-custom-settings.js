import path from 'path'

import { FAIL_ON_STATUS_CODE } from './common/constants'

const config = Cypress.env()
const manifestFile = path.join('..', 'manifest.json')
const APP_VERSION = manifestFile.version
// Constants
const { vtex } = config.base

export function graphql(getQuery, validateResponseFn = null) {
  const { query, queryVariables } = getQuery

  // Define constants
  const APP_NAME = 'vtex.checkout-ui-custom'
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
      expect(response.body).to.not.have.own.property('errors')
      validateResponseFn(response)
    })
  } else {
    return cy.get('@RESPONSE')
  }
}

export function getLast(workspace) {
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
    'mutation' +
    `($workspace: String!, $layout: CustomFields)` +
    `{saveChanges(workspace: $workspace, layout: $layout)}`

  const queryVariables = {
    workspace,
    layout,
  }

  cy.log(queryVariables)

  return {
    query,
    queryVariables,
  }
}

export function getHistory() {
  return {
    query:
      'query' + '{getHistory {id,email,workspace,creationDate,appVersion}}',
    queryVariables: {},
  }
}

export function version() {
  return {
    query: 'query' + '{version}',
    queryVariables: {},
  }
}

export function getSetupConfig() {
  return {
    query:
      'query' +
      '{getSetupConfig{adminSetup{hasSchema,schemaVersion,appVersion}}}',
    queryVariables: {},
  }
}

export function getById(id) {
  return {
    query:
      'query' +
      '($id:String)' +
      '{getById(id:$id){layout,colors,javascript,css,javascriptActive,cssActive}}',
    queryVariables: id,
  }
}

export function ValidategetByIdResponse(response) {
  expect(response.body.data).to.not.equal(null)
}

export function validateGetHistoryResponse(response) {
  expect(response.body.data).to.not.equal(null)
}

export function validateGetVersionResponse(response) {
  expect(response.body.data).to.not.equal(null)
}

export function validateGetSetUpConfigResponse(response) {
  expect(response.body.data).to.not.equal(null)
}

export function validateGetLastResponse(response) {
  expect(response.body.data).to.not.equal(null)
}

export function validateSaveChangesResponse(response) {
  expect(response.body.data).to.not.equal(null)
}
