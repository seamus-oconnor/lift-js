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
  var shimmed = {};
  window.console || (window.console = {}, shimmed.console = !0);
  for (var noop = function() {}, console_methods = [ "log", "debug", "info", "warn", "error", "profile", "profileEnd", "time", "timeEnd" ], i = console_methods.length; i--; ) {
    var name = console_methods[i];
    window.console[name] || (window.console[name] = noop, shimmed[name] = !0);
  }
  return shimmed;
});