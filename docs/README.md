# Checkout UI Custom Upload Prescription

The Checkout UI Custom app is responsible for customizing your store's Checkout UI through the admin's interface.

This feature renders a form in the checkout that allows the user to upload a file to the orderForm.

<img width="1010" alt="Captura de Pantalla 2021-09-14 a la(s) 11 44 16" src="https://user-images.githubusercontent.com/36748003/133279530-cdbb030b-a04d-4b1d-bffe-a63b58b3622f.png">


## Configuration

1. Using your terminal and the [VTEX IO Toolbelt](https://vtex.io/docs/recipes/development/vtex-io-cli-installment-and-command-reference), log into the desired VTEX account.
2. Run `vtex install vtex.checkout-ui-custom@0.5.3-hkignore.1` on the account you're working on.
3. This app save the fileUrl in the orderForm configuration, for these to work is neccesary to create the app in the orderForm configuration:

## Creating the app in the orderForm configuration
1.  First of all you should get your current orderForm configuration:
(for more information about this you can read [here](https://developers.vtex.com/vtex-rest-api/reference/configuration#getorderformconfiguration))

Through Postman make a GET request to this endpoint
`https://{{account}}.myvtex.com/api/checkout/pvt/configuration/orderForm`

This endpoint response with the orderForm configuration, copy the response object and add this key in the app section:
```json
"apps": [

+    {
+        "fields": [
+            "data"
+        ],
+        "id": "uploadfiles",
+        "major": 1
+    },

]
``` 
2.  POST the new orderForm configuration with the new app 

    Through Postman make a POST request to this endpoint
`https://{{account}}.myvtex.com/api/checkout/pvt/configuration/orderForm`

<img width="1353" alt="Captura de Pantalla 2021-09-14 a la(s) 12 39 35" src="https://user-images.githubusercontent.com/36748003/133289171-bafa20b6-7092-435e-a224-f0a4bfb13daf.png">

>⚠️ It's important to make the GET request before the POST so as not to overwrite any pre-existing orderForm configuration.
