/* eslint-disable vtex/prefer-early-return */
/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable max-params */
const { _locale } = require('./_locale-infos.js')
const {
  _countries,
  _cities,
  _addressPlaceholder,
  _countriesrules,
} = require('./_countries.js')

// temporaly workaorund
window.callbackMap = () => {
  window.vcustom.checkout.customAddressFormInit(
    window.vtexjs.checkout.orderForm
  )
}
// end temporaly workaorund

class fnsCustomAddressForm {
  constructor({ active = false } = {}) {
    this.BodyFormClasses = ['v-custom-addressForm-on', 'v-custom-googleForm-on']
    this.active = active
    this.googleMapsApiKey = window.vtex.googleMapsApiKey
    this.orderForm = ''
    this.classOn = 'v-custom-fnsCustomAddressForm'
    this.deliveryCountries = ''
    this.mainCountry = ''
    this.lang = ''
    this.locale = ''

    this.address = {
      country: '',
      postalCode: '',
      city: '',
      state: '',
      street: '',
      complement: '',
      addressQuery: '',
      addressId: '',
      geoCoordinates: [],
    }

    this.validate = true

    this.gPlacesAutocomplete = ''
  }

  loadScript() {
    $('body').append(
      `<script src="https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&language=${window.vtex.i18n.locale}&libraries=places&callback=callbackMap"></script>`
    )
  }

  updateAddress(
    country = '',
    postalCode = '',
    city = '',
    state = '',
    street = '',
    number = null,
    complement = '',
    addressQuery = '',
    addressId = '',
    geoCoordinates = ''
  ) {
    this.address = {
      country,
      postalCode,
      addressId,
      city,
      state,
      geoCoordinates,
      street,
      number,
      complement,
      addressQuery,
    }

    if (country === '') {
      this.setForm('')
    }
  }

  setForm(
    country = '',
    street = '',
    formattedStreet = '',
    number = '',
    postalCode = '',
    city = '',
    state = '',
    complement = '',
    neighborhood = '',
    geoCoordinates = ''
  ) {
    console.log('country:', country)
    $('.vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street').val(
      this.addressrules.number ? street : formattedStreet || street
    )
    $('.vcustom--vtex-omnishipping-1-x-address #ship-complement').val(
      complement
    )
    $('.vcustom--vtex-omnishipping-1-x-address #ship-number').val(number)
    $('.vcustom--vtex-omnishipping-1-x-address #ship-city').val(city)
    $('.vcustom--vtex-omnishipping-1-x-address #ship-postalCode').val(
      postalCode
    )
    $('.vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street').attr(
      'data-street',
      this.addressrules.number ? street : formattedStreet || street
    )
    $('.vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street').attr(
      'data-number',
      number
    )
    $('.vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street').attr(
      'data-neighborhood',
      neighborhood
    )
    $('.vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street').attr(
      'data-geocoordinates',
      geoCoordinates
    )

    if (
      $(
        `.vcustom--vtex-omnishipping-1-x-address #ship-state option[value='${state}']`
      ).length
    ) {
      $('.vcustom--vtex-omnishipping-1-x-address #ship-state').val(state)
    } else {
      $('.vcustom--vtex-omnishipping-1-x-address #ship-state').val('')
    }

    if (this.addressrules.number) {
      $('.vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street').val(
        street
      )
    } else {
      $('.vcustom--vtex-omnishipping-1-x-address #ship-number').val('')
      if (street && number) {
        $('.vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street').val(
          formattedStreet || `${street} ${number}`
        )
      }
    }
  }

  updateGoogleForm(countryCode = 'us') {
    $('input#v-custom-ship-street').attr(
      'placeholder',
      _addressPlaceholder[countryCode.toUpperCase()]
        ? _addressPlaceholder[countryCode.toUpperCase()]
        : ''
    )
    this.gPlacesAutocomplete.setComponentRestrictions({
      country: [countryCode],
    })
  }

  returnAddressFRules(components, attr, val) {
    return components.filter(item => item.types[0] === attr).length
      ? components.filter(item => item.types[0] === attr)[0][val]
      : ''
  }

