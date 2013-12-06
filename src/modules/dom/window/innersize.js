define(function() {
  "use strict";

  if(window.innerWidth && window.innerHeight) return true;

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
