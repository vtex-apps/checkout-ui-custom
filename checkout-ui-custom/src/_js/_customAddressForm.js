const { _countries, _cities, _addressFormExample, _countriesrules } = require("./_countries.js");
const { debounce } = require("./_utils.js");
const { _locale } = require("./_locale-infos.js");

class fnsCustomAddressForm {
  constructor({
    active=false
  } = {}) {


    this.BodyFormClasses = ["v-custom-addressForm-on", "v-custom-googleForm-on"];
    this.active = active;
    this.googleMapsApiKey = vtex.googleMapsApiKey;
    this.orderForm="";
    this.classOn = "v-custom-fnsCustomAddressForm";
    this.deliveryCountries = "";
    this.mainCountry = "";
    this.lang = "";
    this.locale = "";

    this.address = {
      country:"",
      postalCode:"",
      city:"",
      state:"",
      street:"",
      complement:"",
      addressQuery:"",
      addressId:""
    };

    this.validate=true;

    this.gPlacesAutocomplete = "";
  }


  loadScript() {
    $("body").append(`<script src="https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&language=en-US&libraries=places"></script>`);
  }


  updateAddress(country="", postalCode="", city="", state="", street="", number=null, complement="", addressQuery="", addressId="", geoCoordinates="") {
    
    
    this.address = {
      country: country,
      postalCode: postalCode,
      addressId:  addressId,
      city: city,
      state: state,
      geoCoordinates:[],
      street: street,
      number: number,
      complement: complement,
      addressQuery:addressQuery
    };

    if(arguments[0]=="") {
      this.setForm("");
    }
  }

  setForm(country="", street="", formattedStreet="", number="", postalCode="", city="", state="", complement="", neighborhood="", geoCoordinates="") {
    $(".vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street").val(formattedStreet);
    $(".vcustom--vtex-omnishipping-1-x-address #ship-complement").val(complement);
    $(".vcustom--vtex-omnishipping-1-x-address #ship-city").val(city);
    $(".vcustom--vtex-omnishipping-1-x-address #ship-state").val(state);
    $(".vcustom--vtex-omnishipping-1-x-address #ship-postalCode").val(postalCode);
    $(".vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street").attr("data-street", country=="USA" ? formattedStreet : street)
    $(".vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street").attr("data-number", number);
    $(".vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street").attr("data-neighborhood", neighborhood);
    $(".vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street").attr("data-geocoordinates", geoCoordinates);

  }


  updateGoogleForm(countryCode = "us") {
    $("input#v-custom-ship-street").attr("placeholder", _addressFormExample[countryCode.toUpperCase()] ? _addressFormExample[countryCode.toUpperCase()] : "")
    this.gPlacesAutocomplete.setComponentRestrictions({
      country: [countryCode]
    });
  }

  googleForm() {

    let _this = this;

    
    let input = document.getElementById('v-custom-ship-street');
    _this.gPlacesAutocomplete = new google.maps.places.Autocomplete(input);

    _this.gPlacesAutocomplete.addListener("place_changed", function() {
      let place = _this.gPlacesAutocomplete.getPlace();

      //console.log(place)

      
      let country = _countries.find(c=>c[0]==place.address_components.filter(item => item.types[0]=="country")[0].short_name)[1];
      let street = place.address_components.find(item => item.types[0]=="route").long_name;
      let state = place.address_components.filter(item => item.types[0]==_this.addressrules.state)[0].short_name;
      let neighborhood = place.address_components.filter(item => item.types[0]=="sublocality_level_1").length  ? place.address_components.find(item => item.types[0]=="sublocality_level_1").long_name : "";
      let postalCode = place.address_components.filter(item => item.types[0]=="postal_code").length  ? place.address_components.filter(item => item.types[0]=="postal_code")[0].long_name : "";
      
      let number = place.address_components.filter(item => item.types[0]=="street_number").length  ? place.address_components.filter(item => item.types[0]=="street_number")[0].long_name : "";
      let complement = $(".vcustom--vtex-omnishipping-1-x-address #ship-complement").val();

      let geoCoordinates = [place.geometry.location.lat(), place.geometry.location.lng()];

      let formattedAddress = $( '<div></div>' );
      formattedAddress.html(place.adr_address);
      let formattedStreet = $('.street-address', formattedAddress).text();

      let city = $('.locality', formattedAddress).text() || place.address_components.filter(item => item.types[0]=="administrative_area_level_2")[0].long_name;
      
      _this.setForm(country, street, formattedStreet, number, postalCode, city, state, complement, neighborhood, geoCoordinates);
      _this.validateAllFields();
      _this.updateAddress(country, postalCode, city, state, street, number, complement, place.formatted_address, _this.address.addressId, geoCoordinates);
            
    });

    $("body").on("keyup", "#v-custom-ship-street", function(e) {
      $(this).attr("autocomplete","none")
      $(this).attr("data-number","")
      $(this).attr("data-street",$(this).context.value)
    })

    $("body").on("focus", "#v-custom-ship-street", function(e) {
      $(this).attr("autocomplete","none")
    })
    
  }

