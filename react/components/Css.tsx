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
  active: {
    id: 'admin/checkout-ui.toggle.active',
    defaultMessage: 'Active',
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

  const handleChange = (key: string, value: any) => {
    const newState = { ...state, [key]: value }

    onChange(newState)
    setState(newState)
  }

  const parseText = (text: string) => {
    if (text === null) return ''
    const newText = text.replace(/\\n/g, String.fromCharCode(13))

    return newText
  }

  return (
    <div className="w-100 pa4">
      <Textarea
        size="large"
        rows={30}
        value={parseText(state.value)}
        onChange={(e: any) => handleChange('value', e.target.value)}
        label={intl.formatMessage(messages.label)}
        helpText={intl.formatMessage(messages.helper)}
      />
      <div className="mt6 dib">
        <Toggle
          label={intl.formatMessage(messages.active)}
          size="large"
          checked={state.active}
          onChange={(e: any) => handleChange('active', e.currentTarget.checked)}
        />
      </div>
    </div>
  )
}

Css.propTypes = {
  onChange: PropTypes.func,
  initialState: PropTypes.any,
  intl: PropTypes.any,
}

export default injectIntl(Css)
