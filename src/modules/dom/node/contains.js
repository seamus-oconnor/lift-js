define(function() {
  "use strict";

  if(Node.prototype.contains) { return false; }

  // IE doesn't support compareDocumentPosition but it does support
  // node.contains already so this is just for browsers that don't support this
  // now standardized IE extension.
  Node.prototype.contains = function shimNodeContains(arg) {
    /*jshint bitwise:false*/
    return !!(this.compareDocumentPosition(arg) & 16);
  };

  return true;
});
