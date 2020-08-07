/* eslint-disable no-console */
import React, { FC } from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import { useQuery, useLazyQuery } from 'react-apollo'
import PropTypes from 'prop-types'
import { Table, Button } from 'vtex.styleguide'

import query from '../queries/getHistory.gql'
import GET_BY_ID from '../queries/getById.gql'

const History: FC<any & WrappedComponentProps> = ({ intl, onChange }: any) => {
  const { loading, data } = useQuery(query)

  const [getConfig, { loading: loadingConfig }] = useLazyQuery(GET_BY_ID, {
    onCompleted: (res: any) => {
      onChange(res.getById)
    },
  })

  const load = (id: string) => {
    getConfig({
      variables: {
        id,
      },
    })
  }

  const customSchema = {
    properties: {
      email: {
        title: 'Email',
        width: 300,
      },
      workspace: {
        title: 'Workspace',
        width: 200,
      },
      appVersion: {
        title: 'App Version',
        width: 100,
      },
      creationDate: {
        title: 'Creation data',
        width: 200,
        // eslint-disable-next-line react/display-name
        cellRenderer: ({ cellData }: any) => {
          const datetime = new Date(parseInt(cellData, 10))

          return (
            <span>
              {intl.formatDate(datetime, {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}{' '}
              {intl.formatTime(datetime, {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
              })}
            </span>
          )
        },
      },
      id: {
        title: ' ',
        width: 200,
        // eslint-disable-next-line react/display-name
        cellRenderer: ({ rowData }: any) => {
          return (
            <Button
              variation="tertiary"
              size="small"
              disabled={loadingConfig}
              onClick={() => {
                load(rowData.id)
              }}
            >
              Load
            </Button>
          )
        },
      },
    },
  }

  const items = data?.getHistory || []

  return (
    <div className="w-80 pt6">
      <Table
        fullWidth
        loading={loading}
        schema={customSchema}
        items={items}
        indexColumnLabel="#"
      />
    </div>
  )
}

History.propTypes = {
  onChange: PropTypes.func,
}

export default injectIntl(History)
