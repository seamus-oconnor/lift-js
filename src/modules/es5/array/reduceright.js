define(function() {
  "use strict";

  if(Array.prototype.reduceRight) return false;

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight
  Array.prototype.reduceRight = function(callback, opt_initialValue) {
    if (!this) {
      throw new TypeError("this is null or not defined");
    }

    if ('function' !== typeof callback) {
      throw new TypeError(callback + ' is not a function');
    }

    var index, value,
        length = this.length >>> 0,
        isValueSet = false;

    if (1 < arguments.length) {
      value = opt_initialValue;
      isValueSet = true;
    }

    for (index = length - 1; -1 < index; --index) {
      if (!this.hasOwnProperty(index)) {
        if (isValueSet) {
          value = callback(value, this[index], index, this);
        }
        else {
          value = this[index];
          isValueSet = true;
        }
      }
    }

    if (!isValueSet) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    return value;
  };

  return true;
});
