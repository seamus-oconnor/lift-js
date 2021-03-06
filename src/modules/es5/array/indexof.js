define(function() {
  "use strict";

  if(Array.prototype.indexOf) { return false; }

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

  Array.prototype.indexOf = function shimArrayIndexOf(searchElement /*, fromIndex */ ) {
    if (!this) {
      throw new TypeError("this is null or not defined");
    }

    var len, i;

    // Special case actual array for performance
    if(this instanceof Array || Object.prototype.toString.call(this) === '[object Array]') {
      for(i = 0, len = this.length; i < len; i++) {
        if(this[i] === searchElement) {
          return i;
        }
      }
      return -1;
    } else {
      /*jshint bitwise:false*/
      var n, k, t = Object(this);

      len = t.length >>> 0;

      if (len === 0) {
        return -1;
      }

      n = 0;
      if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n !== n) { // shortcut for verifying if it's NaN
          n = 0;
        } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
          n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
      }

      if (n >= len) {
        return -1;
      }

      for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
        if (k in t && t[k] === searchElement) {
          return k;
        }
      }

      return -1;
    }
  };

  return true;
});
