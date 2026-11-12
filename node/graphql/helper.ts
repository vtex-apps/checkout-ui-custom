const APP_KEY_PREFIX = 'vtexappkey-'

const decodeJwtPayload = (token: string): any => {
  try {
    const [, payload] = token.split('.')

    if (!payload) return null

    return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
  } catch {
    return null
  }
}

const startsWithAppKey = (value: unknown) =>
  typeof value === 'string' && value.toLowerCase().startsWith(APP_KEY_PREFIX)

/**
 * Detects tokens generated through /api/vtexid/apptoken/login (appKey + appToken).
 * Checks both the VTEX ID validation response and the JWT payload itself.
 */
export const isAppKeyToken = (authUser: any, token: string): boolean => {
  const payload = decodeJwtPayload(token)

  return (
    startsWithAppKey(authUser?.user) ||
    startsWithAppKey(authUser?.id) ||
    String(authUser?.tokenType ?? '').toLowerCase() === 'appkey' ||
    startsWithAppKey(payload?.sub) ||
    startsWithAppKey(payload?.userId) ||
    String(payload?.tokenType ?? '').toLowerCase() === 'appkey'
  )
}

export const validateAdminToken = async (
    context: Context,
    adminUserAuthToken: string
  ): Promise<{
    hasAdminToken: boolean
    hasValidAdminToken: boolean
    hasCurrentValidAdminToken: boolean
    hasValidAdminRole: any
  }> => {
    const {
      clients: { identity, lm },
      vtex: { account, logger },
    } = context

    // check if has admin token and if it is valid
    const hasAdminToken = !!adminUserAuthToken
    let hasValidAdminToken = false
    let hasValidAdminRole = false
    let userRoles = []
    // this is used to check if the token is valid by current standards
    let hasCurrentValidAdminToken = false
  
    if (hasAdminToken) {
        
      try {
        
        const authUser = await identity.validateToken({
            token: adminUserAuthToken,
        })
        // tokens generated from an appKey/appToken pair are not allowed
        // to perform this operation, only real admin users
        if (isAppKeyToken(authUser, adminUserAuthToken)) {
          logger.warn({
            message: 'CheckAdminAccess: appKey tokens are not allowed',
            user: authUser?.user,
          })

          return {
            hasAdminToken,
            hasValidAdminToken: false,
            hasCurrentValidAdminToken: false,
            hasValidAdminRole: false,
          }
        }

        // we set this flag to true if the token is valid by current standards
        // in the future we should remove this line
        hasCurrentValidAdminToken = true
  
        if (authUser?.audience === 'admin' && authUser?.account === account) {
          hasValidAdminToken = await lm.getUserAdminPermissions(
            account,
            authUser.id
          )

          userRoles = await lm.getUserRolePermissions(
            account,
            authUser.id
          )

          hasValidAdminRole = userRoles.filter( (role : any) => role.resourceKey == "SaveOrderFormConfiguration").length ? true : false;

        }
      } catch (err) {
        // noop so we leave hasValidAdminToken as false
        logger.warn({
          message: 'Error validating admin token',
          err,
        })
      }
    }
  
    return { hasAdminToken, hasValidAdminToken, hasCurrentValidAdminToken, hasValidAdminRole }
  }