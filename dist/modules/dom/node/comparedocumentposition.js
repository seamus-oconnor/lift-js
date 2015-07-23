/*!
* LiftJS Javascript Library v0.2.6
* http://liftjs.github.io/
*
* Copyright 2013 - 2015 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  'use strict';

  // Copied from: http://stackoverflow.com/questions/8334286/cross-browser-compare-document-position

  if(window.Node && window.Node.prototype.compareDocumentPosition) { return false; }

  // IE 8 doesn't have Node so we have to use Element
  (window.Node || window.Element).prototype.compareDocumentPosition = function shimCompareDocumentPosition(other) {
    function recursivelyWalk(nodes, cb) {
      for (var i = 0, len = nodes.length; i < len; i++) {
        var node = nodes[i];
        var ret = cb(node);
        if(ret) {
          return ret;
        }

        if(node.childNodes && node.childNodes.length) {
          ret = recursivelyWalk(node.childNodes, cb);
          if(ret) {
            return ret;
          }
        }
      }
    }

    function identifyWhichIsFirst(node) {
      if (node === other) {
        return 'other';
      } else if (node === reference) {
        return 'reference';
      }
    }

    var reference = this,
      referenceTop = this,
      otherTop = other;

    if(this === other) {
      return 0;
    }

    while(referenceTop.parentNode) {
      referenceTop = referenceTop.parentNode;
    }

    while(otherTop.parentNode) {
      otherTop = otherTop.parentNode;
    }

    if(referenceTop !== otherTop) {
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    }

    if(recursivelyWalk(reference.childNodes, function(node) { return other === node; })) {
      return Node.DOCUMENT_POSITION_CONTAINED_BY + Node.DOCUMENT_POSITION_FOLLOWING;
    }

    if(recursivelyWalk(other.childNodes, function(node) { return reference === node; })) {
      return Node.DOCUMENT_POSITION_CONTAINS + Node.DOCUMENT_POSITION_PRECEDING;
    }

    switch(recursivelyWalk([referenceTop], identifyWhichIsFirst)) {
      case 'other':
        return Node.DOCUMENT_POSITION_PRECEDING;
      default:
        return Node.DOCUMENT_POSITION_FOLLOWING;
    }

    throw new Error('Shim version of compareDocumentPosition didn\'t work right.');
  };

  if(!window.Node) {
    window.Node = {
      DOCUMENT_POSITION_DISCONNECTED: 1,
      DOCUMENT_POSITION_PRECEDING: 2,
      DOCUMENT_POSITION_FOLLOWING: 4,
      DOCUMENT_POSITION_CONTAINS: 8,
      DOCUMENT_POSITION_CONTAINED_BY: 16
    };
  }

  return true;
});
