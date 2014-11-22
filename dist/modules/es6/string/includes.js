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
  function shimIncludes() {
    return -1 !== String.prototype.indexOf.apply(this, arguments);
  }
  if (String.prototype.includes) return !1;
  if (Object.defineProperty) try {
    return Object.defineProperty(String.prototype, "includes", {
      enumerable: !1,
      configurable: !1,
      writable: !1,
      value: shimIncludes
    }), !0;
  } catch (e) {}
  return String.prototype.includes = shimIncludes, !0;
});