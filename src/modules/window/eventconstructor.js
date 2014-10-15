define(function() {
  "use strict";

  try {
    new window.CustomEvent();
    return false;
  } catch(e) {}

  function CustomEvent(event, params) {
    if(!event) { throw new TypeError("Failed to construct 'CustomEvent': An event name must be provided."); }
    if(!(this instanceof CustomEvent)) { throw new TypeError("Failed to construct 'CustomEvent': Please use the 'new' operator, this DOM object constructor cannot be called as a function."); }
    params = params || {};
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles || false, params.cancelable || false, params.detail || undefined);
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;

  function MouseEvent(event, params) {
    if(!event) { throw new TypeError("Failed to construct 'MouseEvent': An event name must be provided."); }
    if(!(this instanceof MouseEvent)) { throw new TypeError("Failed to construct 'MouseEvent': Please use the 'new' operator, this DOM object constructor cannot be called as a function."); }
    params = params || {};
    var evt = document.createEvent('MouseEvent');
    evt.initMouseEvent('click',
      params.bubbles || false,
      params.cancelable || false,
      params.view || window,
      params.detail || 0,
      params.screenX || 0,
      params.screenY || 0,
      params.clientX || 0,
      params.clientY || 0,
      params.ctrlKey || false,
      params.altKey || false,
      params.shiftKey || false,
      params.metaKey || false,
      params.button || 0,
      params.relatedTarget || null
    );
    return evt;
  }
  MouseEvent.prototype = window.MouseEvent.prototype;

  if(document.createEvent) {
    window.CustomEvent = CustomEvent;
    window.MouseEvent = MouseEvent;
  }

  return false;
});
