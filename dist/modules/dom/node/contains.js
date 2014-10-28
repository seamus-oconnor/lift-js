/*!
* LiftJS Javascript Library v0.2.3
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  return Node.prototype.contains ? !1 : (Node.prototype.contains = function(arg) {
    return !!(16 & this.compareDocumentPosition(arg));
  }, !0);
});