define(function() {
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

