/*!
* LiftJS Javascript Library v0.2.5
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  'use strict';

  var shimmed = {};
  if(!window.console) {
    window.console = {};
    shimmed.console = true;
  }

  var noop = function() {};
  var console_methods = ['log', 'debug', 'info', 'warn', 'error', 'profile', 'profileEnd', 'time', 'timeEnd'];

  for(var i = console_methods.length; i--;) {
    var name = console_methods[i];
    if(!window.console[name]) {
      window.console[name] = noop;
      shimmed[name] = true;
    }
  }

  return shimmed;
});
