/*!
* LiftJS Javascript Library v0.1.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*
* Build Date: Wednesday, October 22nd, 2014, 10:23:36 PM
*/


define(function() {
  "use strict";
  function CustomEvent(event, params) {
    if (!event) throw new TypeError("Failed to construct 'CustomEvent': An event name must be provided.");
    if (!(this instanceof CustomEvent)) throw new TypeError("Failed to construct 'CustomEvent': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
    params = params || {};
    var evt = document.createEvent("CustomEvent");
    return evt.initCustomEvent(event, params.bubbles || !1, params.cancelable || !1, params.detail || void 0), 
    evt;
  }
  function MouseEvent(event, params) {
    if (!event) throw new TypeError("Failed to construct 'MouseEvent': An event name must be provided.");
    if (!(this instanceof MouseEvent)) throw new TypeError("Failed to construct 'MouseEvent': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
    params = params || {};
    var evt = document.createEvent("MouseEvent");
    return evt.initMouseEvent("click", params.bubbles || !1, params.cancelable || !1, params.view || window, params.detail || 0, params.screenX || 0, params.screenY || 0, params.clientX || 0, params.clientY || 0, params.ctrlKey || !1, params.altKey || !1, params.shiftKey || !1, params.metaKey || !1, params.button || 0, params.relatedTarget || null), 
    evt;
  }
  try {
    return new window.CustomEvent(), !1;
  } catch (e) {}
  return CustomEvent.prototype = window.Event.prototype, MouseEvent.prototype = window.MouseEvent.prototype, 
  document.createEvent && (window.CustomEvent = CustomEvent, window.MouseEvent = MouseEvent), 
  !1;
});