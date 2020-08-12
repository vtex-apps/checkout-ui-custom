import React, { FC, useState } from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import PropTypes from 'prop-types'
import { Toggle, Slider, Input } from 'vtex.styleguide'

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
        <div className="mt6 dib">
          <Toggle
            label="Horizontal payment"
            size="large"
            helpText="Available to stores with 4 or less payment options"
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

        <div className="mt6 flex">
          <div className="flex flex-column items-left w-50">
            <div className="flex-col">
              <span>Text size:</span>
            </div>
            <div className="flex-col">
              <Slider
                onChange={(value: any) => {
                  handleChange(`${value[0]}px`, 'fontSize')
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
                  handleChange(`${value[0]}px`, 'borderRadius')
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
                  handleChange(`${value[0]}px`, 'btnBorderRadius')
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
                  handleChange(`${value[0]}px`, 'inputHeight')
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
                handleChange(e.target.value, 'maxWrapper')
              }}
            />
          </div>
          <br />

          <div className="mb5">
            <Input
              label="Container's border"
              value={state.bordersContainers}
              onChange={(e: any) => {
                handleChange(e.target.value, 'bordersContainers')
              }}
            />
          </div>
          <br />

          <div className="mb5">
            <Input
              label="Font family"
              value={state.fontFamily}
              onChange={(e: any) => {
                handleChange(e.target.value, 'fontFamily')
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-50 fr">
        <div
          className="pa7"
          style={{
            borderRadius: `${state.borderRadius}`,
            maxWidth: `${state.maxWrapper}`,
            border: state.bordersContainers,
          }}
        >
          <h3 className="t-heading-4 mt0">Preview</h3>
          <div>
            <p
              style={{
                fontFamily: state.fontFamily,
                fontSize: `${state.fontSize}`,
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              finibus malesuada nisi, sit amet egestas magna vestibulum eget.
              Maecenas tempus sollicitudin enim quis semper
            </p>

            <label>
              Text field:{' '}
              <input
                style={{
                  height: `${state.inputHeight}`,
                }}
              />
            </label>
            <br />

            <button
              style={{
                borderRadius: `${state.btnBorderRadius}`,
              }}
            >
              Button
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

LayoutSettings.propTypes = {
  onChange: PropTypes.func,
  initialState: PropTypes.any,
}

export default injectIntl(LayoutSettings)
