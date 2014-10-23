define(function() {
  "use strict";

  if(Array.prototype.reduce) { return false; }

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
  Array.prototype.reduce = function shimArrayReduce(callback, opt_initialValue){
    if (!this) {
      throw new TypeError("this is null or not defined");
    }

    if ('function' !== typeof callback) {
      throw new TypeError(callback + ' is not a function');
    }

    /*jshint bitwise:false*/
    var index, value,
        length = this.length >>> 0,
        isValueSet = false;

    if (1 < arguments.length) {
      value = opt_initialValue;
      isValueSet = true;
    }

    for (index = 0; length > index; ++index) {
      if (this.hasOwnProperty(index)) {
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
