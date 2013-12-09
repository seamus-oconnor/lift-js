define(function() {
  "use strict";

  var test = document.createElement('div');

  if('transition' in test) return false;

  var vendors = {
    'MozTransition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'WebkitTransition': 'webkitTransitionEnd',
    'msTransition': 'MSTransitionEnd'
  };

  var eventName = null;
  for(var name in vendors) {
    if(name in test.style) {
      eventName = vendors[name];
    }
  }

  if(eventName === null) { return null; } // Can't shim

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


