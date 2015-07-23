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

  if(Object.freeze) { return false; }

  Object.freeze = function shimObjectFreeze() {};

  // Developer warning in debug mode. During build all console.* are stripped.
  // Making freeze() a no-op is mostly ok as browsers that do support
  // Object.freeze() will throw errors which can be fixed. Then browsers that
  // don't support freeze() will no-op and continue on fine.
  return {
    warn: "Unable to properly shim Object.freeze()."
  };
});

