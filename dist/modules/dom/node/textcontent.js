/*!
* LiftJS Javascript Library v0.2.1
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  var test = document.createElement("div");
  return "textContent" in test ? !1 : (Object.defineProperty(Element.prototype, "textContent", {
    get: function() {
      function walk(node) {
        for (var child = node.firstChild; child; ) 1 === child.nodeType ? walk(child) : 3 === child.nodeType && texts.push(child.nodeValue), 
        child = child.nextSibling;
      }
      var texts = [];
      return walk(this), texts.join("");
    },
    set: function(val) {
      this.innerHTML = "", this.appendChild(document.createTextNode(val));
    }
  }), !0);
});