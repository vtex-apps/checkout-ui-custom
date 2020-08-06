import React, { FC, useState } from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl'
import PropTypes from 'prop-types'
import { Textarea } from 'vtex.styleguide'

const messages = defineMessages({
  label: {
    id: 'admin/checkout-ui.tab.javascript.label',
    defaultMessage: 'Custom Javascript',
  },
  helper: {
    id: 'admin/checkout-ui.tab.javascript.helper',
    defaultMessage: 'Changes here may impact your sales',
  },
})

const Javascript: FC<WrappedComponentProps & any> = ({
  initialState,
  onChange,
  intl,
}) => {
  const [state, setState] = useState<any>({
    value: initialState,
  })

  const handleChange = (e: any) => {
    const { value } = e.target

    onChange(value)
    setState({ value })
  }

  return (
    <div className="w-80 pa4">
      <Textarea
        size="large"
        rows={30}
        value={state.value}
        onChange={(e: any) => handleChange(e)}
        label={intl.formatMessage(messages.label)}
        helpText={intl.formatMessage(messages.helper)}
      />
    </div>
  )
}

Javascript.propTypes = {
  onChange: PropTypes.func,
  initialState: PropTypes.any,
}

export default injectIntl(Javascript)
