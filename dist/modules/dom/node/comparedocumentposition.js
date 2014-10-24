/*!
* LiftJS Javascript Library v0.2.2
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  return window.Node && window.Node.prototype.compareDocumentPosition ? !1 : ((window.Node || window.Element).prototype.compareDocumentPosition = function(other) {
    function recursivelyWalk(nodes, cb) {
      for (var i = 0, len = nodes.length; len > i; i++) {
        var node = nodes[i], ret = cb(node);
        if (ret) return ret;
        if (node.childNodes && node.childNodes.length && (ret = recursivelyWalk(node.childNodes, cb))) return ret;
      }
    }
    function identifyWhichIsFirst(node) {
      return node === other ? "other" : node === reference ? "reference" : void 0;
    }
    var reference = this, referenceTop = this, otherTop = other;
    if (this === other) return 0;
    for (;referenceTop.parentNode; ) referenceTop = referenceTop.parentNode;
    for (;otherTop.parentNode; ) otherTop = otherTop.parentNode;
    if (referenceTop !== otherTop) return Node.DOCUMENT_POSITION_DISCONNECTED;
    if (recursivelyWalk(reference.childNodes, function(node) {
      return other === node;
    })) return Node.DOCUMENT_POSITION_CONTAINED_BY + Node.DOCUMENT_POSITION_FOLLOWING;
    if (recursivelyWalk(other.childNodes, function(node) {
      return reference === node;
    })) return Node.DOCUMENT_POSITION_CONTAINS + Node.DOCUMENT_POSITION_PRECEDING;
    switch (recursivelyWalk([ referenceTop ], identifyWhichIsFirst)) {
     case "other":
      return Node.DOCUMENT_POSITION_PRECEDING;

     default:
      return Node.DOCUMENT_POSITION_FOLLOWING;
    }
    throw new Error("Shim version of compareDocumentPosition didn't work right.");
  }, window.Node || (window.Node = {
    DOCUMENT_POSITION_DISCONNECTED: 1,
    DOCUMENT_POSITION_PRECEDING: 2,
    DOCUMENT_POSITION_FOLLOWING: 4,
    DOCUMENT_POSITION_CONTAINS: 8,
    DOCUMENT_POSITION_CONTAINED_BY: 16
  }), !0);
});