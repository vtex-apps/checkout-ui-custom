/* eslint-disable no-console */
import React, { FC } from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import { Table, Button } from 'vtex.styleguide'

import query from '../queries/getHistory.gql'

const History: FC<any & WrappedComponentProps> = ({
  data: { loading, getHistory },
  intl,
}: any) => {
  const load = (id: string) => {
    console.log('Load ID =>', id)
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
          return (
            <span>
              {intl.formatDate(cellData, {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              })}{' '}
              {intl.formatTime(cellData, {
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

  const items = getHistory || []

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

export default injectIntl(
  compose(
    graphql(query, {
      options: {
        ssr: false,
      },
    })
  )(History)
)
