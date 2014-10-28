define(function() {
  "use strict";

  if(Object.preventExtensions) { return false; }

  Object.preventExtensions = function shimObjectPreventExtensions() {};

  // Developer warning in debug mode. During build all console.* are stripped.
  // Making preventExtensions() a no-op is mostly ok as browsers that do support
  // Object.preventExtensions() will throw errors which can be fixed. Then
  // browsers that don't support preventExtensions() will no-op and continue on
  // fine.

  return {
    warn: "Unable to properly shim Object.preventExtensions()."
  };
});

