define(function() {
  "use strict";

  if(Array.prototype.some) return false;

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
  Array.prototype.some = function shimArraySome(fun /*, thisp */) {
    if (!this) {
      throw new TypeError("this is null or not defined");
    }

    var thisp, i,
        t = Object(this),
        len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    thisp = arguments[1];
    for (i = 0; i < len; i++) {
      if (i in t && fun.call(thisp, t[i], i, t)) {
        return true;
      }
    }

    return false;
  };

  return true;
});
