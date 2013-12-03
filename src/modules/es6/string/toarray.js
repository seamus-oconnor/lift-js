define(function() {
  "use strict";

  if(String.prototype.toArray) return false;

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toArray


  function shimToArray() {
    /*jshint validthis:true */
    return this.split('');
  }

  if(Object.defineProperty) {
    try {
      Object.defineProperty(String.prototype, 'toArray', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: shimToArray
      });
    } catch(e) { // IE 8 supports Object.defineProperty but only for DOM nodes
      String.prototype.toArray = shimToArray;
    }
  } else {
    String.prototype.toArray = shimToArray;
  }

  return true;
});
