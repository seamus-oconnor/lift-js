define(function() {
  "use strict";

  var test = document.createElement('div');

  if('textContent' in test) return false;

  Object.defineProperty(Element.prototype, 'textContent', {
      'get': function getTextContent() {
        var texts = [];

        function walk(node) {
          var child = node.firstChild;

          while(child) {
            if(child.nodeType === 1) { // element
              walk(child);
            } else if(child.nodeType === 3) { // text node
              texts.push(child.nodeValue);
            }

            child = child.nextSibling;
          }
        }

        walk(this);

        return texts.join('');
      },
      'set': function setTextContent(val) {
        this.innerHTML = ''; // cheap way to empty element
        this.appendChild(document.createTextNode(val));
      }
    }
  );

  return true;
});
