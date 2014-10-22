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
  return Array.prototype.indexOf ? !1 : (Array.prototype.indexOf = function(searchElement) {
    if (!this) throw new TypeError("this is null or not defined");
    var n, k, t = Object(this), len = t.length >>> 0;
    if (0 === len) return -1;
    if (n = 0, arguments.length > 1 && (n = Number(arguments[1]), n != n ? n = 0 : 0 != n && 1/0 != n && n != -1/0 && (n = (n > 0 || -1) * Math.floor(Math.abs(n)))), 
    n >= len) return -1;
    for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); len > k; k++) if (k in t && t[k] === searchElement) return k;
    return -1;
  }, !0);
});