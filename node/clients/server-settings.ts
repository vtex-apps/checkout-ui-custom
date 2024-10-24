/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InstanceOptions, IOContext } from '@vtex/api'
import { AppClient } from '@vtex/api'

export class SaveVB extends AppClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`vtex.checkout-ui-settings-server@0.x`, context, {
      headers: {
        ...options?.headers,
        ...(context.adminUserAuthToken
          ? { VtexIdclientAutCookie: context.adminUserAuthToken }
          : null),
      },
    })
  }

  

  public saveVB = async (data: any) => {

    console.log(this)
    
    await this.http
      .post('/_v/checkout-ui-custom/savevb', data)
      .catch(err => {
        throw new Error(err)
      })
  }

}
