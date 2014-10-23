/*jshint bitwise:false*/

define(function() {
  "use strict";

  if(Array.prototype.every) { return false; }

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
  Array.prototype.every = function shimArrayEvery(fun /*, thisp */) {
    var t, len, i, thisp;

    if (!this) {
      throw new TypeError("this is null or not defined");
    }

    t = Object(this);
    len = t.length >>> 0;
    if(typeof fun !== 'function') {
      throw new TypeError();
    }

    thisp = arguments[1];
    for (i = 0; i < len; i++) {
      if (i in t && !fun.call(thisp, t[i], i, t)) {
        return false;
      }
    }

    return true;
  };

  return true;
});
