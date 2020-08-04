import React, { FC, useState } from 'react'
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl'
import { Textarea } from 'vtex.styleguide'

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

const Css: FC<WrappedComponentProps> = ({ intl }) => {
  const [state, setState] = useState<any>({
    value: null,
  })

  return (
    <div className="w-80 pa4">
      <Textarea
        size="large"
        rows={30}
        value={state.value}
        onChange={(e: any) => setState({ value: e.target.value.trim() })}
        label={intl.formatMessage(messages.label)}
        helpText={intl.formatMessage(messages.helper)}
      />
    </div>
  )
}

export default injectIntl(Css)
