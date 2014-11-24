/*!
* LiftJS Javascript Library v0.2.4
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  return Array.from ? !1 : (Array.from = function(iterable) {
    var mapFn = arguments[1], context = arguments[2];
    if (void 0 !== mapFn && "[object Function]" !== Object.prototype.toString.call(mapFn)) throw new TypeError("when provided, the second argument must be a function");
    for (var Arr = this, list = Object(iterable), length = list.length >>> 0, result = "function" == typeof this ? Object(new Arr(length)) : new Array(length), i = 0; length > i; i++) {
      var value = list[i];
      result[i] = void 0 !== mapFn ? context ? mapFn.call(context, value) : mapFn(value) : value;
    }
    return result.length = length, result;
  }, !0);
});