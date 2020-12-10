module.exports.debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

module.exports.formatCurrency = (_locale, _currency, _value) => {
  let price = _value/100;
  new Intl.NumberFormat(_locale,
    { style: 'currency', currency: _currency }
  ).format(price);
 return price;
};

