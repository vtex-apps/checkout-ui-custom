/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import { Tabs, Tab } from 'vtex.styleguide'
import { injectIntl, WrappedComponentProps } from 'react-intl'

import Colors from './components/Colors'
import LayoutSettings from './components/Layout'
import Javascript from './components/Javascript'
import Css from './components/Css'

const Admin: FC<WrappedComponentProps> = ({ intl }) => {
  const [state, setState] = useState<any>({
    currentTab: 1,
  })

  return (
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
          id: 'admin/checkout-ui.tab.javascript',
        })}
        active={state.currentTab === 3}
        onClick={() => setState({ ...state, currentTab: 3 })}
      >
        <Javascript />
      </Tab>
      <Tab
        label={intl.formatMessage({
          id: 'admin/checkout-ui.tab.css',
        })}
        active={state.currentTab === 4}
        onClick={() => setState({ ...state, currentTab: 4 })}
      >
        <Css />
      </Tab>
      <Tab
        label={intl.formatMessage({
          id: 'admin/checkout-ui.tab.history',
        })}
        active={state.currentTab === 5}
        onClick={() => setState({ ...state, currentTab: 5 })}
      >
        <div className="pa4">History change to rollback changes</div>
      </Tab>
    </Tabs>
  )
}

export default injectIntl(Admin)
