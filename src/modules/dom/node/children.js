define(function() {
  "use strict";

  var div = document.createElement('div');
  div.innerHTML = '<svg></svg>';
  var svg = div.firstChild;

  if(('children' in div) && svg && ('children' in svg)) return false;

  var descriptor = {
    'get': function() {
      var arr = [];
      var child = this.firstChild;

      while(child) {
        if(child.nodeType == 1) {
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
