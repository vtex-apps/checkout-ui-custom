/* eslint-disable no-console */
import React, { FC, useState } from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl'
import PropTypes from 'prop-types'
import { Textarea, Toggle } from 'vtex.styleguide'

const messages = defineMessages({
  label: {
    id: 'admin/checkout-ui.tab.javascript.label',
    defaultMessage: 'Custom Javascript',
  },
  helper: {
    id: 'admin/checkout-ui.tab.javascript.helper',
    defaultMessage: 'Changes here may impact your sales',
  },
  active: {
    id: 'admin/checkout-ui.toggle.active',
    defaultMessage: 'Active',
  },
})

const Javascript: FC<WrappedComponentProps & any> = ({
  initialState,
  onChange,
  intl,
}) => {
  const [state, setState] = useState<any>({
    value: initialState.value,
    active: initialState.active,
  })

  const handleChange = (e: any) => {
    const { value } = e.target
    const newState = { ...state, value }

    onChange(newState)
    setState(newState)
  }

  const parseText = (text: string) => {
    if (text === null) return ''
    const newText = text.replace(/\\n/g, String.fromCharCode(13))

    return newText
  }

  return (
    <div className="w-80 pa4">
      <Textarea
        size="large"
        rows={30}
        value={parseText(state.value)}
        onChange={(e: any) => handleChange(e)}
        label={intl.formatMessage(messages.label)}
        helpText={intl.formatMessage(messages.helper)}
      />
      <div className="mt6 dib">
        <Toggle
          label={intl.formatMessage(messages.active)}
          size="large"
          checked={state.active}
          onChange={() => setState({ ...state, active: !state.active })}
        />
      </div>
    </div>
  )
}

Javascript.propTypes = {
  onChange: PropTypes.func,
  initialState: PropTypes.any,
}

export default injectIntl(Javascript)
