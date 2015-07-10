/*!
* LiftJS Javascript Library v0.2.4
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";

  if(Object.seal) { return false; }

  Object.seal = function shimObjectSeal() {};

  // Developer warning in debug mode. During build all console.* are stripped.
  // Making seal() a no-op is mostly ok as browsers that do support
  // Object.seal() will throw errors which can be fixed. Then browsers that
  // don't support seal() will no-op and continue on fine.

  return {
    warn: "Unable to properly shim Object.seal()."
  };
});
