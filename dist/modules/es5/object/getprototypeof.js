/*!
* LiftJS Javascript Library v0.2.4
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


/*jshint proto:true*/

define(function() {
  "use strict";

  if(Object.getPrototypeOf) { return false; }

  // Originally from:
  // http://forrst.com/posts/Object_getPrototypeOf_shim-eNB
  if(typeof this.__proto__ === 'object') {
    Object.getPrototypeOf = function shimObjectGetPrototypeOf(obj) {
      return obj.__proto__;
    };
  } else {
    Object.getPrototypeOf = function shimObjectGetPrototypeOf(obj) {
      var constructor = obj.constructor;

      if(Object.prototype.hasOwnProperty.call(obj, "constructor")) {
        var oldConstructor = constructor;

        if(!(delete obj.constructor)) { // reset constructor
          return null; // can't delete obj.constructor, return null
        }

        constructor = obj.constructor; // get real constructor
        obj.constructor = oldConstructor; // restore constructor
      }

      return constructor ? constructor.prototype : null; // needed for IE
    };
  }

  return true;
});
