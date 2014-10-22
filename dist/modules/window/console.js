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
  var is_shimmed = !1;
  window.console || (window.console = {}, is_shimmed = !0);
  for (var noop = function() {}, console_methods = [ "log", "debug", "info", "warn", "error", "profile", "profileEnd", "time", "timeEnd" ], i = console_methods.length; i--; ) {
    var name = console_methods[i];
    window.console[name] || (window.console[name] = noop, is_shimmed = !0);
  }
  return is_shimmed;
});