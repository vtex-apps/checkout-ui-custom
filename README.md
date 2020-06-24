# checkout-custom

This repo allows you to generate an style to your checkout based in basic configurations and config. Bear in mind that is mandatory to use both files (js/css) on your checkout to a better experience. 

A combination of conditions and variables will adapt your checkout according your preferences. 


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

