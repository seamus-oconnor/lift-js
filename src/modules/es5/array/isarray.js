define(function() {
  "use strict";

  if(Array.isArray) { return false; }

  // Oringally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray

  Array.isArray = function shimIsArray(arr) {
    return arr instanceof Array || Object.prototype.toString.call(arr) === '[object Array]';
  };

  return true;
});
