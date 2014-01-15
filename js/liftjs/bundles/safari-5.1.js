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