  triggerValidateAddress() {
    (debounce(function() {
        $("button.btn.btn-link.vtex-omnishipping-1-x-btnDelivery").trigger("click");
    }, 250));
  }

  sendAddress(_country, _street, _number, _state, _postalCode, _city, _complement, _addressQuery, _addressId, neighborhood, geoCoordinates) {
      let _this = this;
      //console.log("_country: "+_country, "_street: "+_street, "_number: "+_number, "_state: "+_state, "_postalCode: "+_postalCode, "_city: "+_city, "_complement: "+_complement, "_addressQuery: "+_addressQuery, "_addressId: "+_addressId)

      if(_country=="USA") _number=null;

      if(~geoCoordinates.indexOf(",")) {
        geoCoordinates = geoCoordinates.split(",");
        geoCoordinates.forEach(function(value, index) {
          geoCoordinates[index] = parseFloat(value);
        });
      } else {
        geoCoordinates = []
      }
      
      var b = JSON.stringify({
        'selectedAddresses':[
           {
              'addressType':'residential',
              'receiverName':'',
              'addressId':_addressId,
              'isDisposable':true,
              'postalCode':_postalCode,
              'city':_city,
              'state':_state,
              'country':_country,
              'geoCoordinates':geoCoordinates,
              'street':_street,
              'number':_number,
              'neighborhood':neighborhood,
              'complement':_complement,
              'reference':null,
              'addressQuery':_addressQuery
           }
        ],
        'clearAddressIfPostalCodeNotFound':false,
     });

      //console.log(_addressId, b)
      
      $("body").addClass("js-v-custom-is-loading");

      fetch(`/api/checkout/pub/orderForm/${_this.orderForm.orderFormId}/attachments/shippingData`, 
      {
        "credentials":"include",
        "headers":{
           "accept":"application/json, text/javascript, */*; q=0.01",
           "cache-control":"no-cache",
           "content-type":"application/json; charset=UTF-8",
           "pragma":"no-cache",
           "sec-fetch-mode":"cors",
           "sec-fetch-site":"same-origin",
           "x-requested-with":"XMLHttpRequest"
        },
        "referrerPolicy":"no-referrer-when-downgrade",
        "body":JSON.stringify({
          'selectedAddresses':[
             {
                'addressType':'residential',
                'receiverName':'',
                'addressId':_addressId,
                'isDisposable':true,
                'postalCode':_postalCode,
                'city':_city,
                'state':_state,
                'country':_country,
                'geoCoordinates':geoCoordinates,
                'street':_street,
                'number':_number,
                'neighborhood':null,
                'complement':_complement,
                'reference':null,
                'addressQuery':_addressQuery
             }
          ],
          'clearAddressIfPostalCodeNotFound':false,
       }),
        "method":"POST",
        "mode":"cors"
      })
      .then(response => response.json())
      .then(function(data) {
          if(data.error) {
            $("body").removeClass("js-v-custom-is-loading");
            alert(`Something went wrong: ${data.error.message}`);
          } else {
            vtexjs.checkout.getOrderForm()
            .done(function(order) {
              _this.updateAddress(_country, _postalCode, _city, _state, _street, _number, _complement, "", _addressQuery||"", _addressId||"", geoCoordinates||[]);
              $("body").removeClass(_this.BodyFormClasses.join(" "));
              _this.orderForm = vtexjs.checkout.orderForm;
              $("body").removeClass("js-v-custom-is-loading");
              //_this.triggerValidateAddress();
            });
          }
          
      });
      
  
  }

