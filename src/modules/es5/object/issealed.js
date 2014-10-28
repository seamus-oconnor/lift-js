define(function() {
  "use strict";

  if(Object.isSealed) { return false; }

  Object.isSealed = function shimIsSealed() {};

  // Developer warning in debug mode. During build all console.* are stripped.
  // Making isSealed() a no-op is mostly ok as browsers that do support
  // Object.isSealed() will throw errors which can be fixed. Then browsers that
  // don't support isSealed() will no-op and continue on fine.

  return {
    warn: "Unable to properly shim Object.isSealed()."
  };
});

