define(function() {
  "use strict";

  if(window.innerWidth && window.innerHeight) return true;

  function windowResize() {
    var root = window.document.documentElement;
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
