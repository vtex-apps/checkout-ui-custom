# checkout-custom

This repo allows you to generate an style to your checkout based in basic configurations and config. Bear in mind that is mandatory to use both files (js/css) on your checkout to a better experience. 

A combination of conditions and variables will adapt your checkout according your preferences. 


### Running npm

`npm run dev` to watch and build the sass file
`npm run build` to build the sass file and copy the js


### Expected HTML in the header

```

<header class="main-header">
  <div class="container">
	  <div class="header-link">
		<a href="/" title="add more products" class="buy-more-link link">Continue shopping</a>
		<a href="/checkout/#/cart" title="back to cart" class="back-cart-link link">Back to Cart</a>
	  </div>
	  <a href="/" title="Go to homepage" class="logo">{shop.name}</a>
  </div>
</header>

```

### Expected HTML in the Footer

```
<footer class="main-footer">
  <div class="container">
	  VTEX © 2020
  </div>
</footer>

```



### Variables


`// CHECKOUT VARS`

Show all variables to customize the checkout according your own preferences

```
$inputHeight:40px;
$showCartQuantityPrice:false; // if shows the total price per product ot just the single price
$countingSteps:true; // if shows the number of each step "1,2,3..."
```

