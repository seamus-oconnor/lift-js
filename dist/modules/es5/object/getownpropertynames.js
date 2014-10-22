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
  return Object.getOwnPropertyNames ? !1 : (Object.getOwnPropertyNames = function(o) {
    var result = [];
    for (var prop in o) o.hasOwnProperty(prop) && result.push(prop);
  }, !0);
});