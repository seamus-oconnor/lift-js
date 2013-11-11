define(function() {
  "use strict";

  if(Array.isArray) return false;

  // Oringally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray

  Array.isArray = function shimIsArray(vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };

  return true;
});
