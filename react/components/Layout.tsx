import React, { FC, useState } from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import PropTypes from 'prop-types'
import { RadioGroup, Toggle, Slider, Input } from 'vtex.styleguide'

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
    <div className="w-100 pa4">
      <div className="w-50 fl">
        <div className="w-50 mb-4 dn">
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
              handleChange(
                !state.showCartQuantityPrice,
                'showCartQuantityPrice'
              )
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

        <div className="mt6 dn">
          <Toggle
            label="Show checkout steps"
            size="large"
            checked={state.showCheckoutSteps}
            onChange={() =>
              handleChange(!state.showCheckoutSteps, 'showCheckoutSteps')
            }
          />
        </div>

        <div className="mt6 dn">
          <Toggle
            label="Counting steps"
            size="large"
            disabled={!state.showCheckoutSteps}
            checked={state.countingSteps}
            onChange={() => handleChange(!state.countingSteps, 'countingSteps')}
          />
        </div>

        <div className="mt6 dn">
          <Toggle
            label="Show coupon field"
            size="large"
            checked={state.showCouponField}
            onChange={() =>
              handleChange(!state.showCouponField, 'showCouponField')
            }
          />
        </div>

        <div className="mt6 dn">
          <Toggle
            label="Button shadow"
            size="large"
            checked={state.buttonShadow}
            onChange={() => handleChange(!state.buttonShadow, 'buttonShadow')}
          />
        </div>
        <br />

        <div className="mt6 flex">
          <div className="flex flex-column items-left w-50">
            <div className="flex-col">
              <span>Text size:</span>
            </div>
            <div className="flex-col">
              <Slider
                onChange={(value: any) => {
                  setState({
                    ...state,
                    fontSize: `${value[0]}px`,
                  })
                }}
                min={10}
                max={30}
                step={1}
                defaultValues={[state.fontSize.replace('px', '')]}
                alwaysShowCurrentValue={false}
                formatValue={(a: number) => `${a}px`}
              />
            </div>
          </div>
        </div>

        <div className="mt6 flex">
          <div className="flex flex-column items-left w-50">
            <div className="flex-col">
              <span>Border radius:</span>
            </div>
            <div className="flex-col">
              <Slider
                onChange={(value: any) => {
                  setState({
                    ...state,
                    borderRadius: `${value[0]}px`,
                  })
                }}
                min={0}
                max={50}
                step={1}
                defaultValues={[state.borderRadius.replace('px', '')]}
                alwaysShowCurrentValue={false}
                formatValue={(a: number) => `${a}px`}
              />
            </div>
          </div>
        </div>

        <div className="mt6 flex">
          <div className="flex flex-column items-left w-50">
            <div className="flex-col">
              <span>Button border radius:</span>
            </div>
            <div className="flex-col">
              <Slider
                onChange={(value: any) => {
                  setState({
                    ...state,
                    btnBorderRadius: `${value[0]}px`,
                  })
                }}
                min={0}
                max={50}
                step={1}
                defaultValues={[state.btnBorderRadius.replace('px', '')]}
                alwaysShowCurrentValue={false}
                formatValue={(a: number) => `${a}px`}
              />
            </div>
          </div>
        </div>

        <div className="mt6 flex">
          <div className="flex flex-column items-left w-50">
            <div className="flex-col">
              <span>Text fields height:</span>
            </div>
            <div className="flex-col">
              <Slider
                onChange={(value: any) => {
                  setState({
                    ...state,
                    inputHeight: `${value[0]}px`,
                  })
                }}
                min={0}
                max={50}
                step={1}
                defaultValues={[state.inputHeight.replace('px', '')]}
                alwaysShowCurrentValue={false}
                formatValue={(a: number) => `${a}px`}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="w-40">
          <div className="mb5">
            <Input
              label="Max wrapper width"
              value={state.maxWrapper}
              onChange={(e: any) => {
                setState({
                  ...state,
                  maxWrapper: e.target.value,
                })
              }}
            />
          </div>
          <br />

          <div className="mb5">
            <Input
              label="Container's border"
              value={state.bordersContainers}
              onChange={(e: any) => {
                setState({
                  ...state,
                  bordersContainers: e.target.value,
                })
              }}
            />
          </div>
          <br />

          <div className="mb5">
            <Input
              label="Font family"
              value={state.fontFamily}
              onChange={(e: any) => {
                setState({
                  ...state,
                  fontFamily: e.target.value,
                })
              }}
            />
          </div>
        </div>
      </div>
      <div className="w-50 fr">Preview</div>
    </div>
  )
}

LayoutSettings.propTypes = {
  onChange: PropTypes.func,
  initialState: PropTypes.any,
}

export default injectIntl(LayoutSettings)
