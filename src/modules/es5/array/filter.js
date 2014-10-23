
define(function() {
  "use strict";

  if(Array.prototype.filter) { return false; }

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

  Array.prototype.filter = function shimArrayFilter(fun /*, thisp*/) {
    if (!this) {
      throw new TypeError("this is null or not defined");
    }

    var objects = Object(this);
    /*jshint bitwise:false*/
    var len = objects.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var i = 0;
    var thisp = arguments[1];
    while(i < len) {
      if(objects.hasOwnProperty(i)) {
        var val = objects[i];
        if (fun.call(thisp, val, i, objects)) {
          res.push(val);
        }
      }
      i++;
    }

    return res;
  };

  return true;
});