  googleForm() {
    const _this = this

    const input = document.getElementById('v-custom-ship-street')

    _this.gPlacesAutocomplete = new window.google.maps.places.Autocomplete(
      input
    )

    _this.gPlacesAutocomplete.addListener('place_changed', function() {
      const place = _this.gPlacesAutocomplete.getPlace()

      if (~window.location.host.indexOf('myvtex')) {
        console.log(place)
      }

      const [country] = _countries.find(
        c =>
          c[0] ===
          place.address_components.filter(
            item => item.types[0] === 'country'
          )[0].short_name
      )

      const street = place.address_components.find(
        item => item.types[0] === 'route'
      )
        ? place.address_components.find(item => item.types[0] === 'route')
            .long_name
        : place.vicinity
      // let street = place.address_components.find(item => item.types[0]=="route") ? (place.address_components.find(item => item.types[0]=="street_number") ? place.address_components.find(item => item.types[0]=="route").long_name : place.name) : place.name;

      let state = _this.returnAddressFRules(
        place.address_components,
        _this.addressrules.state,
        'short_name'
      )

      const neighborhood = _this.addressrules.neighborhood ? _this.returnAddressFRules(
        place.address_components,
        _this.addressrules.neighborhood,
        'short_name'
      ) : null

      if (_this.addressrules.number) {
        $('.vcustom--vtex-omnishipping-1-x-address #ship-number').val(
          _this.returnAddressFRules(
            place.address_components,
            'street_number',
            'long_name'
          )
        )
      }

      const number = _this.addressrules.number
        ? $('.vcustom--vtex-omnishipping-1-x-address #ship-number').val()
        : null

      const complement = $(
        '.vcustom--vtex-omnishipping-1-x-address #ship-complement'
      ).val()

      const geoCoordinates = [
        place.geometry.location.lat(),
        place.geometry.location.lng(),
      ]

      const formattedAddress = $('<div></div>')

      formattedAddress.html(place.adr_address)
      const formattedStreet = $('.street-address', formattedAddress).text()

      let city =
        _this.returnAddressFRules(
          place.address_components,
          _this.addressrules.city,
          'long_name'
        ) || $('.locality', formattedAddress).text()

      let postalCode = _this.addressrules.postalCode
        ? _this.returnAddressFRules(
            place.address_components,
            'postal_code',
            'long_name'
          )
        : '00000'

      // temporaly workaround for ARG

      if (country === 'ARG') {
        postalCode = postalCode.replace(/\D/gi, '')
        if (state === 'Provincia de Buenos Aires') state = 'Buenos Aires'
        if (state.toUpperCase() === 'CABA') {
          state = 'Ciudad Autónoma de Buenos Aires'
          city = 'Ciudad Autónoma de Buenos Aires'
        }
      }

      // end temporaly workaround for ARG

      // let ad = {
      //  'addressType':'residential',
      //  'receiverName':'',
      //  'postalCode':postalCode,
      //  'city':city,
      //  'state':state,
      //  'country':country,
      //  'geoCoordinates':geoCoordinates,
      //  'street':street,
      //  'number':number,
      //  'neighborhood':neighborhood,
      //  'complement':complement,
      //  'reference':null,
      //  'addressQuery':formattedStreet
      // }
      // console.log(ad);

      _this.setForm(
        country,
        street,
        formattedStreet,
        number,
        postalCode,
        city,
        state,
        complement,
        neighborhood,
        geoCoordinates
      )
      _this.validateAllFields()
      _this.updateAddress(
        country,
        postalCode,
        city,
        state,
        street,
        number,
        complement,
        place.formatted_address,
        _this.address.addressId,
        geoCoordinates
      )
    })

    $('body').on('keyup', '#v-custom-ship-street', function() {
      $(this).attr('autocomplete', 'none')
      $(this).attr('data-number', '')
      $(this).attr('data-street', $(this).context.value)
    })

    $('body').on('focus', '#v-custom-ship-street', function() {
      $(this).attr('autocomplete', 'none')
    })
  }

  triggerAddressValidation() {
    window.store.dispatch({
      type: 'DISABLE_CALCULATE_BUTTON',
      isCalculateBttnEnabled: false,
    })
  }

