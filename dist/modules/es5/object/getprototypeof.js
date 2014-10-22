/*!
* LiftJS Javascript Library v0.1.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*
* Build Date: Wednesday, October 22nd, 2014, 10:23:36 PM
*/


define(function() {
  "use strict";
  return Object.getPrototypeOf ? !1 : (Object.getPrototypeOf = "object" == typeof this.__proto__ ? function(obj) {
    return obj.__proto__;
  } : function(obj) {
    var constructor = obj.constructor;
    if (Object.prototype.hasOwnProperty.call(obj, "constructor")) {
      var oldConstructor = constructor;
      if (!delete obj.constructor) return null;
      constructor = obj.constructor, obj.constructor = oldConstructor;
    }
    return constructor ? constructor.prototype : null;
  }, !0);
});