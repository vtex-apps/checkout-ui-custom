/* eslint-disable no-console */
import { Apps } from '@vtex/api'

import GraphQLError from '../utils/GraphQLError'

const SCHEMA_VERSION = 'v0.1.1'
const DATA_ENTITY = 'checkoutcustom'

const routes = {
  getProfile: () =>
    `http://${process.env.VTEX_ACCOUNT}.vtexcommercestable.com.br/no-cache/profileSystem/getProfile`,
  baseUrl: () =>
    `http://${process.env.VTEX_ACCOUNT}.vtexcommercestable.com.br/api`,
  configEntity: () => `${routes.baseUrl()}/dataentities/${DATA_ENTITY}`,
  listConfig: () =>
    `${routes.configEntity()}/search?_schema=${SCHEMA_VERSION}&_fields=id,email,workspace,creationDate,appVersion&_sort=creationDate DESC`,
  getConfig: (id: string) =>
    `${routes.configEntity()}/documents/${id}?_fields=id,email,cartName,items,creationDate,subtotal,discounts,shipping,total,customData,address`,
  saveSchema: () => `${routes.configEntity()}/schemas/${SCHEMA_VERSION}`,
}

const defaultHeaders = (authToken: string) => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  VtexIdclientAutCookie: authToken,
  'Proxy-Authorization': authToken,
})

const getAppId = (): string => {
  return process.env.VTEX_APP_ID ?? ''
}

const schema = {
  properties: {
    email: {
      type: 'string',
      title: 'Email',
    },
    workspace: {
      type: 'string',
      title: 'Workspace',
    },
    creationDate: {
      type: 'string',
      title: 'Creation Date',
    },
    appVersion: {
      type: 'string',
      title: 'App Version',
    },
    layout: {
      type: ['null', 'object'],
      title: 'Layout',
    },
    colors: {
      type: ['null', 'object'],
      title: 'Colors',
    },
    javascript: {
      type: ['null', 'string'],
      title: 'Custom Javascript',
    },
    css: {
      type: ['null', 'string'],
      title: 'Custom CSS',
    },
  },
  'v-indexed': ['email', 'workspace', 'creationDate', 'appVersion'],
  'v-default-fields': ['email', 'workspace', 'creationDate', 'appVersion'],
  'v-cache': false,
}

export const resolvers = {
  Routes: {},
  Mutation: {
    saveChanges: async (_: any, params: any, ctx: any) => {
      const {
        clients: { masterdata },
      } = ctx

      const creationDate = String(new Date().getTime())
      const appVersion = process.env.VTEX_APP_VERSION
      const data = await masterdata
        .createDocument({
          dataEntity: DATA_ENTITY,
          fields: {
            ...params,
            creationDate,
            appVersion,
          },
          schema: SCHEMA_VERSION,
        })
        .then((res: any) => {
          console.log('RES CREATE =>', res)

          return res
        })
        .catch((e: any) => {
          console.log('RES CREATE FAILED =>', e)
        })

      console.log('DATA =>', data)
    },
  },
  Query: {
    getSetupConfig: async (_: any, __: any, ctx: any) => {
      const {
        clients: { masterdata },
      } = ctx

      const apps = new Apps(ctx.vtex)
      const app: string = getAppId()
      const settings = await apps.getAppSettings(app)

      if (
        !settings.adminSetup ||
        !settings.adminSetup?.hasSchema ||
        settings.adminSetup?.schemaVersion !== SCHEMA_VERSION
      ) {
        if (!settings.adminSetup) {
          settings.adminSetup = {}
        }

        try {
          await masterdata
            .createOrUpdateSchema({
              dataEntity: DATA_ENTITY,
              schemaName: SCHEMA_VERSION,
              schemaBody: schema,
            })
            .then(() => {
              settings.adminSetup.hasSchema = true
              settings.adminSetup.schemaVersion = SCHEMA_VERSION
            })
            .catch(() => {
              settings.adminSetup.hasSchema = false
            })
        } catch (e) {
          settings.adminSetup.hasSchema = false
        }

        await apps.saveAppSettings(app, settings)
      }

      return settings
    },
    getHistory: async (_: any, __: any, ctx: any) => {
      const {
        clients: { masterdata },
      } = ctx

      const { data } = await masterdata
        .searchDocuments({
          dataEntity: DATA_ENTITY,
          schema: SCHEMA_VERSION,
          fields: ['id', 'email', 'workspace', 'creationDate', 'appVersion'],
          sort: 'creationDate DESC',
          pagination: {
            page: 1,
            pageSize: 30,
          },
        })
        .then((res: any) => {
          console.log('History res =>', res)

          return res
        })
        .catch((e: any) => {
          console.log('History catch =>', e)
        })

      return data
    },
    getLast: async (_: any, __: any, ctx: any) => {
      const {
        clients: { masterdata },
      } = ctx

      const last = await masterdata
        .searchDocuments({
          dataEntity: DATA_ENTITY,
          schema: SCHEMA_VERSION,
          fields: ['id'],
          sort: 'creationDate DESC',
          pagination: {
            page: 1,
            pageSize: 1,
          },
        })
        .then((res: any) => res)

      if (!last.length) return {}

      const { data } = await masterdata.getDocument({
        dataEntity: DATA_ENTITY,
        id: last[0].id,
        fields: [
          'id',
          'email',
          'workspace',
          'creationDate',
          'appVersion',
          'layout',
          'javascript',
          'css',
          'colors',
        ],
      })

      return data ?? {}
    },
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
