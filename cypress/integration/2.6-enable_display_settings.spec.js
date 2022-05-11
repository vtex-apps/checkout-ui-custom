import { verifySettings } from '../support/testcase.js'
import { preserveCookie, testSetup } from '../support/common/support'
import { updateLayoutSettings } from '../support/grapqhl_testcase.js'

describe('Testing by enabling all settings in layout', () => {
  const decision = 'Enable'

  testSetup()

  updateLayoutSettings(decision)
  verifySettings(decision)

  preserveCookie()
})
