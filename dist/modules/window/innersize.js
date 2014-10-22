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
  function windowResize() {
    window.innerHeight = root.offsetHeight, window.innerWidth = root.offsetWidth;
  }
  if (window.innerWidth && window.innerHeight) return !0;
  var root = document.documentElement;
  return window.addEventListener ? window.addEventListener("resize", windowResize, !1) : window.attachEvent("onresize", windowResize), 
  windowResize(), !0;
});