/*!
* LiftJS Javascript Library v0.2.5
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";

  if(window.requestAnimationFrame && window.cancelRequestAnimationFrame) { return false; }

  // Originally from:
  // https://github.com/darius/requestAnimationFrame

  var getNow = Date.now || function() {
    return new Date().getTime();
  };

  var prefixes = ['webkit', 'moz'];

  for (var i = prefixes.length - 1; i >= 0; i--) {
    var prefix = prefixes[i];

    window.requestAnimationFrame = window[prefix + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame'];
  }

  if(!window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;

    window.requestAnimationFrame = function(callback) {
      var now = getNow();
      var nextTime = Math.max(lastTime + 16, now);
      lastTime = nextTime;

      return setTimeout(function() {
        callback(lastTime);
      }, nextTime - now);
    };

    window.cancelAnimationFrame = clearTimeout;
  }

  return true;
});
