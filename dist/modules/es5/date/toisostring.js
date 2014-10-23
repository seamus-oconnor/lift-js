/*!
* LiftJS Javascript Library v0.2.0
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  function pad(number) {
    var r = number + "";
    return 1 === r.length && (r = "0" + r), r;
  }
  return Date.prototype.toISOString ? !1 : (Date.prototype.toISOString = function() {
    return this.getUTCFullYear() + "-" + pad(this.getUTCMonth() + 1) + "-" + pad(this.getUTCDate()) + "T" + pad(this.getUTCHours()) + ":" + pad(this.getUTCMinutes()) + ":" + pad(this.getUTCSeconds()) + "." + ((this.getUTCMilliseconds() / 1e3).toFixed(3) + "").slice(2, 5) + "Z";
  }, !0);
});