define('liftjs/modules/es5/array/map', [], function() {
  "use strict";

  if(Array.prototype.map) return false;

  // Originally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

  // Production steps of ECMA-262, Edition 5, 15.4.4.19
  // Reference: http://es5.github.com/#x15.4.4.19
  Array.prototype.map = function shimArrayMap(callback, thisArg) {
    var T, A, k;

    if (!this) {
      throw new TypeError("this is null or not defined");
    }

    // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
    var O = Object(this);

    // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
    // 3. Let len be ToUint32(lenValue).
    var len = O.length >>> 0;

    // 4. If IsCallable(callback) is false, throw a TypeError exception.
    // See: http://es5.github.com/#x9.11
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
    if (thisArg) {
      T = thisArg;
    }

    // 6. Let A be a new array created as if by the expression new Array(len) where Array is
    // the standard built-in constructor with that name and len is the value of len.
    A = new Array(len);

    // 7. Let k be 0
    k = 0;

    // 8. Repeat, while k < len
    while(k < len) {

      var kValue, mappedValue;

      // a. Let Pk be ToString(k).
      //   This is implicit for LHS operands of the in operator
      // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
      //   This step can be combined with c
      // c. If kPresent is true, then
      if (k in O) {

        // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
        kValue = O[ k ];

        // ii. Let mappedValue be the result of calling the Call internal method of callback
        // with T as the this value and argument list containing kValue, k, and O.
        mappedValue = callback.call(T, kValue, k, O);

        // iii. Call the DefineOwnProperty internal method of A with arguments
        // Pk, Property Descriptor {Value: mappedValue, : true, Enumerable: true, Configurable: true},
        // and false.

        // In browsers that support Object.defineProperty, use the following:
        // Object.defineProperty(A, Pk, { value: mappedValue, writable: true, enumerable: true, configurable: true });

        // For best browser support, use the following:
        A[ k ] = mappedValue;
      }
      // d. Increase k by 1.
      k++;
    }

    // 9. return A
    return A;
  };

  return true;
});


define('liftjs/modules/es5/object/create', [], function() {
  "use strict";

  if(Object.create) return false;

  // Originally from:
  // http://stackoverflow.com/questions/10141086/understanding-crockfords-object-create-shim
  Object.create = function shimObjectCreate(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };

  return true;
});

define('liftjs/modules/es5/object/defineproperty', [], function() {
  "use strict";

  if(Object.defineProperty) return false;

  // Maybe this will work?:
  // http://johndyer.name/native-browser-get-set-properties-in-javascript/

  return true;
});


define('liftjs/modules/es5/object/defineproperties', [], function() {
  "use strict";

  if(Object.defineProperties) return false;

  if(!Object.defineProperty) {
    console.warn('Unable to implement Object.defineProperties as Object.defineProperty is not available.');
    return;
  }

  function convertToDescriptor(desc) {
    function hasProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    function isCallable(v) {
      // NB: modify as necessary if other values than functions are callable.
      return typeof v === "function";
    }

    if (typeof desc !== "object" || desc === null)
      throw new TypeError("bad desc");

    var d = {};

    if (hasProperty(desc, "enumerable"))
      d.enumerable = !!obj.enumerable;
    if (hasProperty(desc, "configurable"))
      d.configurable = !!obj.configurable;
    if (hasProperty(desc, "value"))
      d.value = obj.value;
    if (hasProperty(desc, "writable"))
      d.writable = !!desc.writable;
    if ( hasProperty(desc, "get") ) {
      var g = desc.get;

      if (!isCallable(g) && g !== "undefined")
        throw new TypeError("bad get");
      d.get = g;
    }
    if ( hasProperty(desc, "set") ) {
      var s = desc.set;
      if (!isCallable(s) && s !== "undefined")
        throw new TypeError("bad set");
      d.set = s;
    }

    if (("get" in d || "set" in d) && ("value" in d || "writable" in d))
      throw new TypeError("identity-confused descriptor");

    return d;
  }

  Object.defineProperties = function defineProperties(obj, properties) {
    if (typeof obj !== "object" || obj === null) {
      throw new TypeError("object required");
    }

    properties = Object(properties);

    var keys = Object.keys(properties);
    var descs = [];

    for (var i = 0; i < keys.length; i++) {
      descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);
    }

    for (i = 0; i < descs.length; i++) {
      Object.defineProperty(obj, descs[i][0], descs[i][1]);
    }

    return obj;
  };

  return true;
});

define('liftjs/modules/es5/object/keys', [], function() {
  "use strict";

  if(Object.keys) return false;

  // Originally from:
  // From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString');
  var dontEnums = [
    'toString',
    'toLocaleString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'constructor'
  ];

  Object.keys = function shimObjectKeys(obj) {
    // In IE 8 Object.keys(document.body.contains) will throw an error because
    // .hasOwnProperty doesn't exist on this kind of native function/object.
    if(typeof obj !== 'object' && (typeof obj !== 'function' || obj === null) || !obj.hasOwnProperty) {
      throw new TypeError(obj + ' is not an object');
    }

    var result = [], prop;

    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        result.push(prop);
      }
    }

    if (hasDontEnumBug) {
      for (var i = 0, _len = dontEnums.length; i < _len; i++) {
        if (obj.hasOwnProperty(dontEnums[i])) {
          result.push(dontEnums[i]);
        }
      }
    }
    return result;
  };

  return true;
});

