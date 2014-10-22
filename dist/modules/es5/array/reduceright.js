/*!
* LiftJS Javascript Library v0.1.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  return Array.prototype.reduceRight ? !1 : (Array.prototype.reduceRight = function(callback, opt_initialValue) {
    if (!this) throw new TypeError("this is null or not defined");
    if ("function" != typeof callback) throw new TypeError(callback + " is not a function");
    var index, value, length = this.length >>> 0, isValueSet = !1;
    for (1 < arguments.length && (value = opt_initialValue, isValueSet = !0), index = length - 1; index > -1; --index) this.hasOwnProperty(index) || (isValueSet ? value = callback(value, this[index], index, this) : (value = this[index], 
    isValueSet = !0));
    if (!isValueSet) throw new TypeError("Reduce of empty array with no initial value");
    return value;
  }, !0);
});