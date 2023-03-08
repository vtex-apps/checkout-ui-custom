import {
  ENTITIES,
  FAIL_ON_STATUS_CODE,
  VTEX_AUTH_HEADER,
} from '../support/common/constants.js'
import { testSetup } from '../support/common/support.js'

const config = Cypress.env()

// Constants
const { name } = config.workspace

describe('Wipe', () => {
  testSetup()

  it('Deleting checkout history', () => {
    cy.getVtexItems().then(vtex => {
      cy.addLogsForRestAPI({
        url:
          'https://productusqa.vtexcommercestable.com.br/api/dataentities/checkoutcustom/search',
        method: 'GET',
        qs: {
          _fields: 'workspace,email,id',
          _schema: 'v0.1.3',
          workspace: name,
        },
        headers: {
          ...VTEX_AUTH_HEADER(vtex.apiKey, vtex.apiToken),
          'REST-Range': 'resources=0-50',
        },
      })

        // cy.request({
        //   url: `https://productusqa.vtexcommercestable.com.br/api/dataentities/checkoutcustom/search`,

        //   qs: {
        //     _fields: 'workspace,email,id',
        //     _schema: 'v0.1.3',
        //     workspace: name,
        //   },
        //   headers: {
        //     ...VTEX_AUTH_HEADER(vtex.apiKey, vtex.apiToken),
        //     'REST-Range': 'resources=0-50',
        //   },
        //   ...FAIL_ON_STATUS_CODE,
        // })
        .then(response => {
          expect(response.status).to.equal(200)
          for (const { id } of response.body) {
            cy.deleteDocumentInMasterData(ENTITIES.CHECKOUTCUSTOM, id)
          }
        })
    })
  })
  it('Getting user & then deleting addresses associated with that user', () => {
    cy.getVtexItems().then(vtex => {
      cy.searchInMasterData(ENTITIES.CLIENTS, vtex.robotMail).then(clients => {
        cy.searchInMasterData(ENTITIES.ADDRESSES, clients[0].id).then(
          addresses => {
            for (const { id } of addresses) {
              cy.deleteDocumentInMasterData(ENTITIES.ADDRESSES, id)
            }
          }
        )
      })
    })
  })
})