  getRegions(country) {
    let countryRegions = _cities.find(city => city.countryShortCode==country);
    return countryRegions.regions.map(i => {
      return `<option value="${i.shortCode}">${i.name}</option>`;
    })
  }

  getCountries() {
    let _this = this;
    return _this.deliveryCountries.map(countryCode => {
      if(vtex.i18n[_this.lang].countries[countryCode]) {
        return `<option value="${countryCode}" ${countryCode==_this.mainCountry ? "selected" : ""}>${vtex.i18n[_this.lang].countries[countryCode]}</option>`;
      }
    })
  }

  form(orderForm) {

    let _this = this;
    
    let shippingData = orderForm.shippingData;

    
    let country = _countries.find(c=>c[1]==_this.mainCountry);

    //$(".vcustom--vtex-omnishipping-1-x-address").remove();
    let form = `
      <div class="vcustom--vtex-omnishipping-1-x-address step">
        <div>
        <form>
            <p class="input v-custom-ship-street required text"><label for="v-custom-ship-street">${_this.locale.address1Placeholder ? _this.locale.address1Placeholder : "Street address or P.O. Box"}</label><input required autocomplete="none" id="v-custom-ship-street" type="text" name="v-custom-street" class="input-xlarge" data-hj-whitelist="true" value="${shippingData.address ? shippingData.address.street : "" }" placeholder="Eg: 225 East 41st Street, New York"><span class="help error" style="">This field is required.</span></p>
            <p class="input ship-complement text"><label for="ship-complement">${_this.locale.address2Placeholder ? _this.locale.address2Placeholder : "Apartment number, unit, floor, etc."}</label><input autocomplete="on" id="ship-complement" type="text" name="v-custom-complement" maxlength="750" placeholder="${_this.locale.address2Placeholder ? _this.locale.address2Placeholder : "" }" class="input-xlarge" data-hj-whitelist="true" value="${shippingData.address ? shippingData.address.complement==null ? "" : shippingData.address.complement : "" }"></p>
            <div class="vcustom--vtex-omnishipping-1-x-address__state">
              <p class="input ship-country text ${_this.deliveryCountries.length<=1 ? "hide" : ""} "><label for="ship-country">Country</label><select name="v-custom-country" id="ship-country" class="input-large">${_this.getCountries().join("")}</select></p>
              <p class="input ship-city required text"><label for="ship-city">${_this.locale.city ? _this.locale.city : "City"}</label><input required autocomplete="on" id="ship-city" type="text" name="v-custom-city" maxlength="100" class="input-large" data-hj-whitelist="true" value="${shippingData.address ? shippingData.address.city : "" }"><span class="help error" style="">This field is required.</span></p>
              <p class="input ship-state required text"><label for="ship-state">${_this.locale.state ? _this.locale.state : "State"}</label>
                  <select name="v-custom-state" id="ship-state" class="input-large">
                    <option value="" disabled selected>${_this.locale.state ? _this.locale.state : "State"}</option>
                    ${_this.getRegions(country[0]).join("")}
                  </select>
              </p>
              <p class="input ship-postalCode required text"><label for="ship-postalCode">${vtex.i18n[_this.lang] ? vtex.i18n[_this.lang].cart.postalCode : "Zip Code"}</label><input required autocomplete="on" id="ship-postalCode" type="text" name="receiver" maxlength="20" class="input-xlarge" data-hj-whitelist="true" value="${shippingData.address ? shippingData.address.postalCode : "" }"><span class="help error" style="">This field is required.</span></p>
            </div>
            <p class="vtex-omnishipping-1-x-submitShippingStepButton btn-submit-wrapper btn-go-to-shipping-wrapper"><button class="submit  btn-go-to-shippping-method btn btn-large btn-success" id="btn-go-to-shippping-method" type="submit">Continue to shipping</button></p>
        </form>
        </div>
      </div>
    `;

    shippingData.address ? $(".vcustom--vtex-omnishipping-1-x-address #ship-state").val(shippingData.address.state) : "";
    

    $(".orderform-template-holder #shipping-data").append(form);
    this.googleForm();
    this.updateGoogleForm(country[1].toLowerCase());

    //sort countries
    let sel = $('.vcustom--vtex-omnishipping-1-x-address #ship-country');
    let selected = sel.val(); // cache selected value, before reordering
    let opts_list = sel.find('option');
    opts_list.sort(function(a, b) { return $(a).text() > $(b).text() ? 1 : -1; });
    sel.html('').append(opts_list);
    sel.val(selected); // set cached selected value

  }

