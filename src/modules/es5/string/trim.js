define(function() {
  "use strict";

  if(String.prototype.trim) return false;

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
  String.prototype.trim = function shimStringTrim() {
    return this.replace(/^\s+|\s+$/g, '');
  };

  return true;
});
