/* eslint-disable no-console */
import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

export default class RequestHub extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super(`https://platform.io.vtex.com/${context.account}`, context, options)
  }

  public authToken() {
    return this.context.authToken
  }

  public account() {
    return this.context.account
  }

  public currentWorkspace() {
    return this.context.workspace
  }

  public get(url: string, headers: any, data?: any) {
    return this.http.getRaw(url, {
      headers,
      data,
    })
  }

  public post(url: string, data: any, headers?: any) {
    return this.http.postRaw(url, data, {
      headers,
    })
  }

  public put(url: string, data: any, headers?: any) {
    return this.http.putRaw(url, data, {
      headers,
    })
  }

  public delete(url: string) {
    return this.http.delete(url)
  }
}
