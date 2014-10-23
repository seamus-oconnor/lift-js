/*!
* LiftJS Javascript Library v0.2.0
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  return Array.prototype.lastIndexOf ? !1 : (Array.prototype.lastIndexOf = function(searchElement) {
    if (!this) throw new TypeError("this is null or not defined");
    if (this instanceof Array || "[object Array]" === Object.prototype.toString.call(this)) {
      for (var i = this.length - 1; i >= 0; i--) if (this[i] === searchElement) return i;
      return -1;
    }
    var n, k, t = Object(this), len = t.length >>> 0;
    if (0 === len) return -1;
    for (n = len, arguments.length > 1 && (n = Number(arguments[1]), n !== n ? n = 0 : 0 !== n && n !== 1 / 0 && n !== -(1 / 0) && (n = (n > 0 || -1) * Math.floor(Math.abs(n)))), 
    k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) if (k in t && t[k] === searchElement) return k;
    return -1;
  }, !0);
});