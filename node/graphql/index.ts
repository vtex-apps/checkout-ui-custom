import GraphQLError from '../utils/GraphQLError'

const defaultHeaders = (authToken: string) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  VtexIdclientAutCookie: authToken,
  'Proxy-Authorization': authToken,
})

export const resolvers = {
  Routes: {},
  Query: {
    getWorkspaces: async (_: any, __: any, ctx: any) => {
      const {
        vtex: { authToken, account },
        clients: { hub },
      } = ctx

      try {
        const url = `http://platform.io.vtex.com/${account}/`
        const { data } = await hub.get(url, defaultHeaders(authToken))

        return data
      } catch (e) {
        if (e.message) {
          throw new GraphQLError(e.message)
        } else if (e.response && e.response.data && e.response.data.message) {
          throw new GraphQLError(e.response.data.message)
        }
      }
    },
  },
}
