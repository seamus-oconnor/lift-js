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
  function toString() {
    return "[object DOMStringMap]";
  }
  function LiveDataset() {}
  function forEach(arr, cb) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i];
      cb.call(null, item);
    }
  }
  function defProp(obj, name, properties) {
    Object.defineProperty ? Object.defineProperty(obj, name, properties) : ("get" in properties && obj.__defineGetter__(name, properties.get), 
    "set" in properties && obj.__defineSetter__(name, properties.set));
  }
  function getDatasetObject(el) {
    function replaceFn(m) {
      return m.charAt(1).toUpperCase();
    }
    var obj = null;
    try {
      ({}).__defineGetter__("test", function() {}), obj = new LiveDataset();
    } catch (e) {
      obj = document.createElement("div"), obj.toString = toString;
    }
    return forEach(el.attributes, function(attr) {
      if (/^data-\w[\w-]*$/.test(attr.name)) {
        var name = attr.name.substr(5).replace(/-./g, replaceFn), property = {
          enumerable: !0,
          get: function() {
            return attr.value;
          },
          set: function(val) {
            attr.value = val;
          }
        };
        try {
          defProp(obj, name, property);
        } catch (e) {
          delete property.enumerable, defProp(obj, name, property);
        }
      }
    }), obj;
  }
  var test = document.createElement("div");
  if ("dataset" in test) return !1;
  LiveDataset.prototype.toString = toString;
  try {
    defProp(Element.prototype, "dataset", {
      get: function() {
        return getDatasetObject(this);
      }
    });
  } catch (e) {
    console.warn("No support for element.datalist in this browser");
  }
  return !0;
});