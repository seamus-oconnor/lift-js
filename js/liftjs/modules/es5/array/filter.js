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
  return Array.prototype.filter ? !1 : (Array.prototype.filter = function(fun) {
    if (!this) throw new TypeError("this is null or not defined");
    var objects = Object(this), len = objects.length >>> 0;
    if ("function" != typeof fun) throw new TypeError();
    for (var res = [], i = 0, thisp = arguments[1]; len > i; ) {
      if (objects.hasOwnProperty(i)) {
        var val = objects[i];
        fun.call(thisp, val, i, objects) && res.push(val);
      }
      i++;
    }
    return res;
  }, !0);
});