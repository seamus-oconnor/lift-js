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

  Object.keys = function shimObjectKeys(obj) {
    // In IE 8 Object.keys(document.body.contains) will throw an error because
    // .hasOwnProperty doesn't exist on this kind of native function/object.
    if(typeof obj !== 'object' && (typeof obj !== 'function' || obj === null) || !obj.hasOwnProperty) {
      throw new TypeError(obj + ' is not an object');
    }

    var result = [], prop;

    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        result.push(prop);
      }
    }

    if (hasDontEnumBug) {
      for (var i = 0, _len = dontEnums.length; i < _len; i++) {
        if (obj.hasOwnProperty(dontEnums[i])) {
          result.push(dontEnums[i]);
        }
      }
    }
    return result;
  };

  return true;
});
