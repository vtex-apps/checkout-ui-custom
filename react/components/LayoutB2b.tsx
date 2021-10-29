/* eslint-disable react/prop-types */
import React, { FC, Fragment, useState } from 'react'
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl'
import PropTypes from 'prop-types'
import { Toggle, Divider, Card } from 'vtex.styleguide'

import PurchaseOrderOn from '../images/purchase-order-field-on.png'
import PurchaseOrderOff from '../images/purchase-order-field-off.png'

const images: any = {
  purchaseOrderOn: PurchaseOrderOn,
  purchaseOrderOff: PurchaseOrderOff,
}

const B2bSettings: FC<WrappedComponentProps & any> = ({
  state,
  handleChange,
  intl,
}) => {
  const [preview, setPreview] = useState<any>(
    state.purchaseOrderInput ? PurchaseOrderOn : PurchaseOrderOff
  )

  const changePreview = (item: string) => setPreview(images[item])

  return (
    <Fragment>
      <div className="mv7">
        <Divider orientation="horizontal" />
      </div>

      <div className="w-50 fl pr7">
        <div
          className="mt6 db flex items-center"
          onMouseEnter={() => {
            changePreview(
              state.purchaseOrderInput ? 'purchaseOrderOn' : 'purchaseOrderOff'
            )
          }}
        >
          <Toggle
            label={intl.formatMessage({
              id: 'admin/checkout-ui.layout.purchaseOrderInput.label',
            })}
            size="large"
            checked={state.purchaseOrderInput}
            onChange={(e: any) => {
              handleChange(!state.purchaseOrderInput, 'purchaseOrderInput')

              changePreview(
                e.currentTarget.checked ? 'purchaseOrderOn' : 'purchaseOrderOff'
              )
            }}
          />
        </div>
        <br />
      </div>
      <div className="w-50 fr">
        <Card noPadding>
          <h3 className="pl6 pr6 pt6">
            <FormattedMessage id="admin/checkout-ui.layout.preview.title" />
          </h3>
          <img
            alt={intl.formatMessage({
              id: 'admin/checkout-ui.layout.preview.title',
            })}
            style={{ maxHeight: '260px', display: 'block', margin: '0 auto' }}
            src={preview}
          />
        </Card>
      </div>
    </Fragment>
  )
}

B2bSettings.propTypes = {
  onChange: PropTypes.func,
  initialState: PropTypes.any,
}

export default injectIntl(B2bSettings)
