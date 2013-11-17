define(['./eventlisteners'], function(elmod) {
  "use strict";

  if(document.dispatchEvent) return false;

  // TODO: Sanity (insanity?) check like this needed?
  if(!document.dispatchEvent) {
    console.warn("Browser has support for neither document.dispatchEvent or document.fireEvent.");
    return null;
  }

  function dispatchEvent(event) {
    this.fireEvent('on' + event.type, event);

    return event.returnValue === false;
  }

  if(Element.prototype.dispatchEvent) {
    Element.prototype.dispatchEvent = dispatchEvent;
  }

  if(Document.prototype.dispatchEvent) {
    Document.prototype.dispatchEvent = dispatchEvent;
  }

  if(window.dispatchEvent) {
    window.dispatchEvent = function(event) {
      var events = elmod.window_events[event.type];
      for(var i = 0, _len = events.length; i < _len; i++) {
        events[i](event);
      }
    };
  }

  return true;
});
