define(function() {
  "use strict";

  if(String.prototype.contains) return false;

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains


  function shimContains(str, start) {
    /*jshint validthis:true */
    return this.indexOf(str, start) !== -1;
  }

  if(Object.defineProperty) {
    try {
      Object.defineProperty(String.prototype, 'contains', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: shimContains
      });
    } catch(e) { // IE 8 supports Object.defineProperty but only for DOM nodes
      String.prototype.contains = shimContains;
    }
  } else {
    String.prototype.contains = shimContains;
  }

  return true;
});
