import { Service, ServiceContext } from '@vtex/api'

import { resolvers } from './graphql'

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State {
    code: number
  }
}
// Export a service that defines route handlers and client options.
export default new Service({
  graphql: {
    resolvers: {
      Query: resolvers.Query,
      Mutation: resolvers.Mutation,
    },
  },
  routes: resolvers.Routes,
})
