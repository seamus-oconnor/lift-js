define(function() {
  "use strict";

  if(Object.freeze) { return false; }

  // Developer warning in debug mode. During build all console.* are stripped.
  // Making freeze() a no-op is mostly ok as browsers that do support
  // Object.freeze() will throw errors which can be fixed. Then browsers that
  // don't support freeze() will no-op and continue on fine.
  console.warn('Unable to properly shim Object.freeze().');

  Object.freeze = function shimObjectFreeze() {};

  return true;
});

