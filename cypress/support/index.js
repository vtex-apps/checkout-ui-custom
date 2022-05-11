// Import commands.js using ES2015 syntax:
import './common/commands'
import './common/api_commands'
import './commands'

// Configure it to preserve cookies
Cypress.Cookies.defaults({
  preserve: /VtexIdclientAutCookie/,
})
