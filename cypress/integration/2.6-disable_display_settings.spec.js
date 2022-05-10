import { verifySettings } from '../support/testcase.js'
import { ENVS } from '../support/constants.js'
import { preserveCookie, testSetup } from '../support/common/support.js'
import { updateLayoutSettings } from '../support/grapqhl_testcase.js'

describe('Testing by disabling all settings in layout', () => {
  testSetup()

  const decision = 'Disable'

  updateLayoutSettings(ENVS.DOCUMENT_IDS[2], decision)
  verifySettings(decision)

  preserveCookie()
})
