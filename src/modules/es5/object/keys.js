define(function() {
  "use strict";

  if(Object.keys) { return false; }

  // Originally from:
  // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  var hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString');
  var dontEnums = [
    'toString',
    'toLocaleString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'constructor'
  ];
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  Object.keys = function shimObjectKeys(obj) {
    // In IE 8 Object.keys(document.body.contains) will throw an error because
    // .hasOwnProperty doesn't exist on this kind of native function/object.
    if(typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
      throw new TypeError(obj + ' is not an object');
    }

    var result = [];

    for (var prop in obj) {
      if (hasOwnProperty.call(obj, prop)) {
        result.push(prop);
      }
    }

    if (hasDontEnumBug) {
      for (var i = 0, _len = dontEnums.length; i < _len; i++) {
        if (hasOwnProperty.call(obj, dontEnums[i])) {
          result.push(dontEnums[i]);
        }
      }
    }

    return result;
  };

  return true;
});
