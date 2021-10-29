const CUSTOM_DATA_APP_ID = 'b2b-checkout-ui-custom'

const b2bConfiguration = async (keys: any, ctx: Context) => {
  if (keys.purchaseOrderInput) {
    const {
      clients: { checkoutConfiguration },
    } = ctx

    try {
      const config = await checkoutConfiguration.getCheckoutConfiguration()

      const add = {
        fields: ['purchaseOrderNumber'],
        id: CUSTOM_DATA_APP_ID,
        major: 1,
      }

      const updated = config.apps.filter((i) => i.id !== 'b2btest')

      config.apps = [...updated, add]

      await checkoutConfiguration.setCheckoutConfiguration(config)
    } catch (err) {
      console.log('err ==>', err?.response.data || err)
    }
  }
}

export default b2bConfiguration