  sendAddress(
    _country,
    _street,
    _number,
    _state,
    _postalCode,
    _city,
    _complement,
    _addressQuery,
    _addressId,
    _neighborhood,
    geoCoordinates
  ) {
    const _this = this

    if (~geoCoordinates.indexOf(',')) {
      const [lng, lat] = geoCoordinates.split(',')

      geoCoordinates = [parseFloat(lat), parseFloat(lng)]

      // temporaly workaround for ARG
      if (_country === 'ARG' && _city.toUpperCase() === 'CABA') {
        _city = 'Ciudad Autónoma de Buenos Aires'
      }
      // end temporaly workaround for ARG
    } else {
      geoCoordinates = []
    }

    $('body').addClass('js-v-custom-is-loading')

    fetch(
      `/api/checkout/pub/orderForm/${_this.orderForm.orderFormId}/attachments/shippingData`,
      {
        credentials: 'include',
        headers: {
          accept: 'application/json, text/javascript, */*; q=0.01',
          'cache-control': 'no-cache',
          'content-type': 'application/json; charset=UTF-8',
          pragma: 'no-cache',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-requested-with': 'XMLHttpRequest',
        },
        referrerPolicy: 'no-referrer-when-downgrade',
        body: JSON.stringify({
          selectedAddresses: [
            {
              addressType: 'residential',
              receiverName: '',
              addressId: '',
              isDisposable: true,
              postalCode: _postalCode,
              city: _city,
              state: _state,
              country: _country,
              geoCoordinates,
              street: _street,
              number: _number || '',
              neighborhood: _neighborhood,
              complement: _complement,
              reference: null,
              addressQuery: _addressQuery,
            },
          ],
          clearAddressIfPostalCodeNotFound: false,
        }),
        method: 'POST',
        mode: 'cors',
      }
    )
      .then(response => response.json())
      .then(function(data) {
        if (data.error) {
          $('body').removeClass('js-v-custom-is-loading')
          // eslint-disable-next-line no-alert
          alert(`Something went wrong: ${data.error.message}`)
        } else {
          window.vtexjs.checkout.getOrderForm().done(function() {
            _this.updateAddress(
              _country,
              _postalCode,
              _city,
              _state,
              _street,
              _number,
              _complement,
              '',
              _addressQuery || '',
              _addressId || '',
              geoCoordinates || []
            )
            $('body').removeClass(_this.BodyFormClasses.join(' '))
            _this.orderForm = window.vtexjs.checkout.orderForm
            $('body').removeClass('js-v-custom-is-loading')
            _this.triggerAddressValidation()
          })
        }
      })
  }

  getRegions(country) {
    const countryRegions = _cities.find(
      city => city.countryShortCode === country
    )

    return countryRegions.regions.map(i => {
      return `<option value="${i.shortCode}">${i.name}</option>`
    })
  }

  getCountries() {
    const _this = this

    return _this.deliveryCountries.map(countryCode => {
      const _i18n = window.vtex.i18n[_this.lang]
        ? window.vtex.i18n[_this.lang]
        : window.vtex.i18n[window.vtex.i18n.locale]

      let ret = ''

      if (_i18n.countries[countryCode]) {
        ret = `<option value="${countryCode}" ${
          countryCode === _this.mainCountry ? 'selected' : ''
        }>${_i18n.countries[countryCode]}</option>`
      }

      return ret
    })
  }

  updateFormFieldByCountry(addressrules) {
    const number = $('.vcustom--vtex-omnishipping-1-x-address p.ship-number')

    if (addressrules.number) {
      number.show()
      number.find('input').attr('required', 'required')
    } else {
      number.hide()
      number.find('input').removeAttr('required')
    }
  }