define('liftjs/modules/es5/object/seal', [], function() {
  "use strict";

  if(Object.seal) return false;

  // Developer warning in debug mode. During build all console.* are stripped.
  // Making seal() a no-op is mostly ok as browsers that do support
  // Object.seal() will throw errors which can be fixed. Then browsers that
  // don't support seal() will no-op and continue on fine.
  console.warn('Unable to properly shim Object.seal().');

  Object.seal = function shimObjectSeal() {};

  return true;
});


define('liftjs/modules/es5/object/freeze', [], function() {
  "use strict";

  if(Object.freeze) return false;

  // Developer warning in debug mode. During build all console.* are stripped.
  // Making freeze() a no-op is mostly ok as browsers that do support
  // Object.freeze() will throw errors which can be fixed. Then browsers that
  // don't support freeze() will no-op and continue on fine.
  console.warn('Unable to properly shim Object.freeze().');

  Object.freeze = function shimObjectFreeze() {};

  return true;
});


define('liftjs/modules/es5/object/preventextensions', [], function() {
  "use strict";

  if(Object.preventExtensions) return false;

  // Developer warning in debug mode. During build all console.* are stripped.
  // Making preventExtensions() a no-op is mostly ok as browsers that do support
  // Object.preventExtensions() will throw errors which can be fixed. Then
  // browsers that don't support preventExtensions() will no-op and continue on
  // fine.
  console.warn('Unable to properly shim Object.preventExtensions().');

  Object.preventExtensions = function shimObjectPreventExtensions() {};

  return true;
});


define('liftjs/modules/es5/object/issealed', [], function() {
  "use strict";

  if(Object.isSealed) return false;

  // Developer warning in debug mode. During build all console.* are stripped.
  // Making isSealed() a no-op is mostly ok as browsers that do support
  // Object.isSealed() will throw errors which can be fixed. Then browsers that
  // don't support isSealed() will no-op and continue on fine.
  console.warn('Unable to properly shim Object.isSealed().');

  Object.isSealed = function shimIsSealed() {};

  return true;
});


define('liftjs/modules/es5/object/isfrozen', [], function() {
  "use strict";

  if(Object.isFrozen) return false;

  // Developer warning in debug mode. During build all console.* are stripped.
  // Making isFrozen() a no-op is mostly ok as browsers that do support
  // Object.isFrozen() will throw errors which can be fixed. Then browsers that
  // don't support isFrozen() will no-op and continue on fine.
  console.warn('Unable to properly shim Object.isFrozen().');

  Object.isFrozen = function shimIsFrozen() {};

  return true;
});


define('liftjs/modules/es5/object/isextensible', [], function() {
  "use strict";

  if(Object.isExtensible) return false;

  // Developer warning in debug mode. During build all console.* are stripped.
  // Making isExtensible() a no-op is mostly ok as browsers that do support
  // Object.isExtensible() will throw errors which can be fixed. Then browsers
  // that don't support isExtensible() will no-op and continue on fine.
  console.warn('Unable to properly shim Object.isExtensible().');

  Object.isExtensible = function shimIsExtensible() {};

  return true;
});


define('liftjs/modules/es5/object/getownpropertynames', ['keys'], function() {
  "use strict";

  if(Object.getOwnPropertyNames) return false;

  // Developer warning in debug mode. During build all console.* are stripped.
  // Making isFrozen() a no-op is mostly ok as browsers that do support
  // Object.isFrozen() will throw errors which can be fixed. Then browsers that
  // don't support isFrozen() will no-op and continue on fine.
  console.warn('Unable to properly shim Object.getOwnPropertyNames().');

  Object.getOwnPropertyNames = function getOwnPropertyNames(o) {
    return Object.keys(o);
  };

  return true;
});

define('liftjs/modules/es5/array/isarray', [], function() {
  "use strict";

  if(Array.isArray) return false;

  // Oringally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray

  Array.isArray = function shimIsArray(vArg) {
    return Object.prototype.toString.call(vArg) === "[object Array]";
  };

  return true;
});

define('liftjs/modules/es5/function/bind', [], function() {
  "use strict";

  if(Function.prototype.bind) return false;

  // Oringally from:
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
  Function.prototype.bind = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("this must be callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1);
    var fToBind = this;
    var NoOp = function () {};
    var fBound = function () {
      return fToBind.apply(this instanceof NoOp && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
    };

    NoOp.prototype = this.prototype;
    fBound.prototype = new NoOp();

    return fBound;
  };

  return true;
});

define(function() {});
