define(function() {
  "use strict";

  var is_shimmed = false;
  if(!window.console) {
    window.console = {};
    is_shimmed = true;
  }

  var noop = function() {};
  var console_methods = ['log', 'debug', 'info', 'warn', 'error', 'profile', 'profileEnd', 'time', 'timeEnd'];

  for(var i = console_methods.length; i--;) {
    var name = console_methods[i];
    if(!window.console[name]) window.console[name] = noop;
  }

  return is_shimmed;
});
