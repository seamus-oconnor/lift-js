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
  function shimXMLHttpRequest() {
    for (var xhr = null, activex_names = [ "MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP" ], i = 0; i < activex_names.length; i++) try {
      xhr = new ActiveXObject(activex_names[i]);
      break;
    } catch (e) {}
  }
  if (window.XMLHttpRequest) return !1;
  var $todo = function() {
    throw new Error("Not implemented yet");
  };
  shimXMLHttpRequest.prototype = {
    addEventListener: $todo,
    removeEventListener: $todo,
    onload: $todo,
    onerror: $todo,
    onreadystatechange: $todo
  }, window.XMLHttpRequest = shimXMLHttpRequest;
});