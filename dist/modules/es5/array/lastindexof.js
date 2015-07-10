/*!
* LiftJS Javascript Library v0.2.4
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";

  if(Array.prototype.lastIndexOf) { return false; }

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf

  Array.prototype.lastIndexOf = function shimArrayLastIndexOf(searchElement /*, fromIndex*/) {
    if (!this) {
      throw new TypeError("this is null or not defined");
    }

    // Special case actual array for performance
    if(this instanceof Array || Object.prototype.toString.call(this) === '[object Array]') {
      for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] === searchElement) {
          return i;
        }
      }
      return -1;
    } else {
      /*jshint bitwise:false*/
      var n, k, t = Object(this), len = t.length >>> 0;

      if (len === 0) {
        return -1;
      }

      n = len;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n !== n) {
          n = 0;
        }
        else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }

      for (k = n >= 0 ? Math.min(n, len - 1) : len - Math.abs(n); k >= 0; k--) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }

      return -1;
    }
  };

  return true;
});