  form(orderForm) {
    const _this = this

    const { shippingData } = orderForm

    const country = _countries.find(c => c[1] === _this.mainCountry)

    const form = `
      <div class="vcustom--vtex-omnishipping-1-x-address step">
        <div>
        <form>
            <p class="input v-custom-ship-street required text"><label for="v-custom-ship-street">${
              _this.locale
                ? _this.locale.address1Placeholder
                : 'Street address or P.O. Box'
            }</label><input required autocomplete="none" id="v-custom-ship-street" type="text" name="v-custom-street" class="input-xlarge" data-hj-whitelist="true" value="${
      shippingData.address ? shippingData.address.street : ''
    }" placeholder="Eg: 225 East 41st Street, New York"><span class="help error" style="">${
      _this.locale.requiredField
        ? _this.locale.requiredField
        : 'This field is required.'
    }</span></p>
            <div class="v-custom-ship-info">
              <p class="input ship-number text ${
                _this.addressrules.number ? 'required' : 'hide'
              }"><label for="ship-complement">${
      _this.locale.number ? _this.locale.number : 'Number'
    }</label><input ${
      _this.addressrules.number ? 'required' : ''
    } autocomplete="on" id="ship-number" type="text" name="v-custom-number" maxlength="20" placeholder="${
      _this.locale.number ? _this.locale.number : ''
    }" class="input-xlarge" data-hj-whitelist="true" value="${
      shippingData.address
        ? shippingData.address.number === null
          ? ''
          : shippingData.address.number
        : ''
    }"><span class="help error" style="">${
      _this.locale ? _this.locale.requiredField : 'This field is required.'
    }</span></p>
              <p class="input ship-complement text"><label for="ship-complement">${
                _this.locale
                  ? _this.locale.address2Placeholder
                  : 'Apartment number, unit, floor, etc.'
              }</label><input autocomplete="on" id="ship-complement" type="text" name="v-custom-complement" maxlength="750" placeholder="${
      _this.locale.address2Placeholder ? _this.locale.address2Placeholder : ''
    }" class="input-xlarge" data-hj-whitelist="true" value="${
      shippingData.address
        ? shippingData.address.complement === null
          ? ''
          : shippingData.address.complement
        : ''
    }"></p>
            </div>
            <div class="vcustom--vtex-omnishipping-1-x-address__state">
              <p class="input ship-country text ${
                _this.deliveryCountries.length <= 1 ? 'hide' : ''
              } "><label for="ship-country">Country</label><select name="v-custom-country" id="ship-country" class="input-large">${_this
      .getCountries()
      .join('')}</select></p>
              <p class="input ship-city required text"><label for="ship-city">${
                _this.locale ? _this.locale.city : 'City'
              }</label><input required autocomplete="on" id="ship-city" type="text" name="v-custom-city" maxlength="100" class="input-large" data-hj-whitelist="true" value="${
      shippingData.address ? shippingData.address.city : ''
    }"><span class="help error" style="">${
      _this.locale.requiredField
        ? _this.locale.requiredField
        : 'This field is required.'
    }</span></p>
              <p class="input ship-state required text"><label for="ship-state">${
                _this.locale ? _this.locale.state : 'State'
              }</label>
                  <select name="v-custom-state" id="ship-state" class="input-large">
                    <option value="" disabled selected>${
                      _this.locale ? _this.locale.state : 'State'
                    }</option>
                    ${_this.getRegions(country[0]).join('')}
                  </select>
              </p>
              <p class="input ship-postalCode required text"><label for="ship-postalCode">${
                window.vtex.i18n[_this.lang]
                  ? window.vtex.i18n[_this.lang].cart.postalCode
                  : 'Zip Code'
              }</label><input required autocomplete="on" id="ship-postalCode" type="text" name="receiver" maxlength="${
      _this.addressrules.postalCodeLength
        ? _this.addressrules.postalCodeLength
        : '20'
    }" class="input-xlarge" data-hj-whitelist="true" value="${
      shippingData.address ? shippingData.address.postalCode : ''
    }"><span class="help error" style="">${
      _this.locale.requiredField
        ? _this.locale.requiredField
        : 'This field is required.'
    }</span></p>
            </div>
            <p class="vtex-omnishipping-1-x-submitShippingStepButton btn-submit-wrapper btn-go-to-shipping-wrapper"><button class="submit  btn-go-to-shippping-method btn btn-large btn-success" id="btn-go-to-shippping-method" type="submit">Continue to shipping</button></p>
        </form>
        </div>
      </div>
    `

    if (shippingData.address) {
      $('.vcustom--vtex-omnishipping-1-x-address #ship-state').val(
        shippingData.address.state
      )
    }

    $('.orderform-template-holder #shipping-data').append(form)
    this.googleForm()
    this.updateGoogleForm(country[1].toLowerCase())

    // sort countries
    const sel = $('.vcustom--vtex-omnishipping-1-x-address #ship-country')
    const selected = sel.val() // cache selected value, before reordering
    const optsList = sel.find('option')

    optsList.sort(function(a, b) {
      return $(a).text() > $(b).text() ? 1 : -1
    })
    sel.html('').append(optsList)
    sel.val(selected) // set cached selected value
  }

  validateAllFields() {
    const _this = this

    _this.validate = true
    $('.vcustom--vtex-omnishipping-1-x-address input:required').each(
      function() {
        if (this.value === '') {
          $(this).addClass('error')
          _this.validate = false
        } else {
          $(this).removeClass('error')
        }
      }
    )
  }

