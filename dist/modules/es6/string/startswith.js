/*!
* LiftJS Javascript Library v0.2.6
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";

  if(String.prototype.startsWith) { return false; }

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith

  function shimStartsWith(search, pos) {
    /*jshint validthis:true */
    pos = pos || 0;
    return this.indexOf(search, pos) === pos;
  }

  if(Object.defineProperty) {
    try {
      Object.defineProperty(String.prototype, 'startsWith', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: shimStartsWith
      });
    } catch(e) { // IE 8 supports Object.defineProperty but only for DOM nodes
      String.prototype.startsWith = shimStartsWith;
    }
  } else {
    String.prototype.startsWith = shimStartsWith;
  }

  return true;
});
