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
