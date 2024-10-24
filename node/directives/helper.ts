
export const validateAdminToken = async (
  context: Context,
  adminUserAuthToken: string
): Promise<{
  hasAdminToken: boolean
  hasValidAdminToken: boolean
  hasCurrentValidAdminToken: boolean
}> => {
  const {
    clients: { identity, lm },
    vtex: { account, logger },
  } = context

  // check if has admin token and if it is valid
  const hasAdminToken = !!adminUserAuthToken
  let hasValidAdminToken = false
  // this is used to check if the token is valid by current standards
  let hasCurrentValidAdminToken = false

  if (hasAdminToken) {
    try {
      const authUser = await identity.validateToken({
        token: adminUserAuthToken,
      })

      // we set this flag to true if the token is valid by current standards
      // in the future we should remove this line
      hasCurrentValidAdminToken = true

      if (authUser?.audience === 'admin' && authUser?.account === account) {
        hasValidAdminToken = await lm.getUserAdminPermissions(
          account,
          authUser.id
        )
      }
    } catch (err) {
      // noop so we leave hasValidAdminToken as false
      logger.warn({
        message: 'Error validating admin token',
        err,
      })
    }
  }

  return { hasAdminToken, hasValidAdminToken, hasCurrentValidAdminToken }
}

export const validateApiToken = async (
  context: Context
): Promise<{
  hasApiToken: boolean
  hasValidApiToken: boolean
  hasCurrentValidApiToken: boolean
}> => {
  const {
    clients: { identity, lm },
    vtex: { account, logger },
  } = context

  // check if has api token and if it is valid
  const apiToken = context?.headers['vtex-api-apptoken'] as string
  const appKey = context?.headers['vtex-api-appkey'] as string
  const hasApiToken = !!(apiToken?.length && appKey?.length)
  let hasValidApiToken = false

  // this is used to check if the token is valid by current standards
  let hasCurrentValidApiToken = false

  if (hasApiToken) {
    try {
      const { token } = await identity.getToken({
        appkey: appKey,
        apptoken: apiToken,
      })

      const authUser = await identity.validateToken({
        token,
      })

      // we set this flag to true if the token is valid by current standards
      // in the future we should remove this line
      hasCurrentValidApiToken = true
      // keeping this behavior for now, but we should remove it in the future as well
      context.cookies.set('VtexIdclientAutCookie', token)
      context.vtex.adminUserAuthToken = token

      if (authUser?.audience === 'admin' && authUser?.account === account) {
        hasValidApiToken = await lm.getUserAdminPermissions(
          account,
          authUser.id
        )
      }
    } catch (err) {
      // noop so we leave hasValidApiToken as false
      logger.warn({
        message: 'Error validating API token',
        err,
      })
    }
  }

  return { hasApiToken, hasValidApiToken, hasCurrentValidApiToken }
}

export const validateStoreToken = async (
  context: Context,
  storeUserAuthToken: string
): Promise<{
  hasStoreToken: boolean
  hasValidStoreToken: boolean
  hasCurrentValidStoreToken: boolean
}> => {
  const {
    clients: { vtexId },
    vtex: { logger },
  } = context

  // check if has store token and if it is valid
  const hasStoreToken = !!storeUserAuthToken
  let hasValidStoreToken = false
  // this is used to check if the token is valid by current standards
  let hasCurrentValidStoreToken = false

  if (hasStoreToken) {
    try {
      const authUser = await vtexId.getAuthenticatedUser(storeUserAuthToken)

      if (authUser?.user) {
        // we set this flag to true if the token is valid by current standards
        // in the future we should remove this line
        hasCurrentValidStoreToken = true


        // adding log to better understand invalid store token use cases
        // in the future we should remove this log
        if (hasCurrentValidStoreToken && !hasValidStoreToken) {
          logger.warn({
            message: 'Invalid store token:',
            operation: context?.request?.url,
            userAgent: context?.request?.headers['user-agent'] as string,
            caller: context?.request?.headers['x-vtex-caller'] as string,
            forwardedHost: context?.request?.headers[
              'x-forwarded-host'
            ] as string,
            authUser,
          })
        }
      }
    } catch (err) {
      // noop so we leave hasValidStoreToken as false
      logger.warn({
        message: 'Error validating store token:',
        err,
      })
    }
  }

  return { hasStoreToken, hasValidStoreToken, hasCurrentValidStoreToken }
}

export const validateAdminTokenOnHeader = async (
  context: Context
): Promise<{
  hasAdminTokenOnHeader: boolean
  hasValidAdminTokenOnHeader: boolean
  hasCurrentValidAdminTokenOnHeader: boolean
}> => {
  const adminUserAuthToken = context?.headers.vtexidclientautcookie as string
  const hasAdminTokenOnHeader = !!adminUserAuthToken?.length

  if (!hasAdminTokenOnHeader) {
    return {
      hasAdminTokenOnHeader: false,
      hasValidAdminTokenOnHeader: false,
      hasCurrentValidAdminTokenOnHeader: false,
    }
  }

  const { hasAdminToken, hasCurrentValidAdminToken, hasValidAdminToken } =
    await validateAdminToken(context, adminUserAuthToken)

  return {
    hasAdminTokenOnHeader: hasAdminToken,
    hasValidAdminTokenOnHeader: hasValidAdminToken,
    hasCurrentValidAdminTokenOnHeader: hasCurrentValidAdminToken,
  }
}