/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import { injectIntl, WrappedComponentProps, defineMessages } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import {
  Tabs,
  Tab,
  Layout,
  PageBlock,
  PageHeader,
  ActionMenu,
  Button,
  Spinner,
} from 'vtex.styleguide'
import { useRuntime } from 'vtex.render-runtime'

import Colors from './components/Colors'
import LayoutSettings from './components/Layout'
import Javascript from './components/Javascript'
import Css from './components/Css'
import History from './components/History'
import query from './queries/getWorkspaces.gql'

const messages = defineMessages({
  title: {
    id: 'admin/checkout-ui.title',
    defaultMessage: 'Checkout custom interface',
  },
})

const defaultConfiguration = {
  colors: {
    base: '#f4f2f2',
    baseInverted: '#21364f',
    actionPrimary: '#1a73e8',
    actionSecondary: '#f1f7ff',
    emphasis: '#000000',
    disabled: '#999999',
    success: '#2fba2d',
    successFaded: '#beffa5',
    danger: '#ff4c4c',
    dangerFaded: '#ffe6e6',
    warning: '#ffb100',
    warningFaded: '#fff6e0',
    muted1: '#323232',
    muted2: '#676767',
    muted3: '#999999',
    muted4: '#cbcbcb',
    muted5: '#eeeeee',
  },
  layout: {
    type: 'vertical',
    accordionPayments: true,
    deliveryDateFormat: true,
    showCartQuantityPrice: false,
    showCheckoutSteps: true,
    countingSteps: true,
    showCouponField: false,
    showNoteField: false,
    buttonShadow: false,
  },
  css: '',
  javascript: '',
}

const Admin: FC<any & WrappedComponentProps> = ({
  intl,
  data: { loading: workspaceLoading, getWorkspaces },
}: any) => {
  const { workspace } = useRuntime()
  const [state, setState] = useState<any>({
    ...defaultConfiguration,
    currentTab: 1,
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

    return list.map((workspc: any) => ({
      label: workspc.name,
      onClick: (e: any) => {
        setWorkspace(e)
      },
    }))
  }

  const handleLayoutChange = (layout: any) => {
    setState({
      ...state,
      layout,
    })
  }

  const handleColorsChange = (colors: any) => {
    setState({
      ...state,
      colors,
    })
  }

  const handleCssChange = (css: string) => {
    setState({
      ...state,
      css,
    })
  }

  const handleJSChange = (javascript: string) => {
    setState({
      ...state,
      javascript,
    })
  }

  console.log('State => ', state)

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
      <PageBlock>
        <Tabs fullWidth>
          <Tab
            label={intl.formatMessage({
              id: 'admin/checkout-ui.tab.layout',
            })}
            active={state.currentTab === 1}
            onClick={() => setState({ ...state, currentTab: 1 })}
          >
            <LayoutSettings
              onChange={handleLayoutChange}
              initialState={state.layout}
            />
          </Tab>
          <Tab
            label={intl.formatMessage({
              id: 'admin/checkout-ui.tab.colors',
            })}
            active={state.currentTab === 2}
            onClick={() => setState({ ...state, currentTab: 2 })}
          >
            <Colors onChange={handleColorsChange} initialState={state.colors} />
          </Tab>
          <Tab
            label={intl.formatMessage({
              id: 'admin/checkout-ui.tab.javascript',
            })}
            active={state.currentTab === 3}
            onClick={() => setState({ ...state, currentTab: 3 })}
          >
            <Javascript
              onChange={handleJSChange}
              initialState={state.javascript}
            />
          </Tab>
          <Tab
            label={intl.formatMessage({
              id: 'admin/checkout-ui.tab.css',
            })}
            active={state.currentTab === 4}
            onClick={() => setState({ ...state, currentTab: 4 })}
          >
            <Css onChange={handleCssChange} initialState={state.css} />
          </Tab>
          <Tab
            label={intl.formatMessage({
              id: 'admin/checkout-ui.tab.history',
            })}
            active={state.currentTab === 5}
            onClick={() => setState({ ...state, currentTab: 5 })}
          >
            <History />
          </Tab>
        </Tabs>
      </PageBlock>
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
  )(Admin)
)
