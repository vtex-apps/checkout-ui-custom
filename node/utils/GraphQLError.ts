export default class GraphQLError extends Error {
  public extensions: any

  constructor(message: string, details?: any) {
    super(message)
    this.extensions = { message, ...details }
  }
}
