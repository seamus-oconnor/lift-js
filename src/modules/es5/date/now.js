define(function() {
  "use strict";

  if(Date.now) return false;

  // Oringally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now
  Date.now = function shimDateNow() {
    return new Date().getTime();
  };

  return true;
});
