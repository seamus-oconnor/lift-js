/*!
* LiftJS Javascript Library v0.2.6
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


/*global ActiveXObject*/

define(function() {
  "use strict";

  // TODO: Also need to shim support for .addEventListener on older browsers
  // that support XMLHttpRequest but not event listeners.

  if(window.XMLHttpRequest) { return false; }

  // TODO: Build out shim version
  var $todo = function() {
    throw new Error('Not implemented yet');
  };

  function shimXMLHttpRequest() {
    var xhr = null;
    var activex_names = ['MSXML2.XMLHTTP.6.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];

    for(var i = 0; i < activex_names.length; i++) {
      try {
        xhr = new ActiveXObject(activex_names[i]);
        break;
      } catch(e) {}
    }

    //xhr.$events = {};
    //
    //xhr.addEventListener = function(name, fn, capture) {
    //  if(name in this.$events) {
    //    this.$events[name].push(fn);
    //  } else {
    //    this.$events[name] = [fn];
    //  }
    //};
    //
    //xhr.removeEventListener = function(name, fn) {
    //  if(name in this.$events) {
    //    this.$events[name].remove(fn);
    //  }
    //};
    //
    //xhr.onreadystatechange = function() {
    //
    //};

    // return xhr;
  }

  shimXMLHttpRequest.prototype = {
    addEventListener: $todo,
    removeEventListener: $todo,
    onload: $todo,
    onerror: $todo,
    onreadystatechange: $todo
  };

  window.XMLHttpRequest = shimXMLHttpRequest;
});
