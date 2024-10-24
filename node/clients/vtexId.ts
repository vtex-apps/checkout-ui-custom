import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

interface AuthenticatedUser {
  user: string
}

export default class VtexId extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, { ...options })
  }

  public async getAuthenticatedUser(
    authToken: string
  ): Promise<AuthenticatedUser> {
    return this.http.get('/api/vtexid/pub/authenticated/user/', {
      params: { authToken },
      metric: 'authenticated-user-get',
    })
  }
}