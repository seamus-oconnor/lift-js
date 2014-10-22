/*!
* LiftJS Javascript Library v0.1.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  function fix_event_object(e) {
    return e.pageX = e.pageX || e.clientX + document.documentElement.scrollLeft, e.pageY = e.pageY || e.clientY + document.documentElement.scrollTop, 
    e.target = e.target || e.srcElement, e.preventDefault = function() {
      e.returnValue = !1;
    }, e;
  }
  function shimAddEventListener(name, fn, use_capture) {
    if (use_capture) throw new Error("Capture not supported in IE");
    var self = this, handler = function() {
      fn.call(self, fix_event_object(window.event));
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
  if (window.addEventListener) return !1;
  if (!window.attachEvent) return null;
  var attached_events_list = [], window_events = {};
  return window.attachEvent && (window.addEventListener = shimWindowAddEventListener), 
  window.detachEvent && (window.removeEventListener = shimWindowRemoveEventListener), 
  HTMLDocument.prototype.attachEvent && (HTMLDocument.prototype.addEventListener = shimAddEventListener), 
  HTMLDocument.prototype.detachEvent && (HTMLDocument.prototype.removeEventListener = shimRemoveEventListener), 
  Element.prototype.attachEvent && (Element.prototype.addEventListener = shimAddEventListener), 
  Element.prototype.detachEvent && (Element.prototype.removeEventListener = shimRemoveEventListener), 
  !0;
});