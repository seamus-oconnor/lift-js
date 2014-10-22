/*!
* LiftJS Javascript Library v0.1.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  return Number.isFinite ? !1 : (Number.isFinite = function(val) {
    return "number" != typeof val ? !1 : isFinite(val);
  }, !0);
});