define(function() {
  "use strict";

  if(Object.getOwnPropertyNames) { return false; }

  console.warn('Unable to properly shim Object.getOwnPropertyNames().');

  Object.getOwnPropertyNames = function getOwnPropertyNames(o) {
    var result = [];

    for(var prop in o) {
      if(o.hasOwnProperty(prop)) {
        result.push(prop);
      }
    }
  };

  return true;
});
