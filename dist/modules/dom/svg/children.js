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
  var div = document.createElement("div");
  if ("children" in div) return !1;
  if (Object.defineProperty) {
    var classListPropDesc = {
      get: function() {
        return classListGetter.call(this);
      },
      enumerable: !0,
      configurable: !0
    };
    try {
      Object.defineProperty(svgProto, "classList", classListPropDesc);
    } catch (ex) {
      -2146823252 === ex.number && (classListPropDesc.enumerable = !1, Object.defineProperty(svgProto, "classList", classListPropDesc));
    }
  } else Object.prototype.__defineGetter__ && svgProto.__defineGetter__("classList", classListGetter);
  return !0;
});