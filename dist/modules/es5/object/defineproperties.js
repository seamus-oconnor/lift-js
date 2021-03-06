/*!
* LiftJS Javascript Library v0.2.6
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";

  if(Object.defineProperties) { return false; }

  if(!Object.defineProperty) {
    return {
      error: "Unable to shim Object.defineProperties. Object.defineProperty is unavailable."
    };
  }

  function convertToDescriptor(desc) {
    function hasProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    function isCallable(v) {
      // NB: modify as necessary if other values than functions are callable.
      return typeof v === 'function';
    }

    if(typeof desc !== 'object' || desc === null) {
      throw new TypeError('bad desc');
    }

    var d = {};

    if(hasProperty(desc, 'enumerable')) {
      d.enumerable = !!desc.enumerable;
    }
    if(hasProperty(desc, 'configurable')) {
      d.configurable = !!desc.configurable;
    }
    if(hasProperty(desc, 'value')) {
      d.value = desc.value;
    }
    if(hasProperty(desc, 'writable')) {
      d.writable = !!desc.writable;
    }
    if(hasProperty(desc, 'get')) {
      var g = desc.get;

      if(!isCallable(g) && g !== 'undefined') {
        throw new TypeError('bad get');
      }
      d.get = g;
    }
    if(hasProperty(desc, 'set')) {
      var s = desc.set;
      if(!isCallable(s) && s !== 'undefined') {
        throw new TypeError('bad set');
      }
      d.set = s;
    }

    if(('get' in d || 'set' in d) && ('value' in d || 'writable' in d)) {
      throw new TypeError('identity-confused descriptor');
    }

    return d;
  }

  Object.defineProperties = function defineProperties(obj, properties) {
    if(typeof obj !== 'object' || obj === null) {
      throw new TypeError('object required');
    }

    properties = Object(properties);

    var keys = Object.keys(properties);
    var descs = [];

    for(var i = 0; i < keys.length; i++) {
      descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);
    }

    for(i = 0; i < descs.length; i++) {
      Object.defineProperty(obj, descs[i][0], descs[i][1]);
    }

    return obj;
  };

  return true;
});
