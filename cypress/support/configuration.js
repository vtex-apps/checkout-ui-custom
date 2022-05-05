import path from 'path'

import { FAIL_ON_STATUS_CODE } from './common/constants.js'
import { updateRetry } from './common/support.js'

const manifestFile = path.join('..', 'manifest.json')
const APP_VERSION = manifestFile.version

export function updateSettings(
  prefix,
  {
    accordionPayments,
    deliveryDateFormat,
    showCartQuantityPrice,
    showNoteField,
    hideEmailStep,
    customAddressForm,
  } = {}
) {
  it(`In ${prefix} - Update Checkout UI Settings`, updateRetry(3), () => {
    cy.getVtexItems().then(vtex => {
      // Define constants
      const APP_NAME = 'vtex.checkout-ui-custom'
      const APP = `${APP_NAME}@${APP_VERSION}`
      const CUSTOM_URL = `${vtex.baseUrl}/_v/private/admin-graphql-ide/v0/${APP}`

      const GRAPHQL_MUTATION =
        'mutation' +
        `($workspace: String!, $layout: CustomFields)` +
        `{saveChanges(workspace: $workspace, layout: $layout)}`

      const req = {
        accordionPayments: accordionPayments || false,
        deliveryDateFormat: deliveryDateFormat || false,
        showCartQuantityPrice: showCartQuantityPrice || false,
        showNoteField: showNoteField || false,
        hideEmailStep: hideEmailStep || false,
        customAddressForm: customAddressForm || false,
      }

      const QUERY_VARIABLES = {
        workspace: Cypress.env('workspace').name,
        layout: req,
      }

      cy.log(QUERY_VARIABLES)

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
  })
}
