import { ForbiddenError } from '@vtex/api'
import { validateAdminToken } from './helper'

export const authCheck = async (ctx: Context, app: string) => {
  const {
    vtex: { logger },
  } = ctx

    const version = app.split(`@`)[1]

    const cookie = ctx.headers?.cookie

    const vtexCredentials: any = cookie
      ? cookie
          .split('; ')
          .find((cookie: string) => cookie.startsWith('VtexIdclientAutCookie='))
          ?.split('=')[1] ?? ''
      : '';


    if (version <= `0.18.9`) {
      logger.warn({
        message: 'Error: Invalid version',
      })
      throw new ForbiddenError('Unauthorized version')
    }

    if (!vtexCredentials.trim()) {
      logger.warn({
        message: 'CheckAdminAccess: Invalid token',
      })
      throw new ForbiddenError('Unauthorized Access')
    }

    if (vtexCredentials) {
      const permission = await validateAdminToken(ctx, vtexCredentials)

      if (
        !permission.hasAdminToken ||
        !permission.hasValidAdminToken ||
        !permission.hasCurrentValidAdminToken ||
        !permission.hasValidAdminRole
      ) {
        logger.warn({
          message: 'CheckAdminAccess: Invalid store token',
        })
        throw new ForbiddenError('Unauthorized Access Token')
      }
    }
  
}
