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
  var descriptor = {
    get: function() {
      for (var arr = [], child = this.firstChild; child; ) 1 === child.nodeType && arr.push(child), 
      child = child.nextSibling;
      return arr;
    },
    enumerable: !0
  };
  try {
    Object.defineProperty(Element.prototype, "children", descriptor);
  } catch (e) {
    delete descriptor.enumerable, Object.defineProperty(Element.prototype, "children", descriptor);
  }
  return !0;
});