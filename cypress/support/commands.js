import selectors from './common/selectors'

const checkOutJson = '.checkout.json'

// Set checkout items
Cypress.Commands.add('setCheckOutItem', (checkItem, checkvalue) => {
  cy.readFile(checkOutJson).then(items => {
    items[checkItem] = checkvalue
    cy.writeFile(checkOutJson, items)
  })
})

// Get checkout items
Cypress.Commands.add('getCheckOutItems', () => {
  cy.readFile(checkOutJson).then(items => {
    return items
  })
})

Cypress.Commands.add('openStoreFront', () => {
  cy.intercept('**/rc.vtex.com.br/api/events').as('events')
  cy.visit('/')
  cy.wait('@events')
  cy.get(selectors.ProfileLabel, { timeout: 20000 })
    .should('be.visible')
    .should('have.contain', `Hello,`)
})
