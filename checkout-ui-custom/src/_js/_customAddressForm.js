class fnsCustomAddressForm {
  constructor({
    active=false
  } = {}) {


    this.BodyFormClasses = ["v-custom-addressForm-on", "v-custom-googleForm-on"];
    this.active = active;
    this.googleMapsApiKey = vtex.googleMapsApiKey;
    this.ordermForm="";
    this.classOn = "v-custom-fnsCustomAddressForm";
  }


  loadScript() {
    $("body").append(`<script src="https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&language=en-US&libraries=places"></script>`);
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
      console.log(place)

      let state = place.address_components.filter(item => item.types[0]=="administrative_area_level_1")[0].short_name;
      let postalCode = place.address_components.filter(item => item.types[0]=="postal_code")[0].long_name;
      let city = place.vicinity;
      let complement = $(".vcustom--vtex-omnishipping-1-x-address #ship-complement").val();

      
        $(".vcustom--vtex-omnishipping-1-x-address #ship-city").val(city);
        $(".vcustom--vtex-omnishipping-1-x-address #ship-state").val(state);
        $(".vcustom--vtex-omnishipping-1-x-address #ship-postalCode").val(postalCode);
        
        _this.sendAddress(place, state, postalCode, city, complement);
      
    });

    $("body").on("keyup", "#v-custom-ship-street", function(e) {
      if(this.value=="") {$("body").removeClass(_this.BodyFormClasses[1])}
      else { $("body").addClass(_this.BodyFormClasses[1]); };
    })
    
  }

  sendAddress(_place, _state, _postalCode, _city, _complement) {
      let _this = this;

      $("body").removeClass(_this.BodyFormClasses.join(" "));
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
                'isDisposable':true,
                'postalCode':_postalCode,
                'city':_city,
                'state':_state,
                'country':'USA',
                'street':_place.name,
                'number':null,
                'neighborhood':null,
                'complement':_complement,
                'reference':null,
                'addressQuery':_place.formatted_address
             }
          ],
          'clearAddressIfPostalCodeNotFound':false,
          
       }),
        "method":"POST",
        "mode":"cors"
      })
      .then(response => response.json())
      .then(function(data) {
          vtexjs.checkout.getOrderForm()
          .done(function(order) {
            _this.orderForm = vtexjs.checkout.orderForm;
            $("body").removeClass("js-v-custom-is-loading");
          });
      });
  
  }

  form(orderForm) {
    
    let shippingData = orderForm.shippingData;

    //$(".vcustom--vtex-omnishipping-1-x-address").remove();
    let form = `
      <div class="vcustom--vtex-omnishipping-1-x-address">
        <div>
            <p class="input ship-country hide text"><label for="ship-country">Country</label><input autocomplete="on" id="ship-country" type="text" name="country" maxlength="100" class="input-medium" data-hj-whitelist="true" value="USA"></p>
            <p class="input v-custom-ship-street required text"><label for="v-custom-ship-street">Street Address</label><input autocomplete="on" id="v-custom-ship-street" type="text" name="street" class="input-xlarge" data-hj-whitelist="true" value="" placeholder="${shippingData.address ? shippingData.address.street : "" }"></p>
            <p class="input ship-complement text"><label for="ship-complement">Apartment number, unit, floor, etc.</label><input autocomplete="on" id="ship-complement" type="text" name="complement" maxlength="750" placeholder="Apartment, suite, building, floor, etc (optional)" class="input-xlarge success" data-hj-whitelist="true" value="${shippingData.address ? shippingData.address.complement : "" }"></p>
            <p class="input ship-city required text"><label for="ship-city">City</label><input autocomplete="on" id="ship-city" type="text" name="city" maxlength="100" class="input-large" data-hj-whitelist="true" value="${shippingData.address ? shippingData.address.city : "" }"></p>
            <p class="input ship-state required text"><label for="ship-state">State</label><select name="state" id="ship-state" class="input-large">
                    <option value="" disabled=""></option>
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
            <p class="input ship-postalCode required text"><label for="ship-postalCode">Zip Code</label><input autocomplete="on" id="ship-postalCode" type="text" name="receiver" maxlength="20" class="input-xlarge" data-hj-whitelist="true" value="${shippingData.address ? shippingData.address.postalCode : "" }"></p>
        </div>
      </div>
    `;

    shippingData.address ? $(".vcustom--vtex-omnishipping-1-x-address #ship-state").val(shippingData.address.state) : "";
    

    $(".orderform-template-holder #shipping-data").append(form);
    this.googleForm();

  }

  validateAllFields() {

    let _this = this;
    $("body").on("keyup", ".vcustom--vtex-omnishipping-1-x-address input", function (e) {

      let street = $("#v-custom-ship-street").val(),
          complement = $("#ship-complement").val(),
          city = $("#ship-city").val(),
          state = $("#ship-state").val(),
          postalCode =  $("#ship-postalCode").val();
      if(street.length>=10 && city.length >= 3 && state != "" && postalCode.length>=5) {
        let place = { name:street, formatted_address:"" };
        _this.sendAddress(place, state, postalCode, city, complement);
      }
    })
  }

  bind() {
    let _this = this;
    $("body").on("click",".step.shipping-data .vtex-omnishipping-1-x-linkEdit", function(e) {
      $("body").addClass(_this.BodyFormClasses.join(" "));
      $("#v-custom-ship-street").val("")
    });
  }
  init(orderForm) {
    if(window.google && $(".vcustom--vtex-omnishipping-1-x-address").length<1) {
      $("body").addClass(`${this.classOn} v-custom-addressForm-on`);
      this.orderForm = orderForm;
      this.bind();
      this.validateAllFields();
      if($(".step.accordion-group.shipping-data").length) {
        this.form(orderForm);
      } 
    } 
    
  }
  
}

module.exports = fnsCustomAddressForm;