  validateAllFields() {

    let _this = this;
    _this.validate = true;
    $(".vcustom--vtex-omnishipping-1-x-address input:required").each(function(i) {
      if(this.value=="") {
        $(this).addClass("error")
        _this.validate = false;
      } else {
        $(this).removeClass("error")
      }
    })
  
  }

  submitAddressForm(e) {
    let _this = this;
    _this.validateAllFields();
    
    if(!_this.validate) return;

    let _st = $(".vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street");

    let country = $(".vcustom--vtex-omnishipping-1-x-address #ship-country").val(),
        street = _st.attr("data-street") || _st.val(),
        number = _st.attr("data-number") || null,
        geoCoordinates = _st.attr("data-geocoordinates") || [],
        neighborhood = _st.attr("data-neighborhood") || null,
        complement =  $(".vcustom--vtex-omnishipping-1-x-address #ship-complement").val(),
        city =  $(".vcustom--vtex-omnishipping-1-x-address #ship-city").val(),
        state =  $(".vcustom--vtex-omnishipping-1-x-address #ship-state").val(),
        postalCode =  $(".vcustom--vtex-omnishipping-1-x-address #ship-postalCode").val();
    
    //_this.updateAddress(postalCode, city, state, street, complement, "", _this.address.addressId);
    _this.sendAddress(country, street, number, state, postalCode, city, complement, _this.address.addressQuery, _this.address.addressId, neighborhood, geoCoordinates);
  }

