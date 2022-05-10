import { verifySettings } from '../support/testcase.js'
import { preserveCookie, testSetup } from '../support/common/support'
import { ENVS } from '../support/constants.js'
import { updateLayoutSettings } from '../support/grapqhl_testcase.js'

describe('Testing by enabling all settings in layout', () => {
  const decision = 'Enable'

  testSetup()

  updateLayoutSettings(ENVS.DOCUMENT_IDS[1], decision)
  verifySettings(decision)

  preserveCookie()
})
