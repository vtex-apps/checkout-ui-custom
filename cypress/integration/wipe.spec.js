import { ENTITIES } from '../support/common/constants.js'
import { testSetup } from '../support/common/support.js'
import { ENVS } from '../support/constants.js'

describe('Wipe', () => {
  testSetup()

  it('Deleting checkout history', () => {
    for (const id of ENVS.DOCUMENT_IDS) {
      cy.getCheckOutItems().then(items => {
        cy.deleteDocumentInMasterData('checkoutcustom', items[id])
      })
    }
  })
  it('Getting user & then deleting addresses associated with that user', () => {
    cy.getVtexItems().then(vtex => {
      cy.searchInMasterData(ENTITIES.CLIENTS, vtex.robotMail).then(clients => {
        cy.searchInMasterData(ENTITIES.ADDRESSES, clients[0].id).then(
          addresses => {
            for (const { id } of addresses)
              cy.deleteDocumentInMasterData(ENTITIES.ADDRESSES, id)
          }
        )
      })
    })
  })
})
