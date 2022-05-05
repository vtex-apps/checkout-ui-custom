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
