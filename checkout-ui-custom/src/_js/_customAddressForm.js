class fnsCustomAddressForm {
  constructor({
    active=false
  } = {}) {


    this.BodyFormClasses = ["v-custom-addressForm-on", "v-custom-googleForm-on"];
    this.active = active;
    this.googleMapsApiKey = vtex.googleMapsApiKey;
    this.orderForm="";
    this.classOn = "v-custom-fnsCustomAddressForm";

    this.address = {
      postalCode:"",
      city:"",
      state:"",
      street:"",
      complement:"",
      addressQuery:"",
      addressId:""
    };

    this.validate=true;
  }


  loadScript() {
    $("body").append(`<script src="https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&language=en-US&libraries=places"></script>`);
  }


  updateAddress(postalCode="", city="", state="", street="", complement="", addressQuery="", addressId="") {
    
    this.address = {
      postalCode: postalCode,
      addressId:  addressId,
      city: city,
      state: state,
      street: street,
      complement: complement,
      addressQuery:addressQuery
    };

    if(arguments[0]=="") {
      this.setForm("");
    }
  }

  setForm(street="", postalCode="", city="", state="", complement="") {
    $(".vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street").val(street);
    $(".vcustom--vtex-omnishipping-1-x-address #ship-complement").val(complement);
    $(".vcustom--vtex-omnishipping-1-x-address #ship-city").val(city);
    $(".vcustom--vtex-omnishipping-1-x-address #ship-state").val(state);
    $(".vcustom--vtex-omnishipping-1-x-address #ship-postalCode").val(postalCode);
    $(".vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street").attr("data-street", street)

  }

  googleForm() {

    let _this = this;
    
    let input = document.getElementById('v-custom-ship-street');
    let autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setComponentRestrictions({
      country: ["us"]
    });


    autocomplete.addListener("place_changed", function() {
      let place = autocomplete.getPlace();

      //console.log(place);

      let street = !~place.types.indexOf("street_address") ? place.formatted_address.split(",")[0] : place.name;
      let state = place.address_components.filter(item => item.types[0]=="administrative_area_level_1")[0].short_name;
      let postalCode = place.address_components.filter(item => item.types[0]=="postal_code").length  ? place.address_components.filter(item => item.types[0]=="postal_code")[0].long_name : "";
      let city = place.address_components.find(i => ~i.types.indexOf("locality"));
      city = city ? city.long_name : place.vicinity;
      let complement = $(".vcustom--vtex-omnishipping-1-x-address #ship-complement").val();

      _this.setForm(street, postalCode, city, state, complement);
      _this.validateAllFields();
      _this.updateAddress(postalCode, city, state, street, complement, place.formatted_address, _this.address.addressId);
      
      //_this.sendAddress(place, state, postalCode, city, complement);    
      
    });

    $("body").on("keyup", "#v-custom-ship-street", function(e) {
      $(this).attr("autocomplete","none")
    })

    $("body").on("focus", "#v-custom-ship-street", function(e) {
      $(this).attr("autocomplete","none")
    })
    
  }

  sendAddress(_street, _state, _postalCode, _city, _complement, _addressQuery, _addressId) {
      let _this = this;

      var b = JSON.stringify({
        'selectedAddresses':[
           {
              'addressType':'residential',
              'receiverName':'',
              'addressId':_addressId,
              'addressId2':'19ed870fd45744afb0d6b12504e34aab',
              'isDisposable':true,
              'postalCode':_postalCode,
              'city':_city,
              'state':_state,
              'country':'USA',
              'street':_street,
              'number':null,
              'neighborhood':null,
              'complement':_complement,
              'reference':null
           }
        ],
        'clearAddressIfPostalCodeNotFound':false,
     });

      console.log(_addressId, b)
      
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
                'addressId':'',
                'isDisposable':true,
                'postalCode':_postalCode,
                'city':_city,
                'state':_state,
                'country':'USA',
                'street':_street,
                'number':null,
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
              _this.updateAddress(_postalCode, _city, _state, _street, _complement, "", _addressQuery||"");

              $("body").removeClass(_this.BodyFormClasses.join(" "));
              _this.orderForm = vtexjs.checkout.orderForm;
              $("body").removeClass("js-v-custom-is-loading");
            });
          }
          
      });
      
  
  }

  form(orderForm) {
    
    let shippingData = orderForm.shippingData;

    //$(".vcustom--vtex-omnishipping-1-x-address").remove();
    let form = `
      <div class="vcustom--vtex-omnishipping-1-x-address step">
        <div>
        <form>
            <p class="input ship-country hide text"><label for="ship-country">Country</label><input required autocomplete="on" id="ship-country" type="text" name="v-custom-country" maxlength="100" class="input-medium" data-hj-whitelist="true" value="USA"></p>
            <p class="input v-custom-ship-street required text"><label for="v-custom-ship-street">Street address or P.O. Box</label><input required autocomplete="none" id="v-custom-ship-street" type="text" name="v-custom-street" class="input-xlarge" data-hj-whitelist="true" value="${shippingData.address ? shippingData.address.street : "" }" placeholder="Eg: 225 East 41st Street, New York"><span class="help error" style="">This field is required.</span></p>
            <p class="input ship-complement text"><label for="ship-complement">Apartment number, unit, floor, etc.</label><input autocomplete="on" id="ship-complement" type="text" name="v-custom-complement" maxlength="750" placeholder="Apartment, suite, building, floor, etc (optional)" class="input-xlarge" data-hj-whitelist="true" value="${shippingData.address ? shippingData.address.complement==null ? "" : shippingData.address.complement : "" }"></p>
            <div class="vcustom--vtex-omnishipping-1-x-address__state">
              <p class="input ship-city required text"><label for="ship-city">City</label><input required autocomplete="on" id="ship-city" type="text" name="v-custom-city" maxlength="100" class="input-large" data-hj-whitelist="true" value="${shippingData.address ? shippingData.address.city : "" }"><span class="help error" style="">This field is required.</span></p>
              <p class="input ship-state required text"><label for="ship-state">State</label><select name="v-custom-state" id="ship-state" class="input-large">
                      <option value="" disabled selected>State</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AS">American Samoa</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="AP">Army Post Office</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="DC">District Of Columbia (Washington, D.C.)</option>
                      <option value="FM">Federated States of Micronesia</option>
                      <option value="FP">Fleet Post Office</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="GU">Guam</option>
                      <option value="HI">Hawaii</option>
                      <option value="ID">Idaho</option>
                      <option value="IL">Illinois</option>
                      <option value="IN">Indiana</option>
                      <option value="IA">Iowa</option>
                      <option value="KS">Kansas</option>
                      <option value="KY">Kentucky</option>
                      <option value="LA">Louisiana</option>
                      <option value="ME">Maine</option>
                      <option value="MH">Marshall Islands</option>
                      <option value="MD">Maryland</option>
                      <option value="MA">Massachusetts</option>
                      <option value="MI">Michigan</option>
                      <option value="MN">Minnesota</option>
                      <option value="MS">Mississippi</option>
                      <option value="MO">Missouri</option>
                      <option value="MT">Montana</option>
                      <option value="NE">Nebraska</option>
                      <option value="NV">Nevada</option>
                      <option value="NH">New Hampshire</option>
                      <option value="NJ">New Jersey</option>
                      <option value="NM">New Mexico</option>
                      <option value="NY">New York</option>
                      <option value="NC">North Carolina</option>
                      <option value="ND">North Dakota</option>
                      <option value="MP">Northern Mariana Islands</option>
                      <option value="OH">Ohio</option>
                      <option value="OK">Oklahoma</option>
                      <option value="OR">Oregon</option>
                      <option value="PW">Palau</option>
                      <option value="PA">Pennsylvania</option>
                      <option value="PR">Puerto Rico</option>
                      <option value="RI">Rhode Island</option>
                      <option value="SC">South Carolina</option>
                      <option value="SD">South Dakota</option>
                      <option value="TN">Tennessee</option>
                      <option value="TX">Texas</option>
                      <option value="UM">U.S. Minor Outlying Islands</option>
                      <option value="VI">U.S. Virgin Islands</option>
                      <option value="UT">Utah</option>
                      <option value="VT">Vermont</option>
                      <option value="VA">Virginia</option>
                      <option value="WA">Washington</option>
                      <option value="WV">West Virginia</option>
                      <option value="WI">Wisconsin</option>
                      <option value="WY">Wyoming</option>
                  </select></p>
              <p class="input ship-postalCode required text"><label for="ship-postalCode">Zip Code</label><input required autocomplete="on" id="ship-postalCode" type="text" name="receiver" maxlength="20" class="input-xlarge" data-hj-whitelist="true" value="${shippingData.address ? shippingData.address.postalCode : "" }"><span class="help error" style="">This field is required.</span></p>
            </div>
            <p class="vtex-omnishipping-1-x-submitShippingStepButton btn-submit-wrapper btn-go-to-shipping-wrapper"><button class="submit  btn-go-to-shippping-method btn btn-large btn-success" id="btn-go-to-shippping-method" type="submit">Continue to shipping</button></p>
        </form>
        </div>
      </div>
    `;

    shippingData.address ? $(".vcustom--vtex-omnishipping-1-x-address #ship-state").val(shippingData.address.state) : "";
    

    $(".orderform-template-holder #shipping-data").append(form);
    this.googleForm();

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

    let street = _st.attr("data-street") || _st.val(),
        complement =  $(".vcustom--vtex-omnishipping-1-x-address #ship-complement").val(),
        city =  $(".vcustom--vtex-omnishipping-1-x-address #ship-city").val(),
        state =  $(".vcustom--vtex-omnishipping-1-x-address #ship-state").val(),
        postalCode =  $(".vcustom--vtex-omnishipping-1-x-address #ship-postalCode").val();
    
    //_this.updateAddress(postalCode, city, state, street, complement, "", _this.address.addressId);
    _this.sendAddress(street, state, postalCode, city, complement, _this.address.addressQuery, _this.address.addressId)
  }

  bind() {
    let _this = this;
    $("body").on("click",".step.shipping-data .vtex-omnishipping-1-x-linkEdit, .vtex-omnishipping-1-x-buttonEditAddress", function(e) {

      let indexAddress = $(".vtex-omnishipping-1-x-addressItemOption.vtex-omnishipping-1-x-active").index();

      if(indexAddress<0) {
        indexAddress=0
      }

      let addressClicked = _this.orderForm.shippingData.availableAddresses[_this.orderForm.shippingData.availableAddresses.length-1];

      //console.log(addressClicked);

      $("body").addClass(_this.BodyFormClasses.join(" "));
      _this.updateAddress(addressClicked.postalCode, addressClicked.city, addressClicked.state, addressClicked.street, addressClicked.complement, "", addressClicked.addressId)
      $(".vcustom--vtex-omnishipping-1-x-address #v-custom-ship-street").val(_this.address.street || addressClicked.street).attr("data-street","");
    });

    $("body").on("click",".vtex-omnishipping-1-x-buttonCreateAddress", function(e) {
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
      _this.address.addressId=_this.orderForm.shippingData.availableAddresses[$(this).index()].addressId;
    });

    $("body").on("click","#btn-go-to-shippping-method", function(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      console.log(">>>>>>>>>>>> #btn-go-to-shippping-method")
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
    //console.log(window.google && $(".vcustom--vtex-omnishipping-1-x-address").length<1 && orderForm.items.length)
    if(orderForm && window.google && $(".vcustom--vtex-omnishipping-1-x-address").length<1 && orderForm.items.length) {
      if(orderForm.storePreferencesData.countryCode=="USA") {
        $("body").addClass(`${this.classOn}`);
        _this.orderForm = orderForm;
        _this.checkFirstLogin(orderForm);
        _this.bind();
        _this.events();
        
        if(_this.orderForm && _this.orderForm.shippingData) {
          let shippingData = _this.orderForm.shippingData.address;
          if(shippingData) {
            _this.updateAddress(shippingData.postalCode, shippingData.city, shippingData.state, shippingData.street, shippingData.complement, "", shippingData.addressId)
          } else {
            _this.updateAddress("");
          }
        }
        
        if($(".step.accordion-group.shipping-data").length) {
          _this.form(orderForm);
        } 
      } 
    } 
    
  }
  
}

module.exports = fnsCustomAddressForm;