  submitAddressForm() {
    const _this = this

    _this.validateAllFields()

    if (!_this.validate) return

    const _st = $(
      '.vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street'
    )

    const country = $(
      '.vcustom--vtex-omnishipping-1-x-address #ship-country'
    ).val()

    const street = _st.attr('data-street') || _st.val()
    const number = $(
      '.vcustom--vtex-omnishipping-1-x-address #ship-number'
    ).val()
      ? $('.vcustom--vtex-omnishipping-1-x-address #ship-number').val()
      : _st.attr('data-number') || ''

    const geoCoordinates = _st.attr('data-geocoordinates') || []
    const neighborhood = _st.attr('data-neighborhood') || null
    const complement = $(
      '.vcustom--vtex-omnishipping-1-x-address #ship-complement'
    ).val()

    const city = $('.vcustom--vtex-omnishipping-1-x-address #ship-city').val()
    const state = $('.vcustom--vtex-omnishipping-1-x-address #ship-state').val()
    const postalCode = $(
      '.vcustom--vtex-omnishipping-1-x-address #ship-postalCode'
    ).val()

    // _this.updateAddress(postalCode, city, state, street, complement, "", _this.address.addressId);
    _this.sendAddress(
      country,
      street,
      number,
      state,
      postalCode,
      city,
      complement,
      _this.address.addressQuery,
      _this.address.addressId,
      neighborhood,
      geoCoordinates
    )
  }

  updateFormByCountry(gCountry) {
    const _this = this
    const country = _countries.find(c => c[1] === gCountry)

    _this.addressrules = _this.getCountryRule(country[1])
    _this.updateFormFieldByCountry(_this.addressrules)
    $("select[name='v-custom-state']").html(
      `${_this.getRegions(country[0]).join('')}`
    )
    _this.updateGoogleForm(gCountry.toLowerCase())
  }

  bind() {
    const _this = this

    $('body').on(
      'click',
      '.step.shipping-data #edit-address-button, .step.shipping-data .vtex-omnishipping-1-x-linkEdit',
      function() {
        if (
          !$('#shipping-option-pickup-in-point').hasClass(
            'vtex-omnishipping-1-x-deliveryOptionActive'
          )
        ) {
          const indexAddress = $(
            '.vtex-omnishipping-1-x-addressItemOption.vtex-omnishipping-1-x-active'
          ).index()

          let addressClicked = window.vtexjs.checkout.orderForm.shippingData

          if (indexAddress < 0) {
            addressClicked = addressClicked.selectedAddresses[0]
          } else {
            addressClicked = addressClicked.availableAddresses[indexAddress]
          }

          // console.log("indexAddress",indexAddress, window.vtexjs.checkout.orderForm.shippingData, "addressClicked", addressClicked)

          if (addressClicked && addressClicked.city.indexOf('*') < 0) {
            try {
              if (
                addressClicked.isDisposable ||
                ~window.location.origin.indexOf('myvtex')
              ) {
                setTimeout(() => {
                  // if(!$(".vtex-omnishipping-1-x-address").length) {
                  $('body').addClass(_this.BodyFormClasses.join(' '))
                  addressClicked.street = addressClicked.street || ''
                  _this.updateAddress(
                    addressClicked.country,
                    addressClicked.postalCode,
                    addressClicked.city,
                    addressClicked.state,
                    addressClicked.number,
                    addressClicked.street,
                    addressClicked.complement,
                    '',
                    addressClicked.addressId,
                    addressClicked.geoCoordinates
                  )
                  $(
                    '.vcustom--vtex-omnishipping-1-x-address #ship-country'
                  ).val(addressClicked.country)
                  _this.updateFormByCountry(addressClicked.country)
                  _this.setForm(
                    addressClicked.country,
                    addressClicked.street,
                    addressClicked.addressQuery,
                    addressClicked.number,
                    addressClicked.postalCode,
                    addressClicked.city,
                    addressClicked.state,
                    addressClicked.complement,
                    addressClicked.neighborhood,
                    addressClicked.geoCoordinates
                  )

                  // }
                }, 100)
              }
            } catch (e) {
              $('body').removeClass(_this.BodyFormClasses.join(' '))
            }
          } else {
            $('body').removeClass(_this.BodyFormClasses.join(' '))
          }
        }
      }
    )

    $('body').on(
      'click',
      '.vtex-omnishipping-1-x-buttonCreateAddress, .vtex-omnishipping-1-x-disclaimer a#remove-unavailable-items',
      function() {
        if (
          !$('#shipping-option-pickup-in-point').hasClass(
            'vtex-omnishipping-1-x-deliveryOptionActive'
          )
        ) {
          $('body').addClass(_this.BodyFormClasses.join(' '))
          _this.address.addressId = ''
          _this.updateAddress('')
        }
      }
    )

    // $("body").on("click","#open-shipping, #edit-shipping-data", function(e) {
    //   console.log($(".address-list.vtex-omnishipping-1-x-addressList > label").length)
    //   if(!_this.orderForm.shippingData.address) $("body").removeClass(_this.BodyFormClasses.join(" "));
    // });

    $('body').on('click', '#shipping-option-pickup-in-point', function() {
      $('body').removeClass(_this.BodyFormClasses.join(' '))
    })

    $('body').on(
      'click',
      '.vtex-omnishipping-1-x-backToAddressList',
      function() {
        $('body').removeClass(_this.BodyFormClasses.join(' '))
        _this.address.addressId = ''
      }
    )

    $('body').on(
      'click',
      '.vtex-omnishipping-1-x-addressItemOption',
      function() {
        _this.address.addressId = _this.orderForm.shippingData
          .availableAddresses[$(this).index()]
          ? _this.orderForm.shippingData.availableAddresses[$(this).index()]
              .addressId
          : ''
      }
    )

    $('body').on('change', "select[name='v-custom-country']", function(e) {
      e.stopImmediatePropagation()
      try {
        _this.updateFormByCountry(this.value)
        _this.updateAddress('')
      } catch (err) {
        console.error(`updateFormByCountry ${this.value} error:`, err)
      }
    })

    $('body').on('click', '#btn-go-to-shippping-method', function(e) {
      e.preventDefault()
      e.stopImmediatePropagation()
      _this.submitAddressForm()
    })

    $('body').on(
      'keyup',
      '.vcustom--vtex-omnishipping-1-x-address input',
      function() {
        if (this.value !== '') {
          $(this).removeClass('error')
        }
      }
    )
  }

