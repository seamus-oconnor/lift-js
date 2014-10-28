define(function() {
  "use strict";

  if(Object.isExtensible) { return false; }

  Object.isExtensible = function shimIsExtensible() {};

  // Developer warning in debug mode. During build all console.* are stripped.
  // Making isExtensible() a no-op is mostly ok as browsers that do support
  // Object.isExtensible() will throw errors which can be fixed. Then browsers
  // that don't support isExtensible() will no-op and continue on fine.

  return {
    warn: "Unable to properly shim Object.isExtensible()."
  };
});

