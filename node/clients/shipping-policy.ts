import { InstanceOptions, IOContext } from '@vtex/api'
import { AppClient } from '@vtex/api'


export class ShippingPolicies extends AppClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('vtex.logistics@1.x', ctx, options)
    console.log('ctx from shipping-policy client: ', ctx)
  }


  public getShippingPolicy = async (accountName: string, environment: string, id: string) => {
    const url = `https://${accountName}.${environment}.com.br/api/logistics/pvt/shipping-policies/${id}`

    try {
      const response = await this.http.get(url,{headers: { 'content-type': 'application/json' }})
      return response.data
    } catch (error) {
      throw new Error(`Error fetching shipping policy: ${error.message}`)
    }
  }
}
