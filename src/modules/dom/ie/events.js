define(function(elmod) {
  "use strict";

  function shimCreateEvent(klass, type, properties) {
    if(!type) { throw new TypeError("Not enough arguments to Event.constructor."); }
    if(properties !== undefined && typeof properties !== 'object') { throw new TypeError("Value can't be converted to a dictionary."); }

    properties = properties || {};

    var evt = document.createEventObject();

    evt.CAPTURING_PHASE = 1;
    evt.AT_TARGET = 2;
    evt.BUBBLING_PHASE = 3;

    evt.type = type;
    evt.eventPhase = undefined;
    evt.bubbles = !!properties.bubbles;
    evt.cancelable = !!properties.cancelable;
    evt.timeStamp = new Date().getTime();

    evt.stopPropagation = function() {
      if(this.cancelable) {
        this.cancelBubble = true;
      }
    };

    evt.preventDefault = function() {
      if(this.cancelable) {
        this.returnValue = false;
      }
    };

    switch(klass) {
      case 'MouseEvent':
        evt.screenX = properties.screenX;
        evt.screenY = properties.screenY;
        evt.clientX = properties.clientX;
        evt.clientY = properties.clientY;
        evt.ctrlKey = properties.ctrlKey;
        evt.shiftKey = properties.shiftKey;
        evt.altKey = properties.altKey;
        evt.metaKey = properties.metaKey;
        evt.button = properties.button;
        evt.relatedTarget = properties.relatedTarget;
        break;
      case 'UIEvent':
        evt.view = properties.view || window;
        evt.detail = properties.detail;
        break;
      }

    return evt;
  }

  function buildEvent(name) {
    return function(type, properties) {
      return shimCreateEvent(name, type, properties);
    };
  }

  function dispatchEvent(evt) {
    /*jshint validthis:true */

    this.fireEvent('on' + evt.type, evt);

    return evt.returnValue === false;
  }

  if(!window.CustomEvent && !document.createEvent) {

    var events = [
      'Event',
      'CustomEvent',
      'UIEvent',
      'MouseEvent'
    ];

    for(var i = events.length - 1; i >= 0; i--) {
      var name = events[i];

      window[name] = buildEvent(name);
    }

    return true;
  }

  if(!window.dispatchEvent) {
    // TODO: Sanity (insanity?) check like this needed?
    if(!document.fireEvent) {
      console.warn("Browser has support for neither document.dispatchEvent or document.fireEvent.");
      return null;
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
  }

  return false;
});
