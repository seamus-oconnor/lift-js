define(function() {
  "use strict";

  var div = document.createElement('div');
  div.innerHTML = '<svg></svg>';
  var svg = div.firstChild;

  if(('children' in div) && svg && ('children' in svg)) return false;

  Object.defineProperty(Element.prototype, 'children', {
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
  });

  return true;
});
