import { IOClients } from '@vtex/api'

import { SaveVB } from './server-settings'
import LMClient from './LMClient'
import VtexId from './vtexId'
import IdentityClient from './IdentityClient'


// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {

  public get lm() {
    return this.getOrSet('lm', LMClient)
  }
  public get vtexId() {
    return this.getOrSet('vtexId', VtexId)
  }
  public get identity() {
    return this.getOrSet('identity', IdentityClient)
  }
  public get server() {
    return this.getOrSet('server', SaveVB)
  }
}

