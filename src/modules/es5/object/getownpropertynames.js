define(['keys'], function() {
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
