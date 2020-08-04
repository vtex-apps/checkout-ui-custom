/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import { defineMessages, InjectedIntlProps, injectIntl } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import { useRuntime } from 'vtex.render-runtime'

import {
  Layout,
  PageBlock,
  PageHeader,
  ActionMenu,
  Button,
  Spinner,
} from 'vtex.styleguide'

import query from './queries/getWorkspaces.gql'

const messages = defineMessages({
  title: {
    id: 'admin/checkout-ui.title',
    defaultMessage: 'Checkout custom interface',
  },
})

// This component generates the base layout for this app.
const PageLayout: FC<any & InjectedIntlProps> = ({
  children,
  intl,
  data: { loading: workspaceLoading, getWorkspaces },
}: any) => {
  const { workspace } = useRuntime()

  const [state, setState] = useState<any>({
    workspace: window.localStorage.getItem('workspace') || workspace,
  })

  const setWorkspace = (e: any) => {
    window.localStorage.setItem('workspace', e.label)
    setState({
      ...state,
      workspace: e.label,
    })
  }

  const options = (list: any) => {
    if (!list) return {}

    return list.map((workspace: any) => ({
      label: workspace.name,
      onClick: (e: any) => {
        setWorkspace(e)
      },
    }))
  }

  return (
    <Layout
      fullWidth
      pageHeader={
        <PageHeader title={intl.formatMessage(messages.title)}>
          <span className="mr4">
            <div className="flex items-center">
              {workspaceLoading && (
                <div className="ma3">
                  <Spinner size="12" />
                </div>
              )}
              <div className="ma3">
                <ActionMenu
                  buttonProps={{
                    variation: 'secondary',
                  }}
                  label={state.workspace}
                  options={options(getWorkspaces)}
                />
              </div>
              <div className="ma3">
                <Button variation="primary">Publish</Button>
              </div>
            </div>
          </span>
        </PageHeader>
      }
    >
      <PageBlock>{children}</PageBlock>
    </Layout>
  )
}

export default injectIntl(
  compose(
    graphql(query, {
      options: {
        ssr: false,
      },
    })
  )(PageLayout)
)
