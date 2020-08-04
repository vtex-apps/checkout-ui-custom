interface ReqContext {
  account: string
  workspace: string
  authToken: string
  region: string
  production: boolean
  userAgent: string
}

interface Logger {
  log(content: string, level: LogLevel, details?: {}): PromiseLike<void>
}

interface OperationState {
  orderFormId: string
  ctx: ReqContext
  data?: OperationData
  logger: Logger
}

interface OperationData {
  orderForm?: any
  userProfileId: string
  cookie: string
}

type ProcessPaymentStep = (
  state: OperationState,
  next: () => Promise<void>
) => Promise<void>

type LogLevel = 'info' | 'error' | 'warning'

type Timings = { [middleware: string]: [number, number] }

declare module '*.json' {
  const value: any
  export default value
}
