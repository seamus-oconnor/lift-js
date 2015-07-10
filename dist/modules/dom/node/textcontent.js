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

  var test = document.createElement('div');

  if('textContent' in test) { return false; }

  Object.defineProperty(Element.prototype, 'textContent', {
    get: function getTextContent() {
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

    set: function setTextContent(val) {
      this.innerHTML = ''; // cheap way to empty element
      this.appendChild(document.createTextNode(val));
    }
  });

  return true;
});
