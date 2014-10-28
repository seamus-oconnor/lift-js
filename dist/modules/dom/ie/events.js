/*!
* LiftJS Javascript Library v0.2.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function(elmod) {
  "use strict";
  function shimCreateEvent(type) {
    function initUIEvent(type, bubbles, cancelable, view, detail) {
      evt.initEvent(type, bubbles, cancelable), evt.view = view, evt.detail = detail;
    }
    var evt = document.createEventObject();
    switch (evt.CAPTURING_PHASE = 1, evt.AT_TARGET = 2, evt.BUBBLING_PHASE = 3, evt.eventPhase = void 0, 
    evt.timeStamp = new Date().getTime(), evt.stopPropagation = function() {
      evt.cancelable && (evt.cancelBubble = !0);
    }, evt.preventDefault = function() {
      evt.cancelable && (evt.returnValue = !1);
    }, evt.initEvent = function(type, bubbles, cancelable) {
      evt.type = type, evt.bubbles = !!bubbles, evt.cancelable = !!cancelable;
    }, type) {
     case "HTMLEvents":
     case "HTMLEvent":
     case "Event":
      break;

     case "MouseEvent":
     case "MouseEvents":
      evt.initMouseEvent = function(type, bubbles, cancelable, view, detail, screenX, screenY, clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget) {
        if (arguments.length < 15) throw new TypeError("Not enough arguments to initMouseEvent.");
        initUIEvent(type, bubbles, cancelable, view, detail), evt.screenX = screenX, evt.screenY = screenY, 
        evt.clientX = clientX, evt.clientY = clientY, evt.ctrlKey = ctrlKey, evt.shiftKey = shiftKey, 
        evt.altKey = altKey, evt.metaKey = metaKey, evt.button = button, evt.relatedTarget = relatedTarget;
      };

     case "UIEvent":
     case "UIEvents":
      evt.initUIEvent = function(type, bubbles, cancelable, view, detail) {
        if (arguments.length < 5) throw new TypeError("Not enough arguments to initUIEvent.");
        initUIEvent(type, bubbles, cancelable, view, detail);
      };
      break;

     case "CustomEvent":
      evt.initUIEvent = function(type, bubbles, cancelable, view, detail) {
        initUIEvent(type, bubbles, cancelable, view, detail);
      };
      break;

     default:
      throw new TypeError("Unsupported event " + type);
    }
    return evt;
  }
  function dispatchEvent(evt) {
    if (!this.parentNode) throw new Error("Element must be in DOM before dispatching event");
    return this.fireEvent("on" + (evt.fakeEvent ? OVERLOADED_EVENT_NAME : evt.type), evt), 
    evt.returnValue === !1;
  }
  var shimmed = {}, attached_events_list = [], window_events = {}, OVERLOADED_EVENT_NAME = "click", HTML_EVENT_NAMES = {
    click: !0,
    mousedown: !0,
    mousemove: !0,
    mouseup: !0,
    mouseover: !0,
    mouseout: !0,
    keydown: !0,
    keypress: !0,
    keyup: !0,
    change: !0
  };
  !function() {
    function fixEventObject(e) {
      return e.pageX = e.pageX || e.clientX + document.documentElement.scrollLeft, e.pageY = e.pageY || e.clientY + document.documentElement.scrollTop, 
      e.target = e.target || e.srcElement, e.preventDefault = function() {
        e.returnValue = !1;
      }, e;
    }
    function shimAddEventListener(name, fn, use_capture) {
      if (use_capture) throw new Error("Capture not supported in IE");
      var self = this, handler = function() {
        fn.call(self, fixEventObject(window.event));
      }, needsOverride = !HTML_EVENT_NAMES[name];
      this.attachEvent("on" + (needsOverride ? OVERLOADED_EVENT_NAME : name), handler), 
      attached_events_list.push({
        fn: fn,
        el: this,
        overridden: needsOverride,
        type: name,
        callback: handler
      });
    }
    function shimRemoveEventListener(name, fn, use_capture) {
      if (use_capture) throw new Error("Capture not supported in IE");
      for (var i = 0, _len = attached_events_list.length; _len > i; i++) {
        var storedEventHandler = attached_events_list[i];
        if (fn === storedEventHandler.fn && name === storedEventHandler.name) {
          var evtName = "on" + (storedEventHandler.overridden ? OVERLOADED_EVENT_NAME : name);
          this.detachEvent(evtName, storedEventHandler.callback), attached_events_list.splice(i, 1);
          break;
        }
      }
    }
    function shimWindowAddEventListener(name, fn, use_capture) {
      if (use_capture) throw new Error("Capture not supported in IE");
      var events = window_events[name] = window_events[name] || [];
      events.push(fn), shimAddEventListener.call(this, name, fn, use_capture);
    }
    function shimWindowRemoveEventListener(name, fn, use_capture) {
      if (use_capture) throw new Error("Capture not supported in IE");
      var events = window_events[name] || [], i = events.indexOf(fn);
      -1 !== i && events.splice(i, 1), shimRemoveEventListener.call(this, name, fn, use_capture);
    }
    window.addEventListener = window.addEventListener || shimWindowAddEventListener, 
    window.removeEventListener = window.removeEventListener || shimWindowRemoveEventListener, 
    HTMLDocument.prototype.addEventListener = HTMLDocument.prototype.addEventListener || shimAddEventListener, 
    HTMLDocument.prototype.removeEventListener = HTMLDocument.prototype.removeEventListener || shimRemoveEventListener, 
    Element.prototype.addEventListener = Element.prototype.addEventListener || shimAddEventListener, 
    Element.prototype.removeEventListener = Element.prototype.removeEventListener || shimRemoveEventListener, 
    shimmed.listeners = !0;
  }(), document.createEvent || (document.createEvent = shimCreateEvent, shimmed.createEvent = !0), 
  window.dispatchEvent || (Element.prototype.dispatchEvent || (Element.prototype.dispatchEvent = dispatchEvent), 
  document.dispatchEvent || (document.dispatchEvent = dispatchEvent), window.dispatchEvent || (window.dispatchEvent = function(evt) {
    for (var events = elmod.window_events[evt.type], i = 0, _len = events.length; _len > i; i++) events[i](evt);
  }));
  for (var shim in shimmed) if (shimmed.hasOwnProperty(shim)) return shimmed;
  return !1;
});