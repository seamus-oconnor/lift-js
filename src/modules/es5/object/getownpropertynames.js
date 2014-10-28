define(function() {
  "use strict";

  if(Object.getOwnPropertyNames) { return false; }

  Object.getOwnPropertyNames = function getOwnPropertyNames(o) {
    var result = [];

    for(var prop in o) {
      if(o.hasOwnProperty(prop)) {
        result.push(prop);
      }
    }
  };

  return {
    warn: "Unable to properly shim Object.getOwnPropertyNames()."
  };
});
