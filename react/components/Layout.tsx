import React, { FC, useState } from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import { RadioGroup, Toggle } from 'vtex.styleguide'

const LayoutSettings: FC<WrappedComponentProps> = () => {
  const [state, setState] = useState<any>({
    type: 'vertical',
    accordionPayments: true,
    deliveryDateFormat: true,
    showCartQuantityPrice: false,
    showCheckoutSteps: true,
    countingSteps: true,
    showCouponField: false,
    showNoteField: false,
    buttonShadow: false,
  })

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
          onChange={(e: any) =>
            setState({ ...state, type: e.currentTarget.value })
          }
        />
      </div>
      <br />

      <div className="mt6 dib">
        <Toggle
          label="Horizontal payment"
          size="large"
          checked={state.accordionPayments}
          onChange={() =>
            setState((prevState: any) => ({
              ...prevState,
              accordionPayments: !prevState.accordionPayments,
            }))
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
            setState((prevState: any) => ({
              ...prevState,
              deliveryDateFormat: !prevState.deliveryDateFormat,
            }))
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
            setState((prevState: any) => ({
              ...prevState,
              showCartQuantityPrice: !prevState.showCartQuantityPrice,
            }))
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
            setState((prevState: any) => ({
              ...prevState,
              showCheckoutSteps: !prevState.showCheckoutSteps,
            }))
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
          onChange={() =>
            setState((prevState: any) => ({
              ...prevState,
              countingSteps: !prevState.countingSteps,
            }))
          }
        />
      </div>
      <br />

      <div className="mt6 dib">
        <Toggle
          label="Show coupon field"
          size="large"
          checked={state.showCouponField}
          onChange={() =>
            setState((prevState: any) => ({
              ...prevState,
              showCouponField: !prevState.showCouponField,
            }))
          }
        />
      </div>
      <br />

      <div className="mt6 dib">
        <Toggle
          label="Show 'notes' field"
          size="large"
          checked={state.showNoteField}
          onChange={() =>
            setState((prevState: any) => ({
              ...prevState,
              showNoteField: !prevState.showNoteField,
            }))
          }
        />
      </div>
      <br />

      <div className="mt6 dib">
        <Toggle
          label="Button shadow"
          size="large"
          checked={state.buttonShadow}
          onChange={() =>
            setState((prevState: any) => ({
              ...prevState,
              buttonShadow: !prevState.buttonShadow,
            }))
          }
        />
      </div>
    </div>
  )
}

export default injectIntl(LayoutSettings)
