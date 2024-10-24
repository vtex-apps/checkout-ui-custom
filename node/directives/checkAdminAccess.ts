import { AuthenticationError, ForbiddenError } from '@vtex/api'
import { SchemaDirectiveVisitor } from 'graphql-tools'
import type { GraphQLField } from 'graphql'
import { defaultFieldResolver } from 'graphql'

import {
  validateAdminToken,
  validateAdminTokenOnHeader,
  validateApiToken,
} from './helper'

export class CheckAdminAccess extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = async (
      root: any,
      args: any,
      context: Context,
      info: any
    ) => {
      const {
        vtex: { adminUserAuthToken, storeUserAuthToken, logger },
      } = context

      const { hasAdminToken, hasValidAdminToken, hasCurrentValidAdminToken } =
        await validateAdminToken(context, adminUserAuthToken as string)

      const {
        hasAdminTokenOnHeader,
        hasValidAdminTokenOnHeader,
        hasCurrentValidAdminTokenOnHeader,
      } = await validateAdminTokenOnHeader(context)

      const { hasApiToken, hasValidApiToken, hasCurrentValidApiToken } =
        await validateApiToken(context)

      const hasStoreToken = !!storeUserAuthToken // we don't need to validate store token

      // now we emit a metric with all the collected data before we proceed
      const operation = field.astNode?.name?.value ?? context.request.url
      const userAgent = context?.request?.headers['user-agent'] as string
      const caller = context?.request?.headers['x-vtex-caller'] as string
      const forwardedHost = context?.request?.headers[
        'x-forwarded-host'
      ] as string



      if (!hasAdminToken && !hasApiToken && !hasAdminTokenOnHeader) {
        logger.warn({
          message: 'CheckAdminAccess: No token provided',
          userAgent,
          caller,
          forwardedHost,
          operation,
          hasAdminToken,
          hasValidAdminToken,
          hasApiToken,
          hasValidApiToken,
          hasStoreToken,
          hasAdminTokenOnHeader,
          hasValidAdminTokenOnHeader,
        })
        throw new AuthenticationError('No token was provided')
      }

      if (
        !hasCurrentValidAdminToken &&
        !hasCurrentValidApiToken &&
        !hasCurrentValidAdminTokenOnHeader
      ) {
        logger.warn({
          message: 'CheckAdminAccess: Invalid token',
          userAgent,
          caller,
          forwardedHost,
          operation,
          hasAdminToken,
          hasValidAdminToken,
          hasApiToken,
          hasValidApiToken,
          hasStoreToken,
          hasAdminTokenOnHeader,
          hasValidAdminTokenOnHeader,
        })
        throw new ForbiddenError('Unauthorized Access')
      }

      return resolve(root, args, context, info)
    }
  }
}