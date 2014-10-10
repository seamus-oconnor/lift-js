define(function() {
  "use strict";

  var div = document.createElement('div');

  if('children' in div) { return false; }

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