  checkFirstLogin(orderForm) {
    const _this = this

    if (orderForm && orderForm.shippingData) {
      if (
        (orderForm.shippingData.address === null ||
          orderForm.shippingData.address.addressType === 'search') &&
        $('.vtex-omnishipping-1-x-deliveryOptionActive').attr('id') ===
          'shipping-option-delivery'
      ) {
        $('body').addClass(_this.BodyFormClasses[0])
      }
    }
  }

  getCountryRule(country) {
    return _countriesrules[country]
      ? _countriesrules[country]
      : _countriesrules.WWD
  }

  events() {
    const _this = this

    $(window).on('orderFormUpdated.vtex', function(evt, orderForm) {
      _this.checkFirstLogin(orderForm)
    })
  }

  init(orderForm) {
    const _this = this

    if (
      orderForm &&
      window.google &&
      $('.vcustom--vtex-omnishipping-1-x-address').length < 1 &&
      orderForm.items.length
    ) {
      $('body').addClass(`${this.classOn}`)
      _this.orderForm = orderForm
      _this.checkFirstLogin(orderForm)
      _this.bind()
      _this.events()
      _this.deliveryCountries = window.checkout.deliveryCountries()
      _this.mainCountry = window.checkout.countryCode()
      _this.lang = _this.orderForm.clientPreferencesData.locale
      _this.locale = _locale[_this.orderForm.storePreferencesData.countryCode]
      _this.addressrules = _this.getCountryRule(
        _this.orderForm.storePreferencesData.countryCode
      )

      if (_this.lang === 'es-AR') _this.lang = 'es'

      if (_this.orderForm && _this.orderForm.shippingData) {
        const shippingData = _this.orderForm.shippingData.address

        if (shippingData) {
          _this.updateAddress(
            shippingData.country,
            shippingData.postalCode,
            shippingData.city,
            shippingData.state,
            shippingData.street,
            shippingData.number,
            shippingData.complement,
            '',
            shippingData.addressId,
            shippingData.geoCoordinates
          )
        } else {
          _this.updateAddress('')
        }
      }

      _this.form(orderForm)
    }
  }
}

module.exports = fnsCustomAddressForm
