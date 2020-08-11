import React, { useState } from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl'
import PropTypes from 'prop-types'
import { Textarea, Toggle } from 'vtex.styleguide'

const messages = defineMessages({
  label: {
    id: 'admin/checkout-ui.tab.css.label',
    defaultMessage: 'Custom CSS',
  },
  helper: {
    id: 'admin/checkout-ui.tab.css.helper',
    defaultMessage: 'Changes here may impact your sales',
  },
})

const Css: StorefrontFunctionComponent<WrappedComponentProps & any> = ({
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
          label="Activate"
          size="large"
          checked={state.active}
          onChange={() => setState({ ...state, active: !state.active })}
        />
      </div>
    </div>
  )
}

Css.propTypes = {
  onChange: PropTypes.func,
  initialState: PropTypes.any,
}

export default injectIntl(Css)
