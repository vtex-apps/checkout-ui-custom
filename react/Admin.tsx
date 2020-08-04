/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import {
  Layout,
  PageHeader,
  Tabs,
  Tab,
  Button,
  ActionMenu,
} from 'vtex.styleguide'
import { injectIntl, WrappedComponentProps } from 'react-intl'

import Colors from './components/Colors'
import LayoutSettings from './components/Layout'

const Admin: FC<WrappedComponentProps> = ({ intl }) => {
  const [state, setState] = useState<any>({
    currentTab: 1,
    workspace: 'master',
  })

  const options = ['A', 'B', 'C', 'master'].map(label => ({
    label,
    onClick: (e: any) => {
      setState({
        ...state,
        workspace: e.label,
      })
    },
  }))

  return (
    <Layout
      pageHeader={
        <div className="flex justify-center">
          <div className="w-100 mw-reviews-header">
            <PageHeader
              title={intl.formatMessage({
                id: 'admin/checkout-ui.title',
              })}
            >
              <span className="mr4">
                <div className="flex items-center">
                  <div className="ma3">
                    <ActionMenu
                      buttonProps={{
                        variation: 'secondary',
                      }}
                      label={state.workspace}
                      options={options}
                    />
                  </div>
                  <div className="ma3">
                    <Button variation="primary">Publish</Button>
                  </div>
                </div>
              </span>
            </PageHeader>
          </div>
        </div>
      }
      fullWidth
    >
      <Tabs fullWidth>
        <Tab
          label={intl.formatMessage({
            id: 'admin/checkout-ui.tab.layout',
          })}
          active={state.currentTab === 1}
          onClick={() => setState({ ...state, currentTab: 1 })}
        >
          <LayoutSettings />
        </Tab>
        <Tab
          label={intl.formatMessage({
            id: 'admin/checkout-ui.tab.colors',
          })}
          active={state.currentTab === 2}
          onClick={() => setState({ ...state, currentTab: 2 })}
        >
          <Colors />
        </Tab>
        <Tab
          label={intl.formatMessage({
            id: 'admin/checkout-ui.tab.history',
          })}
          active={state.currentTab === 3}
          onClick={() => setState({ ...state, currentTab: 3 })}
        >
          <div className="pa4">History change to rollback changes</div>
        </Tab>
      </Tabs>
    </Layout>
  )
}

export default injectIntl(Admin)
