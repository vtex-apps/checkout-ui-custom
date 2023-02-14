import { ENVS } from './constants.js'
import { updateRetry } from './common/support.js'
import { graphql } from './common/graphql_utils'

const APP = 'vtex.checkout-ui-custom@*.x'

export function getLast(workspace) {
  cy.qe(`
  getLast query -
  'query' +
    '($workspace: String!)' +
    '{getLast(workspace: $workspace){id email workspace layout javascript css javascriptActive cssActive colors}}'
  `)
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

export function saveChanges(configuration) {
  cy.qe(`
   save changes mutation -
   'mutation' +
    '($email: String, $workspace: String, $layout: CustomFields, $javascript: String, $css: String, $javascriptActive: Boolean, $cssActive: Boolean, $colors: CustomFields)' +
    '{saveChanges(email: $email, workspace: $workspace, layout: $layout, javascript: $javascript, css: $css, javascriptActive: $javascriptActive, cssActive: $cssActive, colors: $colors) @context(provider: "vtex.checkout-ui-custom@*.x")}'
  `)
  const query =
    'mutation' +
    '($email: String, $workspace: String, $layout: CustomFields, $javascript: String, $css: String, $javascriptActive: Boolean, $cssActive: Boolean, $colors: CustomFields)' +
    '{saveChanges(email: $email, workspace: $workspace, layout: $layout, javascript: $javascript, css: $css, javascriptActive: $javascriptActive, cssActive: $cssActive, colors: $colors) @context(provider: "vtex.checkout-ui-custom@*.x")}'

  return {
    query,
    queryVariables: configuration,
  }
}

export function validateSaveChangesResponse(response) {
  expect(response.body.data).to.not.equal(null)
}

export function getHistory() {
  cy.qe(`
   getHistory query -
   query:
      'query' + '{getHistory {id,email,workspace,creationDate,appVersion}}',
    queryVariables: {},
  `)

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
  cy.qe(`
version query -
query: 'query' + '{version}',
queryVariables: {},
`)

  return {
    query: 'query' + '{version}',
    queryVariables: {},
  }
}

export function validateGetVersionResponse(response) {
  expect(response.body.data.version).to.not.equal(null)
}

export function getSetupConfig() {
  cy.qe(`
  getSetupConfig query -
  'query' +
  '{getSetupConfig{adminSetup{hasSchema,schemaVersion,appVersion}}}'
  `)

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
  cy.qe(`
 getById query -
'query' +
      '($id:String)' +
      '{getById(id:$id){layout,colors,javascript,css,javascriptActive,cssActive}}'
  `)

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
  expect(response.body.data.getById.cssActive).to.be.true
  expect(response.body.data.getById.layout).to.have.property('borderRadius')
}

export function updateLayoutSettings(option) {
  it(`${option} Layout Settings via Graphql`, updateRetry(3), () => {
    cy.qe(`${option} layout settings via Graphql`)
    cy.getCheckOutItems().then(items => {
      cy.log(items)
      const configurations = items[ENVS.CONFIG_SETTINGS]

      const bool = /Enable/.test(option)

      configurations.layout.accordionPayments = bool
      configurations.layout.deliveryDateFormat = bool
      configurations.layout.showCartQuantityPrice = bool
      configurations.layout.showNoteField = bool
      configurations.layout.hideEmailStep = bool
      configurations.layout.customAddressForm = bool
      graphql(APP, saveChanges(configurations), response => {
        cy.qe(
          `Validating ${response.body.data.saveChanges} to include 'DocumentId'`
        )
        expect(response.body.data.saveChanges).to.include('DocumentId')
      })
    })
  })
}
