/*!
* LiftJS Javascript Library v0.2.3
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  function wheelMoved(e) {
    e = e || window.event;
    var event = {
      e: e,
      target: e.target || e.srcElement,
      type: "wheel",
      deltaMode: "MozMousePixelScroll" === e.type ? 0 : 1,
      deltaX: 0,
      delatZ: 0,
      preventDefault: function() {
        e.preventDefault ? e.preventDefault() : e.returnValue = !1;
      }
    };
    "mousewheel" === support ? (event.deltaY = -1 / 40 * e.wheelDelta, e.wheelDeltaX && (event.deltaX = -1 / 40 * e.wheelDeltaX)) : event.deltaY = e.detail;
    var new_e = document.createEvent("MouseEvents");
    new_e.initMouseEvent("wheel", e.bubbles, e.cancelable, e.view, e.wheelData ? e.wheelData / -40 : e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, e.relatedTarget), 
    (e.target || e.srcElement).dispatchEvent(new_e);
  }
  var support = "onwheel" in document.createElement("div") ? "wheel" : void 0 !== document.onmousewheel ? "mousewheel" : "DOMMouseScroll";
  return "wheel" === support ? !1 : (window.addEventListener ? (window.addEventListener(support, wheelMoved, !1), 
  window.addEventListener("MozMousePixelScroll", wheelMoved, !1)) : window.attachEvent("on" + support, wheelMoved), 
  !0);
});