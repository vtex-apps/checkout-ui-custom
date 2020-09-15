class fnsCustomAddressForm {
  constructor({
    active=false
  } = {}) {

    this.classOn="v-custom-customAddressForm-on";
    this.active = active;
    this.googleMapsApiKey = vtex.googleMapsApiKey;
  }


  loadScript() {
    $("body").append(`<script src="https://maps.googleapis.com/maps/api/js?key=${this.googleMapsApiKey}&language=en-US&libraries=places"></script>`);
  }


  setupAddress(_place, _state, _postalCode, _city, _complement) {
    var postalCode = "00000";  
    console.log(_postalCode, postalCode)
    let zaddress = {
      addressType: "residential",
      receiverName: "",
      isDisposable: false,
      postalCode: postalCode,
      city: _city,
      state: _state,
      country: "USA",
      street: _place.name,
      number: null,
      neighborhood: null,
      complement: _complement,
      addressQuery:_place.formatted_address
    };

    vtexjs.checkout.getOrderForm()
    .then(function(orderForm) {
      
      console.log(zaddress)
      return vtexjs.checkout.calculateShipping(zaddress)
    }).done(function(orderForm) {
    
      console.log(orderForm);
      vtexjs.checkout.getOrderForm();
    })
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
        $(".vcustom--vtex-omnishipping-1-x-address #ship-state").val(state)
        $(".vcustom--vtex-omnishipping-1-x-address #ship-postalCode").val(postalCode)

        $("body").removeClass("v-custom-googleForm-on v-custom-addressForm-on");

        _this.setupAddress(place, state, postalCode, city, complement)
      
    });

    $("body").on("keyup", "#v-custom-ship-street", function(e) {
      if(this.value=="") {$("body").removeClass("v-custom-googleForm-on")}
      else {
        $("body").addClass("v-custom-googleForm-on");
      };
    })
    
  }

  form() {
    $("body").addClass(this.classOn)
    $(".vcustom--vtex-omnishipping-1-x-address").remove();
    let form = `
      <div class="vcustom--vtex-omnishipping-1-x-address">
        <div>
            <p class="input ship-country hide text"><label for="ship-country">Country</label><input autocomplete="on" id="ship-country" type="text" name="country" maxlength="100" class="input-medium" data-hj-whitelist="true" value="USA"></p>
            <p class="input v-custom-ship-street required text"><label for="v-custom-ship-street">Street Address</label><input autocomplete="on" id="v-custom-ship-street" type="text" name="street" class="input-xlarge" data-hj-whitelist="true" value="" placeholder="Eg: 225 East 41st Street, New York"></p>
            <p class="input ship-complement text"><label for="ship-complement">Address Line 2</label><input autocomplete="on" id="ship-complement" type="text" name="complement" maxlength="750" placeholder="Apartment, suite, building, floor, etc (optional)" class="input-xlarge success" data-hj-whitelist="true" value=""></p>
            <p class="input ship-reference hide text"><label for="ship-reference">Close to</label><input autocomplete="on" id="ship-reference" type="text" name="reference" maxlength="750" class="input-xlarge" data-hj-whitelist="true" value=""></p>
            <p class="input ship-neighborhood hide text"><label for="ship-neighborhood">Neighborhood</label><input autocomplete="on" id="ship-neighborhood" type="text" name="neighborhood" maxlength="100" class="input-large" data-hj-whitelist="true" value=""></p>
            <p class="input ship-city required text"><label for="ship-city">City</label><input autocomplete="on" id="ship-city" type="text" name="city" maxlength="100" class="input-large" data-hj-whitelist="true" value=""></p>
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
            <p class="input ship-postalCode required text"><label for="ship-postalCode">Zip Code</label><input autocomplete="on" id="ship-postalCode" type="text" name="receiver" maxlength="20" class="input-xlarge" data-hj-whitelist="true" value=""></p>
        </div>
      </div>
    `;

    $(".orderform-template-holder #shipping-data").append(form);
    this.googleForm();

  }

  bind() {
    
    $("body").on("click",".step.shipping-data .vtex-omnishipping-1-x-linkEdit", function(e) {
      $("body").addClass("v-custom-googleForm-on v-custom-addressForm-on");
    });
  }
  init(orderForm) {
    if(window.google && $(".vcustom--vtex-omnishipping-1-x-address").length<1) this.form();
    this.bind();
    
  }
  
}

module.exports = fnsCustomAddressForm;