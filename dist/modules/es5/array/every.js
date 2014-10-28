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
  return Array.prototype.every ? !1 : (Array.prototype.every = function(fun) {
    var t, len, i, thisp;
    if (!this) throw new TypeError("this is null or not defined");
    if (t = Object(this), len = t.length >>> 0, "function" != typeof fun) throw new TypeError();
    for (thisp = arguments[1], i = 0; len > i; i++) if (i in t && !fun.call(thisp, t[i], i, t)) return !1;
    return !0;
  }, !0);
});