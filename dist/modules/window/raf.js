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
  if (window.requestAnimationFrame && window.cancelRequestAnimationFrame) return !1;
  for (var getNow = Date.now || function() {
    return new Date().getTime();
  }, prefixes = [ "webkit", "moz" ], i = prefixes.length - 1; i >= 0; i--) {
    var prefix = prefixes[i];
    window.requestAnimationFrame = window[prefix + "RequestAnimationFrame"], window.cancelAnimationFrame = window[prefix + "CancelAnimationFrame"] || window[prefix + "CancelRequestAnimationFrame"];
  }
  if (!window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
      var now = getNow(), nextTime = Math.max(lastTime + 16, now);
      return lastTime = nextTime, setTimeout(function() {
        callback(lastTime);
      }, nextTime - now);
    }, window.cancelAnimationFrame = clearTimeout;
  }
  return !0;
});