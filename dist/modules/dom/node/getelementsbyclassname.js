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
  function shimGetElementsByClassName(names) {
    var classes = (names + "").replace(/^\s+|\s+$/g, "").split(/\s+/);
    return classes.length > 0 ? this.querySelectorAll("." + classes.join(".")) : document.createElement("div").getElementsByTagName("*");
  }
  return document.getElementsByClassName ? !1 : (document.getElementsByClassName = shimGetElementsByClassName, 
  Element.prototype.getElementsByClassName = shimGetElementsByClassName, !0);
});