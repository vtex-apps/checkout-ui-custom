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