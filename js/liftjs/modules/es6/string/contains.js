/*!
* LiftJS Javascript Library v0.2.4
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  function shimContains(str, start) {
    return -1 !== this.indexOf(str, start);
  }
  if (String.prototype.contains) return !1;
  if (Object.defineProperty) try {
    Object.defineProperty(String.prototype, "contains", {
      enumerable: !1,
      configurable: !1,
      writable: !1,
      value: shimContains
    });
  } catch (e) {
    String.prototype.contains = shimContains;
  } else String.prototype.contains = shimContains;
  return !0;
});