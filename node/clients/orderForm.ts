import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class CheckoutConfigurationClient extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdClientAutCookie: ctx.authToken,
      },
    })
  }

  public async getCheckoutConfiguration(): Promise<CheckoutConfiguration> {
    return this.http.get(`/api/checkout/pvt/configuration/orderForm`, {
      metric: 'checkout-configuration-get',
    })
  }

  public async setCheckoutConfiguration(
    configuration: unknown
  ): Promise<CheckoutConfiguration> {
    return this.http.post(
      `/api/checkout/pvt/configuration/orderForm`,
      configuration,
      {
        metric: 'checkout-configuration-put',
      }
    )
  }
}

interface CheckoutConfiguration {
  apps: Apps[]
}

interface Apps {
  fields: string[]
  id: string
  major: number
}
