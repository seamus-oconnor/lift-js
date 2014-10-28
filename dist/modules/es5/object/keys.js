/*!
* LiftJS Javascript Library v0.2.3
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  if (Object.keys) return !1;
  var hasDontEnumBug = !{
    toString: null
  }.propertyIsEnumerable("toString"), dontEnums = [ "toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor" ];
  return Object.keys = function(obj) {
    if ("object" != typeof obj && ("function" != typeof obj || null === obj) || !obj.hasOwnProperty) throw new TypeError(obj + " is not an object");
    var prop, result = [];
    for (prop in obj) obj.hasOwnProperty(prop) && result.push(prop);
    if (hasDontEnumBug) for (var i = 0, _len = dontEnums.length; _len > i; i++) obj.hasOwnProperty(dontEnums[i]) && result.push(dontEnums[i]);
    return result;
  }, !0;
});