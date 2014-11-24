/*!
* LiftJS Javascript Library v0.2.4
* http://liftjs.github.io/
*
* Copyright 2013 - 2014 Pneumatic Web Technologies Corp. and other contributors
* Released under the MIT license
* http://liftjs.github.io/license
*/


define(function() {
  "use strict";
  function DOMEx(type, message) {
    this.name = type, this.code = DOMException[type], this.message = message;
  }
  function DOMTokenList(elem) {
    function checkTokenAndGetIndex(token) {
      if ("" === token) throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
      if (/\s/.test(token)) throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
      return arrIndexOf.call(classes, token);
    }
    function updateClassName() {
      elem.setAttribute("class", self.toString());
    }
    var classes = strTrim.call(elem.getAttribute("class") || "").split(/\s+/), self = this;
    this.item = function(i) {
      return classes[i] || null;
    }, this.contains = function(token) {
      return -1 !== checkTokenAndGetIndex(token + "");
    }, this.add = function() {
      var i = 0, updated = !1, l = arguments.length;
      do {
        var token = arguments[i];
        -1 === checkTokenAndGetIndex(token) && (classes.push(token + ""), updated = !0);
      } while (++i < l);
      updated && updateClassName();
    }, this.remove = function() {
      var i = 0, updated = !1, l = arguments.length;
      do {
        var index = checkTokenAndGetIndex(arguments[i]);
        -1 !== index && (classes.splice(index, 1), updated = !0);
      } while (++i < l);
      updated && updateClassName();
    }, this.toggle = function(token, force) {
      token += "";
      var result = self.contains(token), method = result ? force !== !0 && "remove" : force !== !1 && "add";
      return method && self[method](token), !result;
    }, this.toString = function() {
      return classes.join(" ");
    };
  }
  function classListGetter() {
    if (!(this instanceof Element)) throw new TypeError("'classList' getter called on an object that does not implement interface Element.");
    return new DOMTokenList(this);
  }
  var div = document.createElement("div");
  div.innerHTML = "<svg></svg>";
  var svg = div.firstChild;
  if ("classList" in div && svg && "classList" in svg) return !1;
  var strTrim = String.prototype.trim || function() {
    return this.replace(/^\s+|\s+$/g, "");
  }, arrIndexOf = Array.prototype.indexOf || function(item) {
    for (var i = 0; i < this.length; i++) if (i in this && this[i] === item) return i;
    return -1;
  };
  DOMEx.prototype = Error.prototype;
  var elemCtrProto = Element.prototype;
  if (Object.defineProperty) {
    var classListPropDesc = {
      get: classListGetter,
      enumerable: !0,
      configurable: !0
    };
    try {
      Object.defineProperty(elemCtrProto, "classList", classListPropDesc);
    } catch (ex) {
      -2146823252 === ex.number && (classListPropDesc.enumerable = !1, Object.defineProperty(elemCtrProto, "classList", classListPropDesc));
    }
  } else Object.prototype.__defineGetter__ && elemCtrProto.__defineGetter__("classList", classListGetter);
  return !0;
});