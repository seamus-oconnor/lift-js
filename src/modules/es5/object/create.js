define(function() {
  "use strict";

  if(Object.create) return false;

  // Originally from:
  // http://stackoverflow.com/questions/10141086/understanding-crockfords-object-create-shim
  Object.create = function shimObjectCreate(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };

  return true;
});