  bind() {
    let _this = this;

    $("body").on("click",".step.shipping-data #edit-address-button, .step.shipping-data .vtex-omnishipping-1-x-linkEdit", function(e) {
      let indexAddress = $(".vtex-omnishipping-1-x-addressItemOption.vtex-omnishipping-1-x-active").index();
      let addressClicked = _this.orderForm.shippingData
      if(indexAddress<0) {
        addressClicked = addressClicked.selectedAddresses[0];
      } else {
        addressClicked = addressClicked.availableAddresses[indexAddress];
      }
      
      if(addressClicked.isDisposable || ~window.location.origin.indexOf("myvtex")) {
        setTimeout(() => {
          if(!$(".vtex-omnishipping-1-x-address").length) {
            //console.log(addressClicked)
            $("body").addClass(_this.BodyFormClasses.join(" "));
            _this.updateAddress(addressClicked.country, addressClicked.postalCode, addressClicked.city, addressClicked.state, addressClicked.street, addressClicked.complement, "", addressClicked.addressId)
            $(".vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street").val(addressClicked.street).attr("data-street","");
            $(".vcustom--vtex-omnishipping-1-x-address #ship-state").val(addressClicked.state);
            $(".vcustom--vtex-omnishipping-1-x-address #ship-city").val(addressClicked.city);
          }
        }, 100);
      }
    });

    $("body").on("click",".vtex-omnishipping-1-x-buttonCreateAddress, .vtex-omnishipping-1-x-disclaimer a#remove-unavailable-items", function(e) {
      $("body").addClass(_this.BodyFormClasses.join(" "));
      _this.address.addressId="";
      _this.updateAddress("");
    });

    $("body").on("click","#open-shipping, #edit-shipping-data", function(e) {
      //console.log($(".address-list.vtex-omnishipping-1-x-addressList > label").length)
      if(!_this.orderForm.shippingData.address) $("body").removeClass(_this.BodyFormClasses.join(" "));
    });

    $("body").on("click","#shipping-option-pickup-in-point", function(e) {
      $("body").removeClass(_this.BodyFormClasses.join(" "));
    });

    $("body").on("click",".vtex-omnishipping-1-x-backToAddressList", function(e) {
      $("body").removeClass(_this.BodyFormClasses.join(" "));
      _this.address.addressId="";
    });

    $("body").on("click",".vtex-omnishipping-1-x-addressItemOption", function(e) {
      _this.address.addressId=_this.orderForm.shippingData.availableAddresses[$(this).index()] ? _this.orderForm.shippingData.availableAddresses[$(this).index()].addressId : "";
    });

    $("body").on("change","select[name='v-custom-country']", function(e) {
      e.stopImmediatePropagation();
      try {
        let country = _countries.find(c=>c[1]==this.value)[0];
        $("select[name='v-custom-state']").html(`${_this.getRegions(country).join("")}`);
        _this.updateGoogleForm(this.value.toLowerCase());
        _this.updateAddress("");
      } catch(e) {}
    });

    $("body").on("click","#btn-go-to-shippping-method", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      //console.log(">>>>>>>>>>>> #btn-go-to-shippping-method")
      _this.submitAddressForm();
    });

    $("body").on("keyup", ".vcustom--vtex-omnishipping-1-x-address input", function (e) {
      if(this.value!="") {
        $(this).removeClass("error")
      }
    })
  }

  checkFirstLogin(orderForm) {
    let _this = this;
    if(orderForm && orderForm.shippingData) {
      if(orderForm.shippingData.address==null) {
        $("body").addClass(_this.BodyFormClasses[0]);
      }
    }
  }



  events() {
    let _this = this;

    $(window).on('orderFormUpdated.vtex', function(evt, orderForm) {
      _this.checkFirstLogin(orderForm);
    })
  }

  init(orderForm) {
    let _this = this;
    //if(!window.google) _this.loadScript();
    if(orderForm && window.google && $(".vcustom--vtex-omnishipping-1-x-address").length<1 && orderForm.items.length) {
      $("body").addClass(`${this.classOn}`);
      _this.orderForm = orderForm;
      _this.checkFirstLogin(orderForm);
      _this.bind();
      _this.events();

      _this.deliveryCountries = checkout.deliveryCountries();
      _this.mainCountry = checkout.countryCode();
      _this.lang = _this.orderForm.clientPreferencesData.locale;
      _this.locale = _locale[_this.orderForm.storePreferencesData.countryCode];
      _this.addressrules = _countriesrules[_this.orderForm.storePreferencesData.countryCode] ? _countriesrules[_this.orderForm.storePreferencesData.countryCode] : _countriesrules["WWD"];
      

      if(_this.orderForm && _this.orderForm.shippingData) {
        let shippingData = _this.orderForm.shippingData.address;
        if(shippingData) {
          _this.updateAddress(shippingData.country, shippingData.postalCode, shippingData.city, shippingData.state, shippingData.street, shippingData.number, shippingData.complement, "", shippingData.addressId)
        } else {
          _this.updateAddress("");
        }
      }
      
      _this.form(orderForm);
    } 
    
  }
  
}

module.exports = fnsCustomAddressForm;