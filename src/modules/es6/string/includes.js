define(function() {
  "use strict";

  if(String.prototype.includes) { return false; }

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes

  function shimIncludes(/*str, start*/) {
    /*jshint validthis:true */
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  }

  if(Object.defineProperty) {
    try {
      Object.defineProperty(String.prototype, 'includes', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: shimIncludes
      });
      return true;
    } catch(e) { } // IE 8 supports Object.defineProperty but only for DOM nodes
  }

  String.prototype.includes = shimIncludes;

  return true;
});
