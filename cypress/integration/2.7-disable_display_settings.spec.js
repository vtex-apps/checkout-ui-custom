import { verifySettings } from '../support/testcase.js'
import { loginViaCookies, preserveCookie } from '../support/common/support.js'
import { updateLayoutSettings } from '../support/grapqhl_testcase.js'

describe('Testing by disabling all settings in layout', () => {
  loginViaCookies()

  const decision = 'Disable'

  updateLayoutSettings(decision)
  verifySettings(decision)
  preserveCookie()
})
