/*!
* LiftJS Javascript Library v0.2.5
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/



define(function() {
  "use strict";

  if(Array.from) { return false; }

  // Copied from: https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js
  Array.from = function shimArrayFrom(iterable) {
    var mapFn = arguments[1];
    var context = arguments[2];

    if (mapFn !== undefined && Object.prototype.toString.call(mapFn) !== '[object Function]') {
      throw new TypeError('when provided, the second argument must be a function');
    }

    var Arr = this;
    var list = Object(iterable);
    /*jshint bitwise:false*/
    var length = list.length >>> 0;
    var result = typeof this === 'function' ? Object(new Arr(length)) : new Array(length);

    for (var i = 0; i < length; i++) {
      var value = list[i];
      if (mapFn !== undefined) {
        result[i] = context ? mapFn.call(context, value) : mapFn(value);
      } else {
        result[i] = value;
      }
    }

    result.length = length;
    return result;
  };

  return true;
});
