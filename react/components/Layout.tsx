import React, { FC, useState } from 'react'
import { injectIntl, WrappedComponentProps, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { Toggle, Slider, Input, Card, Divider} from 'vtex.styleguide'

import TabsOn from '../images/payments-tabs-on.png'
import TabsOff from '../images/payments-tabs-off.png'
import PriceOn from '../images/cart-quantity-price-on.png'
import PriceOff from '../images/cart-quantity-price-off.png'
import ShippingOn from '../images/shipping-date-number.png'
import ShippingOff from '../images/shipping-date-text.png'

const images: any = {
  tabsOn: TabsOn,
  tabsOff: TabsOff,
  shippingOn: ShippingOn,
  shippingOff: ShippingOff,
  priceOn: PriceOn,
  priceOff: PriceOff,
}

const LayoutSettings: FC<WrappedComponentProps & any> = ({
  initialState,
  onChange,
  intl,
}) => {
  const [state, setState] = useState<any>({
    ...initialState,
    currentPreview: initialState.accordionPayments ? TabsOff : TabsOn,
  })

  const changePreview = (item: string) => {
    const currentPreview = images[item]

    setState({
      ...state,
      currentPreview,
    })
  }

  const handleChange = (value: any, key: string, image?: string) => {
    const currentPreview = image ? images[image] : state.currentPreview
    const newState = {
      ...state,
      [key]: value,
      currentPreview,
    }

    setState(newState)
    onChange(newState)
  }

  return (
    <div className="w-100 pa4">
      <div className="w-100 cf cb">
        <div className="w-50 fl pr7">
          <div
            className="mt6 dib"
            onMouseEnter={() => {
              changePreview(state.accordionPayments ? 'tabsOff' : 'tabsOn')
            }}
          >
            <Toggle
              label={intl.formatMessage({
                id: 'admin/checkout-ui.layout.accordionPayments.label',
              })}
              size="large"
              helpText={intl.formatMessage({
                id: 'admin/checkout-ui.layout.accordionPayments.help',
              })}
              checked={state.accordionPayments}
              onChange={(e: any) => {
                handleChange(
                  !state.accordionPayments,
                  'accordionPayments',
                  e.currentTarget.checked ? 'tabsOff' : 'tabsOn'
                )
              }}
            />
          </div>
          <br />

          <div
            className="mt6 dib"
            onMouseEnter={() => {
              changePreview(
                state.deliveryDateFormat ? 'shippingOn' : 'shippingOff'
              )
            }}
          >
            <Toggle
              label={intl.formatMessage({
                id: 'admin/checkout-ui.layout.deliveryDateFormat.label',
              })}
              size="large"
              helpText={intl.formatMessage({
                id: 'admin/checkout-ui.layout.deliveryDateFormat.help',
              })}
              checked={state.deliveryDateFormat}
              onChange={(e: any) =>
                handleChange(
                  !state.deliveryDateFormat,
                  'deliveryDateFormat',
                  e.currentTarget.checked ? 'shippingOn' : 'shippingOff'
                )
              }
            />
          </div>
          <br />

          <div
            className="mt6 dib"
            onMouseEnter={() => {
              changePreview(state.showCartQuantityPrice ? 'priceOn' : 'priceOff')
            }}
          >
            <Toggle
              label={intl.formatMessage({
                id: 'admin/checkout-ui.layout.showCartQuantityPrice.label',
              })}
              size="large"
              helpText={intl.formatMessage({
                id: 'admin/checkout-ui.layout.showCartQuantityPrice.help',
              })}
              checked={state.showCartQuantityPrice}
              onChange={(e: any) =>
                handleChange(
                  !state.showCartQuantityPrice,
                  'showCartQuantityPrice',
                  e.currentTarget.checked ? 'priceOn' : 'priceOff'
                )
              }
            />
          </div>
          <br />
          <div className="mt6 dib">
            <Toggle
              label={intl.formatMessage({
                id: 'admin/checkout-ui.layout.showNoteField.label',
              })}
              size="large"
              checked={state.showNoteField}
              onChange={() => handleChange(!state.showNoteField, 'showNoteField')}
            />
          </div>
        </div>
        <div className="w-50 fr">
          <Card noPadding>
            <h3 className="pl6 pr6 pt6">
              <FormattedMessage id="admin/checkout-ui.layout.preview.title" />
            </h3>
            <img width="100%" alt="Preview" src={state.currentPreview} />
          </Card>
        </div>
      </div>

      <div className="mv6">
        <Divider orientation="horizontal" />
      </div>

      <div className="w-100 cf cb">
        <div className="w-50 fl pr7">
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
        </div>

        <div className="w-50 fr">
          <div 
            className="summary-template-holder" 
            style={{
              boxShadow:"rgba(61, 62, 64, 0.3) 0px 3px 9px 0px",
              padding:"20px",
              borderRadius: `${state.borderRadius}`,
              border: state.bordersContainers,
              fontFamily: state.fontFamily,
            }}
          >
            <h3 className="">Preview</h3>

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

            <p className="coupon-fields">
              <span className="flex">
                <input 
                  className="w-80" 
                  type="text" 
                  placeholder="Coupon Code" 
                  style={{
                    height: `${state.inputHeight}`,
                    borderRadius: `${state.borderRadius}`,
                    border: `1px solid #cacbcc`,
                    fontSize: `${state.fontSize}`,
                    padding:"0 10px"
                  }}
                />
                <button 
                  className="bg-action-primary c-on-action-primary w-20 ml3"
                  style={{
                    borderRadius: `${state.btnBorderRadius}`,
                    height: `${state.inputHeight}`,
                    border: `none`,
                    padding: `5px 12px`,
                    fontSize: `${state.fontSize}`
                  }}
                  type="submit"
                >
                Add
                </button>
              </span>
            </p>
            <div className="" style={{
                                fontFamily: state.fontFamily,
                                fontSize: `${state.fontSize}`,
                              }}>
              <div className="Items flex justify-around">
                <div className="w-50 tl">Subtotal</div>
                <div className="w-50 tr">$ 64.35</div>
              </div>
              <div className="srp-summary-result flex justify-around">
                <div className="w-50 tl">Shipping</div>
                <div className="w-50 tr">$ 3.00</div>
              </div>
              <div className="flex justify-around" style={{
                                                    fontSize:"18px",
                                                    fontWeight: "bold",
                                                    padding:"14px 0",
                                                    margin:"14px 0",
                                                    borderTop:"1px solid #cbcbcb"
                                                  }}>
                <div className="w-50 tl">Total</div>
                <div className="w-50 tr">$ 67.35</div>
              </div>
            </div>
          </div>
          
        </div>
                  
      </div>

      <div className="mv7">
        <Divider orientation="horizontal" />
      </div>

      <div className="w-100 cf cb">

        <div className="w-100 flex justify-between">
          
          <div className="w-30">
            <Input
              label="Max wrapper width"
              value={state.maxWrapper}
              onChange={(e: any) => {
                handleChange(e.target.value, 'maxWrapper')
              }}
            />
          </div>

          <div className="w-30">
            <Input
              label="Container's border"
              value={state.bordersContainers}
              placeholder="2px solid #eee"
              onChange={(e: any) => {
                handleChange(e.target.value, 'bordersContainers')
              }}
            />
          </div>

          <div className="w-30">
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

    </div>
  )
}

LayoutSettings.propTypes = {
  onChange: PropTypes.func,
  initialState: PropTypes.any,
}

export default injectIntl(LayoutSettings)