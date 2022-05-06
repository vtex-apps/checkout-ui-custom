// Import commands.js using ES2015 syntax:
import './common/commands'
import './commands'

// Configure it to preserve cookies
Cypress.Cookies.defaults({
  preserve: /VtexIdclientAutCookie/,
})

// Avoid application errors
Cypress.on('uncaught:exception', () => {
  return false
})
