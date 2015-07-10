/*!
* LiftJS Javascript Library v0.2.4
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";

  if(String.prototype.endsWith) { return false; }

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith

  function shimEndsWith(search, pos) {
    /*jshint validthis:true */
    pos = pos || this.length;
    pos = pos - search.length;
    var last_index = this.lastIndexOf(search);
    return last_index !== -1 && last_index === pos;
  }

  if(Object.defineProperty) {
    try {
      Object.defineProperty(String.prototype, 'endsWith', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: shimEndsWith
      });
    } catch(e) { // IE 8 supports Object.defineProperty but only for DOM nodes
      String.prototype.endsWith = shimEndsWith;
    }
  } else {
    String.prototype.endsWith = shimEndsWith;
  }

  return true;
});
