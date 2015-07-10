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

  var div = document.createElement('div');
  div.innerHTML = '<svg></svg>';
  var svg = div.firstChild;

  if(('classList' in div) && svg && ('classList' in svg)) { return false; }

  var descriptor = {
    'get': function() {
      var arr = [];
      var child = this.firstChild;

      while(child) {
        if(child.nodeType === 1) {
          arr.push(child);
        }

        child = child.nextSibling;
      }

      return arr;
    },
    enumerable: true
  };

  try {
    Object.defineProperty(Element.prototype, 'children', descriptor);
  } catch(e) {
    delete descriptor.enumerable;
    Object.defineProperty(Element.prototype, 'children', descriptor);
  }

  return true;
});
