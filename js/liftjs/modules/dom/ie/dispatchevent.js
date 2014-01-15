define(['./eventlisteners'], function(elmod) {
  "use strict";

  if(window.dispatchEvent) return false;

  // TODO: Sanity (insanity?) check like this needed?
  if(!document.fireEvent) {
    console.warn("Browser has support for neither document.dispatchEvent or document.fireEvent.");
    return null;
  }

  function dispatchEvent(evt) {
    /*jshint validthis:true */

    this.fireEvent('on' + evt.type, evt);

    return evt.returnValue === false;
  }

  if(!Element.prototype.dispatchEvent) {
    Element.prototype.dispatchEvent = dispatchEvent;
  }

  if(!document.dispatchEvent) {
    document.dispatchEvent = dispatchEvent;
  }

  if(!window.dispatchEvent) {
    window.dispatchEvent = function(evt) {
      var events = elmod.window_events[evt.type];
      for(var i = 0, _len = events.length; i < _len; i++) {
        events[i](evt);
      }
    };
  }

  return true;
});
