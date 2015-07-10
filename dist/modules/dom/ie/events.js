/*!
* LiftJS Javascript Library v0.2.4
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


/*global HTMLDocument*/

define(function() {
  'use strict';

  // TODO: look at https://github.com/WebReflection/ie8/blob/master/src/ie8.js
  var shimmed = {};

  // Assume we have attachEvent because this is IE.

  var attached_events_list = [];
  var window_events = {};

  var OVERLOADED_EVENT_NAME = 'click';

  //window.attachEvent('onunload', function() {
  //  for(fn in attached_events_list) {
  //    var attached_event = attached_events_list[fn];
  //
  //    attached_event.el.detachEvent(attached_event.name, fn);
  //  }
  //});

  var HTML_EVENT_NAMES = {
    'click': true,
    'mousedown': true,
    'mousemove': true,
    'mouseup': true,
    'mouseover': true,
    'mouseout': true,
    'keydown': true,
    'keypress': true,
    'keyup': true,
    'change': true
  };

  (function shimListeners() {
    // Make sure we don't shim something we don't need to
    function fixEventObject(e) {
      e.pageX = e.pageX || (e.clientX + document.documentElement.scrollLeft);
      e.pageY = e.pageY || (e.clientY + document.documentElement.scrollTop);
      e.target = e.target || e.srcElement;
      e.preventDefault = function() {
        e.returnValue = false;
      };

      //window.event = null;

      return e;
    }

    function shimAddEventListener(name, fn, use_capture) {
      /*jshint validthis:true*/

      if(use_capture) {
        throw new Error('Capture not supported in IE');
      }

      var self = this;

      var handler = function() {
        fn.call(self, fixEventObject(window.event));
      };

      var needsOverride = !HTML_EVENT_NAMES[name];

      this.attachEvent('on' + (needsOverride ? OVERLOADED_EVENT_NAME : name), handler);

      attached_events_list.push({fn: fn, el: this, overridden: needsOverride, type: name, callback: handler});
    }

    function shimRemoveEventListener(name, fn, use_capture) {
      /*jshint validthis:true*/
      if(use_capture) {
        throw new Error('Capture not supported in IE');
      }

      for(var i = 0, _len = attached_events_list.length; i < _len; i++) {
        var storedEventHandler = attached_events_list[i];
        if(fn === storedEventHandler.fn && name === storedEventHandler.name) {
          var evtName = 'on' + (storedEventHandler.overridden ? OVERLOADED_EVENT_NAME : name);
          this.detachEvent(evtName, storedEventHandler.callback);
          attached_events_list.splice(i, 1);
          break;
        }
      }
    }

    function shimWindowAddEventListener(name, fn, use_capture) {
      /*jshint validthis:true*/
      if(use_capture) {
        throw new Error('Capture not supported in IE');
      }

      var events = window_events[name] = window_events[name] || [];
      events.push(fn);

      shimAddEventListener.call(this, name, fn, use_capture);
    }

    function shimWindowRemoveEventListener(name, fn, use_capture) {
      /*jshint validthis:true*/

      if(use_capture) {
        throw new Error('Capture not supported in IE');
      }

      var events = window_events[name] || [];
      var i = events.indexOf(fn);
      if(i !== -1) { events.splice(i, 1); }

      shimRemoveEventListener.call(this, name, fn, use_capture);
    }

    window.addEventListener = window.addEventListener || shimWindowAddEventListener;
    window.removeEventListener = window.removeEventListener || shimWindowRemoveEventListener;

    HTMLDocument.prototype.addEventListener = HTMLDocument.prototype.addEventListener || shimAddEventListener;
    HTMLDocument.prototype.removeEventListener = HTMLDocument.prototype.removeEventListener || shimRemoveEventListener;

    Element.prototype.addEventListener = Element.prototype.addEventListener || shimAddEventListener;
    Element.prototype.removeEventListener = Element.prototype.removeEventListener || shimRemoveEventListener;

    shimmed.listeners = true;
  })();


  function shimCreateEvent(type) {
    var evt = document.createEventObject();

    evt.CAPTURING_PHASE = 1;
    evt.AT_TARGET = 2;
    evt.BUBBLING_PHASE = 3;

    evt.eventPhase = undefined;
    evt.timeStamp = new Date().getTime();

    evt.stopPropagation = function() {
      if(evt.cancelable) {
        evt.cancelBubble = true;
      }
    };

    evt.preventDefault = function() {
      if(evt.cancelable) {
        evt.returnValue = false;
      }
    };

    function initUIEvent(type, bubbles, cancelable, view, detail) {
      evt.initEvent(type, bubbles, cancelable);
      evt.view = view;
      evt.detail = detail;
    }

    evt.initEvent = function shimInitEvent(type, bubbles, cancelable) {
      evt.type = type;
      evt.bubbles = !!bubbles;
      evt.cancelable = !!cancelable;
    };

    switch(type) {
      case 'HTMLEvents':
      case 'HTMLEvent':
      case 'Event':
        // These event types only support initEvent defined above.
        break;
      case 'MouseEvent':
      case 'MouseEvents':
        evt.initMouseEvent = function shimInitMouseEvent(type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget) {
          if(arguments.length < 15) { throw new TypeError("Not enough arguments to initMouseEvent."); }
          initUIEvent(type, bubbles, cancelable, view, detail);
          evt.screenX = screenX;
          evt.screenY = screenY;
          evt.clientX = clientX;
          evt.clientY = clientY;
          evt.ctrlKey = ctrlKey;
          evt.shiftKey = shiftKey;
          evt.altKey = altKey;
          evt.metaKey = metaKey;
          evt.button = button;
          evt.relatedTarget = relatedTarget;
        };
        /* falls through */
      case 'UIEvent':
      case 'UIEvents':
        evt.initUIEvent = function shimInitUIEvent(type, bubbles, cancelable, view, detail) {
          if(arguments.length < 5) { throw new TypeError("Not enough arguments to initUIEvent."); }
          initUIEvent(type, bubbles, cancelable, view, detail);
        };
        break;
      case 'CustomEvent':
        evt.initCustomEvent = function shimInitCustomEvent(type, bubbles, cancelable, detail) {
          if(arguments.length < 3) { throw new TypeError("Not enough arguments to initCustomEvent."); }
          evt.initEvent(type, bubbles, cancelable);
          evt.detail = detail;
          evt.$fakeEvent$ = true;
        };
        break;
      default:
        throw new TypeError("Unsupported event " + type);
    }

    return evt;
  }

  if(!document.createEvent) {
    document.createEvent = shimCreateEvent;
    shimmed.createEvent = true;
  }

  function dispatchEvent(evt) {
    /*jshint validthis:true */

    if(!this.parentNode) {
      throw new Error('Element must be in DOM before dispatching event');
    }

    this.fireEvent('on' + (evt.$fakeEvent$ ? OVERLOADED_EVENT_NAME : evt.type), evt);

    return evt.returnValue === false;
  }

  if(!window.dispatchEvent) {
    if(!Element.prototype.dispatchEvent) {
      Element.prototype.dispatchEvent = dispatchEvent;
    }

    if(!document.dispatchEvent) {
      document.dispatchEvent = dispatchEvent;
    }

    if(!window.dispatchEvent) {
      window.dispatchEvent = function(evt) {
        var events = window_events[evt.type];
        for(var i = 0, _len = events.length; i < _len; i++) {
          events[i](evt);
        }
      };
    }
  }

  // Bit of backwards logic in this file. If anything is shimmed then the loop
  // will be entered. Return the `shimmed` object detailing what was shimmed.
  for(var shim in shimmed) {
    if(shimmed.hasOwnProperty(shim)) {
      return shimmed;
    }
  }

  // If we don't return in the above loop then no shims were applied.
  return false;
});
