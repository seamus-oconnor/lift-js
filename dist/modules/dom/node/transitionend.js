/*!
* LiftJS Javascript Library v0.1.2
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
  var vendors = {
    MozTransition: "transitionend",
    OTransition: "oTransitionEnd",
    WebkitTransition: "webkitTransitionEnd",
    msTransition: "MSTransitionEnd"
  }, eventName = null;
  for (var name in vendors) name in test.style && (eventName = vendors[name]);
  if (null === eventName) return null;
  var builtinAEL = Element.prototype.addEventListener;
  Element.prototype.addEventListener = function(name, fn, capture) {
    builtinAEL.call(this, "transitionend" === name ? eventName : name, fn, capture);
  };
  var builtinREL = Element.prototype.removeEventListener;
  return Element.prototype.removeEventListener = function(name, fn, capture) {
    builtinREL.call(this, "transitionend" === name ? eventName : name, fn, capture);
  }, !0;
});