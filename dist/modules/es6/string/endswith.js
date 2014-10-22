/*!
* LiftJS Javascript Library v0.1.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*
* Build Date: Wednesday, October 22nd, 2014, 10:23:36 PM
*/


define(function() {
  "use strict";
  function shimEndsWith(search, pos) {
    pos = pos || this.length, pos -= search.length;
    var last_index = this.lastIndexOf(search);
    return -1 !== last_index && last_index === pos;
  }
  if (String.prototype.endsWith) return !1;
  if (Object.defineProperty) try {
    Object.defineProperty(String.prototype, "endsWith", {
      enumerable: !1,
      configurable: !1,
      writable: !1,
      value: shimEndsWith
    });
  } catch (e) {
    String.prototype.endsWith = shimEndsWith;
  } else String.prototype.endsWith = shimEndsWith;
  return !0;
});