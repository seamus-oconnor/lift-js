/*!
* LiftJS Javascript Library v0.2.1
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  function shimStartsWith(search, pos) {
    return pos = pos || 0, this.indexOf(search, pos) === pos;
  }
  if (String.prototype.startsWith) return !1;
  if (Object.defineProperty) try {
    Object.defineProperty(String.prototype, "startsWith", {
      enumerable: !1,
      configurable: !1,
      writable: !1,
      value: shimStartsWith
    });
  } catch (e) {
    String.prototype.startsWith = shimStartsWith;
  } else String.prototype.startsWith = shimStartsWith;
  return !0;
});