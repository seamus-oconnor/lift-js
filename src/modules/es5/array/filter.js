define(function() {
  "use strict";

  if(Array.prototype.filter) return false;

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

  Array.prototype.filter = function shimArrayFilter(fun /*, thisp*/) {
    if (!this) {
      throw new TypeError("this is null or not defined");
    }

    var objects = Object(this);
    var len = objects.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisp = arguments[1];
    for (var i in objects) {
      if (objects.hasOwnProperty(i)) {
        if (fun.call(thisp, objects[i], i, objects)) {
          res.push(objects[i]);
        }
      }
    }

    return res;
  };

  return true;
});
