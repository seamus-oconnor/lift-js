/*!
* LiftJS Javascript Library v0.2.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  return String.prototype.repeat ? !1 : (String.prototype.repeat = function(count) {
    if (1/0 === count) throw new RangeError("repeat count must be less than infinity and not overflow maximum string size");
    if ((count |= 0) < 0) throw new RangeError("repeat count must be non-negative");
    for (var result = "", self = this; count; ) 1 & count && (result += self), (count >>= 1) && (self += self);
    return result;
  }, !0);
});