import { FAIL_ON_STATUS_CODE } from './common/constants.js'

export function updateSettings(config) {
  cy.getVtexItems().then(vtex => {
    // Define constants
    const APP_NAME = 'vtex.checkout-ui-custom'
    const APP = `${APP_NAME}@0.x`
    const CUSTOM_URL = `${vtex.baseUrl}/_v/private/admin-graphql-ide/v0/${APP}`

    const GRAPHQL_MUTATION =
      'mutation' +
      '($email: String, $workspace: String, $layout: CustomFields, $javascript: String, $css: String, $javascriptActive: Boolean, $cssActive: Boolean, $colors: CustomFields)' +
      '{saveChanges(email: $email, workspace: $workspace, layout: $layout, javascript: $javascript, css: $css, javascriptActive: $javascriptActive, cssActive: $cssActive, colors: $colors)}'

    const QUERY_VARIABLES = config

    cy.request({
      method: 'POST',
      url: CUSTOM_URL,
      ...FAIL_ON_STATUS_CODE,
      body: {
        query: GRAPHQL_MUTATION,
        variables: QUERY_VARIABLES,
      },
    }).then(response => {
      expect(response.status).to.equal(200)
      // expect(response.body.data.saveAppSettings.message).to.equal(
      //   JSON.stringify(req)
      // )
    })
  })
}
