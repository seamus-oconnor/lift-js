/*!
* LiftJS Javascript Library v0.2.1
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function(elmod) {
  "use strict";
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
    };
    this.attachEvent("on" + name, handler), attached_events_list.push({
      fn: fn,
      el: this,
      event: name,
      callback: handler
    });
  }
  function shimRemoveEventListener(name, fn, use_capture) {
    if (use_capture) throw new Error("Capture not supported in IE");
    for (var i = 0, _len = attached_events_list.length; _len > i; i++) if (fn === attached_events_list[i].fn) {
      this.detachEvent("on" + name, attached_events_list[i].callback), attached_events_list.splice(i, 1);
      break;
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
  function shimCreateEvent(klass, type, properties) {
    if (!type) throw new TypeError("Not enough arguments to Event.constructor.");
    if (void 0 !== properties && "object" != typeof properties) throw new TypeError("Value can't be converted to a dictionary.");
    properties = properties || {};
    var evt = document.createEventObject();
    switch (evt.CAPTURING_PHASE = 1, evt.AT_TARGET = 2, evt.BUBBLING_PHASE = 3, evt.type = type, 
    evt.eventPhase = void 0, evt.bubbles = !!properties.bubbles, evt.cancelable = !!properties.cancelable, 
    evt.timeStamp = new Date().getTime(), evt.stopPropagation = function() {
      this.cancelable && (this.cancelBubble = !0);
    }, evt.preventDefault = function() {
      this.cancelable && (this.returnValue = !1);
    }, klass) {
     case "MouseEvent":
      evt.screenX = properties.screenX, evt.screenY = properties.screenY, evt.clientX = properties.clientX, 
      evt.clientY = properties.clientY, evt.ctrlKey = properties.ctrlKey, evt.shiftKey = properties.shiftKey, 
      evt.altKey = properties.altKey, evt.metaKey = properties.metaKey, evt.button = properties.button, 
      evt.relatedTarget = properties.relatedTarget;
      break;

     case "UIEvent":
      evt.view = properties.view || window, evt.detail = properties.detail;
    }
    return evt;
  }
  function buildEvent(name) {
    return function(type, properties) {
      return shimCreateEvent(name, type, properties);
    };
  }
  function dispatchEvent(evt) {
    return this.fireEvent("on" + evt.type, evt), evt.returnValue === !1;
  }
  if (window.addEventListener) return !1;
  if (!window.attachEvent) return console.warn("Browser has support for neither window.addEventListener or window.attachEvent."), 
  null;
  var attached_events_list = [], window_events = {};
  if (window.attachEvent && (window.addEventListener = shimWindowAddEventListener), 
  window.detachEvent && (window.removeEventListener = shimWindowRemoveEventListener), 
  HTMLDocument.prototype.attachEvent && (HTMLDocument.prototype.addEventListener = shimAddEventListener), 
  HTMLDocument.prototype.detachEvent && (HTMLDocument.prototype.removeEventListener = shimRemoveEventListener), 
  Element.prototype.attachEvent && (Element.prototype.addEventListener = shimAddEventListener), 
  Element.prototype.detachEvent && (Element.prototype.removeEventListener = shimRemoveEventListener), 
  window.CustomEvent || document.createEvent || (window.CustomEvent = buildEvent("Event")), 
  !window.dispatchEvent) {
    if (!document.fireEvent) return console.warn("Browser has support for neither document.dispatchEvent or document.fireEvent."), 
    null;
    Element.prototype.dispatchEvent || (Element.prototype.dispatchEvent = dispatchEvent), 
    document.dispatchEvent || (document.dispatchEvent = dispatchEvent), window.dispatchEvent || (window.dispatchEvent = function(evt) {
      for (var events = elmod.window_events[evt.type], i = 0, _len = events.length; _len > i; i++) events[i](evt);
    });
  }
  return !1;
});