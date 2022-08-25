import selectors from './common/selectors'
import { generateAddtoCartCardSelector } from './common/utils'

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

Cypress.Commands.add('openStoreFront', (login = false) => {
  cy.intercept('**/rc.vtex.com.br/api/events').as('events')
  cy.visit('/')
  cy.wait('@events')
  if (login === true) {
    cy.get(selectors.ProfileLabel, { timeout: 20000 })
      .should('be.visible')
      .should('have.contain', `Hello,`)
  }
})

Cypress.Commands.add('gotoProductDetailPage', () => {
  cy.get(selectors.ProductAnchorElement)
    .should('have.attr', 'href')
    .then(href => {
      cy.get(generateAddtoCartCardSelector(href)).first().click()
    })
})

Cypress.Commands.add('openProduct', (product, detailPage = false) => {
  // Search product in search bar
  cy.get(selectors.Search).should('be.not.disabled').should('be.visible')

  cy.get(selectors.Search).type(`${product}{enter}`)
  // Page should load successfully now Filter should be visible
  cy.get(selectors.searchResult).should('have.text', product.toLowerCase())
  cy.get(selectors.FilterHeading, { timeout: 30000 }).should('be.visible')

  if (detailPage) {
    cy.gotoProductDetailPage()
  } else {
    cy.log('Visiting detail page is disabled')
  }
})

Cypress.Commands.add('removeProduct', product => {
  cy.get(selectors.CartTimeline, { timeout: 30000 }).should('be.visible')
  cy.get(`#item-remove-${product}`).should('be.visible').click({ force: true })
  cy.contains('Your cart is empty')
})

Cypress.Commands.add('checkoutProduct', () => {
  cy.get(selectors.TotalPrice).should('be.visible')
  cy.get('#items-price div[class*=price]').should('have.contain', '$')
  cy.get(selectors.ProceedtoCheckout).should('be.visible').click()
  cy.get(selectors.CartTimeline, { timeout: 30000 })
    .should('be.visible')
    .click({ force: true })
})
