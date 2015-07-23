/*!
* LiftJS Javascript Library v0.2.6
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";

  if(Object.create) { return false; }

  // Originally from:
  // http://stackoverflow.com/questions/10141086/understanding-crockfords-object-create-shim
  Object.create = function shimObjectCreate(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };

  return true;
});
