/*!
* LiftJS Javascript Library v0.2.1
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  function convertToDescriptor(desc) {
    function hasProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    function isCallable(v) {
      return "function" == typeof v;
    }
    if ("object" != typeof desc || null === desc) throw new TypeError("bad desc");
    var d = {};
    if (hasProperty(desc, "enumerable") && (d.enumerable = !!desc.enumerable), hasProperty(desc, "configurable") && (d.configurable = !!desc.configurable), 
    hasProperty(desc, "value") && (d.value = desc.value), hasProperty(desc, "writable") && (d.writable = !!desc.writable), 
    hasProperty(desc, "get")) {
      var g = desc.get;
      if (!isCallable(g) && "undefined" !== g) throw new TypeError("bad get");
      d.get = g;
    }
    if (hasProperty(desc, "set")) {
      var s = desc.set;
      if (!isCallable(s) && "undefined" !== s) throw new TypeError("bad set");
      d.set = s;
    }
    if (("get" in d || "set" in d) && ("value" in d || "writable" in d)) throw new TypeError("identity-confused descriptor");
    return d;
  }
  return Object.defineProperties ? !1 : Object.defineProperty ? (Object.defineProperties = function(obj, properties) {
    if ("object" != typeof obj || null === obj) throw new TypeError("object required");
    properties = Object(properties);
    for (var keys = Object.keys(properties), descs = [], i = 0; i < keys.length; i++) descs.push([ keys[i], convertToDescriptor(properties[keys[i]]) ]);
    for (i = 0; i < descs.length; i++) Object.defineProperty(obj, descs[i][0], descs[i][1]);
    return obj;
  }, !0) : void console.warn("Unable to implement Object.defineProperties as Object.defineProperty is not available.");
});