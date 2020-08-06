import React, { FC, useState } from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import PropTypes from 'prop-types'
import { RadioGroup, Toggle } from 'vtex.styleguide'

const LayoutSettings: FC<WrappedComponentProps & any> = ({
  initialState,
  onChange,
}) => {
  const [state, setState] = useState<any>({
    ...initialState,
  })

  const handleChange = (value: any, key: string) => {
    const newState = { ...state, [key]: value }

    setState(newState)
    onChange(newState)
  }

  return (
    <div className="w-80 pa4">
      <div className="w-50 mb-4">
        <RadioGroup
          label="Orientation"
          hideBorder
          name="orientation"
          size="large"
          options={[
            { value: 'vertical', label: 'Vertical (single page)' },
            { value: 'horizontal', label: 'Horizontal (multiple pages)' },
          ]}
          value={state.type}
          onChange={(e: any) => handleChange(e.currentTarget.value, 'type')}
        />
      </div>
      <br />

      <div className="mt6 dib">
        <Toggle
          label="Horizontal payment"
          size="large"
          checked={state.accordionPayments}
          onChange={() =>
            handleChange(!state.accordionPayments, 'accordionPayments')
          }
        />
      </div>
      <br />

      <div className="mt6 dib">
        <Toggle
          label="Delivery date as text"
          size="large"
          checked={state.deliveryDateFormat}
          onChange={() =>
            handleChange(!state.deliveryDateFormat, 'deliveryDateFormat')
          }
        />
      </div>
      <br />

      <div className="mt6 dib">
        <Toggle
          label="Show cart quantity price"
          size="large"
          checked={state.showCartQuantityPrice}
          onChange={() =>
            handleChange(!state.showCartQuantityPrice, 'showCartQuantityPrice')
          }
        />
      </div>
      <br />

      <div className="mt6 dib">
        <Toggle
          label="Show checkout steps"
          size="large"
          checked={state.showCheckoutSteps}
          onChange={() =>
            handleChange(!state.showCheckoutSteps, 'showCheckoutSteps')
          }
        />
      </div>
      <br />

      <div className="mt6 dib">
        <Toggle
          label="Counting steps"
          size="large"
          disabled={!state.showCheckoutSteps}
          checked={state.countingSteps}
          onChange={() => handleChange(!state.countingSteps, 'countingSteps')}
        />
      </div>
      <br />

      <div className="mt6 dib">
        <Toggle
          label="Show coupon field"
          size="large"
          checked={state.showCouponField}
          onChange={() =>
            handleChange(!state.showCouponField, 'showCouponField')
          }
        />
      </div>
      <br />

      <div className="mt6 dib">
        <Toggle
          label="Show 'notes' field"
          size="large"
          checked={state.showNoteField}
          onChange={() => handleChange(!state.showNoteField, 'showNoteField')}
        />
      </div>
      <br />

      <div className="mt6 dib">
        <Toggle
          label="Button shadow"
          size="large"
          checked={state.buttonShadow}
          onChange={() => handleChange(!state.buttonShadow, 'buttonShadow')}
        />
      </div>
    </div>
  )
}

LayoutSettings.propTypes = {
  onChange: PropTypes.func,
  initialState: PropTypes.any,
}

export default injectIntl(LayoutSettings)
