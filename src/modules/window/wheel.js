define(function() {
  "use strict";

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/Reference/Events/wheel

  // detect available wheel event
  var support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
            document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
            "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

  if(support === 'wheel') { return false; }

  function wheelMoved(e) {
    e = e || window.event;

    // create a normalized event object
    var event = {
      // keep a ref to the original event object
      e: e,
      target: e.target || e.srcElement,
      type: "wheel",
      deltaMode: e.type === 'MozMousePixelScroll' ? 0 : 1,
      deltaX: 0,
      delatZ: 0,
      preventDefault: function() {
        if(e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
    };

    // calculate deltaY (and deltaX) according to the event
    if(support === 'mousewheel') {
      event.deltaY = - 1/40 * e.wheelDelta;
      // Webkit also support wheelDeltaX
      if(e.wheelDeltaX) {
        event.deltaX = - 1/40 * e.wheelDeltaX;
      }
    } else {
      event.deltaY = e.detail;
    }

    // it's time to fire the callback
    var new_e = document.createEvent("MouseEvents");

    new_e.initMouseEvent(
      "wheel",
      e.bubbles,
      e.cancelable,
      e.view,
      e.wheelData ? e.wheelData / -40 : e.detail,
      e.screenX,
      e.screenY,
      e.clientX,
      e.clientY,
      e.ctrlKey,
      e.altKey,
      e.shiftKey,
      e.metaKey,
      e.button,
      e.relatedTarget
    );

    (e.target || e.srcElement).dispatchEvent(new_e);
  }

  if(window.addEventListener) {
    window.addEventListener(support, wheelMoved, false);
    // handle MozMousePixelScroll in older Firefox
    window.addEventListener('MozMousePixelScroll', wheelMoved, false);
  } else {
    window.attachEvent('on' + support, wheelMoved);
  }

  return true;
});
