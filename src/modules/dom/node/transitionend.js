define(function() {
  "use strict";

  var test = document.createElement('div');

  if('transition' in test) { return false; }

  var vendors = [
    ['MozTransition', 'transitionend'],
    ['OTransition', 'oTransitionEnd'],
    ['WebkitTransition', 'webkitTransitionEnd'],
    ['WebkitTransition', 'WebkitTransitionEnd'], // Safari 6 needs "Webkit..."
    ['msTransition', 'MSTransitionEnd']
  ];

  var eventName = null;
  for (var i = vendors.length - 1; i >= 0; i--) {
    var vendor = vendors[i];
    if(vendor[0] in test.style) {
      eventName = vendor[1];
    }
  }

  if(eventName === null) {
    console.warn("Unable to shim transitionend");
    return null;
  }

  var builtinAEL = Element.prototype.addEventListener;
  Element.prototype.addEventListener = function(name, fn, capture) {
    builtinAEL.call(this, name === 'transitionend' ? eventName : name, fn, capture);
  };

  var builtinREL = Element.prototype.removeEventListener;
  Element.prototype.removeEventListener = function(name, fn, capture) {
    builtinREL.call(this, name === 'transitionend' ? eventName : name, fn, capture);
  };

  return true;
});
