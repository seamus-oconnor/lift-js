/*!
* LiftJS Javascript Library v0.2.4
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  var div = document.createElement("div");
  div.innerHTML = "<svg></svg>";
  var svg = div.firstChild;
  if ("classList" in div && svg && "classList" in svg) return !1;
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