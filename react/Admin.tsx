/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import { Layout, PageHeader, ColorPicker, Tabs, Tab } from 'vtex.styleguide'
import { injectIntl, WrappedComponentProps } from 'react-intl'

const Admin: FC<WrappedComponentProps> = ({ intl }) => {
  const [state, setState] = useState<any>({
    currentTab: 1,
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
    warningFaded: '#ffe6e6',
    muted1: '#ffb100',
    muted2: '#ffb100',
    muted3: '#ffb100',
    muted4: '#ffb100',
    muted5: '#ffb100',
    history: [],
  })

  const handleChange = (color: string, picker: string) => {
    const { history } = state

    history.push(color)

    setState({
      ...state,
      history,
      [picker]: color,
    })
  }

  return (
    <Layout
      pageHeader={
        <div className="flex justify-center">
          <div className="w-100 mw-reviews-header">
            <PageHeader
              title={intl.formatMessage({
                id: 'admin/checkout-ui.title',
              })}
            />
          </div>
        </div>
      }
      fullWidth
    >
      <Tabs fullWidth>
        <Tab
          label="Layout"
          active={state.currentTab === 1}
          onClick={() => setState({ ...state, currentTab: 1 })}
        >
          <div className="pa4">
            Choose between Vertical or Horizontal layout
          </div>
        </Tab>
        <Tab
          label="Colors"
          active={state.currentTab === 2}
          onClick={() => setState({ ...state, currentTab: 2 })}
        >
          <div className="w-80">
            <h3>Colors</h3>
            <div className="w-50 mb-4">
              <ColorPicker
                color={{ hex: state.base }}
                colorHistory={state.history}
                label="Base"
                onChange={(color: string) => {
                  handleChange(color, 'base')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.baseInverted }}
                colorHistory={state.history}
                label="Base inverted"
                onChange={(color: string) => {
                  handleChange(color, 'baseInverted')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.actionPrimary }}
                colorHistory={state.history}
                label="Action Primary"
                onChange={(color: string) => {
                  handleChange(color, 'actionPrimary')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.actionSecondary }}
                colorHistory={state.history}
                label="Action Secondary"
                onChange={(color: string) => {
                  handleChange(color, 'actionSecondary')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.emphasis }}
                colorHistory={state.history}
                label="Emphasis"
                onChange={(color: string) => {
                  handleChange(color, 'emphasis')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.disabled }}
                colorHistory={state.history}
                label="Disabled"
                onChange={(color: string) => {
                  handleChange(color, 'disabled')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.success }}
                colorHistory={state.history}
                label="Success"
                onChange={(color: string) => {
                  handleChange(color, 'success')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.successFaded }}
                colorHistory={state.history}
                label="Success faded"
                onChange={(color: string) => {
                  handleChange(color, 'successFaded')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.danger }}
                colorHistory={state.history}
                label="Danger"
                onChange={(color: string) => {
                  handleChange(color, 'danger')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.dangerFaded }}
                colorHistory={state.history}
                label="Danger faded"
                onChange={(color: string) => {
                  handleChange(color, 'dangerFaded')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.warning }}
                colorHistory={state.history}
                label="Warning"
                onChange={(color: string) => {
                  handleChange(color, 'warning')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.warningFaded }}
                colorHistory={state.history}
                label="Warning faded"
                onChange={(color: string) => {
                  handleChange(color, 'warningFaded')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.muted1 }}
                colorHistory={state.history}
                label="Muted 1"
                onChange={(color: string) => {
                  handleChange(color, 'muted1')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.muted2 }}
                colorHistory={state.history}
                label="Muted 2"
                onChange={(color: string) => {
                  handleChange(color, 'muted2')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.muted3 }}
                colorHistory={state.history}
                label="Muted 3"
                onChange={(color: string) => {
                  handleChange(color, 'muted3')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.muted4 }}
                colorHistory={state.history}
                label="Muted 4"
                onChange={(color: string) => {
                  handleChange(color, 'muted4')
                }}
              />
            </div>

            <div className="w-50">
              <ColorPicker
                color={{ hex: state.muted5 }}
                colorHistory={state.history}
                label="Muted 5"
                onChange={(color: string) => {
                  handleChange(color, 'muted5')
                }}
              />
            </div>
          </div>
        </Tab>
        <Tab
          label="Change history"
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
