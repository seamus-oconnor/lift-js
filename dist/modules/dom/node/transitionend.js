/*!
* LiftJS Javascript Library v0.2.3
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  var test = document.createElement("div");
  if ("transition" in test) return !1;
  for (var vendors = [ [ "MozTransition", "transitionend" ], [ "OTransition", "oTransitionEnd" ], [ "WebkitTransition", "webkitTransitionEnd" ], [ "WebkitTransition", "WebkitTransitionEnd" ], [ "msTransition", "MSTransitionEnd" ] ], eventName = null, i = vendors.length - 1; i >= 0; i--) {
    var vendor = vendors[i];
    vendor[0] in test.style && (eventName = vendor[1]);
  }
  if (null === eventName) return {
    error: "Unable to shim transitionend"
  };
  var builtinAEL = Element.prototype.addEventListener;
  Element.prototype.addEventListener = function(name, fn, capture) {
    builtinAEL.call(this, "transitionend" === name ? eventName : name, fn, capture);
  };
  var builtinREL = Element.prototype.removeEventListener;
  return Element.prototype.removeEventListener = function(name, fn, capture) {
    builtinREL.call(this, "transitionend" === name ? eventName : name, fn, capture);
  }, !0;
});