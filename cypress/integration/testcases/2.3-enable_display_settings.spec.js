// import { verifySettings } from '../../support/checkout-ui-custom'
import { testSetup } from '../../support/common/support'
import { updateSettings } from '../../support/configuration'

describe('Testing as anonymous user -> Disable display setting', () => {
  testSetup()
  updateSettings('Disable display setting', {
    accordionPayments: false,
    deliveryDateFormat: false,
    showCartQuantityPrice: false,
    showNoteField: false,
    hideEmailStep: false,
    customAddressForm: false,
  })

  // verifySettings('Disable')
})
