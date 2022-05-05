import { FAIL_ON_STATUS_CODE } from './common/constants'

const config = Cypress.env()

// Constants
const { vtex } = config.base

function commonGraphlValidation(response) {
  expect(response.status).to.equal(200)
  expect(response.body.data).to.not.equal(null)
  expect(response.body).to.not.have.own.property('errors')
}

export function graphql(getQuery, validateResponseFn = null) {
  const { query, queryVariables } = getQuery

  // Define constants
  const APP_NAME = 'vtex.checkout-ui-custom'
  const APP = `${APP_NAME}@0.x`
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
      commonGraphlValidation(response)
      validateResponseFn(response)
    })
  } else {
    return cy.get('@RESPONSE')
  }
}

export function getLast(workspace) {
  const query =
    'query' +
    '($workspace: String!)' +
    '{getLast(workspace: $workspace){id email workspace layout javascript css javascriptActive cssActive colors}}'

  return {
    query,
    queryVariables: { workspace },
  }
}

export function validateGetLastResponse(response) {
  expect(response.body.data).to.not.equal(null)
}

export function saveChanges(workspace, configuration) {
  const query =
    'mutation' +
    '($email: String, $workspace: String, $layout: CustomFields, $javascript: String, $css: String, $javascriptActive: Boolean, $cssActive: Boolean, $colors: CustomFields)' +
    '{saveChanges(email: $email, workspace: $workspace, layout: $layout, javascript: $javascript, css: $css, javascriptActive: $javascriptActive, cssActive: $cssActive, colors: $colors)}'

  // Setting workspace to dynamic workspace
  configuration.workspace = workspace

  return {
    query,
    queryVariables: configuration,
  }
}

export function validateSaveChangesResponse(response) {
  expect(response.body.data).to.not.equal(null)
}

export function getHistory() {
  return {
    query:
      'query' + '{getHistory {id,email,workspace,creationDate,appVersion}}',
    queryVariables: {},
  }
}

export function validateGetHistoryResponse(response) {
  expect(response.body.data.getHistory)
    .to.be.an('array')
    .and.to.have.lengthOf.above(0)
}

export function version() {
  return {
    query: 'query' + '{version}',
    queryVariables: {},
  }
}

export function validateGetVersionResponse(response) {
  expect(response.body.data.version).to.not.equal(null)
}

export function getSetupConfig() {
  return {
    query:
      'query' +
      '{getSetupConfig{adminSetup{hasSchema,schemaVersion,appVersion}}}',
  }
}

export function validateGetSetUpConfigResponse(response) {
  expect(response.body.data).to.not.equal(null)
  expect(response.body.data.getSetupConfig.adminSetup.appVersion).to.not.equal(
    null
  )
  expect(response.body.data.getSetupConfig.adminSetup.hasSchema).to.be.true
  expect(
    response.body.data.getSetupConfig.adminSetup.schemaVersion
  ).to.not.equal(null)
}

export function getById(id) {
  return {
    query:
      'query' +
      '($id:String)' +
      '{getById(id:$id){layout,colors,javascript,css,javascriptActive,cssActive}}',
    queryVariables: { id },
  }
}

export function ValidategetByIdResponse(response) {
  expect(response.body.data.getById.javascriptActive).to.be.true
}
