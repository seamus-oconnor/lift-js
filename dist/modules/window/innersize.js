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

  if(window.innerWidth && window.innerHeight) { return false; }

  var root = document.documentElement;

  function windowResize() {
    window.innerHeight = root.offsetHeight;
    window.innerWidth = root.offsetWidth;
  }

  if(window.addEventListener) {
    window.addEventListener('resize', windowResize, false);
  } else {
    window.attachEvent('onresize', windowResize);
  }

  windowResize();

  return true;
});
